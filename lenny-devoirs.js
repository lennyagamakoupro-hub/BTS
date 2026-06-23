/* ============================================
   LENNY — DEVOIR (épreuve écrite type examen)
   Génère un sujet ALÉATOIRE à partir de window.DEVOIRS.
   - Devoir d'un pôle : tire 2 exercices de la catégorie.
   - Devoir général : tire 3 exercices, répartis sur les pôles.
   Le tirage change à chaque ouverture + bouton « Nouveau sujet ».
   Les réponses (copie) sont saisies dans des zones de texte et
   sauvegardées en local. Aucun corrigé (fourni plus tard).
   Depends on: window.DEVOIRS, window.DEVOIRS_META
   ============================================ */
(function () {
  const LS_PREFIX = "lenny-copie-";
  let lastSig = "";

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  /* ---- Assemble a random subject ---- */
  function buildSujet(cat) {
    const D = window.DEVOIRS || {};
    let items = [];
    if (cat === "general") {
      // un exercice par pôle (ordre aléatoire), puis complète si besoin
      const cats = shuffle(Object.keys(D));
      cats.forEach(c => { const pool = shuffle(D[c] || []); if (pool[0]) items.push(Object.assign({ _cat: c }, pool[0])); });
      items = shuffle(items).slice(0, 3);
    } else {
      const pool = shuffle((D[cat] || []).map(x => Object.assign({ _cat: cat }, x)));
      items = pool.slice(0, 2);
    }
    return items;
  }

  function totalDuree(items) {
    let mins = 0;
    items.forEach(it => { const m = parseInt(it.duree, 10); if (!isNaN(m)) mins += m; });
    if (!mins) return "—";
    const h = Math.floor(mins / 60), mn = mins % 60;
    return (h ? h + " h" : "") + (mn ? (h ? " " : "") + mn + " min" : (h ? "" : "0 min"));
  }

  function ensureEl() {
    let el = document.getElementById("lenny-devoir");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-devoir";
    el.innerHTML = '<div class="dv-backdrop" data-dv-close></div><div class="dv-shell" id="dv-shell" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(el);
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-dv-close]")) close();
      if (e.target.closest("[data-dv-new]")) { const c = el.getAttribute("data-cat"); regenerate(c); }
      if (e.target.closest("[data-dv-print]")) window.print();
    });
    // persist copies
    el.addEventListener("input", (e) => {
      const ta = e.target.closest("textarea[data-key]");
      if (ta) { try { localStorage.setItem(LS_PREFIX + ta.getAttribute("data-key"), ta.value); } catch (_) {} }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.classList.contains("open")) close();
    });
    return el;
  }

  function render(cat, items) {
    const el = ensureEl();
    el.setAttribute("data-cat", cat);
    const meta = (window.DEVOIRS_META || {});
    const isGen = cat === "general";
    const headLabel = isGen ? "Devoir général" : ("Devoir — " + ((meta[cat] || {}).label || cat));
    const epreuve = isGen ? "Toutes épreuves — E4 · E5 · E6" : ((meta[cat] || {}).epreuve || "");
    const accent = isGen ? "#8a5e1f" : ((meta[cat] || {}).accent || "#8a5e1f");
    const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    let body = "";
    items.forEach((it, i) => {
      const num = i + 1;
      const ctx = (it.contexte || []).map(p => '<p>' + esc(p) + '</p>').join("");
      const qs = (it.questions || []).map((q, qi) => {
        const key = it.id + "-q" + qi;
        let saved = "";
        try { saved = localStorage.getItem(LS_PREFIX + key) || ""; } catch (_) {}
        // retire un éventuel numéro en tête (« 1. », « 2) »…) : il est rendu via la pastille
        const qText = String(q == null ? "" : q).replace(/^\s*\d+\s*[.)\u00b0\u00b0-]\s*/, "");
        return (
          '<div class="dv-q">' +
            '<div class="dv-q-head">' +
              '<span class="dv-q-num">' + (qi + 1) + '</span>' +
              '<p class="dv-q-text">' + esc(qText) + '</p>' +
            '</div>' +
            '<textarea class="dv-copie" data-key="' + esc(key) + '" rows="3" placeholder="Votre réponse…" spellcheck="false">' + esc(saved) + '</textarea>' +
          '</div>'
        );
      }).join("");
      const poleTag = isGen ? '<span class="dv-ex-pole">' + esc((meta[it._cat] || {}).label || it._cat) + '</span>' : "";
      body +=
        '<section class="dv-ex">' +
          '<div class="dv-ex-head">' +
            '<div class="dv-ex-num">Exercice ' + num + '</div>' +
            '<div class="dv-ex-tags">' + poleTag +
              '<span class="dv-ex-tag">' + esc(it.tag || "") + '</span>' +
              '<span class="dv-ex-tag ghost">' + esc(it.difficulte || "") + '</span>' +
              '<span class="dv-ex-tag ghost">≈ ' + esc(it.duree || "") + '</span>' +
            '</div>' +
          '</div>' +
          '<h3 class="dv-ex-title">' + esc(it.titre || "") + '</h3>' +
          '<div class="dv-context"><div class="dv-context-label">Contexte</div>' + ctx + '</div>' +
          '<div class="dv-questions"><div class="dv-questions-label">Travail à faire</div>' + qs + '</div>' +
        '</section>';
    });

    el.querySelector("#dv-shell").innerHTML =
      '<button class="dv-close" data-dv-close aria-label="Fermer">✕</button>' +
      '<div class="dv-paper" style="--dv-accent:' + accent + '">' +
        '<header class="dv-head">' +
          '<div class="dv-head-top">' +
            '<span class="dv-brand"><span class="dv-brand-l">L</span> · DEVOIR</span>' +
            '<span class="dv-session">BTS Professions Immobilières · Session 2026</span>' +
          '</div>' +
          '<h2 class="dv-title">' + esc(headLabel) + '</h2>' +
          '<div class="dv-epreuve">' + esc(epreuve) + '</div>' +
          '<div class="dv-meta">' +
            '<span><b>' + items.length + '</b> exercice' + (items.length > 1 ? "s" : "") + '</span>' +
            '<span>Durée conseillée <b>' + totalDuree(items) + '</b></span>' +
            '<span>' + esc(today) + '</span>' +
          '</div>' +
          '<p class="dv-consigne">Traitez les exercices à partir de vos connaissances. Tous les calculs et toutes les réponses doivent être <b>justifiés et argumentés</b>, comme le jour de l\'examen. Rédigez vos réponses dans les cadres ; elles sont sauvegardées automatiquement.</p>' +
        '</header>' +
        body +
        '<footer class="dv-foot">' +
          '<div class="dv-corrige">Corrigé : <b>à venir</b> — il sera ajouté prochainement.</div>' +
          '<div class="dv-foot-actions">' +
            '<button class="dv-btn ghost" data-dv-print type="button">Imprimer le sujet</button>' +
            '<button class="dv-btn primary" data-dv-new type="button">↻ Nouveau sujet</button>' +
          '</div>' +
        '</footer>' +
      '</div>';

    el.querySelector("#dv-shell").scrollTop = 0;
  }

  function regenerate(cat) {
    let items, sig, guard = 0;
    do { items = buildSujet(cat); sig = items.map(x => x.id).join("|"); guard++; }
    while (sig === lastSig && guard < 8);
    lastSig = sig;
    render(cat, items);
  }

  function open(cat) {
    cat = (cat && (window.DEVOIRS || {})[cat]) ? cat : (cat === "general" ? "general" : "general");
    const el = ensureEl();
    regenerate(cat);
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }

  function close() {
    const el = document.getElementById("lenny-devoir");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  window.LennyDevoir = { open, close };
})();
