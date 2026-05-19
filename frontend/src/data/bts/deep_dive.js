// Deep dive content — rich explanations per concept
// Each key is a slug used in data-dd="slug" on cards
export const DEEPDIVE = {

  /* ============ Module 1 — Accueil ============ */
  "m1-4x20": {
    mod: "m1",
    title: "La règle des 4 × 20",
    lede: "Une seule occasion de faire bonne impression — et 80 % se joue dans les 4 premières secondes.",
    sections: [
      { h: "Pourquoi cette règle ?", b: "Le client juge avant même que tu n'aies parlé. Le cerveau humain forme un avis en moins de 7 secondes. Tu as donc 4 leviers, à activer dans l'ordre : ton apparence, tes gestes, tes premiers mots, ton visage." },
      { h: "Les 4 leviers en détail",
        list: [
          "20 SECONDES — tenue (costume sobre, propre, repassé), démarche assurée, ponctualité (arriver 10 min avant).",
          "20 GESTES — bras décroisés, paumes parfois visibles (ouverture), une poignée de main franche et brève (3 sec max).",
          "20 MOTS — Bonjour + prénom du client + ton prénom + ta fonction + une accroche positive. Pas plus.",
          "20 CM — distance du visage : sourire DUchenne (yeux ET bouche), regard 70 % du temps, hochements de tête appuyés.",
        ]
      },
      { h: "Exemple concret",
        b: "« Bonjour Madame Dupont, je suis Lenny Agamakou de l'agence Century 21. Merci d'être venue jusqu'ici, je vais vous présenter avec plaisir le T3 de la rue de la Paix. »  → 22 mots, prénom client cité, ouverture engageante."
      },
      { h: "Pièges à éviter",
        list: [
          "Téléphone visible (même éteint) = signal de non-disponibilité.",
          "Trop parler dans les 20 premiers mots — tu fatigues.",
          "Regard fuyant ou trop intense (>80 % = inquisiteur).",
        ]
      },
      { h: "Mnémo", b: "« Si je n'ai que 80 secondes, je les soigne. »  Compte 20 + 20 + 20 + 20." },
    ],
    linked: ["m1-soncas", "m1-divas"],
  },

  "m1-soncas": {
    mod: "m1",
    title: "SONCAS(E) — les 7 mobiles d'achat",
    lede: "Toute décision d'achat est animée par un (ou deux) mobiles dominants. Repère-les pour adapter l'argumentaire.",
    sections: [
      { h: "Les 7 mobiles",
        list: [
          "S — SÉCURITÉ : peur du risque. Argumente avec garanties, références, années d'expérience, certifications.",
          "O — ORGUEIL : besoin de paraître. Joue sur l'exclusivité, le standing, le quartier prisé, le prestige.",
          "N — NOUVEAUTÉ : envie de modernité. Mets en avant les dernières rénovations, les normes 2024, la domotique.",
          "C — CONFORT : recherche de praticité. Insiste sur l'ascenseur, la place de parking, l'ergonomie.",
          "A — ARGENT : rationalité économique. Parle ROI, rentabilité locative, prix au m² inférieur à la moyenne.",
          "S — SYMPATHIE : besoin de relation. Crée du lien personnel, raconte des anecdotes, partage des références communes.",
          "E — ÉCOLOGIE : conscience environnementale. DPE A/B, isolation, panneaux solaires, mobilité douce du quartier.",
        ]
      },
      { h: "Comment détecter le mobile ?",
        b: "Écoute ce que dit le client SPONTANÉMENT lors de la découverte. Les mots qui reviennent (« sûr », « tranquille », « prestige », « rendement », « DPE ») révèlent ses mobiles."
      },
      { h: "Exemple",
        b: "Un client répète « je veux quelque chose de sûr pour ma retraite » → mobile dominant : SÉCURITÉ. Argumente avec un bien sans travaux, copro saine, locataire en place depuis 5 ans, charges maîtrisées."
      },
      { h: "Astuce", b: "Un client a TOUJOURS 2 mobiles : un dominant et un secondaire. Couvre les deux dans ton argumentation." },
    ],
    linked: ["m1-questions", "m1-4x20"],
  },

  "m1-questions": {
    mod: "m1",
    title: "Les 5 types de questions",
    lede: "Poser la bonne question, c'est déjà la moitié de la vente. Maîtrise ces 5 outils.",
    sections: [
      { h: "Le panel complet",
        list: [
          "OUVERTE — appelle un développement libre. « Comment imaginez-vous votre futur logement ? »",
          "FERMÉE — appelle un OUI / NON ou un fait précis. « Êtes-vous propriétaire actuellement ? »",
          "D'APPROFONDISSEMENT — fait préciser une affirmation. « Quand vous dites «trop petit», c'est combien de m² minimum ? »",
          "MIROIR — répète un mot-clé pour faire développer. Client : « Trop de travaux. » → Toi : « Trop de travaux ? »",
          "INDUCTIVE — oriente la réponse (à utiliser avec parcimonie). « Vous serez d'accord pour signer cette semaine, n'est-ce pas ? »",
        ]
      },
      { h: "Quand utiliser quoi ?",
        b: "OUVERTE en début de découverte. FERMÉE pour valider et conclure. APPROFONDISSEMENT/MIROIR au milieu pour creuser. INDUCTIVE en toute fin, pour engager."
      },
      { h: "Piège", b: "Trop de questions fermées en début = interrogatoire. Le client se ferme. Commence toujours par des questions ouvertes." },
    ],
    linked: ["m1-soncas"],
  },

  "m1-divas": {
    mod: "m1",
    title: "DIVAS — accueil téléphonique",
    lede: "Au téléphone, le client ne voit ni ton sourire ni ton costume. Tout passe par la VOIX.",
    sections: [
      { h: "Les 5 dimensions",
        list: [
          "D — DÉBIT : ajuste-toi à ton interlocuteur. Personne âgée = plus lent. Pro pressé = plus rapide.",
          "I — INTONATION : module ta voix. Une voix monocorde fait raccrocher. Sois vivant, varie les hauteurs.",
          "V — VOLUME : ni trop fort (agressif), ni trop bas (peu sûr). Calibre dès la 1ère seconde.",
          "A — ARTICULATION : prononce chaque syllabe. Au tel, 30 % du message est perdu. Compense.",
          "S — SOURIRE : OUI, ça s'entend. Sourire = positionnement de la mâchoire = timbre plus chaleureux.",
        ]
      },
      { h: "Test rapide", b: "Enregistre-toi en train de te présenter. Réécoute. Tu vas être surpris du résultat — et tu sauras quoi corriger." },
    ],
    linked: ["m1-4x20"],
  },

  /* ============ Module 2 — Entreprises ============ */
  "m2-formes": {
    mod: "m2",
    title: "Formes juridiques en immobilier",
    lede: "Le choix de la forme juridique conditionne la responsabilité, la fiscalité et le régime social.",
    sections: [
      { h: "EI — Entreprise Individuelle",
        b: "Création simple, peu coûteuse. MAIS responsabilité illimitée sur le patrimoine personnel. Imposition à l'IR (BIC/BNC). Adaptée pour démarrer en solo, à éviter pour des opérations risquées."
      },
      { h: "EURL / SARL",
        b: "1 ou plusieurs associés. Responsabilité limitée aux apports. Gérant majoritaire = TNS (régime indépendant, cotisations plus faibles). Fiscalité IR par défaut, option IS. Cadre rigide mais protecteur."
      },
      { h: "SASU / SAS",
        b: "Très flexible (rédaction libre des statuts). Président = assimilé salarié (cotisations plus élevées mais meilleure protection). IS par défaut, option IR 5 ans max. Très utilisée par les jeunes agences."
      },
      { h: "SA",
        b: "Capital minimum 37 000 €. Minimum 2 actionnaires. CA + commissaire aux comptes. Réservée aux grosses structures."
      },
      { h: "Comparatif décision",
        list: [
          "Tu démarres seul, peu de risque → EI (ou micro-entreprise si CA < seuils).",
          "Tu démarres seul, tu veux protéger ton patrimoine → EURL ou SASU.",
          "Tu t'associes → SARL ou SAS selon souplesse souhaitée.",
          "Tu veux lever des fonds → SAS (cession d'actions facile).",
        ]
      },
    ],
    linked: ["m2-hoguet", "m2-statuts"],
  },

  "m2-hoguet": {
    mod: "m2",
    title: "Loi Hoguet (2 janvier 1970)",
    lede: "La loi fondatrice de la profession immobilière. La connaître par cœur = condition d'exercer.",
    sections: [
      { h: "Les 3 cartes professionnelles",
        list: [
          "T — TRANSACTION sur immeubles et fonds de commerce.",
          "G — GESTION immobilière (gérance locative).",
          "S — SYNDIC de copropriété.",
        ]
      },
      { h: "Conditions de la carte",
        list: [
          "Aptitude professionnelle (diplôme BAC+3 immo, ou BTS PI, ou expérience).",
          "Garantie financière (min. 110 000 € pour T).",
          "Assurance RCP (Responsabilité Civile Professionnelle).",
          "Casier judiciaire vierge.",
          "Renouvelée tous les 3 ans.",
        ]
      },
      { h: "Le mandat ÉCRIT obligatoire",
        b: "Toute opération doit faire l'objet d'un mandat écrit, daté, signé, avec mentions obligatoires (voir module 8). SANS mandat conforme = ZÉRO honoraire, même si la vente a lieu. C'est la règle la plus importante."
      },
      { h: "Garantie financière",
        b: "Obligatoire SI tu détiens des fonds (G et S). Pour la T pure, elle est obligatoire aussi mais peut être à 0 € si tu n'encaisses jamais de fonds — la mention « ne reçoit aucun fonds » est alors apposée."
      },
      { h: "Sanctions", b: "Exercice illégal = 6 mois prison + 7 500 € amende. Sanction grave : déchéance définitive." },
    ],
    linked: ["m2-formes", "m8-mentions"],
  },

  "m2-alur": {
    mod: "m2",
    title: "Loi ALUR (24 mars 2014)",
    lede: "« Accès au Logement et Urbanisme Rénové ». Réforme massive du locatif et de la copropriété.",
    sections: [
      { h: "Points clés pour la transaction",
        list: [
          "Encadrement des loyers dans les zones tendues (Paris, Lille…).",
          "Bail type obligatoire pour les locations vides ET meublées.",
          "État des lieux standardisé.",
          "Formation continue obligatoire : 42 h sur 3 ans pour conserver sa carte.",
          "Document d'information précontractuelle remis avant signature.",
        ]
      },
      { h: "Côté copropriété",
        list: [
          "Carnet d'entretien obligatoire.",
          "Fiche synthétique de copropriété.",
          "Fonds travaux obligatoire (5 % du budget annuel min.).",
          "Immatriculation des copropriétés au registre national.",
        ]
      },
      { h: "À retenir pour l'examen",
        b: "ALUR = Accès Logement Urbanisme Rénové. 2014. Encadrement loyers + formation continue 42 h + transparence copro."
      },
    ],
    linked: ["m2-hoguet", "m2-elan"],
  },

  "m2-elan": {
    mod: "m2",
    title: "Loi ELAN (23 novembre 2018)",
    lede: "« Évolution du Logement, de l'Aménagement et du Numérique ». Modernisation du secteur.",
    sections: [
      { h: "Bail mobilité — la grande nouveauté",
        b: "Bail meublé de 1 à 10 mois, NON renouvelable, SANS dépôt de garantie. Réservé à : étudiants, stagiaires, salariés en mission, formation pro, mutation. Vise la mobilité professionnelle."
      },
      { h: "Autres apports",
        list: [
          "Simplification des règles d'urbanisme et de construction.",
          "Encadrement des locations de courte durée (Airbnb) : déclaration en mairie, limite 120 j/an pour résidence principale.",
          "Vente de logements HLM facilitée.",
          "Bail numérique = signature électronique.",
          "PINEL recentré sur les zones tendues.",
        ]
      },
    ],
    linked: ["m2-alur"],
  },

  "m2-statuts": {
    mod: "m2",
    title: "Statuts du conseiller immobilier",
    lede: "Salarié, agent commercial, VRP — chaque statut a ses droits et ses interdictions. Choisis bien.",
    sections: [
      { h: "Agent commercial (le + courant)",
        list: [
          "Indépendant inscrit au RSAC.",
          "Rémunération 100 % commission, pas de fixe.",
          "Cotisations TNS (Travailleur Non Salarié).",
          "Pas de droit au chômage, pas de congés payés.",
          "Liberté d'organisation totale.",
        ]
      },
      { h: "Interdictions strictes de l'agent commercial",
        list: [
          "Rédiger un compromis ou un acte juridique.",
          "Encaisser des fonds (chèques, virements).",
          "Donner des conseils juridiques ou fiscaux.",
        ]
      },
      { h: "Salarié d'agence",
        list: [
          "Contrat de travail (CDI/CDD).",
          "Protection sociale complète + chômage + congés payés.",
          "Rémunération : fixe + variable, ou variable seul, ou mixte.",
          "Lien de subordination avec l'agence.",
          "Pas de clientèle propre (la clientèle appartient à l'agence).",
        ]
      },
      { h: "VRP — Voyageur Représentant Placier",
        b: "Statut salarié avec spécificités. Représente 1 ou plusieurs employeurs. Payé à la commission avec souvent un minimum garanti. Pas très courant en immo."
      },
    ],
    linked: ["m2-formes"],
  },

  /* ============ Module 3 — Prospection ============ */
  "m3-smart": {
    mod: "m3",
    title: "Méthode SMART",
    lede: "Fixer un objectif vague ne sert à rien. SMART = la grille qui transforme un rêve en plan.",
    sections: [
      { h: "Les 5 critères",
        list: [
          "S — SPÉCIFIQUE : un objectif précis. « Rentrer des mandats » → NON. « Rentrer 3 mandats en zone primaire » → OUI.",
          "M — MESURABLE : un chiffre, une unité. Ventes, mandats, RDV, € de CA.",
          "A — ATTEIGNABLE : possible avec tes moyens. Ne te fixe pas 50 mandats si tu en rentres 5/an habituellement.",
          "R — RÉALISTE : cohérent avec ressources, contexte, marché. Tient compte du secteur, de la saison.",
          "T — TEMPOREL : avec une deadline claire. « D'ici fin juin », « sur les 3 prochaines semaines ».",
        ]
      },
      { h: "Exemple AVANT / APRÈS",
        b: "Avant : « Je veux rentrer plus de mandats. »  Après : « Je veux rentrer 4 mandats exclusifs sur la zone primaire d'ici le 30 juin, via 80 h de porte-à-porte étalées sur 8 semaines. »"
      },
      { h: "Astuce", b: "Écris ton objectif et affiche-le. Le simple fait de le voir tous les matins augmente de 42 % la probabilité de l'atteindre (étude Matthews 2015)." },
    ],
    linked: ["m3-zones"],
  },

  "m3-zones": {
    mod: "m3",
    title: "Îlotage & zones de secteur",
    lede: "Le pro est connu d'abord sur 200 m. Concentre tes efforts là où ils paient.",
    sections: [
      { h: "Les 3 zones",
        list: [
          "ZONE PRIMAIRE — quelques rues, ~200 m autour de l'agence ou du domicile cible. Visite hebdo. Génère 80 % du CA.",
          "ZONE SECONDAIRE — ~1 km autour. Visite mensuelle ou tous les 15 j. Génère 15 % du CA.",
          "ZONE TERTIAIRE — au-delà. Visite ponctuelle ou en réaction. 5 % du CA.",
        ]
      },
      { h: "Logique du 80/20",
        b: "Si tu disperses tes efforts sur 5 km, tu n'es nulle part. Si tu te concentres sur 200 m, tu deviens LE pro du quartier. Les voisins parlent entre eux, le bouche-à-oreille fait le reste."
      },
      { h: "Rythme conseillé",
        b: "Une session d'îlotage = 2 à 3 h MAX. Au-delà, l'attention décroche et tu fais du mauvais boulot. Mieux vaut 2 sessions de 2 h dans la semaine qu'une session de 6 h le samedi."
      },
    ],
    linked: ["m3-smart", "m3-methodes"],
  },

  "m3-methodes": {
    mod: "m3",
    title: "Méthodes de prospection",
    lede: "4 familles d'actions. Le pro qui fonctionne combine les 4.",
    sections: [
      { h: "Statique (passive)",
        b: "Tu attends que le client vienne à toi : vitrine, panneaux V/L, affichage. Coût modéré, retour lent. Indispensable pour la notoriété."
      },
      { h: "Dynamique (active)",
        b: "Tu vas chercher le client : porte-à-porte, phoning, pige (appel des annonces de particuliers), boîtage. Effort intense, retour rapide. C'est ce qui paie le plus vite."
      },
      { h: "Prospective (fichier)",
        b: "Tu exploites une base : anciens clients, fichier propriétaires, partenaires (notaires, banquiers, syndic). Très qualifié, ROI excellent quand le fichier est bien tenu."
      },
      { h: "Digitale",
        b: "Réseaux sociaux (Insta, FB, LinkedIn), site agence, Google My Business, mailing. Demande de la régularité. C'est aujourd'hui incontournable, surtout en zone urbaine."
      },
      { h: "Mix recommandé",
        list: [
          "30 % statique (vitrine, panneaux toujours à jour).",
          "30 % dynamique (porte-à-porte hebdo, pige quotidienne).",
          "20 % prospective (newsletter mensuelle, calls partenaires).",
          "20 % digitale (3 posts/sem. Insta, 1 reel/sem).",
        ]
      },
    ],
    linked: ["m3-zones"],
  },

  /* ============ Module 4 — Ratios ============ */
  "m4-formules": {
    mod: "m4",
    title: "Les formules à connaître par cœur",
    lede: "Ces 6 formules tombent SYSTÉMATIQUEMENT à l'examen. Apprends-les sans hésiter.",
    sections: [
      { h: "Commission moyenne",
        b: "CA total ÷ Nombre de ventes. Exemple : 583 000 € / 66 ventes = 8 833 €/vente. Mesure la valeur unitaire de ton travail."
      },
      { h: "Taux de transformation mandat → vente",
        b: "(Nb ventes / Nb mandats) × 100. Norme du marché : 35 à 50 %. Sous 30 %, problème de qualité de mandat ou de prix."
      },
      { h: "Taux de transformation estimation → mandat",
        b: "(Nb mandats / Nb estimations) × 100. Norme : 50 à 70 %. Sous 40 %, problème de pitch en R2."
      },
      { h: "Coût d'acquisition mandat",
        b: "Coût total prospection ÷ Nb mandats rentrés. Si coût > commission moy. × taux transfo → tu perds de l'argent."
      },
      { h: "Prix Net Vendeur depuis FAI (honoraires acheteur)",
        b: "Prix FAI ÷ (1 + taux). Exemple FAI 6,5 % : 250 000 / 1,065 = 234 742 €. C'est ce que touche RÉELLEMENT le vendeur."
      },
      { h: "Prix HT depuis TTC",
        b: "Prix TTC ÷ 1,20 (TVA 20 %). Utile pour calculer la commission HT à partir du FAI. Exemple : commission TTC 12 000 € → HT 10 000 €."
      },
    ],
    linked: ["m4-objectif"],
  },

  "m4-objectif": {
    mod: "m4",
    title: "Calcul d'objectif en cascade",
    lede: "Pars de ton salaire visé et remonte jusqu'au nombre de portes à frapper.",
    sections: [
      { h: "La cascade",
        list: [
          "1. Salaire net annuel visé (ex : 36 000 €).",
          "2. Commission brute totale nécessaire (× 2 environ pour charges + impôts) = 72 000 €.",
          "3. Commission moyenne par vente = 8 000 €. → 9 ventes / an.",
          "4. Taux de transfo mandat → vente 40 %. → 23 mandats nécessaires.",
          "5. Taux transfo estimation → mandat 60 %. → 38 estimations nécessaires.",
          "6. Taux de RDV → estimation 50 %. → 76 RDV à décrocher.",
        ]
      },
      { h: "Conclusion", b: "Pour gagner 36 K€ net/an : 76 RDV / an = 6-7 RDV par mois = 1,5 RDV / semaine. C'est mesurable, c'est atteignable, c'est SMART." },
    ],
    linked: ["m4-formules", "m3-smart"],
  },

  /* ============ Module 5 — Diagnostics ============ */
  "m5-dpe": {
    mod: "m5",
    title: "DPE — Diagnostic de Performance Énergétique",
    lede: "Le diagnostic-roi : obligatoire pour TOUT bien, et de plus en plus discriminant à la vente.",
    sections: [
      { h: "L'essentiel",
        list: [
          "Obligatoire pour TOUT bien proposé à la vente OU à la location.",
          "Durée de validité : 10 ans.",
          "Note de A (très performant) à G (passoire thermique).",
          "Doit figurer DÈS l'annonce (sinon : amende 3 000 € à 15 000 €).",
        ]
      },
      { h: "Enjeux 2025-2028",
        list: [
          "Depuis 2023 : interdiction location G (consommation > 450 kWh/m²/an).",
          "2025 : interdiction G complets.",
          "2028 : interdiction F.",
          "2034 : interdiction E.",
        ]
      },
      { h: "Impact à la vente",
        b: "Un DPE F/G fait perdre 5 à 15 % de la valeur (« value gap » énergétique). Les acheteurs négocient sur les travaux à prévoir."
      },
      { h: "Astuce conseil", b: "Pour un vendeur, refaire un DPE plus avantageux APRÈS petits travaux (isolation combles, fenêtres) peut faire gagner 5-10 K€ sur le prix de vente." },
    ],
    linked: ["m5-erp", "m5-tableau"],
  },

  "m5-erp": {
    mod: "m5",
    title: "ERP — État des Risques et Pollutions",
    lede: "Obligatoire pour TOUS biens, vente ET location. Durée 6 mois seulement.",
    sections: [
      { h: "Contenu de l'ERP",
        list: [
          "Risques naturels (inondations, séismes, mouvements de terrain).",
          "Risques miniers.",
          "Risques technologiques (usines Seveso, nucléaire).",
          "Pollution des sols.",
          "Présence éventuelle de radon (zones classées).",
          "Bruit (zones aéroportuaires).",
        ]
      },
      { h: "Validité courte — pourquoi ?", b: "6 mois car les arrêtés préfectoraux évoluent. Refais l'ERP juste avant la signature pour être tranquille." },
      { h: "Sanctions",
        b: "Non-remise ERP = nullité possible de la vente (action 1 an), réduction du prix, voire dommages et intérêts."
      },
    ],
    linked: ["m5-dpe", "m5-tableau"],
  },

  "m5-tableau": {
    mod: "m5",
    title: "Tableau récap des diagnostics",
    lede: "Mémorise les seuils par cœur : c'est le grand classique de l'examen.",
    sections: [
      { h: "Mémo seuils",
        list: [
          "DPE : tous biens · 10 ans.",
          "ERP : tous biens · 6 mois.",
          "Plomb (CREP) : avant 1949 · illimité si négatif, 1 an si positif (vente).",
          "Amiante : PC avant 1/7/1997 · illimité si négatif.",
          "Gaz : install. > 15 ans · 3 ans (vente), 6 ans (loc).",
          "Électricité : install. > 15 ans · 3 ans (vente), 6 ans (loc).",
          "Termites : zones préfect. · 6 mois.",
          "Assainissement : non raccordé · 3 ans.",
          "Bruit : zones aéroportuaires · illimité.",
        ]
      },
      { h: "DDT", b: "Le DDT = Dossier de Diagnostics Techniques. Il REGROUPE tous les diagnostics applicables au bien. Remis à l'acquéreur avec le compromis." },
      { h: "Astuce mnémo", b: "« Avant 49 = plomb, avant 97 = amiante, après 15 ans = gaz/élec. »" },
    ],
    linked: ["m5-dpe", "m5-erp"],
  },

  /* ============ Module 6 — Estimation ============ */
  "m6-comparaison": {
    mod: "m6",
    title: "Méthode par comparaison",
    lede: "La référence absolue : utilisée par le fisc, les juridictions, les notaires. À maîtriser à 100 %.",
    sections: [
      { h: "Principe",
        b: "On analyse les ventes RÉCENTES (moins de 12 mois) de biens SIMILAIRES (même secteur, même type, même surface). On en tire un prix moyen au m², qu'on applique au bien à estimer."
      },
      { h: "Formule de base",
        b: "Prix estimé = Prix m² moyen × Surface du bien"
      },
      { h: "Étapes pas-à-pas",
        list: [
          "1. Lister 5 à 10 ventes comparables (DVF, DV3F, Argus).",
          "2. Calculer le prix m² de chacune.",
          "3. Pondérer selon différences (étage, exposition, état, ascenseur, vue).",
          "4. Faire la moyenne pondérée.",
          "5. Appliquer au bien × surface utile (pas la surface Carrez seule).",
        ]
      },
      { h: "Grille de pondération mémo",
        list: [
          "Ascenseur : +1 à 2 %",
          "Espaces verts : +5 %",
          "Étage élevé : +1 % / étage",
          "RDC : jusqu'à -30 %",
          "Pas d'ascenseur : -8 %",
          "Pas d'espaces verts : -5 %",
          "DPE F/G : -5 à -15 %",
        ]
      },
      { h: "Limites de la méthode",
        b: "Difficile pour les biens atypiques (loft, hôtel particulier, château). Dans ces cas, croise avec sol+construction et coûts."
      },
    ],
    linked: ["m6-capitalisation", "m6-pondération"],
  },

  "m6-capitalisation": {
    mod: "m6",
    title: "Méthode par capitalisation",
    lede: "La méthode des investisseurs. Plus le taux est bas, plus le prix est élevé.",
    sections: [
      { h: "Principe",
        b: "On part du loyer annuel net que rapporte (ou rapporterait) le bien, et on divise par un taux de capitalisation propre au marché local."
      },
      { h: "Formule",
        b: "Prix = Loyer annuel ÷ Taux de capitalisation"
      },
      { h: "Exemple",
        b: "T3 loué 1 000 €/mois = 12 000 €/an. Taux marché local = 4 %. Prix estimé = 12 000 / 0,04 = 300 000 €."
      },
      { h: "Taux types (à actualiser)",
        list: [
          "Paris intra-muros : 2,5 à 3 %",
          "Grande couronne : 3,5 à 4,5 %",
          "Villes moyennes : 5 à 7 %",
          "Petites villes / rural : 7 à 10 %",
        ]
      },
      { h: "Important",
        b: "Un taux BAS = marché tendu, donc prix ÉLEVÉ. Un taux HAUT = marché détendu, prix plus bas. C'est contre-intuitif au début."
      },
    ],
    linked: ["m6-comparaison"],
  },

  "m6-r1": {
    mod: "m6",
    title: "Préparer le R1 (rendez-vous estimation)",
    lede: "75 % du succès du R1 se joue AVANT le RDV. Prépare-toi comme un avocat avant un procès.",
    sections: [
      { h: "Pré-découverte téléphonique",
        list: [
          "Qui vend ? (couple, divorce, succession ?)",
          "Pourquoi maintenant ?",
          "Délai souhaité ?",
          "Bien occupé / vide / loué ?",
          "Travaux récents ?",
          "Confirmer le RDV avec TOUS les propriétaires présents.",
        ]
      },
      { h: "Documents à demander",
        list: [
          "Titre de propriété (date, prix d'achat, mode de financement).",
          "Dernier avis de taxe foncière.",
          "Charges de copropriété (2 dernières années).",
          "Factures travaux récents.",
        ]
      },
      { h: "Recherche secteur",
        list: [
          "Sortir 5-10 ventes récentes via DVF.",
          "Recenser la concurrence actuelle (Leboncoin, SeLoger).",
          "Vérifier sur Google Maps / Street View l'environnement.",
          "Préparer 2-3 arguments différenciants pour ton agence.",
        ]
      },
    ],
    linked: ["m6-decouverte"],
  },

  "m6-decouverte": {
    mod: "m6",
    title: "Découverte vendeur en 3 temps",
    lede: "Pour bien argumenter au R2, il faut tout savoir au R1. Suis cette structure.",
    sections: [
      { h: "1. Le PASSÉ",
        list: [
          "Quand le bien a-t-il été acheté ?",
          "À quel prix ?",
          "Via une agence ou un particulier ?",
          "Quels travaux réalisés depuis ?",
          "Quelle plus-value brute potentielle ?",
        ]
      },
      { h: "2. Le PRÉSENT",
        list: [
          "Qui vit dans le bien ?",
          "Qui sont TOUS les propriétaires (régime matrimonial) ?",
          "Quelle est la raison de la vente ?",
          "État du bien et entretien.",
          "Y a-t-il une autre agence sur le coup ?",
        ]
      },
      { h: "3. Le FUTUR",
        list: [
          "Délai de vente souhaité ?",
          "Date limite d'encaissement ?",
          "Réemploi des fonds (nouveau bien, projet, succession) ?",
          "Le client peut-il négocier ?",
          "Marge de prix possible ?",
        ]
      },
      { h: "Pourquoi cette structure ?",
        b: "Le passé révèle l'attachement émotionnel et le prix de revient. Le présent révèle les contraintes. Le futur révèle l'URGENCE — donc la marge de négo."
      },
    ],
    linked: ["m6-r1"],
  },

  /* ============ Module 6 bis — Viager ============ */
  "m6b-bases": {
    mod: "m6b",
    title: "Le viager — principes",
    lede: "Un contrat aléatoire ancien (Code civil 1804) qui revient à la mode avec le vieillissement de la population.",
    sections: [
      { h: "Vocabulaire",
        list: [
          "CRÉDIRENTIER = le VENDEUR. Il « crédite » la rente qu'il va recevoir.",
          "DÉBIRENTIER = l'ACHETEUR. Il « doit » la rente.",
          "BOUQUET = somme versée comptant à la signature (≈ 20-30 % de la valeur).",
          "RENTE VIAGÈRE = versement périodique (mensuel généralement) jusqu'au décès.",
          "ALÉA = l'inconnue qui rend le contrat valable : la durée de vie du crédirentier.",
        ]
      },
      { h: "Sans aléa, pas de viager",
        b: "Le notaire vérifie l'espérance de vie. Si le crédirentier est en phase terminale (et que les parties le savent), le contrat est NUL."
      },
      { h: "Les 2 types",
        list: [
          "Viager OCCUPÉ (~95 % des cas) : vendeur reste dans le bien. Abattement d'occupation 20-40 %.",
          "Viager LIBRE : bien immédiatement disponible. Valeur pleine.",
        ]
      },
      { h: "Calcul de la rente",
        b: "Rente = (Valeur nue-propriété − Bouquet) ÷ Coefficient de barème (fonction de l'âge du crédirentier)."
      },
    ],
    linked: ["m6b-demembrement"],
  },

  "m6b-demembrement": {
    mod: "m6b",
    title: "Démembrement de propriété",
    lede: "Découper le droit de propriété entre usufruitier et nu-propriétaire. Outil clé de transmission.",
    sections: [
      { h: "L'équation fondamentale",
        b: "Pleine propriété = Usufruit + Nue-propriété"
      },
      { h: "Les 3 droits du Code civil",
        list: [
          "USUS — droit d'utiliser. → Usufruitier.",
          "FRUCTUS — droit de percevoir les revenus. → Usufruitier.",
          "ABUSUS — droit de disposer (vendre, donner, détruire). → Nu-propriétaire.",
        ]
      },
      { h: "Usufruitier — droits et devoirs",
        list: [
          "✓ Habite le bien, ou le loue (et perçoit les loyers).",
          "✓ Doit l'entretenir (charges courantes, petites réparations).",
          "✗ Ne peut pas le vendre sans accord du nu-propriétaire.",
          "✗ Ne peut pas en transformer la substance.",
        ]
      },
      { h: "Nu-propriétaire — droits et devoirs",
        list: [
          "✓ Détient la valeur du bien.",
          "✓ Récupère la pleine propriété à l'extinction de l'usufruit (décès le + souvent).",
          "✓ Doit les gros travaux (article 606 : toiture, gros œuvre).",
          "✗ Ne peut pas occuper le bien sans accord.",
        ]
      },
      { h: "Avantages fiscaux",
        list: [
          "Réduction de l'IFI (la base est l'usufruit, calculé sur barème âge).",
          "Optimisation des droits de succession (transmission anticipée).",
          "Baisse de l'impôt sur le revenu foncier.",
          "Décote sur la nue-propriété (-30 à -60 % selon âge usufruitier).",
        ]
      },
      { h: "Barème fiscal usufruit (CGI art. 669)",
        list: [
          "Moins de 21 ans : usufruit = 90 %",
          "21-30 ans : 80 %",
          "31-40 ans : 70 %",
          "41-50 ans : 60 %",
          "51-60 ans : 50 %",
          "61-70 ans : 40 %",
          "71-80 ans : 30 %",
          "81-90 ans : 20 %",
          "Plus de 91 ans : 10 %",
        ]
      },
    ],
    linked: ["m6b-bases"],
  },

  /* ============ Module 8 — Mandats ============ */
  "m8-types": {
    mod: "m8",
    title: "Les 4 types de mandats",
    lede: "Choisir le bon type de mandat = stratégie. Et le défendre face au vendeur = pédagogie.",
    sections: [
      { h: "Mandat SIMPLE",
        list: [
          "Plusieurs agences en parallèle, et le propriétaire peut vendre seul.",
          "Aucune irrévocabilité.",
          "Avantage vendeur : choix large. Inconvénient agence : faible engagement.",
          "Conséquence : moins de moyens engagés (visibilité, photos pro, vidéo).",
        ]
      },
      { h: "Mandat EXCLUSIF",
        list: [
          "Une seule agence pendant 3 mois minimum (irrévocabilité).",
          "Résiliation après 3 mois avec préavis 15 j.",
          "Clause pénale possible (généralement 5-7 % du prix net vendeur).",
          "L'agence engage TOUS ses moyens : meilleure visibilité, photos pro, vidéo, AMANDA…",
          "Statistique : un bien en exclusif se vend 2× plus vite et 5-7 % plus cher en moyenne.",
        ]
      },
      { h: "Mandat SEMI-EXCLUSIF",
        list: [
          "Exclusivité agence + le propriétaire peut vendre seul (sans autre agence).",
          "Irrévocable 3 mois aussi.",
          "Compromis intéressant pour les vendeurs réticents à l'exclusif.",
        ]
      },
      { h: "Mandat DE RECHERCHE",
        list: [
          "Conclu avec un ACQUÉREUR (pas un vendeur).",
          "Précise : zone, type de bien, budget, surface, critères.",
          "Engage l'acquéreur à passer par toi pour acheter dans ce périmètre.",
          "Honoraires généralement payés par l'acquéreur.",
        ]
      },
      { h: "Argumentaire exclusif",
        b: "« En exclusif, vous avez 1 agence qui se bat pour VOUS. En simple, vous avez 5 agences qui se battent CONTRE elles. Et vous perdez 5 à 7 % sur le prix final. »"
      },
    ],
    linked: ["m8-mentions"],
  },

  "m8-mentions": {
    mod: "m8",
    title: "Les 9 mentions obligatoires du mandat",
    lede: "Une mention manquante = nullité = ZÉRO honoraire. À mémoriser TOUTES.",
    sections: [
      { h: "La liste complète (Loi Hoguet)",
        list: [
          "1. Identité complète du mandant (vendeur) ET du mandataire (agence).",
          "2. N° de carte professionnelle du mandataire.",
          "3. Mention de la RCP et de la garantie financière (avec montants).",
          "4. Désignation précise du bien (adresse, lots, références cadastrales).",
          "5. Prix de vente NET VENDEUR et FAI, en TTC.",
          "6. Durée du mandat + modalités de résiliation.",
          "7. Montant et répartition des honoraires (qui paie : vendeur, acquéreur, ou les deux).",
          "8. N° d'enregistrement au registre des mandats.",
          "9. Moyens de diffusion utilisés (vitrine, web, réseau).",
        ]
      },
      { h: "La règle d'or",
        b: "Une seule mention manquante = NULLITÉ du mandat. Conséquence : tu ne touches RIEN, même si la vente a eu lieu et que tu as bossé 6 mois dessus. Sois maniaque sur ce point."
      },
      { h: "Loi Hamon — bonus",
        b: "Pour les mandats signés HORS établissement (au domicile du vendeur, à distance), il faut en plus : DIP (Document Information Précontractuelle) + droit de rétractation 14 jours."
      },
    ],
    linked: ["m2-hoguet", "m8-types", "m8-registre"],
  },

  "m8-registre": {
    mod: "m8",
    title: "Le registre des mandats",
    lede: "Pièce maîtresse de toute agence. Contrôle régulier de la DGCCRF.",
    sections: [
      { h: "Règles de tenue",
        list: [
          "Obligatoire (support papier OU électronique).",
          "Unique par agence — SAUF si tu détiens T ET G = 2 registres distincts.",
          "Numérotation chronologique sans interruption.",
          "Aucun blanc, aucune rature (ratures = page invalidée).",
          "Conservation 10 ans minimum.",
        ]
      },
      { h: "Informations par mandat",
        list: [
          "N° et date d'enregistrement.",
          "Nom du mandant.",
          "Désignation du bien.",
          "Type de mandat.",
          "Durée.",
          "Honoraires.",
          "Issue du mandat (vendu, expiré, résilié).",
        ]
      },
      { h: "Délégation de mandat",
        b: "Si une autre agence intervient (par exemple via AMANDA), la délégation DOIT être inscrite au registre — sinon elle est inopposable."
      },
    ],
    linked: ["m8-mentions"],
  },

  /* ============ Module 11 — Financement ============ */
  "m11-simples": {
    mod: "m11",
    title: "Intérêts simples",
    lede: "La progression linéaire. Utilisée pour les placements courts (< 1 an).",
    sections: [
      { h: "Formule",
        b: "I = C × t × n"
      },
      { h: "Variables",
        list: [
          "I = Intérêts totaux générés (€).",
          "C = Capital initial placé (€).",
          "t = Taux annuel en DÉCIMAL (5 % = 0,05).",
          "n = Durée en années (3 mois = 0,25 an).",
        ]
      },
      { h: "Exemple chiffré",
        b: "Tu places 1 000 € à 5 % pendant 2 ans. I = 1 000 × 0,05 × 2 = 100 €. Capital final = 1 100 €. Chaque année tu touches 50 € — TOUJOURS calculés sur les 1 000 € initiaux."
      },
      { h: "Quand ça s'applique ?",
        b: "Découverts bancaires, placements à terme < 1 an, calculs d'agios. Plus utilisé pour les longs placements (où les composés s'imposent)."
      },
    ],
    linked: ["m11-composes"],
  },

  "m11-composes": {
    mod: "m11",
    title: "Intérêts composés",
    lede: "Le secret de la richesse selon Einstein : « la 8e merveille du monde ». Progression exponentielle.",
    sections: [
      { h: "Formule",
        b: "Cn = C₀ × (1 + t)ⁿ"
      },
      { h: "Variables",
        list: [
          "Cn = Capital final obtenu (€).",
          "C₀ = Capital initial placé (€).",
          "t = Taux par période en décimal.",
          "n = Nombre de périodes (PAS forcément des années).",
        ]
      },
      { h: "Exemple chiffré",
        b: "1 000 € à 5 % pendant 2 ans :  C₂ = 1 000 × 1,05² = 1 000 × 1,1025 = 1 102,50 €.  Soit 2,50 € de plus qu'avec des intérêts simples — peu sur 2 ans, énorme sur 30 ans."
      },
      { h: "Magie des composés sur 30 ans",
        list: [
          "1 000 € à 5 % pendant 30 ans en simples = 2 500 €.",
          "1 000 € à 5 % pendant 30 ans en composés = 4 322 € (+73 % !).",
        ]
      },
      { h: "Quand ça s'applique ?", b: "Tous les emprunts immobiliers, l'épargne longue, l'assurance vie, le PEA. Et c'est ce qui explique pourquoi un crédit sur 25 ans coûte si cher en intérêts." },
    ],
    linked: ["m11-simples", "m11-mensualite"],
  },

  "m11-taux": {
    mod: "m11",
    title: "Taux proportionnel vs taux équivalent",
    lede: "Le grand piège du BTS. Une question d'arithmétique pure, mais à maîtriser.",
    sections: [
      { h: "Le problème",
        b: "Tu connais le taux ANNUEL d'un crédit (ex : 3,6 %). Mais le crédit se rembourse MENSUELLEMENT. Quel taux mensuel utiliser ?"
      },
      { h: "Taux PROPORTIONNEL — la méthode rapide",
        b: "Tu divises le taux annuel par 12. 3,6 % / 12 = 0,30 % par mois. Simple, MAIS un peu inexact."
      },
      { h: "Taux ÉQUIVALENT — la méthode exacte",
        b: "Tu cherches le taux mensuel qui, capitalisé 12 fois, donne le taux annuel.  t_mens = (1 + t_an)^(1/12) − 1.  Pour 3,6 % : (1,036)^(1/12) − 1 = 0,2952 %."
      },
      { h: "Qui est le plus élevé ?",
        b: "Le taux PROPORTIONNEL est TOUJOURS légèrement supérieur au taux ÉQUIVALENT. C'est la formule à retenir : t_équiv < t_propor."
      },
      { h: "Pourquoi cette différence ?",
        b: "Parce qu'avec le proportionnel, on n'intègre pas la capitalisation des intérêts intra-annuels. Les banques utilisent généralement le proportionnel pour calculer leurs mensualités (plus simple et un peu plus avantageux pour elles)."
      },
      { h: "Table mémo",
        list: [
          "Annuel (1/an) : t",
          "Semestriel (2/an) : t/2 (propor.) — (1+t)^(1/2)−1 (équiv.)",
          "Trimestriel (4/an) : t/4 — (1+t)^(1/4)−1",
          "Mensuel (12/an) : t/12 — (1+t)^(1/12)−1",
        ]
      },
    ],
    linked: ["m11-mensualite"],
  },

  "m11-mensualite": {
    mod: "m11",
    title: "Formule de la mensualité",
    lede: "LA formule de prêt immobilier. À apprendre absolument par cœur.",
    sections: [
      { h: "Formule",
        b: "M = C × tm ÷ [1 − (1 + tm)^(−n)]"
      },
      { h: "Variables",
        list: [
          "M = Mensualité à payer (€).",
          "C = Capital emprunté (€).",
          "tm = Taux MENSUEL en décimal (= t_annuel / 12 en proportionnel).",
          "n = Durée en MOIS (20 ans = 240, 25 ans = 300).",
        ]
      },
      { h: "Exemple chiffré",
        b: "Tu empruntes 200 000 € à 3,6 % sur 20 ans (240 mois). tm = 0,036 / 12 = 0,003. M = 200 000 × 0,003 ÷ [1 − 1,003^(−240)] = 600 / 0,5128 = 1 170 €/mois environ."
      },
      { h: "Coût total du crédit",
        b: "Coût total = (M × n) − C = (1 170 × 240) − 200 000 = 80 800 €. C'est ce que tu paies de plus que le capital."
      },
      { h: "Astuce examen",
        b: "Si on te demande la mensualité à la calculette, tape-la étape par étape : (1+tm) puis ^(-n) puis 1 − résultat puis × C × tm. Évite les erreurs de parenthèses."
      },
    ],
    linked: ["m11-composes", "m11-taux"],
  },

  "m11-endettement": {
    mod: "m11",
    title: "Taux d'endettement (règle HCSF)",
    lede: "La règle qui détermine si la banque te prête — ou pas.",
    sections: [
      { h: "La règle",
        b: "Depuis 2022, le HCSF (Haut Conseil de Stabilité Financière) impose : taux d'endettement maximum = 35 % des revenus nets mensuels du ménage. Hors exception (20 % des dossiers banques)."
      },
      { h: "Calcul",
        b: "Taux endettement = (Total mensualités crédits) ÷ (Revenus nets mensuels du ménage) × 100."
      },
      { h: "Exemple",
        b: "Ménage avec 4 000 €/mois nets. Mensualité max autorisée = 4 000 × 0,35 = 1 400 €/mois. Si tu vises un prêt à 1 170 €/mois, c'est OK."
      },
      { h: "Durée maximale",
        b: "25 ans en standard, 27 ans pour le neuf ou avec différé (VEFA, gros travaux)."
      },
      { h: "Pour les conseillers immo",
        b: "Quand tu rencontres un acquéreur, fais le calcul rapidement dès la première visite. Ça évite de faire visiter à vide un bien hors budget."
      },
    ],
    linked: ["m11-mensualite"],
  },

  /* ============ Synthèse ============ */
  "syn-regles": {
    mod: "syn",
    title: "Les 10 règles d'or",
    lede: "Les vérités qui tombent dans 80 % des sujets. À tatouer.",
    sections: [
      { h: "Liste",
        list: [
          "Sans mandat écrit conforme = ZÉRO honoraire (Loi Hoguet, 1970).",
          "DPE + ERP = TOUJOURS obligatoires (les autres dépendent du bien).",
          "4 × 20 = la 1ère impression. 20 sec, 20 gestes, 20 mots, 20 cm du visage.",
          "Mandat exclusif = irrévocable 3 mois (préavis 15 j pour résilier).",
          "Méthode par comparaison = la référence (fisc + juridictions).",
          "Taux équivalent < Taux proportionnel (toujours).",
          "Registre des mandats = chronologique, sans blanc ni rature.",
          "SONCAS = identifier le mobile dominant + secondaire.",
          "Zone primaire = 80 % du CA. Concentre-toi là.",
          "Taux d'endettement max = 35 % (règle HCSF).",
        ]
      },
      { h: "Stratégie d'examen",
        b: "Si tu n'as pas le temps de tout revoir : assure-toi de connaître CES 10 règles. Elles couvrent à elles seules une bonne partie des points. Le reste = bonus."
      },
    ],
    linked: [],
  },
};
