/* edition.js — le mode édition de Lenny.
 *
 * On l'allume en ajoutant `?edition` à l'adresse :
 *     http://127.0.0.1:3311/pour-les-agences.html?edition
 *
 * POURQUOI IL EXISTE. Lenny, le 23/09/2026 : « je veux le faire de moi-même,
 * changer de place des trucs ou le texte ». Éditer du HTML à la main pour
 * déplacer un paragraphe, c'est chercher la bonne balise dans 500 lignes. Ici il
 * clique et il écrit.
 *
 * CE QU'IL PERMET :
 *   - écrire directement dans n'importe quel titre, paragraphe ou bouton ;
 *   - attraper une section par sa poignée et la faire monter ou descendre ;
 *   - tout annuler d'un bouton, tant que rien n'est enregistré.
 *
 * CE QU'IL NE FAIT PAS, ET C'EST VOULU : il n'enregistre RIEN tout seul. Le
 * bouton « Copier le HTML » met la page modifiée dans le presse-papier ; c'est
 * Lenny qui colle dans le fichier, ou qui me le donne. Une page qui se
 * sauvegarde sans qu'on le demande finit par écraser ce qu'on voulait garder.
 *
 * ET SURTOUT : ce fichier ne se charge JAMAIS sans `?edition` dans l'adresse.
 * Les visiteurs de pibts.netlify.app n'en voient pas une ligne.
 */
(function () {
  /* 25/09 — sur l'écran de déverrouillage, ?editeur charge maintenant l'éditeur
     du portfolio (lenny-edition-libre.js) ; celui-ci reste sur ?edition. */
  if (!/[?&]edition\b/.test(location.search)) return;

  var MODIFIABLES = "h1, h2, h3, p, summary, li span, .bouton, .surtitre, .chiffre, .compte, .duree, " +
    /* 25/09 — l'écran de verrouillage entre dans le mode édition. Lenny :
       « je veux monter l'endroit où on met le mot de passe » et « le même mode
       éditeur que pour le portfolio, pour modifier le texte et tout ». */
    /* Le grand titre n'y est plus : il est tapé phrase par phrase et
       écraserait la correction. Ses phrases se modifient dans le panneau
       Réglages. */
    ".gate-brand, .gate-sous, .gate-btn-tx, .gate-foot-badge";

  /* 23/09 — Lenny : « je veux pouvoir déplacer des blocs de texte ». La première
     version ne déplaçait que des sections entières ; il voulait bouger un
     paragraphe, une carte, une cellule. Chaque bloc de cette liste devient
     déplaçable DANS SON PARENT : une carte reste dans sa grille, un paragraphe
     dans sa section. On ne déplace jamais un bloc d'une section à l'autre —
     c'est ce qui casserait la mise en page sans qu'il comprenne pourquoi. */
  var DEPLACABLES = "section, .ouverture, .carte, .fonction, .famille, details, .signature, ul.modules > li, .texte, .accroche, " +
    /* Le bloc de saisie et le bloc de titre se déplacent l'un par rapport à
       l'autre : c'est ce qui permet de remonter le mot de passe sans toucher
       une ligne de CSS. */
    ".gate-hero, .gate-form, .gate-foot";

  /* ── la barre ─────────────────────────────────────────────────────────── */
  var barre = document.createElement("div");
  barre.id = "barre-edition";
  barre.innerHTML =
    '<span class="titre-barre">MODE ÉDITION</span>' +
    '<span class="aide">Clique un texte pour l\'écrire · ⠿ pour glisser · ↑ ↓ pour monter ou descendre un bloc</span>' +
    '<button id="copier">Copier le HTML</button>' +
    '<button id="annuler" class="secondaire">Tout annuler</button>' +
    '<span id="etat"></span>';
  document.body.appendChild(barre);

  var style = document.createElement("style");
  style.textContent =
    "#barre-edition{position:fixed;left:0;right:0;bottom:0;z-index:2147483500;display:flex;align-items:center;" +
    "gap:14px;padding:12px 18px;background:#141110;border-top:2px solid #e50914;font-family:Manrope,sans-serif;" +
    "font-size:13.5px;color:#f5f1ef;flex-wrap:wrap}" +
    "#barre-edition .titre-barre{font-weight:800;letter-spacing:.14em;color:#e50914}" +
    "#barre-edition .aide{color:#8b807a;flex:1;min-width:200px}" +
    "#barre-edition button{font:inherit;font-weight:700;border:none;border-radius:7px;padding:9px 16px;" +
    "background:#e50914;color:#fff;cursor:pointer}" +
    "#barre-edition button.secondaire{background:transparent;color:#b9aea8;border:1px solid #3a322e}" +
    "#etat{color:#ffb3b6;min-width:120px}" +
    "body{padding-bottom:64px}" +
    "[contenteditable]:hover{outline:1px dashed rgba(229,9,20,.55);outline-offset:3px}" +
    "[contenteditable]:focus{outline:2px solid #e50914;outline-offset:3px}" +
    ".poignee{position:absolute;left:8px;top:8px;z-index:50;cursor:grab;background:#141110;color:#e50914;" +
    "border:1px solid #3a322e;border-radius:7px;padding:5px 9px;font-size:15px;line-height:1;user-select:none}" +
    ".poignee.petite{left:auto;right:6px;top:6px;padding:2px 6px;font-size:12px;opacity:.35}" +
    "[data-deplacable]:hover > .poignee.petite{opacity:1}" +
    ".fleche{position:absolute;right:6px;z-index:50;background:#141110;color:#b9aea8;border:1px solid #3a322e;" +
    "border-radius:6px;width:22px;height:20px;font-size:11px;line-height:1;cursor:pointer;padding:0;opacity:0}" +
    "[data-deplacable]:hover > .fleche{opacity:1}" +
    ".fleche:nth-last-of-type(2){top:30px}.fleche:last-of-type{top:54px}" +
    ".deplace{opacity:.45}" +
    ".cible-avant{box-shadow:inset 0 4px 0 #e50914}" +
    ".cible-apres{box-shadow:inset 0 -4px 0 #e50914}";
  document.head.appendChild(style);

  /* ── écrire ───────────────────────────────────────────────────────────── */
  var textes = document.querySelectorAll(MODIFIABLES);
  for (var i = 0; i < textes.length; i++) {
    if (textes[i].closest("#barre-edition")) continue;
    if (textes[i].closest(".gate-h1, #lenny-editeur")) continue;   // titre tapé : ses phrases sont dans le panneau
    textes[i].setAttribute("contenteditable", "plaintext-only");
    textes[i].addEventListener("input", touche);
  }

  /* ── déplacer ─────────────────────────────────────────────────────────── */
  var blocs = Array.prototype.slice.call(document.querySelectorAll(DEPLACABLES))
    .filter(function (b) { return !b.closest("#barre-edition"); });
  blocs.forEach(function (bloc) {
    bloc.style.position = bloc.style.position || "relative";
    bloc.setAttribute("data-deplacable", "");
    var poignee = document.createElement("div");
    var estSection = bloc.matches("section, .ouverture");
    poignee.className = "poignee" + (estSection ? "" : " petite");
    poignee.textContent = "⠿";
    poignee.title = estSection ? "Faire glisser pour déplacer cette section"
                               : "Faire glisser pour déplacer ce bloc · ou ↑ ↓ au clavier";
    if (!estSection) {
      /* Un petit bloc se déplace aussi au clavier : sur un portable sans souris,
         le glisser-déposer est pénible, et deux flèches font le même travail. */
      var monte = document.createElement("button");
      monte.className = "fleche"; monte.textContent = "↑"; monte.title = "Monter ce bloc";
      monte.addEventListener("click", function (e) {
        e.stopPropagation();
        var av = bloc.previousElementSibling;
        while (av && !av.matches(DEPLACABLES)) av = av.previousElementSibling;
        if (av) { bloc.parentNode.insertBefore(bloc, av); touche(); }
      });
      var descend = document.createElement("button");
      descend.className = "fleche"; descend.textContent = "↓"; descend.title = "Descendre ce bloc";
      descend.addEventListener("click", function (e) {
        e.stopPropagation();
        var ap = bloc.nextElementSibling;
        while (ap && !ap.matches(DEPLACABLES)) ap = ap.nextElementSibling;
        if (ap) { bloc.parentNode.insertBefore(ap, bloc); touche(); }
      });
      bloc.appendChild(monte); bloc.appendChild(descend);
    }
    poignee.draggable = true;
    poignee.addEventListener("dragstart", function (e) {
      porte = bloc; bloc.classList.add("deplace");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", "bloc");
    });
    poignee.addEventListener("dragend", function () {
      bloc.classList.remove("deplace"); nettoyer();
    });
    bloc.appendChild(poignee);

    bloc.addEventListener("dragover", function (e) {
      if (!porte || porte === bloc || porte.parentNode !== bloc.parentNode) return;
      e.preventDefault(); nettoyer();
      var milieu = bloc.getBoundingClientRect().top + bloc.offsetHeight / 2;
      bloc.classList.add(e.clientY < milieu ? "cible-avant" : "cible-apres");
    });
    bloc.addEventListener("drop", function (e) {
      if (!porte || porte === bloc) return;
      if (porte.parentNode !== bloc.parentNode) { nettoyer(); return; }   // jamais d'une section à l'autre
      e.preventDefault();
      var milieu = bloc.getBoundingClientRect().top + bloc.offsetHeight / 2;
      bloc.parentNode.insertBefore(porte, e.clientY < milieu ? bloc : bloc.nextSibling);
      nettoyer(); touche();
    });
  });
  /* ── les numéros ──────────────────────────────────────────────────────────
     24/09 — Lenny : « remontre la page je comprends rien ». Il doit pouvoir me
     dire QUELLE section supprimer sans décrire son contenu. Chaque grande
     section porte donc son numéro, en gros, en haut à gauche. Ça ne sert qu'en
     mode édition et ça ne part jamais dans le HTML copié. */
  var grandes = document.querySelectorAll("body > .ouverture, body > section, main > .ouverture, main > section");
  for (var g = 0; g < grandes.length; g++) {
    var num = document.createElement("div");
    num.className = "numero-section";
    num.textContent = g + 1;
    grandes[g].style.position = grandes[g].style.position || "relative";
    grandes[g].appendChild(num);
  }
  style.textContent +=
    ".numero-section{position:absolute;left:0;top:0;z-index:60;background:#e50914;color:#fff;" +
    "font:800 26px/1 Manrope,sans-serif;padding:12px 18px;border-bottom-right-radius:12px;" +
    "pointer-events:none;letter-spacing:.02em}";

  var porte = null;
  function nettoyer() {
    blocs.forEach(function (b) { b.classList.remove("cible-avant", "cible-apres"); });
  }

  /* ── l'état ───────────────────────────────────────────────────────────── */
  var origine = document.documentElement.outerHTML;
  var modifie = false;
  function touche() {
    modifie = true;
    document.getElementById("etat").textContent = "modifiée, non enregistrée";
  }

  document.getElementById("annuler").addEventListener("click", function () {
    if (modifie && !confirm("Tout annuler et revenir à la page d'origine ?")) return;
    location.reload();
  });

  document.getElementById("copier").addEventListener("click", function () {
    /* On rend le HTML PROPRE : sans les poignées, sans la barre, sans les
       attributs d'édition. Ce qui est copié doit pouvoir remplacer le fichier
       tel quel, sinon ça ne sert à rien. */
    var copie = document.documentElement.cloneNode(true);
    var aRetirer = copie.querySelectorAll("#barre-edition, .poignee, .fleche, .numero-section, script[src$='edition.js']");
    for (var k = 0; k < aRetirer.length; k++) aRetirer[k].remove();
    var edites = copie.querySelectorAll("[contenteditable]");
    for (var j = 0; j < edites.length; j++) {
      edites[j].removeAttribute("contenteditable");
      edites[j].classList.remove("deplace", "cible-avant", "cible-apres");
      edites[j].removeAttribute("data-deplacable");
      if (edites[j].getAttribute("class") === "") edites[j].removeAttribute("class");
    }
    var restes = copie.querySelectorAll("[data-deplacable]");
    for (var n = 0; n < restes.length; n++) restes[n].removeAttribute("data-deplacable");
    var propres = copie.querySelectorAll('[style*="position: relative"]');
    for (var m = 0; m < propres.length; m++) {
      if (propres[m].getAttribute("style").trim() === "position: relative;") propres[m].removeAttribute("style");
    }
    var html = "<!doctype html>\n" + copie.outerHTML;
    navigator.clipboard.writeText(html).then(function () {
      document.getElementById("etat").textContent = "copié — colle-le dans le fichier";
    })["catch"](function () {
      document.getElementById("etat").textContent = "le presse-papier a refusé ; ouvre la console";
      console.log(html);
    });
  });

  window.addEventListener("beforeunload", function (e) {
    if (modifie) { e.preventDefault(); e.returnValue = ""; }
  });
})();
