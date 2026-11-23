// Tests de netlify/functions/api.js, sans réseau ni compte Netlify.
//   node --test outils/api.test.mjs
// Les Netlify Blobs sont remplacés par une mémoire en Map.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const stores = new Map();
function fakeStore(name) {
  if (!stores.has(name)) stores.set(name, new Map());
  const m = stores.get(name);
  return {
    get: async (k) => (m.has(k) ? structuredClone(m.get(k)) : null),
    setJSON: async (k, v) => { m.set(k, structuredClone(v)); },
    delete: async (k) => { m.delete(k); },
    list: async () => ({ blobs: [...m.keys()].map((key) => ({ key })) }),
  };
}
require.cache[require.resolve("../netlify/functions/node_modules/@netlify/blobs")] = {
  exports: { getStore: fakeStore },
};
const { handler } = require("../netlify/functions/api.js");

const call = async (method, path, { body, headers, qs } = {}) => {
  const r = await handler({
    httpMethod: method, path: "/.netlify/functions/api" + path,
    body: body && JSON.stringify(body), headers: headers || {}, queryStringParameters: qs || {},
  });
  return { status: r.statusCode, data: JSON.parse(r.body), headers: r.headers };
};

test("le chemin /api/... transmis par la redirection Netlify est reconnu", async () => {
  const r = await handler({ httpMethod: "GET", path: "/api/feedback/course-zz", headers: {}, queryStringParameters: {} });
  assert.equal(r.statusCode, 200);
  assert.deepEqual(JSON.parse(r.body), { up: 0, down: 0, mine: null });
});

test("aucun en-tête CORS : seule la même origine lit les réponses", async () => {
  const r = await call("GET", "/inconnue");
  assert.equal(r.status, 404);
  assert.equal(r.headers["Access-Control-Allow-Origin"], undefined);
});

test("verrou de session : un second appareil est refusé, puis libéré", async () => {
  assert.equal((await call("POST", "/session/claim", { body: { code: "ABCD-12", client_id: "c_a" } })).status, 200);
  assert.equal((await call("POST", "/session/claim", { body: { code: "ABCD-12", client_id: "c_b" } })).status, 409);
  assert.equal((await call("POST", "/session/heartbeat", { body: { code: "ABCD-12", client_id: "c_b" } })).data.revoked, true);
  await call("POST", "/session/release", { body: { code: "ABCD-12", client_id: "c_a" } });
  assert.equal((await call("POST", "/session/claim", { body: { code: "ABCD-12", client_id: "c_b" } })).status, 200);
});

test("session : un code hors format est refusé", async () => {
  const r = await call("POST", "/session/claim", { body: { code: "x".repeat(500), client_id: "c_a" } });
  assert.equal(r.status, 400);
});

test("avis : un vote autre que up/down est refusé (pas de HTML stocké)", async () => {
  const r = await call("POST", "/feedback", {
    body: { course_id: "course-m11", vote: '"><img src=x onerror=alert(1)>', user_id: "u_X" },
  });
  assert.equal(r.status, 400);
});

test("avis : vote, compte, annulation", async () => {
  await call("POST", "/feedback", { body: { course_id: "course-m1", vote: "up", user_id: "u_ABCD-12", user_name: "Eva" } });
  let r = await call("GET", "/feedback/course-m1", { qs: { user_id: "u_ABCD-12" } });
  assert.deepEqual(r.data, { up: 1, down: 0, mine: "up" });
  await call("POST", "/feedback", { body: { course_id: "course-m1", vote: null, user_id: "u_ABCD-12" } });
  r = await call("GET", "/feedback/course-m1", { qs: { user_id: "u_ABCD-12" } });
  assert.deepEqual(r.data, { up: 0, down: 0, mine: null });
});

test("tableau formateur : refusé sans le code admin", async () => {
  assert.equal((await call("GET", "/feedback/admin")).status, 401);
  assert.equal((await call("GET", "/feedback/admin", { headers: { "X-Lenny-Code": "ABCD-12" } })).status, 401);
});

test("tableau formateur : forme attendue par lenny-stats.js, sans aucun code élève", async (t) => {
  await call("POST", "/feedback", { body: { course_id: "quiz-m4", vote: "down", user_id: "u_SECRET-99", user_name: "Inès" } });
  // Le code admin n'est écrit nulle part dans ce dépôt public : il se passe en
  // variable d'environnement, ADMIN_CODE=… node --test outils/api.test.mjs
  const admin = process.env.ADMIN_CODE;
  if (!admin) { t.skip("ADMIN_CODE absent"); return; }
  const r = await call("GET", "/feedback/admin", { headers: { "x-lenny-code": admin } });
  assert.equal(r.status, 200);
  const row = r.data.rows.find((x) => x.courseId === "quiz-m4");
  assert.deepEqual(row, {
    courseId: "quiz-m4", up: 0, down: 1, total: 1, satisfaction: 0,
    voters: [{ name: "Inès", vote: "down", date: row.voters[0].date }],
  });
  assert.ok(!JSON.stringify(r.data).includes("SECRET-99"), "un code élève a fui");
});

test("duel : codes, semaine et score validés", async () => {
  assert.equal((await call("POST", "/duel/quiz-result", {
    body: { code: "ABCD-12", opponentCode: "EFGH-34", week: "2026-W48", score: 31, timeMs: 1000 },
  })).status, 400);
  await call("POST", "/duel/quiz-result", {
    body: { code: "ABCD-12", opponentCode: "EFGH-34", week: "2026-W48", score: 22, timeMs: 1000 },
  });
  const r = await call("GET", "/duel/quiz-result", { qs: { code: "EFGH-34", opponent: "ABCD-12", week: "2026-W48" } });
  assert.deepEqual(r.data, { result: { score: 22, timeMs: 1000 } });
});

test("erreur interne : le message ne sort pas dans la réponse", async () => {
  stores.set("feedback", null); // fakeStore plantera sur m.has
  const errLog = console.error; console.error = () => {};
  const r = await call("GET", "/feedback/course-m1");
  console.error = errLog;
  stores.delete("feedback");
  assert.equal(r.status, 500);
  assert.deepEqual(r.data, { error: "internal_error" });
});
