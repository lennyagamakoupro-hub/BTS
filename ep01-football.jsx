/* ============================================================
   ep01-football.jsx — Univers FOOT (club + cast 100% fictifs)
   Club : "PARIS CAPITALE IMMOBILIER" (blason clé + ballon).
   Personnages originaux en maillot bleu nuit, sans sponsor réel.
     · LENNY        — l'alternant (apprenti)
     · L'AILIER "TÉO" — expert Module 01 (lire le client = lire le défenseur)
     · LE CAPITAINE "MARCO" — mentor, brassard permanent
   Briques : blason, joueurs, tableau tactique, cartons, sifflet.
   ============================================================ */

const FOOT = {
  navy:  "#0e1b33",
  navy2: "#16294a",
  navyL: "#22graduated",   // (placeholder, recalculé plus bas)
  pitch: "#1d4d2b",
  pitchDk: "#143a20",
  line:  "rgba(255,255,255,0.55)",
  redCard:    "#e3342f",
  yellowCard: "#f4c020",
};
FOOT.navyL = "#23406e";

/* ---- Blason du club : bouclier + clé + ballon -------------- */
function ClubCrest({ size = 120, accent = MOD, mono = false }) {
  const gold = mono ? "rgba(255,255,255,0.9)" : accent;
  return (
    <svg width={size} height={size * 1.18} viewBox="0 0 100 118" fill="none">
      {/* bouclier */}
      <path d="M50 4 L92 16 V58 C92 88 72 104 50 114 C28 104 8 88 8 58 V16 Z"
            fill={mono ? "rgba(255,255,255,0.06)" : FOOT.navy}
            stroke={gold} strokeWidth="3.5" />
      {/* bande haute */}
      <path d="M50 4 L92 16 V30 L50 22 L8 30 V16 Z" fill={gold} opacity={mono ? 0.5 : 0.92} />
      <text x="50" y="20" textAnchor="middle" fontFamily="'Anton',sans-serif"
            fontSize="9" letterSpacing="1" fill={mono ? "#fff" : FOOT.navy}>PCI</text>
      {/* ballon stylisé */}
      <circle cx="50" cy="58" r="17" fill="none" stroke={gold} strokeWidth="3" />
      <path d="M50 44 l9 7 -3 11 h-12 l-3 -11 z" fill={gold} />
      {/* clé qui traverse */}
      <g stroke={gold} strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M50 78 V96" />
        <path d="M50 90 h8 M50 84 h6" />
      </g>
      <circle cx="50" cy="74" r="5.5" fill="none" stroke={gold} strokeWidth="4" />
    </svg>
  );
}

/* ---- petit blason "patch" pour la poitrine ----------------- */
function CrestPatch({ x = 0, y = 0, s = 1, accent = MOD }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M0 0 L16 4 V20 C16 31 8 37 0 41 C-8 37 -16 31 -16 20 V4 Z"
            fill={FOOT.navy2} stroke={accent} strokeWidth="2" />
      <circle cx="0" cy="18" r="6" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M0 26 v8 M0 31 h4" stroke={accent} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </g>
  );
}

/* ---- JOUEUR en maillot (buste 2D) -------------------------- */
// variants : coach (Marco) · ailier (Téo) · lenny (alternant, peut porter le kit)
function Baller({
  variant = "ailier", scale = 1, talking = false, mood = "neutral",
  captain = false, accent = MOD,
}) {
  const t = useTime();
  const sway = Math.sin(t * 1.6) * (talking ? 2.2 : 0.8);

  const looks = {
    coach:  { skin: "#7a4a2c", hair: "#1c130c", style: "buzz",  jersey: FOOT.navy },
    ailier: { skin: "#4f3120", hair: "#2a1a10", style: "twists", jersey: FOOT.navy, hi: "#b07a3a" },
    lenny:  { skin: "#5a3a26", hair: "#1f140d", style: "tige",  jersey: FOOT.navy },
  };
  const L = looks[variant] || looks.ailier;
  const mouthOpen = talking ? 3 + Math.abs(Math.sin(t * 9)) * 6 : 2.8;

  return (
    <svg viewBox="0 0 200 240" width={200 * scale} height={240 * scale}
         style={{ display: "block", overflow: "visible" }}>
      <g transform={`rotate(${sway} 100 230)`}>
        {/* buste / maillot */}
        <path d="M28 240 Q28 150 100 150 Q172 150 172 240 Z" fill={L.jersey} />
        {/* dégradé d'ombre maillot */}
        <path d="M28 240 Q28 150 100 150 L100 240 Z" fill="rgba(0,0,0,0.18)" />
        {/* épaulières accent (rappel maillot domicile) */}
        <path d="M34 168 Q50 152 70 151 L66 166 Q50 168 40 182 Z" fill={accent} opacity="0.85" />
        <path d="M166 168 Q150 152 130 151 L134 166 Q150 168 160 182 Z" fill={accent} opacity="0.85" />
        {/* col en V */}
        <path d="M84 152 L100 178 L116 152" stroke={accent} strokeWidth="5" fill="none" />
        {/* blason poitrine (gauche du joueur) */}
        <CrestPatch x={126} y={170} s={0.62} accent={accent} />
        {/* brassard de capitaine (bras gauche) */}
        {captain && (
          <g>
            <rect x="36" y="176" width="30" height="16" rx="4"
                  fill={accent} stroke="#fff" strokeWidth="1.5" />
            <text x="51" y="188" textAnchor="middle" fontFamily="'Anton',sans-serif"
                  fontSize="11" fill="#fff">C</text>
          </g>
        )}
        {/* cou */}
        <rect x="88" y="120" width="24" height="34" rx="10" fill={L.skin} />
        <rect x="88" y="120" width="24" height="10" rx="6" fill="rgba(0,0,0,0.15)" />
        {/* tête */}
        <ellipse cx="100" cy="96" rx="40" ry="44" fill={L.skin} />
        <ellipse cx="116" cy="100" rx="14" ry="22" fill="rgba(0,0,0,0.10)" />
        {/* cheveux selon style */}
        {L.style === "buzz" && (
          <path d="M60 92 Q56 50 100 50 Q144 50 140 92 Q140 66 118 60 Q108 57 100 57 Q92 57 82 60 Q60 66 60 92 Z"
                fill={L.hair} />
        )}
        {L.style === "twists" && (
          <g fill={L.hair}>
            <path d="M60 94 Q56 48 100 48 Q144 48 140 94 Q140 70 120 62 Q108 57 100 57 Q92 57 80 62 Q60 70 60 94 Z" />
            {[64,76,88,100,112,124,136].map((cx,i)=>(
              <circle key={i} cx={cx} cy={50 + (i%2)*4} r="6" />
            ))}
            {L.hi && [70,94,118].map((cx,i)=>(
              <circle key={"h"+i} cx={cx} cy={51} r="3.4" fill={L.hi} />
            ))}
          </g>
        )}
        {L.style === "tige" && (
          <g fill={L.hair}>
            <path d="M62 90 Q58 52 100 52 Q142 52 138 90 Q138 68 118 62 Q108 58 100 58 Q92 58 82 62 Q62 68 62 90 Z" />
            {[70,82,94,106,118,130].map((cx,i)=>(
              <rect key={i} x={cx-2} y={48} width="4" height="9" rx="2" />
            ))}
          </g>
        )}
        {/* sourcils */}
        {mood === "stress" && (
          <g stroke="#16100a" strokeWidth="2.6" strokeLinecap="round">
            <path d="M78 84 L94 88" /><path d="M122 84 L106 88" />
          </g>
        )}
        {mood === "confident" && (
          <g stroke="#16100a" strokeWidth="2.6" strokeLinecap="round">
            <path d="M80 85 L95 85" /><path d="M120 85 L105 85" />
          </g>
        )}
        {(mood === "happy") && (
          <g stroke="#16100a" strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M78 86 Q86 82 94 86" /><path d="M106 86 Q114 82 122 86" />
          </g>
        )}
        {/* yeux */}
        <ellipse cx="86" cy="95" rx="4" ry={mood==="surprise"?6:4.2} fill="#120d08" />
        <ellipse cx="114" cy="95" rx="4" ry={mood==="surprise"?6:4.2} fill="#120d08" />
        <circle cx="87.4" cy="93.6" r="1.2" fill="#fff" />
        <circle cx="115.4" cy="93.6" r="1.2" fill="#fff" />
        {/* bouche */}
        {mood === "happy"
          ? <path d="M84 112 Q100 126 116 112" stroke="#3a1f16" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          : mood === "confident"
            ? <path d="M88 113 Q100 119 112 113" stroke="#3a1f16" strokeWidth="3" fill="none" strokeLinecap="round" />
            : <ellipse cx="100" cy="114" rx="8.5" ry={mouthOpen} fill="#3a1f16" />}
      </g>
    </svg>
  );
}

/* ---- Tag expert persistant (coin haut-gauche) -------------- */
function ExpertTag({ name = "L'AILIER", real = "« Téo »", sub = "Spécialiste 1ʳᵉ touche",
                     accent = MOD, captain = false, show = 1 }) {
  const p = Easing.easeOutCubic(clamp(show, 0, 1));
  return (
    <div style={{
      position: "absolute", left: 70, bottom: 64, zIndex: 64,
      display: "flex", alignItems: "center", gap: 16,
      opacity: p, transform: `translateX(${(1 - p) * -30}px)`,
      padding: "10px 22px 10px 12px", borderRadius: 999,
      background: "rgba(0,0,0,0.55)", border: `1.5px solid ${rgba(accent, 0.5)}`,
      backdropFilter: "blur(3px)",
    }}>
      <div style={{ width: 56, height: 56, borderRadius: 999, overflow: "hidden",
        background: FOOT.navy2, border: `2px solid ${accent}`, flexShrink: 0,
        display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div style={{ transform: "translateY(6px)" }}>
          <Baller variant={captain ? "coach" : "ailier"} scale={0.34} captain={captain} accent={accent} mood="confident" />
        </div>
      </div>
      <div style={{ whiteSpace: "nowrap" }}>
        <div style={{ whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: FT.title, fontSize: 26, color: "#fff", letterSpacing: 1 }}>{name}</span>
          <span style={{ fontFamily: FT.body, fontSize: 18, color: accent, marginLeft: 8 }}>{real}</span>
        </div>
        <div style={{ fontFamily: FT.mono, fontSize: 14, letterSpacing: 2, color: C.grey, textTransform: "uppercase" }}>{sub}</div>
      </div>
    </div>
  );
}

/* ---- Fond terrain (lignes craie) --------------------------- */
function PitchLines({ opacity = 0.5, accent = MOD }) {
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"
         style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
         fill="none" stroke={FOOT.line} strokeWidth="3" opacity={opacity}>
      {/* perspective : lignes qui fuient */}
      <path d="M-200 1080 L760 300" /><path d="M2120 1080 L1160 300" />
      <line x1="0" y1="640" x2="1920" y2="640" />
      <line x1="0" y1="820" x2="1920" y2="820" />
      {/* rond central */}
      <ellipse cx="960" cy="760" rx="280" ry="120" />
      <circle cx="960" cy="760" r="6" fill={FOOT.line} stroke="none" />
      {/* surface */}
      <rect x="700" y="900" width="520" height="180" rx="2" />
    </svg>
  );
}

/* ---- Tableau tactique (panneau craie) ---------------------- */
function TacticBoard({ children, accent = MOD, style }) {
  return (
    <div style={{
      position: "relative", background: `linear-gradient(160deg, ${FOOT.pitch}, ${FOOT.pitchDk})`,
      border: "10px solid #0c1d12", borderRadius: 14,
      boxShadow: `0 30px 80px rgba(0,0,0,.55), 0 0 70px ${rgba(accent,0.18)} inset`,
      overflow: "hidden", ...style,
    }}>
      {/* craie de fond */}
      <svg viewBox="0 0 600 400" preserveAspectRatio="none"
           style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
           fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2">
        <rect x="14" y="14" width="572" height="372" rx="6" />
        <line x1="300" y1="14" x2="300" y2="386" />
        <circle cx="300" cy="200" r="60" />
      </svg>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

/* ---- Carton arbitre (rouge / jaune) ------------------------ */
function RefCard({ color = "red", label = "CARTON ROUGE", sub, progress = 1 }) {
  const p = Easing.easeOutBack(clamp(progress, 0, 1));
  const col = color === "red" ? FOOT.redCard : FOOT.yellowCard;
  const tilt = (1 - clamp(progress, 0, 1)) * -10;
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * p}) rotate(${tilt}deg)`,
      opacity: clamp(progress * 1.6, 0, 1), textAlign: "center", zIndex: 30,
    }}>
      <div style={{
        width: 300, height: 420, borderRadius: 16, background: col,
        boxShadow: `0 40px 90px rgba(0,0,0,.6), 0 0 70px ${rgba(col, 0.5)}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        border: "3px solid rgba(0,0,0,0.25)",
      }}>
        <div style={{ fontFamily: FT.title, fontSize: 64, color: "#fff", lineHeight: 0.95,
          textTransform: "uppercase", letterSpacing: 1, textShadow: "0 4px 0 rgba(0,0,0,.25)" }}>
          {label.split(" ").map((w, i) => <div key={i}>{w}</div>)}
        </div>
      </div>
      {sub && (
        <div style={{ marginTop: 26, fontFamily: FT.body, fontSize: 30, color: "#fff",
          fontWeight: 700, maxWidth: 760, marginInline: "auto", lineHeight: 1.35 }}>{sub}</div>
      )}
    </div>
  );
}

/* ---- Éclat de sifflet -------------------------------------- */
function Whistle({ show = 0, accent = MOD }) {
  const a = clamp(show, 0, 1);
  if (a <= 0) return null;
  const ring = Easing.easeOutCubic(a);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 68 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", left: "50%", top: "44%", transform: "translate(-50%,-50%)",
          width: 80 + ring * (520 + i * 180), height: 80 + ring * (520 + i * 180),
          borderRadius: 999, border: `3px solid ${rgba("#ffffff", (1 - ring) * 0.5)}`,
          opacity: 1 - ring,
        }} />
      ))}
      <div style={{
        position: "absolute", left: "50%", top: "44%", transform: `translate(-50%,-50%) scale(${0.8 + ring * 0.4})`,
        fontFamily: FT.mono, fontSize: 30, letterSpacing: 6, color: "#fff", opacity: 1 - ring,
        textShadow: "0 2px 12px #000", whiteSpace: "nowrap",
      }}>FIIIT&nbsp;!</div>
    </div>
  );
}

/* ---- Lower-third "consigne de vestiaire" ------------------- */
function VestiaireBar({ text, accent = MOD, show = 1 }) {
  const p = Easing.easeOutCubic(clamp(show, 0, 1));
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: 130, transform: `translateX(-50%) translateY(${(1-p)*20}px)`,
      opacity: p, display: "inline-flex", alignItems: "stretch", borderRadius: 12, overflow: "hidden",
      boxShadow: "0 18px 50px rgba(0,0,0,.5)", whiteSpace: "nowrap",
    }}>
      <div style={{ background: accent, padding: "16px 22px", display: "flex", alignItems: "center",
        fontFamily: FT.title, fontSize: 26, letterSpacing: 2, color: "#fff" }}>CONSIGNE</div>
      <div style={{ background: "rgba(8,10,14,0.92)", padding: "16px 30px", display: "flex", alignItems: "center",
        fontFamily: FT.body, fontWeight: 600, fontSize: 32, color: "#fff" }}>{text}</div>
    </div>
  );
}

/* ---- export window ----------------------------------------- */
Object.assign(window, {
  FOOT, ClubCrest, CrestPatch, Baller, ExpertTag,
  PitchLines, TacticBoard, RefCard, Whistle, VestiaireBar,
});
