/* apercu.js — quinze minutes de site, sans mot de passe.
 *
 *     https://pibts.netlify.app/?apercu
 *
 * POURQUOI. Lenny, le 23/09/2026 : « j'ai eu plusieurs retours de gens qui ont vu
 * le site et qui ont été très impressionnés […] les gens n'ont pas le temps de
 * faire des demandes, il faut qu'ils voient directement ». Le produit se vend en
 * étant regardé ; le code d'accès est le seul mur entre un tuteur et ce regard.
 *
 * CE QU'IL FAIT : quand l'adresse porte « ?apercu », la porte s'efface et le site
 * s'ouvre pour QUINZE MINUTES, comptées À LA MONTRE depuis le premier clic. Fermer
 * l'onglet ne met rien en pause : c'est le choix de Lenny du 23/09, et c'est le bon
 * — un aperçu qui se met en pause s'étale sur trois jours et ne pousse personne à
 * décider. À la fin, un écran dit ce que ça coûte et comment continuer.
 *
 * CE QU'IL NE FAIT PAS, ET C'EST VOULU :
 *   - il ne consomme AUCUN code réel : pas de `claimSession`, pas de battement de
 *     cœur, donc deux visiteurs en aperçu ne se déconnectent pas l'un l'autre —
 *     ce qui serait arrivé avec un code de démo partagé ;
 *   - il ne prétend pas être une sécurité. Le compteur vit dans le navigateur :
 *     qui sait lire du JavaScript le remet à zéro. Ce n'est pas un coffre, c'est
 *     une vitrine, et une vitrine se regarde ;
 *   - il ne touche à rien quand « ?apercu » est absent : un visiteur ordinaire
 *     voit la porte, exactement comme avant.
 */
(function () {
  if (!/[?&]apercu\b/.test(location.search)) return;

  var CLE = "lenny-apercu-v1";
  var DUREE = 15 * 60 * 1000;          // quinze minutes, à la montre

  /* 25/09 — LE COMPTEUR NE COURT PAS CHEZ LENNY. Trois fois de suite il s'est
     retrouvé avec un site qui refusait de défiler en travaillant dessus :
     l'aperçu expirait pendant qu'il bricolait, l'écran de fin verrouillait la
     page, et il croyait avoir cassé son site. L'aperçu est fait pour un gérant
     d'agence qui découvre, pas pour celui qui construit. Sur sa machine le
     compte à rebours ne tombe jamais — sauf s'il ajoute ?apercu-force pour le
     tester exprès avant de l'envoyer à quelqu'un. */
  var EN_LOCAL = ["127.0.0.1", "localhost", "0.0.0.0", "::1"].indexOf(location.hostname) !== -1;
  if (EN_LOCAL && !/[?&]apercu-force\b/.test(location.search)) {
    DUREE = 1000 * 60 * 60 * 24 * 365;
    try { localStorage.removeItem("lenny-apercu-v1"); } catch (e) {}
  }
  var TIC = 1000;
  var PRIX = "29 € par mois";          /* 23/09/2026. 79 € avait été posé, puis ramené à 29 :
                                          l'agence ne profite pas directement de l'outil, c'est
                                          l'alternant. Sous 30 €, un gérant décide sans y réfléchir
                                          deux fois. Chiffre à confirmer par les réponses, pas par nous. */

  /* ── la mémoire du compteur ────────────────────────────────────────────── */
  function lire() {
    try { return JSON.parse(localStorage.getItem(CLE)) || null; } catch (e) { return null; }
  }
  function ecrire(e) {
    try { localStorage.setItem(CLE, JSON.stringify(e)); } catch (err) { /* navigation privée */ }
  }
  /* On garde l'HEURE DE DÉPART, pas le temps restant : ainsi fermer l'onglet, dormir
     ou revenir demain ne rend pas une minute. Le compte se refait à chaque ouverture. */
  var etat = lire();
  if (!etat || typeof etat.debut !== "number") etat = { debut: Date.now() };
  ecrire(etat);
  function restant() { return DUREE - (Date.now() - etat.debut); }

  /* ── ouvrir la porte, sans passer par elle ─────────────────────────────── */
  function ouvrir() {
    var porte = document.getElementById("lenny-gate");
    if (porte) { porte.classList.add("hidden", "ok"); porte.style.display = "none"; }
    document.documentElement.style.overflow = "";
    document.body && document.body.classList.add("apercu");

    /* Le reste du site attend un `window.LennyAuth` et l'événement `lenny-auth`
       (voir lenny-gate.js). On lui donne exactement la même forme, avec un nom
       qui dit ce que c'est : personne ne doit croire qu'un compte existe. */
    window.LennyAuth = {
      code: null, label: "Aperçu", name: "Visiteur", initials: "AP",
      isAdmin: false, apercu: true,
      logout: function () { location.href = "/"; },
    };
    document.dispatchEvent(new CustomEvent("lenny-auth", { detail: window.LennyAuth }));
  }

  /* ── la pastille du compte à rebours ───────────────────────────────────── */
  var pastille;
  function poserPastille() {
    pastille = document.createElement("div");
    pastille.id = "apercu-pastille";
    pastille.innerHTML = '<span class="point"></span><span class="temps">15:00</span>' +
                         '<span class="mot">d\'aperçu</span>';
    document.body.appendChild(pastille);

    var css = document.createElement("style");
    css.textContent =
      "#apercu-pastille{position:fixed;right:16px;bottom:16px;z-index:99998;display:flex;align-items:center;" +
      "gap:9px;padding:9px 15px;border-radius:999px;background:rgba(12,10,9,.86);backdrop-filter:blur(10px);" +
      "border:1px solid rgba(229,9,20,.45);color:#f5f1ef;font:600 13.5px/1 Manrope,system-ui,sans-serif;" +
      "box-shadow:0 8px 30px rgba(0,0,0,.45);pointer-events:none;font-variant-numeric:tabular-nums}" +
      "#apercu-pastille .point{width:7px;height:7px;border-radius:50%;background:#e50914;" +
      "animation:apercu-pulse 2s ease-in-out infinite}" +
      "#apercu-pastille .mot{color:#8b807a;font-weight:500}" +
      "#apercu-pastille.bientot{border-color:#e50914}" +
      "@keyframes apercu-pulse{0%,100%{opacity:1}50%{opacity:.25}}" +
      "#apercu-fin{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:24px;" +
      "background:rgba(12,10,9,.965);backdrop-filter:blur(18px);color:#f5f1ef;" +
      "font-family:Manrope,system-ui,sans-serif;text-align:center}" +
      "#apercu-fin h2{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:600;" +
      "font-size:clamp(28px,5vw,52px);line-height:1.1;margin:0 0 18px;max-width:18ch}" +
      "#apercu-fin p{margin:0 0 28px;max-width:46ch;color:#b9aea8;font-size:clamp(16px,2vw,19px);line-height:1.55}" +
      "#apercu-fin p strong{color:#f5f1ef;font-weight:800;white-space:nowrap}" +
      "#apercu-fin a{display:inline-block;background:#e50914;color:#fff;text-decoration:none;font-weight:700;" +
      "padding:15px 28px;border-radius:9px;font-size:16px}" +
      "#apercu-fin a.second{background:transparent;color:#b9aea8;border:1px solid #3a322e;margin-left:10px}" +
      "@media (prefers-reduced-motion:reduce){#apercu-pastille .point{animation:none}}";
    document.head.appendChild(css);
  }

  function afficher(ms) {
    if (!pastille) return;
    var s = Math.max(0, Math.round(ms / 1000));
    var m = Math.floor(s / 60);
    pastille.querySelector(".temps").textContent = m + ":" + String(s % 60).padStart(2, "0");
    pastille.classList.toggle("bientot", ms <= 3 * 60 * 1000);
  }

  /* ── la fin ────────────────────────────────────────────────────────────── */
  function terminer() {
    if (pastille) pastille.remove();
    if (document.getElementById("apercu-fin")) return;
    var fin = document.createElement("div");
    fin.id = "apercu-fin";
    fin.innerHTML =
      '<div>' +
      '<h2>Voilà ce que votre alternant aurait sous la main.</h2>' +
      "<p>Quinze minutes, c'est court. Un accès pour votre alternant, c'est " +
      "<strong>" + PRIX + "</strong>. Écrivez-moi : je vous l'ouvre, et vous arrêtez quand vous voulez.</p>" +
      '<a href="mailto:lenny.agamakou.pro@gmail.com?subject=Acc%C3%A8s%20pour%20notre%20alternant%20-%20BTS%20Professions%20Immobili%C3%A8res&amp;body=Bonjour%2C%0A%0AJ\'ai%20regard%C3%A9%20l\'aper%C3%A7u.%20Je%20souhaite%20un%20acc%C3%A8s%20pour%20notre%20alternant.%0A%0AAgence%20%3A%20%0AVille%20%3A%20%0A%0AMerci.">Demander un accès</a>' +
      '<a class="second" href="/pour-les-agences.html">Revoir la présentation</a>' +
      '</div>';
    document.body.appendChild(fin);
    /* 25/09 — LE PIÈGE QUI A COÛTÉ UNE DEMI-HEURE À LENNY. Cet écran bloquait
       le défilement, mais sans position fixe il restait tout en bas de la page :
       on ne pouvait donc NI défiler, NI voir pourquoi. Le site avait l'air
       cassé alors qu'il disait simplement « c'est fini ». Un écran qui verrouille
       doit toujours se montrer. */
    fin.style.position = "fixed";
    fin.style.inset = "0";
    fin.style.zIndex = "99999";
    fin.style.display = "flex";
    fin.style.alignItems = "center";
    fin.style.justifyContent = "center";
    fin.style.background = "rgba(12,10,9,.96)";
    fin.style.padding = "24px";
    fin.style.textAlign = "center";
    document.documentElement.style.overflow = "hidden";
  }

  /* ── le compteur, qui ne compte QUE le temps regardé ───────────────────── */
  function demarrer() {
    if (restant() <= 0) { terminer(); return; }
    poserPastille();
    afficher(restant());
    var battement = setInterval(function () {
      var r = restant();
      if (r <= 0) { clearInterval(battement); terminer(); return; }
      afficher(r);
    }, TIC);
  }

  function partir() {
    ouvrir();
    demarrer();
  }

  /* On passe APRÈS la porte : elle s'installe sur DOMContentLoaded, on efface
     derrière elle. `setTimeout(0)` suffit à passer en dernier dans la file. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(partir, 0); });
  } else {
    setTimeout(partir, 0);
  }
})();
