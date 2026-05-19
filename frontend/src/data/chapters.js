// Editorial content for the 4 chapters — Maths Financières BTS
// Each chapter is a "spread" with rich enriched content.

export const CHAPTERS = [
  {
    id: "ch1",
    number: "01",
    accent: "#0055FF",
    accentName: "ELECTRIC BLUE",
    kicker: "Dossier № 01 — Croissance linéaire",
    title: "Intérêts\nSimples",
    deck: "L'argent qui dort dans une fontaine. Un débit régulier, prévisible, sans surprise — la mécanique la plus honnête de la finance.",
    metaphor: "La Fontaine",
    metaphorText: "Imagine une fontaine au débit constant : chaque seconde, la même quantité d'eau coule. Le bassin se remplit, mais le débit, lui, ne change jamais. Les intérêts simples fonctionnent exactement comme ça — toujours calculés sur la mise de départ, jamais sur ce qui s'accumule.",
    formula: { latex: "I = C × t × n", parts: [
      { sym: "I", label: "Intérêts perçus", unit: "€" },
      { sym: "C", label: "Capital initial", unit: "€" },
      { sym: "t", label: "Taux d'intérêt", unit: "décimal" },
      { sym: "n", label: "Durée", unit: "années" },
    ]},
    body: [
      "L'intérêt simple est le langage premier de la finance. Tu prêtes, tu reçois. Tu empruntes, tu rends. Ni plus, ni moins. La formule est si élémentaire qu'on l'apprend en cinquième, et pourtant elle gouverne encore le marché obligataire court terme, les prêts entre particuliers, et la plupart des comptes à terme bancaires en France.",
      "Le piège, c'est sa lenteur. Sur dix ans, un placement à intérêts simples paraît presque immobile face à son cousin composé. Mais cette honnêteté brute le rend irremplaçable pour comprendre tout le reste."
    ],
    pullQuote: "Toujours calculé sur le capital de départ — jamais sur les intérêts déjà gagnés.",
    example: {
      title: "Cas d'école",
      steps: [
        { label: "Énoncé", value: "Tu places 5 000 € à un taux annuel de 4 % pendant 3 ans." },
        { label: "Calcul", value: "I = 5 000 × 0,04 × 3" },
        { label: "Résultat", value: "I = 600 €" },
        { label: "Capital final", value: "Cₙ = 5 000 + 600 = 5 600 €" },
      ]
    },
    keyPoint: "En immobilier, le crédit-relais à court terme (moins de 24 mois) fonctionne souvent à intérêts simples. C'est aussi la base du calcul des découverts bancaires.",
    quiz: [
      { q: "Sur quoi sont calculés les intérêts simples chaque année ?", choices: ["Sur le capital initial uniquement", "Sur le capital + intérêts cumulés", "Sur la moyenne annuelle"], answer: 0 },
      { q: "Capital 2 000 €, taux 3 %, durée 4 ans. Quel est l'intérêt ?", choices: ["240 €", "300 €", "120 €"], answer: 0 },
      { q: "La croissance avec intérêts simples est…", choices: ["Exponentielle", "Linéaire", "Logarithmique"], answer: 1 },
    ],
    flashcards: [
      { front: "Formule des intérêts simples", back: "I = C × t × n" },
      { front: "Capital final ?", back: "Cₙ = C + I = C(1 + t·n)" },
      { front: "Croissance de type…", back: "Linéaire — une droite parfaite" },
      { front: "Sur quoi calcule-t-on les intérêts ?", back: "Sur le capital initial, toujours" },
    ],
    graphMode: "linear",
  },
  {
    id: "ch2",
    number: "02",
    accent: "#FF4400",
    accentName: "NEON ORANGE",
    kicker: "Dossier № 02 — La huitième merveille",
    title: "Intérêts\nComposés",
    deck: "Einstein l'aurait appelée « la huitième merveille du monde ». L'intérêt qui produit lui-même de l'intérêt — la boule de neige qui devient avalanche.",
    metaphor: "La Boule de Neige",
    metaphorText: "Pousse une boule de neige du haut d'une pente. Au début, à peine perceptible. Puis elle ramasse de la neige fraîche à chaque tour, et chaque centimètre gagné devient à son tour collecteur. La courbe ne monte pas — elle décolle.",
    formula: { latex: "Cₙ = C × (1 + t)ⁿ", parts: [
      { sym: "Cₙ", label: "Capital final", unit: "€" },
      { sym: "C", label: "Capital initial", unit: "€" },
      { sym: "t", label: "Taux par période", unit: "décimal" },
      { sym: "n", label: "Nombre de périodes", unit: "—" },
    ]},
    body: [
      "L'intérêt composé est l'arme silencieuse de la finance longue. Chaque période, les intérêts gagnés rejoignent le capital — et produisent à leur tour des intérêts. C'est une réaction en chaîne qui rend la patience profondément rentable.",
      "Sur trente ans, à 5 % par an, 10 000 € deviennent 43 219 €. À intérêts simples, on plafonnerait à 25 000 €. Le temps n'est pas un facteur — c'est l'oxygène de l'opération."
    ],
    pullQuote: "Le temps n'est pas un facteur — c'est l'oxygène de l'opération.",
    example: {
      title: "Cas d'école",
      steps: [
        { label: "Énoncé", value: "Tu places 5 000 € à 4 % par an, capitalisé annuellement, pendant 3 ans." },
        { label: "Calcul", value: "C₃ = 5 000 × (1,04)³" },
        { label: "Détail", value: "5 000 × 1,124864" },
        { label: "Résultat", value: "C₃ ≈ 5 624,32 €" },
      ]
    },
    keyPoint: "Pour un investissement immobilier locatif, les loyers réinvestis dans le même bien (travaux, remboursement anticipé) génèrent un effet composé sur la valeur nette.",
    quiz: [
      { q: "À intérêts composés, sur quoi les intérêts sont-ils calculés ?", choices: ["Sur le capital initial seulement", "Sur le capital augmenté des intérêts cumulés", "Sur la moyenne pondérée"], answer: 1 },
      { q: "Capital 10 000 €, taux 5 %, durée 2 ans. Le capital final est…", choices: ["11 000 €", "11 025 €", "10 500 €"], answer: 1 },
      { q: "La courbe des intérêts composés est…", choices: ["Linéaire", "Parabolique inverse", "Exponentielle"], answer: 2 },
    ],
    flashcards: [
      { front: "Formule des intérêts composés", back: "Cₙ = C × (1 + t)ⁿ" },
      { front: "Intérêts gagnés ?", back: "I = Cₙ − C" },
      { front: "Croissance de type…", back: "Exponentielle — la courbe décolle" },
      { front: "L'ingrédient secret ?", back: "Le temps. Toujours le temps." },
    ],
    graphMode: "exponential",
  },
  {
    id: "ch3",
    number: "03",
    accent: "#FF00AA",
    accentName: "BRIGHT PINK",
    kicker: "Dossier № 03 — Le partage naïf",
    title: "Taux\nProportionnel",
    deck: "On coupe la pizza en parts égales. Diviser un taux annuel par 12 pour obtenir le mensuel — simple, intuitif, et… mathématiquement faux à long terme.",
    metaphor: "Couper la Pizza",
    metaphorText: "Tu as une pizza marquée « 12 % » au-dessus. Tu veux la part mensuelle ? Tu coupes en douze. Chaque part fait 1 %. C'est exact en apparence, et c'est la convention bancaire pour les intérêts simples. Mais attention : à intérêts composés, douze parts de 1 % ne reconstituent plus tout à fait la pizza entière.",
    formula: { latex: "tₚ = t / m", parts: [
      { sym: "tₚ", label: "Taux proportionnel", unit: "—" },
      { sym: "t", label: "Taux annuel", unit: "—" },
      { sym: "m", label: "Nombre de périodes / an", unit: "—" },
    ]},
    body: [
      "Le taux proportionnel est la conversion par défaut dans la banque française. Il sert au calcul des intérêts simples sur fractions d'année, et reste la base de tous les TEG affichés en agence. Sa logique est arithmétique : douze mois, douze parts.",
      "Mais dès qu'on capitalise — qu'on compose — cette proportionnalité fuit. Un taux mensuel proportionnel à 1 % donne sur l'année 12,68 %, pas 12 %. C'est précisément cette fuite qui justifie l'existence du chapitre suivant."
    ],
    pullQuote: "Douze parts d'un pour cent ne valent jamais douze pour cent — pas tout à fait.",
    example: {
      title: "Cas d'école",
      steps: [
        { label: "Énoncé", value: "Taux annuel 6 %, on cherche le taux trimestriel proportionnel." },
        { label: "Calcul", value: "tₚ = 0,06 / 4" },
        { label: "Résultat", value: "tₚ = 0,015 soit 1,5 % par trimestre" },
        { label: "Vérification", value: "4 × 1,5 % = 6 % — parfait pour l'arithmétique" },
      ]
    },
    keyPoint: "Le taux mensuel proportionnel est utilisé pour calculer les mensualités d'un crédit immobilier en France (méthode dite « française »).",
    quiz: [
      { q: "Le taux proportionnel s'obtient par…", choices: ["Une racine n-ième", "Une simple division", "Une multiplication"], answer: 1 },
      { q: "Taux annuel 9 %, mensuel proportionnel ?", choices: ["0,75 %", "0,9 %", "1,08 %"], answer: 0 },
      { q: "Le taux proportionnel est exact pour…", choices: ["Les intérêts composés", "Les intérêts simples", "Aucun"], answer: 1 },
    ],
    flashcards: [
      { front: "Formule du taux proportionnel", back: "tₚ = t / m" },
      { front: "Quand est-il exact ?", back: "Pour les intérêts simples uniquement" },
      { front: "Convention française pour…", back: "Les mensualités de crédit immobilier" },
      { front: "Son défaut à long terme ?", back: "Il sous-estime la croissance composée" },
    ],
    graphMode: "proportional",
  },
  {
    id: "ch4",
    number: "04",
    accent: "#CCFF00",
    accentName: "ACID GREEN",
    kicker: "Dossier № 04 — Le juste prix",
    title: "Taux\nÉquivalent",
    deck: "Le taux qui, capitalisé sur plusieurs périodes, donne exactement le même résultat que le taux annuel. La justice mathématique faite formule.",
    metaphor: "Le Taux Juste",
    metaphorText: "Tu veux convertir un taux annuel en mensuel sans tricher. Le taux équivalent te répond : « voici le taux mensuel qui, composé douze fois, reproduit exactement le rendement annuel ». C'est une racine, pas une division. Plus subtil, plus juste.",
    formula: { latex: "tₑ = (1 + t)^(1/m) − 1", parts: [
      { sym: "tₑ", label: "Taux équivalent par période", unit: "—" },
      { sym: "t", label: "Taux annuel", unit: "—" },
      { sym: "m", label: "Nombre de périodes / an", unit: "—" },
    ]},
    body: [
      "Le taux équivalent est l'outil élégant de la finance composée. Il dit : « si tu veux décomposer une croissance annuelle en parts mensuelles cohérentes, ne divise pas — extrais la racine ». La conséquence est silencieuse mais centrale : c'est le seul taux qui ne ment pas dans un univers où les intérêts s'auto-multiplient.",
      "Sur le marché obligataire, dans la modélisation actuarielle, et dans tous les produits structurés, c'est lui qui règne. La banque française continue d'utiliser le proportionnel par tradition, mais le monde financier global, lui, parle équivalent."
    ],
    pullQuote: "Ne divise pas — extrais la racine.",
    example: {
      title: "Cas d'école",
      steps: [
        { label: "Énoncé", value: "Taux annuel 6 %, on cherche le taux mensuel équivalent." },
        { label: "Calcul", value: "tₑ = (1,06)^(1/12) − 1" },
        { label: "Détail", value: "tₑ = 1,004868 − 1" },
        { label: "Résultat", value: "tₑ ≈ 0,4868 % par mois" },
      ]
    },
    keyPoint: "Pour comparer deux placements (livret A vs SCPI vs assurance-vie) à fréquences différentes, on ramène tout en taux équivalent annuel — le seul terrain neutre.",
    quiz: [
      { q: "Le taux équivalent utilise…", choices: ["Une division simple", "Une racine n-ième", "Une dérivée"], answer: 1 },
      { q: "Taux annuel 8 %, équivalent semestriel ?", choices: ["4 %", "≈ 3,923 %", "4,12 %"], answer: 1 },
      { q: "Le taux équivalent est exact pour…", choices: ["Les intérêts simples", "Les intérêts composés", "Aucun"], answer: 1 },
    ],
    flashcards: [
      { front: "Formule du taux équivalent", back: "tₑ = (1+t)^(1/m) − 1" },
      { front: "Quand est-il exact ?", back: "Pour les intérêts composés" },
      { front: "Proportionnel vs équivalent", back: "Division vs racine n-ième" },
      { front: "Utilisé en finance pour…", back: "Comparer des produits à fréquences différentes" },
    ],
    graphMode: "equivalent",
  },
];
