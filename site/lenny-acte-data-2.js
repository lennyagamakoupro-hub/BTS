/* ============================================
   LENNY — Généralités à l'acte de construire (2/2)
   Parties V à VIII du cours « Généralités à l'acte de construire ».
     • macte5 — Les plans
     • macte6 — Les différentes surfaces
     • macte7 — Les contraintes à l'acte de construire
     • macte8 — L'acte de construire : autorisations & normes
   Alimente : ESSENTIALS, STUDY (fiches + quiz court), QUIZ (détaillé), MEMOS.
   Fusionne sans écraser l'existant.
   ============================================ */

// ---------- ESSENTIEL (à-retenir + frise) ----------
window.ESSENTIALS = Object.assign(window.ESSENTIALS || {}, {
  macte5: {
    retenir: [
      { k: "Esquisse (ESQ)", v: "Premières solutions d'ensemble : faisabilité, compatibilité avec l'enveloppe financière et les contraintes du site." },
      { k: "Avant-projet (AVP)", v: "APS (avant-projet sommaire) : composition générale, volumes, estimation provisoire. APD (avant-projet définitif) : surfaces détaillées, dimensions arrêtées, estimation définitive. C'est au stade AVP qu'on dépose le permis." },
      { k: "Projet (PRO) & Exécution (EXE)", v: "PRO : formes, matériaux, implantation des équipements, tracés des fluides, coût par corps d'état. EXE : plans d'exécution pour le chantier, devis quantitatif détaillé, calendrier." },
      { k: "Plan de masse", v: "Vue de dessus du terrain et de la construction (échelle 1/50 à 1/500) : orientation, limites cotées, relief, emprise au sol, distances aux limites, réseaux." },
      { k: "Plan de situation", v: "Situe le terrain dans son environnement (échelle 1/5000 à 1/25000) : orientation, voies, points de repère. Souvent la reproduction du plan cadastral." },
      { k: "Plan cadastral", v: "Document administratif recensant les propriétés foncières d'une commune (impôts locaux). Vocation FISCALE, non juridique : ce n'est pas un titre de propriété (www.cadastre.gouv.fr)." },
      { k: "Plans d'architecte, coupe, façade", v: "Plan d'architecte : coupe horizontale à 1 m, niveaux RDC / R+1 / R-1. Coupe : verticale (fondations au faîtage). Façade (élévation) : vue extérieure, 4 façades pour une habitation." },
    ],
    timeline: [
      { y: "ESQ", t: "Esquisse — faisabilité" },
      { y: "APS → APD", t: "Avant-projet — dépôt du permis de construire" },
      { y: "PRO → EXE", t: "Projet puis études d'exécution — chantier" },
    ],
  },
  macte6: {
    retenir: [
      { k: "Surface de plancher", v: "Référence des autorisations d'urbanisme depuis le 1er mars 2012 (remplace SHON/SHOB). Somme des surfaces closes et couvertes, sous plafond > 1,80 m, calculée au nu intérieur des façades (art. L.111-14 C. urb.)." },
      { k: "Déductions surface plancher", v: "On déduit : embrasures, vides et trémies, surfaces ≤ 1,80 m, stationnement, combles non aménageables, locaux techniques, caves/celliers desservis par partie commune, + 10 % (logements desservis par parties communes intérieures)." },
      { k: "Habitable vs utile", v: "« Habitable » pour les logements, « utile » pour les bureaux. Surface de plancher construite après déduction des murs, cloisons, escaliers, gaines… On exclut combles non aménagés, caves, balcons, terrasses, hauteurs < 1,80 m (art. R.111-2 CCH)." },
      { k: "Surface RT (Srt)", v: "Surface de référence thermique : surface « hors tout » des parois horizontales dont on déduit les surfaces non closes, non aménageables et non aménagées pour l'habitation." },
      { k: "Emprise au sol", v: "Projection verticale du volume de la construction sur le terrain (vue du dessus). Comprend l'épaisseur des murs extérieurs, débords, surplombs. Hors débords de toiture/marquises non soutenus par des poteaux." },
      { k: "Emprise — à inclure", v: "Bâtiments, balcons, terrasses surélevées, pergolas, garages fermés, piscines, escaliers extérieurs, dépendances/annexes." },
      { k: "Emprise — à exclure", v: "Cours, jardins, espaces de stationnement, clôtures, portails, terrasses de plain-pied, débords de toiture et marquises non soutenus." },
    ],
    timeline: [
      { y: "1er mars 2012", t: "La surface de plancher remplace SHON et SHOB" },
      { y: "28 déc. 2015", t: "Décret précisant les déductions de surface de plancher" },
      { y: "1,80 m", t: "Hauteur sous plafond seuil pour le décompte des surfaces" },
    ],
  },
  macte7: {
    retenir: [
      { k: "Les codes usuels", v: "Code civil (cadre général), Code pénal (responsabilité), Code des assurances (DO), Code de l'urbanisme, Code de la construction et de l'habitation (CCH), Code du travail et de l'hygiène." },
      { k: "Code de l'urbanisme", v: "Organise l'occupation des sols. Le territoire français est le « patrimoine commun de la nation » (art. L.101-1). Livre 1 : règles d'aménagement ; Livre 4 : règles relatives à l'acte de construire." },
      { k: "RNU / carte communale / PLU", v: "RNU : s'applique à défaut de document local (constructibilité limitée). Carte communale : délimite les secteurs constructibles. PLU/PLUi : projet global, règlement par zones (U, AU, A, N), 16 articles. SCoT : cohérence à l'échelle d'un bassin de vie. PLH : politique de l'habitat." },
      { k: "Les grandes lois", v: "ALUR (24 mars 2014) : transfert PLU aux interco, encadrement des loyers, fonds travaux. ELAN (23 nov. 2018) : construire plus/mieux/moins cher, bail mobilité, vente HLM. Climat & Résilience (22 août 2021) : passoires thermiques, ZAN. Habitat dégradé (9 avril 2024)." },
      { k: "Contraintes architecturales", v: "Géographie/climat/géologie, Monuments Historiques (loi 31 déc. 1931, imprescriptibles), monuments naturels et sites, secteurs sauvegardés (loi Malraux 1962, avis conforme de l'ABF)." },
      { k: "Les servitudes", v: "Charge imposée sur un fonds (servant) pour l'utilité d'un autre (dominant). Caractères : immobilière, indissociable, perpétuelle, indivisible. Naturelle / légale / conventionnelle ; continue/discontinue ; apparente/non apparente." },
      { k: "Aménagement du territoire", v: "National : DATAR (1963), FEDER (Europe). Décentralisation (1982) puis loi NOTRe (2015, SRADDET régional). Pyramide descendante : État → région → département → commune (PLU)." },
    ],
    timeline: [
      { y: "1931", t: "Loi du 31 déc. — protection des Monuments Historiques" },
      { y: "1962", t: "Loi Malraux — secteurs sauvegardés" },
      { y: "2000", t: "Loi SRU (13 déc.) — le PLU succède au POS, création du SCoT" },
      { y: "2014", t: "Loi ALUR — transfert du PLU aux intercommunalités" },
      { y: "2018", t: "Loi ELAN — logement, aménagement et numérique" },
      { y: "2021", t: "Loi Climat & Résilience — passoires thermiques, ZAN" },
      { y: "2024", t: "Loi Habitat dégradé (9 avril)" },
    ],
  },
  macte8: {
    retenir: [
      { k: "Certificat d'urbanisme (CU)", v: "Facultatif mais recommandé. CU d'information (règles, servitudes, taxes — délai 1 mois) ou CU opérationnel (faisabilité du projet, équipements — délai 2 mois). Validité 18 mois (prolongeable)." },
      { k: "Déclaration préalable (DP)", v: "Pour les petits travaux : entre 5 et 20 m² (40 m² en zone U avec PLU), changement de destination sans modif. de structure/façade, modification d'aspect extérieur. Instruction 1 mois. Validité 3 ans." },
      { k: "Permis de construire (PC)", v: "Travaux importants : > 20 m² (> 40 m² en zone U, ou portant le total > 150 m² → architecte). Instruction : 2 mois (maison individuelle) ou 3 mois. Validité 3 ans (prorogeable)." },
      { k: "Démolir / aménager / modificatif", v: "Permis de démolir (zones protégées, instruction 2 mois). Permis d'aménager (lotissement, camping… instruction 3 mois). Permis modificatif (modifications mineures avant l'achèvement)." },
      { k: "Taxe d'aménagement", v: "Sur PC, permis d'aménager et DP. Part communale (1-5 %, jusqu'à 20 %), départementale (≤ 2,5 %), régionale IDF (≤ 1 %). Valeur 2024 : 914 €/m² (1 036 € en IDF). Exonérations (≤ 5 m², HLM…) et abattement 50 %." },
      { k: "Recours & affichage", v: "Un tiers (voisin) justifiant d'un intérêt à agir : recours gracieux au maire (2 mois) puis recours contentieux au tribunal administratif (2 mois). L'affichage sur le terrain fait courir le délai de recours." },
      { k: "Normes, accessibilité, ERP, incendie", v: "Normes/labels/DTU (règles de l'art). Accessibilité handicapés. Logement décent. ERP : 5 catégories (effectif) et types (lettre), commission de sécurité. Sécurité incendie : détecteur de fumée obligatoire (loi du 9 mars 2010)." },
    ],
    timeline: [
      { y: "CU", t: "Certificat d'urbanisme — validité 18 mois" },
      { y: "DP", t: "Déclaration préalable — instruction 1 mois, validité 3 ans" },
      { y: "PC", t: "Permis de construire — instruction 2 à 3 mois" },
      { y: "9 mars 2010", t: "Loi rendant obligatoire le détecteur de fumée (DAAF)" },
    ],
  },
});

// ---------- FICHES (flashcards) + quiz court ----------
window.STUDY = Object.assign(window.STUDY || {}, {
  macte5: {
    cards: [
      { q: "À quoi sert l'étude d'esquisse (ESQ) ?", a: "À proposer une ou plusieurs solutions d'ensemble traduisant les éléments majeurs du programme, à indiquer les délais et à vérifier la compatibilité avec l'enveloppe financière, ainsi que la faisabilité au regard des contraintes du programme et du site." },
      { q: "APS et APD : quelle différence ?", a: "L'APS (avant-projet sommaire) précise la composition générale, apprécie les volumes et l'aspect, propose les dispositions techniques et donne une estimation PROVISOIRE. L'APD (avant-projet définitif) détaille les surfaces, arrête les dimensions (plans/coupes/façades), définit les matériaux et donne l'estimation DÉFINITIVE par lots." },
      { q: "Quand dépose-t-on le permis de construire ?", a: "Au stade de l'avant-projet (AVP) : les études d'avant-projet comprennent l'établissement des dossiers à déposer pour le permis de construire et les autres autorisations, plus l'assistance au MOA pendant l'instruction." },
      { q: "Études de projet (PRO) et d'exécution (EXE) ?", a: "Le PRO précise formes, matériaux, implantation des équipements, tracés des fluides et coût par corps d'état. L'EXE établit tous les plans d'exécution à l'usage du chantier, le devis quantitatif détaillé par lot et le calendrier prévisionnel." },
      { q: "Qu'est-ce que le plan de masse ?", a: "Une vue de dessus (échelle 1/50 à 1/500) du terrain et de la construction : orientation géographique, limites cotées et bornes, relief (courbes de niveau), plantations, emprise au sol avec distances aux limites, clôtures, voies et réseaux." },
      { q: "Le plan de situation, c'est quoi ?", a: "Une vue de dessus situant le terrain dans son environnement (échelle 1/5000 à 1/25000) : orientation, voies de desserte et leur nom, points de repère (église, école). C'est souvent la reproduction du plan cadastral disponible en mairie." },
      { q: "Le plan cadastral est-il un titre de propriété ?", a: "NON. Le cadastre est un document administratif qui recense les propriétés foncières d'une commune pour calculer les impôts locaux (taxe foncière). Sa vocation est FISCALE et non juridique : il ne constitue pas un titre de propriété. Accessible sur www.cadastre.gouv.fr." },
      { q: "Comment est fait un plan d'architecte ?", a: "C'est l'habitation coupée horizontalement à 1 m du sol ; un plan par étage. Niveau de référence = RDC, niveaux supérieurs R+1, R+2…, inférieurs R-1… On y porte les cotes (extérieures, percements, intérieures, hauteurs sous plafond HSP). Escaliers représentés coupés, flèche vers la montée." },
      { q: "Que montre un plan de coupe ?", a: "Une coupe VERTICALE de l'ensemble de la construction, des fondations au faîtage. Elle porte les hauteurs et niveaux et sert de base aux détails techniques (jonctions toiture/murs, liaisons murs/planchers, position des fenêtres). Coupe droite (de part en part) ou brisée." },
      { q: "Que représente un plan de façade (élévation) ?", a: "Une vue extérieure de la construction. Pour une habitation, on représente les 4 façades (nommées par orientation ou par rapport à la façade principale). On y voit terrasses, balcons, charpente apparente, souches de cheminée, lucarnes, menuiseries, volets, garde-corps." },
      { q: "Quelques abréviations de plans à connaître ?", a: "EP : eau pluviale · EU : eaux usées · EV : eaux vannes (WC) · VH/VB : ventilation haute/basse · CF : conduit de fumée · BA : béton armé · VR : volet roulant · HSP : hauteur sous plafond · RDC/R+/R- : niveaux." },
    ],
    quiz: [
      { q: "C'est au stade de l'avant-projet (AVP) qu'on dépose :", c: ["le DPE", "le permis de construire", "le bail", "la taxe foncière"], r: 1 },
      { q: "Le plan cadastral a une vocation :", c: ["juridique (titre de propriété)", "fiscale", "commerciale", "architecturale"], r: 1 },
      { q: "Le plan de coupe est une coupe :", c: ["horizontale à 1 m", "verticale des fondations au faîtage", "du terrain", "du quartier"], r: 1 },
    ],
  },
  macte6: {
    cards: [
      { q: "Qu'est-ce que la surface de plancher ?", a: "Depuis le 1er mars 2012, la référence des autorisations d'urbanisme (elle remplace la SHON et la SHOB). C'est la somme des surfaces de plancher closes et couvertes, sous une hauteur de plafond > 1,80 m, calculée à partir du NU INTÉRIEUR des façades (art. L.111-14 du Code de l'urbanisme)." },
      { q: "Que déduit-on de la surface de plancher ?", a: "Les embrasures de portes/fenêtres, les vides et trémies (escaliers, ascenseurs), les surfaces ≤ 1,80 m, le stationnement, les combles non aménageables, les locaux techniques, les caves/celliers desservis uniquement par une partie commune, et 10 % des surfaces d'habitation desservies par des parties communes intérieures." },
      { q: "Surface habitable ou surface utile ?", a: "On dit « habitable » pour les logements et « utile » pour les bureaux. La surface habitable est la surface de plancher construite après déduction des murs, cloisons, marches et cages d'escaliers, gaines, embrasures (art. R.111-2 CCH). On exclut combles non aménagés, caves, balcons, terrasses, et les hauteurs < 1,80 m." },
      { q: "Qu'est-ce que la surface RT (Srt) ?", a: "La surface de référence thermique : la surface construite totale « hors tout » des parois horizontales, de laquelle on déduit les surfaces non closes ou à l'air libre, les surfaces non aménageables (h < 1,80 m, combles perdus, locaux techniques) et les surfaces non aménagées pour l'habitation (vérandas non chauffées, garages…)." },
      { q: "Qu'est-ce que l'emprise au sol ?", a: "La projection verticale du volume de la construction sur le terrain — l'équivalent de la surface au sol vue d'en haut. Elle comprend l'épaisseur des murs extérieurs, les débords et surplombs, mais PAS les débords de toiture et marquises non soutenus par des poteaux." },
      { q: "Qu'inclut-on dans l'emprise au sol ?", a: "Les bâtiments principaux, les balcons, les terrasses SURÉLEVÉES, les pergolas (installation permanente), les garages fermés, les piscines (sauf cas du PLU), les escaliers extérieurs et toute autre construction (dépendances, annexes)." },
      { q: "Qu'exclut-on de l'emprise au sol ?", a: "Les cours, les jardins, les espaces de stationnement, les clôtures, les portails, les débords de toiture et marquises non soutenus par des poteaux, et les terrasses de plain-pied (qui ne créent pas d'emprise)." },
      { q: "Pourquoi ces surfaces sont-elles importantes ?", a: "Surface de plancher et emprise au sol déterminent le type d'autorisation à demander (DP ou permis de construire) et le seuil de recours obligatoire à un architecte (150 m²). La surface habitable sert de référence dans les dossiers de transaction, de location et d'aides." },
    ],
    quiz: [
      { q: "La surface de plancher se calcule à partir :", c: ["du nu extérieur des façades", "du nu intérieur des façades", "de l'axe des murs", "du terrain"], r: 1 },
      { q: "On parle de surface « utile » pour :", c: ["les logements", "les bureaux", "les garages", "les terrains"], r: 1 },
      { q: "Une terrasse de plain-pied :", c: ["crée de l'emprise au sol", "ne crée pas d'emprise au sol", "est de la surface habitable", "est taxable"], r: 1 },
    ],
  },
  macte7: {
    cards: [
      { q: "Quels sont les principaux codes encadrant la construction ?", a: "Le Code civil (cadre général), le Code pénal (responsabilité pénale), le Code des assurances (DO obligatoire), le Code de l'urbanisme, le Code de la construction et de l'habitation (CCH) et le Code du travail et de l'hygiène. S'y ajoutent les normes et DTU." },
      { q: "Que fait le Code de l'urbanisme ?", a: "Il organise l'occupation des sols. L'art. L.101-1 énonce que « le territoire français est le patrimoine commun de la nation ». Il comporte 6 livres : surtout le Livre 1 (règles générales d'aménagement) et le Livre 4 (règles relatives à l'acte de construire). Créé le 26 juillet 1954." },
      { q: "RNU, carte communale, PLU : quelle hiérarchie ?", a: "Le RNU (Règlement National d'Urbanisme) s'applique à défaut de document local (constructibilité limitée). La carte communale délimite simplement les secteurs constructibles. Le PLU (ou PLUi intercommunal) établit un projet global et un règlement par zones — c'est le document le plus complet." },
      { q: "Que contient un PLU ?", a: "Un rapport de présentation, un PADD (projet d'aménagement et de développement durables), des OAP (orientations d'aménagement et de programmation), un règlement délimitant les zones U (urbaines), AU (à urbaniser), A (agricoles), N (naturelles), et des annexes (servitudes). Le règlement compte 16 articles." },
      { q: "SCoT et PLH, c'est quoi ?", a: "Le SCoT (Schéma de Cohérence Territoriale) planifie à l'échelle d'un large bassin de vie et assure la cohérence des PLU, PLH, PDU (loi SRU 2000). Le PLH (Programme Local de l'Habitat) est le document stratégique de la politique locale de l'habitat (parc public et privé, mixité sociale)." },
      { q: "Que retenir de la loi ALUR (2014) ?", a: "Loi du 24 mars 2014 (Accès au Logement et Urbanisme Rénové) : transfert automatique du PLU aux intercommunalités, renforcement du SCoT, encadrement des loyers en zones tendues, fonds de travaux obligatoire en copropriété, immatriculation des copropriétés, caducité des POS au 1er janvier 2016." },
      { q: "Que retenir de la loi ELAN (2018) ?", a: "Loi du 23 novembre 2018 (Évolution du Logement, de l'Aménagement et du Numérique) : construire plus/mieux/moins cher, opérations de revitalisation de territoire (ORT), transformation de bureaux en logements, bail mobilité (1 à 10 mois), regroupement et vente HLM, encadrement des locations touristiques." },
      { q: "Que retenir de la loi Climat & Résilience (2021) ?", a: "Loi du 22 août 2021 : gel des loyers puis interdiction de louer les passoires thermiques (G en 2025, F en 2028, E en 2034), audit énergétique, division par 2 de l'artificialisation des sols d'ici 2030 et ZAN (zéro artificialisation nette) en 2050, soutien aux énergies renouvelables." },
      { q: "Monuments Historiques et secteurs sauvegardés ?", a: "Loi du 31 décembre 1931 : les immeubles d'intérêt historique sont classés (imprescriptibles, expropriables), ou inscrits à l'inventaire supplémentaire. Loi Malraux du 4 août 1962 : secteurs sauvegardés ; l'Architecte des Bâtiments de France y émet un avis CONFORME sur les travaux." },
      { q: "Qu'est-ce qu'une servitude ?", a: "Une charge imposée sur un fonds (le fonds SERVANT) pour l'utilité et l'usage d'un autre fonds appartenant à un autre propriétaire (le fonds DOMINANT). Elle est immobilière, indissociable du fonds, perpétuelle et indivisible. Suppose 2 fonds contigus appartenant à des propriétaires différents." },
      { q: "Comment classe-t-on les servitudes ?", a: "Par mode d'établissement : naturelle (écoulement des eaux, bornage), légale (mitoyenneté, voisinage), conventionnelle, de cour commune. Par finalité : intérêt privé / utilité publique. Par exercice : continue/discontinue, apparente/non apparente, positive/négative." },
      { q: "Qui aménage le territoire en France ?", a: "Une pyramide descendante. National : DATAR (1963), FEDER (Europe). La décentralisation de 1982 a donné des pouvoirs aux collectivités. La loi NOTRe (7 août 2015) a confié de nouvelles compétences aux régions (SRADDET). Puis département et commune (PLU, schéma directeur)." },
    ],
    quiz: [
      { q: "À défaut de document d'urbanisme local s'applique :", c: ["le PLU", "le RNU (Règlement National d'Urbanisme)", "le SCoT", "la carte communale"], r: 1 },
      { q: "La loi ALUR date de :", c: ["2010", "2014", "2018", "2021"], r: 1 },
      { q: "Les secteurs sauvegardés ont été créés par la loi :", c: ["SRU (2000)", "Malraux (1962)", "ALUR (2014)", "Spinetta (1978)"], r: 1 },
      { q: "Le fonds qui supporte la servitude est :", c: ["le fonds dominant", "le fonds servant", "le fonds commun", "le fonds public"], r: 1 },
    ],
  },
  macte8: {
    cards: [
      { q: "À quoi sert le certificat d'urbanisme (CU) ?", a: "Il indique les règles d'urbanisme applicables à un terrain. Non obligatoire mais recommandé. Le CU d'information donne les règles, servitudes et taxes (délai 1 mois) ; le CU opérationnel indique en plus si le terrain peut accueillir le projet et l'état des équipements (délai 2 mois). Validité 18 mois (prolongeable 1 an)." },
      { q: "Quand faut-il une déclaration préalable (DP) ?", a: "Pour les petits travaux : création entre 5 et 20 m² de surface de plancher ou d'emprise (porté à 40 m² en zone U avec PLU), changement de destination sans modifier les structures/façades, modification de l'aspect extérieur. Instruction 1 mois. Validité 3 ans (prorogeable 2 fois 1 an)." },
      { q: "Quand faut-il un permis de construire (PC) ?", a: "Pour une construction nouvelle, ou des travaux ajoutant > 20 m² (> 40 m² en zone U) — et si le total dépasse 150 m², recours obligatoire à un architecte. Aussi en cas de modification des structures/façade avec changement de destination, ou sur monument inscrit. Instruction : 2 mois (maison individuelle) ou 3 mois." },
      { q: "Permis de démolir, d'aménager, modificatif ?", a: "Démolir : pour une construction protégée ou en secteur protégé (instruction 2 mois). Aménager : lotissement, camping, aire de stationnement, parc de loisirs (instruction 3 mois ; architecte si lotissement > 2 500 m²). Modificatif : modifications mineures d'un permis en cours, avant la déclaration d'achèvement." },
      { q: "Comment fonctionne la taxe d'aménagement ?", a: "Due lors d'un PC, permis d'aménager ou DP. Taxe = surface taxable × valeur forfaitaire × taux. Part communale 1-5 % (jusqu'à 20 %), départementale ≤ 2,5 %, régionale IDF ≤ 1 %. Valeur 2024 : 914 €/m² (1 036 € en IDF). Surface taxable = closes/couvertes > 1,80 m." },
      { q: "Quelles exonérations et abattements de taxe d'aménagement ?", a: "Exonérés de droit : constructions ≤ 5 m², service public, HLM/logements sociaux, locaux agricoles, reconstruction à l'identique (< 10 ans). Abattement de 50 % : logements aidés, les 100 premiers m² d'une résidence principale, locaux industriels/artisanaux, parkings couverts commerciaux." },
      { q: "Comment contester une autorisation d'urbanisme ?", a: "Un tiers (souvent un voisin) justifiant d'un INTÉRÊT À AGIR peut faire un recours gracieux auprès du maire dans les 2 mois de l'affichage, puis un recours contentieux devant le tribunal administratif (2 mois). Il doit notifier son recours au titulaire (LRAR) sous 15 jours francs." },
      { q: "Pourquoi l'affichage du permis est-il essentiel ?", a: "L'affichage sur le terrain informe les voisins et fait courir le délai de recours (2 mois à compter du 1er jour d'affichage). Sans affichage, l'autorisation peut être contestée pendant 6 mois après l'achèvement des travaux." },
      { q: "Normes, labels, certifications, DTU : quelle différence ?", a: "Une norme (NF, ISO) fixe des caractéristiques. Un label valorise une qualité supérieure. Une certification atteste la conformité par un organisme tiers. Les DTU (Documents Techniques Unifiés) et avis techniques constituent les « règles de l'art » à respecter." },
      { q: "Comment sont classés les ERP ?", a: "Les Établissements Recevant du Public sont classés en 5 CATÉGORIES selon l'effectif (1 : > 1 500 pers., 2 : 701-1 500, 3 : 301-700, 4 : ≤ 300, 5 : sous les seuils) et par TYPE (lettre : M magasin, N restaurant, R enseignement, O hôtel, L salle…). La CCDSA valide le classement." },
      { q: "Que prévoit la réglementation incendie pour les logements ?", a: "La loi du 9 mars 2010 rend obligatoire au moins un détecteur autonome avertisseur de fumée (DAAF) dans tout logement. L'installation incombe au propriétaire ; l'entretien à l'occupant. Interdiction d'installer des détecteurs dans les parties communes (les fumées tuent : ne pas inciter à y entrer)." },
      { q: "Qu'est-ce qu'un logement décent ?", a: "Un logement assurant la sécurité et la santé : clos et couvert, équipements de chauffage/eau/électricité aux normes, ventilation, lumière, surface minimale. Un logement indécent prive le locataire des allocations logement et permet un recours (mise en conformité, baisse de loyer, dommages et intérêts)." },
    ],
    quiz: [
      { q: "La validité d'un certificat d'urbanisme est de :", c: ["6 mois", "12 mois", "18 mois", "3 ans"], r: 2 },
      { q: "Une déclaration préalable concerne une création de surface de :", c: ["plus de 40 m²", "entre 5 et 20 m² (40 en zone U)", "plus de 150 m²", "moins de 2 m²"], r: 1 },
      { q: "Les ERP sont classés en :", c: ["3 catégories", "5 catégories selon l'effectif", "10 catégories", "2 catégories"], r: 1 },
      { q: "Le détecteur de fumée est obligatoire depuis la loi du :", c: ["4 janvier 1978", "9 mars 2010", "24 mars 2014", "23 novembre 2018"], r: 1 },
    ],
  },
});

// ---------- QUIZ détaillé (avec explications) ----------
window.QUIZ = Object.assign(window.QUIZ || {}, {
  macte5: [
    { q: "Les premières solutions d'ensemble sont proposées à l'étape :", c: ["EXE", "PRO", "ESQ (esquisse)", "APD"], r: 2, e: "L'esquisse (ESQ) propose une ou plusieurs solutions d'ensemble et vérifie la faisabilité au regard du programme, du site et de l'enveloppe financière." },
    { q: "L'estimation DÉFINITIVE des travaux par lots est donnée à l'étape :", c: ["ESQ", "APS", "APD (avant-projet définitif)", "EXE"], r: 2, e: "L'APD arrête les dimensions, définit les matériaux et établit l'estimation définitive du coût décomposée par lots ; l'APS ne donne qu'une estimation provisoire." },
    { q: "Le permis de construire se dépose au stade :", c: ["de l'esquisse", "de l'avant-projet (AVP)", "des études d'exécution", "de la réception"], r: 1, e: "Les études d'avant-projet (AVP) comprennent l'établissement des dossiers de permis de construire et l'assistance au maître d'ouvrage pendant l'instruction." },
    { q: "Le plan établi à l'échelle 1/50 à 1/500 montrant le terrain vu de dessus est :", c: ["le plan de situation", "le plan de masse", "le plan de coupe", "la façade"], r: 1, e: "Le plan de masse (ou plan d'implantation) représente en vue de dessus le terrain et la construction, à une échelle comprise entre 1/50 et 1/500." },
    { q: "Le plan de situation est établi à l'échelle :", c: ["1/50 à 1/500", "1/100", "1/5000 à 1/25000", "1/1"], r: 2, e: "Le plan de situation situe le terrain dans son environnement à une échelle comprise entre 1/5000 et 1/25000 ; c'est souvent la reproduction du plan cadastral." },
    { q: "Le plan cadastral :", c: ["est un titre de propriété", "a une vocation fiscale, non juridique", "remplace le permis", "fixe les loyers"], r: 1, e: "Le cadastre recense les propriétés pour le calcul des impôts locaux. Sa vocation est fiscale et non juridique : il ne constitue pas un titre de propriété." },
    { q: "Le plan d'architecte est une coupe horizontale réalisée à :", c: ["0,50 m du sol", "1,00 m du sol", "1,80 m du sol", "au plafond"], r: 1, e: "Le plan d'architecte représente l'habitation coupée horizontalement à 1,00 m du sol ; on dessine autant de plans qu'il y a d'étages." },
    { q: "L'abréviation « EU » sur un plan désigne :", c: ["l'eau pluviale", "les eaux usées", "les eaux vannes", "la ventilation"], r: 1, e: "EU = eaux usées ; EP = eau pluviale ; EV = eaux vannes (WC) ; VH/VB = ventilation haute/basse." },
  ],
  macte6: [
    { q: "Depuis le 1er mars 2012, la référence des autorisations d'urbanisme est :", c: ["la SHON", "la SHOB", "la surface de plancher", "l'emprise au sol"], r: 2, e: "La surface de plancher a remplacé la SHON et la SHOB au 1er mars 2012 (art. L.111-14 du Code de l'urbanisme)." },
    { q: "La surface de plancher se calcule à partir :", c: ["du nu extérieur des façades", "du nu intérieur des façades", "de l'axe des murs", "de l'emprise au sol"], r: 1, e: "Elle est la somme des surfaces closes et couvertes sous plafond > 1,80 m, calculée à partir du nu intérieur des façades, après déductions (vides, trémies, stationnement…)." },
    { q: "La hauteur sous plafond minimale prise en compte est de :", c: ["1,50 m", "1,80 m", "2,00 m", "2,20 m"], r: 1, e: "Les surfaces dont la hauteur sous plafond est ≤ 1,80 m sont déduites de la surface de plancher (et de la surface habitable)." },
    { q: "On parle de surface « habitable » pour :", c: ["les bureaux", "les logements", "les commerces", "les entrepôts"], r: 1, e: "« Habitable » pour les logements, « utile » pour les bureaux ; la surface utile des bureaux se calcule de la même façon que la surface habitable." },
    { q: "L'emprise au sol est :", c: ["la surface habitable", "la projection verticale du volume sur le terrain", "la surface de plancher", "la surface du terrain"], r: 1, e: "L'emprise au sol est la projection verticale du volume de la construction sur le terrain (épaisseur des murs, débords, surplombs inclus)." },
    { q: "Quel élément est EXCLU de l'emprise au sol ?", c: ["un garage fermé", "un balcon", "une terrasse de plain-pied", "une pergola"], r: 2, e: "Les terrasses de plain-pied ne créent pas d'emprise au sol. Sont exclus aussi les cours, jardins, stationnements, clôtures et débords de toiture non soutenus." },
    { q: "La surface RT (Srt) est une surface de référence :", c: ["fiscale", "thermique", "commerciale", "cadastrale"], r: 1, e: "La Srt (surface de référence thermique) part de la surface hors tout des parois horizontales, dont on déduit les surfaces non closes, non aménageables et non aménagées pour l'habitation." },
  ],
  macte7: [
    { q: "« Le territoire français est le patrimoine commun de la nation » est posé par :", c: ["l'art. 544 du Code civil", "l'art. L.101-1 du Code de l'urbanisme", "la loi Hoguet", "la loi SRU"], r: 1, e: "L'article L.101-1 du Code de l'urbanisme énonce ce principe ; l'art. L.101-2 fixe les objectifs de développement durable de l'action publique en urbanisme." },
    { q: "À défaut de tout document d'urbanisme, la commune applique :", c: ["le PLU", "le PLUi", "le RNU", "le SCoT"], r: 2, e: "Le RNU (Règlement National d'Urbanisme) s'applique en l'absence de carte communale ou de PLU ; il entraîne notamment la constructibilité limitée." },
    { q: "Le règlement du PLU délimite des zones notées :", c: ["A, B, C, D", "U, AU, A, N", "1, 2, 3, 4", "X, Y, Z"], r: 1, e: "Le règlement du PLU délimite les zones U (urbaines), AU (à urbaniser), A (agricoles) et N (naturelles et forestières) et compte 16 articles." },
    { q: "Le PLU succède au POS depuis la loi :", c: ["ALUR (2014)", "SRU du 13 décembre 2000", "ELAN (2018)", "Malraux (1962)"], r: 1, e: "La loi SRU du 13 décembre 2000 a créé le PLU en remplacement du POS ; les POS non transformés sont caducs depuis le 1er janvier 2016 (loi ALUR)." },
    { q: "Le transfert automatique du PLU aux intercommunalités est une mesure de la loi :", c: ["ELAN", "ALUR", "Climat & Résilience", "Spinetta"], r: 1, e: "La loi ALUR (24 mars 2014) prévoit le transfert automatique de la compétence PLU aux intercommunalités et renforce le rôle du SCoT." },
    { q: "L'interdiction de louer les passoires thermiques (G en 2025) vient de la loi :", c: ["ALUR", "ELAN", "Climat & Résilience (2021)", "Hoguet"], r: 2, e: "La loi Climat & Résilience du 22 août 2021 interdit progressivement la location des passoires : G en 2025, F en 2028, E en 2034." },
    { q: "Les secteurs sauvegardés sont issus de la loi :", c: ["du 31 décembre 1931", "Malraux du 4 août 1962", "SRU de 2000", "NOTRe de 2015"], r: 1, e: "La loi Malraux du 4 août 1962 a créé les secteurs sauvegardés ; l'Architecte des Bâtiments de France y rend un avis conforme sur les travaux." },
    { q: "Dans une servitude, le fonds qui supporte la charge est :", c: ["le fonds dominant", "le fonds servant", "le fonds public", "le fonds mitoyen"], r: 1, e: "La servitude pèse sur le fonds servant au profit du fonds dominant. Elle est immobilière, perpétuelle, indivisible et indissociable du fonds." },
    { q: "Une servitude qui s'exerce sans l'intervention de l'homme est :", c: ["discontinue", "continue", "apparente", "négative"], r: 1, e: "Une servitude continue s'exerce sans l'intervention de l'homme (écoulement des eaux, vue) ; une servitude discontinue nécessite le fait actuel de l'homme (passage, puisage)." },
  ],
  macte8: [
    { q: "Le certificat d'urbanisme est valable :", c: ["6 mois", "12 mois", "18 mois", "5 ans"], r: 2, e: "Le CU (d'information ou opérationnel) est valable 18 mois, prolongeable d'un an tant que les règles d'urbanisme, servitudes et taxes n'ont pas changé." },
    { q: "Une déclaration préalable est exigée pour une création de surface de :", c: ["moins de 5 m²", "entre 5 et 20 m² (40 en zone U avec PLU)", "plus de 40 m² systématiquement", "plus de 150 m²"], r: 1, e: "La DP vise les petits travaux : 5 à 20 m² de surface de plancher ou d'emprise (porté à 40 m² en zone urbaine couverte par un PLU)." },
    { q: "Le recours à un architecte devient obligatoire dès que le total dépasse :", c: ["100 m²", "120 m²", "150 m²", "170 m²"], r: 2, e: "Au-delà de 150 m² de surface de plancher, le recours à un architecte est obligatoire (notamment quand une extension de 20-40 m² porte le total au-delà de 150 m²)." },
    { q: "Le délai d'instruction d'un permis de construire pour une maison individuelle est de :", c: ["1 mois", "2 mois", "3 mois", "4 mois"], r: 1, e: "L'instruction est de 2 mois pour une maison individuelle et ses annexes, et de 3 mois dans les autres cas." },
    { q: "La part communale de la taxe d'aménagement se situe entre :", c: ["0 et 1 %", "1 % et 5 % (jusqu'à 20 %)", "5 % et 10 %", "10 % et 20 % toujours"], r: 1, e: "La part communale est de 1 à 5 % (jusqu'à 20 % dans certains secteurs) ; la part départementale ≤ 2,5 %, la part régionale (IDF) ≤ 1 %." },
    { q: "Sont exonérées de droit de taxe d'aménagement :", c: ["les piscines", "les constructions jusqu'à 5 m²", "les vérandas", "les garages"], r: 1, e: "Sont exonérés de droit notamment : les constructions ≤ 5 m², les ouvrages de service public, les logements HLM, les locaux agricoles et la reconstruction à l'identique (< 10 ans)." },
    { q: "Pour contester un permis, le voisin doit d'abord justifier :", c: ["d'un titre de propriété", "d'un intérêt à agir", "d'un avocat", "d'un permis concurrent"], r: 1, e: "Le tiers doit justifier d'un intérêt à agir (le projet affecte les conditions d'occupation/jouissance de son bien), puis faire un recours gracieux puis contentieux dans les 2 mois." },
    { q: "Les ERP sont classés en catégories selon :", c: ["leur surface", "leur capacité d'accueil (effectif)", "leur hauteur", "leur date de construction"], r: 1, e: "Les ERP sont classés en 5 catégories selon l'effectif admissible (cat. 1 : > 1 500 pers. … cat. 5 : sous les seuils) et par type selon la nature d'exploitation." },
    { q: "Le détecteur de fumée (DAAF) est rendu obligatoire par la loi du :", c: ["4 janvier 1978", "9 mars 2010", "24 mars 2014", "22 août 2021"], r: 1, e: "La loi n° 2010-238 du 9 mars 2010 rend obligatoire au moins un DAAF par logement ; son installation incombe au propriétaire, son entretien à l'occupant." },
    { q: "Installer un détecteur de fumée dans les parties communes est :", c: ["obligatoire", "interdit", "recommandé", "facultatif"], r: 1, e: "L'arrêté du 5 février 2013 interdit les détecteurs dans les parties communes : une alarme y inciterait les occupants à sortir dans les fumées, or ce sont les fumées qui tuent." },
  ],
});

// ---------- MÉMOS ----------
window.MEMOS = (window.MEMOS || []).concat([
  {
    mod: "macte5", title: "Les plans", color: "#3f6585",
    cards: [
      { type: "acronym", h: "Les phases d'études", items: [
        "ESQ — esquisse (faisabilité)",
        "APS → APD — avant-projet (dépôt du permis)",
        "PRO — études de projet",
        "EXE — études d'exécution (chantier)",
      ]},
      { type: "rule", h: "Les plans administratifs", items: [
        "Plan de masse — vue de dessus (1/50 à 1/500)",
        "Plan de situation — environnement (1/5000 à 1/25000)",
        "Plan cadastral — fiscal, pas un titre de propriété",
        "Plan d'architecte — coupe horizontale à 1 m, niveaux RDC/R+/R-",
        "Coupe — verticale (fondations → faîtage) · Façade — élévation (4 faces)",
      ]},
      { type: "acronym", h: "Abréviations utiles", items: [
        "EP eau pluviale · EU eaux usées · EV eaux vannes (WC)",
        "VH/VB ventilation · CF conduit de fumée · BA béton armé · VR volet roulant",
        "HSP hauteur sous plafond",
      ]},
    ],
  },
  {
    mod: "macte6", title: "Les différentes surfaces", color: "#b58430",
    cards: [
      { type: "rule", h: "Surface de plancher (depuis 2012)", items: [
        "Somme des surfaces closes et couvertes, h > 1,80 m",
        "Calcul au NU INTÉRIEUR des façades (remplace SHON/SHOB)",
        "Déductions : trémies, stationnement, combles non aménageables, +10 % logements",
      ]},
      { type: "acronym", h: "Les surfaces à distinguer", items: [
        "Habitable (logements) / Utile (bureaux) — art. R.111-2 CCH",
        "Srt — surface de référence thermique",
        "Emprise au sol — projection verticale du volume",
      ]},
      { type: "rule", h: "Emprise au sol", items: [
        "Inclut : bâti, balcons, terrasses surélevées, pergolas, garages, piscines",
        "Exclut : cours, jardins, stationnement, terrasses de plain-pied, débords non soutenus",
      ]},
    ],
  },
  {
    mod: "macte7", title: "Les contraintes à l'acte de construire", color: "#3f6585",
    cards: [
      { type: "acronym", h: "Les documents d'urbanisme", items: [
        "RNU — à défaut de document local (constructibilité limitée)",
        "Carte communale — délimite les secteurs constructibles",
        "PLU/PLUi — projet global, zones U/AU/A/N, 16 articles",
        "SCoT — cohérence à l'échelle d'un bassin de vie · PLH — habitat",
      ]},
      { type: "rule", h: "La frise des lois", items: [
        "1931 Monuments Historiques · 1962 Malraux (secteurs sauvegardés)",
        "2000 SRU (PLU remplace POS, SCoT)",
        "2014 ALUR · 2018 ELAN · 2021 Climat & Résilience · 2024 Habitat dégradé",
      ]},
      { type: "rule", h: "Les servitudes", items: [
        "Fonds servant (supporte) au profit du fonds dominant",
        "Caractères : immobilière, indissociable, perpétuelle, indivisible",
        "Naturelle / légale / conventionnelle ; continue/discontinue ; apparente/non",
      ]},
    ],
  },
  {
    mod: "macte8", title: "Autorisations & normes", color: "#c95636",
    cards: [
      { type: "formula", h: "Les autorisations (délais & validité)", items: [
        "CU — 1 mois (info) / 2 mois (opérationnel), validité 18 mois",
        "DP — 5 à 20 m² (40 en zone U), instruction 1 mois, validité 3 ans",
        "PC — > 20 m² (> 150 m² → architecte), instruction 2 à 3 mois",
        "Démolir 2 mois · Aménager 3 mois · Modificatif (avant achèvement)",
      ]},
      { type: "formula", h: "Taxe d'aménagement", items: [
        "Surface taxable × valeur forfaitaire × taux",
        "Valeur 2024 : 914 €/m² (1 036 € en IDF)",
        "Communale 1-5 % (→20 %) · départementale ≤ 2,5 % · régionale IDF ≤ 1 %",
        "Exonérations (≤ 5 m², HLM…) · abattement 50 % (100 premiers m²)",
      ]},
      { type: "rule", h: "Normes, ERP & incendie", items: [
        "Norme < Label < Certification ; DTU = règles de l'art",
        "ERP : 5 catégories (effectif) + types (lettre), CCDSA",
        "Détecteur de fumée obligatoire (loi 9 mars 2010), interdit en parties communes",
        "Recours d'un tiers : intérêt à agir, gracieux + contentieux (2 mois)",
      ]},
    ],
  },
]);
