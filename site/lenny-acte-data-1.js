/* ============================================
   LENNY — Généralités à l'acte de construire (1/2)
   Parties I à IV du cours « Généralités à l'acte de construire ».
     • macte1 — Les intervenants à l'acte de construire
     • macte2 — Les assurances de la construction
     • macte3 — Les contrats & la passation des marchés
     • macte4 — La VEFA (Vente en État Futur d'Achèvement)
   Alimente : ESSENTIALS, STUDY (fiches + quiz court), QUIZ (détaillé), MEMOS.
   Fusionne sans écraser l'existant.
   ============================================ */

// ---------- ESSENTIEL (à-retenir + frise) ----------
window.ESSENTIALS = Object.assign(window.ESSENTIALS || {}, {
  macte1: {
    retenir: [
      { k: "Maître d'ouvrage (MOA)", v: "Le client : personne pour le compte de qui les travaux sont faits (art. 1710 et 1787 C. civ.). Il définit le programme et le financement, choisit les participants et reçoit les ouvrages." },
      { k: "Maître d'œuvre (MOE)", v: "Conçoit, étudie, suit et coordonne les travaux pour le compte du MOA : architecte, ingénieur, bureau d'études. Mission fixée par contrat." },
      { k: "Architecte", v: "Diplômé inscrit au tableau régional de l'Ordre. Recours obligatoire dès 150 m² de surface de plancher (loi sur l'architecture du 3 janvier 1977)." },
      { k: "ACMH vs ABF", v: "ACMH (Architecte en Chef des Monuments Historiques) : restauration des monuments classés. ABF (Architecte des Bâtiments de France) : avis sur tout projet dans un périmètre de 500 m d'un monument classé." },
      { k: "Constructeur (art. 1792-1)", v: "Architecte, entrepreneur, technicien lié au MOA par louage d'ouvrage ; le vendeur après achèvement de ce qu'il a construit ; le mandataire assimilable à un locateur d'ouvrage." },
      { k: "Entrepreneurs", v: "Entreprise générale (maçonnerie-BA) · groupés (solidaires ou conjoints) · séparés · sous-traitant (sous-traité) · cotraitants (groupement momentané)." },
      { k: "Les contrôleurs & experts", v: "SPS (coordination sécurité-santé), BET (plans techniques), bureaux de contrôle (SOCOTEC, VERITAS, APAVE), géomètre-expert (bornage), expert judiciaire (auxiliaire de justice)." },
    ],
    timeline: [
      { y: "1977", t: "Loi sur l'architecture (3 janv.) — interventions obligatoires de l'architecte, création des CAUE" },
      { y: "art. 1792-1", t: "Code civil — définition du constructeur" },
      { y: "L. 235-3", t: "Code du travail — coordination SPS obligatoire dès plusieurs intervenants" },
      { y: "2000-1208", t: "Loi du 13/12/2000 (art. 37) — l'ABF ne peut plus exercer de maîtrise d'œuvre libérale" },
    ],
  },
  macte2: {
    retenir: [
      { k: "Loi Spinetta (4 janv. 1978)", v: "Loi sur l'assurance construction. Principe (art. 1792 C. civ.) : tout constructeur est responsable de plein droit des dommages compromettant la solidité ou rendant l'ouvrage impropre à sa destination." },
      { k: "Dommages-Ouvrage (DO)", v: "Souscrite par le MOA avant l'ouverture du chantier. Préfinance les réparations SANS recherche de responsabilité. Délai de réponse : 90 jours dossier complet. Se transmet aux acquéreurs." },
      { k: "Parfait achèvement", v: "1 an à compter de la réception (6 mois en marché public). Couvre tous les désordres réservés au PV ou signalés dans l'année. Réparation en nature par l'entrepreneur." },
      { k: "Biennale (bon fonctionnement)", v: "2 ans après réception. Vices des éléments d'équipement DISSOCIABLES (convecteur, porte) sans atteinte à la solidité ni à la destination." },
      { k: "Décennale", v: "10 ans après réception. Désordres graves + cachés : solidité de l'ouvrage, impropre à destination, éléments d'équipement indissociables. Souscrite par l'entreprise selon son activité." },
      { k: "DO ⇄ Décennale", v: "Loi de 1978 = 2 assurances obligatoires : RC décennale (assurance de personne, art. L.241-1) souscrite par l'entreprise + DO (assurance de chose, art. L.242-1) souscrite par le MOA. Même durée : 10 ans." },
      { k: "Garanties extrinsèques & RC", v: "Garantie de remboursement (≤ 5 %, cesse à l'ouverture du chantier) · garantie de livraison (≤ 2 ans). RC contractuelle de droit commun (prescription 10 ans), dommages intermédiaires, défauts de conformité." },
    ],
    timeline: [
      { y: "1978", t: "Loi Spinetta (4 janv.) — assurance construction obligatoire (DO + décennale)" },
      { y: "art. 1792", t: "Code civil — responsabilité de plein droit du constructeur" },
      { y: "13 avr. 1988", t: "Cass. — la RC de droit commun est écartée quand biennale/décennale s'appliquent" },
      { y: "L.242-1", t: "Code des assurances — obligation de DO pour le maître d'ouvrage" },
    ],
  },
  macte3: {
    retenir: [
      { k: "Marché privé", v: "Entre personnes privées. Le MOA fixe le programme et l'enveloppe ; le MOE assiste à la passation des marchés (DCE), dirige l'exécution et assiste à la réception." },
      { k: "Le DCE", v: "Dossier de Consultation des Entreprises : pièces écrites et graphiques remises aux entreprises retenues pour qu'elles remettent leur offre dans un délai donné." },
      { k: "Le Visa", v: "Le MOE vise (vérifie et valide) les documents d'exécution établis par les entreprises, et les situations de travaux avant paiement par le MOA." },
      { k: "Marché public", v: "Contrat conclu par un pouvoir adjudicateur (État, collectivité…) avec un opérateur économique pour répondre à un besoin (travaux, fournitures, services), à titre onéreux." },
      { k: "Procédures de passation", v: "Selon le montant : procédure adaptée (MAPA) ou procédures formalisées (appel d'offres ouvert/restreint, procédure avec négociation, dialogue compétitif)." },
      { k: "Choix de l'offre", v: "L'offre économiquement la plus avantageuse (pas forcément la moins chère) : prix, valeur technique, délais, performances environnementales… Publicité et mise en concurrence obligatoires." },
      { k: "Pièces écrites > graphiques", v: "En cas de litige sur un chantier, les pièces écrites priment sur les pièces graphiques : tout le monde peut lire un texte, un plan s'interprète." },
    ],
    timeline: [
      { y: "Code", t: "Code de la commande publique — cadre des marchés publics" },
      { y: "MAPA", t: "Procédure adaptée — sous les seuils des procédures formalisées" },
      { y: "Appel d'offres", t: "Procédure formalisée — ouvert ou restreint" },
    ],
  },
  macte4: {
    retenir: [
      { k: "Définition VEFA", v: "Vente d'un logement « sur plan » : l'acquéreur devient propriétaire du sol et des constructions au fur et à mesure de leur exécution, et en paie le prix par échéances." },
      { k: "Contrat de réservation", v: "Avant-contrat : décrit le logement, le prix prévisionnel, la date de livraison. Accompagné d'un dépôt de garantie versé sur compte séquestre." },
      { k: "Dépôt de garantie", v: "Plafonné selon le délai de livraison : 5 % si vente sous 1 an, 2 % entre 1 et 2 ans, 0 % au-delà de 2 ans." },
      { k: "GFA (achèvement)", v: "Garantie Financière d'Achèvement : garantit la livraison du bien même en cas de défaillance du promoteur. + parfait achèvement, biennale et décennale s'appliquent ensuite." },
      { k: "Acte notarié", v: "Contrat définitif signé chez le notaire (frais de notaire + hypothèque). La procuration permet de signer à distance." },
      { k: "Appels de fonds", v: "Échelonnés selon l'avancement : 35 % aux fondations, 70 % à la mise hors d'eau, 95 % à l'achèvement, 5 % à la livraison (consignables en cas de réserves)." },
      { k: "Livraison", v: "Constat d'achèvement + procès-verbal de livraison (réserves possibles). Remise des clés. En cas de retard : pénalités prévues au contrat." },
    ],
    timeline: [
      { y: "GFA", t: "Garantie Financière d'Achèvement — sécurise la livraison" },
      { y: "35/70/95/5", t: "Échéancier des appels de fonds (fondations / hors d'eau / achèvement / livraison)" },
      { y: "5-2-0 %", t: "Dépôt de garantie selon le délai de livraison (≤1 an / 1-2 ans / >2 ans)" },
    ],
  },
});

// ---------- FICHES (flashcards) + quiz court ----------
window.STUDY = Object.assign(window.STUDY || {}, {
  macte1: {
    cards: [
      { q: "Qui est le maître d'ouvrage (MOA) ?", a: "La personne physique ou morale pour le compte de qui les travaux sont effectués (art. 1710 et 1787 C. civ.). C'est le client des entrepreneurs et des maîtres d'œuvre. Il définit le programme et le financement, choisit les participants, fixe les conditions administratives et reçoit les ouvrages. Il n'est pas forcément l'usager (ex : un hôpital)." },
      { q: "Qui est le maître d'œuvre (MOE) ?", a: "La personne chargée de la conception, des études, du suivi et de la coordination des travaux pour le compte du MOA : architecte, agréé en architecture, ingénieur, bureau d'études. Sa mission est définie par le contrat. Parfois MOA et MOE ne font qu'un (industries, grandes municipalités)." },
      { q: "Quand le recours à un architecte est-il obligatoire ?", a: "Dès que la surface de plancher dépasse 150 m² pour une maison individuelle. L'architecte établit le projet architectural de la demande de permis. La loi sur l'architecture du 3 janvier 1977 a fixé ses conditions d'intervention et créé les CAUE (Conseils d'Architecture, d'Urbanisme et de l'Environnement)." },
      { q: "ACMH : qui est-ce et que fait-il ?", a: "L'Architecte en Chef des Monuments Historiques, nommé par le Ministère de la Culture après un concours très difficile. Il a en charge un secteur (entretien, rénovation, reconstruction des monuments classés). Un monument classé ne peut être détruit, déplacé ou rénové sans son avis favorable." },
      { q: "ABF : quel est son rôle et son périmètre ?", a: "L'Architecte des Bâtiments de France donne son avis sur tout projet situé dans le champ de visibilité d'un monument classé, dans un périmètre de 500 m. Il examine façades, ouvertures, toitures, couleurs, matériaux. Depuis la loi du 13/12/2000, il ne peut plus exercer de maîtrise d'œuvre libérale." },
      { q: "Comment l'article 1792-1 définit-il le constructeur ?", a: "Est réputé constructeur : tout architecte, entrepreneur, technicien lié au MOA par un contrat de louage d'ouvrage ; toute personne qui vend après achèvement un ouvrage qu'elle a construit ou fait construire ; tout mandataire du propriétaire accomplissant une mission assimilable à celle d'un locateur d'ouvrage." },
      { q: "Entrepreneurs groupés solidaires vs conjoints ?", a: "Solidaires : chacun est engagé pour la TOTALITÉ du marché et doit pallier la défaillance des autres. Conjoints : les travaux sont divisés en lots, chacun n'est engagé que pour le ou les lots qui lui sont assignés. Ils soumissionnent via un mandataire commun." },
      { q: "Sous-traitant ou cotraitant ?", a: "Le sous-traitant exécute une partie du contrat sous la responsabilité de l'entrepreneur principal (par un sous-traité). Les cotraitants associent leurs candidatures dans un « groupement momentané d'entreprises » : ils sont au même niveau, sans lien de subordination." },
      { q: "À quoi sert le coordonnateur SPS ?", a: "La coordination Sécurité et Protection de la Santé (art. L.235-3 C. trav.) est obligatoire dès que plusieurs travailleurs ou entreprises interviennent. Elle prévient les risques liés aux interventions simultanées ou successives. 3 niveaux de coordonnateurs selon les heures et le nombre d'entreprises." },
      { q: "BET, bureau de contrôle : quelle différence ?", a: "Le BET (Bureau d'Études Techniques) établit les plans techniques (structure, fluides) à partir des plans de l'architecte. Le bureau de contrôle (SOCOTEC, VERITAS, APAVE) ne donne que des avis favorables ou défavorables sur la solidité/sécurité, pas de solution ; il rend compte aux assureurs." },
      { q: "Que fait le géomètre-expert ?", a: "Il dresse les documents topographiques : mesure des terrains, délimitation (bornage) et représentation graphique. Profession libérale garantie par un diplôme + stage, régie par l'Ordre des Géomètres-Experts." },
      { q: "Rôle de l'expert judiciaire ?", a: "Auxiliaire de la justice qui donne au tribunal un avis technique : description des lieux, remèdes, estimation des travaux, avis sur les responsabilités. Inscrit sur la liste des Cours d'Appel ou de Cassation (révisée chaque année). Il ne peut pas surveiller les travaux de réfection." },
      { q: "Agent immobilier vs marchand de biens ?", a: "L'agent immobilier intervient dans les opérations (achat/vente, location, gérance…) et évalue les biens. Le marchand de biens achète pour revendre avec bénéfice (en l'état, après rénovation ou transformation), sans construction nouvelle (sinon c'est du domaine du promoteur)." },
    ],
    quiz: [
      { q: "Le client, qui paie les travaux, est :", c: ["le maître d'œuvre", "le maître d'ouvrage", "l'entrepreneur", "le coordonnateur SPS"], r: 1 },
      { q: "Le recours à l'architecte est obligatoire à partir de :", c: ["100 m²", "120 m²", "150 m²", "200 m²"], r: 2 },
      { q: "L'ABF donne son avis dans un périmètre de :", c: ["100 m", "300 m", "500 m", "1 km"], r: 2 },
    ],
  },
  macte2: {
    cards: [
      { q: "Quelle loi régit l'assurance construction ?", a: "La loi dite SPINETTA du 4 janvier 1978. Son principe (art. 1792 C. civ.) : « Tout constructeur d'un ouvrage est responsable de plein droit, envers le maître ou l'acquéreur, des dommages, même résultant d'un vice du sol, qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination. »" },
      { q: "Qu'est-ce que l'assurance Dommages-Ouvrage (DO) ?", a: "Une assurance souscrite par le MOA AVANT l'ouverture du chantier. Elle préfinance les réparations des dommages de nature décennale SANS attendre qu'on recherche les responsabilités. Le MOA est indemnisé vite, l'assureur se retourne ensuite contre les responsables. Elle se transmet à tout acquéreur." },
      { q: "Quel est le délai de réponse de la DO ?", a: "90 jours maximum à partir du dossier complet (LRAR, PV de réception, déclaration d'ouverture de chantier, photos…). Pendant ce délai, l'assureur missionne un expert UNIQUE qui représente toutes les entreprises potentiellement responsables, puis propose une indemnité ou un refus de garantie." },
      { q: "La garantie de parfait achèvement : durée et objet ?", a: "1 an à compter de la réception (6 mois en marché public). Elle couvre tous les désordres réservés au PV de réception ou signalés dans l'année (apparents ou cachés, défauts de conformité). L'entrepreneur doit réparer EN NATURE. À défaut après mise en demeure, on peut faire exécuter à ses frais." },
      { q: "La garantie biennale (bon fonctionnement) ?", a: "2 ans après la réception. Elle garantit les vices des éléments d'équipement DISSOCIABLES (démontables sans destruction : convecteur, porte, volet) qui ne portent atteinte ni à la solidité ni à la destination de l'ouvrage. Parfois utilisée pour des désordres esthétiques (peinture)." },
      { q: "La garantie décennale : conditions et durée ?", a: "10 ans après réception. Le désordre doit être GRAVE et CACHÉ : il compromet la solidité, ou rend l'ouvrage impropre à sa destination, ou affecte un élément d'équipement INDISSOCIABLE (carrelage, plomberie encastrée, radiateur scellé). Un vice apparent non réservé à la réception est purgé." },
      { q: "Qui est assujetti à la garantie décennale ?", a: "Tous les constructeurs au sens des art. 1792 et s. : locateurs d'ouvrage, bureaux de contrôle, vendeur après achèvement, vendeur d'immeuble à construire, mandataire/promoteur, constructeur de maisons individuelles, lotisseur, syndic de copropriété, architecte (RC professionnelle plus large)." },
      { q: "Comment s'articulent DO et décennale ?", a: "La loi de 1978 crée 2 assurances obligatoires : la RC décennale (assurance de PERSONNE, art. L.241-1, souscrite par l'entreprise selon son activité) et la DO (assurance de CHOSE, art. L.242-1, souscrite par le MOA). Même durée (10 ans). La DO préfinance, puis se retourne sur la décennale des responsables." },
      { q: "Avec ou sans DO : quelle différence pour le MOA ?", a: "SANS DO : le MOA contacte chaque corps d'état puis leurs assurances décennales ; sans accord, il saisit le tribunal qui nomme un expert judiciaire → procédure très longue. AVEC DO : il déclare à son assureur qui missionne un expert unique et l'indemnise sous 90 jours ; le litige est soldé, les réparations engagées." },
      { q: "La garantie de remboursement (extrinsèque) ?", a: "Limitée à 5 % du prix du contrat. Elle prend effet à l'appel de fonds correspondant à sa remise en main propre et CESSE le jour de l'ouverture du chantier. Elle protège le MOA en cas de défaillance du constructeur (faillite) avant le démarrage." },
      { q: "La garantie de livraison (extrinsèque) ?", a: "Elle prend effet à l'ouverture du chantier et cesse à la réception sans réserve (PV). Elle ne peut excéder 2 ans. Elle couvre le MOA contre le risque d'inexécution des travaux, au prix et aux délais convenus." },
      { q: "Que sont les dommages intermédiaires ?", a: "Des désordres non apparents à la réception qui ne relèvent ni de la biennale (pas un équipement dissociable) ni de la décennale (pas d'atteinte à la solidité ni à la destination) — ex : fissure non infiltrante. Ils relèvent de la RC contractuelle, action à introduire dans les 10 ans." },
      { q: "Qui doit souscrire l'assurance habitation et que couvre-t-elle ?", a: "Obligatoire pour le locataire (et la copropriété). Elle couvre les risques liés aux biens (incendie, dégât des eaux, vol) et à la personne (responsabilité civile). La cotisation dépend de la surface, de la valeur des biens, de la localisation et des garanties choisies. La GLI (garantie loyers impayés) est facultative." },
    ],
    quiz: [
      { q: "La loi sur l'assurance construction est la loi :", c: ["Hoguet (1970)", "Spinetta (1978)", "ALUR (2014)", "Carrez (1996)"], r: 1 },
      { q: "La garantie décennale dure :", c: ["1 an", "2 ans", "5 ans", "10 ans"], r: 3 },
      { q: "L'assurance Dommages-Ouvrage est souscrite par :", c: ["l'entrepreneur", "le maître d'ouvrage", "l'architecte", "le bureau de contrôle"], r: 1 },
    ],
  },
  macte3: {
    cards: [
      { q: "Marché privé : quel est le rôle du MOA et du MOE ?", a: "Le MOA fixe le programme et l'enveloppe financière. Le MOE l'assiste pour la passation des marchés de travaux (élaboration du DCE), pour la mise au point des marchés, la direction et la comptabilité des travaux, le visa des documents d'exécution et l'assistance aux opérations de réception." },
      { q: "Qu'est-ce que le DCE ?", a: "Le Dossier de Consultation des Entreprises : l'ensemble des pièces écrites (CCTP, CCAP…) et graphiques (plans) remis aux entreprises retenues pour qu'elles établissent et remettent leur offre dans un délai donné." },
      { q: "À quoi sert le « visa » du maître d'œuvre ?", a: "Le MOE vise (vérifie, valide) les documents d'exécution établis par les entreprises pour s'assurer de leur conformité au projet, ainsi que les situations de travaux que les entreprises présentent au paiement du MOA." },
      { q: "Comment les entreprises sont-elles choisies en marché privé ?", a: "Sur les pièces du DCE, les entreprises répondent dans un délai. Le MOE établit un comparatif des offres et le présente au MOA, qui retient la ou les entreprises (entreprise générale ou corps d'état séparés). Le marché est ensuite signé après mise en forme et contrôle de l'architecte." },
      { q: "Qu'est-ce qu'un marché public ?", a: "Un contrat conclu à titre onéreux par un pouvoir adjudicateur (État, collectivité, établissement public) avec un opérateur économique, pour répondre à ses besoins en matière de travaux, fournitures ou services." },
      { q: "Quelles sont les grandes procédures de passation ?", a: "Selon le montant : la procédure adaptée (MAPA, sous les seuils) et les procédures formalisées au-dessus des seuils : appel d'offres (ouvert ou restreint), procédure avec négociation, dialogue compétitif. Publicité et mise en concurrence sont obligatoires." },
      { q: "Sur quel critère choisit-on l'offre en marché public ?", a: "L'offre économiquement la plus avantageuse — pas nécessairement la moins chère. On pondère plusieurs critères : prix, valeur technique, délais d'exécution, performances environnementales, coût global d'utilisation, etc." },
      { q: "Pièces écrites ou pièces graphiques en cas de litige ?", a: "Les pièces ÉCRITES priment sur les pièces graphiques. En effet, un document écrit peut être lu par tous, alors qu'un plan peut donner lieu à des interprétations différentes ou être mal compris." },
      { q: "Quelles sont les étapes clés du déroulement d'un marché privé ?", a: "Choix du MOE → contrat MOA/MOE → programme et enveloppe → ESQ/APS/APD → dépôt des autorisations (PC) → DCE → consultation des entreprises → comparatif → signature des marchés → ordre de service → chantier (réunions, situations visées) → réception → déclaration d'achèvement." },
    ],
    quiz: [
      { q: "Le DCE est :", c: ["le contrat de syndic", "le dossier de consultation des entreprises", "un diagnostic", "un certificat d'urbanisme"], r: 1 },
      { q: "En marché public, on retient :", c: ["toujours l'offre la moins chère", "l'offre économiquement la plus avantageuse", "la première offre reçue", "l'entreprise locale"], r: 1 },
      { q: "En cas de litige, priment :", c: ["les pièces graphiques", "les pièces écrites", "les photos", "les e-mails"], r: 1 },
    ],
  },
  macte4: {
    cards: [
      { q: "Qu'est-ce que la VEFA ?", a: "La Vente en État Futur d'Achèvement, ou vente « sur plan » : l'acquéreur achète un logement qui n'est pas encore construit (ou en cours). Il devient propriétaire du sol et des ouvrages au fur et à mesure de leur exécution et paie le prix selon un échéancier (appels de fonds)." },
      { q: "À quoi sert le contrat de réservation ?", a: "C'est l'avant-contrat de la VEFA : il décrit le logement (surface, situation, prestations), indique le prix prévisionnel et la date de livraison. Il est accompagné d'un dépôt de garantie versé sur un compte séquestre." },
      { q: "Comment est plafonné le dépôt de garantie en VEFA ?", a: "Selon le délai de livraison prévu : 5 % du prix si la vente intervient dans l'année, 2 % si elle intervient entre 1 et 2 ans, et 0 % (aucun dépôt) au-delà de 2 ans." },
      { q: "Qu'est-ce que la GFA ?", a: "La Garantie Financière d'Achèvement : elle assure que le logement sera achevé et livré même si le promoteur fait défaut (faillite). C'est la garantie phare protégeant l'acquéreur en VEFA, en plus du parfait achèvement, de la biennale et de la décennale après réception." },
      { q: "Quelles garanties s'appliquent au logement vendu en VEFA ?", a: "Avant/pendant : la GFA (achèvement). Après la livraison : la garantie de parfait achèvement (1 an), la garantie biennale de bon fonctionnement (2 ans) et la garantie décennale (10 ans). S'ajoute la possibilité de personnalisation du logement (travaux modificatifs acquéreur)." },
      { q: "Que se passe-t-il à la signature de l'acte notarié ?", a: "L'acquéreur signe le contrat définitif chez le notaire. Il règle les frais de notaire et d'hypothèque (si prêt). Une procuration permet de faire signer un tiers à sa place s'il ne peut être présent." },
      { q: "Comment fonctionnent les appels de fonds en VEFA ?", a: "Le prix est payé par échéances selon l'avancement, plafonnées par la loi : 35 % à l'achèvement des fondations, 70 % à la mise hors d'eau, 95 % à l'achèvement de l'immeuble, et 5 % à la livraison (consignables en cas de réserves)." },
      { q: "Comment se déroule la livraison en VEFA ?", a: "Elle suppose un constat d'achèvement puis un procès-verbal de livraison, lors duquel l'acquéreur prend possession et peut émettre des réserves sur les défauts constatés. Remise des clés. En cas de retard de livraison, des pénalités prévues au contrat s'appliquent." },
    ],
    quiz: [
      { q: "La VEFA est une vente :", c: ["d'un bien ancien", "sur plan (futur achèvement)", "aux enchères", "en viager"], r: 1 },
      { q: "Le dépôt de garantie est de 5 % si la livraison intervient :", c: ["dans l'année", "entre 1 et 2 ans", "au-delà de 2 ans", "jamais"], r: 0 },
      { q: "La garantie qui sécurise la livraison en VEFA est :", c: ["la décennale", "la GFA", "la biennale", "le parfait achèvement"], r: 1 },
    ],
  },
});

// ---------- QUIZ détaillé (avec explications) ----------
window.QUIZ = Object.assign(window.QUIZ || {}, {
  macte1: [
    { q: "Le maître d'ouvrage est défini par les articles :", c: ["1792 et 1792-1", "1710 et 1787 du Code civil", "L.241-1 et L.242-1", "544 et 545"], r: 1, e: "Le maître d'ouvrage (le client) est la personne pour le compte de qui les travaux sont effectués, au sens des articles 1710 et 1787 du Code civil." },
    { q: "La mission du maître d'œuvre est :", c: ["fixée par la loi", "fixée par le contrat passé avec le maître d'ouvrage", "toujours identique", "définie par le préfet"], r: 1, e: "Le MOE conçoit, étudie, suit et coordonne les travaux pour le compte du MOA ; sa mission est définie par le contrat conclu avec lui (assistance à la passation, direction d'exécution, assistance à la réception)." },
    { q: "Le recours à un architecte est obligatoire dès :", c: ["100 m² de surface de plancher", "120 m²", "150 m² de surface de plancher", "170 m²"], r: 2, e: "Pour une maison individuelle, l'architecte est obligatoire dès 150 m² de surface de plancher (loi sur l'architecture du 3 janvier 1977)." },
    { q: "L'Architecte des Bâtiments de France (ABF) intervient dans un périmètre de :", c: ["100 m", "250 m", "500 m autour d'un monument classé", "1 000 m"], r: 2, e: "Tout immeuble situé dans le champ de visibilité d'un monument classé, dans un périmètre de 500 m, est soumis à l'avis de l'ABF (façades, toitures, couleurs, matériaux)." },
    { q: "Des entrepreneurs « groupés solidaires » sont :", c: ["engagés chacun pour leur seul lot", "engagés chacun pour la totalité du marché", "sans mandataire commun", "des sous-traitants"], r: 1, e: "Solidaires = chacun est engagé pour la totalité du marché et doit pallier la défaillance des autres. Conjoints = chacun n'est engagé que pour son lot." },
    { q: "La coordination SPS est obligatoire :", c: ["sur tout chantier", "dès que plusieurs entreprises/travailleurs interviennent", "uniquement en marché public", "au-delà de 150 m²"], r: 1, e: "Article L.235-3 du Code du travail : une coordination sécurité-santé est organisée dès que plusieurs travailleurs indépendants ou entreprises (sous-traitants inclus) interviennent." },
    { q: "Un bureau de contrôle (SOCOTEC, VERITAS, APAVE) :", c: ["donne des solutions techniques", "ne donne que des avis favorables ou défavorables", "réalise les travaux", "remplace l'architecte"], r: 1, e: "Le bureau de contrôle se prononce (avis favorable/défavorable) sur la solidité, la sécurité… mais ne donne pas de solution. Il rend compte aux compagnies d'assurances." },
    { q: "L'expert judiciaire :", c: ["peut surveiller les travaux de réfection", "est un auxiliaire de la justice", "fixe les peines", "vend les biens"], r: 1, e: "L'expert judiciaire est un auxiliaire de la justice qui éclaire le tribunal d'un avis technique. Le Code de procédure lui interdit de surveiller les travaux de réfection." },
    { q: "Le marchand de biens :", c: ["construit des immeubles neufs", "achète pour revendre sans construction nouvelle", "est un maître d'œuvre", "ne paie pas d'impôt"], r: 1, e: "Le marchand de biens achète des biens immobiliers pour les revendre (en l'état, après rénovation ou transformation) sans construction nouvelle — sinon c'est le domaine du promoteur." },
  ],
  macte2: [
    { q: "Le principe de la responsabilité du constructeur est posé par :", c: ["l'article 1792 du Code civil", "l'article 544", "la loi Hoguet", "l'article L.111-1 du CCH"], r: 0, e: "L'article 1792 du Code civil pose la responsabilité de plein droit du constructeur pour les dommages compromettant la solidité ou rendant l'ouvrage impropre à sa destination (loi Spinetta de 1978)." },
    { q: "La garantie de parfait achèvement dure (marché privé) :", c: ["6 mois", "1 an à compter de la réception", "2 ans", "10 ans"], r: 1, e: "1 an à compter de la réception en marché privé (6 mois en marché public). Elle couvre les désordres réservés ou signalés dans l'année ; l'entrepreneur répare en nature." },
    { q: "La garantie biennale couvre :", c: ["la solidité de l'ouvrage", "les éléments d'équipement dissociables", "le sol", "les défauts esthétiques uniquement"], r: 1, e: "La biennale (2 ans) garantit le bon fonctionnement des éléments d'équipement dissociables (démontables sans destruction) sans atteinte à la solidité ni à la destination." },
    { q: "Pour relever de la décennale, un désordre doit être :", c: ["apparent et bénin", "grave et caché", "réservé au PV", "esthétique"], r: 1, e: "La décennale (10 ans) vise les désordres graves ET cachés : atteinte à la solidité, ouvrage impropre à sa destination, ou éléments d'équipement indissociables." },
    { q: "La RC décennale est une assurance de personne posée par :", c: ["l'article L.242-1", "l'article L.241-1 du Code des assurances", "l'article 1792-6", "la loi ALUR"], r: 1, e: "La RC décennale (assurance de personne) est posée par l'art. L.241-1 ; la Dommages-Ouvrage (assurance de chose) par l'art. L.242-1. Toutes deux obligatoires, durée 10 ans." },
    { q: "La Dommages-Ouvrage est souscrite :", c: ["par l'entreprise selon son activité", "par le maître d'ouvrage avant l'ouverture du chantier", "par le notaire", "par l'assureur"], r: 1, e: "La DO est souscrite par le maître d'ouvrage (ou son mandataire) avant l'ouverture du chantier ; elle préfinance les réparations de nature décennale sans recherche de responsabilité." },
    { q: "Le délai de réponse de l'assurance Dommages-Ouvrage est de :", c: ["30 jours", "60 jours", "90 jours dossier complet", "6 mois"], r: 2, e: "La DO dispose d'un délai maximum de 90 jours à partir du dossier complet pour proposer une indemnité ou refuser la garantie. Elle missionne un expert unique." },
    { q: "Les dommages intermédiaires :", c: ["relèvent de la décennale", "relèvent de la biennale", "ne relèvent ni de la biennale ni de la décennale", "ne sont jamais réparés"], r: 2, e: "Ce sont des désordres non apparents qui ne portent pas atteinte à la solidité/destination (ex : fissure non infiltrante). Ils relèvent de la RC contractuelle, action dans les 10 ans." },
    { q: "La garantie de remboursement est limitée à :", c: ["2 %", "5 % du prix du contrat", "10 %", "20 %"], r: 1, e: "La garantie de remboursement est limitée à 5 % du prix du contrat. Elle prend effet à l'appel de fonds correspondant et cesse à l'ouverture du chantier." },
    { q: "Quand biennale et décennale s'appliquent, la RC de droit commun :", c: ["se cumule toujours", "est écartée (Cass. 13 avril 1988)", "double la garantie", "n'existe pas"], r: 1, e: "Arrêt de principe du 13 avril 1988 : la responsabilité contractuelle de droit commun est écartée lorsque les garanties biennale et décennale sont applicables (sauf dol, désordres non couverts…)." },
  ],
  macte3: [
    { q: "Le DCE désigne :", c: ["le diagnostic de construction", "le dossier de consultation des entreprises", "le décompte des charges", "la déclaration de chantier"], r: 1, e: "Le DCE (Dossier de Consultation des Entreprises) réunit les pièces écrites et graphiques remises aux entreprises pour qu'elles remettent leur offre." },
    { q: "Le « visa » du maître d'œuvre porte sur :", c: ["le permis de construire", "les documents d'exécution et les situations des entreprises", "le contrat de syndic", "le DPE"], r: 1, e: "Le MOE vise les documents d'exécution établis par les entreprises (conformité au projet) et les situations de travaux présentées au paiement." },
    { q: "Un marché public est conclu :", c: ["entre deux particuliers", "à titre gratuit", "à titre onéreux par un pouvoir adjudicateur", "sans publicité"], r: 2, e: "Le marché public est un contrat à titre onéreux conclu par un pouvoir adjudicateur avec un opérateur économique pour répondre à un besoin (travaux, fournitures, services)." },
    { q: "Sous les seuils des procédures formalisées, on utilise :", c: ["l'appel d'offres restreint", "la procédure adaptée (MAPA)", "le dialogue compétitif", "le gré à gré interdit"], r: 1, e: "En dessous des seuils, l'acheteur recourt à la procédure adaptée (MAPA), dont il fixe librement les modalités dans le respect des principes de la commande publique." },
    { q: "Le marché public est attribué à :", c: ["l'offre la moins-disante systématiquement", "l'offre économiquement la plus avantageuse", "l'entreprise la plus proche", "la plus grosse entreprise"], r: 1, e: "On retient l'offre économiquement la plus avantageuse, appréciée selon plusieurs critères pondérés (prix, valeur technique, délais, performances environnementales…)." },
    { q: "En cas de litige sur un chantier, priment :", c: ["les pièces graphiques", "les pièces écrites", "la parole de l'architecte", "les photos du chantier"], r: 1, e: "Les pièces écrites priment sur les pièces graphiques : un texte peut être lu par tous, un plan peut être interprété différemment." },
    { q: "Les principes de la commande publique imposent notamment :", c: ["le secret des offres", "la publicité et la mise en concurrence", "le choix d'une entreprise locale", "l'absence de critères"], r: 1, e: "La commande publique repose sur la liberté d'accès, l'égalité de traitement des candidats et la transparence des procédures (publicité + mise en concurrence)." },
  ],
  macte4: [
    { q: "En VEFA, l'acquéreur devient propriétaire :", c: ["à la remise des clés seulement", "au fur et à mesure de l'exécution des travaux", "à la signature du contrat de réservation", "10 ans après"], r: 1, e: "En VEFA, l'acquéreur devient propriétaire du sol puis des constructions au fur et à mesure de leur exécution, et règle le prix par appels de fonds." },
    { q: "Le contrat de réservation est :", c: ["l'acte définitif", "un avant-contrat avec dépôt de garantie", "un bail", "un mandat"], r: 1, e: "Le contrat de réservation est l'avant-contrat : il décrit le bien, le prix prévisionnel et la date de livraison, et s'accompagne d'un dépôt de garantie sur compte séquestre." },
    { q: "Le dépôt de garantie est nul (0 %) si la livraison intervient :", c: ["dans l'année", "entre 1 et 2 ans", "au-delà de 2 ans", "jamais"], r: 2, e: "Le dépôt de garantie est plafonné à 5 % (≤ 1 an), 2 % (1 à 2 ans) et 0 % au-delà de 2 ans." },
    { q: "La garantie qui assure l'achèvement même en cas de défaillance du promoteur est :", c: ["la décennale", "la biennale", "la GFA (Garantie Financière d'Achèvement)", "le parfait achèvement"], r: 2, e: "La GFA garantit que le logement sera achevé et livré même si le promoteur fait défaut. C'est la garantie phare de la VEFA." },
    { q: "L'échéancier des appels de fonds plafonne le paiement à :", c: ["50 % aux fondations", "70 % à la mise hors d'eau", "100 % à l'achèvement", "10 % à la livraison"], r: 1, e: "Plafonds légaux : 35 % aux fondations, 70 % à la mise hors d'eau, 95 % à l'achèvement, 5 % à la livraison (consignables en cas de réserves)." },
    { q: "Lors de la livraison, l'acquéreur peut :", c: ["refuser de payer le prix entier", "émettre des réserves sur les défauts constatés", "annuler la vente librement", "changer le promoteur"], r: 1, e: "Au procès-verbal de livraison, l'acquéreur prend possession et peut émettre des réserves ; les 5 % restants sont alors consignables jusqu'à la levée des réserves." },
    { q: "Après la réception, le logement VEFA bénéficie de :", c: ["la seule GFA", "parfait achèvement, biennale et décennale", "aucune garantie", "la garantie de remboursement"], r: 1, e: "Après livraison/réception s'appliquent la garantie de parfait achèvement (1 an), la biennale (2 ans) et la décennale (10 ans)." },
  ],
});

// ---------- MÉMOS ----------
window.MEMOS = (window.MEMOS || []).concat([
  {
    mod: "macte1", title: "Les intervenants à l'acte de construire", color: "#2f5d7a",
    cards: [
      { type: "acronym", h: "Les acteurs clés", items: [
        "MOA — Maître d'OuvrAge : le client (art. 1710 / 1787)",
        "MOE — Maître d'ŒuvrE : conçoit et coordonne (architecte, BET)",
        "ACMH — Architecte en Chef des Monuments Historiques",
        "ABF — Architecte des Bâtiments de France (champ de 500 m)",
        "SPS — coordonnateur Sécurité & Protection de la Santé",
        "BET — Bureau d'Études Techniques",
      ]},
      { type: "rule", h: "Repères à retenir", items: [
        "Architecte obligatoire dès 150 m² de surface de plancher",
        "Constructeur = art. 1792-1 du Code civil",
        "Groupés solidaires (tout le marché) vs conjoints (par lot)",
        "Bureau de contrôle : avis favorable/défavorable, jamais de solution",
        "Géomètre-expert : bornage et représentation graphique",
      ]},
    ],
  },
  {
    mod: "macte2", title: "Les assurances de la construction", color: "#7a3a51",
    cards: [
      { type: "rule", h: "Les 4 garanties (à partir de la réception)", items: [
        "Parfait achèvement — 1 an (6 mois en public)",
        "Biennale (bon fonctionnement) — 2 ans, équipements dissociables",
        "Décennale — 10 ans, solidité / impropre à destination / indissociables",
        "Dommages-Ouvrage — préfinance, réponse sous 90 jours",
      ]},
      { type: "acronym", h: "DO ⇄ Décennale (loi Spinetta 1978)", items: [
        "DO = assurance de CHOSE (art. L.242-1) → maître d'ouvrage",
        "Décennale = assurance de PERSONNE (art. L.241-1) → entreprise",
        "Même durée : 10 ans à compter de la réception",
        "Extrinsèques : remboursement (5 %, jusqu'à l'ouverture) + livraison (≤ 2 ans)",
      ]},
      { type: "rule", h: "Pièges fréquents", items: [
        "Vice apparent non réservé à la réception = purgé",
        "Dommage intermédiaire = ni biennale ni décennale → RC contractuelle (10 ans)",
        "Cass. 13 avril 1988 : RC de droit commun écartée si biennale/décennale jouent",
      ]},
    ],
  },
  {
    mod: "macte3", title: "Contrats & passation des marchés", color: "#3d6b48",
    cards: [
      { type: "acronym", h: "Le vocabulaire", items: [
        "DCE — Dossier de Consultation des Entreprises",
        "VISA — validation des documents d'exécution par le MOE",
        "MAPA — Marché À Procédure Adaptée (sous les seuils)",
        "Pouvoir adjudicateur — l'acheteur public",
      ]},
      { type: "rule", h: "Règles d'or", items: [
        "Marché public : publicité + mise en concurrence obligatoires",
        "On retient l'offre économiquement la plus avantageuse",
        "En cas de litige : les pièces écrites priment sur les graphiques",
      ]},
    ],
  },
  {
    mod: "macte4", title: "La VEFA — vente sur plan", color: "#c95636",
    cards: [
      { type: "formula", h: "Les seuils chiffrés", items: [
        "Dépôt de garantie : 5 % (≤ 1 an) · 2 % (1-2 ans) · 0 % (> 2 ans)",
        "Appels de fonds : 35 % fondations · 70 % hors d'eau · 95 % achèvement · 5 % livraison",
      ]},
      { type: "acronym", h: "Les garanties", items: [
        "GFA — Garantie Financière d'Achèvement (la phare de la VEFA)",
        "+ Parfait achèvement (1 an), Biennale (2 ans), Décennale (10 ans)",
      ]},
      { type: "rule", h: "Le parcours", items: [
        "Réservation (avant-contrat) → acte notarié → appels de fonds → livraison (PV + réserves)",
        "Retard de livraison : pénalités prévues au contrat",
        "5 % consignables à la livraison en cas de réserves",
      ]},
    ],
  },
]);
