/* ============================================
   LENNY — Documents de référence (overlay)
   Deux ressources, en onglets :
     • Programme ACHS — syllabus 1ʳᵉ & 2ᵉ années (18 chapitres)
     • Oral E8 — consignes du BTS blanc (dossier, annexes, déroulé)
   API : window.LennyDocs.open('programme' | 'e8')
   ============================================ */
(function () {

  /* ---------- Données : Programme ACHS ---------- */
  const PROGRAMME = {
    title: "Administration des copropriétés & habitat social",
    sub: "BTS Professions Immobilières — Référentiel 2026 · 280 h indicatives",
    intro: "Plan détaillé du module sur les deux années : gestion juridique, technique, financière, sociale et management du personnel d'immeuble.",
    years: [
      {
        label: "1ʳᵉ année",
        title: "Fondamentaux de la copropriété, habitat social & gestion du personnel",
        chapters: [
          { n: "1", t: "Introduction générale : la copropriété et l'habitat social", pts: ["Définitions et typologies (copropriété verticale/horizontale, mixte, logement social HLM/SEM/OPH)", "Les acteurs clés : syndicat, syndic, conseil syndical, locataires, bailleurs sociaux", "Évolution législative : ALUR (2014), ELAN (2018), Climat & Résilience (2021)", "Enjeux éthiques : déontologie, mixité sociale, transition énergétique"] },
          { n: "2", t: "Statut juridique de la copropriété (loi de 1965 & décret 67-223)", pts: ["Le règlement de copropriété : contenu, état descriptif de division, modificatifs", "Les tantièmes : répartition des charges et des voix, calcul, révision", "Parties communes et privatives : critères, usage, transformations interdites", "Carnet d'information du logement (CIL) et diagnostic technique global (DTG)"] },
          { n: "3", t: "Organisation et fonctionnement du syndicat", pts: ["Le syndic : missions administratives, comptables, techniques ; bénévole / professionnel", "Le conseil syndical : composition, attributions, contrôle de gestion", "Le contrat de syndic : clauses obligatoires, durée, mise en concurrence", "Sous-traitance et gestion déléguée"] },
          { n: "4", t: "Gestion du personnel d'immeuble (1ʳᵉ année)", pts: ["Statuts et typologies (concierge logé/non logé, gardien, agent d'entretien)", "Cadre juridique : contrat (CDI/CDD), convention collective IDCC 1527", "Rôle du syndic et du conseil syndical dans l'embauche et la rupture", "Gestion administrative : paie, DPAE, visites médicales, URSSAF", "Organisation du travail, congés, logement de fonction", "Budget : charges de personnel et répartition par lots"] },
          { n: "5", t: "Gestion courante et administration des charges", pts: ["Nature des charges : générales, spéciales, individuelles ; récupérables ou non", "Le budget prévisionnel : élaboration, vote en AG, provisions", "Appels de fonds, régularisation annuelle, fonds de travaux (ALUR)", "Recouvrement des impayés : amiable, commandement de payer, judiciaire", "Comptabilité simplifiée du syndic : comptes séparés, plan comptable"] },
          { n: "6", t: "L'assemblée générale des copropriétaires", pts: ["Convocation : formalités, délais, ordre du jour, pouvoirs", "Majorités requises : art. 24, 25, 26, 26-1 de la loi de 1965", "Déroulement : feuille de présence, bureau, vote, contestation", "Rédaction du procès-verbal (PV) et notification", "Voies de recours : nullité des décisions, contestation"] },
          { n: "7", t: "Introduction à l'habitat social et aux organismes HLM", pts: ["Principes : logement social, mixité, droit au logement opposable (DALO)", "Les acteurs : OPH, SEM, ESH, Action Logement", "Financement : PLAI, PLUS, PLS, livret A, Caisse des dépôts", "Conventionnement et APL : conditions de ressources", "La vente HLM aux occupants"] },
          { n: "8", t: "Travaux et entretien : obligations légales et techniques", pts: ["Entretien courant et grosses réparations : responsabilités", "Fonds de travaux obligatoire (ALUR)", "Mise en concurrence : appel d'offres, devis, contrats", "Travaux d'économie d'énergie (CEE, MaPrimeRénov')", "Assurances de la copropriété"] },
          { n: "9", t: "Prévention des conflits et médiation en copropriété", pts: ["Sources de conflits : voisinage, impayés, travaux, personnel", "La médiation obligatoire avant action judiciaire (ELAN)", "Le rôle du syndic dans la conciliation", "Contentieux fréquents : annulation d'AG, responsabilité du syndic"] },
        ],
      },
      {
        label: "2ᵉ année",
        title: "Administration approfondie, stratégies, personnel et habitat social opérationnel",
        chapters: [
          { n: "10", t: "Gestion technique et patrimoniale avancée", pts: ["Le plan pluriannuel de travaux (PPT) : diagnostic, programmation, financement", "La copropriété dégradée : OPAH-RU, ORCOD, plan de sauvegarde", "Audit énergétique obligatoire (loi Climat)", "Gestion des sinistres : déclaration, expertises, coordination assurances"] },
          { n: "11", t: "Comptabilité approfondie et fiscalité de la copropriété", pts: ["Plan comptable spécifique : trésorerie, provisions, fonds de roulement", "Les comptes annuels : bilan, compte de résultat, présentation en AG", "Fiscalité : TVA travaux, impôts commerciaux, taxe foncière des communs", "Contrôle de gestion : taux d'impayés, coûts au m²", "Outils numériques de gestion"] },
          { n: "12", t: "Management et aspects sociaux du personnel (approfondissement)", pts: ["Recrutement, fiches de poste, entretiens", "Paie et déclarations sociales : bulletin détaillé, charges patronales, DSN", "Relations individuelles et collectives, droit disciplinaire", "Rupture du contrat : licenciement, indemnités, retraite", "Gardiens logés : avantages en nature ; régie directe ou externalisation", "Gestion des conflits avec le personnel : médiation, prud'hommes", "Externalisation des services vs personnel interne : coûts/avantages"] },
          { n: "13", t: "Gestion locative dans le parc social et conventionnement", pts: ["Le bail social : bail glissant, mobilité, convention APL", "Attributions : cotation DCE, commissions d'attribution, réservation", "Enquête de ressources, révision de loyer, surloyer", "Impayés de loyer en HLM : plan d'apurement, FSL, prévention des expulsions", "Le DALO et les responsabilités du bailleur social"] },
          { n: "14", t: "Rénovation urbaine, mixité sociale et dispositifs contractuels", pts: ["Les programmes ANRU : conventions, démolition/reconstruction", "La vente HLM en bloc et en unité ; droit de préemption des locataires", "Le contrat de mixité sociale et clauses de cession", "Gestion des copropriétés dégradées : OPAH, expérimentations"] },
          { n: "15", t: "Contentieux et responsabilités", pts: ["Responsabilité civile du syndic : fautes de gestion", "Contentieux locatif social : congé, troubles de voisinage, recours DALO", "Action subrogatoire du syndicat (garantie décennale)", "Procédures collectives : mise sous tutelle, liquidation", "Médiation et arbitrage (MARD)"] },
          { n: "16", t: "Transition énergétique et performance environnementale", pts: ["DPE collectif et plan de rénovation", "Décret tertiaire, interdiction de location des passoires thermiques", "Subventions : MaPrimeRénov' Copropriété, éco-PTZ collectif, CEE", "Optimisation énergétique des parties communes (LED, smart building)", "Rôle du syndic dans l'accompagnement aux aides"] },
          { n: "17", t: "Innovation numérique et nouvelles pratiques", pts: ["La copropriété connectée : AG en visioconférence", "Le contrat de syndic numérique : dématérialisation, archivage des PV", "Bases de données : SIRIUS (ANAH), fichier des copropriétés", "Outils de simulation budgétaire", "Cybersécurité et RGPD pour les administrateurs de biens"] },
          { n: "18", t: "Management de projet, éthique et préparation professionnelle", pts: ["Conduite de projets complexes : rénovation, fusion de copropriétés", "Soft skills : négociation, communication de crise, gestion d'équipe", "Déontologie et prévention des conflits d'intérêts", "Préparation aux épreuves : études de cas, oral, mise en situation", "Veille juridique et réglementaire"] },
        ],
      },
    ],
  };

  /* ---------- Données : Oral E8 ---------- */
  const E8 = {
    title: "Préparer l'oral E8",
    sub: "BTS Blanc 1ʳᵉ année — Oral (juin 2026)",
    intro: "L'oral blanc s'appuie sur l'Épreuve A et la partie 1 de l'Épreuve B. Le travail doit être complet, conforme au référentiel et professionnel.",
    blocks: [
      { h: "1 · Dossier à préparer (obligatoire)", items: [
        "Annexe 18 — Attestation de stage / certificat de travail (période, durée en semaines). Changement d'entreprise : tout remplir + signature du tuteur + certificat obligatoire. Même entreprise : ne pas remplir la fin ni le nombre de semaines. Ne pas oublier la description des activités + compétences du référentiel.",
        "Annexe 23 — Fiche récapitulative : tout compléter sauf le thème / la problématique de l'étude réflexive.",
        "Annexe 24 — Attestation de non-plagiat à compléter et signer. Tout plagiat = fraude à l'examen.",
        "Les 4 fiches d'activités (Annexe 19) — 1 par axe : territoire, entreprise, relation client (avec digital), projet professionnel. Format : 2 pages max, recto-verso obligatoire (dossier papier).",
      ]},
      { h: "Contenu de chaque fiche d'activité", items: [
        "Basée sur une expérience réelle.",
        "Doit contenir : problématique, méthodologie, difficultés, résultats et compétences.",
      ]},
      { h: "Annexes et supports", items: [
        "Pour chaque fiche : annexes + 1 PowerPoint.",
        "+ 1 présentation globale des 4 fiches.",
        "À intégrer obligatoirement : bibliographie, liens et sources, glossaire, table des sigles.",
      ]},
      { h: "2 · Déroulement de l'oral", items: [
        "Épreuve A : 5 min de présentation + 5 min de questions.",
        "Épreuve B (partie 1) : 5 min de présentation + 5 min de questions.",
      ]},
      { h: "3 · Ce qui est évalué", items: [
        "Présentation d'une expérience réelle, analyse, compétences professionnelles et posture.",
      ]},
      { h: "4 · Le jour de l'oral", items: [
        "Dossier papier complet obligatoire.",
        "Pièce d'identité valide (CNI ou passeport) — sans pièce, impossibilité de passer l'épreuve.",
      ]},
      { h: "5 · Points de vigilance", items: [
        "Dossier personnel et authentique.",
        "Toutes les annexes : complètes, cohérentes, avec un titre et/ou une explication claire.",
      ]},
      { h: "6 · Conseil final", items: [
        "Objectif : montrer votre capacité à expliquer, analyser et prendre du recul, avec une posture professionnelle.",
      ]},
    ],
  };

  function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

  function ensureEl() {
    let el = document.getElementById("lenny-docs");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-docs";
    el.innerHTML = '<div class="dc-backdrop" data-dc-close></div><div class="dc-shell" id="dc-shell" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(el);
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-dc-close]")) close();
      const tab = e.target.closest("[data-dc-tab]");
      if (tab) render(tab.getAttribute("data-dc-tab"));
      if (e.target.closest("[data-dc-print]")) window.print();
      const head = e.target.closest("[data-drawer]");
      if (head) {
        const drawer = head.parentElement;
        drawer.classList.toggle("open");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.classList.contains("open")) close();
    });
    return el;
  }

  function programmeHtml() {
    const P = PROGRAMME;
    let years = P.years.map((y, yi) => {
      const chaps = y.chapters.map((c, ci) => {
        const openClass = (yi === 0 && ci === 0) ? " open" : "";
        return (
          '<div class="dc-drawer' + openClass + '">' +
            '<button class="dc-drawer-head" data-drawer type="button">' +
              '<span class="dc-chap-n">' + esc(c.n) + '</span>' +
              '<span class="dc-drawer-title">' + esc(c.t) + '</span>' +
              '<span class="dc-drawer-caret" aria-hidden="true">▾</span>' +
            '</button>' +
            '<div class="dc-drawer-body">' +
              '<ul class="dc-chap-pts">' + c.pts.map(p => '<li>' + esc(p) + '</li>').join("") + '</ul>' +
            '</div>' +
          '</div>'
        );
      }).join("");
      return (
        '<section class="dc-year">' +
          '<div class="dc-year-head"><span class="dc-year-label">' + esc(y.label) + '</span><h3 class="dc-year-title">' + esc(y.title) + '</h3></div>' +
          chaps +
        '</section>'
      );
    }).join("");
    return '<p class="dc-intro">' + esc(P.intro) + '</p>' + years;
  }

  function e8Html() {
    const E = E8;
    const blocks = E.blocks.map((b, i) =>
      '<div class="dc-drawer' + (i === 0 ? " open" : "") + '">' +
        '<button class="dc-drawer-head" data-drawer type="button">' +
          '<span class="dc-drawer-title">' + esc(b.h) + '</span>' +
          '<span class="dc-drawer-caret" aria-hidden="true">▾</span>' +
        '</button>' +
        '<div class="dc-drawer-body">' +
          '<ul class="dc-block-list">' + b.items.map(i => '<li>' + esc(i) + '</li>').join("") + '</ul>' +
        '</div>' +
      '</div>'
    ).join("");
    return '<p class="dc-intro">' + esc(E.intro) + '</p>' + blocks;
  }

  function render(which) {
    const el = ensureEl();
    which = (which === "e8") ? "e8" : "programme";
    const meta = which === "e8"
      ? { title: E8.title, sub: E8.sub, accent: "#7a6cc4" }
      : { title: PROGRAMME.title, sub: PROGRAMME.sub, accent: "#3f6b4a" };
    el.querySelector("#dc-shell").innerHTML =
      '<button class="dc-close" data-dc-close aria-label="Fermer">✕</button>' +
      '<div class="dc-paper" style="--dc-accent:' + meta.accent + '">' +
        '<header class="dc-head">' +
          '<span class="dc-eyebrow">LENNY · Ressources</span>' +
          '<h2 class="dc-title">' + esc(meta.title) + '</h2>' +
          '<div class="dc-sub">' + esc(meta.sub) + '</div>' +
          '<div class="dc-tabs">' +
            '<button class="dc-tab' + (which==="programme"?" on":"") + '" data-dc-tab="programme" type="button">Programme ACHS</button>' +
            '<button class="dc-tab' + (which==="e8"?" on":"") + '" data-dc-tab="e8" type="button">Oral E8</button>' +
          '</div>' +
        '</header>' +
        '<div class="dc-content">' + (which === "e8" ? e8Html() : programmeHtml()) + '</div>' +
        '<footer class="dc-foot"><button class="dc-btn" data-dc-print type="button">Imprimer</button></footer>' +
      '</div>';
    el.querySelector("#dc-shell").scrollTop = 0;
  }

  function open(which) {
    const el = ensureEl();
    render(which);
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    const el = document.getElementById("lenny-docs");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  window.LennyDocs = { open, close };
})();
