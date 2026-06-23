/* global React, MODULES, STUDY */
const { useState, useEffect, useMemo, useRef } = React;

/* ============ Streak (study days in a row) ============ */
function useStreak() {
  const [streak, setStreak] = useState(() => {
    try { return JSON.parse(localStorage.getItem("revision-streak") || "null") || { days: 0, last: null, history: [] }; }
    catch { return { days: 0, last: null, history: [] }; }
  });

  // Mark today as studied
  const ping = () => {
    const today = new Date().toISOString().slice(0, 10);
    setStreak(prev => {
      if (prev.last === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const days = prev.last === yesterday ? prev.days + 1 : 1;
      const next = { days, last: today, history: [...(prev.history || []), today].slice(-30) };
      localStorage.setItem("revision-streak", JSON.stringify(next));
      return next;
    });
  };

  // Check on mount: if last study > 1 day ago, reset days but keep history
  useEffect(() => {
    if (!streak.last) return;
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (streak.last !== today && streak.last !== yesterday) {
      setStreak(prev => ({ ...prev, days: 0 }));
    }
  }, []);

  return [streak, ping];
}

function StreakBadge({ streak, onStart }) {
  return (
    <div className="rail-streak" onClick={onStart} title="Session du jour">
      <div className="rail-streak-flame">✦</div>
      <div style={{ flex: 1 }}>
        <div className="rail-streak-v"><em>{streak.days}</em> {streak.days <= 1 ? "jour" : "jours"}</div>
        <div className="rail-streak-k">Série de révision</div>
      </div>
    </div>
  );
}

/* ============ Daily Session — curated 10 cards from weakest modules ============ */
function buildDailyDeck(done, fcScores) {
  // Pick weakest modules: those not marked done, or with low FC hit rate
  const scored = MODULES.map(m => {
    const fc = fcScores[m.id];
    const hitRate = fc ? (fc.hits || 0) / Math.max(fc.total || 1, 1) : 0;
    const reviewed = !!fc;
    const isDone = !!done[m.id];
    // priority: not done > low hit rate > never reviewed
    const priority = (isDone ? 0 : 100) + (reviewed ? (1 - hitRate) * 50 : 30);
    return { mod: m, priority, fc };
  }).sort((a, b) => b.priority - a.priority);

  // Take cards from top 3 modules
  const deck = [];
  for (const s of scored.slice(0, 4)) {
    const cards = (STUDY[s.mod.id] || {}).cards || [];
    const take = Math.min(3, cards.length);
    for (let i = 0; i < take; i++) {
      deck.push({ ...cards[i], modId: s.mod.id, modTag: s.mod.tag });
    }
  }
  return deck.slice(0, 12);
}

function DailySessionOverlay({ onClose, done, fcScores, onComplete }) {
  const deck = useMemo(() => buildDailyDeck(done, fcScores), [done, fcScores]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hits, setHits] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped(f => !f); }
      else if (e.key === "2" || e.key.toLowerCase() === "y") mark("hit");
      else if (e.key === "1" || e.key.toLowerCase() === "n") mark("miss");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, flipped]);

  const mark = (m) => {
    setHits(h => ({ ...h, [idx]: m }));
    if (idx + 1 >= deck.length) {
      setFinished(true);
      onComplete && onComplete();
    } else {
      setIdx(i => i + 1);
      setFlipped(false);
    }
  };

  if (deck.length === 0) {
    return (
      <div className="overlay fc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button className="overlay-close" onClick={onClose}>×</button>
        <div className="fc-done">
          <div className="fc-done-title">Aucune carte <em>à revoir</em>.</div>
          <div className="fc-done-stat-k">Continue ta lecture, reviens demain.</div>
        </div>
      </div>
    );
  }

  if (finished) {
    const hitCount = Object.values(hits).filter(v => v === "hit").length;
    const pct = Math.round((hitCount / deck.length) * 100);
    return (
      <div className="overlay fc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button className="overlay-close" onClick={onClose}>×</button>
        <div className="fc-done">
          <div className="fc-head-eyebrow">Session du jour · terminée</div>
          <div className="fc-done-title">
            {pct >= 80 ? <>Journée <em>verrouillée</em>.</> : pct >= 50 ? <><em>Bonne</em> session.</> : <>Reviens-y <em>demain</em>.</>}
          </div>
          <div className="fc-done-stats">
            <div>
              <div className="fc-done-stat-v"><em>{hitCount}</em>/{deck.length}</div>
              <div className="fc-done-stat-k">Acquises</div>
            </div>
            <div>
              <div className="fc-done-stat-v">{pct}%</div>
              <div className="fc-done-stat-k">Réussite</div>
            </div>
          </div>
          <button className="fc-btn hit" onClick={onClose} style={{ marginTop: 18 }}>Terminer</button>
        </div>
      </div>
    );
  }

  const card = deck[idx];
  return (
    <div className="overlay fc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="overlay-close" onClick={onClose}>×</button>
      <div className="fc-head">
        <div className="fc-head-left">
          <div className="fc-head-eyebrow"><span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--accent)",marginRight:6}}></span>Session du jour</div>
          <div className="fc-head-title">Mix · <em>{card.modTag}</em></div>
        </div>
        <div className="fc-counter">{String(idx+1).padStart(2,"0")} / {String(deck.length).padStart(2,"0")}</div>
      </div>
      <div className="fc-rail">
        {deck.map((_,i) => (
          <div key={i} className={`fc-rail-tick ${i === idx ? "active" : ""} ${hits[i] === "hit" ? "done" : ""} ${hits[i] === "miss" ? "miss" : ""}`} />
        ))}
      </div>
      <div className="fc-stage">
        <div className={`fc-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(f => !f)}>
          <div className="fc-face fc-front">
            <div className="fc-eyebrow"><span className="dot"></span>{card.modTag} · Question {idx+1}</div>
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
        <button className="fc-btn miss" onClick={() => mark("miss")}>À revoir <kbd>1</kbd></button>
        <button className="fc-btn" onClick={() => setFlipped(f => !f)}>{flipped ? "Question" : "Retourner"} <kbd>⎵</kbd></button>
        <button className="fc-btn hit" onClick={() => mark("hit")}>Acquise <kbd>2</kbd></button>
      </div>
    </div>
  );
}

/* ============ Exam Mode — combined quiz with timer ============ */
function ExamOverlay({ onClose, onComplete }) {
  // Build exam: all questions from all modules
  const questions = useMemo(() => {
    const all = [];
    MODULES.forEach(m => {
      const qz = (STUDY[m.id] || {}).quiz || [];
      qz.forEach(q => all.push({ ...q, mod: m }));
    });
    // shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, []);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // qIdx -> pickedIdx
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const limit = questions.length * 60; // 1 min per question

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    if (seconds >= limit && !done) setDone(true);
  }, [seconds, done, limit]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pick = (i) => setAnswers(a => ({ ...a, [idx]: i }));
  const next = () => idx + 1 >= questions.length ? finish() : setIdx(i => i + 1);
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const finish = () => { setDone(true); };

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;
  const remaining = Math.max(0, limit - seconds);
  const lowTime = remaining < 60;

  // Compute results once
  const results = useMemo(() => {
    if (!done) return null;
    const total = questions.length;
    const right = questions.reduce((acc, q, i) => acc + (answers[i] === q.r ? 1 : 0), 0);
    const pct = total > 0 ? Math.round((right / total) * 100) : 0;
    const byMod = {};
    questions.forEach((q, i) => {
      const k = q.mod.id;
      byMod[k] = byMod[k] || { mod: q.mod, total: 0, right: 0 };
      byMod[k].total++;
      if (answers[i] === q.r) byMod[k].right++;
    });
    return { total, right, pct, breakdown: Object.values(byMod) };
  }, [done]);

  // Fire onComplete exactly once when results are first computed
  const reportedRef = useRef(false);
  useEffect(() => {
    if (results && !reportedRef.current) {
      reportedRef.current = true;
      onComplete && onComplete({ pct: results.pct, right: results.right, total: results.total });
    }
  }, [results]);

  if (done && results) {
    const { right, total, pct, breakdown } = results;

    return (
      <div className="overlay exam-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="exam-shell">
          <div className="exam-head">
            <div>
              <div className="card-eyebrow"><span className="dot" style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--accent)",marginRight:6}}></span>Examen blanc · résultat</div>
              <div className="exam-title">Synthèse de ton <em>exam blanc</em></div>
            </div>
            <button className="action-pill outline" onClick={onClose}>Fermer</button>
          </div>
          <div className="exam-results">
            <div className="exam-score"><em>{right}</em><span style={{ opacity: .5 }}>/{total}</span></div>
            <div className="exam-verdict">
              {pct >= 80 ? "Très solide — tu es prêt." :
               pct >= 60 ? "Bonne base. Vise 80 % pour assurer." :
                           "Reprends les modules en rouge."}
            </div>
          </div>
          <div className="exam-breakdown">
            {breakdown.map(b => {
              const p = Math.round((b.right / b.total) * 100);
              const cls = p >= 70 ? "good" : "bad";
              return (
                <div key={b.mod.id} className={`exam-breakdown-row ${cls}`}>
                  <strong>{b.mod.short}</strong>
                  <span className="pct">{b.right}/{b.total} · {p}%</span>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap: 10, justifyContent:"center", marginTop: 22 }}>
            <button className="action-pill accent" onClick={() => {
              reportedRef.current = false;
              setIdx(0); setAnswers({}); setSeconds(0); setDone(false);
            }}>↻ Recommencer</button>
            <button className="action-pill outline" onClick={onClose}>Terminer</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const pickedI = answers[idx];
  const answered = Object.keys(answers).length;
  return (
    <div className="overlay exam-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="exam-shell">
        <div className="exam-head">
          <div>
            <div className="card-eyebrow"><span className="dot" style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:"var(--accent)",marginRight:6}}></span>Examen blanc · Question {idx+1} / {questions.length}</div>
            <div className="exam-title">À toi de <em>jouer</em>.</div>
          </div>
          <div className={`exam-clock ${lowTime ? "warn" : ""}`}>⌛ {fmtTime(remaining)}</div>
        </div>
        <div className="exam-progress">
          <div className="exam-progress-fill" style={{ width: `${((idx) / questions.length) * 100}%` }} />
        </div>
        <div className="exam-mod-tag">{q.mod.tag} · {q.mod.short}</div>
        <div className="exam-q">{q.q}</div>
        <div>
          {q.c.map((opt, i) => (
            <button key={i} className={`exam-opt ${pickedI === i ? "picked" : ""}`} onClick={() => pick(i)}>
              <div className="exam-opt-letter">{String.fromCharCode(65 + i)}</div>
              <div>{opt}</div>
            </button>
          ))}
        </div>
        <div className="exam-nav">
          <div className="dim" style={{ fontSize: 12, fontFamily: "IBM Plex Mono", letterSpacing: ".15em", textTransform: "uppercase" }}>
            {answered} / {questions.length} répondues
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="action-pill outline" onClick={prev} disabled={idx === 0}>← Précédent</button>
            {idx + 1 === questions.length
              ? <button className="action-pill accent" onClick={finish}>Terminer →</button>
              : <button className="action-pill" onClick={next}>Suivant →</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Notes panel ============ */
function NotesPanel({ activeModId, onClose }) {
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("revision-notes") || "{}"); }
    catch { return {}; }
  });
  const [selected, setSelected] = useState(activeModId || MODULES[0].id);

  useEffect(() => { if (activeModId) setSelected(activeModId); }, [activeModId]);

  const value = notes[selected] || "";
  const updateValue = (v) => {
    setNotes(n => {
      const next = { ...n, [selected]: v };
      localStorage.setItem("revision-notes", JSON.stringify(next));
      return next;
    });
  };

  const mod = MODULES.find(m => m.id === selected) || MODULES[0];
  return (
    <div className="notes-panel">
      <div className="notes-head">
        <div className="notes-head-l">
          <div className="notes-head-eyebrow">Carnet · {mod.tag}</div>
          <div className="notes-head-title">Mes notes · <em>{mod.short}</em></div>
        </div>
        <button className="overlay-close" style={{ position: "static", border: "1px solid var(--rule)", color: "var(--ink)", width: 28, height: 28, fontSize: 16 }} onClick={onClose}>×</button>
      </div>
      <textarea
        className="notes-textarea"
        placeholder="Écris ici tes propres mots, des moyens mnémotechniques, les pièges à éviter…"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
      <div className="notes-foot">
        <select className="notes-select" value={selected} onChange={(e) => setSelected(e.target.value)}>
          {MODULES.map(m => <option key={m.id} value={m.id}>{m.tag} · {m.short}</option>)}
        </select>
        <span>{value.length} car.</span>
      </div>
    </div>
  );
}

function NotesFab({ open, onToggle }) {
  return (
    <button className="notes-fab" onClick={onToggle} title="Mes notes">
      {open ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
          <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M6 4h10l3 3v13H6V4z" strokeLinejoin="round"/>
          <path d="M16 4v3h3" strokeLinejoin="round"/>
          <line x1="9" y1="11" x2="15" y2="11" strokeLinecap="round" strokeOpacity=".7"/>
          <line x1="9" y1="14" x2="15" y2="14" strokeLinecap="round" strokeOpacity=".7"/>
          <line x1="9" y1="17" x2="13" y2="17" strokeLinecap="round" strokeOpacity=".7"/>
        </svg>
      )}
    </button>
  );
}

/* ============ Dark mode toggle ============ */
function DarkToggle({ dark, onToggle }) {
  return (
    <button className="pill-btn" onClick={onToggle} title={dark ? "Mode jour" : "Mode nuit"}>
      {dark ? (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="8" cy="8" r="3" />
          <line x1="8" y1="1" x2="8" y2="3" strokeLinecap="round"/>
          <line x1="8" y1="13" x2="8" y2="15" strokeLinecap="round"/>
          <line x1="1" y1="8" x2="3" y2="8" strokeLinecap="round"/>
          <line x1="13" y1="8" x2="15" y2="8" strokeLinecap="round"/>
          <line x1="3" y1="3" x2="4.5" y2="4.5" strokeLinecap="round"/>
          <line x1="11.5" y1="11.5" x2="13" y2="13" strokeLinecap="round"/>
          <line x1="3" y1="13" x2="4.5" y2="11.5" strokeLinecap="round"/>
          <line x1="11.5" y1="4.5" x2="13" y2="3" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M13 9.5A6 6 0 117.5 3 5 5 0 0013 9.5z" strokeLinejoin="round"/>
        </svg>
      )}
      {dark ? "Jour" : "Nuit"}
    </button>
  );
}

Object.assign(window, { useStreak, StreakBadge, DailySessionOverlay, ExamOverlay, NotesPanel, NotesFab, DarkToggle });
