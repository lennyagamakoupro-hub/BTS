/* lenny-edition-libre.js — LE MODE ÉDITEUR DU PORTFOLIO, SUR L'ÉCRAN DE DÉVERROUILLAGE.
 *
 * Lenny, le 25/09/2026 : « je veux zoomer et tout, je veux le même mode
 * éditeur que sur le portfolio ». C'est le script d'édition libre du portfolio
 * de Manon, repris presque mot pour mot : un bouton « Éditer la page », on
 * attrape un élément pour le poser où on veut, le point rouge en bas à droite
 * l'agrandit ou le réduit. Tout reste dans ce navigateur.
 *
 * AJOUT PAR RAPPORT AU PORTFOLIO : double-clic sur un texte pour le réécrire.
 * Le grand titre fait exception : il est tapé phrase par phrase, ses phrases
 * se changent dans le panneau Réglages.
 *
 * Ne se charge qu'avec ?editeur dans l'adresse : un visiteur ne le voit jamais.
 */
(function () {
  if (!/[?&]editeur\b/.test(location.search)) return;

  var STORAGE_KEY = "lennyPorteEdits_v2";   // v1 = réglages figés le 25/09 dans lenny-porte-classe.css
  var edits = {};
  try { edits = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (e) { edits = {}; }
  var zTop = 10;

  var BLOC_SELECTORS = "#lenny-gate .gate-field, #lenny-gate .gate-btn";
  var TEXT_SELECTORS = "#lenny-gate .gate-brand, #lenny-gate .gate-h1, #lenny-gate .gate-sous, #lenny-gate .gate-foot-badge, #lenny-gate .gate-credit";

  var style = document.createElement("style");
  style.textContent = [
    ".edit-toggle{position:fixed;left:18px;bottom:18px;z-index:2147483550;font:600 11px/1 'IBM Plex Mono',monospace;",
    "letter-spacing:.08em;text-transform:uppercase;background:#e50914;color:#fff;border:none;border-radius:999px;",
    "padding:.9em 1.4em;cursor:pointer;box-shadow:0 14px 34px -10px rgba(0,0,0,.6)}",
    ".edit-panel{position:fixed;left:18px;bottom:68px;z-index:2147483550;background:#141110;border:1px solid #3a302c;",
    "border-radius:8px;padding:1em;display:none;flex-direction:column;gap:.5em;width:220px}",
    "body.edit-mode .edit-panel{display:flex}",
    ".edit-panel p{font:500 11px/1.5 'IBM Plex Mono',monospace;color:#b9ada7;margin:0 0 .2em}",
    ".edit-panel button{font:500 11px/1 'IBM Plex Mono',monospace;letter-spacing:.04em;text-transform:uppercase;",
    "background:transparent;border:1px solid #3a302c;color:#f5f1ef;padding:.7em .8em;border-radius:5px;cursor:pointer;text-align:left}",
    ".edit-panel button:hover{border-color:#e50914;color:#ff5a62}",
    ".edit-hit{outline:1px dashed transparent;outline-offset:3px;transition:outline-color .15s ease}",
    "body.edit-mode .edit-hit{outline-color:rgba(229,9,20,.45);cursor:grab}",
    "body.edit-mode .edit-hit:hover{outline-color:#e50914;outline-style:solid}",
    "body.edit-mode .edit-hit.is-dragging{cursor:grabbing;outline-color:#f0b429}",
    "body.edit-mode #lenny-gate{-webkit-user-select:none;user-select:none}",
    "body.edit-mode #lenny-gate [contenteditable]{-webkit-user-select:text;user-select:text}",
    "body.edit-mode .edit-hit[contenteditable]{cursor:text;outline-color:#f0b429;outline-style:solid}",
    ".edit-handle{position:absolute;right:-9px;bottom:-9px;width:17px;height:17px;background:#e50914;",
    "border:2px solid #fff;border-radius:50%;cursor:nwse-resize;display:none;z-index:60}",
    "body.edit-mode .edit-hit .edit-handle{display:block}",
    // pendant l'édition, le champ du code ne doit pas voler les clics
    "body.edit-mode #lenny-gate .gate-field *:not(.edit-handle){pointer-events:none}"
  ].join("");
  document.head.appendChild(style);

  function idFor(el, i) { return "porte-" + i; }

  function ensurePositioned(el) {
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
  }

  function applySaved(el, id, isText) {
    var d = edits[id];
    if (!d) return;
    ensurePositioned(el);
    if (d.left) el.style.left = d.left + "px";
    if (d.top) el.style.top = d.top + "px";
    if (d.width) el.style.width = d.width + "px";
    if (d.fontSize) el.style.fontSize = d.fontSize + "px";
    if (d.zIndex) { el.style.zIndex = d.zIndex; zTop = Math.max(zTop, d.zIndex); }
    if (isText && d.text != null) texte(el, d.text);
  }

  // le texte d'un élément sans toucher à ses icônes ni à la poignée
  function noeudTexte(el) {
    for (var n = el.lastChild; n; n = n.previousSibling) {
      if (n.nodeType === 3 && n.textContent.trim()) return n;
    }
    return null;
  }
  function texte(el, valeur) {
    var n = noeudTexte(el);
    if (valeur === undefined) return n ? n.textContent.trim() : el.textContent.trim();
    if (n) n.textContent = " " + valeur + " ";
  }

  function bringToFront(el) { zTop += 1; el.style.zIndex = zTop; }

  function save(id, el, isText) {
    var d = edits[id] || {};
    d.left = parseFloat(el.style.left) || 0;
    d.top = parseFloat(el.style.top) || 0;
    if (isText && el.style.fontSize) d.fontSize = parseFloat(el.style.fontSize);
    if (!isText && el.style.width) d.width = parseFloat(el.style.width);
    if (el.style.zIndex) d.zIndex = parseInt(el.style.zIndex, 10);
    edits[id] = d;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(edits)); } catch (e) {}
  }

  function wire(el, id, isText) {
    el.classList.add("edit-hit");
    el.setAttribute("data-edit-id", id);
    el.draggable = false;
    el.addEventListener("dragstart", function (e) { e.preventDefault(); });
    // un lien ou un bouton ne doit pas partir pendant qu'on le déplace
    el.addEventListener("click", function (e) {
      if (document.body.classList.contains("edit-mode")) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    var handle = document.createElement("span");
    handle.className = "edit-handle";
    // la poignée se place par rapport à l'élément lui-même
    ensurePositioned(el);
    el.appendChild(handle);
    // le titre réécrit son contenu en tapant : on remet la poignée si elle saute
    el.addEventListener("pointerenter", function () {
      if (!el.contains(handle)) el.appendChild(handle);
    });

    var dragging = false, startX = 0, startY = 0, baseLeft = 0, baseTop = 0;
    el.addEventListener("pointerdown", function (e) {
      if (!document.body.classList.contains("edit-mode")) return;
      if (e.target === handle || el.isContentEditable) return;
      e.preventDefault();
      dragging = true;
      el.classList.add("is-dragging");
      ensurePositioned(el);
      bringToFront(el);
      startX = e.clientX; startY = e.clientY;
      baseLeft = parseFloat(getComputedStyle(el).left) || 0;
      baseTop = parseFloat(getComputedStyle(el).top) || 0;
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
    });
    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      el.style.left = (baseLeft + (e.clientX - startX)) + "px";
      el.style.top = (baseTop + (e.clientY - startY)) + "px";
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
      save(id, el, isText);
    }
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);

    var resizing = false, startW = 0, startFS = 0;
    handle.addEventListener("pointerdown", function (e) {
      if (!document.body.classList.contains("edit-mode")) return;
      e.preventDefault(); e.stopPropagation();
      resizing = true;
      ensurePositioned(el);
      bringToFront(el);
      startX = e.clientX;
      startW = el.getBoundingClientRect().width;
      startFS = parseFloat(getComputedStyle(el).fontSize);
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
    });
    handle.addEventListener("pointermove", function (e) {
      if (!resizing) return;
      var dx = e.clientX - startX;
      if (isText) el.style.fontSize = Math.max(9, startFS + dx * 0.28) + "px";
      else el.style.width = Math.max(48, startW + dx) + "px";
    });
    function endResize() {
      if (!resizing) return;
      resizing = false;
      save(id, el, isText);
    }
    handle.addEventListener("pointerup", endResize);
    handle.addEventListener("pointercancel", endResize);

    // double-clic : on réécrit le texte (sauf le titre tapé à la machine)
    if (isText && !el.classList.contains("gate-h1")) {
      el.addEventListener("dblclick", function () {
        if (!document.body.classList.contains("edit-mode")) return;
        el.setAttribute("contenteditable", "plaintext-only");
        el.focus();
      });
      el.addEventListener("blur", function () {
        if (!el.isContentEditable) return;
        el.removeAttribute("contenteditable");
        var d = edits[id] || {};
        d.text = texte(el);
        edits[id] = d;
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(edits)); } catch (e) {}
      });
    }
  }

  function demarrer() {
    document.querySelectorAll(BLOC_SELECTORS).forEach(function (el, i) {
      var id = idFor(el, "bloc" + i);
      applySaved(el, id, false);
      wire(el, id, false);
    });
    document.querySelectorAll(TEXT_SELECTORS).forEach(function (el, i) {
      var id = idFor(el, "txt" + i);
      applySaved(el, id, true);
      wire(el, id, true);
    });

    var toggle = document.createElement("button");
    toggle.className = "edit-toggle"; toggle.type = "button";
    toggle.textContent = "✎ Éditer la page";
    var panel = document.createElement("div");
    panel.className = "edit-panel";
    panel.innerHTML =
      "<p>Glisse les textes et les blocs où tu veux. Tire le point rouge en bas à droite d'un élément pour l'agrandir ou le réduire. Double-clic sur un texte pour le réécrire. Tes réglages restent dans ce navigateur.</p>" +
      '<button type="button" id="editCopy">Copier mes réglages</button>' +
      '<button type="button" id="editReset">Réinitialiser</button>';
    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    toggle.addEventListener("click", function () {
      var on = document.body.classList.toggle("edit-mode");
      toggle.textContent = on ? "✓ Terminé" : "✎ Éditer la page";
    });
    document.getElementById("editReset").addEventListener("click", function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      location.reload();
    });
    document.getElementById("editCopy").addEventListener("click", function () {
      var json = JSON.stringify(edits, null, 2);
      var btn = this;
      var done = function () { var t = btn.textContent; btn.textContent = "Copié dans le presse-papiers"; setTimeout(function () { btn.textContent = t; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(done, function () {});
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
