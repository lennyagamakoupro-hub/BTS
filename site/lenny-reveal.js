/* ============================================================
   LENNY — Reveal (après déverrouillage)
   Fond animé WebGL (shader « nuages cosmiques ») plein écran,
   sans texte. On fait glisser (molette / doigt) pour révéler le
   bouton « Entrer » (liquid glass), puis on entre sur le site.

   Contrat identique à l'ancienne intro :
     LennyReveal.play({ manualStart }) -> { start, promise, stage }
   ============================================================ */
(function () {
  "use strict";

  var played = false;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function play(opts) {
    opts = opts || {};
    if (played && !opts.force) return null;
    played = true;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var stage = el("div", "lr-stage");
    stage.setAttribute("role", "dialog");
    stage.setAttribute("aria-label", "Bienvenue sur LENNY");

    // fond animé (shader) — rempli en JS
    var bg = el("div", "lr-bg");
    // voile sombre qui se lève légèrement avec la progression
    var veil = el("div", "lr-veil");

    var hint = el("div", "lr-hint",
      '<div class="lr-mouse"></div><div>Fais glisser pour entrer</div>');

    var prog = el("div", "lr-prog");

    var enter = el("div", "lr-enter");
    // bouton « liquid glass »
    var enterBtn = el("button", "lq-btn lq-btn-xl",
      '<span class="lq-edge"></span><span class="lq-face">Entrer dans LENNY ' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>');
    enter.appendChild(enterBtn);

    stage.appendChild(bg);
    stage.appendChild(veil);
    stage.appendChild(hint);
    stage.appendChild(prog);
    stage.appendChild(enter);
    document.body.appendChild(stage);

    // monte le fond animé
    var shader = null;
    try { if (window.LennyShaderBG) shader = window.LennyShaderBG.mount(bg); } catch (e) {}

    // ---- état ----
    var progress = 0;
    var fullyExpanded = false;
    var active = false;
    var touchStartY = 0;
    var done = false;
    var resolveFn;
    var promise = new Promise(function (r) { resolveFn = r; });

    function render() {
      var p = progress;
      // le fond se rapproche légèrement (settle-in) + s'éclaircit
      bg.style.transform = "scale(" + (1.12 - p * 0.12).toFixed(4) + ")";
      veil.style.opacity = String(0.55 - p * 0.4);
      prog.style.width = (p * 100).toFixed(1) + "%";
      hint.style.opacity = p > 0.02 ? "0" : "1";
    }

    function setExpanded(v) {
      if (v === fullyExpanded) return;
      fullyExpanded = v;
      enter.classList.toggle("show", v);
    }

    function bump(d) {
      if (!active || done) return;
      progress = Math.min(1, Math.max(0, progress + d));
      render();
      if (progress >= 1) setExpanded(true);
      else if (progress < 0.92) setExpanded(false);
    }

    function onWheel(e) {
      if (!active || done) return;
      if (fullyExpanded) {
        if (e.deltaY > 0) { e.preventDefault(); finish(); }
        else { e.preventDefault(); bump(e.deltaY * 0.0009); }
        return;
      }
      e.preventDefault();
      bump(e.deltaY * 0.0009);
    }
    function onTouchStart(e) { touchStartY = e.touches[0].clientY; }
    function onTouchMove(e) {
      if (!active || done || !touchStartY) return;
      var y = e.touches[0].clientY, dy = touchStartY - y;
      if (fullyExpanded && dy > 24) { e.preventDefault(); finish(); return; }
      e.preventDefault();
      bump(dy * (dy < 0 ? 0.008 : 0.006));
      touchStartY = y;
    }
    function onTouchEnd() { touchStartY = 0; }
    function onKey(e) {
      if (!active || done) return;
      if (e.key === "Escape") finish();
      else if (e.key === "Enter" || e.key === " ") { if (fullyExpanded) finish(); else bump(0.18); }
      else if (e.key === "ArrowDown") { e.preventDefault(); fullyExpanded ? finish() : bump(0.12); }
      else if (e.key === "ArrowUp") { e.preventDefault(); bump(-0.12); }
    }

    function finish() {
      if (done) return;
      done = true;
      stage.classList.add("lr-out");
      try { document.documentElement.style.overflow = ""; } catch (e) {}
      setTimeout(function () {
        cleanup();
        if (shader && shader.destroy) shader.destroy();
        if (stage.parentNode) stage.parentNode.removeChild(stage);
        resolveFn();
      }, 720);
    }

    function cleanup() {
      window.removeEventListener("wheel", onWheel, { passive: false });
      window.removeEventListener("touchstart", onTouchStart, { passive: false });
      window.removeEventListener("touchmove", onTouchMove, { passive: false });
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    }

    enterBtn.addEventListener("click", finish);

    function start() {
      if (active || done) return;
      active = true;
      try { document.documentElement.style.overflow = "hidden"; } catch (e) {}
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("keydown", onKey);
      if (reduce) { progress = 1; render(); setExpanded(true); }
      else render();
    }

    render();
    return { promise: promise, start: start, stage: stage };
  }

  window.LennyReveal = { play: play };
})();
