/* ============================================================
   ep01-scenes-foot.jsx — Scènes cadrées FOOT (cast fictif)
   Cold open agence + sifflet, intro de l'Ailier, mapping tactique
   foot↔immo, carton rouge, consigne du capitaine, question d'arbitre,
   CTA "prochain entraînement". Lit useSprite() (temps local).
   ============================================================ */

/* ===== COLD OPEN — LE BIDE (≈18 s) ========================== */
function ColdOpenFoot() {
  const { localTime: t } = useSprite();

  const enter   = clamp((t - 1) / 3, 0, 1);
  const clientX = interpolate([0, 1], [160, 0], Easing.easeOutCubic)(enter);
  const onPhone = t < 8.5;
  const awkward = t > 4.5 && t < 9;
  const secs    = Math.max(0, Math.ceil(7 - clamp((t - 4.5) / 3.5, 0, 1) * 7));
  const whistle = clamp((t - 9) / 1.4, 0, 1);
  const flash   = clamp(1 - Math.abs(t - 9.2) / 0.4, 0, 1);
  const punch   = clamp((t - 10) / 0.7, 0, 1);
  const shadowIn = clamp((t - 11.5) / 1.5, 0, 1);
  const beat = 1 + Math.sin(t * 6) * 0.012;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
      <AgencyRoom dim={0.18} />

      {/* ombre de l'expert qui veille, en fond */}
      {t > 11 && (
        <div style={{ position: "absolute", left: "50%", bottom: 60, transform: "translateX(-50%)",
          opacity: shadowIn * 0.5, filter: "brightness(0.05) blur(1px)" }}>
          <Baller variant="ailier" scale={2.6} mood="neutral" accent={MOD} />
        </div>
      )}

      {/* Lenny rivé au téléphone */}
      <div style={{ position: "absolute", left: 330, bottom: 150 }}>
        <Baller variant="lenny" scale={1.15} mood={t > 9 ? "stress" : "neutral"} accent={MOD} />
        {onPhone && (
          <div style={{ position: "absolute", left: 150, top: 150, width: 60, height: 92, borderRadius: 8,
            background: `linear-gradient(180deg,${rgba(C.slate,0.95)},${rgba(C.slate,0.5)})`,
            transform: "rotate(-18deg)", boxShadow: `0 0 44px ${rgba(C.slate,0.7)}` }} />
        )}
      </div>

      {/* Client M. Martin (civil, pas en maillot) */}
      <div style={{ position: "absolute", right: `calc(330px + ${clientX}px - 120px)`, bottom: 130, opacity: enter }}>
        <Person variant="martin" scale={1.22} mood={awkward ? "stress" : "neutral"} />
        {awkward && (
          <div style={{ position: "absolute", left: -36, top: -6, background: "#fff", color: "#111",
            borderRadius: 16, padding: "8px 18px", fontFamily: FT.body, fontWeight: 800, fontSize: 38,
            boxShadow: "0 8px 24px rgba(0,0,0,.4)" }}>…</div>
        )}
      </div>

      {/* étiquette de lieu */}
      {t < 6 && (
        <div style={{ position: "absolute", left: 80, top: 70, opacity: clamp(2 - Math.abs(t - 2), 0, 1),
          fontFamily: FT.mono, fontSize: 24, letterSpacing: 4, color: C.grey, whiteSpace: "nowrap" }}>
          ▸ « LE VESTIAIRE » · PARIS CAPITALE IMMOBILIER · LUNDI 9H02
        </div>
      )}

      {/* compteur 7→0 */}
      {t > 4.2 && t < 9 && (
        <div style={{ position: "absolute", left: "50%", top: 120, transform: `translateX(-50%) scale(${beat})`,
          textAlign: "center" }}>
          <div style={{ fontFamily: FT.mono, fontSize: 30, letterSpacing: 8, color: rgba(C.red, 0.9) }}>
            00 : 0{secs}
          </div>
        </div>
      )}

      <Whistle show={whistle} accent={MOD} />
      <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash * 0.85, pointerEvents: "none", zIndex: 69 }} />

      {/* punchline */}
      {t > 9.8 && (
        <div style={{ position: "absolute", left: "50%", top: "40%",
          transform: `translate(-50%,-50%) scale(${0.9 + 0.1 * Easing.easeOutBack(punch)})`,
          opacity: punch, textAlign: "center", width: 1500, zIndex: 40 }}>
          <div style={{ fontFamily: FT.title, fontSize: 132, lineHeight: 0.96, color: "#fff", textTransform: "uppercase" }}>
            7 secondes.
          </div>
          <div style={{ fontFamily: FT.title, fontSize: 58, color: C.red, marginTop: 14, letterSpacing: 1 }}>
            ET LE CLIENT A DÉJÀ TOURNÉ LES TALONS.
          </div>
        </div>
      )}
      <Vignette strength={0.92} />
      <Grain opacity={0.06} />
    </div>
  );
}

/* ===== TITRE NETFLIX-LIKE + ENTRÉE EXPERT (≈18 s) =========== */
function TitleFoot() {
  const { localTime: t } = useSprite();
  const logoIn   = clamp((t - 0.2) / 1.2, 0, 1);
  const logoScale = interpolate([0, 1], [1.5, 1], Easing.easeOutExpo)(logoIn);
  const logoGlow  = Math.max(0, 1 - Math.abs(t - 1.4) / 1.2);
  const logoUp    = clamp((t - 3.0) / 0.8, 0, 1);
  const logoY     = interpolate([0, 1], [0, -250], Easing.easeInOutCubic)(logoUp);
  const logoSmall = interpolate([0, 1], [1, 0.42], Easing.easeInOutCubic)(logoUp);
  const logoFade  = 1 - clamp((t - 3.5) / 0.7, 0, 1);
  const titleIn   = clamp((t - 3.6) / 0.8, 0, 1);
  const badgeIn   = clamp((t - 5.2) / 0.6, 0, 1);
  const subIn     = clamp((t - 6.2) / 0.7, 0, 1);

  // le terrain se transforme en agence : lignes craie qui s'effacent
  const pitchFade = 1 - clamp((t - 7) / 3, 0, 1);
  // l'ailier entre par la droite à 8s
  const expIn = clamp((t - 8) / 1.4, 0, 1);
  const expX  = interpolate([0, 1], [420, 0], Easing.easeOutCubic)(expIn);

  return (
    <Backdrop accent={MOD} glow={0.7}>
      <PitchLines opacity={0.28 * pitchFade} accent={MOD} />

      {/* LOGO LENNY */}
      <div style={{ position: "absolute", left: "50%", top: "50%",
        transform: `translate(-50%,calc(-50% + ${logoY}px)) scale(${logoScale * logoSmall})`,
        opacity: logoIn * logoFade, textAlign: "center" }}>
        <div style={{ fontFamily: FT.title, fontSize: 200, letterSpacing: 6, color: C.red,
          textShadow: `0 0 ${40 * logoGlow + 8}px ${rgba(C.red, 0.7)}`, lineHeight: 1 }}>LENNY</div>
      </div>

      {/* expert qui entre sur le terrain→agence */}
      {t > 7.6 && (
        <div style={{ position: "absolute", right: `calc(150px + ${expX}px)`, bottom: 70, opacity: expIn }}>
          <Baller variant="ailier" scale={1.7} mood="confident" accent={MOD} />
        </div>
      )}

      {/* TITRE */}
      {t > 3.4 && (
        <div style={{ position: "absolute", left: 150, top: "44%", transform: "translateY(-50%)",
          width: 1100 }}>
          <div style={{ fontFamily: FT.mono, fontSize: 26, letterSpacing: 5, color: MOD, opacity: titleIn }}>
            MODULE 01
          </div>
          <div style={{ fontFamily: FT.title, fontSize: 130, lineHeight: 0.96, color: "#fff",
            textTransform: "uppercase", letterSpacing: 1, marginTop: 10,
            opacity: titleIn, transform: `translateY(${(1 - Easing.easeOutCubic(titleIn)) * 30}px)` }}>
            La Première<br />Impression
          </div>
          <div style={{ width: interpolate([0, 1], [0, 360], Easing.easeOutCubic)(titleIn), height: 6,
            background: MOD, margin: "24px 0 0", borderRadius: 4 }} />
          <div style={{ marginTop: 30, opacity: badgeIn, transform: `translateY(${(1 - badgeIn) * 16}px)` }}>
            <ModuleBadge label="9 min · Module 01 · avec l'Ailier « Téo »" />
          </div>
          <div style={{ marginTop: 24, fontFamily: FT.body, fontWeight: 400, fontSize: 32, color: C.grey, opacity: subIn }}>
            Lire ton client comme l'ailier lit le défenseur.
          </div>
        </div>
      )}
    </Backdrop>
  );
}

/* ===== INTRO DE L'AILIER — son erreur de débutant (≈36 s) === */
function AilierContext() {
  const { localTime: t } = useSprite();
  const zoom = 1 + clamp(t / 34, 0, 1) * 0.08;

  const lennyIn = clamp((t - 1) / 1.5, 0, 1);
  const teoTalk = t > 2 && t < 30;

  // parallèles foot↔immo qui s'enchaînent
  const parallels = [
    { foot: "1ʳᵉ touche ratée", immo: "1ʳᵉ phrase d'accueil ratée", s: 10 },
    { foot: "Le défenseur te lit", immo: "Le client te jauge", s: 16 },
    { foot: "7 secondes pour décider", immo: "7 secondes pour convaincre", s: 22 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: "50% 60%" }}>
        <AgencyRoom dim={0.16} />
        {/* banc de touche reconverti en bureau */}
        <div style={{ position: "absolute", left: 250, bottom: 120, width: 420, height: 36,
          background: "linear-gradient(180deg,#2a2118,#180f08)", borderRadius: 6,
          boxShadow: "0 14px 36px rgba(0,0,0,.5)" }} />
        {/* Lenny assis qui écoute */}
        <div style={{ position: "absolute", left: 300, bottom: 150, opacity: lennyIn }}>
          <Baller variant="lenny" scale={1.0} mood="neutral" accent={MOD} />
        </div>
        {/* Téo l'ailier, debout, raconte */}
        <div style={{ position: "absolute", right: 250, bottom: 140 }}>
          <Baller variant="ailier" scale={1.28} talking={teoTalk}
                  mood={t > 8 ? "confident" : "neutral"} accent={MOD} />
        </div>
      </div>

      {/* citation d'ouverture */}
      {t > 3 && t < 9.5 && (
        <div style={{ position: "absolute", left: "50%", top: 150, transform: "translateX(-50%)",
          width: 1400, textAlign: "center", opacity: clamp(Math.min(t - 3, 9.5 - t) / 0.6, 0, 1) }}>
          <div style={{ fontFamily: FT.body, fontStyle: "italic", fontSize: 44, color: "#fff", lineHeight: 1.35 }}>
            « Mon premier match pro ? J'ai raté ma première touche.<br />
            Mon premier client ? Pareil. »
          </div>
          <div style={{ marginTop: 16, fontFamily: FT.mono, fontSize: 22, letterSpacing: 3, color: MOD }}>
            — L'AILIER « TÉO »
          </div>
        </div>
      )}

      {/* parallèles foot ↔ immo */}
      <div style={{ position: "absolute", left: "50%", top: 120, transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", gap: 14, width: 1180 }}>
        {parallels.map((p, i) => {
          const a = clamp((t - p.s) / 0.6, 0, 1);
          const out = 1 - clamp((t - 29.5) / 0.8, 0, 1);
          if (a <= 0) return null;
          return (
            <div key={i} style={{ display: "flex", alignItems: "stretch", gap: 0, opacity: a * out,
              transform: `translateY(${(1 - Easing.easeOutCubic(a)) * 24}px)`, borderRadius: 12, overflow: "hidden",
              boxShadow: "0 14px 40px rgba(0,0,0,.45)" }}>
              <div style={{ flex: 1, background: rgba(FOOT.pitch, 0.92), padding: "18px 26px",
                fontFamily: FT.body, fontWeight: 600, fontSize: 30, color: "#fff", display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: FT.mono, fontSize: 18, color: "rgba(255,255,255,.6)" }}>TERRAIN</span>
                {p.foot}
              </div>
              <div style={{ width: 70, background: MOD, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: FT.title, fontSize: 30, color: "#fff" }}>=</div>
              <div style={{ flex: 1, background: "rgba(8,10,14,0.92)", padding: "18px 26px",
                fontFamily: FT.body, fontWeight: 600, fontSize: 30, color: "#fff", display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: FT.mono, fontSize: 18, color: rgba(MOD, 0.9) }}>AGENCE</span>
                {p.immo}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===== MAPPING TACTIQUE — le lexique foot↔immo (≈22 s) ====== */
function TacticalMap() {
  const { localTime: t } = useSprite();
  const headShow = clamp((t - 0.2) / 0.7, 0, 1);
  const rows = [
    { foot: "Zone de presse",     immo: "L'accueil du client" },
    { foot: "Lire le défenseur",  immo: "Lire le client (4×20)" },
    { foot: "But marqué",         immo: "Client convaincu" },
    { foot: "But encaissé",       immo: "Erreur pro / vente ratée" },
    { foot: "Carton rouge",       immo: "Faute grave à éviter" },
    { foot: "Corner",             immo: "Opportunité (une pige)" },
  ];
  return (
    <Backdrop accent={MOD} glow={0.5}>
      <div style={{ position: "absolute", left: 110, top: 80, opacity: headShow }}>
        <div style={{ fontFamily: FT.title, fontSize: 30, color: MOD, letterSpacing: 3 }}>LE LEXIQUE DU MATCH</div>
        <div style={{ fontFamily: FT.title, fontSize: 64, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginTop: 6, whiteSpace: "nowrap" }}>
          Terrain → Agence
        </div>
        <div style={{ width: 84, height: 4, background: MOD, marginTop: 14, borderRadius: 2 }} />
      </div>

      <TacticBoard accent={MOD} style={{ position: "absolute", left: "50%", top: 280, transform: "translateX(-50%)",
        width: 1480, padding: "34px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", rowGap: 14, columnGap: 10 }}>
          {rows.map((r, i) => {
            const a = clamp((t - (1.5 + i * 2.4)) / 0.6, 0, 1);
            const e = Easing.easeOutCubic(a);
            return (
              <React.Fragment key={i}>
                <div style={{ opacity: a, transform: `translateX(${(1 - e) * -30}px)`,
                  background: "rgba(0,0,0,0.28)", borderRadius: 10, padding: "16px 24px",
                  fontFamily: FT.body, fontWeight: 600, fontSize: 30, color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: "#fff", opacity: 0.6, flexShrink: 0 }} />
                  {r.foot}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: a,
                  fontFamily: FT.title, fontSize: 30, color: MOD }}>→</div>
                <div style={{ opacity: a, transform: `translateX(${(1 - e) * 30}px)`,
                  background: rgba(MOD, 0.14), border: `1.5px solid ${rgba(MOD, 0.4)}`, borderRadius: 10, padding: "16px 24px",
                  fontFamily: FT.body, fontWeight: 600, fontSize: 30, color: "#fff", display: "flex", alignItems: "center" }}>
                  {r.immo}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </TacticBoard>
      <ExpertTag accent={MOD} show={clamp((t - 1) / 0.8, 0, 1)} />
    </Backdrop>
  );
}

/* ===== CARTON ROUGE — le piège (≈18 s) ===================== */
function CartonRougeScene() {
  const { localTime: t } = useSprite();
  // 0→6 : Lenny rejoue, corrige → but marqué
  const replay = t < 6.2;
  const replayFade = 1 - clamp((t - 5.4) / 0.8, 0, 1);
  const butIn = clamp((t - 3.4) / 0.5, 0, 1);
  // 6→18 : carton rouge sur l'erreur à éviter
  const card = clamp((t - 6.2) / 0.7, 0, 1);

  return (
    <Backdrop accent={C.red} glow={0.4}>
      {replay && (
        <div style={{ position: "absolute", inset: 0, opacity: replayFade }}>
          <div style={{ position: "absolute", left: 340, bottom: 180 }}>
            <Baller variant="lenny" scale={1.18} talking={t < 3} mood={t > 3 ? "happy" : "confident"} accent={MOD} />
          </div>
          <div style={{ position: "absolute", right: 360, bottom: 170 }}>
            <Person variant="martin" scale={1.18} mood={t > 3 ? "happy" : "neutral"} />
          </div>
          {/* poignée / accueil réussi */}
          {t > 1 && t < 3.4 && (
            <div style={{ position: "absolute", left: "50%", top: 200, transform: "translateX(-50%)",
              fontFamily: FT.body, fontSize: 34, color: "#fff", textAlign: "center" }}>
              « Bonjour, Lenny — bienvenue. Je vous écoute. »
            </div>
          )}
          {/* BUT MARQUÉ */}
          {t > 3.4 && (
            <div style={{ position: "absolute", left: "50%", top: 170, transform: `translateX(-50%) scale(${0.8 + 0.2 * Easing.easeOutBack(butIn)})`,
              opacity: butIn, textAlign: "center" }}>
              <div style={{ fontFamily: FT.title, fontSize: 110, color: FOOT.pitch === "#1d4d2b" ? "#41c468" : C.green, lineHeight: 1,
                WebkitTextStroke: "2px rgba(255,255,255,0.25)" }}>BUT&nbsp;MARQUÉ&nbsp;!</div>
              <div style={{ fontFamily: FT.body, fontSize: 28, color: C.grey, marginTop: 10 }}>
                Regard, sourire, prénom, écoute. Le client se détend.
              </div>
            </div>
          )}
        </div>
      )}

      {t > 6 && (
        <RefCard color="red" label="CARTON ROUGE" progress={card}
          sub="Le piège n°1 : parler de TOI avant d'écouter — et dégainer le prix trop tôt." />
      )}
    </Backdrop>
  );
}

/* ===== CONSIGNE DU CAPITAINE + RÈGLE D'OR (≈34 s) =========== */
function ConsigneCapitaine() {
  const { localTime: t } = useSprite();
  const marcoIn = clamp((t - 0.6) / 1.4, 0, 1);
  const marcoX  = interpolate([0, 1], [-360, 0], Easing.easeOutCubic)(marcoIn);

  const consignes = [
    { k: "4×20",      v: "20 sec · 20 gestes · 20 mots · 20 cm" },
    { k: "SONCAS·E",  v: "7 leviers — trouve le bouton du client" },
    { k: "5 QUESTIONS", v: "ouverte → fermée → appro → miroir → inductrice" },
    { k: "DIVAS",     v: "Débit · Intonation · Volume · Articulation · Sourire" },
  ];
  const listFade = 1 - clamp((t - 24) / 1, 0, 1);
  const rule = clamp((t - 25) / 1.2, 0, 1);

  return (
    <Backdrop accent={MOD} glow={0.55}>
      {/* Capitaine Marco à gauche */}
      {t < 26 && (
        <div style={{ position: "absolute", left: `${marcoX}px`, bottom: 40, opacity: marcoIn }}>
          <Baller variant="coach" scale={1.55} captain talking={t > 2 && t < 23} mood="confident" accent={MOD} />
        </div>
      )}

      {t < 25.4 && (
        <div style={{ position: "absolute", left: 560, top: 116, width: 1280, opacity: listFade }}>
          <div style={{ fontFamily: FT.title, fontSize: 34, color: MOD, letterSpacing: 2, whiteSpace: "nowrap" }}>CONSIGNES D'AVANT-MATCH</div>
          <div style={{ fontFamily: FT.body, fontSize: 26, color: C.grey, marginTop: 10, marginBottom: 24 }}>
            Le capitaine Marco récapitule. Quatre réflexes, zéro improvisation.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {consignes.map((c, i) => {
              const a = clamp((t - (3 + i * 4.6)) / 0.6, 0, 1);
              const fresh = clamp(1 - (t - (3 + i * 4.6) - 0.6) / 1.4, 0, 1);
              const e = Easing.easeOutCubic(a);
              if (a <= 0) return null;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 28px",
                  borderRadius: 14, opacity: a, transform: `translateX(${(1 - e) * -30}px)`,
                  background: rgba("#000", 0.42), borderLeft: `6px solid ${rgba(MOD, 0.4 + 0.6 * fresh)}`,
                  boxShadow: fresh > 0.1 ? `0 0 40px ${rgba(MOD, 0.22 * fresh)}` : "none" }}>
                  <span style={{ width: 46, height: 46, borderRadius: 999, flexShrink: 0, background: MOD, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FT.title, fontSize: 24 }}>{i + 1}</span>
                  <div style={{ width: 300, fontFamily: FT.title, fontSize: 36, color: "#fff", whiteSpace: "nowrap" }}>{c.k}</div>
                  <div style={{ flex: 1, fontFamily: FT.body, fontSize: 24, color: C.grey }}>{c.v}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {t > 24.6 && <GoldenRule text={"AU CLUB, RIEN AU HASARD.\nEN IMMOBILIER NON PLUS."} progress={rule} />}
    </Backdrop>
  );
}

/* ===== QUESTION D'ARBITRE — quiz (≈26 s) =================== */
function QuestionArbitre() {
  const { localTime: t } = useSprite();
  const intro = clamp(t / 0.6, 0, 1);
  const marcoIn = clamp((t - 0.6) / 1.2, 0, 1);

  const opts = [
    "Les 4 documents du dossier de vente",
    "20 secondes · 20 gestes · 20 mots · 20 cm",
    "Les 4 types de mandat",
    "Les 4 diagnostics obligatoires",
  ];
  const correct = 1;
  const revealAt = 14;
  const countdown = Math.max(0, Math.ceil(revealAt - t));
  const revealed = t > revealAt;
  const whistle = clamp((t - revealAt) / 1.2, 0, 1);

  return (
    <Backdrop accent={C.red} glow={0.45}>
      {/* en-tête */}
      <div style={{ position: "absolute", left: "50%", top: 70, transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 16, opacity: intro }}>
        <span style={{ width: 18, height: 18, borderRadius: 999, background: C.red, boxShadow: `0 0 16px ${C.red}` }} />
        <span style={{ fontFamily: FT.title, fontSize: 46, color: "#fff", letterSpacing: 4 }}>QUESTION D'ARBITRE</span>
      </div>

      {/* Capitaine Marco, sifflet en main */}
      <div style={{ position: "absolute", left: 80, bottom: 30, opacity: marcoIn }}>
        <Baller variant="coach" scale={1.25} captain mood="confident" accent={MOD} />
      </div>

      <div style={{ position: "absolute", left: "50%", top: 180, transform: "translateX(-50%)",
        width: 1300, textAlign: "center", fontFamily: FT.body, fontWeight: 700, fontSize: 46, color: "#fff", opacity: intro }}>
        La règle des 4×20, c'est quoi&nbsp;?
      </div>

      {!revealed && t > 9 && (
        <div style={{ position: "absolute", right: 150, top: 170, fontFamily: FT.mono, fontSize: 80, color: C.red }}>
          {countdown}
        </div>
      )}

      <div style={{ position: "absolute", left: "50%", top: 320, transform: "translateX(-50%)",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, width: 1240 }}>
        {opts.map((o, i) => {
          const a = clamp((t - (1.4 + i * 0.4)) / 0.4, 0, 1);
          const isC = i === correct;
          const dim = revealed && !isC;
          const hit = revealed && isC;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "26px 32px", borderRadius: 14,
              opacity: a * (dim ? 0.32 : 1),
              background: hit ? rgba(C.green, 0.22) : rgba("#000", 0.42),
              border: `2px solid ${hit ? C.green : rgba(C.red, 0.3)}`,
              transform: `scale(${hit ? 1.04 : 1})`, transition: "all .3s" }}>
              <span style={{ width: 46, height: 46, borderRadius: 999, flexShrink: 0,
                border: `2px solid ${hit ? C.green : rgba("#fff", 0.4)}`, color: hit ? C.green : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FT.title, fontSize: 26 }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontFamily: FT.body, fontSize: 27, fontWeight: 600, color: "#fff" }}>{o}</span>
              {hit && <span style={{ marginLeft: "auto", color: C.green, fontSize: 34 }}>✓</span>}
            </div>
          );
        })}
      </div>

      <Whistle show={whistle} accent={C.red} />

      {revealed && (
        <div style={{ position: "absolute", left: "50%", top: 660, transform: "translateX(-50%)", width: 1100,
          textAlign: "center", fontFamily: FT.body, fontSize: 30, color: C.grey,
          opacity: clamp((t - revealAt - 0.3) / 0.5, 0, 1) }}>
          <span style={{ color: C.green, fontWeight: 700 }}>Réponse B —</span> secondes, gestes, mots, centimètres. But marqué.
        </div>
      )}
    </Backdrop>
  );
}

/* ===== CTA — PROCHAIN ENTRAÎNEMENT (≈12 s) ================= */
function OutroFoot() {
  const { localTime: t } = useSprite();
  const a = Easing.easeOutCubic(clamp(t / 0.8, 0, 1));
  const arrow = Math.sin(t * 3) * 8;
  return (
    <Backdrop accent={C.slate} glow={0.7}>
      <PitchLines opacity={0.12} accent={C.slate} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        textAlign: "center", width: 1500, opacity: a }}>
        <div style={{ fontFamily: FT.body, fontSize: 28, color: C.grey, letterSpacing: 3, textTransform: "uppercase" }}>
          Entraînement terminé avec l'Ailier « Téo »
        </div>
        <div style={{ fontFamily: FT.title, fontSize: 130, color: "#fff", lineHeight: 1, margin: "16px 0 8px" }}>
          À TON TOUR.
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 28,
          whiteSpace: "nowrap", padding: "20px 52px", borderRadius: 999, background: C.red,
          boxShadow: `0 16px 50px ${rgba(C.red, 0.45)}`, transform: `translateX(${arrow}px)` }}>
          <span style={{ fontFamily: FT.title, fontSize: 38, color: "#fff", letterSpacing: 1 }}>PROCHAIN ENTRAÎNEMENT</span>
          <span style={{ fontFamily: FT.title, fontSize: 38, color: "#fff" }}>→</span>
        </div>
        <div style={{ marginTop: 24, fontFamily: FT.body, fontSize: 30, color: C.slate, fontWeight: 700 }}>
          Module 02 · « Les Règles du Jeu » — avec le Défenseur « Rui » · Loi Hoguet, cartes T/G/S
        </div>
        <div style={{ marginTop: 46, fontFamily: FT.title, fontSize: 44, color: C.red, letterSpacing: 6 }}>LENNY</div>
      </div>
    </Backdrop>
  );
}

Object.assign(window, {
  ColdOpenFoot, TitleFoot, AilierContext, TacticalMap,
  CartonRougeScene, ConsigneCapitaine, QuestionArbitre, OutroFoot,
});
