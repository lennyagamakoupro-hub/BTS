import React from "react";

// Bespoke SVG illustrations — one per BTS Transaction module. 600x400 viewBox.

const Wrap = ({ children, accent, id }) => (
  <svg viewBox="0 0 600 400" className="w-full h-full block" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id={`dots-${id}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill={accent} opacity="0.25" />
      </pattern>
      <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#0a0a0a" />
      </linearGradient>
      <radialGradient id={`glow-${id}`} cx="65%" cy="35%" r="55%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="600" height="400" fill={`url(#bg-${id})`} />
    <rect width="600" height="400" fill={`url(#glow-${id})`} />
    <rect width="600" height="400" fill={`url(#dots-${id})`} opacity="0.6" />
    {children}
  </svg>
);

// M1 — Accueil & Découverte (4×20, poignée de main, regard, sourire)
const M1 = ({ accent }) => (
  <Wrap accent={accent} id="m1">
    {/* 4 cadrans pour 4×20 */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle cx={130 + (i % 2) * 320} cy={130 + Math.floor(i / 2) * 160} r="50" fill="none" stroke={accent} strokeWidth="3" />
        <text x={130 + (i % 2) * 320} y={140 + Math.floor(i / 2) * 160} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="36" fill={accent}>20</text>
      </g>
    ))}
    <text x="300" y="225" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="52" fill={accent} letterSpacing="3">×</text>
    <text x="300" y="385" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={accent} letterSpacing="3">SEC · GESTES · MOTS · CM</text>
  </Wrap>
);

// M2 — Entreprises & Statuts (sigles juridiques + balance)
const M2 = ({ accent }) => (
  <Wrap accent={accent} id="m2">
    {["EI", "SARL", "SAS", "SA"].map((s, i) => (
      <g key={s}>
        <rect x={70 + i * 120} y={140} width="100" height="120" fill="none" stroke={accent} strokeWidth="2.5" />
        <text x={120 + i * 120} y={210} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={s.length > 2 ? "28" : "42"} fill={accent}>{s}</text>
      </g>
    ))}
    <text x="300" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill={accent} letterSpacing="4">HOGUET · ALUR · ELAN</text>
    <line x1="50" y1="295" x2="550" y2="295" stroke={accent} strokeWidth="2" />
    <text x="300" y="330" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="22" fill={accent} letterSpacing="2">CARTE T · G · S</text>
  </Wrap>
);

// M3 — Prospection (cercles concentriques zones + SMART)
const M3 = ({ accent }) => (
  <Wrap accent={accent} id="m3">
    <circle cx="240" cy="220" r="140" fill="none" stroke={accent} strokeWidth="2" opacity="0.4" />
    <circle cx="240" cy="220" r="90" fill="none" stroke={accent} strokeWidth="2.5" opacity="0.7" />
    <circle cx="240" cy="220" r="40" fill={accent} />
    <text x="240" y="228" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="28" fill="#0a0a0a">80%</text>
    <text x="240" y="135" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill={accent} letterSpacing="2">15%</text>
    <text x="240" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill={accent} letterSpacing="2">5%</text>
    {/* SMART vertical */}
    {["S", "M", "A", "R", "T"].map((l, i) => (
      <text key={i} x="480" y={140 + i * 36} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="34" fill={accent}>{l}</text>
    ))}
  </Wrap>
);

// M4 — Objectifs & Ratios (formules + flèches)
const M4 = ({ accent }) => (
  <Wrap accent={accent} id="m4">
    <text x="80" y="120" fontFamily="JetBrains Mono" fontSize="20" fill={accent}>FAI</text>
    <text x="160" y="120" fontFamily="JetBrains Mono" fontSize="20" fill={accent}>÷ 1,065</text>
    <text x="320" y="120" fontFamily="JetBrains Mono" fontSize="20" fill={accent}>=</text>
    <text x="370" y="120" fontFamily="JetBrains Mono" fontSize="20" fill={accent}>PNV</text>
    <line x1="50" y1="150" x2="550" y2="150" stroke={accent} strokeWidth="1" opacity="0.3" />
    <text x="80" y="200" fontFamily="JetBrains Mono" fontSize="18" fill={accent} opacity="0.85">CA ÷ ventes = Comm. moy.</text>
    <text x="80" y="240" fontFamily="JetBrains Mono" fontSize="18" fill={accent} opacity="0.7">ventes / mandats × 100 = TT</text>
    <text x="80" y="280" fontFamily="JetBrains Mono" fontSize="18" fill={accent} opacity="0.55">TTC ÷ 1,20 = HT</text>
    {/* Big % */}
    <text x="500" y="360" textAnchor="end" fontFamily="Anton, sans-serif" fontSize="160" fill={accent} opacity="0.85">%</text>
  </Wrap>
);

// M5 — Diagnostics (DPE strip)
const M5 = ({ accent }) => (
  <Wrap accent={accent} id="m5">
    {["A", "B", "C", "D", "E", "F", "G"].map((l, i) => (
      <g key={l}>
        <rect x={140} y={80 + i * 32} width={120 + i * 30} height="26" fill={accent} opacity={1 - i * 0.1} />
        <text x={130} y={100 + i * 32} textAnchor="end" fontFamily="Anton, sans-serif" fontSize="22" fill={accent}>{l}</text>
      </g>
    ))}
    <text x="500" y="100" textAnchor="end" fontFamily="JetBrains Mono" fontSize="14" fill={accent} letterSpacing="3">DPE · 10 ans</text>
    <text x="500" y="135" textAnchor="end" fontFamily="JetBrains Mono" fontSize="14" fill={accent} letterSpacing="3" opacity="0.7">ERP · 6 mois</text>
    <text x="500" y="170" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill={accent} letterSpacing="2" opacity="0.5">Plomb · 1949</text>
    <text x="500" y="195" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill={accent} letterSpacing="2" opacity="0.5">Amiante · 1997</text>
    <text x="500" y="220" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill={accent} letterSpacing="2" opacity="0.5">Gaz/Élec · 15 ans</text>
  </Wrap>
);

// M6 — Estimation & Avis de Valeur (balance + courbes prix)
const M6 = ({ accent }) => (
  <Wrap accent={accent} id="m6">
    {/* Balance */}
    <rect x="290" y="120" width="20" height="180" fill={accent} />
    <rect x="180" y="120" width="240" height="6" fill={accent} />
    <line x1="200" y1="126" x2="200" y2="180" stroke={accent} strokeWidth="2" />
    <line x1="400" y1="126" x2="400" y2="180" stroke={accent} strokeWidth="2" />
    <path d="M 160 180 L 240 180 L 230 215 L 170 215 Z" fill={accent} />
    <path d="M 360 180 L 440 180 L 430 215 L 370 215 Z" fill={accent} />
    <rect x="240" y="298" width="120" height="10" fill={accent} />
    <text x="200" y="206" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fontWeight="700" fill="#0a0a0a">€</text>
    <text x="400" y="206" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fontWeight="700" fill="#0a0a0a">m²</text>
    <text x="300" y="355" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fill={accent} letterSpacing="3">COMPARAISON · CAPITALISATION</text>
  </Wrap>
);

// M6b — Viager & Démembrement (sablier + flèches)
const M6B = ({ accent }) => (
  <Wrap accent={accent} id="m6b">
    {/* Hourglass */}
    <path d="M 230 120 L 370 120 L 300 220 L 230 320 L 370 320 L 300 220 Z" fill={accent} opacity="0.8" />
    <path d="M 230 120 L 370 120 L 300 220 L 230 320 L 370 320 L 300 220 Z" fill="none" stroke={accent} strokeWidth="3" />
    {/* Sand grains */}
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx="300" cy={230 + i * 8} r="2" fill="#0a0a0a" />
    ))}
    <text x="100" y="225" fontFamily="JetBrains Mono" fontSize="13" fill={accent} letterSpacing="2">USUFRUIT</text>
    <text x="500" y="225" textAnchor="end" fontFamily="JetBrains Mono" fontSize="13" fill={accent} letterSpacing="2">NUE-PROP.</text>
    <text x="300" y="380" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="20" fill={accent} letterSpacing="2">BOUQUET + RENTE</text>
  </Wrap>
);

// M8 — Mandats & Dossier (contrat + signature)
const M8 = ({ accent }) => (
  <Wrap accent={accent} id="m8">
    <rect x="180" y="80" width="240" height="280" fill={accent} />
    <rect x="200" y="105" width="200" height="3" fill="#0a0a0a" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={i} x="200" y={130 + i * 22} width={i % 3 === 0 ? 200 : 150} height="3" fill="#0a0a0a" opacity="0.7" />
    ))}
    {/* Signature */}
    <path d="M 210 320 Q 240 290 270 320 T 340 315 Q 360 305 380 320" fill="none" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round" />
    <text x="200" y="100" fontFamily="JetBrains Mono" fontSize="9" fill="#0a0a0a" letterSpacing="2">MANDAT EXCLUSIF · 9 MENTIONS</text>
  </Wrap>
);

// M11 — Financement (courbe exponentielle + €)
const M11 = ({ accent }) => (
  <Wrap accent={accent} id="m11">
    <text x="80" y="220" fontFamily="Anton, sans-serif" fontSize="180" fill={accent} opacity="0.85">€</text>
    {/* exponential curve */}
    <path d="M 60 350 Q 250 345 380 240 T 560 60" fill="none" stroke={accent} strokeWidth="5" />
    {/* dashed linear comparison */}
    <path d="M 60 350 L 560 150" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
    <text x="500" y="100" textAnchor="end" fontFamily="JetBrains Mono" fontSize="12" fill={accent} letterSpacing="3">(1+t)ⁿ</text>
    <text x="500" y="200" textAnchor="end" fontFamily="JetBrains Mono" fontSize="11" fill={accent} letterSpacing="2" opacity="0.6">I = C × t × n</text>
  </Wrap>
);

// SYN — Synthèse (boussole)
const SYN = ({ accent }) => (
  <Wrap accent={accent} id="syn">
    <circle cx="300" cy="220" r="130" fill="none" stroke={accent} strokeWidth="3" />
    <circle cx="300" cy="220" r="100" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
    {/* compass needle */}
    <path d="M 300 100 L 320 220 L 300 340 L 280 220 Z" fill={accent} />
    <path d="M 180 220 L 300 200 L 420 220 L 300 240 Z" fill={accent} opacity="0.6" />
    <circle cx="300" cy="220" r="10" fill="#0a0a0a" />
    {/* N */}
    <text x="300" y="80" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="28" fill={accent}>N</text>
    <text x="300" y="380" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill={accent} letterSpacing="4">10 RÈGLES D'OR</text>
  </Wrap>
);

const MAP = {
  m1: M1, m2: M2, m3: M3, m4: M4,
  m5: M5, m6: M6, m6b: M6B, m8: M8,
  m11: M11, syn: SYN,
};

export const Illustration = ({ fiche, className = "" }) => {
  const Cmp = MAP[fiche.id];
  if (!Cmp) {
    return (
      <div className={`relative w-full h-full ${className}`} style={{ background: `linear-gradient(135deg, ${fiche.accent}33, #0a0a0a)` }}>
        <div className="absolute -right-4 -bottom-8 font-brand select-none opacity-80" style={{ fontSize: "10rem", color: fiche.accent }}>
          {fiche.title.charAt(0)}
        </div>
      </div>
    );
  }
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Cmp accent={fiche.accent} />
    </div>
  );
};
