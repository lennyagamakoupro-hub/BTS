/* ============================================
   LENNY — landing page interactions & data
   ============================================ */

// Modules mirrored from data.js, enriched for the landing
const LENNY_MODULES = [
  { id: "m1",  num: "01",  short: "Accueil",      title: "Accueil & Découverte",        tag: "Module 1",     time: 8,  color: "m1",   symbol: "①", glyph: "ouverture",
    quote: "Premier contact — l'art de l'accueil",
    desc: "Posture, écoute active, découverte des besoins. Les fondations du métier d'agent immobilier.",
    pct: 92, season: "S1" },
  { id: "m2",  num: "02",  short: "Entreprises",  title: "Entreprises & Statuts",       tag: "Module 2",     time: 12, color: "m2",   symbol: "②", glyph: "fondations",
    quote: "EI · SARL · SAS · SA — choisir sa forme",
    desc: "Statuts juridiques, responsabilités, régimes fiscaux. Le squelette de toute entreprise.",
    pct: 88, season: "S1" },
  { id: "mdroit", num: "D", short: "Professions", title: "Les Professions de l'Immobilier", tag: "Droit", time: 20, color: "mdroit", symbol: "§", glyph: "balance",
    quote: "Loi Hoguet 1970 — la clé d'entrée du métier",
    desc: "Loi Hoguet, ALUR, ELAN. Professionnels visés, carte professionnelle, garantie financière, RCP. Mandats : types, validité, durée, rémunération, collaborateurs et obligations. Tout le cadre juridique de la profession.",
    pct: 90, season: "S1" },
  { id: "mprop", num: "P", short: "Propriété", title: "La Propriété Immobilière", tag: "Droit", time: 12, color: "mprop", symbol: "⌂", glyph: "propriete",
    quote: "Usus, fructus, abusus — le droit le plus absolu",
    desc: "Le droit de propriété (art. 17 DDHC, art. 544 Code civil). Définition et démembrement (usufruit / nue-propriété), les 3 caractères (absolu, exclusif, perpétuel) et l'étendue horizontale et verticale du bien.",
    pct: 88, season: "S1" },
  { id: "mdsources", num: "1.3", short: "Sources du droit", title: "Les Sources du Droit", tag: "Droit", time: 14, color: "m8", symbol: "§", glyph: "hierarchie",
    quote: "De la Constitution au règlement — la hiérarchie des normes",
    desc: "Droit objectif et droits subjectifs, droit public/privé, la règle de droit et ses caractères. Les sources nationales (Constitution de 1958, lois de l'article 34, ordonnances, règlements) et internationales (traités, droit de l'UE : règlement vs directive). Application et interprétation de la loi.",
    pct: 88, season: "S1" },
  { id: "mddeonto", num: "1.4", short: "Sources pro", title: "Les Sources Applicables aux Pros", tag: "Droit", time: 16, color: "m5", symbol: "✓", glyph: "deonto",
    quote: "Loi Hoguet, déontologie, RGPD et Tracfin",
    desc: "La loi Hoguet (2 janv. 1970) et les autres sources : Code de commerce et de la consommation, Code de déontologie (11 articles), RGPD et CNIL, dispositif Tracfin (LCB-FT, blanchiment, déclaration de soupçon). Les organes de contrôle : CNTGI, DGCCRF, CNS.",
    pct: 87, season: "S1" },
  { id: "mdjustice", num: "1.5", short: "Justice", title: "L'Organisation Judiciaire", tag: "Droit", time: 14, color: "m6b", symbol: "⚖", glyph: "tribunal",
    quote: "Du tribunal judiciaire à la Cour de cassation",
    desc: "Le litige et les principes du service public de la justice. Les deux ordres (judiciaire / administratif), la réforme Belloubet de 2019 (tribunal judiciaire, tribunal de proximité), les juridictions spécialisées (commerce, prud'hommes, baux ruraux), le double degré de juridiction (appel) et la Cour de cassation.",
    pct: 86, season: "S1" },
  { id: "mdfamille", num: "1.6", short: "Famille", title: "Régimes Matrimoniaux, PACS & Union Libre", tag: "Droit", time: 16, color: "m1", symbol: "⚭", glyph: "famille",
    quote: "Mariage, PACS, concubinage — droits et patrimoine",
    desc: "Les trois modes de conjugalité : le mariage (conditions, devoirs conjugaux, 4 régimes matrimoniaux), le PACS (art. 515-1, séparation des biens par défaut) et le concubinage (union de fait). Effets patrimoniaux, dettes ménagères solidaires, protection du logement familial (art. 215 / 1751) et droits du conjoint survivant.",
    pct: 84, season: "S1" },
  { id: "mdpreuve", num: "1.7", short: "Preuve", title: "Le Droit de la Preuve", tag: "Droit", time: 12, color: "msyn", symbol: "✎", glyph: "preuve",
    quote: "« Pas de droit sans preuve »",
    desc: "Objet, charge (art. 1353) et admissibilité de la preuve. La liberté de la preuve (réforme de 2016) et les présomptions (simples, mixtes, irréfragables). Les modes de preuve parfaits (acte authentique, acte sous signature privée, aveu, serment) et libres. Formalité du double, écrit électronique et seuil des 1 500 €.",
    pct: 83, season: "S2" },
  { id: "mdcontrats", num: "1.8", short: "Contrats", title: "Le Droit des Contrats", tag: "Droit", time: 18, color: "m3", symbol: "≡", glyph: "contrat",
    quote: "Accord de volontés — liberté, force obligatoire, bonne foi",
    desc: "L'obligation et le contrat (art. 1101). Les 3 principes (liberté contractuelle, force obligatoire, bonne foi), la formation (pourparlers, information précontractuelle, offre et acceptation), la validité (consentement, capacité, contenu licite — art. 1128), la lésion immobilière (7/12e), les classifications des contrats et les nullités.",
    pct: 85, season: "S2" },
  { id: "mvert", num: "V", short: "Valeur Verte", title: "Réglementation Environnementale & Valeur Verte", tag: "Synthèse", time: 14, color: "mvert", symbol: "♲", glyph: "feuille",
    quote: "DPE, RE2020, ZAN — les piliers de la valeur verte",
    desc: "La RE2020 et ses paliers 2025/2028, le ZAN et la résilience climatique, les certifications (BEPOS, BEPAS, HQE, BBC) et le DPE (énergie primaire, coefficients de conversion). Le cadre qui fait la valeur verte d'un bien.",
    pct: 86, season: "S1" },
  { id: "murba", num: "U", short: "Urbanisme", title: "Urbanisme & Construction", tag: "Synthèse", time: 12, color: "murba", symbol: "▦", glyph: "plan",
    quote: "Du SCoT au permis — le cadre des normes & recours",
    desc: "Le cadre réglementaire (Code de l'urbanisme), les documents d'urbanisme (SCoT, PLU/PLUi, carte communale), la hiérarchie des normes (compatibilité, prise en compte, réforme 2021) et les autorisations d'urbanisme.",
    pct: 84, season: "S1" },
  { id: "macte1", num: "AC1", short: "Intervenants", title: "Les Intervenants à l'Acte de Construire", tag: "Acte de construire", time: 16, color: "m2", symbol: "⚒", glyph: "signature",
    quote: "Du maître d'ouvrage à l'expert judiciaire",
    desc: "Tous les acteurs du chantier : maître d'ouvrage (MOA) et maître d'œuvre (MOE), architecte, ACMH et ABF, constructeur (art. 1792-1), entrepreneurs (généraux, groupés, séparés, sous-traitants, cotraitants), coordonnateur SPS, BET, bureaux de contrôle, géomètre, expert judiciaire, agent immobilier et marchand de biens.",
    pct: 80, season: "S1" },
  { id: "macte2", num: "AC2", short: "Assurances", title: "Les Assurances de la Construction", tag: "Acte de construire", time: 18, color: "m5", symbol: "✚", glyph: "deonto",
    quote: "Loi Spinetta 1978 — DO & décennale",
    desc: "Le régime de l'assurance construction (loi Spinetta, art. 1792 C. civ.) : la Dommages-Ouvrage (préfinancement, 90 jours), les garanties de parfait achèvement (1 an), biennale (2 ans) et décennale (10 ans), les garanties extrinsèques (remboursement, livraison), la RC de droit commun et les dommages intermédiaires.",
    pct: 80, season: "S1" },
  { id: "macte3", num: "AC3", short: "Marchés", title: "Contrats & Passation des Marchés", tag: "Acte de construire", time: 14, color: "m3", symbol: "≡", glyph: "contrat",
    quote: "Marchés privés, marchés publics & DCE",
    desc: "Les contrats et procédures de passation : marchés privés (rôle du MOA et du MOE, DCE, visa, réception) et marchés publics (pouvoir adjudicateur, MAPA et procédures formalisées, publicité, offre économiquement la plus avantageuse). Règle d'or : les pièces écrites priment sur les pièces graphiques.",
    pct: 80, season: "S2" },
  { id: "macte4", num: "AC4", short: "VEFA", title: "La VEFA — Vente en État Futur d'Achèvement", tag: "Acte de construire", time: 14, color: "m6", symbol: "⌂", glyph: "signature",
    quote: "La vente sur plan, étape par étape",
    desc: "La Vente en État Futur d'Achèvement : contrat de réservation et dépôt de garantie (5/2/0 %), la Garantie Financière d'Achèvement (GFA) et les garanties post-réception, l'acte notarié, l'échéancier des appels de fonds (35/70/95/5 %) et la livraison (PV, réserves, retard).",
    pct: 80, season: "S2" },
  { id: "macte5", num: "AC5", short: "Plans", title: "Les Plans", tag: "Acte de construire", time: 14, color: "murba", symbol: "▦", glyph: "plan",
    quote: "De l'esquisse aux plans d'exécution",
    desc: "Les études de maîtrise d'œuvre (ESQ, APS/APD, PRO, EXE) et les plans des demandes administratives : plan de masse, plan cadastral (fiscal, pas un titre), plan de situation, plan d'architecte (niveaux RDC/R+/R-), plan de coupe, plans de façade et dessins de détails. Les abréviations à connaître.",
    pct: 80, season: "S1" },
  { id: "macte6", num: "AC6", short: "Surfaces", title: "Les Différentes Surfaces", tag: "Acte de construire", time: 12, color: "m4", symbol: "m²", glyph: "chiffres",
    quote: "Plancher, habitable, RT, emprise au sol",
    desc: "Les surfaces de la construction : la surface de plancher (référence depuis 2012, calcul au nu intérieur, déductions), la surface habitable (logements) et utile (bureaux), la surface RT (thermique) et l'emprise au sol — ce qu'on y inclut et ce qu'on en exclut.",
    pct: 80, season: "S1" },
  { id: "macte7", num: "AC7", short: "Contraintes", title: "Les Contraintes à l'Acte de Construire", tag: "Acte de construire", time: 20, color: "mdroit", symbol: "§", glyph: "hierarchie",
    quote: "Codes, PLU, lois ALUR/ELAN/Climat & servitudes",
    desc: "Le cadre des contraintes : codes (urbanisme, CCH), documents d'urbanisme (RNU, carte communale, PLU/PLUi, SCoT, PLH), grandes lois (ALUR 2014, ELAN 2018, Climat & Résilience 2021, Habitat dégradé 2024), contraintes architecturales (Monuments Historiques, secteurs sauvegardés), servitudes et acteurs de l'aménagement du territoire.",
    pct: 80, season: "S2" },
  { id: "macte8", num: "AC8", short: "Autorisations", title: "L'Acte de Construire — Autorisations & Normes", tag: "Acte de construire", time: 22, color: "msyn", symbol: "▣", glyph: "boussole",
    quote: "CU, DP, permis, taxe, normes, ERP & incendie",
    desc: "Le déroulement des travaux et toutes les autorisations : certificat d'urbanisme, déclaration préalable, permis de construire / démolir / aménager / modificatif, taxe d'aménagement, recours et affichage. Plus les normes, labels et DTU, l'accessibilité, le logement décent, les ERP et la sécurité incendie.",
    pct: 80, season: "S2" },
  { id: "mville", num: "E", short: "Écoquartier", title: "Écoquartier & Ville Durable", tag: "Synthèse", time: 10, color: "mville", symbol: "⬢", glyph: "ecoquartier",
    quote: "Environnemental · social · économique = durable",
    desc: "L'écoquartier et la ville durable : définition et 4 piliers, le label ÉcoQuartier et ses 20 engagements, les thématiques d'aménagement (énergie, eau, déchets, mobilité douce, biodiversité, mixité et participation citoyenne).",
    pct: 80, season: "S1" },
  { id: "mperso", num: "4.4", short: "Personnel", title: "La Gestion du Personnel de la Copropriété", tag: "Syndic", time: 16, color: "m3", symbol: "⚿", glyph: "personnel",
    quote: "Gardiens & employés d'immeuble — UV, salaire, contrat",
    desc: "Le syndicat des copropriétaires employeur : création du poste de gardien, embauche (visite médicale, non-discrimination), catégories A et B, contrat de travail et période d'essai, le service du gardien et les unités de valeur (UV), la pesée du poste, le salaire (coefficient × valeur du point + valeur fixe), l'avantage en nature, les primes, les congés payés, la taxe sur les salaires et la fin du contrat.",
    pct: 87, season: "S1" },
  { id: "m3",  num: "03",  short: "Prospection",  title: "La Prospection",              tag: "Module 3",     time: 10, color: "m3",   symbol: "③", glyph: "terrain",
    quote: "Le terrain — porte à porte, fichiers, réseaux",
    desc: "Méthodes physiques et digitales. Pige, géofarming, suivi CRM. La machine à mandats.",
    pct: 90, season: "S1" },
  { id: "m4",  num: "04",  short: "Ratios",       title: "Objectifs & Ratios",          tag: "Module 4",     time: 8,  color: "m4",   symbol: "20", glyph: "chiffres",
    quote: "20·5·1 — la pyramide du closing",
    desc: "Objectifs SMART, ratios de transformation, indicateurs de pilotage commercial.",
    pct: 85, season: "S1" },
  { id: "m5",  num: "05",  short: "Diagnostics",  title: "Diagnostics Immobiliers",     tag: "Module 5",     time: 10, color: "m5",   symbol: "⑤", glyph: "plans",
    quote: "DPE, amiante, plomb — le dossier obligatoire",
    desc: "DDT complet, validité, obligations du vendeur. Sans diagnostic, pas de vente.",
    pct: 89, season: "S2" },
  { id: "m6",  num: "06",  short: "Estimation",   title: "Estimation & Avis de Valeur", tag: "Module 6",     time: 12, color: "m6",   symbol: "€", glyph: "balance",
    quote: "Comparaison, capitalisation, hédonique",
    desc: "Méthodes d'évaluation, AVF, biais d'estimation. Le prix juste, ni trop haut ni trop bas.",
    pct: 91, season: "S2" },
  { id: "m6b", num: "06½", short: "Viager",       title: "Viager & Démembrement",       tag: "Module 6 bis", time: 10, color: "m6b",  symbol: "⌛", glyph: "sablier",
    quote: "Bouquet, rente, espérance de vie",
    desc: "Viager occupé/libre, démembrement, usufruit. Le pari du temps et du risque.",
    pct: 82, season: "S2" },
  { id: "m8",  num: "08",  short: "Mandats",      title: "Mandats & Dossier",           tag: "Module 8",     time: 12, color: "m8",   symbol: "✍", glyph: "signature",
    quote: "Simple, exclusif, semi-exclusif",
    desc: "Loi Hoguet, mentions obligatoires, registre des mandats. Le contrat qui lance la mission.",
    pct: 87, season: "S2" },
  { id: "m11", num: "11",  short: "Financement",  title: "Financement Immobilier",      tag: "Module 11",    time: 12, color: "m11",  symbol: "€", glyph: "courbes",
    quote: "« Intérêts composés — la huitième merveille »",
    desc: "Intérêts simples vs composés. Taux proportionnel vs équivalent. Mensualité de prêt. La règle HCSF des 35 % d'endettement maximum.",
    pct: 94, season: "S2", featured: true },
  { id: "syn", num: "✦",   short: "Synthèse",     title: "Synthèse & Règles d'or",      tag: "Repères",      time: 6,  color: "msyn", symbol: "✦", glyph: "boussole",
    quote: "Les règles d'or pour le jour J",
    desc: "Mémo final, antisèche, méthodologie d'examen. Tout ce qu'il faut avoir en tête.",
    pct: 96, season: "✦" }
];

const LAWS = [
  { id: "hoguet",   num: "70-9",   title: "Loi Hoguet",         year: "1970", desc: "Carte T, registre des mandats, garantie financière.", color: "m2" },
  { id: "alur",     num: "ALUR",   title: "Loi ALUR",           year: "2014", desc: "Encadrement des loyers, copropriété, transparence.", color: "m5" },
  { id: "elan",     num: "ELAN",   title: "Loi ELAN",           year: "2018", desc: "Bail mobilité, numérique, lutte contre l'habitat indigne.", color: "m6" },
  { id: "carrez",   num: "CARREZ", title: "Loi Carrez",         year: "1996", desc: "Mesurage de la superficie privative en copropriété.", color: "m4" },
  { id: "scrivener",num: "SCRIV.", title: "Loi Scrivener",      year: "1979", desc: "Protection de l'emprunteur, délai de réflexion 10j.", color: "m11" },
  { id: "lemoine",  num: "LEMOINE",title: "Loi Lemoine",        year: "2022", desc: "Résiliation assurance emprunteur à tout moment.", color: "m11" },
  { id: "neiertz",  num: "NEIERTZ",title: "Loi Neiertz",        year: "1989", desc: "Surendettement des particuliers, commission BdF.", color: "m4" },
  { id: "climat",   num: "CLIMAT", title: "Loi Climat & Résilience", year: "2021", desc: "Interdiction location passoires énergétiques G/F/E.", color: "m5" }
];

// ============================================
// Outro splash — pulses LENNY logo on exit
// ============================================
window.LennySplash = function (duration = 1150) {
  const el = document.createElement("div");
  el.className = "lenny-splash";
  el.innerHTML = `
    <div class="lenny-splash-mark" aria-label="LENNY">
      <span class="brand-letter">L</span><span class="brand-letter">E</span><span class="brand-letter">N</span><span class="brand-letter">N</span><span class="brand-letter">Y</span>
    </div>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in")));
  setTimeout(() => {
    el.classList.remove("in");
    el.classList.add("out");
    setTimeout(() => el.remove(), 350);
  }, duration);
};

// ============================================
// Render helpers
// ============================================
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function reviseLink(modId) {
  // Used as href fallback; click is intercepted to open the in-page detail modal
  return `#${modId}`;
}

const MOD_PHOTOS = {
  m1: "cles", m2: "entreprise", mdroit: "chateau-g", mprop: "hotel",
  mvert: "eco", murba: "aerien", mville: "lac",
  m3: "villa-moderne", m4: "ratios", m5: "interieur", m6: "estimation",
  m6b: "provence-g", m8: "mandat", m11: "finance", syn: "synthese",
  mdsources: "sources-droit", mddeonto: "sources-pro", mdjustice: "justice",
};
function cardPhotoLayers(mod) {
  const key = MOD_PHOTOS[mod.id];
  if (!key) return "";
  return `<div class="card-photo photo-${key}"></div>`
    + `<div class="card-wash art-${mod.color}"></div>`;
}
window.MOD_PHOTOS = MOD_PHOTOS;
window.modPhotoClass = (id) => MOD_PHOTOS[id] ? ("photo-" + MOD_PHOTOS[id]) : null;

function cardArtHtml(mod) {
  // When a real photo backs the card, skip the line-art glyph (avoids clutter)
  if (MOD_PHOTOS[mod.id]) return "";
  // Each module gets a small visual treatment matching its theme
  const S = "rgba(255,255,255,";
  const glyphs = {
    // M1 — Accueil: open door + welcome arc
    m1: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.4">
      <rect x="150" y="34" width="60" height="90"/>
      <path d="M150 38 L120 50 L120 120 L150 122" stroke-opacity=".8"/>
      <circle cx="128" cy="86" r="2.2" fill="${S}.8)" stroke="none"/>
      <path d="M104 128 L168 128 L180 138 L92 138 Z" stroke-opacity=".4"/>
      <path d="M198 60 a26 26 0 0 1 0 42" stroke-opacity=".3" stroke-dasharray="3 4"/>
      <path d="M210 50 a36 36 0 0 1 0 62" stroke-opacity=".18" stroke-dasharray="3 4"/>
    </svg>`,
    // M2 — Entreprises: corporate building facade
    m2: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <line x1="44" y1="124" x2="216" y2="124" stroke-opacity=".5"/>
      <rect x="92" y="28" width="92" height="96"/>
      <line x1="86" y1="36" x2="190" y2="36" stroke-opacity=".5"/>
      <g stroke-opacity=".45">
        <rect x="102" y="46" width="16" height="13"/><rect x="130" y="46" width="16" height="13"/><rect x="158" y="46" width="16" height="13"/>
        <rect x="102" y="68" width="16" height="13"/><rect x="130" y="68" width="16" height="13"/><rect x="158" y="68" width="16" height="13"/>
        <rect x="102" y="90" width="16" height="13"/><rect x="158" y="90" width="16" height="13"/>
      </g>
      <path d="M126 108 L150 108 L154 100 L122 100 Z" stroke-opacity=".5"/>
      <rect x="130" y="110" width="16" height="14" stroke-opacity=".85"/>
      <line x1="116" y1="130" x2="160" y2="130" stroke-opacity=".4"/>
      <line x1="138" y1="28" x2="138" y2="18"/>
      <path d="M138 18 L152 22 L138 26 Z" stroke-opacity=".7"/>
    </svg>`,
    // Droit — scales of justice
    mdroit: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.4">
      <line x1="130" y1="24" x2="130" y2="114"/>
      <line x1="112" y1="114" x2="148" y2="114" stroke-width="2"/>
      <line x1="84" y1="44" x2="176" y2="44" stroke-width="1.6"/>
      <circle cx="130" cy="32" r="5"/>
      <line x1="84" y1="44" x2="74" y2="70" stroke-opacity=".5"/><line x1="84" y1="44" x2="94" y2="70" stroke-opacity=".5"/>
      <line x1="176" y1="44" x2="166" y2="70" stroke-opacity=".5"/><line x1="176" y1="44" x2="186" y2="70" stroke-opacity=".5"/>
      <path d="M70 70 a14 9 0 0 0 28 0 Z" stroke-opacity=".8"/>
      <path d="M162 70 a14 9 0 0 0 28 0 Z" stroke-opacity=".8"/>
    </svg>`,
    // Propriété — house with garden + sun
    mprop: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.4">
      <circle cx="208" cy="34" r="8" stroke-opacity=".5"/>
      <line x1="208" y1="22" x2="208" y2="16" stroke-opacity=".4"/><line x1="222" y1="34" x2="228" y2="34" stroke-opacity=".4"/>
      <line x1="218" y1="24" x2="223" y2="19" stroke-opacity=".4"/><line x1="218" y1="44" x2="223" y2="49" stroke-opacity=".4"/>
      <line x1="40" y1="124" x2="224" y2="124" stroke-opacity=".5"/>
      <path d="M96 70 L138 36 L180 70"/>
      <path d="M164 52 L164 40 L172 40 L172 60" stroke-opacity=".8"/>
      <rect x="106" y="70" width="64" height="54"/>
      <rect x="130" y="94" width="16" height="30" stroke-opacity=".85"/>
      <circle cx="142" cy="110" r="1.4" fill="${S}.8)" stroke="none"/>
      <g stroke-opacity=".7"><rect x="112" y="80" width="14" height="14"/><line x1="119" y1="80" x2="119" y2="94"/><line x1="112" y1="87" x2="126" y2="87"/></g>
      <g stroke-opacity=".7"><rect x="150" y="80" width="14" height="14"/><line x1="157" y1="80" x2="157" y2="94"/><line x1="150" y1="87" x2="164" y2="87"/></g>
      <g stroke-opacity=".7"><circle cx="72" cy="104" r="11"/><line x1="72" y1="115" x2="72" y2="124"/></g>
    </svg>`,
    // Sources du droit — hiérarchie des normes (pyramide)
    mdsources: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.3">
      <path d="M112 26 L148 26 L154 44 L106 44 Z" stroke-opacity=".85"/>
      <path d="M100 50 L160 50 L168 70 L92 70 Z" stroke-opacity=".6"/>
      <path d="M86 76 L174 76 L184 98 L76 98 Z" stroke-opacity=".45"/>
      <path d="M70 104 L190 104 L202 126 L58 126 Z" stroke-opacity=".3"/>
      <line x1="130" y1="20" x2="130" y2="26" stroke-opacity=".4"/>
      <circle cx="130" cy="35" r="1.6" fill="${S}.85)" stroke="none"/>
    </svg>`,
    // Sources pros — sceau de conformité (bouclier + check)
    mddeonto: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.4">
      <path d="M130 24 L168 38 V74 C168 100 150 116 130 124 C110 116 92 100 92 74 V38 Z" stroke-opacity=".8"/>
      <path d="M130 32 L160 43 V73 C160 94 146 108 130 115 C114 108 100 94 100 73 V43 Z" stroke-opacity=".25"/>
      <path d="M114 73 L126 86 L148 58" stroke-width="2" stroke-opacity=".9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    // Organisation judiciaire — palais de justice (fronton + colonnes)
    mdjustice: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.3">
      <path d="M86 50 L130 28 L174 50 Z" stroke-opacity=".8"/>
      <line x1="80" y1="56" x2="180" y2="56" stroke-width="1.6"/>
      <g stroke-opacity=".75">
        <line x1="92" y1="60" x2="92" y2="108"/><line x1="111" y1="60" x2="111" y2="108"/>
        <line x1="130" y1="60" x2="130" y2="108"/><line x1="149" y1="60" x2="149" y2="108"/>
        <line x1="168" y1="60" x2="168" y2="108"/>
      </g>
      <line x1="80" y1="112" x2="180" y2="112" stroke-width="1.6"/>
      <line x1="72" y1="120" x2="188" y2="120" stroke-opacity=".5"/>
      <circle cx="130" cy="42" r="2" fill="${S}.85)" stroke="none"/>
    </svg>`,
    // Famille — toit + deux anneaux entrelacés
    mdfamille: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.4">
      <path d="M92 66 L130 36 L168 66" stroke-opacity=".7"/>
      <line x1="130" y1="36" x2="130" y2="30" stroke-opacity=".4"/>
      <circle cx="118" cy="92" r="20" stroke-opacity=".85"/>
      <circle cx="146" cy="92" r="20" stroke-opacity=".7"/>
      <line x1="60" y1="124" x2="200" y2="124" stroke-opacity=".4"/>
    </svg>`,
    // Preuve — loupe sur un document
    mdpreuve: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <path d="M96 28 H150 L168 46 V120 H96 Z" stroke-opacity=".6"/>
      <path d="M150 28 V46 H168" stroke-opacity=".5"/>
      <g stroke-opacity=".4"><line x1="106" y1="58" x2="158" y2="58"/><line x1="106" y1="70" x2="158" y2="70"/><line x1="106" y1="82" x2="140" y2="82"/></g>
      <circle cx="150" cy="98" r="20" stroke="${S}.85)" stroke-width="1.6"/>
      <line x1="164" y1="112" x2="180" y2="128" stroke="${S}.85)" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
    // Contrats — poignée de main dans un cercle
    mdcontrats: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.6)" stroke-width="1.4">
      <circle cx="130" cy="73" r="46" stroke-opacity=".25"/>
      <path d="M84 73 L104 66 L120 74 L132 70" stroke-opacity=".8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M176 73 L156 66 L140 74 L128 70" stroke-opacity=".8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M120 74 L132 82 L142 76" stroke-opacity=".85" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M104 66 L104 90 M156 66 L156 90" stroke-opacity=".5"/>
    </svg>`,
    // Valeur verte — leaf + building
    mvert: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <line x1="44" y1="124" x2="216" y2="124" stroke-opacity=".4"/>
      <rect x="92" y="40" width="48" height="84"/>
      <g stroke-opacity=".4">
        <rect x="100" y="50" width="12" height="9"/><rect x="120" y="50" width="12" height="9"/>
        <rect x="100" y="66" width="12" height="9"/><rect x="120" y="66" width="12" height="9"/>
        <rect x="100" y="82" width="12" height="9"/><rect x="120" y="82" width="12" height="9"/>
      </g>
      <g stroke-opacity=".55"><rect x="100" y="100" width="14" height="4"/><rect x="100" y="108" width="22" height="4"/><rect x="100" y="116" width="30" height="4"/></g>
      <path d="M186 24 C150 36 138 76 160 114 C190 98 206 58 186 24 Z" stroke-width="1.5" stroke-opacity=".85"/>
      <path d="M186 24 C180 58 170 90 160 114" stroke-opacity=".5"/>
      <line x1="174" y1="56" x2="162" y2="50" stroke-opacity=".4"/><line x1="168" y1="78" x2="182" y2="72" stroke-opacity=".4"/>
    </svg>`,
    // Urbanisme — development plan (top view)
    murba: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.5)" stroke-width="1.3">
      <rect x="74" y="20" width="118" height="106" stroke-opacity=".7"/>
      <line x1="74" y1="66" x2="192" y2="66" stroke-opacity=".4"/><line x1="74" y1="74" x2="192" y2="74" stroke-opacity=".4"/>
      <line x1="128" y1="20" x2="128" y2="126" stroke-opacity=".4"/><line x1="136" y1="20" x2="136" y2="126" stroke-opacity=".4"/>
      <circle cx="132" cy="70" r="6"/>
      <rect x="86" y="32" width="30" height="26" stroke-opacity=".8"/><line x1="101" y1="32" x2="101" y2="58" stroke-opacity=".35"/>
      <rect x="86" y="84" width="30" height="32" stroke-opacity=".8"/><line x1="86" y1="100" x2="116" y2="100" stroke-opacity=".35"/>
      <rect x="148" y="84" width="34" height="32" stroke-opacity=".8"/>
      <rect x="148" y="32" width="34" height="26" stroke-opacity=".25" stroke-dasharray="3 3"/>
      <circle cx="158" cy="44" r="4" stroke-opacity=".7"/><circle cx="170" cy="48" r="5" stroke-opacity=".7"/>
    </svg>`,
    // Écoquartier — eco skyline with solar roofs + trees
    mville: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <circle cx="120" cy="42" r="24" stroke-opacity=".12"/><circle cx="160" cy="38" r="18" stroke-opacity=".12"/>
      <line x1="44" y1="124" x2="216" y2="124" stroke-opacity=".5"/>
      <rect x="84" y="74" width="26" height="50" stroke-opacity=".8"/>
      <rect x="116" y="44" width="30" height="80"/>
      <polygon points="118,44 146,44 140,34 124,34" stroke-opacity=".7"/>
      <line x1="124.6" y1="34" x2="131" y2="44" stroke-opacity=".45"/><line x1="132" y1="34" x2="138" y2="44" stroke-opacity=".45"/>
      <rect x="152" y="84" width="24" height="40" stroke-opacity=".85"/>
      <polygon points="154,84 176,84 171,76 159,76" stroke-opacity=".6"/>
      <g stroke-opacity=".4">
        <rect x="122" y="56" width="8" height="9"/><rect x="134" y="56" width="8" height="9"/>
        <rect x="122" y="74" width="8" height="9"/><rect x="134" y="74" width="8" height="9"/>
        <rect x="90" y="84" width="14" height="9"/><rect x="90" y="100" width="14" height="9"/>
      </g>
      <g stroke-opacity=".75"><circle cx="64" cy="112" r="9"/><line x1="64" y1="121" x2="64" y2="124"/></g>
      <g stroke-opacity=".7"><circle cx="196" cy="114" r="7"/><line x1="196" y1="121" x2="196" y2="124"/></g>
    </svg>`,
    // M3 — Prospection: map with location pins
    m3: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.45)" stroke-width="1.2">
      <rect x="70" y="22" width="120" height="102" stroke-opacity=".5"/>
      <path d="M70 58 Q120 54 132 80 T190 92" stroke-opacity=".4"/>
      <path d="M112 22 L120 70 L102 124" stroke-opacity=".35"/>
      <path d="M150 22 L150 64 L190 70" stroke-opacity=".35"/>
      <g stroke="${S}.85)" stroke-width="1.4">
        <circle cx="104" cy="56" r="6"/><path d="M99 60 L104 70 L109 60"/><circle cx="104" cy="56" r="1.6" fill="${S}.85)" stroke="none"/>
        <circle cx="160" cy="46" r="6"/><path d="M155 50 L160 60 L165 50"/><circle cx="160" cy="46" r="1.6" fill="${S}.85)" stroke="none"/>
      </g>
      <g stroke="${S}.5)" stroke-width="1.2">
        <circle cx="132" cy="100" r="5"/><path d="M128 103 L132 111 L136 103"/>
      </g>
    </svg>`,
    // M4 — Ratios: closing funnel (20·5·1)
    m4: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <path d="M84 30 L196 30 L168 60 L112 60 Z" stroke-opacity=".7"/>
      <path d="M112 66 L168 66 L150 96 L130 96 Z" stroke-opacity=".55"/>
      <path d="M130 102 L150 102 L143 124 L137 124 Z" stroke-opacity=".85"/>
      <text x="140" y="50" text-anchor="middle" font-family="Inter" font-weight="800" font-size="17" fill="${S}.72)" stroke="none">20</text>
      <text x="140" y="88" text-anchor="middle" font-family="Inter" font-weight="800" font-size="14" fill="${S}.6)" stroke="none">5</text>
      <text x="140" y="120" text-anchor="middle" font-family="Inter" font-weight="800" font-size="11" fill="${S}.88)" stroke="none">1</text>
    </svg>`,
    // M5 — Diagnostics: DPE energy label A→G with pointer
    m5: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.5)" stroke-width="1.2">
      ${["A","B","C","D","E","F","G"].map((L,i)=>{const y=20+i*15;const w=40+i*14;return `<path d="M70 ${y} L${70+w} ${y} L${70+w+8} ${y+6} L${70+w} ${y+12} L70 ${y+12} Z" stroke-opacity="${(0.35+i*0.07).toFixed(2)}"/><text x="76" y="${y+9.5}" font-family="Inter" font-weight="700" font-size="8" fill="${S}.85)" stroke="none">${L}</text>`;}).join("")}
      <line x1="198" y1="71" x2="166" y2="71" stroke-opacity=".7"/>
      <path d="M166 71 L175 66 M166 71 L175 76" stroke-opacity=".7"/>
    </svg>`,
    // M6 — Estimation: house vs coins on a balance
    m6: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <line x1="130" y1="28" x2="130" y2="116"/>
      <line x1="112" y1="116" x2="148" y2="116" stroke-width="2"/>
      <line x1="80" y1="46" x2="180" y2="46" stroke-width="1.5"/>
      <circle cx="130" cy="34" r="4"/>
      <line x1="80" y1="46" x2="80" y2="64" stroke-opacity=".5"/><line x1="180" y1="46" x2="180" y2="64" stroke-opacity=".5"/>
      <path d="M64 64 a16 9 0 0 0 32 0 Z" stroke-opacity=".7"/>
      <path d="M164 64 a16 9 0 0 0 32 0 Z" stroke-opacity=".7"/>
      <path d="M70 56 L80 47 L90 56 L90 56 L70 56 Z M70 56 L70 56" stroke-opacity=".85"/>
      <path d="M72 56 L72 47 L88 47 L88 56" stroke-opacity=".85"/>
      <ellipse cx="180" cy="56" rx="11" ry="3.2" stroke-opacity=".7"/>
      <ellipse cx="180" cy="51" rx="11" ry="3.2" stroke-opacity=".7"/>
      <text x="180" y="42" text-anchor="middle" font-family="Inter" font-weight="800" font-size="12" fill="${S}.7)" stroke="none">€</text>
    </svg>`,
    // M6 bis — Viager: a couple + a clock
    m6b: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <g stroke-opacity=".85"><circle cx="86" cy="46" r="12"/><path d="M68 92 Q68 64 86 64 Q104 64 104 92"/></g>
      <g stroke-opacity=".65"><circle cx="112" cy="52" r="10"/><path d="M96 92 Q96 66 112 66 Q128 66 128 92"/></g>
      <circle cx="180" cy="64" r="26"/>
      ${Array.from({length:12}).map((_,i)=>{const a=i*30*Math.PI/180;return `<line x1="${(180+Math.sin(a)*24).toFixed(1)}" y1="${(64-Math.cos(a)*24).toFixed(1)}" x2="${(180+Math.sin(a)*20).toFixed(1)}" y2="${(64-Math.cos(a)*20).toFixed(1)}" stroke-opacity=".5"/>`;}).join("")}
      <line x1="180" y1="64" x2="180" y2="48" stroke-width="1.4"/>
      <line x1="180" y1="64" x2="192" y2="70" stroke-width="1.4"/>
      <circle cx="180" cy="64" r="2" fill="${S}.85)" stroke="none"/>
    </svg>`,
    // M8 — Mandats: contract + signature + stamp + pen
    m8: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.5)" stroke-width="1.2">
      <rect x="96" y="20" width="84" height="106" stroke-opacity=".25"/>
      <rect x="90" y="26" width="84" height="106" stroke-opacity=".45"/>
      <rect x="84" y="32" width="84" height="106"/>
      <rect x="94" y="42" width="36" height="7" stroke-opacity=".5"/>
      <line x1="94" y1="60" x2="158" y2="60" stroke-opacity=".4"/><line x1="94" y1="72" x2="150" y2="72" stroke-opacity=".4"/>
      <line x1="94" y1="84" x2="158" y2="84" stroke-opacity=".4"/><line x1="94" y1="96" x2="138" y2="96" stroke-opacity=".4"/>
      <path d="M94 118 Q102 108 110 120 T126 118 T144 122" stroke-width="1.5" stroke-opacity=".85"/>
      <circle cx="150" cy="116" r="13" stroke-opacity=".5"/><circle cx="150" cy="116" r="8.5" stroke-opacity=".3"/>
      <line x1="200" y1="46" x2="170" y2="92" stroke-opacity=".7"/><line x1="206" y1="50" x2="176" y2="96" stroke-opacity=".7"/>
      <path d="M170 92 L176 96 L171 100 Z" stroke-opacity=".8"/>
    </svg>`,
    // M11 — Financement: growth curve + bars + €
    m11: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <line x1="50" y1="120" x2="216" y2="120" stroke-opacity=".5"/>
      <line x1="50" y1="26" x2="50" y2="120" stroke-opacity=".5"/>
      ${[[68,98],[96,84],[124,68],[152,50],[180,36]].map(([x,y])=>`<rect x="${x-8}" y="${y}" width="16" height="${120-y}" stroke-opacity=".25"/>`).join("")}
      <line x1="50" y1="120" x2="208" y2="78" stroke-opacity=".3" stroke-dasharray="3 4"/>
      <path d="M50 120 Q112 116 152 76 T210 30" stroke-width="1.7" stroke-opacity=".85"/>
      <path d="M210 30 L199 32 M210 30 L208 41" stroke-width="1.5" stroke-opacity=".85"/>
      <text x="62" y="112" font-family="Inter" font-weight="800" font-size="14" fill="${S}.6)" stroke="none">€</text>
      <text x="186" y="72" font-family="Inter" font-weight="800" font-size="15" fill="${S}.75)" stroke="none">€</text>
    </svg>`,
    // Synthèse — four-point star with rays
    syn: `<svg class="art-glyph" viewBox="0 0 260 146" fill="none" stroke="${S}.55)" stroke-width="1.3">
      <circle cx="130" cy="70" r="50" stroke-opacity=".2"/><circle cx="130" cy="70" r="38" stroke-opacity=".12"/>
      ${Array.from({length:4}).map((_,i)=>{const a=(45+i*90)*Math.PI/180;return `<line x1="${(130+Math.cos(a)*34).toFixed(1)}" y1="${(70+Math.sin(a)*34).toFixed(1)}" x2="${(130+Math.cos(a)*46).toFixed(1)}" y2="${(70+Math.sin(a)*46).toFixed(1)}" stroke-opacity=".4"/>`;}).join("")}
      <path d="M130 22 L140 60 L178 70 L140 80 L130 118 L120 80 L82 70 L120 60 Z" stroke-opacity=".85"/>
      <path d="M130 44 L146 70 L130 96 L114 70 Z" stroke-opacity=".5"/>
      <circle cx="130" cy="70" r="3" fill="${S}.85)" stroke="none"/>
    </svg>`,
  };
  return glyphs[mod.id] || `<div class="art-symbol">${mod.symbol}</div>`;
}

/* ---------- variation hebdomadaire du classement ---------- */
// Numéro de semaine ISO (stable du lundi au dimanche, change chaque semaine).
function isoWeek(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((t - yearStart) / 86400000 + 1) / 7);
  return t.getUTCFullYear() * 53 + wk;
}
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
// Pour chaque position de cette semaine, écart de rang vs la semaine précédente.
function weeklyDeltas(ids) {
  const lastWeek = seededShuffle(ids, isoWeek() - 1);
  return ids.map((id, i) => {
    const lastRank = lastWeek.indexOf(id);
    return lastRank < 0 ? null : lastRank - i; // >0 monte, <0 descend, 0 stable
  });
}
function deltaBadge(delta) {
  if (delta === null || delta === undefined) return `<span class="rank-delta new" title="Nouvelle entrée">NEW</span>`;
  if (delta === 0) return `<span class="rank-delta flat" title="Stable">=</span>`;
  const up = delta > 0;
  return `<span class="rank-delta ${up ? "up" : "down"}" title="${up ? "En hausse" : "En baisse"} de ${Math.abs(delta)}">
    <svg viewBox="0 0 8 8" fill="currentColor">${up ? '<path d="M4 1 L7 6 H1 Z"/>' : '<path d="M4 7 L1 2 H7 Z"/>'}</svg>${Math.abs(delta)}</span>`;
}

function cardHtml(mod, opts = {}) {
  const { progress, rank, delta } = opts;
  const hasVideo = !!(window.LENNY_VIDEOS && window.LENNY_VIDEOS[mod.id]);
  const videoFlag = hasVideo
    ? `<span class="card-video-flag"><svg viewBox="0 0 10 10" fill="currentColor"><path d="M2 1 L9 5 L2 9 Z"/></svg>Vidéo</span>` : "";
  const videoBtn = hasVideo
    ? `<span class="cbtn video" title="Voir la vidéo" data-video="${mod.id}"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="1.4" y="3" width="11.2" height="8" rx="1.3"/><path d="M5.8 5.4 L9 7 L5.8 8.6 Z" fill="currentColor" stroke="none"/></svg></span>` : "";
  return `
    <a class="card ${rank ? "top10" : ""}" href="${reviseLink(mod.id)}" data-mod="${mod.id}">
      ${rank ? `<span class="rank">${rank}</span>${delta !== undefined ? deltaBadge(delta) : ""}<div class="top-art art-${mod.color}${MOD_PHOTOS[mod.id] ? " has-photo" : ""}">${videoFlag}${cardPhotoLayers(mod)}${cardArtHtml(mod)}</div>` : `
      <div class="card-art art-${mod.color}${MOD_PHOTOS[mod.id] ? " has-photo" : ""}">
        ${videoFlag}
        ${cardPhotoLayers(mod)}
        ${cardArtHtml(mod)}
        <div class="art-title-top">${escapeHtml(mod.title)}</div>
        <span class="card-num">${mod.num}</span>
      </div>`}
      ${progress != null ? `<div class="progress"><i style="width:${progress}%"></i></div>` : ""}
      <div class="card-overlay">
        <div class="card-overlay-title">${escapeHtml(mod.title)}</div>
        <div class="card-overlay-meta">
          <span>${mod.season}</span>
          <span>·</span>
          <span>${mod.time} min</span>
        </div>
        <div class="card-overlay-actions">
          <span class="cbtn play" title="Réviser">
            <svg viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5 L10 6 L3 10.5 Z"/></svg>
          </span>
          ${videoBtn}
          <span class="cbtn add" title="Ajouter à Ma Liste" data-add="${mod.id}">
            <svg class="ic-plus" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="6" y1="2" x2="6" y2="10"/><line x1="2" y1="6" x2="10" y2="6"/></svg>
            <svg class="ic-check" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="2.5,6.5 5,9 9.5,3.5"/></svg>
          </span>
          <span class="cbtn" title="Plus d'infos">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><polyline points="3,4.5 6,7.5 9,4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      </div>
    </a>
  `;
}

function lawCardHtml(law) {
  return `
    <a class="card" href="${reviseLink(law.id)}" data-mod="${law.id}">
      <div class="card-art art-${law.color}">
        <span class="badge"><span class="L">L</span> · LOI</span>
        <div style="position:absolute;left:14px;top:42%;font-family:'Inter';font-weight:900;font-size:34px;letter-spacing:-.02em;color:rgba(255,255,255,.92);line-height:.9">${escapeHtml(law.num)}</div>
        <div class="art-sub">${escapeHtml(law.year)}</div>
        <div class="art-title">${escapeHtml(law.title)}</div>
        <span class="card-num">·</span>
      </div>
      <div class="card-overlay">
        <div class="card-overlay-title">${escapeHtml(law.title)}</div>
        <div class="card-overlay-meta">
          <span class="ok">${escapeHtml(law.year)}</span>
          <span>·</span>
          <span>Réglementation</span>
        </div>
        <div style="font-size:11.5px;color:rgba(255,255,255,.7);line-height:1.4">${escapeHtml(law.desc)}</div>
      </div>
    </a>
  `;
}

// ============================================
// Ma Liste (persisted in localStorage)
// ============================================
const MYLIST_KEY = "lenny-mylist-v1";

function getMyList() {
  try {
    const v = JSON.parse(localStorage.getItem(MYLIST_KEY) || "[]");
    return Array.isArray(v) ? v.filter(id => LENNY_MODULES.find(m => m.id === id)) : [];
  } catch (e) { return []; }
}
function setMyList(ids) {
  try { localStorage.setItem(MYLIST_KEY, JSON.stringify(ids)); } catch (e) {}
}
function isInMyList(id) { return getMyList().includes(id); }

function toggleMyList(id) {
  const list = getMyList();
  const i = list.indexOf(id);
  if (i === -1) list.push(id); else list.splice(i, 1);
  setMyList(list);
  renderMyList();
  syncAddButtons();
  return i === -1; // true if added
}

function renderMyList() {
  const section = document.getElementById("mylist");
  const row = document.getElementById("row-mylist");
  const meta = document.getElementById("mylist-meta");
  if (!section || !row) return;
  const ids = getMyList();
  const byId = (id) => LENNY_MODULES.find(m => m.id === id);
  if (ids.length === 0) {
    section.hidden = true;
    row.innerHTML = "";
    return;
  }
  section.hidden = false;
  // Ensure the row is fully revealed even if it was display:none when the
  // scroll-reveal observer ran (otherwise it stays stuck at opacity:0).
  section.classList.add("reveal", "in");
  row.innerHTML = ids.map(id => cardHtml(byId(id))).join("");
  if (meta) meta.textContent = ids.length + (ids.length > 1 ? " fiches" : " fiche");
  syncAddButtons();
}

// Reflect membership on every "+" button (plus ↔ check)
function syncAddButtons() {
  document.querySelectorAll(".cbtn.add[data-add]").forEach(btn => {
    const id = btn.getAttribute("data-add");
    const inList = isInMyList(id);
    btn.classList.toggle("added", inList);
    btn.setAttribute("title", inList ? "Retirer de Ma Liste" : "Ajouter à Ma Liste");
  });
}

// Public API (used by the detail modal)
window.LennyList = {
  has: isInMyList,
  toggle: toggleMyList,
  render: renderMyList,
  sync: syncAddButtons,
};

// ============================================
// Boot
// ============================================
function lennyInit() {
  // Hide boot splash
  setTimeout(() => {
    const boot = document.getElementById("boot");
    if (boot) {
      boot.classList.add("hide");
      setTimeout(() => boot.remove(), 700);
    }
  }, 650);

  // Build rows
  const trending  = ["mdroit","mprop","mvert","murba","mville","m11","m2","m8","m6","m4","m3","m5","m6b","m1","syn"];
  const originals = ["m1","mdroit","mprop","mvert","murba","mville","m2","m3","m4"];
  const top10     = ["m11","mdroit","mprop","mvert","murba","mville","m6","m8","m2","m3"];
  const continueR = [ { id: "m11", p: 64 }, { id: "m6", p: 38 }, { id: "m8", p: 80 }, { id: "m2", p: 22 } ];

  const byId = (id) => LENNY_MODULES.find(m => m.id === id);

  const rowTrending = document.getElementById("row-trending");
  if (rowTrending) rowTrending.innerHTML = trending.map(id => cardHtml(byId(id))).join("");

  const rowOriginals = document.getElementById("row-originals");
  if (rowOriginals) rowOriginals.innerHTML = originals.map(id => cardHtml(byId(id))).join("");

  const rowTop10 = document.getElementById("row-top10");
  if (rowTop10) {
    const ids = top10.slice(0, 10);
    const deltas = weeklyDeltas(ids);
    rowTop10.innerHTML = ids.map((id, i) => cardHtml(byId(id), { rank: i + 1, delta: deltas[i] })).join("");
  }

  const rowContinue = document.getElementById("row-continue");
  if (rowContinue) rowContinue.innerHTML = continueR.map(({ id, p }) => cardHtml(byId(id), { progress: p })).join("");

  const rowLaws = document.getElementById("row-laws");
  if (rowLaws) rowLaws.innerHTML = LAWS.map(lawCardHtml).join("");

  const droitIds = ["mdsources","mddeonto","mdjustice","mdfamille","mdpreuve","mdcontrats","mdroit","mprop"];
  const rowDroit = document.getElementById("row-droit");
  if (rowDroit) rowDroit.innerHTML = droitIds.map(id => cardHtml(byId(id))).join("");

  // Build "Ma Liste" + reflect membership on all + buttons
  renderMyList();
  syncAddButtons();

  // Nav scroll behavior
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (window.scrollY > 50) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: .05, rootMargin: "0px 0px -80px 0px" });
  document.querySelectorAll(".row").forEach(el => { el.classList.add("reveal"); io.observe(el); });

  // Parallax hero background
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.25}px)`;
        heroBg.style.opacity = String(1 - Math.min(1, y / (window.innerHeight * 0.9)));
      }
    }, { passive: true });
  }

  // Hero "Réviser" → launch the cinematic player (Module 11)
  document.querySelectorAll("[data-open-m11]").forEach(b => {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      // The first Réviser button (with id) launches the player, "Plus d'infos" opens the modal
      if (b.id === "hero-revise") {
        window.LennyPlayer && window.LennyPlayer.open("m11");
      } else {
        window.LennyDetail && window.LennyDetail.open("m11");
      }
    });
  });

  // (Le bouton "Quiz général" est câblé par lenny-router.js → LennyQuiz.open)

  // Intercept all card clicks → open detail modal (clicking the play btn in overlay → player)
  document.addEventListener("click", (e) => {
    // Card overlay "+" button → toggle Ma Liste (must run before card/play handlers)
    const addBtn = e.target.closest(".cbtn.add[data-add]");
    if (addBtn) {
      e.preventDefault(); e.stopPropagation();
      const id = addBtn.getAttribute("data-add");
      const added = toggleMyList(id);
      addBtn.classList.add("pop");
      setTimeout(() => addBtn.classList.remove("pop"), 260);
      return;
    }

    // Card overlay video button → launch the video player directly
    const videoBtn = e.target.closest(".card-overlay-actions .cbtn.video[data-video]");
    if (videoBtn) {
      e.preventDefault(); e.stopPropagation();
      const id = videoBtn.getAttribute("data-video");
      if (id && window.LennyVideo && window.LennyVideo.has && window.LennyVideo.has(id)) {
        window.LennyVideo.open(id);
      }
      return;
    }

    // Card overlay play button → launch player directly
    const playBtn = e.target.closest(".card-overlay-actions .cbtn.play");
    if (playBtn) {
      const c = playBtn.closest(".card[data-mod]");
      const id = c?.getAttribute("data-mod");
      if (id && LENNY_MODULES.find(m => m.id === id)) {
        e.preventDefault(); e.stopPropagation();
        window.LennyPlayer && window.LennyPlayer.open(id);
        return;
      }
    }

    const card = e.target.closest(".card[data-mod]");
    if (card) {
      const id = card.getAttribute("data-mod");
      if (id && LENNY_MODULES.find(m => m.id === id)) {
        e.preventDefault();
        window.LennyDetail && window.LennyDetail.open(id);
        return;
      }
    }
    const link = e.target.closest("[data-open-mod]");
    if (link) {
      const id = link.getAttribute("data-open-mod");
      if (id && LENNY_MODULES.find(m => m.id === id)) {
        e.preventDefault();
        window.LennyDetail && window.LennyDetail.open(id);
      }
    }
  });

  // Navigation is owned by lenny-router.js (view switching + active state).
}

// Run init now if DOM is already ready, else wait
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", lennyInit);
} else {
  lennyInit();
}
