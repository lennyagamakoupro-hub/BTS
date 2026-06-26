/* ============================================
   LENNY — Deep-dive (diaporama) · Acte de construire (2/2)
   Chapitres détaillés pour les modules macte5 → macte8.
   Fusionne dans window.DEEPDIVE sans écraser l'existant.
   ============================================ */
(function () {
  const DD = {

    /* ===================== macte5 — Les plans ===================== */
    "macte5-etudes": {
      mod: "macte5",
      title: "Les phases d'études de maîtrise d'œuvre",
      lede: "De la première intention au plan de chantier : ESQ, APS, APD, PRO, EXE.",
      sections: [
        { h: "L'esquisse (ESQ)", b: "Première étape : elle propose une ou plusieurs solutions d'ensemble traduisant les éléments majeurs du programme, indique les délais et vérifie la compatibilité avec l'enveloppe financière prévisionnelle ainsi que la faisabilité au regard des contraintes du programme et du site." },
        { h: "L'avant-projet sommaire (APS)", b: "Précise la composition générale en plan et en volume, apprécie les volumes intérieurs et l'aspect extérieur, propose les dispositions techniques et un calendrier de réalisation, et donne une estimation PROVISOIRE du coût." },
        { h: "L'avant-projet définitif (APD)", b: "Détermine les surfaces détaillées, arrête en plans, coupes et façades les dimensions de l'ouvrage et son aspect, définit les matériaux, et établit l'estimation DÉFINITIVE du coût décomposée par lots. C'est au stade de l'avant-projet (AVP) qu'on dépose le permis de construire." },
        { h: "Projet (PRO) & exécution (EXE)", list: [
          "PRO : précise par des plans, coupes et élévations les formes, les matériaux, l'implantation des équipements, les tracés des fluides et le coût par corps d'état.",
          "EXE : établit tous les plans d'exécution à l'usage du chantier, le devis quantitatif détaillé par lot et le calendrier prévisionnel des travaux.",
        ]},
      ],
      linked: ["macte5-masse", "macte5-architecte"],
    },

    "macte5-masse": {
      mod: "macte5",
      title: "Plan de masse, de situation & cadastral",
      lede: "Les plans qui situent et implantent le projet sur le terrain.",
      sections: [
        { h: "Le plan de masse", b: "Vue de dessus (échelle 1/50 à 1/500) du terrain et de la construction : orientation géographique, limites du terrain cotées et bornes, relief (courbes de niveau), plantations, emprise au sol avec distances aux limites séparatives, clôtures, voies et réseaux (eau, électricité, assainissement)." },
        { h: "Le plan de situation", b: "Vue de dessus situant le terrain dans son environnement (échelle 1/5000 à 1/25000) : orientation, voies de desserte et leur nom, points de repère (église, école, mairie). C'est souvent la reproduction du plan cadastral disponible en mairie." },
        { h: "Le plan cadastral", b: "Document administratif qui recense les propriétés foncières d'une commune afin de calculer les impôts locaux (taxe foncière). Sa vocation est FISCALE et non juridique : il ne constitue PAS un titre de propriété. Consultable sur www.cadastre.gouv.fr." },
        { h: "À ne pas confondre", b: "Le plan de situation REPÈRE le terrain dans la commune ; le plan de masse IMPLANTE la construction sur le terrain ; le cadastre IDENTIFIE la parcelle pour l'impôt. Les trois figurent au dossier de demande d'autorisation." },
      ],
      linked: ["macte5-etudes", "macte5-architecte"],
    },

    "macte5-architecte": {
      mod: "macte5",
      title: "Plan d'architecte, coupe & façade",
      lede: "Lire un projet en plan, en coupe et en élévation.",
      sections: [
        { h: "Le plan d'architecte", b: "C'est l'habitation coupée horizontalement à 1 m du sol ; on dessine autant de plans qu'il y a d'étages. Niveau de référence = RDC, niveaux supérieurs R+1, R+2…, inférieurs R-1, R-2… On y porte les cotes (extérieures, des percements, intérieures, hauteurs sous plafond HSP)." },
        { h: "La représentation des escaliers", b: "Les escaliers sont représentés coupés, avec une flèche indiquant le sens de la montée. Les portes figurent avec leur sens d'ouverture, les fenêtres en trait fin." },
        { h: "Le plan de coupe", b: "Coupe VERTICALE de l'ensemble de la construction, des fondations au faîtage. Elle porte les hauteurs et niveaux et sert de base aux détails techniques (jonctions toiture/murs, liaisons murs/planchers, position des fenêtres). Coupe droite (de part en part) ou brisée." },
        { h: "Le plan de façade (élévation)", b: "Vue extérieure de la construction. Pour une habitation, on représente les 4 façades (nommées par orientation ou par rapport à la façade principale). On y voit terrasses, balcons, charpente apparente, souches de cheminée, lucarnes, menuiseries, volets et garde-corps." },
        { h: "Les abréviations à connaître", list: [
          "EP : eau pluviale · EU : eaux usées · EV : eaux vannes (WC).",
          "VH / VB : ventilation haute / basse · CF : conduit de fumée.",
          "BA : béton armé · VR : volet roulant · HSP : hauteur sous plafond.",
        ]},
      ],
      linked: ["macte5-etudes", "macte5-masse"],
    },

    /* ===================== macte6 — Les surfaces ===================== */
    "macte6-plancher": {
      mod: "macte6",
      title: "La surface de plancher",
      lede: "La référence des autorisations d'urbanisme depuis 2012.",
      sections: [
        { h: "Définition", b: "Depuis le 1er mars 2012, la surface de plancher est la référence des autorisations d'urbanisme (elle remplace la SHON et la SHOB). C'est la somme des surfaces de plancher closes et couvertes, sous une hauteur de plafond supérieure à 1,80 m, calculée à partir du NU INTÉRIEUR des façades (art. L.111-14 C. urb.)." },
        { h: "Pourquoi le nu intérieur ?", b: "Calculer au nu intérieur des façades revient à exclure l'épaisseur des murs extérieurs et des isolants : on encourage ainsi l'isolation thermique sans pénaliser la surface constructible déclarée." },
        { h: "Les déductions", list: [
          "Embrasures de portes et fenêtres ; vides et trémies (escaliers, ascenseurs).",
          "Surfaces dont la hauteur sous plafond est ≤ 1,80 m.",
          "Surfaces de stationnement des véhicules.",
          "Combles non aménageables ; locaux techniques (chaufferie, machinerie).",
          "Caves et celliers desservis uniquement par une partie commune.",
          "10 % des surfaces d'habitation desservies par des parties communes intérieures.",
        ]},
        { h: "À quoi elle sert", b: "Elle détermine le type d'autorisation (déclaration préalable ou permis de construire) et le seuil de recours obligatoire à un architecte (150 m²)." },
      ],
      linked: ["macte6-habitable", "macte6-emprise"],
    },

    "macte6-habitable": {
      mod: "macte6",
      title: "Surface habitable, utile & RT",
      lede: "Les surfaces « vécues » du logement et la surface de référence thermique.",
      sections: [
        { h: "Surface habitable / utile", b: "On dit « habitable » pour les logements et « utile » pour les bureaux. C'est la surface de plancher construite après déduction des murs, cloisons, marches et cages d'escaliers, gaines et embrasures (art. R.111-2 CCH)." },
        { h: "Ce qu'on exclut", b: "Combles non aménagés, caves, sous-sols, remises, garages, terrasses, balcons, loggias, vérandas, et toutes les parties d'une hauteur inférieure à 1,80 m." },
        { h: "La surface RT (Srt)", b: "Surface de référence thermique : on part de la surface « hors tout » des parois horizontales, dont on déduit les surfaces non closes ou à l'air libre, les surfaces non aménageables (h < 1,80 m, combles perdus, locaux techniques) et les surfaces non aménagées pour l'habitation (vérandas non chauffées, garages)." },
        { h: "À quoi servent ces surfaces", b: "La surface habitable est la référence des dossiers de transaction, de location et d'aides au logement ; la surface RT sert aux calculs réglementaires de performance énergétique du bâtiment." },
      ],
      linked: ["macte6-plancher", "macte6-emprise"],
    },

    "macte6-emprise": {
      mod: "macte6",
      title: "L'emprise au sol",
      lede: "La trace du bâtiment sur le terrain, vue d'en haut.",
      sections: [
        { h: "Définition", b: "L'emprise au sol est la projection verticale du volume de la construction sur le terrain, tous débords et surplombs inclus. Elle comprend l'épaisseur des murs extérieurs." },
        { h: "Ce qu'on INCLUT", list: [
          "Les bâtiments principaux.",
          "Les balcons, les terrasses SURÉLEVÉES.",
          "Les pergolas (installation permanente), les garages fermés.",
          "Les piscines (sauf disposition contraire du PLU).",
          "Les escaliers extérieurs, dépendances et annexes.",
        ]},
        { h: "Ce qu'on EXCLUT", list: [
          "Les cours, jardins, espaces de stationnement non couverts.",
          "Les clôtures et portails.",
          "Les terrasses de PLAIN-PIED (qui ne créent pas d'emprise).",
          "Les débords de toiture et marquises NON soutenus par des poteaux.",
        ]},
        { h: "Son utilité", b: "L'emprise au sol sert à vérifier le respect du coefficient d'emprise fixé par le PLU et, combinée à la surface de plancher, à déterminer l'autorisation d'urbanisme requise." },
      ],
      linked: ["macte6-plancher", "macte6-habitable"],
    },

    /* ===================== macte7 — Les contraintes ===================== */
    "macte7-codes": {
      mod: "macte7",
      title: "Les codes & le Code de l'urbanisme",
      lede: "Le cadre juridique qui encadre tout acte de construire.",
      sections: [
        { h: "Les codes usuels", list: [
          "Code civil : cadre général des contrats et de la propriété.",
          "Code pénal : responsabilité pénale des intervenants.",
          "Code des assurances : assurance construction obligatoire (DO).",
          "Code de l'urbanisme ; Code de la construction et de l'habitation (CCH).",
          "Code du travail et de l'hygiène ; normes et DTU.",
        ]},
        { h: "Le Code de l'urbanisme", b: "Il organise l'occupation des sols. L'art. L.101-1 énonce que « le territoire français est le patrimoine commun de la nation ». L'art. L.101-2 fixe les objectifs de développement durable de l'action des collectivités en matière d'urbanisme." },
        { h: "Sa structure", b: "Il comporte 6 livres ; les plus mobilisés sont le Livre 1 (règles générales d'aménagement et d'urbanisme) et le Livre 4 (régime applicable aux constructions, aménagements et démolitions — l'acte de construire)." },
        { h: "Le CCH", b: "Le Code de la construction et de l'habitation régit la qualité des constructions (sécurité, solidité, accessibilité, performance), le logement décent, les rapports locatifs et la copropriété." },
      ],
      linked: ["macte7-documents", "macte7-lois"],
    },

    "macte7-documents": {
      mod: "macte7",
      title: "RNU, carte communale, PLU & SCoT",
      lede: "La hiérarchie des documents qui disent où et comment construire.",
      sections: [
        { h: "Le RNU", b: "Le Règlement National d'Urbanisme s'applique à défaut de document local. Il entraîne la « constructibilité limitée » : en principe, on ne peut construire que dans les parties déjà urbanisées de la commune." },
        { h: "La carte communale", b: "Document simple qui délimite les secteurs où les constructions sont autorisées et ceux où elles ne le sont pas. Elle ne comporte pas de règlement propre : ce sont les règles du RNU qui s'appliquent." },
        { h: "Le PLU / PLUi", b: "Le Plan Local d'Urbanisme (communal ou intercommunal) établit un projet global. Il comprend un rapport de présentation, un PADD, des OAP, un règlement délimitant les zones U (urbaines), AU (à urbaniser), A (agricoles), N (naturelles) — 16 articles — et des annexes (servitudes)." },
        { h: "SCoT & PLH", list: [
          "SCoT (Schéma de Cohérence Territoriale) : planifie à l'échelle d'un large bassin de vie et assure la cohérence des PLU, PLH et PDU (loi SRU, 2000).",
          "PLH (Programme Local de l'Habitat) : document stratégique de la politique de l'habitat (parc public et privé, mixité sociale).",
        ]},
      ],
      linked: ["macte7-codes", "macte7-lois"],
    },

    "macte7-lois": {
      mod: "macte7",
      title: "Les grandes lois de l'urbanisme",
      lede: "De la loi SRU à la loi Habitat dégradé : la frise à connaître.",
      sections: [
        { h: "Loi SRU (13 décembre 2000)", b: "Solidarité et Renouvellement Urbains : crée le PLU (en remplacement du POS) et le SCoT ; impose 20 % (puis 25 %) de logements sociaux dans certaines communes." },
        { h: "Loi ALUR (24 mars 2014)", b: "Accès au Logement et Urbanisme Rénové : transfert automatique du PLU aux intercommunalités, encadrement des loyers en zones tendues, fonds de travaux obligatoire et immatriculation des copropriétés, caducité des POS au 1er janvier 2016." },
        { h: "Loi ELAN (23 novembre 2018)", b: "Évolution du Logement, de l'Aménagement et du Numérique : construire plus, mieux et moins cher ; opérations de revitalisation de territoire (ORT) ; bail mobilité (1 à 10 mois) ; transformation de bureaux en logements ; regroupement et vente d'HLM." },
        { h: "Climat & Résilience (22 août 2021)", b: "Interdiction progressive de louer les passoires thermiques (G en 2025, F en 2028, E en 2034), audit énergétique, division par deux de l'artificialisation des sols d'ici 2030 et objectif ZAN (zéro artificialisation nette) en 2050." },
        { h: "Loi Habitat dégradé (9 avril 2024)", b: "Renforce les outils de lutte contre l'habitat indigne et les copropriétés en difficulté (prêt collectif, expropriation simplifiée, prévention de la dégradation)." },
      ],
      linked: ["macte7-documents", "macte7-servitudes"],
    },

    "macte7-servitudes": {
      mod: "macte7",
      title: "Contraintes architecturales & servitudes",
      lede: "Patrimoine protégé et charges qui pèsent sur les fonds.",
      sections: [
        { h: "Contraintes naturelles & patrimoniales", b: "Géographie, climat et géologie d'abord. Puis le patrimoine : Monuments Historiques (loi du 31 décembre 1931 — immeubles classés, imprescriptibles et expropriables, ou inscrits à l'inventaire), monuments naturels et sites, secteurs sauvegardés (loi Malraux du 4 août 1962)." },
        { h: "Le rôle de l'ABF", b: "Dans les périmètres protégés et les secteurs sauvegardés, l'Architecte des Bâtiments de France émet un avis (parfois CONFORME) sur les travaux : façades, matériaux, couleurs, toitures." },
        { h: "La servitude — définition", b: "Charge imposée sur un fonds (le fonds SERVANT) pour l'utilité et l'usage d'un autre fonds appartenant à un autre propriétaire (le fonds DOMINANT). Elle suppose deux fonds contigus appartenant à des propriétaires différents." },
        { h: "Caractères & classification", list: [
          "Caractères : immobilière, indissociable du fonds, perpétuelle, indivisible.",
          "Par établissement : naturelle (écoulement des eaux, bornage), légale (mitoyenneté, voisinage), conventionnelle.",
          "Par exercice : continue / discontinue ; apparente / non apparente ; positive / négative.",
        ]},
        { h: "L'aménagement du territoire", b: "Pyramide descendante : niveau national (DATAR créée en 1963, fonds européens FEDER), décentralisation de 1982, loi NOTRe (7 août 2015) confiant aux régions le SRADDET, puis département et commune (PLU, schéma directeur)." },
      ],
      linked: ["macte7-lois", "macte7-codes"],
    },

    /* ===================== macte8 — Autorisations & normes ===================== */
    "macte8-cu-dp": {
      mod: "macte8",
      title: "Certificat d'urbanisme & déclaration préalable",
      lede: "Se renseigner avant de construire, et déclarer les petits travaux.",
      sections: [
        { h: "Le certificat d'urbanisme (CU)", b: "Facultatif mais fortement recommandé. Il indique les règles d'urbanisme applicables à un terrain. Validité 18 mois (prolongeable d'un an tant que les règles, servitudes et taxes ne changent pas)." },
        { h: "Les deux types de CU", list: [
          "CU d'information : règles applicables, servitudes d'utilité publique et taxes — délai d'instruction 1 mois.",
          "CU opérationnel : indique en plus si le terrain peut accueillir le projet et l'état des équipements publics — délai 2 mois.",
        ]},
        { h: "La déclaration préalable (DP)", b: "Pour les petits travaux : création entre 5 et 20 m² de surface de plancher ou d'emprise (porté à 40 m² en zone U couverte par un PLU), changement de destination sans modification des structures/façades, modification de l'aspect extérieur, clôtures, piscines de moins de 100 m²." },
        { h: "Délais & validité de la DP", b: "Instruction 1 mois. Validité 3 ans, prorogeable 2 fois 1 an. Au-delà des seuils de la DP, c'est un permis de construire qui est exigé." },
      ],
      linked: ["macte8-permis", "macte8-taxe"],
    },

    "macte8-permis": {
      mod: "macte8",
      title: "Le permis de construire & les autres permis",
      lede: "L'autorisation des travaux importants : construire, démolir, aménager.",
      sections: [
        { h: "Le permis de construire (PC)", b: "Exigé pour une construction nouvelle ou des travaux créant plus de 20 m² (plus de 40 m² en zone U), pour un changement de destination avec modification des structures/façade, ou sur monument inscrit. Si le total dépasse 150 m², le recours à un architecte est obligatoire." },
        { h: "Délais d'instruction du PC", b: "2 mois pour une maison individuelle et ses annexes ; 3 mois dans les autres cas. Validité 3 ans, prorogeable 2 fois 1 an. Le délai peut être majoré si le projet est soumis à l'avis de l'ABF ou d'une commission." },
        { h: "Permis de démolir & d'aménager", list: [
          "Permis de démolir : pour une construction protégée ou en secteur protégé — instruction 2 mois.",
          "Permis d'aménager : lotissement, camping, aire de stationnement, parc de loisirs — instruction 3 mois (architecte si lotissement > 2 500 m²).",
        ]},
        { h: "Le permis modificatif", b: "Permet d'apporter des modifications MINEURES à un permis en cours de validité, avant la déclaration d'achèvement des travaux (DAACT). Au-delà, il faut déposer un nouveau permis." },
      ],
      linked: ["macte8-cu-dp", "macte8-recours"],
    },

    "macte8-taxe": {
      mod: "macte8",
      title: "La taxe d'aménagement",
      lede: "L'impôt qui finance les équipements publics induits par la construction.",
      sections: [
        { h: "Quand est-elle due ?", b: "Lors d'un permis de construire, d'un permis d'aménager ou d'une déclaration préalable, pour toute opération de construction, reconstruction ou agrandissement d'un bâtiment." },
        { h: "Le calcul", b: "Taxe = surface taxable × valeur forfaitaire × taux. La surface taxable correspond aux surfaces closes et couvertes sous une hauteur > 1,80 m. Valeur forfaitaire 2024 : 914 €/m² (1 036 €/m² en Île-de-France)." },
        { h: "Les taux (parts)", list: [
          "Part communale : 1 à 5 % (jusqu'à 20 % dans certains secteurs).",
          "Part départementale : ≤ 2,5 %.",
          "Part régionale (Île-de-France) : ≤ 1 %.",
        ]},
        { h: "Exonérations & abattements", list: [
          "Exonérés de droit : constructions ≤ 5 m², service public, logements HLM, locaux agricoles, reconstruction à l'identique (< 10 ans).",
          "Abattement de 50 % : logements aidés, les 100 premiers m² d'une résidence principale, locaux industriels/artisanaux, parkings couverts commerciaux.",
        ]},
      ],
      linked: ["macte8-permis", "macte8-recours"],
    },

    "macte8-recours": {
      mod: "macte8",
      title: "Affichage, recours & contrôle de l'achèvement",
      lede: "La vie de l'autorisation : afficher, contester, achever.",
      sections: [
        { h: "L'affichage", b: "L'autorisation doit être affichée sur le terrain, visible de la voie publique, pendant toute la durée du chantier. L'affichage fait COURIR le délai de recours des tiers (2 mois à compter du 1er jour d'affichage continu)." },
        { h: "Le recours des tiers", b: "Un tiers (souvent un voisin) justifiant d'un INTÉRÊT À AGIR peut former un recours gracieux auprès du maire dans les 2 mois, puis un recours contentieux devant le tribunal administratif. Il doit notifier son recours au bénéficiaire (LRAR) dans les 15 jours francs." },
        { h: "Sans affichage", b: "À défaut d'affichage régulier, l'autorisation reste contestable jusqu'à 6 mois après l'achèvement des travaux : l'affichage protège donc aussi le bénéficiaire." },
        { h: "La fin du chantier", b: "À l'achèvement, le bénéficiaire dépose une DAACT (Déclaration Attestant l'Achèvement et la Conformité des Travaux). L'administration dispose d'un délai (3 à 5 mois) pour contester la conformité." },
      ],
      linked: ["macte8-permis", "macte8-normes"],
    },

    "macte8-normes": {
      mod: "macte8",
      title: "Normes, ERP, accessibilité & sécurité incendie",
      lede: "Les règles techniques de qualité, de sécurité et d'usage.",
      sections: [
        { h: "Normes, labels, certifications, DTU", list: [
          "Norme (NF, ISO) : fixe des caractéristiques de produits ou de méthodes.",
          "Label : valorise une qualité supérieure (ex. performance énergétique).",
          "Certification : atteste la conformité par un organisme tiers.",
          "DTU (Documents Techniques Unifiés) et avis techniques : les « règles de l'art » à respecter.",
        ]},
        { h: "Le logement décent", b: "Logement assurant la sécurité et la santé : clos et couvert, équipements de chauffage/eau/électricité aux normes, ventilation, éclairement, surface minimale. L'indécence prive le locataire des allocations logement et ouvre un recours (mise en conformité, baisse de loyer, dommages et intérêts)." },
        { h: "Les ERP", b: "Les Établissements Recevant du Public sont classés en 5 CATÉGORIES selon l'effectif (1 : > 1 500 ; 2 : 701-1 500 ; 3 : 301-700 ; 4 : ≤ 300 ; 5 : sous les seuils) et par TYPE (lettre : M magasin, N restaurant, R enseignement, O hôtel, L salle de spectacle). La commission de sécurité (CCDSA) valide le classement." },
        { h: "L'accessibilité & l'incendie", b: "Obligation d'accessibilité aux personnes handicapées (cheminements, portes, sanitaires). Sécurité incendie : la loi du 9 mars 2010 rend obligatoire au moins un détecteur autonome avertisseur de fumée (DAAF) par logement — installation à la charge du propriétaire, entretien à l'occupant ; détecteurs interdits dans les parties communes." },
      ],
      linked: ["macte8-recours", "macte8-taxe"],
    },

  };

  window.DEEPDIVE = Object.assign(window.DEEPDIVE || {}, DD);
})();
