/* global React, Subhead, Callout, LetterCircle */

/* ============ Module 1 — Accueil ============ */
function Module01({ mod, head }) {
  const fourTwenty = [
    { k: "20 sec.", t: "Premières SECONDES", d: "Tenue soignée, comportement mesuré. La première impression ne se refait pas.", n: "01" },
    { k: "20 gestes", t: "Premiers GESTES", d: "Bras ouverts, attitude disponible, gestes en harmonie avec le discours.", n: "02" },
    { k: "20 mots", t: "Premiers MOTS", d: "Saluer, se présenter, voix claire. Préparez les phrases d'accroche.", n: "03" },
    { k: "20 cm", t: "Du VISAGE", d: "Sourire franc, regard soutenu — attentif et bienveillant envers le client.", n: "04" },
  ];
  const soncas = [
    { l:"S", k:"Sécurité",  d:"Garanties, stabilité, rassurer" },
    { l:"O", k:"Orgueil",   d:"Valoriser, statut, prestige" },
    { l:"N", k:"Nouveauté", d:"Innovation, moderne, dernier cri" },
    { l:"C", k:"Confort",   d:"Facilité, praticité, bien-être" },
    { l:"A", k:"Argent",    d:"Économie, rentabilité, ROI" },
    { l:"S", k:"Sympathie", d:"Relation, confiance, feeling" },
    { l:"E", k:"Écologie",  d:"DPE, éco-responsable, énergie" },
  ];
  const questions = [
    { t:"Ouverte",      d:"Engage à l'expression",      ex:"Comment puis-je vous aider ?" },
    { t:"Fermée",       d:"Réponse OUI / NON",          ex:"Avez-vous déjà visité ?" },
    { t:"Approfond.",   d:"Obtenir des précisions",     ex:"Pouvez-vous préciser ?" },
    { t:"Miroir",       d:"Faire développer",           ex:"Trop de travaux… ?" },
    { t:"Inductive",    d:"Influence la réponse",       ex:"Aurez-vous le temps ?" },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}
      <Subhead num="i.">La règle des <em>4 × 20</em></Subhead>
      <div className="grid grid-4 gap-sm">
        {fourTwenty.map((c,i) => (
          <div className="card" key={i} data-dd="m1-4x20" onClick={() => window.openDeepDive && window.openDeepDive("m1-4x20")}>
            <div className="card-eyebrow">{c.n} · {c.k}</div>
            <div className="card-title">{c.t}</div>
            <div className="card-body">{c.d}</div>
          </div>
        ))}
      </div>
      <Callout variant="danger">
        Une seule occasion de faire une bonne <strong>première impression</strong> — préparer tenue, posture et phrases d'accroche avant chaque rendez-vous.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Profil acheteur — <em>SONCAS(E)</em></Subhead>
      <div className="grid grid-7 gap-sm">
        {soncas.map((s,i) => (
          <div className="card" key={i} style={{ padding: "18px 16px 16px" }} data-dd="m1-soncas" onClick={() => window.openDeepDive && window.openDeepDive("m1-soncas")}>
            <LetterCircle letter={s.l} accent={i % 2 === 0} />
            <div style={{ marginTop: 12 }}>
              <div className="card-title" style={{ fontSize: 18 }}>{s.k}</div>
              <div className="card-body" style={{ fontSize: 12.5 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "start" }}>
        <div>
          <Subhead num="iii.">Les <em>5 types</em> de questions</Subhead>
          <div className="table" data-dd="m1-questions" onClick={() => window.openDeepDive && window.openDeepDive("m1-questions")} style={{ cursor: "pointer" }}>
            <div className="table-row header" style={{ gridTemplateColumns: "1fr 1.2fr 1.4fr" }}>
              <div>Type</div><div>Intention</div><div>Exemple</div>
            </div>
            {questions.map((q,i) => (
              <div className="table-row" key={i} style={{ gridTemplateColumns: "1fr 1.2fr 1.4fr" }}>
                <div><strong>{q.t}</strong></div>
                <div className="dim">{q.d}</div>
                <div className="italic-d" style={{ fontSize: 15 }}>« {q.ex} »</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Subhead>Accueil <em>téléphonique</em></Subhead>
          <div className="card feature" data-dd="m1-divas" onClick={() => window.openDeepDive && window.openDeepDive("m1-divas")}>
            <div className="card-eyebrow">Méthode DIVAS</div>
            <ul className="list-clean" style={{ marginTop: 14 }}>
              <li><strong>D</strong> — Débit adapté à l'interlocuteur</li>
              <li><strong>I</strong> — Intonation bienveillante</li>
              <li><strong>V</strong> — Volume mesuré</li>
              <li><strong>A</strong> — Articuler chaque mot</li>
              <li><strong>S</strong> — Sourire (ça s'entend)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Module 2 — Entreprises ============ */
function Module02({ mod, head }) {
  const formes = [
    { k:"EI",    resp:"Illimitée",       fisc:"IR (BIC/BNC)",   note:"Simple mais risqué" },
    { k:"EIRL",  resp:"Limitée",         fisc:"IR (opt. IS)",   note:"Protège le patrimoine perso" },
    { k:"EURL",  resp:"Limitée aux apports", fisc:"IR (opt. IS)", note:"SARL à 1 associé" },
    { k:"SASU",  resp:"Limitée aux apports", fisc:"IS (opt. IR 5 ans)", note:"Président = assimilé salarié" },
    { k:"SARL",  resp:"Limitée aux apports", fisc:"IS (opt. IR famille)", note:"Gérant majoritaire = TNS" },
    { k:"SAS",   resp:"Limitée aux apports", fisc:"IS (opt. IR)",  note:"Grande flexibilité" },
  ];
  const lois = [
    { name:"Hoguet", year:"1970", items: [
      "Carte professionnelle obligatoire : T, G, S",
      "Mandat écrit obligatoire",
      "Garantie financière",
      "Reçu pour toute somme perçue",
      "Tarifs affichés TTC",
      "Registre des mandats",
    ], note:"Sans mandat conforme = ZÉRO honoraire" },
    { name:"ALUR", year:"2014", items: [
      "Encadrement des loyers (zones tendues)",
      "Bail type + état des lieux standardisé",
      "Formation continue 42 h / 3 ans",
      "Encadrement syndics & transparence",
      "Rénovation énergétique renforcée",
    ] },
    { name:"ELAN", year:"2018", items: [
      "Bail mobilité : 1 à 10 mois, sans dépôt",
      "Simplification de l'urbanisme",
      "Encadrement Airbnb",
      "Vente HLM facilitée",
      "Bail numérique",
    ] },
  ];
  const statuts = [
    { t:"Agent commercial", k:"Mandataire indépendant", items: [
      "Inscrit au RSAC, pas de contrat de travail",
      "Rémunéré uniquement à la commission",
      "TNS — cotisations indépendant",
    ], interdits: ["Rédiger un compromis", "Encaisser des fonds", "Donner des conseils juridiques"] },
    { t:"Salarié d'agence", k:"Contrat de travail", items: [
      "Protection sociale complète + chômage",
      "Fixe + commissions, ou rémunération mixte",
      "Pas de clientèle propre",
    ]},
    { t:"VRP", k:"Voyageur Représentant Placier", items: [
      "Payé à la commission (min. garanti possible)",
      "Représente 1 ou plusieurs employeurs",
      "Statut salarié avec spécificités",
    ]},
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">Formes <em>juridiques</em></Subhead>
      <div className="grid grid-3 gap-sm">
        {formes.map((f,i) => (
          <div className="card" key={i} data-dd="m2-formes" onClick={() => window.openDeepDive && window.openDeepDive("m2-formes")}>
            <div className="stat" style={{ fontSize: 38 }}><em>{f.k}</em></div>
            <div className="kv">
              <div className="kv-row"><div className="kv-k">Resp.</div><div className="kv-v">{f.resp}</div></div>
              <div className="kv-row"><div className="kv-k">Fisc.</div><div className="kv-v">{f.fisc}</div></div>
            </div>
            <div className="card-body italic-d" style={{ marginTop: 12, fontSize: 14 }}>→ {f.note}</div>
          </div>
        ))}
      </div>
      <Callout variant="gold" icon="◆">
        <strong>SA</strong> : capital min. 37 000 €  ·  <strong>SCOP</strong> : salariés associés majoritaires (1 personne = 1 voix)  ·  <strong>GIE</strong> : mutualisation entre pros, responsabilité solidaire.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Lois <em>fondamentales</em></Subhead>
      <div className="grid grid-3 gap-sm">
        {lois.map((l,i) => {
          const ddSlugs = ["m2-hoguet", "m2-alur", "m2-elan"];
          return (
          <div className={`card ${i===0 ? "feature" : ""}`} key={i} data-dd={ddSlugs[i]} onClick={() => window.openDeepDive && window.openDeepDive(ddSlugs[i])}>
            <div className="card-eyebrow">Loi · {l.year}</div>
            <div className="card-title" style={{ fontSize: 32, marginTop: 4 }}>
              <em>{l.name}</em>
            </div>
            <ul className="list-clean" style={{ marginTop: 14 }}>
              {l.items.map((it,j) => <li key={j}>{it}</li>)}
            </ul>
            {l.note && <div className="callout danger" style={{ marginTop: 16 }}>
              <div className="callout-icon">🚨</div>
              <div className="callout-body">{l.note}</div>
            </div>}
          </div>
          );
        })}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">Statuts du <em>conseiller</em></Subhead>
      <div className="grid grid-3 gap-sm">
        {statuts.map((s,i) => (
          <div className="card" key={i} data-dd="m2-statuts" onClick={() => window.openDeepDive && window.openDeepDive("m2-statuts")}>
            <div className="card-eyebrow">{s.k}</div>
            <div className="card-title">{s.t}</div>
            <ul className="list-clean arrow" style={{ marginTop: 14 }}>
              {s.items.map((it,j) => <li key={j}>{it}</li>)}
            </ul>
            {s.interdits && (
              <>
                <hr className="rule" style={{ margin: "16px 0 12px" }} />
                <div className="card-eyebrow" style={{ color: "var(--accent-deep)" }}>Interdictions</div>
                <ul className="list-clean cross" style={{ marginTop: 10 }}>
                  {s.interdits.map((it,j) => <li key={j}>{it}</li>)}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      <Callout variant="forest" icon="●">
        <strong>AMANDA</strong> (ex-AMEPI) : réseau de mandats exclusifs entre agences — accélère les ventes et évite la concurrence directe entre adhérents.
      </Callout>
    </section>
  );
}

/* ============ Module 3 — Prospection ============ */
function Module03({ mod, head }) {
  const smart = [
    { l:"S", k:"Spécifique",  d:"Un objectif précis et défini" },
    { l:"M", k:"Mesurable",   d:"Des critères quantifiables" },
    { l:"A", k:"Atteignable", d:"Réaliste vs. moyens" },
    { l:"R", k:"Réaliste",    d:"Aligné aux ressources disponibles" },
    { l:"T", k:"Temporel",    d:"Une deadline précise définie" },
  ];
  const zones = [
    { pct:"80%", t:"Zone primaire",   d:"Quelques mètres — présence maximale",   tone:"accent" },
    { pct:"15%", t:"Zone secondaire", d:"+ 1 km — présence régulière",            tone:"forest" },
    { pct:"5%",  t:"Zone tertiaire",  d:"Au-delà — présence ponctuelle",          tone:"ocean" },
  ];
  const methodes = [
    { sym:"◐", k:"Statique",    d:"Contacts provoqués par la publicité (passif)",   items:["Vitrine agence","Panneaux vendus/loués","Affiches, réseaux sociaux"] },
    { sym:"➤", k:"Dynamique",   d:"Contacts générés par l'implication du négociateur", items:["Porte-à-porte","Phoning / Pige","Boîtage, flyers"] },
    { sym:"◍", k:"Prospective", d:"Contacts via base de données constituée",        items:["Anciens clients","Fichier propriétaires","Notaires, banquiers"] },
    { sym:"◇", k:"Digitale",    d:"Contacts via internet et réseaux sociaux",       items:["Instagram, Facebook","LinkedIn","Site de l'agence"] },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 36 }}>
        <div>
          <Subhead num="i.">Méthode <em>SMART</em></Subhead>
          <div className="grid" style={{ gap: 12 }}>
            {smart.map((s,i) => (
              <div className="card" key={i} style={{ display: "flex", gap: 18, alignItems: "center", padding: "16px 20px" }} data-dd="m3-smart" onClick={() => window.openDeepDive && window.openDeepDive("m3-smart")}>
                <LetterCircle letter={s.l} accent />
                <div style={{ flex: 1 }}>
                  <div className="card-title" style={{ fontSize: 19 }}>{s.k}</div>
                  <div className="card-body" style={{ marginTop: 2, fontSize: 13.5 }}>{s.d}</div>
                </div>
                <div className="mono dim" style={{ fontSize: 10.5, letterSpacing: ".15em" }}>0{i+1}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Subhead num="ii.">Zones de <em>secteur</em> (Îlotage)</Subhead>
          <div className="grid" style={{ gap: 12 }}>
            {zones.map((z,i) => (
              <div className="card" key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 22, alignItems: "center" }} data-dd="m3-zones" onClick={() => window.openDeepDive && window.openDeepDive("m3-zones")}>
                <div className="stat"><em>{z.pct}</em></div>
                <div>
                  <div className="card-eyebrow">Part du CA</div>
                  <div className="card-title" style={{ fontSize: 22 }}>{z.t}</div>
                  <div className="card-body" style={{ marginTop: 4 }}>{z.d}</div>
                </div>
              </div>
            ))}
          </div>
          <Callout variant="gold" icon="◷">
            1 îlot = <strong>2 à 3 h max</strong> de prospection — au-delà, l'attention décroche.
          </Callout>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">Méthodes & <em>techniques</em></Subhead>
      <div className="grid grid-4 gap-sm">
        {methodes.map((m,i) => (
          <div className="card" key={i} data-dd="m3-methodes" onClick={() => window.openDeepDive && window.openDeepDive("m3-methodes")}>
            <div style={{ fontSize: 32, fontFamily: "Inter, system-ui, sans-serif", color: "var(--accent)", lineHeight: 1 }}>{m.sym}</div>
            <div className="card-title" style={{ fontSize: 22, marginTop: 8 }}>{m.k}</div>
            <div className="card-body">{m.d}</div>
            <ul className="list-clean" style={{ marginTop: 12 }}>
              {m.items.map((it,j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <Callout icon="✎">
        <strong>Panneau</strong> : 7-15 €/u — « le panneau appelle le panneau »  ·  <strong>Flyer boîtage</strong> : retour 1/1000, notoriété  ·  <strong>Pige</strong> : appel des annonces de particuliers  ·  <strong>Phoning</strong> : prospection depuis fichier.
      </Callout>
    </section>
  );
}

/* ============ Module 4 — Ratios ============ */
function Module04({ mod, head }) {
  const stats = [
    { v:"583K€",  k:"CA agence N-1" },
    { v:"66",     k:"Ventes / an" },
    { v:"8 833€", k:"Commission moy." },
    { v:"15",     k:"Visites / vente" },
    { v:"≈3",     k:"Acquéreurs / vente" },
  ];
  const formules = [
    { k:"Commission moyenne",                f:"CA total ÷ Nombre de ventes" },
    { k:"Taux transfo mandat → vente",       f:"Nb ventes ÷ Nb mandats × 100" },
    { k:"Taux transfo estimation → mandat",  f:"Nb mandats ÷ Nb estimations × 100" },
    { k:"Coût acquisition d'un mandat",      f:"Coût prospection ÷ Nb mandats rentrés" },
    { k:"Prix Net Vendeur depuis FAI 6,5 %", f:"Prix FAI ÷ 1,065" },
    { k:"Prix HT depuis TTC",                f:"Prix TTC ÷ 1,20" },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">L'agence en <em>chiffres</em></Subhead>
      <div className="grid grid-5 gap-sm">
        {stats.map((s,i) => (
          <div className="card" key={i}>
            <div className="stat"><em>{s.v}</em></div>
            <div className="stat-label">{s.k}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Formules <em>clés</em></Subhead>
      <div className="grid grid-2 gap-sm">
        {formules.map((f,i) => (
          <div className="card" key={i} data-dd="m4-formules" onClick={() => window.openDeepDive && window.openDeepDive("m4-formules")}>
            <div className="card-eyebrow">Formule {String(i+1).padStart(2,"0")}</div>
            <div className="card-title" style={{ fontSize: 20 }}>{f.k}</div>
            <div className="formula formula-mono" style={{ marginTop: 14, fontSize: 18 }}>{f.f}</div>
          </div>
        ))}
      </div>
      <Callout variant="gold" icon="◆">
        <strong>Objectif conseiller</strong> : identifier combien de ventes / mandats / estimations sont nécessaires pour atteindre le salaire visé (calcul en cascade).
      </Callout>
    </section>
  );
}

Object.assign(window, { Module01, Module02, Module03, Module04 });
