/* ============================================
   LENNY — Deep-dive (diaporama) · DROIT cours 1.3 / 1.4 / 1.5
   Ajoute des chapitres au lecteur pour :
     mdsources  (1.3) · mddeonto (1.4) · mdjustice (1.5)
   Chaque clé = une diapositive "chapitre" dans le player.
   Fusionne dans window.DEEPDIVE sans écraser l'existant.
   ============================================ */
(function () {
  const DD = {

    /* ===================== 1.3 — Les sources du droit ===================== */
    "mdsources-definition": {
      mod: "mdsources",
      title: "Qu'est-ce que le Droit ?",
      lede: "Avant de classer les sources, il faut savoir ce qu'on range : la règle de droit et ses deux visages.",
      sections: [
        { h: "Définition", b: "Le Droit est l'ensemble des règles qui permettent et organisent la vie en société. Elles s'imposent grâce à une institution judiciaire et comportent une sanction. C'est une matière vivante, qui évolue avec la société." },
        { h: "Droit objectif / droits subjectifs", list: [
          "Droit OBJECTIF — l'ensemble des règles applicables dans une société donnée (le « Droit » avec un grand D).",
          "Droits SUBJECTIFS — les prérogatives reconnues aux personnes (« j'ai le droit de vendre, de voter, de me marier »).",
          "Droit POSITIF — le droit effectivement en vigueur dans un État à un instant donné.",
        ]},
        { h: "Droit public / droit privé", b: "Le droit public organise les pouvoirs publics et leurs rapports (constitutionnel, administratif, fiscal, pénal). Le droit privé régit les rapports entre particuliers : le droit civil en est le droit commun, complété par le droit commercial, social et du travail." },
        { h: "Mnémo", b: "Objectif = la règle. Subjectif = mon droit personnel. Public = l'État. Privé = entre nous." },
      ],
      linked: ["mdsources-caracteres", "mdsources-hierarchie"],
    },

    "mdsources-caracteres": {
      mod: "mdsources",
      title: "Les caractères de la règle de droit",
      lede: "Quatre traits distinguent la règle de droit de toute autre règle (morale, religieuse, de politesse).",
      sections: [
        { h: "Les 4 caractères", list: [
          "GÉNÉRALE — elle s'applique sur tout le territoire et à toute personne dans la même situation.",
          "IMPERSONNELLE — elle ne vise personne en particulier, mais une catégorie abstraite (« le propriétaire », « l'acheteur »).",
          "OBLIGATOIRE — elle s'impose à tous : on ne choisit pas de la respecter.",
          "COERCITIVE — son non-respect est sanctionné par la puissance publique.",
        ]},
        { h: "Les types de sanction", list: [
          "Civile — réparer : nullité de l'acte, dommages et intérêts, exécution forcée.",
          "Pénale — punir : amende, emprisonnement, peines complémentaires.",
        ]},
        { h: "À retenir", b: "Ce qui fait la spécificité du droit, c'est la contrainte étatique : derrière chaque règle, une sanction organisée par l'institution judiciaire." },
      ],
      linked: ["mdsources-definition", "mdsources-application"],
    },

    "mdsources-hierarchie": {
      mod: "mdsources",
      title: "La hiérarchie des normes",
      lede: "Les sources nationales sont empilées comme une pyramide : chaque étage doit respecter celui du dessus.",
      sections: [
        { h: "La pyramide (du sommet à la base)", list: [
          "1. La CONSTITUTION du 4 octobre 1958 (+ bloc de constitutionnalité : DDHC, préambule de 1946).",
          "2. Les TRAITÉS internationaux et le droit de l'Union européenne (priment sur la loi — art. 55).",
          "3. Les LOIS votées par le Parlement (art. 34) et les ORDONNANCES (art. 38).",
          "4. Les RÈGLEMENTS autonomes du gouvernement (art. 37).",
          "5. Les DÉCRETS et ARRÊTÉS d'application.",
        ]},
        { h: "Loi / ordonnance / règlement", list: [
          "Loi — votée par le Parlement, dans le domaine de l'article 34 (état des personnes, régimes matrimoniaux, impôt, droit du travail…).",
          "Ordonnance — prise par le gouvernement avec l'autorisation du Parlement (art. 38) : le système législatif « dans l'urgence ».",
          "Règlement — édicté par le pouvoir exécutif (décret, arrêté), pour appliquer la loi ou dans son domaine propre (art. 37).",
        ]},
        { h: "Le principe", b: "Une norme inférieure ne peut jamais contredire une norme supérieure. C'est ce qui garantit la cohérence de tout l'édifice juridique." },
      ],
      linked: ["mdsources-europe", "mdsources-caracteres"],
    },

    "mdsources-europe": {
      mod: "mdsources",
      title: "Les sources européennes",
      lede: "Le droit de l'Union irrigue le droit français — mais règlement et directive n'agissent pas de la même façon.",
      sections: [
        { h: "Règlement européen", b: "Il a un EFFET DIRECT : il s'applique immédiatement, uniformément et obligatoirement dans tous les États membres, sans transposition. Il prime sur le droit national." },
        { h: "Directive européenne", b: "Elle fixe un BUT À ATTEINDRE dans un délai donné, mais laisse à chaque État le choix des moyens. Elle doit être TRANSPOSÉE en droit national : c'est l'outil d'harmonisation." },
        { h: "Les autres actes", list: [
          "Décision — obligatoire pour ses seuls destinataires.",
          "Recommandation et avis — non obligatoires (« droit mou »).",
        ]},
        { h: "Repères historiques", list: [
          "1957 — Traité de Rome : fondation de la CEE.",
          "1992 — Traité de Maastricht : naissance de l'Union européenne.",
        ]},
      ],
      linked: ["mdsources-hierarchie", "mdsources-indirectes"],
    },

    "mdsources-indirectes": {
      mod: "mdsources",
      title: "Sources directes & sources indirectes",
      lede: "À côté des textes officiels, le droit se construit aussi par les juges et les juristes.",
      sections: [
        { h: "Sources directes", list: [
          "La LOI et le RÈGLEMENT — les textes écrits, votés ou édictés.",
          "La COUTUME — usage ancien, constant et ressenti comme obligatoire.",
          "Les USAGES — pratiques professionnelles reconnues (notamment en droit commercial).",
        ]},
        { h: "Sources indirectes", list: [
          "La JURISPRUDENCE — l'ensemble des décisions rendues par les juridictions ; elle interprète et précise la loi.",
          "La DOCTRINE — les travaux des juristes (professeurs, auteurs) qui analysent et éclairent le droit, sans force impérative.",
        ]},
        { h: "À retenir", b: "Les sources directes créent la règle ; les sources indirectes l'interprètent et l'enrichissent. La jurisprudence ne « fait » pas la loi mais oriente fortement son application." },
      ],
      linked: ["mdsources-application", "mdsources-hierarchie"],
    },

    "mdsources-application": {
      mod: "mdsources",
      title: "L'application de la loi dans le temps",
      lede: "Quand une loi entre-t-elle en vigueur, et que devient-elle face aux situations déjà nées ?",
      sections: [
        { h: "Entrée en vigueur", b: "Une loi devient applicable après sa promulgation par le Président et sa publication au Journal officiel. Dès lors, « nul n'est censé ignorer la loi » : elle est opposable à tous." },
        { h: "La non-rétroactivité (art. 2 C. civ.)", b: "« La loi ne dispose que pour l'avenir ; elle n'a point d'effet rétroactif. » La loi nouvelle ne peut pas remettre en cause les situations définitivement acquises sous l'empire de la loi ancienne." },
        { h: "Les exceptions", list: [
          "Les lois expressément rétroactives (le législateur le prévoit).",
          "Les lois interprétatives (elles précisent le sens d'une loi antérieure).",
          "Les lois pénales plus douces (rétroactivité « in mitius »).",
        ]},
        { h: "Lois impératives / supplétives", b: "Impérative = d'ordre public, on ne peut l'écarter (art. 6). Supplétive = elle s'applique à défaut de volonté contraire (ex. le régime de la communauté légale, écarté par un contrat de mariage)." },
      ],
      linked: ["mdsources-raisonnement", "mdsources-hierarchie"],
    },

    "mdsources-raisonnement": {
      mod: "mdsources",
      title: "Le raisonnement juridique",
      lede: "Appliquer le droit, c'est relier une règle à des faits. Le juriste dispose pour cela d'outils logiques.",
      sections: [
        { h: "Le syllogisme judiciaire", list: [
          "MAJEURE — la règle de droit (ex. art. 1240 : tout fait qui cause un dommage oblige à le réparer).",
          "MINEURE — les faits de l'espèce (M. X a causé un dommage à M. Y).",
          "CONCLUSION — la décision (M. X doit réparer le dommage de M. Y).",
        ]},
        { h: "Les autres raisonnements", list: [
          "Par ANALOGIE — étendre une règle à un cas voisin non prévu.",
          "A CONTRARIO — déduire la solution inverse pour le cas inverse.",
          "A FORTIORI — « à plus forte raison » : si la règle vaut pour le moins, elle vaut pour le plus.",
        ]},
        { h: "À retenir", b: "Le syllogisme est la colonne vertébrale de toute décision de justice et de toute copie d'examen : énoncer la règle, qualifier les faits, conclure." },
      ],
      linked: ["mdsources-definition", "mdsources-indirectes"],
    },

    /* ============== 1.4 — Sources applicables aux professionnels ============== */
    "mddeonto-prestation": {
      mod: "mddeonto",
      title: "Le professionnel, prestataire de services",
      lede: "Avant la déontologie, un constat : l'agent immobilier exerce une prestation de services réglementée.",
      sections: [
        { h: "Qu'est-ce qu'une prestation de services ?", b: "Proposer à un client un service contre rémunération, en mettant à disposition une compétence ou un savoir-faire, sans lien de subordination. Le professionnel agit en toute indépendance." },
        { h: "Les sources qui l'encadrent", list: [
          "La loi HOGUET (2 janvier 1970) + son décret du 20 juillet 1972 — texte fondateur.",
          "Le Code de COMMERCE et le Code de la CONSOMMATION.",
          "Le Code de DÉONTOLOGIE (décret du 28 août 2015).",
          "Le RGPD (protection des données) et le dispositif TRACFIN (anti-blanchiment).",
        ]},
        { h: "À retenir", b: "La loi Hoguet a un caractère impératif : elle conditionne strictement l'accès et l'exercice de la profession. Les autres textes s'y empilent pour protéger le client." },
      ],
      linked: ["mddeonto-deontologie", "mddeonto-rgpd"],
    },

    "mddeonto-deontologie": {
      mod: "mddeonto",
      title: "Le Code de déontologie (2015)",
      lede: "Onze articles qui fixent la morale professionnelle de l'agent, du syndic et de l'administrateur de biens.",
      sections: [
        { h: "Origine", b: "Issu de la loi ALUR, le Code de déontologie a été adopté par décret du 28 août 2015. Il s'impose à tous les professionnels soumis à la loi Hoguet — 11 articles." },
        { h: "Les valeurs cardinales", b: "Trois mots résument l'esprit du texte : PROBITÉ, MORALITÉ, LOYAUTÉ." },
        { h: "Les obligations clés", list: [
          "Éthique professionnelle et respect des lois et règlements.",
          "Compétence — détenir les savoirs nécessaires + formation continue (art. 4).",
          "Transparence vis-à-vis des clients.",
          "Confidentialité des informations recueillies.",
          "Confraternité entre professionnels et gestion des conflits d'intérêts.",
        ]},
        { h: "Sanction", b: "Le manquement à la déontologie peut entraîner des poursuites disciplinaires, indépendamment des sanctions civiles ou pénales encourues par ailleurs." },
      ],
      linked: ["mddeonto-prestation", "mddeonto-controle"],
    },

    "mddeonto-rgpd": {
      mod: "mddeonto",
      title: "Le RGPD & la protection des données",
      lede: "Depuis le 25 mai 2018, manipuler les données d'un client obéit à des règles strictes.",
      sections: [
        { h: "Le règlement", b: "Le RGPD (Règlement Général sur la Protection des Données) est en vigueur depuis le 25 mai 2018. Il encadre la collecte, l'exploitation et la conservation des données personnelles à l'échelle européenne." },
        { h: "Une donnée personnelle, c'est quoi ?", b: "Toute information permettant d'identifier une personne physique, directement ou indirectement : nom, photo, adresse postale ou IP, téléphone, email, numéro de sécurité sociale…" },
        { h: "Les droits du client", list: [
          "Droit à l'OUBLI (effacement) — demander la suppression de ses données par simple mail.",
          "Droit de RECTIFICATION et de PORTABILITÉ — modifier ou récupérer ses données.",
          "Consentement EXPLICITE — la personne doit accepter la collecte.",
        ]},
        { h: "La CNIL", b: "Créée par la loi Informatique et Libertés du 6 janvier 1978, elle veille au respect du RGPD. Pouvoir de contrôle et de sanction : astreinte jusqu'à 100 000 €/jour et amendes pouvant atteindre plusieurs millions d'euros." },
      ],
      linked: ["mddeonto-tracfin", "mddeonto-deontologie"],
    },

    "mddeonto-tracfin": {
      mod: "mddeonto",
      title: "Tracfin & la lutte anti-blanchiment",
      lede: "L'immobilier est une cible du blanchiment : le professionnel devient une vigie de l'argent sale.",
      sections: [
        { h: "Qu'est-ce que Tracfin ?", b: "« Traitement du Renseignement et Action contre les Circuits Financiers clandestins » : la cellule de renseignement financier de Bercy, qui lutte contre le blanchiment et le financement du terrorisme (LCB-FT)." },
        { h: "La déclaration de soupçon", b: "Les professionnels assujettis (loi Hoguet, art. L.561-2 CMF) doivent déclarer à Tracfin toute opération suspecte. Faite de bonne foi, la déclaration n'expose le déclarant à aucune poursuite." },
        { h: "Le blanchiment (art. 324-1 C. pénal)", list: [
          "Faciliter la justification mensongère de l'origine de biens issus d'un crime ou délit.",
          "Blanchiment simple : 5 ans d'emprisonnement et 375 000 € d'amende.",
          "Blanchiment aggravé (habituel, bande organisée) : 10 ans et 750 000 €.",
        ]},
        { h: "À retenir", b: "Le professionnel n'est pas un simple intermédiaire : il a un devoir de vigilance et de déclaration. L'inaction l'expose à des sanctions." },
      ],
      linked: ["mddeonto-rgpd", "mddeonto-controle"],
    },

    "mddeonto-controle": {
      mod: "mddeonto",
      title: "Les organes de tutelle & de contrôle",
      lede: "Trois institutions surveillent la profession, chacune sur son terrain.",
      sections: [
        { h: "Les 3 organes", list: [
          "CNTGI — Conseil National de la Transaction et de la Gestion Immobilières : garant de la déontologie (créé par la loi ALUR).",
          "DGCCRF — Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes : enquête sur le respect de la loi Hoguet.",
          "CNS — Commission Nationale des Sanctions : sanctionne les manquements en matière de LCB-FT (anti-blanchiment).",
        ]},
        { h: "Et la CNIL", b: "S'ajoute la CNIL pour tout ce qui touche aux données personnelles (RGPD). Quatre acteurs, quatre champs : déontologie, loi Hoguet, blanchiment, données." },
        { h: "À retenir", b: "Bien associer chaque organe à sa mission est un grand classique d'examen : CNTGI = déontologie, DGCCRF = Hoguet, CNS = blanchiment, CNIL = données." },
      ],
      linked: ["mddeonto-deontologie", "mddeonto-tracfin"],
    },

    /* ===================== 1.5 — L'organisation judiciaire ===================== */
    "mdjustice-principes": {
      mod: "mdjustice",
      title: "Le litige & les principes de la justice",
      lede: "Quand un droit est contesté, la justice tranche — selon des principes qui la fondent.",
      sections: [
        { h: "Qu'est-ce qu'un litige ?", b: "Un différend présentant un caractère juridique entre deux sujets à propos d'un droit : l'un prétend quelque chose que l'autre lui conteste." },
        { h: "Les principes du service public de la justice", list: [
          "ÉGALITÉ — les mêmes juridictions et les mêmes règles pour tous.",
          "CONTINUITÉ — la justice peut être saisie à tout moment.",
          "GRATUITÉ — les magistrats ne sont pas rémunérés par les parties.",
          "PRISE EN COMPTE DE L'URGENCE — la procédure de référé pour les situations pressantes.",
        ]},
        { h: "Qu'est-ce qu'une juridiction ?", b: "L'organe dont la mission est de trancher les contestations nées de l'application des règles de droit. On distingue deux ordres : judiciaire et administratif." },
      ],
      linked: ["mdjustice-ordres", "mdjustice-juridictions"],
    },

    "mdjustice-ordres": {
      mod: "mdjustice",
      title: "Les deux ordres & les compétences",
      lede: "Avant de savoir QUEL tribunal, il faut savoir QUEL ordre — et selon quels critères il est compétent.",
      sections: [
        { h: "Les deux ordres", list: [
          "Ordre JUDICIAIRE — litiges entre particuliers (civil) et infractions (pénal). Deux degrés de juridiction.",
          "Ordre ADMINISTRATIF — litiges opposant les particuliers à l'administration (tribunal administratif, cour administrative d'appel, Conseil d'État).",
        ]},
        { h: "Les deux compétences", list: [
          "Compétence D'ATTRIBUTION — déterminée par la nature de l'affaire (commerciale, prud'homale, civile…).",
          "Compétence TERRITORIALE — déterminée par le lieu (le « ressort ») : en principe, le tribunal du domicile du défendeur.",
        ]},
        { h: "À retenir", b: "Deux questions, toujours dans l'ordre : de quelle nature est le litige (attribution) ? et où l'introduire (territoriale) ?" },
      ],
      linked: ["mdjustice-juridictions", "mdjustice-principes"],
    },

    "mdjustice-juridictions": {
      mod: "mdjustice",
      title: "Le tribunal judiciaire & la réforme Belloubet",
      lede: "Depuis 2020, une seule porte d'entrée civile : le tribunal judiciaire.",
      sections: [
        { h: "La réforme Belloubet", b: "Loi du 23 mars 2019, en vigueur le 1er janvier 2020 : fusion du Tribunal de Grande Instance (TGI) et du Tribunal d'Instance (TI) en un TRIBUNAL JUDICIAIRE, juridiction de droit commun." },
        { h: "Le tribunal de proximité", b: "Lorsque le TGI et le TI étaient dans des communes différentes, l'ancien TI devient une chambre détachée : le « tribunal de proximité », qui conserve ses compétences locales." },
        { h: "Le juge des contentieux de la protection", b: "Au sein du tribunal judiciaire, il traite : tutelle des majeurs, expulsions, baux d'habitation, crédit à la consommation et surendettement des particuliers — des sujets très immobiliers." },
        { h: "À retenir", b: "Le tribunal judiciaire est compétent pour toute affaire civile non attribuée expressément à une juridiction spécialisée." },
      ],
      linked: ["mdjustice-specialisees", "mdjustice-appel"],
    },

    "mdjustice-specialisees": {
      mod: "mdjustice",
      title: "Les juridictions spécialisées",
      lede: "Certains litiges relèvent de tribunaux dédiés, à la composition particulière.",
      sections: [
        { h: "Les principales", list: [
          "Tribunal de COMMERCE — litiges entre commerçants ; juges élus (non professionnels).",
          "Conseil de PRUD'HOMMES — litiges du contrat de travail ; juridiction PARITAIRE (salariés / employeurs).",
          "Tribunal des BAUX RURAUX — litiges entre bailleurs et preneurs de terres agricoles.",
        ]},
        { h: "La singularité prud'homale", b: "Le conseil de prud'hommes est paritaire : il est composé à parts égales de représentants des salariés et des employeurs, qui tranchent ensemble formation, exécution et rupture du contrat de travail." },
        { h: "À retenir", b: "Commerce = juges élus ; prud'hommes = paritaire. Ces compositions « non magistrats » sont un classique de QCM." },
      ],
      linked: ["mdjustice-juridictions", "mdjustice-appel"],
    },

    "mdjustice-appel": {
      mod: "mdjustice",
      title: "L'appel & le double degré de juridiction",
      lede: "Mécontent du jugement ? Sous conditions, on peut le faire rejuger — c'est l'appel.",
      sections: [
        { h: "Le principe", b: "Le double degré de juridiction permet à un justiciable de faire rejuger son affaire par la cour d'appel, en fait et en droit. Délai pour faire appel : 1 mois à compter de la signification du jugement." },
        { h: "Les deux effets de l'appel", list: [
          "DÉVOLUTIF — le litige est de nouveau soumis aux juges, qui le rejugent dans son ensemble.",
          "SUSPENSIF — la décision de première instance n'est pas exécutoire pendant l'appel.",
        ]},
        { h: "Le vocabulaire", list: [
          "APPELANT — la partie qui fait appel (demanderesse en appel).",
          "INTIMÉ — son adversaire (défendeur en appel).",
          "Arrêt CONFIRMATIF (la cour confirme) ou INFIRMATIF (elle réforme la décision).",
        ]},
        { h: "Le taux de ressort", b: "L'appel n'est pas toujours possible : pour un litige inférieur à 5 000 €, la décision est rendue en dernier ressort. Il ne reste alors que le pourvoi en cassation." },
      ],
      linked: ["mdjustice-cassation", "mdjustice-juridictions"],
    },

    "mdjustice-cassation": {
      mod: "mdjustice",
      title: "La Cour de cassation",
      lede: "Au sommet de l'ordre judiciaire, une cour qui ne juge pas les faits, mais le droit.",
      sections: [
        { h: "Sa nature", b: "La Cour de cassation est la juridiction suprême de l'ordre judiciaire. Attention : ce n'est PAS un troisième degré de juridiction." },
        { h: "Son rôle", b: "Elle ne rejuge pas les faits : elle contrôle la conformité au droit des décisions rendues en dernier ressort (le pourvoi). Elle vérifie que les juges ont correctement appliqué la règle." },
        { h: "Cassation ou rejet", list: [
          "Si le droit a été mal appliqué → elle CASSE la décision et renvoie l'affaire devant une autre juridiction.",
          "Sinon → elle REJETTE le pourvoi : la décision devient définitive.",
        ]},
        { h: "Son utilité", b: "En unifiant l'interprétation de la loi sur tout le territoire, elle assure l'égalité des citoyens devant le droit et alimente la jurisprudence." },
      ],
      linked: ["mdjustice-appel", "mdjustice-principes"],
    },

  };

  window.DEEPDIVE = Object.assign(window.DEEPDIVE || {}, DD);
})();
