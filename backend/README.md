# LENNY — Backend (FastAPI + MongoDB)

API qui alimente les fonctionnalités **Avis 👍/👎** et **Mon évolution (radar de Kiviat)**
du site LENNY. Le front fonctionne **sans backend** (persistance locale) ; dès que ce
serveur tourne et que `window.LENNY_API_BASE` est défini, les données deviennent
partagées et persistantes côté serveur.

## Démarrage

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# MongoDB doit tourner (local ou Atlas)
export MONGO_URL="mongodb://localhost:27017"

# Jeton administrateur (formateur) — REQUIS pour les routes admin
export ADMIN_TOKEN="$(openssl rand -hex 24)"   # note-le : à saisir côté navigateur

uvicorn main:app --reload --port 8000
```

## Brancher le front

Dans `index.html`, **avant** les autres `<script>` :

```html
<script>window.LENNY_API_BASE = "http://localhost:8000";</script>
```

Sans cette ligne, le front utilise `localStorage` (mono-utilisateur, hors-ligne).

## Endpoints

| Méthode | Route | Rôle |
|--------|-------|------|
| `POST` | `/api/feedback` | Enregistrer / changer / annuler un avis. Body : `{course_id, vote: "up"|"down"|null, user_id, user_name, date}` |
| `GET`  | `/api/feedback/admin?user_id=` | **Formateur 🔒** : tous les avis nominatifs, groupés par contenu. Exige l'en-tête `X-Admin-Token`. |
| `GET`  | `/api/feedback/{course_id}?user_id=` | Compteurs `{up, down, mine}` |
| `POST` | `/api/quiz-result` | Résultat de quiz horodaté. Body : `{moduleId, subject, correct, total, user_id, ts, date}` |
| `GET`  | `/api/stats/radar?period=14&user_id=` | Radar `{current, previous, subjects}` (période actuelle vs précédente) |
| `POST` | `/api/updates` | **Formateur 🔒** : ajouter/mettre à jour une nouveauté. Exige `X-Admin-Token`. |
| `DELETE` | `/api/updates/{id}` | **Formateur 🔒** : retirer une nouveauté. Exige `X-Admin-Token`. |
| `POST` | `/api/session/claim` | **Verrou mono-appareil** : réserve le code pour l'IP appelante. Renvoie `409 {reason:"in_use"}` si une autre IP le détient. Body : `{code, client_id}` |
| `POST` | `/api/session/heartbeat` | Garde la session vivante ; `{revoked:true}` si le code a été repris ailleurs. Body : `{code, client_id}` |
| `POST` | `/api/session/release` | Libère le code (déconnexion / fermeture). Body : `{code, client_id}` |

## 🔒 Routes administrateur (formateur)

Trois routes sont réservées au formateur et exigent l'en-tête HTTP
`X-Admin-Token` égal à la variable d'environnement **`ADMIN_TOKEN`** du serveur :
`GET /api/feedback/admin`, `POST /api/updates`, `DELETE /api/updates/{id}`.

- **Côté serveur** : définis `ADMIN_TOKEN` (secret long, ex. `openssl rand -hex 24`).
  Sans cette variable, ces routes renvoient `503` (**fail-closed** : rien n'est exposé).
  Un mauvais jeton renvoie `401`. La comparaison utilise `secrets.compare_digest`
  (résistante aux attaques temporelles).
- **Côté front** : Lenny saisit ce même jeton **une seule fois** dans le navigateur
  (invite automatique à la première action admin). Il est stocké en `localStorage`
  sur son appareil — **jamais** écrit dans le code source du site — et renvoyé en
  en-tête sur chaque appel admin. En cas de `401/503`, le jeton stocké est effacé
  et un message invite à le ressaisir.

## Collections MongoDB

- **feedback** — un document par `(course_id, user_id)` : `{course_id, user_id, user_name, vote, date}`
- **quiz_results** — un document par quiz terminé : `{user_id, module_id, subject, correct, total, ts, date}`
- **sessions** — un document par code actif : `{code, ip, client_id, last_seen, date}` (verrou mono-appareil)

## Verrou mono-appareil (anti double-connexion sur 2 IP)

À la connexion, le front appelle `POST /api/session/claim`. Le serveur lit l'IP réelle
(via `X-Forwarded-For` derrière Render/Netlify) et :
- si **aucune** session active pour ce code, ou si elle vient de la **même IP/appareil**,
  ou si la précédente est **périmée** (pas de heartbeat depuis 90 s) → accès accordé ;
- si une **autre IP** détient le code et est **encore active** → **refus `409`**, le front
  affiche « Ce code est déjà connecté sur un autre appareil. »

Un heartbeat (toutes les 30 s) garde la session vivante ; la déconnexion / fermeture
d'onglet appelle `release`. **Sans backend, ce verrou ne peut pas être appliqué**
(le navigateur ne voit pas les autres appareils) : le front laisse alors passer
(fail-open). Le verrou devient effectif dès que `LENNY_API_BASE` pointe vers l'API.

Le radar agrège `quiz_results` par `module_id` sur deux fenêtres de `period` jours
(actuelle = `[now-period, now]`, précédente = `[now-2·period, now-period]`).
