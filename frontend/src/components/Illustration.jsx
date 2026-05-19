import React from "react";

// Bespoke SVG illustrations — one per fiche. 600x400 viewBox.
// Each takes accent color from the fiche.

const Wrap = ({ children, accent }) => (
  <svg viewBox="0 0 600 400" className="w-full h-full block" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id={`dots-${accent}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill={accent} opacity="0.25" />
      </pattern>
      <linearGradient id={`bg-${accent}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#0a0a0a" />
      </linearGradient>
      <radialGradient id={`glow-${accent}`} cx="65%" cy="35%" r="55%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="600" height="400" fill={`url(#bg-${accent})`} />
    <rect width="600" height="400" fill={`url(#glow-${accent})`} />
    <rect width="600" height="400" fill={`url(#dots-${accent})`} opacity="0.6" />
    {children}
  </svg>
);

// 01 — Fontaine
const Fontaine = ({ accent }) => (
  <Wrap accent={accent}>
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx="380" cy={120 + i * 32} r={3 + i * 0.5} fill={accent} opacity={0.8 - i * 0.12} />
    ))}
    <rect x="320" y="270" width="160" height="14" fill={accent} />
    <rect x="335" y="284" width="130" height="80" fill="none" stroke={accent} strokeWidth="3" />
    <path d="M 335 284 Q 400 360 465 284" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
    <circle cx="380" cy="100" r="14" fill={accent} />
  </Wrap>
);

// 02 — Boule de neige
const Boule = ({ accent }) => (
  <Wrap accent={accent}>
    <circle cx="380" cy="220" r="120" fill={accent} />
    <circle cx="340" cy="180" r="55" fill="#0a0a0a" opacity="0.4" />
    <circle cx="360" cy="200" r="22" fill={accent} />
    <circle cx="355" cy="195" r="9" fill="#0a0a0a" />
    {/* Trail */}
    <path d="M 80 350 Q 200 340 280 280" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" strokeDasharray="4 6" />
    {[80, 130, 180, 230].map((cx, i) => (
      <circle key={i} cx={cx} cy={355 - i * 8} r={6 + i * 4} fill={accent} opacity={0.3 + i * 0.1} />
    ))}
  </Wrap>
);

// 03 — Pizza (12 parts)
const Pizza = ({ accent }) => (
  <Wrap accent={accent}>
    <circle cx="300" cy="200" r="140" fill={accent} />
    <circle cx="300" cy="200" r="140" fill="#0a0a0a" opacity="0.2" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * Math.PI * 2) / 12;
      return <line key={i} x1="300" y1="200" x2={300 + Math.cos(a) * 140} y2={200 + Math.sin(a) * 140} stroke="#0a0a0a" strokeWidth="2" />;
    })}
    <circle cx="260" cy="170" r="8" fill="#0a0a0a" />
    <circle cx="340" cy="190" r="6" fill="#0a0a0a" />
    <circle cx="310" cy="240" r="7" fill="#0a0a0a" />
    <circle cx="270" cy="220" r="5" fill="#0a0a0a" />
  </Wrap>
);

// 04 — Balance
const Balance = ({ accent }) => (
  <Wrap accent={accent}>
    <rect x="290" y="100" width="20" height="200" fill={accent} />
    <rect x="180" y="100" width="240" height="8" fill={accent} />
    <line x1="200" y1="108" x2="200" y2="180" stroke={accent} strokeWidth="2" />
    <line x1="400" y1="108" x2="400" y2="180" stroke={accent} strokeWidth="2" />
    <path d="M 160 180 L 240 180 L 230 220 L 170 220 Z" fill={accent} />
    <path d="M 360 180 L 440 180 L 430 220 L 370 220 Z" fill={accent} />
    <rect x="240" y="298" width="120" height="12" fill={accent} />
    <text x="200" y="208" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="20" fontWeight="700" fill="#0a0a0a">=</text>
    <text x="400" y="208" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="20" fontWeight="700" fill="#0a0a0a">=</text>
  </Wrap>
);

// 05 — Loi Hoguet (shield + date)
const Hoguet = ({ accent }) => (
  <Wrap accent={accent}>
    <path d="M 300 80 L 420 130 L 420 230 Q 420 310 300 340 Q 180 310 180 230 L 180 130 Z" fill={accent} />
    <path d="M 300 100 L 400 142 L 400 225 Q 400 290 300 318 Q 200 290 200 225 L 200 142 Z" fill="none" stroke="#0a0a0a" strokeWidth="3" />
    <text x="300" y="225" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="64" fill="#0a0a0a">1970</text>
    <text x="300" y="265" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fill="#0a0a0a" letterSpacing="2">HOGUET</text>
  </Wrap>
);

// 06 — Mandat (contract with signature)
const Mandat = ({ accent }) => (
  <Wrap accent={accent}>
    <rect x="200" y="80" width="220" height="280" fill={accent} />
    <rect x="220" y="100" width="180" height="3" fill="#0a0a0a" />
    <rect x="220" y="120" width="180" height="3" fill="#0a0a0a" />
    <rect x="220" y="140" width="180" height="3" fill="#0a0a0a" />
    <rect x="220" y="160" width="120" height="3" fill="#0a0a0a" />
    <rect x="220" y="200" width="180" height="3" fill="#0a0a0a" />
    <rect x="220" y="220" width="160" height="3" fill="#0a0a0a" />
    <path d="M 230 310 Q 260 280 290 310 T 360 305" fill="none" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round" />
    <line x1="220" y1="335" x2="400" y2="335" stroke="#0a0a0a" strokeWidth="1" strokeDasharray="3 3" />
  </Wrap>
);

// 07 — Copropriété (building)
const Copro = ({ accent }) => (
  <Wrap accent={accent}>
    <rect x="180" y="100" width="240" height="260" fill={accent} />
    {[0, 1, 2, 3].map((row) => (
      [0, 1, 2, 3].map((col) => (
        <rect key={`${row}-${col}`} x={205 + col * 50} y={125 + row * 60} width="35" height="40" fill="#0a0a0a" />
      ))
    ))}
    <rect x="285" y="320" width="30" height="40" fill="#0a0a0a" />
  </Wrap>
);

// 08 — Bail (key + door)
const Bail = ({ accent }) => (
  <Wrap accent={accent}>
    <rect x="260" y="100" width="120" height="240" fill={accent} />
    <circle cx="365" cy="220" r="6" fill="#0a0a0a" />
    {/* Key */}
    <circle cx="160" cy="220" r="34" fill="none" stroke={accent} strokeWidth="12" />
    <rect x="190" y="214" width="80" height="12" fill={accent} />
    <rect x="240" y="226" width="8" height="14" fill={accent} />
    <rect x="258" y="226" width="8" height="20" fill={accent} />
  </Wrap>
);

// 09 — Compromis (handshake-ish)
const Compromis = ({ accent }) => (
  <Wrap accent={accent}>
    <path d="M 120 230 L 280 230 L 280 210 L 320 230 L 280 250 L 280 230" fill="none" stroke={accent} strokeWidth="14" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M 320 230 L 480 230" fill="none" stroke={accent} strokeWidth="14" strokeLinecap="round" />
    <circle cx="160" cy="170" r="40" fill={accent} />
    <circle cx="440" cy="170" r="40" fill={accent} />
    <rect x="290" y="270" width="20" height="3" fill={accent} opacity="0.5" />
    <text x="300" y="320" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fill={accent} letterSpacing="3">PSV / PUV</text>
  </Wrap>
);

// 10 — Diagnostics (DPE energy strip)
const Diagnostics = ({ accent }) => (
  <Wrap accent={accent}>
    {["A", "B", "C", "D", "E", "F", "G"].map((l, i) => (
      <g key={l}>
        <rect x={180} y={90 + i * 32} width={140 + i * 30} height="26" fill={accent} opacity={1 - i * 0.1} />
        <text x={170} y={110 + i * 32} textAnchor="end" fontFamily="Anton, sans-serif" fontSize="22" fill={accent}>{l}</text>
      </g>
    ))}
    <path d="M 460 100 L 460 280 L 480 280 L 480 100 Z" fill={accent} opacity="0.3" />
    <text x="500" y="200" fontFamily="JetBrains Mono" fontSize="11" fill={accent} letterSpacing="2">DPE</text>
  </Wrap>
);

// 11 — Plus-value (arrow up + euro)
const PlusValue = ({ accent }) => (
  <Wrap accent={accent}>
    <path d="M 150 320 L 280 240 L 350 280 L 480 100" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="square" />
    <path d="M 460 90 L 490 90 L 490 120" fill="none" stroke={accent} strokeWidth="6" />
    <text x="120" y="160" fontFamily="Anton, sans-serif" fontSize="120" fill={accent}>€</text>
    <circle cx="150" cy="320" r="5" fill={accent} />
    <circle cx="280" cy="240" r="5" fill={accent} />
    <circle cx="350" cy="280" r="5" fill={accent} />
  </Wrap>
);

// 12 — Financement (euro stack)
const Financement = ({ accent }) => (
  <Wrap accent={accent}>
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={200 - i * 6} y={300 - i * 35} width={200 + i * 12} height="28" fill={accent} opacity={1 - i * 0.12} />
    ))}
    <text x="300" y="190" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="110" fill="#0a0a0a">€</text>
    <text x="490" y="80" textAnchor="end" fontFamily="JetBrains Mono" fontSize="14" fill={accent} letterSpacing="3">TAEG</text>
  </Wrap>
);

// 13 — État des lieux (clipboard)
const EDL = ({ accent }) => (
  <Wrap accent={accent}>
    <rect x="220" y="90" width="180" height="270" fill={accent} />
    <rect x="270" y="80" width="80" height="22" fill="#0a0a0a" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={240} y={130 + i * 40} width="20" height="20" fill="none" stroke="#0a0a0a" strokeWidth="3" />
        <path d={`M ${245} ${140 + i * 40} L ${250} ${146 + i * 40} L ${258} ${134 + i * 40}`} fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={270} y={135 + i * 40} width={i % 2 === 0 ? 100 : 80} height="10" fill="#0a0a0a" />
      </g>
    ))}
  </Wrap>
);

// 14 — Charges (receipt)
const Charges = ({ accent }) => (
  <Wrap accent={accent}>
    <path d="M 220 80 L 380 80 L 380 350 L 360 340 L 340 350 L 320 340 L 300 350 L 280 340 L 260 350 L 240 340 L 220 350 Z" fill={accent} />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x="240" y={120 + i * 32} width="80" height="6" fill="#0a0a0a" />
        <rect x="320" y={120 + i * 32} width="40" height="6" fill="#0a0a0a" />
      </g>
    ))}
    <rect x="240" y="290" width="120" height="3" fill="#0a0a0a" />
    <rect x="240" y="300" width="120" height="10" fill="#0a0a0a" />
  </Wrap>
);

// 15 — Encadrement (ruler with limit)
const Encadrement = ({ accent }) => (
  <Wrap accent={accent}>
    <rect x="100" y="180" width="400" height="40" fill={accent} />
    {Array.from({ length: 11 }).map((_, i) => (
      <line key={i} x1={100 + i * 40} y1="180" x2={100 + i * 40} y2={i % 2 === 0 ? "160" : "170"} stroke="#0a0a0a" strokeWidth="2" />
    ))}
    <rect x="240" y="100" width="120" height="80" fill="#0a0a0a" />
    <text x="300" y="148" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="42" fill={accent}>MAX</text>
    <text x="500" y="280" textAnchor="end" fontFamily="JetBrains Mono" fontSize="13" fill={accent} letterSpacing="3">+20 %</text>
  </Wrap>
);

// 16 — RE 2020 (house + leaf)
const RE2020 = ({ accent }) => (
  <Wrap accent={accent}>
    <path d="M 200 200 L 320 110 L 440 200 L 440 340 L 200 340 Z" fill={accent} />
    <path d="M 200 200 L 320 110 L 440 200" fill="none" stroke="#0a0a0a" strokeWidth="3" />
    <rect x="290" y="260" width="60" height="80" fill="#0a0a0a" />
    {/* Leaf */}
    <path d="M 320 60 Q 360 60 360 120 Q 360 160 320 160 Q 280 160 280 120 Q 280 60 320 60 Z M 320 60 L 320 160" fill={accent} stroke="#0a0a0a" strokeWidth="2" />
    <text x="320" y="220" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill="#0a0a0a" letterSpacing="3">RE 2020</text>
  </Wrap>
);

// 17 — Passoires thermiques (house + thermometer)
const Passoires = ({ accent }) => (
  <Wrap accent={accent}>
    <path d="M 220 200 L 320 120 L 420 200 L 420 340 L 220 340 Z" fill={accent} />
    <rect x="305" y="260" width="50" height="80" fill="#0a0a0a" />
    {/* heat waves rising */}
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${280 + i * 20} 110 Q ${290 + i * 20} 80 ${280 + i * 20} 60 Q ${270 + i * 20} 40 ${280 + i * 20} 20`} fill="none" stroke={accent} strokeWidth="3" opacity={0.4 - i * 0.1} />
    ))}
    {/* thermometer right */}
    <rect x="470" y="100" width="22" height="180" fill="#0a0a0a" />
    <circle cx="481" cy="300" r="20" fill={accent} />
    <rect x="476" y="130" width="12" height="160" fill={accent} />
    <text x="320" y="380" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="22" fill="#0a0a0a">G F E</text>
  </Wrap>
);

const MAP = {
  f01: Fontaine, f02: Boule, f03: Pizza, f04: Balance,
  f05: Hoguet, f06: Mandat, f07: Copro, f08: Bail,
  f09: Compromis, f10: Diagnostics, f11: PlusValue, f12: Financement,
  f13: EDL, f14: Charges, f15: Encadrement,
  f16: RE2020, f17: Passoires,
};

export const Illustration = ({ fiche, className = "" }) => {
  const Cmp = MAP[fiche.id];
  if (!Cmp) {
    // Fallback: initial letter
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
