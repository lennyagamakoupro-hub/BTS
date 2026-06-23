/* ============================================================
   LENNY · Ep 01 — La Première Impression
   ep01-shared.jsx — fondations : couleurs, décor, personnages,
   sous-titres synchronisés, briques UI réutilisables.
   Tout est exporté sur window (scope partagé entre fichiers Babel).
   ============================================================ */

const { useRef, useEffect, useState } = React;

/* ---- Palette LENNY ----------------------------------------- */
const C = {
  ink: "#000000",
  bg: "#0b0b0c",
  panel: "#141414",
  red: "#E50914",
  white: "#FFFFFF",
  grey: "#B3B3B3",
  rust: "#c95636",   // Module 01
  slate: "#2f5d7a",
  green: "#3d6b48",
  gold: "#b58430",
  plum: "#7a3a51",
  burnt: "#8a3520",
};
const MOD = C.rust; // accent du module 01

const FT = {
  title: "'Anton', 'Arial Narrow', sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// petit helper de mélange de couleur -> rgba
function rgba(hex, a) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/* ---- Grain + vignette + halo accent ------------------------ */
function Grain({ opacity = 0.05 }) {
  // bruit SVG figé, très léger
  const svg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
      "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
      "<rect width='140' height='140' filter='url(#n)' opacity='1'/></svg>"
    );
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `url("${svg}")`, backgroundSize: "280px 280px",
      opacity, mixBlendMode: "overlay", zIndex: 50,
    }} />
  );
}

function Vignette({ strength = 0.7 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 49,
      background: `radial-gradient(120% 120% at 50% 46%, transparent 50%, rgba(0,0,0,${strength}) 100%)`,
    }} />
  );
}

// Fond sombre + halo accent qui respire
function Backdrop({ accent = MOD, glow = 0.5, children }) {
  const t = useTime();
  const breathe = 0.92 + 0.08 * Math.sin(t * 0.7);
  return (
    <div style={{ position: "absolute", inset: 0, background: C.bg, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: "-15%",
        background: `radial-gradient(50% 55% at 22% 86%, ${rgba(accent, 0.32 * glow)} 0%, transparent 60%),
                     radial-gradient(46% 50% at 86% 12%, ${rgba("#00040a", 0.85)} 0%, transparent 64%),
                     radial-gradient(120% 120% at 50% 50%, #121214 0%, #08080a 60%, #000 100%)`,
        transform: `scale(${breathe})`,
      }} />
      {children}
      <Vignette />
      <Grain />
    </div>
  );
}

/* ---- Skyline fantomatique (fenêtre / déco) ----------------- */
function Skyline({ color = "#ffffff", opacity = 0.12, style }) {
  return (
    <svg viewBox="0 0 600 200" style={style} fill="none"
         stroke={color} strokeWidth="2" opacity={opacity}>
      <rect x="20" y="92" width="60" height="100" />
      <rect x="96" y="52" width="52" height="140" />
      <rect x="162" y="112" width="44" height="80" />
      <rect x="220" y="24" width="56" height="168" />
      <rect x="290" y="74" width="52" height="118" />
      <rect x="356" y="120" width="40" height="72" />
      <rect x="410" y="58" width="56" height="134" />
      <rect x="480" y="98" width="48" height="94" />
      <rect x="542" y="132" width="38" height="60" />
      <path d="M104 70h36M104 92h36M104 114h36M104 136h36M228 44h40M228 70h40M228 96h40M228 122h40M228 148h40M418 78h40M418 104h40M418 130h40" strokeWidth="1.4" />
    </svg>
  );
}

/* ---- Personnages : silhouettes flat 2D --------------------- */
// buste simple, différencié par couleur + petits accents.
function Person({ variant = "lenny", scale = 1, talking = false, mood = "neutral" }) {
  const t = useTime();
  const sway = Math.sin(t * 1.6) * (talking ? 2.2 : 0.8);
  const skins = { lenny: "#c98a63", sarah: "#caa07e", martin: "#bd8f6f" };
  const hair = { lenny: "#23211f", sarah: "#3a2118", martin: "#8a8a8a" };
  const cloth = { lenny: C.rust, sarah: "#26313b", martin: "#5a5f66" };
  const skin = skins[variant] || "#c98a63";

  // bouche animée si talking
  const mouthOpen = talking ? 3 + Math.abs(Math.sin(t * 9)) * 6 : 2.5;

  return (
    <svg viewBox="0 0 200 240" width={200 * scale} height={240 * scale}
         style={{ display: "block", overflow: "visible" }}>
      <g transform={`rotate(${sway} 100 230)`}>
        {/* épaules / buste */}
        <path d={`M30 240 Q30 150 100 150 Q170 150 170 240 Z`} fill={cloth[variant]} />
        {/* col / accent */}
        <path d="M82 152 L100 178 L118 152 Z" fill={rgba("#000", 0.25)} />
        {/* cou */}
        <rect x="88" y="120" width="24" height="34" rx="10" fill={skin} />
        {/* tête */}
        <ellipse cx="100" cy="96" rx="40" ry="44" fill={skin} />
        {/* cheveux */}
        {variant === "sarah" ? (
          <path d="M58 96 Q56 44 100 44 Q144 44 142 96 Q150 70 132 56 Q150 120 150 150 L140 150 Q150 110 130 86 Q120 60 100 60 Q80 60 70 86 Q50 110 60 150 L50 150 Q50 120 68 56 Q50 70 58 96 Z" fill={hair[variant]} />
        ) : (
          <path d="M60 92 Q56 50 100 50 Q144 50 140 92 Q140 70 120 62 Q108 56 100 56 Q92 56 80 62 Q60 70 60 92 Z" fill={hair[variant]} />
        )}
        {/* yeux */}
        <circle cx="86" cy="94" r="3.4" fill="#1b1b1b" />
        <circle cx="114" cy="94" r="3.4" fill="#1b1b1b" />
        {/* sourcils selon humeur */}
        {mood === "stress" && (
          <g stroke="#1b1b1b" strokeWidth="2.4" strokeLinecap="round">
            <path d="M78 84 L94 88" /><path d="M122 84 L106 88" />
          </g>
        )}
        {mood === "happy" && (
          <g stroke="#1b1b1b" strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M78 86 Q86 82 94 86" /><path d="M106 86 Q114 82 122 86" />
          </g>
        )}
        {/* bouche */}
        {mood === "happy"
          ? <path d="M86 112 Q100 124 114 112" stroke="#7a3b2e" strokeWidth="3" fill="none" strokeLinecap="round" />
          : <ellipse cx="100" cy="114" rx="8" ry={mouthOpen} fill="#5b2f27" />}
      </g>
    </svg>
  );
}

/* ---- Décor : intérieur d'agence ---------------------------- */
function AgencyRoom({ dim = 0 }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* mur */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1a1c20 0%,#121316 60%,#0c0d0f 100%)" }} />
      {/* fenêtre avec skyline nocturne */}
      <div style={{
        position: "absolute", left: 90, top: 120, width: 520, height: 300,
        background: "linear-gradient(180deg,#0a1622 0%,#0a0f17 100%)",
        border: "10px solid #0e0f11", borderRadius: 4,
        boxShadow: `0 0 60px ${rgba(C.slate, 0.35)} inset`,
      }}>
        <Skyline color={C.slate} opacity={0.5}
                 style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }} />
        {/* reflets lumières */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 40% at 30% 90%, ${rgba(C.gold, 0.18)}, transparent 70%)` }} />
      </div>
      {/* logo agence discret */}
      <div style={{
        position: "absolute", right: 120, top: 150, fontFamily: FT.title,
        fontSize: 38, letterSpacing: 2, color: rgba(C.white, 0.06),
      }}>AGENCE</div>
      {/* bureau */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 360,
        background: "linear-gradient(180deg,#16130f 0%,#0d0b08 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 300, height: 26,
        background: "linear-gradient(180deg,#3a2c1e,#241a11)", boxShadow: "0 14px 40px rgba(0,0,0,.5)" }} />
      {dim > 0 && <div style={{ position: "absolute", inset: 0, background: rgba("#000", dim) }} />}
    </div>
  );
}

/* ---- Sous-titres synchronisés (style Netflix) -------------- */
// CUES = [{ s: start, e: end, t: "texte", who?: "LENNY" }]
function Subtitles({ cues }) {
  const time = useTime();
  const cue = cues.find(c => time >= c.s && time < c.e);
  if (!cue) return null;
  const age = time - cue.s;
  const fade = Math.min(1, age / 0.18) * Math.min(1, (cue.e - time) / 0.18);
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: 70, transform: "translateX(-50%)",
      maxWidth: 1400, width: "max-content", textAlign: "center", zIndex: 60,
      opacity: fade, pointerEvents: "none",
    }}>
      {cue.who && (
        <div style={{ fontFamily: FT.title, fontSize: 22, letterSpacing: 3,
          color: cue.color || MOD, marginBottom: 8, textShadow: "0 2px 8px #000" }}>
          {cue.who}
        </div>
      )}
      <div style={{
        display: "inline-block", padding: "10px 22px", borderRadius: 8,
        background: "rgba(0,0,0,0.62)", backdropFilter: "blur(2px)",
        fontFamily: FT.body, fontWeight: 500, fontSize: 38, lineHeight: 1.3,
        color: C.white, textWrap: "balance", textShadow: "0 2px 10px rgba(0,0,0,.8)",
      }}>
        {cue.t}
      </div>
    </div>
  );
}

/* ---- Briques UI -------------------------------------------- */
// Badge module "4 min · Module 01"
function ModuleBadge({ label = "4 min · Module 01", accent = MOD }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 12, whiteSpace: "nowrap",
      padding: "10px 24px", borderRadius: 999, border: `1.5px solid ${rgba(accent, 0.6)}`,
      background: rgba(accent, 0.12), fontFamily: FT.mono, fontSize: 24,
      letterSpacing: 2, color: C.white, textTransform: "uppercase",
    }}>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: accent, flexShrink: 0,
        boxShadow: `0 0 14px ${accent}` }} />
      {label}
    </div>
  );
}

// Règle d'or — encadré rouge plein écran
function GoldenRule({ text, progress = 1 }) {
  const p = Easing.easeOutCubic(clamp(progress, 0, 1));
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * p})`,
      width: 1500, opacity: p, textAlign: "center",
    }}>
      <div style={{ fontFamily: FT.mono, fontSize: 26, letterSpacing: 6, color: C.red, marginBottom: 24 }}>
        ★ RÈGLE D'OR ★
      </div>
      <div style={{
        fontFamily: FT.title, fontSize: 72, lineHeight: 1.08, color: C.white,
        textTransform: "uppercase", letterSpacing: 1, whiteSpace: "pre",
        borderTop: `4px solid ${C.red}`, borderBottom: `4px solid ${C.red}`,
        padding: "34px 20px",
      }}>
        {text}
      </div>
    </div>
  );
}

// Panneau ATTENTION (piège)
function AttentionPanel({ children, progress = 1 }) {
  const p = Easing.easeOutBack(clamp(progress, 0, 1));
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * clamp(progress * 1.3, 0, 1)}) rotate(${(1 - clamp(progress, 0, 1)) * -6}deg)`,
      width: 980, opacity: clamp(progress * 1.5, 0, 1),
    }}>
      <div style={{
        background: "repeating-linear-gradient(45deg,#1a1a1a 0 28px,#0d0d0d 28px 56px)",
        border: `8px solid ${C.red}`, borderRadius: 14, padding: "0 0 36px",
        boxShadow: `0 30px 80px rgba(0,0,0,.6), 0 0 60px ${rgba(C.red, 0.3)}`,
      }}>
        <div style={{ background: C.red, padding: "14px 0", textAlign: "center",
          fontFamily: FT.title, fontSize: 44, letterSpacing: 6, color: C.white }}>
          ⚠ ATTENTION
        </div>
        <div style={{ padding: "34px 56px 0" }}>{children}</div>
      </div>
    </div>
  );
}

/* ---- export window ----------------------------------------- */
Object.assign(window, {
  C, MOD, FT, rgba,
  Grain, Vignette, Backdrop, Skyline, Person, AgencyRoom,
  Subtitles, ModuleBadge, GoldenRule, AttentionPanel,
});
