/* ============================================
   LENNY — Bloc 8 · Droit (cours 1.3 → 1.8)
   Ajoute 6 modules de droit : essentiel, fiches, quiz et mémos.
   Chargé APRÈS les fichiers de données de base ; fusionne dans
   window.ESSENTIALS / STUDY / QUIZ / MEMOS sans les écraser.
   Les entrées de module (LENNY_MODULES), couleurs (COLOR_MAP),
   glyphes et secteur "droit" sont câblés dans lenny-app.js /
   lenny-player.js / lenny-router.js.
   ============================================ */
(function () {

  // ---------- ESSENTIEL (à-retenir + frise) ----------
  const ESS = {
    mdsources: {
      retenir: [
        { k: "Droit objectif / droits subjectifs", v: "Ensemble des règles d'une société / prérogatives reconnues aux personnes (« j'ai le droit de… »)" },
        { k: "Droit public / droit privé", v: "Organisation des pouvoirs publics (intérêt général) / rapports entre particuliers (droit civil = droit commun)" },
        { k: "Caractères de la règle de droit", v: "Générale · impersonnelle · obligatoire · coercitive (sanction civile ou pénale)" },
        { k: "Hiérarchie des normes", v: "Constitution (4 oct. 1958) > traités & droit UE > lois (art. 34) > règlements (art. 37)" },
        { k: "Règlement UE / directive", v: "Règlement = effet direct & uniforme · Directive = but à atteindre, transposée en droit national" },
        { k: "Sources directes / indirectes", v: "Loi, règlement, coutume, usages / jurisprudence et doctrine" },
        { k: "Lois impératives / supplétives", v: "Ordre public, non écartables / écartables par volonté contraire (ex. régime matrimonial)" },
        { k: "Non-rétroactivité (art. 2 C. civ.)", v: "« La loi ne dispose que pour l'avenir » · « Nul n'est censé ignorer la loi »" },
      ],
      timeline: [
        { y: "1789", t: "DDHC — art. 6 : « la loi est la même pour tous »" },
        { y: "1804", t: "Code civil — art. 1er et 2 (publication, non-rétroactivité)" },
        { y: "1957", t: "Traité de Rome — fondation du droit communautaire" },
        { y: "1958", t: "Constitution du 4 octobre — séparation des pouvoirs (art. 34 / 37)" },
        { y: "1992", t: "Traité de Maastricht — Union européenne" },
      ],
    },
    mddeonto: {
      retenir: [
        { k: "Source principale", v: "Loi Hoguet (2 janv. 1970) + décret du 20 juillet 1972" },
        { k: "Autres codes applicables", v: "Code de commerce · Code de la consommation · Code de déontologie · RGPD · Tracfin" },
        { k: "Code de déontologie", v: "Décret du 28 août 2015 — 11 articles (probité, moralité, loyauté, transparence…)" },
        { k: "RGPD", v: "En vigueur le 25 mai 2018 · droit à l'oubli · portabilité · consentement explicite" },
        { k: "CNIL", v: "Créée par la loi du 6 janvier 1978 · contrôle & sanctions (jusqu'à plusieurs M€, astreinte 100 000 €/jour)" },
        { k: "Tracfin (LCB-FT)", v: "Déclaration de soupçon obligatoire · lutte anti-blanchiment & financement du terrorisme" },
        { k: "Blanchiment (art. 324-1)", v: "5 ans + 375 000 € · aggravé : 10 ans + 750 000 €" },
        { k: "Organes de contrôle", v: "CNTGI (déontologie) · DGCCRF (enquête) · CNS (sanctions LCB-FT)" },
      ],
      timeline: [
        { y: "1970", t: "Loi Hoguet — encadre les professions de l'immobilier" },
        { y: "1972", t: "Décret d'application du 20 juillet" },
        { y: "1978", t: "Loi Informatique et Libertés — création de la CNIL" },
        { y: "2015", t: "Décret du 28 août — Code de déontologie (11 articles)" },
        { y: "2018", t: "RGPD — entrée en vigueur le 25 mai" },
      ],
    },
    mdjustice: {
      retenir: [
        { k: "Principes du service public", v: "Égalité · continuité · gratuité · prise en compte de l'urgence (référés)" },
        { k: "Deux ordres", v: "Ordre judiciaire (civil / pénal) et ordre administratif" },
        { k: "Réforme Belloubet", v: "23 mars 2019 (effet 1er janv. 2020) : fusion TGI + TI → Tribunal judiciaire" },
        { k: "Juridiction de droit commun", v: "Le tribunal judiciaire — compétence de principe pour toute matière" },
        { k: "Juridictions spécialisées", v: "Tribunal de commerce · conseil de prud'hommes (paritaire) · baux ruraux" },
        { k: "Compétences", v: "D'attribution (nature du litige) et territoriale (ressort = domicile du défendeur)" },
        { k: "Appel", v: "Délai 1 mois · effets dévolutif + suspensif · appelant vs intimé" },
        { k: "Taux de ressort", v: "Litige < 5 000 € : dernier ressort (pas d'appel, seul le pourvoi reste)" },
        { k: "Cour de cassation", v: "Juridiction suprême · pas un 3e degré · contrôle le droit, ne rejuge pas les faits" },
      ],
      timeline: [
        { y: "2019", t: "Réforme « Belloubet » du 23 mars" },
        { y: "2020", t: "1er janvier — entrée en vigueur du tribunal judiciaire" },
      ],
    },
    mdfamille: {
      retenir: [
        { k: "3 modes de conjugalité", v: "Mariage · PACS · concubinage (union libre)" },
        { k: "Mariage — conditions", v: "18 ans révolus · consentement · célébration publique par l'officier d'état civil" },
        { k: "Devoirs conjugaux (art. 212-215)", v: "Fidélité · secours · assistance · communauté de vie" },
        { k: "4 régimes matrimoniaux", v: "Communauté légale réduite aux acquêts (défaut) · séparation de biens · participation aux acquêts · communauté universelle" },
        { k: "PACS (art. 515-1)", v: "Contrat entre 2 majeurs · régime par défaut : séparation des biens (ou indivision)" },
        { k: "Concubinage (art. 515-8)", v: "Union de fait stable et continue · aucun effet juridique imposé" },
        { k: "Dettes ménagères (art. 220)", v: "Solidaires entre époux, sauf dépenses manifestement excessives" },
        { k: "Logement familial (art. 215 / 1751)", v: "Accord des 2 époux impératif · cotitularité du bail d'habitation" },
        { k: "Conjoint survivant", v: "Droit temporaire 1 an (art. 763, ordre public) + droit viager au logement" },
      ],
      timeline: [
        { y: "1804", t: "Code civil — Titre V : du mariage" },
        { y: "1999", t: "Création du PACS (art. 515-1 et s.)" },
        { y: "2006", t: "Droit au logement étendu au partenaire pacsé survivant" },
        { y: "2013", t: "Loi du 17 mai — mariage pour tous (art. 143)" },
      ],
    },
    mdpreuve: {
      retenir: [
        { k: "Adage fondateur", v: "« Pas de droit sans preuve » — un droit non prouvé n'est pas protégé" },
        { k: "5 modes de preuve", v: "Littérale · testimoniale · indices & présomptions · aveu · serment" },
        { k: "Régime de la preuve", v: "Objet (quoi ?) · charge (qui ? art. 1353 → le demandeur) · admissibilité (comment ?)" },
        { k: "Liberté de la preuve", v: "Réforme du 10 fév. 2016 (art. 1358) : preuve par tout moyen, sauf exceptions" },
        { k: "3 présomptions", v: "Simple (renversable par tout moyen) · mixte (preuve limitée) · irréfragable (jamais renversée)" },
        { k: "Preuves parfaites", v: "Acte authentique · acte sous signature privée · aveu judiciaire · serment décisoire · présomptions légales" },
        { k: "Acte authentique", v: "Dressé par officier public · fait foi « jusqu'à inscription de faux »" },
        { k: "Formalité du double (art. 1375)", v: "Autant d'originaux que de parties · écrit électronique admis (loi du 13 mars 2000)" },
        { k: "Seuil des 1 500 €", v: "Au-delà, l'acte juridique se prouve en principe par écrit" },
      ],
      timeline: [
        { y: "2000", t: "Loi du 13 mars — valeur probante de l'écrit électronique" },
        { y: "2016", t: "Ordonnance du 10 février — liberté de la preuve, présomptions" },
      ],
    },
    mdcontrats: {
      retenir: [
        { k: "Contrat (art. 1101)", v: "Accord de volontés créant, modifiant, transmettant ou éteignant des obligations" },
        { k: "3 principes", v: "Liberté contractuelle (1102) · force obligatoire (1103) · bonne foi (1104)" },
        { k: "Validité (art. 1128)", v: "Consentement · capacité · contenu licite et certain" },
        { k: "Vices du consentement", v: "Erreur · dol (tromperie) · violence (art. 1130 à 1133)" },
        { k: "Offre & acceptation", v: "Le silence ne vaut pas acceptation · rétractation 14 j (contrats à distance)" },
        { k: "Lésion immobilière (art. 1674)", v: "Vendeur lésé de + de 7/12e → rescision · délai 2 ans" },
        { k: "Nullité relative / absolue", v: "Protection d'un intérêt privé (confirmable) / intérêt général · prescription 5 ans" },
        { k: "Condition / terme", v: "Condition (futur & incertain : suspensive / résolutoire) · terme (futur & certain : exigibilité)" },
        { k: "Imprévision (art. 1195)", v: "Changement imprévisible rendant l'exécution excessivement onéreuse → renégociation" },
      ],
      timeline: [
        { y: "1804", t: "Code civil — théorie de l'autonomie de la volonté" },
        { y: "2016", t: "Ordonnance du 10 février — réforme du droit des contrats" },
        { y: "2018", t: "Loi de ratification — confirmation de la réforme" },
      ],
    },
  };

  // ---------- FICHES (flashcards) + quiz de secours ----------
  const STU = {
    mdsources: {
      cards: [
        { q: "Qu'est-ce que le Droit ?", a: "L'ensemble des règles qui organisent la vie en société, assorties d'une sanction édictée par l'institution judiciaire." },
        { q: "Droit objectif vs droits subjectifs ?", a: "Droit objectif = l'ensemble des règles applicables dans une société. Droits subjectifs = les prérogatives reconnues aux personnes (« j'ai le droit de… »)." },
        { q: "Qu'est-ce que le droit positif ?", a: "L'ensemble des règles juridiques effectivement en vigueur dans un État à un moment donné — le droit tel qu'il existe réellement." },
        { q: "Les 4 caractères de la règle de droit ?", a: "Générale · impersonnelle (abstraite) · obligatoire · coercitive (sanction civile ou pénale)." },
        { q: "Droit public vs droit privé ?", a: "Public : organisation et fonctionnement des pouvoirs publics (intérêt général). Privé : rapports entre particuliers (le droit civil est le droit commun)." },
        { q: "Que fixe l'article 34 de la Constitution ?", a: "Le domaine de la loi votée par le Parlement : droits civiques, état des personnes, régimes matrimoniaux, impôt, droit du travail…" },
        { q: "Différence loi / ordonnance / règlement ?", a: "Loi : votée par le Parlement (art. 34). Ordonnance : prise par le gouvernement avec autorisation du Parlement (art. 38). Règlement autonome : gouvernement (art. 37)." },
        { q: "Sources directes et indirectes du droit ?", a: "Directes : loi, règlement, coutume, usages. Indirectes : la jurisprudence (décisions de justice) et la doctrine (travaux des juristes, sans force impérative)." },
        { q: "Règlement européen vs directive ?", a: "Le règlement s'applique directement et uniformément (primauté, effet direct). La directive fixe un but à atteindre et doit être transposée en droit national." },
        { q: "Hiérarchie des normes ?", a: "Constitution (1958) > traités et droit de l'UE > lois (art. 34) > règlements (art. 37). Les traités priment sur la loi interne (art. 55)." },
        { q: "Loi impérative vs loi supplétive ?", a: "Impérative (d'ordre public) : on ne peut l'écarter. Supplétive : on peut l'écarter par une volonté contraire (ex. régime matrimonial autre que la communauté légale)." },
        { q: "Le principe de non-rétroactivité ?", a: "Art. 2 du Code civil : « la loi ne dispose que pour l'avenir, elle n'a point d'effet rétroactif » (théorie des droits acquis)." },
        { q: "Que signifie « nul n'est censé ignorer la loi » ?", a: "Une fois la loi promulguée et publiée au Journal officiel, elle est opposable à tous, qu'on en ait eu connaissance ou non." },
        { q: "Le syllogisme judiciaire ?", a: "Raisonnement du juge : majeure (la règle de droit) + mineure (les faits) → conclusion (la décision). Ex. art. 1240 → M. X a blessé M. Y → M. X doit réparer." },
      ],
      quiz: [
        { q: "La Constitution actuelle date du :", c: ["4 octobre 1958", "26 août 1789", "21 mars 1804", "1er janvier 2016"], r: 0 },
        { q: "Une directive européenne :", c: ["s'applique directement", "doit être transposée en droit national", "prime sur la Constitution", "n'a aucune valeur"], r: 1 },
        { q: "La jurisprudence est une source :", c: ["directe", "indirecte", "constitutionnelle", "supranationale"], r: 1 },
      ],
    },
    mddeonto: {
      cards: [
        { q: "Quelle est la source principale des pros de l'immobilier ?", a: "La loi Hoguet du 2 janvier 1970 et son décret d'application du 20 juillet 1972." },
        { q: "Quelles autres sources s'imposent aux professionnels ?", a: "Le Code de commerce, le Code de la consommation, le Code de déontologie, le RGPD et le dispositif Tracfin." },
        { q: "Qu'est-ce qu'une prestation de services ?", a: "Proposer un service à un client contre rémunération, en mettant à disposition une compétence, sans lien de subordination." },
        { q: "Quand le Code de déontologie a-t-il été adopté ?", a: "Par décret du 28 août 2015. Il fixe les règles et devoirs des agents, administrateurs de biens et syndics — 11 articles." },
        { q: "Les obligations clés du Code de déontologie ?", a: "Probité, moralité, loyauté + éthique, respect des lois, compétence, transparence, confidentialité, confraternité, règlement des litiges." },
        { q: "Quand le RGPD est-il entré en vigueur ?", a: "Le 25 mai 2018. Il encadre la collecte, l'exploitation et la conservation des données personnelles à l'échelle européenne." },
        { q: "Qu'est-ce qu'une donnée personnelle ?", a: "Toute information permettant d'identifier une personne physique, directement ou indirectement (nom, adresse IP, téléphone, email…)." },
        { q: "Le droit à l'oubli ?", a: "Le droit, pour un client, de demander par simple mail l'effacement de ses données personnelles (aussi appelé droit à l'effacement)." },
        { q: "Qu'est-ce que la CNIL ?", a: "Commission Nationale de l'Informatique et des Libertés, créée par la loi du 6 janvier 1978. Elle veille à la protection des données et dispose d'un pouvoir de contrôle et de sanction." },
        { q: "Sanctions possibles de la CNIL ?", a: "Avertissement, mise en demeure, astreinte jusqu'à 100 000 €/jour, amende administrative pouvant atteindre plusieurs millions d'euros." },
        { q: "Qu'est-ce que Tracfin ?", a: "Service de renseignement financier (LCB-FT) sous l'autorité des ministères économiques, qui lutte contre le blanchiment et le financement du terrorisme via les déclarations de soupçon." },
        { q: "Définition du blanchiment (art. 324-1) ?", a: "Faciliter la justification mensongère de l'origine de biens ou revenus issus d'un crime ou délit. Puni de 5 ans + 375 000 € (10 ans + 750 000 € si aggravé)." },
        { q: "Peine du financement du terrorisme ?", a: "10 ans d'emprisonnement et 225 000 € d'amende (art. 421-2-2 du Code pénal)." },
        { q: "Quels sont les 3 organes de tutelle et de contrôle ?", a: "CNTGI (garant de la déontologie), DGCCRF (enquête sur le respect de la loi Hoguet) et CNS (sanctions en matière de LCB-FT)." },
      ],
      quiz: [
        { q: "Le Code de déontologie compte :", c: ["7 articles", "11 articles", "15 articles", "20 articles"], r: 1 },
        { q: "Le RGPD est entré en vigueur le :", c: ["6 janvier 1978", "2 janvier 1970", "25 mai 2018", "28 août 2015"], r: 2 },
        { q: "Le blanchiment simple est puni de :", c: ["2 ans + 150 000 €", "5 ans + 375 000 €", "10 ans + 750 000 €", "1 an + 75 000 €"], r: 1 },
      ],
    },
    mdjustice: {
      cards: [
        { q: "Qu'est-ce qu'un litige ?", a: "Un différend présentant un caractère juridique entre deux sujets à propos d'un droit — un désaccord de volonté sur un objet donné." },
        { q: "Les principes du service public de la justice ?", a: "Égalité (même justice pour tous), continuité (saisine à tout moment), gratuité, et prise en compte de l'urgence (référés)." },
        { q: "Qu'est-ce qu'une juridiction ?", a: "L'organe dont l'objectif est de trancher les contestations nées de l'application des règles de droit." },
        { q: "Les deux ordres de juridiction ?", a: "L'ordre judiciaire (litiges civils et pénaux) et l'ordre administratif. L'ordre judiciaire compte deux degrés." },
        { q: "Compétence d'attribution vs territoriale ?", a: "Attribution : déterminée par la nature du litige. Territoriale : déterminée par le lieu (le « ressort » — en principe le domicile du défendeur)." },
        { q: "Qu'a changé la réforme Belloubet ?", a: "Réforme du 23 mars 2019 (effet 1er janv. 2020) : fusion du TGI et du TI en un Tribunal judiciaire, juridiction de droit commun." },
        { q: "Qu'est-ce que le tribunal de proximité ?", a: "Une chambre détachée du tribunal judiciaire, située dans une autre commune, qui reprend les compétences de l'ancien tribunal d'instance." },
        { q: "Les principales juridictions spécialisées ?", a: "Tribunal de commerce (litiges entre commerçants), conseil de prud'hommes (contrat de travail, paritaire), tribunal des baux ruraux." },
        { q: "Le rôle du juge des contentieux de la protection ?", a: "Tutelle des majeurs, expulsions, baux d'habitation, crédit à la consommation et surendettement des particuliers." },
        { q: "Qu'est-ce que l'appel ?", a: "La voie de recours devant la cour d'appel qui rejuge l'affaire en faits et en droit. Délai : 1 mois. Effets dévolutif et suspensif." },
        { q: "Appelant et intimé ?", a: "L'appelant est la partie qui fait appel (demanderesse en appel) ; l'intimé est son adversaire (défendeur en appel)." },
        { q: "Qu'est-ce que le taux de ressort ?", a: "Le seuil sous lequel un appel n'est pas possible : pour un litige inférieur à 5 000 €, la décision est rendue en dernier ressort." },
        { q: "Le rôle de la Cour de cassation ?", a: "Juridiction suprême — elle n'est pas un 3e degré et ne rejuge pas les faits. Elle contrôle la conformité au droit des décisions via le pourvoi." },
      ],
      quiz: [
        { q: "La réforme Belloubet a fusionné le TGI et le TI en :", c: ["cour d'appel", "tribunal judiciaire", "tribunal de commerce", "cour de cassation"], r: 1 },
        { q: "Le délai pour faire appel est de :", c: ["15 jours", "1 mois", "2 mois", "3 mois"], r: 1 },
        { q: "En dessous de quel montant n'y a-t-il pas d'appel possible ?", c: ["1 500 €", "4 000 €", "5 000 €", "10 000 €"], r: 2 },
      ],
    },
    mdfamille: {
      cards: [
        { q: "Les 3 modes de conjugalité ?", a: "Le mariage, le PACS (pacte civil de solidarité) et le concubinage (union libre)." },
        { q: "Conditions de fond et d'âge du mariage ?", a: "Le consentement est la principale condition de fond ; le mariage ne peut être contracté avant 18 ans révolus (art. 144)." },
        { q: "Quelle loi a ouvert le mariage aux personnes de même sexe ?", a: "La loi du 17 mai 2013 (art. 143 : « deux personnes de sexe différent ou de même sexe »)." },
        { q: "Les devoirs conjugaux (art. 212 et 215) ?", a: "Fidélité, secours, assistance et communauté de vie (cohabitation)." },
        { q: "Définition du PACS (art. 515-1) ?", a: "Un contrat conclu entre deux personnes physiques majeures, de sexe différent ou de même sexe, pour organiser leur vie commune." },
        { q: "Définition du concubinage (art. 515-8) ?", a: "Une union de fait, stable et continue, entre deux personnes vivant en couple. C'est une situation de fait sans effet juridique imposé." },
        { q: "Les 4 régimes matrimoniaux ?", a: "Communauté légale réduite aux acquêts (régime par défaut), séparation de biens, participation aux acquêts, communauté universelle." },
        { q: "Régime patrimonial par défaut du PACS ?", a: "La séparation des patrimoines (chacun garde ses biens). Les partenaires peuvent opter pour l'indivision." },
        { q: "Les dettes ménagères solidaires (art. 220) ?", a: "Chaque époux peut engager seul les dépenses d'entretien du ménage ; la dette oblige l'autre solidairement (sauf dépenses manifestement excessives)." },
        { q: "La protection du logement familial (art. 215) ?", a: "Un époux ne peut disposer seul des droits assurant le logement de la famille ; l'accord des deux est impératif, même si un seul est propriétaire." },
        { q: "Qu'est-ce que la cotitularité du bail (art. 1751) ?", a: "Le bail du logement familial est réputé appartenir aux deux époux, peu importe qui l'a signé et même s'il est antérieur au mariage." },
        { q: "Le droit temporaire au logement du conjoint survivant ?", a: "Art. 763 : jouissance gratuite du logement (et du mobilier) pendant 1 an après le décès. C'est un droit d'ordre public." },
        { q: "Le droit viager au logement ?", a: "Le conjoint survivant peut, dans l'année du décès, demander un droit d'habitation à vie si le logement appartenait aux deux époux ou au défunt." },
      ],
      quiz: [
        { q: "Le régime matrimonial par défaut est :", c: ["la séparation de biens", "la communauté universelle", "la communauté légale réduite aux acquêts", "la participation aux acquêts"], r: 2 },
        { q: "Le régime par défaut du PACS est :", c: ["l'indivision", "la séparation des patrimoines", "la communauté", "aucun"], r: 1 },
        { q: "La cotitularité du bail familial est prévue à l'article :", c: ["220", "515-1", "1751", "763"], r: 2 },
      ],
    },
    mdpreuve: {
      cards: [
        { q: "Que signifie l'adage « pas de droit sans preuve » ?", a: "Un droit qui n'est pas prouvé n'est pas protégé : pour faire respecter son droit, il faut pouvoir en apporter la preuve." },
        { q: "Les 2 particularités de la preuve juridique ?", a: "Elle est judiciaire (destinée à informer le juge) et réglementée (encadrée par des règles, au-delà de la simple vérité)." },
        { q: "Les 5 modes de preuve du Code civil ?", a: "La preuve littérale, testimoniale, par indices et présomptions, l'aveu et le serment." },
        { q: "Les 3 questions du régime de la preuve ?", a: "Que prouver (objet) ? Qui prouve (charge) ? Comment prouver (admissibilité des moyens) ?" },
        { q: "Qui supporte la charge de la preuve (art. 1353) ?", a: "Le demandeur (celui qui réclame l'exécution d'une obligation). Réciproquement, qui se prétend libéré doit prouver le paiement ou l'extinction." },
        { q: "Le principe de liberté de la preuve ?", a: "Depuis la réforme du 10 février 2016 (art. 1358), la preuve peut être apportée par tout moyen, sauf lorsque la loi en dispose autrement." },
        { q: "Présomption simple, mixte, irréfragable ?", a: "Simple : renversable par tout moyen. Mixte : contestable mais par des moyens limités. Irréfragable : ne peut jamais être renversée." },
        { q: "Les modes de preuve parfaits ?", a: "L'acte authentique, l'acte sous signature privée, l'aveu judiciaire, le serment décisoire et les présomptions légales. Ils lient le juge." },
        { q: "Qu'est-ce qu'un acte authentique ?", a: "Un acte dressé par un officier public compétent (ex. notaire). Il fait foi « jusqu'à inscription de faux »." },
        { q: "L'acte sous signature privée ?", a: "Un acte établi par les parties elles-mêmes, sous leur seule signature. Il ne fait foi que jusqu'à preuve contraire." },
        { q: "La formalité du double (art. 1375) ?", a: "Un acte constatant un contrat synallagmatique doit être rédigé en autant d'originaux qu'il existe de parties." },
        { q: "La valeur de l'écrit électronique ?", a: "Loi du 13 mars 2000 (art. 1366) : même force probante que le papier si l'auteur est identifié et l'intégrité du document garantie." },
        { q: "Le seuil des 1 500 € ?", a: "Au-delà de 1 500 €, les actes juridiques se prouvent en principe par écrit (exclus de la liberté de la preuve)." },
      ],
      quiz: [
        { q: "La charge de la preuve incombe en principe :", c: ["au défendeur", "au demandeur", "au juge", "au témoin"], r: 1 },
        { q: "Un acte authentique fait foi :", c: ["jusqu'à preuve contraire", "jusqu'à inscription de faux", "sans aucune contestation", "uniquement entre les parties"], r: 1 },
        { q: "La présomption qui ne peut jamais être renversée est dite :", c: ["simple", "mixte", "irréfragable", "légale"], r: 2 },
      ],
    },
    mdcontrats: {
      cards: [
        { q: "Qu'est-ce qu'une obligation ?", a: "Un lien de droit unissant deux personnes : le créancier peut exiger du débiteur une prestation ou une abstention. C'est un droit personnel." },
        { q: "Définition du contrat (art. 1101) ?", a: "Un accord de volontés entre deux ou plusieurs personnes, destiné à créer, modifier, transmettre ou éteindre des obligations." },
        { q: "Les 3 principes généraux du droit des contrats ?", a: "La liberté contractuelle (art. 1102), la force obligatoire des contrats (art. 1103) et l'exigence de bonne foi (art. 1104)." },
        { q: "Que signifie la force obligatoire (art. 1103) ?", a: "« Les contrats légalement formés tiennent lieu de loi à ceux qui les ont faits » : le contrat est intangible et irrévocable unilatéralement." },
        { q: "L'obligation d'information précontractuelle (art. 1112-1) ?", a: "La partie qui connaît une information déterminante pour l'autre doit l'en informer. Cette obligation est d'ordre public." },
        { q: "Comment se forme le contrat (art. 1113) ?", a: "Par la rencontre d'une offre et d'une acceptation. Le silence ne vaut pas acceptation ; le contrat est conclu dès que l'acceptation parvient à l'offrant." },
        { q: "Les 3 conditions de validité (art. 1128) ?", a: "Le consentement des parties, leur capacité de contracter, et un contenu licite et certain." },
        { q: "Les vices du consentement ?", a: "L'erreur, le dol (tromperie) et la violence (art. 1130 à 1133). Ils permettent de contester voire d'annuler le contrat." },
        { q: "Qu'est-ce que la lésion immobilière (art. 1674) ?", a: "Lorsque le vendeur d'un immeuble n'a pas reçu les 7/12e de sa valeur, il peut demander la rescision (annulation) dans un délai de 2 ans." },
        { q: "Nullité relative vs nullité absolue ?", a: "Relative : protège un intérêt privé (consentement vicié, incapacité), confirmable. Absolue : protège l'intérêt général. Prescription : 5 ans." },
        { q: "Condition suspensive vs résolutoire ?", a: "Suspensive : son accomplissement fait naître l'obligation (ex. obtention du prêt). Résolutoire : son accomplissement éteint l'obligation." },
        { q: "Différence entre condition et terme ?", a: "La condition (futur et incertain) affecte l'existence de l'obligation ; le terme (futur et certain) n'affecte que son exigibilité." },
        { q: "Qu'est-ce que l'imprévision (art. 1195) ?", a: "Un changement de circonstances imprévisible rendant l'exécution excessivement onéreuse : la partie peut demander une renégociation du contrat." },
        { q: "L'effet relatif des contrats (art. 1165) ?", a: "Les conventions n'ont d'effet qu'entre les parties : elles ne peuvent ni nuire ni profiter aux tiers (avec des exceptions)." },
      ],
      quiz: [
        { q: "Les conditions de validité d'un contrat (art. 1128) sont :", c: ["consentement, capacité, contenu licite et certain", "offre, acceptation, prix", "écrit, signature, date", "objet, cause, forme"], r: 0 },
        { q: "La lésion permet la rescision d'une vente immobilière si le vendeur est lésé de plus de :", c: ["1/4", "la moitié", "7/12e", "9/10e"], r: 2 },
        { q: "Le silence du destinataire d'une offre :", c: ["vaut acceptation", "ne vaut pas acceptation", "vaut refus définitif", "vaut contre-proposition"], r: 1 },
      ],
    },
  };

  // ---------- QUIZ détaillé (onglet Quiz) ----------
  const QZ = {
    mdsources: [
      { q: "La Constitution française actuelle date du :", c: ["4 octobre 1958", "26 août 1789", "21 mars 1804", "10 juillet 1965"], r: 0, e: "La Constitution de la Ve République a été adoptée le 4 octobre 1958. Elle organise la séparation des pouvoirs (art. 34 pour la loi, art. 37 pour le règlement)." },
      { q: "Une directive de l'Union européenne :", c: ["s'applique directement et uniformément", "fixe un but à atteindre et doit être transposée", "prime sur la Constitution", "n'a aucune portée juridique"], r: 1, e: "Contrairement au règlement (effet direct), la directive est un outil d'harmonisation : elle fixe un objectif et laisse aux États le choix des moyens pour l'atteindre." },
      { q: "La jurisprudence est une source du droit :", c: ["directe", "indirecte", "constitutionnelle", "internationale"], r: 1, e: "La jurisprudence (décisions de justice) et la doctrine (travaux des juristes) sont des sources indirectes. Les sources directes sont la loi, le règlement, la coutume et les usages." },
      { q: "Le principe de non-rétroactivité figure à l'article :", c: ["1er du Code civil", "2 du Code civil", "6 de la DDHC", "34 de la Constitution"], r: 1, e: "Art. 2 du Code civil : « la loi ne dispose que pour l'avenir, elle n'a point d'effet rétroactif. » Ce principe protège les droits acquis." },
      { q: "Une loi supplétive est une loi que l'on peut :", c: ["jamais écarter", "écarter par une volonté contraire", "appliquer rétroactivement", "voter sans le Parlement"], r: 1, e: "Les lois supplétives s'appliquent à défaut de volonté contraire (ex. le régime de la communauté légale, écartable par contrat de mariage). Les lois impératives (d'ordre public) ne peuvent jamais être écartées." },
      { q: "Les ordonnances sont prises par :", c: ["le Parlement seul", "le gouvernement avec l'autorisation du Parlement (art. 38)", "le Conseil constitutionnel", "les magistrats"], r: 1, e: "L'article 38 permet au gouvernement de légiférer par ordonnance, dans le domaine de la loi, pour un délai limité — c'est le système législatif « dans l'urgence »." },
    ],
    mddeonto: [
      { q: "La source principale des professionnels de l'immobilier est :", c: ["le Code de la consommation", "la loi Hoguet du 2 janvier 1970", "le RGPD", "la loi ALUR"], r: 1, e: "La loi Hoguet (2 janv. 1970) et son décret du 20 juillet 1972 encadrent l'accès et l'exercice des activités immobilières." },
      { q: "Le Code de déontologie a été adopté par décret du :", c: ["6 janvier 1978", "28 août 2015", "25 mai 2018", "20 juillet 1972"], r: 1, e: "Le décret du 28 août 2015 fixe les 11 articles du Code de déontologie des professions de l'immobilier (probité, transparence, confraternité…)." },
      { q: "Le RGPD est entré en vigueur le :", c: ["25 mai 2018", "6 janvier 1978", "2 janvier 1970", "1er juillet 2021"], r: 0, e: "Le Règlement Général sur la Protection des Données s'applique depuis le 25 mai 2018 à l'échelle de l'Union européenne." },
      { q: "La CNIL a été créée par la loi du :", c: ["6 janvier 1978", "28 août 2015", "2 janvier 1970", "13 mars 2000"], r: 0, e: "La loi Informatique et Libertés du 6 janvier 1978 a créé la CNIL, chargée de la protection des données et dotée d'un pouvoir de contrôle et de sanction." },
      { q: "Le blanchiment de capitaux (art. 324-1) est puni de :", c: ["2 ans + 150 000 €", "5 ans + 375 000 €", "10 ans + 1 M€", "1 an + 75 000 €"], r: 1, e: "Le blanchiment simple : 5 ans d'emprisonnement et 375 000 € d'amende. Aggravé (habituel, bande organisée) : 10 ans et 750 000 €." },
      { q: "Quel organe sanctionne les manquements à la LCB-FT ?", c: ["le CNTGI", "la DGCCRF", "la CNS", "la CNIL"], r: 2, e: "La Commission Nationale des Sanctions (CNS) sanctionne les manquements en matière de lutte contre le blanchiment et le financement du terrorisme. Le CNTGI veille à la déontologie ; la DGCCRF enquête." },
    ],
    mdjustice: [
      { q: "La réforme « Belloubet » de 2019 a créé :", c: ["la cour d'appel", "le tribunal judiciaire (fusion TGI + TI)", "le tribunal de commerce", "le conseil de prud'hommes"], r: 1, e: "Depuis le 1er janvier 2020, le TGI et le TI fusionnent en un tribunal judiciaire, juridiction de droit commun pour toute matière." },
      { q: "Le conseil de prud'hommes tranche les litiges relatifs :", c: ["au commerce", "au contrat de travail", "aux baux ruraux", "à la copropriété"], r: 1, e: "Le conseil de prud'hommes est une juridiction paritaire (salariés/employeurs) compétente pour la formation, l'exécution et la rupture du contrat de travail." },
      { q: "Le délai pour interjeter appel est de :", c: ["15 jours", "1 mois", "2 mois", "6 mois"], r: 1, e: "L'appel se forme dans un délai d'un mois à compter de la signification du jugement. Il a un effet dévolutif (l'affaire est rejugée) et suspensif." },
      { q: "En dessous de quel montant la décision est-elle rendue en dernier ressort ?", c: ["1 500 €", "4 000 €", "5 000 €", "10 000 €"], r: 2, e: "Pour un litige inférieur à 5 000 €, le tribunal statue en dernier ressort : pas d'appel possible, seul le pourvoi en cassation demeure ouvert." },
      { q: "La Cour de cassation :", c: ["est un troisième degré de juridiction", "rejuge les faits", "contrôle la conformité au droit des décisions", "remplace la cour d'appel"], r: 2, e: "La Cour de cassation est la juridiction suprême. Elle ne rejuge pas les faits : elle contrôle l'application du droit et favorise l'unité d'interprétation." },
      { q: "La partie qui fait appel est appelée :", c: ["l'intimé", "l'appelant", "le demandeur", "le défendeur"], r: 1, e: "L'appelant est la partie qui fait appel ; son adversaire est l'intimé (défendeur en appel)." },
    ],
    mdfamille: [
      { q: "Le mariage ne peut être contracté avant :", c: ["16 ans", "18 ans révolus", "21 ans", "la majorité du plus jeune"], r: 1, e: "L'article 144 du Code civil fixe l'âge minimum du mariage à 18 ans révolus pour les deux époux." },
      { q: "Le régime matrimonial par défaut est :", c: ["la séparation de biens", "la communauté universelle", "la communauté légale réduite aux acquêts", "la participation aux acquêts"], r: 2, e: "À défaut de contrat de mariage, les époux sont soumis à la communauté légale réduite aux acquêts (art. 1400). Trois autres régimes peuvent être choisis par contrat." },
      { q: "Le régime patrimonial par défaut du PACS est :", c: ["l'indivision", "la communauté", "la séparation des patrimoines", "la communauté universelle"], r: 2, e: "Sauf convention contraire, chaque partenaire conserve l'administration et la libre disposition de ses biens (séparation des patrimoines). L'indivision est optionnelle." },
      { q: "La protection du logement familial impose (art. 215) :", c: ["l'accord d'un seul époux", "l'accord des deux époux", "l'accord du notaire", "rien de particulier"], r: 1, e: "Aucun époux ne peut disposer seul des droits assurant le logement de la famille, même s'il en est le seul propriétaire : l'accord des deux est impératif." },
      { q: "La cotitularité du bail familial est prévue à l'article :", c: ["220", "515-1", "763", "1751"], r: 3, e: "L'article 1751 institue une cotitularité du bail d'habitation servant de logement à la famille, quel que soit le régime matrimonial." },
      { q: "Le concubinage (art. 515-8) crée :", c: ["des devoirs de fidélité et de secours", "une solidarité des dettes", "aucun statut ni obligation imposés", "un régime de communauté"], r: 2, e: "Le concubinage est une simple situation de fait : le droit n'y attache aucun devoir (ni fidélité, ni secours, ni contribution aux charges)." },
    ],
    mdpreuve: [
      { q: "La charge de la preuve incombe en principe (art. 1353) :", c: ["au juge", "au demandeur", "au défendeur", "au témoin"], r: 1, e: "C'est à celui qui réclame l'exécution d'une obligation de la prouver. Réciproquement, celui qui se prétend libéré doit justifier le paiement ou l'extinction." },
      { q: "Depuis la réforme de 2016, le principe est :", c: ["la preuve par écrit uniquement", "la liberté de la preuve", "la preuve par témoins", "l'absence de preuve"], r: 1, e: "L'article 1358 pose la liberté de la preuve : « hors les cas où la loi en dispose autrement, la preuve peut être apportée par tout moyen »." },
      { q: "Un acte authentique fait foi :", c: ["jusqu'à preuve contraire", "jusqu'à inscription de faux", "sans contestation possible", "seulement entre les parties"], r: 1, e: "Dressé par un officier public (ex. notaire), l'acte authentique fait foi « jusqu'à inscription de faux ». L'acte sous signature privée ne fait foi que jusqu'à preuve contraire." },
      { q: "La présomption qui ne peut jamais être renversée est dite :", c: ["simple", "mixte", "irréfragable", "judiciaire"], r: 2, e: "La présomption irréfragable est la plus forte : elle s'impose absolument, même face à une preuve contraire (ex. art. 312 sur la filiation)." },
      { q: "L'écrit électronique a valeur probante depuis la loi du :", c: ["13 mars 2000", "10 février 2016", "6 janvier 1978", "2 janvier 1970"], r: 0, e: "La loi du 13 mars 2000 a reconnu à l'écrit électronique la même force probante que le papier, sous réserve d'identification de l'auteur et d'intégrité du document (art. 1366)." },
      { q: "Au-delà de quel montant un acte juridique se prouve en principe par écrit ?", c: ["800 €", "1 500 €", "5 000 €", "10 000 €"], r: 1, e: "Les actes juridiques d'un montant supérieur à 1 500 € sont en principe exclus de la liberté de la preuve et doivent être prouvés par écrit." },
    ],
    mdcontrats: [
      { q: "Le contrat est défini (art. 1101) comme :", c: ["un acte unilatéral", "un accord de volontés créant des obligations", "une décision de justice", "une loi"], r: 1, e: "Le contrat est un accord de volontés entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations." },
      { q: "Quel n'est PAS l'un des 3 grands principes du droit des contrats ?", c: ["la liberté contractuelle", "la force obligatoire", "la bonne foi", "la gratuité"], r: 3, e: "Les 3 principes sont : liberté contractuelle (art. 1102), force obligatoire (art. 1103) et bonne foi (art. 1104)." },
      { q: "Les conditions de validité d'un contrat (art. 1128) sont :", c: ["offre, acceptation et prix", "consentement, capacité, contenu licite et certain", "écrit, date et signature", "objet, cause et forme"], r: 1, e: "L'article 1128 exige le consentement des parties, leur capacité de contracter et un contenu licite et certain." },
      { q: "Le silence du destinataire d'une offre :", c: ["vaut acceptation", "ne vaut pas acceptation", "vaut refus", "vaut contre-proposition"], r: 1, e: "Le principe est que le silence ne vaut pas acceptation. L'acceptation doit être explicite ou résulter d'un comportement non équivoque." },
      { q: "La rescision pour lésion d'une vente immobilière (art. 1674) suppose une lésion de plus de :", c: ["1/4", "la moitié", "7/12e", "9/10e"], r: 2, e: "Le vendeur lésé de plus des 7/12e de la valeur de l'immeuble peut demander la rescision (annulation), dans un délai de 2 ans à partir de la vente." },
      { q: "La nullité absolue protège :", c: ["un intérêt privé", "l'intérêt général", "le seul vendeur", "le seul acquéreur"], r: 1, e: "La nullité absolue sanctionne l'absence d'un élément essentiel et protège l'intérêt général : elle peut être demandée par toute personne intéressée et le ministère public. La nullité relative protège un intérêt privé." },
    ],
  };

  // ---------- MÉMOS ----------
  const MEM = [
    {
      mod: "mdsources", title: "Les Sources du Droit", color: "#2f5d7a",
      cards: [
        { type: "rule", h: "Hiérarchie des normes", items: [
          "1. Constitution (4 oct. 1958)",
          "2. Traités & droit de l'UE (priment sur la loi)",
          "3. Lois (art. 34) & ordonnances (art. 38)",
          "4. Règlements autonomes (art. 37)",
          "5. Décrets & arrêtés (application)",
        ]},
        { type: "rule", h: "Sources du droit", items: [
          "Directes — loi, règlement, coutume, usages",
          "Indirectes — jurisprudence, doctrine",
          "Droit négocié — conventions collectives",
        ]},
        { type: "acronym", h: "UE — règlement vs directive", items: [
          "Règlement — effet direct, uniforme, obligatoire",
          "Directive — but à atteindre, transposée",
        ]},
        { type: "rule", h: "Réflexes d'examen", items: [
          "Loi impérative = ordre public (non écartable)",
          "Loi supplétive = écartable par volonté contraire",
          "Art. 2 C. civ. — non-rétroactivité de la loi",
        ]},
      ],
    },
    {
      mod: "mddeonto", title: "Sources applicables aux pros", color: "#7a3a51",
      cards: [
        { type: "rule", h: "Les sources", items: [
          "Loi Hoguet (2 janv. 1970) + décret 20 juil. 1972",
          "Codes commerce & consommation",
          "Code de déontologie (28 août 2015)",
          "RGPD (25 mai 2018) · Tracfin (LCB-FT)",
        ]},
        { type: "rule", h: "Sanctions du blanchiment", items: [
          "Blanchiment simple — 5 ans + 375 000 €",
          "Aggravé — 10 ans + 750 000 €",
          "Financement du terrorisme — 10 ans + 225 000 €",
        ]},
        { type: "acronym", h: "Organes de contrôle", items: [
          "CNTGI — garant de la déontologie",
          "DGCCRF — enquête (loi Hoguet)",
          "CNS — sanctions LCB-FT",
          "CNIL — protection des données",
        ]},
      ],
    },
    {
      mod: "mdjustice", title: "L'Organisation Judiciaire", color: "#8a3520",
      cards: [
        { type: "rule", h: "Principes du service public", items: [
          "Égalité — même justice pour tous",
          "Continuité — saisine à tout moment",
          "Gratuité",
          "Urgence — procédure des référés",
        ]},
        { type: "rule", h: "Réforme Belloubet (2019 → 2020)", items: [
          "Fusion TGI + TI → Tribunal judiciaire",
          "Tribunal de proximité (chambre détachée)",
          "Droit commun : le tribunal judiciaire",
        ]},
        { type: "acronym", h: "Juridictions spécialisées", items: [
          "Tribunal de commerce — commerçants",
          "Conseil de prud'hommes — contrat de travail (paritaire)",
          "Tribunal des baux ruraux",
        ]},
        { type: "rule", h: "Voies de recours", items: [
          "Appel — délai 1 mois (dévolutif + suspensif)",
          "Taux de ressort — < 5 000 € : pas d'appel",
          "Cour de cassation — contrôle le droit, pas les faits",
        ]},
      ],
    },
    {
      mod: "mdfamille", title: "Régimes matrimoniaux & PACS", color: "#c95636",
      cards: [
        { type: "rule", h: "4 régimes matrimoniaux", items: [
          "Communauté légale réduite aux acquêts (défaut)",
          "Séparation de biens",
          "Participation aux acquêts",
          "Communauté universelle",
        ]},
        { type: "acronym", h: "Devoirs conjugaux (art. 212-215)", items: [
          "Fidélité",
          "Secours",
          "Assistance",
          "Communauté de vie",
        ]},
        { type: "rule", h: "Mariage / PACS / concubinage", items: [
          "PACS — séparation des patrimoines par défaut",
          "Concubinage (515-8) — aucun statut imposé",
          "Logement familial — accord des 2 époux (art. 215)",
          "Cotitularité du bail (art. 1751)",
        ]},
        { type: "rule", h: "Conjoint survivant", items: [
          "Droit temporaire — 1 an, gratuit (art. 763)",
          "Droit viager — à demander dans l'année",
        ]},
      ],
    },
    {
      mod: "mdpreuve", title: "Le Droit de la Preuve", color: "#b58430",
      cards: [
        { type: "rule", h: "5 modes de preuve", items: [
          "Littérale (écrit)",
          "Testimoniale (témoignage)",
          "Indices & présomptions",
          "Aveu",
          "Serment",
        ]},
        { type: "acronym", h: "Régime — 3 questions", items: [
          "Objet — que prouver ?",
          "Charge — qui prouve ? (art. 1353 : le demandeur)",
          "Admissibilité — comment ? (art. 1358 : tout moyen)",
        ]},
        { type: "rule", h: "Présomptions", items: [
          "Simple — renversable par tout moyen",
          "Mixte — preuve contraire limitée",
          "Irréfragable — jamais renversée",
        ]},
        { type: "rule", h: "Preuves parfaites", items: [
          "Acte authentique — « jusqu'à inscription de faux »",
          "Acte sous signature privée — preuve contraire",
          "Aveu judiciaire · serment décisoire",
          "Acte > 1 500 € → preuve par écrit",
        ]},
      ],
    },
    {
      mod: "mdcontrats", title: "Le Droit des Contrats", color: "#3d6b48",
      cards: [
        { type: "acronym", h: "3 principes (art. 1102-1104)", items: [
          "Liberté contractuelle",
          "Force obligatoire (« tiennent lieu de loi »)",
          "Bonne foi",
        ]},
        { type: "rule", h: "Validité (art. 1128)", items: [
          "Consentement (sans erreur, dol, violence)",
          "Capacité de contracter",
          "Contenu licite et certain",
        ]},
        { type: "rule", h: "Sanctions & nullités", items: [
          "Nullité relative — intérêt privé, confirmable",
          "Nullité absolue — intérêt général",
          "Prescription — 5 ans",
          "Lésion immobilière — + de 7/12e (rescision, 2 ans)",
        ]},
        { type: "rule", h: "Modalités de l'obligation", items: [
          "Condition — futur & incertain (suspensive / résolutoire)",
          "Terme — futur & certain (exigibilité)",
          "Imprévision (art. 1195) — renégociation",
        ]},
      ],
    },
  ];

  // ---------- Fusion dans les globals ----------
  window.ESSENTIALS = Object.assign(window.ESSENTIALS || {}, ESS);
  window.STUDY = Object.assign(window.STUDY || {}, STU);
  window.QUIZ = Object.assign(window.QUIZ || {}, QZ);
  window.MEMOS = (window.MEMOS || []).concat(MEM);
})();
