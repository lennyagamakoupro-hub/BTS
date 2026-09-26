/* lenny-billboard.js — LE GESTE NETFLIX, en deux temps.
 *
 * Demandé par Lenny le 25/09/2026, après avoir filmé son téléviseur :
 *   « au survol de la souris, et que ça s'affiche en fond quand on clique
 *     sur la carte »
 *
 * DEUX GESTES, PAS UN DE PLUS :
 *   SURVOL → la vignette elle-même se met à jouer, comme sur Netflix.
 *   CLIC   → la vidéo prend TOUT L'ÉCRAN en fond, titre et résumé par-dessus.
 *
 * CE QU'IL NE TOUCHE PAS : le grand écran d'accueil tout en haut. Lenny :
 * « tu touches pas à l'écran d'accueil qui est tout en haut pour l'instant ».
 * Ce fichier ne lit ni n'écrit rien dans `.hero`.
 *
 * LE PIÈGE QUI A COÛTÉ TROIS ESSAIS, écrit pour qu'on ne le repaie pas : le
 * site REFABRIQUE l'intérieur de la carte au survol, avec son panneau étendu.
 * Une vidéo glissée dans `.card-art` était donc effacée une demi-seconde après
 * sa naissance — le code marchait, et on ne voyait rien. On la pose maintenant
 * sur la carte elle-même, qui survit, et un gardien la remet si elle saute.
 *
 * ET RIEN NE SE CHARGE AVANT LE SURVOL.
 */
(function () {
  "use strict";

  var DELAI_APERCU = 420;
  var DOSSIER = "videos-modules/";

  function pret(f) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", f);
    else f();
  }

  pret(function () {
    var modules = window.LENNY_MODULES || [];
    if (!modules.length) return;
    var parId = {};
    modules.forEach(function (m) { parId[m.id] = m; });

    /* 25/09 — LES LOIS AUSSI. Elles portent `data-mod` comme les modules, mais
       elles ne sont pas dans LENNY_MODULES : elles vivent dans leur propre
       liste. Sans ça, leur affiche s'affichait et leur film ne partait jamais.
       On les ajoute au même index, avec les champs que le plein écran attend. */
    (window.LENNY_LAWS || []).forEach(function (l) {
      if (parId[l.id]) return;
      parId[l.id] = {
        id: l.id,
        title: l.title || l.num || l.id,
        tag: "Loi",
        num: l.num || "",
        season: l.year || "",
        time: "",
        quote: "",
        desc: l.desc || ""
      };
    });

    var style = document.createElement("style");
    style.textContent = [
      "[data-mod]{position:relative}",
      "video.lb-apercu{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;",
      "opacity:0;transition:opacity .45s ease;z-index:0;pointer-events:none;border-radius:inherit}",
      "video.lb-apercu.vu{opacity:1}",
      ".lb-plein{position:fixed;inset:0;z-index:99998;background:#0c0a09;opacity:0;",
      "transition:opacity .35s ease;display:flex;align-items:flex-end}",
      ".lb-plein.vu{opacity:1}",
      ".lb-plein video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}",
      ".lb-plein .lb-voile{position:absolute;inset:0;z-index:1;background:",
      "linear-gradient(to right,rgba(12,10,9,.94) 0%,rgba(12,10,9,.78) 42%,rgba(12,10,9,.2) 100%),",
      "linear-gradient(to top,rgba(12,10,9,.92) 0%,rgba(12,10,9,0) 45%)}",
      ".lb-plein .lb-texte{position:relative;z-index:2;padding:clamp(24px,7vw,90px);max-width:44rem}",
      ".lb-plein .lb-kicker{font:700 .72rem/1 Manrope,sans-serif;letter-spacing:.22em;",
      "text-transform:uppercase;color:#e50914;margin:0 0 14px}",
      ".lb-plein h2{font:800 clamp(2rem,6.4vw,4.4rem)/0.98 Manrope,sans-serif;letter-spacing:-.03em;",
      "color:#f5f1ef;margin:0 0 16px;text-wrap:balance}",
      ".lb-plein .lb-pills{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}",
      ".lb-plein .lb-pills span{font:600 .78rem/1 Manrope,sans-serif;color:#b9aea8;",
      "border:1px solid #3a322e;border-radius:6px;padding:6px 10px}",
      ".lb-plein .lb-quote{font:italic 500 clamp(1rem,2.6vw,1.3rem)/1.4 'Playfair Display',Georgia,serif;",
      "color:#ffb3b6;margin:0 0 14px}",
      ".lb-plein p.lb-desc{font:500 clamp(.95rem,2.2vw,1.12rem)/1.55 Manrope,sans-serif;",
      "color:#b9aea8;margin:0 0 26px;max-width:38rem}",
      ".lb-plein .lb-actions{display:flex;gap:12px;flex-wrap:wrap}",
      ".lb-plein a.lb-btn,.lb-plein button.lb-btn{font:700 .95rem/1 Manrope,sans-serif;border:none;",
      "border-radius:8px;padding:14px 24px;cursor:pointer;text-decoration:none;display:inline-block}",
      ".lb-plein .lb-btn.principal{background:#e50914;color:#fff}",
      ".lb-plein .lb-btn.second{background:rgba(245,241,239,.14);color:#f5f1ef}",
      ".lb-fermer{position:absolute;top:22px;right:24px;z-index:3;width:44px;height:44px;border-radius:50%;",
      "border:1px solid #3a322e;background:rgba(12,10,9,.6);color:#f5f1ef;font-size:22px;line-height:1;cursor:pointer}",
      "@media (prefers-reduced-motion:reduce){video.lb-apercu{display:none}}"
    ].join("");
    document.head.appendChild(style);

    /* ─── 1. LE SURVOL : la vignette joue ─────────────────────────────────── */
    var minuteur = null, carteActive = null, gardien = null;

    function couperApercu() {
      clearInterval(gardien); gardien = null;
      carteActive = null;
      var v = document.querySelectorAll("video.lb-apercu");
      for (var i = 0; i < v.length; i++) {
        (function (x) {
          x.classList.remove("vu");
          try { x.pause(); x.removeAttribute("src"); x.load(); } catch (e) {}
          setTimeout(function () { if (x.parentNode) x.parentNode.removeChild(x); }, 450);
        })(v[i]);
      }
    }

    function poserApercu(carte, id) {
      if (carteActive === carte) return;
      couperApercu();
      carteActive = carte;
      var v = document.createElement("video");
      v.className = "lb-apercu";
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
      v.src = DOSSIER + id + ".mp4";
      v.addEventListener("canplay", function () {
        if (carteActive !== carte) return;
        v.classList.add("vu");
        v.play().catch(function () {});
      }, { once: true });
      v.addEventListener("error", couperApercu, { once: true });
      carte.appendChild(v);

      /* Le gardien : le site refabrique la carte au survol et peut emporter
         notre vidéo. On la remet, pendant deux secondes, le temps que son
         panneau étendu se stabilise. */
      var restant = 8;
      gardien = setInterval(function () {
        if (carteActive !== carte || --restant <= 0) { clearInterval(gardien); return; }
        if (!carte.contains(v)) carte.appendChild(v);
      }, 250);
    }

    document.addEventListener("mouseover", function (e) {
      var carte = e.target.closest ? e.target.closest("[data-mod]") : null;
      if (!carte) return;
      var id = carte.getAttribute("data-mod");
      if (!parId[id]) return;
      clearTimeout(minuteur);
      minuteur = setTimeout(function () { poserApercu(carte, id); }, DELAI_APERCU);
    });

    document.addEventListener("mouseout", function (e) {
      var carte = e.target.closest ? e.target.closest("[data-mod]") : null;
      if (!carte) return;
      if (e.relatedTarget && carte.contains(e.relatedTarget)) return;
      clearTimeout(minuteur);
      couperApercu();
    });

    /* ─── 2. LE CLIC : la vidéo prend tout l'écran ────────────────────────── */
    var plein = null;

    function echap(s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    }

    function fermerPlein() {
      if (!plein) return;
      var p = plein; plein = null;
      p.classList.remove("vu");
      document.documentElement.style.overflow = "";
      setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 400);
    }

    function ouvrirPlein(id) {
      var m = parId[id];
      if (!m) return;
      fermerPlein();
      couperApercu();

      var d = document.createElement("div");
      d.className = "lb-plein";
      d.setAttribute("role", "dialog");
      d.setAttribute("aria-label", m.title);

      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.src = DOSSIER + id + ".mp4";
      d.appendChild(v);

      var voile = document.createElement("div");
      voile.className = "lb-voile";
      d.appendChild(voile);

      var txt = document.createElement("div");
      txt.className = "lb-texte";
      txt.innerHTML =
        '<p class="lb-kicker">' + echap(m.tag || "BTS Professions Immobili\u00e8res") + "</p>" +
        "<h2>" + echap(m.title) + "</h2>" +
        '<div class="lb-pills"><span>' + echap(m.season || "") + "</span>" +
        "<span>" + echap(String(m.time || "")) + " min</span>" +
        "<span>Module " + echap(m.num || "") + "</span></div>" +
        /* Les guillemets sont DÉJÀ dans la donnée pour certains modules : les
           rajouter donnait « « Intérêts composés » ». On ne pose les nôtres
           que si la phrase n'en a pas. */
        (m.quote ? '<p class="lb-quote">' +
          (/^\s*[«"]/.test(m.quote) ? echap(m.quote) : "&laquo; " + echap(m.quote) + " &raquo;") +
          "</p>" : "") +
        (m.desc ? '<p class="lb-desc">' + echap(m.desc) + "</p>" : "") +
        '<div class="lb-actions">' +
        '<a class="lb-btn principal" href="#' + id + '">R\u00e9viser ce module</a>' +
        '<button class="lb-btn second" type="button" data-lb-fermer>Revenir</button></div>';
      d.appendChild(txt);

      var croix = document.createElement("button");
      croix.className = "lb-fermer";
      croix.type = "button";
      croix.setAttribute("aria-label", "Fermer");
      croix.setAttribute("data-lb-fermer", "");
      croix.innerHTML = "&times;";
      d.appendChild(croix);

      document.body.appendChild(d);
      document.documentElement.style.overflow = "hidden";
      plein = d;
      requestAnimationFrame(function () { d.classList.add("vu"); });
      v.play().catch(function () {});
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-lb-fermer]")) { e.preventDefault(); fermerPlein(); return; }
      if (plein && e.target === plein) { fermerPlein(); return; }
      var carte = e.target.closest ? e.target.closest("[data-mod]") : null;
      if (!carte || plein) return;
      var id = carte.getAttribute("data-mod");
      if (!parId[id]) return;
      e.preventDefault();
      e.stopPropagation();
      ouvrirPlein(id);
    }, true);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fermerPlein();
    });
  });
})();
