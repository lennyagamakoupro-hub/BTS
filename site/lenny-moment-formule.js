/* ============================================
   LENNY — « Le môment formule » · MODE PARCOURS
   Une carte de niveaux (1 niveau = 1 thème). On débloque les thèmes les uns
   après les autres ; chaque niveau se réussit en 1 à 3 étoiles selon le score.
   Jouable en continu (aucune attente). 6 mini-jeux mélangés :
     QCM · Reconstruction · Texte à trou · Vrai/Faux éclair · Mini-calcul chrono · Associer.
   Persistance locale par utilisateur. API : window.LennyMoment.open()
   Dépend de : window.LENNY_MF (lenny-moment-formule-data.js), LennyAPI (optionnel)
   ============================================ */
(function () {

  /* ---------- données ---------- */
  function DATA() { return window.LENNY_MF || { poles: {}, cards: [] }; }
  function cards() { return DATA().cards || []; }
  function poleInfo(p) { return (DATA().poles && DATA().poles[p]) || { label: p, accent: "#d8a43c" }; }

  // Niveaux = groupes (grp), dans l'ordre d'apparition, pôle par pôle.
  function levels() {
    const out = [], byId = {};
    cards().forEach(c => {
      if (!byId[c.grp]) { byId[c.grp] = { id: c.grp, label: c.grp, pole: c.pole, cards: [] }; out.push(byId[c.grp]); }
      byId[c.grp].cards.push(c);
    });
    return out;
  }

  /* ---------- identité + stockage ---------- */
  function uid() { try { return (window.LennyAPI && LennyAPI.userId()) || "u_anon"; } catch (e) { return "u_anon"; } }
  const KEY = () => "lenny-mf-lvl::" + uid();
  function load() { try { return JSON.parse(localStorage.getItem(KEY())) || { stars: {} }; } catch (e) { return { stars: {} }; } }
  function save(s) { try { localStorage.setItem(KEY(), JSON.stringify(s)); } catch (e) {} }
  function starsOf(id) { const s = load(); return (s.stars && s.stars[id]) || 0; }
  function setStars(id, n) { const s = load(); s.stars = s.stars || {}; s.stars[id] = Math.max(s.stars[id] || 0, n); save(s); }
  function isUnlocked(i, L) { return i === 0 || starsOf(L[i - 1].id) >= 1; }
  function totalStars() { const s = load(); return Object.keys(s.stars || {}).reduce((a, k) => a + (s.stars[k] || 0), 0); }

  /* ---------- utilitaires ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function hasOp(s) { return /[÷×]/.test(s) || /[+−]/.test(s); }
  function corrupt(full) {
    let s = full;
    if (/÷/.test(s)) s = s.replace("÷", "×");
    else if (/×/.test(s)) s = s.replace("×", "÷");
    else if (/\+/.test(s)) s = s.replace("+", "−");
    else if (/−/.test(s)) s = s.replace("−", "+");
    return s;
  }

  /* ---------- types de jeu disponibles ---------- */
  function availTypes(card) {
    const t = ["qcm"];
    if (card.tokens && card.tokens.length >= 2) t.push("build", "fill");
    if (card.full && hasOp(card.full)) t.push("tf");
    if (card.calc) t.push("calc");
    return t;
  }

  /* ---------- construction d'un niveau ---------- */
  function qcmData(card) {
    if (card.qcm) {
      const order = shuffle(card.qcm.options.map((_, i) => i));
      return { ask: card.qcm.ask || card.situation, opts: order.map(i => card.qcm.options[i]), right: order.indexOf(card.qcm.answer) };
    }
    const others = cards().filter(c => c.pole === card.pole && c.id !== card.id);
    const picks = shuffle(others).slice(0, 3).map(c => c.name);
    const all = shuffle([card.name].concat(picks));
    return { ask: card.situation, opts: all, right: all.indexOf(card.name) };
  }
  function fillData(card) {
    const toks = card.tokens;
    const bi = Math.floor(Math.random() * toks.length);
    const answer = toks[bi];
    let pool = [];
    cards().filter(c => c.pole === card.pole && c.tokens).forEach(c => c.tokens.forEach(t => { if (t !== answer) pool.push(t); }));
    ["×", "÷", "+", "−", "× 100", "(1 + t)", "÷ 12"].forEach(g => { if (g !== answer) pool.push(g); });
    pool = [...new Set(pool)];
    const distract = shuffle(pool).slice(0, 3);
    const opts = shuffle([answer].concat(distract));
    return { blank: bi, opts, right: opts.indexOf(answer), answer };
  }
  function tfData(card) {
    const isTrue = Math.random() < 0.5;
    return { isTrue, statement: isTrue ? card.full : corrupt(card.full) };
  }
  function makeSlot(type, card) {
    if (type === "qcm") return { type, card, q: qcmData(card) };
    if (type === "build") return { type, card, bank: shuffle(card.tokens.map((t, i) => ({ t, i }))), placed: [] };
    if (type === "fill") return Object.assign({ type, card }, fillData(card));
    if (type === "tf") return Object.assign({ type, card }, tfData(card));
    if (type === "calc") return { type, card };
    return { type, card };
  }
  function buildLevel(level) {
    let slots = [];
    level.cards.forEach(card => {
      const types = shuffle(availTypes(card)).slice(0, Math.min(2, availTypes(card).length));
      types.forEach(t => slots.push(makeSlot(t, card)));
    });
    slots = shuffle(slots);
    const CAP = 9;
    if (slots.length > CAP) slots = slots.slice(0, CAP);
    // garantir un minimum de manches même pour un thème à 1 formule
    if (slots.length < 4) {
      level.cards.forEach(card => availTypes(card).forEach(t => {
        if (slots.length < 5 && !slots.some(s => s.card === card && s.type === t)) slots.push(makeSlot(t, card));
      }));
    }
    // manche bonus « associer » si assez de formules
    const memCards = level.cards.filter(c => c.full && c.situation);
    if (memCards.length >= 3) slots.push({ type: "memory", cards: shuffle(memCards).slice(0, Math.min(4, memCards.length)) });
    return slots;
  }

  /* ---------- état runtime ---------- */
  const R = { view: "map", filter: null, level: null, li: 0, slots: [], idx: 0,
              score: { correct: 0, total: 0 }, answered: false, correctNow: false,
              pick: null, calcVal: "", mem: null, timer: null };

  function ensureEl() {
    let el = document.getElementById("lenny-moment");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-moment";
    el.innerHTML = '<div class="mf-shell" id="mf-shell"></div>';
    document.body.appendChild(el);
    return el;
  }
  function open(filter) {
    R.filter = filter || null;
    R.view = "map";
    const el = ensureEl(); el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    renderMap();
  }
  function close() {
    clearTimer();
    const el = document.getElementById("lenny-moment");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
    refreshSurfaces();
  }

  /* ============================================================
     CARTE DES NIVEAUX
     ============================================================ */
  function star(filled) {
    return '<svg class="mf-star ' + (filled ? "on" : "off") + '" viewBox="0 0 24 24"><path d="M12 2.6l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.6l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93z"/></svg>';
  }
  function nodeStars(n) { return '<span class="mf-node-stars">' + star(n >= 1) + star(n >= 2) + star(n >= 3) + '</span>'; }

  function renderMap() {
    clearTimer();
    const shell = document.getElementById("mf-shell");
    const L = levels();
    const tot = totalStars(), max = L.length * 3;
    // sections par pôle, dans l'ordre
    const order = [];
    L.forEach((lv, i) => { if (order.indexOf(lv.pole) === -1) order.push(lv.pole); });
    let html = "";
    html += '<div class="mf-top">' +
      '<div class="mf-brand"><span class="mf-brand-dot"></span>Le môment formule</div>' +
      '<button class="mf-close" id="mf-close" aria-label="Fermer"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg></button>' +
    '</div>';
    html += '<div class="mf-map-head">' +
      '<h2 class="mf-map-title">Parcours des formules</h2>' +
      '<p class="mf-map-sub">Réussis un thème pour débloquer le suivant. Vise les 3 étoiles ⭐</p>' +
      '<div class="mf-map-score">' + star(true) + '<span>' + tot + ' / ' + max + '</span></div>' +
      '<button class="mf-exos-cta" id="mf-exos-cta" type="button">' +
        '<span class="mf-exos-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5h11M4 9h11M4 13.5h7"/><path d="M16.5 14.5l2 2 3.5-4"/></svg></span>' +
        '<span class="mf-exos-txt"><strong>Exercices types corrigés</strong><span>21 dossiers complets + entraînement aux formules</span></span>' +
        '<span class="mf-exos-go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></span>' +
      '</button>' +
    '</div>';

    order.forEach(pole => {
      const pi = poleInfo(pole);
      html += '<section class="mf-map-sec" style="--mf-accent:' + pi.accent + '">' +
        '<div class="mf-sec-h"><span class="mf-sec-chip">' + esc(pi.label) + '</span></div>' +
        '<div class="mf-path" id="mf-path-' + esc(pole) + '">';
      L.forEach((lv, i) => {
        if (lv.pole !== pole) return;
        const st = starsOf(lv.id);
        const unlocked = isUnlocked(i, L);
        const done = st >= 1;
        const cls = "mf-node" + (unlocked ? "" : " locked") + (done ? " done" : "") + (unlocked && !done ? " ready" : "");
        const num = (L.filter((x, j) => x.pole === pole && j <= i).length);
        html += '<button class="' + cls + '" data-li="' + i + '"' + (unlocked ? "" : " aria-disabled=\"true\"") + '>' +
          '<span class="mf-node-disc">' +
            (unlocked
              ? '<span class="mf-node-num">' + num + '</span>'
              : '<svg class="mf-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>') +
          '</span>' +
          '<span class="mf-node-body">' +
            '<span class="mf-node-label">' + esc(lv.label) + '</span>' +
            (unlocked ? nodeStars(st) : '<span class="mf-node-sub">Verrouillé</span>') +
          '</span>' +
          '<span class="mf-node-count">' + lv.cards.length + ' formule' + (lv.cards.length > 1 ? "s" : "") + '</span>' +
        '</button>';
      });
      html += '</div></section>';
    });

    shell.innerHTML = html;
    shell.scrollTop = 0;
    document.getElementById("mf-close").addEventListener("click", close);
    var exosCta = document.getElementById("mf-exos-cta");
    if (exosCta) exosCta.addEventListener("click", function () {
      if (window.LennyExos) { close(); setTimeout(function () { LennyExos.open(); }, 180); }
    });
    shell.querySelectorAll(".mf-node").forEach(btn => btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.li, 10);
      if (!isUnlocked(i, L)) { btn.classList.remove("shake"); void btn.offsetWidth; btn.classList.add("shake"); return; }
      startLevel(i);
    }));
    R.filter = null;
    document.getElementById("lenny-moment").scrollTop = 0;
  }

  /* ============================================================
     DÉROULÉ D'UN NIVEAU
     ============================================================ */
  function startLevel(i) {
    const L = levels();
    R.level = L[i]; R.li = i;
    R.slots = buildLevel(R.level);
    R.idx = 0; R.score = { correct: 0, total: R.slots.length };
    R.view = "play";
    const sh = document.getElementById("mf-shell");
    sh.style.setProperty("--mf-accent", poleInfo(R.level.pole).accent);
    startSlot();
  }

  function startSlot() {
    clearTimer();
    R.answered = false; R.correctNow = false; R.pick = null; R.calcVal = "";
    const slot = R.slots[R.idx];
    if (slot.type === "memory") R.mem = { sel: null, matched: {}, mistakes: 0, pairs: slot.cards.length,
                                          left: shuffle(slot.cards), right: shuffle(slot.cards) };
    renderPlay();
  }

  function playHeader() {
    const pct = Math.round((R.idx / R.slots.length) * 100);
    return '<div class="mf-top">' +
      '<button class="mf-back" id="mf-back" aria-label="Carte des niveaux"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4 6 9l5 5"/></svg></button>' +
      '<div class="mf-level-name">' + esc(R.level.label) + '</div>' +
      '<button class="mf-close" id="mf-close" aria-label="Fermer"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg></button>' +
    '</div>' +
    '<div class="mf-progress"><i style="width:' + pct + '%"></i></div>';
  }
  const MODE_LABEL = { qcm: "Quelle formule ?", build: "Reconstruis", fill: "Texte à trou", tf: "Vrai ou faux ?", calc: "Mini-calcul", memory: "Associe les paires" };

  function renderPlay() {
    const slot = R.slots[R.idx];
    const shell = document.getElementById("mf-shell");
    let body, foot = "";
    if (slot.type === "qcm") body = gQcm(slot);
    else if (slot.type === "build") body = gBuild(slot);
    else if (slot.type === "fill") body = gFill(slot);
    else if (slot.type === "tf") body = gTf(slot);
    else if (slot.type === "calc") body = gCalc(slot);
    else body = gMemory(slot);

    const isLast = R.idx + 1 >= R.slots.length;
    if (R.answered) {
      const label = isLast ? "Voir le résultat →" : "Suivante →";
      foot = '<button class="mf-next" id="mf-next">' + label + '</button>';
    } else if (slot.type === "build") {
      foot = '<button class="mf-next" id="mf-check"' + (slot.placed.length === slot.card.tokens.length ? "" : " disabled") + '>Vérifier</button>';
    } else if (slot.type === "calc") {
      foot = '<button class="mf-next" id="mf-check">Valider</button>';
    }

    const counter = slot.type === "memory" ? "" :
      '<div class="mf-counter">' +
        '<span class="mf-mode">' + esc(MODE_LABEL[slot.type]) + '</span>' +
        '<span class="mf-count">' + (R.idx + 1) + ' / ' + R.slots.length + ' · ' + R.score.correct + ' ✓</span>' +
      '</div>';

    shell.innerHTML = playHeader() + counter +
      '<div class="mf-body">' + body + '</div>' +
      '<div class="mf-foot">' + foot + '</div>';

    document.getElementById("mf-close").addEventListener("click", close);
    document.getElementById("mf-back").addEventListener("click", renderMap);
    bindSlot(slot);
    const nx = document.getElementById("mf-next"); if (nx) nx.addEventListener("click", advance);
    document.getElementById("lenny-moment").scrollTop = 0;
    // démarre le chrono pour V/F et calcul
    if (!R.answered && slot.type === "tf") startTimer(10, () => grade(slot, false));
    if (!R.answered && slot.type === "calc") startTimer(30, () => checkCalc(slot, true));
  }

  /* ---------- chrono ---------- */
  function clearTimer() { if (R.timer) { clearInterval(R.timer); R.timer = null; } }
  function startTimer(seconds, onExpire) {
    clearTimer();
    const body = document.querySelector("#mf-shell .mf-body");
    if (!body) return;
    const bar = document.createElement("div"); bar.className = "mf-timer"; bar.innerHTML = '<i></i>';
    body.insertBefore(bar, body.firstChild);
    let left = seconds * 1000; const start = Date.now(); const fill = bar.querySelector("i");
    R.timer = setInterval(() => {
      left = seconds * 1000 - (Date.now() - start);
      const pct = Math.max(0, left / (seconds * 1000) * 100);
      if (fill) { fill.style.width = pct + "%"; fill.classList.toggle("low", pct < 30); }
      if (left <= 0) { clearTimer(); if (!R.answered) onExpire(); }
    }, 80);
  }

  /* ============================================================
     MINI-JEUX
     ============================================================ */
  const LETTERS = ["A", "B", "C", "D", "E"];

  function gQcm(slot) {
    const q = slot.q;
    const opts = q.opts.map((opt, i) => {
      let cls = "";
      if (R.answered) { if (i === q.right) cls = " right"; else if (i === R.pick) cls = " wrong"; else cls = " dimmed"; }
      return '<button class="mf-opt' + cls + '" data-i="' + i + '"' + (R.answered ? " disabled" : "") + '><span class="mf-opt-letter">' + LETTERS[i] + '</span><span>' + esc(opt) + '</span></button>';
    }).join("");
    return '<div class="mf-prompt">' + esc(q.ask) + '</div>' +
      '<div class="mf-opts">' + opts + '</div>' +
      '<div id="mf-reveal">' + (R.answered ? reveal(slot.card, R.correctNow) : '') + '</div>';
  }

  function gBuild(slot) {
    const card = slot.card;
    const placed = slot.placed.map((tok, pos) => '<button class="mf-token placed" data-pos="' + pos + '"' + (R.answered ? " disabled" : "") + '>' + esc(tok.t) + '</button>').join("");
    const used = slot.placed.map(t => t.i);
    const bank = slot.bank.filter(b => used.indexOf(b.i) === -1).map(b => '<button class="mf-token" data-i="' + b.i + '"' + (R.answered ? " disabled" : "") + '>' + esc(b.t) + '</button>').join("");
    return '<div class="mf-prompt mf-prompt-build">' + esc(card.situation) + '</div>' +
      '<div class="mf-slot' + (slot.placed.length ? '' : ' empty') + '" id="mf-slot">' +
        (slot.placed.length ? '<span class="mf-slot-lhs">' + esc(card.lhs) + '</span>' + placed : '<span class="mf-slot-lhs">' + esc(card.lhs) + '</span><span class="mf-slot-hint">touche les éléments dans l\'ordre…</span>') +
      '</div>' +
      '<div class="mf-bank" id="mf-bank">' + bank + '</div>' +
      '<div id="mf-reveal">' + (R.answered ? reveal(card, R.correctNow) : '') + '</div>';
  }

  function gFill(slot) {
    const card = slot.card;
    const parts = card.tokens.map((t, i) => i === slot.blank
      ? (R.answered ? '<span class="mf-fill-blank filled">' + esc(card.tokens[slot.blank]) + '</span>' : '<span class="mf-fill-blank">?</span>')
      : '<span class="mf-fill-tok">' + esc(t) + '</span>').join(' ');
    const opts = slot.opts.map((opt, i) => {
      let cls = "";
      if (R.answered) { if (i === slot.right) cls = " right"; else if (i === R.pick) cls = " wrong"; else cls = " dimmed"; }
      return '<button class="mf-opt' + cls + '" data-i="' + i + '"' + (R.answered ? " disabled" : "") + '><span class="mf-opt-letter">' + LETTERS[i] + '</span><span>' + esc(opt) + '</span></button>';
    }).join("");
    return '<div class="mf-prompt mf-prompt-build">Complète la formule — ' + esc(card.name) + '</div>' +
      '<div class="mf-fill-line"><span class="mf-slot-lhs">' + esc(card.lhs) + '</span> ' + parts + '</div>' +
      '<div class="mf-opts">' + opts + '</div>' +
      '<div id="mf-reveal">' + (R.answered ? reveal(card, R.correctNow) : '') + '</div>';
  }

  function gTf(slot) {
    const card = slot.card;
    return '<div class="mf-prompt mf-prompt-build">Cette formule est-elle correcte ?</div>' +
      '<div class="mf-tf-card">' + esc(card.name) + '<pre class="mf-tf-formula">' + esc(slot.statement) + '</pre></div>' +
      '<div class="mf-tf-btns">' +
        '<button class="mf-tf-btn vrai" data-v="1"' + (R.answered ? " disabled" : "") + '>✓ Vrai</button>' +
        '<button class="mf-tf-btn faux" data-v="0"' + (R.answered ? " disabled" : "") + '>✗ Faux</button>' +
      '</div>' +
      '<div id="mf-reveal">' + (R.answered ? reveal(card, R.correctNow) : '') + '</div>';
  }

  function gCalc(slot) {
    const card = slot.card;
    return '<div class="mf-prompt">' + esc(card.calc.ask) + '</div>' +
      '<div class="mf-calc-row">' +
        '<input id="mf-calc-input" class="mf-calc-input" type="text" inputmode="decimal" autocomplete="off" placeholder="Ta réponse"' + (R.answered ? " disabled" : "") + ' value="' + esc(R.calcVal || "") + '" />' +
        '<span class="mf-calc-unit">' + esc(card.calc.unit || "") + '</span>' +
      '</div>' +
      (card.calc.hint ? '<button class="mf-hint-btn" id="mf-hint" type="button">Indice</button><div class="mf-hint" id="mf-hint-txt" hidden>' + esc(card.calc.hint) + '</div>' : '') +
      '<div id="mf-reveal">' + (R.answered ? reveal(card, R.correctNow) : '') + '</div>';
  }

  function gMemory(slot) {
    const m = R.mem;
    const colL = m.left.map(c => {
      const done = m.matched[c.id];
      const sel = m.sel === c.id;
      return '<button class="mf-mem-cell' + (done ? " ok" : "") + (sel ? " sel" : "") + '" data-side="L" data-id="' + esc(c.id) + '"' + (done ? " disabled" : "") + '>' + esc(c.name) + '</button>';
    }).join("");
    const colR = m.right.map(c => {
      const done = m.matched[c.id];
      return '<button class="mf-mem-cell mono' + (done ? " ok" : "") + '" data-side="R" data-id="' + esc(c.id) + '"' + (done ? " disabled" : "") + '>' + esc(c.full) + '</button>';
    }).join("");
    const allDone = Object.keys(m.matched).length >= m.pairs;
    return '<div class="mf-prompt mf-prompt-build">Associe chaque intitulé à sa formule</div>' +
      '<div class="mf-mem">' +
        '<div class="mf-mem-col">' + colL + '</div>' +
        '<div class="mf-mem-col">' + colR + '</div>' +
      '</div>' +
      (allDone ? '<div id="mf-reveal">' + reveal(null, R.correctNow, "Paires associées — " + (m.pairs - m.mistakes) + "/" + m.pairs + " du premier coup.") + '</div>' : '');
  }

  /* ---------- correction ---------- */
  function reveal(card, ok, customMsg) {
    const head = '<div class="mf-reveal-h">' + (ok ? "✓ Juste" : "✗ Raté") + '</div>';
    if (!card) {
      return '<div class="mf-reveal ' + (ok ? "good" : "bad") + '">' + head + (customMsg ? '<div class="mf-note">' + esc(customMsg) + '</div>' : '') + '</div>';
    }
    const recap = (card.recap || []).map(l => '<div class="mf-recap-line">' + esc(l) + '</div>').join("");
    const full = card.full ? '<pre class="mf-formula">' + esc(card.full) + '</pre>' : '';
    return '<div class="mf-reveal ' + (ok ? "good" : "bad") + '">' + head +
      '<div class="mf-reveal-name">' + esc(card.name) + '</div>' + full +
      (recap ? '<div class="mf-recap">' + recap + '</div>' : '') +
      (card.note ? '<div class="mf-note">' + esc(card.note) + '</div>' : '') +
    '</div>';
  }

  /* ---------- liaisons + validation ---------- */
  function bindSlot(slot) {
    if (slot.type === "qcm") {
      qa(".mf-opt").forEach(b => b.addEventListener("click", () => { if (R.answered) return; R.pick = +b.dataset.i; grade(slot, R.pick === slot.q.right); }));
    } else if (slot.type === "fill") {
      qa(".mf-opt").forEach(b => b.addEventListener("click", () => { if (R.answered) return; R.pick = +b.dataset.i; grade(slot, R.pick === slot.right); }));
    } else if (slot.type === "build") {
      qa("#mf-bank .mf-token").forEach(b => b.addEventListener("click", () => { if (R.answered) return; slot.placed.push(slot.bank.find(x => x.i === +b.dataset.i)); renderPlay(); }));
      qa("#mf-slot .mf-token.placed").forEach(b => b.addEventListener("click", () => { if (R.answered) return; slot.placed.splice(+b.dataset.pos, 1); renderPlay(); }));
      const c = document.getElementById("mf-check"); if (c) c.addEventListener("click", () => checkBuild(slot));
    } else if (slot.type === "tf") {
      qa(".mf-tf-btn").forEach(b => b.addEventListener("click", () => { if (R.answered) return; clearTimer(); const said = b.dataset.v === "1"; grade(slot, said === slot.isTrue); }));
    } else if (slot.type === "calc") {
      const c = document.getElementById("mf-check"); if (c) c.addEventListener("click", () => checkCalc(slot));
      const inp = document.getElementById("mf-calc-input");
      if (inp) { inp.addEventListener("input", () => R.calcVal = inp.value); inp.addEventListener("keydown", e => { if (e.key === "Enter") checkCalc(slot); }); setTimeout(() => inp.focus(), 60); }
      const h = document.getElementById("mf-hint"); if (h) h.addEventListener("click", () => { const t = document.getElementById("mf-hint-txt"); if (t) t.hidden = false; h.style.display = "none"; });
    } else if (slot.type === "memory") {
      qa(".mf-mem-cell").forEach(b => b.addEventListener("click", () => memPick(slot, b)));
    }
  }
  function qa(sel) { return [...document.querySelectorAll("#mf-shell " + sel)]; }

  function grade(slot, ok) {
    clearTimer();
    R.answered = true; R.correctNow = ok;
    if (ok) R.score.correct++;
    renderPlay();
    const n = document.getElementById("mf-next"); if (n) n.focus();
  }
  function checkBuild(slot) {
    if (R.answered || slot.placed.length !== slot.card.tokens.length) return;
    const ok = slot.placed.every((tok, pos) => tok.i === pos);
    R.answered = true; R.correctNow = ok; if (ok) R.score.correct++;
    renderPlay();
    const slotEl = document.getElementById("mf-slot");
    if (slotEl) slotEl.querySelectorAll(".mf-token.placed").forEach((el, pos) => el.classList.add(slot.placed[pos].i === pos ? "ok" : "ko"));
    const n = document.getElementById("mf-next"); if (n) n.focus();
  }
  function checkCalc(slot, expired) {
    if (R.answered) return;
    clearTimer();
    const raw = (R.calcVal || "").trim().replace(/\s/g, "").replace(/€|%|j/gi, "").replace(",", ".");
    const val = parseFloat(raw);
    const ok = !expired && isFinite(val) && Math.abs(val - slot.card.calc.answer) <= (slot.card.calc.tol || 0);
    R.answered = true; R.correctNow = ok; if (ok) R.score.correct++;
    renderPlay();
    const n = document.getElementById("mf-next"); if (n) n.focus();
  }
  function memPick(slot, btn) {
    const m = R.mem; const id = btn.dataset.id; const side = btn.dataset.side;
    if (m.matched[id]) return;
    if (side === "L") { m.sel = (m.sel === id ? null : id); renderPlay(); return; }
    // côté R
    if (!m.sel) { return; }
    if (m.sel === id) { m.matched[id] = true; m.sel = null; }
    else { m.mistakes++; btn.classList.add("flash"); setTimeout(() => { renderPlay(); }, 260); m.sel = null; return; }
    if (Object.keys(m.matched).length >= m.pairs) {
      const ok = m.mistakes <= m.pairs;
      R.answered = true; R.correctNow = ok; if (ok) R.score.correct++;
    }
    renderPlay();
    const n = document.getElementById("mf-next"); if (n) n.focus();
  }

  function advance() {
    clearTimer();
    if (R.idx + 1 >= R.slots.length) return finishLevel();
    R.idx++; startSlot();
  }

  /* ============================================================
     FIN DE NIVEAU
     ============================================================ */
  function finishLevel() {
    const pct = R.score.total ? Math.round((R.score.correct / R.score.total) * 100) : 0;
    const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const prev = starsOf(R.level.id);
    if (stars >= 1) setStars(R.level.id, stars);
    const L = levels();
    const nextI = R.li + 1;
    const hasNext = nextI < L.length;
    const justUnlocked = stars >= 1 && prev < 1 && hasNext;
    const shell = document.getElementById("mf-shell");
    const msg = stars === 3 ? "Parfait — thème maîtrisé !" : stars === 2 ? "Très bien joué." : stars === 1 ? "Niveau validé !" : "Presque — il faut 50 % pour valider.";
    const starsHtml = '<div class="mf-bigstars">' +
      [1, 2, 3].map(n => '<span class="mf-bigstar' + (stars >= n ? " on" : "") + '" style="animation-delay:' + (n * .15) + 's">' + star(stars >= n) + '</span>').join("") + '</div>';
    shell.innerHTML =
      '<div class="mf-top"><div class="mf-brand"><span class="mf-brand-dot"></span>' + esc(R.level.label) + '</div>' +
      '<button class="mf-close" id="mf-close" aria-label="Fermer"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg></button></div>' +
      '<div class="mf-done">' +
        starsHtml +
        '<div class="mf-done-h">' + esc(msg) + '</div>' +
        '<div class="mf-done-sub">Score : ' + R.score.correct + ' / ' + R.score.total + ' · ' + pct + ' %</div>' +
        (justUnlocked ? '<div class="mf-unlock">🔓 Nouveau thème débloqué : <strong>' + esc(L[nextI].label) + '</strong></div>' : '') +
        '<div class="mf-done-actions">' +
          (stars < 3 ? '<button class="mf-btn-ghost" id="mf-replay">Rejouer</button>' : '<button class="mf-btn-ghost" id="mf-replay">Rejouer</button>') +
          (hasNext && stars >= 1 ? '<button class="mf-btn-cta" id="mf-nextlvl">Niveau suivant →</button>' : '') +
          '<button class="mf-btn-ghost" id="mf-tomap">Carte</button>' +
        '</div>' +
      '</div>';
    document.getElementById("mf-close").addEventListener("click", close);
    document.getElementById("mf-replay").addEventListener("click", () => startLevel(R.li));
    document.getElementById("mf-tomap").addEventListener("click", renderMap);
    const nl = document.getElementById("mf-nextlvl"); if (nl) nl.addEventListener("click", () => startLevel(nextI));
    document.getElementById("lenny-moment").scrollTop = 0;
    refreshSurfaces();
  }

  /* ---------- surfaces (badges) ---------- */
  function playable() {
    const L = levels(); let n = 0;
    L.forEach((lv, i) => { if (isUnlocked(i, L) && starsOf(lv.id) < 3) n++; });
    return n;
  }
  function renderNavBadge() {
    const due = playable();
    document.querySelectorAll(".mf-badge").forEach(b => { if (due > 0) { b.textContent = due > 99 ? "99+" : String(due); b.hidden = false; } else b.hidden = true; });
  }
  function refreshSurfaces() { try { renderNavBadge(); if (window.LennyMobileBar) LennyMobileBar.update(); } catch (e) {} }

  /* ---------- init ---------- */
  function init() {
    ["mf-btn", "revise-btn"].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener("click", () => open());
    });
    refreshSurfaces();
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { const el = document.getElementById("lenny-moment"); if (el && el.classList.contains("open")) close(); } });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 80));
  else setTimeout(init, 80);

  window.LennyMoment = { open, close, dueCount: playable, refresh: refreshSurfaces };
})();
