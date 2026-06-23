/* ============================================
   LENNY — Deep-dive (diaporama) · SYNDIC module 4.4
   « La gestion du personnel de la copropriété » (mperso)
   Fusionne dans window.DEEPDIVE sans écraser l'existant.
   ============================================ */
(function () {
  const DD = {

    "mperso-poste": {
      mod: "mperso",
      title: "Le poste de gardien & l'employeur",
      lede: "Avant d'embaucher, deux questions : faut-il voter le poste, et qui est juridiquement l'employeur ?",
      sections: [
        { h: "Créer le poste", list: [
          "Poste INSCRIT au règlement de copropriété → aucun vote nécessaire.",
          "Poste NON inscrit → vote en assemblée générale à l'UNANIMITÉ.",
          "L'AG seule a qualité pour fixer le nombre et la catégorie des emplois.",
        ]},
        { h: "Qui est l'employeur ?", b: "L'employeur est le SYNDICAT des copropriétaires. C'est lui qui verse le salaire et paie les charges sociales. Le salarié est celui du syndicat." },
        { h: "Le rôle du syndic", b: "Une fois le poste voté, le syndic embauche et établit le contrat : il signe en tant que MANDATAIRE du syndicat. C'est lui qui engage, congédie et fixe les conditions de travail." },
        { h: "Le cadre conventionnel", b: "Le personnel dépend de la Convention Nationale Collective du 11 décembre 1979 (gardiens, concierges, employés d'immeubles). Le Code du travail pose des droits minimaux ; le contrat individuel ne peut y déroger que dans un sens plus favorable au salarié." },
      ],
      linked: ["mperso-embauche", "mperso-categories"],
    },

    "mperso-embauche": {
      mod: "mperso",
      title: "L'embauche : visite médicale & non-discrimination",
      lede: "Recruter, c'est respecter des obligations de santé au travail et d'égalité.",
      sections: [
        { h: "La visite médicale d'embauche", b: "Tout employeur recrutant un salarié doit organiser un examen médical d'embauche (art. R4624-10 et s.). La demande se fait lors de la déclaration unique d'embauche ; l'examen peut avoir lieu avant l'embauche ou jusqu'à la fin de la période d'essai." },
        { h: "Les cas de dispense", list: [
          "Le salarié occupait un emploi identique avec les mêmes risques,",
          "le médecin du travail détient sa fiche d'aptitude,",
          "aucune inaptitude lors du dernier examen (24 mois si même employeur, 12 mois si changement d'entreprise).",
          "Mais l'employeur doit faire la visite si le salarié le demande.",
        ]},
        { h: "Le suivi médical", b: "Le gardien bénéficie de visites périodiques par le médecin du travail, au moins tous les 24 mois (sauf périodicité différente prévue par l'agrément), pour vérifier le maintien de l'aptitude." },
        { h: "La non-discrimination", b: "Opérer un choix selon l'origine, le sexe, la situation de famille, la santé, l'âge, les opinions, l'appartenance ethnique ou religieuse… est un délit. Peine : jusqu'à 3 ans de prison et 45 000 € d'amende (art. 225-2 du Code pénal)." },
      ],
      linked: ["mperso-poste", "mperso-contrat"],
    },

    "mperso-categories": {
      mod: "mperso",
      title: "Les deux catégories de personnel",
      lede: "Employé d'immeuble ou gardien : deux statuts aux logiques de rémunération opposées.",
      sections: [
        { h: "Catégorie A — employés d'immeubles", list: [
          "Rattachés au régime de droit commun.",
          "Rémunérés en fonction de leur temps de travail, fixé avec précision.",
          "Généralement NON logés par l'employeur.",
        ]},
        { h: "Catégorie B — gardiens d'immeubles", list: [
          "Pas de référence horaire stricte : rémunération selon le nombre d'UV.",
          "Obligation pour l'employeur d'offrir un LOGEMENT DE FONCTION sur le lieu de travail.",
        ]},
        { h: "À retenir", b: "La distinction A/B commande tout : mode de rémunération (temps vs UV), logement (non vs oui), et plus tard la période d'essai et les préavis. C'est le premier réflexe de qualification." },
      ],
      linked: ["mperso-contrat", "mperso-uv"],
    },

    "mperso-contrat": {
      mod: "mperso",
      title: "Le contrat de travail & la période d'essai",
      lede: "Un contrat écrit, des clauses obligatoires, et une période d'essai calibrée selon le statut.",
      sections: [
        { h: "Les clauses obligatoires", list: [
          "Les fonctions du salarié et les conditions de travail (détail des tâches pour la catégorie B).",
          "La classification professionnelle et le coefficient hiérarchique.",
          "Le montant des appointements et le lieu de travail.",
          "L'évaluation du salaire en nature (personnel logé) et, pour un CDD, le terme.",
        ]},
        { h: "Le temps de travail", b: "Catégorie A : un temps de travail avec, le cas échéant, des heures supplémentaires majorées de 25 %. Catégorie B : une liste de tâches valorisées en UV, avec une amplitude horaire qui ne peut dépasser 47,5 heures." },
        { h: "La période d'essai (CDI)", list: [
          "1 mois renouvelable une fois pour les salariés non logés.",
          "2 mois pour les salariés logés (catégorie A ou B).",
          "2 mois renouvelable une fois pour les agents de maîtrise (logés ou non).",
        ]},
        { h: "La période d'essai (CDD)", b: "1 jour par semaine de contrat, dans la limite de 2 semaines (contrat ≤ 6 mois) ou d'1 mois (au-delà)." },
      ],
      linked: ["mperso-categories", "mperso-uv"],
    },

    "mperso-uv": {
      mod: "mperso",
      title: "Le service du gardien & les unités de valeur",
      lede: "Le cœur du métier de gardien se compte en UV — et détermine son régime de service.",
      sections: [
        { h: "Les trois services", list: [
          "Service PARTIEL — hors tâches, peut travailler à domicile ou à l'extérieur.",
          "Service PERMANENT — 3 400 à 9 000 UV, avec permanence de jour.",
          "Service COMPLET — au moins 10 000 UV (entre 9 000 et 10 000 avec permanence → porté à 10 000).",
        ]},
        { h: "Les unités de valeur (UV)", b: "La convention attribue à chaque tâche un nombre d'UV (ex. 60 UV/mois pour le nettoyage des cabines et portes d'ascenseur). La fréquence n'est pas prise en compte : sortir les poubelles 2 ou 4 fois par semaine donne le même nombre d'UV." },
        { h: "UV et lots principaux", b: "Le nombre de lots principaux sert de référence : plus il est élevé, plus le nombre d'UV d'une même tâche augmente. Un lot principal = appartement, local commercial ou professionnel (avec ses annexes) ; une chambre de service indépendante compte aussi pour un lot principal." },
        { h: "La pesée du poste", b: "Le coefficient hiérarchique résulte de la « pesée » du poste sur 6 critères : relationnel, compétences administratives, autonomie, compétences techniques, supervision et formation. Chaque critère a 5 niveaux ; le total des points donne le coefficient." },
      ],
      linked: ["mperso-salaire", "mperso-contrat"],
    },

    "mperso-salaire": {
      mod: "mperso",
      title: "Le salaire & l'avantage en nature",
      lede: "Du coefficient au bulletin de paie : comment se construit la rémunération du gardien.",
      sections: [
        { h: "Le salaire minimum conventionnel", b: "Salaire minimum = (Coefficient hiérarchique × Valeur du point) + Valeur fixe. La valeur du point et la valeur fixe sont fixées par la convention collective." },
        { h: "Le salaire brut global", list: [
          "Salaire minimum brut conventionnel × taux d'emploi,",
          "+ prime d'ancienneté (plafonnée à 18 %),",
          "+ 13e mois (versé en décembre),",
          "+ prime de tri sélectif,",
          "+ éventuel salaire supplémentaire contractuel (facultatif).",
        ]},
        { h: "L'avantage en nature", b: "Le logement de fonction (catégorie B) est un avantage en nature, déjà compris dans le salaire minimum CNC. Évaluation : surface habitable (max 60 m²) × prix au m² selon la catégorie (1 : 3,211 € · 2 : 2,535 € · 3 : 1,872 €). Il ne peut être inférieur au barème Urssaf et il est imposable." },
        { h: "Les primes clés", b: "Prime d'ancienneté (sur le salaire conventionnel, ≤ 18 %). 13e mois au prorata si présence < 12 mois. Prime de tri sélectif (cat. B), selon le nombre de lots principaux (23 à 184 € brut) — incluse dans l'indemnité de CP, exclue du 13e mois." },
      ],
      linked: ["mperso-uv", "mperso-conges"],
    },

    "mperso-conges": {
      mod: "mperso",
      title: "Congés payés, taxe sur les salaires & remplacement",
      lede: "Gérer les congés du gardien, c'est aussi organiser son remplacement et connaître la taxe due.",
      sections: [
        { h: "Les congés payés", b: "2,5 jours ouvrables par mois de travail effectif (30 jours/an), dès 1 mois chez le même employeur ; jusqu'à 4 semaines entre le 1er mai et le 31 octobre. La date est fixée d'un commun accord avant le 1er avril. Indemnité = règle du maintien OU du 1/10e, le plus élevé étant retenu." },
        { h: "Les majorations de congés", list: [
          "Femmes de moins de 21 ans avec enfant à charge : 2 jours par enfant.",
          "Congés hors période (1er nov.–30 avril) : +1 jour (3 à 5 j) ou +2 jours (≥ 6 j).",
          "Ancienneté : +1 j (10 ans), +2 j (15 ans), +3 j (20 ans), +4 j (25 ans).",
        ]},
        { h: "Le remplacement du gardien", b: "Le syndic signe un CDD. Le remplaçant perçoit une rémunération majorée de 10 % (remplacement < 2 mois) + indemnité de CP + prorata 13e mois + indemnité de fin de contrat (10 %). Le gardien logé peut choisir son remplaçant (agrément de l'employeur sous 8 jours, art. L7213-2)." },
        { h: "La taxe sur les salaires", b: "Entièrement à la charge de l'employeur, sur les rémunérations brutes annuelles (avantages en nature compris). Pas de taxe si elle est < 1 200 €/an ; décote entre 1 200 € et 2 040 €." },
      ],
      linked: ["mperso-fin", "mperso-salaire"],
    },

    "mperso-fin": {
      mod: "mperso",
      title: "La fin du contrat & la suppression du poste",
      lede: "Démission, licenciement, retraite — puis, le cas échéant, la suppression du poste de gardien.",
      sections: [
        { h: "La démission", b: "Le salarié avise l'employeur par LRAR, avec un préavis de 8 jours (non logé, coefficient ≤ 602) ou d'1 mois (logé ou coefficient > 602). Le logement de fonction doit être libéré à l'expiration du préavis." },
        { h: "Le licenciement", b: "Toujours motivé et conforme à la procédure du Code du travail (entretien préalable, notification par LRAR…). Préavis après essai : 1 ou 2 mois (catégorie A), 3 mois (catégorie B). L'indemnité de licenciement (sauf faute grave/lourde), majorée selon l'ancienneté, n'est pas imposable." },
        { h: "Le départ à la retraite", b: "À l'initiative du salarié : délai de prévenance comme pour la démission (mais ce n'est pas une démission). L'employeur ne peut imposer la retraite entre 65 et 69 ans qu'avec l'accord du salarié ; la mise à la retraite d'office redevient possible à 70 ans." },
        { h: "Supprimer le poste de gardien", b: "Après un licenciement ou un départ à la retraite, si la copropriété ne réembauche pas, elle vote la suppression du poste en AG : à la majorité de l'article 26, ou à l'UNANIMITÉ si la suppression porte atteinte à la destination de l'immeuble ou à la jouissance des parties privatives." },
      ],
      linked: ["mperso-poste", "mperso-conges"],
    },

  };

  window.DEEPDIVE = Object.assign(window.DEEPDIVE || {}, DD);
})();
