/* ============================================
   LENNY — Formulaire (overlay) · feuille papier
   Deux pôles en onglets : Transaction · Syndic.
   API : window.LennyFormules.open('transaction' | 'syndic')
   Dépend de : window.LENNY_FORMULES (lenny-formules-data.js)
   ============================================ */
(function () {

  function data() { return window.LENNY_FORMULES || {}; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  function ensureEl() {
    let el = document.getElementById("lenny-formules");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-formules";
    el.innerHTML = '<div class="lf-backdrop" data-lf-close></div><div class="lf-shell" id="lf-shell" role="dialog" aria-modal="true" aria-label="Formulaire"></div>';
    document.body.appendChild(el);
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-lf-close]")) close();
      const tab = e.target.closest("[data-lf-tab]");
      if (tab) render(tab.getAttribute("data-lf-tab"));
      if (e.target.closest("[data-lf-print]")) window.print();
      const train = e.target.closest("[data-lf-train]");
      if (train && window.LennyMoment) { close(); window.LennyMoment.open(train.getAttribute("data-lf-train") || undefined); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.classList.contains("open")) close();
    });
    return el;
  }

  function groupsHtml(pole) {
    return pole.groups.map(g => {
      const cards = g.formulas.map(f => {
        const lines = f.lines.map(l => esc(l)).join("\n");
        return (
          '<div class="lf-card">' +
            '<div class="lf-card-name">' + esc(f.name) + '</div>' +
            '<pre class="lf-formula">' + lines + '</pre>' +
            (f.note ? '<div class="lf-note">' + esc(f.note) + '</div>' : '') +
          '</div>'
        );
      }).join("");
      return (
        '<section class="lf-group">' +
          '<h3 class="lf-group-h">' + esc(g.h) + '</h3>' +
          '<div class="lf-cards">' + cards + '</div>' +
        '</section>'
      );
    }).join("");
  }

  function render(which) {
    const D = data();
    which = D[which] ? which : "transaction";
    const pole = D[which];
    if (!pole) return;
    const el = ensureEl();
    const hasTx = !!D.transaction, hasSy = !!D.syndic;
    el.querySelector("#lf-shell").innerHTML =
      '<button class="lf-close" data-lf-close aria-label="Fermer">✕</button>' +
      '<div class="lf-paper" style="--lf-accent:' + (pole.accent || "#b58430") + '">' +
        '<header class="lf-head">' +
          '<span class="lf-eyebrow">LENNY · Formulaire</span>' +
          '<h2 class="lf-title">' + esc(pole.title) + '</h2>' +
          '<div class="lf-sub">' + esc(pole.sub || "") + '</div>' +
          '<div class="lf-tabs">' +
            (hasTx ? '<button class="lf-tab' + (which === "transaction" ? " on" : "") + '" data-lf-tab="transaction" type="button">Transaction</button>' : '') +
            (hasSy ? '<button class="lf-tab' + (which === "syndic" ? " on" : "") + '" data-lf-tab="syndic" type="button">Syndic</button>' : '') +
          '</div>' +
        '</header>' +
        '<div class="lf-content">' +
          (pole.intro ? '<p class="lf-intro">' + esc(pole.intro) + '</p>' : '') +
          groupsHtml(pole) +
        '</div>' +
        '<footer class="lf-foot">' +
          '<button class="lf-train-btn" data-lf-train="' + which + '" type="button">' +
            '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3.2H6.6a1.1 1.1 0 0 0-1.08 1.3l1.7 9"/><path d="M4.4 7.6h5"/></svg>' +
            'S\u2019entraîner sur ces formules' +
          '</button>' +
          '<button class="lf-btn" data-lf-print type="button">Imprimer / PDF</button>' +
        '</footer>' +
      '</div>';
    el.querySelector("#lf-shell").scrollTop = 0;
  }

  function open(which) {
    const el = ensureEl();
    render(which);
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    const el = document.getElementById("lenny-formules");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  window.LennyFormules = { open, close };
})();
