/* lenny-hero-carrousel.js — LE « HERO CAROUSEL » SUR TRANSACTION, SYNDIC ET DROIT.
 *
 * Portage fidèle, en JavaScript simple, du composant React HeroCarousel que
 * Lenny a fourni le 25/09/2026 (« que le dernier prompt que je t'ai envoyé
 * retire l'ancien »). Il remplace la roue de travaux et le carrousel 3D.
 *
 * Toutes les cartes partagent le même bord haut. La carte choisie se déplie
 * sur toute sa hauteur, ses voisines restent coupées à moitié : une rangée de
 * têtes recadrées, avec un portrait entier au milieu. Changer de carte
 * change le fond : la vidéo du module, sans filtre (voir fondPour).
 *
 * Aucune mesure n'est codée en dur : un ResizeObserver lit la scène, et chaque
 * taille ci-dessous en est une proportion, comme dans l'original.
 *
 * Ajout propre au site : cliquer la carte déjà choisie ouvre le module.
 * Ordinateur ET téléphone depuis le 26/09 (Lenny : « le même que sur ordi ») :
 * sur téléphone la bande se pose au-dessus de la barre d'onglets du bas.
 * Le carrousel 3D reste dans le code (CARROUSEL_3D).
 */
(function () {
  "use strict";

  // Proportions de l'original, toutes relatives à la scène.
  var CARD_H = 0.264, CARD_AR = 0.75, GAP = 0.038;
  var TITLE = 0.067, LABEL = 0.0103, PAD = 0.017, RAIL = 0.2;
  var WHEEL_THRESHOLD = 60, WHEEL_COOLDOWN = 420;
  var RESSORT = "cubic-bezier(.22,1,.36,1)";

  function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }

  // Où se trouve le sujet dans chaque vidéo 16:9, de 0 (bord gauche) à 1
  // (bord droit), relevé à l'œil sur l'image du milieu (26/09). Sur un écran
  // étroit, le recadrage garde ce point au centre au lieu du milieu de l'image.
  var SUJET = {
    climat: .6, elan: .55, hoguet: .7, lemoine: .55, m1: .33, m11: .52, m2: .65,
    m3: .25, m4: .4, m5: .6, m6: .3, m6b: .55, macte1: .4, macte2: .4, macte3: .25,
    macte4: .55, macte5: .7, macte8: .55, mddeonto: .7, mdfamille: .6, mdjustice: .55,
    mdpreuve: .6, mdroit: .55, mdsources: .6, mperso: .45, mprop: .72, mville: .6, neiertz: .52,
    scrivener: .6
  };
  function cadre(id, larg, haut, y) {
    var f = SUJET[id] == null ? .5 : SUJET[id];
    var vu = (larg / haut) / (16 / 9);          // part de la largeur qui reste visible
    var x = vu >= 1 ? 50 : clamp((f - vu / 2) / (1 - vu), 0, 1) * 100;
    return x.toFixed(1) + "% " + (y || "50%");
  }

  var css = document.createElement("style");
  css.textContent = [
    "#sector-grid.hc-cachee{display:none!important}",
    ".hc{position:absolute;inset:0;z-index:3;overflow:hidden;background:#000;color:#fff;user-select:none;-webkit-user-select:none;outline:none;",
    "font-family:Inter,system-ui,sans-serif}",
    ".hc:focus-visible{box-shadow:inset 0 0 0 1px rgba(255,255,255,.4)}",
    ".hc-fond,.hc-calque{position:absolute;inset:0}",
    ".hc-calque{opacity:0;transition:opacity .7s ease-out}",
    ".hc-calque.vu{opacity:1}",
    ".hc-calque video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
    ".hc-lavis{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.35),transparent 30%,transparent 60%,rgba(0,0,0,.4))}",
    ".hc-tete{position:absolute;left:0;right:0;top:0;display:flex;flex-direction:column;justify-content:flex-end;pointer-events:none}",
    ".hc-ligne-tete{display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px 6vw;width:100%}",
    ".hc-titre{margin:0;font-weight:600;line-height:.88;letter-spacing:-.03em}",
    ".hc-titre .l{display:block;overflow:hidden}",
    ".hc-titre .l>span{display:block;transform:translateY(110%);animation:hc-monte .62s cubic-bezier(.22,1,.36,1) forwards}",
    "@keyframes hc-monte{to{transform:none}}",
    ".hc-mono{font-family:'IBM Plex Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.14em}",
    ".hc-credit{margin:0;opacity:0;animation:hc-voit .5s ease .1s forwards}",
    "@keyframes hc-voit{to{opacity:.8}}",
    ".hc-meta{margin-left:auto;display:flex;align-items:flex-end}",
    ".hc-meta span{white-space:nowrap;opacity:0;transform:translateY(6px);animation:hc-fait .45s ease forwards}",
    "@keyframes hc-fait{to{opacity:.8;transform:none}}",
    ".hc-actions{margin-top:18px;pointer-events:auto}",
    ".hc-go{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:10px;padding:12px 26px;border-radius:6px;",
    "background:#fff;color:#000;font:700 15px/1 Inter,system-ui,sans-serif;transition:transform .15s ease,background .15s ease}",
    ".hc-go:hover{background:rgba(255,255,255,.85);transform:scale(1.03)}",
    ".hc-go:focus-visible{outline:2px solid #fff;outline-offset:3px}",
    // 26/09 — Lenny : « retire les petits commentaires, pôle syndic, S1, 16 min,
    // toutes ces infos » : le crédit, les infos et le compteur ne s'affichent plus.
    ".hc-credit,.hc-meta,.hc-rail{display:none!important}",
    // 26/09 — Lenny : « la barre de navigation avec les cartes, on va la retirer,
    // mets des flèches à la place à gauche et à droite, et le sommaire juste avec
    // le nom de chaque module à un endroit qui gêne pas ». La bande reste dans le
    // code, cachée ; on glisse désormais sur toute la scène.
    ".hc-bande{display:none!important}",
    ".hc{touch-action:pan-y}",
    ".hc-fl{all:unset;position:absolute;top:50%;z-index:4;width:52px;height:52px;margin-top:-26px;border-radius:50%;cursor:pointer;",
    "display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.35);",
    "-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:opacity .25s ease,background .15s ease,transform .15s ease}",
    ".hc-fl:hover{background:rgba(0,0,0,.5);transform:scale(1.06)}",
    ".hc-fl:focus-visible{outline:2px solid #fff;outline-offset:3px}",
    ".hc-fl[disabled]{opacity:0;pointer-events:none}",
    ".hc-fl.g{left:20px}.hc-fl.d{right:20px}",
    ".hc-som{position:absolute;z-index:4;right:24px;top:calc(var(--nav-h,68px) + 22px);margin:0;padding:0;list-style:none;text-align:right;",
    "max-height:calc(50% - var(--nav-h,68px) - 60px);overflow:auto;scrollbar-width:none}",
    ".hc-som::-webkit-scrollbar{display:none}",
    ".hc-som button{all:unset;cursor:pointer;display:block;padding:3px 0;font:500 13px/1.3 Inter,system-ui,sans-serif;color:rgba(255,255,255,.55);",
    "text-shadow:0 1px 6px rgba(0,0,0,.6);transition:color .2s ease}",
    ".hc-som button:hover{color:#fff}",
    ".hc-som button[aria-current=true]{color:#fff;font-weight:700}",
    ".hc-som button:focus-visible{outline:1px solid #fff;outline-offset:2px}",
    ".hc-som-btn{display:none}",
    // téléphone : le sommaire se replie derrière un petit bouton, en haut à droite
    "@media (max-width:820px){",
    ".hc-fl{width:42px;height:42px;margin-top:-21px}.hc-fl.g{left:10px}.hc-fl.d{right:10px}",
    ".hc-som-btn{all:unset;position:absolute;z-index:5;right:14px;top:calc(var(--nav-h,68px) + 14px);display:block;padding:7px 14px;border-radius:999px;",
    "font:600 13px/1 Inter,system-ui,sans-serif;color:#fff;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.3);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}",
    ".hc-som{display:none;right:14px;top:calc(var(--nav-h,68px) + 52px);max-height:55%;padding:10px 14px;border-radius:12px;background:rgba(0,0,0,.72);",
    "-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}",
    ".hc.som-ouvert .hc-som{display:block}",
    ".hc-som button{font-size:14px;padding:6px 0;text-shadow:none}",
    "}",
    ".hc-bande{position:absolute;left:0;right:0}",
    ".hc-piste{display:flex;align-items:flex-start;cursor:grab;will-change:transform;touch-action:pan-y}",
    ".sector-view[data-sector] .sector-hero.hc-plein{min-height:100vh;min-height:100dvh}",
    // la grille est cachée : son cadre vide ne doit pas laisser une bande à faire défiler (Lyncée, 26/09)
    ".sector-hero.hc-plein~.sector-grid-wrap{display:none}",
    ".hc-piste.glisse{cursor:grabbing}",
    ".hc-carte{all:unset;position:relative;flex-shrink:0;overflow:hidden;background:rgba(255,255,255,.05);cursor:inherit;",
    "transition:height .55s " + RESSORT + "}",
    ".hc-carte img{width:100%;height:100%;object-fit:cover;object-position:50% 26%;display:block;pointer-events:none}",
    ".hc-carte .voile{position:absolute;inset:0;background:#000;opacity:.12;transition:opacity .55s " + RESSORT + "}",
    ".hc-carte.on .voile{opacity:0}",
    ".hc-carte:focus-visible{outline:1px solid #fff;outline-offset:2px}",
    ".hc-rail{position:absolute;pointer-events:none}",
    ".hc-rail .chiffres{display:flex;justify-content:space-between;opacity:.8;font-variant-numeric:tabular-nums}",
    ".hc-rail .piste-rail{position:relative;height:1px;margin-top:8px;background:rgba(255,255,255,.25)}",
    ".hc-rail .curseur{position:absolute;top:0;bottom:0;background:#fff;transition:left .55s " + RESSORT + "}",
    "@media (prefers-reduced-motion:reduce){.hc *{transition-duration:0s!important;animation-duration:0s!important}}"
  ].join("");
  document.head.appendChild(css);

  function mods() {
    try { if (typeof LENNY_MODULES !== "undefined" && LENNY_MODULES.length) return LENNY_MODULES; } catch (e) {}
    return window.LENNY_MODULES || window.MODULES || [];
  }
  function modDe(id) {
    var l = mods();
    for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i];
    return null;
  }
  function ouvrirModule(id) {
    try { if (window.LennyDetail && window.LennyDetail.open) { window.LennyDetail.open(id); return; } } catch (e) {}
    var a = document.querySelector('#sector-grid a.card[data-mod="' + id + '"]');
    if (a) a.click(); else location.hash = "#" + id;
  }

  /* Les titres de module tiennent sur une ligne ; l'original en veut
     plusieurs, qui montent l'une après l'autre. On coupe au milieu des mots. */
  function lignesDe(titre) {
    var mots = titre.split(" ");
    if (titre.length < 14 || mots.length < 2) return [titre];
    var moitie = titre.length / 2, acc = 0, cut = 1;
    for (var i = 0; i < mots.length; i++) { acc += mots[i].length + 1; if (acc >= moitie) { cut = i + 1; break; } }
    return [mots.slice(0, cut).join(" "), mots.slice(cut).join(" ")].filter(Boolean);
  }

  function HeroCarrousel(hote, items, opts) {
    var last = items.length - 1, index = 0;
    var st = document.createElement("div");
    st.className = "hc"; st.tabIndex = 0;
    st.setAttribute("role", "group");
    st.setAttribute("aria-roledescription", "carousel");
    st.setAttribute("aria-label", opts.label || "Modules");
    st.innerHTML =
      '<div class="hc-fond"></div><div class="hc-lavis"></div>' +
      '<div class="hc-tete"><div class="hc-ligne-tete"><h2 class="hc-titre"></h2><p class="hc-credit hc-mono"></p><div class="hc-meta"></div></div>' +
      '<div class="hc-actions"><button type="button" class="hc-go"><svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M3 1.5 10 6 3 10.5Z" fill="currentColor"/></svg>Démarrer</button></div></div>' +
      '<div class="hc-bande"><div class="hc-piste"></div></div>' +
      '<button type="button" class="hc-fl g" aria-label="Module précédent"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<button type="button" class="hc-fl d" aria-label="Module suivant"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<button type="button" class="hc-som-btn" aria-expanded="false">Sommaire</button><ol class="hc-som" aria-label="Sommaire"></ol>' +
      '<div class="hc-rail hc-mono"><div class="chiffres"><span class="ici"></span><span class="tout"></span></div><div class="piste-rail"><div class="curseur"></div></div></div>';
    hote.appendChild(st);
    var fond = st.querySelector(".hc-fond"), tete = st.querySelector(".hc-tete"), titre = st.querySelector(".hc-titre");
    var credit = st.querySelector(".hc-credit"), meta = st.querySelector(".hc-meta");
    var bande = st.querySelector(".hc-bande"), piste = st.querySelector(".hc-piste"), rail = st.querySelector(".hc-rail");
    // « Démarrer » : ouvre le module choisi (Lenny : « y a pas de bouton démarrer »)
    st.querySelector(".hc-go").addEventListener("click", function () {
      if (opts.onOpen) opts.onOpen(items[index], index);
    });

    var flG = st.querySelector(".hc-fl.g"), flD = st.querySelector(".hc-fl.d");
    flG.addEventListener("click", function () { aller(index - 1); });
    flD.addEventListener("click", function () { aller(index + 1); });
    var som = st.querySelector(".hc-som"), somBtn = st.querySelector(".hc-som-btn");
    var lignes = items.map(function (it, i) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; b.textContent = it.title;
      b.addEventListener("click", function () { aller(i); ouvrirSom(false); });
      li.appendChild(b); som.appendChild(li);
      return b;
    });
    function ouvrirSom(o) { st.classList.toggle("som-ouvert", o); somBtn.setAttribute("aria-expanded", o ? "true" : "false"); }
    somBtn.addEventListener("click", function () { ouvrirSom(!st.classList.contains("som-ouvert")); });

    // Glisser sur toute la scène (la bande n'est plus là) : au-delà de 50 px
    // à l'horizontale, on passe au module voisin.
    var geste = null;
    st.addEventListener("pointerdown", function (e) {
      if (e.target.closest && e.target.closest("button,ol")) return;
      geste = { x: e.clientX, y: e.clientY };
    });
    st.addEventListener("pointerup", function (e) {
      if (!geste) return;
      var dx = e.clientX - geste.x, dy = e.clientY - geste.y; geste = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) aller(index + (dx < 0 ? 1 : -1));
    });
    st.addEventListener("pointercancel", function () { geste = null; });

    var cartes = items.map(function (it, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "hc-carte";
      b.setAttribute("aria-label", it.title);
      b.innerHTML = '<img alt="" draggable="false"><span class="voile" aria-hidden="true"></span>';
      b.firstChild.src = it.image;
      piste.appendChild(b);
      return b;
    });

    var G = {};
    function mesurer() {
      var w = st.clientWidth, h = st.clientHeight;
      G.w = w; G.h = h;
      G.fullH = clamp(h * CARD_H, 96, 360); G.halfH = G.fullH / 2;
      G.cardW = G.fullH * CARD_AR;
      G.gap = Math.max(4, Math.round(G.cardW * GAP));
      G.step = G.cardW + G.gap;
      G.pad = Math.max(16, Math.round(w * PAD));
      G.label = Math.max(9, Math.round(h * LABEL));
      /* 26/09 — LA BANDE EN BAS. Lenny : « je veux la barre qui est au milieu
         de l'écran » en bas. Elle se pose au-dessus du compteur ; le titre
         reste juste au-dessus d'elle, comme dans l'original. */
      // tout en bas (Lenny, 26/09), au-dessus de la barre d'onglets du téléphone
      var mtb = document.getElementById("mobile-toolbar");
      var bas = mtb && mtb.offsetHeight ? mtb.offsetHeight + 14 : 0;
      G.haut = Math.max(0, h - bas - Math.max(Math.round(h * 0.04), bas ? 0 : 72));  // au-dessus du bouton rond des outils
      bande.style.top = G.haut + "px"; bande.style.height = G.fullH + "px";
      piste.style.gap = G.gap + "px";
      cartes.forEach(function (c, i) {
        c.style.width = G.cardW + "px"; c.style.height = (i === index ? G.fullH : G.halfH) + "px";
        var im = c.querySelector("img"); if (im) im.style.objectPosition = cadre(items[i].id, CARD_AR, 1, "26%");
      });
      fond.querySelectorAll("video").forEach(function (v) { v.style.objectPosition = cadre(v.dataset.id, w, h); });
      tete.style.height = G.haut + "px";
      tete.style.padding = "0 " + G.pad + "px " + Math.round(h * 0.028) + "px";
      titre.style.fontSize = Math.max(24, Math.round(Math.min(h * TITLE, w * 0.095))) + "px";  // téléphone : borné par la largeur
      credit.style.fontSize = meta.style.fontSize = G.label + "px";
      meta.style.gap = Math.max(16, w * 0.055) + "px";
      // le bouton rond des outils du secteur occupe le coin : le compteur se pose à sa droite
      // la bande occupe le bas : le compteur monte en haut à gauche, sous le menu
      rail.style.left = G.pad + "px"; rail.style.bottom = "auto";
      rail.style.top = "calc(var(--nav-h, 68px) + 24px)";
      rail.style.width = w * RAIL + "px"; rail.style.fontSize = G.label + "px";
      placer(false);
    }
    function xPour(i) { return G.w / 2 - (i * G.step + G.cardW / 2); }
    var xCourant = 0;
    function placer(anime) {
      xCourant = xPour(index);
      piste.style.transition = anime === false ? "none" : "transform .6s " + RESSORT;
      piste.style.transform = "translateX(" + xCourant + "px)";
    }

    /* 25/09 — PAS DE FILTRE. Lenny : « ça a mis un filtre à l'arrière, je
       comprends pas, mets la vidéo derrière ». L'original repeignait la photo
       à la couleur de la carte ; ici le fond est la vidéo du module, telle
       quelle, avec son image en attendant qu'elle démarre. */
    function fondPour(it) {
      var c = document.createElement("div");
      c.className = "hc-calque";
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute("playsinline", ""); v.preload = "auto";
      v.poster = it.image;
      v.dataset.id = it.id;
      v.style.objectPosition = cadre(it.id, fond.clientWidth || innerWidth, fond.clientHeight || innerHeight);
      v.src = it.video;
      c.appendChild(v);
      fond.appendChild(c);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      requestAnimationFrame(function () { requestAnimationFrame(function () { c.classList.add("vu"); }); });
      var vieux = fond.querySelectorAll(".hc-calque");
      for (var k = 0; k < vieux.length - 1; k++) (function (x) {
        x.classList.remove("vu");
        setTimeout(function () {
          var vv = x.querySelector("video");
          if (vv) { try { vv.pause(); vv.removeAttribute("src"); vv.load(); } catch (e) {} }
          if (x.parentNode) x.parentNode.removeChild(x);
        }, 750);
      })(vieux[k]);
    }

    function ecrire(it) {
      titre.innerHTML = "";
      lignesDe(it.title).forEach(function (l, k) {
        var s = document.createElement("span"); s.className = "l";
        var t = document.createElement("span"); t.textContent = l; t.style.animationDelay = k * 70 + "ms";
        s.appendChild(t); titre.appendChild(s);
      });
      credit.textContent = it.credit || "";
      credit.style.animation = "none"; void credit.offsetWidth; credit.style.animation = "";
      meta.innerHTML = "";
      (it.meta || []).forEach(function (f, k) {
        var s = document.createElement("span"); s.className = "hc-mono";
        s.textContent = f; s.style.animationDelay = 120 + k * 60 + "ms";
        meta.appendChild(s);
      });
      var n = items.length;
      rail.querySelector(".ici").textContent = String(index + 1).padStart(2, "0");
      rail.querySelector(".tout").textContent = String(n).padStart(2, "0");
      var cur = rail.querySelector(".curseur");
      cur.style.width = 100 / n + "%"; cur.style.left = (index / n) * 100 + "%";
    }

    var attenteFond = 0;
    function aller(i, force) {
      var n = clamp(i, 0, Math.max(0, last));
      if (n === index && !force) { placer(); return; }
      index = n;
      cartes.forEach(function (c, k) {
        c.classList.toggle("on", k === index);
        c.setAttribute("aria-current", k === index ? "true" : "false");
        c.style.height = (k === index ? G.fullH : G.halfH) + "px";
      });
      placer();
      // on attend que le doigt se pose : parcourir cinq modules vite ne doit pas
      // télécharger cinq vidéos (Lyncée, 26/09 : 4,6 Mo pour rien)
      clearTimeout(attenteFond);
      var cible = items[index];
      attenteFond = setTimeout(function () { fondPour(cible); }, force ? 0 : 280);
      flG.disabled = index === 0; flD.disabled = index === last;
      lignes.forEach(function (b, k) { b.setAttribute("aria-current", k === index ? "true" : "false"); });
      if (lignes[index] && lignes[index].scrollIntoView && som.scrollHeight > som.clientHeight) {
        som.scrollTop = lignes[index].offsetTop - som.clientHeight / 2;
      }
      ecrire(items[index]);
    }

    // Molette et pavé tactile : les deux axes font avancer la bande. Contre un
    // bout, le geste est rendu à la page, sinon c'est un piège à défilement.
    var acc = 0, jusqua = 0;
    st.addEventListener("wheel", function (e) {
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if ((delta > 0 && index === last) || (delta < 0 && index === 0)) { acc = 0; return; }
      e.preventDefault();
      if (e.timeStamp < jusqua) return;
      acc += delta;
      if (Math.abs(acc) < WHEEL_THRESHOLD) return;
      aller(index + Math.sign(acc));
      acc = 0; jusqua = e.timeStamp + WHEEL_COOLDOWN;
    }, { passive: false });

    st.addEventListener("keydown", function (e) {
      var k = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: last };
      if (e.key in k) { e.preventDefault(); aller(k[e.key]); }
      else if (e.key === "Enter" && e.target === st && opts.onOpen) opts.onOpen(items[index], index);
    });

    // Glisser : la bande suit le doigt ; au lâcher, elle se pose sur la carte
    // la plus proche, poussée par la vitesse du lancer.
    var tire = null;
    piste.addEventListener("pointerdown", function (e) {
      tire = { x0: e.clientX, xBase: xCourant, t: e.timeStamp, dernierX: e.clientX, dernierT: e.timeStamp, v: 0, bouge: 0 };
      piste.style.transition = "none";
      piste.classList.add("glisse");
      try { piste.setPointerCapture(e.pointerId); } catch (x) {}
    });
    piste.addEventListener("pointermove", function (e) {
      if (!tire) return;
      var dx = e.clientX - tire.x0;
      tire.bouge = Math.max(tire.bouge, Math.abs(dx));
      var min = xPour(last), max = xPour(0), x = tire.xBase + dx;
      if (x > max) x = max + (x - max) * 0.08;          // élasticité aux bouts
      if (x < min) x = min + (x - min) * 0.08;
      var dt = e.timeStamp - tire.dernierT;
      if (dt > 0) tire.v = (e.clientX - tire.dernierX) / dt * 1000;
      tire.dernierX = e.clientX; tire.dernierT = e.timeStamp;
      xCourant = x;
      piste.style.transform = "translateX(" + x + "px)";
    });
    function lacher(e) {
      if (!tire) return;
      var t = tire; tire = null;
      piste.classList.remove("glisse");
      if (t.bouge < 6) {
        // un clic, pas un glisser : la carte visée devient le focus, ou s'ouvre
        // la bande a capturé le pointeur : e.target est la bande, pas la carte.
        // On retrouve la carte sous le doigt par sa position.
        var sous = e ? document.elementFromPoint(e.clientX, e.clientY) : null;
        var c = sous && sous.closest ? sous.closest(".hc-carte") : null;
        var i = cartes.indexOf(c);
        placer();
        if (i === index && opts.onOpen) opts.onOpen(items[index], index);
        else if (i >= 0) aller(i);
        return;
      }
      var lance = xCourant + t.v * 0.12;
      aller(Math.round((G.w / 2 - lance - G.cardW / 2) / G.step), true);
    }
    piste.addEventListener("pointerup", lacher);
    piste.addEventListener("pointercancel", function () { lacher(null); });
    // les clics sont traités au lâcher : on ne laisse pas le bouton agir seul
    piste.addEventListener("click", function (e) { e.preventDefault(); });

    var ro = new ResizeObserver(mesurer);
    ro.observe(st);
    mesurer();
    aller(opts.defaultIndex || 0, true);

    return {
      index: function () { return index; },
      destroy: function () { clearTimeout(attenteFond); ro.disconnect(); if (st.parentNode) st.parentNode.removeChild(st); }
    };
  }
  window.LennyHeroCarrousel = HeroCarrousel;

  /* ── branchement sur les pages de secteur ─────────────────────────────── */
  var instance = null, hoteHc = null, attente = 0, secteurHc = "", memoire = {};

  function retirer() {
    if (instance && secteurHc) memoire[secteurHc] = instance.index();
    if (instance) { instance.destroy(); instance = null; }
    if (hoteHc && hoteHc.parentNode) hoteHc.parentNode.removeChild(hoteHc);
    hoteHc = null;
    var g = document.getElementById("sector-grid");
    if (g) g.classList.remove("hc-cachee");
    var h = document.getElementById("sector-hero");
    if (h) h.classList.remove("hc-plein");
  }

  function monter() {
    var vue = document.getElementById("view-sector");
    var grille = document.getElementById("sector-grid");
    var hero = document.getElementById("sector-hero");
    retirer();
    if (!vue || vue.hidden || !grille || !hero) return;
    var ancres = Array.prototype.slice.call(grille.querySelectorAll("a.card[data-mod]"));
    if (!ancres.length) return;
    var nom = (document.getElementById("sector-title") || {}).textContent || vue.getAttribute("data-sector") || "";
    var items = ancres.map(function (a) {
      var id = a.getAttribute("data-mod");
      var m = modDe(id) || {};
      return {
        id: id,
        title: m.title || id,
        image: "videos-modules/" + id + ".jpg",
        video: "videos-modules/" + id + ".mp4",
        credit: nom ? "Pôle " + nom + "." : "",
        meta: [m.season, m.time ? m.time + " min" : "", m.num ? "Module " + m.num : ""].filter(Boolean)
      };
    });
    grille.classList.add("hc-cachee");
    hero.classList.add("hc-plein");
    secteurHc = nom;
    hoteHc = document.createElement("div");
    hoteHc.style.cssText = "position:absolute;inset:0;z-index:3";
    hero.appendChild(hoteHc);
    instance = HeroCarrousel(hoteHc, items, {
      label: nom,
      defaultIndex: Math.min(memoire[nom] || 0, items.length - 1),
      onOpen: function (it) { ouvrirModule(it.id); }
    });
  }

  function planifier() { clearTimeout(attente); attente = setTimeout(monter, 120); }

  function demarrer() {
    var g = document.getElementById("sector-grid");
    var vue = document.getElementById("view-sector");
    if (!g || !vue) return;
    new MutationObserver(planifier).observe(g, { childList: true });
    new MutationObserver(function () { if (vue.hidden) retirer(); }).observe(vue, { attributes: true, attributeFilter: ["hidden"] });
    if (!vue.hidden) planifier();
    // la vidéo de l'accueil tournait en boucle derrière les autres pages (Lyncée, 26/09)
    var home = document.getElementById("view-home");
    if (home) new MutationObserver(function () {
      home.querySelectorAll("video").forEach(function (v) {
        if (home.hidden) v.pause(); else { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      });
    }).observe(home, { attributes: true, attributeFilter: ["hidden"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
