"""
LENNY — Backend FastAPI + MongoDB
==================================
Fournit les endpoints consommés par le front (lenny-api.js) :

  POST /api/feedback              → enregistrer / changer / annuler un avis (👍/👎)
  GET  /api/feedback/{course_id}  → compteurs {up, down, mine}
  POST /api/quiz-result           → enregistrer un résultat de quiz horodaté
  GET  /api/stats/radar?period=14 → radar { current, previous } par matière
  GET  /api/updates               → journal des nouveautés (cloche)
  POST /api/updates               → ajouter / mettre à jour une nouveauté
  DELETE /api/updates/{id}        → retirer une nouveauté

Lancer :
  pip install -r requirements.txt
  export MONGO_URL="mongodb://localhost:27017"
  uvicorn main:app --reload --port 8000

Côté front, définir avant les autres scripts :
  <script>window.LENNY_API_BASE = "http://localhost:8000";</script>
"""
import os
import secrets
import httpx
from datetime import datetime, timedelta, timezone
from typing import Optional, List

from fastapi import FastAPI, Query, Request, Header, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB", "lenny")
# Jeton administrateur (formateur). REQUIS pour les routes admin.
# Génère un secret long et aléatoire, ex : openssl rand -hex 24
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")
# IA de secours du chatbot Lenny-agent (optionnel). Sans clé, /api/chat
# répond {ok:false, reason:"no_ai"} et le front bascule sur la base de
# connaissances / la transmission à Lenny.
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
LENNY_AI_MODEL = os.getenv("LENNY_AI_MODEL", "claude-haiku-4-5")

app = FastAPI(title="LENNY API")

# CORS — autoriser le front statique (adapter en prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

client: Optional[AsyncIOMotorClient] = None
db = None


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    """Protège les routes formateur : exige l'en-tête X-Admin-Token == ADMIN_TOKEN.
    Fail-closed : si ADMIN_TOKEN n'est pas configuré sur le serveur, tout est refusé.
    secrets.compare_digest évite les attaques par mesure de temps."""
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=503, detail="ADMIN_TOKEN non configuré sur le serveur")
    if not x_admin_token or not secrets.compare_digest(x_admin_token, ADMIN_TOKEN):
        raise HTTPException(status_code=401, detail="Jeton administrateur invalide")
    return True


@app.on_event("startup")
async def startup():
    global client, db
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    # index pour des agrégations rapides
    await db.feedback.create_index([("course_id", 1), ("user_id", 1)], unique=True)
    await db.quiz_results.create_index([("user_id", 1), ("module_id", 1), ("ts", 1)])
    await db.updates.create_index("id", unique=True)
    await db.sessions.create_index("code", unique=True)
    await db.messages.create_index([("date", -1)])


@app.on_event("shutdown")
async def shutdown():
    if client:
        client.close()


# ----------------------------------------------------------------------------
# 1) AVIS  👍 / 👎
# ----------------------------------------------------------------------------
class FeedbackIn(BaseModel):
    course_id: str
    vote: Optional[str] = None   # 'up' | 'down' | None (annulation)
    user_id: str
    user_name: Optional[str] = None
    date: Optional[str] = None


@app.post("/api/feedback")
async def post_feedback(body: FeedbackIn):
    key = {"course_id": body.course_id, "user_id": body.user_id}
    if body.vote in ("up", "down"):
        await db.feedback.update_one(
            key,
            {"$set": {"vote": body.vote, "user_name": body.user_name or body.user_id,
                      "date": body.date or datetime.now(timezone.utc).isoformat()}},
            upsert=True,
        )
    else:
        # annulation : on retire le vote de l'utilisateur
        await db.feedback.delete_one(key)
    return await _feedback_counts(body.course_id, body.user_id)


@app.get("/api/feedback/admin")
async def feedback_admin(user_id: Optional[str] = Query(default=None), _admin: bool = Depends(require_admin)):
    """Tableau de bord formateur : tous les avis nominatifs, par contenu.
    Déclaré AVANT /api/feedback/{course_id} pour ne pas être capturé par celui-ci."""
    by_course = {}
    async for d in db.feedback.find({"vote": {"$in": ["up", "down"]}}):
        cid = d["course_id"]
        by_course.setdefault(cid, []).append({
            "name": d.get("user_name") or d.get("user_id"),
            "vote": d.get("vote"),
            "date": d.get("date"),
        })
    rows = []
    for cid, voters in by_course.items():
        up = sum(1 for v in voters if v["vote"] == "up")
        down = sum(1 for v in voters if v["vote"] == "down")
        total = up + down
        rows.append({
            "courseId": cid,
            "up": up, "down": down, "total": total,
            "satisfaction": round(100 * up / total) if total else None,
            "voters": sorted(voters, key=lambda v: v.get("date") or "", reverse=True),
        })
    return {"rows": rows}


@app.get("/api/feedback/{course_id}")
async def get_feedback(course_id: str, user_id: Optional[str] = Query(default=None)):
    return await _feedback_counts(course_id, user_id)


async def _feedback_counts(course_id: str, user_id: Optional[str]):
    up = await db.feedback.count_documents({"course_id": course_id, "vote": "up"})
    down = await db.feedback.count_documents({"course_id": course_id, "vote": "down"})
    mine = None
    if user_id:
        doc = await db.feedback.find_one({"course_id": course_id, "user_id": user_id})
        mine = doc.get("vote") if doc else None
    return {"course_id": course_id, "up": up, "down": down, "mine": mine}


# ----------------------------------------------------------------------------
# 2) RÉSULTATS DE QUIZ (horodatés)
# ----------------------------------------------------------------------------
class QuizResultIn(BaseModel):
    moduleId: str
    subject: Optional[str] = None
    correct: int
    total: int
    user_id: str
    ts: Optional[int] = None          # ms epoch (envoyé par le front)
    date: Optional[str] = None        # ISO 8601


@app.post("/api/quiz-result")
async def post_quiz_result(body: QuizResultIn):
    ts = body.ts if body.ts is not None else int(datetime.now(timezone.utc).timestamp() * 1000)
    doc = {
        "user_id": body.user_id,
        "module_id": body.moduleId,
        "subject": body.subject or body.moduleId,
        "correct": int(body.correct),
        "total": max(1, int(body.total)),
        "ts": ts,
        "date": body.date or datetime.fromtimestamp(ts / 1000, timezone.utc).isoformat(),
    }
    await db.quiz_results.insert_one(doc)
    return {"ok": True, "saved": {k: doc[k] for k in ("module_id", "correct", "total", "ts")}}


# ----------------------------------------------------------------------------
# 3) RADAR — score moyen par matière, période actuelle vs précédente
# ----------------------------------------------------------------------------
async def _avg_by_subject(user_id: str, start_ms: int, end_ms: int):
    """Retourne { module_id: {subject, score, evaluated} } sur [start, end)."""
    pipeline = [
        {"$match": {"user_id": user_id, "ts": {"$gte": start_ms, "$lt": end_ms}}},
        {"$group": {
            "_id": "$module_id",
            "subject": {"$last": "$subject"},
            "correct": {"$sum": "$correct"},
            "total": {"$sum": "$total"},
            "n": {"$sum": 1},
        }},
    ]
    out = {}
    async for r in db.quiz_results.aggregate(pipeline):
        score = round(100 * r["correct"] / r["total"]) if r["total"] else 0
        out[r["_id"]] = {"subject": r.get("subject") or r["_id"], "score": score, "evaluated": r["n"] > 0}
    return out


@app.get("/api/stats/radar")
async def get_radar(period: int = Query(default=14), user_id: str = Query(...)):
    day = 86400000
    now = int(datetime.now(timezone.utc).timestamp() * 1000)
    cur_start = now - period * day
    prev_start = now - 2 * period * day

    cur = await _avg_by_subject(user_id, cur_start, now + 1)
    prev = await _avg_by_subject(user_id, prev_start, cur_start)

    # liste des matières connues = union des deux périodes + tout l'historique
    all_ids: List[str] = []
    subjects_map = {}
    async for r in db.quiz_results.aggregate([
        {"$group": {"_id": "$module_id", "subject": {"$last": "$subject"}}}
    ]):
        all_ids.append(r["_id"])
        subjects_map[r["_id"]] = r.get("subject") or r["_id"]

    current, previous, subjects = [], [], []
    for mid in all_ids:
        label = subjects_map.get(mid, mid)
        subjects.append({"id": mid, "label": label})
        c = cur.get(mid, {"subject": label, "score": 0, "evaluated": False})
        p = prev.get(mid, {"subject": label, "score": 0, "evaluated": False})
        current.append({"id": mid, "subject": label, "score": c["score"], "evaluated": c["evaluated"]})
        previous.append({"id": mid, "subject": label, "score": p["score"], "evaluated": p["evaluated"]})

    return {"period": period, "subjects": subjects, "current": current, "previous": previous}


# ----------------------------------------------------------------------------
# 3bis) JOURNAL DES NOUVEAUTÉS (cloche)
# ----------------------------------------------------------------------------
class UpdateIn(BaseModel):
    id: str
    type: str
    title: str
    desc: Optional[str] = ""
    date: Optional[str] = None
    link_kind: Optional[str] = None
    link_id: Optional[str] = None


@app.get("/api/updates")
async def get_updates():
    """Liste des nouveautés, plus récentes d'abord."""
    items = []
    async for d in db.updates.find().sort("date", -1):
        d.pop("_id", None)
        items.append(d)
    return {"items": items}


@app.post("/api/updates")
async def post_update(body: UpdateIn, _admin: bool = Depends(require_admin)):
    """Ajoute (ou met à jour) une nouveauté — réservé au formateur côté front."""
    doc = body.dict()
    if not doc.get("date"):
        doc["date"] = datetime.now(timezone.utc).isoformat()
    await db.updates.update_one({"id": body.id}, {"$set": doc}, upsert=True)
    return {"ok": True, "item": doc}


@app.delete("/api/updates/{uid}")
async def delete_update(uid: str, _admin: bool = Depends(require_admin)):
    await db.updates.delete_one({"id": uid})
    return {"ok": True}


# ----------------------------------------------------------------------------
# 4) CHATBOT LENNY-AGENT — IA de secours (optionnelle) + messages élèves
# ----------------------------------------------------------------------------
class ChatIn(BaseModel):
    message: str
    context: Optional[str] = ""
    system: Optional[str] = None


@app.post("/api/chat")
async def post_chat(body: ChatIn):
    """IA de secours du chatbot. Sans ANTHROPIC_API_KEY → {ok:false, reason:'no_ai'}.
    Le front bascule alors sur la base de connaissances / la transmission à Lenny."""
    if not ANTHROPIC_API_KEY:
        return {"ok": False, "reason": "no_ai"}
    system = body.system or (
        "Tu es Lenny-agent, l'assistant de révision du site LENNY pour le BTS "
        "Professions Immobilières. Tutoie l'élève, ton décontracté et motivant, "
        "réponses courtes (2-4 phrases) en français."
    )
    user = body.message
    if body.context:
        user = "Extraits de mes fiches :\n" + body.context + "\n\nQuestion : " + body.message
    try:
        async with httpx.AsyncClient(timeout=25) as http:
            r = await http.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": LENNY_AI_MODEL,
                    "max_tokens": 500,
                    "system": system,
                    "messages": [{"role": "user", "content": user}],
                },
            )
        if r.status_code != 200:
            return {"ok": False, "reason": "ai_error", "status": r.status_code}
        data = r.json()
        parts = data.get("content", [])
        reply = "".join(p.get("text", "") for p in parts if p.get("type") == "text").strip()
        if not reply:
            return {"ok": False, "reason": "empty"}
        return {"ok": True, "reply": reply}
    except Exception:
        return {"ok": False, "reason": "exception"}


class MessageIn(BaseModel):
    kind: Optional[str] = "message"     # 'question' | 'avis' | 'idee' | 'message'
    text: str
    user_id: Optional[str] = None
    user_name: Optional[str] = None
    date: Optional[str] = None


@app.post("/api/messages")
async def post_message(body: MessageIn):
    """Reçoit un message d'élève transmis via Lenny-agent (question, avis, idée)."""
    doc = body.dict()
    if not doc.get("date"):
        doc["date"] = datetime.now(timezone.utc).isoformat()
    doc["read"] = False
    await db.messages.insert_one(doc)
    return {"ok": True}


@app.get("/api/messages")
async def get_messages(_admin: bool = Depends(require_admin)):
    """Boîte de réception du formateur : tous les messages, plus récents d'abord."""
    items = []
    async for d in db.messages.find().sort("date", -1):
        d.pop("_id", None)
        items.append(d)
    return {"items": items}


# ----------------------------------------------------------------------------
# 5) VERROU MONO-APPAREIL — un code ne peut être actif que sur UNE IP à la fois
# ----------------------------------------------------------------------------
SESSION_STALE_MS = 90_000   # une session sans heartbeat depuis 90 s est considérée libre


def _client_ip(request: Request) -> str:
    """IP réelle du client, même derrière un proxy (Render/Railway/Netlify)."""
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


class SessionIn(BaseModel):
    code: str
    client_id: str


@app.post("/api/session/claim")
async def session_claim(body: SessionIn, request: Request):
    """Réserve le code pour cette IP. Refuse (409) si une autre IP le détient déjà."""
    ip = _client_ip(request)
    now = int(datetime.now(timezone.utc).timestamp() * 1000)
    existing = await db.sessions.find_one({"code": body.code})
    if existing:
        fresh = (now - existing.get("last_seen", 0)) < SESSION_STALE_MS
        other_ip = existing.get("ip") != ip
        other_client = existing.get("client_id") != body.client_id
        if fresh and other_ip and other_client:
            masked = _mask_ip(existing.get("ip", ""))
            return JSONResponse(status_code=409, content={
                "ok": False, "reason": "in_use", "ip": masked,
                "since": existing.get("date"),
            })
    await db.sessions.update_one(
        {"code": body.code},
        {"$set": {"code": body.code, "ip": ip, "client_id": body.client_id,
                  "last_seen": now, "date": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True, "ip": _mask_ip(ip)}


@app.post("/api/session/heartbeat")
async def session_heartbeat(body: SessionIn, request: Request):
    """Maintient la session vivante. Signale revoked=True si un autre appareil a pris le code."""
    ip = _client_ip(request)
    now = int(datetime.now(timezone.utc).timestamp() * 1000)
    existing = await db.sessions.find_one({"code": body.code})
    if not existing or existing.get("client_id") != body.client_id:
        return {"ok": False, "revoked": True}
    await db.sessions.update_one({"code": body.code}, {"$set": {"last_seen": now, "ip": ip}})
    return {"ok": True}


@app.post("/api/session/release")
async def session_release(body: SessionIn):
    """Libère le code (déconnexion / fermeture d'onglet)."""
    await db.sessions.delete_one({"code": body.code, "client_id": body.client_id})
    return {"ok": True}


def _mask_ip(ip: str) -> str:
    parts = ip.split(".")
    if len(parts) == 4:
        return parts[0] + "." + parts[1] + ".x.x"
    return "masquée"


@app.get("/")
async def root():
    return {"service": "LENNY API", "endpoints": [
        "POST /api/feedback", "GET /api/feedback/{course_id}", "GET /api/feedback/admin",
        "POST /api/quiz-result", "GET /api/stats/radar?period=14&user_id=...",
        "GET /api/updates", "POST /api/updates", "DELETE /api/updates/{id}",
        "POST /api/chat", "POST /api/messages", "GET /api/messages",
        "POST /api/session/claim", "POST /api/session/heartbeat", "POST /api/session/release",
    ]}
