/* ============================================
   LENNY — Hero villa : scène Intérieur / Extérieur
   La couche extérieure (l'environnement : villa, jardin, piscine au
   couchant) est le fond. La couche intérieure se révèle à droite au
   passage de la souris. Parallaxe douce + poussières dorées sur canvas.
   Cible : .hero > .hero-bg > .hg-stage (#hg-parallax, #hg-int, #hg-divider,
   #hero-canvas, #hg-tagline). Respecte prefers-reduced-motion.
   ============================================ */
(function () {
  function ready(fn){ document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn(); }

  ready(function () {
    const hero    = document.querySelector(".hero");
    const stage   = document.getElementById("hg-stage");
    const wrap     = document.getElementById("hg-parallax");
    const intLayer = document.getElementById("hg-int");
    const divider  = document.getElementById("hg-divider");
    const tagline  = document.getElementById("hg-tagline");
    const canvas   = document.getElementById("hero-canvas");
    if (!hero || !stage || !wrap || !intLayer || !canvas) return;

    const ctx    = canvas.getContext("2d");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine   = window.matchMedia && window.matchMedia("(pointer:fine)").matches;

    let W = 0, H = 0, DPR = 1;
    let targetX = 0, smoothX = 0;          // position du « split »
    let mouseNX = 0, mouseNY = 0;          // souris normalisée -1..1
    let plxX = 0, plxY = 0;                // parallaxe lissée
    let active = false, running = true;
    const PLX = 14;                        // amplitude parallaxe (px)
    const DEFAULT_RATIO = 0.6;             // split au repos

    /* ---- poussières dorées (transparent, par-dessus l'extérieur) ---- */
    let dust = [];
    function buildDust() {
      const n = W < 700 ? 26 : 46;
      dust = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.6 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.06 - Math.random() * 0.2,
        a:  Math.random() * Math.PI * 2,
        da: (Math.random() - 0.5) * 0.008,
        op: 0.12 + Math.random() * 0.4,
        tw: Math.random() * Math.PI * 2,
        ts: 0.012 + Math.random() * 0.022,
        warm: Math.random() < 0.5,
      }));
    }

    function resize() {
      const r = hero.getBoundingClientRect();
      W = Math.max(320, r.width);
      H = Math.max(360, r.height);
      DPR = Math.min(2, window.devicePixelRatio || 1);
      canvas.width  = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (!active) { targetX = smoothX = W * DEFAULT_RATIO; }
      buildDust();
    }

    function applySplit(x) {
      const sx = Math.round(x);
      intLayer.style.clipPath = "inset(0 0 0 " + Math.max(0, sx) + "px)";
      if (divider) divider.style.left = sx + "px";
    }

    /* ---- boucle ---- */
    function frame() {
      if (!running) return;

      smoothX += (targetX - smoothX) * 0.08;
      applySplit(smoothX);

      // parallaxe (wrapper en sens inverse de la souris)
      if (!reduce) {
        plxX += (mouseNX * -PLX - plxX) * 0.05;
        plxY += (mouseNY * -PLX - plxY) * 0.05;
        wrap.style.transform = "translate(" + plxX.toFixed(2) + "px," + plxY.toFixed(2) + "px)";
      }

      // poussières
      ctx.clearRect(0, 0, W, H);
      if (!reduce) {
        for (const d of dust) {
          d.x += d.vx + Math.sin(d.a) * 0.1;
          d.y += d.vy;
          d.a += d.da;
          d.tw += d.ts;
          if (d.y < -4) { d.y = H + 4; d.x = Math.random() * W; }
          if (d.x < -4) d.x = W + 4; else if (d.x > W + 4) d.x = -4;
          const alpha = d.op * (0.55 + 0.45 * Math.sin(d.tw));
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = d.warm
            ? "rgba(255,214,140," + alpha.toFixed(2) + ")"
            : "rgba(255,238,210," + alpha.toFixed(2) + ")";
          ctx.fill();
        }
      }

      requestAnimationFrame(frame);
    }

    /* ---- interaction souris ---- */
    function onMove(cx, cy) {
      const r = hero.getBoundingClientRect();
      if (!active) {
        active = true;
        if (divider) divider.style.opacity = "1";
        if (tagline) tagline.style.opacity = "0";
      }
      targetX = Math.max(0, Math.min(W, cx - r.left));
      mouseNX = ((cx - r.left) / W) * 2 - 1;
      mouseNY = ((cy - r.top) / H) * 2 - 1;
    }

    if (fine && !reduce) {
      window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY), { passive: true });
    }
    window.addEventListener("touchmove", (e) => {
      if (!e.touches[0]) return;
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    /* ---- pause hors-écran ---- */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          running = en.isIntersecting;
          if (running) requestAnimationFrame(frame);
        });
      }, { threshold: 0.02 }).observe(hero);
    }

    let rT;
    window.addEventListener("resize", () => {
      clearTimeout(rT);
      rT = setTimeout(resize, 150);
    });

    resize();
    applySplit(smoothX);
    if (reduce) {
      // état statique lisible : split au repos, pas d'animation
      if (divider) divider.style.opacity = ".6";
    }
    requestAnimationFrame(frame);
  });
})();
