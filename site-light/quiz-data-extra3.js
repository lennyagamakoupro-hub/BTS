// ============================================
// LENNY — Quiz extras (vague 2) : modules Droit & Synthèse sectorielle
// Porte mdroit / mprop / mvert / murba / mville vers ~28-30 questions.
// Format : { q, c[], r, e }
// ============================================
(function () {
  if (!window.QUIZ) return;

  const extras3 = {

    /* ============ mdroit — Les Professions de l'Immobilier ============ */
    mdroit: [
      { q: "Le numéro officiel de la loi Hoguet est :", c: ["n° 70-9", "n° 65-557", "n° 89-462", "n° 2014-366"], r: 0, e: "Loi n° 70-9 du 2 janvier 1970, encadrant l'exercice des professions immobilières." },
      { q: "Le décret d'application de la loi Hoguet date de :", c: ["1970", "1972", "1989", "2014"], r: 1, e: "Décret n° 72-678 du 20 juillet 1972 : il précise les modalités d'application." },
      { q: "La carte professionnelle est délivrée par :", c: ["le préfet", "le président de la CCI", "le maire", "le notaire"], r: 1, e: "Depuis la loi ALUR, c'est le président de la CCI territorialement compétente qui délivre la carte." },
      { q: "Le montant minimum de la garantie financière est de :", c: ["30 000 €", "76 225 €", "110 000 €", "37 000 €"], r: 2, e: "Minimum 110 000 € (réduit à 30 000 € les 2 premières années ; non exigée si renonciation à manier des fonds)." },
      { q: "Le minimum légal de l'assurance RCP est de :", c: ["30 000 €", "76 225 €", "110 000 €", "120 000 €"], r: 1, e: "Responsabilité Civile Professionnelle : minimum 76 225 € par an, obligatoire." },
      { q: "L'article 1984 du Code civil définit :", c: ["la propriété", "le mandat", "la vente", "la copropriété"], r: 1, e: "Art. 1984 : « acte par lequel une personne donne à une autre le pouvoir de faire quelque chose pour le mandant et en son nom »." },
      { q: "L'article 1596 du Code civil interdit à l'agent de :", c: ["sous-louer", "acheter le bien qu'il doit vendre", "encaisser un acompte", "résilier un mandat"], r: 1, e: "Art. 1596 : interdiction d'acquérir, pour soi ou par personne interposée, le bien qu'on est chargé de vendre." },
      { q: "Les fonds reçus doivent être versés sur le compte séquestre dans un délai de :", c: ["24 h", "3 jours francs", "8 jours", "1 mois"], r: 1, e: "3 jours francs : l'agent ne peut pas conserver les fonds reçus." },
      { q: "La carte de négociateur (habilitation) est délivrée par :", c: ["l'agence elle-même", "la CCI, à la demande du titulaire", "le préfet", "le tribunal de commerce"], r: 1, e: "La CCI délivre l'attestation d'habilitation au négociateur, sur demande du titulaire de la carte pro." },
      { q: "Les registres et carnets de reçus se conservent :", c: ["3 ans", "5 ans", "10 ans", "30 ans"], r: 2, e: "10 ans (registre répertoire chronologique, pages numérotées/reliées ; forme électronique admise)." },
      { q: "La durée maximale du mandat de syndic est de :", c: ["1 an", "2 ans", "3 ans", "9 ans"], r: 2, e: "Le mandat de syndic est limité à 3 ans maximum." },
      { q: "Un mandat signé hors établissement ouvre un droit de rétractation de :", c: ["7 jours", "10 jours", "14 jours", "30 jours"], r: 2, e: "14 jours (art. L. 221-1 et s. du Code de la consommation), avec coupon détachable." },
      { q: "Le DIP a pour fondement :", c: ["la loi Hoguet seule", "le Code de la consommation (L. 111-1)", "le Code civil", "le RGPD seul"], r: 1, e: "Document d'Information Précontractuelle, fondé sur l'art. L. 111-1 du Code de la consommation (intègre aussi le RGPD)." },
      { q: "L'affichage des honoraires dans les annonces est régi par l'arrêté du :", c: ["2 janvier 1970", "10 janvier 2017", "24 mars 2014", "1er juillet 2021"], r: 1, e: "Arrêté du 10 janvier 2017 : honoraires TTC en % du prix hors honoraires, prix « honoraires inclus » plus visible." },
      { q: "Pour la vente d'un lot de copropriété, l'annonce doit mentionner :", c: ["le nom du syndic", "la quote-part annuelle moyenne de charges", "le DPE du voisin", "le prix au m² du quartier"], r: 1, e: "Statut de copropriété + nombre de lots + quote-part annuelle moyenne de charges (art. 14-1 loi 1965) + procédures éventuelles." },
      { q: "Le plafond d'honoraires de location en zone tendue est de :", c: ["8 €/m²", "10 €/m²", "12 €/m²", "15 €/m²"], r: 1, e: "Zone très tendue 12 €/m² · zone tendue 10 €/m² · autres communes 8 €/m² (surface habitable)." },
      { q: "Le plafond pour l'état des lieux est, partout, de :", c: ["1 €/m²", "3 €/m²", "5 €/m²", "8 €/m²"], r: 1, e: "3 €/m² de surface habitable, uniforme sur tout le territoire." },
      { q: "L'aptitude par l'expérience est réduite à 4 ans si l'emploi est :", c: ["à temps partiel", "de cadre", "en CDD", "en agence FNAIM"], r: 1, e: "10 ans d'emploi subordonné relevant de la loi Hoguet — réduit à 4 ans pour un emploi de CADRE." },
      { q: "Un mandat valable au départ mais qui cesse ses effets (décès du mandant) est dit :", c: ["nul", "caduque", "résolu", "tacite"], r: 1, e: "Caduque : il a existé mais perd ses effets. Nul = n'a jamais valablement existé." },
    ],

    /* ============ mprop — La Propriété Immobilière ============ */
    mprop: [
      { q: "Le caractère « inviolable et sacré » de la propriété figure à :", c: ["l'art. 544 du Code civil", "l'art. 17 de la DDHC", "l'art. 1984 du Code civil", "l'art. 1er de la loi Hoguet"], r: 1, e: "Article 17 de la DDHC (26 août 1789) ; l'art. 544 du Code civil en donne la définition juridique." },
      { q: "L'usus désigne le droit de :", c: ["percevoir les loyers", "utiliser le bien", "vendre le bien", "le détruire"], r: 1, e: "Usus = droit d'utiliser la chose (y habiter, s'en servir)." },
      { q: "Le fructus désigne le droit de :", c: ["utiliser le bien", "percevoir les fruits (louer)", "disposer du bien", "borner le terrain"], r: 1, e: "Fructus = droit de percevoir les fruits, notamment les loyers." },
      { q: "La pleine propriété réunit :", c: ["usus + fructus", "abusus seul", "les trois attributs", "usufruit seul"], r: 2, e: "Pleine propriété = usus + fructus + abusus réunis." },
      { q: "Le caractère « perpétuel » de la propriété signifie qu'elle :", c: ["dure 30 ans", "ne s'éteint pas par le non-usage", "se transmet tous les 99 ans", "expire au décès"], r: 1, e: "Perpétuel : le droit ne se perd pas par le simple non-usage (sauf usucapion par un tiers)." },
      { q: "Le caractère « absolu » de la propriété signifie qu'elle est :", c: ["réservée à une personne", "le droit le plus complet, opposable à tous", "limitée à 99 ans", "incessible"], r: 1, e: "Absolu : le droit le plus complet sur la chose, dans les limites des lois et règlements." },
      { q: "Acquérir un bien par une possession prolongée s'appelle :", c: ["l'expropriation", "l'usucapion (prescription acquisitive)", "le remembrement", "la mitoyenneté"], r: 1, e: "Usucapion (art. 2258 et s.) : c'est l'exception au caractère perpétuel de la propriété." },
      { q: "« La propriété du sol emporte la propriété du dessus et du dessous » : c'est l'article :", c: ["544", "546", "552", "555"], r: 2, e: "Article 552 du Code civil." },
      { q: "Le bornage a pour objet de :", c: ["clôturer un terrain", "délimiter deux fonds contigus", "vendre une parcelle", "exproprier"], r: 1, e: "Bornage (art. 646) = fixer la limite séparative entre deux propriétés voisines." },
      { q: "Le droit d'accession est posé par l'article :", c: ["544", "546", "711", "2258"], r: 1, e: "Article 546 : la propriété d'une chose donne droit sur ce qu'elle produit et sur ce qui s'y unit." },
      { q: "En cas de construction par un tiers DE BONNE FOI (art. 555), le propriétaire du sol :", c: ["exige la démolition", "conserve l'ouvrage en indemnisant le constructeur", "ne peut rien faire", "perd son terrain"], r: 1, e: "Bonne foi : le propriétaire garde la construction mais indemnise. Mauvaise foi : il peut exiger la démolition." },
      { q: "Les eaux pluviales appartiennent :", c: ["à la commune", "au propriétaire du fonds où elles tombent", "à l'État", "au voisin amont"], r: 1, e: "Res nullius : elles reviennent au propriétaire du fonds qui les reçoit (art. 640)." },
      { q: "Les modes d'acquisition de la propriété figurent aux articles :", c: ["544 et 546", "711 et 712", "1792 et 1984", "2258 et 2261"], r: 1, e: "Art. 711 et 712 : entre vifs, à cause de mort, ou par un fait juridique (accession, possession)." },
      { q: "Le transfert de propriété devient opposable aux tiers grâce à :", c: ["la signature du compromis", "la publicité foncière", "l'usucapion", "l'état des lieux"], r: 1, e: "L'opposabilité naît de la publicité foncière (Service de la publicité foncière)." },
      { q: "La mitoyenneté est une restriction au caractère :", c: ["absolu", "exclusif", "perpétuel", "réel"], r: 1, e: "La mitoyenneté (comme l'indivision, la copropriété) limite le caractère EXCLUSIF de la propriété." },
      { q: "L'expropriation pour cause d'utilité publique limite le caractère :", c: ["absolu", "exclusif", "perpétuel", "personnel"], r: 0, e: "L'expropriation (avec juste indemnité) restreint le caractère ABSOLU de la propriété." },
      { q: "L'usufruitier dispose de :", c: ["l'abusus seul", "l'usus et le fructus", "des trois attributs", "du seul droit de vendre"], r: 1, e: "Usufruit = usus + fructus : il occupe et perçoit les revenus, mais ne peut pas disposer (vendre)." },
      { q: "Dans les villes, l'obligation de se clore est posée par l'article :", c: ["647", "663", "682", "544"], r: 1, e: "Article 663 : obligation de clôture entre voisins dans les villes et faubourgs." },
      { q: "L'accession peut être :", c: ["judiciaire ou amiable", "naturelle ou artificielle", "directe ou indirecte", "simple ou exclusive"], r: 1, e: "Accession naturelle (alluvions…) ou artificielle (constructions, plantations)." },
      { q: "Le taux d'endettement maximum d'un crédit immobilier (HCSF) est de :", c: ["30 %", "33 %", "35 %", "40 %"], r: 2, e: "35 %, fixé par le Haut Conseil de Stabilité Financière, pour limiter le surendettement." },
      { q: "Vrai ou faux : le non-usage prolongé fait perdre, à lui seul, la propriété.", c: ["Vrai", "Faux", "Vrai après 10 ans", "Vrai après 30 ans"], r: 1, e: "FAUX : la propriété est perpétuelle. Seule l'usucapion par un possesseur tiers peut la faire perdre." },
      { q: "La nue-propriété correspond exactement à :", c: ["l'usus", "le fructus", "l'abusus", "l'usufruit"], r: 2, e: "Nue-propriété = abusus seul : le droit de disposer, sans usage ni revenus." },
    ],

    /* ============ mvert — Valeur Verte & Normes ============ */
    mvert: [
      { q: "Par rapport à la RT2012, la RE2020 ajoute :", c: ["rien", "le carbone et le confort d'été", "le prix au m²", "le bruit"], r: 1, e: "La RT2012 ne visait que la consommation d'énergie ; la RE2020 ajoute l'empreinte carbone et le confort d'été." },
      { q: "Les deux indicateurs clés de la RE2020 sont :", c: ["DPE et GES", "Bbio et DH", "Ic et CES", "ZAN et ZFE"], r: 1, e: "Bbio (sobriété énergétique) et DH (Degrés-Heures d'inconfort estival)." },
      { q: "Les exigences de la RE2020 se durcissent :", c: ["chaque année", "tous les 3 ans", "tous les 10 ans", "jamais"], r: 1, e: "Réglementation « incrémentale » : paliers tous les 3 ans (2025, 2028) pour forcer l'innovation." },
      { q: "Le palier RE2025 vise une baisse de l'Ic Construction de :", c: ["−5 %", "−15 %", "−25 %", "−50 %"], r: 1, e: "RE2025 : seuil carbone « mordant » à −15 %, rendant le 100 % béton difficile." },
      { q: "Le palier RE2028 vise une baisse de l'Ic Construction de :", c: ["−15 %", "−25 %", "−40 %", "−10 %"], r: 1, e: "RE2028 : −25 %, le bas carbone (bois, géosourcés) devient la norme." },
      { q: "Une ZFE est une zone :", c: ["franche d'enchères", "à faibles émissions (accès restreint aux véhicules polluants)", "fortement édifiée", "à fiscalité exonérée"], r: 1, e: "Zone à Faibles Émissions : restriction d'accès aux véhicules les plus polluants." },
      { q: "Le BEPOS désigne un bâtiment :", c: ["passif", "à énergie positive", "basse consommation", "haute qualité"], r: 1, e: "BEPOS = Bâtiment à Énergie POSitive : il produit plus d'énergie qu'il n'en consomme." },
      { q: "Le BEPAS impose un besoin de chauffage inférieur à :", c: ["15 kWh/m²/an", "50 kWh/m²/an", "80 kWh/m²/an", "100 kWh/m²/an"], r: 0, e: "Bâtiment Passif : chauffage < 15 kWh/m²/an, étanchéité à l'air très performante." },
      { q: "La démarche HQE comporte :", c: ["4 cibles", "10 cibles", "14 cibles", "20 cibles"], r: 2, e: "Haute Qualité Environnementale : démarche multi-critère à 14 cibles." },
      { q: "Le BBC Rénovation vise une consommation inférieure à :", c: ["50 kWh/m²/an", "80 kWh/m²/an", "120 kWh/m²/an", "150 kWh/m²/an"], r: 1, e: "BBC Rénovation : < 80 kWh/m²/an, cible pour sortir des classes DPE E/F/G." },
      { q: "Le coefficient de conversion en énergie primaire de l'électricité est :", c: ["1", "1,9", "2,3", "3"], r: 2, e: "2,3 : pour 1 kWh consommé, 2,3 kWh d'énergie primaire. Gaz, fioul, bois = 1." },
      { q: "Le coefficient de conversion du gaz, fioul et bois est :", c: ["1", "1,5", "2,3", "0,5"], r: 0, e: "1 pour le gaz, le fioul et le bois (contre 2,3 pour l'électricité)." },
      { q: "Le DPE classe les logements sur :", c: ["la seule surface", "l'énergie primaire ET les émissions de CO₂", "le seul prix", "le seul confort d'été"], r: 1, e: "Le DPE croise les kWh d'énergie primaire/m²/an et les kg de CO₂/m²/an." },
      { q: "Le ZAN signifie :", c: ["Zone d'Aménagement Neuf", "Zéro Artificialisation Nette", "Zone à Aménager", "Zéro Amiante National"], r: 1, e: "Zéro Artificialisation Nette : ne plus consommer de terres naturelles/agricoles sans compensation." },
      { q: "Le ZAN favorise notamment :", c: ["l'étalement urbain", "les friches, la surélévation, la transformation de bureaux", "les lotissements neufs", "le mitage"], r: 1, e: "Il pousse à recycler le foncier déjà urbanisé : friches, surélévation, reconversion de bureaux." },
      { q: "La « valeur verte » désigne :", c: ["la couleur de la façade", "la valeur patrimoniale supérieure d'un bien performant", "une taxe écologique", "un label de jardin"], r: 1, e: "Plus-value d'un bien performant (DPE, RE2020) : viser un label en avance protège l'actif." },
      { q: "Le DH (Degrés-Heures) mesure :", c: ["la consommation d'eau", "l'inconfort estival", "le bruit", "le carbone"], r: 1, e: "DH = cumul des heures où la température dépasse le seuil de confort : il pénalise les logements surchauffés l'été." },
      { q: "La RT2012 ne portait que sur :", c: ["le carbone", "la consommation d'énergie", "le confort d'été", "l'eau"], r: 1, e: "La RT2012 visait la performance énergétique ; la RE2020 élargit au carbone et au confort d'été." },
      { q: "Le surcoût de construction lié aux paliers RE2020 est estimé entre :", c: ["0 %", "1 et 2 %", "5 et 10 %", "30 et 40 %"], r: 2, e: "Environ 5 à 10 % de surcoût, compensé à terme par la valeur verte et les économies d'énergie." },
      { q: "Désimperméabiliser et planter relève de la mesure de :", c: ["végétalisation / adaptation", "spéculation foncière", "densification", "fiscalité locale"], r: 0, e: "La végétalisation (sols perméables, canopée urbaine) est une mesure d'adaptation au changement climatique." },
    ],

    /* ============ murba — Urbanisme & Construction ============ */
    murba: [
      { q: "La garantie décennale est posée par l'article :", c: ["544", "1596", "1792", "1984"], r: 2, e: "Article 1792 du Code civil : responsabilité de plein droit, 10 ans, pour les dommages compromettant la solidité." },
      { q: "Le document « pivot et intégrateur » de l'urbanisme est :", c: ["le PLU", "le SCoT", "la carte communale", "le SRADDET"], r: 1, e: "Le SCoT (Schéma de Cohérence Territoriale) fixe les orientations à l'échelle intercommunale." },
      { q: "Le rapport d'opposabilité le plus exigeant est :", c: ["la prise en compte", "la compatibilité", "la conformité", "la cohérence"], r: 2, e: "Conformité (appliquer à la lettre) > compatibilité (respecter l'esprit) > prise en compte (latitude justifiée)." },
      { q: "Les autorisations d'urbanisme sont instruites par :", c: ["le préfet", "le maire", "le notaire", "la CCI"], r: 1, e: "Le maire instruit et délivre les autorisations : c'est un filtre préventif contre les constructions illégales." },
      { q: "Le recours à un architecte est obligatoire au-delà de :", c: ["100 m² de SdP", "120 m² de SdP", "150 m² de SdP", "200 m² de SdP"], r: 2, e: "Au-delà de 150 m² de surface de plancher totale, l'architecte est obligatoire." },
      { q: "Le délai d'instruction d'une déclaration préalable est de :", c: ["1 mois", "2 mois", "3 mois", "6 mois"], r: 0, e: "DP : 1 mois (accord tacite). PCMI : 2 mois. Autres permis / PA : 3 mois. +1 mois en secteur protégé." },
      { q: "Le recours contentieux pour excès de pouvoir doit être formé dans :", c: ["15 jours", "1 mois", "2 mois", "1 an"], r: 2, e: "2 mois à compter de la notification/publication, devant le tribunal administratif." },
      { q: "La taxe d'aménagement est due dès une surface de plancher de :", c: ["5 m²", "20 m²", "40 m²", "100 m²"], r: 0, e: "Dès plus de 5 m² créés : surface × valeur forfaitaire × taux communal/départemental." },
      { q: "L'accessibilité aux personnes handicapées a été renforcée par la loi du :", c: ["2 janvier 1970", "11 février 2005", "24 mars 2014", "17 juillet 2018"], r: 1, e: "Loi du 11 février 2005 : cheminements, rampes, sanitaires adaptés, ascenseurs." },
      { q: "Une piscine relève d'une déclaration préalable si le bassin (non couvert) est :", c: ["≤ 50 m²", "≤ 100 m²", "≤ 150 m²", "> 100 m²"], r: 1, e: "DP si bassin ≤ 100 m² non couvert ; permis de construire si > 100 m² ou abri > 1,80 m." },
      { q: "L'emprise au sol correspond à :", c: ["la surface habitable", "la projection verticale (toiture vue du ciel)", "la surface du terrain", "les terrasses uniquement"], r: 1, e: "Emprise au sol (art. R. 420-1) = projection verticale du volume, débords compris." },
      { q: "La loi Climat et Résilience fixe l'objectif ZAN à l'horizon :", c: ["2030", "2040", "2050", "2025"], r: 2, e: "Loi du 22 août 2021 : zéro artificialisation nette des sols à l'horizon 2050." },
      { q: "La réforme de la hiérarchie des normes s'applique depuis le :", c: ["1er janvier 2021", "1er avril 2021", "17 juin 2020", "23 novembre 2018"], r: 1, e: "Depuis le 1er avril 2021 (ordonnance 2020-745), PLU et cartes communales ne sont plus opposables qu'au SCoT." },
      { q: "Le juge des contentieux de la protection traite les litiges de construction jusqu'à :", c: ["3 000 €", "5 000 €", "10 000 €", "50 000 €"], r: 2, e: "Jusqu'à 10 000 € : procédure simplifiée, sans avocat obligatoire." },
      { q: "La surface de plancher se calcule au nu intérieur, sous une hauteur supérieure à :", c: ["1,50 m", "1,80 m", "2,20 m", "2,50 m"], r: 1, e: "SdP (art. R. 111-22) : surfaces closes/couvertes sous hauteur > 1,80 m, déduction des murs, gaines, trémies, escaliers." },
      { q: "La garantie biennale (bon fonctionnement) couvre les équipements pendant :", c: ["1 an", "2 ans", "5 ans", "10 ans"], r: 1, e: "Biennale : 2 ans, pour les équipements dissociables. Parfait achèvement : 1 an. Décennale : 10 ans." },
      { q: "Le CUb (certificat d'urbanisme opérationnel) a un délai d'instruction de :", c: ["1 mois", "2 mois", "3 mois", "6 mois"], r: 1, e: "CUa (information) : 1 mois. CUb (opérationnel, vérifie la faisabilité) : 2 mois." },
      { q: "La responsabilité « in solidum » permet à la victime de :", c: ["choisir le tribunal", "réclamer tout à n'importe quel constructeur", "doubler l'indemnité", "éviter l'expertise"], r: 1, e: "In solidum : la victime peut exiger l'intégralité de la réparation à l'un quelconque des responsables." },
      { q: "Le permis qui modifie le paysage (lotissement, terrain de camping) est le :", c: ["permis de construire", "permis d'aménager", "permis de démolir", "certificat d'urbanisme"], r: 1, e: "Le permis d'aménager concerne les opérations qui modifient l'aménagement du sol/paysage." },
      { q: "Le décret du 17 juillet 2018 a notamment introduit :", c: ["la taxe ZAN", "la cristallisation des moyens et les dommages-intérêts pour recours abusif", "le permis tacite", "la carte communale"], r: 1, e: "Il sécurise les autorisations : cristallisation des moyens (2 mois), annulation partielle, recours abusif (L. 600-7)." },
    ],

    /* ============ mville — Écoquartier & Ville Durable ============ */
    mville: [
      { q: "Un écoquartier est un projet d'aménagement qui intègre :", c: ["le seul rendement locatif", "les objectifs du développement durable", "uniquement la loi Hoguet", "le seul SCoT"], r: 1, e: "Il intègre les objectifs du développement durable, adapté aux caractéristiques du territoire." },
      { q: "Au croisement des trois cercles du développement durable, on obtient :", c: ["le vivable", "le viable", "l'équitable", "le durable (sustainable)"], r: 3, e: "Environnement + Social + Économique → durable. Deux à deux : vivable, viable, équitable." },
      { q: "Environnemental + Social donne :", c: ["viable", "vivable", "équitable", "durable"], r: 1, e: "Environnement + Social = VIVABLE ; Environnement + Économique = viable ; Social + Économique = équitable." },
      { q: "Le label français compte :", c: ["10 engagements", "14 cibles", "20 engagements", "5 piliers"], r: 2, e: "Le label ÉcoQuartier repose sur 20 engagements." },
      { q: "Parmi ces exemples, un écoquartier reconnu est :", c: ["La Défense", "La Confluence à Lyon", "Les Halles", "Euralille"], r: 1, e: "La Confluence (Lyon) et la ZAC de Bonne (Grenoble) sont des écoquartiers de référence." },
      { q: "La mobilité d'un écoquartier privilégie :", c: ["la voiture individuelle", "les transports doux (marche, vélo, TC)", "l'autoroute urbaine", "le stationnement central"], r: 1, e: "Priorité aux mobilités douces et limitation de la voiture (parkings en périphérie)." },
      { q: "Le 4ᵉ pilier du DD appliqué à l'urbain (avec environnement/social/économique) est :", c: ["la fiscalité", "la gouvernance / participation", "la sécurité", "le tourisme"], r: 1, e: "Environnement · Social · Économique · Gouvernance / participation citoyenne." },
      { q: "La gestion de l'eau dans un écoquartier passe notamment par :", c: ["la récupération des eaux de pluie", "le bétonnage des sols", "l'arrosage permanent", "la suppression des espaces verts"], r: 0, e: "Récupération des eaux pluviales, sols perméables, gestion économe de la ressource." },
      { q: "La « mixité fonctionnelle » d'un écoquartier signifie :", c: ["mélanger les âges", "réunir logements, commerces et services", "varier les hauteurs", "alterner les matériaux"], r: 1, e: "Mixité fonctionnelle = logements + commerces + services dans le même quartier (mixité sociale en complément)." },
      { q: "La ZAC de Bonne se situe à :", c: ["Lyon", "Grenoble", "Lille", "Nantes"], r: 1, e: "La ZAC de Bonne est à Grenoble ; La Confluence à Lyon." },
      { q: "La biodiversité urbaine est favorisée par :", c: ["les toits végétalisés et jardins partagés", "le tout-béton", "la suppression des arbres", "l'éclairage permanent"], r: 0, e: "Toitures végétalisées, parcs, jardins partagés et corridors écologiques préservent la biodiversité." },
      { q: "La participation citoyenne dans un écoquartier relève du pilier :", c: ["environnemental", "économique", "gouvernance", "fiscal"], r: 2, e: "La co-construction du projet avec les habitants relève de la gouvernance." },
      { q: "La sobriété énergétique d'un écoquartier s'appuie d'abord sur :", c: ["l'isolation et la conception bioclimatique", "la climatisation généralisée", "le chauffage électrique", "l'agrandissement des vitrages au nord"], r: 0, e: "Sobriété et efficacité : isolation performante, orientation bioclimatique, puis énergies renouvelables." },
      { q: "Vrai ou faux : un écoquartier limite volontairement la place de la voiture.", c: ["Vrai", "Faux", "Seulement en centre-ville", "Seulement la nuit"], r: 0, e: "VRAI : parkings reportés en périphérie, voies apaisées, priorité aux piétons et cycles." },
    ],

  };

  for (const k of Object.keys(extras3)) {
    if (!window.QUIZ[k]) {
      window.QUIZ[k] = (window.STUDY && window.STUDY[k] && Array.isArray(window.STUDY[k].quiz))
        ? [...window.STUDY[k].quiz] : [];
    }
    window.QUIZ[k] = [...window.QUIZ[k], ...extras3[k]];
  }
  if (window.STUDY) {
    for (const k of Object.keys(window.QUIZ)) {
      if (window.STUDY[k]) window.STUDY[k].quiz = window.QUIZ[k];
    }
  }
})();
