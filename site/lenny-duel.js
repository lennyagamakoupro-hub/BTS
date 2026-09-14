/* ============================================
   LENNY — Duel hebdomadaire (optionnel) contre un autre code
   • Score de la semaine = XP gagné depuis lundi (snapshot du XP total).
   • Deux modes, choisis explicitement, jamais devinés :
     - "bot"  : rythme simulé, déterministe par code+semaine — étiqueté
       « Bot » dans l'interface, jamais présenté comme une personne.
     - "real" : un vrai autre code. Mon score de la semaine est posté sur
       /api/duel/xp, celui de l'adversaire est lu depuis la même route.
       S'il n'a rien posté cette semaine → état honnête, jamais un chiffre
       inventé. Si le réseau échoue → état honnête aussi.
   API : window.LennyDuel.refresh()
   ============================================ */
(function () {
  "use strict";

  const LS = "lenny-duel-v1";
  const LS_XP = "lenny-duel-xpbase-v1";

  /* ---------- registre des codes connus → prénom (mode "real" uniquement) ---------- */
  const NAMES = {
    "LENNY71!": "Lenny", "JRMY-7K4": "Jeremy", "THIB-7K2": "Thibaut",
    "EDEN-8P3": "Eden", "MANON-71L": "Manon", "DIANE-5R8": "Diane",
    "JOEL-3M7": "Joël", "JOELLE-9K4": "Joëlle", "EVA-6T2": "Eva",
  };
  const CODE_RE = /^[0-9A-ZÀ-Ÿ]{2,}-[0-9A-ZÀ-Ÿ]{2,}$/;
  function knownCode(code) {
    return !!NAMES[code] || CODE_RE.test(code) || code === "LENNY71!";
  }
  function nameFor(code) {
    if (NAMES[code]) return NAMES[code];
    return "Adversaire";
  }
  function initials(name) {
    const p = name.trim().split(/\s+/);
    return ((p[0]?.[0] || "?") + (p[1]?.[0] || "")).toUpperCase();
  }

  /* ---------- semaine ISO ---------- */
  function isoWeekKey(d = new Date()) {
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day);
    const yStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    const wk = Math.ceil((((t - yStart) / 86400000) + 1) / 7);
    return t.getUTCFullYear() + "-W" + String(wk).padStart(2, "0");
  }
  // fraction de la semaine écoulée (lundi 0 → dimanche 23h59 ≈ 1)
  function weekFraction(d = new Date()) {
    const day = (d.getDay() || 7) - 1;            // 0 = lundi
    const sec = day * 86400 + d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    return Math.min(1, Math.max(0.04, sec / (7 * 86400)));
  }
  function daysLeft(d = new Date()) {
    const day = (d.getDay() || 7);                // 1..7
    return 7 - day;                                // jours pleins restants
  }

  /* ---------- seed déterministe (mode bot) ---------- */
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0);
  }

  /* ---------- score de la semaine (moi) ---------- */
  function myXP() {
    try { return (window.LennyXP && window.LennyXP.state) ? (window.LennyXP.state().xp | 0) : 0; }
    catch (e) { return 0; }
  }
  function myWeekScore() {
    const wk = isoWeekKey();
    let base;
    try { base = JSON.parse(localStorage.getItem(LS_XP) || "null"); } catch (e) { base = null; }
    const xp = myXP();
    if (!base || base.week !== wk) {
      base = { week: wk, xp: xp };
      try { localStorage.setItem(LS_XP, JSON.stringify(base)); } catch (e) {}
    }
    // si l'XP total a baissé (reset), on recale la base
    if (xp < base.xp) { base.xp = xp; try { localStorage.setItem(LS_XP, JSON.stringify(base)); } catch (e) {} }
    return Math.max(0, xp - base.xp);
  }

  /* ---------- score de la semaine (bot — formule simulée, jamais un vrai élève) ---------- */
  function oppWeekScore(code) {
    const wk = isoWeekKey();
    const seed = hash(code + "|" + wk);
    const target = 80 + (seed % 360);             // 80..439 points sur la semaine
    const jitter = ((seed >> 7) % 17) - 8;        // -8..+8
    return Math.max(0, Math.round(target * weekFraction()) + jitter);
  }

  /* ---------- backend duel réel ---------- */
  function apiBase() { return (window.LENNY_API_BASE || "").replace(/\/$/, ""); }
  function myCode() { return (window.LennyAuth && window.LennyAuth.code) || ""; }

  async function postMyXp(code, week, xp) {
    if (!code) return;
    try {
      await fetch(apiBase() + "/api/duel/xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, week, xp }),
      });
    } catch (e) { /* poster mon propre score ne doit jamais bloquer l'affichage */ }
  }
  async function fetchOppXp(code, week) {
    try {
      const r = await fetch(apiBase() + "/api/duel/xp?code=" + encodeURIComponent(code) + "&week=" + encodeURIComponent(week));
      if (!r.ok) return { error: true };
      const d = await r.json();
      return { xp: (typeof d.xp === "number") ? d.xp : null };
    } catch (e) { return { error: true }; }
  }

  /* ---------- état ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(LS) || "null"); } catch (e) { return null; } }
  function save(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }
  function clear() { try { localStorage.removeItem(LS); } catch (e) {} }

  /* ---------- rendu ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  function mount() {
    const row = document.getElementById("top10");
    if (!row) return null;
    let m = document.getElementById("duel-mount");
    if (!m) {
      m = document.createElement("div");
      m.id = "duel-mount";
      const head = row.querySelector(".row-head");
      if (head && head.nextSibling) row.insertBefore(m, head.nextSibling);
      else row.appendChild(m);
    }
    return m;
  }

  function ensureLaunchBtn() {
    const row = document.getElementById("top10");
    if (!row) return;
    const head = row.querySelector(".row-head .row-meta");
    if (!head || document.getElementById("duel-launch")) return;
    const btn = document.createElement("button");
    btn.id = "duel-launch"; btn.type = "button"; btn.className = "duel-launch";
    btn.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg> Duel`;
    head.replaceWith((function () {
      const wrap = document.createElement("div");
      wrap.style.cssText = "display:flex;align-items:center;gap:12px;";
      wrap.appendChild(btn);
      const meta = document.createElement("span");
      meta.className = "row-meta"; meta.textContent = "Classement";
      wrap.appendChild(meta);
      return wrap;
    })());
    btn.addEventListener("click", () => {
      const d = load();
      if (d && d.code) { clear(); render(); }      // toggle off = retour au classement simple
      else renderModePick();
    });
  }

  // Construit l'arène (deux camps + verdict) selon l'état de l'adversaire :
  // - opp est un nombre → duel chiffré normal
  // - state === "pending" → en attente du réseau (mode réel)
  // - state === "unknown" → adversaire réel, rien posté cette semaine (honnête, pas de chiffre inventé)
  // - state === "errored" → réseau injoignable (honnête, pas de chiffre inventé)
  function arenaHtml({ me, myName, opp, oppName, oppTag, state, dl }) {
    const meAva = `<div class="duel-ava ${state === "normal" && me > opp ? "leader" : ""}">${esc(initials(myName))}</div>`;
    const meSide = `
      <div class="duel-side me">
        ${meAva}
        <div class="duel-name">${esc(myName)}</div>
        <div class="duel-score">${me}<small>XP</small></div>
        <div class="duel-bar"><i style="width:${state === "normal" ? Math.round(me / Math.max(me, opp, 1) * 100) : (state === "pending" ? 0 : 100)}%"></i></div>
      </div>`;

    let oppScoreHtml, oppBarPct, verdictHtml;
    if (state === "normal") {
      const tie = me === opp, meLead = me > opp;
      oppScoreHtml = `${opp}<small>XP</small>`;
      oppBarPct = Math.round(opp / Math.max(me, opp, 1) * 100);
      verdictHtml = tie
        ? `<span class="duel-verdict tie">Égalité parfaite — tout se joue d'ici dimanche.</span>`
        : meLead
          ? `<span class="duel-verdict win">Tu mènes de ${me - opp} XP. Garde le rythme !</span>`
          : `<span class="duel-verdict lose">${esc(oppName)} mène de ${opp - me} XP. Une session de révision et tu repasses devant.</span>`;
    } else if (state === "pending") {
      oppScoreHtml = `<span class="duel-opp-wait">…</span>`;
      oppBarPct = 0;
      verdictHtml = `<span class="duel-verdict tie">Lecture du score de ${esc(oppName)}…</span>`;
    } else if (state === "unknown") {
      oppScoreHtml = `<span class="duel-opp-wait">—</span>`;
      oppBarPct = 0;
      verdictHtml = `<span class="duel-verdict tie">${esc(oppName)} n'a pas encore révisé cette semaine.</span>`;
    } else { // errored
      oppScoreHtml = `<span class="duel-opp-wait">—</span>`;
      oppBarPct = 0;
      verdictHtml = `<span class="duel-verdict tie">Adversaire injoignable pour l'instant — réessaie plus tard.</span>`;
    }

    const oppSide = `
      <div class="duel-side opp">
        <div class="duel-ava ${state === "normal" && opp > me ? "leader" : ""}">${esc(initials(oppName))}</div>
        <div class="duel-name">${esc(oppName)}${oppTag ? `<span class="duel-opp-tag">${esc(oppTag)}</span>` : ""}</div>
        <div class="duel-score">${oppScoreHtml}</div>
        <div class="duel-bar"><i style="width:${oppBarPct}%"></i></div>
      </div>`;

    return `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Duel de la semaine
          </div>
          <div class="duel-countdown">${dl > 0 ? dl + " j restants" : "Dernier jour"}</div>
        </div>
        <div class="duel-arena">${meSide}<div class="duel-vs">VS</div>${oppSide}</div>
        <div class="duel-foot">
          ${verdictHtml}
          <div class="duel-actions">
            <button class="duel-mini" id="duel-change" type="button">Changer d'adversaire</button>
            <button class="duel-mini danger" id="duel-stop" type="button">Abandonner</button>
          </div>
        </div>
      </div>`;
  }

  function paintArena(opts) {
    const m = mount();
    if (!m) return;
    m.innerHTML = arenaHtml(opts);
    const ch = document.getElementById("duel-change");
    const st = document.getElementById("duel-stop");
    if (ch) ch.addEventListener("click", renderModePick);
    if (st) st.addEventListener("click", () => { clear(); render(); });
  }

  function render() {
    ensureLaunchBtn();
    const m = mount();
    if (!m) return;
    const d = load();
    const wk = isoWeekKey();
    if (!d || !d.code || d.week !== wk) {
      if (d && d.code && d.week !== wk) {
        // semaine changée : on garde l'adversaire et le mode, on repart à zéro
        save({ code: d.code, name: d.name, mode: d.mode, week: wk });
      }
      m.innerHTML = "";
      return;
    }
    const mode = d.mode === "real" ? "real" : "bot"; // repli "bot" pour un état enregistré avant ce changement
    const me = myWeekScore();
    const myName = (window.LennyAuth && window.LennyAuth.name) || "Moi";
    const dl = daysLeft();

    if (mode === "bot") {
      const opp = oppWeekScore(d.code);
      paintArena({ me, myName, opp, oppName: "Bot", oppTag: "Bot", state: "normal", dl });
      return;
    }

    // mode réel : afficher un état d'attente pendant la lecture réseau
    const oppName = d.name || nameFor(d.code);
    paintArena({ me, myName, opp: 0, oppName, oppTag: null, state: "pending", dl });

    const code = myCode();
    const wkNow = wk;
    Promise.all([postMyXp(code, wkNow, me), fetchOppXp(d.code, wkNow)]).then(([, oppRes]) => {
      // si l'utilisateur a changé d'adversaire/mode entre-temps, ne pas écraser son écran actuel
      const cur = load();
      if (!cur || cur.code !== d.code || cur.week !== wkNow || (cur.mode !== "real")) return;
      if (oppRes.error) {
        paintArena({ me, myName, opp: 0, oppName, oppTag: null, state: "errored", dl: daysLeft() });
      } else if (oppRes.xp == null) {
        paintArena({ me, myName, opp: 0, oppName, oppTag: null, state: "unknown", dl: daysLeft() });
      } else {
        paintArena({ me, myName, opp: oppRes.xp, oppName, oppTag: null, state: "normal", dl: daysLeft() });
      }
    });
  }

  /* ---------- choix explicite du mode, avant tout code ---------- */
  function renderModePick() {
    const m = mount();
    if (!m) return;
    m.innerHTML = `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Lancer un duel
          </div>
        </div>
        <div class="duel-setup">
          <div class="duel-setup-lead">Choisis ton adversaire cette semaine.</div>
          <div class="duel-mode-pick">
            <button class="duel-mode-btn" id="duel-mode-bot" type="button">
              <span class="duel-mode-btn-t">Défier un bot</span>
              <span class="duel-mode-btn-d">Rythme simulé — jamais une vraie personne</span>
            </button>
            <button class="duel-mode-btn" id="duel-mode-real" type="button">
              <span class="duel-mode-btn-t">Défier un élève par son code</span>
              <span class="duel-mode-btn-d">Un vrai score, posté et lu en direct</span>
            </button>
          </div>
          <div class="duel-actions"><button class="duel-mini" id="duel-cancel" type="button">Annuler</button></div>
        </div>
      </div>`;
    const cancel = document.getElementById("duel-cancel");
    if (cancel) cancel.addEventListener("click", () => render());
    const bBot = document.getElementById("duel-mode-bot");
    const bReal = document.getElementById("duel-mode-real");
    // Le bot ne défie personne de réel : aucun code à saisir, on lance direct.
    if (bBot) bBot.addEventListener("click", () => {
      const seed = "BOT-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      save({ code: seed, name: null, mode: "bot", week: isoWeekKey() });
      render();
    });
    if (bReal) bReal.addEventListener("click", () => renderCodeForm("real"));
  }

  // N'est plus appelée qu'en mode "real" — le bot se lance sans aucune saisie
  // (voir renderModePick). Le paramètre mode reste au cas où, toujours "real" en pratique.
  function renderCodeForm(mode, prefillErr) {
    const m = mount();
    if (!m) return;
    const myName = (window.LennyAuth && window.LennyAuth.name) || "toi";
    m.innerHTML = `
      <div class="duel-card">
        <div class="duel-head">
          <div class="duel-head-title">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3l-1 1M2 14l4.5-4.5M11 5l-6 6M9 3l4 4-2 2-4-4zM3 9l4 4-2 2-2-2z"/></svg>
            Défier un élève
          </div>
        </div>
        <div class="duel-setup">
          <div class="duel-setup-lead">Défie un camarade sur l'<b>XP gagné cette semaine</b>. Saisis son code d'accès. C'est <b>${esc(myName)}</b> contre lui jusqu'à dimanche soir.</div>
          <div class="duel-form">
            <input class="duel-input" id="duel-input" placeholder="Ex. JRMY-7K4" autocomplete="off" spellcheck="false" maxlength="14">
            <button class="duel-go" id="duel-confirm" type="button">Défier</button>
          </div>
          <div class="duel-err" id="duel-err">${prefillErr ? esc(prefillErr) : ""}</div>
          <div class="duel-hint">Le score repart à zéro chaque lundi. Tu peux changer d'adversaire ou arrêter quand tu veux.</div>
          <div class="duel-actions">
            <button class="duel-mini" id="duel-back" type="button">Changer de mode</button>
            <button class="duel-mini" id="duel-cancel" type="button">Annuler</button>
          </div>
        </div>
      </div>`;

    const input = document.getElementById("duel-input");
    const err = document.getElementById("duel-err");
    const go = document.getElementById("duel-confirm");
    const back = document.getElementById("duel-back");
    const cancel = document.getElementById("duel-cancel");
    if (input) { input.focus(); input.addEventListener("input", () => { input.value = input.value.toUpperCase(); }); }
    function confirm() {
      const code = (input.value || "").trim().toUpperCase().replace(/\s+/g, "");
      const myC = myCode();
      if (!code) { if (err) err.textContent = "Entre un code pour lancer le duel."; return; }
      if (code === myC) { if (err) err.textContent = "Tu ne peux pas te défier toi-même."; return; }
      if (!knownCode(code)) { if (err) err.textContent = "Ce code ne ressemble pas à un code LENNY valide."; return; }
      save({ code, name: nameFor(code), mode: "real", week: isoWeekKey() });
      render();
    }
    if (go) go.addEventListener("click", confirm);
    if (input) input.addEventListener("keydown", (e) => { if (e.key === "Enter") confirm(); });
    if (back) back.addEventListener("click", () => renderModePick());
    if (cancel) cancel.addEventListener("click", () => { render(); });
  }

  function refresh() { render(); }

  function init() {
    if (!document.getElementById("top10")) return;
    render();
    // rafraîchit le score quand on revient sur l'onglet ou après une session
    document.addEventListener("visibilitychange", () => { if (!document.hidden) render(); });
    window.addEventListener("focus", render);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 260));
  else setTimeout(init, 260);
  document.addEventListener("lenny-auth", () => setTimeout(render, 120));

  window.LennyDuel = { refresh, render, open: renderModePick };
})();
