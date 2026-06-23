// ============================================
// LENNY — Explainers animés · Fichier 2 : Droit, Propriété, Ville durable
// Alimente window.EXPLAINERS (lu par lenny-explainer.js).
// ============================================
window.EXPLAINERS = Object.assign(window.EXPLAINERS || {}, {

  /* ============ mdroit — Les Professions de l'Immobilier ============ */
  mdroit: {
    accent: "#5b8cff",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Droit · Les Professions",
        title: "Le cadre Hoguet",
        sub: "Une loi de 1970 protège le public et structure le métier." },
      { type: "timeline", dur: 6400, eyebrow: "La construction du cadre", title: "Les textes fondateurs",
        rows: [
          { y: "1970", t: "Loi Hoguet n° 70-9 (2 janvier) — encadre la profession." },
          { y: "1972", t: "Décret d'application (20 juillet)." },
          { y: "2014", t: "Loi ALUR — la CCI délivre désormais la carte." },
          { y: "2017", t: "Arrêté du 10 janvier — affichage des honoraires." },
          { y: "2021", t: "DPE opposable (1ᵉʳ juillet)." },
        ] },
      { type: "list", dur: 7000, eyebrow: "Les conditions d'exercice", title: "Pour détenir la carte pro",
        items: [
          { k: "Aptitude", v: "Diplôme (BTS PI…) ou expérience (10 ans, 4 ans si cadre)." },
          { k: "Garantie financière", v: "Min. 110 000 € (30 000 € les 2 premières années)." },
          { k: "Assurance RCP", v: "Min. 76 225 €/an — responsabilité civile pro." },
          { k: "Honorabilité", v: "Casier vierge des condamnations interdisant l'exercice." },
        ] },
      { type: "pillars", dur: 6200, eyebrow: "Le Code civil veille", title: "Deux articles clés",
        cols: [
          { tag: "1984", h: "Le mandat", sub: "« Donner à une autre le pouvoir de faire qqch en son nom. »" },
          { tag: "1596", h: "L'interdiction", sub: "Défense d'acheter le bien qu'on est chargé de vendre." },
        ],
        foot: "Les fonds reçus → compte séquestre sous 3 jours francs." },
      { type: "list", dur: 6000, eyebrow: "Affichage & annonces", title: "Les plafonds à connaître",
        items: [
          { k: "Honoraires location", v: "12 / 10 / 8 €/m² selon la tension de la zone." },
          { k: "État des lieux", v: "3 €/m² partout, sans exception." },
          { k: "Annonce de copro", v: "Statut, nombre de lots, charges moyennes annuelles." },
        ] },
      { type: "outro", dur: 4200, title: "Le droit, c'est ta crédibilité.",
        sub: "Connaître Hoguet, c'est inspirer confiance et éviter la faute." },
    ],
  },

  /* ============ mprop — La Propriété Immobilière ============ */
  mprop: {
    accent: "#c8a24a",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Droit · La Propriété",
        title: "Le droit le plus complet",
        sub: "« Jouir et disposer de la manière la plus absolue. » — art. 544." },
      { type: "pillars", dur: 6600, eyebrow: "Les 3 attributs", title: "Que permet la propriété ?",
        cols: [
          { h: "Usus", sub: "Le droit d'utiliser la chose : y habiter, s'en servir." },
          { h: "Fructus", sub: "Le droit d'en percevoir les fruits : la louer, l'exploiter." },
          { h: "Abusus", sub: "Le droit d'en disposer : la vendre, la donner, la détruire." },
        ],
        foot: "Usufruit = usus + fructus. Nue-propriété = abusus seul." },
      { type: "pillars", dur: 6400, eyebrow: "Les 3 caractères", title: "Comment est ce droit ?",
        cols: [
          { h: "Absolu", sub: "Le plus complet — dans les limites des lois." },
          { h: "Exclusif", sub: "Réservé au propriétaire (sauf indivision, copro…)." },
          { h: "Perpétuel", sub: "Ne se perd pas par le simple non-usage." },
        ] },
      { type: "list", dur: 6400, eyebrow: "Les articles à citer", title: "Le Code civil de 1804",
        items: [
          { k: "Art. 544", v: "Définition de la propriété." },
          { k: "Art. 546", v: "Droit d'accession : à ce que la chose produit." },
          { k: "Art. 552", v: "Le sol emporte le dessus et le dessous." },
          { k: "Art. 711-712", v: "Les modes d'acquisition de la propriété." },
        ] },
      { type: "compare", dur: 5600, eyebrow: "L'exception", title: "Perdre la propriété ?",
        rows: [
          { label: "Non-usage seul", val: "rien", note: "le droit est perpétuel", dim: true },
          { label: "Usucapion (par un tiers)", val: "possible", note: "possession prolongée", hot: true },
        ],
        foot: "Seule une possession prolongée par autrui (usucapion) peut faire perdre la propriété." },
      { type: "outro", dur: 4200, title: "La base de tout.",
        sub: "Toute transaction repose sur ces trois attributs." },
    ],
  },

  /* ============ mvert — Valeur Verte & Normes ============ */
  mvert: {
    accent: "#46d369",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Construction · Valeur Verte",
        title: "Construire pour demain",
        sub: "La performance énergétique devient une valeur patrimoniale." },
      { type: "compare", dur: 6000, eyebrow: "Le changement d'ère", title: "RT2012 → RE2020",
        rows: [
          { label: "RT2012 — énergie seule", val: "1 axe", note: "consommation", dim: true },
          { label: "RE2020 — énergie + carbone + été", val: "3 axes", note: "Bbio · DH · carbone", hot: true },
        ],
        foot: "La RE2020 ajoute l'empreinte carbone et le confort d'été." },
      { type: "timeline", dur: 6400, eyebrow: "Une norme qui se durcit", title: "Les paliers RE2020",
        rows: [
          { y: "2012", t: "RT2012 — performance énergétique." },
          { y: "2020", t: "RE2020 — carbone + confort d'été." },
          { y: "2025", t: "Palier carbone : Ic Construction −15 %." },
          { y: "2028", t: "Palier carbone : Ic Construction −25 %." },
          { y: "2050", t: "Objectif ZAN — zéro artificialisation nette." },
        ] },
      { type: "formula", dur: 5600, eyebrow: "Le calcul qui piège", formula: "Énergie primaire = consommée × coefficient",
        legend: [
          "Électricité → coefficient 2,3",
          "Gaz, fioul, bois → coefficient 1",
          "1 kWh d'élec = 2,3 kWh d'énergie primaire",
        ] },
      { type: "list", dur: 6200, eyebrow: "Le vocabulaire des labels", title: "Savoir les distinguer",
        items: [
          { k: "BEPOS", v: "Bâtiment à énergie POSitive : produit plus qu'il ne consomme." },
          { k: "BEPAS", v: "Bâtiment passif : chauffage < 15 kWh/m²/an." },
          { k: "BBC Rénovation", v: "< 80 kWh/m²/an." },
          { k: "ZAN", v: "Zéro artificialisation nette : recycler le foncier (friches…)." },
        ] },
      { type: "outro", dur: 4200, title: "Le vert, c'est de la valeur.",
        sub: "Un bien performant se vend mieux, plus cher, plus vite." },
    ],
  },

  /* ============ murba — Urbanisme & Construction ============ */
  murba: {
    accent: "#ff8a3d",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Construction · Urbanisme",
        title: "Qui décide du droit de bâtir ?",
        sub: "Une hiérarchie de documents, du national au local." },
      { type: "steps", dur: 6800, eyebrow: "La hiérarchie des normes", title: "Du général au particulier",
        steps: [
          { k: "SCoT", t: "Le document pivot et intégrateur, à l'échelle intercommunale." },
          { k: "PLU / carte communale", t: "Les règles locales, compatibles avec le SCoT." },
          { k: "Autorisations", t: "Permis & déclarations, conformes au PLU, instruits par le maire." },
        ],
        foot: "Conformité > compatibilité > prise en compte : du plus strict au plus souple." },
      { type: "list", dur: 6600, eyebrow: "Les autorisations", title: "Délais d'instruction",
        items: [
          { k: "Déclaration préalable", v: "1 mois — petits travaux, clôtures, piscine ≤ 100 m²." },
          { k: "Permis maison individuelle", v: "2 mois." },
          { k: "Permis de construire / d'aménager", v: "3 mois (+1 en secteur protégé)." },
          { k: "Architecte obligatoire", v: "au-delà de 150 m² de surface de plancher." },
        ] },
      { type: "pillars", dur: 6400, eyebrow: "Après les travaux", title: "Les garanties du constructeur",
        cols: [
          { tag: "1 an", h: "Parfait achèvement", sub: "Tous les désordres signalés à la réception." },
          { tag: "2 ans", h: "Bon fonctionnement", sub: "Les équipements dissociables (biennale)." },
          { tag: "10 ans", h: "Décennale (art. 1792)", sub: "Solidité de l'ouvrage. De plein droit." },
        ] },
      { type: "stat", dur: 4600, eyebrow: "Contester une autorisation", pre: "Recours pour excès de pouvoir :",
        value: 2, suffix: " mois", post: "à compter de l'affichage, devant le tribunal administratif." },
      { type: "outro", dur: 4200, title: "Bâtir, c'est respecter des règles.",
        sub: "Du SCoT à la décennale, chaque étape est encadrée." },
    ],
  },

  /* ============ mville — Écoquartier & Ville Durable ============ */
  mville: {
    accent: "#34d399",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Construction · Ville Durable",
        title: "L'écoquartier",
        sub: "Habiter la ville sans épuiser la planète." },
      { type: "pillars", dur: 6800, eyebrow: "Les 3 cercles du développement durable", title: "Et leurs croisements",
        cols: [
          { h: "Environnement", sub: "Préserver les ressources et la biodiversité." },
          { h: "Social", sub: "Mixité, qualité de vie, lien entre habitants." },
          { h: "Économique", sub: "Viabilité et activité locale." },
        ],
        foot: "Au centre des trois : le DURABLE. Deux à deux : vivable, viable, équitable." },
      { type: "list", dur: 6600, eyebrow: "Les ingrédients", title: "Ce qui fait un écoquartier",
        items: [
          { k: "Mobilités douces", v: "Marche, vélo, transports en commun ; voiture en retrait." },
          { k: "Mixité fonctionnelle", v: "Logements, commerces et services réunis." },
          { k: "Gestion de l'eau", v: "Récupération des pluies, sols perméables." },
          { k: "Sobriété énergétique", v: "Conception bioclimatique + énergies renouvelables." },
          { k: "Gouvernance", v: "Co-construction du projet avec les habitants." },
        ] },
      { type: "stat", dur: 4800, eyebrow: "Le label français", pre: "Le label ÉcoQuartier repose sur",
        value: 20, suffix: " engagements", post: "couvrant cadre de vie, développement, environnement et gouvernance." },
      { type: "pillars", dur: 5400, eyebrow: "Des références", title: "Des écoquartiers reconnus",
        cols: [
          { h: "La Confluence", sub: "Lyon — reconversion d'une friche industrielle." },
          { h: "ZAC de Bonne", sub: "Grenoble — pionnière de la ville durable." },
        ] },
      { type: "outro", dur: 4200, title: "La ville de demain se dessine.",
        sub: "Durable ne veut pas dire contraignant : il veut dire désirable." },
    ],
  },

});
