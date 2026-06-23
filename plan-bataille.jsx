/* global React, MODULES, STUDY */
const { useState, useMemo, useEffect: useEffectPB } = React;

/* ===== Helper: mastery score per module ===== */
function masteryFor(modId, done, fcScores, qzScores) {
  const isDone = done[modId] ? 1 : 0;
  const fc = fcScores[modId];
  const qz = qzScores[modId];
  const fcPct = fc && fc.total > 0 ? (fc.hits || 0) / fc.total : 0;
  const qzPct = qz && qz.total > 0 ? (qz.score || 0) / qz.total : 0;
  // Weighted mix
  return Math.min(1, isDone * .3 + fcPct * .4 + qzPct * .3);
}

/* ============ View 1: Carte (floor plan) ============ */
function CarteView({ done, fcScores, qzScores, onJump }) {
  // Grid plan with named areas — 4×3 layout with double-wide cells for some modules
  const layout = [
    { mod: "m1",  area: "m1",  label: "Accueil" },
    { mod: "m2",  area: "m2",  label: "Entreprises" },
    { mod: "m3",  area: "m3",  label: "Prospection" },
    { mod: "m4",  area: "m4",  label: "Ratios" },
    { mod: "m5",  area: "m5",  label: "Diagnostics" },
    { mod: "m6",  area: "m6",  label: "Estimation" },
    { mod: "m6b", area: "m6b", label: "Viager" },
    { mod: "m8",  area: "m8",  label: "Mandats" },
    { mod: "m11", area: "m11", label: "Financement" },
    { mod: "syn", area: "syn", label: "Synthèse" },
  ];
  return (
    <div className="pb-carte">
      <div className="pb-carte-grid">
        {layout.map((cell) => {
          const m = MODULES.find(x => x.id === cell.mod);
          const score = masteryFor(cell.mod, done, fcScores, qzScores);
          const isDone = !!done[cell.mod];
          return (
            <div
              key={cell.mod}
              className={`pb-room ${isDone ? "done" : ""}`}
              style={{
                gridArea: cell.area,
                "--mc": m.color,
                "--score": score,
              }}
              onClick={() => onJump(cell.mod)}
              title={`${m.title} — ${Math.round(score * 100)}% maîtrisé`}
            >
              <div className="pb-room-fill" style={{ height: `${Math.round(score * 100)}%` }}></div>
              <div className="pb-room-content">
                <div className="pb-room-num">{m.num}</div>
                <div className="pb-room-label">{cell.label}</div>
                {isDone && <div className="pb-room-check">✓</div>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pb-carte-legend">
        <span><span className="pb-dot pb-dot-empty"></span>vide</span>
        <span><span className="pb-dot pb-dot-mid"></span>en cours</span>
        <span><span className="pb-dot pb-dot-full"></span>acquis</span>
      </div>
    </div>
  );
}

/* ============ View 2: Radar ============ */
function RadarView({ done, fcScores, qzScores }) {
  const size = 280;
  const cx = size / 2, cy = size / 2;
  const radius = 105;
  const n = MODULES.length;

  const points = MODULES.map((m, i) => {
    const score = masteryFor(m.id, done, fcScores, qzScores);
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = radius * score;
    return {
      mod: m,
      score,
      angle,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      lx: cx + (radius + 20) * Math.cos(angle),
      ly: cy + (radius + 20) * Math.sin(angle),
    };
  });

  const polygon = points.map(p => `${p.x},${p.y}`).join(" ");

  const rings = [0.25, 0.5, 0.75, 1];

  // Find weakest 3 modules
  const weak = [...points].sort((a, b) => a.score - b.score).slice(0, 3);

  return (
    <div className="pb-radar">
      <svg viewBox={`0 0 ${size} ${size}`} className="pb-radar-svg" style={{ width: "100%", maxWidth: 320 }}>
        {/* Rings */}
        {rings.map((r, i) => {
          const ringPts = MODULES.map((_, idx) => {
            const a = (Math.PI * 2 * idx) / n - Math.PI / 2;
            return `${cx + radius * r * Math.cos(a)},${cy + radius * r * Math.sin(a)}`;
          }).join(" ");
          return (
            <polygon key={i} points={ringPts}
              fill="none" stroke="currentColor" strokeOpacity={i === rings.length - 1 ? .35 : .12} strokeWidth=".8" />
          );
        })}
        {/* Axes */}
        {MODULES.map((m, i) => {
          const a = (Math.PI * 2 * i) / n - Math.PI / 2;
          return (
            <line key={i}
              x1={cx} y1={cy}
              x2={cx + radius * Math.cos(a)} y2={cy + radius * Math.sin(a)}
              stroke="currentColor" strokeOpacity=".1" strokeWidth=".8" />
          );
        })}
        {/* Filled polygon */}
        <polygon points={polygon}
          fill="var(--accent)" fillOpacity=".22"
          stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
        ))}
        {/* Labels */}
        {points.map((p, i) => (
          <text key={i} x={p.lx} y={p.ly + 3}
            textAnchor={Math.abs(p.lx - cx) < 5 ? "middle" : p.lx > cx ? "start" : "end"}
            fontSize="9" fontFamily="IBM Plex Mono" fill="currentColor" fillOpacity=".7">
            {p.mod.short}
          </text>
        ))}
      </svg>
      <div className="pb-radar-weak">
        <div className="pb-radar-weak-k">À retravailler en priorité</div>
        <div className="pb-radar-weak-list">
          {weak.map(w => (
            <div key={w.mod.id} className="pb-radar-weak-row">
              <span className="pb-dot" style={{ background: w.mod.color }}></span>
              <span className="pb-radar-weak-name">{w.mod.short}</span>
              <span className="pb-radar-weak-pct">{Math.round(w.score * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ View 3: Plan (revision schedule) ============ */
function PlanView({ done, onJump, onStudy }) {
  // Recommended chronological order (≈10 days)
  const days = [
    { d: 1,  mods: ["m1"],       theme: "Fondamentaux · accueil" },
    { d: 2,  mods: ["m2"],       theme: "Droit · entreprises & lois" },
    { d: 3,  mods: ["m3", "m4"], theme: "Terrain · prospection & ratios" },
    { d: 4,  mods: ["m5"],       theme: "Diagnostics · le grand tableau" },
    { d: 5,  mods: ["m6"],       theme: "Estimation · les 6 méthodes" },
    { d: 6,  mods: ["m6b"],      theme: "Viager & démembrement" },
    { d: 7,  mods: ["m8"],       theme: "Mandats · les 9 mentions" },
    { d: 8,  mods: ["m11"],      theme: "Maths · intérêts & mensualités" },
    { d: 9,  mods: ["syn"],      theme: "Synthèse · les règles d'or" },
    { d: 10, mods: [],           theme: "Examen blanc + révisions ciblées", exam: true },
  ];

  // Find current day (next day with at least one undone module)
  let todayD = 1;
  for (const day of days) {
    const undone = day.mods.some(id => !done[id]);
    if (undone) { todayD = day.d; break; }
    if (day.exam) todayD = day.d;
  }

  return (
    <div className="pb-plan">
      {days.map(day => {
        const allDone = day.mods.length > 0 && day.mods.every(id => done[id]);
        const isToday = day.d === todayD;
        return (
          <div key={day.d} className={`pb-day ${allDone ? "done" : ""} ${isToday ? "today" : ""} ${day.exam ? "exam" : ""}`}>
            <div className="pb-day-marker">
              <div className="pb-day-num">J{day.d}</div>
            </div>
            <div className="pb-day-body">
              <div className="pb-day-theme">{day.theme}</div>
              <div className="pb-day-mods">
                {day.mods.map(id => {
                  const m = MODULES.find(x => x.id === id);
                  if (!m) return null;
                  const d = done[id];
                  return (
                    <button key={id} className={`pb-day-chip ${d ? "done" : ""}`}
                      style={{ "--mc": m.color }}
                      onClick={() => onJump(id)}>
                      {d && <span className="pb-day-chip-check">✓</span>}
                      {m.short}
                    </button>
                  );
                })}
                {day.exam && (
                  <span className="pb-day-chip pb-day-chip-exam">Examen blanc + relire les faibles</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============ View 4: Timeline ============ */
function TimelineView({ done, fcScores, qzScores, examDate, onSetExamDate, onJump }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const exam  = examDate ? new Date(examDate) : new Date(today.getTime() + 21 * 86400000);
  const days = Math.round((exam - today) / 86400000);
  const total = Math.max(days, 1);

  // Distribute modules along timeline
  const positions = MODULES.map((m, i) => ({
    mod: m,
    pos: (i + 1) / (MODULES.length + 1),
    done: !!done[m.id],
    score: masteryFor(m.id, done, fcScores, qzScores),
  }));

  const fmtDate = (d) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  return (
    <div className="pb-timeline">
      <div className="pb-tl-stats">
        <div>
          <div className="pb-tl-k">Aujourd'hui</div>
          <div className="pb-tl-v">{fmtDate(today)}</div>
        </div>
        <div className="pb-tl-arrow">→</div>
        <div>
          <div className="pb-tl-k">Date d'épreuve</div>
          <input className="pb-tl-input" type="date" value={exam.toISOString().slice(0,10)}
                 onChange={(e) => onSetExamDate(e.target.value)} />
        </div>
        <div className="pb-tl-countdown">
          <div className="pb-tl-cd-v">J−{days}</div>
          <div className="pb-tl-cd-k">jours restants</div>
        </div>
      </div>

      <div className="pb-tl-track">
        <div className="pb-tl-line"></div>
        <div className="pb-tl-marker pb-tl-today" style={{ left: "0%" }}>
          <div className="pb-tl-marker-dot"></div>
          <div className="pb-tl-marker-l">Maintenant</div>
        </div>
        {positions.map((p, i) => (
          <div key={p.mod.id} className={`pb-tl-marker ${p.done ? "done" : ""}`}
            style={{ left: `${p.pos * 100}%`, "--mc": p.mod.color }}
            onClick={() => onJump(p.mod.id)}>
            <div className="pb-tl-marker-dot"></div>
            <div className="pb-tl-marker-l">{p.mod.short}</div>
          </div>
        ))}
        <div className="pb-tl-marker pb-tl-exam" style={{ left: "100%" }}>
          <div className="pb-tl-marker-dot"></div>
          <div className="pb-tl-marker-l">Examen</div>
        </div>
      </div>

      <div className="pb-tl-hint">
        Pour tenir le rythme : <strong>{Math.max(1, Math.ceil((MODULES.length - Object.values(done).filter(Boolean).length) / Math.max(1, days)))}</strong> module(s) par jour à acquérir.
      </div>
    </div>
  );
}

/* ============ Tab shell ============ */
function PlanBataille({ done, fcScores, qzScores, examDate, onSetExamDate, onJump, onStudy }) {
  const [tab, setTab] = useState("carte");
  const tabs = [
    { id: "carte",    label: "Carte" },
    { id: "radar",    label: "Radar" },
    { id: "plan",     label: "Plan" },
    { id: "timeline", label: "Timeline" },
  ];

  return (
    <div className="pb">
      <div className="pb-head">
        <div className="pb-head-eyebrow">Plan de bataille · 01</div>
        <div className="pb-tabs">
          {tabs.map(t => (
            <button key={t.id}
              className={`pb-tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="pb-body">
        {tab === "carte"    && <CarteView    done={done} fcScores={fcScores} qzScores={qzScores} onJump={onJump} />}
        {tab === "radar"    && <RadarView    done={done} fcScores={fcScores} qzScores={qzScores} />}
        {tab === "plan"     && <PlanView     done={done} onJump={onJump} onStudy={onStudy} />}
        {tab === "timeline" && <TimelineView done={done} fcScores={fcScores} qzScores={qzScores}
                                              examDate={examDate} onSetExamDate={onSetExamDate}
                                              onJump={onJump} />}
      </div>
      <div className="pb-foot">
        {tab === "carte"    && <>« Chaque pièce se remplit au fur et à mesure. »</>}
        {tab === "radar"    && <>« Le polygone grandit — tu progresses. »</>}
        {tab === "plan"     && <>« 10 jours, un thème par jour, et c'est plié. »</>}
        {tab === "timeline" && <>« Une ligne droite vers le J. »</>}
      </div>
    </div>
  );
}

Object.assign(window, { PlanBataille });
