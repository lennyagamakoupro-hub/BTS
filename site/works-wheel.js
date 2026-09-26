/* works-wheel.js — LA ROUE DE TRAVAUX, en JavaScript simple.
 *
 * Portage fidèle du composant React « WorksWheel » que Lenny a fourni le
 * 25/09/2026 (« c'est le prompt que je t'ai donné »). Ses deux sites ne sont pas
 * en React : même géométrie, mêmes constantes, même boucle unique, sans React.
 *
 * Au repos, les pièces forment un anneau autour d'un titre, chaque carte
 * tangente au cercle. Le premier cran de molette ouvre l'anneau en tambour
 * vertical : la carte de face est à plat et en grand, ses voisines basculent
 * en perspective et fuient par le haut et le bas. On continue de tourner, le
 * tambour amène la pièce suivante devant.
 *
 * Tout tient dans un nombre, `turn` : 0 = l'anneau, 1 = le tambour avec la
 * pièce 0 devant, chaque entier au-delà = une pièce de plus.
 *
 * Usage :
 *   var roue = WorksWheel(hote, items, { label, action, onOpen, onActive });
 *   onActive(item, i, ouvert) est appelé quand la pièce de face change, ou
 *   quand la roue passe de l'anneau (ouvert = false) au tambour.
 *   items = [{ title, image, href? }] ; roue.destroy() pour la retirer.
 * Couleurs et polices : variables CSS --ww-fg, --ww-muted, --ww-card, --ww-font
 * posées sur l'hôte.
 */
(function () {
  "use strict";

  // Géométrie — reprise telle quelle du composant d'origine.
  var CARD_H = 0.38, CARD_MAX_W = 0.34, CARD_RATIO = 1.45;
  var STEP = 40, DRUM = 2.22, LENS = 2.7, RING_R = 1.14, BOW = 1.82;
  var TITLE = 0.124, INDEX = 0.04, CULL = 1.6;
  var WHEEL_UNITS = 900, DRAG_UNITS = 420, SETTLE = 140, EASE = 0.12;

  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rad(d) { return (d * Math.PI) / 180; }
  function bowAt(drumDeg, bow) { return -bow * (1 - Math.cos(rad(drumDeg))); }
  function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
    return "translateX(" + m * bowAt(drumDeg, bow) + "px)" +
      " rotateZ(" + (1 - m) * ringDeg + "deg) translateY(" + -(1 - m) * ringR + "px)" +
      " rotateX(" + m * drumDeg + "deg) translateZ(" + m * drumR + "px)";
  }

  var CSS = [
    ".ww{position:relative;width:100%;height:100%;min-height:24rem;overflow:hidden;user-select:none;-webkit-user-select:none;",
    "color:var(--ww-fg,#fff);font-family:var(--ww-font,inherit)}",
    ".ww-stage{position:absolute;inset:0;cursor:grab;touch-action:pan-x;outline:none}",
    ".ww-stage:active{cursor:grabbing}",
    ".ww-stage:focus-visible{outline:2px solid var(--ww-fg,#fff);outline-offset:-4px}",
    ".ww-wheel{position:absolute;top:50%;left:50%;transform-style:preserve-3d}",
    ".ww-card{position:absolute;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:block;color:inherit;text-decoration:none}",
    ".ww-face{position:relative;display:block;width:100%;height:100%;overflow:hidden;border-radius:10px;",
    "background:var(--ww-card,#222);box-shadow:0 18px 40px -18px rgba(0,0,0,.7)}",
    ".ww-face img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}",
    ".ww-pill{position:absolute;right:12px;bottom:12px;display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;",
    "font-size:11px;background:rgba(0,0,0,.6);color:#fff;backdrop-filter:blur(4px);opacity:0;transform:translateY(4px);",
    "transition:opacity .2s ease,transform .2s ease;pointer-events:none}",
    ".ww-card:hover .ww-pill{opacity:1;transform:none}",
    ".ww-label{pointer-events:none;position:absolute;inset:0;display:grid;place-items:center;letter-spacing:-.01em;text-align:center}",
    ".ww-title{pointer-events:none;position:absolute;top:50%;left:8%;transform:translateY(-50%);letter-spacing:-.01em;opacity:0;",
    "max-width:24%;line-height:1.02;text-shadow:0 2px 24px rgba(0,0,0,.45)}",
    ".ww-index{position:absolute;top:7.5%;right:2.5%;margin:0;padding:0;list-style:none;text-align:right;line-height:1.75}",
    ".ww-index button{all:unset;cursor:pointer;color:var(--ww-muted,rgba(255,255,255,.55));transition:color .2s ease}",
    ".ww-index button:hover,.ww-index button.on{color:var(--ww-fg,#fff)}",
    ".ww-index button.on{font-weight:600}",
    ".ww-index button:focus-visible{outline:1px solid var(--ww-fg,#fff)}"
  ].join("");

  function injecterCss() {
    if (document.getElementById("ww-css")) return;
    var s = document.createElement("style");
    s.id = "ww-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function WorksWheel(hote, items, opts) {
    opts = opts || {};
    injecterCss();
    var label = opts.label != null ? opts.label : "Works '26";
    var action = opts.action != null ? opts.action : "View";
    var count = items.length, last = Math.max(count - 1, 0);

    var sec = document.createElement("section");
    sec.className = "ww";
    sec.setAttribute("aria-label", label);
    var stage = document.createElement("div");
    stage.className = "ww-stage";
    stage.tabIndex = 0;
    stage.setAttribute("role", "listbox");
    stage.setAttribute("aria-label", label);
    var wheel = document.createElement("div");
    wheel.className = "ww-wheel";
    stage.appendChild(wheel);
    sec.appendChild(stage);

    var uid = "ww" + Math.random().toString(36).slice(2, 7);
    var cards = items.map(function (it, i) {
      var c = document.createElement(it.href ? "a" : "div");
      c.className = "ww-card";
      c.id = uid + "-" + i;
      c.setAttribute("role", "option");
      if (it.href) c.href = it.href;
      var face = document.createElement("span");
      face.className = "ww-face";
      var img = document.createElement("img");
      img.src = it.image; img.alt = it.title; img.draggable = false; img.loading = "lazy";
      face.appendChild(img);
      if (action && it.href) {
        var pill = document.createElement("span");
        pill.className = "ww-pill";
        pill.innerHTML = '<svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        pill.appendChild(document.createTextNode(action));
        face.appendChild(pill);
      }
      c.appendChild(face);
      wheel.appendChild(c);
      return c;
    });

    var labelEl = document.createElement("div");
    labelEl.className = "ww-label"; labelEl.textContent = label;
    var titleEl = document.createElement("div");
    titleEl.className = "ww-title";
    var index = document.createElement("ol");
    index.className = "ww-index";
    var boutons = items.map(function (it, i) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button"; b.textContent = it.title;
      b.addEventListener("click", function () { to(i + 1); });
      li.appendChild(b); index.appendChild(li);
      return b;
    });
    sec.appendChild(labelEl); sec.appendChild(titleEl); sec.appendChild(index);
    hote.appendChild(sec);

    var turn = 0, target = 0, active = -1, frame = 0, settling = 0, drag = null, moved = 0, ouvert = false;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var M = null;

    function mesurer() {
      var w = stage.clientWidth, h = stage.clientHeight;
      var cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
      var cardH = cardW / CARD_RATIO;
      var ringR = cardH * RING_R;
      M = {
        cardW: cardW, cardH: cardH, ringR: ringR, drumR: cardH * DRUM, bow: cardH * BOW,
        ringScale: count ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1) : 1
      };
      stage.style.perspective = cardH * LENS + "px";
      labelEl.style.fontSize = titleEl.style.fontSize = cardH * TITLE + "px";
      index.style.fontSize = Math.max(11, cardH * INDEX) + "px";
      cards.forEach(function (c) {
        c.style.width = cardW + "px"; c.style.height = cardH + "px";
        c.style.marginLeft = -cardW / 2 + "px"; c.style.marginTop = -cardH / 2 + "px";
      });
    }

    function poserActif(n) {
      if (n === active) return;
      active = n;
      titleEl.textContent = items[n] ? items[n].title : "";
      stage.setAttribute("aria-activedescendant", uid + "-" + n);
      cards.forEach(function (c, i) { c.setAttribute("aria-selected", i === n ? "true" : "false"); });
      boutons.forEach(function (b, i) { b.classList.toggle("on", i === n); });
    }

    function draw() {
      frame = requestAnimationFrame(draw);
      if (!M || !M.cardH) return;
      var gap = target - turn;
      if (Math.abs(gap) < 0.0005) turn = target;
      else turn += gap * (reduced ? 1 : EASE);
      var t = turn, m = clamp(t, 0, 1), pos = Math.max(0, t - 1);
      wheel.style.transform = "translateZ(" + -m * M.drumR + "px)";
      for (var i = 0; i < count; i++) {
        var d = i - pos, c = cards[i];
        c.style.transform = place(d * (360 / count), d * STEP, M.ringR, M.drumR, M.bow, m);
        c.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
        c.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        c.firstChild.style.transform = "scale(" + lerp(M.ringScale, 1, m) + ")";
      }
      labelEl.style.opacity = String(1 - m);
      titleEl.style.opacity = String(m);
      var avant = active, etaitOuvert = ouvert;
      poserActif(clamp(Math.round(pos), 0, last));
      ouvert = m > 0.5;
      if (opts.onActive && (active !== avant || ouvert !== etaitOuvert)) opts.onActive(items[active], active, ouvert);
    }

    function to(next) { target = clamp(next, 0, last + 1); }

    // La molette ne se retient que tant qu'il reste à tourner : aux deux bouts,
    // la page reprend son défilement au lieu de piéger le lecteur.
    function onWheel(e) {
      var next = target + e.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) e.preventDefault();
      to(next);
      clearTimeout(settling);
      settling = setTimeout(function () { to(Math.round(target)); }, SETTLE);
    }
    stage.addEventListener("wheel", onWheel, { passive: false });

    stage.addEventListener("pointerdown", function (e) {
      drag = e.clientY; moved = 0;
      try { stage.setPointerCapture(e.pointerId); } catch (x) {}
    });
    stage.addEventListener("pointermove", function (e) {
      if (drag === null) return;
      moved += Math.abs(drag - e.clientY);
      to(target + (drag - e.clientY) / DRAG_UNITS);
      drag = e.clientY;
    });
    function lacher() {
      drag = null;
      if (target > 1) to(Math.round(target));
    }
    stage.addEventListener("pointerup", lacher);
    stage.addEventListener("pointercancel", lacher);

    // Un glisser ne doit pas ouvrir la carte sur laquelle il s'arrête.
    stage.addEventListener("click", function (e) {
      var c = e.target.closest ? e.target.closest(".ww-card") : null;
      if (!c) return;
      if (moved > 6) { e.preventDefault(); return; }
      var i = cards.indexOf(c);
      if (opts.onOpen) { e.preventDefault(); opts.onOpen(items[i], i); }
    });

    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") to(Math.round(target) + 1);
      else if (e.key === "ArrowUp") to(Math.round(target) - 1);
      else if (e.key === "Enter" && active >= 0 && turn > 0.5 && opts.onOpen) opts.onOpen(items[active], active);
      else return;
      e.preventDefault();
    });

    var ro = new ResizeObserver(mesurer);
    ro.observe(stage);
    mesurer();
    poserActif(0);
    frame = requestAnimationFrame(draw);

    return {
      el: sec,
      to: to,
      destroy: function () {
        cancelAnimationFrame(frame);
        clearTimeout(settling);
        ro.disconnect();
        if (sec.parentNode) sec.parentNode.removeChild(sec);
      }
    };
  }

  window.WorksWheel = WorksWheel;
})();
