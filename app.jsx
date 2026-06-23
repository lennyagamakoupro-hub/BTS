/* global React, ReactDOM, MODULES, ModuleHead, HeroIllustration, PlanBataille, DeepDiveDrawer,
   Module01, Module02, ModuleDroit, ModuleProp, ModuleVert, ModuleUrba, ModuleVille, Module03, Module04, Module05, Module06, Module06bis, Module08, Module11, ModuleSynthese,
   Flashcards, Quiz, CommandPalette, Dashboard,
   useStreak, StreakBadge, DailySessionOverlay, ExamOverlay, NotesPanel, NotesFab, DarkToggle, STUDY, DEEPDIVE,
   GlossaryTooltip, Confetti, ToolsOverlay,
   AnimatedNumber, PomodoroWidget, MemoryGame, SortGame */

const { useState, useEffect, useRef, useCallback } = React;

const MOD_COMPONENTS = {
  m1: Module01, m2: Module02, mdroit: ModuleDroit, mprop: ModuleProp, mvert: ModuleVert, murba: ModuleUrba, mville: ModuleVille, m3: Module03, m4: Module04,
  m5: Module05, m6: Module06, m6b: Module06bis, m8: Module08,
  m11: Module11, syn: ModuleSynthese
};

const LS = {
  done: "revision-done",
  fc: "revision-fc",
  qz: "revision-qz",
  ex: "revision-exam",
  dark: "revision-dark",
  examDate: "revision-examdate"
};
const load = (k, fallback) => {
  try {return JSON.parse(localStorage.getItem(k) || "null") ?? fallback;}
  catch {return fallback;}
};

function App() {
  const total = MODULES.length;
  const [active, setActive] = useState(MODULES[0].id);
  const [done, setDone] = useState(() => load(LS.done, {}));
  const [fcScores, setFcScores] = useState(() => load(LS.fc, {}));
  const [qzScores, setQzScores] = useState(() => load(LS.qz, {}));
  const [examScore, setExamScore] = useState(() => load(LS.ex, null));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [studying, setStudying] = useState(null);
  const [dailyOpen, setDailyOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesMod, setNotesMod] = useState(null);
  const [dark, setDark] = useState(() => load(LS.dark, false));
  const [examDate, setExamDate] = useState(() => load(LS.examDate, null));
  const [streak, pingStreak] = useStreak();
  const [ddSlug, setDdSlug] = useState(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [pomoOpen, setPomoOpen] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const fireConfetti = () => setConfettiKey((k) => k + 1);

  // Expose openDeepDive globally for module cards to call
  useEffect(() => {
    window.openDeepDive = (slug) => setDdSlug(slug);
    return () => {delete window.openDeepDive;};
  }, []);

  useEffect(() => {localStorage.setItem(LS.done, JSON.stringify(done));}, [done]);
  useEffect(() => {localStorage.setItem(LS.fc, JSON.stringify(fcScores));}, [fcScores]);
  useEffect(() => {localStorage.setItem(LS.qz, JSON.stringify(qzScores));}, [qzScores]);
  useEffect(() => {localStorage.setItem(LS.ex, JSON.stringify(examScore));}, [examScore]);
  useEffect(() => {localStorage.setItem(LS.examDate, JSON.stringify(examDate));}, [examDate]);
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem(LS.dark, JSON.stringify(dark));
  }, [dark]);

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, .25, .5, .75, 1] }
    );
    MODULES.forEach((m) => {const el = document.getElementById(m.id);if (el) observer.observe(el);});
    return () => observer.disconnect();
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".module, .quiz, .dash, .hero-cover");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {e.target.classList.add("in");io.unobserve(e.target);}
      });
    }, { threshold: .05, rootMargin: "0px 0px -100px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keyboard: ⌘K, /
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      } else if (e.key === "/" && !e.target.matches("input,textarea")) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleDone = (id) => {
    setDone((d) => {
      const next = { ...d, [id]: !d[id] };
      if (!d[id]) {pingStreak();fireConfetti();}
      return next;
    });
  };
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = Math.round(doneCount / total * 100);

  const scrollToModule = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const startStudy = (id) => {setStudying(id);pingStreak();};

  const handleFcResults = (r) => {
    setFcScores((prev) => ({ ...prev, [r.modId]: { hits: r.hits, miss: r.miss, total: r.total, ts: Date.now() } }));
    pingStreak();
  };
  const handleQzResults = (r) => {
    setQzScores((prev) => ({ ...prev, [r.modId]: { score: r.score, total: r.total, ts: Date.now() } }));
    pingStreak();
    if (r.score === r.total) fireConfetti();
  };

  // Stats for hero stat strip
  const totalCards = Object.values(STUDY).reduce((a, m) => a + (m.cards?.length || 0), 0);
  const hitCards = Object.values(fcScores).reduce((a, v) => a + (v?.hits || 0), 0);
  const reviewedCards = Object.values(fcScores).reduce((a, v) => a + (v?.hits || 0) + (v?.miss || 0), 0);
  const todayStr = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="app">
      {/* ============ Sidebar ============ */}
      <aside className="rail">
        <div className="brand">
          <div className="brand-mark">L</div>
          <div className="brand-text">
            <div className="brand-title">révision <em>·</em></div>
            <div className="brand-sub">BTS Professions Immobilières</div>
          </div>
        </div>

        <div className="rail-meta">
          <span>Promo 2025-26</span>
          <span>INSEEC</span>
        </div>

        <StreakBadge streak={streak} onStart={() => setDailyOpen(true)} />

        <nav className="toc">
          {MODULES.map((m) =>
          <div
            key={m.id}
            className={`toc-item ${active === m.id ? "active" : ""} ${done[m.id] ? "done" : ""}`}
            onClick={() => scrollToModule(m.id)}
            style={{ "--mod-color": m.color }}>
            
              <div className="toc-swatch"></div>
              <div className="toc-num">{m.num}</div>
              <div className="toc-body">
                <div className="toc-title">{m.short}</div>
                <div className="toc-meta">{m.tag} · {m.time}min</div>
              </div>
              <svg className="toc-check" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeOpacity=".25" />
                <path d="M4 7.2L6.2 9.2L10 5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </nav>

        <div className="rail-progress">
          <div className="rail-progress-row">
            <span>Progression</span>
            <span>{doneCount}/{total} · {pct}%</span>
          </div>
          <div className="rail-progress-bar">
            <div className="rail-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </aside>

      {/* ============ Main canvas ============ */}
      <main className="canvas">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-folio">№ 001 — {todayStr}</div>
            <div className="topbar-title"> <em>Révision</em> Modules 1 à 11</div>
          </div>
          <div className="topbar-actions">
            <button className="pill-btn" onClick={() => setPaletteOpen(true)}>
              <svg viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Rechercher
              <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, padding: "1px 5px", background: "rgba(0,0,0,.06)", border: "1px solid var(--rule)", borderRadius: 4, marginLeft: 4 }}>⌘K</span>
            </button>
            <button className="pill-btn" onClick={() => setToolsOpen(true)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="9" width="5" height="5" rx="1" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
              Outils
            </button>
            <button className={`pill-btn ${pomoOpen ? "active" : ""}`} onClick={() => setPomoOpen((p) => !p)} title="Minuteur Pomodoro">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="8" cy="9" r="5.5" />
                <line x1="8" y1="9" x2="8" y2="6" strokeLinecap="round" />
                <line x1="8" y1="9" x2="10" y2="10" strokeLinecap="round" />
                <line x1="6" y1="2" x2="10" y2="2" strokeLinecap="round" />
                <line x1="8" y1="2" x2="8" y2="3.5" strokeLinecap="round" />
              </svg>
              Concentré
            </button>
            <DarkToggle dark={dark} onToggle={() => setDark((d) => !d)} />
            <button className="pill-btn" onClick={() => window.print()}>
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M4 5V2h8v3M4 11H2V6h12v5h-2M4 9h8v5H4V9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              Imprimer
            </button>
            <button className="pill-btn" onClick={() => {
              if (confirm("Réinitialiser toute la progression (fiches, flashcards, quizzes, notes) ?")) {
                setDone({});setFcScores({});setQzScores({});setExamScore(null);
                localStorage.removeItem("revision-notes");
                localStorage.removeItem("revision-streak");
              }
            }}>Réinitialiser</button>
          </div>
        </div>

        {/* ===== Hero magazine cover ===== */}
        <section className="hero-cover">
          <div className="hero-cover-l">
            <div className="hero-publication-bar">
              <div className="hero-publication-name">révision <em>·</em> <span className="dim">le journal du BTS PI</span></div>
              <div className="hero-publication-meta">
                <span>№ 001</span>
                <span>{todayStr}</span>
                <span>Promo 2025-26</span>
              </div>
            </div>

            <h1>
              GO APPRENDRE<br />
              <span className="line2"><em></em></span><br />
              <span className="line3"></span>
            </h1>

            <div className="hero-cover-sub">MISSION BTS : ON SE METS AU BOULOT OU ON DORS ? 


            </div>

            <div className="action-row">
              <button className="action-pill accent" onClick={() => {
                const next = MODULES.find((m) => !done[m.id]) || MODULES[0];
                startStudy(next.id);
              }}>
                ▸ Commencer une session
              </button>
              <button className="action-pill" onClick={() => setDailyOpen(true)}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="1.5" y="2.5" width="9" height="8" rx="1" />
                  <line x1="1.5" y1="4.5" x2="10.5" y2="4.5" />
                  <circle cx="4" cy="7" r=".8" fill="currentColor" />
                  <circle cx="7" cy="7" r=".8" fill="currentColor" />
                </svg>
                Session du jour
              </button>
              <button className="action-pill outline" onClick={() => setExamOpen(true)}>
                ◷ Examen blanc
              </button>
              <button className="action-pill outline" onClick={() => setPaletteOpen(true)}>
                Rechercher <span style={{ fontFamily: "IBM Plex Mono", fontSize: 10, padding: "1px 5px", background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: 4, marginLeft: 4 }}>⌘K</span>
              </button>
            </div>
          </div>

          <div className="hero-cover-r">
            <div className="hero-illustration">
              <PlanBataille
                done={done}
                fcScores={fcScores}
                qzScores={qzScores}
                examDate={examDate}
                onSetExamDate={(d) => setExamDate(d)}
                onJump={scrollToModule}
                onStudy={startStudy} />
              
            </div>

            <div className="hero-stat-strip">
              <div className="hero-stat">
                <div className="hero-stat-v"><em><AnimatedNumber value={doneCount} /></em>/{total}</div>
                <div className="hero-stat-k">Fiches</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-v"><em><AnimatedNumber value={hitCards} /></em></div>
                <div className="hero-stat-k">Cartes acquises</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-v"><em><AnimatedNumber value={streak.days} /></em>j</div>
                <div className="hero-stat-k">Série</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-v"><em>{examScore ? <AnimatedNumber value={examScore.pct} /> : "—"}</em>{examScore ? "%" : ""}</div>
                <div className="hero-stat-k">Examen blanc</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Modules + per-module quiz ===== */}
        {MODULES.map((m, idx) => {
          const Cmp = MOD_COMPONENTS[m.id];
          if (!Cmp) return null;
          const head =
          <ModuleHead
            mod={m}
            idx={idx + 1}
            total={total}
            done={!!done[m.id]}
            onToggle={() => toggleDone(m.id)}
            onStudy={() => startStudy(m.id)}
            onNotes={() => {setNotesMod(m.id);setNotesOpen(true);}} />;


          return (
            <React.Fragment key={m.id}>
              <Cmp mod={m} head={head} />
              <div
                className="module-quiz-wrap"
                data-mod={m.id}
                style={{ padding: "0 56px 64px", borderBottom: "1px solid var(--rule)", "--mc": m.color, "--mcs": m.colorSoft }}>
                
                <Quiz modId={m.id} onResults={handleQzResults} />
              </div>
            </React.Fragment>);

        })}

        <footer className="footer">
          <div>
            <div className="eyebrow"><span className="dot"></span>Colophon</div>
            <div className="footer-mark">révision <em style={{ color: "var(--accent)" }}>·</em></div>
          </div>
          <div className="footer-meta">
            Lenny Agamakou · BTS PI · INSEEC<br />
            Promotion 2025 — 2026<br />
            Composé en Inter & IBM Plex
          </div>
        </footer>
      </main>

      {/* ===== Overlays / floating ===== */}
      {studying &&
      <Flashcards modId={studying} onClose={() => setStudying(null)} onResults={handleFcResults} />
      }
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onJump={(id) => scrollToModule(id)}
        onStudy={(id) => startStudy(id)} />
      
      {dailyOpen &&
      <DailySessionOverlay
        onClose={() => setDailyOpen(false)}
        done={done}
        fcScores={fcScores}
        onComplete={() => pingStreak()} />

      }
      {examOpen &&
      <ExamOverlay
        onClose={() => setExamOpen(false)}
        onComplete={(s) => {setExamScore({ pct: s.pct, right: s.right, total: s.total, ts: Date.now() });pingStreak();}} />

      }
      {notesOpen &&
      <NotesPanel activeModId={notesMod || active} onClose={() => setNotesOpen(false)} />
      }
      <NotesFab open={notesOpen} onToggle={() => {setNotesMod(active);setNotesOpen((o) => !o);}} />

      <DeepDiveDrawer
        slug={ddSlug}
        onClose={() => setDdSlug(null)}
        onJump={(s) => setDdSlug(s)} />
      

      {toolsOpen && <ToolsOverlay onClose={() => setToolsOpen(false)} />}
      <GlossaryTooltip />
      <Confetti trigger={confettiKey} />
      <PomodoroWidget visible={pomoOpen} onClose={() => setPomoOpen(false)} />
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);