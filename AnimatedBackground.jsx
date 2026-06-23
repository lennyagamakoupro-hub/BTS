/* ============================================================
   AnimatedBackground.jsx — LENNY (Netflix × cosmos immobilier)
   Composant React autonome : Canvas (particules + réseau) + calques CSS.
   CSS intégré (injecté une seule fois), aucun fichier externe requis.

   ── INTÉGRATION ────────────────────────────────────────────
   Dans App.js, monte-le une seule fois, AU-DESSUS de ton contenu.
   Il se place tout seul en position:fixed, z-index:-1, derrière tout.

     import AnimatedBackground from "./AnimatedBackground";

     export default function App() {
       return (
         <>
           <AnimatedBackground />     // fond fixe derrière tout
           <YourRoutes />             // ton contenu normal
         </>
       );
     }

   Important : ton <body>/conteneur racine doit être TRANSPARENT pour
   laisser voir le fond (mets un noir de secours sur <html>).
   Sur ce dépôt LENNY (vanilla JS), la version réellement déployée est
   lenny-bg.js + lenny-bg.css ; ce composant est l'équivalent React.
   ============================================================ */

import { useEffect } from "react";

/* Palette : surtout poussière neutre, quelques rouges, quelques accents. */
const PALETTE = [
  { c: "229,229,229", w: 30 }, // poussière claire
  { c: "150,150,160", w: 22 }, // poussière grise
  { c: "229,9,20",    w: 16 }, // rouge Netflix
  { c: "201,86,54",   w: 7  }, // rust
  { c: "47,93,122",   w: 7  }, // ardoise bleue
  { c: "61,107,72",   w: 6  }, // vert forêt
  { c: "181,132,48",  w: 6  }, // or
  { c: "122,58,81",   w: 5  }, // prune
  { c: "138,53,32",   w: 5  }, // brûlé orange
];

const GHOSTS = {
  skyline: "<svg viewBox='0 0 220 120'><rect x='6' y='54' width='34' height='62'/><rect x='48' y='30' width='30' height='86'/><rect x='86' y='66' width='26' height='50'/><rect x='120' y='14' width='32' height='102'/><rect x='160' y='44' width='30' height='72'/><rect x='196' y='72' width='18' height='44'/><path d='M55 44h16M55 58h16M55 72h16M127 28h18M127 44h18M127 60h18M127 76h18'/></svg>",
  house: "<svg viewBox='0 0 140 120'><path d='M12 56 70 14l58 42'/><rect x='26' y='56' width='88' height='52'/><rect x='58' y='78' width='24' height='30'/><rect x='36' y='66' width='16' height='14'/><rect x='90' y='66' width='16' height='14'/></svg>",
  key: "<svg viewBox='0 0 200 80'><circle cx='34' cy='40' r='24'/><circle cx='34' cy='40' r='9'/><path d='M58 40h126M168 40v18M150 40v14M132 40v14'/></svg>",
  chart: "<svg viewBox='0 0 180 120'><path d='M14 8v100h156'/><path d='M26 92 62 66 92 78 128 38 166 22'/><path d='M166 22v86M128 38v70M92 78v30M62 66v42'/></svg>",
  contract: "<svg viewBox='0 0 110 130'><rect x='10' y='8' width='90' height='114'/><path d='M24 30h62M24 46h62M24 62h62M24 78h44M24 100q10 -12 20 0t20 0'/></svg>",
};

const CSS = `
#lenny-bg-react{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;background:#000;contain:strict}
#lenny-bg-react .bg-grad{position:absolute;inset:-10%;background:
  radial-gradient(46% 52% at 16% 88%,rgba(60,4,4,.85)0%,rgba(26,0,0,.35)38%,transparent 70%),
  radial-gradient(44% 50% at 86% 12%,rgba(0,14,32,.80)0%,rgba(0,4,10,.30)40%,transparent 72%),
  radial-gradient(120% 120% at 50% 50%,#0a0a0a 0%,#050505 46%,#000 100%);
  animation:lbg-breathe 11s ease-in-out infinite;will-change:transform,opacity}
@keyframes lbg-breathe{0%,100%{transform:scale(1);opacity:.92}50%{transform:scale(1.06);opacity:1}}
#lenny-bg-react .bg-canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#lenny-bg-react .bg-ghosts{position:absolute;inset:0}
#lenny-bg-react .bg-ghosts svg{position:absolute;stroke:#fff;fill:none;stroke-width:1.2;vector-effect:non-scaling-stroke;filter:blur(.7px);will-change:transform}
#lenny-bg-react .g1{top:11%;left:4%;width:220px;opacity:.03;animation:lbg-a 64s ease-in-out infinite}
#lenny-bg-react .g2{top:58%;left:71%;width:290px;opacity:.032;animation:lbg-b 82s ease-in-out infinite}
#lenny-bg-react .g3{top:71%;left:14%;width:150px;opacity:.04;animation:lbg-a 73s ease-in-out infinite reverse}
#lenny-bg-react .g4{top:20%;left:61%;width:165px;opacity:.03;animation:lbg-b 90s ease-in-out infinite reverse}
#lenny-bg-react .g5{top:41%;left:39%;width:195px;opacity:.026;animation:lbg-a 100s ease-in-out infinite}
@keyframes lbg-a{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(34px,-26px) rotate(1.2deg)}}
@keyframes lbg-b{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(-40px,22px) rotate(-1deg)}}
#lenny-bg-react .bg-scan{position:absolute;inset:0;mix-blend-mode:overlay;background-image:repeating-linear-gradient(to bottom,rgba(255,255,255,.02)0,rgba(255,255,255,.02)1px,transparent 1px,transparent 4px)}
#lenny-bg-react .bg-scan::after{content:"";position:absolute;left:0;right:0;height:180px;top:-180px;background:linear-gradient(to bottom,transparent,rgba(229,9,20,.025)45%,rgba(255,255,255,.03)50%,rgba(229,9,20,.025)55%,transparent);animation:lbg-sweep 17s linear infinite}
@keyframes lbg-sweep{0%{transform:translateY(0)}100%{transform:translateY(calc(100vh + 360px))}}
#lenny-bg-react .bg-glow{position:absolute;top:0;left:0;width:620px;height:620px;margin:-310px 0 0 -310px;border-radius:50%;background:radial-gradient(circle,rgba(229,9,20,.07)0%,rgba(229,9,20,.03)30%,transparent 65%);opacity:0;transition:opacity .6s ease;transform:translate3d(-9999px,-9999px,0);will-change:transform,opacity}
#lenny-bg-react .bg-vignette{position:absolute;inset:0;background:radial-gradient(120% 120% at 50% 50%,transparent 52%,rgba(0,0,0,.55)82%,rgba(0,0,0,.9)100%);animation:lbg-vig 6s ease-in-out infinite}
@keyframes lbg-vig{0%,100%{opacity:.6}50%{opacity:.78}}
@media (prefers-reduced-motion:reduce){#lenny-bg-react .bg-grad,#lenny-bg-react .bg-vignette,#lenny-bg-react .bg-scan::after,#lenny-bg-react .bg-ghosts svg{animation:none!important}}
`;

export default function AnimatedBackground() {
  useEffect(() => {
    // ---- styles (une seule fois) ----
    if (!document.getElementById("lenny-bg-react-style")) {
      const st = document.createElement("style");
      st.id = "lenny-bg-react-style";
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const WTOTAL = PALETTE.reduce((s, p) => s + p.w, 0);
    const pickColor = () => {
      let r = Math.random() * WTOTAL;
      for (const p of PALETTE) { r -= p.w; if (r <= 0) return p.c; }
      return PALETTE[0].c;
    };

    // ---- DOM ----
    const root = document.createElement("div");
    root.id = "lenny-bg-react";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML =
      '<div class="bg-grad"></div>' +
      '<canvas class="bg-canvas"></canvas>' +
      '<div class="bg-ghosts">' +
        '<div class="g1">' + GHOSTS.skyline + "</div>" +
        '<div class="g2">' + GHOSTS.chart + "</div>" +
        '<div class="g3">' + GHOSTS.house + "</div>" +
        '<div class="g4">' + GHOSTS.key + "</div>" +
        '<div class="g5">' + GHOSTS.contract + "</div>" +
      "</div>" +
      '<div class="bg-scan"></div>' +
      '<div class="bg-glow"></div>' +
      '<div class="bg-vignette"></div>';
    document.body.insertBefore(root, document.body.firstChild);

    const canvas = root.querySelector(".bg-canvas");
    const glow = root.querySelector(".bg-glow");
    const ctx = canvas.getContext("2d", { alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, particles = [], linkDist = 130, raf = 0, running = true;

    const isMobile = () => window.innerWidth < 760;
    const targetCount = () => {
      const base = isMobile() ? 110 : 240;
      const byArea = Math.round((window.innerWidth * window.innerHeight) / 9000);
      return Math.max(70, Math.min(base, byArea));
    };
    const makeParticle = () => {
      const speed = 0.12 + Math.random() * 0.22;
      const ang = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed,
        r: 0.6 + Math.random() * 1.7, c: pickColor(),
        a: 0.18 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2, tws: 0.004 + Math.random() * 0.01,
      };
    };
    const build = () => {
      particles = Array.from({ length: targetCount() }, makeParticle);
      linkDist = isMobile() ? 96 : 130;
    };
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    };

    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 200); };
    window.addEventListener("resize", onResize);

    // ---- lueur curseur ----
    let mx = -9999, my = -9999, gx = -9999, gy = -9999, glowOn = false;
    const fine = window.matchMedia("(pointer:fine)").matches;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!glowOn) { glow.style.opacity = "1"; glowOn = true; }
    };
    const onLeave = () => { glow.style.opacity = "0"; glowOn = false; };
    if (!reduce && fine) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }

    const onVis = () => {
      running = !document.hidden;
      if (running) loop();
    };
    document.addEventListener("visibilitychange", onVis);

    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy; p.tw += p.tws;
          if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
          if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
        }
        const tw = 0.72 + 0.28 * Math.sin(p.tw);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + p.c + "," + (p.a * tw).toFixed(3) + ")";
        ctx.fill();
      }
      const ld2 = linkDist * linkDist;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
          if (d2 < ld2) {
            const alpha = (1 - d2 / ld2) * 0.15;
            if (alpha < 0.012) continue;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(150,150,160," + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      if (glowOn) {
        gx += (mx - gx) * 0.12; gy += (my - gy) * 0.12;
        glow.style.transform = "translate3d(" + gx + "px," + gy + "px,0)";
      }
      raf = requestAnimationFrame(loop);
    }

    resize();
    const start = setTimeout(loop, 60);

    // ---- cleanup ----
    return () => {
      running = false;
      clearTimeout(start);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      root.remove();
    };
  }, []);

  return null;
}
