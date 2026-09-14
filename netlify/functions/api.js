// API pibts — remplace le backend Railway mort (session lock, feedback, quiz-result, radar).
// Persistance : Netlify Blobs (inclus avec le site, aucun compte séparé).
// Toutes les routes échouent "ouvert" côté client (lenny-api.js / lenny-gate.js) :
// une erreur ici dégrade en localStorage, elle ne bloque jamais un élève.

const { getStore } = require("@netlify/blobs");

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const SESSION_TTL_MS = 90 * 1000; // 3x l'intervalle de heartbeat (30s) côté client

function json(statusCode, data) {
  return { statusCode, headers: CORS, body: JSON.stringify(data) };
}
function parseBody(event) {
  try { return JSON.parse(event.body || "{}"); } catch (e) { return {}; }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };

  const route = (event.path || "").replace(/^\/\.netlify\/functions\/api/, "") || "/";
  const qs = event.queryStringParameters || {};
  const segs = route.split("/").filter(Boolean); // ex: ["session","claim"]

  try {
    // ---------------------------------------------------------------
    // Verrou de session : un code actif sur un seul appareil à la fois
    // ---------------------------------------------------------------
    if (segs[0] === "session" && event.httpMethod === "POST") {
      const store = getStore("sessions");
      const { code, client_id } = parseBody(event);
      if (!code || !client_id) return json(400, { error: "missing code or client_id" });
      const now = Date.now();
      const existing = await store.get(code, { type: "json" });

      if (segs[1] === "claim") {
        if (existing && existing.clientId !== client_id && now - existing.lastSeen < SESSION_TTL_MS) {
          return json(409, { error: "in_use" });
        }
        await store.setJSON(code, { clientId: client_id, lastSeen: now });
        return json(200, { ok: true });
      }
      if (segs[1] === "heartbeat") {
        if (!existing || existing.clientId !== client_id) return json(200, { revoked: true });
        await store.setJSON(code, { clientId: client_id, lastSeen: now });
        return json(200, { revoked: false });
      }
      if (segs[1] === "release") {
        if (existing && existing.clientId === client_id) await store.delete(code);
        return json(200, { ok: true });
      }
      return json(404, { error: "unknown session route" });
    }

    // ---------------------------------------------------------------
    // Feedback (pouce haut/bas par contenu) + vue admin agrégée
    // ---------------------------------------------------------------
    if (route === "/feedback" && event.httpMethod === "POST") {
      const { course_id, vote, user_id, user_name, date } = parseBody(event);
      if (!course_id || !user_id) return json(400, { error: "missing course_id or user_id" });
      const store = getStore("feedback");
      const rows = (await store.get(course_id, { type: "json" })) || [];
      const idx = rows.findIndex((r) => r.userId === user_id);
      if (vote) {
        const entry = { userId: user_id, userName: user_name || "Élève", vote, date: date || new Date().toISOString() };
        if (idx >= 0) rows[idx] = entry; else rows.push(entry);
      } else if (idx >= 0) {
        rows.splice(idx, 1);
      }
      await store.setJSON(course_id, rows);
      return json(200, { ok: true });
    }
    if (segs[0] === "feedback" && segs[1] === "admin" && event.httpMethod === "GET") {
      const store = getStore("feedback");
      const { blobs } = await store.list();
      const rows = [];
      for (const b of blobs) {
        const courseRows = (await store.get(b.key, { type: "json" })) || [];
        courseRows.forEach((r) => rows.push({ courseId: b.key, ...r }));
      }
      return json(200, { rows });
    }
    if (segs[0] === "feedback" && segs[1] && event.httpMethod === "GET") {
      const courseId = decodeURIComponent(segs[1]);
      const store = getStore("feedback");
      const rows = (await store.get(courseId, { type: "json" })) || [];
      const up = rows.filter((r) => r.vote === "up").length;
      const down = rows.filter((r) => r.vote === "down").length;
      const mineEntry = rows.find((r) => r.userId === qs.user_id);
      return json(200, { up, down, mine: mineEntry ? mineEntry.vote : null });
    }

    // ---------------------------------------------------------------
    // Duel réel : XP hebdomadaire posté par un code, lu par un autre.
    // Jamais de valeur inventée — {xp:null} si l'adversaire n'a rien posté.
    // ---------------------------------------------------------------
    if (segs[0] === "duel" && segs[1] === "xp") {
      const CODE_RE = /^[0-9A-ZÀ-Ÿ]{2,}-[0-9A-ZÀ-Ÿ]{2,}$/;
      const validCode = (c) => typeof c === "string" && c.length <= 20 && (c === "LENNY71!" || CODE_RE.test(c));
      const validWeek = (w) => typeof w === "string" && /^\d{4}-W\d{2}$/.test(w);
      const store = getStore("duel-xp");

      if (event.httpMethod === "POST") {
        const { code, week, xp } = parseBody(event);
        if (!validCode(code)) return json(400, { error: "invalid code" });
        if (!validWeek(week)) return json(400, { error: "invalid week" });
        const xpNum = Number(xp);
        if (!Number.isFinite(xpNum) || xpNum < 0 || xpNum > 1000000) return json(400, { error: "invalid xp" });
        await store.setJSON(code + "|" + week, { xp: Math.round(xpNum), updatedAt: Date.now() });
        return json(200, { ok: true });
      }
      if (event.httpMethod === "GET") {
        const { code, week } = qs;
        if (!validCode(code)) return json(400, { error: "invalid code" });
        if (!validWeek(week)) return json(400, { error: "invalid week" });
        const entry = await store.get(code + "|" + week, { type: "json" });
        return json(200, entry ? { xp: entry.xp, updatedAt: entry.updatedAt } : { xp: null });
      }
      return json(405, { error: "method not allowed" });
    }

    // quiz-result / stats/radar : pas encore branchés. Le contrat exact attendu
    // par lenny-api.js (getRadar renvoie {period, subjects, current, previous}
    // avec subjects() calculé CÔTÉ CLIENT depuis window.MODULES/QUIZ/STUDY) ne se
    // reconstruit pas fidèlement côté serveur sans risquer un radar cassé plutôt
    // qu'un simple repli local. Cassé au lieu de gracieusement absent serait pire
    // que l'état actuel — laissé de côté volontairement, à reprendre séparément.

    return json(404, { error: "unknown route", route });
  } catch (e) {
    return json(500, { error: "internal_error", message: String(e && e.message || e) });
  }
};
