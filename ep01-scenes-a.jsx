/* ============================================================
   ep01-scenes-a.jsx — Cold open, Logo/Titre, Le bide de Lenny
   Chaque scène lit useSprite() (temps local 0→durée de la scène).
   ============================================================ */

/* ===== SCÈNE 1 — COLD OPEN (≈16 s) ========================== */
function ColdOpen() {
  const { localTime: t } = useSprite();

  // porte qui s'ouvre : lumière qui grandit 1→4s
  const door = clamp((t - 1) / 2.2, 0, 1);
  const doorW = interpolate([0, 1], [0, 360], Easing.easeInOutCubic)(door);
  // silhouette client qui avance 3→6s
  const walk = clamp((t - 3) / 3, 0, 1);
  const clientX = interpolate([0, 1], [-220, 0], Easing.easeOutCubic)(walk);

  // compteur 7→0 entre 6s et 9.5s
  const counting = clamp((t - 6) / 3.2, 0, 1);
  const secs = Math.max(0, Math.ceil(7 - counting * 7));
  const showCount = t > 5.6;

  // gros mot final
  const punch = clamp((t - 10) / 0.7, 0, 1);
  const heartbeat = 1 + Math.sin(t * 6) * 0.012;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", overflow: "hidden" }}>
      {/* sol */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 280,
        background: "linear-gradient(180deg,#0a0a0a,#000)" }} />
      {/* halo de porte */}
      <div style={{
        position: "absolute", left: "50%", top: 90, transform: "translateX(-50%)",
        width: doorW, height: 560, borderRadius: "60% 60% 0 0 / 30% 30% 0 0",
        background: `linear-gradient(180deg, ${rgba(C.gold, 0.22 * door)}, ${rgba(C.rust, 0.05 * door)} 60%, transparent)`,
        filter: "blur(2px)",
      }} />
      {/* faisceau */}
      <div style={{
        position: "absolute", left: "50%", top: 90, transform: "translateX(-50%)",
        width: doorW * 2.4, height: 760,
        background: `conic-gradient(from 180deg at 50% 0, transparent 42%, ${rgba(C.gold, 0.10 * door)} 50%, transparent 58%)`,
      }} />
      {/* client qui entre */}
      <div style={{ position: "absolute", left: `calc(50% + ${clientX}px)`, bottom: 80,
        transform: "translateX(-50%)", opacity: walk, filter: "brightness(0.25)" }}>
        <Person variant="martin" scale={1.5} mood="neutral" />
      </div>

      {/* compteur */}
      {showCount && (
        <div style={{ position: "absolute", left: "50%", top: 130, transform: "translateX(-50%)",
          textAlign: "center", transform: `translateX(-50%) scale(${heartbeat})` }}>
          <div style={{ fontFamily: FT.mono, fontSize: 30, letterSpacing: 8, color: rgba(C.red, 0.9) }}>
            00 : 0{secs}
          </div>
        </div>
      )}

      {/* punchline */}
      {t > 9.6 && (
        <div style={{ position: "absolute", left: "50%", top: "38%", transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * Easing.easeOutBack(punch)})`,
          opacity: punch, textAlign: "center", width: 1400 }}>
          <div style={{ fontFamily: FT.title, fontSize: 132, lineHeight: 0.96, color: C.white, textTransform: "uppercase" }}>
            7 secondes.
          </div>
          <div style={{ fontFamily: FT.title, fontSize: 64, color: C.red, marginTop: 14, letterSpacing: 1 }}>
            ET LE CLIENT A DÉJÀ DÉCIDÉ.
          </div>
        </div>
      )}
      <Vignette strength={0.92} />
      <Grain opacity={0.06} />
    </div>
  );
}

/* ===== SCÈNE 2 — LOGO + TITRE (≈17 s) ======================= */
function TitleCard() {
  const { localTime: t } = useSprite();

  // "boum" du logo type Netflix : 0.2→1.4s
  const logoIn = clamp((t - 0.2) / 1.2, 0, 1);
  const logoScale = interpolate([0, 1], [1.5, 1], Easing.easeOutExpo)(logoIn);
  const logoGlow = Math.max(0, 1 - Math.abs(t - 1.4) / 1.2);

  // logo recule, titre apparaît à 3.4s
  const logoUp = clamp((t - 3.0) / 0.8, 0, 1);
  const logoY = interpolate([0, 1], [0, -250], Easing.easeInOutCubic)(logoUp);
  const logoSmall = interpolate([0, 1], [1, 0.42], Easing.easeInOutCubic)(logoUp);

  const titleIn = clamp((t - 3.6) / 0.8, 0, 1);
  const logoFade = 1 - clamp((t - 3.5) / 0.7, 0, 1); // le logo s'efface quand le titre arrive
  const badgeIn = clamp((t - 5.0) / 0.6, 0, 1);
  const subIn = clamp((t - 6.0) / 0.7, 0, 1);

  return (
    <Backdrop accent={MOD} glow={0.7}>
      {/* barre de balayage rouge */}
      <div style={{ position: "absolute", left: 0, right: 0, top: `${(t * 14) % 120 - 10}%`, height: 200,
        background: `linear-gradient(180deg,transparent,${rgba(C.red, 0.05)},transparent)` }} />

      {/* LOGO LENNY */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: `translate(-50%,calc(-50% + ${logoY}px)) scale(${logoScale * logoSmall})`,
        opacity: logoIn * logoFade, textAlign: "center",
      }}>
        <div style={{
          fontFamily: FT.title, fontSize: 200, letterSpacing: 6, color: C.red,
          textShadow: `0 0 ${40 * logoGlow + 8}px ${rgba(C.red, 0.7)}`,
          lineHeight: 1,
        }}>LENNY</div>
      </div>

      {/* TITRE */}
      {t > 3.4 && (
        <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)",
          textAlign: "center", width: 1500 }}>
          <div style={{
            fontFamily: FT.title, fontSize: 124, lineHeight: 0.98, color: C.white,
            textTransform: "uppercase", letterSpacing: 1,
            opacity: titleIn, transform: `translateY(${(1 - Easing.easeOutCubic(titleIn)) * 30}px)`,
          }}>
            La Première<br />Impression
          </div>
          <div style={{ height: 6, width: interpolate([0, 1], [0, 360], Easing.easeOutCubic)(titleIn),
            background: MOD, margin: "26px auto 0", borderRadius: 4 }} />
          <div style={{ marginTop: 34, opacity: badgeIn, transform: `translateY(${(1 - badgeIn) * 16}px)` }}>
            <ModuleBadge label="4 min · Module 01 · Accueil" />
          </div>
          <div style={{ marginTop: 26, fontFamily: FT.body, fontWeight: 400, fontSize: 34,
            color: C.grey, opacity: subIn }}>
            Comment gagner — ou perdre — un client en 20 secondes.
          </div>
        </div>
      )}
    </Backdrop>
  );
}

/* ===== SCÈNE 3 — LE BIDE DE LENNY (≈41 s) =================== */
function ContextScene() {
  const { localTime: t } = useSprite();

  // caméra : léger zoom avant continu (ken burns)
  const zoom = 1 + clamp(t / 35, 0, 1) * 0.12;

  // client entre 1→4s
  const enter = clamp((t - 1) / 3, 0, 1);
  const clientX = interpolate([0, 1], [120, 0], Easing.easeOutCubic)(enter);

  // Lenny sur son téléphone jusqu'à 13s, puis lève la tête
  const onPhone = t < 13;
  // moment gênant : "..." 7→12.5s
  const awkward = t > 7 && t < 12.5;
  // Sarah arrive 20→22.4s
  const sarahIn = clamp((t - 20) / 2.4, 0, 1);
  const sarahX = interpolate([0, 1], [260, 0], Easing.easeOutCubic)(sarahIn);

  // flash de transition à la fin
  const endFlash = clamp((t - 34) / 0.6, 0, 1);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: "50% 60%" }}>
        <AgencyRoom dim={0.12} />

        {/* Lenny derrière le bureau (gauche) */}
        <div style={{ position: "absolute", left: 360, bottom: 150 }}>
          <Person variant="lenny" scale={1.15} talking={!onPhone && t > 13 && t < 19}
                  mood={onPhone ? "neutral" : (t > 22 ? "stress" : "neutral")} />
          {/* téléphone qui éclaire le visage */}
          {onPhone && (
            <div style={{ position: "absolute", left: 150, top: 150, width: 60, height: 90, borderRadius: 8,
              background: `linear-gradient(180deg,${rgba(C.slate, 0.9)},${rgba(C.slate, 0.5)})`,
              transform: "rotate(-18deg)", boxShadow: `0 0 40px ${rgba(C.slate, 0.6)}` }} />
          )}
        </div>

        {/* Client M. Martin (droite) */}
        <div style={{ position: "absolute", right: `calc(360px + ${clientX}px - 120px)`, bottom: 130, opacity: enter }}>
          <Person variant="martin" scale={1.25} mood={awkward ? "stress" : "neutral"} />
          {/* bulle "..." gênante */}
          {awkward && (
            <div style={{ position: "absolute", left: -40, top: -10,
              background: C.white, color: "#111", borderRadius: 16, padding: "8px 18px",
              fontFamily: FT.body, fontWeight: 700, fontSize: 36, boxShadow: "0 8px 24px rgba(0,0,0,.4)" }}>
              …
            </div>
          )}
        </div>

        {/* Sarah entre plus tard */}
        {t > 19.5 && (
          <div style={{ position: "absolute", right: `calc(120px + ${sarahX}px)`, bottom: 140, opacity: sarahIn }}>
            <Person variant="sarah" scale={1.2} talking={t > 23 && t < 33} mood="neutral" />
          </div>
        )}
      </div>

      {/* étiquette de lieu */}
      {t < 6 && (
        <div style={{ position: "absolute", left: 80, top: 70, opacity: clamp(2 - Math.abs(t - 2), 0, 1),
          fontFamily: FT.mono, fontSize: 26, letterSpacing: 4, color: C.grey, whiteSpace: "nowrap" }}>
          ▸ LUNDI · 9H02 · PREMIER JOUR
        </div>
      )}

      {/* flash de fin (transition dure) */}
      <div style={{ position: "absolute", inset: 0, background: C.white, opacity: endFlash * 0.9, pointerEvents: "none", zIndex: 70 }} />
    </div>
  );
}

Object.assign(window, { ColdOpen, TitleCard, ContextScene });
