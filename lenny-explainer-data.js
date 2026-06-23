// ============================================
// LENNY — Explainers animés · Fichier 1 : Transaction + Synthèse
// Alimente window.EXPLAINERS (lu par lenny-explainer.js).
// Types de scène : title · stat · compare · curve · formula · steps ·
//                  pillars · list · barcompare · timeline · outro
// ============================================
window.EXPLAINERS = Object.assign(window.EXPLAINERS || {}, {

  /* ============ M1 — Accueil & Découverte ============ */
  m1: {
    accent: "#ff6b4a",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 01 · Accueil & Découverte",
        title: "Tout se joue dès l'accueil",
        sub: "La vente commence avant même le premier mot." },
      { type: "pillars", dur: 6200, eyebrow: "La règle des 4 × 20", title: "Les 4 premières impressions",
        cols: [
          { tag: "20 s", h: "Secondes", sub: "Le premier regard décide : ponctualité, sourire, présence." },
          { tag: "20", h: "Gestes", sub: "Posture, démarche, poignée de main : le non-verbal parle." },
          { tag: "20", h: "Mots", sub: "Une phrase d'accueil claire, positive, sans jargon." },
          { tag: "20 cm", h: "Du visage", sub: "La bonne distance : assez proche, jamais intrusif." },
        ],
        foot: "On n'a jamais une deuxième chance de faire une première impression." },
      { type: "list", dur: 7000, eyebrow: "Décoder le client", title: "SONCAS(E) — les 7 mobiles d'achat",
        items: [
          { k: "Sécurité", v: "Besoin d'être rassuré : garanties, diagnostics, quartier sûr." },
          { k: "Orgueil", v: "Besoin de reconnaissance : standing, adresse prestigieuse." },
          { k: "Nouveauté", v: "Attrait du neuf : programme récent, domotique, jamais habité." },
          { k: "Confort", v: "Bien-être au quotidien : luminosité, calme, praticité." },
          { k: "Argent", v: "Logique d'investissement : rendement, prix au m², plus-value." },
          { k: "Sympathie", v: "La relation prime : confiance, écoute, lien humain." },
          { k: "Écologie", v: "Sensibilité durable : DPE, économies d'énergie, matériaux." },
        ],
        foot: "Repère le mobile dominant → tout ton argumentaire s'aligne dessus." },
      { type: "steps", dur: 6600, eyebrow: "Mener la découverte", title: "Les 5 types de questions",
        steps: [
          { k: "Ouverte", t: "« Comment imaginez-vous votre futur logement ? » → fait parler." },
          { k: "Fermée", t: "« Avez-vous déjà un financement ? » → valide un fait précis." },
          { k: "Approfondissement", t: "« C'est-à-dire ? » → creuse une réponse vague." },
          { k: "Miroir", t: "« Trop cher… ? » → renvoie le mot-clé pour le faire développer." },
          { k: "Inductive", t: "« Donc la sécurité prime ? » → fait valider une hypothèse." },
        ] },
      { type: "list", dur: 5600, eyebrow: "Au téléphone", title: "DIVAS — la voix fait tout",
        items: [
          { k: "Débit", v: "Ni trop vite, ni trop lent : un rythme posé." },
          { k: "Intonation", v: "Varier le ton pour rester vivant et engageant." },
          { k: "Volume", v: "Audible et maîtrisé, jamais agressif." },
          { k: "Articulation", v: "Détacher les mots : la clarté inspire confiance." },
          { k: "Sourire", v: "Il s'entend ! Souris, ta voix devient chaleureuse." },
        ] },
      { type: "outro", dur: 4200, title: "Écouter, c'est déjà vendre.",
        sub: "Le bon agent parle peu et observe beaucoup." },
    ],
  },

  /* ============ M2 — Entreprises & Statuts ============ */
  m2: {
    accent: "#5b8cff",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 02 · Entreprises & Statuts",
        title: "Choisir sa structure",
        sub: "Du statut dépendent responsabilité, fiscalité et image." },
      { type: "pillars", dur: 6400, eyebrow: "Trois grandes familles", title: "EI · SARL · SA / SAS",
        cols: [
          { tag: "EI", h: "Entreprise individuelle", sub: "Responsabilité illimitée, imposée à l'IR. Simple mais exposée." },
          { tag: "SARL", h: "Société à resp. limitée", sub: "Resp. aux apports, pas de capital min., IS (option IR)." },
          { tag: "SA/SAS", h: "Sociétés par actions", sub: "SA : capital min. 37 000 €. SAS : souple, IS par défaut." },
        ],
        foot: "Plus on protège son patrimoine, plus la structure est encadrée." },
      { type: "list", dur: 6200, eyebrow: "La loi Hoguet (1970)", title: "Les 3 cartes professionnelles",
        items: [
          { k: "Carte T — Transactions", v: "Acheter, vendre, louer pour le compte d'autrui." },
          { k: "Carte G — Gestion", v: "Administrer des biens (gestion locative)." },
          { k: "Carte S — Syndic", v: "Gérer une copropriété." },
        ],
        foot: "Carte valable 3 ans, délivrée par la CCI, + formation continue ALUR." },
      { type: "steps", dur: 6000, eyebrow: "L'agent commercial", title: "Ce qu'il peut — et ne peut pas",
        steps: [
          { n: "✓", k: "Prospecter & présenter", t: "Trouver des biens, des clients, faire visiter." },
          { n: "✓", k: "Négocier un mandat", t: "Au nom de l'agence titulaire de la carte." },
          { n: "✕", k: "Encaisser des fonds", t: "Interdit : seul le titulaire manie l'argent." },
          { n: "✕", k: "Rédiger un compromis", t: "Interdit : actes juridiques = titulaire ou notaire." },
        ] },
      { type: "timeline", dur: 5800, eyebrow: "Le cadre légal", title: "Les lois qui structurent le métier",
        rows: [
          { y: "1970", t: "Loi Hoguet — encadre les professions immobilières." },
          { y: "2014", t: "Loi ALUR — formation continue, encadrement des loyers." },
          { y: "2018", t: "Loi ELAN — crée le bail mobilité (1 à 10 mois)." },
        ] },
      { type: "outro", dur: 4200, title: "Le bon statut protège.",
        sub: "Responsabilité, fiscalité, crédibilité : tout en découle." },
    ],
  },

  /* ============ M3 — La Prospection ============ */
  m3: {
    accent: "#ff8a3d",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 03 · La Prospection",
        title: "Sans mandat, pas de métier",
        sub: "La prospection est le moteur de toute l'activité." },
      { type: "list", dur: 6200, eyebrow: "Fixer le cap", title: "Un objectif SMART",
        items: [
          { k: "Spécifique", v: "Précis : « rentrer 4 mandats ce mois », pas « plus de mandats »." },
          { k: "Mesurable", v: "Un chiffre que l'on peut suivre." },
          { k: "Atteignable", v: "Ambitieux mais réaliste pour rester motivé." },
          { k: "Réaliste", v: "Cohérent avec tes moyens et ton marché." },
          { k: "Temporel", v: "Délimité dans le temps : une échéance claire." },
        ] },
      { type: "pillars", dur: 6600, eyebrow: "Les 4 méthodes", title: "Comment prospecter",
        cols: [
          { h: "Statique", sub: "On attend le client", items: ["Vitrine", "Permanence", "Salon"] },
          { h: "Dynamique", sub: "On va au contact", items: ["Porte-à-porte", "Pige", "Phoning"] },
          { h: "Prospective", sub: "On anticipe", items: ["Veille", "Ciblage", "Réseau"] },
          { h: "Digitale", sub: "On rayonne en ligne", items: ["Réseaux sociaux", "Géofarming", "CRM"] },
        ] },
      { type: "barcompare", dur: 6200, eyebrow: "La zone de chalandise", title: "Où concentrer l'effort",
        bars: [
          { label: "Zone primaire", pct: 80, val: "80 %", hot: true },
          { label: "Zone secondaire", pct: 15, val: "15 %" },
          { label: "Zone tertiaire", pct: 5, val: "5 %" },
        ],
        foot: "La zone primaire concentre ≈ 80 % du CA potentiel : c'est là qu'on travaille." },
      { type: "list", dur: 5800, eyebrow: "Repères terrain", title: "Les ordres de grandeur",
        items: [
          { k: "Boîtage", v: "≈ 1 retour pour 1 000 flyers distribués." },
          { k: "Panneau « À vendre »", v: "7 à 15 € l'unité — « le panneau appelle le panneau »." },
          { k: "Îlotage", v: "Sessions de 2 à 3 h max pour rester efficace." },
          { k: "Pige", v: "Repérer et appeler les annonces de particuliers (PAP)." },
        ] },
      { type: "outro", dur: 4200, title: "Prospecter, c'est semer.",
        sub: "La régularité bat l'intensité. Chaque jour, un peu." },
    ],
  },

  /* ============ M4 — Objectifs & Ratios ============ */
  m4: {
    accent: "#f5c518",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 04 · Objectifs & Ratios",
        title: "Piloter par les chiffres",
        sub: "Ce qui se mesure se pilote. Maîtrise tes ratios." },
      { type: "formula", dur: 6000, eyebrow: "Le calcul roi", formula: "Net vendeur = FAI ÷ (1 + t)",
        legend: [
          "FAI — prix Frais d'Agence Inclus",
          "t — taux d'honoraires (ex. 0,06 pour 6 %)",
          "Net vendeur — ce que touche le propriétaire",
        ] },
      { type: "stat", dur: 5200, eyebrow: "Exemple concret", pre: "318 000 € FAI à 6 % d'honoraires →",
        value: 300000, suffix: " €", post: "de net vendeur (soit 18 000 € d'honoraires)." },
      { type: "compare", dur: 6000, eyebrow: "Le ratio clé", title: "Taux de transformation",
        rows: [
          { label: "50 mandats rentrés", val: "50", note: "le travail amont", dim: true },
          { label: "20 ventes signées", val: "40 %", note: "(20 ÷ 50) × 100", hot: true },
        ],
        foot: "Le taux de transformation mesure ton efficacité à convertir un mandat en vente." },
      { type: "list", dur: 6000, eyebrow: "Les repères du métier", title: "Ratios à connaître",
        items: [
          { k: "≈ 15 visites", v: "en moyenne pour conclure une vente." },
          { k: "≈ 3 acquéreurs", v: "travaillés en parallèle par vente." },
          { k: "Prix HT", v: "= TTC ÷ 1,20 (TVA à 20 %)." },
          { k: "Coût d'un mandat", v: "= dépenses de prospection ÷ nb de mandats rentrés." },
        ] },
      { type: "outro", dur: 4200, title: "Connais tes chiffres.",
        sub: "Un agent qui pilote ses ratios ne subit jamais son mois." },
    ],
  },

  /* ============ M5 — Diagnostics ============ */
  m5: {
    accent: "#46d369",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 05 · Diagnostics",
        title: "Le DDT, pièce maîtresse",
        sub: "Le Dossier de Diagnostics Techniques protège acheteur et vendeur." },
      { type: "compare", dur: 5600, eyebrow: "Toujours obligatoires", title: "Les deux universels",
        rows: [
          { label: "DPE — performance énergétique", val: "10 ans", note: "opposable depuis 2021", hot: true },
          { label: "ERP — risques & pollutions", val: "6 mois", note: "validité courte !", hot: true },
        ],
        foot: "DPE + ERP : exigés pour TOUT bien, vente comme location, sans condition." },
      { type: "list", dur: 7000, eyebrow: "Les diagnostics conditionnels", title: "Selon l'âge et la nature du bien",
        items: [
          { k: "Plomb (CREP)", v: "Logements construits avant 1949." },
          { k: "Amiante", v: "Permis de construire avant le 1ᵉʳ juillet 1997." },
          { k: "Gaz & Électricité", v: "Installations de plus de 15 ans." },
          { k: "Termites", v: "Dans les zones déclarées par arrêté préfectoral." },
        ] },
      { type: "timeline", dur: 6200, eyebrow: "Les dates seuils", title: "À mémoriser absolument",
        rows: [
          { y: "1949", t: "Avant → diagnostic plomb (CREP) obligatoire." },
          { y: "1997", t: "Permis avant le 1ᵉʳ juillet → amiante obligatoire." },
          { y: "15 ans", t: "Installation gaz/élec → diagnostic obligatoire." },
          { y: "2021", t: "DPE devenu opposable (1ᵉʳ juillet)." },
        ] },
      { type: "stat", dur: 4600, eyebrow: "Le piège classique", pre: "Validité de l'ERP :",
        value: 6, suffix: " mois", post: "le plus court de tous — à refaire si le dossier traîne." },
      { type: "outro", dur: 4200, title: "Un dossier complet rassure.",
        sub: "Pas de diagnostic = pas de transaction sécurisée." },
    ],
  },

  /* ============ M6 — Estimation ============ */
  m6: {
    accent: "#9b6cff",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 06 · Estimation",
        title: "Le juste prix",
        sub: "Trop haut, le bien dort. Trop bas, le vendeur fuit." },
      { type: "list", dur: 7000, eyebrow: "6 méthodes", title: "La boîte à outils de l'estimateur",
        items: [
          { k: "Comparaison", v: "Prix moyen au m² × surface. LA référence (fisc, juges)." },
          { k: "Capitalisation", v: "Loyer annuel ÷ taux. Pour l'investisseur locatif." },
          { k: "Sol + construction", v: "Valeur du terrain + coût du bâti." },
          { k: "Indiciaire", v: "Prix d'achat réactualisé par un indice." },
          { k: "Par les coûts", v: "Coût de reconstruction à neuf − vétusté." },
          { k: "Compte à rebours", v: "Du prix de sortie au prix du terrain (promoteurs)." },
        ] },
      { type: "formula", dur: 5800, eyebrow: "Méthode investisseur", formula: "Valeur = Loyer annuel ÷ taux",
        legend: [
          "12 000 € de loyer ÷ 4 % (0,04)",
          "= 300 000 € de valeur du bien",
          "Plus le taux exigé est haut, plus la valeur baisse",
        ] },
      { type: "compare", dur: 6000, eyebrow: "Les pondérations", title: "Ce qui fait varier le prix",
        rows: [
          { label: "Ascenseur", val: "+1 à 2 %", note: "surtout en étage élevé", hot: true },
          { label: "Rez-de-chaussée", val: "−30 %", note: "vis-à-vis, bruit, sécurité", dim: true },
        ],
        foot: "L'estimation part du marché, puis s'ajuste aux atouts et défauts du bien." },
      { type: "outro", dur: 4200, title: "Estimer, c'est argumenter.",
        sub: "Un prix juste se défend avec des chiffres, pas avec un ressenti." },
    ],
  },

  /* ============ M6b — Viager & Démembrement ============ */
  m6b: {
    accent: "#2dd4bf",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 06b · Viager & Démembrement",
        title: "Vendre… en gardant les clés",
        sub: "Le viager : un pari sur le temps, encadré par le droit." },
      { type: "compare", dur: 6000, eyebrow: "Les deux rôles", title: "Qui est qui ?",
        rows: [
          { label: "Crédirentier — le VENDEUR", val: "reçoit", note: "le bouquet + la rente à vie", hot: true },
          { label: "Débirentier — l'ACHETEUR", val: "paie", note: "le bouquet puis la rente", dim: true },
        ],
        foot: "Astuce : crédi-RENTIER reçoit la rente ; débi-RENTIER en est débiteur." },
      { type: "stat", dur: 5000, eyebrow: "Le versement initial", pre: "Le bouquet représente environ",
        value: 25, suffix: " %", post: "de la valeur, payé comptant le jour de la vente. Le reste = rente." },
      { type: "pillars", dur: 6600, eyebrow: "Le démembrement", title: "Découper la propriété",
        cols: [
          { h: "Usufruit", sub: "Usus + Fructus : occuper le bien ET en percevoir les loyers." },
          { h: "Nue-propriété", sub: "Abusus : le droit de disposer (vendre), sans usage ni revenus." },
          { h: "Pleine propriété", sub: "Usufruit + Nue-propriété réunis sur une même tête." },
        ],
        foot: "Gros travaux → nu-propriétaire ; entretien courant → usufruitier." },
      { type: "stat", dur: 4600, eyebrow: "En pratique", pre: "Le viager occupé représente",
        value: 95, suffix: " %", post: "des cas : le vendeur conserve l'usage du logement (DUH)." },
      { type: "outro", dur: 4200, title: "Le temps, encore lui.",
        sub: "Plus le crédirentier vit, plus il y gagne. Le viager est un pari." },
    ],
  },

  /* ============ M8 — Mandats & Dossier ============ */
  m8: {
    accent: "#e8617a",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Module 08 · Mandats & Dossier",
        title: "Pas de mandat, pas d'honoraires",
        sub: "Le mandat écrit est la condition même de ta rémunération." },
      { type: "stat", dur: 5000, eyebrow: "La loi Hoguet l'exige", pre: "Le mandat compte",
        value: 9, suffix: " mentions", post: "obligatoires. Une seule manque → nullité → zéro honoraire." },
      { type: "pillars", dur: 6600, eyebrow: "3 types de mandat", title: "Du plus souple au plus fort",
        cols: [
          { h: "Simple", sub: "Confié à plusieurs agences + au vendeur lui-même." },
          { h: "Semi-exclusif", sub: "Une seule agence, mais le vendeur peut vendre seul." },
          { h: "Exclusif", sub: "Une seule agence. Irrévocable 3 mois, préavis 15 j." },
        ],
        foot: "Plus le mandat est exclusif, plus l'agent s'investit." },
      { type: "steps", dur: 6400, eyebrow: "Sécuriser le mandat", title: "Les règles d'or",
        steps: [
          { k: "Tout par écrit", t: "Un accord verbal ne donne droit à aucune commission." },
          { k: "Registre chronologique", t: "Numéroté, sans blanc ni rature. T et G = 2 registres." },
          { k: "Rétractation (loi Hamon)", t: "14 jours si signé hors établissement." },
          { k: "Dossier copropriété", t: "PV des 3 dernières AG, charges, règlement, carnet." },
        ] },
      { type: "timeline", dur: 5400, eyebrow: "Les repères de durée", title: "Les délais à retenir",
        rows: [
          { y: "3 mois", t: "Irrévocabilité du mandat exclusif." },
          { y: "15 j", t: "Préavis de résiliation après les 3 mois." },
          { y: "14 j", t: "Rétractation loi Hamon (hors établissement)." },
        ] },
      { type: "outro", dur: 4200, title: "Le mandat, c'est ton contrat.",
        sub: "Rigueur sur la forme = sécurité sur les honoraires." },
    ],
  },

  /* ============ M11 — Financement (intérêts composés) ============ */
  m11: {
    accent: "#46d369",
    scenes: [
      { type: "title", dur: 3800, eyebrow: "Module 11 · Financement",
        title: "Les intérêts composés",
        sub: "« La plus grande force de l'univers. »",
        cite: "— attribué à Albert Einstein" },
      { type: "stat", dur: 3800, eyebrow: "Le point de départ", pre: "Tu places",
        value: 10000, suffix: " €", post: "sur un placement à 5 % par an." },
      { type: "compare", dur: 5200, eyebrow: "Année 1",
        rows: [
          { label: "Intérêts simples", val: "10 500 €", note: "+ 500 €", dim: true },
          { label: "Intérêts composés", val: "10 500 €", note: "+ 500 €", hot: true },
        ],
        foot: "La première année, aucune différence." },
      { type: "compare", dur: 5600, eyebrow: "Année 2 — la bascule",
        rows: [
          { label: "Intérêts simples", val: "11 000 €", note: "5 % de 10 000", dim: true },
          { label: "Intérêts composés", val: "11 025 €", note: "5 % de 10 500", hot: true },
        ],
        foot: "Le composé calcule l'intérêt… sur les intérêts. +25 €, et ça ne fait que commencer." },
      { type: "curve", dur: 6400, eyebrow: "Sur 20 ans", title: "L'écart explose",
        legend: [
          { c: "rgba(255,255,255,.45)", t: "Simple — progression linéaire" },
          { c: "#46d369", t: "Composé — progression exponentielle" },
        ] },
      { type: "formula", dur: 5200, eyebrow: "À retenir", formula: "Cₙ = C₀ × (1 + t)ⁿ",
        legend: ["C₀ — capital de départ", "t — taux par période", "n — nombre de périodes"] },
      { type: "stat", dur: 4600, eyebrow: "La limite réglementaire (HCSF)", pre: "Endettement maximum",
        value: 35, suffix: " %", post: "des revenus nets du ménage, assurance comprise." },
      { type: "outro", dur: 4400, title: "Le temps est ton meilleur allié.",
        sub: "Plus tu commences tôt, plus la courbe travaille pour toi." },
    ],
  },

  /* ============ SYN — Synthèse & Règles d'or ============ */
  syn: {
    accent: "#f5c518",
    scenes: [
      { type: "title", dur: 3600, eyebrow: "Synthèse · Les règles d'or",
        title: "L'essentiel en une fois",
        sub: "Les réflexes qui sauvent le jour de l'examen." },
      { type: "list", dur: 7000, eyebrow: "À ne jamais oublier", title: "Les 6 règles d'or",
        items: [
          { k: "Pas de mandat écrit", v: "= zéro honoraire, même si la vente se conclut." },
          { k: "DPE + ERP", v: "toujours obligatoires, pour tout bien." },
          { k: "Mandat exclusif", v: "irrévocable 3 mois, puis préavis de 15 jours." },
          { k: "Comparaison", v: "méthode d'estimation de référence (fisc, juges)." },
          { k: "Endettement 35 %", v: "le plafond HCSF du crédit immobilier." },
          { k: "Registre des mandats", v: "chronologique, sans blanc ni rature." },
        ] },
      { type: "pillars", dur: 6000, eyebrow: "Les automatismes", title: "Calculs express",
        cols: [
          { h: "Net vendeur", sub: "FAI ÷ (1 + taux d'honoraires)." },
          { h: "Prix HT", sub: "TTC ÷ 1,20 (TVA 20 %)." },
          { h: "Transformation", sub: "(ventes ÷ mandats) × 100." },
        ] },
      { type: "barcompare", dur: 5600, eyebrow: "Le réflexe prospection", title: "Où est le chiffre d'affaires",
        bars: [
          { label: "Zone primaire", pct: 80, val: "80 %", hot: true },
          { label: "Zone secondaire", pct: 15, val: "15 %" },
          { label: "Zone tertiaire", pct: 5, val: "5 %" },
        ] },
      { type: "outro", dur: 4400, title: "Tu connais le terrain.",
        sub: "Révise les règles d'or la veille : elles font la différence." },
    ],
  },

});
