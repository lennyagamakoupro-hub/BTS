/* ============================================================
   LENNY — Sélecteur de modules « morph »
   Inspiré d'une animation de cartes (éparpillées → ligne → cercle →
   carrousel en éventail). Reconstruit en vanilla à partir des VRAIS
   modules du secteur affiché. Glisser / flèches pour parcourir, survol
   pour mettre en avant, clic pour ouvrir le module.
   Autonome & réversible : retirer le <script src="lenny-modpicker.js">.
   ============================================================ */
(function () {
  "use strict";

  var TAU = Math.PI * 2;
  var ENTRY = 2.3; // durée de la séquence d'entrée (s)

  var stage = null, ring = null, cap = null, capTag = null, capTitle = null;
  var cards = [];
  var raf = 0, active = false, startTime = 0;

  // état d'animation
  var rot = 0, vel = 0;          // rotation du carrousel (rad) + vélocité
  var pxTarget = 0, pxv = 0;     // parallaxe souris
  var mxNorm = 0;                // position X souris normalisée (-1..1, avec zone morte)
  var overStage = false;         // la souris est-elle au-dessus de la scène
  var velTarget = 0;             // vitesse visée (pilotée par la souris)
  var mode = "idle";             // idle | snap (calage sur un module via flèches)
  var targetRot = 0;             // rotation visée quand mode === "snap"
  var MAXV = 0.05;               // vitesse max sous contrôle souris (rad / frame)
  var hoverIdx = -1, frontIdx = -1;
  var dragging = false, dragX0 = 0, rot0 = 0, lastDx = 0, moved = 0;
  var W = 0, H = 0, slice = 0;
  var scatter = [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
    });
  }
  function allMods() {
    if (typeof LENNY_MODULES !== "undefined" && LENNY_MODULES.length) return LENNY_MODULES;
    return window.LENNY_MODULES || window.MODULES || [];
  }
  function modOf(id) {
    return allMods().find(function (m) { return m.id === id; }) || null;
  }
  function openMod(id) {
    try {
      if (window.LennyDetail && window.LennyDetail.open) { window.LennyDetail.open(id); return; }
    } catch (e) {}
    var a = document.querySelector('#sector-grid a.card[data-mod="' + id + '"]');
    if (a) { a.click(); return; }
    location.hash = "#" + id;
  }

  function mkNav(kind) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "modpick-nav modpick-" + kind;
    b.setAttribute("aria-label", kind === "prev" ? "Module précédent" : "Module suivant");
    var d = kind === "prev" ? "M11 4 L6 9 L11 14" : "M7 4 L12 9 L7 14";
    b.innerHTML = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
    return b;
  }

  function teardown() {
    cancelAnimationFrame(raf);
    active = false;
    if (stage && stage.parentNode) stage.parentNode.removeChild(stage);
    var grid = document.getElementById("sector-grid");
    if (grid) { grid.style.display = ""; var w = grid.parentNode; if (w) w.classList.remove("has-modpick"); }
    stage = ring = cap = null; cards = [];
  }

  function initScatter(n) {
    scatter = [];
    for (var i = 0; i < n; i++) {
      scatter.push({
        x: (Math.random() - 0.5) * W * 1.15,
        y: (Math.random() - 0.5) * H * 0.95,
        rot: (Math.random() - 0.5) * 150,
        scale: 0.55,
        op: 0
      });
    }
  }

  function measure() {
    if (!stage) return;
    W = stage.clientWidth || 1;
    H = stage.clientHeight || 1;
  }

  // position d'un module sur le carrousel à la rotation courante
  function ringPos(i) {
    var Rx = Math.min(W * 0.40, 340);
    var Ry = Math.min(Rx * 0.34, H * 0.20);
    var ang = i * slice + rot;
    var sin = Math.sin(ang), depth = Math.cos(ang);
    var k = (depth + 1) / 2; // 0 (arrière) .. 1 (avant)
    return {
      x: sin * Rx + pxv,
      y: depth * Ry - 0.24 * H,
      scale: 0.62 + 0.52 * k,
      op: 0.22 + 0.78 * k,
      rot: sin * -9,
      z: Math.round((depth + 1) * 500)
    };
  }
  function linePos(i, n) {
    var sp = Math.min(W / (n + 1), 152);
    return { x: (i - (n - 1) / 2) * sp, y: -0.24 * H, scale: 1, op: 1, rot: 0, z: 100 };
  }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function lerpPos(a, b, u) {
    return {
      x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u),
      scale: lerp(a.scale, b.scale, u), op: lerp(a.op, b.op, u),
      rot: lerp(a.rot, b.rot, u), z: b.z
    };
  }
  function ease(u) { u = Math.max(0, Math.min(1, u)); return 1 - Math.pow(1 - u, 3); }

  function apply(c, p) {
    c.el.style.transform =
      "translate(-50%,-50%) translate(" + p.x.toFixed(1) + "px," + p.y.toFixed(1) + "px) scale(" +
      p.scale.toFixed(3) + ") rotate(" + p.rot.toFixed(2) + "deg)";
    c.el.style.opacity = p.op.toFixed(3);
    c.el.style.zIndex = p.z;
  }

  function computeFront(n) {
    var best = -1, bestC = -2;
    for (var i = 0; i < n; i++) {
      var c = Math.cos(i * slice + rot);
      if (c > bestC) { bestC = c; best = i; }
    }
    return best;
  }
  function setCaption(i) {
    if (i === frontIdx) return;
    frontIdx = i;
    var m = cards[i] ? modOf(cards[i].id) : null;
    if (capTag) capTag.textContent = (m && m.tag) || "";
    if (capTitle) capTitle.textContent = (m && m.title) || "";
    cards.forEach(function (c, k) { c.el.classList.toggle("focus", k === i); });
  }

  function frame(now) {
    if (!active) return;
    var host = document.getElementById("view-sector");
    if (!host || host.hidden) { teardown(); return; }
    var t = (now - startTime) / 1000;
    var n = cards.length;

    // dynamique de rotation après l'entrée
    if (t > ENTRY && !dragging) {
      if (mode === "snap") {
        // calage doux sur le module choisi via les flèches
        rot += (targetRot - rot) * 0.16;
        vel = 0;
        if (Math.abs(targetRot - rot) < 0.0008) { rot = targetRot; mode = "idle"; }
      } else {
        // rotation pilotée par la souris : la position X règle la vitesse (jog)
        velTarget = overStage ? mxNorm * MAXV : 0;
        vel += (velTarget - vel) * 0.10;
        if (!overStage && Math.abs(vel) < 0.00002) vel = 0;
        rot += vel;
      }
    }
    pxv += (pxTarget - pxv) * 0.08;

    for (var i = 0; i < n; i++) {
      var rp = ringPos(i);
      var p;
      if (t < 0.45) {
        p = { x: scatter[i].x, y: scatter[i].y, scale: scatter[i].scale, op: ease(t / 0.45), rot: scatter[i].rot, z: 50 };
      } else if (t < 1.25) {
        p = lerpPos(scatter[i], linePos(i, n), ease((t - 0.45) / 0.8));
      } else if (t < ENTRY) {
        p = lerpPos(linePos(i, n), rp, ease((t - 1.25) / (ENTRY - 1.25)));
      } else {
        p = rp;
      }
      apply(cards[i], p);
    }
    if (t > ENTRY) setCaption(computeFront(n));
    raf = requestAnimationFrame(frame);
  }

  // cale la rotation sur le cran (module) voisin -> choix précis via les flèches
  function step(dir) {
    if (!cards.length) return;
    var unit = Math.round(rot / slice);
    targetRot = (unit + dir) * slice;
    mode = "snap";
    overStage = false;          // la souris ne reprendra la main qu'au prochain mouvement
    velTarget = 0;
  }
  // ouvre le module actuellement en avant
  function openFront() {
    var f = cards[computeFront(cards.length)];
    if (f) openMod(f.id);
  }

  function bindDrag(el) {
    var captured = false;
    el.addEventListener("pointerdown", function (e) {
      dragging = true; dragX0 = e.clientX; rot0 = rot; lastDx = 0; moved = 0; captured = false;
      // NE PAS capturer tout de suite : sinon l'événement "click" est détourné
      // et l'ouverture du module au clic ne se déclenche jamais.
    });
    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - dragX0;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 5 && !captured) { try { el.setPointerCapture(e.pointerId); } catch (err) {} captured = true; }
      rot = rot0 - dx * 0.006;
      vel = -(dx - lastDx) * 0.006;
      lastDx = dx;
    });
    function up() { dragging = false; }
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("mousemove", function (e) {
      if (dragging) return;
      var r = el.getBoundingClientRect();
      var n0 = (((e.clientX - r.left) / r.width) * 2 - 1); // -1 (gauche) .. 1 (droite)
      pxTarget = n0 * 30;
      var s = n0 < 0 ? -1 : 1, a = Math.abs(n0), dead = 0.10;
      mxNorm = a < dead ? 0 : s * Math.pow((a - dead) / (1 - dead), 1.4);
      overStage = true;
      if (mode === "snap") mode = "idle"; // la souris reprend la main sur les flèches
    });
    el.addEventListener("mouseleave", function () { pxTarget = 0; overStage = false; mxNorm = 0; });
  }

  function build() {
    var grid = document.getElementById("sector-grid");
    var wrap = grid && grid.parentNode;
    if (!grid || !wrap) return;
    var anchors = [].slice.call(grid.querySelectorAll("a.card[data-mod]"));
    if (!anchors.length) return;

    teardown();

    var ids = anchors.map(function (a) { return a.getAttribute("data-mod"); });
    slice = TAU / ids.length;

    stage = document.createElement("div");
    stage.className = "modpick";
    ring = document.createElement("div");
    ring.className = "modpick-stage";
    stage.appendChild(ring);

    cards = ids.map(function (id, i) {
      var m = modOf(id);
      var el = document.createElement("button");
      el.type = "button";
      el.className = "modpick-card";
      el.setAttribute("data-mod", id);
      var token = (m && m.color) || "";
      var color = /^#/.test(token) ? token : (token ? "var(--" + token + ", #3a3a42)" : "#3a3a42");
      el.style.background = "radial-gradient(135% 120% at 25% 12%, " + color + " 0%, #1a1512 82%)";
      var photoCls = (window.modPhotoClass && window.modPhotoClass(id)) || "";
      var photoLayer = photoCls ? '<div class="mp-photo ' + photoCls + '"></div><div class="mp-photo-wash"></div>' : '<div class="mp-scan"></div>';
      el.innerHTML =
        photoLayer +
        '<div class="mp-grad"></div>' +
        '<div class="mp-short">' + esc(m && (m.short || m.title)) + "</div>";
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (moved > 6) return; // c'était un glissement, pas un clic
        openMod(id);
      });
      el.addEventListener("mouseenter", function () { hoverIdx = i; });
      el.addEventListener("mouseleave", function () { hoverIdx = -1; });
      ring.appendChild(el);
      return { el: el, id: id };
    });

    cap = document.createElement("div");
    cap.className = "modpick-cap";
    cap.innerHTML =
      '<div class="modpick-cap-tag"></div>' +
      '<div class="modpick-cap-title"></div>' +
      '<div class="modpick-cap-hint">Bougez la souris pour tourner · ← → pour choisir · cliquez pour ouvrir</div>';
    stage.appendChild(cap);
    capTag = cap.querySelector(".modpick-cap-tag");
    capTitle = cap.querySelector(".modpick-cap-title");

    var prev = mkNav("prev"), next = mkNav("next");
    prev.addEventListener("click", function () { step(1); });
    next.addEventListener("click", function () { step(-1); });
    stage.appendChild(prev);
    stage.appendChild(next);

    grid.style.display = "none";
    var hero = document.getElementById("sector-hero");
    if (hero) {
      stage.classList.add("modpick--overlay");
      hero.appendChild(stage);
      wrap.classList.remove("has-modpick");
    } else {
      wrap.classList.add("has-modpick");
      wrap.appendChild(stage);
    }

    measure();
    initScatter(cards.length);
    bindDrag(ring);

    // bouton outils fusionn\u00e9 : d\u00e9plie/replie le popover des actions du secteur
    var tools = document.getElementById("sector-tools");
    var acts = document.querySelector("#view-sector .sector-hero-actions");
    if (tools && acts && !tools.dataset.lpcWired) {
      tools.dataset.lpcWired = "1";
      tools.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = acts.classList.toggle("tools-open");
        tools.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (!acts.classList.contains("tools-open")) return;
        if (acts.contains(e.target) || tools.contains(e.target)) return;
        acts.classList.remove("tools-open");
        tools.setAttribute("aria-expanded", "false");
      });
      acts.addEventListener("click", function (e) {
        // fermer le popover apr\u00e8s avoir lanc\u00e9 une action
        if (e.target.closest("button")) {
          acts.classList.remove("tools-open");
          tools.setAttribute("aria-expanded", "false");
        }
      });
    }

    rot = 0; vel = 0; pxv = 0; pxTarget = 0; frontIdx = -1; hoverIdx = -1;
    mode = "idle"; targetRot = 0; overStage = false; mxNorm = 0; velTarget = 0;
    startTime = performance.now();
    active = true;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }

  var rebuildT = 0;
  function scheduleBuild() {
    clearTimeout(rebuildT);
    rebuildT = setTimeout(build, 60);
  }

  function init() {
    var grid = document.getElementById("sector-grid");
    if (!grid) return;
    // reconstruire dès que le routeur regénère les cartes du secteur
    new MutationObserver(scheduleBuild).observe(grid, { childList: true });
    window.addEventListener("resize", function () { measure(); });
    // navigation clavier : flèches pour choisir, Entrée pour ouvrir
    document.addEventListener("keydown", function (e) {
      if (!active) return;
      var host = document.getElementById("view-sector");
      if (!host || host.hidden) return;
      var tg = (e.target && e.target.tagName) || "";
      if (/INPUT|TEXTAREA|SELECT/.test(tg) || (e.target && e.target.isContentEditable)) return;
      if (e.key === "ArrowLeft") { step(1); e.preventDefault(); }
      else if (e.key === "ArrowRight") { step(-1); e.preventDefault(); }
      else if (e.key === "Enter" || e.key === " ") { openFront(); e.preventDefault(); }
    });
    // construction initiale si on arrive directement sur un secteur
    var host = document.getElementById("view-sector");
    if (host && !host.hidden && grid.querySelector("a.card[data-mod]")) scheduleBuild();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 200); });
  } else { setTimeout(init, 200); }
})();
