// Quiz database — richer per-module, with detailed explanations
// Each question: { q: question, c: choices[], r: rightIndex, e: explanation }
export const QUIZ = {

  /* ============ M1 — Accueil & Découverte ============ */
  m1: [
    {
      q: "Dans la règle des 4×20, '20 cm' fait référence à…",
      c: [
        "la distance physique au client",
        "la distance du visage et l'intensité du regard",
        "la taille de la carte de visite",
        "la durée du sourire en secondes",
      ],
      r: 1,
      e: "Les 20 cm correspondent à la zone du visage : un sourire franc + un regard soutenu (70 % du temps) qui transmettent l'attention et la bienveillance. Ce n'est PAS une distance physique au client (qui serait plutôt 70 cm en zone sociale).",
    },
    {
      q: "« Avez-vous déjà visité ce bien ? » est une question :",
      c: ["ouverte", "fermée", "miroir", "inductive"],
      r: 1,
      e: "Question fermée : elle appelle un OUI ou un NON. Utile pour valider un fait, mais à éviter en début de découverte (elle ferme la conversation).",
    },
    {
      q: "DIVAS s'utilise principalement pour :",
      c: [
        "la prise de mandat exclusif",
        "l'accueil téléphonique",
        "la prospection terrain en porte-à-porte",
        "la signature du compromis chez le notaire",
      ],
      r: 1,
      e: "DIVAS = Débit, Intonation, Volume, Articulation, Sourire. Au téléphone, le client n'a que ta voix : ces 5 paramètres sont les seuls leviers à ta disposition.",
    },
    {
      q: "Un client te dit : « Je veux quelque chose de sûr pour ma retraite. » Le mobile dominant est :",
      c: ["Argent", "Sécurité", "Confort", "Orgueil"],
      r: 1,
      e: "Le mot « sûr » + la projection long terme (retraite) trahit le mobile SÉCURITÉ. Argumente avec : copro saine, locataire stable, charges maîtrisées, garanties locatives.",
    },
    {
      q: "Combien de temps maximum doit durer une poignée de main professionnelle ?",
      c: ["1 seconde", "3 secondes", "5 secondes", "7 secondes"],
      r: 1,
      e: "Une poignée de main doit durer 2 à 3 secondes maximum. Plus longue = malaise. Plus courte = froideur. Et toujours franche, jamais molle.",
    },
    {
      q: "« Trop de travaux… ? » est une question :",
      c: ["fermée", "inductive", "miroir", "d'approfondissement"],
      r: 2,
      e: "Question MIROIR : on reprend le mot-clé du client (« trop de travaux ») pour le faire développer. Très efficace pour creuser sans interroger.",
    },
    {
      q: "Le mobile « Orgueil » se reconnaît quand le client parle de :",
      c: [
        "rentabilité, ROI, prix au m²",
        "DPE, isolation, énergies renouvelables",
        "prestige, standing, quartier prisé",
        "ascenseur, parking, ergonomie",
      ],
      r: 2,
      e: "ORGUEIL = besoin de valorisation sociale. Argumente avec : adresse prestigieuse, immeuble haussmannien, vue dégagée, voisinage favorable, exclusivité.",
    },
    {
      q: "En SONCAS(E), le « E » correspond à :",
      c: ["Économie", "Élégance", "Écologie", "Efficacité"],
      r: 2,
      e: "Le « E » est l'ajout récent : ÉCOLOGIE. Argumente avec : DPE A/B, isolation performante, mobilité douce, panneaux solaires, matériaux biosourcés.",
    },
    {
      q: "Combien de questions ouvertes en début de découverte ?",
      c: [
        "une seule, pour gagner du temps",
        "plusieurs, pour laisser parler le client",
        "aucune, on préfère les fermées",
        "uniquement des inductives",
      ],
      r: 1,
      e: "En début de découverte, multiplie les questions OUVERTES : tu laisses le client s'exprimer librement, tu détectes ses mobiles, tu construis le rapport. Les fermées viennent ensuite pour préciser.",
    },
    {
      q: "Lors d'un RDV physique, combien de temps avant l'heure dois-tu arriver ?",
      c: ["pile à l'heure", "5 minutes avant", "10 minutes avant", "20 minutes avant"],
      r: 2,
      e: "10 minutes avant : tu vérifies l'adresse, tu te recoiffes, tu respires. Pile à l'heure = stressant. Plus tôt = tu déranges le client qui n'est pas prêt.",
    },
  ],

  /* ============ M2 — Entreprises & Statuts ============ */
  m2: [
    {
      q: "Sans mandat écrit conforme à la Loi Hoguet :",
      c: [
        "la commission est divisée par deux",
        "ZÉRO honoraire, même si la vente a lieu",
        "le mandat reste valable 3 mois par défaut",
        "l'agent peut tout de même se rémunérer en cash",
      ],
      r: 1,
      e: "Loi Hoguet, art. 6 : sans mandat écrit, le professionnel n'a droit à AUCUN honoraire. Même si la vente se conclut grâce à lui, même si le client le reconnaît. C'est la règle absolue.",
    },
    {
      q: "Le bail mobilité est issu de :",
      c: ["la Loi Hoguet (1970)", "la Loi ALUR (2014)", "la Loi ELAN (2018)", "la Loi Hamon (2014)"],
      r: 2,
      e: "Loi ELAN (Évolution du Logement, de l'Aménagement et du Numérique), 23 nov. 2018 : bail meublé 1 à 10 mois, sans dépôt, non renouvelable. Réservé : étudiants, stagiaires, salariés en mission.",
    },
    {
      q: "Un agent commercial NE peut PAS :",
      c: [
        "prospecter pour le compte d'une agence",
        "rédiger un compromis de vente",
        "négocier un mandat",
        "présenter une offre d'achat",
      ],
      r: 1,
      e: "Trois interdictions strictes : (1) rédiger un compromis ou un acte juridique, (2) encaisser des fonds, (3) donner des conseils juridiques. Le compromis est rédigé par l'agent titulaire de la carte T (ou un notaire).",
    },
    {
      q: "Les 3 cartes professionnelles Hoguet sont :",
      c: [
        "A, B et C",
        "T, G et S",
        "I, II et III",
        "Vente, Location et Syndic",
      ],
      r: 1,
      e: "T (Transactions sur immeubles et fonds de commerce), G (Gestion immobilière, gérance locative), S (Syndic de copropriété). Délivrées par la CCI, renouvelées tous les 3 ans.",
    },
    {
      q: "Capital social minimum d'une SA :",
      c: ["1 €", "7 500 €", "37 000 €", "75 000 €"],
      r: 2,
      e: "37 000 € pour une SA non cotée (225 000 € si appel public à l'épargne). C'est le capital minimum, à libérer pour moitié au moins à la constitution.",
    },
    {
      q: "Loi ALUR — quelle obligation pour les pros immo ?",
      c: [
        "70 h de formation/an",
        "42 h de formation continue sur 3 ans",
        "100 h/an pendant les 5 premières années",
        "Aucune formation continue",
      ],
      r: 1,
      e: "Loi ALUR (2014) impose 42 h de formation continue sur 3 ans (14 h/an en moyenne) pour conserver sa carte. Avec au moins 2 h de déontologie chaque année.",
    },
    {
      q: "Le gérant majoritaire d'une SARL a un statut social :",
      c: [
        "de salarié",
        "d'assimilé salarié",
        "de TNS (Travailleur Non Salarié)",
        "de mandataire social non protégé",
      ],
      r: 2,
      e: "Le gérant MAJORITAIRE (>50 %) est TNS : cotisations moins élevées qu'un salarié mais moins bonne protection. Le gérant MINORITAIRE ou égalitaire est assimilé salarié.",
    },
    {
      q: "AMANDA (ex-AMEPI) est :",
      c: [
        "une assurance professionnelle obligatoire",
        "un réseau de mandats exclusifs partagés entre agences",
        "un syndicat patronal de l'immobilier",
        "un logiciel de gestion locative",
      ],
      r: 1,
      e: "AMANDA = Association des MANdataires Détenteurs d'Affaires. Réseau où les agences adhérentes partagent leurs mandats EXCLUSIFS — accélère les ventes, évite la concurrence directe entre adhérents.",
    },
    {
      q: "Quelle loi a créé le DIP (Document Information Précontractuelle) ?",
      c: ["Hoguet (1970)", "ALUR (2014)", "Hamon (2014)", "ELAN (2018)"],
      r: 2,
      e: "Loi HAMON (17 mars 2014) : pour les mandats signés HORS établissement (au domicile du vendeur, à distance), le mandataire doit remettre un DIP + offrir un droit de rétractation de 14 jours.",
    },
    {
      q: "Pour exercer comme agent immobilier, le casier judiciaire doit être :",
      c: [
        "vierge (aucune mention)",
        "sans condamnation pour crime",
        "sans condamnation supérieure à 3 mois ferme",
        "vierge ou avec mentions effacées seulement",
      ],
      r: 3,
      e: "Le casier judiciaire ne doit pas comporter de condamnation incompatible avec l'activité (escroquerie, abus de confiance, faux, blanchiment, etc.). Les mentions effacées (réhabilitation) sont OK.",
    },
    {
      q: "Une EI (Entreprise Individuelle) — la responsabilité du dirigeant est :",
      c: [
        "limitée aux apports",
        "limitée à 50 % du patrimoine",
        "illimitée sur le patrimoine personnel",
        "limitée à 100 000 €",
      ],
      r: 2,
      e: "EI = responsabilité ILLIMITÉE. Le patrimoine perso répond des dettes pro. Depuis 2022, la résidence principale est protégée d'office, mais le reste du patrimoine reste exposé. Pour protéger, passer en EIRL ou EURL.",
    },
  ],

  /* ============ M3 — Prospection ============ */
  m3: [
    {
      q: "Le porte-à-porte appartient à quelle méthode de prospection ?",
      c: ["statique", "dynamique", "prospective", "digitale"],
      r: 1,
      e: "DYNAMIQUE = méthodes actives où TOI tu vas chercher le client (porte-à-porte, phoning, pige, boîtage). STATIQUE = passive (vitrine, panneaux). PROSPECTIVE = via fichier. DIGITALE = web et réseaux sociaux.",
    },
    {
      q: "Une démarche SMART est avant tout :",
      c: [
        "ambitieuse et motivante",
        "alignée avec ton humeur du jour",
        "spécifique, mesurable, atteignable, réaliste, temporelle",
        "validée par ton responsable d'agence",
      ],
      r: 2,
      e: "SMART = Spécifique, Mesurable, Atteignable, Réaliste, Temporel. Sans deadline ni unité de mesure, un objectif reste un vœu pieux.",
    },
    {
      q: "La zone primaire représente environ quelle part du CA ?",
      c: ["5 %", "15 %", "50 %", "80 %"],
      r: 3,
      e: "80 % du CA vient de la zone primaire (~200 m autour du point de référence). 15 % de la secondaire (~1 km). 5 % de la tertiaire. Concentre tes efforts là où c'est rentable.",
    },
    {
      q: "Durée maximale conseillée d'une session d'îlotage :",
      c: ["30 minutes", "2 à 3 heures", "6 heures", "toute la journée"],
      r: 1,
      e: "2 à 3 heures MAX. Au-delà, l'attention décroche, tu te répètes, tu fais du mauvais boulot. Mieux vaut 2 sessions de 2 h dans la semaine qu'une de 6 h le samedi.",
    },
    {
      q: "Le retour moyen d'un boîtage flyers est de :",
      c: ["1 pour 10", "1 pour 100", "1 pour 1 000", "1 pour 10 000"],
      r: 2,
      e: "Environ 1 retour pour 1 000 flyers distribués (0,1 %). C'est faible, mais le boîtage sert aussi (et surtout) à la NOTORIÉTÉ — apparaître régulièrement dans les boîtes aux lettres.",
    },
    {
      q: "Coût indicatif d'un panneau V/L unitaire :",
      c: ["1 à 3 €", "7 à 15 €", "30 à 50 €", "100 à 200 €"],
      r: 1,
      e: "7 à 15 € par panneau selon le matériau. Un investissement marginal — et « le panneau appelle le panneau » : un secteur bien panneauté attire d'autres vendeurs.",
    },
    {
      q: "La PIGE en prospection consiste à :",
      c: [
        "appeler son fichier clients chaque trimestre",
        "appeler les annonces de particuliers pour rentrer les mandats",
        "comptabiliser les visites mensuelles",
        "scanner les biens vendus pour estimer le marché",
      ],
      r: 1,
      e: "PIGE = repérer les annonces de particuliers (Leboncoin, PAP, vitrines) et les appeler pour décrocher un mandat. Quotidien chez les pros qui réussissent.",
    },
    {
      q: "Lequel n'appartient PAS à la prospection prospective ?",
      c: [
        "le fichier d'anciens clients",
        "les partenaires notaires et banquiers",
        "le porte-à-porte",
        "le fichier propriétaires constitué",
      ],
      r: 2,
      e: "Le porte-à-porte est DYNAMIQUE (action directe sur le terrain). La PROSPECTIVE exploite un fichier déjà constitué : anciens clients, partenaires, propriétaires recensés.",
    },
    {
      q: "Pour qu'un objectif soit MESURABLE, il faut :",
      c: [
        "qu'il soit important pour toi",
        "un chiffre et/ou une unité",
        "qu'il dépende de toi seul",
        "qu'il soit validé par écrit",
      ],
      r: 1,
      e: "MESURABLE = on peut le quantifier : nombre de mandats, nombre de RDV, montant de CA, % de transformation. « Rentrer plus de mandats » ≠ « rentrer 4 mandats exclusifs en juin ».",
    },
    {
      q: "Quel mix de méthodes est généralement recommandé ?",
      c: [
        "100 % digital",
        "100 % terrain (porte-à-porte + phoning)",
        "Un mix des 4 méthodes (statique, dynamique, prospective, digitale)",
        "Uniquement les partenariats notaires",
      ],
      r: 2,
      e: "Un pro qui dure combine les 4 : vitrine pour la notoriété + porte-à-porte pour le rentré court terme + fichier pour les réactivations + réseaux sociaux pour le moyen terme. Aucune méthode seule n'est suffisante.",
    },
  ],

  /* ============ M4 — Objectifs & Ratios ============ */
  m4: [
    {
      q: "FAI 250 000 € avec 6,5 % d'honoraires — quel est le Prix Net Vendeur ?",
      c: ["234 742 €", "233 750 €", "237 500 €", "250 000 €"],
      r: 0,
      e: "Net Vendeur = FAI ÷ (1 + taux). 250 000 ÷ 1,065 = 234 741,78 € ≈ 234 742 €. Les honoraires acheteur représentent 15 258 €.",
    },
    {
      q: "Sur 60 mandats rentrés, 24 sont devenus des ventes. Taux de transformation ?",
      c: ["24 %", "30 %", "40 %", "60 %"],
      r: 2,
      e: "Taux = (Nb ventes / Nb mandats) × 100 = (24 / 60) × 100 = 40 %. La norme du marché se situe entre 35 et 50 %. Sous 30 %, problème de prix ou de qualité de mandat.",
    },
    {
      q: "Un montant TTC de 1 200 € avec TVA 20 % — quel est le HT ?",
      c: ["960 €", "1 000 €", "1 050 €", "1 080 €"],
      r: 1,
      e: "HT = TTC ÷ 1,20 = 1 200 / 1,20 = 1 000 €. La TVA est donc de 200 €. Formule à connaître par cœur pour calculer la commission HT à partir des honoraires TTC.",
    },
    {
      q: "30 estimations donnent 18 mandats. Taux estimation → mandat ?",
      c: ["30 %", "50 %", "60 %", "70 %"],
      r: 2,
      e: "Taux = (18 / 30) × 100 = 60 %. Norme : 50 à 70 %. Sous 40 % = problème de pitch en R2 : revois ta préparation du R1, ta découverte vendeur, ton argumentaire d'exclusivité.",
    },
    {
      q: "Pour un CA agence de 583 000 € sur 66 ventes, la commission moyenne est :",
      c: ["7 500 €", "8 833 €", "9 500 €", "12 000 €"],
      r: 1,
      e: "Commission moy. = CA total / Nb ventes = 583 000 / 66 = 8 833 €. Cet indicateur mesure la valeur unitaire de chaque vente — utile pour calibrer les efforts.",
    },
    {
      q: "Tu vises 9 ventes/an. Taux de transfo mandat → vente 40 %. Combien de mandats te faut-il ?",
      c: ["15", "23", "30", "36"],
      r: 1,
      e: "Mandats = Ventes / Taux = 9 / 0,40 = 22,5 ≈ 23. Calcul en cascade : remonte la chaîne (estimations, RDV, prospects) pour savoir combien de portes frapper.",
    },
    {
      q: "Un prix FAI inclut :",
      c: [
        "uniquement le prix net vendeur",
        "le prix net vendeur + honoraires (à charge acheteur OU vendeur)",
        "uniquement les frais de notaire",
        "le net vendeur + frais de notaire",
      ],
      r: 1,
      e: "FAI = Frais d'Agence Inclus = Prix Net Vendeur + Honoraires d'agence. Les FRAIS DE NOTAIRE (~7-8 % dans l'ancien) s'ajoutent par-dessus, à la charge exclusive de l'acquéreur.",
    },
    {
      q: "Tu as dépensé 6 000 € de prospection pour rentrer 8 mandats. Coût d'acquisition unitaire ?",
      c: ["500 €", "600 €", "750 €", "1 000 €"],
      r: 2,
      e: "Coût d'acquisition mandat = 6 000 / 8 = 750 €. À comparer à la commission moyenne × taux de transfo. Si > commission attendue, tu perds de l'argent sur cette prospection.",
    },
    {
      q: "FAI 200 000 € à 5 %. Quelle est la commission TTC ?",
      c: ["5 000 €", "9 524 €", "10 000 €", "11 000 €"],
      r: 1,
      e: "PNV = 200 000 / 1,05 = 190 476 €. Commission = 200 000 − 190 476 = 9 524 €. Astuce : commission = FAI × taux / (1+taux) = 200 000 × 0,05/1,05 = 9 524 €.",
    },
    {
      q: "« Calcul en cascade » sert à :",
      c: [
        "calculer les commissions mensuelles",
        "remonter du salaire visé jusqu'au nombre de RDV à décrocher",
        "estimer la valeur d'un bien",
        "calculer le taux d'endettement",
      ],
      r: 1,
      e: "Pars du salaire visé → CA brut nécessaire → nb ventes → nb mandats (via taux transfo) → nb estimations → nb RDV. Tu sais alors EXACTEMENT combien d'actions par semaine pour atteindre ton objectif.",
    },
  ],

  /* ============ M5 — Diagnostics ============ */
  m5: [
    {
      q: "Maison construite en 1955 — le diagnostic plomb est-il obligatoire ?",
      c: [
        "Oui",
        "Non, car le bien est postérieur à 1949",
        "Oui si surface > 200 m²",
        "Seulement en location",
      ],
      r: 1,
      e: "Le CREP (Constat de Risque d'Exposition au Plomb) ne concerne QUE les biens dont le permis de construire est antérieur au 1ᵉʳ janvier 1949. La maison de 1955 est exemptée.",
    },
    {
      q: "Durée de validité du diagnostic ERP :",
      c: ["6 mois", "1 an", "3 ans", "10 ans"],
      r: 0,
      e: "L'ERP (État des Risques et Pollutions) a une validité de SEULEMENT 6 mois, car les arrêtés préfectoraux évoluent. À refaire juste avant la signature pour éviter tout litige.",
    },
    {
      q: "Le DPE concerne :",
      c: [
        "uniquement les ventes",
        "uniquement les locations",
        "tous les biens, vente ET location",
        "uniquement les biens construits après 1948",
      ],
      r: 2,
      e: "Le DPE est OBLIGATOIRE pour tout bien proposé à la vente OU à la location, sans exception. Il doit même figurer DÈS l'annonce. Validité : 10 ans.",
    },
    {
      q: "Le diagnostic amiante concerne les biens dont le permis de construire est antérieur à :",
      c: ["1949", "1ᵉʳ juillet 1997", "31 décembre 2000", "1ᵉʳ janvier 2005"],
      r: 1,
      e: "Date charnière : 1ᵉʳ juillet 1997, date d'interdiction de l'amiante en construction. Tout bien dont le PC est ANTÉRIEUR doit faire l'objet d'un diagnostic amiante (validité illimitée si négatif).",
    },
    {
      q: "À partir de quel âge gaz et électricité deviennent obligatoires ?",
      c: ["5 ans", "10 ans", "15 ans", "20 ans"],
      r: 2,
      e: "Installation de plus de 15 ans = diagnostic obligatoire. Validité : 3 ans pour une vente, 6 ans pour une location. Le diagnostic ne contraint pas à faire les travaux, mais informe l'acquéreur.",
    },
    {
      q: "Un DPE classé F ou G — l'impact à la vente :",
      c: [
        "aucun, c'est un simple chiffre",
        "valorisation +5 % en moyenne",
        "décote de 5 à 15 % et restrictions à la location",
        "interdiction totale de vendre",
      ],
      r: 2,
      e: "DPE F/G = passoire thermique. À la vente : décote 5-15 % car l'acheteur intègre les travaux à prévoir. À la location : interdiction des G depuis 2025, F en 2028, E en 2034 (calendrier Loi Climat).",
    },
    {
      q: "Le DDT (Dossier de Diagnostics Techniques) :",
      c: [
        "est facultatif",
        "regroupe TOUS les diagnostics applicables au bien",
        "est remis 6 mois après la vente",
        "ne concerne que les copropriétés",
      ],
      r: 1,
      e: "Le DDT compile l'ensemble des diagnostics obligatoires applicables : DPE, ERP, plomb, amiante, gaz, élec, termites, assainissement, bruit. Remis à l'acquéreur avec le compromis.",
    },
    {
      q: "Le diagnostic termites est obligatoire :",
      c: [
        "partout en France",
        "uniquement dans les zones d'arrêté préfectoral",
        "uniquement en outre-mer",
        "uniquement pour les biens anciens",
      ],
      r: 1,
      e: "Termites = obligatoire UNIQUEMENT dans les communes faisant l'objet d'un arrêté préfectoral (zones infestées). Validité : 6 mois. Hors zone classée, pas de diagnostic obligatoire.",
    },
    {
      q: "Validité du diagnostic gaz EN LOCATION :",
      c: ["3 ans", "6 ans", "10 ans", "illimitée"],
      r: 1,
      e: "Gaz et électricité en LOCATION : validité 6 ans (contre 3 ans pour la vente). À retenir : en location, les durées sont plus longues. Mnémo : « location = plus long ».",
    },
    {
      q: "Une vente conclue sans ERP valide peut entraîner :",
      c: [
        "rien, c'est un simple oubli",
        "une amende de 1 500 €",
        "une nullité possible de la vente ou une réduction du prix",
        "uniquement un avertissement",
      ],
      r: 2,
      e: "Absence d'ERP = action possible en NULLITÉ de la vente (1 an pour agir) OU en réduction de prix. Pour le pro, c'est aussi un manquement à son devoir de conseil, engageant sa responsabilité.",
    },
  ],

  /* ============ M6 — Estimation ============ */
  m6: [
    {
      q: "Pour estimer un bien destiné à un INVESTISSEUR locatif, on privilégie :",
      c: [
        "la méthode par comparaison",
        "la méthode par capitalisation",
        "la méthode indiciaire",
        "la méthode par les coûts",
      ],
      r: 1,
      e: "L'investisseur raisonne en RENDEMENT : Prix = Loyer annuel ÷ Taux de capitalisation. C'est la méthode adaptée. La comparaison reste valide en complément pour vérifier.",
    },
    {
      q: "Méthode privilégiée par les promoteurs et lotisseurs :",
      c: [
        "sol + construction",
        "indiciaire",
        "compte à rebours",
        "par les coûts",
      ],
      r: 2,
      e: "Compte à rebours : on part du prix de vente final estimé, on déduit la marge cible, les travaux, les frais financiers et de commercialisation, et il reste le prix maximum d'acquisition du terrain. C'est la méthode promoteur par excellence.",
    },
    {
      q: "Une bonne découverte vendeur permet surtout :",
      c: [
        "d'allonger la durée du R1",
        "de fixer un prix bas pour vendre vite",
        "un meilleur argumentaire et un traitement facilité des objections au R2",
        "d'éviter le mandat exclusif",
      ],
      r: 2,
      e: "Découverte vendeur = collecter le PASSÉ (achat, travaux), PRÉSENT (qui vend, pourquoi), FUTUR (délai, urgence). Ces infos sont l'arsenal qui permet de fermer en R2 face aux objections de prix.",
    },
    {
      q: "Quelle pondération typique pour la présence d'un ascenseur ?",
      c: ["−5 %", "0 %", "+1 à 2 %", "+10 %"],
      r: 2,
      e: "Présence ascenseur = +1 à 2 % (impact modeste en lui-même). MAIS l'absence d'ascenseur dans un immeuble haut = −8 %. La différence est asymétrique : on punit plus l'absence qu'on récompense la présence.",
    },
    {
      q: "Pondération d'un appartement situé en RDC :",
      c: ["+5 %", "neutre", "−5 à −10 %", "jusqu'à −30 %"],
      r: 3,
      e: "RDC = jusqu'à −30 % (cumul : moins de luminosité, plus de bruit/intrusion, perte de vue). À nuancer si jardin privatif (+10-15 %) ou commerce (selon usage).",
    },
    {
      q: "La méthode par comparaison est utilisée comme référence par :",
      c: [
        "uniquement les agents immobiliers",
        "les services fiscaux et les juridictions",
        "uniquement les notaires",
        "uniquement les promoteurs",
      ],
      r: 1,
      e: "Le fisc (pour les droits de mutation, l'IFI), les juridictions (partages, divorces, successions) — tous utilisent la comparaison comme référence. C'est LA méthode à maîtriser absolument.",
    },
    {
      q: "T3 loué 1 000 €/mois. Taux capitalisation local 4 %. Estimation :",
      c: ["180 000 €", "240 000 €", "300 000 €", "400 000 €"],
      r: 2,
      e: "Loyer annuel = 1 000 × 12 = 12 000 €. Prix = 12 000 / 0,04 = 300 000 €. Plus le taux est bas, plus le prix est élevé (marché tendu). Plus il est haut, plus le prix est bas (marché détendu).",
    },
    {
      q: "Au R1, avant le RDV, on doit AVOIR fait :",
      c: [
        "uniquement confirmer le RDV",
        "uniquement consulter Leboncoin",
        "confirmé le RDV, demandé les documents, recherché les ventes récentes et analysé la concurrence",
        "uniquement préparé la grille des honoraires",
      ],
      r: 2,
      e: "Préparation R1 = 75 % du succès. Confirme + collecte docs (titre, taxe foncière, charges) + consulte DVF/DV3F + repère la concurrence en ligne. Tu arrives blindé, le vendeur le sent immédiatement.",
    },
    {
      q: "Pondération typique pour un bien sans espaces verts à proximité :",
      c: ["+5 %", "neutre", "−5 %", "−15 %"],
      r: 2,
      e: "Absence d'espaces verts proches = −5 %. À l'inverse, la présence (parc, square, jardin commun) = +5 %. Mémo : « +5 / −5 verts ».",
    },
    {
      q: "Méthode SOL + CONSTRUCTION s'applique surtout à :",
      c: [
        "appartements en copropriété",
        "maisons individuelles et petits immeubles",
        "biens loués",
        "viagers occupés",
      ],
      r: 1,
      e: "Sol + construction = on valorise séparément le terrain (sur la base d'un m² de terrain local) et le bâti (sur coût de reconstruction moins vétusté). Adaptée aux maisons et immeubles, peu pertinente en copro.",
    },
  ],

  /* ============ M6 bis — Viager & Démembrement ============ */
  m6b: [
    {
      q: "Si le crédirentier vit plus longtemps que prévu :",
      c: [
        "avantage acheteur",
        "avantage vendeur",
        "le contrat est annulé",
        "neutre, c'est calculé sur barème",
      ],
      r: 1,
      e: "L'aléa est l'essence du viager : crédirentier qui vit longtemps = il continue de percevoir la rente longtemps = il a fait une bonne affaire. Décès précoce = avantage acheteur (mais aléa = exigé pour valider le contrat).",
    },
    {
      q: "Le viager OCCUPÉ représente :",
      c: ["10 % des viagers", "50 %", "≈ 95 % des cas", "100 %"],
      r: 2,
      e: "≈ 95 % des viagers sont occupés (le vendeur reste dans son bien). Plus accessible pour l'acheteur (abattement d'occupation 20-40 %). Le viager LIBRE est plus rare car plus coûteux.",
    },
    {
      q: "L'usufruitier peut :",
      c: [
        "vendre seul le bien",
        "occuper et louer le bien",
        "réaliser de gros travaux à la charge du nu-propriétaire sans l'avertir",
        "récupérer la nue-propriété au décès du nu-propriétaire",
      ],
      r: 1,
      e: "Usufruit = USUS (utiliser) + FRUCTUS (percevoir les fruits, donc louer). Il NE peut PAS vendre seul (abusus = nu-propriétaire). Les gros travaux (art. 606 : toiture, gros œuvre) sont à la charge du NU-propriétaire.",
    },
    {
      q: "Le BOUQUET du viager représente généralement :",
      c: [
        "5 % de la valeur du bien",
        "20 à 30 %",
        "50 %",
        "100 % du bien",
      ],
      r: 1,
      e: "Bouquet = somme versée comptant à la signature = 20 à 30 % de la valeur. Le reste est converti en rente viagère. Plus le bouquet est élevé, plus la rente est faible.",
    },
    {
      q: "Quel droit revient au NU-PROPRIÉTAIRE ?",
      c: [
        "Usus (utiliser)",
        "Fructus (percevoir les revenus)",
        "Abusus (disposer du bien)",
        "Tous les trois",
      ],
      r: 2,
      e: "Abusus = droit de disposer (vendre, donner, hypothéquer). Le nu-propriétaire détient la VALEUR du bien mais ne peut ni l'occuper ni le louer (ces droits appartiennent à l'usufruitier).",
    },
    {
      q: "Quand l'usufruit s'éteint (généralement au décès de l'usufruitier) :",
      c: [
        "le bien est vendu aux enchères",
        "il y a des droits de succession énormes à payer",
        "le nu-propriétaire récupère la pleine propriété sans droits de succession sur l'usufruit",
        "l'État récupère la nue-propriété",
      ],
      r: 2,
      e: "Extinction de l'usufruit = consolidation automatique de la pleine propriété chez le nu-propriétaire, SANS droits supplémentaires sur la valeur de l'usufruit. C'est ce qui fait l'intérêt fiscal du démembrement.",
    },
    {
      q: "Sans aléa (par exemple crédirentier en phase terminale connue), le viager est :",
      c: [
        "valable mais déconseillé",
        "nul",
        "soumis à des droits supplémentaires",
        "transformé en vente classique",
      ],
      r: 1,
      e: "L'aléa est la CAUSE du contrat de viager. Sans aléa (durée de vie objectivement très courte connue des parties), le contrat est NUL. Le notaire vérifie l'état de santé du crédirentier avant signature.",
    },
    {
      q: "Selon le barème fiscal de l'usufruit (CGI art. 669), un usufruitier de 75 ans représente quelle part de la valeur du bien ?",
      c: ["10 %", "20 %", "30 %", "40 %"],
      r: 2,
      e: "Barème fiscal usufruit : 71-80 ans = 30 % (donc nue-propriété = 70 %). Mémo de tranches : décade −20 ans = +10 % nue-propriété. Plus l'usufruitier est âgé, plus l'usufruit vaut peu.",
    },
    {
      q: "Avantage fiscal majeur du démembrement pour la transmission :",
      c: [
        "exonération totale de l'impôt",
        "donation anticipée de la nue-propriété, taxée sur une valeur réduite",
        "réduction de la TVA",
        "exonération de la taxe foncière",
      ],
      r: 1,
      e: "Donner la NUE-PROPRIÉTÉ tout en gardant l'usufruit : on transmet aux enfants à valeur réduite (selon âge), on continue d'occuper/louer le bien, et à terme les enfants récupèrent la pleine propriété sans payer de droits supplémentaires.",
    },
    {
      q: "Charges courantes (taxe d'habitation, entretien) du bien démembré :",
      c: [
        "à la charge du nu-propriétaire",
        "à la charge de l'usufruitier",
        "réparties à 50/50",
        "exonération",
      ],
      r: 1,
      e: "USUFRUITIER paie : taxe d'habitation (s'il l'occupe), entretien courant, charges récupérables. NU-PROPRIÉTAIRE paie : taxe foncière en théorie (souvent négocié), gros travaux art. 606.",
    },
  ],

  /* ============ M8 — Mandats ============ */
  m8: [
    {
      q: "Le mandat SEMI-EXCLUSIF permet :",
      c: [
        "plusieurs agences en parallèle",
        "une exclusivité totale, pas de vente directe",
        "exclusivité à une seule agence MAIS le propriétaire peut vendre en direct",
        "uniquement la recherche d'un acquéreur",
      ],
      r: 2,
      e: "Semi-exclusif = exclusivité agence (pas d'autre agence) MAIS le propriétaire conserve le droit de vendre seul à un acquéreur qu'il aurait trouvé directement. Compromis pour les vendeurs réticents à l'exclusif total.",
    },
    {
      q: "Le mandat DE RECHERCHE engage :",
      c: [
        "le propriétaire vendeur",
        "l'acquéreur",
        "le syndic de copropriété",
        "le notaire",
      ],
      r: 1,
      e: "Mandat de recherche = signé avec l'ACQUÉREUR. Il précise : zone, type de bien, surface, budget. L'acquéreur s'engage à passer par l'agence pour acheter dans ce périmètre. Honoraires généralement à sa charge.",
    },
    {
      q: "Loi Hamon — délai de rétractation pour un mandat hors établissement :",
      c: ["7 jours", "10 jours", "14 jours", "30 jours"],
      r: 2,
      e: "14 jours calendaires à compter de la signature, pour les mandats signés HORS établissement (domicile, à distance). Pendant ces 14 jours, le mandant peut se rétracter sans motif ni pénalité.",
    },
    {
      q: "Une mention obligatoire manquante sur le mandat entraîne :",
      c: [
        "une simple amende",
        "une réduction de la commission de 50 %",
        "la nullité du mandat = ZÉRO honoraire",
        "rien si la vente est conclue",
      ],
      r: 2,
      e: "Loi Hoguet, art. 6 : une seule mention manquante = NULLITÉ. L'agence ne touche aucun honoraire, même si la vente s'est faite. Les 9 mentions sont à vérifier comme un check-list obligatoire avant signature.",
    },
    {
      q: "Irrévocabilité du mandat exclusif :",
      c: [
        "aucune",
        "1 mois",
        "3 mois minimum, préavis 15 jours pour résilier",
        "6 mois ferme",
      ],
      r: 2,
      e: "Exclusif = irrévocable 3 mois minimum. Après ces 3 mois, le mandant peut résilier par LRAR avec préavis 15 jours. Clause pénale possible (généralement 5-7 % du prix net vendeur) en cas de manœuvre malhonnête.",
    },
    {
      q: "Le registre des mandats doit être tenu :",
      c: [
        "uniquement sur support papier",
        "uniquement électronique",
        "papier OU électronique, chronologique, sans blanc ni rature",
        "tous les 6 mois seulement",
      ],
      r: 2,
      e: "Support libre (papier ou électronique). Tenue : numérotation chronologique CONTINUE, sans blanc, sans rature. Conservation 10 ans. Si tu as les cartes T ET G = 2 registres distincts obligatoires.",
    },
    {
      q: "Combien de mentions obligatoires sur un mandat Hoguet ?",
      c: ["5", "7", "9", "12"],
      r: 2,
      e: "9 mentions : (1) identité parties, (2) N° carte pro, (3) RCP + garantie financière, (4) désignation bien, (5) prix TTC, (6) durée + résiliation, (7) honoraires, (8) N° registre, (9) moyens de diffusion.",
    },
    {
      q: "Un mandat EXCLUSIF impose à l'agence :",
      c: [
        "rien de particulier",
        "des moyens minimaux et un bilan de prospection régulier",
        "une vente garantie dans les 3 mois",
        "une commission divisée par 2",
      ],
      r: 1,
      e: "L'agence titulaire d'un exclusif doit déployer des moyens SUPÉRIEURS (photos pro, vidéo, AMANDA, diffusion étendue) et rendre compte régulièrement de ses actions au mandant. C'est la contrepartie du monopole.",
    },
    {
      q: "Pour un bien en copropriété, le mandat doit s'accompagner de :",
      c: [
        "uniquement de la taxe foncière",
        "PV des 3 dernières AG, charges, règlement de copro, état descriptif, carnet d'entretien",
        "uniquement du DPE",
        "rien de particulier",
      ],
      r: 1,
      e: "Dossier copro complet : 3 derniers PV d'AG, 2 dernières années de charges, règlement, état descriptif de division, carnet d'entretien, fiche synthétique. Tout doit être remis à l'acquéreur AVANT le compromis (Loi ALUR).",
    },
    {
      q: "Statistiquement, un bien vendu en mandat EXCLUSIF se vend :",
      c: [
        "moins cher et moins vite",
        "même prix, même délai",
        "plus vite et 5 à 7 % plus cher en moyenne",
        "plus cher mais moins vite",
      ],
      r: 2,
      e: "Études marché : exclusif = délai moyen 2× plus court ET prix 5-7 % plus élevé que le simple. Pourquoi ? Pas de concurrence agressive = pas de surenchère à la baisse, et l'agence engage de vrais moyens.",
    },
  ],

  /* ============ M11 — Financement ============ */
  m11: [
    {
      q: "1 000 € placés à 5 % pendant 3 ans en intérêts SIMPLES — total des intérêts :",
      c: ["100 €", "150 €", "157,63 €", "165 €"],
      r: 1,
      e: "I = C × t × n = 1 000 × 0,05 × 3 = 150 €. En intérêts simples, on calcule TOUJOURS sur le capital initial. Chaque année = 50 €. Total sur 3 ans = 150 €. Capital final = 1 150 €.",
    },
    {
      q: "1 000 € à 5 % pendant 2 ans en intérêts COMPOSÉS — capital final :",
      c: ["1 050 €", "1 100 €", "1 102,50 €", "1 110,25 €"],
      r: 2,
      e: "Cn = C₀ × (1 + t)ⁿ = 1 000 × 1,05² = 1 000 × 1,1025 = 1 102,50 €. Les intérêts de la 1ère année (50 €) génèrent eux-mêmes des intérêts la 2ème année (2,50 € supplémentaires).",
    },
    {
      q: "Le taux ÉQUIVALENT par rapport au taux PROPORTIONNEL est :",
      c: [
        "toujours supérieur",
        "toujours inférieur",
        "égal",
        "variable selon la banque",
      ],
      r: 1,
      e: "Le taux équivalent est TOUJOURS légèrement inférieur au taux proportionnel. Pourquoi ? Le proportionnel ne tient pas compte de la capitalisation intra-annuelle ; l'équivalent l'intègre, donnant un taux périodique plus faible.",
    },
    {
      q: "Taux annuel 3,6 %. Taux mensuel PROPORTIONNEL :",
      c: ["0,03 %", "0,30 %", "3,00 %", "30 %"],
      r: 1,
      e: "Proportionnel = taux annuel ÷ nb de périodes = 3,6 / 12 = 0,30 % par mois. C'est la méthode utilisée par la plupart des banques pour calculer les mensualités (plus simple, légèrement plus avantageux pour la banque).",
    },
    {
      q: "Durée 20 ans exprimée en mois (pour la formule de mensualité) :",
      c: ["20", "120", "200", "240"],
      r: 3,
      e: "20 ans × 12 mois = 240 mois. La formule mensualité utilise n EN MOIS. Erreur classique à l'exam : prendre n en années → résultat absurde. Toujours convertir.",
    },
    {
      q: "Règle HCSF — taux d'endettement maximum :",
      c: ["25 %", "30 %", "33 %", "35 %"],
      r: 3,
      e: "Depuis 2022, le HCSF (Haut Conseil de Stabilité Financière) impose 35 % MAX (charges crédit / revenus nets mensuels). Avec exception 20 % des dossiers. Concerne TOUS les emprunteurs.",
    },
    {
      q: "Capital 200 000 €, taux 3,6 % annuel, 20 ans. Mensualité approximative :",
      c: ["830 €", "950 €", "1 170 €", "1 400 €"],
      r: 2,
      e: "tm = 0,036/12 = 0,003. M = C × tm / [1 − (1+tm)^(−n)] = 200 000 × 0,003 / [1 − 1,003^(−240)] ≈ 600 / 0,513 ≈ 1 170 €/mois. Sur 240 mois, coût total ≈ 80 800 € d'intérêts.",
    },
    {
      q: "Quel placement gagne le plus sur le long terme ?",
      c: [
        "Intérêts simples",
        "Intérêts composés",
        "Les deux à égalité",
        "Cela dépend du taux uniquement",
      ],
      r: 1,
      e: "Les COMPOSÉS gagnent ÉNORMÉMENT à long terme. 1 000 € à 5 % sur 30 ans : simples = 2 500 € intérêts ; composés = 4 322 € intérêts. C'est exactement pourquoi un crédit long coûte si cher.",
    },
    {
      q: "Taux équivalent trimestriel à partir d'un taux annuel t :",
      c: [
        "t × 4",
        "t / 4",
        "(1 + t)^(1/4) − 1",
        "(1 + t)^4 − 1",
      ],
      r: 2,
      e: "Équivalent = (1+t)^(1/4) − 1. La racine quatrième correspond à la division des périodes (4 trimestres/an). t/4 serait le taux PROPORTIONNEL (≠ équivalent). t × 4 ou (1+t)^4 sont des erreurs de logique.",
    },
    {
      q: "Pour un ménage avec 4 000 €/mois nets, mensualité de crédit MAX autorisée :",
      c: ["1 000 €", "1 200 €", "1 400 €", "2 000 €"],
      r: 2,
      e: "4 000 × 35 % = 1 400 €/mois max. La règle HCSF s'applique à TOUTES les charges de crédit cumulées (immo + conso + auto). Pour calculer la capacité d'emprunt, c'est cette mensualité plafond qui sert de point de départ.",
    },
  ],

  /* ============ Synthèse ============ */
  syn: [
    {
      q: "Laquelle de ces règles est CORRECTE ?",
      c: [
        "Le taux équivalent est supérieur au taux proportionnel",
        "DPE + ERP ne sont obligatoires qu'en location",
        "Mandat exclusif irrévocable 3 mois",
        "Le bail mobilité dure 12 à 24 mois",
      ],
      r: 2,
      e: "Les autres sont fausses : équivalent < proportionnel ; DPE + ERP s'imposent en vente ET location ; bail mobilité dure 1 à 10 mois (non renouvelable). Exclusif irrévocable 3 mois = vrai, fondamental.",
    },
    {
      q: "Taux d'endettement HCSF max :",
      c: ["25 %", "30 %", "33 %", "35 %"],
      r: 3,
      e: "35 % des revenus nets mensuels du ménage. Règle entrée en vigueur début 2022, devenue contraignante (et non plus indicative). Avec dérogations possibles pour 20 % des dossiers (primo-accédants notamment).",
    },
    {
      q: "Sans mandat écrit conforme :",
      c: [
        "la commission est partagée",
        "ZÉRO honoraire",
        "le mandat tient 3 mois quand même",
        "le client doit verser une indemnité",
      ],
      r: 1,
      e: "Loi Hoguet, art. 6 : aucun écrit ou écrit non conforme = aucun honoraire. La règle est ABSOLUE, sans exception, sans négociation possible. C'est la première règle à mémoriser.",
    },
    {
      q: "Méthode d'estimation utilisée comme RÉFÉRENCE par le fisc et les tribunaux :",
      c: [
        "capitalisation",
        "indiciaire",
        "comparaison",
        "compte à rebours",
      ],
      r: 2,
      e: "La COMPARAISON est la référence absolue : analyse des ventes récentes de biens similaires. Méthode incontestable car factuelle. Les autres ont leur usage spécifique mais ne remplacent jamais la comparaison.",
    },
    {
      q: "Cite par cœur les composantes du SONCAS(E) :",
      c: [
        "Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie, Écologie",
        "Sympathie, Optimisme, Nouveauté, Conviction, Argent, Sécurité, Économie",
        "Statut, Origine, Notoriété, Confort, Avantage, Sécurité, Énergie",
        "Service, Originalité, Naturel, Couleur, Argent, Sécurité, Esthétique",
      ],
      r: 0,
      e: "SONCAS-E = Sécurité · Orgueil · Nouveauté · Confort · Argent · Sympathie · Écologie. Le « E » est l'ajout récent qui répond aux préoccupations environnementales contemporaines.",
    },
    {
      q: "Le « 4 × 20 » correspond à :",
      c: [
        "4 × 20 cm de distance physique",
        "20 sec, 20 gestes, 20 mots, 20 cm du visage",
        "20 RDV, 20 visites, 20 mandats, 20 ventes",
        "20 jours, 20 semaines, 20 mois, 20 ans",
      ],
      r: 1,
      e: "Mnémo : « les 80 secondes qui décident de tout ». 20 sec (apparence), 20 gestes (posture), 20 mots (accroche), 20 cm (visage : sourire + regard). La 1ère impression ne se refait pas.",
    },
    {
      q: "Zone primaire de prospection — part du CA :",
      c: ["20 %", "50 %", "70 %", "80 %"],
      r: 3,
      e: "Loi de Pareto appliquée à l'immobilier : ~80 % du CA d'un négociateur vient de sa zone primaire (~200 m). 15 % secondaire (~1 km). 5 % tertiaire. Concentre tes efforts là où c'est rentable.",
    },
    {
      q: "Le registre des mandats doit être tenu :",
      c: [
        "uniquement à la fin de l'année",
        "chronologique, sans blanc ni rature",
        "par le commissaire aux comptes",
        "uniquement sur Excel",
      ],
      r: 1,
      e: "Chronologique = par ordre d'enregistrement. Sans blanc = pas de page laissée vide. Sans rature = pas de correction. Support libre (papier ou électronique). Conservation 10 ans. Contrôlé par la DGCCRF.",
    },
    {
      q: "Validité du DPE :",
      c: ["6 mois", "1 an", "3 ans", "10 ans"],
      r: 3,
      e: "DPE = 10 ans (sauf travaux importants qui rendent le précédent caduc). ERP = 6 mois (court car arrêtés préfectoraux évoluent). Ne pas confondre. Le DPE est obligatoire dès l'annonce.",
    },
    {
      q: "Loi qui impose le mandat ÉCRIT obligatoire :",
      c: ["ALUR", "ELAN", "Hoguet", "Hamon"],
      r: 2,
      e: "Loi HOGUET du 2 janvier 1970 — la loi fondatrice de la profession immobilière. Mandat écrit, cartes T/G/S, garantie financière, registre des mandats : tout vient d'elle.",
    },
    {
      q: "Pour devenir agent commercial immobilier, il faut être inscrit au :",
      c: ["RCS", "RSAC", "Répertoire SIRENE seul", "Tribunal de commerce"],
      r: 1,
      e: "RSAC = Registre Spécial des Agents Commerciaux, tenu par le greffe du tribunal de commerce. Inscription gratuite, valable 5 ans renouvelables. Démarche obligatoire avant tout début d'activité.",
    },
  ],
};
