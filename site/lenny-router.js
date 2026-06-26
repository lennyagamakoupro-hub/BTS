/* ============================================
   LENNY — Routeur de vues (SPA en un fichier)
   Accueil ⇄ pages sectorielles dédiées (Transaction / Syndic / Droit).
   Route via location.hash. Depends on: LENNY_MODULES, cardHtml, LennyQuiz
   ============================================ */
(function () {
  const SECTORS = {
    transaction: {
      kicker: "Le cœur du métier",
      title: "Transaction",
      desc: "Tout le cycle de la vente, de l'accueil du client au financement du projet. Prospection, estimation, mandats, ratios et closing.",
      ids: ["m1", "m3", "m4", "m5", "m6", "m6b", "m8", "m11", "syn"],
    },
    syndic: {
      kicker: "L'immeuble & la ville",
      title: "Syndic",
      desc: "La gestion de l'immeuble et l'aménagement durable : copropriété et gestion du personnel d'immeuble, urbanisme et construction, réglementation environnementale, valeur verte et écoquartiers.",
      ids: ["mperso", "murba", "macte1", "macte2", "macte3", "macte4", "macte5", "macte6", "macte7", "macte8", "mvert", "mville"],
    },
    droit: {
      kicker: "Les fondations légales",
      title: "Droit",
      desc: "Le cadre juridique de toute la profession : sources et hiérarchie du droit, déontologie et RGPD, organisation judiciaire, droit de la famille, de la preuve et des contrats, professions de l'immobilier et propriété.",
      ids: ["mdroit", "mprop", "mdsources", "mddeonto", "mdjustice", "mdfamille", "mdpreuve", "mdcontrats", "m2"],
    },
  };

  function byId(id) {
    return (typeof LENNY_MODULES !== "undefined") ? LENNY_MODULES.find(m => m.id === id) : null;
  }

  function currentRoute() {
    const h = (location.hash || "").replace(/^#\/?/, "");
    if (h === "progress") return "progress";
    return SECTORS[h] ? h : "home";
  }

  function setActiveNav(route) {
    document.querySelectorAll(".nav-links a").forEach(a => {
      const href = (a.getAttribute("href") || "").replace(/^#/, "");
      const isActive = (route === "home") ? (href === "home")
        : (href === route);
      a.classList.toggle("active", isActive);
    });
  }

  function showHome(scrollToId) {
    const home = document.getElementById("view-home");
    const sec = document.getElementById("view-sector");
    const prog = document.getElementById("view-progress");
    if (sec) sec.hidden = true;
    if (prog) prog.hidden = true;
    if (home) home.hidden = false;
    setActiveNav("home");
    if (scrollToId && scrollToId !== "home") {
      const tgt = document.getElementById(scrollToId);
      if (tgt) { tgt.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function buildSector(route) {
    const cfg = SECTORS[route];
    if (!cfg) return;
    const home = document.getElementById("view-home");
    const sec = document.getElementById("view-sector");
    const prog = document.getElementById("view-progress");
    if (home) home.hidden = true;
    if (prog) prog.hidden = true;
    if (!sec) return;
    sec.hidden = false;
    sec.setAttribute("data-sector", route);

    document.getElementById("sector-kicker").textContent = cfg.kicker;
    document.getElementById("sector-title").textContent = cfg.title;
    document.getElementById("sector-desc").textContent = cfg.desc;
    document.getElementById("sector-meta").textContent = cfg.ids.length + " fiches de révision";

    const grid = document.getElementById("sector-grid");
    if (grid && typeof cardHtml === "function") {
      grid.innerHTML = cfg.ids.map(id => cardHtml(byId(id))).filter(Boolean).join("");
    }
    // refresh "+ Ma Liste" buttons state for the freshly built cards
    if (window.LennyList && window.LennyList.sync) window.LennyList.sync();

    // sector quiz button
    const qbtn = document.getElementById("sector-quiz");
    if (qbtn) {
      qbtn.onclick = () => { if (window.LennyQuiz) window.LennyQuiz.open(); };
    }
    // sector devoir button (épreuve écrite du pôle)
    const dbtn = document.getElementById("sector-devoir");
    if (dbtn) {
      const cat = (window.DEVOIRS && window.DEVOIRS[route]) ? route : null;
      dbtn.style.display = cat ? "" : "none";
      dbtn.onclick = () => { if (window.LennyDevoir && cat) window.LennyDevoir.open(cat); };
    }
    // sector docs button (programme + ressources) — pôle Syndic uniquement
    const docbtn = document.getElementById("sector-docs");
    if (docbtn) {
      const show = (route === "syndic");
      docbtn.style.display = show ? "" : "none";
      docbtn.onclick = () => { if (window.LennyDocs) window.LennyDocs.open("programme"); };
    }
    // sector formules button (formulaire du pôle) — Transaction & Syndic
    const fbtn = document.getElementById("sector-formules");
    if (fbtn) {
      const hasF = !!(window.LENNY_FORMULES && window.LENNY_FORMULES[route]);
      fbtn.style.display = hasF ? "" : "none";
      fbtn.onclick = () => { if (window.LennyFormules && hasF) window.LennyFormules.open(route); };
    }
    setActiveNav(route);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function route() {
    const r = currentRoute();
    if (r === "home") showHome();
    else if (r === "progress") showProgress();
    else buildSector(r);
  }

  function showProgress() {
    const home = document.getElementById("view-home");
    const sec = document.getElementById("view-sector");
    const prog = document.getElementById("view-progress");
    if (home) home.hidden = true;
    if (sec) sec.hidden = true;
    if (!prog) { showHome(); return; }
    prog.hidden = false;
    try { if (window.LennySRS) window.LennySRS.refresh(); } catch (e) {}
    try { if (window.LennyFacade) window.LennyFacade.refresh(); } catch (e) {}
    setActiveNav("progress");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function go(route) {
    if (("#" + route) === location.hash) { window.dispatchEvent(new HashChangeEvent("hashchange")); }
    else location.hash = route;
  }

  function init() {
    // Sector tiles + any [data-route] element
    document.querySelectorAll("[data-route]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        go(el.getAttribute("data-route"));
      });
    });

    // Nav links own routing
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.addEventListener("click", (e) => {
        const href = (a.getAttribute("href") || "");
        if (!href.startsWith("#")) return;
        e.preventDefault();
        const target = href.replace(/^#/, "");
        if (SECTORS[target]) { go(target); return; }
        // home-view anchors (home / laws): ensure home is shown, then scroll
        if (location.hash && SECTORS[currentRoute()]) {
          // currently on a sector page → go home first
          history.replaceState(null, "", location.pathname + location.search);
        }
        showHome(target);
      });
    });

    // Back button on sector page
    const back = document.getElementById("sector-back");
    if (back) back.addEventListener("click", () => {
      history.pushState ? (location.hash = "") : showHome();
      showHome();
    });

    // Back button on progression page
    const pback = document.getElementById("progress-back");
    if (pback) pback.addEventListener("click", () => { location.hash = ""; showHome(); });

    // Quiz général button (nav)
    const qg = document.getElementById("quiz-general-btn");
    if (qg) qg.addEventListener("click", () => { if (window.LennyQuiz) window.LennyQuiz.open(); });

    // Calculatrices button (nav)
    const cb = document.getElementById("calc-btn");
    if (cb) cb.addEventListener("click", () => { if (window.LennyCalc) window.LennyCalc.open(); });

    // Examen blanc E8 button (nav)
    const eb = document.getElementById("exam-btn");
    if (eb) eb.addEventListener("click", () => { if (window.LennyExam) window.LennyExam.open(); });

    // Devoir général button (nav) — épreuve écrite, sujet aléatoire
    const dg = document.getElementById("devoir-general-btn");
    if (dg) dg.addEventListener("click", () => { if (window.LennyDevoir) window.LennyDevoir.open("general"); });

    window.addEventListener("hashchange", route);
    route();
  }

  window.LennyRouter = { go, route };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
