/* global React, MODULES, STUDY, SEARCH_INDEX */
const { useState, useEffect, useRef, useMemo } = React;

/* ============ Flashcards Overlay ============ */
function Flashcards({ modId, onClose, onResults }) {
  const mod = MODULES.find(m => m.id === modId) || MODULES[0];
  const cards = (STUDY[modId] || STUDY.m1).cards;
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hits, setHits] = useState({});  // idx -> "hit" | "miss"
  const [done, setDone] = useState(false);

  const flip = () => setFlipped(f => !f);
  const next = (mark) => {
    setHits(h => ({ ...h, [idx]: mark }));
    if (idx + 1 >= cards.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setFlipped(false);
    }
  };
  const prev = () => {
    if (idx > 0) {
      setIdx(i => i - 1);
      setFlipped(false);
    }
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") next("hit");
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "1" || e.key.toLowerCase() === "n") next("miss");
      else if (e.key === "2" || e.key.toLowerCase() === "y") next("hit");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, flipped]);

  useEffect(() => {
    if (done) {
      const hitCount = Object.values(hits).filter(v => v === "hit").length;
      const missCount = Object.values(hits).filter(v => v === "miss").length;
      onResults && onResults({ modId, hits: hitCount, miss: missCount, total: cards.length });
    }
  }, [done]);

  if (done) {
    const hitCount = Object.values(hits).filter(v => v === "hit").length;
    const missCount = Object.values(hits).filter(v => v === "miss").length;
    const pct = Math.round((hitCount / cards.length) * 100);
    return (
      <div className="overlay fc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button className="overlay-close" onClick={onClose}>×</button>
        <div className="fc-done">
          <div className="fc-head-eyebrow"><span className="dot" style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--accent)",marginRight:6}}></span>Session terminée · {mod.title}</div>
          <div className="fc-done-title">
            {pct >= 80 ? <>Maîtrise <em>solide</em>.</> : pct >= 50 ? <>En <em>progrès</em>.</> : <>À <em>retravailler</em>.</>}
          </div>
          <div className="fc-done-stats">
            <div>
              <div className="fc-done-stat-v"><em>{hitCount}</em>/{cards.length}</div>
              <div className="fc-done-stat-k">Acquises</div>
            </div>
            <div>
              <div className="fc-done-stat-v">{missCount}</div>
              <div className="fc-done-stat-k">À revoir</div>
            </div>
            <div>
              <div className="fc-done-stat-v">{pct}%</div>
              <div className="fc-done-stat-k">Réussite</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button className="fc-btn" onClick={() => { setIdx(0); setFlipped(false); setHits({}); setDone(false); }}>↻ Recommencer</button>
            <button className="fc-btn hit" onClick={onClose}>Terminer</button>
          </div>
        </div>
      </div>
    );
  }

  const card = cards[idx];
  return (
    <div className="overlay fc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="overlay-close" onClick={onClose}>×</button>
      <div className="fc-head">
        <div className="fc-head-left">
          <div className="fc-head-eyebrow"><span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--accent)",marginRight:6}}></span>{mod.tag}</div>
          <div className="fc-head-title">Flashcards · <em>{mod.short}</em></div>
        </div>
        <div className="fc-counter">{String(idx+1).padStart(2,"0")} / {String(cards.length).padStart(2,"0")}</div>
      </div>

      <div className="fc-rail">
        {cards.map((_,i) => (
          <div key={i} className={`fc-rail-tick ${i === idx ? "active" : ""} ${hits[i] === "hit" ? "done" : ""} ${hits[i] === "miss" ? "miss" : ""}`} />
        ))}
      </div>

      <div className="fc-stage">
        <div className={`fc-card ${flipped ? "flipped" : ""}`} onClick={flip}>
          <div className="fc-face fc-front">
            <div className="fc-eyebrow"><span className="dot"></span>Question {idx+1}</div>
            <div className="fc-q">{card.q}</div>
            <div className="fc-hint">Espace · cliquer · pour révéler</div>
          </div>
          <div className="fc-face fc-back">
            <div className="fc-eyebrow"><span className="dot"></span>Réponse</div>
            <div className="fc-a">{card.a}</div>
            <div className="fc-hint">→ marquer la carte</div>
          </div>
        </div>
      </div>

      <div className="fc-controls">
        <button className="fc-btn arrow" onClick={prev} disabled={idx === 0}>←</button>
        <button className="fc-btn miss" onClick={() => next("miss")}>
          À revoir <kbd>1</kbd>
        </button>
        <button className="fc-btn" onClick={flip}>
          {flipped ? "Question" : "Retourner"} <kbd>⎵</kbd>
        </button>
        <button className="fc-btn hit" onClick={() => next("hit")}>
          Acquise <kbd>2</kbd>
        </button>
      </div>
    </div>
  );
}

/* ============ Inline Quiz ============ */
// Seeded shuffle helper — deterministic per 2h window so the quiz stays consistent
function seedShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  const rand = () => {
    // Mulberry32
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Quiz({ modId, onResults }) {
  const mod = MODULES.find(m => m.id === modId);
  // Get the FULL pool of questions for this module
  const pool = (window.QUIZ && window.QUIZ[modId])
    || (window.STUDY && window.STUDY[modId] && window.STUDY[modId].quiz)
    || [];

  // 30-min rotation: seed = floor(now / 30min) + modId hash
  const QUIZ_SIZE = 20;
  const halfHour = 30 * 60 * 1000;
  const modHash = modId.split("").reduce((a, c) => ((a << 5) - a) + c.charCodeAt(0), 0);
  const [rotationSeed, setRotationSeed] = useState(
    () => Math.floor(Date.now() / halfHour) + modHash
  );

  // Refresh rotation when seed changes (every 30 min)
  useEffect(() => {
    const checkRotation = () => {
      const newSeed = Math.floor(Date.now() / halfHour) + modHash;
      if (newSeed !== rotationSeed) setRotationSeed(newSeed);
    };
    const interval = setInterval(checkRotation, 60 * 1000); // check each minute
    return () => clearInterval(interval);
  }, [rotationSeed, modHash, halfHour]);

  const questions = useMemo(
    () => seedShuffle(pool, rotationSeed).slice(0, Math.min(QUIZ_SIZE, pool.length)),
    [pool, rotationSeed]
  );

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState([]); // [picked-index, ...]
  const [done, setDone] = useState(false);

  // Reset when the module or rotation changes
  useEffect(() => {
    setIdx(0); setPicked(null); setAnswers([]); setDone(false);
  }, [modId, rotationSeed]);

  if (!pool.length || !questions.length) return null;

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
  };
  const advance = () => {
    const newAnswers = [...answers, picked];
    if (idx + 1 >= questions.length) {
      setAnswers(newAnswers);
      setDone(true);
      const score = newAnswers.filter((p, i) => p === questions[i].r).length;
      onResults && onResults({ modId, score, total: questions.length });
    } else {
      setAnswers(newAnswers);
      setIdx(idx + 1);
      setPicked(null);
    }
  };
  const restart = () => { setIdx(0); setPicked(null); setAnswers([]); setDone(false); };
  const reshuffle = () => {
    setRotationSeed(s => s + 1);
  };

  // Time until next rotation
  const msUntilNext = halfHour - (Date.now() % halfHour);
  const minsUntilNext = Math.ceil(msUntilNext / 60000);

  if (done) {
    const score = answers.filter((p, i) => p === questions[i].r).length;
    const pct = Math.round((score / questions.length) * 100);
    // List of questions answered wrong, for a recap
    const wrong = answers
      .map((p, i) => ({ p, i, q: questions[i] }))
      .filter(x => x.p !== x.q.r);

    return (
      <div className="quiz">
        <div className="quiz-head">
          <div className="quiz-head-l">
            <div className="quiz-head-eyebrow">
              <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--accent)",marginRight:6}}></span>
              Quiz · {mod.tag}
            </div>
            <div className="quiz-title">Résultat <em>final</em></div>
          </div>
          <div className="quiz-counter">{score}/{questions.length} · {pct}%</div>
        </div>
        <div className="quiz-result">
          <div className="quiz-result-score"><em>{score}</em><span style={{ opacity: .5 }}> / {questions.length}</span></div>
          <div className="quiz-result-msg">
            {pct === 100 ? "Sans-faute. Module verrouillé." :
             pct >= 66  ? "Bien joué — tu maîtrises l'essentiel." :
                          "Reprends la fiche, puis retente."}
          </div>

          {wrong.length > 0 && (
            <div className="quiz-recap">
              <div className="quiz-recap-h">À revoir — {wrong.length} question{wrong.length>1?"s":""}</div>
              <div className="quiz-recap-list">
                {wrong.map(x => (
                  <div className="quiz-recap-row" key={x.i}>
                    <div className="quiz-recap-q">{x.q.q}</div>
                    <div className="quiz-recap-a">
                      <span className="quiz-recap-tag">Bonne réponse</span> {x.q.c[x.q.r]}
                    </div>
                    {x.q.e && <div className="quiz-recap-e">{x.q.e}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="quiz-result-actions">
            <button className="quiz-restart" onClick={restart}>↻ Refaire les mêmes</button>
            <button className="quiz-restart" onClick={reshuffle} style={{ background: "transparent", color: "var(--paper)", border: "1px solid rgba(244,237,224,.3)" }}>
              ↻ Nouveau tirage
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const correct = picked !== null && picked === q.r;
  return (
    <div className="quiz">
      <div className="quiz-head">
        <div className="quiz-head-l">
          <div className="quiz-head-eyebrow">
            <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--accent)",marginRight:6}}></span>
            Quiz éclair · {mod.tag} · {pool.length} questions dispo
          </div>
          <div className="quiz-title">À toi de <em>jouer</em>.</div>
        </div>
        <div className="quiz-counter">
          <div>Question {idx+1} / {questions.length}</div>
          <div className="quiz-rotation">
            ⟲ Nouveau tirage dans {minsUntilNext > 60 ? `${Math.floor(minsUntilNext/60)}h${String(minsUntilNext%60).padStart(2,"0")}` : `${minsUntilNext}min`}
          </div>
        </div>
      </div>

      <div className="quiz-question">{q.q}</div>
      <div className="quiz-options">
        {q.c.map((opt, i) => {
          let cls = "quiz-opt";
          if (picked !== null) {
            if (i === q.r) cls += " right-reveal";
            if (i === picked && i !== q.r) cls += " wrong";
            if (i === picked && i === q.r) cls += " right";
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={picked !== null}
              onClick={() => pick(i)}
            >
              <div className="quiz-opt-letter">{String.fromCharCode(65 + i)}</div>
              <div>{opt}</div>
            </button>
          );
        })}
      </div>

      {/* Explanation (correction) appears when answered */}
      {picked !== null && (
        <div className={`quiz-correction ${correct ? "good" : "bad"}`}>
          <div className="quiz-correction-h">
            <span className="quiz-correction-mark">{correct ? "✓" : "✗"}</span>
            <span>{correct ? "Bonne réponse" : "Mauvaise réponse"}</span>
            {!correct && (
              <span className="quiz-correction-right">
                Bonne réponse : <strong>{String.fromCharCode(65 + q.r)} — {q.c[q.r]}</strong>
              </span>
            )}
          </div>
          {q.e && <div className="quiz-correction-body">{q.e}</div>}
        </div>
      )}

      <div className="quiz-foot">
        <div className="quiz-explain"></div>
        <button className="quiz-next" onClick={advance} disabled={picked === null}>
          {idx + 1 === questions.length ? "Voir le score →" : "Question suivante →"}
        </button>
      </div>
    </div>
  );
}

/* ============ Command Palette ============ */
function CommandPalette({ open, onClose, onJump, onStudy }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ(""); setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const norm = (s) => (s || "").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const results = useMemo(() => {
    const query = norm(q.trim());
    // Module entries
    const modItems = MODULES.map(m => ({
      kind: "module",
      t: m.title,
      kindLabel: m.tag,
      modId: m.id,
      mod: m.short,
    }));
    const conceptItems = (SEARCH_INDEX || []).map(s => {
      const m = MODULES.find(x => x.id === s.mod);
      return {
        kind: "concept",
        t: s.t,
        kindLabel: s.kind,
        modId: s.mod,
        mod: m ? m.short : "",
      };
    });
    const studyItems = MODULES.map(m => ({
      kind: "study",
      t: `Étudier ${m.short} en flashcards`,
      kindLabel: "Flashcards",
      modId: m.id,
      mod: m.short,
    }));
    const all = [...modItems, ...conceptItems, ...studyItems];
    if (!query) return all.slice(0, 30);
    return all.filter(it => norm(it.t).includes(query) || norm(it.mod).includes(query) || norm(it.kindLabel).includes(query)).slice(0, 30);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      else if (e.key === "Enter")     { e.preventDefault(); const r = results[active]; if (r) execute(r); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active]);

  const execute = (r) => {
    if (r.kind === "study") onStudy(r.modId);
    else onJump(r.modId);
    onClose();
  };

  if (!open) return null;

  // Group: concepts vs modules vs study
  const grouped = {
    "Aller à un module":      results.filter(r => r.kind === "module"),
    "Concepts & fiches":      results.filter(r => r.kind === "concept"),
    "Mode étude":             results.filter(r => r.kind === "study"),
  };
  let cursor = -1;
  return (
    <div className="overlay cp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cp">
        <div className="cp-search">
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            className="cp-input"
            placeholder="Cherche un concept, un module, une formule…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
          />
          <div className="cp-kbd">ESC</div>
        </div>
        <div className="cp-list">
          {results.length === 0 && <div className="cp-empty">Aucun résultat — vérifie l'orthographe.</div>}
          {Object.entries(grouped).map(([label, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={label}>
                <div className="cp-section">{label}</div>
                {items.map((r, i) => {
                  cursor++;
                  const idx = cursor;
                  return (
                    <div
                      key={`${r.kind}-${r.t}-${i}`}
                      className={`cp-row ${active === idx ? "active" : ""}`}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => execute(r)}
                    >
                      <div className="cp-row-t">{r.t}</div>
                      <div className="cp-row-kind">{r.kindLabel}</div>
                      <div className="cp-row-mod">{r.mod}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="cp-foot">
          <span>↑↓ naviguer</span>
          <span>⏎ valider</span>
          <span>ESC fermer</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Dashboard ============ */
function Dashboard({ done, quizScores, flashcardScores }) {
  const totalMods = MODULES.length;
  const doneCount = Object.values(done).filter(Boolean).length;

  const totalCards = Object.values(STUDY).reduce((acc, m) => acc + (m.cards?.length || 0), 0);
  const reviewedCards = Object.values(flashcardScores).reduce((acc, v) => acc + (v?.hits || 0) + (v?.miss || 0), 0);
  const hitCards = Object.values(flashcardScores).reduce((acc, v) => acc + (v?.hits || 0), 0);

  const totalQuizzes = Object.values(STUDY).reduce((acc, m) => acc + (m.quiz?.length || 0), 0);
  const quizDone = Object.values(quizScores).reduce((acc, v) => acc + (v?.total || 0), 0);
  const quizRight = Object.values(quizScores).reduce((acc, v) => acc + (v?.score || 0), 0);
  const quizPct = quizDone > 0 ? Math.round((quizRight / quizDone) * 100) : 0;

  return (
    <div className="dash">
      <div className="dash-cell">
        <div className="dash-k">Fiches acquises</div>
        <div className="dash-v"><em>{doneCount}</em> / {totalMods}</div>
        <div className="dash-sub">{Math.round((doneCount / totalMods) * 100)} % du dossier</div>
      </div>
      <div className="dash-cell">
        <div className="dash-k">Flashcards revues</div>
        <div className="dash-v"><em>{reviewedCards}</em> / {totalCards}</div>
        <div className="dash-sub">{hitCards} marquées acquises</div>
      </div>
      <div className="dash-cell">
        <div className="dash-k">Quiz · réussite moyenne</div>
        <div className="dash-v"><em>{quizPct}</em>%</div>
        <div className="dash-sub">{quizRight} sur {quizDone || "—"} questions</div>
      </div>
      <div className="dash-cell">
        <div className="dash-k">Prochaine étape</div>
        <div className="dash-v" style={{ fontSize: 22, lineHeight: 1.2, marginTop: 12 }}>
          {doneCount === 0
            ? <em>Commencer · Module 1</em>
            : doneCount === totalMods
              ? <em>Tout est acquis ✦</em>
              : (() => {
                  const next = MODULES.find(m => !done[m.id]);
                  return next ? <>Continuer · <em>{next.short}</em></> : "—";
                })()}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Flashcards, Quiz, CommandPalette, Dashboard });
