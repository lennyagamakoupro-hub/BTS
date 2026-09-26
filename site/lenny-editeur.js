/* lenny-editeur.js — LE MODE ÉDITEUR DE L'ÉCRAN D'ACCUEIL.
 *
 * Demandé par Lenny le 25/09/2026 : « mets le mode éditeur là sur le site ».
 *
 * CE QU'IL RÉSOUT. Jusqu'ici chaque réglage de la foule et du train passait par
 * moi : il disait « plus gros », « pas assez de monde », j'éditais un chiffre,
 * il rechargeait, on recommençait. Le panneau ci-dessous met les mêmes chiffres
 * sous ses doigts, en direct, sans rechargement.
 *
 * OÙ IL APPARAÎT. Nulle part par défaut. Il faut `?editeur` dans l'adresse, ou
 * la combinaison Maj + E sur l'écran de verrouillage. Un visiteur ne le verra
 * jamais.
 *
 * CE QU'IL GARDE. Les valeurs sont enregistrées dans le navigateur, donc elles
 * survivent au rechargement. Le bouton « Copier » rend le bloc de code prêt à
 * coller dans lenny-train.js pour les figer pour tout le monde.
 */
(function () {
  "use strict";

  var CLE = "lenny_reglages_foule_v1";
  var CLE_PHRASES = "lenny_phrases_titre_v1";

  /* 25/09 — les phrases tapées dans le grand titre. Elles vivent dans
     lenny-gate.js ; on remplace le contenu du même tableau, donc la machine à
     écrire prend la modification à la phrase suivante, sans rechargement. */
  function poserPhrases(liste) {
    var t = window.LennyPhrases;
    if (!t || !liste || !liste.length) return;
    t.length = 0;
    Array.prototype.push.apply(t, liste);
  }
  (function appliquerPhrasesGardees(n) {
    var g = null;
    try { g = JSON.parse(localStorage.getItem(CLE_PHRASES) || "null"); } catch (e) {}
    if (!g) return;
    if (window.LennyPhrases) return poserPhrases(g);
    if (n < 50) setTimeout(function () { appliquerPhrasesGardees(n + 1); }, 100);
  })(0);

  var BOUTONS = [
    { k: "monde",      t: "Combien de monde",      min: 5,    max: 105,  pas: 1,    u: "" },
    { k: "taille",     t: "Taille des personnes",  min: 0.4,  max: 2.4,  pas: 0.05, u: "x" },
    { k: "hautBande",  t: "Hauteur de la marche",  min: -200, max: 400,  pas: 10,   u: "px" },
    { k: "profondeur", t: "Étalement en profondeur", min: 0,  max: 700,  pas: 10,   u: "px" },
    { k: "vitesse",    t: "Vitesse de marche",     min: 0.2,  max: 3,    pas: 0.05, u: "x" },
    { k: "zoomTrain",  t: "Hauteur de la rame",    min: 0.3,  max: 1.2,  pas: 0.02, u: "" },
    { k: "solTrain",   t: "Position de la rame",   min: 0.5,  max: 1.3,  pas: 0.01, u: "" }
  ];

  function pret(f) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", f);
    else f();
  }

  pret(function () {
    var demande = /[?&]editeur\b/.test(location.search);

    // Maj + E ouvre le panneau même sans le paramètre d'adresse.
    document.addEventListener("keydown", function (e) {
      if (e.shiftKey && (e.key === "E" || e.key === "e") && !/input|textarea/i.test(e.target.tagName)) {
        var p = document.getElementById("lenny-editeur");
        if (p) p.classList.toggle("replie"); else ouvrir();
      }
    });

    // Les valeurs enregistrées s'appliquent AVANT le premier dessin.
    try {
      var gardees = JSON.parse(localStorage.getItem(CLE) || "null");
      if (gardees) {
        window.LennyReglages = window.LennyReglages || {};
        for (var k in gardees) window.LennyReglages[k] = gardees[k];
      }
    } catch (e) {}

    if (demande) attendre();

    function attendre() {
      if (window.LennyTrain && window.LennyTrain.reglages) return ouvrir();
      setTimeout(attendre, 120);
    }

    function ouvrir() {
      if (document.getElementById("lenny-editeur")) return;
      if (!window.LennyTrain || !window.LennyTrain.reglages) return;
      var REG = window.LennyTrain.reglages;

      var style = document.createElement("style");
      style.textContent = [
        "#lenny-editeur{position:fixed;top:16px;right:16px;z-index:2147483600;width:300px;",
        "background:rgba(20,16,14,.93);color:#f5f1ef;border-radius:14px;padding:16px 16px 12px;",
        "font:500 13px/1.3 Manrope,system-ui,sans-serif;backdrop-filter:blur(14px);",
        "box-shadow:0 18px 50px rgba(0,0,0,.42)}",
        "#lenny-editeur.replie .ed-corps{display:none}",
        "#lenny-editeur h3{font:700 12px/1 Manrope,sans-serif;letter-spacing:.16em;text-transform:uppercase;",
        "margin:0 0 14px;color:#f0b429;display:flex;justify-content:space-between;align-items:center}",
        "#lenny-editeur h3 button{background:none;border:none;color:#8a7f79;font-size:16px;cursor:pointer;padding:0 4px}",
        "#lenny-editeur label{display:block;margin:0 0 11px}",
        "#lenny-editeur .ed-ligne{display:flex;justify-content:space-between;margin:0 0 4px;color:#c9bfb9}",
        "#lenny-editeur .ed-val{color:#f5f1ef;font-variant-numeric:tabular-nums}",
        "#lenny-editeur input[type=range]{width:100%;accent-color:#f0b429;margin:0}",
        "#lenny-editeur textarea{width:100%;box-sizing:border-box;resize:vertical;background:rgba(245,241,239,.08);",
        "color:#f5f1ef;border:1px solid rgba(245,241,239,.18);border-radius:8px;padding:8px;font:500 12.5px/1.45 Manrope,sans-serif}",
        "#lenny-editeur .ed-corps{max-height:calc(100vh - 80px);overflow:auto}",
        "#lenny-editeur .ed-pied{display:flex;gap:8px;margin-top:6px}",
        "#lenny-editeur .ed-pied button{flex:1;background:#f0b429;color:#1a1410;border:none;border-radius:8px;",
        "padding:9px 0;font:700 12px/1 Manrope,sans-serif;cursor:pointer}",
        "#lenny-editeur .ed-pied button.gris{background:rgba(245,241,239,.14);color:#f5f1ef}"
      ].join("");
      document.head.appendChild(style);

      var p = document.createElement("div");
      p.id = "lenny-editeur";
      var html = '<h3>Réglages<button type="button" id="ed-plier" title="Replier (Maj+E)">–</button></h3><div class="ed-corps">';
      BOUTONS.forEach(function (b) {
        html += '<label><span class="ed-ligne"><span>' + b.t + '</span>' +
          '<span class="ed-val" id="ed-v-' + b.k + '"></span></span>' +
          '<input type="range" id="ed-' + b.k + '" min="' + b.min + '" max="' + b.max +
          '" step="' + b.pas + '"></label>';
      });
      html += '<label><span class="ed-ligne"><span>Phrases du titre, une par ligne</span></span>' +
        '<textarea id="ed-phrases" rows="7" spellcheck="true"></textarea></label>';
      html += '<div class="ed-pied"><button type="button" id="ed-copier">Copier</button>' +
        '<button type="button" class="gris" id="ed-reset">Défaut</button>' +
        '<button type="button" class="gris" id="ed-train">Train</button></div></div>';
      p.innerHTML = html;
      document.body.appendChild(p);


      function afficher(b) {
        var v = REG[b.k];
        document.getElementById("ed-v-" + b.k).textContent =
          (b.pas < 1 ? v.toFixed(2) : v) + (b.u ? " " + b.u : "");
      }

      function enregistrer() {
        try { localStorage.setItem(CLE, JSON.stringify(REG)); } catch (e) {}
      }

      BOUTONS.forEach(function (b) {
        var s = document.getElementById("ed-" + b.k);
        s.value = REG[b.k];
        afficher(b);
        s.addEventListener("input", function () {
          REG[b.k] = parseFloat(s.value);
          afficher(b);
          enregistrer();
          window.LennyTrain.rafraichir();   // la foule se refabrique à chaud
        });
      });

      var zone = document.getElementById("ed-phrases");
      zone.value = (window.LennyPhrases || []).join("\n");
      zone.addEventListener("input", function () {
        var liste = zone.value.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
        if (!liste.length) return;
        poserPhrases(liste);
        try { localStorage.setItem(CLE_PHRASES, JSON.stringify(liste)); } catch (e) {}
      });

      document.getElementById("ed-plier").addEventListener("click", function () {
        p.classList.toggle("replie");
      });

      /* « Défaut » repartait des valeurs GARDÉES, pas de celles du code :
         on efface ce qui est gardé et on recharge, la page repart d'origine. */
      document.getElementById("ed-reset").addEventListener("click", function () {
        try { localStorage.removeItem(CLE); localStorage.removeItem(CLE_PHRASES); } catch (e) {}
        location.reload();
      });

      document.getElementById("ed-train").addEventListener("click", function () {
        window.LennyTrain.partir();         // rejouer l'arrivée du train
      });

      document.getElementById("ed-copier").addEventListener("click", function () {
        var lignes = BOUTONS.map(function (b) {
          return "      " + b.k + ": " + REG[b.k] + ",";
        }).join("\n");
        var bloc = "var REG = window.LennyReglages = window.LennyReglages || {\n" +
          lignes.replace(/,$/, "") + "\n    };";
        bloc += "\n\n      const phrases = [\n" + (window.LennyPhrases || []).map(function (l) {
          return "        " + JSON.stringify(l) + ",";
        }).join("\n") + "\n      ];";
        var btn = document.getElementById("ed-copier");
        navigator.clipboard.writeText(bloc).then(function () {
          btn.textContent = "Copié";
          setTimeout(function () { btn.textContent = "Copier"; }, 1400);
        }, function () {
          console.log(bloc);
          btn.textContent = "Voir console";
          setTimeout(function () { btn.textContent = "Copier"; }, 1800);
        });
      });
    }
  });
})();
