/* ============================================
   LENNY — Portail d'accès (codes individuels + filigrane)
   Mode autonome : 30 codes pré-générés que tu attribues toi-même.
   Garde la table prénom → code de ton côté ; le filigrane affiche
   le numéro de place, donc une fuite est traçable.
   Pour révoquer un code : supprime sa ligne dans CODES et régénère.
   ============================================ */
(function () {
  // code (en MAJUSCULES) -> libellé affiché en filigrane
  const CODES = {
    "LENNY71!": "Lenny · admin",
    "7K9-RZT": "Élève 01",
    "P4M-XQ8": "Élève 02",
    "2H6-LWD": "Élève 03",
    "9F3-VNK": "Élève 04",
    "5B8-TJR": "Élève 05",
    "Q7X-2MP": "Élève 06",
    "4D9-HKZ": "Élève 07",
    "8N2-RVL": "Élève 08",
    "3W6-PFT": "Élève 09",
    "6C4-XBM": "Élève 10",
    "K9J-7DQ": "Élève 11",
    "R2T-5HN": "Élève 12",
    "7P8-WLV": "Élève 13",
    "M4Z-3KX": "Élève 14",
    "9B6-QFD": "Élève 15",
    "2V7-NJR": "Élève 16",
    "5K3-TWP": "Élève 17",
    "8H9-LXM": "Élève 18",
    "4R6-ZBV": "Élève 19",
    "Q3D-7FK": "Élève 20",
    "6N8-PWT": "Élève 21",
    "K7X-2LJ": "Élève 22",
    "3F9-HRV": "Élève 23",
    "9M4-XQB": "Élève 24",
    "5T6-WKD": "Élève 25",
    "2J8-RNP": "Élève 26",
    "7Z3-LFM": "Élève 27",
    "4B9-VHX": "Élève 28",
    "8P6-KWT": "Élève 29",
    "6D2-QJR": "Élève 30",
    "THIB-7K2": "Thibaut",
    "JRMY-7K4": "Jeremy",
    "EDEN-8P3": "Eden",
    "MANON-71L": "Manon",
    "DIANE-5R8": "Diane",
    "JOEL-3M7": "Joël",
    "JOELLE-9K4": "Joëlle",
    "EVA-6T2": "Eva",
  };

  // Optionnel : code -> "Prénom Nom" affiché dans le menu profil.
  // Renseigne ici la vraie identité de chaque code ; à défaut, le libellé de CODES est utilisé.
  const NAMES = {
    "LENNY71!": "Lenny",
    "JRMY-7K4": "Jeremy",
    "THIB-7K2": "Thibaut",
    "EDEN-8P3": "Eden",
    "MANON-71L": "Manon",
    "DIANE-5R8": "Diane",
    "JOEL-3M7": "Joël",
    "JOELLE-9K4": "Joëlle",
    "EVA-6T2": "Eva",
  };

  const LS_KEY = "lenny-access-v1";
  // Stockage de session : le code d'accès est effacé dès qu'on ferme l'onglet
  // ou qu'on quitte le site -> reconnexion obligatoire à chaque visite.
  const store = window.sessionStorage;
  // Déconnexion automatique après 15 minutes sans activité.
  const IDLE_MS = 15 * 60 * 1000;
  let idleTimer = null;
  let idleCode = null;

  function isExpired(saved) {
    return !saved || !saved.t || (Date.now() - saved.t > IDLE_MS);
  }

  function touch() {
    if (!idleCode) return;
    try { store.setItem(LS_KEY, JSON.stringify({ code: idleCode, t: Date.now() })); } catch (e) {}
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(logout, IDLE_MS);
  }

  function startIdleWatch(code) {
    idleCode = code;
    ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"].forEach((ev) =>
      window.addEventListener(ev, touch, { passive: true })
    );
    touch();
  }

  const norm = (s) => (s || "").trim().toUpperCase().replace(/\s+/g, "");

  /* ============================================================
     Verrou mono-appareil : un même code ne peut pas être actif
     sur deux adresses IP différentes en même temps.
     L'enforcement réel est assuré par le serveur (seul à voir l'IP).
     Sans backend (window.LENNY_API_BASE absent) : pas d'enforcement
     possible côté navigateur → on laisse passer (fail-open).
     ============================================================ */
  const SESS_HEARTBEAT_MS = 30000;
  let sessTimer = null;
  function apiBase() { return (window.LENNY_API_BASE || "").replace(/\/$/, ""); }
  function clientId() {
    try {
      let c = localStorage.getItem("lenny-client-id");
      if (!c) { c = "c_" + Math.random().toString(36).slice(2, 12); localStorage.setItem("lenny-client-id", c); }
      return c;
    } catch (e) { return "c_anon"; }
  }
  async function claimSession(code) {
    const b = apiBase();
    if (!b) return { ok: true, local: true };
    try {
      const r = await fetch(b + "/api/session/claim", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, client_id: clientId() }),
      });
      if (r.status === 409) { const d = await r.json().catch(() => ({})); return { ok: false, reason: "in_use", info: d }; }
      if (r.ok) return { ok: true };
      return { ok: true, offline: true };   // erreur serveur → fail-open
    } catch (e) { return { ok: true, offline: true }; } // réseau KO → fail-open
  }
  function startHeartbeat(code) {
    stopHeartbeat();
    const b = apiBase(); if (!b) return;
    sessTimer = setInterval(async () => {
      try {
        const r = await fetch(b + "/api/session/heartbeat", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, client_id: clientId() }),
        });
        if (r.ok) { const d = await r.json(); if (d && d.revoked) { stopHeartbeat(); onRevoked(); } }
      } catch (e) {}
    }, SESS_HEARTBEAT_MS);
  }
  function stopHeartbeat() { if (sessTimer) { clearInterval(sessTimer); sessTimer = null; } }
  function releaseSession(code) {
    const b = apiBase(); if (!b || !code) return;
    const body = JSON.stringify({ code, client_id: clientId() });
    try {
      if (navigator.sendBeacon) navigator.sendBeacon(b + "/api/session/release", new Blob([body], { type: "application/json" }));
      else fetch(b + "/api/session/release", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    } catch (e) {}
  }
  function onRevoked() {
    try { alert("Ce code vient d'être utilisé sur un autre appareil. Tu as été déconnecté."); } catch (e) {}
    logout();
  }
  window.addEventListener("pagehide", function () { stopHeartbeat(); if (idleCode) releaseSession(idleCode); });

  function initials(name) {
    const parts = (name || "").replace(/·.*/, "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "LN";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function logout() {
    // Neutralise le détecteur d'inactivité AVANT tout : sinon le clic sur
    // "Se déconnecter" continue de remonter jusqu'au listener "click" global
    // (touch) qui réécrirait le code dans la session juste avant le reload,
    // et on resterait connecté. La garde `if (!idleCode) return;` de touch()
    // bloque cette réécriture une fois idleCode remis à null.
    stopHeartbeat();
    if (idleCode) releaseSession(idleCode);   // libère le verrou mono-appareil
    idleCode = null;
    if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
    try { store.removeItem(LS_KEY); } catch (e) {}
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
    // petit délai pour laisser la propagation de l'événement se terminer,
    // puis rechargement -> l'écran d'identification réapparaît (session vide).
    setTimeout(function () { location.reload(); }, 0);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // Exécute fn une fois que le navigateur a peint au moins une frame
  // (double rAF) : laisse l'overlay d'intro s'afficher et le L démarrer son
  // animation AVANT le travail lourd de construction de l'app.
  // Garde-fou setTimeout : si rAF est gelé (onglet en arrière-plan), fn
  // s'exécute quand même -> jamais bloqué derrière l'overlay.
  function afterPaint(fn) {
    var ran = false;
    function run() { if (ran) return; ran = true; try { fn(); } catch (e) {} }
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(function () { requestAnimationFrame(run); });
    }
    setTimeout(run, 120);
  }

  function applyWatermark(label) {
    // Filigrane désactivé — on retire tout filigrane existant et on n'en crée pas.
    const existing = document.getElementById("lenny-wm");
    if (existing) existing.remove();
    return;
    /* eslint-disable no-unreachable */
    let wm = document.getElementById("lenny-wm");
    if (!wm) {
      wm = document.createElement("div");
      wm.id = "lenny-wm";
      document.body.appendChild(wm);
    }
    const text = label + "  ·  LENNY";
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='360' height='210'>" +
      "<text x='10' y='110' transform='rotate(-28 180 105)' " +
      "fill='rgba(130,130,130,0.10)' font-family='Helvetica,Arial,sans-serif' " +
      "font-size='17' font-weight='700' letter-spacing='1'>" +
      text.replace(/&/g, "&amp;").replace(/</g, "&lt;") +
      "</text></svg>";
    wm.style.backgroundImage =
      "url(\"data:image/svg+xml;utf8," + encodeURIComponent(svg) + "\")";
  }

  function unlock(label, code) {
    const gate = document.getElementById("lenny-gate");
    if (gate) gate.classList.add("hidden");
    applyWatermark(label);
    document.documentElement.style.overflow = "";
    const name = (NAMES[code] || label || "").replace(/\s*·\s*admin/i, "");
    const isAdmin = /admin/i.test(label || "");
    window.LennyAuth = {
      code: code || null,
      label: label || "",
      name: name || "Élève",
      initials: initials(name),
      isAdmin,
      logout,
    };
    document.dispatchEvent(new CustomEvent("lenny-auth", { detail: window.LennyAuth }));
    startIdleWatch(code);
    startHeartbeat(code);   // surveille qu'aucun autre appareil ne prenne le code
  }

  // Joue l'intro « L » par-dessus l'app révélée ; sound=true si geste utilisateur.
  // Renvoie un contrôleur { start } : l'animation reste gelée (écran noir) tant
  // que start() n'est pas appelé -> on l'appelle APRÈS la reconstruction de l'app.
  function playIntro(sound) {
    try {
      if (window.LennyIntro && window.LennyIntro.play) {
        return window.LennyIntro.play({ sound: !!sound, manualStart: true });
      }
    } catch (e) {}
    return null;
  }

  // Purge l'ancien stockage permanent (versions pr\u00e9c\u00e9dentes) -> force la reconnexion.
  try { localStorage.removeItem(LS_KEY); } catch (e) {}

  // Already unlocked? (same session / same tab only)
  try {
    const saved = JSON.parse(store.getItem(LS_KEY) || "null");
    if (saved && saved.code && CODES[saved.code] && !isExpired(saved)) {
      // hide gate ASAP to avoid flash
      document.documentElement.style.setProperty("--gate-skip", "1");
      ready(() => {
        // L'intro (écran noir + L gelé) se monte en premier ; la reconstruction
        // lourde passe derrière ; puis on lance l'animation à pleine vitesse.
        var introCtrl = playIntro(false);
        afterPaint(function () {
          // Vérifie le verrou mono-appareil avant de rouvrir la session.
          claimSession(saved.code).then(function (res) {
            if (!res.ok) {
              // code repris ailleurs (autre IP) → on n'ouvre pas : retour au portail
              try { store.removeItem(LS_KEY); } catch (e) {}
              location.reload();
              return;
            }
            unlock(CODES[saved.code], saved.code);
            afterPaint(function () { if (introCtrl && introCtrl.start) introCtrl.start(); });
          });
        });
      });
      return;
    }
  } catch (e) {}

  // Lock scroll until unlocked
  ready(() => {
    document.documentElement.style.overflow = "hidden";
    const input = document.getElementById("gate-input");
    const btn = document.getElementById("gate-btn");
    const msg = document.getElementById("gate-msg");
    const field = document.getElementById("gate-field");
    const eye = document.getElementById("gate-eye");
    if (!input || !btn) return;

    // œil : afficher / masquer le code
    if (eye) eye.addEventListener("click", () => {
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      eye.setAttribute("aria-pressed", String(show));
      eye.setAttribute("aria-label", show ? "Masquer le code" : "Afficher le code");
      input.focus();
    });

    function showErr(text) {
      if (msg) { msg.classList.remove("ok"); msg.textContent = text; }
      if (field) { field.classList.add("err"); setTimeout(() => field.classList.remove("err"), 460); }
    }
    function setLoading(on) {
      btn.classList.toggle("loading", on);
      btn.disabled = on;
      const tx = btn.querySelector(".gate-btn-tx");
      if (tx) tx.textContent = on ? "Ouverture…" : "Ouvrir la porte";
    }

    // ----- tuiles lumineuses : une case s'allume à chaque caractère saisi -----
    const tiles = document.getElementById("gate-tiles");
    const MAXTILES = 9;
    if (tiles) {
      for (let i = 0; i < MAXTILES; i++) {
        const t = document.createElement("span");
        t.className = "gtile";
        tiles.appendChild(t);
      }
      const syncTiles = () => {
        const n = Math.min((input.value || "").length, MAXTILES);
        [...tiles.children].forEach((el, i) => {
          el.classList.toggle("on", i < n);
          el.classList.toggle("head", i === n - 1);
        });
      };
      input.addEventListener("input", syncTiles);
      input.addEventListener("focus", () => field && field.classList.add("focus"));
      input.addEventListener("blur", () => field && field.classList.remove("focus"));
      syncTiles();
    }

    // ----- machine à écrire : plusieurs phrases qui s'enchaînent -----
    const h1 = document.querySelector(".gate-h1");
    if (h1 && !h1.dataset.tw) {
      h1.dataset.tw = "1";
      const phrases = [
        "Êtes-vous prêt à devenir l'expert que l'immobilier attend ?",
        "Chaque révision vous rapproche du métier.",
        "Derrière chaque porte, une vie qui cherche son décor.",
        "Vendre un bien, c'est ouvrir un nouveau chapitre.",
        "Aujourd'hui on révise, demain on signe.",
        "Le mandat, l'estimation, la loi : votre futur quotidien.",
        "Un bon agent ne ment jamais, il conseille.",
        "La réussite à l'examen commence ici, maintenant.",
        "Maîtrisez la théorie, le terrain fera le reste.",
        "De l'étudiant au professionnel : il n'y a qu'un clic.",
        "On ne vend pas des murs, on vend un avenir.",
        "Chaque clé que vous remettrez changera une vie.",
        "Le savoir d'aujourd'hui est la confiance de demain.",
        "Derrière chaque transaction, il y a un rêve qui s'accomplit.",
        "Apprendre, c'est déjà bâtir la maison de votre réussite.",
      ];
      h1.innerHTML = '<span class="gtw"></span><span class="gcaret"></span>';
      const out = h1.querySelector(".gtw");
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        out.textContent = phrases[0];
      } else {
        let p = 0, i = 0, del = false;
        const tick = () => {
          const full = phrases[p];
          if (!del) {
            out.textContent = full.slice(0, ++i);
            if (i >= full.length) { del = true; return setTimeout(tick, 3800); }
            return setTimeout(tick, 68 + Math.random() * 34);
          }
          out.textContent = full.slice(0, --i);
          if (i <= 0) { del = false; p = (p + 1) % phrases.length; return setTimeout(tick, 650); }
          return setTimeout(tick, 30);
        };
        setTimeout(tick, 450);
      }
    }

    let busy = false;
    async function tryUnlock() {
      if (busy) return;
      const code = norm(input.value);
      if (!CODES[code]) { showErr("Code invalide. Vérifie auprès de Lenny."); return; }
      busy = true; setLoading(true);
      if (msg) msg.textContent = "";
      const res = await claimSession(code);
      setLoading(false); busy = false;
      if (!res.ok) {
        if (res.reason === "in_use") showErr("Ce code est déjà connecté sur un autre appareil.");
        else showErr("Connexion impossible. Réessaie dans un instant.");
        return;
      }
      // succès : on mémorise la session et on ouvre
      try { store.setItem(LS_KEY, JSON.stringify({ code, t: Date.now() })); } catch (e) {}
      if (msg) { msg.classList.add("ok"); msg.textContent = "Accès accordé"; }
      const gate = document.getElementById("lenny-gate");
      if (gate) gate.classList.add("ok");
      var introCtrl = playIntro(true);
      afterPaint(function () {
        unlock(CODES[code], code);
        afterPaint(function () { if (introCtrl && introCtrl.start) introCtrl.start(); });
      });
    }
    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") tryUnlock(); });
    input.focus();
  });
})();
