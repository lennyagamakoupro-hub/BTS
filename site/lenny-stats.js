/* ============================================
   LENNY — Engrenage « Paramètres » → panneau « Mon évolution »
   Radar de Kiviat (Recharts) : période actuelle vs précédente,
   progression par matière, matières à revoir.
   Dépend de : LennyAPI, React/ReactDOM/Recharts (chargés à la demande)
   ============================================ */
window.LennyStats = (function () {
  let period = 14;
  let loaded = false;     // libs chargées ?
  let reactRoot = null;
  let lastData = null;

  /* ---- chargement paresseux des libs ---- */
  function loadScript(src) {
    return new Promise((res, rej) => {
      if (document.querySelector('script[src="' + src + '"]')) return res();
      const s = document.createElement("script");
      s.src = src; s.crossOrigin = "anonymous";
      s.onload = res; s.onerror = () => rej(new Error("load " + src));
      document.head.appendChild(s);
    });
  }
  async function ensureLibs() {
    if (loaded) return;
    await loadScript("https://unpkg.com/react@18.3.1/umd/react.production.min.js");
    await loadScript("https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js");
    // Recharts UMD a besoin de ces deux globaux avant d'être évalué
    await loadScript("https://unpkg.com/prop-types@15.8.1/prop-types.min.js");
    await loadScript("https://unpkg.com/react-is@18.3.1/umd/react-is.production.min.js");
    await loadScript("https://cdn.jsdelivr.net/npm/recharts@2.12.7/umd/Recharts.min.js");
    loaded = !!window.Recharts;
    if (!loaded) throw new Error("Recharts indisponible");
  }

  /* ---- DOM de l'overlay ---- */
  function ensureOverlay() {
    let el = document.getElementById("lstats");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lstats";
    el.className = "lstats";
    el.innerHTML = `
      <div class="lstats-scrim" data-close></div>
      <div class="lstats-panel" role="dialog" aria-label="Mon évolution">
        <div class="lstats-head">
          <div>
            <div class="lstats-eyebrow">Paramètres · Progression</div>
            <div class="lstats-title">Mon évolution</div>
          </div>
          <button class="lstats-close" data-close aria-label="Fermer">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
          </button>
        </div>

        <div class="lstats-tabs" id="lstats-tabs" hidden>
          <button class="lstats-tab active" data-view="evo">Mon évolution</button>
          <button class="lstats-tab" data-view="fb">Avis reçus</button>
        </div>

        <div class="lstats-body" id="lstats-view-evo">
          <div class="lstats-periods" id="lstats-periods">
            <button class="lstats-period" data-p="7">7 jours</button>
            <button class="lstats-period" data-p="14">14 jours</button>
            <button class="lstats-period" data-p="30">30 jours</button>
          </div>
          <div class="lstats-card">
            <div class="lstats-chart" id="lstats-chart"></div>
            <div class="lstats-legend">
              <span><i class="lstats-swatch cur"></i> Aujourd'hui</span>
              <span><i class="lstats-swatch prev"></i> Il y a ${period === 7 ? "1 semaine" : period === 30 ? "1 mois" : "2 semaines"}</span>
            </div>
          </div>

          <div class="lstats-section-h">Progression par matière</div>
          <div class="lstats-prog" id="lstats-prog"></div>

          <div class="lstats-section-h">Matières à revoir en priorité</div>
          <div class="lstats-revoir" id="lstats-revoir"></div>
        </div>

        <div class="lstats-body" id="lstats-view-fb" hidden>
          <div class="lfa-intro" id="lfa-intro"></div>
          <div class="lfa-list" id="lfa-list"></div>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", close));
    el.querySelectorAll(".lstats-period").forEach(b => b.addEventListener("click", () => {
      period = parseInt(b.dataset.p, 10);
      syncPeriodUI();
      refresh();
    }));
    el.querySelectorAll(".lstats-tab").forEach(b => b.addEventListener("click", () => switchView(b.dataset.view)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.classList.contains("open")) close();
    });
    return el;
  }

  function syncPeriodUI() {
    document.querySelectorAll(".lstats-period").forEach(b =>
      b.classList.toggle("active", parseInt(b.dataset.p, 10) === period));
    const prevLabel = period === 7 ? "1 semaine" : period === 30 ? "1 mois" : "2 semaines";
    const leg = document.querySelector(".lstats-legend span:last-child");
    if (leg) leg.innerHTML = `<i class="lstats-swatch prev"></i> Il y a ${prevLabel}`;
  }

  let view = "evo";
  function switchView(v) {
    view = v;
    document.querySelectorAll(".lstats-tab").forEach(b => b.classList.toggle("active", b.dataset.view === v));
    const evo = document.getElementById("lstats-view-evo");
    const fb = document.getElementById("lstats-view-fb");
    const title = document.querySelector(".lstats-title");
    const eyebrow = document.querySelector(".lstats-eyebrow");
    if (evo) evo.hidden = v !== "evo";
    if (fb) fb.hidden = v !== "fb";
    if (v === "fb") {
      if (title) title.textContent = "Avis reçus";
      if (eyebrow) eyebrow.textContent = "Paramètres · Formateur";
      renderFeedbackAdmin();
    } else {
      if (title) title.textContent = "Mon évolution";
      if (eyebrow) eyebrow.textContent = "Paramètres · Progression";
    }
  }

  /* ---- tableau de bord formateur : avis nominatifs ---- */
  async function renderFeedbackAdmin() {
    const intro = document.getElementById("lfa-intro");
    const list = document.getElementById("lfa-list");
    list.innerHTML = '<div class="lstats-empty" style="height:160px">Chargement des avis…</div>';
    const data = await LennyAPI.getFeedbackAdmin();
    const rows = (data.rows || []).filter(r => r.total > 0);

    const totalUp = rows.reduce((n, r) => n + r.up, 0);
    const totalDown = rows.reduce((n, r) => n + r.down, 0);
    const voters = new Set();
    rows.forEach(r => r.voters.forEach(v => voters.add(v.name)));
    intro.innerHTML = `
      <div class="lfa-kpis">
        <div class="lfa-kpi"><div class="lfa-kpi-n">${rows.length}</div><div class="lfa-kpi-l">contenus notés</div></div>
        <div class="lfa-kpi"><div class="lfa-kpi-n up">${totalUp}</div><div class="lfa-kpi-l">👍 reçus</div></div>
        <div class="lfa-kpi"><div class="lfa-kpi-n down">${totalDown}</div><div class="lfa-kpi-l">👎 reçus</div></div>
        <div class="lfa-kpi"><div class="lfa-kpi-n">${voters.size}</div><div class="lfa-kpi-l">élèves actifs</div></div>
      </div>`;

    if (!rows.length) {
      list.innerHTML = '<div class="lstats-empty" style="height:140px">Aucun avis pour le moment.</div>';
      return;
    }
    // les contenus les moins bien notés d'abord
    rows.sort((a, b) => (a.satisfaction ?? 101) - (b.satisfaction ?? 101) || b.total - a.total);

    list.innerHTML = rows.map((r, i) => {
      const sat = r.satisfaction;
      const satCls = sat == null ? "" : sat >= 70 ? "good" : sat >= 40 ? "mid" : "bad";
      const chips = r.voters.map(v =>
        `<span class="lfa-voter ${v.vote}">${v.vote === "up" ? "👍" : "👎"} ${esc(v.name)}</span>`).join("");
      return `
        <details class="lfa-row" ${i === 0 ? "open" : ""}>
          <summary class="lfa-sum">
            <span class="lfa-type lfa-type-${r.type}">${r.type === "quiz" ? "Quiz" : "Cours"}</span>
            <span class="lfa-name">${esc(r.label)}</span>
            <span class="lfa-counts"><span class="up">👍 ${r.up}</span><span class="down">👎 ${r.down}</span></span>
            <span class="lfa-sat ${satCls}">${sat == null ? "—" : sat + "%"}</span>
            <span class="lfa-chev"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 4.5L6 7.5l3-3"/></svg></span>
          </summary>
          <div class="lfa-voters">${chips}</div>
        </details>`;
    }).join("");
  }

  /* ---- rendu Recharts ---- */
  function renderChart(data) {
    const host = document.getElementById("lstats-chart");
    if (!window.Recharts || !window.React || !window.ReactDOM) {
      host.innerHTML = '<div class="lstats-empty">Graphique indisponible (libs non chargées).</div>';
      return;
    }
    const R = window.Recharts, h = window.React.createElement;
    const chartData = data.current.map((c, i) => ({
      subject: c.subject,
      current: c.score,
      previous: data.previous[i] ? data.previous[i].score : 0,
      curEval: c.evaluated,
      prevEval: data.previous[i] ? data.previous[i].evaluated : false,
    }));

    const anyData = chartData.some(d => d.curEval || d.prevEval);
    if (!anyData) {
      host.innerHTML = '<div class="lstats-empty">Pas encore de résultats sur cette période.<br>Lancez un quiz pour alimenter votre radar.</div>';
      return;
    }

    const tooltip = h(R.Tooltip, {
      contentStyle: { background: "#1c1c1c", border: "1px solid rgba(255,255,255,.14)", borderRadius: 10, color: "#fff", fontSize: 12 },
      formatter: (val, name, p) => {
        const evaluated = name === "Aujourd'hui" ? p.payload.curEval : p.payload.prevEval;
        return [evaluated ? val + " %" : "Pas encore évalué", name];
      },
    });

    const el = h(R.ResponsiveContainer, { width: "100%", height: "100%" },
      h(R.RadarChart, { data: chartData, outerRadius: "72%", margin: { top: 10, right: 30, bottom: 10, left: 30 } },
        h(R.PolarGrid, { stroke: "rgba(255,255,255,.14)" }),
        h(R.PolarAngleAxis, { dataKey: "subject", tick: { fill: "rgba(255,255,255,.78)", fontSize: 11.5, fontFamily: "Inter, sans-serif" } }),
        h(R.PolarRadiusAxis, { angle: 90, domain: [0, 100], tick: { fill: "rgba(255,255,255,.34)", fontSize: 10 }, tickCount: 5, stroke: "rgba(255,255,255,.1)" }),
        h(R.Radar, { name: "Il y a 2 semaines", dataKey: "previous", stroke: "rgba(220,220,220,.85)", strokeDasharray: "5 4", strokeWidth: 1.6, fill: "rgba(220,220,220,.30)", fillOpacity: 0.3, isAnimationActive: true }),
        h(R.Radar, { name: "Aujourd'hui", dataKey: "current", stroke: "#e50914", strokeWidth: 2, fill: "#e50914", fillOpacity: 0.45, isAnimationActive: true }),
        tooltip
      )
    );

    if (!reactRoot) reactRoot = window.ReactDOM.createRoot(host);
    reactRoot.render(el);
  }

  /* ---- encart progression ---- */
  function renderProgression(data) {
    const wrap = document.getElementById("lstats-prog");
    const rows = data.current.map((c, i) => {
      const prev = data.previous[i] || { score: 0, evaluated: false };
      return { subject: c.subject, id: c.id, cur: c.score, curEval: c.evaluated,
               prev: prev.score, prevEval: prev.evaluated,
               delta: c.score - prev.score };
    });
    // tri : meilleure progression → pire ; les « Nouveau » à la fin
    rows.sort((a, b) => {
      const an = !a.prevEval, bn = !b.prevEval;
      if (an !== bn) return an ? 1 : -1;
      return b.delta - a.delta;
    });
    wrap.innerHTML = rows.map(r => {
      let deltaHtml;
      if (!r.prevEval && r.curEval) {
        deltaHtml = `<span class="lstats-delta new">Nouveau ✦</span>`;
      } else if (!r.curEval && !r.prevEval) {
        deltaHtml = `<span class="lstats-delta flat">—</span>`;
      } else {
        const d = r.delta;
        const cls = d > 0 ? "up" : d < 0 ? "down" : "flat";
        const emoji = d > 0 ? "📈" : d < 0 ? "📉" : "➖";
        deltaHtml = `<span class="lstats-delta ${cls}">${d > 0 ? "+" : ""}${d}% ${emoji}</span>`;
      }
      const sub = r.curEval ? `${r.cur}% aujourd'hui` : "Pas encore évalué";
      return `<div class="lstats-prog-row">
        <div><div class="lstats-prog-name">${esc(r.subject)}</div><div class="lstats-prog-sub">${sub}</div></div>
        ${deltaHtml}
      </div>`;
    }).join("");
  }

  /* ---- encart à revoir ---- */
  function renderRevoir(data) {
    const wrap = document.getElementById("lstats-revoir");
    const evaluated = data.current.filter(c => c.evaluated);
    const pool = (evaluated.length ? evaluated : data.current).slice();
    pool.sort((a, b) => a.score - b.score);
    const worst = pool.slice(0, 3);
    if (!worst.length) { wrap.innerHTML = ""; return; }
    wrap.innerHTML = worst.map((c, i) => `
      <button class="lstats-revoir-row" data-go="${c.id}">
        <span class="lstats-revoir-rank">${i + 1}</span>
        <span class="lstats-revoir-name">${esc(c.subject)}</span>
        ${c.evaluated ? `<span class="lstats-revoir-score">${c.score}%</span>` : `<span class="lstats-badge-ne">Pas encore évalué</span>`}
        <span class="lstats-revoir-go"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l5 5-5 5"/></svg></span>
      </button>`).join("");
    wrap.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.go;
      close();
      setTimeout(() => {
        if (window.LennyDetail && window.LennyDetail.open) window.LennyDetail.open(id);
        else location.hash = "#" + id;
      }, 240);
    }));
  }

  async function refresh() {
    const data = await LennyAPI.getRadar(period);
    lastData = data;
    renderChart(data);
    renderProgression(data);
    renderRevoir(data);
  }

  async function open() {
    const el = ensureOverlay();
    syncPeriodUI();
    // Onglet « Avis reçus » réservé au formateur (code admin)
    const admin = window.LennyAPI && LennyAPI.isAdmin && LennyAPI.isAdmin();
    const tabs = document.getElementById("lstats-tabs");
    if (tabs) tabs.hidden = !admin;
    if (!admin && view === "fb") switchView("evo");
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    if (view === "fb") { renderFeedbackAdmin(); return; }
    const host = document.getElementById("lstats-chart");
    host.innerHTML = '<div class="lstats-empty">Chargement du graphique…</div>';
    try { await ensureLibs(); } catch (e) {
      host.innerHTML = '<div class="lstats-empty">Impossible de charger le graphique (hors-ligne ?).</div>';
    }
    refresh();
  }

  function close() {
    const el = document.getElementById("lstats");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---- bouton engrenage dans la nav ---- */
  function injectGear() {
    const right = document.querySelector(".nav .nav-right");
    if (!right || document.getElementById("nav-gear")) return;
    const btn = document.createElement("button");
    btn.id = "nav-gear";
    btn.className = "nav-gear";
    btn.title = "Paramètres · Mon évolution";
    btn.setAttribute("aria-label", "Paramètres et progression");
    btn.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="10" cy="10" r="2.6"/><path d="M10 1.5v2.2M10 16.3v2.2M3.5 3.5l1.6 1.6M14.9 14.9l1.6 1.6M1.5 10h2.2M16.3 10h2.2M3.5 16.5l1.6-1.6M14.9 5.1l1.6-1.6" stroke-linecap="round"/></svg>';
    btn.addEventListener("click", open);
    const avatar = right.querySelector(".avatar");
    if (avatar) right.insertBefore(btn, avatar); else right.appendChild(btn);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectGear);
  else injectGear();

  return { open, close };
})();
