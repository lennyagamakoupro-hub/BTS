/* Memos data — formulas, key numbers, mnemonics */

/* ============ Memos data — formulas, key numbers, mnemonics ============ */
export const MEMOS = [
  {
    mod: "m1",
    title: "Accueil & Découverte",
    color: "#c95636",
    cards: [
      {
        type: "rule",
        h: "Règle des 4 × 20",
        items: [
          "20 SECONDES — apparence, ponctualité, tenue",
          "20 GESTES — posture, démarche, poignée de main",
          "20 MOTS — phrase d'accroche claire",
          "20 CM — sourire + regard du visage",
        ],
      },
      {
        type: "acronym",
        h: "SONCAS(E)",
        items: [
          "S — Sécurité",
          "O — Orgueil",
          "N — Nouveauté",
          "C — Confort",
          "A — Argent",
          "S — Sympathie",
          "E — Écologie",
        ],
      },
      {
        type: "acronym",
        h: "DIVAS — accueil téléphonique",
        items: [
          "D — Débit adapté",
          "I — Intonation bienveillante",
          "V — Volume mesuré",
          "A — Articulation",
          "S — Sourire (s'entend dans la voix)",
        ],
      },
      {
        type: "rule",
        h: "5 types de questions",
        items: [
          "Ouverte — « Comment imaginez-vous… ? »",
          "Fermée — « Avez-vous déjà visité ? »",
          "Approfondissement — « Pouvez-vous préciser ? »",
          "Miroir — « Trop de travaux… ? »",
          "Inductive — « N'est-ce pas… ? » (à éviter)",
        ],
      },
    ],
  },

  {
    mod: "m2",
    title: "Entreprises & Statuts",
    color: "#2f5d7a",
    cards: [
      {
        type: "rule",
        h: "Cartes professionnelles (Hoguet)",
        items: [
          "T — Transactions immobilières",
          "G — Gestion immobilière",
          "S — Syndic de copropriété",
          "Renouvelée tous les 3 ans",
        ],
      },
      {
        type: "dates",
        h: "Dates des lois clés",
        items: [
          "Hoguet — 2 janvier 1970",
          "Hamon — 17 mars 2014 (DIP + rétractation 14 j)",
          "ALUR — 24 mars 2014 (encadrement + 42 h/3 ans)",
          "ELAN — 23 novembre 2018 (bail mobilité 1-10 mois)",
          "Climat & Résilience — 22 août 2021",
        ],
      },
      {
        type: "rule",
        h: "Formes juridiques — responsabilité",
        items: [
          "EI — Illimitée (sauf RP protégée 2022)",
          "EIRL — Limitée (patrimoine d'affectation)",
          "EURL / SARL — Limitée aux apports",
          "SASU / SAS — Limitée aux apports",
          "SA — Limitée + capital min. 37 000 €",
        ],
      },
      {
        type: "rule",
        h: "Sanctions Loi Hoguet",
        items: [
          "Exercice illégal = 6 mois + 7 500 €",
          "Sans mandat conforme = ZÉRO honoraire",
          "Garantie financière min. 110 000 € (T avec fonds)",
          "Casier judiciaire incompatible = refus de carte",
        ],
      },
    ],
  },

  {
    mod: "m3",
    title: "Prospection",
    color: "#3d6b48",
    cards: [
      {
        type: "acronym",
        h: "Méthode SMART",
        items: [
          "S — Spécifique",
          "M — Mesurable",
          "A — Atteignable",
          "R — Réaliste",
          "T — Temporel",
        ],
      },
      {
        type: "numbers",
        h: "Zones de secteur — répartition du CA",
        items: [
          "Zone primaire (~200 m) — 80 % du CA",
          "Zone secondaire (~1 km) — 15 % du CA",
          "Zone tertiaire (au-delà) — 5 % du CA",
          "Session d'îlotage : 2-3 h MAX",
        ],
      },
      {
        type: "rule",
        h: "4 méthodes de prospection",
        items: [
          "STATIQUE — vitrine, panneaux (passive)",
          "DYNAMIQUE — porte-à-porte, phoning, pige (active)",
          "PROSPECTIVE — fichier, partenaires (notaires/banquiers)",
          "DIGITALE — réseaux sociaux, site, SEO",
        ],
      },
      {
        type: "numbers",
        h: "Repères chiffrés",
        items: [
          "Panneau V/L : 7-15 €/unité",
          "Boîtage flyers : retour 1/1000 (0,1 %)",
          "Phoning : 5-10 estimations / 100 contacts",
          "Pige quotidienne = règle d'or pour rentrer",
        ],
      },
    ],
  },

  {
    mod: "m4",
    title: "Objectifs & Ratios — Formules",
    color: "#b58430",
    cards: [
      {
        type: "formula",
        h: "Prix Net Vendeur ↔ FAI",
        items: [
          "PNV = FAI ÷ (1 + taux)",
          "FAI = PNV × (1 + taux)",
          "Commission = FAI − PNV",
          "Ex : 250 000 / 1,065 = 234 742 € (PNV)",
        ],
      },
      {
        type: "formula",
        h: "HT ↔ TTC (TVA 20 %)",
        items: [
          "HT = TTC ÷ 1,20",
          "TTC = HT × 1,20",
          "TVA = TTC − HT",
          "Ex : 1 200 / 1,20 = 1 000 € (HT)",
        ],
      },
      {
        type: "formula",
        h: "Taux de transformation",
        items: [
          "Estimation → Mandat : (mandats / estim) × 100",
          "Mandat → Vente : (ventes / mandats) × 100",
          "Norme bonne : estim→mandat 50-70 %",
          "Norme bonne : mandat→vente 35-50 %",
        ],
      },
      {
        type: "formula",
        h: "Commission moyenne & coût mandat",
        items: [
          "Commission moy. = CA total ÷ Nb ventes",
          "Coût acquisition mandat = Coût prospection ÷ Nb mandats",
          "Calcul cascade : Salaire → Ventes → Mandats → RDV",
          "Visites moyennes par vente : ~15",
        ],
      },
    ],
  },

  {
    mod: "m5",
    title: "Diagnostics — Tableau de validité",
    color: "#7a3a51",
    cards: [
      {
        type: "table",
        h: "Tous les diagnostics",
        items: [
          "DPE — Tous biens — 10 ans",
          "ERP — Tous biens — 6 mois",
          "Plomb (CREP) — Avant 1949 — Illimité (négatif)",
          "Amiante — PC avant 1/7/1997 — Illimité (négatif)",
          "Gaz — Install. > 15 ans — 3 ans (vente)",
          "Électricité — Install. > 15 ans — 3 ans (vente)",
          "Termites — Zones préfect. — 6 mois",
          "Assainissement — Non raccordé — 3 ans",
          "Bruit — Zones aéroport — Illimité",
        ],
      },
      {
        type: "rule",
        h: "À RETENIR — règles d'or diagnostics",
        items: [
          "DPE + ERP = TOUJOURS obligatoires",
          "Avant 1949 → plomb",
          "Avant 1/7/1997 → amiante",
          "> 15 ans → gaz et élec",
          "DDT = dossier qui regroupe tous les diagnostics",
        ],
      },
      {
        type: "dates",
        h: "Calendrier des passoires thermiques",
        items: [
          "2023 — Interdit. location G > 450 kWh/m²/an",
          "2025 — Interdiction G complet",
          "2028 — Interdiction F",
          "2034 — Interdiction E",
          "DPE opposable depuis le 1/7/2021",
        ],
      },
      {
        type: "rule",
        h: "Mesurage Loi Carrez vs Boutin",
        items: [
          "Carrez — surface privative en COPRO (lots > 8 m²)",
          "Boutin — surface habitable en LOCATION",
          "Carrez : erreur > 5 % = action en réduction 1 an",
          "Hauteur minimum sous plafond : 1,80 m",
        ],
      },
    ],
  },

  {
    mod: "m6",
    title: "Estimation — Méthodes",
    color: "#c95636",
    cards: [
      {
        type: "formula",
        h: "6 méthodes d'estimation",
        items: [
          "Par comparaison — Prix m² × Surface",
          "Par capitalisation — Loyer annuel ÷ Taux",
          "Sol + construction — Valeur sol + bâti − vétusté",
          "Indiciaire — Prix achat × Coeff. érosion",
          "Par les coûts — Foncier + Bâti + Équipements",
          "Compte à rebours — Prix vente − marge − travaux − frais",
        ],
      },
      {
        type: "numbers",
        h: "Grille de pondération",
        items: [
          "Ascenseur : +1 à 2 %",
          "Espaces verts : +5 %",
          "Bonne expo + vue : +3 à 8 %",
          "Étage élevé : +1 % / étage",
          "RDC : jusqu'à −30 %",
          "Sans ascenseur : −8 %",
          "Sans espaces verts : −5 %",
          "DPE F/G : −5 à −15 %",
        ],
      },
      {
        type: "rule",
        h: "Découverte vendeur (R1) — 3 temps",
        items: [
          "PASSÉ — comment a-t-il acheté ? travaux ?",
          "PRÉSENT — qui vend ? raison ? état du bien ?",
          "FUTUR — délai ? urgence ? réemploi des fonds ?",
          "→ Argumentaire R2 = ces infos converties",
        ],
      },
    ],
  },

  {
    mod: "m6b",
    title: "Viager & Démembrement",
    color: "#8a3520",
    cards: [
      {
        type: "formula",
        h: "Viager — calculs clés",
        items: [
          "Rente = (Val. nue-propriété − Bouquet) ÷ Coeff. barème",
          "Bouquet typique = 20 à 30 % de la valeur",
          "Abattement d'occupation : 20 à 40 %",
          "Viager occupé ≈ 95 % des cas",
        ],
      },
      {
        type: "rule",
        h: "Vocabulaire viager",
        items: [
          "CRÉDIRENTIER = VENDEUR (reçoit la rente)",
          "DÉBIRENTIER = ACHETEUR (verse la rente)",
          "BOUQUET = somme comptant à la signature",
          "RENTE = versement périodique jusqu'au décès",
          "ALÉA = condition de validité (sinon contrat nul)",
        ],
      },
      {
        type: "formula",
        h: "Barème usufruit (CGI art. 669)",
        items: [
          "Moins de 21 ans → usufruit 90 %",
          "21-30 → 80 %",
          "31-40 → 70 %",
          "41-50 → 60 %",
          "51-60 → 50 %",
          "61-70 → 40 %",
          "71-80 → 30 %",
          "81-90 → 20 %",
          "91+ → 10 %",
        ],
      },
      {
        type: "rule",
        h: "Démembrement — équation",
        items: [
          "Pleine propriété = Usufruit + Nue-propriété",
          "USUS — droit d'utiliser (usufruitier)",
          "FRUCTUS — droit aux revenus (usufruitier)",
          "ABUSUS — droit de disposer (nu-propriétaire)",
          "Gros travaux (art. 606) = nu-propriétaire",
        ],
      },
    ],
  },

  {
    mod: "m8",
    title: "Mandats — Mentions & Types",
    color: "#2f5d7a",
    cards: [
      {
        type: "rule",
        h: "4 types de mandats",
        items: [
          "SIMPLE — plusieurs agences possibles",
          "EXCLUSIF — 1 agence, irrévocable 3 mois (préavis 15 j)",
          "SEMI-EXCLUSIF — exclu agence + vendeur peut vendre en direct",
          "DE RECHERCHE — signé avec l'acquéreur",
        ],
      },
      {
        type: "rule",
        h: "Les 9 mentions obligatoires (Hoguet)",
        items: [
          "1. Identité mandant + mandataire",
          "2. N° carte professionnelle",
          "3. RCP + Garantie financière",
          "4. Désignation précise du bien",
          "5. Prix de vente TTC",
          "6. Durée + modalités de résiliation",
          "7. Honoraires + répartition",
          "8. N° au registre des mandats",
          "9. Moyens de diffusion utilisés",
        ],
      },
      {
        type: "rule",
        h: "Registre des mandats",
        items: [
          "Tenu chronologiquement",
          "Sans blanc ni rature",
          "Papier OU électronique",
          "Conservation 10 ans",
          "T + G = 2 registres distincts",
        ],
      },
      {
        type: "rule",
        h: "Dossier mandat — pièces vendeur",
        items: [
          "CNI, livret de famille, contrat mariage/PACS",
          "Titre de propriété + dernière taxe foncière",
          "Copro : PV des 3 dernières AG + charges 2 ans",
          "Copro : règlement + état descriptif + carnet entretien",
          "Loi Hamon : DIP + rétractation 14 j (hors étab.)",
        ],
      },
    ],
  },

  {
    mod: "m11",
    title: "Financement — Formules",
    color: "#3d6b48",
    cards: [
      {
        type: "formula",
        h: "Intérêts SIMPLES",
        items: [
          "I = C × t × n",
          "I = Intérêts totaux",
          "C = Capital initial",
          "t = Taux annuel (décimal)",
          "n = Durée en années",
          "Progression LINÉAIRE",
        ],
      },
      {
        type: "formula",
        h: "Intérêts COMPOSÉS",
        items: [
          "Cn = C₀ × (1 + t)ⁿ",
          "Cn = Capital final",
          "C₀ = Capital initial",
          "t = Taux par période (décimal)",
          "n = Nombre de périodes",
          "Progression EXPONENTIELLE",
        ],
      },
      {
        type: "formula",
        h: "Mensualité de prêt immobilier",
        items: [
          "M = C × tm ÷ [1 − (1 + tm)^(−n)]",
          "M = Mensualité (€)",
          "C = Capital emprunté (€)",
          "tm = Taux MENSUEL (= t_annuel / 12)",
          "n = Durée en MOIS (20 ans = 240)",
          "Coût crédit = (M × n) − C",
        ],
      },
      {
        type: "formula",
        h: "Taux proportionnel vs équivalent",
        items: [
          "Proportionnel = t_annuel ÷ nb_périodes",
          "Équivalent = (1 + t)^(1/n) − 1",
          "Équivalent < Proportionnel (toujours)",
          "Mensuel : t/12 (propor.) vs (1+t)^(1/12)−1 (équiv.)",
          "Banques utilisent proportionnel en général",
        ],
      },
      {
        type: "rule",
        h: "Taux d'endettement HCSF",
        items: [
          "Plafond : 35 % des revenus nets mensuels",
          "Calcul : (charges + mensualité) ÷ revenus × 100",
          "Durée max : 25 ans (27 ans neuf/VEFA)",
          "20 % des dossiers en dérogation",
          "Frais notaire : 7-8 % ancien, 2-3 % neuf",
        ],
      },
    ],
  },

  {
    mod: "syn",
    title: "Repères transversaux",
    color: "#b58430",
    cards: [
      {
        type: "rule",
        h: "Les 10 règles d'or",
        items: [
          "1. Sans mandat écrit = ZÉRO honoraire",
          "2. DPE + ERP = TOUJOURS obligatoires",
          "3. 4×20 = 20 sec/gestes/mots/cm",
          "4. Mandat exclusif irrévocable 3 mois",
          "5. Comparaison = méthode de référence",
          "6. Équivalent < Proportionnel",
          "7. Registre : chronologique, sans blanc/rature",
          "8. SONCAS → identifier le mobile dominant",
          "9. Zone primaire = 80 % du CA",
          "10. Endettement max HCSF : 35 %",
        ],
      },
      {
        type: "dates",
        h: "Délais à connaître",
        items: [
          "Loi SRU : rétractation acquéreur 10 j",
          "Loi Hamon : mandat hors étab. 14 j",
          "Loi Scrivener : réflexion offre prêt 10 j",
          "Mandat exclusif : préavis 15 j (après 3 mois)",
          "ERP : 6 mois  ·  DPE : 10 ans",
        ],
      },
      {
        type: "numbers",
        h: "Chiffres clés à retenir",
        items: [
          "SA — capital min. 37 000 €",
          "Garantie financière T avec fonds — 110 000 €",
          "Formation continue ALUR — 42 h / 3 ans",
          "Endettement HCSF — 35 %",
          "Bail mobilité ELAN — 1 à 10 mois",
          "Hauteur min. logement décent — 1,80 m",
          "Surface min. logement décent — 9 m²",
        ],
      },
    ],
  },
];
