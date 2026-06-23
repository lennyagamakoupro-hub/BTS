/* global React */
const { useState, useEffect, useMemo, useRef } = React;

/* ============ Shared primitives ============ */
const Eyebrow = ({ children }) => (
  <div className="eyebrow"><span className="dot"></span>{children}</div>
);

const Subhead = ({ num, children }) => (
  <div className="subhead">
    {num && <span className="subhead-num">{num}</span>}
    <div className="subhead-text">{children}</div>
    <div className="subhead-line"></div>
  </div>
);

const Callout = ({ variant = "default", icon = "⚠", children }) => (
  <div className={`callout ${variant !== "default" ? variant : ""}`}>
    <div className="callout-icon">{icon}</div>
    <div className="callout-body">{children}</div>
  </div>
);

const LetterCircle = ({ letter, accent }) => (
  <div className={`letter-circle ${accent ? "accent" : ""}`}>{letter}</div>
);

const ReadToggle = ({ done, onToggle }) => (
  <button className={`read-toggle ${done ? "done" : ""}`} onClick={onToggle}>
    <span className="check">
      {done && (
        <svg viewBox="0 0 12 12" fill="none">
          <path d="M2 6.5L4.8 9L10 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    {done ? "Acquis" : "Marquer acquis"}
  </button>
);

/* ============ Module head ============ */
const ModuleHead = ({ mod, idx, total, tags = [], done, onToggle, onStudy, onNotes }) => {
  const Illustration = window.Illu && window.Illu[mod.id];
  return (
    <header className="module-head">
      <div className="module-head-left">
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <span className="mod-head-ribbon">
            <span className="num">{mod.num}</span>
            <span>{mod.tag}</span>
            <span className="time">· {mod.time || 10} min</span>
          </span>
        </div>
        <h2 className="mod-title" dangerouslySetInnerHTML={{ __html: mod.titleHtml || mod.title }} />
        {tags.length > 0 && (
          <div className="mod-tags">
            {tags.map((t,i) => <span key={i} className="mod-tag">{t}</span>)}
          </div>
        )}
      </div>
      <div className="mod-mark">
        {Illustration && (
          <div className="mod-illustration">
            <Illustration />
          </div>
        )}
        <div className="mod-mark-folio" style={{ marginTop: 14 }}>Fiche {String(idx).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>
        <div className="module-head-actions">
          {onNotes && (
            <button className="study-cta" onClick={onNotes} title="Notes">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="2.5" y="1.5" width="7" height="9" rx="1"/>
                <line x1="4" y1="4.5" x2="8" y2="4.5" strokeLinecap="round"/>
                <line x1="4" y1="6.5" x2="8" y2="6.5" strokeLinecap="round"/>
                <line x1="4" y1="8.5" x2="6.5" y2="8.5" strokeLinecap="round"/>
              </svg>
              Notes
            </button>
          )}
          {onStudy && (
            <button className="study-cta" onClick={onStudy}>
              <svg viewBox="0 0 12 12" fill="none">
                <rect x="2" y="2" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="4" y="4" width="6" height="8" rx="1" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Flashcards
            </button>
          )}
          <ReadToggle done={done} onToggle={onToggle} />
        </div>
      </div>
    </header>
  );
};

/* expose globally */
Object.assign(window, { Eyebrow, Subhead, Callout, LetterCircle, ReadToggle, ModuleHead });
