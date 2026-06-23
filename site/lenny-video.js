/* ============================================
   LENNY — Lecteur vidéo plein écran (façon Netflix)
   Une vidéo rattachée à un module. Lecture, reprise auto,
   position mémorisée. Depends on: LENNY_MODULES (lenny-app.js)
   ============================================ */

// Vidéos rattachées aux modules correspondants
window.LENNY_VIDEOS = {
  // Mandats & Dossier → le mandat de vente
  m8: {
    src: "media/mandat-de-vente.mp4",
    title: "Le Mandat de Vente",
    kicker: "Vidéo · Module 8",
    desc: "Le contrat clé de l'agent : mandat simple, exclusif ou semi-exclusif, les mentions obligatoires (loi Hoguet), le registre des mandats et la constitution du dossier vendeur.",
    duration: "12 min",
  },
  // Viager & Démembrement → vendre/acheter en viager et démembrer la propriété
  m6b: {
    src: "media/viager-demembrement.mp4",
    title: "Viager & Démembrement",
    kicker: "Vidéo · Module 6½",
    desc: "Crédirentier et débirentier, bouquet et rente, aléa, viager occupé ou libre, et le démembrement usufruit / nue-propriété (barème fiscal CGI art. 669).",
    duration: "10 min",
  },
  // Estimation & Avis de Valeur → méthodes d'estimation d'un bien
  m6: {
    src: "media/estimation-immobiliere.mp4",
    title: "Estimation Immobilière",
    kicker: "Vidéo · Module 6",
    desc: "Estimer juste : méthode par comparaison, par le revenu et par sol + construction, choix des références, décote/surcote et rédaction de l'avis de valeur.",
    duration: "12 min",
  },
  // Diagnostics Immobiliers → décryptage du Dossier de Diagnostic Technique (DDT)
  m5: {
    src: "media/decryptage-ddt.mp4",
    title: "Décryptage du DDT",
    kicker: "Vidéo · Module 5",
    desc: "Le Dossier de Diagnostic Technique au complet : DPE, amiante, plomb, termites, gaz, électricité, ERP… quels diagnostics, quand, leur durée de validité et leur portée juridique.",
    duration: "10 min",
  },
  // Objectifs & Ratios → piloter son activité par les chiffres
  m4: {
    src: "media/objectifs-ratios.mp4",
    title: "Objectifs & Ratios",
    kicker: "Vidéo · Module 4",
    desc: "Piloter son activité par les chiffres : objectifs de mandats et de ventes, taux de transformation, ratios RDV → estimation → mandat → vente. La méthode pour ne rien laisser au hasard.",
    duration: "8 min",
  },
  // Prospection → la « machine à mandats » : générer et transformer les contacts
  m3: {
    src: "media/machine-a-mandats.mp4",
    title: "La Machine à Mandats",
    kicker: "Vidéo · Module 3",
    desc: "Construire sa machine à prospecter : sources de contacts, méthode et régularité, transformation des prises de contact en rendez-vous puis en mandats. Le moteur du chiffre d'affaires.",
    duration: "12 min",
  },
  // Entreprises & Statuts → formes juridiques, statuts et cartes professionnelles
  m2: {
    src: "media/entreprises-statuts.mp4",
    title: "Entreprises & Statuts",
    kicker: "Vidéo · Module 2",
    desc: "Les formes juridiques (EI · EURL · SARL · SAS · SASU), responsabilités, régimes fiscaux et les statuts du conseiller immobilier. Le squelette de toute entreprise.",
    duration: "12 min",
  },
  // Accueil & Découverte → la vidéo d'introduction au métier
  m1: {
    src: "media/accueil-decouverte.mp4",
    title: "Accueil & Découverte",
    kicker: "Vidéo · Module 1",
    desc: "Le premier contact : posture, règle des 4×20, écoute active et découverte des besoins (SONCAS·E). Les fondations du métier d'agent.",
    duration: "8 min",
  },
  // Réglementation environnementale & valeur verte → Guide Pratique : Bâti & Climat
  mvert: {
    src: "media/guide-bati-climat.mp4",
    title: "Guide Pratique : Bâti & Climat",
    kicker: "Vidéo · Réglementation environnementale",
    desc: "Risques climatiques du bâti, état des risques (inondation, mouvements de terrain, RGA, sols pollués) et leviers de la valeur verte.",
    duration: "8 min",
    poster: "media/poster-bati-climat.png",
  },
  // Financement immobilier → Masterclass investissement (cas de Versailles)
  m11: {
    src: "media/masterclass-versaillis.mp4",
    title: "Masterclass Versaillis",
    kicker: "Vidéo · Stratégie d'investissement",
    desc: "Le cas de Versailles : stratégie d'arbitrage, financement, choix du locataire et méthode R.E.S.P.E.C.T.",
    duration: "6 min",
    poster: "media/poster-versaillis.png",
  },
};

(function () {
  const POS_KEY = (id) => "lenny-video-pos-" + id;

  function has(modId) {
    return !!(window.LENNY_VIDEOS && window.LENNY_VIDEOS[modId]);
  }

  function fmt(t) {
    if (!isFinite(t) || t < 0) t = 0;
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  function build() {
    if (document.getElementById("lv")) return;
    const el = document.createElement("div");
    el.id = "lv";
    el.className = "lv";
    el.innerHTML = `
      <div class="lv-stage" id="lv-stage">
        <video class="lv-video" id="lv-video" playsinline preload="auto"></video>
      </div>

      <div class="lv-scrim lv-scrim-top"></div>
      <div class="lv-scrim lv-scrim-bottom"></div>

      <div class="lv-top">
        <button class="lv-close" id="lv-close" title="Quitter (Échap)">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><polyline points="11,3 5,9 11,15"/></svg>
          <span>Retour</span>
        </button>
        <div class="lv-head">
          <div class="lv-eyebrow"><span class="L">L</span> · VIDÉO<span class="lv-dot"></span><span id="lv-modlabel">Module</span></div>
          <div class="lv-title" id="lv-title">…</div>
        </div>
      </div>

      <button class="lv-bigplay" id="lv-bigplay" aria-label="Lecture">
        <svg viewBox="0 0 28 28" fill="currentColor"><path d="M7 4 L23 14 L7 24 Z"/></svg>
      </button>

      <div class="lv-loading-overlay" id="lv-loading" aria-live="polite">
        <div class="lv-spinner" aria-hidden="true"></div>
        <div class="lv-loading-tx">Préparation de la vidéo… <span id="lv-loadpct">0 %</span></div>
        <div class="lv-loading-sub">Le téléchargement complet rend l'avance et le retour instantanés.</div>
      </div>

      <div class="lv-controls" id="lv-controls">
        <div class="lv-bar" id="lv-bar">
          <div class="lv-bar-buffered" id="lv-buffered"></div>
          <div class="lv-bar-fill" id="lv-fill"></div>
          <div class="lv-bar-knob" id="lv-knob"></div>
        </div>
        <div class="lv-ctl-row">
          <div class="lv-ctl-left">
            <button class="lv-ic" id="lv-play" aria-label="Lecture / Pause">
              <svg class="ic-play" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3 L16 10 L5 17 Z"/></svg>
              <svg class="ic-pause" viewBox="0 0 20 20" fill="currentColor"><rect x="4.5" y="3.5" width="4" height="13" rx="1"/><rect x="11.5" y="3.5" width="4" height="13" rx="1"/></svg>
            </button>
            <button class="lv-ic" id="lv-back10" aria-label="Reculer de 10 s" title="−10 s">
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 A6.5 6.5 0 1 0 17.2 9.2"/><polyline points="11,2 8,5 11,8"/></svg>
              <span class="lv-ic-n">10</span>
            </button>
            <button class="lv-ic" id="lv-fwd10" aria-label="Avancer de 10 s" title="+10 s">
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 A6.5 6.5 0 1 1 4.8 9.2"/><polyline points="11,2 14,5 11,8"/></svg>
              <span class="lv-ic-n">10</span>
            </button>
            <button class="lv-ic" id="lv-mute" aria-label="Couper le son">
              <svg class="ic-vol" viewBox="0 0 22 22" fill="currentColor"><path d="M4 8 H7 L11 4 V18 L7 14 H4 Z"/><path d="M14 7 a5 5 0 0 1 0 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16.5 5 a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              <svg class="ic-mute" viewBox="0 0 22 22" fill="currentColor"><path d="M4 8 H7 L11 4 V18 L7 14 H4 Z"/><line x1="14" y1="8" x2="19" y2="14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><line x1="19" y1="8" x2="14" y2="14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            </button>
            <div class="lv-time"><span id="lv-cur">0:00</span> <span class="lv-time-sep">/</span> <span id="lv-dur">0:00</span></div>
          </div>
          <div class="lv-ctl-right">
            <div class="lv-now" id="lv-now">…</div>
            <button class="lv-ic lv-speed" id="lv-speed" aria-label="Vitesse de lecture" title="Vitesse de lecture"><span id="lv-speed-tx">1×</span></button>
            <button class="lv-ic" id="lv-full" aria-label="Plein écran">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,7 3,3 7,3"/><polyline points="13,3 17,3 17,7"/><polyline points="17,13 17,17 13,17"/><polyline points="7,17 3,17 3,13"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    wire();
  }

  const S = { modId: null, video: null, hideTimer: null, dragging: false, rate: 1, blobUrl: null, seekFull: false, loadToken: 0 };

  const SPEEDS = [1, 1.25, 1.5, 1.75, 2];
  const RATE_KEY = "lenny-video-rate";
  function applyRate(r) {
    S.rate = r;
    if (S.video) S.video.playbackRate = r;
    const tx = document.getElementById("lv-speed-tx");
    if (tx) tx.textContent = (Number.isInteger(r) ? r : r) + "\u00d7";
    const btn = document.getElementById("lv-speed");
    if (btn) btn.classList.toggle("active", r !== 1);
    try { localStorage.setItem(RATE_KEY, String(r)); } catch (e) {}
  }
  function cycleSpeed() {
    const i = SPEEDS.indexOf(S.rate);
    applyRate(SPEEDS[(i + 1) % SPEEDS.length]);
    pokeControls();
  }

  // Seek robuste. Quand le fichier complet est chargé (Blob), la vidéo est
  // entièrement navigable et on ne borne qu'aux extrémités. Sinon (lecture en
  // streaming sur un hôte sans support des requêtes Range), on borne la cible à
  // la zone réellement téléchargée (buffered) — sinon le navigateur retombe à 0.
  function safeSeek(target) {
    const v = S.video;
    if (!v || !isFinite(v.duration)) return;
    let t = Math.max(0, Math.min(v.duration, target));
    if (!S.seekFull) {
      const bf = v.buffered;
      if (bf && bf.length) {
        const end = bf.end(bf.length - 1);
        if (t > end - 0.3) t = Math.max(0, end - 0.3);
      } else {
        t = 0;
      }
    }
    try { v.currentTime = t; } catch (e) {}
  }

  function wire() {
    const v = document.getElementById("lv-video");
    S.video = v;
    const el = document.getElementById("lv");

    document.getElementById("lv-close").addEventListener("click", close);
    document.getElementById("lv-play").addEventListener("click", togglePlay);
    document.getElementById("lv-bigplay").addEventListener("click", togglePlay);
    document.getElementById("lv-stage").addEventListener("click", (e) => {
      if (e.target === v || e.target.id === "lv-stage") togglePlay();
    });
    document.getElementById("lv-back10").addEventListener("click", () => { safeSeek(v.currentTime - 10); pokeControls(); });
    document.getElementById("lv-fwd10").addEventListener("click", () => { safeSeek(v.currentTime + 10); pokeControls(); });
    document.getElementById("lv-mute").addEventListener("click", () => { v.muted = !v.muted; reflectMute(); pokeControls(); });
    document.getElementById("lv-speed").addEventListener("click", cycleSpeed);
    document.getElementById("lv-full").addEventListener("click", toggleFull);

    // progress bar
    const bar = document.getElementById("lv-bar");
    const seekTo = (clientX) => {
      const r = bar.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      if (isFinite(v.duration)) safeSeek(p * v.duration);
      paintBar();
    };
    bar.addEventListener("pointerdown", (e) => { S.dragging = true; bar.setPointerCapture(e.pointerId); seekTo(e.clientX); });
    bar.addEventListener("pointermove", (e) => { if (S.dragging) seekTo(e.clientX); });
    bar.addEventListener("pointerup", () => { S.dragging = false; });

    // garde la barre navigable : suit l'avancement du téléchargement
    v.addEventListener("canplay", paintBuffered);
    v.addEventListener("loadeddata", paintBuffered);

    // video events
    v.addEventListener("timeupdate", () => { paintBar(); savePos(); });
    v.addEventListener("progress", paintBuffered);
    v.addEventListener("loadedmetadata", () => { document.getElementById("lv-dur").textContent = fmt(v.duration); paintBar(); });
    v.addEventListener("play", () => { reflectPlay(); pokeControls(); });
    v.addEventListener("pause", () => { reflectPlay(); showControls(); });
    v.addEventListener("ended", () => { reflectPlay(); showControls(); clearPos(); });

    // auto-hide controls on idle while playing
    el.addEventListener("mousemove", pokeControls);
    el.addEventListener("touchstart", pokeControls, { passive: true });

    // keyboard
    document.addEventListener("keydown", (e) => {
      if (!el.classList.contains("open")) return;
      switch (e.key) {
        case "Escape": e.preventDefault(); close(); break;
        case " ": case "k": e.preventDefault(); togglePlay(); break;
        case "ArrowLeft": e.preventDefault(); safeSeek(v.currentTime - 5); pokeControls(); break;
        case "ArrowRight": e.preventDefault(); safeSeek(v.currentTime + 5); pokeControls(); break;
        case "m": e.preventDefault(); v.muted = !v.muted; reflectMute(); break;
        case "f": e.preventDefault(); toggleFull(); break;
        case ">": case ".": e.preventDefault(); { const i = SPEEDS.indexOf(S.rate); applyRate(SPEEDS[Math.min(SPEEDS.length - 1, i + 1)]); pokeControls(); } break;
        case "<": case ",": e.preventDefault(); { const i = SPEEDS.indexOf(S.rate); applyRate(SPEEDS[Math.max(0, i - 1)]); pokeControls(); } break;
      }
    });
  }

  function paintBar() {
    const v = S.video;
    const p = isFinite(v.duration) && v.duration ? (v.currentTime / v.duration) * 100 : 0;
    document.getElementById("lv-fill").style.width = p + "%";
    document.getElementById("lv-knob").style.left = p + "%";
    document.getElementById("lv-cur").textContent = fmt(v.currentTime);
  }
  function paintBuffered() {
    const v = S.video;
    if (!v.buffered || !v.buffered.length || !isFinite(v.duration)) return;
    const end = v.buffered.end(v.buffered.length - 1);
    document.getElementById("lv-buffered").style.width = (end / v.duration * 100) + "%";
  }
  function reflectPlay() {
    const playing = !S.video.paused && !S.video.ended;
    document.getElementById("lv").classList.toggle("playing", playing);
  }
  function reflectMute() {
    document.getElementById("lv").classList.toggle("muted", S.video.muted);
  }
  function togglePlay() {
    const v = S.video;
    if (v.paused) v.play().catch(() => {}); else v.pause();
  }
  function toggleFull() {
    const el = document.getElementById("lv");
    const v = S.video;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) {
      (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
      return;
    }
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) {
      let p;
      try { p = req.call(el); } catch (e) { p = null; }
      // Repli iOS Safari : plein écran natif de l'élément <video>
      if (p && p.catch) p.catch(() => { if (v && v.webkitEnterFullscreen) { try { v.webkitEnterFullscreen(); } catch (e) {} } });
    } else if (v && v.webkitEnterFullscreen) {
      try { v.webkitEnterFullscreen(); } catch (e) {}
    }
  }

  function showControls() {
    document.getElementById("lv").classList.add("show-ctl");
    if (S.hideTimer) { clearTimeout(S.hideTimer); S.hideTimer = null; }
  }
  function pokeControls() {
    showControls();
    if (S.video.paused) return;
    S.hideTimer = setTimeout(() => {
      document.getElementById("lv").classList.remove("show-ctl");
    }, 2600);
  }

  function savePos() {
    if (!S.modId || !isFinite(S.video.duration)) return;
    try { localStorage.setItem(POS_KEY(S.modId), String(S.video.currentTime)); } catch (e) {}
  }
  function clearPos() {
    if (!S.modId) return;
    try { localStorage.removeItem(POS_KEY(S.modId)); } catch (e) {}
  }
  function readPos(modId) {
    try { const v = parseFloat(localStorage.getItem(POS_KEY(modId))); return isFinite(v) ? v : 0; } catch (e) { return 0; }
  }

  function setLoadProgress(p) {
    const el = document.getElementById("lv-loadpct");
    if (el) el.textContent = (p == null ? "" : Math.round(p * 100) + "\u00a0%");
  }

  // Télécharge le fichier en suivant la progression (renvoie un Blob).
  async function fetchWithProgress(url, onProgress) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const total = +(resp.headers.get("content-length") || 0);
    if (!resp.body || !total || !resp.body.getReader) {
      onProgress && onProgress(null);
      return await resp.blob();
    }
    const reader = resp.body.getReader();
    const chunks = [];
    let received = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      onProgress && onProgress(received / total);
    }
    return new Blob(chunks, { type: resp.headers.get("content-type") || "video/mp4" });
  }

  // Charge la vidéo : on récupère d'abord le fichier complet (Blob) pour une
  // navigation 100 % fiable, même si l'hôte ne gère pas les requêtes Range.
  function loadVideo(meta, modId) {
    const v = S.video;
    const el = document.getElementById("lv");
    const token = ++S.loadToken;

    if (S.blobUrl) { try { URL.revokeObjectURL(S.blobUrl); } catch (e) {} S.blobUrl = null; }
    S.seekFull = false;
    el.classList.add("lv-loading");
    setLoadProgress(0);

    const resume = readPos(modId);
    const startPlayback = (seekable) => {
      if (token !== S.loadToken) return;
      el.classList.remove("lv-loading");
      v.addEventListener("loadedmetadata", function once() {
        v.removeEventListener("loadedmetadata", once);
        v.playbackRate = S.rate;
        if (seekable && resume > 2 && resume < v.duration - 5) { try { v.currentTime = resume; } catch (e) {} }
        v.play().catch(() => { /* autoplay bloqué — le gros bouton lecture reste */ });
      });
      v.load();
    };

    fetchWithProgress(meta.src, (p) => { if (token === S.loadToken) setLoadProgress(p); })
      .then((blob) => {
        if (token !== S.loadToken) return;            // l'utilisateur a changé / fermé
        S.blobUrl = URL.createObjectURL(blob);
        S.seekFull = true;                            // navigation totale débloquée
        v.src = S.blobUrl;
        startPlayback(true);
      })
      .catch(() => {
        if (token !== S.loadToken) return;
        // repli : lecture en streaming (avance limitée à la zone téléchargée)
        S.seekFull = false;
        v.src = meta.src;
        startPlayback(false);
      });
  }

  function open(modId) {
    const meta = window.LENNY_VIDEOS && window.LENNY_VIDEOS[modId];
    if (!meta) return;
    build();
    S.modId = modId;
    const mods = (typeof LENNY_MODULES !== "undefined") ? LENNY_MODULES : (window.LENNY_MODULES || []);
    const mod = mods.find(m => m.id === modId) || {};

    document.getElementById("lv-title").textContent = meta.title;
    document.getElementById("lv-now").textContent = meta.title;
    document.getElementById("lv-modlabel").textContent = (mod.tag ? mod.tag + " · " : "") + (mod.short || (meta.kicker || "").replace(/^vid[ée]o\s*·\s*/i, ""));

    const v = S.video;
    if (meta.poster) v.poster = meta.poster;
    v.muted = false; reflectMute();
    // restaure la vitesse choisie (les navigateurs la réinitialisent au changement de src)
    try { const r = parseFloat(localStorage.getItem(RATE_KEY)); applyRate(SPEEDS.includes(r) ? r : 1); } catch (e) { applyRate(1); }

    const el = document.getElementById("lv");
    el.classList.add("open");
    document.body.style.overflow = "hidden";

    loadVideo(meta, modId);
    showControls();
  }

  function close() {
    const el = document.getElementById("lv");
    if (!el) return;
    savePos();
    S.loadToken++;                       // annule un téléchargement en cours
    try { S.video.pause(); } catch (e) {}
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) { try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
    el.classList.remove("open", "lv-loading");
    document.body.style.overflow = "";
    // free the buffer
    setTimeout(() => {
      if (!el.classList.contains("open")) {
        S.video.removeAttribute("src"); S.video.load();
        if (S.blobUrl) { try { URL.revokeObjectURL(S.blobUrl); } catch (e) {} S.blobUrl = null; }
        S.seekFull = false;
      }
    }, 400);
    if (window.LennySplash) window.LennySplash(900);
  }

  window.LennyVideo = { open, close, has };
})();
