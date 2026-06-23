/* ============================================================
   ep01-scenes-b.jsx — Chapitre 1 (Règle des 4×20)
                       Chapitre 2 (SONCAS·E)
   ============================================================ */

/* ---- mini icônes ligne ------------------------------------- */
function Icon({ name, size = 56, color = "#fff", sw = 4 }) {
  const p = {
    clock: <><circle cx="32" cy="32" r="22" /><path d="M32 20v13l9 6" /></>,
    hand: <><path d="M22 34V18a4 4 0 018 0v12" /><path d="M30 30V16a4 4 0 018 0v14" /><path d="M38 30V20a4 4 0 018 0v18c0 8-6 14-14 14s-14-4-16-12l-3-9a4 4 0 017-3l3 5" /></>,
    chat: <><path d="M12 18h40v26H30l-10 8v-8h-8z" /></>,
    ruler: <><rect x="10" y="24" width="44" height="16" rx="2" /><path d="M18 24v6M26 24v8M34 24v6M42 24v8" /></>,
    shield: <><path d="M32 10l18 6v14c0 12-8 20-18 24-10-4-18-12-18-24V16z" /></>,
    crown: <><path d="M12 44h40l4-24-12 9-12-15-12 15-12-9z" /></>,
    spark: <><path d="M32 10v18M32 36v18M10 32h18M36 32h18M18 18l10 10M36 36l10 10M46 18L36 28M28 36L18 46" /></>,
    sofa: <><path d="M14 30v-6a6 6 0 016-6h24a6 6 0 016 6v6" /><path d="M10 30a4 4 0 014 4v6h36v-6a4 4 0 014-4 4 4 0 014 4v12H6V34a4 4 0 014-4z" /></>,
    euro: <><path d="M42 18a16 16 0 100 28" /><path d="M14 28h20M14 36h20" /></>,
    heart: <><path d="M32 50C12 38 12 22 22 18c6-2 10 2 10 6 0-4 4-8 10-6 10 4 10 20-10 32z" /></>,
    leaf: <><path d="M16 48C16 26 34 14 50 14c0 22-14 34-34 34z" /><path d="M22 42c8-10 16-16 24-20" /></>,
    target: <><circle cx="32" cy="32" r="20" /><circle cx="32" cy="32" r="11" /><circle cx="32" cy="32" r="2.5" fill={color} /></>,
  }[name];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none"
         stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {p}
    </svg>
  );
}

// en-tête de chapitre réutilisable
function ChapterHead({ index, title, accent = MOD, show }) {
  const p = Easing.easeOutCubic(clamp(show, 0, 1));
  return (
    <div style={{ position: "absolute", left: 110, top: 80, opacity: p,
      transform: `translateX(${(1 - p) * -30}px)` }}>
      <div style={{ fontFamily: FT.title, fontSize: 30, color: accent, letterSpacing: 3 }}>
        CHAPITRE&nbsp;{index}
      </div>
      <div style={{ fontFamily: FT.title, fontSize: 70, color: C.white, textTransform: "uppercase",
        lineHeight: 1, marginTop: 6 }}>{title}</div>
      <div style={{ width: 84, height: 4, background: accent, marginTop: 14, borderRadius: 2 }} />
    </div>
  );
}

/* ===== CHAPITRE 1 — LA RÈGLE DES 4×20 (≈49 s) =============== */
function Chapter4x20() {
  const { localTime: t } = useSprite();
  const items = [
    { icon: "clock", big: "20", unit: "SECONDES", desc: "Le temps que dure ta première impression.", k: "premières" },
    { icon: "hand", big: "20", unit: "GESTES", desc: "Posture droite, poignée franche, main ouverte.", k: "premiers" },
    { icon: "chat", big: "20", unit: "MOTS", desc: "Une phrase d'accueil claire, ton prénom, un sourire.", k: "premiers" },
    { icon: "ruler", big: "20", unit: "CENTIMÈTRES", desc: "La bonne distance : ni trop loin, ni dans sa bulle.", k: "derniers" },
  ];
  const headShow = clamp((t - 0.2) / 0.7, 0, 1);
  // règle d'or à partir de 26s
  const rule = clamp((t - 26) / 1.2, 0, 1);
  const gridFade = 1 - clamp((t - 25.6) / 1, 0, 1);

  return (
    <Backdrop accent={MOD} glow={0.5}>
      <ChapterHead index="1" title="La règle des 4×20" show={headShow} />

      <div style={{ position: "absolute", left: "50%", top: 300, transform: "translateX(-50%)",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, width: 1480, opacity: gridFade }}>
        {items.map((it, i) => {
          const start = 4.0 + i * 4.0;
          const a = clamp((t - start) / 0.7, 0, 1);
          const e = Easing.easeOutBack(a);
          // pulse quand il vient d'apparaître
          const fresh = clamp(1 - (t - (start + 0.7)) / 1.2, 0, 1);
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 28, padding: "30px 36px",
              background: rgba("#000", 0.4), border: `2px solid ${rgba(MOD, 0.35 + 0.4 * fresh)}`,
              borderRadius: 18, opacity: a,
              transform: `translateY(${(1 - e) * 40}px) scale(${0.96 + 0.04 * e})`,
              boxShadow: fresh > 0.05 ? `0 0 50px ${rgba(MOD, 0.25 * fresh)}` : "none",
            }}>
              <div style={{ flexShrink: 0, width: 96, height: 96, borderRadius: 16,
                background: rgba(MOD, 0.16), display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={it.icon} color={MOD} size={56} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: FT.title, fontSize: 72, color: C.white, lineHeight: 0.9 }}>20</span>
                  <span style={{ fontFamily: FT.body, fontSize: 18, color: MOD, textTransform: "uppercase", letterSpacing: 2 }}>{it.k}</span>
                  <span style={{ fontFamily: FT.title, fontSize: 40, color: MOD, letterSpacing: 1 }}>{it.unit}</span>
                </div>
                <div style={{ fontFamily: FT.body, fontSize: 25, color: C.grey, marginTop: 4, lineHeight: 1.3 }}>
                  {it.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {t > 25.6 && <GoldenRule text={"TU N'AS QU'UNE SEULE\nPREMIÈRE IMPRESSION."} progress={rule} />}
    </Backdrop>
  );
}

/* ===== CHAPITRE 2 — SONCAS·E (≈45 s) ======================== */
function ChapterSoncas() {
  const { localTime: t } = useSprite();
  const letters = [
    { L: "S", w: "Sécurité", d: "Quartier sûr, bien sans vice caché.", icon: "shield" },
    { L: "O", w: "Orgueil", d: "Standing, adresse qui en jette.", icon: "crown" },
    { L: "N", w: "Nouveauté", d: "Neuf, moderne, jamais habité.", icon: "spark" },
    { L: "C", w: "Confort", d: "Lumineux, pratique, bien agencé.", icon: "sofa" },
    { L: "A", w: "Argent", d: "Bonne affaire, investissement malin.", icon: "euro" },
    { L: "S", w: "Sympathie", d: "Le feeling, la confiance, toi.", icon: "heart" },
    { L: "E", w: "Écologie", d: "DPE A, sobriété, basse conso.", icon: "leaf" },
  ];
  const headShow = clamp((t - 0.2) / 0.7, 0, 1);
  const active = Math.floor(clamp((t - 3) / 3.4, 0, letters.length)); // carte mise en avant
  const punch = clamp((t - 30) / 0.9, 0, 1);
  const gridFade = 1 - clamp((t - 29.6) / 0.9, 0, 1);

  return (
    <Backdrop accent={MOD} glow={0.5}>
      <ChapterHead index="2" title="Décoder : SONCAS·E" show={headShow} />

      <div style={{ position: "absolute", left: "50%", top: 320, transform: "translateX(-50%)",
        display: "flex", gap: 16, opacity: gridFade }}>
        {letters.map((it, i) => {
          const start = 2.2 + i * 1.5;
          const a = clamp((t - start) / 0.5, 0, 1);
          const isActive = i === active && t < 32;
          const e = Easing.easeOutBack(a);
          return (
            <div key={i} style={{
              width: 190, padding: "26px 18px", borderRadius: 16, textAlign: "center",
              background: isActive ? rgba(MOD, 0.18) : rgba("#000", 0.42),
              border: `2px solid ${isActive ? MOD : rgba(MOD, 0.25)}`,
              opacity: a, transform: `translateY(${(1 - e) * 40}px) scale(${isActive ? 1.06 : 0.96 + 0.04 * e})`,
              boxShadow: isActive ? `0 0 50px ${rgba(MOD, 0.35)}` : "none",
              transition: "background .2s, border-color .2s",
            }}>
              <div style={{ fontFamily: FT.title, fontSize: 88, lineHeight: 0.8,
                color: isActive ? C.white : MOD }}>{it.L}</div>
              <div style={{ margin: "12px auto 14px", opacity: 0.9 }}>
                <Icon name={it.icon} color={isActive ? MOD : C.grey} size={40} sw={3.4} />
              </div>
              <div style={{ fontFamily: FT.body, fontWeight: 700, fontSize: 23, color: C.white }}>{it.w}</div>
              <div style={{ fontFamily: FT.body, fontSize: 16.5, color: C.grey, marginTop: 8, lineHeight: 1.32,
                minHeight: 64, opacity: isActive ? 1 : 0.5 }}>{it.d}</div>
            </div>
          );
        })}
      </div>

      {/* légende sous la rangée */}
      {t > 3 && t < 30 && (
        <div style={{ position: "absolute", left: "50%", bottom: 150, transform: "translateX(-50%)",
          fontFamily: FT.body, fontSize: 26, color: C.grey, opacity: 0.9 }}>
          7 leviers d'achat. Le client n'en a souvent qu'<span style={{ color: MOD, fontWeight: 700 }}>un ou deux</span>.
        </div>
      )}

      {t > 29.6 && <GoldenRule text={"CHAQUE CLIENT A UN BOUTON.\nTON JOB : LE TROUVER."} progress={punch} />}
    </Backdrop>
  );
}

Object.assign(window, { Icon, ChapterHead, Chapter4x20, ChapterSoncas });
