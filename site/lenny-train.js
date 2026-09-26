/* lenny-train.js — LA CLASSE MONTE DANS LE TRAIN.
 *
 * Idée de Lenny, le 25/09/2026 : « les petits personnages de l'écran
 * d'authentification, les faire monter dans un train qui arrive depuis la
 * gauche, ils montent tous dedans, et après on le voit partir, en utilisant
 * le même style graphique ».
 *
 * POURQUOI C'EST MIEUX QUE LA VIDÉO DE MÉTRO qu'on avait avant : la porte
 * montrait des personnages dessinés au trait, et l'écran suivant un métro
 * photoréaliste. Deux mondes à une seconde d'intervalle. Ici tout est du même
 * trait. Et ça raconte l'argument au lieu de l'écrire : la classe monte, et
 * l'alternant monte avec elle.
 *
 * ET ÇA NE PÈSE RIEN. Plus de fichier vidéo de cinq mégaoctets, plus de
 * latence au défilement, plus d'arbitrage entre netteté et poids : tout est
 * tracé à la volée.
 *
 * LE TRAIN EST DESSINÉ ICI, au trait épais, noir sur clair, parce que la
 * planche de personnages n'en contient pas. C'est le seul endroit où ça peut
 * rater : un wagon mal tracé à côté de personnages soignés ferait bricolage.
 *
 * LA SÉQUENCE, EN QUATRE TEMPS :
 *   1. la foule marche, comme avant
 *   2. le train entre par la gauche et freine au centre
 *   3. les portes s'ouvrent, les personnages convergent et disparaissent dedans
 *   4. les portes se ferment, le train repart vers la droite
 */
(function () {
  "use strict";

  var PLANCHE = "images/foule-peeps.png";
  var RANGS = 15, COLONNES = 7;

  /* Le trait du train reprend celui des personnages : noir dense, épais,
     sans dégradé. Toute finesse ici jurerait avec eux. */
  var ENCRE = "#14100e";
  var CLAIR = "#f6f2ed";
  var VITRE = "#d8d0c7";

  function pret(f) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", f);
    else f();
  }

  pret(function () {
    var canvas = document.getElementById("gate-foule");
    if (!canvas || !window.gsap) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    var gsap = window.gsap;
    var hasard = function (a, b) { return a + Math.random() * (b - a); };
    var idx = function (t) { return hasard(0, t.length) | 0; };
    var oter = function (t, i) { return t.splice(i, 1)[0]; };
    var oterCet = function (t, x) { var i = t.indexOf(x); return i < 0 ? null : oter(t, i); };
    var oterAuHasard = function (t) { return oter(t, idx(t)); };

    /* 25/09 — LES RÉGLAGES VIVENT DANS UN SEUL OBJET, et le mode éditeur les
       change à chaud. Lenny passait son temps à me dire « plus gros », « pas
       assez de monde » et à attendre que je recompile : maintenant il tourne
       les boutons lui-même et me donne les chiffres retenus. */
    var REG = window.LennyReglages = window.LennyReglages || {
      monde: 34,          // silhouettes présentes en même temps (105 au maximum)
      taille: 1,          // multiplicateur sur la taille des personnages
      hautBande: 100,     // où marche le plus proche, en pixels sous le bas
      profondeur: 250,    // étalement vertical de la foule
      vitesse: 1,         // multiplicateur de la vitesse de marche
      zoomTrain: 0.8,     // hauteur de la rame, en fraction de la toile
      solTrain: 1         // 1 = le bas des portes touche le bas de l'écran
    };

    var scene = { l: 0, h: 0 };
    var voile = { foule: 1 };   // 1 = la classe du quai est là, 0 = elle a disparu
    var tous = [], libres = [], foule = [];

    /* ── le train ─────────────────────────────────────────────────────────
       Ses proportions sont données en fraction de la hauteur du canvas pour
       qu'il reste à l'échelle des personnages sur tous les écrans. */
    /* ── le train ─────────────────────────────────────────────────────────
       25/09 — LE WAGON N'EST PLUS DESSINÉ À LA MAIN : c'est une image générée
       avec la planche de personnages en référence de style, donc exactement le
       même trait. Ce que j'avais tracé au canvas était correct mais approximatif.

       ET ON NE LE MONTRE PAS EN ENTIER. Lenny : « faut juste qu'on ait la vue
       sur les portes et les rails, pas sur le reste ». On agrandit donc le
       wagon bien au-delà de l'écran et on cadre sur sa double porte : les
       personnages arrivent à hauteur de porte, on lit le geste au lieu de
       regarder un wagon de loin. */
    /* 25/09 — TROIS PORTES. Lenny : « dans le train fais plusieurs portes ».
       Le wagon en a maintenant trois, repérées sur le dessin en mesurant les
       montants verticaux : elles tombent à 20,5 %, 49,4 % et 76 % de la
       largeur. La classe se répartit entre elles au lieu de faire la queue à
       une seule — c'est ce qui donne l'impression d'un vrai quai. */
    /* 25/09, quatrième version — ON NE MONTE PLUS DEDANS. Lenny : « au pire
       on fait juste un train qui passe, mais faut qu'il soit vraiment bien
       fait ». Tout le mécanisme d'embarquement disparaît : plus de portes qui
       s'ouvrent, plus de personnages aspirés vers un battant. Un train
       traverse, derrière la classe, et c'est tout.

       CE QUI FAIT QU'UN TRAIN QUI PASSE EST CRÉDIBLE, et qui manquait :
         — il est LONG. Une seule voiture qui traverse, ça lit « jouet ». On
           répète la tranche centrale du dessin pour composer une rame.
         — la VOIE NE BOUGE PAS. Les rails du dessin faisaient corps avec la
           voiture et glissaient avec elle : on les détache et on les pose,
           fixes, en travers de l'écran.
         — il FILE. Trois copies fantômes traînent derrière la rame : c'est le
           filé du mouvement, celui qu'on voit sur une photo au 1/30e.
         — il TREMBLE. Un demi-pixel de roulis sur les joints de rail.

       Toutes les valeurs ci-dessous sont des fractions du dessin source, donc
       la rame garde ses proportions quelle que soit la taille de l'écran. */
    var T_HAUT   = 0.20;    // au-dessus du pantographe
    var T_BAS    = 0.668;   // sous les roues, juste au-dessus du rail
    var T_NEZ    = 0.018;   // bord gauche du nez
    var T_QUEUE  = 0.983;   // bord droit de la queue
    var T_CORPS_G = 0.165;  // la tranche qu'on répète : après le nez…
    var T_CORPS_D = 0.950;  // …et avant la queue
    var R_HAUT = 0.664, R_BAS = 0.712;   // la voie, détachée de la voiture
    var VOITURES = 4;       // une motrice et trois remorques

    var train = {
      img: null, pret: false,
      p: 0,                    // 0 = hors champ à gauche, 1 = hors champ à droite
      visible: false,
      echelle: 1
    };

    var imgTrain = document.createElement("img");
    imgTrain.onload = function () { train.img = imgTrain; train.pret = true; };
    /* 25/09 soir — LA RAME, PAS L'IMAGE BRUTE. Lenny : « on voit seulement les
       portes arriver en bas de l'écran, pas la roue, pas les rails », et « pas
       de flou, pas de trucs bizarres ». train-rame.webp est fabriquée depuis
       train-quai.jpg : seule la bande des portes, une cabine arrière (l'avant
       retourné) pour que la rame ait une fin quand elle repart, fond opaque
       à la couleur de la page, trait redessiné net à 1,5×. */
    imgTrain.src = "images/train-rame.webp";

    /* 25/09, cinquième version — ON NE DESSINE PLUS LE TRAIN, ON L'A.
       Lenny a fabriqué le quai lui-même et me l'a donné : une rame à l'arrêt,
       portes ouvertes, la classe déjà dedans, tout au trait d'encre épais.
       « Le train arrive, il s'arrête au milieu de l'écran, et ils sont tous
       déjà à l'intérieur. »

       Il n'y a donc plus de voiture à découper, plus de rame à composer, plus
       de voie à carreler. Il reste UN geste : l'image entre en glissant, elle
       décélère, elle s'immobilise. C'est le freinage d'une rame en station, et
       rien d'autre ne doit bouger — un train qui s'arrête, on le lit au
       ralentissement, pas à l'effet. */
    /* 25/09, septième version — VU DE CÔTÉ, DEPUIS LE QUAI.
       Lenny, après que j'ai compris de travers : « j'ai pas dit vu depuis les
       rails, j'ai dit vu de côté », puis « comme quelqu'un qui le verrait
       rentrer en gare depuis le quai ».

       Le point de vue est donc celui d'un voyageur debout sur le quai : la rame
       arrive par la gauche, longe le quai devant lui, et freine jusqu'à
       s'arrêter. Il ne la voit jamais de face — il voit son flanc défiler, les
       vitres pleines de monde passer, puis s'immobiliser en face de lui.

       Le dessin porte tout le reste : les portes ouvertes, la classe entière
       derrière chaque vitre, le conducteur qui fait signe. Il n'y a plus qu'une
       chose à animer, la position, et une seule chose qui compte dans sa
       courbe : le freinage. */
    /* Repères dans train-rame.webp, en pixels de l'image : les ouvertures
       où se tiennent les voyageurs, mesurées sur les montants du dessin. */
    var OUVERTURES = [
      [711, 215, 449, 328],    // vitre de la cabine arrière
      [1315, 166, 459, 746],    // porte 1, mains sur les vantaux comprises
      [1971, 215, 346, 328],    // vitre 1
      [2490, 166, 470, 746],    // porte 2
      [3115, 215, 447, 328]     // vitre 2
    ];
    var CENTRE_PORTES = 2135;   // entre les deux portes : là où la rame s'arrête

    /* 25/09 soir — CHAQUE VOYAGEUR BOUGE. Lenny : « j'aurais aimé qu'il anime
       chacun des personnages ». Le code ne peut pas séparer les gens d'un seul
       dessin : la partie des deux portes est une vidéo Kling (7,5 crédits,
       accord de Lenny), faite depuis ce même dessin, train immobile, même
       image au début et à la fin pour boucler sans à-coup. Elle se pose
       exactement sur sa zone de train-rame.webp. */
    /* 25/09 soir, deuxième passe — TOUTE LA RAME BOUGE. Lenny : « je voulais
       que tout le monde dans le train soit hyper animé ». Trois vidéos Kling
       (22,5 crédits, accord de Lenny) couvrent la rame d'un bout à l'autre.
       Elles se raccordent sur les bandes pleines des vantaux, là où il n'y a
       ni personne ni vitre : un raccord ne coupe jamais un voyageur.
       `cadre` = ce que la vidéo couvre dans train-rame.webp (l'image de départ
       envoyée à Kling, marges comprises) ; `zone` = la part qu'on en garde. */
    var VIDEOS = [
      { src: "images/train-v1.mp4", cadre: [0, 0, 1666, 937],     zone: [0, 1150] },
      { src: "images/train-v2.mp4", cadre: [1150, -85, 1968, 1107], zone: [1150, 3118] },
      { src: "images/train-v3.mp4", cadre: [2609, 0, 1666, 937],  zone: [3118, 4275] }
    ];
    VIDEOS.forEach(function (v) {
      var el = document.createElement("video");
      el.muted = true; el.loop = true; el.playsInline = true;
      el.setAttribute("playsinline", ""); el.preload = "auto";
      el.src = v.src;
      v.el = el;
    });
    var calque = document.createElement("canvas");
    function videosEnMarche(oui) {
      VIDEOS.forEach(function (v) {
        try {
          if (!oui) { v.el.pause(); return; }
          v.el.currentTime = 0;
          var pr = v.el.play(); if (pr && pr.catch) pr.catch(function () {});
        } catch (e) {}
      });
    }

    function dessinerTrain(c, t) {
      if (!train.visible || !train.pret) return;
      var img = train.img, iw = img.naturalWidth, ih = img.naturalHeight;
      var h = scene.h * REG.zoomTrain;
      var e = h / ih, w = iw * e;
      var xArret = scene.l / 2 - CENTRE_PORTES * e;
      // p = 0 hors champ à gauche, 1 à l'arrêt, 2 parti à droite (vers le site)
      var x = xArret + (train.p - 1) * (w + scene.l * 0.2);
      var y = (scene.h - h) * REG.solTrain;
      x = Math.round(x);   // pas de demi-pixel : le trait reste net
      c.drawImage(img, x, y, w, h);

      /* LA VIE À L'INTÉRIEUR. Chaque porte et chaque fenêtre oscille d'un pixel
         et demi, chacune à son rythme : les voyageurs bougent, la carrosserie
         non. On redessine l'ouverture décalée, rognée à son cadre. */
      /* Les vidéos sont opaques jusqu'au bord de leur cadre : devant les
         cabines arrondies, ce fond débordait sur la foule. On les peint dans
         une toile à part, découpée à la silhouette exacte de la rame. */
      var toutesPretes = VIDEOS.every(function (v) { return v.el.readyState >= 2; });
      if (toutesPretes) {
        // à la résolution de l'écran, sinon la rame devient floue sur Retina
        var dpr = window.devicePixelRatio || 1;
        var tw = Math.ceil(w * dpr), th = Math.ceil(h * dpr), ec = e * dpr;
        if (calque.width !== tw || calque.height !== th) { calque.width = tw; calque.height = th; }
        var cc = calque.getContext("2d");
        cc.globalCompositeOperation = "source-over";
        cc.clearRect(0, 0, tw, th);
        VIDEOS.forEach(function (v) {
          var el = v.el;
          var k = el.videoWidth / v.cadre[2];           // pixels vidéo par pixel d'image
          var zx = v.zone[0], zw = v.zone[1] - v.zone[0];
          cc.drawImage(el, (zx - v.cadre[0]) * k, (0 - v.cadre[1]) * k, zw * k, ih * k,
                       zx * ec, 0, zw * ec, th);
        });
        cc.globalCompositeOperation = "destination-in";
        cc.drawImage(img, 0, 0, tw, th);
        c.drawImage(calque, x, y, w, h);
      }
      // les vidéos animent déjà tous les voyageurs : le balancement ne sert
      // qu'en attendant qu'elles soient chargées
      if (toutesPretes) return;

      for (var i = 0; i < OUVERTURES.length; i++) {
        var o = OUVERTURES[i];
        var dy = Math.sin(t * (2.2 + i * 0.37) + i * 1.9) * 1.5;
        var ox = x + o[0] * e, oy = y + o[1] * e, ow = o[2] * e, oh = o[3] * e;
        c.save();
        c.beginPath(); c.rect(ox, oy, ow, oh); c.clip();
        c.drawImage(img, o[0], o[1], o[2], o[3], ox, oy + dy, ow, oh);
        c.restore();
      }
    }

    /* ── les personnages ──────────────────────────────────────────────── */
    function placer(p) {
      var sens = Math.random() > 0.5 ? 1 : -1;
      var dy = REG.hautBande - REG.profondeur * gsap.parseEase("power2.in")(Math.random());
      var y0 = scene.h - p.h + dy;
      var x0, x1;
      if (sens === 1) { x0 = -p.l; x1 = scene.l; p.ex = 1; }
      else { x0 = scene.l + p.l; x1 = 0; p.ex = -1; }
      p.x = x0; p.y = y0; p.ancre = y0;
      return { x0: x0, y0: y0, x1: x1 };
    }

    function marche(p, d) {
      var dx = 10, dy = 0.25;
      var tl = gsap.timeline();
      tl.timeScale(hasard(0.5, 1.5) * REG.vitesse);
      tl.to(p, { duration: dx, x: d.x1, ease: "none" }, 0);
      // le pas : on monte, on retombe
      tl.to(p, { duration: dy, repeat: dx / dy, yoyo: true, y: d.y0 - 10, ease: "sine.inOut" }, 0);
      // la bascule d'un appui à l'autre, deux fois plus lente que le rebond
      tl.to(p, { duration: dy * 2, repeat: dx / (dy * 2), yoyo: true,
                 angle: (p.ex > 0 ? 1 : -1) * 0.055, ease: "sine.inOut" }, 0);
      // l'écrasement à l'appui, calé sur le rebond
      tl.to(p, { duration: dy, repeat: dx / dy, yoyo: true, ecrase: 0.975, ease: "sine.inOut" }, 0);
      return tl;
    }

    function creer(img, dec) {
      var p = { img: img, dec: dec, l0: dec[2], h0: dec[3], l: dec[2], h: dec[3], x: 0, y: 0, ancre: 0, ex: 1,
                tl: null, opacite: 1, angle: 0, ecrase: 1 };
      /* 25/09 — Lenny : « je veux voir les gens marcher physiquement ».
         La planche ne contient qu'UNE pose par personnage : il n'y a pas de
         deuxième image avec l'autre jambe devant, donc un vrai cycle de marche
         est impossible. Ce qui se fait à la place, et qui est le procédé
         classique de l'animation à plat : on fait basculer la silhouette d'un
         côté puis de l'autre AUTOUR DE SES PIEDS, et on l'écrase très
         légèrement à chaque appui. L'œil lit une foulée. Le balancement
         vertical seul, qu'on avait, ne lisait que « ça flotte ». */
      p.dessiner = function (c) {
        c.save();
        c.globalAlpha = p.opacite;
        c.translate(p.x + p.l / 2, p.y + p.h);   // pivot aux pieds
        c.rotate(p.angle);
        c.scale(p.ex, p.ecrase);
        c.drawImage(p.img, p.dec[0], p.dec[1], p.dec[2], p.dec[3], -p.l / 2, -p.h, p.l, p.h);
        c.restore();
      };
      return p;
    }

    function ajouter() {
      var p = oterAuHasard(libres);
      if (!p) return null;
      p.opacite = 1;
      p.tl = marche(p, placer(p)).eventCallback("onComplete", function () {
        oterCet(foule, p); libres.push(p);
        if (foule.length < REG.monde) ajouter();
      });
      foule.push(p);
      foule.sort(function (a, b) { return a.ancre - b.ancre; });
      return p;
    }

    /* Cent cinq personnages, c'était une foule de festival : ils se
       chevauchaient sur trois épaisseurs et masquaient tout. Une classe, c'est
       une trentaine de silhouettes — on les distingue, et on voit le train
       derrière. */
    /* Combien de silhouettes vivent à l'écran en même temps. La planche en
       contient 105 ; 34 suffisent au portail, mais la capture vidéo en demande
       davantage — d'où la surcharge. */
    function remplir() {
      while (libres.length && foule.length < REG.monde) {
        var p = ajouter();
        if (p) p.tl.progress(Math.random());
      }
    }

    function rendre() {
      var dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      /* 25/09 — LE TRAIN PASSE DEVANT, PAS DERRIÈRE. Derrière une classe de
         trente silhouettes, il ne restait de lui qu'un liseré entre deux
         têtes : on avait dessiné un train que personne ne voyait. Sur un vrai
         quai, la rame balaie le champ juste devant vous et cache tout le
         monde une seconde. C'est ce passage-là qu'on veut. */
      /* La rame est sur la voie, la classe est sur le quai : elle arrive donc
         DERRIÈRE les silhouettes du premier plan. */
      /* La classe du quai s'efface pendant que la rame entre : c'est elle qui
         créait ce voile sur les têtes dont Lenny parlait, et de toute façon
         on ne regarde plus qu'une chose à ce moment-là. */
      if (voile.foule > 0.01) {
        ctx.globalAlpha = voile.foule;
        for (var i = 0; i < foule.length; i++) foule[i].dessiner(ctx);
        ctx.globalAlpha = 1;
      }
      /* 25/09 soir — la rame passe PAR-DESSUS la classe (Lenny). */
      dessinerTrain(ctx, gsap.ticker.time);
      ctx.restore();
    }

    function redimensionner() {
      var dpr = window.devicePixelRatio || 1;
      scene.l = canvas.clientWidth;
      scene.h = canvas.clientHeight;
      canvas.width = scene.l * dpr;
      canvas.height = scene.h * dpr;
      /* 25/09, deuxième passe : au premier essai le train était dessiné
         correctement mais NOYÉ — trop bas, trop petit, et cent cinq
         personnages devant lui. On ne voyait que sa ligne de toit. Il occupe
         maintenant les deux tiers de la hauteur et se pose au-dessus du sol,
         de sorte que les personnages lui arrivent à la taille. */
      /* 25/09, deuxième cadrage. Le premier agrandissait le wagon de trois
         fois la largeur de l'écran : on ne voyait plus qu'une bande noire et
         une roue. Le bon repère n'est pas la largeur, c'est la DISTANCE ENTRE
         LE HAUT DE LA PORTE ET LES RAILS — c'est elle qui doit remplir les
         deux tiers de la hauteur, pour qu'un personnage arrive à hauteur de
         porte comme sur un vrai quai. */
      for (var i = 0; i < foule.length; i++) foule[i].tl.kill();
      foule.length = 0; libres.length = 0;
      for (var j = 0; j < tous.length; j++) {
        tous[j].l = tous[j].l0 * REG.taille;
        tous[j].h = tous[j].h0 * REG.taille;
      }
      libres.push.apply(libres, tous);
      remplir();
    }

    /* ── la séquence ──────────────────────────────────────────────────────
       Elle arrive et elle reste. Le `power3.out` fait tout le travail : vite
       au début, presque rien à la fin. C'est exactement la courbe d'une rame
       qui freine, et c'est pour ça qu'on ne met pas de rebond dessus. */
    /* ── la séquence ──────────────────────────────────────────────────────
       Le code est bon. Alors, dans cet ordre exactement :
         la rame entre par la gauche en freinant,
         pendant ce temps le quai se vide et tout le texte s'en va,
         elle s'immobilise une seconde au milieu de l'écran,
         elle repart vers la droite — ET LE SITE S'OUVRE À CET INSTANT-LÀ.

       Lenny : « quand il repart, il ouvre le site direct ». Le site n'apparaît
       donc pas après le film, il apparaît PENDANT, découvert par la rame qui
       s'en va. C'est le même geste qu'un rideau qu'on tire. */
    function sequence() {
      var tl = gsap.timeline({ paused: true });

      tl.call(function () {
        train.visible = true;
        videosEnMarche(true);
        train.p = 0;
        voile.foule = 1;
        var g = document.getElementById("lenny-gate");
        if (g) g.classList.add("train-passe");   // le texte et le champ s'effacent
      });

      tl.to(train, { duration: 3.0, p: 1, ease: "power3.out" }, 0);
      tl.to(voile, { duration: 1.3, foule: 0, ease: "power2.in" }, 0);

      tl.to({}, { duration: 0.9 });              // l'arrêt en gare

      tl.call(function () {
        /* Il repart : on lève le rideau tout de suite, le site se découvre
           derrière elle au lieu d'attendre qu'elle soit sortie du cadre. */
        if (typeof window.__trainFini === "function") window.__trainFini();
      });
      tl.to(train, { duration: 2.2, p: 2, ease: "power2.in" });
      tl.call(function () { train.visible = false; videosEnMarche(false); });

      return tl;
    }

    var img = document.createElement("img");
    img.onload = function () {
      var l = img.naturalWidth / RANGS, h = img.naturalHeight / COLONNES;
      for (var i = 0; i < RANGS * COLONNES; i++) {
        tous.push(creer(img, [(i % RANGS) * l, ((i / RANGS) | 0) * h, l, h]));
      }
      redimensionner();
      gsap.ticker.add(rendre);
      var film = sequence();
      /* La porte appelle ceci quand le code est validé. Tant que personne
         n'appelle, la classe marche simplement sur le quai. */
      window.LennyTrain = {
        /* Exposés pour la capture image par image : on endort le ticker de gsap,
           on avance le temps à la main et on redessine. Aucune image perdue,
           même si la machine rame. */
        film: film,
        rendre: rendre,
        canvas: canvas,
        reglages: REG,
        /* L'éditeur appelle ceci après avoir tourné un bouton : on refabrique
           la foule avec les nouvelles valeurs, sans recharger la page. */
        rafraichir: redimensionner,
        partir: function (quandFini) {
          window.__trainFini = quandFini || null;
          film.play(0);
          return film.duration() * 1000;
        }
      };
    };
    img.src = PLANCHE;

    window.addEventListener("resize", redimensionner);
  });
})();
