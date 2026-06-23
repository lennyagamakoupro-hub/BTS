/* ============================================================
   LENNY-AGENT — Mini chatbot de révision (BTS Professions Immobilières)
   ------------------------------------------------------------
   • Base de connaissances bâtie à la volée depuis le contenu du site :
       GLOSSARY · ESSENTIALS · MEMOS · LENNY_FORMULES · MODULES
       + une FAQ pratique écrite à la main (codes, examen, devoirs…).
   • Moteur MIXTE : on cherche d'abord dans les fiches ; si rien de net,
     on passe à l'IA en secours (backend /api/chat, ou window.claude en preview).
   • Si l'IA n'est pas dispo / ne sait pas → on propose de TRANSMETTRE la
     question (ou un avis / une idée) à Lenny.  Stocké côté backend
     (/api/messages) avec repli localStorage.
   • Ton décontracté « pote qui révise avec toi ».  Tutoiement.
   Dépend de : lenny-agent.css. Aucune autre dépendance dure (tout est défensif).
   ============================================================ */
(function () {
  "use strict";

  var API = (window.LENNY_API_BASE || "").replace(/\/$/, "");
  var CHAT_KEY = "lenny-agent-chat-v1";
  var SEEN_KEY = "lenny-agent-seen-v1";
  var MSG_KEY = "lenny-agent-messages-v1";   // repli local des messages transmis à Lenny

  // Monogramme Lenny-agent — « L » net + point-balise (blanc sur badge dégradé)
  var MARK_INNER = '<circle cx="21.8" cy="8.5" r="2.4" fill="currentColor"/><path d="M11 8.5 V22.2 H22" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>';
  var MARK = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">' + MARK_INNER + '</svg>';

  /* ---------------------------------------------------------
     0) Utilitaires texte
     --------------------------------------------------------- */
  var STOP = ("le la les un une des de du d des au aux a à et ou where que qui quoi quel quelle " +
    "est sont c ce cet cette ça ca se sur pour par avec dans en y il elle on nous vous ils elles " +
    "je tu me te mon ma mes ton ta tes son sa ses ne pas plus moins comme donc alors mais or ni car " +
    "comment pourquoi combien quand est-ce qu qu' l n s t d m j c'est cest veut dire signifie " +
    "explique expliquer définition definition c'est-quoi").split(/\s+/);
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });

  function norm(s) {
    return String(s == null ? "" : s).toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // accents
      .replace(/[''`]/g, "'")
      .replace(/(\d)\s*[x×]\s*(\d)/g, "$1 $2")        // 4x20 → 4 20
      .replace(/[^a-z0-9%€'\s.-]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  function tokens(s) {
    return norm(s).replace(/[.'-]/g, " ").split(/\s+/)
      .filter(function (w) { return w.length > 1 && !STOPSET[w]; });
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* ---------------------------------------------------------
     1) Construction de la base de connaissances
     --------------------------------------------------------- */
  var KB = [];          // { id, cat, q, body(html), kw, mod, action }
  var KB_BUILT = false;

  function modShort(id) {
    var m = (window.MODULES || []).find(function (x) { return x.id === id; });
    return m ? m.short : id;
  }
  function modOf(id) { return (window.MODULES || []).find(function (x) { return x.id === id; }); }

  function add(entry) {
    entry.searchN = norm((entry.q || "") + " " + (entry.kw || "") + " " + (entry.plain || ""));
    entry.titleN = norm((entry.q || "") + " " + (entry.kw || ""));
    KB.push(entry);
  }

  // — Action « ouvrir un module » réutilisable
  function openModuleAction(modId) {
    var m = modOf(modId);
    return {
      label: "Ouvrir « " + (m ? m.title : modId) + " »",
      run: function () { openModule(modId); }
    };
  }

  function buildKB() {
    if (KB_BUILT) return;
    KB.length = 0;

    /* 1.a — GLOSSAIRE (définitions courtes) */
    var G = window.GLOSSARY || {};
    Object.keys(G).forEach(function (term) {
      add({
        cat: "def", q: term, kw: term + " definition sigle acronyme",
        plain: G[term],
        body: "<b>" + esc(term) + "</b> — " + esc(G[term]),
        src: "Glossaire"
      });
    });

    /* 1.b — ESSENTIELS (à-retenir + frises) par module */
    var E = window.ESSENTIALS || {};
    Object.keys(E).forEach(function (mid) {
      var data = E[mid], label = modShort(mid);
      (data.retenir || []).forEach(function (r) {
        add({
          cat: "essentiel", mod: mid, q: r.k, kw: r.k + " " + label,
          plain: r.k + " " + r.v,
          body: "<b>" + esc(r.k) + "</b> : " + esc(r.v),
          src: label + " · à retenir",
          action: openModuleAction(mid)
        });
      });
      (data.timeline || []).forEach(function (t) {
        add({
          cat: "date", mod: mid, q: t.t, kw: t.y + " " + t.t + " " + label + " loi date annee",
          plain: t.y + " " + t.t,
          body: "<b>" + esc(t.y) + "</b> — " + esc(t.t),
          src: label + " · repère"
        });
      });
    });

    /* 1.c — MÉMOS (acronymes, règles, moyens mnémo) */
    (window.MEMOS || []).forEach(function (m) {
      (m.cards || []).forEach(function (c) {
        if (!c.h || !c.items) return;
        var items = c.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
        add({
          cat: "memo", mod: m.mod, q: c.h, kw: c.h + " " + m.title + " " + (c.type || ""),
          plain: c.h + " " + c.items.join(" "),
          body: "<b>" + esc(c.h) + "</b><ul>" + items + "</ul>",
          src: m.title + " · mémo",
          action: openModuleAction(m.mod)
        });
      });
    });

    /* 1.d — FORMULES (toutes les formules de tous les pôles) */
    var F = window.LENNY_FORMULES || {};
    Object.keys(F).forEach(function (poleKey) {
      var pole = F[poleKey];
      (pole.groups || []).forEach(function (g) {
        (g.formulas || []).forEach(function (f) {
          var lines = (f.lines || []).map(function (l) {
            return '<span class="lag-formula">' + esc(l) + "</span>";
          }).join("");
          add({
            cat: "formule", q: f.name,
            kw: f.name + " " + (g.h || "") + " " + (pole.title || "") + " formule calcul",
            plain: f.name + " " + (f.lines || []).join(" ") + " " + (f.note || ""),
            body: "<b>" + esc(f.name) + "</b>" + lines +
                  (f.note ? '<span class="lag-src">' + esc(f.note) + "</span>" : ""),
            src: (pole.title || "Formulaire")
          });
        });
      });
    });

    /* 1.e — MODULES (navigation : « où réviser X ? ») */
    (window.MODULES || []).forEach(function (m) {
      add({
        cat: "module", mod: m.id, q: m.title,
        kw: m.title + " " + m.short + " " + m.tag + " module " + m.num,
        plain: m.title + " " + m.short + " " + m.tag,
        body: "Le module <b>" + esc(m.title) + "</b> (" + esc(m.tag) + ") est dans tes fiches — clique pour l'ouvrir et le réviser.",
        src: "Module",
        action: openModuleAction(m.id)
      });
    });

    /* 1.f — FAQ pratique (écrite à la main) */
    FAQ.forEach(function (f) { add({ cat: "faq", q: f.q, kw: f.kw || "", plain: f.q + " " + (f.kw || "") + " " + f.plain, body: f.body, src: f.src || "Aide", action: f.action }); });

    KB_BUILT = true;
  }

  /* ---------------------------------------------------------
     1.g — FAQ pratique (le « plain » sert au scoring, le « body » à l'affichage)
     --------------------------------------------------------- */
  var FAQ = [
    {
      q: "Comment réviser efficacement sur le site ?",
      kw: "reviser revision methode efficace par ou commencer organiser apprendre travailler",
      plain: "comment reviser methode efficace organisation parcours",
      body: "Easy. Commence par le bouton <b>Réviser</b> en haut (le parcours des formules à débloquer), puis enchaîne un <b>Quiz</b> par module pour repérer tes trous. Une fois chaud, lance un <b>Devoir général</b> ou l'<b>Examen blanc</b> chronométré. Le radar de progression te montre où tu assures et où il faut remettre une couche.",
      src: "Méthode"
    },
    {
      q: "Où trouver les quiz ?",
      kw: "quiz qcm questions tester entrainement quiz general",
      plain: "ou sont les quiz qcm questions tester quiz general module",
      body: "Deux options : <b>Quiz général</b> (bouton en haut, toutes les questions mélangées), ou le quiz d'un module précis depuis sa fiche. Tu peux aussi lancer le <b>Quiz du secteur</b> depuis une page de pôle.",
      src: "Aide"
    },
    {
      q: "C'est quoi l'examen blanc ?",
      kw: "examen blanc e8 epreuve chrono chronometre simulation partiel",
      plain: "examen blanc e8 epreuve chronometree simulation",
      body: "L'<b>Examen blanc</b> (bouton en haut) simule l'épreuve <b>E8</b> en conditions réelles : sujet + chrono. Parfait pour te jauger avant le jour J. Vas-y une fois que tu as déjà tourné sur les quiz.",
      src: "Aide"
    },
    {
      q: "C'est quoi le devoir général ?",
      kw: "devoir general sujet aleatoire epreuve ecrite pole entrainement",
      plain: "devoir general sujet aleatoire epreuve ecrite",
      body: "Le <b>Devoir général</b> te tire un sujet d'épreuve écrite au hasard pour t'entraîner à rédiger. Il y a aussi le <b>Devoir du pôle</b> depuis chaque page de secteur, plus ciblé.",
      src: "Aide"
    },
    {
      q: "À quoi servent les calculatrices ?",
      kw: "calculatrice calcul pret hcsf rendement viager mensualite simulateur",
      plain: "calculatrices calcul pret hcsf rendement viager mensualite",
      body: "Le bouton <b>Calculatrices</b> regroupe les outils du métier : mensualité de <b>prêt</b>, règle <b>HCSF</b> (35 % d'endettement), <b>rendement</b> locatif, <b>viager</b>… Tu rentres tes chiffres, ça calcule direct.",
      src: "Aide"
    },
    {
      q: "Mon code d'accès ne marche pas / je l'ai oublié",
      kw: "code acces mot de passe oublie perdu connexion connecter porte ouvrir identifiant",
      plain: "code d'acces mot de passe oublie perdu connexion identifiant",
      body: "Ton code t'a été remis par Lenny — il s'entre sur la page d'accueil (« Ouvrir la porte »). Vérifie les majuscules. Toujours coincé ? Je peux transmettre à Lenny pour qu'il te débloque.",
      src: "Accès",
      forward: true
    },
    {
      q: "« Code déjà utilisé sur un autre appareil »",
      kw: "mono appareil deja connecte autre appareil session bloque un seul code 409 deconnecter",
      plain: "code deja utilise autre appareil mono appareil session un seul",
      body: "Chaque code ne marche que sur <b>un seul appareil à la fois</b>. Si tu changes de téléphone/ordi, déconnecte-toi de l'ancien (bouton <b>Se déconnecter</b> en bas de page), puis reconnecte-toi ici. Si l'autre appareil n'est plus accessible, dis-le-moi, je transmets à Lenny.",
      src: "Accès",
      forward: true
    },
    {
      q: "Le site marche-t-il hors-ligne ?",
      kw: "hors ligne offline installer application pwa telephone ecran accueil internet",
      plain: "hors ligne offline installer application pwa",
      body: "Oui en grande partie : le site est une <b>app installable</b> (PWA). Depuis ton navigateur mobile, « Ajouter à l'écran d'accueil » et tu l'ouvres comme une appli. Le contenu déjà chargé reste consultable sans connexion.",
      src: "Aide"
    },
    {
      q: "C'est quoi le radar / ma progression ?",
      kw: "radar progression stats statistiques niveau immeuble facade evolution tableau de bord",
      plain: "radar progression stats niveau evolution tableau de bord immeuble",
      body: "Ton <b>tableau de bord</b> : le radar montre ton score moyen par matière (et son évolution), et l'<b>immeuble</b> se rallume étage par étage à mesure que tu maîtrises les modules. Plus tu fais de quiz, plus c'est précis.",
      src: "Aide"
    },
    {
      q: "Qui est Lenny ? / contacter Lenny",
      kw: "lenny contact qui auteur formateur joindre parler message remarque",
      plain: "qui est lenny contact formateur joindre auteur",
      body: "Lenny Agamakou — l'auteur du site, étudiant en BTS Professions Immobilières (INSEEC, promo 2025-2026). Une remarque, une idée, un bug ? Écris-le-moi et je lui transmets direct.",
      src: "À propos",
      forward: true
    }
  ];

  /* ---------------------------------------------------------
     2) Recherche dans la base
     --------------------------------------------------------- */
  function search(query) {
    buildKB();
    var qN = norm(query);
    var qTokens = tokens(query);
    if (!qTokens.length) return [];

    var scored = KB.map(function (e) {
      var score = 0;
      // correspondance exacte du titre (ex : « HCSF », « FAI ») → très fort
      if (e.titleN === qN) score += 14;
      // chaque token présent
      qTokens.forEach(function (t) {
        var inTitle = e.titleN.indexOf(t) >= 0;
        var inBody = e.searchN.indexOf(t) >= 0;
        if (inTitle) score += 4;
        else if (inBody) score += 1.4;
        // bonus mot entier
        var re = new RegExp("\\b" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
        if (re.test(e.titleN)) score += 2.2;
      });
      // bonus catégorie selon l'intention
      if (/\bformule|calcul|combien|taux|%/.test(qN) && e.cat === "formule") score += 2;
      if (/\bloi|date|annee|quand\b/.test(qN) && e.cat === "date") score += 2;
      // bonus fort : TOUS les mots de la question sont dans le titre de la fiche
      if (qTokens.length && qTokens.every(function (t) { return e.titleN.indexOf(t) >= 0; })) score += 5;
      // léger malus si beaucoup de tokens manquent
      var hit = qTokens.filter(function (t) { return e.searchN.indexOf(t) >= 0; }).length;
      score *= (0.5 + 0.5 * (hit / qTokens.length));
      return { e: e, score: score, hit: hit };
    }).filter(function (x) { return x.score > 0; });

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored;
  }

  // Seuils : au-dessus de STRONG on répond direct ; entre WEAK et STRONG on propose ;
  // en dessous → IA / transmission.
  var STRONG = 6.5, WEAK = 4.5;

  /* ---------------------------------------------------------
     3) IA de secours
     --------------------------------------------------------- */
  function aiContext(query) {
    // on fournit au modèle les meilleures fiches comme contexte
    var top = search(query).slice(0, 4).filter(function (x) { return x.score > 1.5; });
    if (!top.length) return "";
    return top.map(function (x) {
      var t = (x.e.q || "") + " : " + (x.e.plain || "");
      return "- " + t.replace(/\s+/g, " ").slice(0, 280);
    }).join("\n");
  }

  var SYSTEM = "Tu es Lenny-agent, l'assistant de révision du site LENNY pour le BTS Professions " +
    "Immobilières (France). Tu parles à un élève, tu le TUTOIES, ton décontracté et motivant, " +
    "comme un pote qui révise avec lui. Réponses COURTES (2-4 phrases max), concrètes, en français. " +
    "Tu connais l'immobilier français : loi Hoguet, ALUR, ELAN, mandats, diagnostics, financement, " +
    "HCSF, viager, estimation, syndic, droit. Si la question sort totalement du sujet des révisions, " +
    "ramène gentiment vers le BTS. N'invente jamais de chiffres précis dont tu n'es pas sûr.";

  async function askAI(query) {
    var ctx = aiContext(query);
    var userMsg = (ctx ? "Extraits de mes fiches (sers-t'en si utile) :\n" + ctx + "\n\n" : "") +
      "Question de l'élève : " + query;

    // a) backend du site (production)
    if (API) {
      try {
        var r = await fetch(API + "/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query, context: ctx, system: SYSTEM })
        });
        if (r.ok) {
          var d = await r.json();
          if (d && d.ok && d.reply) return { ok: true, reply: d.reply };
          if (d && d.reason === "no_ai") { /* on tente le repli preview */ }
        }
      } catch (e) { /* réseau indispo → repli */ }
    }

    // b) repli "preview" (environnement de conception uniquement)
    if (window.claude && typeof window.claude.complete === "function") {
      try {
        var txt = await window.claude.complete({
          messages: [
            { role: "user", content: SYSTEM + "\n\n" + userMsg }
          ]
        });
        if (txt) return { ok: true, reply: String(txt).trim() };
      } catch (e) { /* ignore */ }
    }

    return { ok: false };
  }

  /* ---------------------------------------------------------
     4) Transmettre à Lenny (avis / question / idée)
     --------------------------------------------------------- */
  function whoami() {
    try {
      if (window.LennyAPI && LennyAPI.userId) {
        return { id: LennyAPI.userId(), name: LennyAPI.userName ? LennyAPI.userName() : "Élève" };
      }
    } catch (e) {}
    return { id: "u_anon", name: "Élève" };
  }

  async function forwardToLenny(text, kind) {
    var me = whoami();
    var entry = {
      kind: kind || "message",          // 'question' | 'avis' | 'idee' | 'message'
      text: String(text || "").slice(0, 2000),
      user_id: me.id, user_name: me.name,
      date: new Date().toISOString()
    };
    // repli local TOUJOURS (pour ne rien perdre)
    try {
      var list = JSON.parse(localStorage.getItem(MSG_KEY) || "[]");
      list.push(entry); localStorage.setItem(MSG_KEY, JSON.stringify(list));
    } catch (e) {}
    // backend si dispo
    if (API) {
      try {
        await fetch(API + "/api/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry)
        });
      } catch (e) {}
    }
    return true;
  }

  /* ---------------------------------------------------------
     5) Ouvrir un module (réutilise le routeur du site)
     --------------------------------------------------------- */
  function openModule(modId) {
    closePanel();
    try {
      if (window.LennyRouter && LennyRouter.openModule) { LennyRouter.openModule(modId); return; }
    } catch (e) {}
    // repli : déclenche un lien data-open-mod si présent, sinon hash
    var link = document.querySelector('[data-open-mod="' + modId + '"]');
    if (link) { link.click(); return; }
    location.hash = "#" + modId;
  }

  /* ---------------------------------------------------------
     6) Interface
     --------------------------------------------------------- */
  var root, fab, panel, body, input, sendBtn, nudge, modeBar, backdrop;
  var robotLoaded = false, robotViewer = null, robotPoll = null, robotScriptLoaded = false;
  var SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";
  var history = [];        // [{ role:'me'|'bot', html }]
  var pendingForward = null; // texte en attente de confirmation de transmission
  var forwardMode = null;    // 'avis' | 'idee' | null  (saisie dédiée)

  function loadHistory() {
    try { history = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]"); } catch (e) { history = []; }
    if (!Array.isArray(history)) history = [];
  }
  function saveHistory() {
    try { localStorage.setItem(CHAT_KEY, JSON.stringify(history.slice(-60))); } catch (e) {}
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function scrollDown() { if (body) requestAnimationFrame(function () { body.scrollTop = body.scrollHeight; }); }

  function renderMsg(role, html, opts) {
    opts = opts || {};
    var wrap = el("div", "lag-msg " + (role === "me" ? "me" : "bot"));
    if (role !== "me") wrap.appendChild(el("div", "lag-msg-ava", MARK));
    var bubble = el("div", "lag-bubble", html);
    wrap.appendChild(bubble);
    body.appendChild(wrap);

    // actions / chips éventuels
    if (opts.action) {
      var a = el("button", "lag-act",
        '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h8M8 4l4 4-4 4"/></svg>' + esc(opts.action.label));
      a.addEventListener("click", opts.action.run);
      bubble.appendChild(a);
    }
    if (opts.chips && opts.chips.length) {
      var c = el("div", "lag-chips");
      opts.chips.forEach(function (ch) {
        var b = el("button", "lag-chip" + (ch.primary ? " primary" : ""), esc(ch.label));
        b.addEventListener("click", ch.run);
        c.appendChild(b);
      });
      bubble.appendChild(c);
    }
    scrollDown();
    return bubble;
  }

  function pushHistory(role, html) { history.push({ role: role, html: html }); saveHistory(); }

  function showTyping() {
    robotSay("thinking", "Hmm… laisse-moi réfléchir 🤔");
    var wrap = el("div", "lag-msg bot lag-typing-wrap");
    wrap.appendChild(el("div", "lag-msg-ava", MARK));
    var bubble = el("div", "lag-bubble", '<div class="lag-typing"><span></span><span></span><span></span></div>');
    wrap.appendChild(bubble);
    body.appendChild(wrap);
    scrollDown();
    return wrap;
  }

  /* — Réponses : framing décontracté — */
  var OPEN_DEF = ["Tiens, dans mes fiches :", "Alors ça,", "Easy 👇", "Voilà :"];
  var OPEN_FORMULE = ["La formule, la voilà :", "Sors ta calculette 👇", "Tiens :"];
  var OPEN_MISS = [
    "Mmh, j'ai pas ça nickel dans mes fiches.",
    "Là tu me colles, j'ai rien de carré là-dessus.",
    "Pas trouvé direct dans mes fiches."
  ];

  function answerFromKB(top, query) {
    robotSay("found", "Tiens, j'ai ça pour toi 💡");
    var best = top[0].e;
    var kicker = "";
    if (best.cat === "formule") kicker = pick(OPEN_FORMULE);
    else if (best.cat === "faq" || best.cat === "module") kicker = "";
    else kicker = pick(OPEN_DEF);

    var html = (kicker ? '<span class="lag-kicker">' + esc(kicker) + "</span>" : "") + best.body;
    if (best.src) html += '<span class="lag-src">↳ ' + esc(best.src) + "</span>";

    var opts = {};
    if (best.action) opts.action = best.action;

    // s'il existe d'autres pistes proches, on les propose en chips
    var others = top.slice(1, 4).filter(function (x) { return x.score >= WEAK && x.e !== best; });
    if (others.length) {
      opts.chips = others.map(function (x) {
        return { label: x.e.q.length > 34 ? x.e.q.slice(0, 32) + "…" : x.e.q, run: function () { answerQuery(x.e.q, true); } };
      });
    }
    renderMsg("bot", html, opts);
    pushHistory("bot", html);
  }

  function offerForward(query) {
    robotSay("miss", "Là tu me colles… 🤷");
    var html = pick(OPEN_MISS) + " Tu veux que je <b>transmette ta question à Lenny</b> ? Il pourra te répondre / compléter la fiche.";
    renderMsg("bot", html, {
      chips: [
        { label: "Oui, transmettre à Lenny", primary: true, run: function () { doForward(query, "question"); } },
        { label: "Non, laisse tomber", run: function () { renderMsg("bot", "Ok, pas de souci 👍 Pose-moi autre chose quand tu veux."); } }
      ]
    });
    pushHistory("bot", html);
  }

  async function doForward(text, kind) {
    var t = showTyping();
    await forwardToLenny(text, kind);
    t.remove();
    robotSay("forwarded", "C'est noté pour Lenny ✅");
    var html = "C'est transmis à Lenny ✅ Il a ton message" + (kind === "question" ? " et ta question" : "") + ". En attendant, je reste là si tu veux réviser autre chose.";
    renderMsg("bot", html);
    pushHistory("bot", html);
  }

  /* — Cœur : traiter une requête — */
  async function answerQuery(query, skipEcho) {
    query = String(query || "").trim();
    if (!query) return;

    // mode "transmettre un avis / une idée" activé via le bouton du header
    if (forwardMode) {
      var kind = forwardMode; setForwardMode(null);
      if (!skipEcho) { renderMsg("me", esc(query)); pushHistory("me", esc(query)); }
      await doForward(query, kind);
      return;
    }

    if (!skipEcho) { renderMsg("me", esc(query)); pushHistory("me", esc(query)); robotSay("listen", "Je t'écoute… 👂"); }

    var top = search(query);
    var strong = top.length && top[0].score >= STRONG;
    var weak = top.length && top[0].score >= WEAK;

    // FAQ marquée "forward" → on répond ET on propose de transmettre
    var bestIsForwardFaq = strong && top[0].e.cat === "faq" && FAQ.some(function (f) { return f.q === top[0].e.q && f.forward; });

    if (strong) {
      answerFromKB(top, query);
      if (bestIsForwardFaq) {
        var bubble = body.querySelector(".lag-msg.bot:last-child .lag-bubble");
        // on ajoute une puce de transmission
        var c = el("div", "lag-chips");
        var b = el("button", "lag-chip primary", "Transmettre mon cas à Lenny");
        b.addEventListener("click", function () { setForwardMode("message"); input.focus(); });
        c.appendChild(b);
        if (bubble) bubble.appendChild(c);
      }
      return;
    }

    // Sinon → IA de secours
    var t = showTyping();
    var ai = await askAI(query);
    t.remove();

    if (ai.ok) {
      robotSay("found", "Voilà ce que j'en pense ✨");
      var html = renderInline(ai.reply);
      var opts = {};
      // si une fiche correspondait un peu, on garde le lien module
      if (weak && top[0].e.action) opts.action = top[0].e.action;
      renderMsg("bot", html, opts);
      pushHistory("bot", html);
      return;
    }

    // IA indispo → si une piste faible existe, on la propose ; sinon on transmet
    if (weak) {
      answerFromKB(top, query);
      var note = "C'est ce qui s'en rapproche le plus dans mes fiches. Pas tout à fait ça ? Je peux transmettre ta question à Lenny.";
      renderMsg("bot", note, { chips: [{ label: "Transmettre à Lenny", primary: true, run: function () { doForward(query, "question"); } }] });
      pushHistory("bot", note);
    } else {
      offerForward(query);
    }
  }

  // mini-markdown sûr (gras **x**, listes, retours ligne)
  function renderInline(text) {
    var s = esc(text);
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    // listes "- "
    if (/^\s*[-•]\s/m.test(s)) {
      var lines = s.split("\n"), out = [], inUl = false;
      lines.forEach(function (l) {
        var m = l.match(/^\s*[-•]\s+(.*)$/);
        if (m) { if (!inUl) { out.push("<ul>"); inUl = true; } out.push("<li>" + m[1] + "</li>"); }
        else { if (inUl) { out.push("</ul>"); inUl = false; } if (l.trim()) out.push(l); }
      });
      if (inUl) out.push("</ul>");
      s = out.join("\n");
    }
    return s.replace(/\n/g, "<br>");
  }

  /* — Mode saisie "transmettre" — */
  function setForwardMode(kind) {
    forwardMode = kind;
    if (kind) {
      modeBar.classList.add("show");
      modeBar.querySelector(".lag-mode-tx").textContent =
        kind === "avis" ? "Ton avis pour Lenny — écris-le ci-dessous" :
        kind === "idee" ? "Ton idée / suggestion — écris-la ci-dessous" :
        "Ton message pour Lenny — écris-le ci-dessous";
      input.placeholder = "Écris ton message à Lenny…";
    } else {
      modeBar.classList.remove("show");
      input.placeholder = "Pose ta question…";
    }
  }

  /* — Construction du DOM — */
  function build() {
    root = el("div", "lag-root");

    // Bulle
    fab = el("button", "lag-fab");
    fab.setAttribute("aria-label", "Ouvrir Lenny-agent");
    fab.innerHTML =
      '<span class="lag-ping"></span>' +
      '<svg class="lag-fab-chat" viewBox="0 0 32 32" fill="none" aria-hidden="true">' + MARK_INNER + '</svg>' +
      '<svg class="lag-fab-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    fab.addEventListener("click", togglePanel);

    // Nudge
    nudge = el("div", "lag-nudge",
      'Une question sur tes révisions ? <b>Demande-moi</b> 👋<span class="lag-nudge-x">✕</span>');
    nudge.querySelector(".lag-nudge-x").addEventListener("click", function (e) {
      e.stopPropagation(); hideNudge();
    });
    nudge.addEventListener("click", togglePanel);

    // Panneau
    panel = el("div", "lag-panel");
    panel.innerHTML =
      '<div class="lag-chatcol">' +
      '<div class="lag-head">' +
        '<div class="lag-ava">' + MARK + '</div>' +
        '<div class="lag-head-tx"><div class="lag-name">Lenny-agent</div><div class="lag-status">révise avec toi · en ligne</div></div>' +
        '<button class="lag-head-btn lag-head-idea" title="Une idée / un avis pour Lenny" aria-label="Transmettre un avis">' +
          '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2.5a5 5 0 0 0-3 9v1.5h6V11.5a5 5 0 0 0-3-9Z"/><path d="M8 16h4M8.5 18h3"/></svg>' +
        '</button>' +
        '<button class="lag-head-btn lag-head-expand" title="Agrandir — voir le robot" aria-label="Agrandir">' +
          '<svg class="i-grow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4h4v4M16 4l-5 5M8 16H4v-4M4 16l5-5"/></svg>' +
          '<svg class="i-shrink" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 9h-4V5M11 9l5-5M5 11h4v4M9 11l-5 5"/></svg>' +
        '</button>' +
        '<button class="lag-head-btn lag-head-min" title="Réduire" aria-label="Réduire">' +
          '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 10h10"/></svg>' +
        '</button>' +
      '</div>' +
      '<button class="lag-robot-cta" type="button" aria-label="Parler en face du robot">' +
        '<span class="lag-cta-bot"><span class="lag-cta-face"><i class="lag-cta-eye"></i><i class="lag-cta-eye"></i></span></span>' +
        '<span class="lag-cta-tx"><b>Parle en face du robot</b><span>Il te suit du regard pendant que tu révises</span></span>' +
        '<span class="lag-cta-go"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4h4v4M16 4l-5 5M8 16H4v-4M4 16l5-5"/></svg></span>' +
      '</button>' +
      '<div class="lag-body"></div>' +
      '<div class="lag-foot">' +
        '<div class="lag-mode">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 4.5 8 9l6-4.5M2 4.5h12v7H2z"/></svg>' +
          '<span class="lag-mode-tx">Message pour Lenny</span>' +
          '<span class="lag-mode-x" title="Annuler">Annuler</span>' +
        '</div>' +
        '<div class="lag-inputrow">' +
          '<textarea class="lag-input" rows="1" placeholder="Pose ta question…" aria-label="Message"></textarea>' +
          '<button class="lag-send" aria-label="Envoyer" disabled>' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10 17 3l-4 14-3-6-7-1Z"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="lag-hint">Lenny-agent peut se tromper — vérifie les infos importantes.</div>' +
      '</div>' +
      '</div>' + /* /lag-chatcol */
      '<div class="lag-robot" aria-hidden="true">' +
        '<div class="lag-robot-spot"></div>' +
        '<div class="lag-robot-stage">' +
          '<div class="lag-robot-load"><span class="lag-robot-spin"></span><span class="lag-robot-load-tx">Réveil du robot…</span></div>' +
        '</div>' +
        '<div class="lag-robot-cap">' +
          '<div class="lag-robot-title">Lenny te suit du regard 👀</div>' +
          '<div class="lag-robot-sub">Bouge ta souris — il te regarde. Pose ta question à gauche.</div>' +
        '</div>' +
        '<div class="lag-robot-wm"></div>' +
      '</div>';

    root.appendChild(nudge);
    root.appendChild(panel);
    root.appendChild(fab);
    document.body.appendChild(root);

    body = panel.querySelector(".lag-body");
    input = panel.querySelector(".lag-input");
    sendBtn = panel.querySelector(".lag-send");
    modeBar = panel.querySelector(".lag-mode");

    panel.querySelector(".lag-head-min").addEventListener("click", closePanel);
    panel.querySelector(".lag-head-expand").addEventListener("click", toggleExpand);
    panel.querySelector(".lag-robot-cta").addEventListener("click", function () { setExpanded(true); });

    // backdrop (clic en dehors → on rétrécit)
    backdrop = el("div", "lag-backdrop");
    backdrop.addEventListener("click", function () { setExpanded(false); });
    root.appendChild(backdrop);
    panel.querySelector(".lag-head-idea").addEventListener("click", function () {
      setForwardMode("idee"); input.focus();
    });
    modeBar.querySelector(".lag-mode-x").addEventListener("click", function () { setForwardMode(null); });

    // saisie
    input.addEventListener("input", function () {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 110) + "px";
      sendBtn.disabled = !input.value.trim();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
    });
    sendBtn.addEventListener("click", submit);

    // historique ou message d'accueil
    loadHistory();
    if (history.length) {
      history.forEach(function (m) { renderMsg(m.role, m.html); });
    } else {
      greet();
    }

    // nudge après un court délai si jamais ouvert
    var seen = false;
    try { seen = localStorage.getItem(SEEN_KEY) === "1"; } catch (e) {}
    if (seen) root.classList.add("lag-seen");
    else setTimeout(function () { if (!root.classList.contains("is-open")) showNudge(); }, 4200);
  }

  function greet() {
    var html = "Yo 👋 Moi c'est <b>Lenny-agent</b>. Pose-moi une question sur le BTS — " +
      "une <b>définition</b> (Hoguet, HCSF, DPE…), une <b>formule</b> (prix net vendeur, mensualité…), " +
      "ou un truc pratique sur le site. Et si tu as un <b>avis</b> ou une <b>idée</b> pour Lenny, je transmets.";
    renderMsg("bot", html);
    pushHistory("bot", html);
  }

  function submit() {
    var v = input.value.trim();
    if (!v) return;
    input.value = ""; input.style.height = "auto"; sendBtn.disabled = true;
    answerQuery(v);
  }

  /* — Ouverture / fermeture — */
  function openPanel() {
    root.classList.add("is-open");
    hideNudge();
    try { localStorage.setItem(SEEN_KEY, "1"); } catch (e) {}
    root.classList.add("lag-seen");
    setTimeout(function () { if (window.innerWidth > 640) input && input.focus(); scrollDown(); }, 280);
  }
  function closePanel() { root.classList.remove("is-open", "lag-expanded"); destroyRobot(); }
  function togglePanel() { root.classList.contains("is-open") ? closePanel() : openPanel(); }

  /* — Mode élargi : conversation à gauche + robot 3D qui suit la souris à droite — */
  function ensureRobot() {
    if (robotLoaded) return;
    robotLoaded = true;
    var stage = panel.querySelector(".lag-robot-stage");
    if (!stage) return;
    panel.classList.remove("robot-ready", "robot-fail");
    var loadEl = panel.querySelector(".lag-robot-load");
    if (loadEl) loadEl.style.display = "";

    var viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", SPLINE_SCENE);
    viewer.className = "lag-spline";
    robotViewer = viewer;
    var ctxBound = false;

    function hideBranding() {
      try {
        var sr = viewer.shadowRoot;
        if (!sr) return;
        var logo = sr.querySelector("#logo, a[href*='spline']");
        if (logo) logo.style.display = "none";
      } catch (e) {}
    }
    // récupération auto si le GPU perd le contexte WebGL (cause n°1 des « bugs après un moment »)
    function bindContext() {
      if (ctxBound) return;
      try {
        var canv = viewer.shadowRoot && viewer.shadowRoot.querySelector("canvas");
        if (!canv) return;
        ctxBound = true;
        canv.addEventListener("webglcontextlost", function (ev) {
          ev.preventDefault();
          // on reconstruit proprement le robot
          destroyRobot();
          if (root.classList.contains("lag-expanded")) setTimeout(ensureRobot, 400);
        });
      } catch (e) {}
    }
    function reveal() {
      panel.classList.add("robot-ready");
      var l = panel.querySelector(".lag-robot-load");
      if (l) l.style.display = "none";
      hideBranding();
      bindContext();
    }
    viewer.addEventListener("load", reveal);
    stage.appendChild(viewer);
    // révèle dès qu'un canvas apparaît (au cas où l'event 'load' ne se déclenche pas)
    var tries = 0;
    robotPoll = setInterval(function () {
      tries++;
      hideBranding();                       // le logo Spline peut apparaître après le canvas
      bindContext();
      var canv = viewer.shadowRoot && viewer.shadowRoot.querySelector("canvas");
      if (canv) reveal();
      if (tries > 40) { clearInterval(robotPoll); robotPoll = null; }
    }, 400);
    // repli si le robot ne charge pas (hors-ligne / CDN bloqué)
    setTimeout(function () { if (robotLoaded && !panel.classList.contains("robot-ready")) panel.classList.add("robot-fail"); }, 14000);
    if (!robotScriptLoaded) {
      robotScriptLoaded = true;
      var s = document.createElement("script");
      s.type = "module";
      s.src = "https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js";
      document.head.appendChild(s);
    }
  }
  // libère le robot 3D (stoppe le rendu WebGL) — appelé quand on réduit la fenêtre
  function destroyRobot() {
    if (robotPoll) { clearInterval(robotPoll); robotPoll = null; }
    if (robotViewer) {
      try { if (typeof robotViewer.dispose === "function") robotViewer.dispose(); } catch (e) {}
      try { robotViewer.remove(); } catch (e) {}
      robotViewer = null;
    }
    if (panel) {
      panel.classList.remove("robot-ready", "robot-fail");
      var l = panel.querySelector(".lag-robot-load");
      if (l) l.style.display = "";
    }
    robotLoaded = false;
  }
  /* — Réactions du robot au fil de la conversation (légende + ambiance) — */
  var ROBOT_IDLE = "Lenny te suit du regard 👀";
  var ROBOT_HINT = "Bouge ta souris — il te regarde. Pose ta question à gauche.";
  function robotSay(mood, msg, hint) {
    if (!panel) return;
    var pane = panel.querySelector(".lag-robot");
    if (!pane) return;
    pane.setAttribute("data-mood", mood || "idle");
    var t = pane.querySelector(".lag-robot-title");
    var sub = pane.querySelector(".lag-robot-sub");
    if (t) {
      t.textContent = msg || ROBOT_IDLE;
      t.classList.remove("lag-pop"); void t.offsetWidth; t.classList.add("lag-pop");
    }
    if (sub && hint != null) sub.textContent = hint;
  }

  function setExpanded(on) {
    if (!root) return;
    if (on) { openPanel(); ensureRobot(); root.classList.add("lag-expanded"); robotSay("hello", "Salut 👋 je t'écoute", ROBOT_HINT); }
    else { root.classList.remove("lag-expanded"); setTimeout(function () { if (!root.classList.contains("lag-expanded")) destroyRobot(); }, 300); }
    setTimeout(scrollDown, 320);
  }
  function toggleExpand() { setExpanded(!root.classList.contains("lag-expanded")); }

  function showNudge() { nudge && nudge.classList.add("show"); }
  function hideNudge() { nudge && nudge.classList.remove("show"); }

  // Echap pour fermer
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root && root.classList.contains("is-open")) {
      if (root.classList.contains("lag-expanded")) setExpanded(false);
      else closePanel();
    }
  });

  /* — API publique éventuelle — */
  window.LennyAgent = {
    open: function () { openPanel(); },
    close: function () { closePanel(); },
    expand: function () { setExpanded(true); },
    ask: function (q) { openPanel(); setTimeout(function () { answerQuery(q); }, 200); }
  };

  /* — Démarrage (après le gate / chargement) — */
  function wireRobotLaunchers() {
    // bouton « Réviser avec le robot » + tout élément [data-open-robot]
    document.addEventListener("click", function (e) {
      var trg = e.target.closest && e.target.closest("#hero-robot, [data-open-robot]");
      if (trg) { e.preventDefault(); setExpanded(true); }
    });
  }
  function boot() {
    if (document.querySelector(".lag-root")) return;
    build();
    wireRobotLaunchers();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(boot, 600); });
  } else { setTimeout(boot, 600); }
})();
