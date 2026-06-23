/* ============================================
   LENNY — Révisions du jour (répétition espacée, SM-2 simplifié)
   • Chaque question a une carte : juste → revient dans 1·3·7·21·45 j ;
     faux → revient demain (et redémarre l'échelle).
   • L'écran "Révisions du jour" sert automatiquement les questions dues,
     tous modules confondus, avec un quota de nouveautés/jour.
   • Persistance locale par utilisateur (code d'accès) via localStorage.
   Dépend de : LENNY_MODULES/MODULES, window.QUIZ/STUDY, LennyAPI (optionnel)
   ============================================ */
(function () {
  const DAY = 86400000;
  const STEPS = [1, 3, 7, 21, 45];   // échelle d'intervalles (jours)
  const NEW_PER_DAY = 12;            // nouvelles questions max introduites / jour
  const SESSION_MAX = 24;            // taille max d'une session
  const DAILY_GOAL = 20;             // objectif visuel de l'anneau

  /* ---------- identité + stockage ---------- */
  function uid() { try { return (window.LennyAPI && LennyAPI.userId()) || "u_anon"; } catch (e) { return "u_anon"; } }
  const KEY = () => "lenny-srs-v1::" + uid();
  function load() { try { return JSON.parse(localStorage.getItem(KEY())) || { cards: {}, intro: {}, done: {} }; } catch (e) { return { cards: {}, intro: {}, done: {} }; } }
  function save(s) { try { localStorage.setItem(KEY(), JSON.stringify(s)); } catch (e) {} }

  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
  function qid(modId, q) { return modId + "#" + hash(q); }
  function todayKey() { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }

  function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function shuffleOptions(q) {
    const order = shuffle(q.c.map((_, i) => i));
    return Object.assign({}, q, { c: order.map(i => q.c[i]), r: order.indexOf(q.r) });
  }

  /* ---------- pool + construction de session ---------- */
  function mods() { return (typeof LENNY_MODULES !== "undefined" && LENNY_MODULES.length) ? LENNY_MODULES : (window.MODULES || []); }
  function buildPool() {
    const pool = [];
    mods().forEach(m => {
      const qs = (window.QUIZ && window.QUIZ[m.id]) || (window.STUDY && window.STUDY[m.id] && window.STUDY[m.id].quiz) || [];
      qs.forEach(q => {
        if (q && Array.isArray(q.c) && typeof q.r === "number") {
          pool.push({ id: qid(m.id, q.q), q: q.q, c: q.c, r: q.r, e: q.e || "", mod: m });
        }
      });
    });
    return pool;
  }

  function buildSession() {
    const s = load(); const pool = buildPool(); const now = Date.now();
    const due = [], fresh = [];
    pool.forEach(p => {
      const c = s.cards[p.id];
      if (!c) fresh.push(p);
      else if (c.due <= now) due.push({ p, c });
    });
    due.sort((a, b) => a.c.due - b.c.due);            // les plus en retard d'abord
    const introCount = (s.intro && s.intro[todayKey()]) || 0;
    const newAllowed = Math.max(0, NEW_PER_DAY - introCount);
    let session = due.map(d => d.p);
    const room = Math.max(0, SESSION_MAX - session.length);
    const freshPick = shuffle(fresh).slice(0, Math.min(newAllowed, room));
    session = session.concat(freshPick).slice(0, SESSION_MAX);
    return {
      session: shuffle(session).map(shuffleOptions),
      dueTotal: due.length,
      freshIds: freshPick.map(f => f.id),
      poolSize: pool.length,
      learned: Object.keys(s.cards).length,
    };
  }

  function dueCount() { return buildSession().session.length; }

  /* ---------- planification (cœur SM-2 simplifié) ---------- */
  function schedule(card, correct) {
    const c = card || { step: -1, ivl: 0, due: 0, streak: 0, lapses: 0, seen: 0 };
    if (correct) {
      c.step = Math.min((c.step | 0) + 1, STEPS.length - 1);
      c.streak = (c.streak | 0) + 1;
      c.ivl = STEPS[c.step];
    } else {
      c.step = 0; c.ivl = 1; c.streak = 0; c.lapses = (c.lapses | 0) + 1;
    }
    c.due = Date.now() + c.ivl * DAY;
    c.seen = (c.seen | 0) + 1;
    c.last = Date.now();
    return c;
  }

  function ivlLabel(ivl) {
    if (ivl <= 1) return "demain";
    if (ivl < 7) return "dans " + ivl + " jours";
    if (ivl < 30) return "dans " + Math.round(ivl / 7) + " semaine" + (ivl >= 14 ? "s" : "");
    return "dans " + Math.round(ivl / 30) + " mois";
  }

  /* ---------- état runtime ---------- */
  const R = { list: [], idx: 0, picked: null, correct: 0, wrong: 0, isNew: {}, byMod: {} };

  function colorVar(mod) { return "var(--" + (mod.color || "red") + ", var(--srs-gold))"; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function ensureEl() {
    let el = document.getElementById("lenny-srs");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-srs";
    el.innerHTML = '<div class="srs-shell" id="srs-shell"></div>';
    document.body.appendChild(el);
    return el;
  }

  function open() {
    const b = buildSession();
    if (!b.session.length) { renderEmptyOverlay(); return; }
    R.list = b.session; R.idx = 0; R.picked = null; R.correct = 0; R.wrong = 0; R.byMod = {};
    R.isNew = {}; b.freshIds.forEach(id => R.isNew[id] = true);
    const el = ensureEl(); el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    renderCard();
  }

  function close() {
    const el = document.getElementById("lenny-srs");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
    R.list = []; R.idx = 0; R.picked = null;
    refreshSurfaces();
  }

  function header(pct) {
    return `
      <div class="srs-top">
        <div class="srs-brand">Révisions du jour · répétition espacée</div>
        <button class="srs-close" id="srs-close" aria-label="Fermer">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
        </button>
      </div>
      <div class="srs-progress"><i style="width:${pct}%"></i></div>`;
  }

  function renderCard() {
    const shell = document.getElementById("srs-shell");
    const total = R.list.length;
    const q = R.list[R.idx];
    const mod = q.mod;
    const answered = R.picked != null;
    const pct = Math.round((R.idx / total) * 100);
    const letters = ["A", "B", "C", "D", "E", "F"];
    shell.style.setProperty("--mc", colorVar(mod));
    const opts = q.c.map((opt, i) => {
      let cls = "";
      if (answered) {
        if (i === q.r) cls = " right";
        else if (i === R.picked) cls = " wrong";
        else cls = " dimmed";
      }
      return `<button class="srs-opt${cls}" data-i="${i}"${answered ? " disabled" : ""}><span class="srs-opt-letter">${letters[i]}</span><span>${esc(opt)}</span></button>`;
    }).join("");

    let correction = "";
    if (answered) {
      const ok = R.picked === q.r;
      const card = schedulePreview(q, ok);
      correction = `
        <div class="srs-correction ${ok ? "good" : "bad"}">
          <div class="srs-correction-h">${ok ? "✓ Juste" : "✗ Raté"}</div>
          ${ok ? "" : `<span class="srs-correction-right">Bonne réponse : <strong>${letters[q.r]} — ${esc(q.c[q.r])}</strong></span>`}
          ${q.e ? `<div class="srs-correction-body">${esc(q.e)}</div>` : ""}
          <div class="srs-sched">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.4"/><path d="M8 4.6V8l2.4 1.6" stroke-linecap="round"/></svg>
            Revue ${ivlLabel(card.ivl)}
          </div>
        </div>`;
    }

    const isLast = R.idx + 1 >= total;
    shell.innerHTML = header(pct) + `
      <div class="srs-counter">
        <span class="srs-tag"><span class="dot"></span>${esc(mod.short || mod.title)}${R.isNew[q.id] ? '<span class="srs-newflag">Nouveau</span>' : ""}</span>
        <span>${R.idx + 1} / ${total} · ${R.correct} ✓</span>
      </div>
      <div class="srs-question">${esc(q.q)}</div>
      <div class="srs-options">${opts}</div>
      <div id="srs-correction-slot">${correction}</div>
      <div class="srs-foot">
        <button class="srs-next" id="srs-next"${answered ? "" : " disabled"}>${isLast ? "Terminer →" : "Suivante →"}</button>
      </div>`;

    document.getElementById("srs-close").addEventListener("click", close);
    document.getElementById("srs-next").addEventListener("click", advance);
    shell.querySelectorAll(".srs-opt").forEach(btn => btn.addEventListener("click", () => pick(parseInt(btn.dataset.i, 10))));
    document.getElementById("lenny-srs").scrollTop = 0;
  }

  // calcule l'intervalle sans muter (pour l'affichage), puis on commit dans pick()
  function schedulePreview(q, ok) {
    const s = load();
    const existing = s.cards[q.id] ? Object.assign({}, s.cards[q.id]) : null;
    return schedule(existing, ok);
  }

  function pick(i) {
    if (R.picked != null) return;
    R.picked = i;
    const q = R.list[R.idx];
    const ok = i === q.r;
    if (ok) R.correct++; else R.wrong++;
    // commit planification
    const s = load();
    s.cards[q.id] = schedule(s.cards[q.id] || null, ok);
    if (R.isNew[q.id]) {
      s.intro = s.intro || {};
      s.intro[todayKey()] = (s.intro[todayKey()] || 0) + 1;
      R.isNew[q.id] = false; // ne compte qu'une fois
    }
    save(s);
    // agrège pour le radar
    const id = q.mod && q.mod.id;
    if (id) { R.byMod[id] = R.byMod[id] || { correct: 0, total: 0 }; R.byMod[id].total++; if (ok) R.byMod[id].correct++; }
    renderCard();
    const n = document.getElementById("srs-next"); if (n) n.focus();
  }

  function advance() {
    if (R.picked == null) return;
    if (R.idx + 1 >= R.list.length) return renderDone();
    R.idx++; R.picked = null;
    renderCard();
  }

  function nextDueInfo() {
    const s = load(); const now = Date.now(); let min = Infinity;
    Object.keys(s.cards).forEach(k => { const d = s.cards[k].due; if (d > now && d < min) min = d; });
    if (min === Infinity) return "Plus rien de programmé — tu peux découvrir de nouvelles questions demain.";
    const days = Math.max(1, Math.round((min - now) / DAY));
    return "Prochaine session : " + (days <= 1 ? "demain" : "dans " + days + " jours") + ".";
  }

  function renderDone() {
    const shell = document.getElementById("srs-shell");
    const total = R.correct + R.wrong;
    const pct = total ? Math.round((R.correct / total) * 100) : 0;
    // enregistre l'historique par module (alimente le radar / progression)
    if (window.LennyAPI) {
      Object.keys(R.byMod).forEach(id => LennyAPI.recordQuizResult({ moduleId: id, correct: R.byMod[id].correct, total: R.byMod[id].total }));
    }
    // marque la session du jour comme faite
    const s = load(); s.done = s.done || {}; s.done[todayKey()] = (s.done[todayKey()] || 0) + total; save(s);

    const msg = pct >= 85 ? "Mémoire au top." : pct >= 60 ? "Bien — les cartes ratées reviennent vite." : "Les points fragiles reviendront dès demain.";
    shell.innerHTML = header(100) + `
      <div class="srs-done">
        <div class="srs-done-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5 L9.5 18 L20 6.5"/></svg>
        </div>
        <div class="srs-done-h">Session terminée</div>
        <div class="srs-done-sub">${esc(msg)}</div>
        <div class="srs-stats">
          <div class="srs-stat"><div class="srs-stat-n">${total}</div><div class="srs-stat-l">Révisées</div></div>
          <div class="srs-stat good"><div class="srs-stat-n">${R.correct}</div><div class="srs-stat-l">Maîtrisées</div></div>
          <div class="srs-stat bad"><div class="srs-stat-n">${R.wrong}</div><div class="srs-stat-l">À revoir</div></div>
        </div>
        <div class="srs-next-info">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.2" y="3.2" width="11.6" height="10.6" rx="1.6"/><path d="M2.2 6.2h11.6M5.5 1.8v2.6M10.5 1.8v2.6" stroke-linecap="round"/></svg>
          ${esc(nextDueInfo())}
        </div>
        <div class="srs-done-actions">
          ${dueCount() > 0 ? '<button class="srs-btn srs-btn-primary" id="srs-again">Continuer (' + dueCount() + ')</button>' : ""}
          <button class="srs-btn srs-btn-ghost" id="srs-finish">Fermer</button>
        </div>
      </div>`;
    document.getElementById("srs-close").addEventListener("click", close);
    document.getElementById("srs-finish").addEventListener("click", close);
    const again = document.getElementById("srs-again");
    if (again) again.addEventListener("click", open);
    document.getElementById("lenny-srs").scrollTop = 0;
  }

  function renderEmptyOverlay() {
    const el = ensureEl(); el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    const shell = document.getElementById("srs-shell");
    shell.innerHTML = header(100) + `
      <div class="srs-done">
        <div class="srs-done-ico" style="color:var(--green);border-color:rgba(70,211,105,.4);background:radial-gradient(circle at 50% 35%, rgba(70,211,105,.25), rgba(70,211,105,.04))">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5 L9.5 18 L20 6.5"/></svg>
        </div>
        <div class="srs-done-h">Tout est à jour</div>
        <div class="srs-done-sub">${esc(nextDueInfo())}</div>
        <div class="srs-done-actions">
          <button class="srs-btn srs-btn-ghost" id="srs-finish">Fermer</button>
        </div>
      </div>`;
    document.getElementById("srs-close").addEventListener("click", close);
    document.getElementById("srs-finish").addEventListener("click", close);
  }

  /* ---------- surfaces (bouton nav + bandeau accueil) ---------- */
  function buildBanner() {
    const mount = document.getElementById("progress-srs-mount");
    const home = document.getElementById("view-home");
    const host = mount || home;
    if (!host) return null;
    let sec = document.getElementById("srs-home");
    if (sec) return sec;
    sec = document.createElement("section");
    sec.className = "srs-home";
    sec.id = "srs-home";
    if (mount) { mount.appendChild(sec); return sec; }
    const cont = document.getElementById("continue");
    if (cont && cont.parentNode === home) home.insertBefore(sec, cont);
    else home.insertBefore(sec, home.firstChild);
    return sec;
  }

  function renderBanner() {
    const sec = buildBanner();
    if (!sec) return;
    const b = buildSession();
    const due = b.session.length;
    const goal = DAILY_GOAL;
    const ratio = Math.min(1, due === 0 ? 1 : Math.min(due, goal) / goal);
    const C = 2 * Math.PI * 27; // r=27
    const off = C * (1 - ratio);
    sec.classList.toggle("is-empty", due === 0);
    const ring = `
      <div class="srs-ring">
        <svg viewBox="0 0 64 64"><circle class="srs-ring-track" cx="32" cy="32" r="27" fill="none" stroke-width="6"/><circle class="srs-ring-fill" cx="32" cy="32" r="27" fill="none" stroke-width="6" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg>
        <span class="srs-ring-num">${due === 0 ? "✓" : due}</span>
      </div>`;
    if (due === 0) {
      sec.innerHTML = `
        <div class="srs-card">
          ${ring}
          <div class="srs-home-txt">
            <div class="srs-kicker">Révisions du jour</div>
            <div class="srs-home-h">Tout est à jour</div>
            <div class="srs-home-sub">${esc(nextDueInfo())} Reviens demain pour consolider ta mémoire.</div>
          </div>
          <button class="srs-home-cta" id="srs-home-cta">Voir l'avancée</button>
        </div>`;
    } else {
      const learned = b.learned;
      sec.innerHTML = `
        <div class="srs-card">
          ${ring}
          <div class="srs-home-txt">
            <div class="srs-kicker">Révisions du jour</div>
            <div class="srs-home-h">${due} question${due > 1 ? "s" : ""} à revoir aujourd'hui</div>
            <div class="srs-home-sub">La répétition espacée te ressert chaque notion au bon moment.${learned ? " " + learned + " carte" + (learned > 1 ? "s" : "") + " en mémoire." : " Démarre ta toute première session."}</div>
          </div>
          <button class="srs-home-cta" id="srs-home-cta">
            <svg viewBox="0 0 18 18" fill="currentColor"><path d="M4 2 L15 9 L4 16 Z"/></svg>
            Commencer
          </button>
        </div>`;
    }
    const cta = document.getElementById("srs-home-cta");
    if (cta) cta.addEventListener("click", open);
  }

  function renderNavBadge() {
    const badge = document.getElementById("srs-badge");
    if (!badge) return;
    const due = dueCount();
    if (due > 0) { badge.textContent = due > 99 ? "99+" : String(due); badge.hidden = false; }
    else badge.hidden = true;
  }

  function refreshSurfaces() { try { renderBanner(); renderNavBadge(); } catch (e) {} }

  /* ---------- init ---------- */
  function init() {
    const btn = document.getElementById("srs-btn");
    if (btn) btn.addEventListener("click", open);
    refreshSurfaces();
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { const el = document.getElementById("lenny-srs"); if (el && el.classList.contains("open")) close(); }
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 60));
  else setTimeout(init, 60);

  window.LennySRS = { open, close, dueCount, refresh: refreshSurfaces };
})();
