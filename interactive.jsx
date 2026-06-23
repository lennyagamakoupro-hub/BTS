/* global React, GLOSSARY */
const { useState, useEffect, useRef, useMemo } = React;

/* ============ Glossary tooltip system ============ */
// Automatically wraps known terms in the document with hoverable tooltips
function GlossaryTooltip() {
  const [hover, setHover] = useState(null); // { term, x, y }
  const overRef = useRef(null);

  useEffect(() => {
    // Wrap matching text nodes — only once
    if (!window.GLOSSARY || document.body.dataset.glossaryDone) return;
    document.body.dataset.glossaryDone = "1";

    const terms = Object.keys(window.GLOSSARY)
      .sort((a, b) => b.length - a.length); // longest first
    // Build regex: match whole words, case-sensitive (acronyms)
    const pattern = new RegExp("\\b(" + terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "g");

    function walk(node) {
      if (!node) return;
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        if (!text || text.length < 2) return;
        if (!pattern.test(text)) { pattern.lastIndex = 0; return; }
        pattern.lastIndex = 0;
        // Don't wrap inside certain tags
        const parent = node.parentNode;
        if (!parent) return;
        const tag = parent.tagName;
        if (!tag) return;
        if (["SCRIPT","STYLE","CODE","TEXTAREA","INPUT","BUTTON","SELECT","OPTION","H1","H2","H3","H4","H5","H6","EM","I","STRONG","B"].includes(tag)) return;
        if (parent.classList && (parent.classList.contains("gl-term") || parent.classList.contains("card-title") || parent.classList.contains("subhead-text") || parent.classList.contains("mod-title") || parent.classList.contains("stat") || parent.classList.contains("formula") || parent.classList.contains("dd-title") || parent.classList.contains("game-title") || parent.classList.contains("calc-title") || parent.closest(".cp,.dd-drawer,.fc-overlay,.exam-overlay,.tools-overlay,.toc,.notes-panel,.glossary-tooltip,.boot,.action-pill,.pill-btn,.fc-btn,.formula,.card-title,.subhead-text,.mod-title,.hero-cover h1,.dd-lede,.callout-icon,.kv-k,.card-eyebrow,.eyebrow,.dash,.pb,.exam-clock,.exam-title,.quiz-title,.quiz-correction-h,.quiz-recap-h,.quiz-result-msg,.dash-v,.hero-stat-v,.brand-title,.dd-section-t,.cell-mono,.glossary-tooltip,.mod-head-ribbon,.toc-item,.rail-streak,.rail-progress-row,.calc-title,.game-eyebrow,.calc-formula,.exam-mod-tag,.exam-breakdown-row,.fc-head-title,.fc-eyebrow,.fc-q,.fc-a,.pomo-widget"))) return;
        // Replace
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let m;
        pattern.lastIndex = 0;
        let any = false;
        while ((m = pattern.exec(text)) !== null) {
          any = true;
          if (m.index > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
          const span = document.createElement("span");
          span.className = "gl-term";
          span.dataset.term = m[1];
          span.textContent = m[0];
          frag.appendChild(span);
          lastIndex = m.index + m[0].length;
        }
        if (any) {
          if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
          parent.replaceChild(frag, node);
        }
        pattern.lastIndex = 0;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName;
        if (["SCRIPT","STYLE","CODE","TEXTAREA","INPUT","BUTTON","SELECT","OPTION"].includes(tag)) return;
        if (node.classList && (node.classList.contains("gl-term") || node.classList.contains("cp") || node.classList.contains("dd-drawer") || node.classList.contains("notes-textarea"))) return;
        const kids = Array.from(node.childNodes);
        kids.forEach(walk);
      }
    }

    // Run after a short delay so modules are mounted
    const t = setTimeout(() => {
      const root = document.querySelector("main.canvas");
      if (root) {
        // Only wrap glossary terms in plain body copy — never in titles, formulas, or stylized elements
        const targets = root.querySelectorAll(".card-body, .list-clean li, .dd-section-b, .callout-body, .hero-cover-sub, .quiz-correction-body, .quiz-recap-e, .kv-v");
        targets.forEach(walk);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  // Hover handlers
  useEffect(() => {
    function onOver(e) {
      const el = e.target.closest && e.target.closest(".gl-term");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setHover({
        term: el.dataset.term,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
    function onOut(e) {
      const el = e.target.closest && e.target.closest(".gl-term");
      if (el) setHover(null);
    }
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("scroll", () => setHover(null), true);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!hover) return null;
  const def = (window.GLOSSARY || {})[hover.term];
  if (!def) return null;

  // Clamp position
  const maxW = 320;
  let left = hover.x;
  const docW = window.innerWidth;
  if (left + maxW / 2 > docW - 12) left = docW - maxW / 2 - 12;
  if (left - maxW / 2 < 12) left = maxW / 2 + 12;

  return (
    <div className="glossary-tooltip"
         style={{ left: left, top: hover.y - 6, transform: "translate(-50%, -100%)" }}>
      <div className="gl-tooltip-term">{hover.term}</div>
      <div className="gl-tooltip-def">{def}</div>
    </div>
  );
}

/* ============ Confetti ============ */
function Confetti({ trigger }) {
  const [particles, setParticles] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const colors = ["#c95636", "#b58430", "#3d6b48", "#2f5d7a", "#7a3a51", "#b5482a", "#f3d6c3"];
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: Date.now() + i,
      x: 50,
      y: 50,
      angle: Math.random() * Math.PI * 2,
      speed: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - .5) * 20,
      shape: Math.random() > .5 ? "rect" : "circle",
      life: 0,
    }));
    setParticles(newParticles);
    let frame = 0;
    let raf;
    const tick = () => {
      frame++;
      setParticles(prev => prev.map(p => {
        const life = p.life + 1;
        return {
          ...p,
          x: p.x + Math.cos(p.angle) * p.speed * 0.4,
          y: p.y + Math.sin(p.angle) * p.speed * 0.4 + life * 0.15,
          rotation: p.rotation + p.rotSpeed,
          life,
        };
      }));
      if (frame < 120) {
        raf = requestAnimationFrame(tick);
      } else {
        setParticles([]);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger]);

  if (particles.length === 0) return null;
  return (
    <div className="confetti-root" ref={ref}>
      {particles.map(p => (
        <div key={p.id}
          className="confetti-piece"
          style={{
            left: p.x + "%",
            top: p.y + "%",
            width: p.size + "px",
            height: p.shape === "rect" ? (p.size * 0.4) + "px" : p.size + "px",
            background: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: Math.max(0, 1 - p.life / 120),
            borderRadius: p.shape === "circle" ? "50%" : "1px",
          }}
        />
      ))}
    </div>
  );
}

/* ============ Mini-calculators ============ */
function CalcPnvFai() {
  const [mode, setMode] = useState("fai2pnv"); // fai2pnv | pnv2fai
  const [val, setVal] = useState("250000");
  const [taux, setTaux] = useState("6.5");

  const v = parseFloat(val) || 0;
  const t = parseFloat(taux) || 0;
  let pnv, fai, com;
  if (mode === "fai2pnv") {
    fai = v;
    pnv = fai / (1 + t / 100);
    com = fai - pnv;
  } else {
    pnv = v;
    fai = pnv * (1 + t / 100);
    com = fai - pnv;
  }
  const fmt = (n) => isFinite(n) ? n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €" : "—";

  return (
    <div className="calc">
      <div className="calc-h">
        <div className="calc-title">Convertir <em>PNV ↔ FAI</em></div>
        <div className="calc-tabs">
          <button className={mode === "fai2pnv" ? "on" : ""} onClick={() => setMode("fai2pnv")}>FAI → PNV</button>
          <button className={mode === "pnv2fai" ? "on" : ""} onClick={() => setMode("pnv2fai")}>PNV → FAI</button>
        </div>
      </div>
      <div className="calc-row">
        <label>{mode === "fai2pnv" ? "Prix FAI (€)" : "Prix Net Vendeur (€)"}
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} step="1000" />
        </label>
        <label>Honoraires (%)
          <input type="number" value={taux} onChange={(e) => setTaux(e.target.value)} step="0.1" />
        </label>
      </div>
      <div className="calc-out">
        <div className="calc-out-cell"><div className="calc-out-k">PNV</div><div className="calc-out-v">{fmt(pnv)}</div></div>
        <div className="calc-out-cell"><div className="calc-out-k">FAI</div><div className="calc-out-v">{fmt(fai)}</div></div>
        <div className="calc-out-cell highlight"><div className="calc-out-k">Honoraires</div><div className="calc-out-v">{fmt(com)}</div></div>
      </div>
      <div className="calc-formula">PNV = FAI ÷ (1 + taux)</div>
    </div>
  );
}

function CalcHtTtc() {
  const [mode, setMode] = useState("ttc2ht");
  const [val, setVal] = useState("1200");
  const [tva, setTva] = useState("20");

  const v = parseFloat(val) || 0;
  const t = parseFloat(tva) || 0;
  let ht, ttc, tvaAmount;
  if (mode === "ttc2ht") {
    ttc = v; ht = ttc / (1 + t / 100); tvaAmount = ttc - ht;
  } else {
    ht = v; ttc = ht * (1 + t / 100); tvaAmount = ttc - ht;
  }
  const fmt = (n) => isFinite(n) ? n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €" : "—";

  return (
    <div className="calc">
      <div className="calc-h">
        <div className="calc-title">Convertir <em>HT ↔ TTC</em></div>
        <div className="calc-tabs">
          <button className={mode === "ttc2ht" ? "on" : ""} onClick={() => setMode("ttc2ht")}>TTC → HT</button>
          <button className={mode === "ht2ttc" ? "on" : ""} onClick={() => setMode("ht2ttc")}>HT → TTC</button>
        </div>
      </div>
      <div className="calc-row">
        <label>{mode === "ttc2ht" ? "Montant TTC (€)" : "Montant HT (€)"}
          <input type="number" value={val} onChange={(e) => setVal(e.target.value)} step="100" />
        </label>
        <label>TVA (%)
          <input type="number" value={tva} onChange={(e) => setTva(e.target.value)} step="0.5" />
        </label>
      </div>
      <div className="calc-out">
        <div className="calc-out-cell"><div className="calc-out-k">HT</div><div className="calc-out-v">{fmt(ht)}</div></div>
        <div className="calc-out-cell"><div className="calc-out-k">TTC</div><div className="calc-out-v">{fmt(ttc)}</div></div>
        <div className="calc-out-cell highlight"><div className="calc-out-k">Dont TVA</div><div className="calc-out-v">{fmt(tvaAmount)}</div></div>
      </div>
      <div className="calc-formula">HT = TTC ÷ (1 + TVA)</div>
    </div>
  );
}

function CalcMensualite() {
  const [capital, setCapital] = useState("200000");
  const [taux, setTaux] = useState("3.6");
  const [duree, setDuree] = useState("20");

  const C = parseFloat(capital) || 0;
  const t = parseFloat(taux) || 0;
  const annees = parseFloat(duree) || 0;
  const n = annees * 12;
  const tm = t / 100 / 12;
  let M = 0, totalPaye = 0, coutCredit = 0;
  if (n > 0 && tm > 0) {
    M = (C * tm) / (1 - Math.pow(1 + tm, -n));
    totalPaye = M * n;
    coutCredit = totalPaye - C;
  } else if (n > 0) {
    M = C / n;
    totalPaye = C;
  }

  const fmt = (n) => isFinite(n) ? n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €" : "—";
  // % of total = interest
  const pctInteret = totalPaye > 0 ? (coutCredit / totalPaye) * 100 : 0;

  return (
    <div className="calc">
      <div className="calc-h">
        <div className="calc-title">Mensualité de <em>prêt immo</em></div>
      </div>
      <div className="calc-row">
        <label>Capital emprunté (€)
          <input type="number" value={capital} onChange={(e) => setCapital(e.target.value)} step="10000" />
        </label>
        <label>Taux annuel (%)
          <input type="number" value={taux} onChange={(e) => setTaux(e.target.value)} step="0.1" />
        </label>
        <label>Durée (années)
          <input type="number" value={duree} onChange={(e) => setDuree(e.target.value)} step="1" min="1" max="40" />
        </label>
      </div>
      <div className="calc-out">
        <div className="calc-out-cell highlight">
          <div className="calc-out-k">Mensualité</div>
          <div className="calc-out-v">{fmt(M)}<span style={{fontSize:12,opacity:.6}}> /mois</span></div>
        </div>
        <div className="calc-out-cell">
          <div className="calc-out-k">Total à payer</div>
          <div className="calc-out-v">{fmt(totalPaye)}</div>
        </div>
        <div className="calc-out-cell">
          <div className="calc-out-k">Coût du crédit</div>
          <div className="calc-out-v">{fmt(coutCredit)}</div>
        </div>
      </div>
      <div className="calc-bar">
        <div className="calc-bar-fill" style={{ width: `${100 - pctInteret}%` }} title="Capital"></div>
        <div className="calc-bar-legend">
          <span><span className="calc-bar-dot capital"></span>Capital {fmt(C)}</span>
          <span><span className="calc-bar-dot interet"></span>Intérêts {fmt(coutCredit)}</span>
        </div>
      </div>
      <div className="calc-formula">M = C × tm ÷ [1 − (1 + tm)^(−n)]</div>
    </div>
  );
}

function CalcTauxEndettement() {
  const [revenus, setRevenus] = useState("4000");
  const [charges, setCharges] = useState("0");
  const [mens, setMens] = useState("1170");

  const r = parseFloat(revenus) || 0;
  const c = parseFloat(charges) || 0;
  const m = parseFloat(mens) || 0;
  const total = c + m;
  const taux = r > 0 ? (total / r) * 100 : 0;
  const max = r * 0.35;
  const margeOK = taux <= 35;

  const fmt = (n) => isFinite(n) ? n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €" : "—";

  return (
    <div className="calc">
      <div className="calc-h">
        <div className="calc-title">Taux d'<em>endettement</em></div>
      </div>
      <div className="calc-row">
        <label>Revenus nets / mois (€)
          <input type="number" value={revenus} onChange={(e) => setRevenus(e.target.value)} step="100" />
        </label>
        <label>Charges actuelles (€)
          <input type="number" value={charges} onChange={(e) => setCharges(e.target.value)} step="50" />
        </label>
        <label>Mensualité visée (€)
          <input type="number" value={mens} onChange={(e) => setMens(e.target.value)} step="50" />
        </label>
      </div>
      <div className="calc-out">
        <div className={`calc-out-cell highlight ${margeOK ? "good" : "bad"}`}>
          <div className="calc-out-k">Taux endettement</div>
          <div className="calc-out-v">{taux.toFixed(1)} %</div>
        </div>
        <div className="calc-out-cell">
          <div className="calc-out-k">Plafond HCSF (35 %)</div>
          <div className="calc-out-v">{fmt(max)}</div>
        </div>
        <div className="calc-out-cell">
          <div className="calc-out-k">{margeOK ? "Marge dispo" : "Dépassement"}</div>
          <div className="calc-out-v">{fmt(Math.abs(max - total))}</div>
        </div>
      </div>
      <div className="calc-gauge">
        <div className="calc-gauge-track">
          <div className="calc-gauge-fill" style={{ width: `${Math.min(taux, 50) * 2}%`, background: margeOK ? "var(--forest)" : "var(--accent)" }}></div>
          <div className="calc-gauge-mark" style={{ left: "70%" }} title="Limite 35 %">35%</div>
        </div>
      </div>
      <div className="calc-formula">Taux = (Charges + Mensualité) ÷ Revenus × 100</div>
    </div>
  );
}

/* ============ Mini-game: SONCAS Matcher ============ */
const SONCAS_PHRASES = [
  { p: "Je veux un investissement sûr pour ma retraite, sans surprise.", m: "S" },
  { p: "Le quartier est-il prestigieux ? J'ai des relations à recevoir.", m: "O" },
  { p: "Y a-t-il la fibre optique et la dernière norme RE2020 ?", m: "N" },
  { p: "Surtout, il me faut un ascenseur et une place de parking.", m: "C" },
  { p: "Quel est le rendement locatif net que je peux espérer ?", m: "A" },
  { p: "On se ressemble beaucoup, je vais réfléchir avec vous.", m: "Y" }, // Sympathie - use Y for second S
  { p: "Le DPE est en classe A ? Je veux limiter mon empreinte carbone.", m: "E" },
  { p: "Si je perds mon emploi, est-ce que je peux revendre vite ?", m: "S" },
  { p: "Cet immeuble haussmannien fait partie d'un patrimoine reconnu.", m: "O" },
  { p: "J'aimerais quelque chose de fraîchement rénové, encore jamais habité.", m: "N" },
  { p: "Il y a une chambre par enfant ? Une terrasse pour les barbecues ?", m: "C" },
  { p: "Quels frais annuels dois-je prévoir ? Charges, taxe, copro ?", m: "A" },
  { p: "Vous me semblez sympathique, je vous fais confiance.", m: "Y" },
  { p: "Quels sont les coûts de chauffage annuels ?", m: "E" },
];
const SONCAS_LETTERS = [
  { id: "S", k: "Sécurité",  c: "#2f5d7a" },
  { id: "O", k: "Orgueil",   c: "#7a3a51" },
  { id: "N", k: "Nouveauté", c: "#3d6b48" },
  { id: "C", k: "Confort",   c: "#b58430" },
  { id: "A", k: "Argent",    c: "#5a523c" },
  { id: "Y", k: "Sympathie", c: "#c95636" }, // labelled S but using Y as key (second S)
  { id: "E", k: "Écologie",  c: "#3d6b48" },
];

function SoncasGame({ onClose, onComplete }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [questions] = useState(() => {
    const arr = [...SONCAS_PHRASES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 8);
  });
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

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const medal = pct === 100 ? "🥇" : pct >= 75 ? "🥈" : pct >= 50 ? "🥉" : "💪";
    return (
      <div className="overlay tools-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="game-shell">
          <button className="overlay-close" onClick={onClose}>×</button>
          <div className="game-result">
            <div style={{ fontSize: 80, lineHeight: 1 }}>{medal}</div>
            <div className="game-result-score"><em>{score}</em> / {questions.length}</div>
            <div className="game-result-msg">
              {pct === 100 ? "Sans-faute, tu es prêt pour le R1 !" :
               pct >= 75 ? "Très solide. Affine sur 1-2 mobiles." :
                            "À retravailler — relis le module 1."}
            </div>
            <div className="game-result-time">⌛ {time}s</div>
            <div className="game-result-actions">
              <button className="action-pill accent" onClick={() => { setRound(0); setScore(0); setPicked(null); setTime(0); setDone(false); }}>↻ Rejouer</button>
              <button className="action-pill outline" onClick={onClose}>Fermer</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[round];
  const pick = (letterId) => {
    if (picked !== null) return;
    setPicked(letterId);
    if (letterId === q.m) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= questions.length) {
        setDone(true);
        onComplete && onComplete({ score: score + (letterId === q.m ? 1 : 0), total: questions.length });
      } else {
        setRound(r => r + 1);
        setPicked(null);
      }
    }, 1300);
  };

  return (
    <div className="overlay tools-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="game-shell">
        <button className="overlay-close" onClick={onClose}>×</button>
        <div className="game-head">
          <div>
            <div className="game-eyebrow">SONCAS Matcher · Module 1</div>
            <div className="game-title">À quel <em>mobile</em> correspond cette phrase ?</div>
          </div>
          <div className="game-stats">
            <div><strong>{round + 1}</strong>/{questions.length}</div>
            <div className="game-stats-time">⌛ {time}s · {score} ✓</div>
          </div>
        </div>
        <div className="game-phrase">« {q.p} »</div>
        <div className="game-options">
          {SONCAS_LETTERS.map(l => {
            let cls = "game-opt";
            if (picked !== null) {
              if (l.id === q.m) cls += " right";
              else if (l.id === picked) cls += " wrong";
            }
            return (
              <button key={l.id} className={cls} disabled={picked !== null}
                onClick={() => pick(l.id)}
                style={{ "--mc": l.c }}>
                <div className="game-opt-letter">{l.id === "Y" ? "S" : l.id}</div>
                <div className="game-opt-k">{l.k}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============ Tools Overlay (calculators + memos hub) ============ */
function ToolsOverlay({ onClose }) {
  const [tab, setTab] = useState("calc");
  const [selectedMod, setSelectedMod] = useState((window.MEMOS && window.MEMOS[0]?.mod) || "m1");

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const memos = window.MEMOS || [];
  const currentMemo = memos.find(m => m.mod === selectedMod);

  return (
    <div className="overlay tools-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tools-shell">
        <button className="overlay-close" onClick={onClose}>×</button>
        <div className="tools-head">
          <div>
            <div className="game-eyebrow">Outils & Mémos</div>
            <div className="game-title">Calcule, mémorise, <em>maîtrise</em>.</div>
          </div>
          <div className="tools-tabs">
            <button className={tab === "calc" ? "on" : ""} onClick={() => setTab("calc")}>🧮 Calculatrices</button>
            <button className={tab === "memos" ? "on" : ""} onClick={() => setTab("memos")}>📋 Mémos & formules</button>
          </div>
        </div>

        {tab === "calc" && (
          <div className="tools-body">
            <div className="tools-grid">
              <CalcPnvFai />
              <CalcHtTtc />
              <CalcMensualite />
              <CalcTauxEndettement />
            </div>
          </div>
        )}

        {tab === "memos" && (
          <div className="tools-body memos-body">
            <div className="memos-nav">
              {memos.map(m => (
                <button
                  key={m.mod}
                  className={`memos-nav-item ${selectedMod === m.mod ? "active" : ""}`}
                  onClick={() => setSelectedMod(m.mod)}
                  style={{ "--mc": m.color }}>
                  <span className="memos-nav-dot"></span>
                  <span className="memos-nav-t">{m.title}</span>
                </button>
              ))}
            </div>
            <div className="memos-content">
              {currentMemo && (
                <div className="memos-cards" style={{ "--mc": currentMemo.color }}>
                  <div className="memos-section-title">
                    <span className="memos-section-stripe"></span>
                    {currentMemo.title}
                  </div>
                  <div className="memos-grid">
                    {currentMemo.cards.map((card, i) => (
                      <div key={i} className={`memo-card memo-card-${card.type}`}>
                        <div className="memo-card-h">{card.h}</div>
                        <ul className="memo-card-list">
                          {card.items.map((it, j) => (
                            <li key={j}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { GlossaryTooltip, Confetti, ToolsOverlay, CalcPnvFai, CalcHtTtc, CalcMensualite, CalcTauxEndettement, SoncasGame });
