/* ============================================
   LENNY — Dossier d'outils dans la nav
   Regroupe les 5 boutons (Révisions, Quiz, Examen, Devoir, Calculatrices)
   sous un seul bouton « Réviser » qui ouvre un menu déroulant. Les boutons
   d'origine sont déplacés tels quels : leurs actions restent branchées.
   Ajoute un accès « Ma progression » (page immeuble + révision du jour).
   ============================================ */
(function () {
  "use strict";

  function init() {
    const navRight = document.querySelector(".nav-right");
    if (!navRight || document.getElementById("tools-folder")) return;
    const ids = ["revise-btn", "srs-btn", "quiz-general-btn", "exam-btn", "devoir-general-btn", "calc-btn"];
    const btns = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!btns.length) return;

    const folder = document.createElement("div");
    folder.className = "nav-folder";
    folder.id = "tools-folder";
    folder.innerHTML = `
      <button class="nav-folder-btn" id="tools-folder-btn" type="button" aria-haspopup="true" aria-expanded="false" title="Outils de révision">
        <svg class="nav-folder-ic" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M2 5.4a1 1 0 0 1 1-1h3.1l1.3 1.6H15a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5.4Z"/></svg>
        <span>Réviser</span>
        <span class="nav-folder-dot" id="tools-folder-dot" hidden></span>
        <svg class="nav-folder-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,4.5 6,7.5 9,4.5"/></svg>
      </button>
      <div class="nav-folder-menu" id="tools-folder-menu" role="menu"></div>`;
    navRight.insertBefore(folder, navRight.firstChild);

    const menu = folder.querySelector("#tools-folder-menu");
    btns.forEach(b => { b.classList.add("nav-folder-item"); menu.appendChild(b); });

    // séparateur + accès "Ma progression"
    const div = document.createElement("div");
    div.className = "nav-folder-div";
    menu.appendChild(div);
    const prog = document.createElement("button");
    prog.className = "nav-folder-item nav-folder-progress";
    prog.id = "progress-nav"; prog.type = "button";
    prog.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M2 14V6.4L8 2l6 4.4V14"/><path d="M2 11.2h12M6 14v-3h4v3"/></svg> Ma progression`;
    menu.appendChild(prog);
    prog.addEventListener("click", () => { close(); if (window.LennyRouter) window.LennyRouter.go("progress"); });

    const tbtn = folder.querySelector("#tools-folder-btn");
    function open() { folder.classList.add("open"); tbtn.setAttribute("aria-expanded", "true"); }
    function close() { folder.classList.remove("open"); tbtn.setAttribute("aria-expanded", "false"); }
    tbtn.addEventListener("click", (e) => { e.stopPropagation(); folder.classList.contains("open") ? close() : open(); });
    menu.addEventListener("click", (e) => { if (e.target.closest(".nav-folder-item")) close(); });
    document.addEventListener("click", (e) => { if (!e.target.closest("#tools-folder")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    // pastille de rappel sur le dossier, miroir du badge "Révisions"
    function syncDot() {
      const dot = document.getElementById("tools-folder-dot");
      if (!dot) return;
      const srs = document.getElementById("srs-badge");
      const mf = document.getElementById("mf-badge");
      const show = (srs && !srs.hidden) || (mf && !mf.hidden);
      dot.hidden = !show;
    }
    syncDot();
    ["srs-badge", "mf-badge"].forEach(function (id) {
      const b = document.getElementById(id);
      if (b) new MutationObserver(syncDot).observe(b, { attributes: true, childList: true, subtree: true });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 220));
  else setTimeout(init, 220);
})();
