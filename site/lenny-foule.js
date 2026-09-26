/* lenny-foule.js — LA CLASSE QUI PASSE DEVANT LA PORTE.
 *
 * Demandé par Lenny le 25/09/2026, pour remplacer l'écran d'authentification :
 * une foule d'élèves qui marchent, et par-dessus « Rejoins notre classe ».
 * Son idée, dans ses mots : faire comprendre à l'alternant d'une entreprise
 * qu'il rejoint les cours de VRAIS élèves, pas un cours en boîte.
 *
 * D'OÙ VIENT CE CODE. C'est le composant « Skiper 39 — Crowd Canvas » de
 * Skiper UI (@gurvinder-singh02, gxuri.me), lui-même inspiré d'un CodePen de
 * zadvorsky, avec les personnages d'openpeeps.com. Sa licence est libre pour
 * un usage commercial À CONDITION de citer Skiper UI : l'attribution est
 * affichée en bas de l'écran, elle n'est pas décorative.
 *
 * POURQUOI IL EST RÉÉCRIT ET PAS COPIÉ. L'original est du React avec Tailwind
 * et TypeScript. Ce site est du HTML et du JavaScript nus — pas de build, pas
 * de composants. Le collerait-on qu'il ne s'exécuterait pas. Ce qui compte
 * dans ce composant n'est ni React ni Tailwind : c'est la boucle canvas et les
 * trajectoires. C'est ça qui est porté ici, à l'identique.
 *
 * ET LES DEUX FICHIERS SONT SERVIS EN LOCAL : la planche de personnages et
 * GSAP sont copiés dans le dossier du site. Un écran d'accueil qui dépend d'un
 * serveur étranger est un écran qui tombe le jour où ce serveur tombe.
 */
(function () {
  "use strict";

  var PLANCHE = "images/foule-peeps.png";
  var RANGS = 15, COLONNES = 7;     // découpage de la planche, mesuré : 240 x 324 par case

  function demarrer(canvas) {
    if (!canvas || !window.gsap) return function () {};
    var ctx = canvas.getContext("2d");
    if (!ctx) return function () {};

    var gsap = window.gsap;
    var auHasard = function (a, b) { return a + Math.random() * (b - a); };
    var indexAuHasard = function (t) { return auHasard(0, t.length) | 0; };
    var retirer = function (t, i) { return t.splice(i, 1)[0]; };
    var retirerCet = function (t, x) { return retirer(t, t.indexOf(x)); };
    var retirerAuHasard = function (t) { return retirer(t, indexAuHasard(t)); };
    var prendreAuHasard = function (t) { return t[indexAuHasard(t) | 0]; };

    var scene = { largeur: 0, hauteur: 0 };
    var tous = [], libres = [], foule = [];

    /* Chaque personnage repart d'un bord au hasard. Le décalage vertical
       n'est pas cosmétique : c'est lui qui donne la profondeur, ceux du bas
       paraissent plus près. */
    function replacer(p) {
      var sens = Math.random() > 0.5 ? 1 : -1;
      var decalY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      var departY = scene.hauteur - p.hauteur + decalY;
      var departX, finX;
      if (sens === 1) { departX = -p.largeur; finX = scene.largeur; p.echelleX = 1; }
      else { departX = scene.largeur + p.largeur; finX = 0; p.echelleX = -1; }
      p.x = departX; p.y = departY; p.ancreY = departY;
      return { departX: departX, departY: departY, finX: finX };
    }

    /* La marche : une traversée lente, et un petit rebond vertical par-dessus.
       C'est le rebond qui fait qu'on lit « quelqu'un qui marche » plutôt que
       « une image qui glisse ». */
    function marcher(p, d) {
      var dureeX = 10, dureeY = 0.25;
      var tl = gsap.timeline();
      tl.timeScale(auHasard(0.5, 1.5));
      tl.to(p, { duration: dureeX, x: d.finX, ease: "none" }, 0);
      tl.to(p, { duration: dureeY, repeat: dureeX / dureeY, yoyo: true, y: d.departY - 10 }, 0);
      return tl;
    }

    function creer(image, decoupe) {
      var p = {
        image: image, decoupe: decoupe,
        largeur: decoupe[2], hauteur: decoupe[3],
        x: 0, y: 0, ancreY: 0, echelleX: 1, marche: null
      };
      p.dessiner = function (c) {
        c.save();
        c.translate(p.x, p.y);
        c.scale(p.echelleX, 1);
        c.drawImage(p.image, p.decoupe[0], p.decoupe[1], p.decoupe[2], p.decoupe[3],
                    0, 0, p.largeur, p.hauteur);
        c.restore();
      };
      return p;
    }

    function ajouter() {
      var p = retirerAuHasard(libres);
      if (!p) return null;
      p.marche = marcher(p, replacer(p)).eventCallback("onComplete", function () {
        retirerCet(foule, p); libres.push(p); ajouter();
      });
      foule.push(p);
      foule.sort(function (a, b) { return a.ancreY - b.ancreY; });   // les plus bas devant
      return p;
    }

    function remplir() { while (libres.length) { var p = ajouter(); if (p) p.marche.progress(Math.random()); } }

    function rendre() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      for (var i = 0; i < foule.length; i++) foule[i].dessiner(ctx);
      ctx.restore();
    }

    function redimensionner() {
      var dpr = window.devicePixelRatio || 1;
      scene.largeur = canvas.clientWidth;
      scene.hauteur = canvas.clientHeight;
      canvas.width = scene.largeur * dpr;
      canvas.height = scene.hauteur * dpr;
      for (var i = 0; i < foule.length; i++) foule[i].marche.kill();
      foule.length = 0; libres.length = 0;
      libres.push.apply(libres, tous);
      remplir();
    }

    var img = document.createElement("img");
    img.onload = function () {
      var l = img.naturalWidth / RANGS, h = img.naturalHeight / COLONNES;
      for (var i = 0; i < RANGS * COLONNES; i++) {
        tous.push(creer(img, [(i % RANGS) * l, ((i / RANGS) | 0) * h, l, h]));
      }
      redimensionner();
      gsap.ticker.add(rendre);
    };
    img.src = PLANCHE;

    window.addEventListener("resize", redimensionner);

    return function arreter() {
      window.removeEventListener("resize", redimensionner);
      gsap.ticker.remove(rendre);
      for (var i = 0; i < foule.length; i++) if (foule[i].marche) foule[i].marche.kill();
    };
  }

  function pret(f) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", f);
    else f();
  }

  pret(function () {
    var canvas = document.getElementById("gate-foule");
    if (!canvas) return;
    /* Moins d'animation : on ne fait pas marcher trente personnages devant
       quelqu'un qui a demandé le calme. La planche reste, figée. */
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }
    demarrer(canvas);
  });
})();
