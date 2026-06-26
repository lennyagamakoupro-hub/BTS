/* ============================================
   LENNY — Deep-dive (diaporama) · Acte de construire (1/2)
   Chapitres détaillés pour les modules macte1 → macte4.
   Fusionne dans window.DEEPDIVE sans écraser l'existant.
   ============================================ */
(function () {
  const DD = {

    /* ===================== macte1 — Les intervenants ===================== */
    "macte1-moa-moe": {
      mod: "macte1",
      title: "Maître d'ouvrage & maître d'œuvre",
      lede: "Les deux têtes de l'opération : celui qui commande et paie, celui qui conçoit et coordonne.",
      sections: [
        { h: "Le maître d'ouvrage (MOA)", b: "C'est la personne physique ou morale pour le compte de qui les travaux sont effectués (art. 1710 et 1787 du Code civil) : le client des entrepreneurs et des maîtres d'œuvre. Il n'est pas forcément l'usager du bâtiment (ex. : un hôpital construit pour des patients)." },
        { h: "Le rôle du MOA", list: [
          "Définir le programme et le financement de l'opération.",
          "Choisir les participants (maître d'œuvre, parfois sur concours).",
          "Définir les conditions administratives de réalisation.",
          "Recevoir les ouvrages en fin de chantier.",
        ]},
        { h: "Le maître d'œuvre (MOE)", b: "La personne chargée de la conception, des études, puis du suivi et de la coordination des travaux pour le compte du MOA : architecte, agréé en architecture, ingénieur, bureau d'études. Parfois MOA et MOE ne font qu'un (industries, grandes municipalités)." },
        { h: "La mission du MOE", list: [
          "Assister le MOA pour consulter les entreprises et conclure les marchés.",
          "Diriger l'exécution des marchés de travaux.",
          "Assister le MOA pour la réception des ouvrages et le règlement des comptes.",
        ]},
        { h: "Plusieurs maîtres d'ouvrage", b: "Si le marché est signé par plusieurs MOA, ils doivent déléguer un représentant unique habilité à les représenter pour tous les actes d'exécution. La nature du lien juridique et l'étendue de l'engagement de chacun figurent au cahier des clauses administratives particulières (CCAP)." },
      ],
      linked: ["macte1-architecte", "macte1-constructeur"],
    },

    "macte1-architecte": {
      mod: "macte1",
      title: "L'architecte, l'ACMH et l'ABF",
      lede: "Du maître d'œuvre de droit commun aux gardiens du patrimoine.",
      sections: [
        { h: "L'architecte", b: "Professionnel diplômé d'une école d'architecture, inscrit au tableau régional de l'Ordre. Il est le maître d'œuvre et « l'homme de l'art ». L'Ordre régit les règles de la profession, sa déontologie et sa défense. Recours obligatoire dès 150 m² de surface de plancher." },
        { h: "La loi de 1977", b: "La loi sur l'architecture du 3 janvier 1977 a précisé les conditions d'intervention obligatoire de l'architecte et institué les CAUE (Conseils d'Architecture, d'Urbanisme et de l'Environnement), chargés de missions d'information et de conseil." },
        { h: "L'ACMH", b: "L'Architecte en Chef des Monuments Historiques est nommé par le Ministère de la Culture après un concours très sélectif. Il prend en charge un secteur (entretien, rénovation, reconstruction des monuments classés). Un bâtiment classé ne peut être détruit, déplacé ou rénové sans son avis favorable." },
        { h: "L'ABF", b: "L'Architecte des Bâtiments de France représente le ministère. Tout immeuble situé dans le champ de visibilité d'un monument classé, dans un périmètre de 500 m, est soumis à son avis. Il examine façades, ouvertures, occultations, toitures, garde-corps, couleurs et matériaux." },
        { h: "À retenir sur l'ABF", b: "Son avis favorable ne dispense pas du permis de construire. Depuis la loi du 13 décembre 2000 (art. 37), l'ABF ne peut plus exercer de mission de conception ou de maîtrise d'œuvre à titre libéral." },
      ],
      linked: ["macte1-moa-moe", "macte1-pros"],
    },

    "macte1-constructeur": {
      mod: "macte1",
      title: "Le constructeur & les entrepreneurs",
      lede: "Qui est juridiquement « constructeur », et comment s'organisent les entreprises sur un chantier.",
      sections: [
        { h: "Le constructeur (art. 1792-1)", list: [
          "Tout architecte, entrepreneur, technicien lié au MOA par un contrat de louage d'ouvrage.",
          "Toute personne qui vend, après achèvement, un ouvrage qu'elle a construit ou fait construire.",
          "Tout mandataire du propriétaire accomplissant une mission assimilable à celle d'un locateur d'ouvrage.",
        ]},
        { h: "L'entreprise générale", b: "Désigne presque toujours l'entreprise de maçonnerie-béton armé, qui assure la plus grosse part du marché et peut piloter les autres corps d'état." },
        { h: "Les entrepreneurs groupés", list: [
          "SOLIDAIRES : chacun est engagé pour la TOTALITÉ du marché et doit pallier la défaillance des autres.",
          "CONJOINTS : les travaux sont divisés en lots ; chacun n'est engagé que pour le ou les lots qui lui sont assignés.",
          "Ils soumissionnent par l'intermédiaire d'un mandataire commun.",
        ]},
        { h: "Séparés, sous-traitant, cotraitants", list: [
          "Séparés : marchés signés indépendamment pour un même ouvrage.",
          "Sous-traitant : exécute une partie du contrat sous la responsabilité de l'entrepreneur principal (par un sous-traité).",
          "Cotraitants : associent leurs candidatures dans un « groupement momentané d'entreprises ».",
        ]},
      ],
      linked: ["macte1-moa-moe", "macte1-controle"],
    },

    "macte1-controle": {
      mod: "macte1",
      title: "SPS, bureaux d'études & bureaux de contrôle",
      lede: "Les intervenants techniques qui sécurisent et fiabilisent le chantier.",
      sections: [
        { h: "Le coordonnateur SPS", b: "Le coordonnateur Sécurité et Protection de la Santé agit sous la responsabilité du MOA (art. L.230-2 C. trav.). L'art. L.235-3 impose une coordination dès que plusieurs travailleurs ou entreprises (sous-traitants inclus) interviennent, pour prévenir les risques d'interventions simultanées ou successives." },
        { h: "3 niveaux de SPS", b: "Il existe 3 niveaux de coordonnateurs selon le nombre d'heures passées et le nombre d'entreprises. Les protections : échafaudages, baudriers, filets antichute, EPI (casque, chaussures de sécurité, gants…)." },
        { h: "Le bureau d'études techniques (BET)", b: "Pour des travaux importants et complexes, le MOA confie des missions d'étude au BET, en lien avec le MOE. Sur la base des plans de l'architecte, il établit les plans techniques de structure et de fluides (électricité, chauffage, ventilation). Généraliste ou spécialisé (béton, sols, thermique). Souvent associé à un métreur/économiste de la construction." },
        { h: "Le bureau de contrôle", b: "SOCOTEC, VERITAS, APAVE… Mission de contrôle confiée par le MOA quand la complexité l'exige (solidité, sécurité). Il ne donne que des avis FAVORABLES ou DÉFAVORABLES, pas de solution, en s'appuyant sur les règlements, normes et DTU. Il rend compte aux compagnies d'assurances." },
      ],
      linked: ["macte1-constructeur", "macte1-pros"],
    },

    "macte1-pros": {
      mod: "macte1",
      title: "Géomètre, expert, agent immobilier & marchand de biens",
      lede: "Les professionnels qui mesurent, expertisent et commercialisent.",
      sections: [
        { h: "Le géomètre-expert", b: "Il dresse les documents topographiques : mesure des terrains et biens fonciers, délimitation (bornage) et représentation graphique. Profession libérale garantie par un diplôme du gouvernement + un stage, régie par l'Ordre des Géomètres-Experts." },
        { h: "L'expert judiciaire", b: "Auxiliaire de la justice qui éclaire le tribunal d'un avis technique. Inscrit sur la liste des Cours d'Appel ou de Cassation (révisée chaque année). Son rapport décrit les lieux, les remèdes, l'estimation des travaux et un avis sur les responsabilités. Le Code de procédure lui interdit de surveiller les travaux de réfection." },
        { h: "L'agent immobilier", b: "Il évalue les immeubles (habitation, agricoles, industriels, commerciaux), fonds de commerce, droit au bail et terrains. Il intervient dans les opérations d'achat-vente, location, gérance, donation, legs, apport en société, dissolution, expropriation, servitudes." },
        { h: "Le marchand de biens", b: "Comme tout commerçant, il achète pour revendre avec bénéfice : en l'état, après rénovation ou après transformation. Mais les transformations ne doivent pas donner lieu à une construction nouvelle, qui relève du promoteur (constructeur)." },
      ],
      linked: ["macte1-architecte", "macte1-controle"],
    },

    /* ===================== macte2 — Les assurances ===================== */
    "macte2-spinetta": {
      mod: "macte2",
      title: "La loi Spinetta & le principe de l'article 1792",
      lede: "Le socle de toute l'assurance construction depuis 1978.",
      sections: [
        { h: "La loi Spinetta (4 janvier 1978)", b: "Elle organise l'assurance construction et crée deux assurances obligatoires : la responsabilité civile décennale (souscrite par le constructeur) et la Dommages-Ouvrage (souscrite par le maître d'ouvrage)." },
        { h: "Le principe (art. 1792 C. civ.)", b: "« Tout constructeur d'un ouvrage est responsable de plein droit, envers le maître ou l'acquéreur de l'ouvrage, des dommages, même résultant d'un vice du sol, qui compromettent la solidité de l'ouvrage ou qui, l'affectant dans l'un de ses éléments constitutifs ou d'équipement, le rendent impropre à sa destination. »" },
        { h: "La responsabilité « de plein droit »", b: "Le constructeur est présumé responsable : le maître d'ouvrage n'a pas à prouver une faute. Le constructeur ne s'exonère qu'en prouvant une CAUSE ÉTRANGÈRE (tempête, séisme…)." },
        { h: "Qui est « constructeur » ?", b: "Architecte, maître d'œuvre, entrepreneur, mais aussi celui qui fait construire pour lui-même. La présomption de responsabilité (art. 1792 et suivants) déclenche l'obligation d'assurance." },
      ],
      linked: ["macte2-do", "macte2-garanties"],
    },

    "macte2-do": {
      mod: "macte2",
      title: "L'assurance Dommages-Ouvrage (DO)",
      lede: "Préfinancer les réparations sans attendre qu'on cherche les responsables.",
      sections: [
        { h: "Définition", b: "Souscrite par le MOA AVANT l'ouverture du chantier, pour toute construction ayant fait l'objet d'une déclaration à l'assureur. Elle garantit, hors de toute recherche de responsabilité, le paiement des travaux de réparation des dommages de nature décennale." },
        { h: "Ce qu'elle couvre", list: [
          "Les dommages qui compromettent la solidité de l'ouvrage (le bâtiment va-t-il s'écrouler ?).",
          "Ceux qui rendent l'ouvrage impropre à sa destination (fissure infiltrante, panne généralisée de chauffage…).",
          "Ceux affectant un élément d'équipement INDISSOCIABLE des ouvrages de viabilité, fondation, ossature, clos ou couvert.",
          "Les travaux de démolition, déblaiement, dépose ou démontage nécessaires.",
        ]},
        { h: "Point de départ & durée", b: "La garantie commence à l'expiration de la garantie de parfait achèvement (1 an après la réception) et prend fin 10 ans après la réception. Elle peut jouer avant (résiliation pour inexécution) ou pendant l'année de parfait achèvement (entrepreneur défaillant après mise en demeure, délai de 90 jours)." },
        { h: "Délai de traitement & transmission", b: "L'assureur DO a 90 jours maximum, à partir du dossier complet (LRAR, PV de réception, déclaration d'ouverture de chantier, photos), pour proposer une indemnité ou refuser. Il missionne un expert UNIQUE. La DO se transmet à tout acquéreur de l'immeuble durant sa validité." },
      ],
      linked: ["macte2-spinetta", "macte2-correlation"],
    },

    "macte2-garanties": {
      mod: "macte2",
      title: "Parfait achèvement, biennale & décennale",
      lede: "Les trois garanties qui se déclenchent à la réception des travaux.",
      sections: [
        { h: "Garantie de parfait achèvement", b: "1 an à compter de la réception (6 mois en marché public). Couvre tous les désordres réservés au PV de réception ou signalés dans l'année (apparents ou cachés, défauts de conformité, isolation phonique). L'entrepreneur répare EN NATURE ; à défaut après mise en demeure, on fait exécuter à ses frais." },
        { h: "Garantie biennale (bon fonctionnement)", b: "2 ans après la réception (débute à la fin de la 1re année). Garantit les vices des éléments d'équipement DISSOCIABLES — démontables sans destruction du gros œuvre (convecteur, porte) — sans atteinte à la solidité ni à la destination." },
        { h: "Garantie décennale — conditions", list: [
          "Le désordre doit être GRAVE et CACHÉ.",
          "Soit il compromet la solidité de l'ouvrage.",
          "Soit il rend l'ouvrage impropre à sa destination.",
          "Soit il affecte un élément d'équipement INDISSOCIABLE (carrelage, plomberie encastrée, radiateur scellé).",
        ]},
        { h: "Garantie décennale — durée", b: "10 ans à compter de la réception. Un vice apparent non réservé à la réception est « purgé » (réputé accepté). Elle se prolonge au-delà de 10 ans pour les désordres évolutifs (dénoncés dans le délai puis aggravés). Comme la DO, elle se transmet à tout nouvel acquéreur." },
      ],
      linked: ["macte2-do", "macte2-correlation"],
    },

    "macte2-correlation": {
      mod: "macte2",
      title: "DO ⇄ décennale & les personnes assujetties",
      lede: "Deux assurances obligatoires, complémentaires, de même durée.",
      sections: [
        { h: "Deux assurances obligatoires", list: [
          "RC décennale : assurance de PERSONNE (art. L.241-1 C. assur., repris L.111-28 CCH), souscrite par l'entreprise selon son activité (maçon, plombier…).",
          "Dommages-Ouvrage : assurance de CHOSE (art. L.242-1, repris L.111-30 CCH), souscrite par le MOA ou son mandataire.",
          "Même durée : 10 ans à compter de la réception.",
        ]},
        { h: "Comment elles s'articulent", b: "La DO préfinance les réparations de nature décennale, puis se retourne contre les constructeurs responsables et leurs assureurs décennaux. Le MOA est indemnisé vite, sans attendre l'issue des recherches de responsabilité." },
        { h: "Les personnes assujetties à la décennale", list: [
          "Locateurs d'ouvrage, bureaux de contrôle technique.",
          "Vendeur après achèvement, vendeur d'immeuble à construire, mandataire/promoteur.",
          "Constructeur de maisons individuelles, lotisseur, syndic de copropriété.",
          "L'architecte (RC professionnelle personnelle, plus large que la décennale).",
        ]},
        { h: "Sanctions & rôle du notaire", b: "Non-souscription sanctionnée civilement et pénalement (art. L.243-3). Le notaire qui reçoit un acte de vente d'un immeuble achevé depuis moins de 10 ans doit mentionner l'existence ou l'absence de ces assurances (art. L.243-2) et en vérifier la réalité." },
      ],
      linked: ["macte2-garanties", "macte2-extrinseques"],
    },

    "macte2-extrinseques": {
      mod: "macte2",
      title: "Garanties extrinsèques, RC de droit commun & dommages intermédiaires",
      lede: "Les garanties qui encadrent le chantier et comblent les « trous » entre biennale et décennale.",
      sections: [
        { h: "Garantie de remboursement", b: "Limitée à 5 % du prix du contrat. Elle prend effet à l'appel de fonds correspondant à sa remise en main propre et CESSE le jour de l'ouverture du chantier. Elle protège le MOA en cas de défaillance du constructeur (faillite) avant le démarrage." },
        { h: "Garantie de livraison", b: "Prend effet à l'ouverture du chantier, cesse à la réception sans réserve (PV) ; ne peut excéder 2 ans. Elle couvre le MOA contre le risque d'inexécution des travaux, au prix et aux délais convenus." },
        { h: "RC contractuelle de droit commun", b: "Pour des motifs autres que l'ouvrage lui-même (devoir de conseil, délai, prix). Prescription de 10 ans (jurisprudence). Arrêt de principe du 13 avril 1988 : elle est ÉCARTÉE quand les garanties biennale et décennale s'appliquent, sauf dol, trouble anormal de voisinage, désordres réservés non réparés, etc." },
        { h: "Les dommages intermédiaires", b: "Désordres non apparents qui ne relèvent NI de la biennale (pas un équipement dissociable) NI de la décennale (pas d'atteinte à la solidité/destination) — ex. fissure non infiltrante qui déprécie le bien. Ils relèvent de la RC contractuelle ; action à introduire dans les 10 ans de la réception." },
      ],
      linked: ["macte2-correlation", "macte2-habitation"],
    },

    "macte2-habitation": {
      mod: "macte2",
      title: "L'assurance habitation & les assurances facultatives",
      lede: "Au-delà du chantier : assurer le logement et sécuriser les loyers.",
      sections: [
        { h: "Définition & obligation", b: "L'assurance habitation couvre le logement et ses occupants. Elle est obligatoire pour le locataire (et la copropriété doit s'assurer). Le propriétaire occupant a tout intérêt à la souscrire (RC + biens)." },
        { h: "Ce qu'elle couvre", list: [
          "Liée aux biens : incendie, dégât des eaux, vol, bris de glace, catastrophes naturelles.",
          "Liée à la personne : responsabilité civile (dommages causés aux tiers).",
        ]},
        { h: "Le calcul de la cotisation", b: "Selon la surface et le nombre de pièces, la valeur des biens mobiliers, la localisation (zone à risque), le niveau de garanties et de franchise choisis." },
        { h: "Les assurances facultatives", list: [
          "GLI (Garantie des Loyers Impayés) : protège le bailleur contre les impayés, dégradations et frais de procédure.",
          "Garantie locative : couvre les risques liés à l'occupation du logement loué.",
        ]},
      ],
      linked: ["macte2-extrinseques", "macte2-spinetta"],
    },

    /* ===================== macte3 — Contrats & marchés ===================== */
    "macte3-prive": {
      mod: "macte3",
      title: "Les marchés privés",
      lede: "Entre personnes privées : le MOA fixe le cap, le MOE pilote la passation.",
      sections: [
        { h: "Le rôle du maître d'ouvrage", b: "Il fixe le programme et l'enveloppe financière, donne tous les éléments de base (relevés, contraintes d'urbanisme) et choisit, sur proposition du MOE, la ou les entreprises." },
        { h: "Le rôle du maître d'œuvre", list: [
          "Assistance pour la passation des marchés de travaux.",
          "Élaboration du dossier de consultation des entreprises (DCE).",
          "Mise au point des marchés, direction et comptabilité des travaux.",
          "Le visa des documents, l'assistance aux opérations de réception.",
        ]},
        { h: "Le DCE", b: "Le Dossier de Consultation des Entreprises réunit les pièces écrites (CCTP, CCAP…) et graphiques (plans) remises aux entreprises retenues, qui remettent leur offre dans un délai donné." },
        { h: "Le visa du MOE", b: "Le maître d'œuvre VISE (vérifie et valide) les documents d'exécution établis par les entreprises, pour s'assurer de leur conformité au projet, ainsi que les situations de travaux présentées au paiement du MOA." },
      ],
      linked: ["macte3-public", "macte3-procedures"],
    },

    "macte3-public": {
      mod: "macte3",
      title: "Les marchés publics",
      lede: "Quand un acheteur public commande des travaux : des règles strictes de transparence.",
      sections: [
        { h: "Définition", b: "Contrat conclu à titre onéreux par un pouvoir adjudicateur (État, collectivité, établissement public) avec un opérateur économique, pour répondre à ses besoins en travaux, fournitures ou services." },
        { h: "Le pouvoir adjudicateur", b: "L'acheteur public. Il définit son besoin, choisit la procédure selon le montant et veille au respect des grands principes : liberté d'accès à la commande publique, égalité de traitement des candidats, transparence des procédures." },
        { h: "Formes & modalités d'achat", b: "Marché ordinaire, accord-cadre, marché à bons de commande… Les modalités d'achat dépendent de la nature et du montant du besoin." },
        { h: "Publicité obligatoire", b: "La mise en concurrence passe par une publicité adaptée au montant (du simple affichage au Journal officiel / BOAMP / JOUE), pour garantir l'égalité d'accès et la transparence." },
      ],
      linked: ["macte3-procedures", "macte3-choix"],
    },

    "macte3-procedures": {
      mod: "macte3",
      title: "Procédures de passation, candidatures & négociation",
      lede: "Du seuil dépend la procédure ; de la procédure dépendent les marges de négociation.",
      sections: [
        { h: "La procédure adaptée (MAPA)", b: "En dessous des seuils des procédures formalisées, l'acheteur fixe librement les modalités (publicité, délais, négociation) dans le respect des principes de la commande publique." },
        { h: "Les procédures formalisées", list: [
          "Appel d'offres ouvert : toute entreprise peut remettre une offre.",
          "Appel d'offres restreint : seules les entreprises sélectionnées remettent une offre.",
          "Procédure avec négociation / dialogue compétitif : pour les besoins complexes.",
        ]},
        { h: "Les candidatures", b: "L'acheteur vérifie d'abord les candidatures (capacités professionnelles, techniques, financières ; absence d'interdiction de soumissionner) avant d'examiner les offres." },
        { h: "La négociation", b: "Possible en procédure adaptée et dans certaines procédures formalisées : elle porte sur le prix, les délais, la valeur technique… mais jamais au point de modifier substantiellement l'objet du marché ni de rompre l'égalité entre candidats." },
      ],
      linked: ["macte3-public", "macte3-choix"],
    },

    "macte3-choix": {
      mod: "macte3",
      title: "Choix de l'offre, exécution & règle d'or",
      lede: "On retient l'offre la plus avantageuse — et en cas de litige, l'écrit l'emporte.",
      sections: [
        { h: "L'offre économiquement la plus avantageuse", b: "Pas forcément la moins chère : on pondère plusieurs critères (prix, valeur technique, délais, performances environnementales, coût global d'utilisation). La pondération est annoncée à l'avance." },
        { h: "L'exécution du marché", b: "Ordre de service de démarrage, réunions de chantier, situations de travaux visées par le MOE et réglées par le MOA, puis réception des ouvrages (avec ou sans réserves)." },
        { h: "Le déroulement type", list: [
          "ESQ / APS / APD → dépôt des autorisations (permis).",
          "DCE → consultation des entreprises → comparatif des offres.",
          "Signature des marchés → ordre de service → chantier → réception → déclaration d'achèvement.",
        ]},
        { h: "Règle d'or : l'écrit prime", b: "En cas de litige sur un chantier, les pièces ÉCRITES priment sur les pièces graphiques : un texte peut être lu par tous, alors qu'un plan peut être interprété différemment ou mal compris." },
      ],
      linked: ["macte3-prive", "macte3-procedures"],
    },

    /* ===================== macte4 — La VEFA ===================== */
    "macte4-reservation": {
      mod: "macte4",
      title: "Définition, réservation & dépôt de garantie",
      lede: "Acheter un logement « sur plan » : l'entrée dans la VEFA.",
      sections: [
        { h: "Qu'est-ce que la VEFA ?", b: "La Vente en État Futur d'Achèvement, ou vente « sur plan » : l'acquéreur devient propriétaire du sol puis des constructions au fur et à mesure de leur exécution, et règle le prix par appels de fonds échelonnés." },
        { h: "Le contrat de réservation", b: "Avant-contrat de la VEFA : il décrit le logement (surface, situation, prestations), indique le prix prévisionnel et la date de livraison. Il est accompagné d'un dépôt de garantie versé sur un compte séquestre." },
        { h: "Le dépôt de garantie — plafonds", list: [
          "5 % du prix si la vente intervient dans l'année.",
          "2 % si elle intervient entre 1 et 2 ans.",
          "0 % (aucun dépôt) au-delà de 2 ans.",
        ]},
        { h: "À quoi sert le séquestre", b: "Les sommes sont bloquées sur un compte séquestre : elles sécurisent l'acquéreur tant que la vente n'est pas définitive, et lui sont restituées s'il renonce dans les cas prévus (rétractation, non-réalisation des conditions)." },
      ],
      linked: ["macte4-garanties", "macte4-fonds"],
    },

    "macte4-garanties": {
      mod: "macte4",
      title: "Les garanties du contrat VEFA",
      lede: "De la GFA à la décennale : tout ce qui protège l'acquéreur sur plan.",
      sections: [
        { h: "La GFA (Garantie Financière d'Achèvement)", b: "La garantie phare de la VEFA : elle assure que le logement sera achevé et livré même si le promoteur fait défaut (faillite). C'est la sécurité essentielle de l'acheteur avant la réception." },
        { h: "Les garanties après réception", list: [
          "Garantie de parfait achèvement : 1 an.",
          "Garantie biennale de bon fonctionnement : 2 ans.",
          "Garantie décennale : 10 ans.",
        ]},
        { h: "La personnalisation", b: "L'acquéreur peut demander des travaux modificatifs (TMA) pour personnaliser son logement (cloisons, revêtements, équipements), dans les limites techniques et de délai fixées par le promoteur." },
        { h: "À retenir", b: "La GFA couvre l'AVANT (achèvement) ; les garanties de parfait achèvement, biennale et décennale couvrent l'APRÈS (réception). Ensemble, elles sécurisent tout le cycle de la VEFA." },
      ],
      linked: ["macte4-reservation", "macte4-livraison"],
    },

    "macte4-fonds": {
      mod: "macte4",
      title: "Acte notarié & appels de fonds",
      lede: "Signer définitivement et payer au rythme de l'avancement.",
      sections: [
        { h: "L'acte notarié", b: "Le contrat définitif est signé chez le notaire. L'acquéreur règle les frais de notaire et d'hypothèque (si prêt). Une procuration permet de faire signer un tiers à sa place s'il ne peut être présent." },
        { h: "Les appels de fonds — plafonds légaux", list: [
          "35 % du prix à l'achèvement des fondations.",
          "70 % à la mise hors d'eau (toiture posée).",
          "95 % à l'achèvement de l'immeuble.",
          "5 % à la livraison.",
        ]},
        { h: "Le rôle du financement", b: "Les appels de fonds sont déclenchés par le promoteur au fil de l'avancement et réglés par l'acquéreur ou sa banque (déblocages successifs du prêt)." },
        { h: "Les 5 % de la livraison", b: "Le solde de 5 % est consignable : en cas de réserves à la livraison, l'acquéreur peut le consigner jusqu'à la levée des réserves, ce qui incite le promoteur à corriger les défauts." },
      ],
      linked: ["macte4-reservation", "macte4-livraison"],
    },

    "macte4-livraison": {
      mod: "macte4",
      title: "La livraison du logement",
      lede: "Prendre possession, vérifier, et réagir en cas de retard.",
      sections: [
        { h: "Le constat d'achèvement", b: "Préalable à la livraison : il atteste que l'immeuble est achevé (conforme aux caractéristiques du contrat, équipements indispensables installés)." },
        { h: "Le procès-verbal de livraison", b: "Lors de la remise des clés, l'acquéreur prend possession et signe un PV de livraison. Il peut émettre des RÉSERVES sur les défauts apparents constatés ; le promoteur dispose d'un délai pour les lever." },
        { h: "En cas de retard de livraison", b: "Le contrat prévoit des pénalités de retard au profit de l'acquéreur. Un retard important et injustifié peut ouvrir droit à des dommages et intérêts, voire à la résolution de la vente." },
        { h: "Réserves & consignation", b: "Les 5 % restants peuvent être consignés tant que les réserves ne sont pas levées. C'est le dernier levier de l'acquéreur pour obtenir un logement conforme." },
      ],
      linked: ["macte4-garanties", "macte4-fonds"],
    },

  };

  window.DEEPDIVE = Object.assign(window.DEEPDIVE || {}, DD);
})();
