/* lenny-selection.js — LA RANGÉE « SÉLECTION DU JOUR », COMME SUR LA TÉLÉ.
 *
 * Lenny, le 25/09/2026, sur les pages Transaction, Syndic et Droit : « je veux
 * la même animation que je t'ai envoyée », c'est-à-dire la vidéo filmée de son
 * téléviseur (Netflix, « Notre sélection du jour pour vous »). Pas l'effet de
 * l'accueil, où la carte survolée s'élargit sur place.
 *
 * CE QUE MONTRE SA VIDÉO, et ce que ce fichier refait :
 *   — la carte choisie est TOUJOURS la première à gauche, en grand panneau
 *     horizontal, et sa vidéo joue ;
 *   — son titre, sa durée et son résumé s'écrivent en dessous ;
 *   — les suivantes attendent à droite en affiches verticales, de la même
 *     hauteur ;
 *   — quand on avance, toute la rangée glisse : l'affiche suivante prend la
 *     grande place, la précédente sort par la gauche.
 *
 * On avance avec les flèches du clavier, les boutons ‹ ›, ou en cliquant une
 * affiche. Cliquer la grande carte ouvre le module, comme avant.
 *
 * Ordinateur seulement (plus de 820 px) : sur téléphone la liste reste lisible
 * en colonne. Retirer ce fichier de index.html rend la rangée d'avant.
 */
(function () {
  "use strict";

  var LARGE = 520, AFFICHE = 195, HAUT = 292, ECART = 12;
  var DOSSIER = "videos-modules/";

  var style = document.createElement("style");
  style.textContent = [
    "@media (min-width:821px){",
    "#sector-grid.tv-sel{display:flex;gap:" + ECART + "px;overflow:hidden;padding:0;margin:0;scroll-behavior:smooth;align-items:flex-start}",
    "#sector-grid.tv-sel .card{flex:0 0 auto;width:" + AFFICHE + "px;height:" + HAUT + "px;aspect-ratio:auto!important;",
    "transform:none!important;border-radius:8px;overflow:hidden;",
    "transition:width .5s cubic-bezier(.22,.61,.36,1),box-shadow .3s ease!important}",
    "#sector-grid.tv-sel .card:hover{width:" + AFFICHE + "px;aspect-ratio:auto!important}",
    "#sector-grid.tv-sel .card.is-sel,#sector-grid.tv-sel .card.is-sel:hover{width:" + LARGE + "px;",
    "box-shadow:0 30px 70px -18px rgba(0,0,0,.85),inset 0 0 0 3px rgba(255,255,255,.92)}",
    "#sector-grid.tv-sel .card .card-art{width:100%;height:100%}",
    "#sector-grid.tv-sel .card .card-overlay{display:none}",
    "#sector-grid.tv-sel video.sel-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;",
    "z-index:2;opacity:0;transition:opacity .5s ease;pointer-events:none;border-radius:inherit}",
    "#sector-grid.tv-sel video.sel-video.vu{opacity:1}",
    ".tv-sel-bloc{position:relative}",
    ".tv-sel-info{width:" + LARGE + "px;margin-top:16px;min-height:118px;color:#fff}",
    ".tv-sel-info h3{font:800 26px/1.1 Manrope,sans-serif;margin:0 0 6px;letter-spacing:-.01em}",
    ".tv-sel-info .meta{font:600 12px/1 Manrope,sans-serif;color:rgba(255,255,255,.65);margin:0 0 10px;letter-spacing:.04em}",
    ".tv-sel-info p{font:500 14px/1.5 Manrope,sans-serif;color:rgba(255,255,255,.82);margin:0;",
    "display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}",
    ".tv-sel-info>*{transition:opacity .25s ease}",
    ".tv-sel-info.change>*{opacity:0}",
    ".tv-sel-nav{position:absolute;top:0;height:" + HAUT + "px;width:44px;border:none;cursor:pointer;z-index:5;",
    "color:#fff;font:400 34px/1 Manrope,sans-serif;background:rgba(0,0,0,.35);border-radius:8px}",
    ".tv-sel-nav:hover{background:rgba(0,0,0,.6)}",
    ".tv-sel-nav.prec{left:-54px}.tv-sel-nav.suiv{right:0}",
    ".tv-sel-nav[disabled]{opacity:0;pointer-events:none}",
    "}"
  ].join("");
  document.head.appendChild(style);

  function mods() {
    try { if (typeof LENNY_MODULES !== "undefined" && LENNY_MODULES.length) return LENNY_MODULES; } catch (e) {}
    return window.LENNY_MODULES || window.MODULES || [];
  }
  function modDe(id) {
    var l = mods();
    for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i];
    return null;
  }
  function bureau() { return window.matchMedia("(min-width: 821px)").matches; }

  var grille, info, prec, suiv, cartes = [], sel = 0, video = null, gardien = 0;

  function cartesDe() { return Array.prototype.slice.call(grille.querySelectorAll("a.card[data-mod]")); }

  function poserVideo(carte) {
    if (video && video.parentNode) video.parentNode.removeChild(video);
    clearInterval(gardien);
    var id = carte.getAttribute("data-mod");
    var v = document.createElement("video");
    v.className = "sel-video";
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
    v.setAttribute("playsinline", "");
    v.src = DOSSIER + id + ".mp4";
    v.addEventListener("canplay", function () { v.classList.add("vu"); v.play().catch(function () {}); }, { once: true });
    v.addEventListener("error", function () { if (v.parentNode) v.parentNode.removeChild(v); }, { once: true });
    video = v;
    carte.appendChild(v);
    // le site refabrique parfois l'intérieur d'une carte : on remet la vidéo
    gardien = setInterval(function () {
      if (video !== v) { clearInterval(gardien); return; }
      if (!carte.contains(v)) carte.appendChild(v);
    }, 400);
  }

  function ecrireInfo(carte) {
    var m = modDe(carte.getAttribute("data-mod")) || {};
    info.classList.add("change");
    setTimeout(function () {
      info.innerHTML = "";
      var h = document.createElement("h3"); h.textContent = m.title || "";
      var meta = document.createElement("div"); meta.className = "meta";
      meta.textContent = [m.season, m.time ? m.time + " min" : "", m.tag].filter(Boolean).join("  ·  ");
      var p = document.createElement("p"); p.textContent = m.desc || "";
      info.appendChild(h); info.appendChild(meta); info.appendChild(p);
      info.classList.remove("change");
    }, 180);
  }

  function choisir(i) {
    if (!cartes.length) return;
    sel = Math.max(0, Math.min(cartes.length - 1, i));
    cartes.forEach(function (c, k) { c.classList.toggle("is-sel", k === sel); });
    // la carte choisie vient se placer au bord gauche
    grille.scrollTo({ left: sel * (AFFICHE + ECART), behavior: "smooth" });
    prec.disabled = sel === 0;
    suiv.disabled = sel === cartes.length - 1;
    poserVideo(cartes[sel]);
    ecrireInfo(cartes[sel]);
  }

  function monter() {
    grille = document.getElementById("sector-grid");
    if (!grille) return;
    var wrap = grille.parentNode;
    if (!bureau()) {
      grille.classList.remove("tv-sel");
      if (video && video.parentNode) video.parentNode.removeChild(video);
      return;
    }
    cartes = cartesDe();
    if (!cartes.length) return;
    grille.classList.add("tv-sel");

    if (!info) {
      var bloc = document.createElement("div");
      bloc.className = "tv-sel-bloc";
      wrap.insertBefore(bloc, grille);
      bloc.appendChild(grille);
      prec = document.createElement("button");
      prec.type = "button"; prec.className = "tv-sel-nav prec"; prec.textContent = "‹";
      prec.setAttribute("aria-label", "Module précédent");
      suiv = document.createElement("button");
      suiv.type = "button"; suiv.className = "tv-sel-nav suiv"; suiv.textContent = "›";
      suiv.setAttribute("aria-label", "Module suivant");
      bloc.appendChild(prec); bloc.appendChild(suiv);
      info = document.createElement("div");
      info.className = "tv-sel-info";
      info.setAttribute("aria-live", "polite");
      bloc.appendChild(info);
      prec.addEventListener("click", function () { choisir(sel - 1); });
      suiv.addEventListener("click", function () { choisir(sel + 1); });

      // Clic sur une affiche : elle devient la sélection au lieu d'ouvrir.
      // Phase de capture : on passe avant l'ouverture en plein écran.
      // Sur window, en capture : c'est le tout premier à voir le clic.
      window.addEventListener("click", function (e) {
        if (!grille.classList.contains("tv-sel") || !grille.contains(e.target)) return;
        var c = e.target.closest ? e.target.closest("a.card[data-mod]") : null;
        if (!c || c.classList.contains("is-sel")) return;
        e.preventDefault(); e.stopImmediatePropagation();
        choisir(cartes.indexOf(c));
      }, true);

      window.addEventListener("keydown", function (e) {
        var vue = document.getElementById("view-sector");
        if (!vue || vue.hidden || !grille.classList.contains("tv-sel")) return;
        var tg = (e.target && e.target.tagName) || "";
        // un champ caché (la case du code, restée active après le
        // déverrouillage) ne doit pas voler les flèches
        var visible = e.target && e.target.getClientRects && e.target.getClientRects().length &&
          !(e.target.closest && e.target.closest("#lenny-gate.hidden"));
        if (visible && (/INPUT|TEXTAREA|SELECT/.test(tg) || e.target.isContentEditable)) return;
        if (e.key === "ArrowRight") { choisir(sel + 1); e.preventDefault(); e.stopImmediatePropagation(); }
        else if (e.key === "ArrowLeft") { choisir(sel - 1); e.preventDefault(); e.stopImmediatePropagation(); }
      }, true);
    }
    grille.scrollLeft = 0;
    choisir(0);
  }

  var attente = 0;
  function planifier() { clearTimeout(attente); attente = setTimeout(monter, 80); }

  function demarrer() {
    var g = document.getElementById("sector-grid");
    if (!g) return;
    // le routeur refabrique les cartes à chaque changement de secteur
    new MutationObserver(function (liste) {
      for (var i = 0; i < liste.length; i++) {
        for (var j = 0; j < liste[i].addedNodes.length; j++) {
          var n = liste[i].addedNodes[j];
          if (n.nodeType === 1 && n.matches && n.matches("a.card")) { planifier(); return; }
        }
      }
    }).observe(g, { childList: true });
    window.addEventListener("resize", planifier);
    if (g.querySelector("a.card[data-mod]")) planifier();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
