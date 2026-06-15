/* ============================================
   LENNY — Couche de données enfichable
   • Par défaut : persistance locale (localStorage) → tout marche hors-ligne.
   • Si window.LENNY_API_BASE est défini (ex: "https://api.monsite.fr"),
     bascule automatiquement sur le backend FastAPI + MongoDB.
   Toutes les méthodes renvoient des Promises.
   Dépend de : MODULES, window.QUIZ / window.STUDY (pour la liste des matières)
   ============================================ */
window.LennyAPI = (function () {
  const DAY = 86400000;
  const base = () => (window.LENNY_API_BASE || "").replace(/\/$/, "");
  const remote = () => !!base();

  // —— identité utilisateur (liée au portail d'accès / code élève) ——
  function auth() { return window.LennyAuth || null; }
  function userId() {
    try {
      const a = auth();
      if (a && a.code) return "u_" + a.code;
      const fromGate = localStorage.getItem("lenny-access-code");
      if (fromGate) return "u_" + fromGate;
      let u = localStorage.getItem("lenny-uid");
      if (!u) { u = "u_" + Math.random().toString(36).slice(2, 10); localStorage.setItem("lenny-uid", u); }
      return u;
    } catch (e) { return "u_anon"; }
  }
  function userName() {
    const a = auth();
    if (a && a.name) return a.name;
    return "Élève";
  }
  function isAdmin() { const a = auth(); return !!(a && a.isAdmin); }

  // Libellé lisible d'un identifiant de contenu (course-m11 → « Financement · Cours »)
  function labelFor(courseId) {
    const mods = window.MODULES || [];
    const m = (id) => (mods.find(x => x.id === id) || {}).short || id;
    if (courseId === "quiz-general") return { label: "Quiz général", type: "quiz" };
    if (courseId.indexOf("course-") === 0) return { label: m(courseId.slice(7)) + " · Cours", type: "course" };
    if (courseId.indexOf("quiz-") === 0) return { label: m(courseId.slice(5)) + " · Quiz", type: "quiz" };
    return { label: courseId, type: "autre" };
  }

  // —— util local storage ——
  function read(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  // Hash déterministe → compteurs de base « communauté » crédibles en local
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0);
  }
  function seedCounts(courseId) {
    const h = hash(courseId);
    return { up: 6 + (h % 34), down: (h >> 5) % 6 }; // up 6..39, down 0..5
  }

  /* ============================================================
     1) AVIS (pouce vert / pouce rouge)
     ============================================================ */
  // Tous les votes, nominatifs : [{ courseId, userId, name, vote, date }]
  const VOTES_KEY = "lenny-feedback-all-v1";

  function readVotes() { return read(VOTES_KEY, []); }
  function writeVotes(v) { write(VOTES_KEY, v); }

  async function sendFeedback(courseId, vote) {
    // vote ∈ 'up' | 'down' | null (null = annulation). Re-clic même pouce = annulation.
    const me = userId();
    const votes = readVotes();
    const idx = votes.findIndex(v => v.courseId === courseId && v.userId === me);
    const prev = idx >= 0 ? votes[idx].vote : null;
    const next = (prev === vote) ? null : vote;
    if (next) {
      const entry = { courseId, userId: me, name: userName(), vote: next, date: new Date().toISOString() };
      if (idx >= 0) votes[idx] = entry; else votes.push(entry);
    } else if (idx >= 0) {
      votes.splice(idx, 1);
    }
    writeVotes(votes);

    if (remote()) {
      try {
        await fetch(base() + "/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ course_id: courseId, vote: next, user_id: me, user_name: userName(), date: new Date().toISOString() }),
        });
      } catch (e) { /* on garde l'état local même si le réseau échoue */ }
    }
    return getFeedback(courseId);
  }

  async function getFeedback(courseId) {
    const me = userId();
    if (remote()) {
      try {
        const r = await fetch(base() + "/api/feedback/" + encodeURIComponent(courseId) + "?user_id=" + encodeURIComponent(me));
        if (r.ok) { const d = await r.json(); return { up: d.up || 0, down: d.down || 0, mine: d.mine ?? null }; }
      } catch (e) {}
    }
    const votes = readVotes().filter(v => v.courseId === courseId);
    const up = votes.filter(v => v.vote === "up").length;
    const down = votes.filter(v => v.vote === "down").length;
    const mineEntry = votes.find(v => v.userId === me);
    return { up, down, mine: mineEntry ? mineEntry.vote : null };
  }

  // —— Tableau de bord formateur : tous les avis, par contenu, nominatifs ——
  async function getFeedbackAdmin() {
    if (remote()) {
      try {
        const r = await fetch(base() + "/api/feedback/admin?user_id=" + encodeURIComponent(userId()));
        if (r.ok) {
          const d = await r.json();
          (d.rows || []).forEach(row => {
            if (!row.label) { const m = labelFor(row.courseId); row.label = m.label; row.type = m.type; }
          });
          return d;
        }
      } catch (e) {}
    }
    const votes = readVotes();
    const byCourse = {};
    votes.forEach(v => {
      (byCourse[v.courseId] = byCourse[v.courseId] || []).push(v);
    });
    const rows = Object.keys(byCourse).map(courseId => {
      const list = byCourse[courseId];
      const up = list.filter(v => v.vote === "up").length;
      const down = list.filter(v => v.vote === "down").length;
      const total = up + down;
      const meta = labelFor(courseId);
      return {
        courseId, label: meta.label, type: meta.type,
        up, down, total,
        satisfaction: total ? Math.round((up / total) * 100) : null,
        voters: list
          .map(v => ({ name: v.name, vote: v.vote, date: v.date }))
          .sort((a, b) => (a.date < b.date ? 1 : -1)),
      };
    });
    return { rows };
  }

  /* ============================================================
     2) HISTORIQUE DES QUIZ (horodaté) → alimente le radar
     ============================================================ */
  const HIST_KEY = "lenny-quiz-history-v1";  // [{ moduleId, correct, total, ts }]

  async function recordQuizResult(res) {
    // res = { moduleId, correct, total }
    const entry = {
      moduleId: res.moduleId || "general",
      correct: res.correct | 0,
      total: Math.max(1, res.total | 0),
      ts: Date.now(),
    };
    const hist = read(HIST_KEY, []);
    hist.push(entry);
    write(HIST_KEY, hist);

    if (remote()) {
      const mod = (window.MODULES || []).find(m => m.id === entry.moduleId);
      try {
        await fetch(base() + "/api/quiz-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...entry, subject: mod ? mod.short : entry.moduleId, user_id: userId(), date: new Date(entry.ts).toISOString() }),
        });
      } catch (e) {}
    }
    return entry;
  }

  // Matières = modules qui possèdent réellement des questions de quiz
  function subjects() {
    const mods = window.MODULES || [];
    return mods.filter(m => {
      const qs = (window.QUIZ && window.QUIZ[m.id]) || (window.STUDY && window.STUDY[m.id] && window.STUDY[m.id].quiz) || [];
      return qs.length > 0;
    }).map(m => ({ id: m.id, label: m.short, color: m.color }));
  }

  function scoreFor(hist, moduleId, start, end) {
    let c = 0, t = 0, n = 0;
    hist.forEach(h => {
      if (h.moduleId === moduleId && h.ts >= start && h.ts < end) { c += h.correct; t += h.total; n++; }
    });
    return { score: t ? Math.round((c / t) * 100) : 0, evaluated: n > 0, sessions: n };
  }

  async function getRadar(period) {
    const p = parseInt(period, 10) || 14;
    if (remote()) {
      try {
        const r = await fetch(base() + "/api/stats/radar?period=" + p + "&user_id=" + encodeURIComponent(userId()));
        if (r.ok) return await r.json();
      } catch (e) {}
    }
    const hist = read(HIST_KEY, []);
    const now = Date.now();
    const curStart = now - p * DAY;
    const prevStart = now - 2 * p * DAY;
    const subs = subjects();
    const current = [], previous = [];
    subs.forEach(s => {
      const cur = scoreFor(hist, s.id, curStart, now + 1);
      const prv = scoreFor(hist, s.id, prevStart, curStart);
      current.push({ id: s.id, subject: s.label, score: cur.score, evaluated: cur.evaluated });
      previous.push({ id: s.id, subject: s.label, score: prv.score, evaluated: prv.evaluated });
    });
    return { period: p, subjects: subs, current, previous };
  }

  /* ============================================================
     Mode démo retiré. Aucune donnée factice n'est amorcée :
     le radar et la progression partent de zéro et ne se remplissent
     qu'avec les vrais résultats de quiz terminés.
     ============================================================ */

  // Nettoyage des avis factices présents (votants de démo, userId préfixé "u_seed_")
  function purgeDemoVotes() {
    const votes = readVotes();
    if (!votes.length) return;
    const real = votes.filter(v => !String(v.userId || "").startsWith("u_seed_"));
    if (real.length !== votes.length) writeVotes(real);
  }

  // Remise à zéro unique du taux d'évolution : on efface l'historique amorcé
  // par l'ancien mode démo (une seule fois) pour repartir d'une ardoise vierge.
  // Les vrais quiz terminés après ce passage s'accumulent normalement.
  function resetEvolutionOnce() {
    if (read("lenny-evolution-reset-v2", false)) return;
    try { localStorage.removeItem(HIST_KEY); } catch (e) {}
    try { localStorage.removeItem("lenny-seeded-v1"); } catch (e) {}
    try { localStorage.removeItem("lenny-votes-seeded-v1"); } catch (e) {}
    write("lenny-evolution-reset-v2", true);
  }
  function seedAll() { resetEvolutionOnce(); purgeDemoVotes(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(seedAll, 0));
  } else { setTimeout(seedAll, 0); }

  return { sendFeedback, getFeedback, getFeedbackAdmin, recordQuizResult, getRadar, subjects, userId, userName, isAdmin, labelFor, remote };
})();
