/* ============================================
   LENNY — EXOS (exercices types BTS · calculs)
   Bibliothèque de dossiers + fiche détaillée avec correction révélable.
   Dépend de : window.EXOS, window.EXOS_FICHE
   API : window.LennyExos = { open, close }
   ============================================ */
(function () {
  "use strict";

  /* couleur d'accent par thème */
  var THEME_COLOR = {
    "Estimation": "#c1322d",
    "Transaction": "#c1322d",
    "TVA": "#b1571f",
    "Commercial": "#2f6f8f",
    "Rentabilité": "#2e7d4f",
    "Financement": "#3a5a8a",
    "Crédit": "#7a4fb0",
    "Épargne": "#1f8a6d",
    "Fiscalité": "#a23a5b",
    "Viager": "#8a5e1f",
    "Rémunération": "#b5452a",
    "Syndic": "#2d6fa3"
  };
  function accent(theme) { return THEME_COLOR[theme] || "#c1322d"; }

  var ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    go: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 7h11M8 12h11M8 17h11M4.5 7h0M4.5 12h0M4.5 17h0"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var el = null, activeFilter = "all";

  function ensureEl() {
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-exos";
    el.innerHTML =
      '<div class="ex-backdrop" data-ex-close></div>' +
      '<button class="ex-close" data-ex-close aria-label="Fermer">✕</button>' +
      '<div class="ex-shell" id="ex-shell"></div>';
    document.body.appendChild(el);
    el.querySelectorAll("[data-ex-close]").forEach(function (b) {
      b.addEventListener("click", close);
    });
    return el;
  }

  /* ---------------- Bibliothèque ---------------- */
  function themes() {
    var seen = {}, out = [];
    (window.EXOS || []).forEach(function (d) { if (!seen[d.theme]) { seen[d.theme] = 1; out.push(d.theme); } });
    return out;
  }

  function libraryHTML() {
    var list = window.EXOS || [];
    var filters = '<button class="ex-chip' + (activeFilter === "all" ? " on" : "") + '" data-f="all">Tous</button>';
    themes().forEach(function (t) {
      filters += '<button class="ex-chip' + (activeFilter === t ? " on" : "") + '" data-f="' + esc(t) + '">' + esc(t) + '</button>';
    });

    var cards = "";
    list.forEach(function (d, i) {
      if (activeFilter !== "all" && d.theme !== activeFilter) return;
      var acc = accent(d.theme);
      var nq = (d.questions || []).length;
      cards +=
        '<button class="ex-card" data-open="' + i + '" style="--ex-acc:' + acc + '">' +
          '<div class="ex-card-top">' +
            '<span class="ex-card-num">Dossier ' + esc(d.num) + '</span>' +
            '<span class="ex-card-theme">' + esc(d.theme) + '</span>' +
          '</div>' +
          '<h3 class="ex-card-title">' + esc(d.titre) + '</h3>' +
          '<div class="ex-card-meta">' + ICON.list + (nq ? (nq + ' question' + (nq > 1 ? 's' : '')) : 'Correction détaillée') + '</div>' +
          '<span class="ex-card-go">' + ICON.go + '</span>' +
        '</button>';
    });

    // carte fiche méthode (toujours en fin, hors filtre thème)
    var ficheCard = '';
    if (window.EXOS_FICHE && (activeFilter === "all")) {
      ficheCard =
        '<button class="ex-card fiche" data-fiche="1">' +
          '<div class="ex-card-top">' +
            '<span class="ex-card-num">Mémo</span>' +
            '<span class="ex-card-theme">Toutes formules</span>' +
          '</div>' +
          '<h3 class="ex-card-title">Fiche méthode des calculs</h3>' +
          '<div class="ex-card-meta">' + ICON.list + 'Toutes les formules par domaine</div>' +
          '<span class="ex-card-go">' + ICON.go + '</span>' +
        '</button>';
    }

    return (
      '<header class="ex-top">' +
        '<div class="ex-top-row">' +
          '<span class="ex-brand"><span class="ex-brand-l">L</span> · EXOS</span>' +
          '<span class="ex-kicker">BTS Professions Immobilières · Calculs pro</span>' +
        '</div>' +
        '<h1 class="ex-h1">Exercices types — Transaction & calculs</h1>' +
        '<p class="ex-sub">' + (list.length) + ' dossiers corrigés : estimation, honoraires, TVA, rentabilité, financement, crédit, plus-value, viager, rémunération, syndic…</p>' +
        '<button class="ex-train-cta" id="ex-train-btn" type="button">' +
          '<span class="ex-train-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8.9.9 1.5l.2 1.2h5l.2-1.2c.1-.6.4-1.1.9-1.5A6 6 0 0 0 12 3Z"/><path d="M9.5 20.5h5M10 18h4"/></svg></span>' +
          '<span class="ex-train-txt"><strong>Entraînement formules</strong><span>Mémorise les ' + countFormulas() + ' formules en mode flashcards (rappel actif)</span></span>' +
          '<span class="ex-train-go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></span>' +
        '</button>' +
        '<div class="ex-filters" id="ex-filters">' + filters + '</div>' +
      '</header>' +
      '<div class="ex-lib"><div class="ex-grid" id="ex-grid">' + cards + ficheCard + '</div></div>' +
      '<p class="ex-libnote">Choisis un dossier : énoncé, données et questions s\'affichent. La correction détaillée (formule · calcul · résultat) se révèle quand tu le décides — idéal pour t\'entraîner avant de vérifier.</p>'
    );
  }

  function renderLibrary() {
    var shell = document.getElementById("ex-shell");
    shell.innerHTML = libraryHTML();
    shell.scrollTop = 0;
    el.querySelector(".ex-shell").parentNode.querySelector(".ex-shell").scrollTop = 0;

    shell.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () { renderDossier(parseInt(b.dataset.open, 10)); });
    });
    var fiche = shell.querySelector("[data-fiche]");
    if (fiche) fiche.addEventListener("click", renderFiche);
    var trainBtn = shell.querySelector("#ex-train-btn");
    if (trainBtn) trainBtn.addEventListener("click", function () { startTrainer("all"); });
    shell.querySelectorAll("#ex-filters .ex-chip").forEach(function (c) {
      c.addEventListener("click", function () { activeFilter = c.dataset.f; renderLibrary(); });
    });
  }

  /* ---------------- Entraînement formules (flashcards · rappel actif) ----------------
     Méthode d'apprentissage : on lit l'intitulé d'un calcul, on essaie
     de retrouver la formule de mémoire, puis on la révèle et on note
     « Acquis » / « À revoir ». Les cartes « à revoir » reviennent. */
  function allFormulas() {
    var out = [];
    (window.EXOS_FICHE || []).forEach(function (b) {
      b.rows.forEach(function (r) { out.push({ dom: b.dom, label: r[0], f: r[1] }); });
    });
    return out;
  }
  function countFormulas() { return allFormulas().length; }

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  var trainState = null;

  function startTrainer(scope) {
    var deck = shuffle(allFormulas());
    trainState = { deck: deck, i: 0, known: 0, review: [], total: deck.length, revealed: false };
    renderTrainer();
  }

  function renderTrainerCard() {
    var s = trainState, c = s.deck[s.i];
    var acc = accent(c.dom);
    return (
      '<div class="ex-tr-progress"><div class="ex-tr-bar" style="width:' + Math.round((s.i / s.total) * 100) + '%"></div></div>' +
      '<div class="ex-tr-count">Carte ' + (s.i + 1) + ' / ' + s.total + ' · <span class="ok">' + s.known + ' acquis</span> · <span class="rev">' + s.review.length + ' à revoir</span></div>' +
      '<div class="ex-tr-card' + (s.revealed ? ' flip' : '') + '" id="ex-tr-card" style="--ex-acc:' + acc + '">' +
        '<div class="ex-tr-dom">' + esc(c.dom) + '</div>' +
        '<div class="ex-tr-q">' +
          '<span class="ex-tr-ask">Quelle est la formule de…</span>' +
          '<span class="ex-tr-label">' + esc(c.label) + '</span>' +
        '</div>' +
        (s.revealed
          ? '<div class="ex-tr-answer"><span class="ex-tr-eq">' + esc(c.f) + '</span></div>'
          : '<button class="ex-tr-reveal" id="ex-tr-reveal" type="button">Afficher la formule</button>') +
      '</div>' +
      (s.revealed
        ? '<div class="ex-tr-actions">' +
            '<button class="ex-tr-btn rev" id="ex-tr-again" type="button">À revoir</button>' +
            '<button class="ex-tr-btn ok" id="ex-tr-known" type="button">Acquis ✓</button>' +
          '</div>'
        : '<div class="ex-tr-hint">Essaie de la retrouver de tête, puis affiche la réponse.</div>')
    );
  }

  function renderTrainer() {
    var shell = document.getElementById("ex-shell");
    var s = trainState;

    if (s.i >= s.deck.length) {
      // fin de série
      var mastered = s.total - s.review.length;
      shell.innerHTML =
        '<div class="ex-detail"><button class="ex-back" id="ex-back">' + ICON.back + 'Tous les dossiers</button>' +
        '<div class="ex-paper ex-tr-wrap" style="--ex-acc:#2e7d4f">' +
          '<div class="ex-tr-end">' +
            '<div class="ex-tr-end-ic">' + ICON.check + '</div>' +
            '<h2 class="ex-tr-end-title">Série terminée !</h2>' +
            '<p class="ex-tr-end-sub">' + mastered + ' / ' + s.total + ' formule' + (mastered > 1 ? 's' : '') + ' acquise' + (mastered > 1 ? 's' : '') + '.</p>' +
            '<div class="ex-tr-end-actions">' +
              (s.review.length ? '<button class="ex-tr-btn rev" id="ex-tr-redo-review" type="button">Revoir les ' + s.review.length + ' difficiles</button>' : '') +
              '<button class="ex-tr-btn ok" id="ex-tr-restart" type="button">Tout recommencer</button>' +
            '</div>' +
          '</div>' +
        '</div></div>';
      shell.parentNode.querySelector(".ex-shell").scrollTop = 0;
      shell.querySelector("#ex-back").addEventListener("click", renderLibrary);
      var redo = shell.querySelector("#ex-tr-redo-review");
      if (redo) redo.addEventListener("click", function () {
        var deck = shuffle(s.review);
        trainState = { deck: deck, i: 0, known: 0, review: [], total: deck.length, revealed: false };
        renderTrainer();
      });
      shell.querySelector("#ex-tr-restart").addEventListener("click", function () { startTrainer("all"); });
      return;
    }

    shell.innerHTML =
      '<div class="ex-detail">' +
        '<button class="ex-back" id="ex-back">' + ICON.back + 'Quitter l\'entraînement</button>' +
        '<div class="ex-paper ex-tr-wrap">' + renderTrainerCard() + '</div>' +
      '</div>';
    shell.parentNode.querySelector(".ex-shell").scrollTop = 0;

    shell.querySelector("#ex-back").addEventListener("click", renderLibrary);
    var reveal = shell.querySelector("#ex-tr-reveal");
    if (reveal) reveal.addEventListener("click", function () { s.revealed = true; renderTrainer(); });
    var known = shell.querySelector("#ex-tr-known");
    var again = shell.querySelector("#ex-tr-again");
    if (known) known.addEventListener("click", function () { s.known++; s.i++; s.revealed = false; renderTrainer(); });
    if (again) again.addEventListener("click", function () { s.review.push(s.deck[s.i]); s.i++; s.revealed = false; renderTrainer(); });
  }

  /* ---------------- Détail d'un dossier ---------------- */
  function rowHTML(r) {
    var calc = "";
    if (r.formule) calc += '<span class="f">' + esc(r.formule) + '</span>';
    if (r.calcul) calc += (r.formule ? '<span class="sep">→</span>' : '') + '<span class="c">' + esc(r.calcul) + '</span>';
    return (
      '<div class="ex-row">' +
        '<span class="ex-row-n">' + esc(r.n || "") + '</span>' +
        '<span class="ex-row-label">' + esc(r.label) + '</span>' +
        '<span class="ex-row-res">' + esc(r.res) + '</span>' +
        (calc ? '<span class="ex-row-calc">' + calc + '</span>' : '') +
      '</div>'
    );
  }

  function dossierHTML(d, i) {
    var acc = accent(d.theme);
    var enonce = (d.enonce || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("");
    var data = (d.data || []).map(function (kv) {
      return '<div class="ex-data-row"><span class="ex-data-k">' + esc(kv.k) + '</span><span class="ex-data-v">' + esc(kv.v) + '</span></div>';
    }).join("");
    var qs = (d.questions || []).map(function (q, j) {
      return '<div class="ex-q"><span class="ex-q-n">' + (j + 1) + '</span><p class="ex-q-t">' + esc(q) + '</p></div>';
    }).join("");
    var rows = (d.correction || []).map(rowHTML).join("");
    var formules = (d.formules || []).map(function (f) {
      return '<div class="ex-fitem"><span class="k">' + esc(f.label) + '</span><span class="v">' + esc(f.f) + '</span></div>';
    }).join("");
    var concl = d.conclusion ? '<div class="ex-concl">' + esc(d.conclusion) + '</div>' : '';

    var list = window.EXOS || [];

    return (
      '<div class="ex-detail">' +
        '<button class="ex-back" id="ex-back">' + ICON.back + 'Tous les dossiers</button>' +
        '<div class="ex-paper" style="--ex-acc:' + acc + '">' +
          '<div class="ex-d-head">' +
            '<div class="ex-d-eyebrow">' +
              '<span class="ex-d-num">Dossier ' + esc(d.num) + '</span>' +
              '<span class="ex-d-theme">' + esc(d.theme) + '</span>' +
            '</div>' +
            '<h2 class="ex-d-title">' + esc(d.titre) + '</h2>' +
          '</div>' +

          '<div class="ex-sec ex-enonce"><div class="ex-label">Énoncé</div>' + enonce + '</div>' +
          (data ? '<div class="ex-sec"><div class="ex-label">Données</div><div class="ex-data">' + data + '</div></div>' : '') +
          (qs ? '<div class="ex-sec"><div class="ex-label">Questions</div><div class="ex-qs">' + qs + '</div></div>' : '') +

          '<div class="ex-reveal-wrap">' +
            '<button class="ex-reveal" id="ex-reveal">' + ICON.eye + '<span>Voir la correction</span></button>' +
          '</div>' +

          '<div class="ex-corr" id="ex-corr">' +
            '<div class="ex-corr-head"><span class="tick">' + ICON.check + '</span>Correction détaillée</div>' +
            '<div class="ex-rows">' + rows + '</div>' +
            (formules ? '<div class="ex-formules"><div class="ex-label">Formules à retenir</div>' + formules + '</div>' : '') +
            concl +
          '</div>' +

          '<div class="ex-nav">' +
            '<button id="ex-prev"' + (i <= 0 ? ' disabled' : '') + '>' + ICON.prev + 'Précédent</button>' +
            '<button id="ex-next"' + (i >= list.length - 1 ? ' disabled' : '') + '>Suivant' + ICON.next + '</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderDossier(i) {
    var list = window.EXOS || [];
    if (i < 0 || i >= list.length) return;
    var shell = document.getElementById("ex-shell");
    shell.innerHTML = dossierHTML(list[i], i);
    shell.parentNode.querySelector(".ex-shell").scrollTop = 0;

    shell.querySelector("#ex-back").addEventListener("click", renderLibrary);
    var prev = shell.querySelector("#ex-prev"), next = shell.querySelector("#ex-next");
    if (prev) prev.addEventListener("click", function () { renderDossier(i - 1); });
    if (next) next.addEventListener("click", function () { renderDossier(i + 1); });

    var btn = shell.querySelector("#ex-reveal"), corr = shell.querySelector("#ex-corr");
    btn.addEventListener("click", function () {
      var open = corr.classList.toggle("show");
      btn.classList.toggle("is-open", open);
      btn.querySelector("span").textContent = open ? "Masquer la correction" : "Voir la correction";
      if (open) {
        try { corr.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
      }
    });
  }

  /* ---------------- Fiche méthode ---------------- */
  function renderFiche() {
    var shell = document.getElementById("ex-shell");
    var blocks = (window.EXOS_FICHE || []).map(function (b) {
      var rows = b.rows.map(function (r) {
        return '<div class="ex-fiche-row"><span class="k">' + esc(r[0]) + '</span><span class="v">' + esc(r[1]) + '</span></div>';
      }).join("");
      return '<div class="ex-fiche-dom">' + esc(b.dom) + '</div>' + rows;
    }).join("");

    shell.innerHTML =
      '<div class="ex-detail">' +
        '<button class="ex-back" id="ex-back">' + ICON.back + 'Tous les dossiers</button>' +
        '<div class="ex-paper" style="--ex-acc:#d9a441">' +
          '<div class="ex-d-head">' +
            '<div class="ex-d-eyebrow"><span class="ex-d-num">Mémo</span><span class="ex-d-theme">Toutes formules</span></div>' +
            '<h2 class="ex-d-title">Fiche méthode des calculs</h2>' +
          '</div>' +
          '<div class="ex-fiche-block">' + blocks + '</div>' +
        '</div>' +
      '</div>';
    shell.parentNode.querySelector(".ex-shell").scrollTop = 0;
    shell.querySelector("#ex-back").addEventListener("click", renderLibrary);
  }

  /* ---------------- Porte d'accès (code) ----------------
     Exos est réservé : un code est demandé à l'ouverture, puis
     mémorisé sur l'appareil. 👉 Pour changer le code : EXOS_CODE. */
  var EXOS_CODE = "lennyaxel";
  var UNLOCK_KEY = "lenny_exos_unlocked_v1";
  function isUnlocked() { try { return localStorage.getItem(UNLOCK_KEY) === "1"; } catch (e) { return false; } }
  function setUnlocked() { try { localStorage.setItem(UNLOCK_KEY, "1"); } catch (e) {} }

  function renderGate() {
    var shell = document.getElementById("ex-shell");
    shell.innerHTML =
      '<div class="ex-gate">' +
        '<div class="ex-gate-card" id="ex-gate-card">' +
          '<div class="ex-gate-lock">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.4" r="1.3"/></svg>' +
          '</div>' +
          '<h2 class="ex-gate-title">Espace réservé</h2>' +
          '<p class="ex-gate-sub">Les exercices types sont protégés. Entre ton code d\'accès pour continuer.</p>' +
          '<form class="ex-gate-form" id="ex-gate-form" autocomplete="off">' +
            '<input class="ex-gate-input" id="ex-gate-input" type="password" inputmode="text" placeholder="Code d\'accès" aria-label="Code d\'accès" />' +
            '<button class="ex-gate-btn" type="submit">Déverrouiller</button>' +
          '</form>' +
          '<p class="ex-gate-err" id="ex-gate-err">Code incorrect — réessaie.</p>' +
        '</div>' +
      '</div>';
    var form = shell.querySelector("#ex-gate-form");
    var input = shell.querySelector("#ex-gate-input");
    var err = shell.querySelector("#ex-gate-err");
    setTimeout(function () { try { input.focus(); } catch (e) {} }, 80);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if ((input.value || "").trim().toLowerCase() === EXOS_CODE.toLowerCase()) {
        setUnlocked(); renderLibrary();
      } else {
        err.classList.add("show"); input.value = ""; input.focus();
        var card = shell.querySelector("#ex-gate-card");
        if (card) { card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake"); }
      }
    });
  }

  /* ---------------- Ouverture / fermeture ---------------- */
  function open(arg) {
    ensureEl();
    if (!isUnlocked()) {
      renderGate();
    } else {
      renderLibrary();
      // ouverture directe d'un dossier par id (optionnel)
      if (typeof arg === "string") {
        var idx = (window.EXOS || []).findIndex(function (d) { return d.id === arg; });
        if (idx >= 0) renderDossier(idx);
      }
    }
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    if (!el) return;
    el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && el && el.classList.contains("open")) close();
  });

  window.LennyExos = { open: open, close: close };

  /* ---------------- Accès privé (réservé à toi) ----------------
     Pas de bouton visible : Exos s'ouvre uniquement via une adresse
     secrète. Tape l'une de ces fins d'URL (que toi seul connais) :
        pibts.netlify.app/#mesexos
        pibts.netlify.app/#exos
     Tu peux mettre cette adresse en favori sur ton téléphone. */
  var SECRET_HASHES = ["#mesexos", "#exos"];
  function checkHash() {
    var h = (location.hash || "").toLowerCase();
    if (SECRET_HASHES.indexOf(h) !== -1) {
      open();
      // on nettoie l'URL pour ne pas laisser l'indice visible
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    }
  }
  window.addEventListener("hashchange", checkHash);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(checkHash, 300); });
  else setTimeout(checkHash, 300);
})();
