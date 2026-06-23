/* global React, MODULES, DEEPDIVE */
const { useState, useEffect, useRef } = React;

/* ============ Deep Dive Drawer ============ */
function DeepDiveDrawer({ slug, onClose, onJump }) {
  const data = slug ? DEEPDIVE[slug] : null;
  const mod = data ? MODULES.find(m => m.id === data.mod) : null;

  // Keyboard
  useEffect(() => {
    if (!slug) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug, onClose]);

  if (!slug || !data || !mod) return null;

  return (
    <>
      <div className="dd-scrim" onClick={onClose} />
      <aside className="dd-drawer" style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
        <header className="dd-head">
          <div className="dd-head-l">
            <div className="dd-eyebrow">
              <span className="dd-eyebrow-dot"></span>
              <span>{mod.tag} · {mod.short}</span>
            </div>
            <h3 className="dd-title">{data.title}</h3>
          </div>
          <button className="dd-close" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <line x1="4" y1="4" x2="12" y2="12" strokeLinecap="round"/>
              <line x1="12" y1="4" x2="4" y2="12" strokeLinecap="round"/>
            </svg>
          </button>
        </header>

        {data.lede && (
          <div className="dd-lede">{data.lede}</div>
        )}

        <div className="dd-body">
          {data.sections.map((s, i) => (
            <section key={i} className="dd-section">
              <div className="dd-section-h">
                <span className="dd-section-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="dd-section-t">{s.h}</span>
              </div>
              {s.b && <div className="dd-section-b">{s.b}</div>}
              {s.list && (
                <ul className="dd-list">
                  {s.list.map((l, j) => <li key={j}>{l}</li>)}
                </ul>
              )}
            </section>
          ))}

          {data.linked && data.linked.length > 0 && (
            <section className="dd-linked">
              <div className="dd-linked-k">Voir aussi</div>
              <div className="dd-linked-list">
                {data.linked.map(s => {
                  const t = DEEPDIVE[s];
                  if (!t) return null;
                  const m = MODULES.find(x => x.id === t.mod);
                  return (
                    <button key={s} className="dd-linked-row" onClick={() => onJump(s)}
                      style={{ "--mc": m.color }}>
                      <span className="dd-linked-dot"></span>
                      <span className="dd-linked-t">{t.title}</span>
                      <span className="dd-linked-mod">{m.short}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <footer className="dd-foot">
          <button className="dd-jump" onClick={() => {
            const el = document.getElementById(mod.id);
            if (el) { onClose(); setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100); }
          }}>
            ↳ Voir le module complet
          </button>
        </footer>
      </aside>
    </>
  );
}

Object.assign(window, { DeepDiveDrawer });
