// ============================================
// LENNY — Quiz extras (vague 2) : modules Transaction + Synthèse
// Porte chaque module à ~30 questions. Format : { q, c[], r, e }
// Types : cas pratiques, calculs, définitions, vrai/faux, lois & dates.
// ============================================
(function () {
  if (!window.QUIZ) return;

  const extras2 = {

    /* ============ M1 — Accueil & Découverte ============ */
    m1: [
      { q: "Un client : « Je veux du rendement, le meilleur prix au m². » Mobile SONCAS dominant ?", c: ["Sécurité", "Confort", "Argent", "Nouveauté"], r: 2, e: "Le vocabulaire « rendement / prix » trahit le mobile ARGENT : argumente ROI, frais maîtrisés, plus-value potentielle." },
      { q: "« C'est le tout dernier programme, jamais habité » répond au mobile :", c: ["Nouveauté", "Sécurité", "Sympathie", "Orgueil"], r: 0, e: "NOUVEAUTÉ : le client est sensible au neuf, à l'innovation, au jamais-vu (programme neuf, domotique, dernière norme)." },
      { q: "Le « A » de DIVAS correspond à :", c: ["Amabilité", "Articulation", "Attention", "Accueil"], r: 1, e: "DIVAS = Débit · Intonation · Volume · Articulation · Sourire. Au téléphone, seule la voix porte le message." },
      { q: "« Si je comprends bien, vous cherchez surtout à sécuriser votre retraite ? » est une question :", c: ["ouverte", "miroir", "inductive", "fermée"], r: 2, e: "Question INDUCTIVE : elle oriente / reformule pour faire valider une hypothèse au client." },
      { q: "Vrai ou faux : une question ouverte appelle une réponse par oui ou non.", c: ["Vrai", "Faux", "Seulement au téléphone", "Seulement à l'écrit"], r: 1, e: "FAUX. La question ouverte (« Comment… ? », « Pourquoi… ? ») engage l'expression libre ; c'est la fermée qui appelle un oui/non." },
      { q: "Un client insiste sur « le standing, l'adresse prestigieuse ». Mobile :", c: ["Confort", "Orgueil", "Argent", "Écologie"], r: 1, e: "ORGUEIL : besoin de reconnaissance, de statut. Valorise le prestige, l'exclusivité, le quartier prisé." },
      { q: "Dans la règle des 4×20, les « 20 premiers gestes » renvoient à :", c: ["la durée de la visite", "l'attitude et le langage corporel d'entrée", "le nombre de biens montrés", "la distance de sécurité"], r: 1, e: "Les 20 premiers gestes = la posture, la démarche, la poignée de main : le non-verbal qui s'imprime dès l'arrivée." },
      { q: "Le « E » de SONCAS(E) a été ajouté pour le mobile :", c: ["Économie", "Émotion", "Écologie", "Esthétique"], r: 2, e: "Le E = ÉCOLOGIE : sensibilité au DPE, aux économies d'énergie, aux matériaux éco-responsables." },
      { q: "« Trop cher… ? » répété au client est une question :", c: ["fermée", "miroir", "inductive", "ouverte"], r: 1, e: "Question MIROIR : on renvoie le mot-clé du client pour qu'il développe, sans le brusquer." },
      { q: "Un client chaleureux qui veut « se sentir en confiance avec son agent » relève du mobile :", c: ["Sympathie", "Sécurité", "Confort", "Orgueil"], r: 0, e: "SYMPATHIE : la relation prime. Sois authentique, à l'écoute, crée du lien — la décision passe par l'affect." },
    ],

    /* ============ M2 — Entreprises & Statuts ============ */
    m2: [
      { q: "Le capital social minimum d'une SA est de :", c: ["1 €", "7 500 €", "37 000 €", "225 000 €"], r: 2, e: "La SA exige 37 000 € de capital minimum. La SARL et la SAS n'ont pas de minimum légal (1 € possible)." },
      { q: "La responsabilité de l'entrepreneur individuel (EI) est :", c: ["limitée aux apports", "illimitée", "limitée au capital", "nulle"], r: 1, e: "En EI, le patrimoine de l'entrepreneur est engagé (responsabilité illimitée), même si la loi de 2022 protège désormais le patrimoine personnel." },
      { q: "Par défaut, une SAS est imposée à :", c: ["l'IR", "l'IS", "la flat tax", "la TVA seule"], r: 1, e: "La SAS relève de l'impôt sur les sociétés (IS) par défaut, avec une option possible pour l'IR sous conditions." },
      { q: "La carte professionnelle « S » de la loi Hoguet concerne :", c: ["les transactions", "la gestion", "le syndic de copropriété", "le sous-seing"], r: 2, e: "T = Transactions · G = Gestion · S = Syndic de copropriété." },
      { q: "La loi ALUR date de :", c: ["1970", "2009", "2014", "2018"], r: 2, e: "Loi ALUR = 24 mars 2014 : encadrement des loyers, bail type, formation continue obligatoire." },
      { q: "Le bail mobilité (loi ELAN) a une durée de :", c: ["1 à 10 mois", "3 ans", "6 ans", "9 ans"], r: 0, e: "Le bail mobilité dure 1 à 10 mois, non renouvelable et sans dépôt de garantie." },
      { q: "Un agent commercial NE peut PAS :", c: ["prospecter", "négocier un mandat", "encaisser des fonds", "présenter un bien"], r: 2, e: "Interdictions de l'agent commercial : encaisser des fonds, rédiger un compromis, donner des conseils juridiques." },
      { q: "La formation continue imposée par ALUR est de :", c: ["14 h/an", "42 h sur 3 ans", "100 h/an", "aucune"], r: 1, e: "42 heures sur 3 ans (soit 14 h/an en moyenne) pour renouveler la carte professionnelle." },
      { q: "Vrai ou faux : un agent commercial peut rédiger lui-même le compromis de vente.", c: ["Vrai", "Faux", "Oui avec l'accord du client", "Oui en zone tendue"], r: 1, e: "FAUX. La rédaction d'actes juridiques (compromis) est interdite à l'agent commercial — c'est le titulaire de la carte ou le notaire." },
    ],

    /* ============ M3 — La Prospection ============ */
    m3: [
      { q: "Dans SMART, le « T » signifie :", c: ["Tactique", "Temporel (délimité dans le temps)", "Total", "Théorique"], r: 1, e: "SMART = Spécifique · Mesurable · Atteignable · Réaliste · Temporel : un objectif doit avoir une échéance." },
      { q: "La zone primaire (de chalandise) représente environ :", c: ["15 % du CA", "50 % du CA", "80 % du CA", "5 % du CA"], r: 2, e: "La zone primaire concentre ≈ 80 % du CA potentiel : c'est là qu'on concentre l'effort de prospection." },
      { q: "Le retour moyen attendu d'un boîtage de flyers est de :", c: ["1 pour 100", "1 pour 1 000", "1 pour 50", "1 pour 10"], r: 1, e: "≈ 1 retour pour 1 000 flyers distribués. Le boîtage est un travail de volume et de répétition." },
      { q: "Le coût indicatif d'un panneau « À vendre » est de :", c: ["1 à 3 €", "7 à 15 €", "30 à 50 €", "100 €"], r: 1, e: "Entre 7 et 15 € l'unité. « Le panneau appelle le panneau » : c'est un outil de notoriété locale." },
      { q: "La pige consiste à :", c: ["distribuer des flyers", "appeler les annonces de particuliers", "tenir une permanence", "poser des panneaux"], r: 1, e: "La pige = repérer et appeler les annonces de particuliers (PAP) pour décrocher un mandat." },
      { q: "Le porte-à-porte relève de la méthode :", c: ["statique", "dynamique", "digitale", "prospective"], r: 1, e: "Méthode DYNAMIQUE : l'agent va physiquement au contact (porte-à-porte, contact terrain)." },
      { q: "Une session d'îlotage efficace ne devrait pas dépasser :", c: ["30 min", "2 à 3 heures", "une journée", "1 heure pile"], r: 1, e: "2 à 3 heures maximum : au-delà, l'attention et la qualité du contact chutent." },
      { q: "Le géofarming et les réseaux sociaux relèvent de la méthode :", c: ["statique", "dynamique", "digitale", "prospective"], r: 2, e: "Méthode DIGITALE : CRM, réseaux sociaux, géofarming, campagnes ciblées en ligne." },
      { q: "Une permanence en vitrine d'agence est une prospection :", c: ["statique", "dynamique", "digitale", "prospective"], r: 0, e: "Méthode STATIQUE : on attend le client (vitrine, permanence, salon) plutôt que d'aller à lui." },
      { q: "Le phoning se distingue de la pige car il s'appuie sur :", c: ["un fichier constitué", "les annonces PAP", "le porte-à-porte", "les panneaux"], r: 0, e: "Le phoning = appels depuis un fichier déjà constitué (prospects, anciens contacts), là où la pige part des annonces de particuliers." },
    ],

    /* ============ M4 — Objectifs & Ratios ============ */
    m4: [
      { q: "Un bien est en FAI à 318 000 € avec 6 % d'honoraires. Le prix net vendeur est :", c: ["298 920 €", "300 000 €", "302 100 €", "299 000 €"], r: 1, e: "Net = FAI ÷ 1,06 = 318 000 ÷ 1,06 = 300 000 €. Les honoraires sont 18 000 €." },
      { q: "Sur 50 mandats rentrés et 20 ventes, le taux de transformation est :", c: ["20 %", "30 %", "40 %", "50 %"], r: 2, e: "(20 ÷ 50) × 100 = 40 %." },
      { q: "Prix affiché 1 500 € TTC (TVA 20 %). Le montant HT est :", c: ["1 200 €", "1 250 €", "1 300 €", "1 280 €"], r: 1, e: "HT = TTC ÷ 1,20 = 1 500 ÷ 1,20 = 1 250 €." },
      { q: "CA annuel 240 000 € pour 8 ventes : la commission moyenne est :", c: ["24 000 €", "30 000 €", "32 000 €", "20 000 €"], r: 1, e: "Commission moyenne = CA ÷ nombre de ventes = 240 000 ÷ 8 = 30 000 €." },
      { q: "Coût total de prospection 5 000 € pour 10 mandats : le coût d'acquisition d'un mandat est :", c: ["250 €", "500 €", "1 000 €", "50 €"], r: 1, e: "5 000 ÷ 10 = 500 € par mandat rentré." },
      { q: "En moyenne, combien de visites pour conclure une vente ?", c: ["≈ 5", "≈ 10", "≈ 15", "≈ 30"], r: 2, e: "Environ 15 visites en moyenne pour aboutir à une vente." },
      { q: "FAI 210 000 € avec 5 % d'honoraires. Le net vendeur est :", c: ["199 500 €", "200 000 €", "201 500 €", "205 000 €"], r: 1, e: "Net = 210 000 ÷ 1,05 = 200 000 €." },
      { q: "Le taux de transformation mesure le passage de :", c: ["visite à offre", "mandat à vente", "appel à RDV", "estimation à mandat"], r: 1, e: "Taux de transfo = (nb ventes ÷ nb mandats) × 100 : l'efficacité à convertir un mandat en vente signée." },
      { q: "Un prix de 1 080 € TTC (TVA 20 %) correspond à un HT de :", c: ["860 €", "900 €", "920 €", "950 €"], r: 1, e: "HT = 1 080 ÷ 1,20 = 900 €." },
      { q: "En moyenne, combien d'acquéreurs sont travaillés par vente ?", c: ["1", "≈ 3", "≈ 8", "≈ 15"], r: 1, e: "≈ 3 acquéreurs travaillés en moyenne pour une vente conclue." },
    ],

    /* ============ M5 — Diagnostics ============ */
    m5: [
      { q: "Le diagnostic amiante est obligatoire pour les biens dont le permis est antérieur au :", c: ["1er janvier 1949", "1er juillet 1997", "1er janvier 2011", "1er juillet 2021"], r: 1, e: "Amiante : permis de construire délivré avant le 1er juillet 1997." },
      { q: "Les diagnostics gaz et électricité deviennent obligatoires quand l'installation a plus de :", c: ["5 ans", "10 ans", "15 ans", "25 ans"], r: 2, e: "Installation de plus de 15 ans → diagnostics gaz et électricité obligatoires." },
      { q: "La durée de validité du DPE est de :", c: ["6 mois", "3 ans", "10 ans", "illimitée"], r: 2, e: "Le DPE est valable 10 ans (sauf nouvelle réglementation rendant un ancien DPE caduc)." },
      { q: "En vente, le diagnostic gaz est valable :", c: ["6 mois", "1 an", "3 ans", "10 ans"], r: 2, e: "Validité 3 ans en vente (6 ans en location)." },
      { q: "Les deux diagnostics TOUJOURS obligatoires, pour tout bien, sont :", c: ["DPE + amiante", "DPE + ERP", "plomb + ERP", "gaz + électricité"], r: 1, e: "DPE + ERP : toujours obligatoires, en vente comme en location, sans condition d'âge du bien." },
      { q: "Le diagnostic plomb porte le sigle officiel :", c: ["DDT", "CREP", "ERP", "DPE"], r: 1, e: "CREP = Constat de Risque d'Exposition au Plomb, pour les biens construits avant 1949." },
      { q: "Vrai ou faux : le DPE est opposable depuis le 1er juillet 2021.", c: ["Vrai", "Faux", "Depuis 2011", "Depuis 2014"], r: 0, e: "VRAI. Depuis le 1er juillet 2021, le DPE est opposable : le propriétaire engage sa responsabilité, comme pour l'amiante ou le plomb." },
      { q: "Une maison dont le permis date de 1985 : l'amiante est-il obligatoire ?", c: ["Non, postérieure à 1949", "Oui, permis avant le 1/7/1997", "Seulement en location", "Seulement si > 200 m²"], r: 1, e: "Oui : le permis (1985) est antérieur au 1er juillet 1997, donc diagnostic amiante obligatoire." },
      { q: "La durée de validité de l'ERP est de :", c: ["6 mois", "1 an", "3 ans", "10 ans"], r: 0, e: "L'ERP (État des Risques et Pollutions) n'est valable que 6 mois." },
      { q: "Le DDT désigne :", c: ["le Délai De Transaction", "le Dossier de Diagnostics Techniques", "le Document De Travaux", "la Déclaration De Travaux"], r: 1, e: "DDT = Dossier de Diagnostics Techniques : il regroupe tous les diagnostics applicables au bien." },
    ],

    /* ============ M6 — Estimation ============ */
    m6: [
      { q: "La méthode par comparaison repose sur la formule :", c: ["loyer annuel ÷ taux", "prix moyen au m² × surface", "coût du sol + construction", "loyer × 10"], r: 1, e: "Comparaison = prix moyen au m² du secteur × surface du bien (méthode de référence fiscale et juridique)." },
      { q: "Un bien rapporte 12 000 € de loyer annuel, taux de capitalisation 4 %. Sa valeur est :", c: ["240 000 €", "300 000 €", "360 000 €", "120 000 €"], r: 1, e: "Capitalisation = loyer annuel ÷ taux = 12 000 ÷ 0,04 = 300 000 €." },
      { q: "Un appartement en rez-de-chaussée subit une pondération pouvant atteindre :", c: ["+10 %", "−30 %", "−5 %", "+30 %"], r: 1, e: "Le RDC peut être pondéré jusqu'à −30 % (vis-à-vis, bruit, sécurité, luminosité)." },
      { q: "La présence d'un ascenseur pondère la valeur d'environ :", c: ["+1 à 2 %", "+10 %", "−5 %", "+20 %"], r: 0, e: "Ascenseur : +1 à 2 % (effet plus marqué dans les étages élevés)." },
      { q: "La méthode retenue par le fisc et les juridictions est :", c: ["la capitalisation", "le compte à rebours", "la comparaison", "l'indiciaire"], r: 2, e: "La méthode par comparaison fait référence pour l'administration fiscale et les tribunaux." },
      { q: "Combien de méthodes d'estimation sont au programme ?", c: ["3", "4", "6", "8"], r: 2, e: "6 méthodes : comparaison · capitalisation · sol + construction · indiciaire · coûts · compte à rebours." },
      { q: "Pour un investisseur locatif, on privilégie la méthode :", c: ["par comparaison", "par capitalisation", "indiciaire", "par les coûts"], r: 1, e: "La capitalisation part du rendement (loyer ÷ taux) : pertinente pour un bien destiné à la location." },
      { q: "La découverte vendeur explore trois temps :", c: ["hier, aujourd'hui, demain", "passé, présent, futur", "achat, gestion, revente", "prix, délai, mandat"], r: 1, e: "Les 3 temps : son PASSÉ (acquisition), son PRÉSENT (motivation), son FUTUR (projet). Base de l'argumentaire." },
      { q: "La méthode du compte à rebours est surtout utilisée par :", c: ["les notaires", "les promoteurs", "les banques", "les syndics"], r: 1, e: "Le compte à rebours (charge foncière) sert aux promoteurs : on part du prix de sortie pour remonter au prix du terrain." },
      { q: "Un bien rapporte 9 000 €/an, taux de capitalisation 5 %. Sa valeur est :", c: ["150 000 €", "180 000 €", "200 000 €", "90 000 €"], r: 1, e: "9 000 ÷ 0,05 = 180 000 €." },
    ],

    /* ============ M6b — Viager & Démembrement ============ */
    m6b: [
      { q: "Le crédirentier est :", c: ["l'acheteur", "le vendeur", "le notaire", "la banque"], r: 1, e: "Le crédirentier = le VENDEUR ; il perçoit la rente viagère jusqu'à son décès." },
      { q: "Le débirentier est :", c: ["le vendeur", "l'acheteur", "l'usufruitier", "le syndic"], r: 1, e: "Le débirentier = l'ACHETEUR ; il verse le bouquet puis la rente." },
      { q: "Le bouquet correspond à :", c: ["la rente mensuelle", "la somme versée comptant à la vente", "les frais de notaire", "la valeur d'usage"], r: 1, e: "Le bouquet est le capital payé comptant le jour de la vente (≈ 20 à 30 % de la valeur)." },
      { q: "Le bouquet représente en général :", c: ["5 à 10 %", "20 à 30 %", "50 %", "70 %"], r: 1, e: "Environ 20 à 30 % de la valeur du bien ; le reste est converti en rente." },
      { q: "L'usufruit réunit :", c: ["usus + abusus", "usus + fructus", "fructus + abusus", "les trois"], r: 1, e: "Usufruit = usus (utiliser) + fructus (percevoir les revenus). Il manque l'abusus." },
      { q: "La nue-propriété correspond à :", c: ["l'usus", "le fructus", "l'abusus", "l'usufruit"], r: 2, e: "Nue-propriété = abusus seul : le droit de disposer, sans pouvoir occuper ni louer." },
      { q: "Dans un démembrement, les gros travaux sont à la charge :", c: ["de l'usufruitier", "du nu-propriétaire", "du locataire", "du syndic"], r: 1, e: "Le nu-propriétaire assume les grosses réparations (art. 605/606) ; l'usufruitier paie l'entretien courant et les charges." },
      { q: "Si le crédirentier (vendeur) vit très longtemps, c'est :", c: ["un avantage acheteur", "un avantage vendeur", "neutre", "une cause de nullité"], r: 1, e: "Le viager est un pari sur la durée : plus le vendeur vit, plus il touche de rentes — avantage vendeur." },
      { q: "Le viager occupé représente environ :", c: ["50 % des cas", "70 % des cas", "95 % des cas", "30 % des cas"], r: 2, e: "≈ 95 % des viagers sont occupés : le vendeur conserve l'usage du logement (DUH)." },
      { q: "La pleine propriété est égale à :", c: ["usufruit + nue-propriété", "usus + fructus", "bouquet + rente", "abusus seul"], r: 0, e: "Pleine propriété = usufruit + nue-propriété : tous les attributs réunis sur une même tête." },
    ],

    /* ============ M8 — Mandats & Dossier ============ */
    m8: [
      { q: "Si une mention obligatoire manque au mandat :", c: ["la commission est divisée par deux", "le mandat est nul → zéro honoraire", "le mandat reste valable 3 mois", "le client paie une pénalité"], r: 1, e: "Mention obligatoire manquante = nullité du mandat = AUCUN honoraire, même si la vente se réalise." },
      { q: "Le mandat de l'agent immobilier comporte :", c: ["3 mentions obligatoires", "5 mentions", "9 mentions", "12 mentions"], r: 2, e: "9 mentions obligatoires (loi Hoguet) : durée, prix, honoraires, qui les paie, n° d'inscription au registre…" },
      { q: "Le délai de rétractation de la loi Hamon (mandat hors établissement) est de :", c: ["7 jours", "10 jours", "14 jours", "30 jours"], r: 2, e: "14 jours de rétractation pour un mandat signé hors établissement (Code de la consommation)." },
      { q: "Le registre des mandats doit être tenu :", c: ["par ordre alphabétique", "de façon chronologique, sans blanc ni rature", "une fois par an", "uniquement sur papier"], r: 1, e: "Tenue chronologique, sans blanc ni rature (papier ou électronique) : chaque mandat reçoit un numéro." },
      { q: "Un titulaire des cartes T et G doit tenir :", c: ["1 seul registre", "2 registres distincts", "aucun registre", "3 registres"], r: 1, e: "Deux registres distincts : un pour les transactions (T), un pour la gestion (G)." },
      { q: "Le mandat de recherche engage :", c: ["le vendeur", "l'acquéreur", "le syndic", "le notaire"], r: 1, e: "C'est l'ACQUÉREUR qui mandate l'agence pour lui trouver un bien." },
      { q: "Le mandat semi-exclusif permet au propriétaire de :", c: ["confier le bien à plusieurs agences", "vendre lui-même en direct, à côté de l'agence", "ne rien faire", "résilier sans préavis"], r: 1, e: "Semi-exclusif : exclusivité pour l'agence, MAIS le propriétaire garde le droit de vendre par lui-même (sans honoraires d'agence)." },
      { q: "Le mandat exclusif est irrévocable pendant :", c: ["1 mois", "3 mois", "6 mois", "1 an"], r: 1, e: "3 mois minimum d'irrévocabilité, puis résiliation possible avec préavis de 15 jours (LRAR)." },
      { q: "Vrai ou faux : un accord verbal suffit à percevoir une commission.", c: ["Vrai", "Faux", "Oui entre professionnels", "Oui si témoins"], r: 1, e: "FAUX. Sans mandat écrit conforme à la loi Hoguet, aucun honoraire n'est dû — même si la vente a lieu." },
      { q: "En copropriété, les PV d'assemblée générale à fournir couvrent :", c: ["1 an", "les 3 dernières années", "5 ans", "10 ans"], r: 1, e: "Les PV des 3 dernières AG (avec charges des 2 dernières années, règlement, carnet d'entretien…) sont remis à l'acquéreur." },
    ],

    /* ============ M11 — Financement ============ */
    m11: [
      { q: "2 000 € placés à 4 % pendant 5 ans en intérêts SIMPLES rapportent :", c: ["200 €", "400 €", "433 €", "500 €"], r: 1, e: "I = C × t × n = 2 000 × 0,04 × 5 = 400 € d'intérêts." },
      { q: "1 000 € à 10 % pendant 2 ans en intérêts COMPOSÉS donnent un capital de :", c: ["1 200 €", "1 210 €", "1 100 €", "1 220 €"], r: 1, e: "C₂ = 1 000 × (1,10)² = 1 000 × 1,21 = 1 210 €." },
      { q: "Un prêt sur 20 ans représente :", c: ["120 mois", "200 mois", "240 mois", "360 mois"], r: 2, e: "20 × 12 = 240 mensualités." },
      { q: "Le taux d'endettement maximum fixé par le HCSF est de :", c: ["25 %", "30 %", "33 %", "35 %"], r: 3, e: "35 % des revenus nets mensuels du ménage (assurance comprise), avec marge de flexibilité encadrée." },
      { q: "La progression des intérêts simples est :", c: ["exponentielle", "linéaire", "logarithmique", "nulle"], r: 1, e: "Intérêts simples = toujours calculés sur le capital initial → progression LINÉAIRE." },
      { q: "La progression des intérêts composés est :", c: ["linéaire", "exponentielle", "constante", "décroissante"], r: 1, e: "Les intérêts s'ajoutent au capital et produisent eux-mêmes des intérêts → progression EXPONENTIELLE." },
      { q: "Le taux équivalent mensuel d'un taux annuel t se calcule par :", c: ["t ÷ 12", "(1 + t)^(1/12) − 1", "t × 12", "(1 + t)^12"], r: 1, e: "Taux équivalent mensuel = (1 + t)^(1/12) − 1 (et non t ÷ 12, qui est le taux proportionnel)." },
      { q: "5 000 € à 3 % pendant 4 ans en intérêts simples rapportent :", c: ["450 €", "600 €", "627 €", "750 €"], r: 1, e: "I = 5 000 × 0,03 × 4 = 600 €." },
      { q: "Un prêt sur 25 ans représente :", c: ["250 mois", "300 mois", "240 mois", "360 mois"], r: 1, e: "25 × 12 = 300 mensualités." },
      { q: "2 000 € à 5 % pendant 2 ans en intérêts composés donnent :", c: ["2 200 €", "2 205 €", "2 100 €", "2 210 €"], r: 1, e: "C₂ = 2 000 × (1,05)² = 2 000 × 1,1025 = 2 205 €." },
    ],

    /* ============ SYN — Synthèse & Règles d'or ============ */
    syn: [
      { q: "La première impression se joue selon la règle :", c: ["des 3 × 30", "des 4 × 20", "des 5 × 10", "du 70/30"], r: 1, e: "4 × 20 : 20 premières secondes, 20 premiers gestes, 20 premiers mots, 20 cm du visage." },
      { q: "Les deux diagnostics universels, pour tout bien, sont :", c: ["plomb + amiante", "DPE + ERP", "gaz + électricité", "termites + DPE"], r: 1, e: "DPE + ERP : toujours obligatoires, sans condition d'âge ni de localisation." },
      { q: "Le mandat exclusif est irrévocable :", c: ["1 mois", "3 mois", "6 mois", "1 an"], r: 1, e: "3 mois d'irrévocabilité, puis résiliation avec préavis de 15 jours." },
      { q: "La méthode d'estimation de référence (fisc, juridictions) est :", c: ["la capitalisation", "la comparaison", "le compte à rebours", "l'indiciaire"], r: 1, e: "La méthode par comparaison est la référence reconnue par l'administration et les tribunaux." },
      { q: "Entre taux équivalent et taux proportionnel :", c: ["l'équivalent est supérieur", "l'équivalent est inférieur", "ils sont égaux", "cela dépend de la banque"], r: 1, e: "Le taux équivalent est TOUJOURS légèrement inférieur au taux proportionnel." },
      { q: "Le registre des mandats se tient :", c: ["par ordre de prix", "chronologiquement, sans blanc ni rature", "tous les ans", "à la demande du client"], r: 1, e: "Tenue chronologique, sans blanc ni rature : c'est une obligation de la loi Hoguet." },
      { q: "La zone de prospection à privilégier est :", c: ["la zone tertiaire", "la zone secondaire", "la zone primaire (80 % du CA)", "indifférente"], r: 2, e: "La zone primaire concentre ≈ 80 % du CA potentiel." },
      { q: "Le taux d'endettement maximum (HCSF) est de :", c: ["30 %", "33 %", "35 %", "40 %"], r: 2, e: "35 % des revenus nets mensuels du ménage." },
      { q: "Sans mandat écrit conforme à la loi Hoguet :", c: ["la commission est partagée", "zéro honoraire", "le mandat tient 3 mois", "le client verse une indemnité"], r: 1, e: "Règle d'or n°1 : pas de mandat écrit conforme = aucun honoraire, même si la vente se conclut." },
    ],

  };

  // Crée la clé si besoin (modules sans pool QUIZ initial) puis ajoute
  for (const k of Object.keys(extras2)) {
    if (!window.QUIZ[k]) {
      window.QUIZ[k] = (window.STUDY && window.STUDY[k] && Array.isArray(window.STUDY[k].quiz))
        ? [...window.STUDY[k].quiz] : [];
    }
    window.QUIZ[k] = [...window.QUIZ[k], ...extras2[k]];
  }
  // Synchronise la référence STUDY
  if (window.STUDY) {
    for (const k of Object.keys(window.QUIZ)) {
      if (window.STUDY[k]) window.STUDY[k].quiz = window.QUIZ[k];
    }
  }
})();
