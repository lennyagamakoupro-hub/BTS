/* ============================================
   LENNY — Quiz général
   Agrège TOUTES les questions de tous les modules.
   Se réinitialise à chaque ouverture (état purement en mémoire).
   Depends on: LENNY_MODULES, window.QUIZ, window.STUDY
   ============================================ */
(function () {
  const S = { questions: [], idx: 0, answers: [] };
  const QUIZ_LENGTH = 30; // nombre de questions par session (tirage aléatoire)

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Mélange l'ordre des réponses d'une question et recale l'index de la bonne réponse
  function shuffleOptions(q) {
    if (!q || !Array.isArray(q.c) || typeof q.r !== "number") return q;
    const order = shuffle(q.c.map((_, i) => i));
    return { ...q, c: order.map(i => q.c[i]), r: order.indexOf(q.r) };
  }

  // Build the full pool — every question from every module, no duplicates
  function buildPool() {
    const mods = (typeof LENNY_MODULES !== "undefined") ? LENNY_MODULES : [];
    const pool = [];
    mods.forEach(m => {
      const qs = (window.QUIZ && window.QUIZ[m.id])
        || (window.STUDY && window.STUDY[m.id] && window.STUDY[m.id].quiz)
        || [];
      qs.forEach(q => {
        if (q && Array.isArray(q.c) && typeof q.r === "number") {
          pool.push(shuffleOptions({ q: q.q, c: q.c, r: q.r, e: q.e || "", mod: m }));
        }
      });
    });
    return pool;
  }

  function colorVar(mod) {
    // mod.color is a token name like "m11" / "mdroit"
    return "var(--" + (mod.color || "red") + ", var(--red))";
  }

  function ensureEl() {
    let el = document.getElementById("lenny-quiz");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-quiz";
    el.innerHTML = '<div class="lq-shell" id="lq-shell"></div>';
    document.body.appendChild(el);
    return el;
  }

  function open() {
    // Fresh state every time → resets after each use
    S.questions = shuffle(buildPool()).slice(0, QUIZ_LENGTH);
    S.idx = 0; S.answers = [];
    if (!S.questions.length) { alert("Aucune question disponible."); return; }
    const el = ensureEl();
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    renderQuestion();
  }

  function close() {
    const el = document.getElementById("lenny-quiz");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
    // wipe state
    S.questions = []; S.idx = 0; S.answers = [];
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Nombre de bonnes réponses parmi les questions déjà répondues
  function correctCount() {
    return S.questions.reduce((n, q, i) => n + (S.answers[i] != null && S.answers[i] === q.r ? 1 : 0), 0);
  }

  function correctionHtml(q, picked) {
    const correct = picked === q.r;
    const L = ["A", "B", "C", "D", "E", "F"];
    const right = `<span class="lq-correction-right">Bonne réponse : <strong>${L[q.r]} — ${esc(q.c[q.r])}</strong></span>`;
    return `
      <div class="lq-correction ${correct ? "good" : "bad"}">
        <div class="lq-correction-h">${correct ? "✓ Bonne réponse" : "✗ Mauvaise réponse"}</div>
        ${correct ? "" : right}
        ${q.e ? `<div class="lq-correction-body">${esc(q.e)}</div>` : ""}
      </div>`;
  }

  function header() {
    const total = S.questions.length;
    const pctDone = Math.round((S.idx / total) * 100);
    return `
      <div class="lq-top">
        <div class="lq-brand">Quiz général · BTS Transaction</div>
        <button class="lq-close" id="lq-close" aria-label="Fermer">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
        </button>
      </div>
      <div class="lq-progress"><i style="width:${pctDone}%"></i></div>`;
  }

  function renderQuestion() {
    const shell = document.getElementById("lq-shell");
    const total = S.questions.length;
    const q = S.questions[S.idx];
    const mod = q.mod;
    const picked = S.answers[S.idx];
    const answered = picked != null;
    shell.style.setProperty("--mc", "");
    const letters = ["A", "B", "C", "D", "E", "F"];
    const opts = q.c.map((opt, i) => {
      let cls = "";
      if (answered) {
        if (i === q.r) cls = " right";
        else if (i === picked) cls = " wrong";
        else cls = " dimmed";
      }
      return `<button class="lq-opt${cls}" data-i="${i}"${answered ? " disabled" : ""}><span class="lq-opt-letter">${letters[i]}</span><span>${esc(opt)}</span></button>`;
    }).join("");

    shell.innerHTML = header() + `
      <div class="lq-counter">
        <span class="lq-tag"><span class="dot" style="background:${colorVar(mod)}"></span>${esc(mod.short || mod.title)}</span>
        <span>Question <span class="lq-score">${S.idx + 1}</span> / ${total} · Score ${correctCount()}</span>
      </div>
      <div class="lq-question">${esc(q.q)}</div>
      <div class="lq-options" id="lq-options">${opts}</div>
      <div id="lq-correction-slot">${answered ? correctionHtml(q, picked) : ""}</div>
      <div class="lq-foot">
        <button class="lq-back" id="lq-back"${S.idx === 0 ? " disabled" : ""}>← Précédent</button>
        <button class="lq-next" id="lq-next"${answered ? "" : " disabled"}>${S.idx + 1 === total ? "Voir le score →" : "Question suivante →"}</button>
      </div>`;

    document.getElementById("lq-close").addEventListener("click", close);
    document.getElementById("lq-next").addEventListener("click", advance);
    document.getElementById("lq-back").addEventListener("click", back);
    document.querySelectorAll(".lq-opt").forEach(btn => {
      btn.addEventListener("click", () => pick(parseInt(btn.dataset.i, 10)));
    });
    document.getElementById("lenny-quiz").scrollTop = 0;
  }

  function pick(i) {
    if (S.answers[S.idx] != null) return;
    S.answers[S.idx] = i;
    renderQuestion();
    const next = document.getElementById("lq-next");
    if (next) next.focus();
  }

  function advance() {
    if (S.answers[S.idx] == null) return;
    if (S.idx + 1 >= S.questions.length) return renderResult();
    S.idx++;
    renderQuestion();
  }

  function back() {
    if (S.idx === 0) return;
    S.idx--;
    renderQuestion();
  }

  // Regroupe les réponses par module et enregistre un résultat horodaté chacun
  function recordResults() {
    if (!window.LennyAPI) return;
    const byMod = {};
    S.questions.forEach((q, i) => {
      const id = q.mod && q.mod.id; if (!id) return;
      const a = S.answers[i];
      if (a == null) return;
      byMod[id] = byMod[id] || { correct: 0, total: 0 };
      byMod[id].total++;
      if (a === q.r) byMod[id].correct++;
    });
    Object.keys(byMod).forEach(id => {
      LennyAPI.recordQuizResult({ moduleId: id, correct: byMod[id].correct, total: byMod[id].total });
    });
  }

  function renderResult() {
    const shell = document.getElementById("lq-shell");
    const total = S.questions.length;
    const score = correctCount();
    const pct = Math.round((score / total) * 100);
    const msg = pct === 100 ? "Sans-faute. Chapeau."
      : pct >= 75 ? "Excellent — tu maîtrises l'essentiel."
      : pct >= 50 ? "Pas mal. Quelques points à revoir."
      : "À retravailler — relance un tirage.";
    const wrong = S.questions
      .map((q, i) => ({ q, picked: S.answers[i] }))
      .filter(x => x.picked != null && x.picked !== x.q.r);
    const recap = wrong.length ? `
      <div class="lq-recap">
        <div class="lq-recap-h">À revoir — ${wrong.length} question${wrong.length > 1 ? "s" : ""}</div>
        ${wrong.map(w => `
          <div class="lq-recap-row">
            <div class="lq-recap-mod">${esc(w.q.mod.short || w.q.mod.title)}</div>
            <div class="lq-recap-q">${esc(w.q.q)}</div>
            <div class="lq-recap-a"><span class="tag">Bonne réponse</span>${esc(w.q.c[w.q.r])}</div>
          </div>`).join("")}
      </div>` : "";

    shell.innerHTML = header() + `
      <div class="lq-result">
        <div class="lq-result-score">${score}<span> / ${total}</span></div>
        <div class="lq-result-pct">${pct}% de réussite</div>
        <div class="lq-result-msg">${msg}</div>
        <div class="lq-result-actions">
          <button class="lq-btn lq-btn-primary" id="lq-restart">↻ Refaire le quiz</button>
          <button class="lq-btn lq-btn-ghost" id="lq-finish">Terminer</button>
        </div>
        ${recap}
        <div id="lq-feedback-slot"></div>
      </div>`;
    // Historique horodaté par module (alimente le radar) + avis
    recordResults();
    if (window.LennyFeedback) {
      const slot = shell.querySelector("#lq-feedback-slot");
      if (slot) window.LennyFeedback.mount(slot, "quiz-general", { label: "Ce quiz était-il pertinent ?" });
    }
    // progress full
    const bar = shell.querySelector(".lq-progress i");
    if (bar) bar.style.width = "100%";
    document.getElementById("lq-close").addEventListener("click", close);
    document.getElementById("lq-restart").addEventListener("click", open); // fresh reshuffle = reset
    document.getElementById("lq-finish").addEventListener("click", close);
    document.getElementById("lenny-quiz").scrollTop = 0;
  }

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const el = document.getElementById("lenny-quiz");
      if (el && el.classList.contains("open")) close();
    }
  });

  window.LennyQuiz = { open, close };
})();
