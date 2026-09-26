/* lenny-roue-travaux.js — LA ROUE DE TRAVAUX SUR TRANSACTION, SYNDIC ET DROIT,
 * MÊLÉE AU « HERO CAROUSEL ».
 *
 * Lenny, le 25/09/2026 : d'abord « je veux ça comme nouveau carrousel sur
 * transaction, syndic et droit » (le composant WorksWheel, works-wheel.js),
 * puis « essaye de le mélanger pour mon site avec celui-là » (le composant
 * HeroCarousel qu'il a collé ensuite).
 *
 * CE QUE CHACUN APPORTE :
 *   la roue garde la navigation — l'anneau au repos, le tambour à la molette,
 *   la carte de face à plat, l'index à droite ;
 *   le hero carousel apporte l'ambiance — l'image du module de face agrandie
 *   en fond et teintée à sa couleur (la photo garde sa lumière, prend la
 *   teinte), un zoom lent, un grain de film, le grand titre qui monte ligne
 *   par ligne, la ligne d'infos et le compteur « 03 / 12 » avec sa barre.
 *
 * Au repos, en anneau, la vidéo du secteur reste visible : le fond teinté
 * n'arrive qu'une fois la roue ouverte.
 *
 * Elle remplace le carrousel 3D autour de l'île, qui reste dans le code
 * (CARROUSEL_3D dans lenny-modpicker.js). Ordinateur seulement : sur
 * téléphone la liste reste en colonne, lisible.
 */
(function () {
  "use strict";

  var GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

  var css = document.createElement("style");
  css.textContent = [
    "#sector-grid.roue-cachee{display:none!important}",
    ".roue-travaux{position:absolute;left:0;right:0;top:var(--nav-h,68px);bottom:0;z-index:3;",
    "--ww-fg:#fff;--ww-muted:rgba(255,255,255,.55);--ww-card:#141414;--ww-font:Anton,'Bebas Neue',sans-serif}",
    ".roue-travaux .ww-index{font-family:Inter,system-ui,sans-serif;top:4%;text-shadow:0 1px 10px rgba(0,0,0,.85)}",
    ".roue-travaux .ww-label{text-transform:uppercase;letter-spacing:.02em}",
    // le titre de la roue laisse la place au titre du hero carousel
    ".roue-travaux .ww-title{display:none}",

    /* le fond teinté : deux calques qui se relaient pour le fondu */
    ".rt-fond{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0;transition:opacity .7s ease;overflow:hidden}",
    ".rt-fond.on{opacity:1}",
    ".rt-calque{position:absolute;inset:0;opacity:0;transition:opacity .7s ease-out}",
    ".rt-calque.vu{opacity:1}",
    ".rt-calque img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.42);transition:transform 6s linear}",
    ".rt-calque.vu img{transform:scale(1.28)}",
    ".rt-teinte{position:absolute;inset:0;mix-blend-mode:color}",
    ".rt-multi{position:absolute;inset:0;mix-blend-mode:multiply;opacity:.55}",
    ".rt-lavis{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.4),transparent 45%,rgba(0,0,0,.5))}",
    ".rt-grain{position:absolute;inset:0;opacity:.22;mix-blend-mode:overlay;background-image:" + GRAIN + ";background-size:180px 180px}",

    /* le titre, les infos, le compteur */
    ".rt-texte{position:absolute;left:6%;top:50%;transform:translateY(-50%);z-index:4;max-width:30%;color:#fff;pointer-events:none;",
    "opacity:0;transition:opacity .4s ease}",
    ".rt-texte.on{opacity:1}",
    ".rt-credit{font:500 11px/1 'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase;opacity:.8;margin:0 0 14px}",
    ".rt-titre{font-family:Anton,'Bebas Neue',sans-serif;font-weight:400;font-size:clamp(30px,3.3vw,54px);line-height:.95;letter-spacing:.005em;margin:0}",
    // une ligne du titre = une ligne à l'écran, jamais recoupée
    ".rt-ligne{display:block;overflow:hidden;white-space:nowrap}",
    ".rt-ligne>span{display:block;transform:translateY(110%);animation:rt-monte .62s cubic-bezier(.22,1,.36,1) forwards}",
    "@keyframes rt-monte{to{transform:none}}",
    ".rt-meta{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:18px}",
    ".rt-meta span{font:500 11px/1 'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase;opacity:0;",
    "transform:translateY(6px);animation:rt-fait .45s ease forwards}",
    "@keyframes rt-fait{to{opacity:.8;transform:none}}",
    ".rt-rail{position:absolute;left:6%;bottom:4%;width:20%;z-index:4;color:#fff;pointer-events:none;opacity:0;transition:opacity .4s ease}",
    ".rt-rail.on{opacity:1}",
    ".rt-rail .chiffres{display:flex;justify-content:space-between;font:500 11px/1 'IBM Plex Mono',monospace;opacity:.8;font-variant-numeric:tabular-nums}",
    ".rt-rail .piste{position:relative;height:1px;margin-top:8px;background:rgba(255,255,255,.25)}",
    ".rt-rail .curseur{position:absolute;top:0;bottom:0;background:#fff;transition:left .5s cubic-bezier(.22,1,.36,1)}",
    "@media (prefers-reduced-motion:reduce){.rt-calque img,.rt-calque.vu img{transition:none;transform:scale(1.28)}",
    ".rt-ligne>span,.rt-meta span{animation:none;transform:none;opacity:.8}.rt-ligne>span{opacity:1}}"
  ].join("");
  document.head.appendChild(css);

  var roue = null, hoteRoue = null, fond = null, texte = null, rail = null, attente = 0;

  function bureau() { return window.matchMedia("(min-width: 821px)").matches; }
  function mods() {
    try { if (typeof LENNY_MODULES !== "undefined" && LENNY_MODULES.length) return LENNY_MODULES; } catch (e) {}
    return window.LENNY_MODULES || window.MODULES || [];
  }
  function modDe(id) {
    var l = mods();
    for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i];
    return null;
  }
  function ouvrir(id) {
    try { if (window.LennyDetail && window.LennyDetail.open) { window.LennyDetail.open(id); return; } } catch (e) {}
    var a = document.querySelector('#sector-grid a.card[data-mod="' + id + '"]');
    if (a) a.click(); else location.hash = "#" + id;
  }

  /* La couleur d'un module, lue dans son image : une moyenne qui favorise les
     teintes franches plutôt que les gris, ramenée à une teinte vive — c'est
     elle qui repeint la photo, comme l'`accent` du hero carousel. */
  var teintes = {};
  function teinteDe(src, fini) {
    if (teintes[src]) return fini(teintes[src]);
    var img = new Image();
    img.onload = function () {
      try {
        var c = document.createElement("canvas"); c.width = c.height = 32;
        var x = c.getContext("2d"); x.drawImage(img, 0, 0, 32, 32);
        var d = x.getImageData(0, 0, 32, 32).data, r = 0, g = 0, b = 0, w = 0;
        for (var i = 0; i < d.length; i += 4) {
          var mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]);
          var p = 0.08 + (mx - mn) / 255;
          r += d[i] * p; g += d[i + 1] * p; b += d[i + 2] * p; w += p;
        }
        r /= w * 255; g /= w * 255; b /= w * 255;
        var M = Math.max(r, g, b), m = Math.min(r, g, b), dd = M - m, h = 0;
        if (dd) { h = M === r ? ((g - b) / dd) % 6 : M === g ? (b - r) / dd + 2 : (r - g) / dd + 4; h *= 60; if (h < 0) h += 360; }
        var sat = dd ? 62 : 0;
        teintes[src] = "hsl(" + Math.round(h) + " " + sat + "% 46%)";
      } catch (e) { teintes[src] = "#8a8a8a"; }
      fini(teintes[src]);
    };
    img.onerror = function () { fini("#8a8a8a"); };
    img.src = src;
  }

  function calque(src, teinte) {
    var c = document.createElement("div");
    c.className = "rt-calque";
    var img = document.createElement("img");
    img.src = src; img.alt = ""; img.setAttribute("aria-hidden", "true");
    var t1 = document.createElement("div"); t1.className = "rt-teinte"; t1.style.backgroundColor = teinte;
    var t2 = document.createElement("div"); t2.className = "rt-multi"; t2.style.backgroundColor = teinte;
    c.appendChild(img); c.appendChild(t1); c.appendChild(t2);
    return c;
  }

  /* Les titres de module tiennent sur une ligne ; le hero carousel en veut
     plusieurs qui montent l'une après l'autre. On coupe au milieu des mots. */
  function lignesDe(titre) {
    var mots = titre.split(" ");
    if (titre.length < 16 || mots.length < 2) return [titre];
    var moitie = titre.length / 2, acc = 0, cut = 1;
    for (var i = 0; i < mots.length; i++) { acc += mots[i].length + 1; if (acc >= moitie) { cut = i + 1; break; } }
    var l = [mots.slice(0, cut).join(" "), mots.slice(cut).join(" ")];
    return l.filter(Boolean);
  }

  function montrer(items, i, ouvert) {
    fond.classList.toggle("on", ouvert);
    texte.classList.toggle("on", ouvert);
    rail.classList.toggle("on", ouvert);
    var it = items[i]; if (!it) return;

    // le fond : un nouveau calque par-dessus, l'ancien s'efface derrière lui
    teinteDe(it.image, function (teinte) {
      if (fond.getAttribute("data-i") === String(i)) return;
      fond.setAttribute("data-i", String(i));
      var neuf = calque(it.image, teinte);
      fond.insertBefore(neuf, fond.querySelector(".rt-lavis"));
      requestAnimationFrame(function () { requestAnimationFrame(function () { neuf.classList.add("vu"); }); });
      var vieux = fond.querySelectorAll(".rt-calque");
      for (var k = 0; k < vieux.length - 1; k++) (function (v) {
        v.classList.remove("vu");
        setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, 750);
      })(vieux[k]);
    });

    // le titre, ligne par ligne, puis les infos
    var m = modDe(it.id) || {};
    var h = texte.querySelector(".rt-titre"), meta = texte.querySelector(".rt-meta");
    h.innerHTML = ""; meta.innerHTML = "";
    lignesDe(it.title).forEach(function (l, k) {
      var ligne = document.createElement("span"); ligne.className = "rt-ligne";
      var inner = document.createElement("span"); inner.textContent = l; inner.style.animationDelay = k * 70 + "ms";
      ligne.appendChild(inner); h.appendChild(ligne);
    });
    [m.season, m.time ? m.time + " min" : "", m.tag].filter(Boolean).forEach(function (f, k) {
      var s = document.createElement("span"); s.textContent = f; s.style.animationDelay = 120 + k * 60 + "ms";
      meta.appendChild(s);
    });

    // le compteur
    var n = items.length;
    rail.querySelector(".ici").textContent = String(i + 1).padStart(2, "0");
    rail.querySelector(".tout").textContent = String(n).padStart(2, "0");
    var cur = rail.querySelector(".curseur");
    cur.style.width = 100 / n + "%"; cur.style.left = (i / n) * 100 + "%";
  }

  function retirer() {
    if (roue) { roue.destroy(); roue = null; }
    [hoteRoue, fond, texte, rail].forEach(function (n) { if (n && n.parentNode) n.parentNode.removeChild(n); });
    hoteRoue = fond = texte = rail = null;
    var g = document.getElementById("sector-grid");
    if (g) g.classList.remove("roue-cachee");
  }

  function monter() {
    var vue = document.getElementById("view-sector");
    var grille = document.getElementById("sector-grid");
    var hero = document.getElementById("sector-hero");
    retirer();
    if (!vue || vue.hidden || !grille || !hero || !window.WorksWheel || !bureau()) return;
    var ancres = Array.prototype.slice.call(grille.querySelectorAll("a.card[data-mod]"));
    if (!ancres.length) return;

    var items = ancres.map(function (a) {
      var id = a.getAttribute("data-mod");
      var m = modDe(id) || {};
      return { id: id, title: m.title || id, image: "videos-modules/" + id + ".jpg", href: a.getAttribute("href") || "#" };
    });
    var nom = (document.getElementById("sector-title") || {}).textContent || vue.getAttribute("data-sector") || "";

    grille.classList.add("roue-cachee");

    fond = document.createElement("div");
    fond.className = "rt-fond";
    fond.innerHTML = '<div class="rt-lavis"></div><div class="rt-grain"></div>';
    hero.appendChild(fond);

    texte = document.createElement("div");
    texte.className = "rt-texte";
    texte.setAttribute("aria-live", "polite");
    texte.innerHTML = '<p class="rt-credit"></p><h2 class="rt-titre"></h2><div class="rt-meta"></div>';
    texte.querySelector(".rt-credit").textContent = nom;
    hero.appendChild(texte);

    rail = document.createElement("div");
    rail.className = "rt-rail";
    rail.innerHTML = '<div class="chiffres"><span class="ici">01</span><span class="tout">01</span></div><div class="piste"><div class="curseur"></div></div>';
    hero.appendChild(rail);

    hoteRoue = document.createElement("div");
    hoteRoue.className = "roue-travaux";
    hero.appendChild(hoteRoue);
    roue = window.WorksWheel(hoteRoue, items, {
      label: nom,
      action: "Réviser",
      onOpen: function (it) { ouvrir(it.id); },
      onActive: function (it, i, ouvert) { montrer(items, i, ouvert); }
    });
  }

  function planifier() { clearTimeout(attente); attente = setTimeout(monter, 120); }

  function demarrer() {
    var g = document.getElementById("sector-grid");
    var vue = document.getElementById("view-sector");
    if (!g || !vue) return;
    new MutationObserver(planifier).observe(g, { childList: true });
    new MutationObserver(function () { if (vue.hidden) retirer(); }).observe(vue, { attributes: true, attributeFilter: ["hidden"] });
    var larg = bureau();
    window.addEventListener("resize", function () { if (bureau() !== larg) { larg = bureau(); planifier(); } });
    if (!vue.hidden) planifier();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
