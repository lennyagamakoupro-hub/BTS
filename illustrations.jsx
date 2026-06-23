/* global React */
/* Editorial SVG illustrations — one per module. All use currentColor so they take the module color.
   Approach: stroke-only line art (no solid fills), layered via strokeOpacity. */

const Illu = {
  // Écoquartier — eco skyline: solar roofs, trees, sustainability rings
  mville: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* sustainability rings behind the skyline */}
      <circle cx="74" cy="60" r="30" strokeOpacity=".14" />
      <circle cx="124" cy="52" r="24" strokeOpacity=".12" />
      <circle cx="104" cy="78" r="36" strokeOpacity=".1" />
      {/* ground */}
      <line x1="18" y1="160" x2="182" y2="160" />
      {/* building A (left) */}
      <rect x="36" y="98" width="32" height="62" strokeOpacity=".85" />
      {[106, 124, 142].map((y, i) => (
        <rect key={i} x="44" y={y} width="16" height="10" strokeOpacity=".45" />
      ))}
      {/* building B (tallest, centre) with solar roof */}
      <rect x="74" y="56" width="36" height="104" />
      {[70, 88, 106, 124, 142].map((y, i) => (
        <g key={i}>
          <rect x="80" y={y} width="9" height="11" strokeOpacity=".5" />
          <rect x="95" y={y} width="9" height="11" strokeOpacity=".5" />
        </g>
      ))}
      <polygon points="76,56 110,56 102,46 84,46" strokeOpacity=".7" />
      <line x1="84.7" y1="46" x2="92" y2="56" strokeOpacity=".45" />
      <line x1="93" y1="46" x2="100" y2="56" strokeOpacity=".45" />
      {/* building C with solar roof */}
      <rect x="116" y="104" width="30" height="56" strokeOpacity=".9" />
      {[112, 130, 146].map((y, i) => (
        <rect key={i} x="123" y={y} width="16" height="9" strokeOpacity=".45" />
      ))}
      <polygon points="118,104 146,104 140,96 126,96" strokeOpacity=".6" />
      {/* small building D */}
      <rect x="152" y="124" width="22" height="36" strokeOpacity=".8" />
      {/* trees */}
      <g strokeOpacity=".8"><circle cx="26" cy="146" r="9" /><line x1="26" y1="155" x2="26" y2="160" /></g>
      <g strokeOpacity=".75"><circle cx="186" cy="148" r="7" /><line x1="186" y1="155" x2="186" y2="160" /></g>
      <text x="100" y="184" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">durable</text>
    </svg>
  ),

  // Urbanisme — development plan: roads, blocks, roundabout, park
  murba: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="30" y="28" width="140" height="130" strokeOpacity=".7" />
      {/* crossing roads (double lines) */}
      <line x1="30" y1="86" x2="170" y2="86" strokeOpacity=".4" />
      <line x1="30" y1="96" x2="170" y2="96" strokeOpacity=".4" />
      <line x1="92" y1="28" x2="92" y2="158" strokeOpacity=".4" />
      <line x1="102" y1="28" x2="102" y2="158" strokeOpacity=".4" />
      {/* roundabout */}
      <circle cx="97" cy="91" r="7" />
      {/* block top-left (subdivided) */}
      <rect x="42" y="40" width="38" height="34" strokeOpacity=".85" />
      <line x1="61" y1="40" x2="61" y2="74" strokeOpacity=".35" />
      <line x1="42" y1="57" x2="80" y2="57" strokeOpacity=".35" />
      {/* block bottom-left */}
      <rect x="42" y="108" width="38" height="40" strokeOpacity=".85" />
      <line x1="42" y1="128" x2="80" y2="128" strokeOpacity=".35" />
      {/* block bottom-right */}
      <rect x="114" y="108" width="44" height="40" strokeOpacity=".85" />
      <line x1="136" y1="108" x2="136" y2="148" strokeOpacity=".35" />
      {/* park top-right with trees */}
      <rect x="114" y="40" width="44" height="34" strokeOpacity=".3" strokeDasharray="3 3" />
      <circle cx="126" cy="52" r="5" strokeOpacity=".7" />
      <circle cx="141" cy="60" r="6" strokeOpacity=".7" />
      <circle cx="150" cy="48" r="4" strokeOpacity=".7" />
      <text x="100" y="180" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">PLU · SCoT</text>
    </svg>
  ),

  // Valeur verte — leaf integrated with a building + RE2020 energy bars
  mvert: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* building */}
      <rect x="48" y="54" width="58" height="104" strokeOpacity=".85" />
      {[66, 84, 102, 120].map((y, i) => (
        <g key={i}>
          <rect x="56" y={y} width="16" height="11" strokeOpacity=".4" />
          <rect x="82" y={y} width="16" height="11" strokeOpacity=".4" />
        </g>
      ))}
      {/* energy grade bars at the base */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="56" y={138 + i * 7} width={20 + i * 14} height="5" strokeOpacity={.6 - i * .12} />
      ))}
      {/* big leaf rising from the building */}
      <path d="M150 38 C112 50 98 96 122 140 C154 122 172 78 150 38 Z" strokeWidth="1.4" />
      <path d="M150 38 C144 78 134 116 122 140" strokeOpacity=".55" />
      <line x1="138" y1="74" x2="124" y2="68" strokeOpacity=".4" />
      <line x1="132" y1="98" x2="148" y2="92" strokeOpacity=".4" />
      <line x1="129" y1="118" x2="142" y2="112" strokeOpacity=".4" />
      <text x="100" y="184" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">RE2020</text>
    </svg>
  ),

  // Propriété — a house with roof, chimney, windows, door, garden, sun
  mprop: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* sun */}
      <circle cx="162" cy="44" r="9" strokeOpacity=".6" />
      <line x1="162" y1="29" x2="162" y2="22" strokeOpacity=".5" />
      <line x1="178" y1="44" x2="185" y2="44" strokeOpacity=".5" />
      <line x1="173" y1="33" x2="178" y2="28" strokeOpacity=".5" />
      <line x1="173" y1="55" x2="178" y2="60" strokeOpacity=".5" />
      {/* ground */}
      <line x1="18" y1="158" x2="182" y2="158" />
      {/* roof + chimney */}
      <path d="M44 94 L100 50 L156 94" />
      <path d="M128 70 L128 54 L138 54 L138 78" strokeOpacity=".8" />
      {/* body */}
      <rect x="60" y="94" width="80" height="64" />
      {/* door */}
      <rect x="90" y="122" width="20" height="36" strokeOpacity=".85" />
      <circle cx="105" cy="140" r="1.6" fill="currentColor" stroke="none" />
      {/* windows with cross mullions */}
      <g strokeOpacity=".75">
        <rect x="68" y="106" width="18" height="18" />
        <line x1="77" y1="106" x2="77" y2="124" /><line x1="68" y1="115" x2="86" y2="115" />
      </g>
      <g strokeOpacity=".75">
        <rect x="114" y="106" width="18" height="18" />
        <line x1="123" y1="106" x2="123" y2="124" /><line x1="114" y1="115" x2="132" y2="115" />
      </g>
      {/* garden path */}
      <path d="M92 158 L86 176 M108 158 L114 176" strokeOpacity=".4" />
      {/* tree */}
      <g strokeOpacity=".75"><circle cx="32" cy="136" r="12" /><line x1="32" y1="148" x2="32" y2="158" /></g>
      {/* shrub */}
      <path d="M150 158 Q156 146 162 158" strokeOpacity=".5" />
      <text x="100" y="192" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">art. 544</text>
    </svg>
  ),

  // Droit — scales of justice (balance)
  mdroit: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <line x1="100" y1="34" x2="100" y2="150" />
      <line x1="78" y1="150" x2="122" y2="150" strokeWidth="2" />
      <line x1="40" y1="56" x2="160" y2="56" strokeWidth="1.6" />
      <circle cx="100" cy="44" r="6" />
      <line x1="40" y1="56" x2="40" y2="44" strokeOpacity=".4" />
      <line x1="160" y1="56" x2="160" y2="44" strokeOpacity=".4" />
      {/* hanging chains */}
      <line x1="40" y1="56" x2="28" y2="86" strokeOpacity=".5" />
      <line x1="40" y1="56" x2="52" y2="86" strokeOpacity=".5" />
      <line x1="160" y1="56" x2="148" y2="86" strokeOpacity=".5" />
      <line x1="160" y1="56" x2="172" y2="86" strokeOpacity=".5" />
      {/* pans */}
      <path d="M24 86 a16 10 0 0 0 32 0 Z" strokeOpacity=".8" />
      <path d="M144 86 a16 10 0 0 0 32 0 Z" strokeOpacity=".8" />
      <text x="100" y="178" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">art. 1984</text>
    </svg>
  ),

  // M1 — 4×20: concentric rings with the four "20" cues
  m1: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="100" cy="100" r="80" strokeOpacity=".22" />
      <circle cx="100" cy="100" r="58" strokeOpacity=".4" />
      <circle cx="100" cy="100" r="36" strokeOpacity=".65" />
      <circle cx="100" cy="100" r="4" fill="currentColor" stroke="none" />
      {/* four cardinal cue ticks */}
      <line x1="100" y1="20" x2="100" y2="36" strokeOpacity=".5" />
      <line x1="180" y1="100" x2="164" y2="100" strokeOpacity=".5" />
      <line x1="100" y1="180" x2="100" y2="164" strokeOpacity=".5" />
      <line x1="20" y1="100" x2="36" y2="100" strokeOpacity=".5" />
      <text x="100" y="14" textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">20 s</text>
      <text x="194" y="103" textAnchor="end" fontSize="9" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">20 gestes</text>
      <text x="100" y="196" textAnchor="middle" fontSize="9" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">20 mots</text>
      <text x="6" y="103" fontSize="9" fill="currentColor" fontFamily="IBM Plex Mono" stroke="none">20 cm</text>
    </svg>
  ),

  // M2 — Entreprise: professional building facade with entrance
  m2: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <line x1="20" y1="162" x2="180" y2="162" />
      {/* facade */}
      <rect x="54" y="34" width="92" height="128" />
      <line x1="48" y1="42" x2="152" y2="42" strokeOpacity=".5" />
      {/* flag */}
      <line x1="100" y1="34" x2="100" y2="22" />
      <path d="M100 22 L116 26 L100 31 Z" strokeOpacity=".7" />
      {/* window grid */}
      {[52, 74, 96, 118].map((y, r) => (
        <g key={r}>
          {[64, 90, 116].map((x, c) => (
            <rect key={c} x={x} y={y} width="18" height="14" strokeOpacity=".42" />
          ))}
        </g>
      ))}
      {/* awning + entrance + steps */}
      <path d="M82 134 L118 134 L122 126 L78 126 Z" strokeOpacity=".5" />
      <rect x="88" y="138" width="24" height="24" strokeOpacity=".85" />
      <line x1="100" y1="138" x2="100" y2="162" strokeOpacity=".5" />
      <line x1="80" y1="168" x2="120" y2="168" strokeOpacity=".45" />
      <text x="100" y="186" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">EI · EIRL · EURL · SARL · SAS · SASU</text>
    </svg>
  ),

  // M3 — Prospection: target zones with scattered prospects
  m3: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="100" cy="100" r="80" strokeOpacity=".22" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="55" strokeOpacity=".45" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="30" strokeOpacity=".75" />
      <circle cx="100" cy="100" r="6" fill="currentColor" stroke="none" />
      <line x1="100" y1="20" x2="100" y2="180" strokeOpacity=".12" />
      <line x1="20" y1="100" x2="180" y2="100" strokeOpacity=".12" />
      {[
        [62, 70], [140, 60], [160, 120], [50, 140], [120, 160],
        [80, 90], [120, 85], [95, 135], [130, 118], [70, 115],
        [40, 80], [170, 90], [100, 40], [35, 110], [155, 158],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="currentColor" stroke="none" fillOpacity={i < 5 ? .2 : i < 10 ? .55 : .9} />
      ))}
      <text x="100" y="194" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">80% · 15% · 5%</text>
    </svg>
  ),

  // M4 — Ratios: performance curve over bars
  m4: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <line x1="24" y1="160" x2="182" y2="160" />
      <line x1="24" y1="40" x2="24" y2="160" />
      {[60, 90, 120, 150].map((y, i) => (
        <line key={i} x1="24" y1={y} x2="182" y2={y} strokeOpacity=".13" strokeDasharray="2 3" />
      ))}
      {[[40, 130], [68, 100], [96, 115], [124, 84], [152, 96]].map(([x, y], i) => (
        <rect key={i} x={x - 7} y={y} width="14" height={160 - y} strokeOpacity=".3" />
      ))}
      <polyline points="34,140 62,118 90,88 118,98 146,66 174,48" strokeWidth="1.6" />
      {[34, 62, 90, 118, 146, 174].map((x, i) => (
        <circle key={i} cx={x} cy={[140, 118, 88, 98, 66, 48][i]} r="3" fill="currentColor" stroke="none" />
      ))}
      <text x="103" y="184" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">CA · ventes · transfo</text>
    </svg>
  ),

  // M5 — Diagnostics: DPE energy label A→G with pointer arrow
  m5: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      {["A", "B", "C", "D", "E", "F", "G"].map((L, i) => {
        const y = 36 + i * 16;
        const w = 38 + i * 15;
        return (
          <g key={i}>
            <path d={`M34 ${y} L${34 + w} ${y} L${34 + w + 8} ${y + 6.5} L${34 + w} ${y + 13} L34 ${y + 13} Z`} strokeOpacity={.35 + i * .07} />
            <text x="41" y={y + 10} fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">{L}</text>
          </g>
        );
      })}
      {/* pointer to class D */}
      <line x1="178" y1="91" x2="150" y2="91" strokeOpacity=".7" />
      <path d="M150 91 L160 85 M150 91 L160 97" strokeOpacity=".7" />
      <text x="100" y="186" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">DPE · GES</text>
    </svg>
  ),

  // M6 — Estimation: balance scale over a faint value curve
  m6: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M22 150 Q72 142 102 110 T178 58" strokeOpacity=".16" />
      {/* column + base */}
      <line x1="100" y1="40" x2="100" y2="150" />
      <line x1="80" y1="150" x2="120" y2="150" strokeWidth="2.4" />
      <circle cx="100" cy="40" r="4" />
      {/* beam */}
      <line x1="40" y1="60" x2="160" y2="60" strokeWidth="1.7" />
      <line x1="40" y1="60" x2="40" y2="88" strokeOpacity=".6" />
      <line x1="160" y1="60" x2="160" y2="88" strokeOpacity=".6" />
      {/* pans */}
      <path d="M22 88 a18 11 0 0 0 36 0 Z" strokeOpacity=".8" />
      <path d="M142 88 a18 11 0 0 0 36 0 Z" strokeOpacity=".8" />
      {/* weights (outline) */}
      <rect x="30" y="74" width="20" height="14" strokeOpacity=".6" />
      <rect x="150" y="80" width="20" height="8" strokeOpacity=".5" />
      <rect x="153" y="73" width="14" height="7" strokeOpacity=".5" />
      <text x="100" y="186" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">prix m² · capitalisation</text>
    </svg>
  ),

  // M6 bis — Viager: a couple + a clock
  m6b: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* couple silhouettes */}
      <g strokeOpacity=".85">
        <circle cx="52" cy="78" r="14" />
        <path d="M32 132 Q32 100 52 100 Q72 100 72 132" />
      </g>
      <g strokeOpacity=".7">
        <circle cx="82" cy="86" r="12" />
        <path d="M64 132 Q64 104 82 104 Q100 104 100 132" />
      </g>
      {/* clock */}
      <circle cx="142" cy="92" r="30" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30) * Math.PI / 180;
        return (
          <line key={i}
            x1={142 + Math.sin(a) * 28} y1={92 - Math.cos(a) * 28}
            x2={142 + Math.sin(a) * 24} y2={92 - Math.cos(a) * 24}
            strokeOpacity=".5" />
        );
      })}
      <line x1="142" y1="92" x2="142" y2="74" strokeWidth="1.5" />
      <line x1="142" y1="92" x2="156" y2="98" strokeWidth="1.5" />
      <circle cx="142" cy="92" r="2.2" fill="currentColor" stroke="none" />
      <text x="100" y="180" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">bouquet + rente</text>
    </svg>
  ),

  // M8 — Mandats: contract with signature, stamp and pen
  m8: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* stacked papers */}
      <rect x="58" y="36" width="86" height="120" strokeOpacity=".25" />
      <rect x="52" y="42" width="86" height="120" strokeOpacity=".45" />
      <rect x="46" y="48" width="86" height="120" />
      {/* header block */}
      <rect x="56" y="58" width="38" height="8" strokeOpacity=".5" />
      {/* text lines */}
      {[76, 88, 100, 112].map((y, i) => (
        <line key={i} x1="56" y1={y} x2={122 - i * 8} y2={y} strokeOpacity=".4" />
      ))}
      {/* signature */}
      <path d="M56 142 Q64 132 72 144 T88 142 T106 146 Q114 148 122 138" strokeWidth="1.5" />
      {/* stamp */}
      <circle cx="112" cy="146" r="15" strokeOpacity=".5" />
      <circle cx="112" cy="146" r="10" strokeOpacity=".3" />
      <text x="112" y="149" textAnchor="middle" fontSize="7" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none" opacity=".6">SIG</text>
      {/* pen */}
      <line x1="150" y1="64" x2="120" y2="112" strokeOpacity=".8" />
      <line x1="156" y1="68" x2="126" y2="116" strokeOpacity=".8" />
      <path d="M120 112 L126 116 L121 120 Z" strokeOpacity=".8" />
      <text x="100" y="186" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">mandat · art. 1984</text>
    </svg>
  ),

  // M11 — Financement: growth curve with bars, arrow and € marks
  m11: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <line x1="28" y1="150" x2="180" y2="150" />
      <line x1="28" y1="38" x2="28" y2="150" />
      {/* bars */}
      {[[46, 122], [70, 106], [94, 90], [118, 70], [142, 52]].map(([x, y], i) => (
        <rect key={i} x={x - 7} y={y} width="14" height={150 - y} strokeOpacity=".28" />
      ))}
      {/* simple interest (linear, faint) */}
      <line x1="28" y1="150" x2="178" y2="104" strokeOpacity=".3" strokeDasharray="3 4" />
      {/* compound curve */}
      <path d="M28 150 Q88 146 122 104 T176 42" strokeWidth="1.8" />
      <path d="M176 42 L165 44 M176 42 L174 53" strokeWidth="1.5" />
      {[[52, 147], [82, 134], [112, 110], [142, 78], [170, 50]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" stroke="none" />
      ))}
      <text x="46" y="138" fontSize="12" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none" opacity=".7">€</text>
      <text x="150" y="98" fontSize="13" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">€</text>
      <text x="100" y="184" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">intérêts composés</text>
    </svg>
  ),

  // Synthèse — four-point star with rays
  syn: () => (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="100" cy="98" r="68" strokeOpacity=".22" />
      <circle cx="100" cy="98" r="54" strokeOpacity=".14" />
      {/* diagonal rays */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (45 + i * 90) * Math.PI / 180;
        return (
          <line key={i}
            x1={100 + Math.cos(a) * 46} y1={98 + Math.sin(a) * 46}
            x2={100 + Math.cos(a) * 62} y2={98 + Math.sin(a) * 62}
            strokeOpacity=".4" />
        );
      })}
      {/* four-point star */}
      <path d="M100 30 L112 86 L168 98 L112 110 L100 166 L88 110 L32 98 L88 86 Z" />
      {/* inner diamond */}
      <path d="M100 58 L120 98 L100 138 L80 98 Z" strokeOpacity=".5" />
      <circle cx="100" cy="98" r="4" fill="currentColor" stroke="none" />
      <text x="100" y="190" textAnchor="middle" fontSize="10" fontFamily="Inter" fontStyle="italic" fill="currentColor" stroke="none">synthèse</text>
    </svg>
  ),
};

/* ============ Hero composite illustration ============ */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 320 380" fill="none" stroke="currentColor" strokeWidth="1.2" preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", color: "var(--ink)" }}>
      {/* Architectural background — blueprint grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity=".06" strokeWidth=".5"/>
        </pattern>
      </defs>
      <rect width="320" height="380" fill="url(#grid)" />

      {/* Tower / building isometric */}
      <g transform="translate(40, 60)">
        {/* base footprint */}
        <polygon points="20,260 120,300 220,260 120,220" stroke="currentColor" strokeWidth="1" strokeOpacity=".4" />
        {/* tower */}
        <polygon points="60,250 60,80 120,55 120,235" fill="var(--paper-2)" stroke="currentColor" />
        <polygon points="120,55 120,235 180,250 180,80" fill="var(--paper-3)" stroke="currentColor" />
        {/* windows left face */}
        {[100, 130, 160, 190, 220].map((y, i) => (
          <g key={i}>
            <rect x="68" y={y} width="14" height="18" stroke="currentColor" strokeWidth=".8" />
            <rect x="86" y={y} width="14" height="18" stroke="currentColor" strokeWidth=".8" />
            <rect x="104" y={y - 2} width="14" height="18" stroke="currentColor" strokeWidth=".8" />
          </g>
        ))}
        {/* windows right face */}
        {[105, 135, 165, 195, 225].map((y, i) => (
          <g key={i}>
            <rect x="128" y={y} width="14" height="18" stroke="currentColor" strokeWidth=".8" fill="var(--accent)" fillOpacity={i === 2 ? .6 : 0}/>
            <rect x="146" y={y + 1} width="14" height="18" stroke="currentColor" strokeWidth=".8" />
            <rect x="164" y={y + 2} width="14" height="18" stroke="currentColor" strokeWidth=".8" />
          </g>
        ))}
        {/* roof */}
        <polygon points="60,80 120,55 180,80 120,105" stroke="currentColor" fill="var(--accent)" fillOpacity=".15" />
        {/* flag */}
        <line x1="120" y1="55" x2="120" y2="25" />
        <polygon points="120,25 145,33 120,40" fill="var(--accent)" stroke="var(--accent)" />
      </g>

      {/* Compass top right */}
      <g transform="translate(252, 40)">
        <circle cx="0" cy="0" r="28" stroke="currentColor" strokeWidth="1" />
        <polygon points="0,-22 4,0 0,22 -4,0" fill="var(--accent)" stroke="none" />
        <polygon points="-22,0 0,-4 22,0 0,4" fill="currentColor" stroke="none" fillOpacity=".7" />
        <text x="0" y="-32" textAnchor="middle" fontSize="9" fontFamily="Inter" fontStyle="italic" fill="currentColor" stroke="none">N</text>
      </g>

      {/* Floor plan bottom */}
      <g transform="translate(30, 320)">
        <rect x="0" y="0" width="120" height="40" stroke="currentColor" fill="none" />
        <line x1="60" y1="0" x2="60" y2="40" />
        <line x1="0" y1="20" x2="120" y2="20" />
        <text x="14" y="14" fontSize="7" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">SAL</text>
        <text x="74" y="14" fontSize="7" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">CHB</text>
        <text x="14" y="34" fontSize="7" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">CUI</text>
        <text x="74" y="34" fontSize="7" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">SDB</text>
      </g>

      {/* Annotations */}
      <text x="200" y="340" fontSize="8" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none">SCALE 1:50</text>
      <text x="200" y="354" fontSize="8" fontFamily="IBM Plex Mono" fill="currentColor" stroke="none" opacity=".6">LENNY · BTS PI</text>
    </svg>
  );
}

Object.assign(window, { Illu, HeroIllustration });
