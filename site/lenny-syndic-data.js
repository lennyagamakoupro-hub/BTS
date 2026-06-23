/* ============================================
   LENNY — Contenu SYNDIC : module 4.4
   « La gestion du personnel de la copropriété » (mperso)
   D'après le cours Administration des copropriétés & habitat social.
   Alimente : ESSENTIALS, STUDY (fiches + quiz court), QUIZ (détaillé), MEMOS.
   Fusionne sans écraser l'existant.
   ============================================ */

// ---------- ESSENTIEL (à-retenir + frise) ----------
window.ESSENTIALS = Object.assign(window.ESSENTIALS || {}, {
  mperso: {
    retenir: [
      { k: "L'employeur", v: "Le SYNDICAT des copropriétaires. Le syndic signe le contrat comme mandataire (engage, congédie, fixe les conditions)." },
      { k: "Convention collective", v: "CNC du 11 décembre 1979 (gardiens, concierges, employés d'immeubles) — IDCC 1527. Le contrat ne peut déroger que dans un sens plus favorable." },
      { k: "2 catégories", v: "A = employés d'immeubles (horaire précis, rémunérés au temps, non logés) · B = gardiens d'immeubles (UV, logement de fonction obligatoire)" },
      { k: "Les UV", v: "Unités de valeur : chaque tâche vaut un nombre d'UV fixé par la CNC, indépendant de la fréquence. Amplitude horaire ≤ 47,5 h." },
      { k: "Salaire minimum", v: "(Coefficient hiérarchique × Valeur du point) + Valeur fixe. Coefficient = « pesée du poste » sur 6 critères." },
      { k: "Service du gardien", v: "Partiel · permanent (3 400–9 000 UV, permanence de jour) · complet (≥ 10 000 UV)" },
      { k: "Congés payés", v: "2,5 jours ouvrables / mois (30 j/an) dès 1 mois de travail. Indemnité : maintien ou 1/10e (le plus élevé)." },
    ],
    timeline: [
      { y: "1979", t: "Convention nationale collective (11 décembre) — gardiens & employés d'immeubles" },
      { y: "art. 225-2", t: "Code pénal — non-discrimination à l'embauche : 3 ans / 45 000 €" },
      { y: "art. L7213-2", t: "Code du travail — le gardien logé peut choisir son remplaçant (agrément sous 8 jours)" },
      { y: "art. 26", t: "Loi de 1965 — suppression du poste de gardien votée en AG (ou unanimité)" },
    ],
  },
});

// ---------- FICHES (flashcards) + quiz court ----------
window.STUDY = Object.assign(window.STUDY || {}, {
  mperso: {
    cards: [
      { q: "Faut-il voter la création d'un poste de gardien ?", a: "Si le poste est inscrit au règlement de copropriété : aucun vote. Sinon : vote en AG à l'UNANIMITÉ. L'AG seule fixe le nombre et la catégorie des emplois." },
      { q: "Qui est l'employeur du personnel de la copropriété ?", a: "Le SYNDICAT des copropriétaires. Le syndic signe le contrat en tant que mandataire ; il engage, congédie et fixe les conditions de travail. Le salaire et les charges sont payés par le syndicat." },
      { q: "Quelle convention collective s'applique ?", a: "La Convention Nationale Collective du 11 décembre 1979 (gardiens, concierges et employés d'immeubles). Le contrat individuel ne peut déroger au Code du travail et à la CNC que dans un sens plus favorable au salarié." },
      { q: "La visite médicale d'embauche est-elle toujours obligatoire ?", a: "En principe oui (art. R4624-10 et s.), demandée par l'employeur lors de la DUE. Dispense possible si le salarié occupait un emploi identique récemment sans inaptitude — mais l'employeur doit la faire si le salarié le demande." },
      { q: "La sanction de la discrimination à l'embauche ?", a: "Jusqu'à 3 ans de prison et 45 000 € d'amende (art. 225-2 du Code pénal). La discrimination porte sur l'origine, le sexe, la santé, l'âge, les opinions, etc." },
      { q: "Catégorie A vs catégorie B ?", a: "A = employés d'immeubles : régime de droit commun, rémunérés au temps de travail précis, généralement non logés. B = gardiens d'immeubles : rémunérés en UV (pas de référence horaire stricte), logement de fonction OBLIGATOIRE." },
      { q: "Que doit obligatoirement préciser le contrat de travail ?", a: "Les fonctions, les conditions de travail (détail des tâches pour la catégorie B), la classification et le coefficient hiérarchique, le montant des appointements, le lieu de travail, l'évaluation du salaire en nature (personnel logé), et pour un CDD le terme." },
      { q: "Quelle est l'amplitude horaire maximale du gardien (cat. B) ?", a: "47,5 heures. À chaque tâche correspond un nombre d'UV fixé par la CNC ; la fréquence de la tâche n'augmente pas les UV (sortir les poubelles 2 ou 4 fois = mêmes UV)." },
      { q: "Les trois types de service du gardien ?", a: "Partiel (peut travailler ailleurs hors tâches) · Permanent (3 400 à 9 000 UV, permanence de jour) · Complet (au moins 10 000 UV). Entre 9 000 et 10 000 UV avec permanence → porté automatiquement à 10 000." },
      { q: "Qu'est-ce que la « pesée du poste » ?", a: "Le coefficient hiérarchique. Chaque poste est pesé sur 6 critères (relationnel, compétences administratives, autonomie, compétences techniques, supervision, formation), chacun sur 5 niveaux. Le total des points = la pesée." },
      { q: "Comment calcule-t-on le salaire minimum conventionnel ?", a: "Salaire minimum = (Coefficient hiérarchique × Valeur du point) + Valeur fixe. La valeur du point et la valeur fixe sont fixées par la convention collective." },
      { q: "Qu'est-ce que l'avantage en nature du gardien ?", a: "La mise à disposition d'un logement de fonction (catégorie B). Sa valeur est déjà comprise dans le salaire minimum CNC. Calcul : surface habitable (max 60 m²) × prix au m² selon la catégorie (1 : 3,211 € · 2 : 2,535 € · 3 : 1,872 €). Imposable." },
      { q: "Les composantes du salaire brut global ?", a: "Salaire minimum × taux d'emploi + prime d'ancienneté (plafonnée à 18 %) + 13e mois (décembre) + prime de tri sélectif + éventuel salaire supplémentaire contractuel." },
      { q: "La prime de tri sélectif ?", a: "Pour les gardiens (cat. B) chargés des ordures ménagères. Calculée selon le nombre de lots principaux (min 23 € / max 184 € brut). Incluse dans l'indemnité de congés payés mais exclue du 13e mois." },
      { q: "Le droit aux congés payés ?", a: "2,5 jours ouvrables par mois de travail effectif (30 jours/an) dès 1 mois chez le même employeur ; jusqu'à 4 semaines entre le 1er mai et le 31 octobre. Indemnité = règle du maintien OU du 1/10e (le plus favorable)." },
      { q: "Comment le gardien est-il remplacé pendant ses congés ?", a: "Le syndic signe un CDD. Rémunération majorée de 10 % si remplacement < 2 mois + indemnité de CP + prorata 13e mois + indemnité de fin de contrat (10 %). Le gardien logé peut choisir son remplaçant (agrément sous 8 jours)." },
      { q: "Les préavis de démission ?", a: "8 jours pour un salarié non logé avec coefficient ≤ 602 points ; 1 mois pour un salarié logé ou de coefficient > 602. Le logement de fonction doit être libéré à l'expiration du préavis." },
      { q: "Comment supprimer le poste de gardien ?", a: "Après licenciement ou départ à la retraite, par vote en AG : à la majorité de l'article 26, ou à l'UNANIMITÉ si la suppression porte atteinte à la destination de l'immeuble ou à la jouissance des parties privatives." },
    ],
    quiz: [
      { q: "L'employeur du gardien est :", c: ["le syndic", "le conseil syndical", "le syndicat des copropriétaires", "chaque copropriétaire"], r: 2 },
      { q: "Un gardien d'immeuble relève de la catégorie :", c: ["A", "B", "C", "cadre"], r: 1 },
      { q: "Le salaire minimum conventionnel = ", c: ["coefficient + valeur du point", "(coefficient × valeur du point) + valeur fixe", "UV × SMIC", "valeur fixe × ancienneté"], r: 1 },
    ],
  },
});

// ---------- QUIZ détaillé (avec explications) ----------
window.QUIZ = Object.assign(window.QUIZ || {}, {
  mperso: [
    { q: "Si le poste de gardien n'est pas inscrit au règlement de copropriété, sa création se vote :", c: ["à la majorité simple", "à la majorité absolue", "à l'unanimité", "sans vote"], r: 2, e: "Si le poste figure au règlement, aucun vote n'est nécessaire. Sinon, la mise en place d'un gardien se vote en AG à l'unanimité. L'AG seule fixe le nombre et la catégorie des emplois." },
    { q: "Le contrat de travail du personnel de copropriété est signé par :", c: ["le président du conseil syndical", "le syndic, mandataire du syndicat", "chaque copropriétaire", "le maire"], r: 1, e: "Le syndicat des copropriétaires est l'employeur, mais c'est le syndic qui signe le contrat en tant que mandataire ; il engage, congédie et fixe les conditions de travail." },
    { q: "La convention collective applicable date du :", c: ["10 juillet 1965", "11 décembre 1979", "6 juillet 1989", "24 mars 2014"], r: 1, e: "La CNC du 11 décembre 1979 (IDCC 1527) régit les gardiens, concierges et employés d'immeubles. Le contrat individuel ne peut y déroger que dans un sens plus favorable au salarié." },
    { q: "Une discrimination à l'embauche est punie de :", c: ["1 an et 15 000 €", "3 ans et 45 000 €", "5 ans et 75 000 €", "6 mois et 7 500 €"], r: 1, e: "Article 225-2 du Code pénal : jusqu'à 3 ans d'emprisonnement et 45 000 € d'amende pour une personne physique." },
    { q: "Le gardien d'immeuble (catégorie B) se caractérise par :", c: ["une rémunération horaire stricte", "une rémunération en UV et un logement de fonction obligatoire", "l'absence de contrat écrit", "un statut de cadre"], r: 1, e: "La catégorie B (gardiens) est rémunérée selon les unités de valeur, sans référence horaire stricte, et bénéficie obligatoirement d'un logement de fonction. La catégorie A (employés) est rémunérée au temps de travail." },
    { q: "L'amplitude horaire d'un gardien ne peut dépasser :", c: ["35 heures", "39 heures", "47,5 heures", "48 heures"], r: 2, e: "Pour la catégorie B, le contrat liste des tâches valorisées en UV, mais l'amplitude horaire ne peut excéder 47,5 heures." },
    { q: "Un gardien à service complet totalise :", c: ["moins de 3 400 UV", "entre 3 400 et 9 000 UV", "au moins 10 000 UV", "exactement 5 000 UV"], r: 2, e: "Service partiel (peut travailler ailleurs), permanent (3 400 à 9 000 UV avec permanence de jour), complet (au moins 10 000 UV). Entre 9 000 et 10 000 avec permanence → porté à 10 000." },
    { q: "Le salaire minimum conventionnel se calcule :", c: ["coefficient × SMIC", "(coefficient hiérarchique × valeur du point) + valeur fixe", "valeur du point + ancienneté", "UV × valeur fixe"], r: 1, e: "Salaire minimum = (coefficient hiérarchique × valeur du point) + valeur fixe. Le coefficient résulte de la « pesée du poste » sur 6 critères. Valeur du point et valeur fixe sont données par la CNC." },
    { q: "La prime d'ancienneté est plafonnée à :", c: ["10 %", "15 %", "18 %", "20 %"], r: 2, e: "La prime d'ancienneté, calculée sur le salaire brut mensuel conventionnel, est plafonnée à 18 %. Elle doit figurer explicitement sur le bulletin de paie." },
    { q: "La prime de tri sélectif est :", c: ["calculée selon le nombre de conteneurs", "incluse dans le 13e mois", "calculée selon le nombre de lots principaux (23 à 184 €)", "réservée à la catégorie A"], r: 2, e: "Versée aux gardiens (cat. B) en charge des ordures, elle dépend du nombre de lots principaux (min 23 €, max 184 € brut). Le nombre de conteneurs n'intervient pas. Elle est incluse dans l'indemnité de CP mais exclue du 13e mois." },
    { q: "Le droit aux congés payés est de :", c: ["2 jours par mois", "2,5 jours ouvrables par mois (30 j/an)", "1,5 jour par mois", "25 jours par an"], r: 1, e: "2,5 jours ouvrables par mois de travail effectif (30 jours/an), dès 1 mois chez le même employeur. 4 semaines possibles entre le 1er mai et le 31 octobre." },
    { q: "Pour supprimer le poste de gardien (sans atteinte à la destination de l'immeuble), l'AG vote :", c: ["à la majorité de l'article 24", "à la majorité de l'article 25", "à la majorité de l'article 26", "sans vote"], r: 2, e: "La suppression du poste se vote à la majorité de l'article 26 ; l'unanimité est requise seulement si la suppression porte atteinte à la destination de l'immeuble ou à la jouissance des parties privatives." },
  ],
});

// ---------- MÉMOS ----------
window.MEMOS = (window.MEMOS || []).concat([
  {
    mod: "mperso", title: "Gestion du Personnel de Copropriété", color: "#3f6b4a",
    cards: [
      { type: "formula", h: "Le salaire", items: [
        "Salaire minimum = (Coefficient × Valeur du point) + Valeur fixe",
        "Brut global = (minimum × taux d'emploi) + ancienneté + 13e mois + tri sélectif",
        "Avantage nature = surface (≤ 60 m²) × prix/m² (cat. 1 : 3,211 € · 2 : 2,535 € · 3 : 1,872 €)",
        "Prime d'ancienneté plafonnée à 18 %",
      ]},
      { type: "acronym", h: "Catégories de personnel", items: [
        "A — employés d'immeubles : au temps, non logés",
        "B — gardiens : en UV, logement de fonction obligatoire",
        "Service : partiel · permanent (3 400–9 000 UV) · complet (≥ 10 000 UV)",
      ]},
      { type: "rule", h: "Repères à retenir", items: [
        "Employeur = syndicat ; signataire = syndic (mandataire)",
        "CNC du 11 décembre 1979 (IDCC 1527)",
        "Amplitude horaire ≤ 47,5 h ; congés 2,5 j/mois (30 j/an)",
        "Discrimination : 3 ans + 45 000 € (art. 225-2)",
        "Suppression du poste : majorité art. 26 (ou unanimité)",
      ]},
    ],
  },
]);
