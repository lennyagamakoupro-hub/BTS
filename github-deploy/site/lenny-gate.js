/* ============================================
   LENNY — Portail d'accès (codes individuels, hachés)
   Mode autonome : codes pré-attribués, stockés sous forme d'empreintes
   PBKDF2-SHA256 (jamais en clair dans la source).
   Garde la table prénom → code de ton côté.
   Pour révoquer un code : supprime sa ligne dans CODE_HASHES.
   Pour en ajouter : await LennyGateHash("CODE") dans la console.
   ============================================ */
(function () {
  // ───────────────────────────────────────────────────────────────
  //  SÉCURITÉ : les codes ne sont PLUS écrits en clair ici.
  //  Chaque entrée est l'empreinte PBKDF2-SHA256 (150 000 itérations + sel)
  //  du code. « Afficher le source » ne révèle donc aucun code.
  //  Pour AJOUTER un élève : dans la console du navigateur, tape
  //     await LennyGateHash("SON-CODE")
  //  puis colle l'empreinte affichée ci-dessous (hash -> libellé).
  //  Pour RÉVOQUER : supprime simplement la ligne correspondante.
  // ───────────────────────────────────────────────────────────────
  const CODE_HASHES = {
    "ffef8492a413b55e6b3a46c07311ab9859a51cc1f87bcc33a24afb220ce2c48e": "Lenny · admin",
    "c905c32c2a750efd8aaec8ee7efaeb4c72458e72032ee7506f0bf251434a8a74": "Élève 01",
    "7c583b814bdbf4f058072ae37755402a7fa4e0206d736e8ced87bbcc83a93350": "Élève 02",
    "1a44a78204848db11a7b8882a9141c849f5b2ec6f41abaf0fca332194e03982e": "Élève 03",
    "d18358c07583c1db78bd22b7e0faa743d3b26c5dd716c5d19478db1f6aef6617": "Élève 04",
    "3554c9187546704bb8c72cf99241ead1815a33f1f6962392d756694770f4944b": "Élève 05",
    "55ef4738f18f8ee0dfd08f23bb7d9f69f4dccdd9df48d96e1cc62f2b3247185d": "Élève 06",
    "4f28ffffd368e10703c3fc2afbbfd673fe84a6c09c802a748f67cdf47f3ce2b6": "Élève 07",
    "c2a86638e13699d9650a2a532e82ee8c9955e2253554215a429553e2177479c6": "Élève 08",
    "fd02bb74bddf614ec503cf4e84d74fb9cbdee1c923d6a56cc7c6948c28a5b126": "Élève 09",
    "cea466f5b05632a391a57340032d37dc341da4f4a0f73a31979812054d4a17e2": "Élève 10",
    "db882c2bbf625664a99bada5938179d2457650396e4b602fdcbfd1ed2854e352": "Élève 11",
    "e21cfa73af9fe50d7e089b35579af5090d8993953851b1024a65de5ef34dcb50": "Élève 12",
    "fa82af6e44c634056533d944faa694778cdd327b156f17dd3e0a4f293343ec83": "Élève 13",
    "1136f31b0cde6dd9ead9ffd5f4fd73b64ab0ab1c4d80edd9a1f30fd36c84e338": "Élève 14",
    "8788d65010657e3bc39f91dc78f011a75697ca6ede175bc5863edd236871abff": "Élève 15",
    "8e0b6ed4186db0477b0929712973aae46548a708fb9a4d722a83250e15183187": "Élève 16",
    "0f1a3360e9f5305991bfa19233896f44523bb1a267c801db7b16c75dd882fdb1": "Élève 17",
    "1274742f37a3470bd9f61b06aa4a56968cc995e263991d611fbe05ee88bfa71f": "Élève 18",
    "977cd5addfad774e7c5dfa7eb736e24aca9aa7e358af6689e4c99fe41b3d8478": "Élève 19",
    "cced932426854a786a128ba8fee140c2b5c7961804310aa2e4ad8471b38dfbd6": "Élève 20",
    "e6ebc8b603c6a9e60c7e9c31f1eb4fbd6d0010fab69d71fe56fde5589f9271a4": "Élève 21",
    "0913b6c8ab03d74f159d726adc47776556295006c9eaacacecc6afe035603520": "Élève 22",
    "0d885df45fbdff0e308ffeae5a331f91b216333a0f0b81875bdfaa7d0f4fc075": "Élève 23",
    "5506e43ad227674170c84a2bf02d0930efebb37db63847318e6a4363c2180dc5": "Élève 24",
    "c4ecc65c7f1760631435f70438dc889bcd570d89d397c85ce3456776ad8acd69": "Élève 25",
    "02b8290313b01c9d1691c60d3b4b373aed63429af79321401c2f418433e89f35": "Élève 26",
    "6a346a6ec9146997e35e34edb5fcb4bcbaf911d4fecc2bdfcfd71318a97dc6d3": "Élève 27",
    "256711f2a47584fcc9e6c318030c9b1aa17ed3f6057c71a6ce5a1104ba08584d": "Élève 28",
    "6a9b2141488dc12907412492cf0cdc29391f639f169b3c215f194d091d1bc933": "Élève 29",
    "be735be7e9269c118d7a53252b6c3a8a6b00104aee073eb688442cc4853cabfa": "Élève 30",
    "f246436b3c751871930d225ad4ad828277487f7576f352012f69389c932926d7": "Thibaut",
    "b876f85cfd593156a46e902b6167ea016f7b6406b3990bd0c84b6d635f9417ce": "Jeremy",
    "fbcfbd673eca486e51b78de5cf1c0b1ab629728d63eb29f6bcdff6b597ce3c5a": "Eden",
    "afeb306c9e79731b2366bc629332fcdafb029ee5700b168f7e439fc4c8de24bd": "Manon",
    "3ebf9ed34ca929dda64b0562664ea2aa5ea04dc6f1121b29b9cd96b166174cb0": "Diane",
    "10ba02bcffac80efed4074234d8538e8aea8368511708796d5de1603745403cc": "Joël",
    "48cb22533a140e463e7e9d32da1dd7ba3bfd288c84e9dbe8cb03e086efc3ee68": "Joëlle",
    "9124d6f6ab169966ded4b284e964fc96ed4eb03ffc6053407e24e34cc9d22eb8": "Eva",
    "492dcb2b11967bcfc9ce68d080d1c55516ce3cae1e15bfd4d9324a2a417799a0": "Thomas",
    "88e55f7c18c0897151fd2fe6f7518f73e8a8ae3be2741d40926140e71441ca29": "Inès",
    "ac2599f084d89c6da3a5657547ca1921048d0280844ca99f4e3ef8496ef4f205": "Maxime",
    "51ebb6feb644c9765a6fc9d06db4e96ab9c9943b364b2ef4a251f4608ca449bf": "Quevin",
    "0891d150327b691a484a35740be5b451381557c24633205e4be0587985611f17": "Marie",
    "642f6c8b44246bba1ea98846cc596040315e92ab1f4a4ac5b07878d26c4c7cc3": "Antoine",
    "73ad26c72d7a2d8760e7e2a87096bfd132a0d09889af4e4a1297a75424f6a30b": "Chiara",
    "153374da11bc8d1e1626781ab0923c2568e7360ee68b1b8f492585b9b3778a34": "MKZ",
  };

  // Empreinte -> "Prénom" affiché dans le menu profil (même principe).
  const NAME_HASHES = {
    "ffef8492a413b55e6b3a46c07311ab9859a51cc1f87bcc33a24afb220ce2c48e": "Lenny",
    "b876f85cfd593156a46e902b6167ea016f7b6406b3990bd0c84b6d635f9417ce": "Jeremy",
    "f246436b3c751871930d225ad4ad828277487f7576f352012f69389c932926d7": "Thibaut",
    "fbcfbd673eca486e51b78de5cf1c0b1ab629728d63eb29f6bcdff6b597ce3c5a": "Eden",
    "afeb306c9e79731b2366bc629332fcdafb029ee5700b168f7e439fc4c8de24bd": "Manon",
    "3ebf9ed34ca929dda64b0562664ea2aa5ea04dc6f1121b29b9cd96b166174cb0": "Diane",
    "10ba02bcffac80efed4074234d8538e8aea8368511708796d5de1603745403cc": "Joël",
    "48cb22533a140e463e7e9d32da1dd7ba3bfd288c84e9dbe8cb03e086efc3ee68": "Joëlle",
    "9124d6f6ab169966ded4b284e964fc96ed4eb03ffc6053407e24e34cc9d22eb8": "Eva",
    "492dcb2b11967bcfc9ce68d080d1c55516ce3cae1e15bfd4d9324a2a417799a0": "Thomas",
    "88e55f7c18c0897151fd2fe6f7518f73e8a8ae3be2741d40926140e71441ca29": "Inès",
    "ac2599f084d89c6da3a5657547ca1921048d0280844ca99f4e3ef8496ef4f205": "Maxime",
    "51ebb6feb644c9765a6fc9d06db4e96ab9c9943b364b2ef4a251f4608ca449bf": "Quevin",
    "0891d150327b691a484a35740be5b451381557c24633205e4be0587985611f17": "Marie",
    "642f6c8b44246bba1ea98846cc596040315e92ab1f4a4ac5b07878d26c4c7cc3": "Antoine",
    "73ad26c72d7a2d8760e7e2a87096bfd132a0d09889af4e4a1297a75424f6a30b": "Chiara",
    "153374da11bc8d1e1626781ab0923c2568e7360ee68b1b8f492585b9b3778a34": "MKZ",
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

  // ----- dérivation lente PBKDF2 : un code saisi -> son empreinte hex -----
  // Le sel est public (normal pour PBKDF2) ; c'est le coût (150k itérations)
  // qui rend toute attaque par dictionnaire/force-brute très lente.
  const GATE_SALT = "lenny-gate-2026-7Qz!salt";
  const GATE_ITER = 150000;
  async function derive(code) {
    const e = new TextEncoder();
    const km = await crypto.subtle.importKey("raw", e.encode(norm(code)), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: e.encode(GATE_SALT), iterations: GATE_ITER, hash: "SHA-256" }, km, 256);
    return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Outil de maintenance (console) : await LennyGateHash("NOUVEAU-CODE")
  window.LennyGateHash = async (c) => { const h = await derive(c); console.log(c, "→", h); return h; };

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

  function unlock(label, code, hash) {
    const gate = document.getElementById("lenny-gate");
    if (gate) gate.classList.add("hidden");
    applyWatermark(label);
    document.documentElement.style.overflow = "";
    const name = ((hash && NAME_HASHES[hash]) || label || "").replace(/\s*·\s*admin/i, "");
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

  // Joue le « reveal » scroll-expand par-dessus l'app révélée.
  // Renvoie un contrôleur { start } : monté gelé, on appelle start() APRÈS
  // la reconstruction de l'app (le scroll-expand devient alors interactif).
  function playIntro(sound) {
    try {
      if (window.LennyReveal && window.LennyReveal.play) {
        return window.LennyReveal.play({ manualStart: true });
      }
    } catch (e) {}
    return null;
  }

  // Purge l'ancien stockage permanent (versions pr\u00e9c\u00e9dentes) -> force la reconnexion.
  try { localStorage.removeItem(LS_KEY); } catch (e) {}

  // Already unlocked? (same session / same tab only)
  try {
    const saved = JSON.parse(store.getItem(LS_KEY) || "null");
    if (saved && saved.code && !isExpired(saved)) {
      // hide gate ASAP to avoid flash
      document.documentElement.style.setProperty("--gate-skip", "1");
      ready(() => {
        // Au rechargement d'une session déjà ouverte : pas de reveal (il ne joue
        // qu'à la vraie saisie du code), on révèle directement l'app.
        var introCtrl = null;
        afterPaint(function () {
          // Revalide l'empreinte du code mémorisé, puis le verrou mono-appareil.
          derive(saved.code).then(function (h) {
            const label = CODE_HASHES[h];
            if (!label) { try { store.removeItem(LS_KEY); } catch (e) {} location.reload(); return; }
            claimSession(saved.code).then(function (res) {
              if (!res.ok) {
                // code repris ailleurs (autre IP) → on n'ouvre pas : retour au portail
                try { store.removeItem(LS_KEY); } catch (e) {}
                location.reload();
                return;
              }
              unlock(label, saved.code, h);
              afterPaint(function () { if (introCtrl && introCtrl.start) introCtrl.start(); });
            });
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

    // ----- anti-force-brute : blocage progressif après 5 codes erronés -----
    const THROTTLE_KEY = "lenny-gate-try";
    function loadThrottle() {
      try { return JSON.parse(store.getItem(THROTTLE_KEY) || "null") || { fails: 0, until: 0 }; }
      catch (e) { return { fails: 0, until: 0 }; }
    }
    function saveThrottle(t) { try { store.setItem(THROTTLE_KEY, JSON.stringify(t)); } catch (e) {} }
    function lockLeft() { const t = loadThrottle(); return Math.max(0, Math.ceil((t.until - Date.now()) / 1000)); }
    function registerFail() {
      const t = loadThrottle();
      t.fails = (t.fails || 0) + 1;
      // à partir de la 5e erreur : 15 s, 30 s, 45 s … plafonné à 5 min.
      if (t.fails >= 5) t.until = Date.now() + Math.min(300, (t.fails - 4) * 15) * 1000;
      saveThrottle(t);
    }
    function clearThrottle() { saveThrottle({ fails: 0, until: 0 }); }

    let busy = false;
    // Renvoie true si l'accès est accordé, false sinon (permet au curseur
    // « glisser pour entrer » de revenir en arrière en cas d'échec).
    async function tryUnlock() {
      if (busy) return false;
      const wait = lockLeft();
      if (wait > 0) { showErr("Trop de tentatives. Réessaie dans " + wait + " s."); return false; }
      const code = norm(input.value);
      busy = true; setLoading(true);
      if (msg) msg.textContent = "";
      let h;
      try { h = await derive(code); }
      catch (e) { setLoading(false); busy = false; showErr("Connexion sécurisée indisponible (HTTPS requis)."); return false; }
      const label = CODE_HASHES[h];
      if (!label) {
        setLoading(false); busy = false;
        registerFail();
        const left = lockLeft();
        showErr(left > 0 ? ("Trop de tentatives. Réessaie dans " + left + " s.") : "Code invalide. Vérifie auprès de Lenny.");
        return false;
      }
      const res = await claimSession(code);
      setLoading(false); busy = false;
      if (!res.ok) {
        if (res.reason === "in_use") showErr("Ce code est déjà connecté sur un autre appareil.");
        else showErr("Connexion impossible. Réessaie dans un instant.");
        return false;
      }
      // succès : on remet le compteur à zéro, on mémorise la session et on ouvre
      clearThrottle();
      try { store.setItem(LS_KEY, JSON.stringify({ code, t: Date.now() })); } catch (e) {}
      if (msg) { msg.classList.add("ok"); msg.textContent = "Accès accordé"; }
      const gate = document.getElementById("lenny-gate");
      if (gate) gate.classList.add("ok");
      var introCtrl = playIntro(true);
      afterPaint(function () {
        unlock(label, code, h);
        afterPaint(function () { if (introCtrl && introCtrl.start) introCtrl.start(); });
      });
      return true;
    }
    // Déverrouillage UNIQUEMENT via la flèche « glisser pour entrer ».
    // Le bouton est masqué et la touche Entrée ne valide plus : elle se contente
    // de fermer le clavier pour laisser place au geste de glissement.
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); input.blur(); } });

    /* ----- Glisser pour entrer : remplace le clic, actif une fois le code saisi ----- */
    (function setupSlide() {
      const slide = document.createElement("div");
      slide.className = "gate-slide";
      slide.innerHTML =
        '<div class="gate-slide-track">' +
          '<span class="gate-slide-fill" aria-hidden="true"></span>' +
          '<span class="gate-slide-label"></span>' +
          '<button type="button" class="gate-slide-knob" aria-label="Glisser pour entrer">' +
            '<span class="gate-slide-spin" aria-hidden="true"></span>' +
            '<svg class="gate-slide-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5"/></svg>' +
          '</button>' +
        '</div>';
      btn.style.display = "none";
      btn.parentNode.insertBefore(slide, btn.nextSibling);

      const track = slide.querySelector(".gate-slide-track");
      const knob = slide.querySelector(".gate-slide-knob");
      const fill = slide.querySelector(".gate-slide-fill");
      const label = slide.querySelector(".gate-slide-label");
      let val = 0, dragging = false, startX = 0, done = false;

      function maxTravel() { return Math.max(0, track.clientWidth - knob.offsetWidth - 8); }
      function ready() { return (input.value || "").trim().length > 0; }
      function refresh() {
        const r = ready();
        slide.classList.toggle("ready", r);
        label.textContent = r ? "Glissez pour entrer" : "Saisissez votre code";
      }
      function place(px) {
        const m = maxTravel();
        const v = Math.max(0, Math.min(px, m));
        val = m ? v / m : 0;
        knob.style.transform = "translateX(" + v + "px)";
        fill.style.width = (v + knob.offsetWidth + 4) + "px";
        slide.classList.toggle("armed", val > 0.04);
      }
      function reset(anim) {
        if (anim) knob.style.transition = "transform .32s cubic-bezier(.22,.61,.36,1)";
        place(0);
        if (anim) setTimeout(() => { knob.style.transition = ""; }, 340);
      }
      async function commit() {
        done = true;
        place(maxTravel());
        slide.classList.add("loading");
        const ok = await tryUnlock();
        if (!ok) { slide.classList.remove("loading"); done = false; reset(true); }
      }
      function shake() {
        if (field) { field.classList.add("err"); setTimeout(() => field.classList.remove("err"), 460); }
        input.focus();
      }
      function onDown(e) {
        if (done || slide.classList.contains("loading")) return;
        if (!ready()) { shake(); return; }
        dragging = true;
        knob.style.transition = "";
        startX = e.clientX - val * maxTravel();
        try { knob.setPointerCapture(e.pointerId); } catch (err) {}
      }
      function onMove(e) { if (!dragging) return; e.preventDefault(); place(e.clientX - startX); }
      function onUp() { if (!dragging) return; dragging = false; if (val >= 0.9) commit(); else reset(true); }
      knob.addEventListener("pointerdown", onDown);
      knob.addEventListener("pointermove", onMove);
      knob.addEventListener("pointerup", onUp);
      knob.addEventListener("pointercancel", onUp);
      knob.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && !done) {
          e.preventDefault();
          if (ready()) commit(); else shake();
        }
      });
      input.addEventListener("input", refresh);
      window.addEventListener("resize", () => place(val * maxTravel()));
      refresh();
    })();

    input.focus();
  });
})();
