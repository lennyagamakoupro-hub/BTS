/* ============================================================
   LENNY — Reveal (après déverrouillage)
   Fond animé WebGL (shader « nuages cosmiques ») plein écran,
   sans texte. On fait glisser (molette / doigt) pour révéler le
   bouton « Entrer » (liquid glass), puis on entre sur le site.

   Contrat identique à l'ancienne intro :
     LennyReveal.play({ manualStart }) -> { start, promise, stage }
   ============================================================ */
(function () {
  "use strict";

  var played = false;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function play(opts) {
    opts = opts || {};
    if (played && !opts.force) return null;
    played = true;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var stage = el("div", "lr-stage");
    stage.setAttribute("role", "dialog");
    stage.setAttribute("aria-label", "Bienvenue sur LENNY");

    /* 25/09 — LE TRAIN REMPLACE LES FUSÉES.
       Lenny : « tu le mets à la place de l'ancien écran de chargement, celui
       qui arrivait juste après, avec le fond jaune — tu remplaces par le
       train ». Le mécanisme ne change pas d'un pouce : c'est toujours la
       molette qui fait avancer `progress` de 0 à 1. Ce qui change, c'est ce
       que progress commande — avant un shader qui se rapprochait, maintenant
       les portes du métro qui s'ouvrent, image par image.

       Le composant d'origine (Skiper / « The City Opens ») verrouillait le
       défilement lui-même ; inutile ici, cet écran le verrouille DÉJÀ. On ne
       garde que ce qui manquait : la vidéo pilotée par le geste. */
    var bg = el("div", "lr-bg");
    var film = document.createElement("video");
    film.className = "lr-film";
    film.muted = true; film.playsInline = true; film.preload = "auto";
    film.setAttribute("muted", ""); film.setAttribute("playsinline", "");
    film.poster = "videos-fond/ville.jpg";
    var adresseFilm = (window.matchMedia && window.matchMedia("(max-width: 860px)").matches)
      ? "videos-fond/ville-mobile.mp4" : "videos-fond/ville.mp4";
    bg.appendChild(film);

    /* 25/09 — LE FILM EST CHARGÉ EN MÉMOIRE AVANT D'ÊTRE DÉFILÉ, et c'est la
       seule chose qui rend le geste fluide.
       Tant que la vidéo vient d'une adresse, chaque déplacement déclenche une
       requête réseau pour aller chercher le bon morceau ; sur le Mac de Lenny
       la boucle tombait à quatre images par seconde et il a écrit « ça fait
       comme de la latence ». En téléchargeant le fichier entier d'abord et en
       le servant depuis la mémoire, un déplacement ne coûte plus qu'un
       décodage — sans aller-retour.
       C'est la technique des vrais défilements vidéo, et elle tient ici parce
       que le film fait moins de quatre mégaoctets.
       Si le téléchargement échoue, on retombe sur l'adresse normale : un écran
       d'accueil ne doit jamais rester noir. */
    var adresseMemoire = null;
    film.src = adresseFilm;
    try {
      fetch(adresseFilm).then(function (r) { return r.ok ? r.blob() : null; }).then(function (blob) {
        if (!blob || done) return;
        adresseMemoire = URL.createObjectURL(blob);
        var ou = film.currentTime;
        film.src = adresseMemoire;
        film.addEventListener("loadeddata", function () {
          try { film.currentTime = ou; } catch (e) {}
        }, { once: true });
      }).catch(function () {});
    } catch (e) {}

    /* Sur iPhone, une vidéo qu'on ne fait que déplacer ne charge jamais : Safari
       attend une vraie lecture avant de télécharger quoi que ce soit. On lance
       et on arrête aussitôt, sinon l'écran reste noir sur mobile. */
    var demarrage = film.play();
    if (demarrage && demarrage.then) demarrage.then(function () { film.pause(); }).catch(function () {});
    else { try { film.pause(); } catch (e) {} }

    /* 25/09, bogue payé une fois : la durée était mise en cache sur
       `loadedmetadata`, mais on attachait l'écouteur APRÈS avoir posé le src
       et lancé play(). Quand les métadonnées arrivaient avant, l'événement ne
       partait jamais, `duree` restait à 0, et la molette ne bougeait plus
       l'image d'un pouce. On lit maintenant la durée directement sur la
       vidéo : elle est toujours à jour, et il n'y a plus de course. */
    function dureeFilm() {
      var d = film.duration;
      return (typeof d === "number" && isFinite(d) && d > 0) ? d : 0;
    }
    var enRecherche = false, attente = null, derniereImage = -1;
    film.addEventListener("seeked", function () {
      enRecherche = false;
      if (attente !== null) { var v = attente; attente = null; enRecherche = true; film.currentTime = v; }
    });
    function allerA(t) {
      if (enRecherche) { attente = t; return; }
      enRecherche = true;
      try { film.currentTime = t; } catch (e) { enRecherche = false; }
    }
    // voile sombre qui se lève légèrement avec la progression
    var veil = el("div", "lr-veil");

    var hint = el("div", "lr-hint",
      '<div class="lr-mouse"></div><div>Fais glisser pour entrer</div>');

    var prog = el("div", "lr-prog");

    var enter = el("div", "lr-enter");
    // bouton « liquid glass »
    var enterBtn = el("button", "lq-btn lq-btn-xl",
      '<span class="lq-edge"></span><span class="lq-face">Entrer dans LENNY ' +
      '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>');
    enter.appendChild(enterBtn);

    stage.appendChild(bg);
    stage.appendChild(veil);
    stage.appendChild(hint);
    stage.appendChild(prog);
    stage.appendChild(enter);
    document.body.appendChild(stage);

    // monte le fond animé
    /* Le fond animé d'avant (shader) est remplacé par le film : le monter en
       plus ferait tourner une animation invisible sous une vidéo. */
    var shader = null;

    // ---- état ----
    var progress = 0;
    var fullyExpanded = false;
    var active = false;
    var touchStartY = 0;
    var done = false;
    var resolveFn;
    var promise = new Promise(function (r) { resolveFn = r; });

    function render() {
      var p = progress;
      // le fond se rapproche légèrement (settle-in) + s'éclaircit
      bg.style.transform = "scale(" + (1.12 - p * 0.12).toFixed(4) + ")";
      // LA MOLETTE OUVRE LES PORTES. On garde une marge à la fin : la toute
      // dernière image d'un mp4 n'est pas toujours atteignable au seek.
      /* On ne redemande pas une image au navigateur si elle est la même :
         sous un vingt-quatrième de seconde d'écart, il décoderait pour rien,
         et c'est ce décodage inutile qui faisait tomber la boucle à dix images
         par seconde. */
      var d = dureeFilm();
      if (d > 0) {
        var vise = Math.min(d - 0.05, p * d);
        if (Math.abs(vise - derniereImage) > 1 / 24) {
          derniereImage = vise;
          allerA(vise);
        }
      }
      veil.style.opacity = String(0.55 - p * 0.4);
      prog.style.width = (p * 100).toFixed(1) + "%";
      hint.style.opacity = p > 0.02 ? "0" : "1";
    }

    function setExpanded(v) {
      if (v === fullyExpanded) return;
      fullyExpanded = v;
      enter.classList.toggle("show", v);
    }

    /* 25/09 — L'INERTIE, ET C'EST ELLE QUI FAIT LA FLUIDITÉ.
       Lenny : « ça fait comme de la latence, c'est pas du tout fluide ».
       La cause n'était pas la vidéo : on déplaçait l'image À CHAQUE cran de
       molette, donc le navigateur devait décoder une image entière par
       événement, en rafale. Le composant d'origine ne fait pas ça : il garde
       une cible et une position, et à chaque rafraîchissement d'écran la
       position rattrape la cible d'un cinquième. La molette devient continue,
       et le décodage suit à la cadence de l'écran au lieu de celle des doigts.
       Le geste paraît plus lourd et plus précis : c'est exactement ce qu'on
       veut d'une porte qui s'ouvre. */
    var cible = 0;
    var boucle = 0;

    function tourner() {
      var ecart = cible - progress;
      if (Math.abs(ecart) > 0.0004) {
        progress += ecart * 0.2;
        render();
      } else if (progress !== cible) {
        progress = cible;
        render();
      }
      if (progress >= 0.995) setExpanded(true);
      else if (progress < 0.92) setExpanded(false);
      boucle = requestAnimationFrame(tourner);
    }

    function bump(d) {
      if (!active || done) return;
      cible = Math.min(1, Math.max(0, cible + d));
    }

    function onWheel(e) {
      if (!active || done) return;
      if (fullyExpanded) {
        if (e.deltaY > 0) { e.preventDefault(); finish(); }
        else { e.preventDefault(); bump(e.deltaY * 0.0009); }
        return;
      }
      e.preventDefault();
      bump(e.deltaY * 0.0009);
    }
    function onTouchStart(e) { touchStartY = e.touches[0].clientY; }
    function onTouchMove(e) {
      if (!active || done || !touchStartY) return;
      var y = e.touches[0].clientY, dy = touchStartY - y;
      if (fullyExpanded && dy > 24) { e.preventDefault(); finish(); return; }
      e.preventDefault();
      bump(dy * (dy < 0 ? 0.008 : 0.006));
      touchStartY = y;
    }
    function onTouchEnd() { touchStartY = 0; }
    function onKey(e) {
      if (!active || done) return;
      if (e.key === "Escape") finish();
      else if (e.key === "Enter" || e.key === " ") { if (fullyExpanded) finish(); else bump(0.18); }
      else if (e.key === "ArrowDown") { e.preventDefault(); fullyExpanded ? finish() : bump(0.12); }
      else if (e.key === "ArrowUp") { e.preventDefault(); bump(-0.12); }
    }

    function finish() {
      if (done) return;
      done = true;
      stage.classList.add("lr-out");
      try { document.documentElement.style.overflow = ""; } catch (e) {}
      setTimeout(function () {
        cleanup();
        if (shader && shader.destroy) shader.destroy();
        if (stage.parentNode) stage.parentNode.removeChild(stage);
        resolveFn();
      }, 720);
    }

    function cleanup() {
      window.removeEventListener("wheel", onWheel, { passive: false });
      window.removeEventListener("touchstart", onTouchStart, { passive: false });
      window.removeEventListener("touchmove", onTouchMove, { passive: false });
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      if (boucle) cancelAnimationFrame(boucle);
      if (adresseMemoire) { try { URL.revokeObjectURL(adresseMemoire); } catch (e) {} }
    }

    enterBtn.addEventListener("click", finish);

    function start() {
      if (active || done) return;
      active = true;
      try { document.documentElement.style.overflow = "hidden"; } catch (e) {}
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
      window.addEventListener("keydown", onKey);
      if (reduce) { progress = 1; cible = 1; render(); setExpanded(true); }
      else { render(); boucle = requestAnimationFrame(tourner); }
    }

    render();
    return { promise: promise, start: start, stage: stage };
  }

  window.LennyReveal = { play: play };

  /* 25/09 — LA PORTE DE SERVICE DU TRAIN.
     Cet écran n'apparaît normalement qu'APRÈS le portail, et sur la machine de
     Lenny le portail s'ouvre tout seul : il ne pouvait donc jamais le voir.
     Avec ?train dans l'adresse, il se lance directement. Ça ne change rien en
     ligne, où l'adresse ne porte jamais ce mot. */
  if (/[?&]train\b/.test(location.search)) {
    var lancer = function () {
      var g = document.getElementById("lenny-gate");
      if (g) g.classList.add("hidden");
      var r = play({ force: true, manualStart: true });
      if (r && r.start) r.start();
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", lancer);
    else setTimeout(lancer, 60);
  }
})();
