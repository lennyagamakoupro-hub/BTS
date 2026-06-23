/* ============================================
   LENNY — Banque de DEVOIRS (exercices type examen, écrits)
   Inspirés des sujets BTS PI Session 2026 (E4 Droit/Éco, E5 Conduite
   du projet immobilier, E6 Administration des copropriétés), réécrits
   et modifiés (noms, villes, montants, situations) pour l'entraînement.
   Format « cas pratique » : un contexte + des questions à rédiger.
   PAS de corrigé (fourni ultérieurement).
   window.DEVOIRS = { transaction:[...], syndic:[...], droit:[...] }
   Chaque item : { id, tag, titre, duree, coef, contexte:[...],
                   questions:[...], bareme?:[...] }
   ============================================ */
window.DEVOIRS = {

  /* ============================ TRANSACTION (E5) ============================ */
  transaction: [
    {
      id: "tx1", tag: "Estimation", titre: "Estimer un appartement",
      duree: "45 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Vous êtes négociateur au sein de l'agence HORIZON IMMOBILIER (Lyon 6ᵉ). Le couple Ferrand vous confie l'estimation de son appartement en vue d'une vente.",
        "Le bien : un T4 de 92 m² loi Carrez au 4ᵉ étage avec ascenseur, balcon de 7 m², une cave et une place de parking en sous-sol. Secteur recherché, immeuble de 2006, DPE classé C.",
        "Données de marché (ventes comparables récentes, prix net vendeur) : T3 rénové 5 350 €/m² ; T4 même rue 5 100 €/m² ; T4 sans extérieur 4 850 €/m². La place de parking se négocie 18 000 € et la cave ajoute environ 3 000 €. Les honoraires de l'agence sont de 4 % TTC à la charge du vendeur.",
      ],
      questions: [
        "1. Déterminer un prix de vente net vendeur cohérent en justifiant le prix au m² retenu et les pondérations appliquées (étage, extérieur, annexes).",
        "2. Calculer le prix de présentation honoraires inclus (FAI) ainsi que le montant des honoraires de l'agence.",
        "3. Rédiger l'argumentaire que vous présenterez aux vendeurs pour justifier votre estimation et écarter une éventuelle surestimation.",
      ],
    },
    {
      id: "tx2", tag: "Investissement", titre: "Rentabilité locative",
      duree: "40 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Monsieur Alvarez envisage d'acquérir un studio de 24 m² à 168 000 € FAI pour le louer. Les frais d'acquisition (notaire, garantie) représentent 8 % du prix.",
        "Loyer de marché : 690 € charges comprises par mois, dont 70 € de provisions pour charges. Taxe foncière annuelle : 720 €. Charges non récupérables de copropriété : 540 €/an. Assurance PNO et gestion : 9 % des loyers hors charges.",
      ],
      questions: [
        "1. Calculer la rentabilité brute de l'opération. Détailler le calcul.",
        "2. Calculer la rentabilité nette de charges (avant impôt) et commenter l'écart avec la rentabilité brute.",
        "3. Conseiller monsieur Alvarez de manière argumentée sur l'opportunité de cet investissement.",
      ],
    },
    {
      id: "tx3", tag: "Conseil", titre: "Vendre ou louer ?",
      duree: "35 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "La famille Marchetti hérite d'un T2 de 41 m² en centre-ville, libre d'occupation et en bon état. Elle hésite entre trois options : vendre, louer nu ou louer meublé, et vous demande conseil.",
        "Éléments connus : valeur vénale estimée 192 000 € ; loyer nu 720 €/mois ; loyer meublé 880 €/mois (mais rotation plus forte et mobilier à financer ≈ 6 000 €). Les clients disposent d'autres revenus et s'interrogent sur la fiscalité (micro-foncier vs micro-BIC) et sur la souplesse de gestion.",
      ],
      questions: [
        "1. Comparer les trois options sous l'angle du rendement et de la fiscalité (régimes micro-foncier et micro-BIC).",
        "2. Présenter les avantages et les contraintes juridiques de la location meublée par rapport à la location nue (durée du bail, préavis, dépôt de garantie).",
        "3. Formuler une recommandation argumentée adaptée à la situation de la famille Marchetti.",
      ],
    },
    {
      id: "tx4", tag: "Commercialisation", titre: "Annonce conforme",
      duree: "30 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "Vous devez rédiger et publier l'annonce de vente du bien des époux Sorel : maison de 118 m² habitables sur 410 m² de terrain, 4 chambres, garage, à Tassin-la-Demi-Lune. Prix FAI 549 000 €, honoraires 4,5 % TTC charge vendeur. DPE : classe D (consommation 210 kWh/m²/an), GES classe B.",
        "L'annonce sera diffusée sur le site de l'agence et sur un portail national.",
      ],
      questions: [
        "1. Lister l'ensemble des mentions légales obligatoires devant figurer dans l'annonce (loi Hoguet, loi Climat & Résilience, affichage du DPE et des honoraires).",
        "2. Rédiger l'annonce commerciale complète, attractive et conforme.",
        "3. Indiquer les sanctions encourues en cas d'annonce non conforme (DPE manquant, honoraires non affichés).",
      ],
    },
    {
      id: "tx5", tag: "Location", titre: "Choisir un locataire",
      duree: "40 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Vous gérez la mise en location d'un T3 à 980 € charges comprises (dont 90 € de provisions). Trois dossiers se présentent :",
        "• Candidat A : CDI, revenu net mensuel 2 750 €, sans garant. • Candidat B : couple, revenus nets cumulés 3 400 €, un crédit auto de 280 €/mois. • Candidat C : CDD de 10 mois, 2 300 € net, avec garant solidaire (parents, 4 200 € net).",
      ],
      questions: [
        "1. Calculer le taux d'effort de chaque candidat (en intégrant les charges). Présenter les calculs.",
        "2. Analyser la solidité de chaque dossier (stabilité, garanties, reste à vivre).",
        "3. Sélectionner le candidat à retenir et justifier votre choix, en rappelant les pièces qu'il est interdit de demander.",
      ],
    },
    {
      id: "tx6", tag: "Gestion", titre: "Régulariser les charges",
      duree: "35 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Madame Wong est locataire depuis le 1ᵉʳ janvier 2025. Elle a versé 75 € de provisions pour charges par mois sur l'année 2025.",
        "Le décompte annuel de copropriété fait apparaître, pour son lot, 1 040 € de charges dont 880 € récupérables sur le locataire (entretien, eau froide, ascenseur, ordures ménagères) et le reste non récupérable.",
      ],
      questions: [
        "1. Calculer la régularisation des charges de l'année 2025 et indiquer si le solde est en faveur du bailleur ou de la locataire.",
        "2. Ajuster le montant des provisions mensuelles pour 2026 et justifier l'ajustement.",
        "3. Rédiger le courrier de régularisation adressé à la locataire, en précisant les justificatifs à tenir à sa disposition et le délai légal.",
      ],
    },
    {
      id: "tx7", tag: "Mandat", titre: "Sécuriser un mandat",
      duree: "35 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "Monsieur Da Costa souhaite vendre sa maison mais refuse l'exclusivité « pour multiplier les chances ». Vous défendez la signature d'un mandat exclusif.",
        "Vous devez par ailleurs fixer la durée du mandat, les honoraires et les modalités de dénonciation conformes à la loi Hoguet.",
      ],
      questions: [
        "1. Distinguer mandat simple, semi-exclusif et exclusif, et exposer les arguments en faveur de l'exclusivité.",
        "2. Préciser les mentions obligatoires du mandat, sa durée, les conditions de reconduction et les modalités de dénonciation (délai et forme).",
        "3. Expliquer les conséquences juridiques d'un mandat sans limitation de durée ou dépourvu de numéro de registre.",
      ],
    },
    {
      id: "tx8", tag: "Avant-contrat", titre: "Offre d'achat",
      duree: "30 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "Les époux Lindqvist se portent acquéreurs d'un appartement affiché 318 000 € FAI. Ils proposent 305 000 € et financeront 240 000 € par emprunt au taux de 3,40 % (hors assurance), le solde sur apport personnel.",
        "Vous préparez l'offre d'achat à présenter au vendeur.",
      ],
      questions: [
        "1. Rédiger l'offre d'achat en y intégrant les mentions essentielles (prix, durée de validité, désignation du bien, financement).",
        "2. Préciser les conditions suspensives à prévoir et leur intérêt pour l'acquéreur.",
        "3. Expliquer le délai de rétractation SRU dont bénéficie l'acquéreur et son point de départ.",
      ],
    },
  ],

  /* ============================== SYNDIC (E6) ============================== */
  syndic: [
    {
      id: "sy1", tag: "Charges", titre: "Répartir les charges",
      duree: "40 min", coef: 6, difficulte: "Difficile",
      contexte: [
        "La copropriété LES TILLEULS est régie par la loi du 10 juillet 1965. Madame Renaud achète le lot 12 (un T3 au 2ᵉ étage) à monsieur Forestier. La vente est signée le 15 mars 2026.",
        "Le lot 12 représente 145/10 000ᵉ pour les charges générales et 60/3 000ᵉ pour les charges spéciales d'ascenseur. Le budget prévisionnel annuel voté est de 96 000 € (charges générales) et de 18 000 € (ascenseur).",
      ],
      questions: [
        "1. Distinguer charges générales et charges spéciales, et expliquer à madame Renaud à quelles charges elle devra participer.",
        "2. Présenter la répartition des charges applicable à la vente Forestier / Renaud (qui paie quoi entre vendeur et acquéreur selon la date d'exigibilité des appels de fonds).",
        "3. Calculer le montant annuel des charges courantes incombant au lot 12 (charges générales + ascenseur).",
      ],
    },
    {
      id: "sy2", tag: "Budget", titre: "Appels de fonds",
      duree: "35 min", coef: 6, difficulte: "Difficile",
      contexte: [
        "Pour la copropriété LES TILLEULS, l'assemblée générale a voté un budget prévisionnel de 96 000 € appelé par trimestre. Elle a également voté la constitution du fonds de travaux ALUR (loi du 24 mars 2014) à hauteur de 5 % du budget prévisionnel.",
        "Le lot de madame Renaud représente 145/10 000ᵉ des charges générales.",
      ],
      questions: [
        "1. Calculer le montant de chaque appel de fonds trimestriel pour le lot de madame Renaud.",
        "2. Calculer la cotisation annuelle au fonds de travaux pour ce lot et rappeler son régime (caractère obligatoire, sort en cas de vente).",
        "3. Indiquer les conséquences d'un défaut de paiement d'un appel de fonds (procédure, mise en demeure, exigibilité).",
      ],
    },
    {
      id: "sy3", tag: "Assemblée", titre: "Majorités en AG",
      duree: "40 min", coef: 6, difficulte: "Difficile",
      contexte: [
        "Lors de l'AG de la résidence LES VIGNES, plusieurs résolutions sont mises au vote : (a) l'approbation des comptes, (b) des travaux d'isolation de la façade, (c) l'installation de bornes de recharge pour véhicules électriques, (d) la modification du règlement de copropriété pour fermer un passage commun.",
        "Un copropriétaire conteste l'adoption d'une résolution et menace d'une action en justice.",
      ],
      questions: [
        "1. Indiquer, pour chaque résolution, la règle de majorité applicable (art. 24, 25, 26, 26-1 de la loi de 1965) en justifiant.",
        "2. Expliquer le mécanisme de la « passerelle » de l'article 25-1 lorsqu'une résolution n'atteint pas la majorité de l'article 25.",
        "3. Préciser le délai et les conditions dans lesquels un copropriétaire opposant ou défaillant peut contester une résolution.",
      ],
    },
    {
      id: "sy4", tag: "Conseil syndical", titre: "Le conseil syndical",
      duree: "30 min", coef: 6, difficulte: "Intermédiaire",
      contexte: [
        "Le conseil syndical de la copropriété LES CHAIX s'interroge sur ses pouvoirs : peut-il décider seul de certaines dépenses, contrôler le syndic, et engager la mise en concurrence de ce dernier ?",
      ],
      questions: [
        "1. Définir le rôle et les missions du conseil syndical et préciser comment ses membres sont désignés.",
        "2. Expliquer l'étendue et les limites de ses pouvoirs (assistance, contrôle, avis, délégation éventuelle).",
        "3. Présenter l'obligation de mise en concurrence du syndic et les cas de dispense.",
      ],
    },
    {
      id: "sy5", tag: "Personnel", titre: "Embaucher un gardien",
      duree: "35 min", coef: 6, difficulte: "Difficile",
      contexte: [
        "La copropriété LES CHAIX souhaite remplacer son employé d'immeuble. Le conseil syndical propose d'embaucher un gardien au coefficient hiérarchique 255 (catégorie B) de la convention collective nationale des gardiens, concierges et employés d'immeubles.",
        "Données conventionnelles (valeurs fictives d'entraînement) : valeur du point catégorie B = 3,90 € ; valeur fixe mensuelle = 690 € ; logement de fonction évalué à 320 €/mois.",
      ],
      questions: [
        "1. Calculer le salaire global brut mensuel contractuel du futur employé (coefficient × valeur du point + valeur fixe).",
        "2. Indiquer si le conseil syndical est compétent pour décider seul de cette embauche, ou si l'assemblée générale doit se prononcer.",
        "3. Préciser les obligations de l'employeur (copropriété représentée par le syndic) à l'embauche d'un salarié.",
      ],
    },
    {
      id: "sy6", tag: "Logement social", titre: "Attribuer un logement social",
      duree: "40 min", coef: 6, difficulte: "Difficile",
      contexte: [
        "L'E.S.H. BIENÊTRE doit attribuer un T3 dont le loyer est de 540 € + 95 € de charges. Le dossier de madame Carrège est étudié : revenu mensuel net du foyer 1 760 €, APL estimée 210 €, autres charges fixes (crédit, pension) 180 €/mois. Le foyer compte deux enfants.",
      ],
      questions: [
        "1. Calculer le taux d'effort net de madame Carrège (loyer + charges − APL, rapporté aux ressources).",
        "2. Calculer le reste à vivre du foyer et conclure sur la soutenabilité de la dépense de logement.",
        "3. Expliquer le rôle de la commission d'attribution des logements (CALEOL) et les critères de priorité.",
      ],
    },
    {
      id: "sy7", tag: "Impayés", titre: "Charges impayées",
      duree: "30 min", coef: 6, difficulte: "Intermédiaire",
      contexte: [
        "Un copropriétaire de la résidence LES VIGNES n'a pas réglé ses appels de fonds depuis trois trimestres. Le syndic doit engager le recouvrement.",
      ],
      questions: [
        "1. Décrire la procédure de recouvrement des charges impayées (mise en demeure, procédure accélérée, exigibilité du budget prévisionnel restant).",
        "2. Présenter les garanties dont dispose le syndicat des copropriétaires (privilège immobilier spécial, hypothèque légale).",
        "3. Expliquer les conséquences éventuelles sur la vente du lot du débiteur (opposition du syndic sur le prix).",
      ],
    },
    {
      id: "sy8", tag: "Copropriété", titre: "Parties communes",
      duree: "30 min", coef: 6, difficulte: "Intermédiaire",
      contexte: [
        "Le règlement de copropriété de la résidence LES VIGNES distingue parties communes générales, parties communes spéciales et parties privatives. Un copropriétaire souhaite annexer un palier qu'il estime être à son usage exclusif.",
      ],
      questions: [
        "1. Définir et distinguer parties communes générales, parties communes spéciales et parties privatives.",
        "2. Expliquer la notion de partie commune à jouissance privative et ses limites.",
        "3. Indiquer la procédure et la majorité requises pour qu'un copropriétaire puisse acquérir ou annexer une partie commune.",
      ],
    },
  ],

  /* =============================== DROIT (E4) =============================== */
  droit: [
    {
      id: "dr1", tag: "Famille / Succession", titre: "Régime matrimonial & succession",
      duree: "45 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Madame Giner, 58 ans, est veuve. Elle était mariée sous le régime légal de la communauté réduite aux acquêts. Le couple a eu deux enfants, Christophe (30 ans) et Mathilde (20 ans). Aucun testament n'a été rédigé.",
        "Le patrimoine se compose notamment d'une résidence principale et de deux biens locatifs acquis pendant le mariage.",
      ],
      questions: [
        "1. Expliquer les conséquences du régime de la communauté réduite aux acquêts sur la composition du patrimoine au décès de l'époux.",
        "2. Déterminer les droits du conjoint survivant et des enfants dans la succession (réserve héréditaire, quotité disponible, options du conjoint).",
        "3. Préciser, en suivant la méthodologie du cas pratique, la part revenant à chacun.",
      ],
    },
    {
      id: "dr2", tag: "Transmission", titre: "Donation d'usufruit",
      duree: "40 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Madame Giner souhaite aider sa fille Mathilde, étudiante aux ressources limitées, tout en préservant son patrimoine. Elle s'interroge sur la donation temporaire d'usufruit d'un studio dont elle est pleine propriétaire.",
        "Elle ne veut pas créer de conflit avec son fils et s'inquiète des conséquences au moment de sa propre succession.",
      ],
      questions: [
        "1. Décrire le mécanisme de la donation temporaire d'usufruit (démembrement, durée, effets) et son intérêt dans cette situation.",
        "2. Expliquer les conséquences de cette donation au moment de la succession de madame Giner (rapport, réintégration de l'usufruit).",
        "3. Préciser les formalités nécessaires à sa mise en œuvre.",
      ],
    },
    {
      id: "dr3", tag: "Baux d'habitation", titre: "Congé pour reprise",
      duree: "40 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Madame Giner loue un appartement T3 à monsieur Dassieu, entré dans les lieux le 15 décembre 2011. Le locataire, âgé de 68 ans et retraité, dispose de ressources modestes. La bailleresse souhaite reprendre le logement pour y loger son fils.",
      ],
      questions: [
        "1. Rappeler les conditions de forme et de délai du congé pour reprise (loi du 6 juillet 1989, art. 15).",
        "2. Analyser la protection particulière dont bénéficie le locataire âgé (art. 15 III) et les conditions pour l'écarter (offre de relogement, âge et ressources du bailleur).",
        "3. Conclure, en suivant la méthodologie du cas pratique, sur la possibilité pour madame Giner de mettre fin au bail.",
      ],
    },
    {
      id: "dr4", tag: "Économie / Réglementation", titre: "Meublés de tourisme",
      duree: "35 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "Dans une grande ville en zone tendue, la part des locations de courte durée (type Airbnb) progresse fortement tandis que la vacance augmente. La municipalité met en place des mesures de régulation.",
      ],
      questions: [
        "1. Analyser l'impact du développement de la location de courte durée et de la vacance sur le marché locatif d'une zone tendue.",
        "2. Présenter les mesures que peut prendre une commune pour réguler les meublés de tourisme (changement d'usage, compensation, numéro d'enregistrement, plafond de nuitées).",
        "3. Expliquer le mécanisme de l'encadrement des loyers et son objectif.",
      ],
    },
    {
      id: "dr5", tag: "Méthodologie", titre: "Litige locatif",
      duree: "35 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "Un locataire refuse de quitter les lieux à l'issue d'un congé qu'il estime irrégulier. Le bailleur vous consulte. Vous devez traiter le litige selon la méthodologie du cas pratique.",
      ],
      questions: [
        "1. Qualifier juridiquement les faits et identifier le ou les problèmes de droit posés.",
        "2. Énoncer la règle de droit applicable (majeure) puis l'appliquer aux faits de l'espèce (mineure).",
        "3. Conclure de manière argumentée sur la solution du litige.",
      ],
    },
    {
      id: "dr6", tag: "Vente immobilière", titre: "Avant-contrat & conditions",
      duree: "35 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "Un compromis de vente est signé entre un vendeur et un acquéreur qui finance son achat par un prêt. L'acquéreur s'interroge sur la portée de son engagement et sur les protections dont il dispose.",
      ],
      questions: [
        "1. Distinguer la promesse unilatérale de vente du compromis (promesse synallagmatique) et leurs effets respectifs.",
        "2. Présenter la condition suspensive d'obtention de prêt (loi Scrivener) : portée, délai, conséquences de la non-réalisation.",
        "3. Expliquer le délai de rétractation de l'article L.271-1 du CCH (délai SRU) : bénéficiaires, durée, point de départ.",
      ],
    },
    {
      id: "dr7", tag: "Droit des contrats", titre: "Vices du consentement",
      duree: "35 min", coef: 4, difficulte: "Difficile",
      contexte: [
        "Un acquéreur découvre, après la vente, que le vendeur lui a dissimulé une servitude et une infestation. Il s'estime trompé et envisage de remettre en cause le contrat.",
      ],
      questions: [
        "1. Rappeler les conditions de validité du contrat (art. 1128 du Code civil).",
        "2. Caractériser les vices du consentement susceptibles d'être invoqués (erreur, dol, violence) et préciser leurs conditions.",
        "3. Distinguer nullité relative et nullité absolue, et préciser laquelle s'applique ici ainsi que ses effets.",
      ],
    },
    {
      id: "dr8", tag: "Propriété", titre: "Indivision & démembrement",
      duree: "30 min", coef: 4, difficulte: "Intermédiaire",
      contexte: [
        "À la suite d'une succession, trois héritiers se retrouvent propriétaires indivis d'une maison. L'un d'eux souhaite vendre, les autres veulent conserver le bien. Par ailleurs, une partie du bien fait l'objet d'un usufruit au profit du conjoint survivant.",
      ],
      questions: [
        "1. Définir l'indivision et exposer les règles de gestion et de majorité applicables aux actes d'administration et de disposition.",
        "2. Expliquer le principe « nul n'est contraint de rester dans l'indivision » et ses conséquences.",
        "3. Distinguer les droits de l'usufruitier et du nu-propriétaire (usus, fructus, abusus) et leurs obligations respectives.",
      ],
    },
  ],

};

/* Libellés des pôles pour l'en-tête du sujet (épreuve BTS correspondante) */
window.DEVOIRS_META = {
  transaction: { label: "Transaction", epreuve: "E5 — Conduite et présentation d'activités professionnelles", accent: "#c95636" },
  syndic:      { label: "Syndic & Copropriété", epreuve: "E6 — Administration des copropriétés et de l'habitat social", accent: "#3d6b48" },
  droit:       { label: "Droit & Économie", epreuve: "E4 — Environnement économique et juridique", accent: "#7a6cc4" },
};
