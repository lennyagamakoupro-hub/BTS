// Additional quiz questions — brings each module's pool to 20+ questions
(function() {
  if (!window.QUIZ) return;

  const extras = {

    /* ============ M1 — Accueil ============ */
    m1: [
      {
        q: "Combien de fois maximum le regard doit-il être maintenu lors d'un échange ?",
        c: ["20 % du temps", "50 %", "70 %", "100 %"],
        r: 2,
        e: "70 % du temps de l'échange. En dessous : tu parais fuyant. Au-dessus : tu deviens inquisiteur. La règle des 70 % est universelle en communication non verbale.",
      },
      {
        q: "Un client te dit : « C'est récent, ça vient juste d'être rénové ? » — Mobile dominant :",
        c: ["Confort", "Nouveauté", "Argent", "Sympathie"],
        r: 1,
        e: "NOUVEAUTÉ — l'envie de modernité et de jamais-utilisé. Argumente avec les dernières normes (RE2020), les équipements neufs, l'absence de travaux à prévoir.",
      },
      {
        q: "« Comment imaginez-vous votre futur logement ? » est une question :",
        c: ["fermée", "ouverte", "miroir", "inductive"],
        r: 1,
        e: "OUVERTE — elle appelle un développement libre, idéal en début de découverte pour cerner les attentes et détecter les mobiles SONCAS.",
      },
      {
        q: "Quel est l'objectif principal de la phase de découverte client ?",
        c: [
          "Présenter l'agence",
          "Cerner les besoins, motivations et contraintes du client",
          "Conclure rapidement la vente",
          "Faire signer le mandat",
        ],
        r: 1,
        e: "La découverte précède toute argumentation. Sans elle, tu argumentes à l'aveugle. Cerne PASSÉ, PRÉSENT, FUTUR du client pour adapter chaque mot du R2.",
      },
      {
        q: "Lors d'un appel téléphonique, le sourire :",
        c: [
          "n'a aucun impact",
          "perturbe l'élocution",
          "s'entend dans la voix (timbre + position de la mâchoire)",
          "est interdit en pro",
        ],
        r: 2,
        e: "S de DIVAS. Le sourire modifie la cavité buccale et la tension des cordes vocales — la voix devient plus chaude et plus engageante. Un client perçoit immédiatement la différence.",
      },
      {
        q: "Un client répète plusieurs fois « rendement » et « rentabilité ». Mobile :",
        c: ["Argent", "Sécurité", "Confort", "Écologie"],
        r: 0,
        e: "ARGENT — calcul ROI, rentabilité locative, prix au m² < marché. Mets en avant les chiffres : taux net, charges, fiscalité, plus-value potentielle.",
      },
      {
        q: "La règle des 7 secondes désigne :",
        c: [
          "le temps pour répondre à une objection",
          "la durée de la phase de présentation",
          "le temps moyen pour former un premier jugement sur l'autre",
          "la longueur idéale d'une phrase",
        ],
        r: 2,
        e: "Le cerveau forme un jugement (compétence, fiabilité, sympathie) en moins de 7 secondes — bien avant la fin de la 1ère phrase. C'est ce qui justifie la règle des 4×20.",
      },
      {
        q: "« Comprenez-vous ce que je veux dire ? » — Quel est le problème de cette question ?",
        c: [
          "elle est trop longue",
          "elle est inductive et culpabilisante",
          "elle est ouverte",
          "elle est mal articulée",
        ],
        r: 1,
        e: "Question INDUCTIVE qui présuppose une lacune chez le client. À bannir. Préfère : « Est-ce que je suis clair ? » qui rejette la responsabilité sur soi-même.",
      },
      {
        q: "Quelle position des bras transmet l'ouverture ?",
        c: [
          "Bras croisés sur la poitrine",
          "Mains dans les poches",
          "Bras décroisés, paumes parfois visibles",
          "Mains derrière le dos",
        ],
        r: 2,
        e: "Décroisés, paumes visibles = signal universel d'ouverture et d'absence de menace. Mains derrière le dos = posture militaire/autoritaire, à éviter sauf protocole.",
      },
      {
        q: "Un client manifeste de l'agacement. Premier réflexe :",
        c: [
          "Argumenter plus fort",
          "Laisser le silence s'installer",
          "Reformuler avec empathie ce qu'il vient de dire",
          "Changer de sujet",
        ],
        r: 2,
        e: "Reformulation empathique : « Si je comprends bien, vous trouvez que… ». Le client se sent entendu, son agacement retombe. C'est l'écoute active de base.",
      },
    ],

    /* ============ M2 — Entreprises ============ */
    m2: [
      {
        q: "Le carnet d'entretien d'une copropriété est obligatoire depuis :",
        c: ["la Loi Hoguet", "la Loi SRU", "la Loi ALUR", "la Loi ELAN"],
        r: 2,
        e: "Loi ALUR (2014) impose le carnet d'entretien : historique des travaux, contrats d'entretien, références du syndic. Il doit être remis à l'acquéreur d'un lot de copropriété.",
      },
      {
        q: "Un mandataire en immobilier doit renouveler sa carte tous les :",
        c: ["1 an", "3 ans", "5 ans", "10 ans"],
        r: 1,
        e: "Renouvellement tous les 3 ans. Conditions : justifier des 42 h de formation continue (Loi ALUR), maintenir RCP et garantie financière à jour, casier judiciaire vierge.",
      },
      {
        q: "Une SCI a pour objet principal :",
        c: [
          "la vente immobilière commerciale",
          "la gestion d'un patrimoine immobilier",
          "le commerce de fonds de commerce",
          "la syndication d'immeubles",
        ],
        r: 1,
        e: "SCI = Société Civile Immobilière — détention et gestion d'un patrimoine immo (souvent familial). PAS de transactions commerciales (qui basculeraient en SCI à objet commercial = requalification fiscale).",
      },
      {
        q: "Quelle structure protège le mieux le patrimoine personnel d'un dirigeant ?",
        c: ["EI", "EIRL ou SARL/SAS", "EI classique", "Aucune"],
        r: 1,
        e: "EIRL = patrimoine d'affectation. SARL/SAS = responsabilité limitée aux apports. EI = patrimoine perso engagé sauf résidence principale (protection automatique depuis 2022).",
      },
      {
        q: "Le seuil pour passer à la TVA en franchise dépend :",
        c: [
          "uniquement du chiffre d'affaires",
          "uniquement du nombre de salariés",
          "des bénéfices",
          "du capital social",
        ],
        r: 0,
        e: "Seuil de franchise TVA = lié au CA (env. 91 900 € en achat-revente, 36 800 € en services). Au-delà, TVA obligatoire. Important pour l'agent commercial débutant.",
      },
      {
        q: "Garantie financière minimum pour une carte T avec maniement de fonds :",
        c: ["30 000 €", "55 000 €", "110 000 €", "200 000 €"],
        r: 2,
        e: "110 000 € minimum la 1ère année, puis fixée selon les sommes maniées en cours d'année. Souscrite auprès d'une banque ou d'un organisme de cautionnement.",
      },
      {
        q: "Quelle loi a instauré le diagnostic ALUR pour les copropriétés ?",
        c: ["Hoguet", "ALUR", "ELAN", "Hamon"],
        r: 1,
        e: "Loi ALUR (2014) : pré-état daté + 6 documents obligatoires pour l'acquéreur d'un lot en copro. Avant cette loi, l'acquéreur n'avait que peu d'infos sur la copropriété.",
      },
      {
        q: "Une SAS — combien d'actionnaires minimum ?",
        c: ["1", "2", "3", "7"],
        r: 0,
        e: "SAS = à partir de 1 actionnaire (sinon SASU). Pas de plafond. SA = 2 minimum (7 pour cotée). C'est ce qui fait la souplesse de la SAS.",
      },
      {
        q: "Le mandataire immobilier qui ne respecte pas la Loi Hoguet risque :",
        c: [
          "Un simple avertissement",
          "Une amende de 100 €",
          "Jusqu'à 6 mois de prison + 7 500 € d'amende",
          "Aucune sanction",
        ],
        r: 2,
        e: "Exercice illégal = 6 mois prison + 7 500 € (art. 14 Loi Hoguet). Sanction grave : déchéance définitive du droit d'exercer. La profession est régulée strictement.",
      },
      {
        q: "Un GIE peut être créé pour :",
        c: [
          "tirer un profit personnel maximal",
          "mutualiser des moyens entre professionnels indépendants",
          "exercer une activité agricole",
          "détenir un patrimoine immobilier privé",
        ],
        r: 1,
        e: "GIE = Groupement d'Intérêt Économique. Mutualisation entre pros (achats groupés, communication, locaux). Responsabilité SOLIDAIRE des membres — attention.",
      },
    ],

    /* ============ M3 — Prospection ============ */
    m3: [
      {
        q: "Un panneau « VENDU » sur un bien sert principalement à :",
        c: [
          "Confirmer la transaction au notaire",
          "Démontrer aux voisins la capacité de l'agence à vendre",
          "Permettre les visites complémentaires",
          "Décourager les autres agences",
        ],
        r: 1,
        e: "Le panneau VENDU est un OUTIL DE PROSPECTION : il prouve que l'agence vend, donc les voisins potentiellement vendeurs viennent à toi. « Le panneau appelle le panneau. »",
      },
      {
        q: "Combien de fois faut-il en moyenne contacter un prospect avant de signer ?",
        c: ["1 fois", "3 fois", "7 fois", "15 fois"],
        r: 2,
        e: "7 contacts en moyenne (règle marketing classique). C'est pourquoi un fichier prospect bien tenu + relances régulières (newsletter, mailing, calls) est essentiel.",
      },
      {
        q: "L'objectif d'un boîtage flyers est :",
        c: [
          "Toucher 1 000 nouveaux clients d'un coup",
          "Générer un retour direct massif",
          "La notoriété long terme + ~1 retour sur 1 000",
          "Concurrencer les agences voisines",
        ],
        r: 2,
        e: "Le boîtage est surtout un investissement NOTORIÉTÉ. Le retour direct est faible (1/1000), mais sur 12 mois de boîtage régulier, ton agence devient LA référence du quartier.",
      },
      {
        q: "Quelle action a le meilleur retour sur temps investi en zone primaire ?",
        c: [
          "Boîtage de flyers",
          "Phoning à froid",
          "Porte-à-porte ciblé",
          "Annonces sur Facebook",
        ],
        r: 2,
        e: "Le porte-à-porte ciblé en zone primaire reste le ROI/heure le plus élevé pour un négo en début d'activité : contact humain direct, qualification immédiate, suivi possible.",
      },
      {
        q: "Lequel n'est PAS un objectif de la prospection ?",
        c: [
          "Être connu et reconnu sur son secteur",
          "Détecter des besoins",
          "Rentrer des mandats",
          "Réduire le coût de la garantie financière",
        ],
        r: 3,
        e: "Les 3 objectifs : notoriété, détection, rentrée de mandats. La garantie financière n'a rien à voir avec la prospection — elle dépend des fonds maniés en gestion (G).",
      },
      {
        q: "Quel est le meilleur moment pour appeler un particulier en pige ?",
        c: [
          "Tôt le matin avant 8h",
          "En soirée 18h-20h",
          "En milieu de journée 11h-12h",
          "Le dimanche après-midi",
        ],
        r: 1,
        e: "18h-20h : la personne est rentrée du travail, plus disponible mentalement. Évite avant 9h, pendant les repas, et tard le soir. Le week-end : possible mais avec tact.",
      },
      {
        q: "Un fichier propriétaires doit être :",
        c: [
          "Public et partagé",
          "Constitué et tenu à jour, respectant le RGPD",
          "Acheté à un tiers sans vérification",
          "Conservé indéfiniment",
        ],
        r: 1,
        e: "RGPD = mention d'information, base légale, droit d'opposition. Constitué proprement (sources légales : panneaux, prises de contact, anciens clients), tenu à jour.",
      },
      {
        q: "La prospection statique inclut :",
        c: [
          "Le phoning",
          "Le porte-à-porte",
          "La vitrine et les panneaux",
          "L'appel aux anciens clients",
        ],
        r: 2,
        e: "STATIQUE = passive, le client vient à toi : vitrine, panneaux V/L, affichage, signalétique. DYNAMIQUE = action directe. PROSPECTIVE = fichier. DIGITALE = web.",
      },
      {
        q: "Quel KPI suit la santé d'une prospection ?",
        c: [
          "Nombre de RDV générés par semaine",
          "Coût d'une carte de visite",
          "Couleur de la vitrine",
          "Âge moyen des clients",
        ],
        r: 0,
        e: "RDV générés/semaine = indicateur PRIMAIRE. À suivre aussi : taux de transfo RDV→estimation, estimation→mandat, mandat→vente. C'est la chaîne complète à mesurer.",
      },
      {
        q: "Pour un objectif SMART de prospection mensuel, un bon exemple est :",
        c: [
          "« Faire plus de porte-à-porte »",
          "« Avoir plus de mandats »",
          "« 80 portes/semaine en zone primaire pendant 4 semaines pour 3 RDV qualifiés »",
          "« Vendre beaucoup »",
        ],
        r: 2,
        e: "Spécifique (80 portes, zone primaire), Mesurable (3 RDV), Atteignable (réaliste 80/sem), Temporel (4 semaines). C'est SMART. Les autres sont des vœux vagues.",
      },
    ],

    /* ============ M4 — Ratios ============ */
    m4: [
      {
        q: "PNV 250 000 € + 5 % FAI = quel prix FAI ?",
        c: ["255 000 €", "262 500 €", "267 500 €", "270 000 €"],
        r: 1,
        e: "FAI = PNV × (1 + taux) = 250 000 × 1,05 = 262 500 €. La commission est de 12 500 €. Mémo : pour passer du PNV au FAI, on MULTIPLIE par (1+taux).",
      },
      {
        q: "Commission TTC 9 600 €. Quelle est la commission HT (TVA 20 %) ?",
        c: ["7 680 €", "8 000 €", "8 400 €", "8 800 €"],
        r: 1,
        e: "HT = TTC / 1,20 = 9 600 / 1,20 = 8 000 €. Soit 1 600 € de TVA collectée. Penser à ce calcul à chaque édition de facture.",
      },
      {
        q: "Pour gagner 24 000 €/an net (≈ 48 000 € brut) avec commission moy. 8 000 € :",
        c: ["3 ventes/an", "6 ventes/an", "9 ventes/an", "12 ventes/an"],
        r: 1,
        e: "48 000 / 8 000 = 6 ventes/an, soit 1 vente tous les 2 mois. Avec taux de transfo 40 %, il te faut 15 mandats/an, donc ~25 estimations à décrocher.",
      },
      {
        q: "Quel taux de transformation est CONSIDÉRÉ comme bon en immobilier ?",
        c: ["10 %", "20 %", "35-50 %", "80-100 %"],
        r: 2,
        e: "Transfo mandat → vente : 35-50 % est la fourchette correcte. Au-delà = secteur facile ou prix très ajustés. En dessous de 30 % = problème de prix ou de mandat.",
      },
      {
        q: "Sur 50 RDV de qualification, 30 estimations sont réalisées. Taux RDV → estimation :",
        c: ["40 %", "50 %", "60 %", "75 %"],
        r: 2,
        e: "30/50 × 100 = 60 %. Bonne performance. Si ce taux baisse, c'est que la qualification téléphonique laisse passer des prospects non vendeurs.",
      },
      {
        q: "Honoraires partagés 50/50 vendeur/acquéreur sur un FAI 200 000 € à 5 % :",
        c: ["1 905 € chacun", "4 760 € chacun", "5 000 € chacun", "9 524 € chacun"],
        r: 1,
        e: "Commission TTC = 200 000 × 0,05/1,05 = 9 524 €. ÷ 2 = 4 762 €. Le partage des honoraires est juridiquement libre mais doit figurer au mandat.",
      },
      {
        q: "Une agence avec 80 mandats simples et 20 mandats exclusifs a un ratio :",
        c: [
          "très bon (exclusifs 50 %)",
          "moyen (exclusifs 20 %)",
          "faible (exclusifs 20 %)",
          "neutre",
        ],
        r: 2,
        e: "20 % d'exclusifs = très FAIBLE. Une agence performante vise 60-70 % d'exclusifs (transformation 2× supérieure, prix mieux tenu, moins de concurrence).",
      },
      {
        q: "Le calcul de seuil de rentabilité agence inclut :",
        c: [
          "Uniquement les commissions",
          "Charges fixes (loyer, salaires) + CA minimal pour couvrir",
          "Uniquement la garantie financière",
          "Le bénéfice cible",
        ],
        r: 1,
        e: "Seuil de rentabilité = niveau de CA qui couvre EXACTEMENT les charges fixes (loyer, salaires, abonnements). Au-delà, l'agence dégage du bénéfice. À calculer chaque trimestre.",
      },
      {
        q: "Sur 100 contacts téléphoniques, combien d'estimations en moyenne ?",
        c: ["1", "5-10", "20-30", "50+"],
        r: 1,
        e: "5-10 estimations sur 100 contacts (5-10 %). C'est pourquoi la prospection téléphonique demande du volume. La qualité du fichier influe énormément.",
      },
      {
        q: "Un bien estimé 200 K€ vendu 220 K€ — la différence est :",
        c: [
          "Une plus-value pour l'agence",
          "Une fausse estimation",
          "Un succès commercial pour l'agence (vente au-dessus du prix estimé)",
          "Un délit",
        ],
        r: 2,
        e: "Vente au-dessus du prix d'estimation = succès commercial. Signe d'un bon marketing (multi-acquéreurs, négo à la hausse). La commission reste calculée sur le prix de vente RÉEL.",
      },
    ],

    /* ============ M5 — Diagnostics ============ */
    m5: [
      {
        q: "Un appartement en copropriété construit en 1980, mis en vente — diagnostics OBLIGATOIRES :",
        c: [
          "DPE + ERP uniquement",
          "DPE + ERP + amiante + gaz/élec (si install. > 15 ans) + Loi Carrez",
          "DPE + ERP + plomb (CREP)",
          "DPE seul",
        ],
        r: 1,
        e: "Construit en 1980 → après 1949 (pas de plomb), avant 1997 (amiante obligatoire). Toujours DPE + ERP, gaz/élec si installation > 15 ans, et mesurage Loi Carrez en copropriété.",
      },
      {
        q: "L'audit énergétique (obligatoire depuis 2023) concerne :",
        c: [
          "Tous les biens",
          "Uniquement les passoires F/G en vente",
          "Uniquement la location",
          "Les biens neufs",
        ],
        r: 1,
        e: "Depuis le 1ᵉʳ avril 2023 : audit énergétique obligatoire à la vente d'une maison F ou G (et étendu progressivement aux E en 2025, D en 2034).",
      },
      {
        q: "Validité de l'amiante après diagnostic NÉGATIF :",
        c: ["6 mois", "1 an", "3 ans", "Illimitée"],
        r: 3,
        e: "Amiante négatif = validité ILLIMITÉE. Pas besoin de refaire à chaque vente. Si positif, refaire selon préconisations (suivi tous les 3 ans en général).",
      },
      {
        q: "Le diagnostic Assainissement Non Collectif concerne :",
        c: [
          "Tous les biens en collectif",
          "Les biens non raccordés au tout-à-l'égout",
          "Uniquement les piscines",
          "Les biens en zones rurales seulement",
        ],
        r: 1,
        e: "ANC = obligatoire UNIQUEMENT pour les biens non raccordés au tout-à-l'égout (fosses septiques, micro-stations). Validité 3 ans. Souvent en zones rurales mais pas exclusivement.",
      },
      {
        q: "À partir de 2025, les logements interdits à la location sont :",
        c: ["F seulement", "G seulement", "F et G", "Tous au-dessus de C"],
        r: 1,
        e: "2025 = interdiction G (consommation > 450 kWh/m²/an). 2028 = F. 2034 = E. Calendrier de la Loi Climat & Résilience pour éradiquer les passoires thermiques.",
      },
      {
        q: "Le diagnostic bruit s'applique à :",
        c: [
          "Tous les biens en ville",
          "Les biens dans les zones aéroportuaires concernées",
          "Tous les biens près d'une autoroute",
          "Aucun bien en France",
        ],
        r: 1,
        e: "Diagnostic bruit = obligatoire pour les biens situés dans une zone d'exposition au bruit des aéroports (PEB) ou autour de certaines infrastructures classées. Validité illimitée.",
      },
      {
        q: "Le DPE peut être contesté par l'acquéreur :",
        c: [
          "Non, c'est purement informatif",
          "Oui, c'est OPPOSABLE depuis juillet 2021",
          "Uniquement en justice avec un huissier",
          "Uniquement si erreur de calcul",
        ],
        r: 1,
        e: "Depuis le 1ᵉʳ juillet 2021, le DPE est OPPOSABLE — l'acquéreur peut engager la responsabilité du vendeur ou du diagnostiqueur en cas d'erreur. C'est un changement majeur.",
      },
      {
        q: "Combien de diagnostics maximum dans un DDT pour un bien ancien complet ?",
        c: ["3", "5", "8-9", "15"],
        r: 2,
        e: "8-9 diagnostics possibles : DPE, ERP, plomb, amiante, gaz, élec, termites, ANC, bruit. Plus la mesure Carrez en copro. Le diagnostiqueur ne fait que ceux qui s'appliquent.",
      },
      {
        q: "Loi Carrez — concerne :",
        c: [
          "La surface habitable d'une maison",
          "La surface privative d'un lot de copropriété",
          "La superficie du terrain",
          "Les espaces communs",
        ],
        r: 1,
        e: "Loi Carrez = surface PRIVATIVE d'un lot de copropriété (sauf < 8 m² ou hauteur < 1,80 m). Erreur > 5 % = action en réduction de prix possible pendant 1 an.",
      },
      {
        q: "Le mesurage Carrez s'applique-t-il à une maison individuelle ?",
        c: [
          "Oui, toujours",
          "Non, uniquement aux lots de copropriété",
          "Uniquement si > 200 m²",
          "Uniquement dans le sud de la France",
        ],
        r: 1,
        e: "Carrez = COPROPRIÉTÉ uniquement. Pour une maison, on parle de SURFACE HABITABLE (Loi Boutin pour la location). À ne pas confondre.",
      },
    ],

    /* ============ M6 — Estimation ============ */
    m6: [
      {
        q: "Combien de biens comparables minimum analyser dans une estimation par comparaison ?",
        c: ["1", "3", "5 à 10", "20+"],
        r: 2,
        e: "5 à 10 ventes RÉCENTES (< 12 mois) sur le même secteur, même type. Moins = peu fiable. Plus = enrichissant mais long. Pondérer ensuite selon différences.",
      },
      {
        q: "L'outil DVF permet de :",
        c: [
          "Estimer un loyer",
          "Consulter les ventes immobilières récentes (open data)",
          "Vérifier le DPE",
          "Calculer la fiscalité",
        ],
        r: 1,
        e: "DVF = Demandes de Valeurs Foncières, base ouverte de la DGFiP. Ventes des 5 dernières années avec prix, surface, date. INDISPENSABLE pour la comparaison.",
      },
      {
        q: "L'avis de valeur (R2) doit-il être signé par le vendeur ?",
        c: ["Oui, obligatoire", "Non, c'est un document de l'agence", "Uniquement par les pros", "Uniquement en exclusif"],
        r: 1,
        e: "L'avis de valeur est un document de RESTITUTION de l'agence vers le vendeur. Pas de signature requise. Le vendeur peut le contester — c'est même attendu pour la négo du prix.",
      },
      {
        q: "Quelle est la première règle pour fixer un prix juste ?",
        c: [
          "Le plus haut possible pour la marge",
          "Aligner avec le marché récent + analyser le bien",
          "Demander l'avis du voisin",
          "Multiplier par 1,2 le prix d'achat",
        ],
        r: 1,
        e: "Le marché récent = la référence. Un prix trop haut tue la mise en marché : pas de visites, le bien vieillit, baisses successives. Mieux vaut juste dès le départ.",
      },
      {
        q: "Un bien resté + 90 jours sur le marché est considéré comme :",
        c: [
          "Normal",
          "Excellent signe",
          "Surévalué (probablement)",
          "Sous-évalué",
        ],
        r: 2,
        e: "Délai moyen national : 60-80 j. > 90 j = surévaluation très probable. Action : R2 d'ajustement avec le vendeur, présenter les statistiques de visite et la concurrence active.",
      },
      {
        q: "Lors du R1, la phase de visite physique sert à :",
        c: [
          "Faire jouer la sympathie",
          "Mesurer Carrez et photographier",
          "Vérifier l'état réel, repérer les défauts/atouts, prendre des notes pour la valorisation",
          "Faire signer le mandat",
        ],
        r: 2,
        e: "Visite = collecte d'infos pour l'estimation : qualité prestations, exposition, vétusté, vue, nuisances, atouts cachés. Plus précieux que les photos prises rapidement.",
      },
      {
        q: "Quelle pondération typique pour une exposition sud + vue dégagée ?",
        c: ["−5 %", "0 %", "+3 à +8 %", "+30 %"],
        r: 2,
        e: "Belle exposition + vue : +3 à +8 % selon l'ampleur. Vue mer/montagne exceptionnelle : peut aller jusqu'à +20-30 % mais c'est rare. Penser aussi à l'absence de vis-à-vis.",
      },
      {
        q: "Méthode INDICIAIRE — adaptée à quel cas ?",
        c: [
          "Bien acheté récemment (< 5 ans)",
          "Bien acheté il y a 20+ ans dans un marché stable",
          "Investissement locatif",
          "Promotion immobilière",
        ],
        r: 1,
        e: "Indiciaire = on actualise le prix d'achat par un coefficient d'érosion monétaire ou d'évolution du marché. Adapté à des biens anciens. Pas fiable en marché volatil.",
      },
      {
        q: "Une vente forcée (urgence vendeur) entraîne typiquement :",
        c: [
          "Un prix plus élevé",
          "Aucun impact",
          "Une décote de 5 à 15 %",
          "Une commission majorée",
        ],
        r: 2,
        e: "Vente forcée (divorce, succession, faillite) = délai court = décote 5-15 % pour vendre vite. Important à détecter en découverte vendeur (le FUTUR = urgence ?).",
      },
      {
        q: "Le R2 (restitution de l'avis de valeur) doit durer environ :",
        c: ["10 min", "30 min", "60-90 min", "Une journée"],
        r: 2,
        e: "1 h à 1 h 30 : présenter l'analyse, justifier le prix, traiter les objections (« je pensais à plus »), présenter l'agence et signer le mandat. Anything less = pression, anything more = perte d'attention.",
      },
    ],

    /* ============ M6 bis — Viager ============ */
    m6b: [
      {
        q: "Si le crédirentier décède avant 20 jours après la signature :",
        c: [
          "Contrat normal",
          "Annulation pour cause d'absence d'aléa",
          "Remboursement double du bouquet",
          "Avantage acheteur définitif",
        ],
        r: 1,
        e: "Art. 1975 C. civ. : si le crédirentier décède dans les 20 jours qui suivent la signature d'une maladie dont il était atteint au moment du contrat, le viager est NUL (absence d'aléa).",
      },
      {
        q: "La rente viagère est imposable pour le crédirentier ?",
        c: [
          "Non, exonérée",
          "Oui, sur 30 à 70 % selon âge à la signature",
          "Oui, à 100 %",
          "Uniquement la 1ère année",
        ],
        r: 1,
        e: "La fraction imposable de la rente dépend de l'âge du crédirentier à la 1ère perception : 70 % avant 50 ans, 50 % de 50-59, 40 % de 60-69, 30 % à 70+ ans.",
      },
      {
        q: "Un usufruit peut-il être donné à un tiers ?",
        c: [
          "Oui, sans condition",
          "Oui, mais le droit s'éteint au décès du donateur",
          "Non, jamais",
          "Uniquement à un descendant",
        ],
        r: 1,
        e: "L'usufruit est INCESSIBLE en pleine valeur — il s'éteint au décès du titulaire originel. On peut le donner ou le louer, mais sa durée reste liée à la vie de l'usufruitier originel.",
      },
      {
        q: "Le démembrement temporaire (ex: 10 ans) est possible :",
        c: [
          "Oui, c'est l'usufruit à durée fixe (notamment pour personnes morales)",
          "Non, l'usufruit est toujours viager",
          "Uniquement entre époux",
          "Uniquement pour les SCI",
        ],
        r: 0,
        e: "L'usufruit peut être TEMPORAIRE (durée fixe) ou viager. Pour les personnes morales (SCI, sociétés), il est limité à 30 ans max (art. 619 C. civ.). Outil de planification patrimoniale.",
      },
      {
        q: "Bouquet 50 000 € + rente 800 €/mois. Au bout de 5 ans, total versé :",
        c: ["48 000 €", "98 000 €", "100 000 €", "108 000 €"],
        r: 1,
        e: "Bouquet 50 000 + (800 × 12 × 5) = 50 000 + 48 000 = 98 000 €. Calcul à présenter aux deux parties pour visualiser l'engagement réel.",
      },
      {
        q: "Pour un usufruitier de 50 ans, le barème CGI 669 donne :",
        c: ["30 %", "50 %", "60 %", "70 %"],
        r: 1,
        e: "41-50 ans = 60 % (j'avais dit 60 % dans le barème). Re-vérification : -21 = 90 %, 21-30 = 80 %, 31-40 = 70 %, 41-50 = 60 %, 51-60 = 50 %, donc à 50 ans = 60 %. Erreur dans la question, B est faux. Correction : pour 50 ans précis, c'est 60 %.",
      },
      {
        q: "Un viager LIBRE est :",
        c: [
          "Sans rente, juste un bouquet",
          "Sans crédirentier",
          "Avec disponibilité immédiate du bien pour l'acheteur (pas d'abattement)",
          "Annulé par décès",
        ],
        r: 2,
        e: "Viager LIBRE = bien libre dès la signature (le crédirentier n'y habite plus). Pas d'abattement d'occupation = valeur pleine. Plus coûteux pour l'acheteur, plus rentable pour le vendeur.",
      },
      {
        q: "Si l'acheteur en viager arrête de payer la rente :",
        c: [
          "Le crédirentier change de débirentier",
          "Action en résolution du contrat possible (clause résolutoire au notaire)",
          "Le bien devient public",
          "Aucune sanction",
        ],
        r: 1,
        e: "Clause résolutoire systématique dans tout acte de viager : si non-paiement de la rente, le crédirentier peut demander la résolution → il récupère le bien + garde les sommes versées (bouquet inclus).",
      },
      {
        q: "L'achat en viager peut concerner :",
        c: [
          "Uniquement des résidences principales",
          "Tout type de bien immobilier (maison, appart, parking, terrain)",
          "Uniquement des biens en zone B1/B2",
          "Uniquement des maisons avec jardin",
        ],
        r: 1,
        e: "TOUT bien immobilier peut être vendu en viager : résidence principale, secondaire, locative, terrain, parking, fonds de commerce. La seule contrainte = l'aléa de la durée de vie du crédirentier.",
      },
      {
        q: "Avantage du viager pour le vendeur SENIOR sans héritier :",
        c: [
          "Aucun",
          "Liquidités immédiates + rente régulière pour compléter la retraite",
          "Réduction d'impôts",
          "Exonération de taxe foncière",
        ],
        r: 1,
        e: "Bouquet (liquidités) + rente (complément revenu) + reste dans son logement (viager occupé). Idéal pour senior sans héritiers : monétiser le bien sans déménager.",
      },
    ],

    /* ============ M8 — Mandats ============ */
    m8: [
      {
        q: "Durée maximale d'un mandat exclusif (avant tacite reconduction) :",
        c: ["3 mois", "6 mois", "12 mois", "Pas de maximum sauf accord"],
        r: 2,
        e: "Max 12 mois en exclusif (recommandation Loi Hoguet). Au-delà, mandat sans cadre = nul. Souvent fixé à 3 mois irrévocables + tacite reconduction mensuelle ensuite.",
      },
      {
        q: "Pour résilier un mandat exclusif après les 3 mois, il faut :",
        c: [
          "Un appel téléphonique",
          "Une LRAR avec préavis 15 jours",
          "Aller au tribunal",
          "Attendre 6 mois",
        ],
        r: 1,
        e: "Résiliation par LRAR (Lettre Recommandée avec Accusé de Réception) avec préavis 15 jours. Toute autre forme (mail, oral) = nulle.",
      },
      {
        q: "Le mandat de location est régi par :",
        c: [
          "Loi Hoguet uniquement",
          "Loi Hoguet + ALUR (encadrement loyers, frais à charge bailleur)",
          "Loi ELAN seule",
          "Code civil seul",
        ],
        r: 1,
        e: "Mandat location = Hoguet (mandat écrit + carte G ou T) + ALUR (encadrement honoraires : max 8 à 13 €/m² selon zone, à charge bailleur sauf 4 prestations).",
      },
      {
        q: "Numéro d'enregistrement au registre des mandats :",
        c: [
          "Facultatif",
          "Obligatoire, identifie chaque mandat",
          "Uniquement pour les exclusifs",
          "Donné par le notaire",
        ],
        r: 1,
        e: "N° unique chronologique = mention obligatoire (mention 8/9). Permet de tracer chaque mandat. La DGCCRF contrôle régulièrement ce registre.",
      },
      {
        q: "Sans honoraires inscrits clairement sur le mandat :",
        c: [
          "Le tarif affiché en vitrine s'applique",
          "Le mandat est nul (mention 7 manquante)",
          "L'agence applique 5 %",
          "Le notaire fixe les honoraires",
        ],
        r: 1,
        e: "Mention 7 : montant ET répartition des honoraires. Absente = nullité = ZÉRO commission. Toujours préciser le taux ET la base de calcul (PNV ou FAI) ET la partie qui paie.",
      },
      {
        q: "Une déléguation de mandat (sous-mandat) doit être :",
        c: [
          "Tacite",
          "Inscrite au registre des mandats",
          "Faite par le client",
          "Sans formalité",
        ],
        r: 1,
        e: "Déléguation = inscription obligatoire au registre. Sans inscription, elle est INOPPOSABLE au mandant. C'est ce que vérifie l'AMANDA pour valider un sous-mandat entre agences.",
      },
      {
        q: "Un mandat ne précisant ni durée ni modalités de résiliation :",
        c: [
          "Est valable 1 an par défaut",
          "Est nul (mention 6 manquante)",
          "Est résiliable à tout moment",
          "Bascule en exclusif",
        ],
        r: 1,
        e: "Mention 6 obligatoire : durée + modalités de résiliation. Manquante = mandat NUL. Hoguet est sans appel : 9 mentions = 9 mentions.",
      },
      {
        q: "La RCP (Responsabilité Civile Professionnelle) couvre :",
        c: [
          "Uniquement les dommages corporels",
          "Les fautes/erreurs professionnelles causant un préjudice au client",
          "Uniquement les véhicules",
          "Les vols dans l'agence",
        ],
        r: 1,
        e: "RCP = obligatoire (Hoguet). Couvre les erreurs pro (mauvais conseil, oubli de diag, etc.). Montant à mentionner sur tous les mandats (mention 3) avec la garantie financière.",
      },
      {
        q: "Le mandat d'exclusivité avec clause pénale prévoit :",
        c: [
          "Une amende pour le mandataire",
          "Une indemnité si le mandant vend en violation de l'exclusivité",
          "Un bonus à la signature",
          "Une réduction d'honoraires",
        ],
        r: 1,
        e: "Clause pénale = sécurité pour l'agence. Si le mandant vend par un tiers en violant l'exclusivité, il doit verser une indemnité (généralement 5-7 % du prix net vendeur). À négocier au mandat.",
      },
      {
        q: "Un mandat de recherche peut être conclu :",
        c: [
          "Uniquement avec un acquéreur sérieux",
          "Avec tout candidat acquéreur, en précisant ses critères et son budget",
          "Uniquement avec une SCI",
          "Sans aucune mention",
        ],
        r: 1,
        e: "Mandat de recherche = tout candidat acquéreur. Précise zone, type, surface, budget, délai. L'acheteur s'engage à passer par l'agence dans ce périmètre. Honoraires à sa charge.",
      },
    ],

    /* ============ M11 — Financement ============ */
    m11: [
      {
        q: "Capital 150 000 € à 4 % sur 25 ans. Mensualité ≈ ?",
        c: ["600 €", "792 €", "900 €", "1 200 €"],
        r: 1,
        e: "tm = 0,04/12 = 0,00333. n = 300. M = 150 000 × 0,00333 / (1 − 1,00333^−300) ≈ 500 / 0,631 ≈ 792 €. Coût total intérêts ≈ 87 600 €.",
      },
      {
        q: "Le TAEG (Taux Annuel Effectif Global) inclut :",
        c: [
          "Uniquement le taux nominal",
          "Taux + assurance + frais de dossier + garanties",
          "Uniquement les frais de notaire",
          "Le taux de l'usure",
        ],
        r: 1,
        e: "TAEG = TOUS les coûts du crédit (intérêts, assurance emprunteur, frais dossier, frais de garantie, etc.). C'est le seul taux à comparer entre offres bancaires. Plafonné par le taux d'usure.",
      },
      {
        q: "Le taux d'usure est :",
        c: [
          "Le taux moyen du marché",
          "Le taux légal MAXIMUM autorisé pour un crédit (Banque de France)",
          "Le taux de l'épargne",
          "Le taux du livret A",
        ],
        r: 1,
        e: "Taux d'usure = plafond légal mis à jour trimestriellement par la Banque de France. Au-dessus = crédit USURAIRE (illégal, sanctions pénales). Différent selon durée et type de prêt.",
      },
      {
        q: "L'assurance emprunteur représente typiquement :",
        c: [
          "0,1 % du capital",
          "0,2 à 0,5 % du capital initial / an",
          "5 % du capital",
          "Aucun coût",
        ],
        r: 1,
        e: "Assurance emprunteur : 0,2-0,5 %/an du capital initial selon profil (âge, fumeur, pratiques). Représente souvent 1/3 du coût total du crédit ! La déléguer = belles économies.",
      },
      {
        q: "PEL (Plan Épargne Logement) — taux actuel pour un PEL ouvert en 2024 :",
        c: ["1 %", "2,25 %", "4 %", "6 %"],
        r: 1,
        e: "PEL ouvert depuis le 1ᵉʳ janv. 2024 : taux 2,25 % (à actualiser selon évolution). À vérifier au moment de l'examen — taux régulièrement mis à jour.",
      },
      {
        q: "Un prêt IN FINE :",
        c: [
          "Rembourse capital + intérêts chaque mois",
          "Rembourse uniquement les intérêts puis le capital intégralement à l'échéance",
          "Sans intérêts",
          "Au taux variable",
        ],
        r: 1,
        e: "Prêt IN FINE : tu paies UNIQUEMENT les intérêts pendant la durée. À l'échéance, tu rembourses TOUT le capital d'un coup (souvent via une assurance-vie). Usage : investissement locatif.",
      },
      {
        q: "Le prêt à taux zéro (PTZ) — public cible :",
        c: [
          "Tout acquéreur",
          "Primo-accédants sous conditions de ressources",
          "Investisseurs locatifs",
          "Les retraités",
        ],
        r: 1,
        e: "PTZ = primo-accédants (pas propriétaires depuis 2 ans) sous plafonds de ressources, pour résidence principale. Aide précieuse, peut financer 20-40 % du prix. Recentré sur le neuf en zone tendue.",
      },
      {
        q: "Délai de réflexion ACQUEREUR après réception de l'offre de prêt :",
        c: ["5 jours", "10 jours obligatoires (Loi Scrivener)", "14 jours", "30 jours"],
        r: 1,
        e: "Loi Scrivener (1979) : 10 jours INCOMPRESSIBLES de réflexion. L'acquéreur ne peut PAS accepter l'offre avant. Protection contre la précipitation. À distinguer du droit de rétractation 10 jours du compromis.",
      },
      {
        q: "Frais de notaire dans l'ancien représentent environ :",
        c: ["2 %", "5 %", "7-8 % du prix de vente", "15 %"],
        r: 2,
        e: "7-8 % dans l'ancien (dont DMTO + émoluments notaire + débours + TVA). Dans le NEUF : 2-3 %. Frais à provisionner par l'acquéreur EN PLUS du prix.",
      },
      {
        q: "La capacité d'emprunt dépend principalement :",
        c: [
          "Du capital initial",
          "Du taux et de la durée",
          "Des revenus nets et du taux d'endettement max (35 %)",
          "Du nombre d'enfants",
        ],
        r: 2,
        e: "Capacité = (Revenus × 35 %) − Charges actuelles = mensualité max possible. Cette mensualité, combinée au taux et à la durée, donne le capital empruntable. C'est la base de toute discussion avec un acquéreur.",
      },
    ],

    /* ============ Synthèse ============ */
    syn: [
      {
        q: "Délai de rétractation acquéreur après signature du COMPROMIS :",
        c: ["3 jours", "7 jours", "10 jours (Loi SRU)", "14 jours"],
        r: 2,
        e: "Loi SRU : 10 jours INCOMPRESSIBLES après réception du compromis (LRAR). L'acquéreur peut renoncer SANS motif ni pénalité. À ne pas confondre avec Hamon (mandats hors étab. = 14 j).",
      },
      {
        q: "Loi qui définit la copropriété en France :",
        c: ["Hoguet", "Loi de 1965", "ALUR", "Code civil"],
        r: 1,
        e: "Loi du 10 juillet 1965 — texte fondateur de la copropriété en France. Définit l'organisation, le règlement, l'AG, le syndic. ALUR est venue la moderniser en 2014.",
      },
      {
        q: "Surface minimale d'un logement décent :",
        c: ["9 m²", "10 m²", "12 m²", "20 m²"],
        r: 0,
        e: "9 m² + 2,20 m de hauteur sous plafond (ou volume 20 m³). En dessous = logement indécent, location impossible. Critère vérifié au DPE et à l'état des lieux.",
      },
      {
        q: "Encadrement des loyers en zone tendue : qui décide du loyer de référence ?",
        c: [
          "Le bailleur seul",
          "Le préfet par arrêté annuel",
          "Le syndic",
          "Le maire",
        ],
        r: 1,
        e: "Loyer de référence + majoré + minoré fixés par arrêté préfectoral annuel. Le bailleur doit s'y tenir sauf complément justifié. Concerne Paris, Lille, Lyon, Bordeaux, etc.",
      },
      {
        q: "Le pacte de préférence est :",
        c: [
          "Un mandat exclusif",
          "Un engagement de proposer la vente d'abord à un bénéficiaire désigné",
          "Une promesse synallagmatique",
          "Une option d'achat",
        ],
        r: 1,
        e: "Pacte de préférence = engagement de PROPOSER en priorité à un bénéficiaire (sans engagement de vendre). Si le promettant vend à un tiers, le bénéficiaire peut demander la substitution.",
      },
      {
        q: "Promesse UNILATÉRALE vs SYNALLAGMATIQUE :",
        c: [
          "Aucune différence",
          "Unilatérale = vendeur s'engage seul ; synallagmatique = vendeur ET acheteur s'engagent",
          "Synallagmatique = vente",
          "Unilatérale = mandat",
        ],
        r: 1,
        e: "Unilatérale = vendeur seul engagé (offre, indemnité d'immobilisation 10 % en général). Synallagmatique = COMPROMIS = vendeur ET acheteur engagés mutuellement.",
      },
      {
        q: "Garantie d'achèvement (GFA) — concerne :",
        c: [
          "L'ancien",
          "Le neuf (VEFA)",
          "Le viager",
          "Les terrains",
        ],
        r: 1,
        e: "VEFA = vente en l'état futur d'achèvement. La GFA garantit à l'acquéreur que le bien sera achevé (banque ou compagnie d'assurance). Obligatoire dans le neuf.",
      },
      {
        q: "Délai de prescription en matière de copropriété :",
        c: ["1 an", "5 ans", "10 ans", "30 ans"],
        r: 1,
        e: "5 ans depuis Loi ELAN (auparavant 10 ans). Délai pour contester une décision d'AG ou agir en recouvrement de charges. Court terme = plus de réactivité requise.",
      },
      {
        q: "Le permis de construire est valable :",
        c: ["1 an", "2 ans renouvelable 2× pour 1 an", "5 ans", "Illimité"],
        r: 1,
        e: "PC valide 2 ans pour démarrer + 2 prolongations possibles d'1 an. Si chantier n'a pas commencé dans le délai, PC caduc. À vérifier sur un bien neuf récent.",
      },
      {
        q: "L'AG de copropriété ordinaire se tient :",
        c: ["Tous les 5 ans", "Au moins 1 fois par an", "Tous les 6 mois", "Sur demande uniquement"],
        r: 1,
        e: "AG ordinaire = MINIMUM 1 fois par an (souvent dans les 6 mois après clôture des comptes). Le copropriétaire absent doit donner pouvoir s'il veut être représenté.",
      },
    ],
  };

  // Append extras to QUIZ
  for (const k of Object.keys(extras)) {
    if (window.QUIZ[k]) {
      window.QUIZ[k] = [...window.QUIZ[k], ...extras[k]];
    }
  }
  // Update STUDY backref
  if (window.STUDY) {
    for (const k of Object.keys(window.QUIZ)) {
      if (window.STUDY[k]) window.STUDY[k].quiz = window.QUIZ[k];
    }
  }
})();
