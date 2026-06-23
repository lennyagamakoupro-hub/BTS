/* ============================================================
   ep01-scenes-c.jsx — Chapitre 3 (5 questions + DIVAS),
                       Piège, Récap+Quiz, CTA
   ============================================================ */

/* ===== CHAPITRE 3 — LES 5 QUESTIONS + DIVAS (≈42 s) ========= */
function ChapterQuestions() {
  const { localTime: t } = useSprite();
  const qs = [
    { type: "OUVERTE", q: "« Qu'est-ce qui vous ferait vraiment plaisir ? »", g: "Pour faire parler, récolter un max d'infos." },
    { type: "FERMÉE", q: "« Plutôt avec ou sans balcon ? »", g: "Pour trancher, valider, avancer vite." },
    { type: "APPROFONDISSEMENT", q: "« C'est-à-dire ? Dites-m'en plus. »", g: "Pour creuser un besoin évoqué." },
    { type: "MIROIR", q: "Client : « trop sombre… » — Toi : « trop sombre ? »", g: "Pour relancer sans rien imposer." },
    { type: "INDUCTRICE", q: "« Vous cherchez surtout du calme, non ? »", g: "Pour orienter en douceur vers une piste." },
  ];
  const headShow = clamp((t - 0.2) / 0.7, 0, 1);

  // PARTIE A : questions (0 → 25s)
  const phaseA = t < 25;
  const aFade = 1 - clamp((t - 24.2) / 0.8, 0, 1);
  // PARTIE B : DIVAS (25 → 42s)
  const phaseB = t > 24.6;
  const bIn = clamp((t - 25) / 0.7, 0, 1);

  const divas = [
    { L: "D", w: "Débit", d: "Ni mitraillette, ni escargot." },
    { L: "I", w: "Intonation", d: "Vivante, pas un robot." },
    { L: "V", w: "Volume", d: "Posé, audible, assuré." },
    { L: "A", w: "Articulation", d: "Chaque mot net." },
    { L: "S", w: "Sourire", d: "Il s'entend, même au tél." },
  ];

  return (
    <Backdrop accent={MOD} glow={0.5}>
      <ChapterHead index="3" title={phaseB ? "La voix : DIVAS" : "5 façons de questionner"} show={headShow} />

      {/* PARTIE A — liste des 5 questions */}
      {phaseA && (
        <div style={{ position: "absolute", left: "50%", top: 280, transform: "translateX(-50%)",
          width: 1500, display: "flex", flexDirection: "column", gap: 16, opacity: aFade }}>
          {qs.map((it, i) => {
            const start = 2.0 + i * 4.0;
            const a = clamp((t - start) / 0.6, 0, 1);
            const fresh = clamp(1 - (t - (start + 0.6)) / 3.2, 0, 1);
            const e = Easing.easeOutCubic(a);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 26, padding: "20px 30px",
                borderRadius: 14, opacity: a, transform: `translateX(${(1 - e) * -40}px)`,
                background: rgba("#000", 0.4),
                borderLeft: `6px solid ${rgba(MOD, 0.4 + 0.6 * fresh)}`,
                boxShadow: fresh > 0.1 ? `0 0 40px ${rgba(MOD, 0.2 * fresh)}` : "none",
              }}>
                <div style={{ width: 60, fontFamily: FT.title, fontSize: 46, color: MOD, textAlign: "center" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FT.title, fontSize: 28, letterSpacing: 2, color: MOD }}>{it.type}</div>
                  <div style={{ fontFamily: FT.body, fontWeight: 600, fontSize: 30, color: C.white, marginTop: 2 }}>{it.q}</div>
                </div>
                <div style={{ width: 360, fontFamily: FT.body, fontSize: 21, color: C.grey, lineHeight: 1.3 }}>{it.g}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* PARTIE B — DIVAS equalizer */}
      {phaseB && (
        <div style={{ position: "absolute", left: "50%", top: 300, transform: "translateX(-50%)",
          opacity: bIn, width: 1400 }}>
          <div style={{ textAlign: "center", fontFamily: FT.body, fontSize: 30, color: C.grey, marginBottom: 30 }}>
            Ce n'est pas seulement <span style={{ color: C.white, fontWeight: 700 }}>ce que</span> tu dis —
            c'est <span style={{ color: MOD, fontWeight: 700 }}>comment</span> tu le dis.
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 26 }}>
            {divas.map((it, i) => {
              const start = 27 + i * 1.6;
              const a = clamp((t - start) / 0.5, 0, 1);
              const bars = [0, 1, 2, 3].map(b => 18 + Math.abs(Math.sin(t * 4 + i + b * 0.7)) * 46);
              return (
                <div key={i} style={{ width: 230, padding: "26px 18px", borderRadius: 16, textAlign: "center",
                  background: rgba("#000", 0.42), border: `2px solid ${rgba(MOD, 0.3)}`,
                  opacity: a, transform: `translateY(${(1 - Easing.easeOutBack(a)) * 36}px)` }}>
                  {/* equalizer */}
                  <div style={{ height: 70, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6 }}>
                    {bars.map((h, b) => (
                      <div key={b} style={{ width: 12, height: h, borderRadius: 4,
                        background: `linear-gradient(180deg,${MOD},${rgba(MOD, 0.4)})` }} />
                    ))}
                  </div>
                  <div style={{ fontFamily: FT.title, fontSize: 60, color: C.white, lineHeight: 1, marginTop: 10 }}>{it.L}</div>
                  <div style={{ fontFamily: FT.body, fontWeight: 700, fontSize: 24, color: MOD }}>{it.w}</div>
                  <div style={{ fontFamily: FT.body, fontSize: 17, color: C.grey, marginTop: 6, lineHeight: 1.3, minHeight: 44 }}>{it.d}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Backdrop>
  );
}

/* ===== PIÈGE À ÉVITER (≈14 s) =============================== */
function TrapScene() {
  const { localTime: t } = useSprite();
  // mini-scène : Lenny parle trop, client décroche (0→5s) puis panneau
  const showScene = t < 5.2;
  const sceneFade = 1 - clamp((t - 4.4) / 0.8, 0, 1);
  const panel = clamp((t - 5) / 0.7, 0, 1);

  return (
    <Backdrop accent={C.red} glow={0.4}>
      {showScene && (
        <div style={{ position: "absolute", inset: 0, opacity: sceneFade }}>
          {/* Lenny qui monologue, bulle qui gonfle */}
          <div style={{ position: "absolute", left: 360, bottom: 220 }}>
            <Person variant="lenny" scale={1.2} talking={true} mood="neutral" />
          </div>
          <div style={{ position: "absolute", left: 540, bottom: 470,
            background: C.white, color: "#111", borderRadius: 20, padding: "16px 26px",
            fontFamily: FT.body, fontWeight: 700, fontSize: 30, maxWidth: 520,
            transform: `scale(${0.7 + clamp(t / 4, 0, 1) * 0.6})`, transformOrigin: "left bottom" }}>
            « …et moi je, et nous, et notre agence, et moi, et… »
          </div>
          {/* Client qui décroche, Zzz */}
          <div style={{ position: "absolute", right: 380, bottom: 210 }}>
            <Person variant="martin" scale={1.2} mood="stress" />
          </div>
          {t > 2 && (
            <div style={{ position: "absolute", right: 360, bottom: 470, fontFamily: FT.title,
              fontSize: 60, color: rgba(C.white, 0.5),
              transform: `translateY(${-((t - 2) * 24)}px)`, opacity: clamp(2 - (t - 2), 0, 1) }}>
              Zzz…
            </div>
          )}
        </div>
      )}

      {t > 4.8 && (
        <AttentionPanel progress={panel}>
          <div style={{ fontFamily: FT.body, fontSize: 40, fontWeight: 700, color: C.white, lineHeight: 1.3, textAlign: "center" }}>
            Le piège n°1 du débutant :<br />
            <span style={{ color: C.red }}>parler de toi avant d'écouter le client.</span>
          </div>
          <div style={{ fontFamily: FT.body, fontSize: 26, color: C.grey, marginTop: 22, textAlign: "center", lineHeight: 1.4 }}>
            Et surtout : ne jamais dégainer le prix<br />avant d'avoir compris son besoin.
          </div>
        </AttentionPanel>
      )}
    </Backdrop>
  );
}

/* ===== RÉCAP + QUIZ FLASH (≈18 s) ========================== */
function RecapQuiz() {
  const { localTime: t } = useSprite();
  const cards = [
    { k: "4×20", v: "20 sec · gestes · mots · cm" },
    { k: "SONCAS·E", v: "7 leviers d'achat" },
    { k: "5 QUESTIONS", v: "ouverte → inductrice" },
    { k: "DIVAS", v: "la voix qui rassure" },
  ];
  // flashcards 0→6.5s
  const recapFade = 1 - clamp((t - 6) / 0.8, 0, 1);
  // quiz à partir de 6.8s
  const quizIn = clamp((t - 6.8) / 0.6, 0, 1);
  const opts = [
    "Les 4 documents du dossier",
    "Les 4 leviers de prix",
    "Secondes, gestes, mots, centimètres",
    "Les 4 types de mandat",
  ];
  const correct = 2;
  const revealAt = 12.5;           // réponse révélée
  const countdown = Math.max(0, Math.ceil(revealAt - t));
  const revealed = t > revealAt;

  return (
    <Backdrop accent={MOD} glow={0.5}>
      {/* RÉCAP flashcards */}
      {t < 6.6 && (
        <div style={{ position: "absolute", inset: 0, opacity: recapFade }}>
          <div style={{ position: "absolute", left: "50%", top: 120, transform: "translateX(-50%)",
            fontFamily: FT.title, fontSize: 54, color: C.white, letterSpacing: 2 }}>RÉCAP ÉCLAIR</div>
          <div style={{ position: "absolute", left: "50%", top: 260, transform: "translateX(-50%)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, width: 1300 }}>
            {cards.map((c, i) => {
              const start = 0.4 + i * 1.2;
              const a = clamp((t - start) / 0.4, 0, 1);
              const fresh = clamp(1 - (t - start - 0.4) / 0.8, 0, 1);
              return (
                <div key={i} style={{ padding: "32px 40px", borderRadius: 16,
                  background: rgba(MOD, 0.1 + 0.12 * fresh), border: `2px solid ${rgba(MOD, 0.3 + 0.5 * fresh)}`,
                  opacity: a, transform: `scale(${0.9 + 0.1 * Easing.easeOutBack(a)})`,
                  boxShadow: fresh > 0.1 ? `0 0 50px ${rgba(MOD, 0.3 * fresh)}` : "none" }}>
                  <div style={{ fontFamily: FT.title, fontSize: 54, color: C.white }}>{c.k}</div>
                  <div style={{ fontFamily: FT.body, fontSize: 24, color: C.grey, marginTop: 4 }}>{c.v}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QUIZ FLASH */}
      {t > 6.6 && (
        <div style={{ position: "absolute", inset: 0, opacity: quizIn }}>
          <div style={{ position: "absolute", left: "50%", top: 90, transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 14 }}>
            <Icon name="target" color={C.red} size={40} />
            <span style={{ fontFamily: FT.title, fontSize: 40, color: C.red, letterSpacing: 3 }}>QUIZ FLASH</span>
          </div>
          <div style={{ position: "absolute", left: "50%", top: 180, transform: "translateX(-50%)",
            width: 1300, textAlign: "center", fontFamily: FT.body, fontWeight: 700, fontSize: 44, color: C.white }}>
            La règle des 4×20, c'est quoi ?
          </div>

          {/* compte à rebours */}
          {!revealed && t > 8 && (
            <div style={{ position: "absolute", right: 140, top: 180, fontFamily: FT.mono,
              fontSize: 64, color: C.red, opacity: 0.9 }}>{countdown}</div>
          )}

          <div style={{ position: "absolute", left: "50%", top: 320, transform: "translateX(-50%)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, width: 1240 }}>
            {opts.map((o, i) => {
              const start = 7.4 + i * 0.4;
              const a = clamp((t - start) / 0.4, 0, 1);
              const isC = i === correct;
              const dim = revealed && !isC;
              const hit = revealed && isC;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "26px 32px",
                  borderRadius: 14, opacity: a * (dim ? 0.35 : 1),
                  background: hit ? rgba(C.green, 0.22) : rgba("#000", 0.4),
                  border: `2px solid ${hit ? C.green : rgba(MOD, 0.3)}`,
                  transform: `scale(${hit ? 1.04 : 1})`, transition: "all .3s" }}>
                  <span style={{ width: 46, height: 46, borderRadius: 999, flexShrink: 0,
                    border: `2px solid ${hit ? C.green : rgba(C.white, 0.4)}`, color: hit ? C.green : C.white,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: FT.title, fontSize: 26 }}>{String.fromCharCode(65 + i)}</span>
                  <span style={{ fontFamily: FT.body, fontSize: 27, fontWeight: 600,
                    color: hit ? C.white : (dim ? C.grey : C.white) }}>{o}</span>
                  {hit && <span style={{ marginLeft: "auto", color: C.green, fontSize: 34 }}>✓</span>}
                </div>
              );
            })}
          </div>

          {revealed && (
            <div style={{ position: "absolute", left: "50%", bottom: 150, transform: "translateX(-50%)",
              width: 1100, textAlign: "center", fontFamily: FT.body, fontSize: 27, color: C.grey,
              opacity: clamp((t - revealAt - 0.3) / 0.5, 0, 1) }}>
              <span style={{ color: C.green, fontWeight: 700 }}>Exact —</span> 20 secondes, 20 gestes, 20 mots, 20 centimètres.
            </div>
          )}
        </div>
      )}
    </Backdrop>
  );
}

/* ===== CTA FINAL (≈6 s) ===================================== */
function OutroCTA() {
  const { localTime: t } = useSprite();
  const a = Easing.easeOutCubic(clamp(t / 0.8, 0, 1));
  const arrow = Math.sin(t * 3) * 8;
  return (
    <Backdrop accent={C.slate} glow={0.7}>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        textAlign: "center", width: 1400, opacity: a }}>
        <div style={{ fontFamily: FT.body, fontSize: 30, color: C.grey, letterSpacing: 3, textTransform: "uppercase" }}>
          Épisode 01 — Terminé
        </div>
        <div style={{ fontFamily: FT.title, fontSize: 130, color: C.white, lineHeight: 1, margin: "18px 0 10px" }}>
          À TON TOUR.
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 20,
          marginTop: 30, whiteSpace: "nowrap", minWidth: 460,
          padding: "20px 56px", borderRadius: 999, background: C.red,
          boxShadow: `0 16px 50px ${rgba(C.red, 0.45)}`,
          transform: `translateX(${arrow}px)` }}>
          <span style={{ fontFamily: FT.title, fontSize: 40, color: C.white }}>MODULE SUIVANT</span>
          <span style={{ fontFamily: FT.title, fontSize: 40, color: C.white }}>→</span>
        </div>
        <div style={{ marginTop: 26, fontFamily: FT.body, fontSize: 30, color: C.slate, fontWeight: 700 }}>
          Ep 02 · « Les Règles du Jeu » — Loi Hoguet, cartes T/G/S
        </div>
        <div style={{ marginTop: 50, fontFamily: FT.title, fontSize: 44, color: C.red, letterSpacing: 6 }}>LENNY</div>
      </div>
    </Backdrop>
  );
}

Object.assign(window, { ChapterQuestions, TrapScene, RecapQuiz, OutroCTA });
