/* ============================================
   LENNY — Gamification (XP · niveaux · streak · badges)
   • Enveloppe LennyAPI.recordQuizResult → attribue de l'XP à chaque
     session de quiz / examen / révision terminée.
   • Streak quotidien, niveaux, badges à débloquer + toasts.
   • HUD compact dans la nav (flamme + niveau) → ouvre un panneau.
   Persistance locale par utilisateur (code d'accès).
   ============================================ */
(function () {
  "use strict";

  const DAY = 86400000;
  const XP_PER_CORRECT = 10;
  const XP_SESSION_BONUS = 15;
  const XP_PERFECT_BONUS = 40;
  const XP_DAILY_LOGIN = 20;

  /* ---------- stockage ---------- */
  function uid() { try { return (window.LennyAPI && LennyAPI.userId()) || "u_anon"; } catch (e) { return "u_anon"; } }
  const KEY = () => "lenny-xp-v1::" + uid();
  function fresh() { return { xp: 0, correct: 0, answered: 0, sessions: 0, perfect: 0, exams: 0, streak: 0, best: 0, last: 0, days: [], badges: [] }; }
  function load() { try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY())) || {}); } catch (e) { return fresh(); } }
  function save(s) { try { localStorage.setItem(KEY(), JSON.stringify(s)); } catch (e) {} }
  function dayKey(t) { const d = new Date(t); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }

  /* ---------- niveaux ---------- */
  // XP cumulée requise pour atteindre le niveau L : 120 * L*(L-1)/2 (triangulaire)
  function xpForLevel(L) { return 120 * (L * (L - 1) / 2); }
  function levelInfo(xp) {
    let L = 1;
    while (xp >= xpForLevel(L + 1)) L++;
    const cur = xpForLevel(L), next = xpForLevel(L + 1);
    return { level: L, into: xp - cur, span: next - cur, pct: Math.min(100, Math.round((xp - cur) / (next - cur) * 100)), toNext: next - xp };
  }
  const RANKS = ["Stagiaire", "Négociateur junior", "Négociateur", "Conseiller", "Conseiller confirmé", "Expert", "Mandataire", "Directeur d'agence", "Référent BTS", "Maître des clés"];
  function rankFor(L) { return RANKS[Math.min(RANKS.length - 1, L - 1)]; }

  /* ---------- badges ---------- */
  const BADGES = [
    { id: "first", icon: "✦", name: "Première session", desc: "Terminer une première session notée.", check: s => s.sessions >= 1 },
    { id: "perfect", icon: "★", name: "Sans-faute", desc: "Un 100 % sur une session complète.", check: s => s.perfect >= 1 },
    { id: "streak3", icon: "▲", name: "Régulier", desc: "3 jours d'affilée.", check: s => s.best >= 3 },
    { id: "streak7", icon: "♦", name: "Assidu", desc: "7 jours d'affilée.", check: s => s.best >= 7 },
    { id: "streak30", icon: "◆", name: "Inarrêtable", desc: "30 jours d'affilée.", check: s => s.best >= 30 },
    { id: "exam1", icon: "▣", name: "Première copie", desc: "Passer un examen blanc.", check: s => s.exams >= 1 },
    { id: "c100", icon: "❖", name: "Centurion", desc: "100 bonnes réponses cumulées.", check: s => s.correct >= 100 },
    { id: "c500", icon: "✺", name: "Vétéran", desc: "500 bonnes réponses cumulées.", check: s => s.correct >= 500 },
    { id: "lvl5", icon: "⬠", name: "Confirmé", desc: "Atteindre le niveau 5.", check: s => levelInfo(s.xp).level >= 5 },
    { id: "lvl10", icon: "⬡", name: "Maître des clés", desc: "Atteindre le niveau 10.", check: s => levelInfo(s.xp).level >= 10 },
  ];

  /* ---------- attribution ---------- */
  function touchStreak(s) {
    const today = dayKey(Date.now());
    if (s.days.includes(today)) return false; // déjà actif aujourd'hui
    // calcul de la continuité
    const yest = dayKey(Date.now() - DAY);
    if (s.days.includes(yest) || s.streak === 0) s.streak = (s.days.includes(yest) ? s.streak : 0) + 1;
    else s.streak = 1;
    s.best = Math.max(s.best, s.streak);
    s.days.push(today);
    if (s.days.length > 400) s.days = s.days.slice(-400);
    s.last = Date.now();
    s.xp += XP_DAILY_LOGIN; // bonus de présence quotidienne
    return true;
  }

  function checkBadges(s) {
    const newly = [];
    BADGES.forEach(b => { if (!s.badges.includes(b.id) && b.check(s)) { s.badges.push(b.id); newly.push(b); } });
    return newly;
  }

  // appelé à chaque session terminée
  function awardSession(res) {
    const s = load();
    const correct = res.correct | 0, total = Math.max(0, res.total | 0);
    let gained = correct * XP_PER_CORRECT + XP_SESSION_BONUS;
    if (total > 0 && correct === total) { gained += XP_PERFECT_BONUS; s.perfect++; }
    s.xp += gained; s.correct += correct; s.answered += total; s.sessions++;
    if (res.exam) s.exams++;
    const beforeLvl = levelInfo(s.xp - gained).level;
    touchStreak(s);
    const afterLvl = levelInfo(s.xp).level;
    const newBadges = checkBadges(s);
    save(s);
    if (afterLvl > beforeLvl) toast("level", afterLvl);
    newBadges.forEach(b => toast("badge", b));
    if (gained) toast("xp", gained);
    refreshHud();
    return s;
  }

  // bonus de présence à l'ouverture (sans session)
  function dailyTouch() {
    const s = load();
    if (touchStreak(s)) {
      const nb = checkBadges(s);
      save(s);
      nb.forEach(b => toast("badge", b));
      refreshHud();
    }
  }

  /* ---------- toasts ---------- */
  function toastLayer() {
    let l = document.getElementById("xp-toasts");
    if (!l) { l = document.createElement("div"); l.id = "xp-toasts"; document.body.appendChild(l); }
    return l;
  }
  function toast(kind, data) {
    const l = toastLayer();
    const t = document.createElement("div");
    t.className = "xp-toast xp-toast-" + kind;
    if (kind === "xp") t.innerHTML = `<span class="xp-toast-ic">＋</span><span><b>+${data} XP</b></span>`;
    else if (kind === "level") t.innerHTML = `<span class="xp-toast-ic">⬆</span><span>Niveau <b>${data}</b> · ${rankFor(data)}</span>`;
    else if (kind === "badge") t.innerHTML = `<span class="xp-toast-ic">${data.icon}</span><span>Badge débloqué<br><b>${data.name}</b></span>`;
    l.appendChild(t);
    requestAnimationFrame(() => t.classList.add("in"));
    setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 400); }, kind === "xp" ? 1800 : 3200);
  }

  /* ---------- HUD (nav) ---------- */
  function ensureHud() {
    let hud = document.getElementById("xp-hud");
    if (hud) return hud;
    const navRight = document.querySelector(".nav-right");
    if (!navRight) return null;
    hud = document.createElement("button");
    hud.id = "xp-hud"; hud.type = "button"; hud.className = "xp-hud"; hud.title = "Progression";
    const avatar = navRight.querySelector(".avatar");
    if (avatar) navRight.insertBefore(hud, avatar); else navRight.appendChild(hud);
    hud.addEventListener("click", (e) => { e.stopPropagation(); openPanel(); });
    return hud;
  }
  function refreshHud() {
    const hud = ensureHud();
    if (!hud) return;
    const s = load();
    const li = levelInfo(s.xp);
    const C = 2 * Math.PI * 13;
    hud.innerHTML = `
      ${s.streak > 0 ? `<span class="xp-hud-streak"><svg viewBox="0 0 12 14" fill="currentColor"><path d="M6 0c1.6 2.4.6 3.8 0 4.8C5.2 6 4 6.8 4 8.4 4 10 5 11 6 11s2-1 2-2.6c0-.7-.2-1.2-.5-1.7C8.8 7.4 10 8.6 10 10.2 10 12.3 8.2 14 6 14s-4-1.7-4-3.8C2 6.7 5.4 5.6 6 0Z"/></svg>${s.streak}</span>` : ""}
      <span class="xp-hud-ring">
        <svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="3"/><circle cx="15" cy="15" r="13" fill="none" stroke="#f6c451" stroke-width="3" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - li.pct / 100)).toFixed(1)}" transform="rotate(-90 15 15)"/></svg>
        <span class="xp-hud-lvl">${li.level}</span>
      </span>`;
  }

  /* ---------- panneau ---------- */
  function ensurePanel() {
    let el = document.getElementById("lenny-xp");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-xp";
    el.innerHTML = '<div class="xp-backdrop" data-xp-close></div><div class="xp-shell" id="xp-shell" role="dialog" aria-modal="true" aria-label="Progression"></div>';
    document.body.appendChild(el);
    el.addEventListener("click", (e) => { if (e.target.closest("[data-xp-close]")) closePanel(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && el.classList.contains("open")) closePanel(); });
    return el;
  }
  function openPanel() {
    const el = ensurePanel();
    renderPanel();
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function closePanel() {
    const el = document.getElementById("lenny-xp");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }
  function renderPanel() {
    const s = load();
    const li = levelInfo(s.xp);
    const acc = s.answered ? Math.round(s.correct / s.answered * 100) : 0;
    // streak des 14 derniers jours
    const cells = [];
    for (let i = 13; i >= 0; i--) {
      const k = dayKey(Date.now() - i * DAY);
      const on = s.days.includes(k);
      const d = new Date(Date.now() - i * DAY);
      cells.push(`<span class="xp-day${on ? " on" : ""}" title="${d.toLocaleDateString("fr-FR")}">${d.getDate()}</span>`);
    }
    const badges = BADGES.map(b => {
      const has = s.badges.includes(b.id);
      return `<div class="xp-badge${has ? " has" : ""}" title="${b.desc}">
        <span class="xp-badge-ic">${b.icon}</span>
        <span class="xp-badge-name">${b.name}</span>
        <span class="xp-badge-desc">${b.desc}</span>
      </div>`;
    }).join("");
    ensurePanel().querySelector("#xp-shell").innerHTML = `
      <button class="xp-close" data-xp-close aria-label="Fermer">✕</button>
      <div class="xp-hero">
        <div class="xp-hero-badge">
          <svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="31" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="6"/><circle cx="36" cy="36" r="31" fill="none" stroke="#f6c451" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(2 * Math.PI * 31).toFixed(1)}" stroke-dashoffset="${(2 * Math.PI * 31 * (1 - li.pct / 100)).toFixed(1)}" transform="rotate(-90 36 36)"/></svg>
          <span class="xp-hero-lvl">${li.level}</span>
        </div>
        <div class="xp-hero-meta">
          <div class="xp-hero-rank">${rankFor(li.level)}</div>
          <div class="xp-hero-xp">${s.xp.toLocaleString("fr-FR")} XP · encore ${li.toNext.toLocaleString("fr-FR")} pour le niveau ${li.level + 1}</div>
          <div class="xp-hero-bar"><i style="width:${li.pct}%"></i></div>
        </div>
      </div>
      <div class="xp-stats">
        <div class="xp-stat"><span class="xp-stat-n">${s.streak}</span><span class="xp-stat-l">jours d'affilée</span></div>
        <div class="xp-stat"><span class="xp-stat-n">${s.correct}</span><span class="xp-stat-l">bonnes réponses</span></div>
        <div class="xp-stat"><span class="xp-stat-n">${acc}%</span><span class="xp-stat-l">précision</span></div>
        <div class="xp-stat"><span class="xp-stat-n">${s.badges.length}/${BADGES.length}</span><span class="xp-stat-l">badges</span></div>
      </div>
      <div class="xp-sec">
        <div class="xp-sec-h">Assiduité · 14 jours <span class="xp-sec-side">Record : ${s.best} j</span></div>
        <div class="xp-days">${cells.join("")}</div>
      </div>
      <div class="xp-sec">
        <div class="xp-sec-h">Badges</div>
        <div class="xp-badges">${badges}</div>
      </div>`;
  }

  /* ---------- intégration ---------- */
  function wrapApi() {
    if (!window.LennyAPI || window.LennyAPI.__xpWrapped) return;
    const orig = window.LennyAPI.recordQuizResult;
    if (typeof orig !== "function") return;
    window.LennyAPI.recordQuizResult = function (res) {
      try { awardSession(res || {}); } catch (e) {}
      return orig.apply(this, arguments);
    };
    window.LennyAPI.__xpWrapped = true;
  }

  function init() {
    wrapApi();
    ensureHud();
    refreshHud();
    dailyTouch();
    // ré-attache le HUD si la nav est reconstruite après connexion
    document.addEventListener("lenny-auth", () => { setTimeout(() => { refreshHud(); }, 80); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 120));
  else setTimeout(init, 120);

  window.LennyXP = {
    open: openPanel, close: closePanel,
    award: (correct, total, opts) => awardSession(Object.assign({ correct, total }, opts || {})),
    refresh: refreshHud,
    state: load,
  };
})();
