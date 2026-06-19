/* ============================================
   LENNY — Barre d'outils mobile (style application)
   Sur téléphone, les boutons du haut (Devoir, Révisions, Quiz, Calc, Examen…)
   débordaient à droite et étaient coupés. On les masque en haut (voir lenny-mobile.css)
   et on les regroupe ici dans une barre fixe en bas + une feuille « Plus ».
   Ne s'affiche qu'en dessous de 640px (CSS).
   ============================================ */
(function () {

  const ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/></svg>',
    revise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/><path d="M12 8v4l2.5 1.5"/></svg>',
    formula: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 5H9.5a1.5 1.5 0 0 0-1.48 1.76l2.2 12.48"/><path d="M6.5 11h7"/></svg>',
    quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a2.8 2.8 0 0 1 5.3 1.2c0 1.9-2.5 2.3-2.5 4"/><path d="M12 17.5v.05"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
    calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 6.5h8M8 11h0M12 11h0M16 11v6.5M8 14.5h0M12 14.5h0M8 18h0M12 18h0"/></svg>',
    exam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.6 1.6M9 2.5h6"/></svg>',
    devoir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2.5h8.5L19 8v13.5H5z"/><path d="M13 2.8V8h5M8 12h8M8 15.5h8M8 19h5"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.6"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V10a6 6 0 0 1 12 0v6l1.5 2.5H4.5z"/><path d="M9.5 21a2.6 2.6 0 0 0 5 0"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6V4.5a1.3 1.3 0 0 0-1.3-1.3H5.3A1.3 1.3 0 0 0 4 4.5v15A1.3 1.3 0 0 0 5.3 21h7.4A1.3 1.3 0 0 0 14 19.5V18"/><path d="M9.5 12H21M17.5 8.5 21 12l-3.5 3.5"/></svg>',
    lmark: '<svg viewBox="0 0 32 32" fill="none"><circle cx="21.8" cy="8.5" r="2.4" fill="currentColor"/><path d="M11 8.5 V22.2 H22" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  function callApi(fn) { try { fn(); } catch (e) {} }
  function clickEl(sel) { const el = document.querySelector(sel); if (el) el.click(); }

  function goHome() {
    closeSheet();
    try { if (location.hash && location.hash !== "#home") location.hash = "#home"; } catch (e) {}
    const brand = document.querySelector(".nav .brand");
    if (brand) brand.click(); else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- feuille « Plus » ---------- */
  function moreItems() {
    return [
      { ic: "revise", label: "Réviser",        act: () => window.LennyMoment && callApi(() => LennyMoment.open()) },
      { ic: "calc",   label: "Calculatrices",  act: () => window.LennyCalc && callApi(() => LennyCalc.open()) },
      { ic: "exam",   label: "Examen blanc",   act: () => window.LennyExam && callApi(() => LennyExam.open()) },
      { ic: "devoir", label: "Devoir général", act: () => window.LennyDevoir && callApi(() => LennyDevoir.open("general")) },
      { ic: "sheet",  label: "Formulaire",     act: () => window.LennyFormules && callApi(() => LennyFormules.open("transaction")) },
      { ic: "search", label: "Rechercher",     act: () => clickEl(".nav .icon-btn[aria-label='Rechercher']") },
      { ic: "bell",   label: "Nouveautés",     act: () => clickEl("#notif-btn") },
      { ic: "user",   label: "Mon profil",     act: () => clickEl(".nav .avatar") },
      { ic: "logout", label: "Se déconnecter", act: () => clickEl("[data-footer-logout]"), danger: true },
    ];
  }

  function openSheet() {
    const sh = document.getElementById("mtb-sheet");
    if (!sh) return;
    sh.hidden = false;
    requestAnimationFrame(() => sh.classList.add("open"));
    document.getElementById("mtb-more").classList.add("on");
  }
  function closeSheet() {
    const sh = document.getElementById("mtb-sheet");
    if (!sh) return;
    sh.classList.remove("open");
    const m = document.getElementById("mtb-more"); if (m) m.classList.remove("on");
    setTimeout(() => { sh.hidden = true; }, 240);
  }
  function toggleSheet() {
    const sh = document.getElementById("mtb-sheet");
    if (!sh) return;
    if (sh.classList.contains("open")) closeSheet(); else openSheet();
  }

  /* ---------- badges ---------- */
  function updateBadges() {
    const set = (id, n) => {
      const b = document.getElementById(id);
      if (!b) return;
      if (n > 0) { b.textContent = n > 99 ? "99+" : String(n); b.hidden = false; }
      else b.hidden = true;
    };
    let srs = 0, mf = 0;
    try { srs = (window.LennySRS && LennySRS.dueCount()) || 0; } catch (e) {}
    try { mf = (window.LennyMoment && LennyMoment.dueCount()) || 0; } catch (e) {}
    set("mtb-srs-badge", srs);
    set("mtb-mf-badge", mf);
  }

  /* ---------- construction ---------- */
  function build() {
    if (document.getElementById("mobile-toolbar")) return;

    const bar = document.createElement("nav");
    bar.className = "mtb";
    bar.id = "mobile-toolbar";
    bar.setAttribute("aria-label", "Barre d'outils");
    bar.innerHTML =
      tab("mtb-home", "home", "Accueil", "") +
      tab("mtb-quiz", "quiz", "Quiz", "") +
      centerTab() +
      tab("mtb-devoir-t", "devoir", "Devoir", "") +
      tab("mtb-more", "more", "Plus", "");
    document.body.appendChild(bar);

    const sheet = document.createElement("div");
    sheet.className = "mtb-sheet-wrap";
    sheet.id = "mtb-sheet";
    sheet.hidden = true;
    sheet.innerHTML =
      '<div class="mtb-sheet-backdrop" data-mtb-close></div>' +
      '<div class="mtb-sheet" role="dialog" aria-label="Plus d\'outils">' +
        '<div class="mtb-sheet-grip"></div>' +
        '<div class="mtb-sheet-title">Tous les outils</div>' +
        '<div class="mtb-sheet-grid">' +
          moreItems().map((it, i) =>
            '<button class="mtb-cell' + (it.danger ? " danger" : "") + '" data-more="' + i + '">' +
              '<span class="mtb-cell-ic">' + ICON[it.ic] + '</span>' +
              '<span class="mtb-cell-l">' + it.label + '</span>' +
            '</button>'
          ).join("") +
        '</div>' +
      '</div>';
    document.body.appendChild(sheet);

    // liaisons
    document.getElementById("mtb-home").addEventListener("click", goHome);
    document.getElementById("mtb-quiz").addEventListener("click", () => { closeSheet(); window.LennyQuiz && callApi(() => LennyQuiz.open()); });
    document.getElementById("mtb-chat").addEventListener("click", () => { closeSheet(); window.LennyAgent && callApi(() => LennyAgent.open()); });
    document.getElementById("mtb-devoir-t").addEventListener("click", () => { closeSheet(); window.LennyDevoir && callApi(() => LennyDevoir.open("general")); });
    document.getElementById("mtb-more").addEventListener("click", toggleSheet);

    const items = moreItems();
    sheet.querySelectorAll(".mtb-cell").forEach(btn => {
      btn.addEventListener("click", () => { const it = items[parseInt(btn.dataset.more, 10)]; closeSheet(); setTimeout(() => it && it.act(), 180); });
    });
    sheet.querySelector("[data-mtb-close]").addEventListener("click", closeSheet);

    updateBadges();
    setInterval(updateBadges, 4000);
    window.addEventListener("focus", updateBadges);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) updateBadges(); });
  }

  function tab(id, ic, label, badge) {
    return '<button class="mtb-tab" id="' + id + '" type="button">' +
      '<span class="mtb-ic">' + ICON[ic] + badge + '</span>' +
      '<span class="mtb-l">' + label + '</span>' +
    '</button>';
  }
  function centerTab() {
    return '<button class="mtb-tab mtb-center" id="mtb-chat" type="button" aria-label="Lenny-agent — pose ta question">' +
      '<span class="mtb-center-disc">' + ICON.lmark + '<span class="mtb-badge mtb-badge-center" id="mtb-mf-badge" hidden></span></span>' +
      '<span class="mtb-l">Lenny</span>' +
    '</button>';
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(build, 120));
  else setTimeout(build, 120);

  window.LennyMobileBar = { update: updateBadges };
})();
