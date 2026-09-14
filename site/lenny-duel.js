/* ============================================
   LENNY — Duel hebdomadaire (optionnel) contre un autre code
   • Un vrai quiz chronométré : 30 questions piochées dans le contenu réel
     (window.QUIZ / window.STUDY[...].quiz — même source que le Quiz général,
     aucune question inventée), 30 secondes chacune, décompte visible.
   • Score = bonnes réponses ; départage une égalité par le temps total
     (le plus rapide gagne).
   • Deux modes, choisis explicitement, jamais devinés :
     - "bot"  : profil simulé (précision + vitesse déterministes par
       graine), étiqueté « Bot » — jamais présenté comme une personne.
     - "real" : un vrai autre code, asynchrone. Mon résultat est posté sur
       /api/duel/quiz-result, celui de l'adversaire est lu depuis la même
       route (clé = la paire des deux codes + semaine, plusieurs duels
       simultanés possibles). S'il n'a pas encore joué → état honnête,
       jamais un score inventé. Si le réseau échoue → état honnête aussi.
   API : window.LennyDuel.refresh()
   ============================================ */
(function () {
  "use strict";

  const LS = "lenny-duel-v1";
  const QUIZ_LEN = 30;
  const QUESTION_MS = 30000;

  /* ---------- registre des codes connus → prénom (mode "real" uniquement) ---------- */
  const NAMES = {
    "LENNY71!": "Lenny", "JRMY-7K4": "Jeremy", "THIB-7K2": "Thibaut",
    "EDEN-8P3": "Eden", "MANON-71L": "Manon", "DIANE-5R8": "Diane",
    "JOEL-3M7": "Joël", "JOELLE-9K4": "Joëlle", "EVA-6T2": "Eva",
  };
  const CODE_RE = /^[0-9A-ZÀ-Ÿ]{2,}-[0-9A-ZÀ-Ÿ]{2,}$/;
  function knownCode(code) {
    return !!NAMES[code] || CODE_RE.test(code) || code === "LENNY71!";
  }
  function nameFor(code) {
    if (NAMES[code]) return NAMES[code];
    return "Adversaire";
  }
  function initials(name) {
    const p = name.trim().split(/\s+/);
    return ((p[0]?.[0] || "?") + (p[1]?.[0] || "")).toUpperCase();
  }

  /* ---------- semaine ISO ---------- */
  function isoWeekKey(d = new Date()) {
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day);
    const yStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    const wk = Math.ceil((((t - yStart) / 86400000) + 1) / 7);
    return t.getUTCFullYear() + "-W" + String(wk).padStart(2, "0");
  }
  function daysLeft(d = new Date()) {
    const day = (d.getDay() || 7);                // 1..7
    return 7 - day;                                // jours pleins restants
  }

  /* ---------- seed déterministe (mode bot) ---------- */
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0);
  }
  // Précision + vitesse simulées, jamais un vrai élève.
  function botQuizResult(code, week) {
    const seed = hash(code + "|quiz|" + week);
    const score = 8 + (seed % 23);                          // 8..30 bonnes réponses
    const avgMs = 4500 + ((seed >> 6) % 15000);              // 4.5s..19.5s / question en moyenne
    const timeMs = QUIZ_LEN * avgMs;
    return { score, timeMs };
  }

  /* ---------- pioche des questions — même source que le Quiz général ---------- */
  function shuffleArr(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function buildQuizPool() {
    const mods = window.LENNY_MODULES || [];
    const pool = [];
    mods.forEach(m => {
      const qs = (window.QUIZ && window.QUIZ[m.id]) || (window.STUDY && window.STUDY[m.id] && window.STUDY[m.id].quiz) || [];
      qs.forEach(q => {
        if (q && Array.isArray(q.c) && typeof q.r === "number") {
          pool.push({ q: q.q, c: q.c.slice(), r: q.r, e: q.e || "", modShort: m.short || m.title, modColor: m.color });
        }
      });
    });
    return pool;
  }
  function pickQuizQuestions() {
    const pool = shuffleArr(buildQuizPool());
    return pool.slice(0, Math.min(QUIZ_LEN, pool.length)).map(q => {
      const order = shuffleArr(q.c.map((_, i) => i));
      return { q: q.q, c: order.map(i => q.c[i]), r: order.indexOf(q.r), e: q.e, modShort: q.modShort, modColor: q.modColor };
    });
  }

  /* ---------- backend duel réel (résultat de quiz) ---------- */
  function apiBase() { return (window.LENNY_API_BASE || "").replace(/\/$/, ""); }
  function myCode() { return (window.LennyAuth && window.LennyAuth.code) || ""; }

  async function postMyQuizResult(code, week, opponentCode, score, timeMs) {
    if (!code || !opponentCode) return;
    try {
      await fetch(apiBase() + "/api/duel/quiz-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, week, opponentCode, score, timeMs }),
      });
    } catch (e) { /* poster mon propre résultat ne doit jamais bloquer l'affichage */ }
  }
  async function fetchOppQuizResult(code, opponentCode, week) {
    try {
      const r = await fetch(apiBase() + "/api/duel/quiz-result?code=" + encodeURIComponent(code) +
        "&opponent=" + encodeURIComponent(opponentCode) + "&week=" + encodeURIComponent(week));
      if (!r.ok) return { error: true };
      const d = await r.json();
      return { result: (d && d.result) ? { score: d.result.score, timeMs: d.result.timeMs } : null };
    } catch (e) { return { error: true }; }
  }

  /* ---------- état persistant du duel (pas la partie en cours, elle, éphémère) ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(LS) || "null"); } catch (e) { return null; } }
  function save(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }
  function clear() { try { localStorage.removeItem(LS); } catch (e) {} }

  /* ---------- rendu ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function fmtTime(ms) {
    const s = Math.round(ms / 1000);
    const m = Math.floor(s / 60), r = s % 60;
    return m ? (m + "min " + String(r).padStart(2, "0") + "s") : (s + "s");
  }

  function mount() {
    const row = document.getElementById("top10");
    if (!row) return null;
    let m = document.getElementById("duel-mount");
    if (!m) {
      m = document.createElement("div");
      m.id = "duel-mount";
      const head = row.querySelector(".row-head");
      if (head && head.nextSibling) row.insertBefore(m, head.nextSibling);
      else row.appendChild(m);
    }
    return m;
  }

  function ensureLaunchBtn() {
    const row = document.getElementById("top10");
    if (!row) return;
    const head = row.querySelector(".row-head .row-meta");
    if (!head || document.getElementById("duel-launch")) return;
    const btn = document.createElement("button");
    btn.id = "duel-launch"; btn.type = "button"; btn.className = "duel-launch";
    btn.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg> Duel`;
    head.replaceWith((function () {
      const wrap = document.createElement("div");
      wrap.style.cssText = "display:flex;align-items:center;gap:12px;";
      wrap.appendChild(btn);
      const meta = document.createElement("span");
      meta.className = "row-meta"; meta.textContent = "Classement";
      wrap.appendChild(meta);
      return wrap;
    })());
    btn.addEventListener("click", () => {
      const d = load();
      if (QZ) return; // un quiz est en cours : le bouton ne doit rien casser
      if (d && d.code) { clear(); render(); }      // toggle off = retour au classement simple
      else renderModePick();
    });
  }

  /* =========================================================
     Partie en cours — état purement en mémoire (une seule tentative
     par duel : le résultat, une fois posé, est définitif pour la semaine).
     ========================================================= */
  let QZ = null; // { questions, idx, answers:[{picked,ms}], qStart, timerId }

  function clearQzTimer() { if (QZ && QZ.timerId) { clearInterval(QZ.timerId); QZ.timerId = null; } }

  function startQuiz() {
    const questions = pickQuizQuestions();
    if (!questions.length) { alert("Aucune question disponible pour le moment."); return; }
    QZ = { questions, idx: 0, answers: [] };
    renderQuizQuestion();
  }

  function quizHtml() {
    const total = QZ.questions.length;
    const idx = QZ.idx;
    const q = QZ.questions[idx];
    const letters = ["A", "B", "C", "D", "E", "F"];
    const opts = q.c.map((opt, i) =>
      `<button class="duel-quiz-opt" data-i="${i}" type="button"><span class="duel-quiz-opt-l">${letters[i]}</span><span>${esc(opt)}</span></button>`
    ).join("");
    return `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Duel de quiz
          </div>
          <div class="duel-quiz-count">${idx + 1} / ${total}</div>
        </div>
        <div class="duel-quiz-progressbar"><i style="width:${Math.round(idx / total * 100)}%"></i></div>
        <div class="duel-quiz-timerwrap">
          <div class="duel-quiz-timer-track"><div class="duel-quiz-timer-fill" id="duel-quiz-timer-fill"></div></div>
          <div class="duel-quiz-timer-n" id="duel-quiz-timer-n">30</div>
        </div>
        <div class="duel-quiz-tag"><span class="dot" style="background:var(--${esc(q.modColor || "red")}, var(--red))"></span>${esc(q.modShort)}</div>
        <div class="duel-quiz-q">${esc(q.q)}</div>
        <div class="duel-quiz-opts" id="duel-quiz-opts">${opts}</div>
      </div>`;
  }

  function renderQuizQuestion() {
    const m = mount();
    if (!m) return;
    m.innerHTML = quizHtml();
    document.querySelectorAll("#duel-quiz-opts .duel-quiz-opt").forEach(btn => {
      btn.addEventListener("click", () => answerQuiz(parseInt(btn.dataset.i, 10), false));
    });
    QZ.qStart = performance.now();
    tickQuizTimer();
    QZ.timerId = setInterval(tickQuizTimer, 100);
  }

  function tickQuizTimer() {
    if (!QZ) return;
    const elapsed = performance.now() - QZ.qStart;
    const remain = Math.max(0, QUESTION_MS - elapsed);
    const fill = document.getElementById("duel-quiz-timer-fill");
    const num = document.getElementById("duel-quiz-timer-n");
    if (fill) { fill.style.width = (remain / QUESTION_MS * 100) + "%"; fill.classList.toggle("low", remain < 8000); }
    if (num) { num.textContent = Math.ceil(remain / 1000); num.classList.toggle("low", remain < 8000); }
    if (remain <= 0) { clearQzTimer(); answerQuiz(null, true); }
  }

  function answerQuiz(picked, timedOut) {
    if (!QZ || QZ.answers[QZ.idx] != null) return;
    clearQzTimer();
    const q = QZ.questions[QZ.idx];
    const ms = timedOut ? QUESTION_MS : Math.min(QUESTION_MS, Math.round(performance.now() - QZ.qStart));
    QZ.answers[QZ.idx] = { picked, ms };
    const opts = document.querySelectorAll("#duel-quiz-opts .duel-quiz-opt");
    opts.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.r) btn.classList.add("right");
      else if (i === picked) btn.classList.add("wrong");
      else btn.classList.add("dimmed");
    });
    setTimeout(nextQuizQuestion, 550);
  }

  function nextQuizQuestion() {
    if (!QZ) return;
    QZ.idx++;
    if (QZ.idx >= QZ.questions.length) { finishQuiz(); return; }
    renderQuizQuestion();
  }

  function finishQuiz() {
    const score = QZ.answers.reduce((n, a, i) => n + (a && a.picked === QZ.questions[i].r ? 1 : 0), 0);
    const timeMs = QZ.answers.reduce((s, a) => s + (a ? a.ms : QUESTION_MS), 0);
    QZ = null;
    const d = load();
    if (!d) return;
    d.myResult = { score, timeMs };
    save(d);
    render();
  }

  /* =========================================================
     Écrans (prêt à jouer / résultat) — même carte, même plomberie
     que le choix du mode.
     ========================================================= */
  function quizVerdict(me, opp, oppName) {
    if (me.score !== opp.score) {
      return me.score > opp.score
        ? `<span class="duel-verdict win">Tu l'emportes : ${me.score}/30 contre ${opp.score}/30.</span>`
        : `<span class="duel-verdict lose">${esc(oppName)} l'emporte : ${opp.score}/30 contre ${me.score}/30.</span>`;
    }
    if (me.timeMs !== opp.timeMs) {
      return me.timeMs < opp.timeMs
        ? `<span class="duel-verdict win">Égalité à ${me.score}/30 — tu l'emportes au chrono (${fmtTime(me.timeMs)} contre ${fmtTime(opp.timeMs)}).</span>`
        : `<span class="duel-verdict lose">Égalité à ${me.score}/30 — ${esc(oppName)} l'emporte au chrono (${fmtTime(opp.timeMs)} contre ${fmtTime(me.timeMs)}).</span>`;
    }
    return `<span class="duel-verdict tie">Égalité parfaite — même score, même temps au centième près.</span>`;
  }

  // state: "normal" (opp = {score,timeMs}) | "pending" | "unknown" | "errored"
  function resultHtml({ me, myName, opp, oppName, oppTag, state, dl }) {
    const meBarPct = state === "normal" ? Math.round(me.score / Math.max(me.score, opp.score, 1) * 100) : Math.round(me.score / QUIZ_LEN * 100);
    const meSide = `
      <div class="duel-side me">
        <div class="duel-ava ${state === "normal" && me.score > opp.score ? "leader" : ""}">${esc(initials(myName))}</div>
        <div class="duel-name">${esc(myName)}</div>
        <div class="duel-score">${me.score}<small>/30</small></div>
        <div class="duel-quiz-time">${fmtTime(me.timeMs)}</div>
        <div class="duel-bar"><i style="width:${meBarPct}%"></i></div>
      </div>`;

    let oppScoreHtml, oppTimeHtml, oppBarPct, verdictHtml;
    if (state === "normal") {
      oppScoreHtml = `${opp.score}<small>/30</small>`;
      oppTimeHtml = fmtTime(opp.timeMs);
      oppBarPct = Math.round(opp.score / Math.max(me.score, opp.score, 1) * 100);
      verdictHtml = quizVerdict(me, opp, oppName);
    } else if (state === "pending") {
      oppScoreHtml = `<span class="duel-opp-wait">…</span>`; oppTimeHtml = ""; oppBarPct = 0;
      verdictHtml = `<span class="duel-verdict tie">Lecture du résultat de ${esc(oppName)}…</span>`;
    } else if (state === "unknown") {
      oppScoreHtml = `<span class="duel-opp-wait">—</span>`; oppTimeHtml = ""; oppBarPct = 0;
      verdictHtml = `<span class="duel-verdict tie">En attente du résultat de ${esc(oppName)} — il n'a pas encore joué son quiz cette semaine.</span>`;
    } else {
      oppScoreHtml = `<span class="duel-opp-wait">—</span>`; oppTimeHtml = ""; oppBarPct = 0;
      verdictHtml = `<span class="duel-verdict tie">Adversaire injoignable pour l'instant — réessaie plus tard.</span>`;
    }

    const oppSide = `
      <div class="duel-side opp">
        <div class="duel-ava ${state === "normal" && opp.score > me.score ? "leader" : ""}">${esc(initials(oppName))}</div>
        <div class="duel-name">${esc(oppName)}${oppTag ? `<span class="duel-opp-tag">${esc(oppTag)}</span>` : ""}</div>
        <div class="duel-score">${oppScoreHtml}</div>
        <div class="duel-quiz-time">${oppTimeHtml}</div>
        <div class="duel-bar"><i style="width:${oppBarPct}%"></i></div>
      </div>`;

    return `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Résultat du duel
          </div>
          <div class="duel-countdown">${dl > 0 ? dl + " j restants" : "Dernier jour"}</div>
        </div>
        <div class="duel-arena">${meSide}<div class="duel-vs">VS</div>${oppSide}</div>
        <div class="duel-foot">
          ${verdictHtml}
          <div class="duel-actions">
            <button class="duel-mini" id="duel-change" type="button">Changer d'adversaire</button>
            <button class="duel-mini danger" id="duel-stop" type="button">Abandonner</button>
          </div>
        </div>
      </div>`;
  }

  function paintResult(d) {
    const m = mount();
    if (!m) return;
    const myName = (window.LennyAuth && window.LennyAuth.name) || "Moi";
    const dl = daysLeft();

    function paint(opts) {
      m.innerHTML = resultHtml(Object.assign({ me: d.myResult, myName, dl }, opts));
      const ch = document.getElementById("duel-change");
      const st = document.getElementById("duel-stop");
      if (ch) ch.addEventListener("click", renderModePick);
      if (st) st.addEventListener("click", () => { clear(); render(); });
    }

    if (d.mode === "bot") {
      paint({ opp: botQuizResult(d.code, d.week), oppName: "Bot", oppTag: "Bot", state: "normal" });
      return;
    }

    const oppName = d.name || nameFor(d.code);
    paint({ opp: null, oppName, oppTag: null, state: "pending" });

    const code = myCode();
    Promise.all([
      postMyQuizResult(code, d.week, d.code, d.myResult.score, d.myResult.timeMs),
      fetchOppQuizResult(code, d.code, d.week),
    ]).then(([, oppRes]) => {
      const cur = load();
      if (!cur || cur.code !== d.code || cur.week !== d.week || cur.mode !== "real") return; // duel changé entre-temps
      if (oppRes.error) paint({ opp: null, oppName, oppTag: null, state: "errored" });
      else if (!oppRes.result) paint({ opp: null, oppName, oppTag: null, state: "unknown" });
      else paint({ opp: oppRes.result, oppName, oppTag: null, state: "normal" });
    });
  }

  function paintReady(d) {
    const m = mount();
    if (!m) return;
    const oppLabel = d.mode === "bot" ? "un bot" : esc(d.name || nameFor(d.code));
    m.innerHTML = `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Duel de quiz
          </div>
          <div class="duel-countdown">${daysLeft() > 0 ? daysLeft() + " j restants" : "Dernier jour"}</div>
        </div>
        <div class="duel-setup">
          <div class="duel-setup-lead"><b>30 questions</b>, <b>30 secondes</b> chacune, piochées dans le vrai programme. Une seule tentative — ton résultat compte contre ${oppLabel} dès que tu le lances.</div>
          <div class="duel-actions">
            <button class="duel-go" id="duel-start" type="button">Commencer le quiz</button>
            <button class="duel-mini" id="duel-change" type="button">Changer d'adversaire</button>
            <button class="duel-mini danger" id="duel-stop" type="button">Abandonner</button>
          </div>
        </div>
      </div>`;
    const start = document.getElementById("duel-start");
    const ch = document.getElementById("duel-change");
    const st = document.getElementById("duel-stop");
    if (start) start.addEventListener("click", startQuiz);
    if (ch) ch.addEventListener("click", renderModePick);
    if (st) st.addEventListener("click", () => { clear(); render(); });
  }

  function render() {
    ensureLaunchBtn();
    const m = mount();
    if (!m) return;
    if (QZ) return; // ne pas écraser une partie en cours (ex. retour d'onglet)
    const d = load();
    const wk = isoWeekKey();
    if (!d || !d.code || d.week !== wk) {
      if (d && d.code && d.week !== wk) {
        // semaine changée : on garde l'adversaire et le mode, nouveau duel — à rejouer
        save({ code: d.code, name: d.name, mode: d.mode, week: wk, myResult: null });
      }
      m.innerHTML = "";
      return;
    }
    if (!d.myResult) { paintReady(d); return; }
    paintResult(d);
  }

  /* ---------- choix explicite du mode, avant tout code ---------- */
  function renderModePick() {
    const m = mount();
    if (!m) return;
    m.innerHTML = `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Lancer un duel
          </div>
        </div>
        <div class="duel-setup">
          <div class="duel-setup-lead">Choisis ton adversaire cette semaine.</div>
          <div class="duel-mode-pick">
            <button class="duel-mode-btn" id="duel-mode-bot" type="button">
              <span class="duel-mode-btn-t">Défier un bot</span>
              <span class="duel-mode-btn-d">Rythme simulé — jamais une vraie personne</span>
            </button>
            <button class="duel-mode-btn" id="duel-mode-real" type="button">
              <span class="duel-mode-btn-t">Défier un élève par son code</span>
              <span class="duel-mode-btn-d">Un vrai résultat, posté et lu en direct</span>
            </button>
          </div>
          <div class="duel-actions"><button class="duel-mini" id="duel-cancel" type="button">Annuler</button></div>
        </div>
      </div>`;
    const cancel = document.getElementById("duel-cancel");
    if (cancel) cancel.addEventListener("click", () => render());
    const bBot = document.getElementById("duel-mode-bot");
    const bReal = document.getElementById("duel-mode-real");
    // Le bot ne défie personne de réel : aucun code à saisir, on lance direct.
    if (bBot) bBot.addEventListener("click", () => {
      const seed = "BOT-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      save({ code: seed, name: null, mode: "bot", week: isoWeekKey(), myResult: null });
      render();
    });
    if (bReal) bReal.addEventListener("click", () => renderCodeForm("real"));
  }

  function renderCodeForm(mode, prefillErr) {
    const m = mount();
    if (!m) return;
    const myName = (window.LennyAuth && window.LennyAuth.name) || "toi";
    m.innerHTML = `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Défier un élève
          </div>
        </div>
        <div class="duel-setup">
          <div class="duel-setup-lead">Défie un camarade sur un <b>quiz de 30 questions, 30 secondes chacune</b>. Saisis son code d'accès. C'est <b>${esc(myName)}</b> contre lui jusqu'à dimanche soir.</div>
          <div class="duel-form">
            <input class="duel-input" id="duel-input" placeholder="Ex. JRMY-7K4" autocomplete="off" spellcheck="false" maxlength="14">
            <button class="duel-go" id="duel-confirm" type="button">Défier</button>
          </div>
          <div class="duel-err" id="duel-err">${prefillErr ? esc(prefillErr) : ""}</div>
          <div class="duel-hint">Chacun joue son quiz quand il veut cette semaine — les résultats se comparent automatiquement dès que les deux ont joué.</div>
          <div class="duel-actions">
            <button class="duel-mini" id="duel-back" type="button">Changer de mode</button>
            <button class="duel-mini" id="duel-cancel" type="button">Annuler</button>
          </div>
        </div>
      </div>`;

    const input = document.getElementById("duel-input");
    const err = document.getElementById("duel-err");
    const go = document.getElementById("duel-confirm");
    const back = document.getElementById("duel-back");
    const cancel = document.getElementById("duel-cancel");
    if (input) { input.focus(); input.addEventListener("input", () => { input.value = input.value.toUpperCase(); }); }
    function confirm() {
      const code = (input.value || "").trim().toUpperCase().replace(/\s+/g, "");
      const myC = myCode();
      if (!code) { if (err) err.textContent = "Entre un code pour lancer le duel."; return; }
      if (code === myC) { if (err) err.textContent = "Tu ne peux pas te défier toi-même."; return; }
      if (!knownCode(code)) { if (err) err.textContent = "Ce code ne ressemble pas à un code LENNY valide."; return; }
      save({ code, name: nameFor(code), mode: "real", week: isoWeekKey(), myResult: null });
      render();
    }
    if (go) go.addEventListener("click", confirm);
    if (input) input.addEventListener("keydown", (e) => { if (e.key === "Enter") confirm(); });
    if (back) back.addEventListener("click", () => renderModePick());
    if (cancel) cancel.addEventListener("click", () => { render(); });
  }

  function refresh() { render(); }

  function init() {
    if (!document.getElementById("top10")) return;
    render();
    // rafraîchit (jamais pendant une partie en cours) quand on revient sur l'onglet
    document.addEventListener("visibilitychange", () => { if (!document.hidden) render(); });
    window.addEventListener("focus", render);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 260));
  else setTimeout(init, 260);
  document.addEventListener("lenny-auth", () => setTimeout(render, 120));

  window.LennyDuel = { refresh, render, open: renderModePick };
})();
