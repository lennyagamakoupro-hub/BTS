/* global React, MODULES, GLOSSARY */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ============ Animated counter ============ */
function AnimatedNumber({ value, duration = 800, suffix = "", prefix = "" }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (to - from) * eased;
      setDisplay(v);
      if (t < 1) raf = requestAnimationFrame(tick);
      else { setDisplay(to); prevRef.current = to; }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  const rendered = Number.isInteger(value) ? Math.round(display) : display.toFixed(1);
  return <>{prefix}{rendered}{suffix}</>;
}

/* ============ Pomodoro Timer ============ */
const POMO_KEY = "revision-pomodoro";

function usePomodoro() {
  const [state, setState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(POMO_KEY) || "null");
      if (saved) return { ...saved, running: false };
    } catch (e) {}
    return { phase: "focus", remaining: 25 * 60, total: 25 * 60, cycles: 0, running: false };
  });

  useEffect(() => {
    localStorage.setItem(POMO_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!state.running) return;
    const t = setInterval(() => {
      setState(s => {
        if (s.remaining <= 1) {
          // phase switch
          const isFocus = s.phase === "focus";
          const newCycles = isFocus ? s.cycles + 1 : s.cycles;
          const newPhase = isFocus ? (newCycles % 4 === 0 ? "long" : "break") : "focus";
          const newTotal = newPhase === "focus" ? 25*60 : newPhase === "break" ? 5*60 : 15*60;
          // Play sound + notify
          try {
            if ("vibrate" in navigator) navigator.vibrate(200);
            // Browser notification (only if permission)
            if (window.Notification && Notification.permission === "granted") {
              new Notification(isFocus ? "Pause !" : "Focus !", { body: isFocus ? "Bien joué. Repose-toi." : "Au boulot.", silent: false });
            }
          } catch (e) {}
          return { phase: newPhase, remaining: newTotal, total: newTotal, cycles: newCycles, running: true };
        }
        return { ...s, remaining: s.remaining - 1 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, [state.running]);

  const start = () => {
    setState(s => ({ ...s, running: true }));
    if (window.Notification && Notification.permission !== "denied" && Notification.permission !== "granted") {
      try { Notification.requestPermission(); } catch (e) {}
    }
  };
  const pause = () => setState(s => ({ ...s, running: false }));
  const reset = () => setState(s => ({ phase: "focus", remaining: 25*60, total: 25*60, cycles: 0, running: false }));
  const skip = () => setState(s => ({ ...s, remaining: 1 }));

  return { state, start, pause, reset, skip };
}

function PomodoroWidget({ visible, onClose }) {
  const { state, start, pause, reset, skip } = usePomodoro();
  const mins = Math.floor(state.remaining / 60);
  const secs = state.remaining % 60;
  const pct = (state.remaining / state.total) * 100;

  const phaseLabel = { focus: "Focus", break: "Pause courte", long: "Pause longue" }[state.phase];
  const phaseColor = state.phase === "focus" ? "var(--accent)" : "var(--forest)";

  if (!visible) return null;

  return (
    <div className="pomo-widget">
      <div className="pomo-head">
        <div className="pomo-phase" style={{ color: phaseColor }}>
          <span className="pomo-dot" style={{ background: phaseColor }}></span>
          {phaseLabel}
        </div>
        <button className="pomo-close" onClick={onClose}>×</button>
      </div>
      <div className="pomo-time">{String(mins).padStart(2,"0")}<span className="pomo-sep">:</span>{String(secs).padStart(2,"0")}</div>
      <div className="pomo-bar">
        <div className="pomo-bar-fill" style={{ width: pct + "%", background: phaseColor }}></div>
      </div>
      <div className="pomo-cycles">
        {[0,1,2,3].map(i => (
          <div key={i} className={`pomo-cycle ${i < (state.cycles % 4) || (state.cycles > 0 && state.cycles % 4 === 0 && i < 4) ? "done" : ""}`}></div>
        ))}
        <span className="pomo-cycles-c">{state.cycles} cycle{state.cycles>1?"s":""}</span>
      </div>
      <div className="pomo-actions">
        {!state.running
          ? <button className="pomo-btn primary" onClick={start}>▸ {state.remaining < state.total ? "Reprendre" : "Démarrer"}</button>
          : <button className="pomo-btn" onClick={pause}>⏸ Pause</button>
        }
        <button className="pomo-btn ghost" onClick={skip} title="Passer cette phase">⤳</button>
        <button className="pomo-btn ghost" onClick={reset} title="Réinitialiser">↻</button>
      </div>
    </div>
  );
}

/* ============ Memory Pairs Game — Diagnostics ============ */
const DIAGNOSTICS_PAIRS = [
  { k: "DPE",            v: "10 ans" },
  { k: "ERP",            v: "6 mois" },
  { k: "Plomb (CREP)",   v: "Avant 1949" },
  { k: "Amiante",        v: "Avant 1/7/1997" },
  { k: "Gaz / Élec.",    v: "> 15 ans" },
  { k: "Termites",       v: "6 mois (zone)" },
  { k: "Assainissement", v: "3 ans" },
  { k: "Bruit",          v: "Illimitée" },
];

function MemoryGame({ onClose }) {
  const [cards, setCards] = useState(() => {
    const all = [];
    DIAGNOSTICS_PAIRS.forEach((p, i) => {
      all.push({ id: `k${i}`, pairId: i, text: p.k, type: "k" });
      all.push({ id: `v${i}`, pairId: i, text: p.v, type: "v" });
    });
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.map(c => ({ ...c, flipped: false, matched: false }));
  });
  const [picked, setPicked] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (picked.length === 2) {
      const [a, b] = picked;
      const cardA = cards.find(c => c.id === a);
      const cardB = cards.find(c => c.id === b);
      if (cardA.pairId === cardB.pairId) {
        setTimeout(() => {
          setCards(cs => cs.map(c => c.pairId === cardA.pairId ? { ...c, matched: true } : c));
          setPicked([]);
          setMoves(m => m + 1);
        }, 400);
      } else {
        setTimeout(() => {
          setCards(cs => cs.map(c => (c.id === a || c.id === b) ? { ...c, flipped: false } : c));
          setPicked([]);
          setMoves(m => m + 1);
        }, 900);
      }
    }
  }, [picked, cards]);

  useEffect(() => {
    if (cards.every(c => c.matched)) setDone(true);
  }, [cards]);

  const flip = (id) => {
    if (picked.length >= 2) return;
    const card = cards.find(c => c.id === id);
    if (card.flipped || card.matched) return;
    setCards(cs => cs.map(c => c.id === id ? { ...c, flipped: true } : c));
    setPicked(p => [...p, id]);
  };

  if (done) {
    const stars = moves <= 10 ? 3 : moves <= 14 ? 2 : 1;
    return (
      <div className="overlay tools-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="game-shell">
          <button className="overlay-close" onClick={onClose}>×</button>
          <div className="game-result">
            <div style={{ fontSize: 60 }}>{"⭐".repeat(stars)}</div>
            <div className="game-result-score">
              <em>{moves}</em> coups · ⌛ <em>{time}</em>s
            </div>
            <div className="game-result-msg">
              {stars === 3 ? "Mémoire de chef ! Toutes les durées sont gravées." :
               stars === 2 ? "Très bien ! Tu maîtrises l'essentiel." :
                             "À retenter — chaque diagnostic à sa durée."}
            </div>
            <div className="game-result-actions">
              <button className="action-pill accent" onClick={() => window.location.reload()}>↻ Rejouer</button>
              <button className="action-pill outline" onClick={onClose}>Fermer</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay tools-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="game-shell" style={{ maxWidth: 720 }}>
        <button className="overlay-close" onClick={onClose}>×</button>
        <div className="game-head">
          <div>
            <div className="game-eyebrow">Diagnostics flash · Module 5</div>
            <div className="game-title">Trouve les <em>paires</em>.</div>
          </div>
          <div className="game-stats">
            <div><strong>{cards.filter(c => c.matched).length / 2}</strong>/{DIAGNOSTICS_PAIRS.length}</div>
            <div className="game-stats-time">⌛ {time}s · {moves} coups</div>
          </div>
        </div>
        <div className="memory-grid">
          {cards.map(c => (
            <div key={c.id}
              className={`memory-card ${c.flipped ? "flipped" : ""} ${c.matched ? "matched" : ""} ${c.type === "v" ? "valeur" : "diag"}`}
              onClick={() => flip(c.id)}>
              <div className="memory-card-inner">
                <div className="memory-card-front">?</div>
                <div className="memory-card-back">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ Drag & Drop Sort Game ============ */
function SortGame({ kind, onClose }) {
  // kind = "4x20" | "lois" | "soncas"
  const datasets = {
    "4x20": {
      title: "Remets les 4×20 dans l'ordre",
      eyebrow: "4×20 · Module 1",
      items: [
        { id: 1, t: "20 SECONDES", d: "Apparence, ponctualité, tenue" },
        { id: 2, t: "20 GESTES",   d: "Posture, démarche, poignée de main" },
        { id: 3, t: "20 MOTS",     d: "Phrase d'accroche, présentation" },
        { id: 4, t: "20 CM",       d: "Sourire et regard du visage" },
      ],
    },
    "lois": {
      title: "Lois immo — ordre chronologique",
      eyebrow: "Lois · Module 2",
      items: [
        { id: 1, t: "Loi HOGUET", d: "Carte pro, mandat écrit, registre" },
        { id: 2, t: "Loi HAMON",  d: "DIP, rétractation 14 j" },
        { id: 3, t: "Loi ALUR",   d: "Encadrement loyers, 42 h/3 ans" },
        { id: 4, t: "Loi ELAN",   d: "Bail mobilité, encadrement Airbnb" },
      ],
      // Hoguet 1970, Hamon mars 2014, ALUR mars 2014 mais postérieure, ELAN 2018
      // For simplicity: chronological order with Hamon avant ALUR (Mar vs same month, both 2014). Let's say Hamon before ALUR by date.
    },
    "soncas": {
      title: "Range les lettres du SONCAS(E)",
      eyebrow: "SONCAS(E) · Module 1",
      items: [
        { id: 1, t: "S", d: "Sécurité" },
        { id: 2, t: "O", d: "Orgueil" },
        { id: 3, t: "N", d: "Nouveauté" },
        { id: 4, t: "C", d: "Confort" },
        { id: 5, t: "A", d: "Argent" },
        { id: 6, t: "S", d: "Sympathie" },
        { id: 7, t: "E", d: "Écologie" },
      ],
    },
  };
  const cfg = datasets[kind];
  // Shuffle initially
  const [order, setOrder] = useState(() => {
    const arr = [...cfg.items].map(x => x.id);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const [draggedId, setDraggedId] = useState(null);
  const [done, setDone] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const correctOrder = cfg.items.map(i => i.id).join(",");
  const isCorrect = order.join(",") === correctOrder;

  const onDragStart = (id) => setDraggedId(id);
  const onDragOver = (e, overId) => {
    e.preventDefault();
    if (draggedId === null || draggedId === overId) return;
    setOrder(o => {
      const arr = [...o];
      const fromIdx = arr.indexOf(draggedId);
      const toIdx = arr.indexOf(overId);
      arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, draggedId);
      return arr;
    });
  };
  const onDrop = () => {
    setDraggedId(null);
    setMoves(m => m + 1);
  };
  const moveUp = (id) => {
    setOrder(o => {
      const arr = [...o];
      const i = arr.indexOf(id);
      if (i > 0) {
        [arr[i-1], arr[i]] = [arr[i], arr[i-1]];
      }
      return arr;
    });
    setMoves(m => m + 1);
  };
  const moveDown = (id) => {
    setOrder(o => {
      const arr = [...o];
      const i = arr.indexOf(id);
      if (i < arr.length - 1) {
        [arr[i+1], arr[i]] = [arr[i], arr[i+1]];
      }
      return arr;
    });
    setMoves(m => m + 1);
  };

  return (
    <div className="overlay tools-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="game-shell">
        <button className="overlay-close" onClick={onClose}>×</button>
        <div className="game-head">
          <div>
            <div className="game-eyebrow">{cfg.eyebrow}</div>
            <div className="game-title">{cfg.title}</div>
          </div>
          <div className="game-stats">
            <div>{moves} mouvements</div>
            {done && <div className="game-stats-time" style={{ color: "var(--forest)" }}>✓ Validé</div>}
          </div>
        </div>
        <div className="sort-list">
          {order.map((id, idx) => {
            const item = cfg.items.find(i => i.id === id);
            return (
              <div key={id}
                className={`sort-item ${draggedId === id ? "dragging" : ""}`}
                draggable
                onDragStart={() => onDragStart(id)}
                onDragOver={(e) => onDragOver(e, id)}
                onDrop={onDrop}
                onDragEnd={() => setDraggedId(null)}>
                <div className="sort-grab">⋮⋮</div>
                <div className="sort-num">{idx + 1}</div>
                <div className="sort-content">
                  <div className="sort-t">{item.t}</div>
                  <div className="sort-d">{item.d}</div>
                </div>
                <div className="sort-arrows">
                  <button onClick={() => moveUp(id)} disabled={idx === 0}>↑</button>
                  <button onClick={() => moveDown(id)} disabled={idx === order.length - 1}>↓</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sort-foot">
          {done ? (
            <div className="sort-done">
              <div className="game-result-msg">🎯 Parfait ! Ordre validé en <strong>{moves}</strong> mouvements.</div>
              <button className="action-pill outline" onClick={onClose}>Fermer</button>
            </div>
          ) : (
            <button className="action-pill accent" onClick={() => {
              if (isCorrect) setDone(true);
              else alert("Pas encore — vérifie l'ordre.");
            }}>✓ Valider</button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  AnimatedNumber,
  PomodoroWidget,
  MemoryGame,
  SortGame,
});
