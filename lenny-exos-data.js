/* ============================================
   LENNY — Banque d'EXERCICES TYPES (calculs BTS PIM / Transaction)
   Source : Recueil d'exercices et corrections — 1ère année.
   16 dossiers + bonus : énoncé, données, questions, correction
   détaillée (formule + calcul + résultat) et formules à retenir.
   window.EXOS = [ { id, num, theme, titre, epreuve?, enonce[], data[], questions[],
                     correction[ {n,label,formule,calcul,res} ], formules[ {label,f} ],
                     conclusion? } ]
   ============================================ */
window.EXOS = [
  {
    id: "estimation", num: "1", theme: "Estimation", titre: "Estimation immobilière comparative",
    enonce: ["Vous devez estimer une maison individuelle (T5, 102 m² habitables, garage, terrain 450 m²) dans un secteur résidentiel, à partir de trois références comparatives."],
    data: [
      { k: "Bien A", v: "98 m² — 385 000 €" },
      { k: "Bien B", v: "105 m² — 414 750 €" },
      { k: "Bien C", v: "110 m² — 451 000 €" },
      { k: "Marge de négociation", v: "4 %" }
    ],
    questions: [
      "Calculer le prix au m² de chaque référence.",
      "Calculer le prix moyen au m².",
      "Déterminer la valeur estimée du bien (valeur vénale).",
      "Appliquer une marge de négociation de 4 %.",
      "Déterminer le prix affiché conseillé, le prix probable de vente et le prix minimum acceptable."
    ],
    correction: [
      { n: "1", label: "Prix au m² — Bien A", formule: "Prix de vente ÷ Surface", calcul: "385 000 ÷ 98", res: "3 928,57 €/m²" },
      { n: "1", label: "Prix au m² — Bien B", formule: "Prix de vente ÷ Surface", calcul: "414 750 ÷ 105", res: "3 950,00 €/m²" },
      { n: "1", label: "Prix au m² — Bien C", formule: "Prix de vente ÷ Surface", calcul: "451 000 ÷ 110", res: "4 100,00 €/m²" },
      { n: "2", label: "Prix moyen au m²", formule: "Somme des prix au m² ÷ Nombre", calcul: "(3 928,57 + 3 950 + 4 100) ÷ 3", res: "3 992,86 €/m²" },
      { n: "3", label: "Valeur vénale", formule: "Surface × Prix moyen au m²", calcul: "102 × 3 992,86", res: "≈ 407 272 €" },
      { n: "4", label: "Marge de négociation", formule: "Valeur vénale × Taux", calcul: "407 272 × 4 %", res: "≈ 16 291 €" },
      { n: "5A", label: "Prix affiché conseillé", formule: "Valeur vénale + Marge", calcul: "407 272 + 16 291", res: "423 563 €" },
      { n: "5B", label: "Prix probable de vente", formule: "= Valeur vénale", calcul: "—", res: "407 272 €" },
      { n: "5C", label: "Prix minimum acceptable", formule: "Valeur vénale − Marge", calcul: "407 272 − 16 291", res: "390 981 €" }
    ],
    formules: [
      { label: "Prix au m²", f: "Prix de vente ÷ Surface" },
      { label: "Valeur vénale", f: "Surface × Prix moyen au m²" },
      { label: "Prix affiché", f: "Valeur vénale + Marge de négociation" },
      { label: "Prix minimum", f: "Valeur vénale − Marge de négociation" }
    ],
    conclusion: "Le conseil au vendeur présente 3 niveaux : prix affiché 423 563 €, valeur de marché 407 272 €, plancher 390 981 €. Dans le cadre du BTS on applique strictement le % de négociation."
  },
  {
    id: "honoraires", num: "2", theme: "Transaction", titre: "Prix de vente / Net vendeur / Honoraires",
    enonce: ["Le propriétaire souhaite obtenir un Net Vendeur de 410 000 €. Le barème de l'agence est de 5,5 % (calculé sur le Net Vendeur)."],
    data: [{ k: "Net vendeur souhaité", v: "410 000 €" }, { k: "Honoraires agence", v: "5,5 %" }],
    questions: [
      "Calculer le montant des honoraires.",
      "Déterminer le prix de vente FAI.",
      "Retrouver le Net Vendeur à partir du prix FAI.",
      "Vérifier le montant des honoraires."
    ],
    correction: [
      { n: "1", label: "Honoraires", formule: "Net vendeur × Taux", calcul: "410 000 × 5,5 %", res: "22 550 €" },
      { n: "2", label: "Prix FAI", formule: "Net vendeur + Honoraires", calcul: "410 000 + 22 550", res: "432 550 €" },
      { n: "3", label: "Net vendeur (depuis FAI)", formule: "Prix FAI ÷ (1 + taux)", calcul: "432 550 ÷ 1,055", res: "410 000 €" },
      { n: "4", label: "Vérification honoraires", formule: "Prix FAI − Net vendeur", calcul: "432 550 − 410 000", res: "22 550 €" }
    ],
    formules: [
      { label: "Honoraires", f: "Net vendeur × Taux" },
      { label: "Prix FAI", f: "Net vendeur + Honoraires" },
      { label: "Net vendeur (depuis FAI)", f: "Prix FAI ÷ (1 + Taux)" },
      { label: "Taux d'honoraires", f: "(Honoraires ÷ Net vendeur) × 100" }
    ],
    conclusion: "⚠️ En BTS, les honoraires sont le plus souvent calculés sur le Net Vendeur. En pratique, toujours vérifier la base du barème (Net Vendeur ou FAI) : la formule change."
  },
  {
    id: "tva", num: "3", theme: "TVA", titre: "HT / TVA / TTC",
    enonce: ["Les honoraires précédents (22 550 €) sont soumis à une TVA de 20 %."],
    data: [{ k: "Honoraires TTC", v: "22 550 €" }, { k: "Taux de TVA", v: "20 %" }],
    questions: ["Déterminer le montant HT.", "Calculer le montant de TVA.", "Calculer le montant TTC.", "Vérifier vos résultats."],
    correction: [
      { n: "1", label: "Montant HT", formule: "TTC ÷ (1 + TVA)", calcul: "22 550 ÷ 1,20", res: "18 791,67 €" },
      { n: "2", label: "TVA", formule: "HT × Taux", calcul: "18 791,67 × 20 %", res: "3 758,33 €" },
      { n: "3", label: "Montant TTC", formule: "HT + TVA", calcul: "18 791,67 + 3 758,33", res: "22 550,00 €" },
      { n: "4", label: "Vérification", formule: "HT × 1,20", calcul: "18 791,67 × 1,20", res: "22 550,00 €" }
    ],
    formules: [
      { label: "HT (depuis TTC)", f: "TTC ÷ 1,20" },
      { label: "TVA", f: "HT × 20 %" },
      { label: "TTC", f: "HT × 1,20" }
    ],
    conclusion: "Astuce : à 20 % de TVA, on retrouve le HT en divisant le TTC par 1,20."
  },
  {
    id: "transformation", num: "4", theme: "Commercial", titre: "Taux de transformation & ratios commerciaux",
    enonce: ["Campagne de prospection : 2 800 flyers distribués, 196 estimations, 58 mandats signés, 14 ventes. Objectif annuel : 25 ventes."],
    data: [{ k: "Flyers", v: "2 800" }, { k: "Estimations", v: "196" }, { k: "Mandats", v: "58" }, { k: "Ventes", v: "14" }],
    questions: [
      "Calculer les 4 taux de transformation (Flyers→Estim., Estim.→Mandats, Mandats→Ventes, Flyers→Ventes).",
      "Calculer les ratios commerciaux (flyers/estim., estim./mandat, mandats/vente, estim./vente, flyers/vente).",
      "Déterminer les moyens nécessaires pour 25 ventes.",
      "Analyser : étape la plus performante, la plus faible, actions correctives."
    ],
    correction: [
      { n: "1", label: "Flyers → Estimations", formule: "(196 ÷ 2 800) × 100", calcul: "", res: "7 %" },
      { n: "1", label: "Estimations → Mandats", formule: "(58 ÷ 196) × 100", calcul: "", res: "29,59 %" },
      { n: "1", label: "Mandats → Ventes", formule: "(14 ÷ 58) × 100", calcul: "", res: "24,14 %" },
      { n: "1", label: "Flyers → Ventes", formule: "(14 ÷ 2 800) × 100", calcul: "", res: "0,50 %" },
      { n: "2", label: "Flyers / 1 estimation", formule: "2 800 ÷ 196", calcul: "", res: "14,29" },
      { n: "2", label: "Estimations / 1 mandat", formule: "196 ÷ 58", calcul: "", res: "3,38" },
      { n: "2", label: "Mandats / 1 vente", formule: "58 ÷ 14", calcul: "", res: "4,14" },
      { n: "2", label: "Estimations / 1 vente", formule: "196 ÷ 14", calcul: "", res: "14" },
      { n: "2", label: "Flyers / 1 vente", formule: "2 800 ÷ 14", calcul: "", res: "200" },
      { n: "3", label: "Mandats pour 25 ventes", formule: "25 × 4,14", calcul: "", res: "≈ 104 mandats" },
      { n: "3", label: "Estimations pour 25 ventes", formule: "25 × 14", calcul: "", res: "350 estimations" },
      { n: "3", label: "Flyers pour 25 ventes", formule: "25 × 200", calcul: "", res: "5 000 flyers" },
      { n: "4", label: "Plus performante", formule: "—", calcul: "", res: "Estimations → Mandats (29,59 %)" },
      { n: "4", label: "Plus faible", formule: "—", calcul: "", res: "Flyers → Estimations (7 %)" }
    ],
    formules: [
      { label: "Taux de transformation", f: "(Résultat obtenu ÷ Moyens engagés) × 100" },
      { label: "Ratio commercial", f: "Moyens engagés ÷ Résultat obtenu" },
      { label: "Objectif d'actions", f: "Objectif souhaité × Ratio observé" },
      { label: "Taux d'évolution", f: "((Final − Initial) ÷ Initial) × 100" }
    ],
    conclusion: "La transformation estimation→mandat est forte (29,59 %) mais la prospection (flyers→estim.) reste le point faible (7 %). Pour 25 ventes : 104 mandats, 350 estimations, 5 000 flyers."
  },
  {
    id: "partmarche", num: "5", theme: "Commercial", titre: "Part de marché",
    enonce: ["Votre agence a réalisé 42 ventes ; 315 ventes ont été enregistrées sur le secteur."],
    data: [{ k: "Ventes agence", v: "42" }, { k: "Ventes marché", v: "315" }, { k: "Objectif", v: "20 % de part de marché" }],
    questions: ["Calculer la part de marché.", "Interpréter le résultat.", "Combien de ventes supplémentaires pour atteindre 20 % ?"],
    correction: [
      { n: "1", label: "Part de marché", formule: "(Ventes agence ÷ Ventes marché) × 100", calcul: "(42 ÷ 315) × 100", res: "13,33 %" },
      { n: "2", label: "Interprétation", formule: "100 ÷ Part de marché", calcul: "100 ÷ 13,33", res: "≈ 1 vente sur 8" },
      { n: "3", label: "Objectif de ventes à 20 %", formule: "Ventes marché × 20 %", calcul: "315 × 20 %", res: "63 ventes" },
      { n: "3", label: "Ventes supplémentaires", formule: "Objectif − Ventes actuelles", calcul: "63 − 42", res: "21 ventes" }
    ],
    formules: [
      { label: "Part de marché", f: "(Ventes agence ÷ Ventes marché) × 100" },
      { label: "Objectif de ventes", f: "Ventes marché × Part souhaitée" },
      { label: "Ventes supplémentaires", f: "Objectif − Ventes actuelles" }
    ],
    conclusion: "L'agence réalise 13,33 % du marché (1 vente sur 8). Pour viser 20 %, il faut 63 ventes, soit 21 de plus."
  },
  {
    id: "evolution", num: "6", theme: "Commercial", titre: "Taux d'évolution du marché",
    enonce: ["Prix moyen du m² : 2022 = 4 750 €, 2023 = 4 540 €, 2024 = 4 390 €, 2025 = 4 180 €."],
    data: [{ k: "2022", v: "4 750 €" }, { k: "2023", v: "4 540 €" }, { k: "2024", v: "4 390 €" }, { k: "2025", v: "4 180 €" }],
    questions: [
      "Évolution 2022→2023, 2023→2024, 2024→2025.",
      "Évolution globale 2022→2025.",
      "Perte de valeur d'un appartement de 70 m² entre 2022 et 2025.",
      "Commenter l'évolution du marché."
    ],
    correction: [
      { n: "1", label: "2022 → 2023", formule: "((4 540 − 4 750) ÷ 4 750) × 100", calcul: "", res: "−4,42 %" },
      { n: "1", label: "2023 → 2024", formule: "((4 390 − 4 540) ÷ 4 540) × 100", calcul: "", res: "−3,30 %" },
      { n: "1", label: "2024 → 2025", formule: "((4 180 − 4 390) ÷ 4 390) × 100", calcul: "", res: "−4,78 %" },
      { n: "2", label: "Globale 2022 → 2025", formule: "((4 180 − 4 750) ÷ 4 750) × 100", calcul: "", res: "−12,00 %" },
      { n: "3", label: "Valeur 2022 (70 m²)", formule: "4 750 × 70", calcul: "", res: "332 500 €" },
      { n: "3", label: "Valeur 2025 (70 m²)", formule: "4 180 × 70", calcul: "", res: "292 600 €" },
      { n: "3", label: "Perte de valeur", formule: "332 500 − 292 600", calcul: "", res: "39 900 €" }
    ],
    formules: [
      { label: "Taux d'évolution", f: "((Valeur finale − Valeur initiale) ÷ Valeur initiale) × 100" },
      { label: "Valeur d'un bien", f: "Prix au m² × Surface" }
    ],
    conclusion: "Marché en baisse continue : −12 % sur la période. À surface constante, la valeur du bien baisse du même taux que le prix au m²."
  },
  {
    id: "rentabilite", num: "7", theme: "Rentabilité", titre: "Rentabilité locative complète",
    enonce: ["Mme Martin acquiert un appartement locatif. Prix FNI 235 000 €, loyer 1 200 €/mois HC, provisions 120 €/mois, frais de gestion 7 %, GLI 2,8 %, taxe foncière 1 400 € (TEOM 280 €), charges copro bailleur 1 100 €, assurance PNO 180 €."],
    data: [{ k: "Prix FNI", v: "235 000 €" }, { k: "Loyer HC", v: "1 200 €/mois" }, { k: "Provisions", v: "120 €/mois" }, { k: "Gestion / GLI", v: "7 % / 2,8 %" }],
    questions: [
      "Loyer annuel HC, provisions annuelles, revenu annuel encaissé.",
      "Rentabilité brute.",
      "Frais de gestion, coût de la GLI, taxe foncière à charge du propriétaire.",
      "Revenu net annuel (tableau encaissements/décaissements) et rentabilité nette."
    ],
    correction: [
      { n: "1", label: "Loyer annuel HC", formule: "Loyer × 12", calcul: "1 200 × 12", res: "14 400 €" },
      { n: "1", label: "Provisions annuelles", formule: "Provision × 12", calcul: "120 × 12", res: "1 440 €" },
      { n: "1", label: "Revenu annuel encaissé", formule: "Loyer + Provisions", calcul: "14 400 + 1 440", res: "15 840 €" },
      { n: "2", label: "Rentabilité brute", formule: "(Loyer annuel HC ÷ Prix FNI) × 100", calcul: "(14 400 ÷ 235 000) × 100", res: "6,13 %" },
      { n: "3", label: "Frais de gestion", formule: "Revenus × 7 %", calcul: "15 840 × 7 %", res: "1 108,80 €" },
      { n: "3", label: "Coût GLI", formule: "Revenus × 2,8 %", calcul: "15 840 × 2,8 %", res: "443,52 €" },
      { n: "3", label: "Taxe foncière à charge", formule: "Taxe − TEOM récupérable", calcul: "1 400 − 280", res: "1 120 €" },
      { n: "4", label: "Revenu net annuel", formule: "Encaissements − Décaissements", calcul: "15 930 − 5 491,14", res: "10 438,86 €" },
      { n: "4", label: "Rentabilité nette", formule: "(Revenu net ÷ Prix FNI) × 100", calcul: "(10 438,86 ÷ 235 000) × 100", res: "4,44 %" }
    ],
    formules: [
      { label: "Rentabilité brute", f: "(Loyer annuel HC ÷ Prix d'acquisition) × 100" },
      { label: "Revenu net annuel", f: "Encaissements − Décaissements" },
      { label: "Rentabilité nette", f: "(Revenu net ÷ Coût total) × 100" }
    ],
    conclusion: "Rentabilité brute 6,13 %, nette 4,44 % après charges. Le tableau encaissements/décaissements donne une vision professionnelle des flux réellement supportés."
  },
  {
    id: "endettement", num: "8", theme: "Financement", titre: "Capacité d'emprunt & taux d'endettement",
    enonce: ["Ménage : Monsieur 3 100 €, Madame 1 700 €. Crédit auto 280 €/mois, 2 enfants. Projet : crédit immo 1 265 € + assurance 65 € + auto 280 €."],
    data: [{ k: "Revenus ménage", v: "4 800 €/mois" }, { k: "Crédit auto", v: "280 €/mois" }, { k: "Charges projet", v: "1 610 €/mois" }],
    questions: [
      "Capacité maximale à 33 % et 35 %.",
      "Mensualité disponible à 33 % et 35 %.",
      "Charges totales, taux d'endettement, finançabilité.",
      "Reste à vivre mensuel et par personne."
    ],
    correction: [
      { n: "1", label: "Capacité 33 %", formule: "Revenus × 33 %", calcul: "4 800 × 33 %", res: "1 584 €" },
      { n: "1", label: "Capacité 35 %", formule: "Revenus × 35 %", calcul: "4 800 × 35 %", res: "1 680 €" },
      { n: "2", label: "Mensualité dispo 33 %", formule: "Capacité − Crédits", calcul: "1 584 − 280", res: "1 304 €" },
      { n: "2", label: "Mensualité dispo 35 %", formule: "Capacité − Crédits", calcul: "1 680 − 280", res: "1 400 €" },
      { n: "3", label: "Charges totales", formule: "Immo + Assur. + Auto", calcul: "1 265 + 65 + 280", res: "1 610 €" },
      { n: "3", label: "Taux d'endettement", formule: "(Charges ÷ Revenus) × 100", calcul: "(1 610 ÷ 4 800) × 100", res: "33,54 %" },
      { n: "3", label: "Finançable à 33 % ?", formule: "33,54 % > 33 %", calcul: "", res: "Non" },
      { n: "3", label: "Finançable à 35 % ?", formule: "33,54 % < 35 %", calcul: "", res: "Oui" },
      { n: "4", label: "Reste à vivre", formule: "Revenus − Charges", calcul: "4 800 − 1 610", res: "3 190 €" },
      { n: "4", label: "Reste à vivre / personne", formule: "Reste à vivre ÷ 4", calcul: "3 190 ÷ 4", res: "797,50 €" }
    ],
    formules: [
      { label: "Capacité maximale", f: "Revenus × Taux d'endettement" },
      { label: "Taux d'endettement", f: "(Charges ÷ Revenus) × 100" },
      { label: "Reste à vivre", f: "Revenus − Charges" }
    ],
    conclusion: "Taux d'endettement 33,54 % : conforme au plafond de 35 % assurance comprise (HCSF). Reste à vivre confortable de 797,50 €/personne."
  },
  {
    id: "planfinancement", num: "9", theme: "Financement", titre: "Plan de financement",
    enonce: ["Prix du bien 310 000 €, apport 45 000 €, frais de notaire 24 800 €, garantie 3 200 €, dossier 1 000 €."],
    data: [{ k: "Prix", v: "310 000 €" }, { k: "Apport", v: "45 000 €" }, { k: "Frais annexes", v: "29 000 €" }],
    questions: ["Coût total du projet.", "Montant emprunté.", "Pourcentage d'apport.", "Quotité financée par la banque."],
    correction: [
      { n: "1", label: "Coût total", formule: "Prix + Frais annexes", calcul: "310 000 + 24 800 + 3 200 + 1 000", res: "339 000 €" },
      { n: "2", label: "Montant emprunté", formule: "Coût total − Apport", calcul: "339 000 − 45 000", res: "294 000 €" },
      { n: "3", label: "% d'apport", formule: "(Apport ÷ Coût total) × 100", calcul: "(45 000 ÷ 339 000) × 100", res: "13,27 %" },
      { n: "4", label: "Quotité financée", formule: "(Emprunt ÷ Coût total) × 100", calcul: "(294 000 ÷ 339 000) × 100", res: "86,73 %" }
    ],
    formules: [
      { label: "Coût total", f: "Prix + Frais annexes" },
      { label: "Montant emprunté", f: "Coût total − Apport" },
      { label: "Quotité financée", f: "(Emprunt ÷ Coût total) × 100" }
    ],
    conclusion: "Coût total 339 000 €. Apport 13,27 %, financement bancaire 86,73 % (294 000 €)."
  },
  {
    id: "credit", num: "10", theme: "Crédit", titre: "Crédit immobilier",
    enonce: ["Capital emprunté 294 000 €, durée 25 ans (300 mensualités), taux annuel 3,60 %."],
    data: [{ k: "Capital", v: "294 000 €" }, { k: "Durée", v: "25 ans (300 mois)" }, { k: "Taux annuel", v: "3,60 %" }],
    questions: ["Taux mensuel.", "Mensualité du prêt.", "Montant total remboursé.", "Coût des intérêts, coût annuel, coût en % du capital."],
    correction: [
      { n: "1", label: "Taux mensuel", formule: "Taux annuel ÷ 12", calcul: "3,60 % ÷ 12", res: "0,30 %" },
      { n: "2", label: "Mensualité", formule: "M = C × t ÷ (1 − (1+t)^−n)", calcul: "294 000 × 0,003 ÷ (1 − 1,003^−300)", res: "1 487,65 €" },
      { n: "3", label: "Total remboursé", formule: "Mensualité × Nb mensualités", calcul: "1 487,65 × 300", res: "446 295 €" },
      { n: "4", label: "Coût des intérêts", formule: "Total − Capital", calcul: "446 295 − 294 000", res: "152 295 €" },
      { n: "4", label: "Coût annuel moyen", formule: "Intérêts ÷ Durée", calcul: "152 295 ÷ 25", res: "6 091,80 €/an" },
      { n: "4", label: "Coût en % du capital", formule: "(Intérêts ÷ Capital) × 100", calcul: "(152 295 ÷ 294 000) × 100", res: "51,80 %" }
    ],
    formules: [
      { label: "Taux mensuel", f: "Taux annuel ÷ 12" },
      { label: "Mensualité", f: "C × t ÷ (1 − (1 + t)^−n)" },
      { label: "Coût du crédit", f: "Total remboursé − Capital emprunté" }
    ],
    conclusion: "Mensualité ≈ 1 487,65 €. Sur 25 ans : 446 295 € remboursés dont 152 295 € d'intérêts (51,80 % du capital). Plus la durée est longue, plus la mensualité baisse mais plus le coût total augmente."
  },
  {
    id: "credit-table", num: "10 bis", theme: "Crédit", titre: "Crédit immobilier (table financière)",
    enonce: ["Le couple limite sa mensualité à 1 600 €/mois hors assurance. Banque : 20 ans à 3,25 %. Table : pour 1 000 € sur 20 ans à 3,25 %, mensualité = 5,647929 €. Revenus : Mr 3 400 € × 13 mois, Mme 2 200 € × 14 mois."],
    data: [{ k: "Mensualité souhaitée", v: "1 600 €" }, { k: "Coefficient table", v: "5,647929 €" }, { k: "Revenus mensuels moyens", v: "6 250 €" }],
    questions: ["Capital empruntable avec une mensualité de 1 600 €.", "Capital maximum empruntable selon les revenus (35 %)."],
    correction: [
      { n: "—", label: "Revenus annuels ménage", formule: "(3 400×13) + (2 200×14)", calcul: "44 200 + 30 800", res: "75 000 €" },
      { n: "—", label: "Revenus mensuels moyens", formule: "Revenus annuels ÷ 12", calcul: "75 000 ÷ 12", res: "6 250 €" },
      { n: "1", label: "Capital empruntable", formule: "(Mensualité ÷ Coefficient) × 1 000", calcul: "(1 600 ÷ 5,647929) × 1 000", res: "283 290 €" },
      { n: "2", label: "Mensualité maximale", formule: "Revenus × 35 %", calcul: "6 250 × 35 %", res: "2 187,50 €" },
      { n: "2", label: "Capital maximum", formule: "(Mensualité max ÷ Coefficient) × 1 000", calcul: "(2 187,50 ÷ 5,647929) × 1 000", res: "387 305 €" }
    ],
    formules: [
      { label: "Capital (table)", f: "(Mensualité ÷ Coefficient) × Montant de référence" },
      { label: "Revenus mensuels moyens", f: "Revenus annuels ÷ 12" },
      { label: "Mensualité maximale", f: "Revenus mensuels × Taux d'endettement" }
    ],
    conclusion: "Avec sa mensualité choisie (1 600 €), le couple finance ≈ 283 290 €. Sa capacité maximale (35 %) atteint 387 305 € : le projet reste prudent."
  },
  {
    id: "interets-simples", num: "11", theme: "Épargne", titre: "Intérêts simples",
    enonce: ["Un épargnant place 18 000 € pendant 6 ans à 4,5 %/an."],
    data: [{ k: "Capital", v: "18 000 €" }, { k: "Durée", v: "6 ans" }, { k: "Taux", v: "4,5 %/an" }],
    questions: ["Intérêts générés.", "Capital final.", "Gain moyen annuel."],
    correction: [
      { n: "1", label: "Intérêts", formule: "Capital × Taux × Durée", calcul: "18 000 × 4,5 % × 6", res: "4 860 €" },
      { n: "2", label: "Capital final", formule: "Capital + Intérêts", calcul: "18 000 + 4 860", res: "22 860 €" },
      { n: "3", label: "Gain moyen annuel", formule: "Intérêts ÷ Durée", calcul: "4 860 ÷ 6", res: "810 €/an" }
    ],
    formules: [
      { label: "Intérêts simples", f: "Capital × Taux × Durée" },
      { label: "Capital final", f: "Capital initial + Intérêts" }
    ],
    conclusion: "4 860 € d'intérêts, capital final 22 860 €. Les intérêts simples ne portent que sur le capital de départ."
  },
  {
    id: "interets-composes", num: "12", theme: "Épargne", titre: "Intérêts composés",
    enonce: ["Même placement : 18 000 € pendant 6 ans à 4,5 %/an, en intérêts composés."],
    data: [{ k: "Capital", v: "18 000 €" }, { k: "Durée", v: "6 ans" }, { k: "Taux", v: "4,5 %/an" }],
    questions: ["Capital acquis.", "Intérêts générés.", "Comparer avec les intérêts simples.", "Écart de gain."],
    correction: [
      { n: "1", label: "Capital acquis", formule: "Capital × (1 + taux)^n", calcul: "18 000 × 1,045^6", res: "23 488,39 €" },
      { n: "2", label: "Intérêts", formule: "Capital acquis − Capital initial", calcul: "23 488,39 − 18 000", res: "5 488,39 €" },
      { n: "3", label: "Vs intérêts simples", formule: "Comparaison", calcul: "5 488,39 € vs 4 860 €", res: "Composés plus avantageux" },
      { n: "4", label: "Écart de gain", formule: "Composés − Simples", calcul: "5 488,39 − 4 860", res: "628,39 €" }
    ],
    formules: [
      { label: "Capital acquis", f: "Capital × (1 + taux)^durée" },
      { label: "Intérêts", f: "Capital acquis − Capital initial" }
    ],
    conclusion: "Les intérêts composés rapportent 628,39 € de plus : c'est l'effet de capitalisation (les intérêts produisent eux-mêmes des intérêts)."
  },
  {
    id: "plusvalue", num: "13", theme: "Fiscalité", titre: "Plus-value immobilière",
    enonce: ["Achat 185 000 €, revente 355 000 €, détention 18 ans. Abattement IR 6 %/an de la 6ᵉ à la 21ᵉ année (13 ans) ; abattement PS 1,65 %/an. IR 19 %, PS 17,2 %."],
    data: [{ k: "Prix d'achat", v: "185 000 €" }, { k: "Prix de vente", v: "355 000 €" }, { k: "Détention", v: "18 ans (13 années abattables)" }],
    questions: ["Plus-value brute.", "Abattements IR et PS.", "Bases imposables.", "Impôt IR, prélèvements sociaux, total des taxes, montant conservé."],
    correction: [
      { n: "1", label: "Plus-value brute", formule: "Prix vente − Prix achat", calcul: "355 000 − 185 000", res: "170 000 €" },
      { n: "2", label: "Abattement IR", formule: "13 × 6 %", calcul: "", res: "78 %" },
      { n: "3", label: "Abattement PS", formule: "13 × 1,65 %", calcul: "", res: "21,45 %" },
      { n: "4", label: "Base imposable IR", formule: "PV × (100 % − 78 %)", calcul: "170 000 × 22 %", res: "37 400 €" },
      { n: "5", label: "Impôt sur le revenu", formule: "Base IR × 19 %", calcul: "37 400 × 19 %", res: "7 106 €" },
      { n: "6", label: "Base imposable PS", formule: "PV × (100 % − 21,45 %)", calcul: "170 000 × 78,55 %", res: "133 535 €" },
      { n: "7", label: "Prélèvements sociaux", formule: "Base PS × 17,2 %", calcul: "133 535 × 17,2 %", res: "22 968,02 €" },
      { n: "8", label: "Total des taxes", formule: "IR + PS", calcul: "7 106 + 22 968,02", res: "30 074,02 €" },
      { n: "9", label: "Conservé après fiscalité", formule: "PV − Taxes", calcul: "170 000 − 30 074,02", res: "139 925,98 €" }
    ],
    formules: [
      { label: "Plus-value brute", f: "Prix de vente − Prix d'acquisition" },
      { label: "Base imposable", f: "Plus-value × (100 % − Abattement)" },
      { label: "Impôt / PS", f: "Base IR × 19 % | Base PS × 17,2 %" }
    ],
    conclusion: "PV brute 170 000 €. Après abattements, taxes de 30 074,02 €, plus-value nette conservée 139 925,98 €."
  },
  {
    id: "viager-occupe", num: "14", theme: "Viager", titre: "Viager occupé",
    enonce: ["Mme Dupont, 78 ans, vend en viager occupé. Valeur vénale 320 000 €, DUH 35 %, bouquet 80 000 €, espérance de vie 12 ans."],
    data: [{ k: "Valeur vénale", v: "320 000 €" }, { k: "DUH", v: "35 %" }, { k: "Bouquet", v: "80 000 €" }, { k: "Espérance de vie", v: "12 ans" }],
    questions: ["DUH et valeur occupée.", "Capital restant à financer.", "Rente annuelle et mensuelle.", "Montant total versé si décès à 8 ans puis 14 ans."],
    correction: [
      { n: "1", label: "Droit d'usage (DUH)", formule: "Valeur vénale × 35 %", calcul: "320 000 × 35 %", res: "112 000 €" },
      { n: "2", label: "Valeur occupée", formule: "Valeur vénale − DUH", calcul: "320 000 − 112 000", res: "208 000 €" },
      { n: "3", label: "Capital à financer", formule: "Valeur occupée − Bouquet", calcul: "208 000 − 80 000", res: "128 000 €" },
      { n: "4", label: "Rente annuelle", formule: "Capital ÷ Espérance de vie", calcul: "128 000 ÷ 12", res: "10 666,67 €" },
      { n: "5", label: "Rente mensuelle", formule: "Rente annuelle ÷ 12", calcul: "10 666,67 ÷ 12", res: "888,89 €" },
      { n: "6", label: "Total versé (décès à 8 ans)", formule: "Bouquet + Rente × 96", calcul: "80 000 + 888,89 × 96", res: "165 333,44 €" },
      { n: "6", label: "Total versé (décès à 14 ans)", formule: "Bouquet + Rente × 168", calcul: "80 000 + 888,89 × 168", res: "229 333,52 €" }
    ],
    formules: [
      { label: "DUH", f: "Valeur vénale × Taux d'occupation" },
      { label: "Valeur occupée", f: "Valeur vénale − DUH" },
      { label: "Rente annuelle", f: "Capital à financer ÷ Espérance de vie" }
    ],
    conclusion: "Rente mensuelle 888,89 €. Le viager est aléatoire : plus le crédirentier vit longtemps, plus le coût final augmente."
  },
  {
    id: "viager-libre", num: "14 bis", theme: "Viager", titre: "Viager libre",
    enonce: ["Appartement vendu en viager libre. Valeur vénale 250 000 €, bouquet 50 000 €, espérance de vie 15 ans."],
    data: [{ k: "Valeur vénale", v: "250 000 €" }, { k: "Bouquet", v: "50 000 €" }, { k: "Espérance de vie", v: "15 ans" }],
    questions: ["Capital restant à financer.", "Rente annuelle et mensuelle.", "Coût total si décès à 10, 15 et 20 ans.", "Conclure sur l'intérêt financier."],
    correction: [
      { n: "1", label: "Capital à financer", formule: "Valeur vénale − Bouquet", calcul: "250 000 − 50 000", res: "200 000 €" },
      { n: "2", label: "Rente annuelle", formule: "Capital ÷ Espérance de vie", calcul: "200 000 ÷ 15", res: "13 333,33 €" },
      { n: "3", label: "Rente mensuelle", formule: "Rente annuelle ÷ 12", calcul: "13 333,33 ÷ 12", res: "1 111,11 €" },
      { n: "4", label: "Décès à 10 ans", formule: "Bouquet + Rente × 120", calcul: "50 000 + 1 111,11 × 120", res: "183 333,20 €" },
      { n: "4", label: "Décès à 15 ans", formule: "Bouquet + Rente × 180", calcul: "50 000 + 1 111,11 × 180", res: "249 999,80 €" },
      { n: "4", label: "Décès à 20 ans", formule: "Bouquet + Rente × 240", calcul: "50 000 + 1 111,11 × 240", res: "316 666,40 €" }
    ],
    formules: [
      { label: "Capital à financer", f: "Valeur vénale − Bouquet" },
      { label: "Rente annuelle", f: "Capital à financer ÷ Espérance de vie" },
      { label: "Coût total", f: "Bouquet + (Rente × Nombre de périodes)" }
    ],
    conclusion: "À 10 ans l'acquéreur paie moins que la valeur ; à 15 ans ≈ la valeur ; à 20 ans il paie davantage. L'intérêt dépend de la durée de vie du crédirentier."
  },
  {
    id: "remuneration", num: "15", theme: "Rémunération", titre: "Rémunération du négociateur (A → E)",
    enonce: ["Étude de la rémunération des collaborateurs (honoraires, VRP salarié, agent commercial indépendant, cotisations URSSAF, objectif de revenu). TVA 20 %."],
    data: [
      { k: "Ventes (Net Vendeur × taux)", v: "250k×6 % · 315k×5 % · 420k×4,5 % · 280k×5,5 %" },
      { k: "Barème VRP", v: "simple 10 % · exclusif 12 % · acquéreur 8 % (sur HT)" },
      { k: "Barème Agent Co", v: "20 % entrée + 20 % sortie + 20 % acquéreur (sur HT)" },
      { k: "URSSAF micro", v: "23 % du CA encaissé" }
    ],
    questions: [
      "A — Honoraires de chaque vente, CA total, commission moyenne.",
      "B — Commissions du VRP (sur honoraires HT) et rémunération totale.",
      "C — Commissions de l'agent commercial indépendant.",
      "D — Cotisations URSSAF et revenu restant.",
      "E — Nombre de ventes pour un objectif de 4 000 € nets/mois."
    ],
    correction: [
      { n: "A1", label: "Honoraires (TTC) total", formule: "Σ (Net vendeur × taux)", calcul: "15 000 + 15 750 + 18 900 + 15 400", res: "65 050 €" },
      { n: "A3", label: "Commission moyenne / vente", formule: "Total ÷ 4", calcul: "65 050 ÷ 4", res: "16 262,50 €" },
      { n: "B", label: "VRP — Franconville (simple)", formule: "HT 12 500 × 10 %", calcul: "", res: "1 250 €" },
      { n: "B", label: "VRP — Sannois (simple)", formule: "HT 13 125 × 10 %", calcul: "", res: "1 312,50 €" },
      { n: "B", label: "VRP — Ermont (exclusif)", formule: "HT 15 750 × 12 %", calcul: "", res: "1 890 €" },
      { n: "B7", label: "VRP — ventes acquéreurs", formule: "Σ (HT × 8 %)", calcul: "1 000 + 1 050 + 1 260", res: "3 310 €" },
      { n: "B8", label: "Rémunération brute VRP", formule: "Somme", calcul: "1 250 + 1 312,50 + 1 890 + 3 310", res: "7 762,50 €" },
      { n: "C14", label: "Agent Co — total commissions", formule: "Σ ((TTC÷1,20) × %)", calcul: "5 500 + 4 666,67 + 7 000 + 2 250", res: "19 416,67 €" },
      { n: "D15", label: "Cotisations URSSAF", formule: "CA × 23 %", calcul: "19 416,67 × 23 %", res: "4 465,83 €" },
      { n: "D16", label: "Revenu restant avant IR", formule: "CA − Cotisations", calcul: "19 416,67 − 4 465,83", res: "14 950,84 €" },
      { n: "E", label: "Revenu brut à générer", formule: "Net ÷ (1 − 23 %)", calcul: "4 000 ÷ 0,77", res: "5 194,81 €" },
      { n: "E", label: "Ventes / mois (15 000 € HT)", formule: "5 194,81 ÷ (12 500 × 40 %)", calcul: "", res: "≈ 1 vente/mois → 13/an" }
    ],
    formules: [
      { label: "Honoraires HT", f: "Honoraires TTC ÷ 1,20" },
      { label: "Commission VRP/Agent Co", f: "Honoraires HT × Taux du barème" },
      { label: "Cotisations URSSAF", f: "CA encaissé × Taux" },
      { label: "Revenu brut cible", f: "Revenu net ÷ (1 − Taux cotisations)" }
    ],
    conclusion: "Le VRP salarié gagne 7 762,50 € ; l'agent commercial 19 416,67 € (14 950,84 € après URSSAF, soit 77 %), mais finance lui-même sa protection sociale. ⚠️ Toujours convertir les honoraires TTC en HT avant de calculer la commission."
  },
  {
    id: "bonus-investisseur", num: "Bonus", theme: "Rentabilité", titre: "Bonus — Rentabilité investisseur (immeuble de rapport)",
    enonce: ["Immeuble de 4 appartements loués 850 € HC/mois. Prix 620 000 € FAI, honoraires 20 000 €, taxe foncière 4 200 €, charges non récupérables 2 800 €, PNO 450 €, GLI 2,5 %, frais de notaire 8 %."],
    data: [{ k: "Prix FAI", v: "620 000 €" }, { k: "Loyers", v: "4 × 850 €/mois" }, { k: "Objectif", v: "Rentabilité nette 7 %" }],
    questions: ["Net vendeur.", "Revenus locatifs annuels.", "Rentabilité brute.", "Rentabilité nette.", "Prix maximum pour 7 % net et net vendeur maximum."],
    correction: [
      { n: "1", label: "Net vendeur", formule: "Prix FAI − Honoraires", calcul: "620 000 − 20 000", res: "600 000 €" },
      { n: "2", label: "Loyers annuels", formule: "4 × 850 × 12", calcul: "", res: "40 800 €" },
      { n: "3", label: "Rentabilité brute", formule: "(40 800 ÷ 620 000) × 100", calcul: "", res: "6,58 %" },
      { n: "4", label: "Revenu net annuel", formule: "Encaissements − Décaissements", calcul: "40 800 − 8 470", res: "32 330 €" },
      { n: "4", label: "Coût total opération", formule: "Prix FAI + Notaire 8 %", calcul: "620 000 + 49 600", res: "669 600 €" },
      { n: "4", label: "Rentabilité nette", formule: "(32 330 ÷ 669 600) × 100", calcul: "", res: "4,83 %" },
      { n: "5", label: "Prix maximum (7 %)", formule: "Revenu net ÷ 7 %", calcul: "32 330 ÷ 7 %", res: "461 857 €" },
      { n: "5", label: "Net vendeur maximum", formule: "Prix max ÷ 1,08", calcul: "461 857 ÷ 1,08", res: "427 645 €" }
    ],
    formules: [
      { label: "Rentabilité nette", f: "(Revenu net annuel ÷ Coût total) × 100" },
      { label: "Prix maximum investisseur", f: "Revenu net annuel ÷ Rentabilité souhaitée" },
      { label: "Net vendeur maximum", f: "Prix acte en main ÷ (1 + frais d'acquisition)" }
    ],
    conclusion: "Au prix demandé, rentabilité nette 4,83 % < objectif 7 %. Pour atteindre 7 %, ne pas dépasser ≈ 461 857 € (net vendeur ≈ 427 645 €)."
  },
  {
    id: "syndic-charges", num: "S1", theme: "Syndic", titre: "Répartition des charges de copropriété",
    enonce: ["Copropriété de 10 000 tantièmes généraux. M. Durand possède un lot de 850 tantièmes. Le budget prévisionnel annuel (charges générales) est de 48 000 €. Les charges spéciales d'ascenseur (9 000 €/an) sont réparties sur 6 000 tantièmes — le rez-de-chaussée en est exclu ; M. Durand détient 600 tantièmes d'ascenseur."],
    data: [
      { k: "Tantièmes généraux (total)", v: "10 000" },
      { k: "Lot de M. Durand", v: "850 tantièmes" },
      { k: "Budget prévisionnel", v: "48 000 €/an" },
      { k: "Charges ascenseur", v: "9 000 € sur 6 000 tantièmes" },
      { k: "Tantièmes ascenseur Durand", v: "600" }
    ],
    questions: [
      "Calculer le prix au tantième des charges générales.",
      "Déterminer la quote-part de M. Durand dans les charges générales.",
      "Déterminer sa quote-part dans les charges d'ascenseur.",
      "Calculer le total annuel de charges courantes de M. Durand."
    ],
    correction: [
      { n: "1", label: "Prix au tantième (général)", formule: "Budget ÷ Total tantièmes", calcul: "48 000 ÷ 10 000", res: "4,80 €/tantième" },
      { n: "2", label: "Quote-part charges générales", formule: "Budget × (Tantièmes lot ÷ Total)", calcul: "48 000 × (850 ÷ 10 000)", res: "4 080 €" },
      { n: "3", label: "Quote-part ascenseur", formule: "Charges × (Tantièmes lot ÷ Total spécial)", calcul: "9 000 × (600 ÷ 6 000)", res: "900 €" },
      { n: "4", label: "Total charges courantes", formule: "Générales + Spéciales", calcul: "4 080 + 900", res: "4 980 €/an" }
    ],
    formules: [
      { label: "Prix au tantième", f: "Montant des charges ÷ Total des tantièmes" },
      { label: "Quote-part d'un lot", f: "Charges × (Tantièmes du lot ÷ Total tantièmes)" },
      { label: "Charges spéciales", f: "Réparties uniquement entre les lots concernés" }
    ],
    conclusion: "Les charges générales se répartissent sur tous les tantièmes ; les charges spéciales (ascenseur, chauffage…) seulement entre les lots qui en bénéficient. M. Durand paie 4 980 €/an au total."
  },
  {
    id: "syndic-budget", num: "S2", theme: "Syndic", titre: "Budget, appels de fonds & fonds de travaux (ALUR)",
    enonce: ["Même copropriété : budget prévisionnel 48 000 €, M. Durand 850/10 000 tantièmes. Les charges sont appelées par trimestre. Un fonds de travaux (loi ALUR) est alimenté à hauteur de 5 % du budget prévisionnel. À la clôture de l'exercice, les charges réelles s'élèvent à 51 200 € (provisions appelées : 48 000 €)."],
    data: [
      { k: "Budget prévisionnel", v: "48 000 €" },
      { k: "Quote-part Durand", v: "850 / 10 000" },
      { k: "Fonds de travaux ALUR", v: "5 % du budget" },
      { k: "Charges réelles", v: "51 200 €" },
      { k: "Provisions appelées", v: "48 000 €" }
    ],
    questions: [
      "Calculer l'appel de fonds trimestriel (total et part de M. Durand).",
      "Calculer la cotisation annuelle au fonds de travaux (total et part de Durand).",
      "Déterminer la régularisation annuelle des charges (solde global et part de Durand).",
      "Conclure : M. Durand est-il remboursé ou doit-il un complément ?"
    ],
    correction: [
      { n: "1", label: "Appel trimestriel (total)", formule: "Budget ÷ 4", calcul: "48 000 ÷ 4", res: "12 000 €" },
      { n: "1", label: "Appel trimestriel (Durand)", formule: "Appel × (850 ÷ 10 000)", calcul: "12 000 × 0,085", res: "1 020 €" },
      { n: "2", label: "Fonds de travaux (total)", formule: "Budget × 5 %", calcul: "48 000 × 5 %", res: "2 400 €" },
      { n: "2", label: "Fonds de travaux (Durand)", formule: "2 400 × (850 ÷ 10 000)", calcul: "2 400 × 0,085", res: "204 €" },
      { n: "3", label: "Régularisation (total)", formule: "Charges réelles − Provisions", calcul: "51 200 − 48 000", res: "+3 200 €" },
      { n: "3", label: "Régularisation (Durand)", formule: "3 200 × (850 ÷ 10 000)", calcul: "3 200 × 0,085", res: "+272 €" },
      { n: "4", label: "Conclusion", formule: "Réel > Provisions", calcul: "Complément à appeler", res: "Durand doit 272 €" }
    ],
    formules: [
      { label: "Appel de fonds trimestriel", f: "Budget prévisionnel ÷ 4" },
      { label: "Fonds de travaux (mini ALUR)", f: "Budget prévisionnel × 5 %" },
      { label: "Régularisation des charges", f: "Charges réelles − Provisions appelées" }
    ],
    conclusion: "Les charges réelles dépassent les provisions de 3 200 € : chaque copropriétaire est appelé en complément au prorata de ses tantièmes. M. Durand doit 272 € de plus. Si les provisions avaient été supérieures, il aurait été remboursé."
  }
];

/* Fiche méthode — synthèse des formules par domaine (Dossier 16) */
window.EXOS_FICHE = [
  { dom: "Estimation", rows: [
    ["Prix au m²", "Valeur du bien ÷ Surface"],
    ["Valeur vénale", "Surface × Prix au m²"],
    ["Prix affiché", "Valeur vénale + Marge de négociation"],
    ["Prix minimum acceptable", "Prix affiché − Marge de négociation"]
  ]},
  { dom: "Transaction", rows: [
    ["Honoraires (sur Net Vendeur)", "Net vendeur × Taux"],
    ["Prix FAI", "Net vendeur + Honoraires"],
    ["Net vendeur (depuis FAI)", "Prix FAI ÷ (1 + Taux)"],
    ["Taux d'honoraires", "(Honoraires ÷ Net vendeur) × 100"]
  ]},
  { dom: "TVA", rows: [
    ["TVA (depuis HT)", "HT × Taux de TVA"],
    ["HT (depuis TTC)", "TTC ÷ (1 + TVA)"],
    ["TTC (depuis HT)", "HT + TVA"]
  ]},
  { dom: "Commercial", rows: [
    ["Taux de transformation", "(Résultat ÷ Moyens engagés) × 100"],
    ["Ratio commercial", "Moyens engagés ÷ Résultat"],
    ["Part de marché", "(Ventes agence ÷ Ventes marché) × 100"],
    ["Taux d'évolution", "((Final − Initial) ÷ Initial) × 100"]
  ]},
  { dom: "Rentabilité", rows: [
    ["Loyer annuel HC", "Loyer mensuel × 12"],
    ["Revenu net annuel", "Encaissements − Décaissements"],
    ["Rentabilité brute", "(Loyer annuel HC ÷ Prix) × 100"],
    ["Rentabilité nette", "(Revenu net ÷ Coût total) × 100"],
    ["Prix maximum investisseur", "Revenu net ÷ Rentabilité souhaitée"]
  ]},
  { dom: "Financement", rows: [
    ["Capacité d'endettement", "Revenus × Taux d'endettement"],
    ["Mensualité disponible", "Capacité maximale − Crédits en cours"],
    ["Taux d'endettement", "(Charges ÷ Revenus) × 100"],
    ["Reste à vivre", "Revenus − Charges"],
    ["Coût total du projet", "Prix du bien + Frais annexes"],
    ["Montant emprunté", "Coût total − Apport"]
  ]},
  { dom: "Crédit", rows: [
    ["Taux mensuel", "Taux annuel ÷ 12"],
    ["Mensualité", "(C × t) ÷ (1 − (1 + t)^−n)"],
    ["Coût du crédit", "Total remboursé − Capital"],
    ["Capital (table financière)", "(Mensualité ÷ Coefficient) × Montant de référence"]
  ]},
  { dom: "Épargne", rows: [
    ["Intérêts simples", "Capital × Taux × Durée"],
    ["Capital acquis (composés)", "Capital × (1 + Taux)^Durée"]
  ]},
  { dom: "Fiscalité (plus-value)", rows: [
    ["Plus-value brute", "Prix de vente − Prix d'acquisition"],
    ["Base imposable IR", "PV × (100 % − Abattement IR)"],
    ["Impôt sur le revenu", "Base IR × 19 %"],
    ["Prélèvements sociaux", "Base PS × 17,2 %"],
    ["Montant conservé", "PV brute − Fiscalité totale"]
  ]},
  { dom: "Viager", rows: [
    ["DUH / usufruit", "Valeur vénale × Taux d'occupation"],
    ["Valeur occupée", "Valeur vénale − DUH"],
    ["Capital à financer", "Valeur occupée − Bouquet"],
    ["Rente annuelle", "Capital à financer ÷ Espérance de vie"],
    ["Rente mensuelle", "Rente annuelle ÷ 12"]
  ]},
  { dom: "Rémunération", rows: [
    ["Honoraires HT", "Honoraires TTC ÷ 1,20"],
    ["Commission négociateur", "Honoraires HT × Taux du barème"],
    ["Cotisations URSSAF", "Commission brute × Taux"],
    ["Revenu cible (brut)", "Revenu net ÷ (1 − Taux cotisations)"]
  ]},
  { dom: "Syndic / Copropriété", rows: [
    ["Prix au tantième", "Montant des charges ÷ Total des tantièmes"],
    ["Quote-part d'un lot", "Charges × (Tantièmes du lot ÷ Total tantièmes)"],
    ["Appel de fonds trimestriel", "Budget prévisionnel ÷ 4"],
    ["Fonds de travaux (mini ALUR)", "Budget prévisionnel × 5 %"],
    ["Régularisation des charges", "Charges réelles − Provisions appelées"]
  ]}
];
