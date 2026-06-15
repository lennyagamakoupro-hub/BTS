/* ============================================
   LENNY — Deep-dive (diaporama) · DROIT cours 1.6 / 1.7 / 1.8
   Ajoute des chapitres au lecteur pour :
     mdfamille (1.6) · mdpreuve (1.7) · mdcontrats (1.8)
   Fusionne dans window.DEEPDIVE sans écraser l'existant.
   ============================================ */
(function () {
  const DD = {

    /* ============ 1.6 — Régimes matrimoniaux, PACS & union libre ============ */
    "mdfamille-conjugalite": {
      mod: "mdfamille",
      title: "Les trois modes de conjugalité",
      lede: "Vivre en couple, juridiquement, c'est choisir l'un de trois cadres aux effets très différents.",
      sections: [
        { h: "Le droit de la famille", b: "Branche du droit privé qui régit les relations entre personnes unies par le mariage, le sang ou l'alliance. Il encadre notamment la vie du couple et son patrimoine." },
        { h: "Les 3 modes", list: [
          "Le MARIAGE — l'union la plus protectrice, encadrée par de nombreux devoirs et un régime patrimonial.",
          "Le PACS — un contrat organisant la vie commune, plus souple que le mariage.",
          "Le CONCUBINAGE (union libre) — une simple situation de fait, sans statut imposé.",
        ]},
        { h: "Pourquoi ça compte en immobilier ?", b: "Le mode de conjugalité détermine qui peut vendre, qui doit consentir, à qui appartient le bien et ce que devient le logement en cas de décès ou de séparation." },
      ],
      linked: ["mdfamille-mariage", "mdfamille-regimes"],
    },

    "mdfamille-mariage": {
      mod: "mdfamille",
      title: "Le mariage : conditions & devoirs",
      lede: "Un acte solennel qui crée de véritables obligations entre les époux.",
      sections: [
        { h: "Les conditions", list: [
          "Consentement libre et éclairé (condition de fond essentielle).",
          "Âge : 18 ans révolus pour les deux époux (art. 144).",
          "Célébration publique par l'officier d'état civil de la commune de domicile.",
          "Depuis la loi du 17 mai 2013 : ouvert aux couples de même sexe (art. 143).",
        ]},
        { h: "Les devoirs conjugaux (art. 212 & 215)", list: [
          "FIDÉLITÉ.",
          "SECOURS — aide matérielle entre époux.",
          "ASSISTANCE — soutien moral.",
          "COMMUNAUTÉ DE VIE — cohabitation.",
        ]},
        { h: "La solidarité des dettes (art. 220)", b: "Chaque époux peut engager seul les dépenses d'entretien du ménage et d'éducation des enfants : la dette oblige solidairement l'autre — sauf dépenses manifestement excessives." },
      ],
      linked: ["mdfamille-regimes", "mdfamille-logement"],
    },

    "mdfamille-regimes": {
      mod: "mdfamille",
      title: "Les 4 régimes matrimoniaux",
      lede: "Le régime décide à qui appartiennent les biens — et c'est décisif pour toute vente.",
      sections: [
        { h: "Les quatre régimes", list: [
          "COMMUNAUTÉ LÉGALE RÉDUITE AUX ACQUÊTS — le régime par défaut (sans contrat). Les biens acquis pendant le mariage sont communs ; ceux d'avant ou reçus par donation/succession restent propres.",
          "SÉPARATION DE BIENS — chaque époux conserve la propriété et la gestion de ses biens ; rien n'est commun.",
          "PARTICIPATION AUX ACQUÊTS — séparation pendant le mariage, mais partage de l'enrichissement à la dissolution.",
          "COMMUNAUTÉ UNIVERSELLE — tous les biens, présents et à venir, sont mis en commun.",
        ]},
        { h: "Comment choisir ?", b: "À défaut de contrat de mariage devant notaire, c'est la communauté légale réduite aux acquêts qui s'applique automatiquement (loi supplétive)." },
        { h: "À retenir", b: "Pour vendre un bien commun, l'accord des deux époux est nécessaire. Vérifier le régime, c'est sécuriser la transaction." },
      ],
      linked: ["mdfamille-pacs", "mdfamille-logement"],
    },

    "mdfamille-pacs": {
      mod: "mdfamille",
      title: "Le PACS & le concubinage",
      lede: "Deux alternatives au mariage, aux protections patrimoniales bien moindres.",
      sections: [
        { h: "Le PACS (art. 515-1)", b: "Un contrat conclu entre deux personnes physiques majeures, de sexe différent ou de même sexe, pour organiser leur vie commune. Conditions : être majeur, ni marié ni pacsé, sans lien familial proche, avec résidence commune." },
        { h: "Le régime patrimonial du PACS", b: "Par défaut : SÉPARATION DES PATRIMOINES — chacun conserve l'administration et la libre disposition de ses biens. Les partenaires peuvent opter pour l'indivision dans leur convention." },
        { h: "Le concubinage (art. 515-8)", b: "Une union de fait, stable et continue, entre deux personnes vivant en couple. Le droit n'y attache AUCUN devoir (ni fidélité, ni secours) ni statut patrimonial : les concubins sont juridiquement des étrangers l'un pour l'autre." },
        { h: "À retenir", b: "Du plus au moins protecteur : mariage > PACS > concubinage. Plus l'union est informelle, plus le patrimoine est cloisonné." },
      ],
      linked: ["mdfamille-regimes", "mdfamille-logement"],
    },

    "mdfamille-logement": {
      mod: "mdfamille",
      title: "La protection du logement familial",
      lede: "Le toit de la famille bénéficie d'une protection renforcée — un point clé pour l'agent.",
      sections: [
        { h: "L'accord des deux époux (art. 215)", b: "Un époux ne peut, sans l'autre, disposer des droits assurant le logement de la famille (vente, location, hypothèque…), même s'il en est le SEUL propriétaire. À défaut, l'autre peut demander la nullité de l'acte dans l'année." },
        { h: "La cotitularité du bail (art. 1751)", b: "Le bail du logement familial est réputé appartenir aux DEUX époux, peu importe qui l'a signé et même s'il est antérieur au mariage. Étendu aux partenaires pacsés qui en font la demande (art. 1751-1)." },
        { h: "Les droits du conjoint survivant", list: [
          "Droit TEMPORAIRE (art. 763) — jouissance gratuite du logement et du mobilier pendant 1 an après le décès. D'ordre public.",
          "Droit VIAGER — occupation à vie, à demander dans l'année, si le logement appartenait aux deux époux ou au défunt.",
        ]},
        { h: "À retenir", b: "Avant toute vente, l'agent vérifie si le bien constitue le logement familial : sans le double accord, la vente est attaquable." },
      ],
      linked: ["mdfamille-mariage", "mdfamille-pacs"],
    },

    /* ===================== 1.7 — Le droit de la preuve ===================== */
    "mdpreuve-enjeu": {
      mod: "mdpreuve",
      title: "« Pas de droit sans preuve »",
      lede: "Avoir un droit ne suffit pas : encore faut-il pouvoir le prouver.",
      sections: [
        { h: "L'enjeu", b: "Un droit qui n'est pas prouvé n'est pas protégé. Celui qui se prétend titulaire d'un droit doit pouvoir en établir l'existence devant le juge, sous peine de ne pas le faire respecter." },
        { h: "Deux particularités", list: [
          "La preuve est JUDICIAIRE — elle est destinée à informer et convaincre le juge.",
          "La preuve est RÉGLEMENTÉE — encadrée par des règles strictes, pour la sécurité juridique.",
        ]},
        { h: "Les 5 modes de preuve", list: [
          "Littérale (l'écrit) · Testimoniale (le témoignage) · Indices & présomptions · Aveu · Serment.",
        ]},
      ],
      linked: ["mdpreuve-regime", "mdpreuve-modes"],
    },

    "mdpreuve-regime": {
      mod: "mdpreuve",
      title: "Le régime de la preuve : qui, quoi, comment",
      lede: "Trois questions structurent toute la matière probatoire.",
      sections: [
        { h: "Les 3 questions", list: [
          "QUOI ? — l'objet de la preuve : ce qu'il faut établir (un fait, un acte juridique).",
          "QUI ? — la charge de la preuve.",
          "COMMENT ? — l'admissibilité : quels moyens sont recevables.",
        ]},
        { h: "La charge de la preuve (art. 1353)", b: "Celui qui réclame l'exécution d'une obligation doit la prouver (le demandeur). Réciproquement, celui qui se prétend libéré doit justifier le paiement ou le fait qui a éteint l'obligation." },
        { h: "La liberté de la preuve (art. 1358)", b: "Depuis la réforme du 10 février 2016 : « hors les cas où la loi en dispose autrement, la preuve peut être apportée par tout moyen ». Le principe est donc la liberté — sauf exigence de preuve parfaite." },
        { h: "Le seuil des 1 500 €", b: "Exception majeure : au-delà de 1 500 €, un acte juridique doit en principe être prouvé par ÉCRIT (preuve parfaite)." },
      ],
      linked: ["mdpreuve-presomptions", "mdpreuve-modes"],
    },

    "mdpreuve-presomptions": {
      mod: "mdpreuve",
      title: "Les présomptions",
      lede: "Parfois, la loi tient un fait pour acquis : c'est la présomption, plus ou moins forte.",
      sections: [
        { h: "Définition", b: "Une présomption consiste à tenir un fait pour établi à partir d'un autre fait connu. Elle déplace ou allège la charge de la preuve." },
        { h: "Les trois types", list: [
          "SIMPLE (réfragable) — peut être renversée par tout moyen de preuve contraire (ex. la bonne foi est toujours présumée, art. 2274).",
          "MIXTE — contestable, mais seulement par des moyens limités (ex. tout bien acquis pendant le mariage est présumé commun, art. 1402, renversable par écrit).",
          "IRRÉFRAGABLE — ne peut JAMAIS être renversée (ex. l'enfant né pendant le mariage a pour père le mari, art. 312).",
        ]},
        { h: "À retenir", b: "De la plus faible à la plus forte : simple → mixte → irréfragable. Plus la présomption est forte, moins la preuve contraire est admise." },
      ],
      linked: ["mdpreuve-regime", "mdpreuve-modes"],
    },

    "mdpreuve-modes": {
      mod: "mdpreuve",
      title: "Preuves parfaites & preuves imparfaites",
      lede: "Toutes les preuves n'ont pas la même force : certaines lient le juge, d'autres non.",
      sections: [
        { h: "Les preuves parfaites", b: "Elles s'imposent au juge : l'acte authentique, l'acte sous signature privée, l'aveu judiciaire, le serment décisoire et les présomptions légales." },
        { h: "Les preuves imparfaites (libres)", b: "Le témoignage, les indices, les présomptions de fait, les courriers… Elles sont appréciées librement par le juge selon son intime conviction et doivent se confirmer entre elles." },
        { h: "Acte authentique vs sous signature privée", list: [
          "AUTHENTIQUE — dressé par un officier public (notaire) ; fait foi « jusqu'à inscription de faux ».",
          "SOUS SIGNATURE PRIVÉE — établi par les parties ; fait foi jusqu'à preuve contraire.",
        ]},
        { h: "Formalités & écrit électronique", b: "Formalité du double (art. 1375) : un contrat synallagmatique sous signature privée est rédigé en autant d'originaux que de parties. Depuis la loi du 13 mars 2000, l'écrit électronique a la même valeur que le papier (art. 1366), sous réserve d'identification et d'intégrité." },
      ],
      linked: ["mdpreuve-presomptions", "mdpreuve-enjeu"],
    },

    /* ===================== 1.8 — Le droit des contrats ===================== */
    "mdcontrats-obligation": {
      mod: "mdcontrats",
      title: "L'obligation & le contrat",
      lede: "Tout commence par un lien de droit : l'obligation. Le contrat en est la source la plus courante.",
      sections: [
        { h: "L'obligation", b: "Un lien de droit unissant deux personnes : le créancier peut exiger du débiteur une prestation ou une abstention. C'est un droit personnel (par opposition au droit réel, qui porte sur une chose)." },
        { h: "Le contrat (art. 1101)", b: "Un accord de volontés entre deux ou plusieurs personnes, destiné à créer, modifier, transmettre ou éteindre des obligations." },
        { h: "Les grandes classifications", list: [
          "Synallagmatique (obligations réciproques : vente, bail) / unilatéral (une seule partie s'oblige : cautionnement).",
          "À titre onéreux / à titre gratuit.",
          "De gré à gré (clauses négociées) / d'adhésion (clauses imposées).",
        ]},
      ],
      linked: ["mdcontrats-principes", "mdcontrats-validite"],
    },

    "mdcontrats-principes": {
      mod: "mdcontrats",
      title: "Les 3 principes directeurs",
      lede: "Trois articles ouvrent le droit des contrats et en donnent l'esprit.",
      sections: [
        { h: "Liberté contractuelle (art. 1102)", b: "Chacun est libre de contracter ou non, de choisir son cocontractant et de déterminer le contenu du contrat — dans le respect de l'ordre public." },
        { h: "Force obligatoire (art. 1103)", b: "« Les contrats légalement formés tiennent lieu de loi à ceux qui les ont faits. » Le contrat est intangible : on ne peut le révoquer ou le modifier unilatéralement." },
        { h: "Bonne foi (art. 1104)", b: "Les contrats doivent être négociés, formés et exécutés de bonne foi. C'est une disposition d'ordre public, qui irrigue toute la vie du contrat." },
        { h: "L'information précontractuelle (art. 1112-1)", b: "La partie qui connaît une information déterminante pour l'autre doit l'en informer. Obligation d'ordre public, dont le manquement peut entraîner la nullité." },
      ],
      linked: ["mdcontrats-formation", "mdcontrats-validite"],
    },

    "mdcontrats-formation": {
      mod: "mdcontrats",
      title: "La formation du contrat",
      lede: "Un contrat naît de la rencontre de deux volontés : l'offre et l'acceptation.",
      sections: [
        { h: "L'offre", b: "Une proposition ferme et précise, qui exprime la volonté de son auteur d'être lié en cas d'acceptation. Tant qu'elle n'a pas été acceptée, elle peut en principe être rétractée — sauf délai annoncé." },
        { h: "L'acceptation (art. 1113)", b: "Le contrat est conclu par la rencontre d'une offre et d'une acceptation pure et simple. Le SILENCE ne vaut pas acceptation. Le contrat est formé quand l'acceptation parvient à l'offrant." },
        { h: "La rétractation", b: "Dans les contrats à distance conclus avec un consommateur, un délai de rétractation de 14 JOURS permet de revenir sur son engagement sans motif." },
        { h: "Les pourparlers", b: "La phase de négociation est libre mais doit rester de bonne foi : une rupture abusive des pourparlers peut engager la responsabilité de son auteur." },
      ],
      linked: ["mdcontrats-validite", "mdcontrats-principes"],
    },

    "mdcontrats-validite": {
      mod: "mdcontrats",
      title: "Les conditions de validité (art. 1128)",
      lede: "Trois conditions, sans lesquelles le contrat encourt la nullité.",
      sections: [
        { h: "Les 3 conditions", list: [
          "Le CONSENTEMENT des parties — libre et éclairé.",
          "La CAPACITÉ de contracter — être juridiquement apte (majeur non protégé…).",
          "Un CONTENU licite et certain — un objet déterminé et conforme à l'ordre public.",
        ]},
        { h: "Les vices du consentement (art. 1130-1133)", list: [
          "ERREUR — se tromper sur une qualité essentielle.",
          "DOL — être trompé par des manœuvres de l'autre partie.",
          "VIOLENCE — consentir sous la contrainte.",
        ]},
        { h: "La lésion immobilière (art. 1674)", b: "Si le vendeur d'un immeuble a été lésé de plus des 7/12e de la valeur, il peut demander la RESCISION (annulation) de la vente. Délai préfix : 2 ans à compter de la vente." },
        { h: "À retenir", b: "Pas de consentement libre, pas de capacité ou pas de contenu licite → le contrat est attaquable." },
      ],
      linked: ["mdcontrats-nullite", "mdcontrats-formation"],
    },

    "mdcontrats-nullite": {
      mod: "mdcontrats",
      title: "Nullités & modalités de l'obligation",
      lede: "Quand le contrat est vicié, ou quand son exécution dépend d'un événement : deux mécanismes à connaître.",
      sections: [
        { h: "Nullité relative / absolue", list: [
          "RELATIVE — protège un intérêt privé (consentement vicié, incapacité) ; invoquée par la partie protégée ; confirmable.",
          "ABSOLUE — protège l'intérêt général (contenu illicite) ; invoquée par toute personne intéressée et le ministère public ; non confirmable.",
          "Prescription de l'action : 5 ans.",
        ]},
        { h: "Condition / terme", list: [
          "CONDITION — événement futur et INCERTAIN. Suspensive (l'obligation naît si l'événement se réalise, ex. obtention du prêt) ou résolutoire (elle s'éteint si l'événement survient).",
          "TERME — événement futur et CERTAIN. Il n'affecte que l'exigibilité de l'obligation, pas son existence.",
        ]},
        { h: "L'imprévision (art. 1195)", b: "Un changement de circonstances imprévisible, rendant l'exécution excessivement onéreuse, permet de demander une renégociation. À défaut d'accord, le juge peut réviser le contrat ou y mettre fin." },
      ],
      linked: ["mdcontrats-validite", "mdcontrats-obligation"],
    },

  };

  window.DEEPDIVE = Object.assign(window.DEEPDIVE || {}, DD);
})();
