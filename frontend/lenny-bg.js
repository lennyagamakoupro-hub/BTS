/* ============================================
   LENNY — Fond animé ambiant : moteur Canvas + calques
   Particules dérivantes, réseau de connexions, lueur au curseur.
   - 200-300 particules max (÷2 sur mobile), resize throttlé.
   - Pause quand l'onglet est masqué. Respecte prefers-reduced-motion.
   - Construit tout le DOM #lenny-bg lui-même : il suffit d'inclure ce
     fichier + lenny-bg.css. Aucun markup à ajouter.
   ============================================ */
(function () {
  if (document.getElementById("lenny-bg")) return;

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Silhouettes immobilières (primitives géométriques) ------ */
  var GHOSTS = {
    // skyline d'immeubles
    skyline: "<svg viewBox='0 0 220 120'><rect x='6' y='54' width='34' height='62'/><rect x='48' y='30' width='30' height='86'/><rect x='86' y='66' width='26' height='50'/><rect x='120' y='14' width='32' height='102'/><rect x='160' y='44' width='30' height='72'/><rect x='196' y='72' width='18' height='44'/><path d='M55 44h16M55 58h16M55 72h16M127 28h18M127 44h18M127 60h18M127 76h18'/></svg>",
    // maison
    house: "<svg viewBox='0 0 140 120'><path d='M12 56 70 14l58 42'/><rect x='26' y='56' width='88' height='52'/><rect x='58' y='78' width='24' height='30'/><rect x='36' y='66' width='16' height='14'/><rect x='90' y='66' width='16' height='14'/></svg>",
    // clé
    key: "<svg viewBox='0 0 200 80'><circle cx='34' cy='40' r='24'/><circle cx='34' cy='40' r='9'/><path d='M58 40h126M168 40v18M150 40v14M132 40v14'/></svg>",
    // courbe de taux
    chart: "<svg viewBox='0 0 180 120'><path d='M14 8v100h156'/><path d='M26 92 62 66 92 78 128 38 166 22'/><path d='M166 22v86M128 38v70M92 78v30M62 66v42'/></svg>",
    // contrat de mandat
    contract: "<svg viewBox='0 0 110 130'><rect x='10' y='8' width='90' height='114'/><path d='M24 30h62M24 46h62M24 62h62M24 78h44M24 100q10 -12 20 0t20 0'/></svg>"
  };

  /* ---- Palette particules (Netflix + accents modules) ---------- */
  // poids : surtout poussière neutre, quelques rouges, quelques accents
  var PALETTE = [
    { c: "229,229,229", w: 30 }, // poussière claire
    { c: "150,150,160", w: 22 }, // poussière grise
    { c: "229,9,20",    w: 16 }, // rouge Netflix
    { c: "201,86,54",   w: 7  }, // rust
    { c: "47,93,122",   w: 7  }, // ardoise bleue
    { c: "61,107,72",   w: 6  }, // vert forêt
    { c: "181,132,48",  w: 6  }, // or
    { c: "122,58,81",   w: 5  }, // prune
    { c: "138,53,32",   w: 5  }  // brûlé orange
  ];
  var WTOTAL = PALETTE.reduce(function (s, p) { return s + p.w; }, 0);
  function pickColor() {
    var r = Math.random() * WTOTAL;
    for (var i = 0; i < PALETTE.length; i++) {
      r -= PALETTE[i].w;
      if (r <= 0) return PALETTE[i].c;
    }
    return PALETTE[0].c;
  }

  /* ---- Construction du DOM ------------------------------------- */
  var root = document.createElement("div");
  root.id = "lenny-bg";
  root.setAttribute("aria-hidden", "true");

  var grad = document.createElement("div"); grad.className = "bg-grad";
  var canvas = document.createElement("canvas"); canvas.className = "bg-canvas";
  var ghosts = document.createElement("div"); ghosts.className = "bg-ghosts";
  ghosts.innerHTML =
    "<div class='ghost-1'>" + GHOSTS.skyline + "</div>" +
    "<div class='ghost-2'>" + GHOSTS.chart + "</div>" +
    "<div class='ghost-3'>" + GHOSTS.house + "</div>" +
    "<div class='ghost-4'>" + GHOSTS.key + "</div>" +
    "<div class='ghost-5'>" + GHOSTS.contract + "</div>";
  var scan = document.createElement("div"); scan.className = "bg-scan";
  var glow = document.createElement("div"); glow.className = "bg-glow";
  var vignette = document.createElement("div"); vignette.className = "bg-vignette";

  root.appendChild(grad);
  root.appendChild(canvas);
  root.appendChild(ghosts);
  root.appendChild(scan);
  root.appendChild(glow);
  root.appendChild(vignette);

  function mount() {
    document.body.insertBefore(root, document.body.firstChild);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  /* ---- Canvas particules -------------------------------------- */
  var ctx = canvas.getContext("2d", { alpha: true });
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, particles = [], linkDist = 130;

  function isMobile() { return window.innerWidth < 760; }

  function targetCount() {
    var base = isMobile() ? 110 : 240;
    // densité ∝ surface, bornée
    var byArea = Math.round((window.innerWidth * window.innerHeight) / 9000);
    return Math.max(70, Math.min(base, byArea));
  }

  function makeParticle() {
    var speed = 0.26 + Math.random() * 0.46;
    var ang = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      r: 0.6 + Math.random() * 1.7,
      c: pickColor(),
      a: 0.18 + Math.random() * 0.5,
      tw: Math.random() * Math.PI * 2,      // phase scintillement
      tws: 0.004 + Math.random() * 0.01     // vitesse scintillement
    };
  }

  function build() {
    var n = targetCount();
    particles = [];
    for (var i = 0; i < n; i++) particles.push(makeParticle());
    linkDist = isMobile() ? 96 : 130;
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
  }

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 200);
  });

  /* ---- Lueur curseur ------------------------------------------ */
  var mx = -9999, my = -9999, gx = -9999, gy = -9999, glowOn = false;
  if (!reduce && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!glowOn) { glow.style.opacity = "1"; glowOn = true; }
    }, { passive: true });
    window.addEventListener("mouseleave", function () {
      glow.style.opacity = "0"; glowOn = false;
    });
  }

  /* ---- Boucle ------------------------------------------------- */
  var running = true;
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) loop();
  });

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    var i, p, q;

    // déplacement + scintillement + rendu points
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      if (!reduce) {
        p.x += p.vx; p.y += p.vy;
        p.tw += p.tws;
        // ré-enroulement aux bords
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
      }
      var tw = 0.72 + 0.28 * Math.sin(p.tw);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + p.c + "," + (p.a * tw).toFixed(3) + ")";
      ctx.fill();
    }

    // connexions entre voisins (réseau organique)
    var ld2 = linkDist * linkDist;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      for (var j = i + 1; j < particles.length; j++) {
        q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < ld2) {
          var t = 1 - d2 / ld2;            // 0..1 selon proximité
          var alpha = t * 0.15;            // opacité max 0.15
          if (alpha < 0.012) continue;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(150,150,160," + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // lueur curseur (suivi amorti)
    if (glowOn) {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.transform = "translate3d(" + gx + "px," + gy + "px,0)";
    }

    requestAnimationFrame(loop);
  }

  resize();
  // démarrage différé pour ne pas concurrencer le boot
  setTimeout(loop, 60);
})();
