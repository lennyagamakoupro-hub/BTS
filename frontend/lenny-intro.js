/* ============================================
   LENNY — Intro « L » (contrôleur + stinger audio original)
   window.LennyIntro.play({ sound:true }) -> Promise (résolue à la fin / au skip)
   Le stinger est une création originale (≠ son de marque tiers).
   ============================================ */
(function () {
  var RIBBONS = 20;
  var DURATION = 2900; // ms avant le rapprochement final
  var played = false;

  // Rouges proches pour un rideau qui se résout proprement en L plein
  var REDS = ["#c20712", "#e50914", "#ff2330", "#d40813", "#e50914", "#ff3a46", "#b8060f", "#ec1521"];

  function buildStage(opts) {
    var stage = document.createElement("div");
    stage.className = "li-stage";
    stage.setAttribute("role", "img");
    stage.setAttribute("aria-label", "LENNY");

    var wrap = document.createElement("div");
    wrap.className = "li-wrap";

    var L = document.createElement("div");
    L.className = "li-L";

    var ribbons = document.createElement("div");
    ribbons.className = "li-ribbons";
    for (var i = 0; i < RIBBONS; i++) {
      var r = document.createElement("div");
      r.className = "li-ribbon";
      var c = REDS[i % REDS.length];
      r.style.background = "linear-gradient(180deg, " + c + " 0%, " + shade(c, -22) + " 100%)";
      // stagger : déploiement de gauche à droite
      r.style.animationDelay = (0.04 + i * 0.028).toFixed(3) + "s";
      ribbons.appendChild(r);
    }

    var solid = document.createElement("div");
    solid.className = "li-solid";

    var sheen = document.createElement("div");
    sheen.className = "li-sheen";

    L.appendChild(ribbons);
    L.appendChild(solid);
    L.appendChild(sheen);

    wrap.appendChild(L);
    stage.appendChild(wrap);

    var skip = document.createElement("button");
    skip.className = "li-skip";
    skip.type = "button";
    skip.textContent = "Passer ›";
    stage.appendChild(skip);

    return { stage: stage, skip: skip };
  }

  // éclaircit/assombrit une couleur hex
  function shade(hex, pct) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    var f = pct / 100;
    r = Math.round(Math.min(255, Math.max(0, r + 255 * f)));
    g = Math.round(Math.min(255, Math.max(0, g + 255 * f)));
    b = Math.round(Math.min(255, Math.max(0, b + 255 * f)));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // ---- Stinger audio original (deux frappes + sub) ----
  function playStinger(ctx) {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try { ctx = new AC(); } catch (e) { return; }
    }
    if (ctx.state === "suspended" && ctx.resume) { try { ctx.resume(); } catch (e) {} }
    var t0 = ctx.currentTime + 0.02;

    var master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    master.gain.setValueAtTime(0.28, t0);

    // léger filtre passe-bas pour un grain chaleureux
    var lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2200, t0);
    lp.connect(master);

    function hit(time, freq, dur, peak, type) {
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = type || "triangle";
      o.frequency.setValueAtTime(freq, time);
      o.frequency.exponentialRampToValueAtTime(freq * 0.94, time + dur);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(peak, time + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      o.connect(g); g.connect(lp);
      o.start(time); o.stop(time + dur + 0.05);
    }
    function sub(time, freq, dur, peak) {
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq, time);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(peak, time + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      o.connect(g); g.connect(master);
      o.start(time); o.stop(time + dur + 0.05);
    }

    // « ta » bref puis « dum » plein, avec sub dessous — stinger LENNY
    hit(t0,        174.6, 0.16, 0.5, "triangle");      // F3 court
    sub(t0,        58.27, 0.20, 0.5);                  // sub
    hit(t0 + 0.17, 116.5, 0.55, 0.65, "sawtooth");     // A#2 tenu
    hit(t0 + 0.17, 233.1, 0.5,  0.22, "triangle");     // harmonique
    sub(t0 + 0.17, 38.89, 0.6,  0.7);                  // gros sub final

    setTimeout(function () { try { ctx.close(); } catch (e) {} }, 1600);
  }

  function play(opts) {
    opts = opts || {};
    if (played && !opts.force) return Promise.resolve();
    played = true;

    var built = buildStage(opts);
    var stage = built.stage;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var total = reduce ? 1100 : DURATION;

    // En mode « armé », les animations sont gelées jusqu'à start() : l'écran
    // noir + L caché s'affichent pendant que l'app se reconstruit, puis
    // l'animation joue à pleine vitesse (plus de L qui « saute » / passe trop vite).
    var armed = opts.manualStart && !reduce;
    if (armed) stage.classList.add("li-armed");
    document.body.appendChild(stage);

    var done = false;
    var resolveFn;
    var p = new Promise(function (res) { resolveFn = res; });

    function finish() {
      if (done) return;
      done = true;
      // rapprochement rapide : la lettre fonce vers nous et disparaît
      var L = stage.querySelector(".li-L");
      if (L && !reduce) L.classList.add("li-zoom");
      // le fond s'efface en même temps pour révéler l'app derrière
      setTimeout(function () { stage.classList.add("li-out"); }, reduce ? 0 : 180);
      setTimeout(function () {
        if (stage.parentNode) stage.parentNode.removeChild(stage);
        resolveFn();
      }, reduce ? 400 : 760);
    }

    // AudioContext créé tout de suite (au plus près du geste utilisateur),
    // mais le stinger ne sonne qu'au démarrage réel de l'animation.
    var actx = null;
    if (opts.sound && !reduce) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) { try { actx = new AC(); if (actx.resume) actx.resume(); } catch (e) { actx = null; } }
    }

    var started = false;
    var endTimer = null;

    function start() {
      if (started) return;
      started = true;
      stage.classList.remove("li-armed");   // libère les animations (repartent de 0, sync)
      if (actx) setTimeout(function () { playStinger(actx); }, 1040);
      endTimer = setTimeout(finish, total);
    }

    function skipNow() {
      if (!started) start();
      if (endTimer) clearTimeout(endTimer);
      finish();
    }
    built.skip.addEventListener("click", function (e) { e.stopPropagation(); skipNow(); });
    stage.addEventListener("click", skipNow);
    window.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        window.removeEventListener("keydown", onKey);
        skipNow();
      }
    });

    // Démarrage : immédiat si non-armé ; sinon l'appelant lance ctrl.start()
    // une fois la reconstruction de l'app terminée.
    if (!armed) start();

    return { promise: p, start: start, stage: stage };
  }

  window.LennyIntro = { play: play };
})();
