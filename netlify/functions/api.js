// API pibts — remplace le backend Railway mort (session lock, feedback, duel).
// Persistance : Netlify Blobs (inclus avec le site, aucun compte séparé).
// Toutes les routes échouent "ouvert" côté client (lenny-api.js / lenny-gate.js) :
// une erreur ici dégrade en localStorage, elle ne bloque jamais un élève.
//
// Appelée uniquement depuis la même origine que le site (LENNY_API_BASE =
// location.origin) : aucun en-tête CORS, un autre site ne peut donc pas lire
// les réponses depuis le navigateur d'un élève.

const crypto = require("crypto");
const { getStore } = require("@netlify/blobs");

const HEADERS = { "Content-Type": "application/json" };
const SESSION_TTL_MS = 90 * 1000; // 3x l'intervalle de heartbeat (30s) côté client

// Codes d'accès : lettres/chiffres/« ! »/« - », 2 à 20 caractères. Couvre les
// codes élèves, le code admin et les graines "BOT-XXXXXX" du duel contre le bot.
const CODE_RE = /^[0-9A-ZÀ-Ÿ!-]{2,20}$/;
const validCode = (c) => typeof c === "string" && CODE_RE.test(c);
const validWeek = (w) => typeof w === "string" && /^\d{4}-W\d{2}$/.test(w);
const shortString = (s, max) => typeof s === "string" && s.length > 0 && s.length <= max;

// Même dérivation que lenny-gate.js (PBKDF2-SHA256, sel public, 150 000 tours).
// L'empreinte n'est pas un secret : elle est déjà publique dans lenny-gate.js.
const GATE_SALT = "lenny-gate-2026-7Qz!salt";
const GATE_ITER = 150000;
const ADMIN_HASH = "e31c4b96ef01828d1ca82127b3880473b36eac12994e764aa8a967d8e4c06076";

function isAdminCode(code) {
  if (!validCode(code)) return false;
  const h = crypto.pbkdf2Sync(code, GATE_SALT, GATE_ITER, 32, "sha256");
  return crypto.timingSafeEqual(h, Buffer.from(ADMIN_HASH, "hex"));
}

function json(statusCode, data) {
  return { statusCode, headers: HEADERS, body: JSON.stringify(data) };
}
function parseBody(event) {
  try { return JSON.parse(event.body || "{}"); } catch (e) { return {}; }
}
function header(event, name) {
  const h = event.headers || {};
  return h[name] || h[name.toLowerCase()] || "";
}

// Avis d'un contenu → la ligne du tableau de bord formateur, même forme que le
// repli local de lenny-api.js. Jamais d'userId : il contient le code de l'élève.
function adminRow(courseId, votes) {
  const up = votes.filter((v) => v.vote === "up").length;
  const down = votes.filter((v) => v.vote === "down").length;
  const total = up + down;
  return {
    courseId, up, down, total,
    satisfaction: total ? Math.round((up / total) * 100) : null,
    voters: votes
      .map((v) => ({ name: v.userName, vote: v.vote, date: v.date }))
      .sort((a, b) => (a.date < b.date ? 1 : -1)),
  };
}

exports.handler = async (event) => {
  // Derrière la redirection /api/* de netlify.toml, Netlify transmet le chemin
  // d'ORIGINE (/api/...) : mesuré le 23/11/2026, toutes les routes répondaient
  // 404 en ligne. On retire les deux préfixes possibles.
  const route = (event.path || "").replace(/^\/\.netlify\/functions\/api/, "").replace(/^\/api(?=\/|$)/, "") || "/";
  const qs = event.queryStringParameters || {};
  const segs = route.split("/").filter(Boolean); // ex: ["session","claim"]

  try {
    // ---------------------------------------------------------------
    // Verrou de session : un code actif sur un seul appareil à la fois
    // ---------------------------------------------------------------
    if (segs[0] === "session" && event.httpMethod === "POST") {
      const store = getStore("sessions");
      const { code, client_id } = parseBody(event);
      if (!validCode(code) || !shortString(client_id, 40)) return json(400, { error: "missing code or client_id" });
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
      if (!/^[a-z0-9-]{1,80}$/i.test(course_id || "") || !shortString(user_id, 40)) {
        return json(400, { error: "missing course_id or user_id" });
      }
      if (vote != null && vote !== "up" && vote !== "down") return json(400, { error: "invalid vote" });
      const store = getStore("feedback");
      const rows = (await store.get(course_id, { type: "json" })) || [];
      const idx = rows.findIndex((r) => r.userId === user_id);
      if (vote) {
        const entry = {
          userId: user_id,
          userName: shortString(user_name, 60) ? user_name : "Élève",
          vote,
          date: shortString(date, 40) ? date : new Date().toISOString(),
        };
        if (idx >= 0) rows[idx] = entry; else rows.push(entry);
      } else if (idx >= 0) {
        rows.splice(idx, 1);
      }
      await store.setJSON(course_id, rows);
      return json(200, { ok: true });
    }
    if (segs[0] === "feedback" && segs[1] === "admin" && event.httpMethod === "GET") {
      if (!isAdminCode(header(event, "X-Lenny-Code"))) return json(401, { error: "admin only" });
      const store = getStore("feedback");
      const { blobs } = await store.list();
      const rows = [];
      for (const b of blobs) {
        const votes = (await store.get(b.key, { type: "json" })) || [];
        if (votes.length) rows.push(adminRow(b.key, votes));
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

    // ---------------------------------------------------------------
    // Duel réel — résultat de quiz (30 questions/30s). Asynchrone : chacun
    // joue quand il veut dans la semaine. Clé = la PAIRE des deux codes
    // (triés) + la semaine, pour supporter plusieurs duels simultanés.
    // Jamais de score inventé — {result:null} si l'adversaire n'a pas joué.
    // ---------------------------------------------------------------
    if (segs[0] === "duel" && segs[1] === "quiz-result") {
      const pairKey = (a, b, week) => [a, b].sort().join("~") + "|" + week;
      const store = getStore("duel-quiz");

      if (event.httpMethod === "POST") {
        const { code, week, opponentCode, score, timeMs } = parseBody(event);
        if (!validCode(code)) return json(400, { error: "invalid code" });
        if (!validCode(opponentCode)) return json(400, { error: "invalid opponentCode" });
        if (!validWeek(week)) return json(400, { error: "invalid week" });
        const scoreNum = Number(score);
        const timeNum = Number(timeMs);
        if (!Number.isInteger(scoreNum) || scoreNum < 0 || scoreNum > 30) return json(400, { error: "invalid score" });
        if (!Number.isFinite(timeNum) || timeNum < 0 || timeNum > 2000000) return json(400, { error: "invalid timeMs" });
        const key = pairKey(code, opponentCode, week);
        const entry = (await store.get(key, { type: "json" })) || {};
        entry[code] = { score: Math.round(scoreNum), timeMs: Math.round(timeNum), updatedAt: Date.now() };
        await store.setJSON(key, entry);
        return json(200, { ok: true });
      }
      if (event.httpMethod === "GET") {
        const { code, opponent, week } = qs;
        if (!validCode(code)) return json(400, { error: "invalid code" });
        if (!validCode(opponent)) return json(400, { error: "invalid opponent" });
        if (!validWeek(week)) return json(400, { error: "invalid week" });
        const key = pairKey(code, opponent, week);
        const entry = (await store.get(key, { type: "json" })) || {};
        const oppResult = entry[opponent];
        return json(200, { result: oppResult ? { score: oppResult.score, timeMs: oppResult.timeMs } : null });
      }
      return json(405, { error: "method not allowed" });
    }

    // quiz-result / stats/radar : pas branchés, et le client ne les appelle
    // plus (lenny-api.js calcule le radar en local). Le contrat attendu
    // ({period, subjects, current, previous}, subjects() calculé depuis
    // window.MODULES/QUIZ/STUDY) ne se reconstruit pas fidèlement côté serveur.

    return json(404, { error: "unknown route", route });
  } catch (e) {
    // Le détail reste dans les journaux Netlify, pas dans la réponse publique.
    console.error("api:", route, e);
    return json(500, { error: "internal_error" });
  }
};
