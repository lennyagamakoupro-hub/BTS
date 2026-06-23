/* global React, Subhead, Callout */

/* ============ Module 11 — Financement ============ */
function Module11({ mod, head }) {
  const periodes = [
    { p:"Annuel",      n:"1",  prop:"t",      eq:"t" },
    { p:"Semestriel",  n:"2",  prop:"t ÷ 2", eq:"(1+t)^(1/2) − 1" },
    { p:"Trimestriel", n:"4",  prop:"t ÷ 4", eq:"(1+t)^(1/4) − 1" },
    { p:"Bimensuel",   n:"6",  prop:"t ÷ 6", eq:"(1+t)^(1/6) − 1" },
    { p:"Mensuel",     n:"12", prop:"t ÷ 12",eq:"(1+t)^(1/12) − 1" },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i."><em>Intérêts simples</em> vs <em>intérêts composés</em></Subhead>
      <div className="grid grid-2">
        <div className="card feature" data-dd="m11-simples" onClick={() => window.openDeepDive && window.openDeepDive("m11-simples")}>
          <div className="card-eyebrow">Méthode linéaire</div>
          <div className="card-title">Intérêts <em>simples</em></div>
          <div className="card-body">Les intérêts sont calculés uniquement sur le capital de départ. Progression <strong>linéaire</strong>.</div>
          <div className="formula" style={{ marginTop: 16 }}>
            <span style={{ fontStyle: "italic" }}>I</span> = <span style={{ fontStyle: "italic" }}>C</span> × <span style={{ fontStyle: "italic" }}>t</span> × <span style={{ fontStyle: "italic" }}>n</span>
          </div>
          <div className="kv" style={{ marginTop: 16 }}>
            <div className="kv-row"><div className="kv-k">I</div><div className="kv-v">Intérêts obtenus</div></div>
            <div className="kv-row"><div className="kv-k">C</div><div className="kv-v">Capital initial</div></div>
            <div className="kv-row"><div className="kv-k">t</div><div className="kv-v">Taux (décimal)</div></div>
            <div className="kv-row"><div className="kv-k">n</div><div className="kv-v">Durée en années</div></div>
          </div>
          <hr className="rule" style={{ margin: "18px 0 14px" }} />
          <div className="card-eyebrow">Exemple</div>
          <div className="italic-d" style={{ marginTop: 8, fontSize: 17 }}>
            1 000 € à 5 % pendant 2 ans :  <strong style={{ fontFamily: "IBM Plex Mono, monospace", fontStyle: "normal", fontSize: 15 }}>I = 1 000 × 0,05 × 2 = 100 €</strong> <span className="dim">(50 €/an)</span>
          </div>
        </div>

        <div className="card feature" data-dd="m11-composes" onClick={() => window.openDeepDive && window.openDeepDive("m11-composes")}>
          <div className="card-eyebrow">Méthode exponentielle</div>
          <div className="card-title">Intérêts <em>composés</em></div>
          <div className="card-body">Les intérêts sont réinvestis et produisent eux-mêmes des intérêts. Progression <strong>exponentielle</strong>.</div>
          <div className="formula" style={{ marginTop: 16 }}>
            <span style={{ fontStyle: "italic" }}>C<sub>n</sub></span> = <span style={{ fontStyle: "italic" }}>C<sub>0</sub></span> × (1 + <span style={{ fontStyle: "italic" }}>t</span>)<sup>n</sup>
          </div>
          <div className="kv" style={{ marginTop: 16 }}>
            <div className="kv-row"><div className="kv-k">Cₙ</div><div className="kv-v">Capital final obtenu</div></div>
            <div className="kv-row"><div className="kv-k">C₀</div><div className="kv-v">Capital initial</div></div>
            <div className="kv-row"><div className="kv-k">t</div><div className="kv-v">Taux (décimal)</div></div>
            <div className="kv-row"><div className="kv-k">n</div><div className="kv-v">Nombre de périodes</div></div>
          </div>
          <hr className="rule" style={{ margin: "18px 0 14px" }} />
          <div className="card-eyebrow">Exemple</div>
          <div className="italic-d" style={{ marginTop: 8, fontSize: 17 }}>
            1 000 € à 5 % pendant 2 ans :  <strong style={{ fontFamily: "IBM Plex Mono, monospace", fontStyle: "normal", fontSize: 15 }}>C₂ = 1 000 × (1,05)² = 1 102,50 €</strong>
          </div>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Taux <em>proportionnel</em> vs <em>équivalent</em></Subhead>
      <div className="table" data-dd="m11-taux" onClick={() => window.openDeepDive && window.openDeepDive("m11-taux")} style={{ cursor: "pointer" }}>
        <div className="table-row header" style={{ gridTemplateColumns: "1fr .8fr 1.2fr 1.6fr" }}>
          <div>Période</div><div>Nb / an</div><div>Proportionnel</div><div>Équivalent</div>
        </div>
        {periodes.map((p,i) => (
          <div className="table-row" key={i} style={{ gridTemplateColumns: "1fr .8fr 1.2fr 1.6fr" }}>
            <div><strong>{p.p}</strong></div>
            <div className="cell-mono">{p.n}</div>
            <div className="cell-mono">{p.prop}</div>
            <div className="cell-mono">{p.eq}</div>
          </div>
        ))}
      </div>
      <Callout variant="danger" icon="⚠">
        <strong>Piège BTS :</strong> le taux équivalent est <strong>toujours légèrement inférieur</strong> au taux proportionnel.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">Formule de la <em>mensualité</em></Subhead>
      <div className="card feature" data-dd="m11-mensualite" onClick={() => window.openDeepDive && window.openDeepDive("m11-mensualite")}>
        <div className="formula" style={{ fontSize: 26, textAlign: "center", padding: "32px 22px" }}>
          <span style={{ fontStyle: "italic" }}>M</span> &nbsp;=&nbsp; <span style={{ fontStyle: "italic" }}>C</span> × <span style={{ fontStyle: "italic" }}>t<sub>m</sub></span> &nbsp;÷&nbsp; [ 1 − (1 + <span style={{ fontStyle: "italic" }}>t<sub>m</sub></span>)<sup>−n</sup> ]
        </div>
        <div className="grid grid-4" style={{ marginTop: 18, gap: 14 }}>
          <div className="kv-row" style={{ gridTemplateColumns: "auto 1fr", borderBottom: 0, paddingBottom: 0 }}>
            <div className="kv-k">M</div><div className="kv-v">Mensualité (€)</div>
          </div>
          <div className="kv-row" style={{ gridTemplateColumns: "auto 1fr", borderBottom: 0, paddingBottom: 0 }}>
            <div className="kv-k">C</div><div className="kv-v">Capital emprunté (€)</div>
          </div>
          <div className="kv-row" style={{ gridTemplateColumns: "auto 1fr", borderBottom: 0, paddingBottom: 0 }}>
            <div className="kv-k">tₘ</div><div className="kv-v">Taux mensuel</div>
          </div>
          <div className="kv-row" style={{ gridTemplateColumns: "auto 1fr", borderBottom: 0, paddingBottom: 0 }}>
            <div className="kv-k">n</div><div className="kv-v">Durée en mois (20 ans = 240)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Synthèse — 10 règles d'or ============ */
function ModuleSynthese({ mod, head }) {
  const regles = [
    { t:"Sans mandat écrit = ZÉRO honoraire",        d:"Loi Hoguet — aucune exception" },
    { t:"DPE + ERP = TOUJOURS obligatoires",          d:"Les autres dépendent du bien (date, zone, installations)" },
    { t:"4 × 20 : préparez votre 1ère impression",    d:"20 secondes · 20 gestes · 20 mots · 20 cm du visage" },
    { t:"Mandat exclusif = irrévocable 3 mois",       d:"Résiliation possible après 3 mois (préavis 15 jours)" },
    { t:"Méthode par comparaison = référence",        d:"Utilisée par les services fiscaux et les juridictions" },
    { t:"Taux équivalent < Taux proportionnel",       d:"Le taux équivalent tient compte de la capitalisation" },
    { t:"Registre des mandats = chronologique",       d:"Sans blanc ni rature — support papier ou électronique" },
    { t:"SONCAS : identifier le mobile dominant",     d:"Adapter son argumentaire au profil du client" },
    { t:"Zone primaire = 80 % du CA potentiel",       d:"C'est là que se concentre l'effort de prospection" },
    { t:"Taux d'endettement max : 35 %",              d:"Règle HCSF — des revenus nets mensuels du ménage" },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <div className="card dark" style={{ padding: "36px 36px 28px", marginBottom: 36 }}>
        <div className="card-eyebrow" style={{ color: "rgba(244,237,224,.55)" }}>Manifeste</div>
        <div className="serif" style={{ fontSize: 32, lineHeight: 1.2, marginTop: 8, letterSpacing: "-.01em" }}>
          Dix repères à retenir <em style={{ color: "#e9c9b8", fontStyle: "italic" }}>par cœur</em>.
          <br />
          Pour le reste — le réflexe vient avec la révision quotidienne.
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: 18 }}>
        {regles.map((r,i) => (
          <div className="card" key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "flex-start", padding: "22px 24px" }} data-dd="syn-regles" onClick={() => window.openDeepDive && window.openDeepDive("syn-regles")}>
            <div style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 64,
              lineHeight: .9,
              color: i < 3 ? "var(--accent)" : "var(--ink)",
              minWidth: 56,
            }}>{String(i+1).padStart(2,"0")}</div>
            <div>
              <div className="card-title" style={{ fontSize: 19 }}>{r.t}</div>
              <div className="card-body" style={{ marginTop: 4 }}>{r.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 40 }} />
      <div style={{ textAlign: "center" }}>
        <div className="eyebrow"><span className="dot"></span>Fin du dossier</div>
        <div className="serif italic-d" style={{ fontSize: 52, marginTop: 16, color: "var(--ink)" }}>
          Bonne révision, Lenny.
        </div>
        <div className="dim" style={{ marginTop: 8, fontSize: 14 }}>
          BTS PI INSEEC · Promotion 2025–2026
        </div>
      </div>
    </section>
  );
}

/* ============ Module Droit — Les professions de l'immobilier ============ */
function ModuleDroit({ mod, head }) {
  const lois = [
    { n: "1970", t: "Loi Hoguet", d: "n° 70-9 du 2 janvier 1970 + décret n° 72-678 (1972). Encadre l'exercice des professions immobilières." },
    { n: "2014", t: "Loi ALUR", d: "n° 2014-366 du 24 mars 2014. Accès au logement et urbanisme rénové ; transparence renforcée." },
    { n: "2018", t: "Loi ELAN", d: "n° 2018-1021 du 23 novembre 2018. Évolution du logement, de l'aménagement et du numérique." },
  ];
  const pros = [
    { t: "L'agent immobilier", d: "Mandataire qui réalise vente, achat ou mise en location pour le compte d'un mandant, via un mandat." },
    { t: "L'administrateur de biens", d: "Gère pour le propriétaire : recherche de locataires, baux, perception des loyers, reddition de comptes." },
    { t: "Le syndic", d: "Désigné par l'AG des copropriétaires pour administrer l'immeuble et exécuter les décisions de l'AG." },
  ];
  const garanties = [
    { v: "110 000 €", k: "Garantie financière — minimum (30 000 € les 2 premières années)" },
    { v: "76 225 €", k: "Assurance RCP — minimum par an" },
    { v: "10 / 4 ans", k: "Aptitude par l'expérience — 10 ans (4 ans si cadre)" },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">Le <em>cadre légal</em></Subhead>
      <div className="grid grid-3 gap-sm">
        {lois.map((l, i) => (
          <div className="card" key={i} data-dd="mdroit-hoguet" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-hoguet")}>
            <div className="card-eyebrow">{l.n}</div>
            <div className="card-title"><em>{l.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{l.d}</div>
          </div>
        ))}
      </div>
      <Callout icon="§">
        <strong>Champ d'application (art. 1er) :</strong> toute personne physique ou morale agissant <strong>de manière habituelle, même à titre accessoire</strong>, sur les biens d'autrui.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Les <em>professionnels visés</em></Subhead>
      <div className="grid grid-3 gap-sm">
        {pros.map((p, i) => (
          <div className="card" key={i} data-dd="mdroit-professionnels" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-professionnels")}>
            <div className="card-title" style={{ fontSize: 20 }}>{p.t}</div>
            <div className="card-body" style={{ marginTop: 8 }}>{p.d}</div>
          </div>
        ))}
      </div>
      <div className="dim" style={{ marginTop: 14, fontSize: 13.5 }}>
        + les mandataires en vente de fonds de commerce — soit <strong>4 professionnels</strong> réglementés par la loi du 2 janvier 1970.
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">La <em>carte professionnelle</em> & l'aptitude</Subhead>
      <div className="card feature" data-dd="mdroit-carte" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-carte")}>
        <div className="card-eyebrow">Condition d'exercice</div>
        <div className="card-title">Valable <em>3 ans</em> · délivrée par la CCI</div>
        <div className="kv" style={{ marginTop: 16 }}>
          <div className="kv-row"><div className="kv-k">T</div><div className="kv-v">Transactions sur immeubles et fonds de commerce</div></div>
          <div className="kv-row"><div className="kv-k">G</div><div className="kv-v">Gestion immobilière</div></div>
          <div className="kv-row"><div className="kv-k">S</div><div className="kv-v">Syndic de copropriété</div></div>
        </div>
        <hr className="rule" style={{ margin: "18px 0 14px" }} />
        <div className="card-eyebrow">Aptitude professionnelle</div>
        <div className="italic-d" style={{ marginTop: 8, fontSize: 16 }}>
          Diplôme (BAC+3 juridique / éco / commercial, BTS ou DUT immobilier, ICH) <strong>ou</strong> expérience (10 ans, 4 si cadre).
        </div>
      </div>
      <Callout icon="↻">
        <strong>Renouvellement :</strong> conditionné à la justification d'une <strong>formation continue</strong> (art. 3-1 de la loi).
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iv."><em>Garanties</em> & assurances</Subhead>
      <div className="grid grid-3 gap-sm">
        {garanties.map((g, i) => (
          <div className="card" key={i} data-dd="mdroit-garanties" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-garanties")}>
            <div className="stat" style={{ fontSize: 40 }}><em>{g.v}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{g.k}</div>
          </div>
        ))}
      </div>
      <Callout variant="danger" icon="⚠">
        <strong>Capacité (art. 9) :</strong> exclus — fonctions incompatibles (greffiers, avocats, fonction publique) et toute condamnation pénale de moins de 10 ans. Bulletin n° 2 du casier judiciaire exigé.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="v.">Les <em>mandats</em> : DIP & définition</Subhead>
      <div className="card feature" data-dd="mdroit-mandats" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-mandats")}>
        <div className="card-eyebrow">Avant toute signature</div>
        <div className="card-title">Le <em>DIP</em> — document d'information précontractuelle</div>
        <div className="card-body" style={{ marginTop: 8 }}>
          Imposé par le Code de la consommation (art. L. 111-1) : il informe le client avant de conclure et intègre les dispositions <strong>RGPD</strong>.
        </div>
        <div className="formula" style={{ marginTop: 18, fontSize: 17, lineHeight: 1.5, textAlign: "left", padding: "22px 24px" }}>
          <span className="dim" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Article 1984 du Code civil</span>
          « Le mandat ou procuration est un acte par lequel une personne donne à une autre le pouvoir de faire quelque chose <em>pour le mandant et en son nom</em>. »
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="vi.">Les <em>3 types</em> de mandats</Subhead>
      <div className="grid grid-3 gap-sm">
        {[
          { t: "Simple", d: "Sans clause d'exclusivité. Plusieurs agences possibles, le mandant peut traiter en direct.", feat: false },
          { t: "Exclusif", d: "Clause d'exclusivité au profit de l'agent. Un seul mandataire ; dénonçable après 3 mois (préavis 15 j, art. 7).", feat: true },
          { t: "Semi-exclusif", d: "Mandat « accord » : exclusivité, mais le mandant garde le droit de chercher un acquéreur.", feat: false },
        ].map((m, i) => (
          <div className={`card ${m.feat ? "feature" : ""}`} key={i} data-dd="mdroit-types" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-types")}>
            <div className="card-eyebrow">Mandat</div>
            <div className="card-title"><em>{m.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{m.d}</div>
          </div>
        ))}
      </div>
      <Callout variant="danger" icon="⚠">
        <strong>Mandat nul</strong> = n'a jamais existé juridiquement (conditions de validité non respectées) · <strong>Mandat caduque</strong> = valable au départ mais cesse ses effets (ex. décès du mandant).
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="vii."><em>Validité</em> & durée</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="mdroit-validite" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-validite")}>
          <div className="card-eyebrow">Article 6 — loi de 1970</div>
          <div className="card-title">L'écrit <em>obligatoire</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>
            « Les conventions conclues avec un agent immobilier doivent être rédigées par écrit » — autant d'exemplaires que de parties. Sans mandat écrit, aucune action possible.
          </div>
        </div>
        <div className="card" data-dd="mdroit-validite" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-validite")}>
          <div className="card-eyebrow">Article 7 — durée</div>
          <div className="card-title">Limité dans le <em>temps</em></div>
          <div className="kv" style={{ marginTop: 14 }}>
            <div className="kv-row"><div className="kv-k">3 mois</div><div className="kv-v">Durée initiale irrévocable</div></div>
            <div className="kv-row"><div className="kv-k">12–24 mois</div><div className="kv-v">Durée pratique courante</div></div>
            <div className="kv-row"><div className="kv-k">3 ans</div><div className="kv-v">Maximum pour le mandat de syndic</div></div>
            <div className="kv-row"><div className="kv-k">14 j</div><div className="kv-v">Rétractation hors établissement</div></div>
          </div>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="viii.">La <em>rémunération</em></Subhead>
      <div className="card feature" data-dd="mdroit-remuneration" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-remuneration")}>
        <div className="card-eyebrow">Conditions cumulatives</div>
        <div className="card-title">Pas de commission <em>sans</em>…</div>
        <div className="card-body" style={{ marginTop: 8 }}>
          Carte professionnelle · mandat écrit régulier · mission accomplie · opération conclue dans un acte unique. Aucune somme avant la conclusion, rien hors du délai de validité.
        </div>
        <hr className="rule" style={{ margin: "18px 0 14px" }} />
        <div className="grid grid-2 gap-sm">
          <div>
            <div className="card-eyebrow">Transaction</div>
            <div className="italic-d" style={{ marginTop: 6, fontSize: 15 }}>Pourcentage dégressif du prix, barème affiché en agence.</div>
          </div>
          <div>
            <div className="card-eyebrow">Location (loi ALUR)</div>
            <div className="italic-d" style={{ marginTop: 6, fontSize: 15 }}>Honoraires locataire plafonnés au m² par zone (baux loi 1989).</div>
          </div>
        </div>
      </div>
      <Callout variant="danger" icon="⚖">
        <strong>Article 1596 du Code civil :</strong> l'agent immobilier ne peut acheter, pour lui-même ou par personne interposée, le bien qu'il est tenu de vendre.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="ix."><em>Collaborateurs</em> & obligations</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="mdroit-collaborateurs" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-collaborateurs")}>
          <div className="card-eyebrow">Salarié</div>
          <div className="card-title">Carte de <em>négociateur</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Attestation d'habilitation (art. 4 Hoguet) délivrée par la CCI à la demande du titulaire de la carte.</div>
        </div>
        <div className="card" data-dd="mdroit-collaborateurs" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-collaborateurs")}>
          <div className="card-eyebrow">Non-salarié</div>
          <div className="card-title">Agent <em>commercial</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Immatriculé au RSAC. Interdit de détenir des fonds et de rédiger des actes juridiques.</div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 18 }} data-dd="mdroit-obligations" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-obligations")}>
        <div className="card-eyebrow">Traçabilité — obligations professionnelles</div>
        <div className="card-title" style={{ fontSize: 20 }}>Registres, carnet de reçus & <em>barème</em></div>
        <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14.5 }}>
          <li>Registre répertoire chronologique (pages numérotées/reliées) + registres gestion & transaction.</li>
          <li>Forme électronique admise (art. 53 décret 1972) · conservation 10 ans.</li>
          <li>Carnet de reçus : versement au compte séquestre sous 3 jours francs.</li>
          <li>Honoraires TTC en publicité (art. 6-1) · barème affiché (arrêté du 10 janvier 2017).</li>
        </ul>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="x.">Les <em>annonces</em> : honoraires & DPE</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="mdroit-annonces" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-annonces")}>
          <div className="card-eyebrow">Arrêté du 26 janvier 2022</div>
          <div className="card-title">Prix <em>« maximums »</em> TTC</div>
          <div className="card-body" style={{ marginTop: 8 }}>
            Le barème affiche les tarifs maximums pour permettre au client de négocier à la baisse. En vente, le prix honoraires inclus s'affiche en plus gros que le prix hors honoraires (art. 6-1 + arrêté 10 janv. 2017).
          </div>
        </div>
        <div className="card" data-dd="mdroit-annonces" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-annonces")}>
          <div className="card-eyebrow">DPE — depuis le 1ᵉʳ juillet 2021</div>
          <div className="card-title">Désormais <em>opposable</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>
            Obligatoire dans les annonces depuis 2011 (≥ 5 % du support en vitrine, ≥ 180×180 px sur internet). Validité 10 ans : comme l'amiante ou le plomb, le propriétaire engage sa responsabilité.
          </div>
        </div>
      </div>
      <Callout icon="⌂">
        <strong>Vente d'un lot de copropriété :</strong> indiquer le statut de copropriété, le nombre de lots, la quote-part annuelle moyenne de charges (art. 14-1, loi du 10 juillet 1965) et les éventuelles procédures judiciaires.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="xi."><em>Location</em> : honoraires & plafonds</Subhead>
      <div className="card feature" data-dd="mdroit-plafonds" onClick={() => window.openDeepDive && window.openDeepDive("mdroit-plafonds")}>
        <div className="card-eyebrow">Loi du 6 juillet 1989 · loi ALUR</div>
        <div className="card-title">Le <em>bailleur</em> paie — partage encadré</div>
        <div className="card-body" style={{ marginTop: 8 }}>
          La rémunération est à la charge du bailleur. Seules 4 prestations sont partageables avec le locataire (mention « HCL ») : visite · constitution du dossier · rédaction du bail · état des lieux. La part locataire ≤ part bailleur.
        </div>
        <hr className="rule" style={{ margin: "18px 0 14px" }} />
        <div className="card-eyebrow">Plafonds au m² de surface habitable</div>
        <div className="kv" style={{ marginTop: 12 }}>
          <div className="kv-row"><div className="kv-k">12 €/m²</div><div className="kv-v">Zone très tendue — Paris & petite couronne (zone A bis)</div></div>
          <div className="kv-row"><div className="kv-k">10 €/m²</div><div className="kv-v">Zone tendue (décret du 10 mai 2013)</div></div>
          <div className="kv-row"><div className="kv-k">8 €/m²</div><div className="kv-v">Autres communes</div></div>
          <div className="kv-row"><div className="kv-k">3 €/m²</div><div className="kv-v">État des lieux d'entrée — partout</div></div>
        </div>
      </div>
    </section>
  );
}

/* ============ Module Propriété — La propriété immobilière ============ */
function ModuleProp({ mod, head }) {
  const attributs = [
    { l: "Usus", d: "Droit d'utiliser le bien — ou de ne pas s'en servir.", g: "« Y habiter »" },
    { l: "Fructus", d: "Droit de percevoir les fruits, naturels ou civils, sans épuiser la substance.", g: "« Le louer »" },
    { l: "Abusus", d: "Droit de disposer du bien : modifier, détruire ou transmettre.", g: "« Le vendre »" },
  ];
  const caracteres = [
    { t: "Absolu", d: "Le droit réel le plus complet, opposable à tous.", r: "Limites : servitudes publiques, remembrement, expropriation, troubles de voisinage." },
    { t: "Exclusif", d: "Toutes les utilités économiques réservées au seul propriétaire.", r: "Limites : mitoyenneté, indivision, copropriété." },
    { t: "Perpétuel", d: "Ne s'éteint pas par le non-usage ; la propriété est imprescriptible.", r: "Exception : usucapion / prescription acquisitive (art. 2258)." },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i."><em>Définition</em> & démembrement</Subhead>
      <Callout icon="§">
        <strong>Article 17 de la DDHC (26 août 1789) :</strong> « la propriété étant un droit <strong>inviolable et sacré</strong>, nul ne peut en être privé… sous la condition d'une juste et préalable indemnité. »
      </Callout>
      <div className="grid grid-3 gap-sm" style={{ marginTop: 22 }}>
        {attributs.map((a, i) => (
          <div className="card" key={i} data-dd="mprop-definition" onClick={() => window.openDeepDive && window.openDeepDive("mprop-definition")}>
            <div className="stat" style={{ fontSize: 30 }}><em>{a.l}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{a.d}</div>
            <div className="dim" style={{ marginTop: 10, fontFamily: "var(--mono, monospace)", fontSize: 12.5 }}>{a.g}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 18 }} data-dd="mprop-definition" onClick={() => window.openDeepDive && window.openDeepDive("mprop-definition")}>
        <div className="card-eyebrow">Démembrement</div>
        <div className="kv" style={{ marginTop: 12 }}>
          <div className="kv-row"><div className="kv-k">Pleine propriété</div><div className="kv-v">Usus + Fructus + Abusus réunis</div></div>
          <div className="kv-row"><div className="kv-k">Usufruit</div><div className="kv-v">Usus + Fructus (temporaire 15–20 ans, ou viager)</div></div>
          <div className="kv-row"><div className="kv-k">Nue-propriété</div><div className="kv-v">Abusus seul</div></div>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Les <em>3 caractères</em> (art. 544)</Subhead>
      <div className="card feature" data-dd="mprop-caracteres" onClick={() => window.openDeepDive && window.openDeepDive("mprop-caracteres")}>
        <div className="formula" style={{ fontSize: 17, lineHeight: 1.5, textAlign: "left", padding: "22px 24px" }}>
          <span className="dim" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Article 544 du Code civil</span>
          « La propriété est le droit de jouir et de disposer des choses <em>de la manière la plus absolue</em>, pourvu qu'on n'en fasse pas un usage prohibé par les lois ou les règlements. »
        </div>
      </div>
      <div className="grid grid-3 gap-sm" style={{ marginTop: 18 }}>
        {caracteres.map((c, i) => (
          <div className="card" key={i} data-dd="mprop-caracteres" onClick={() => window.openDeepDive && window.openDeepDive("mprop-caracteres")}>
            <div className="card-eyebrow">Caractère</div>
            <div className="card-title"><em>{c.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{c.d}</div>
            <div className="dim" style={{ marginTop: 10, fontSize: 13 }}>{c.r}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="iii."><em>L'étendue</em> de la propriété</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="mprop-etendue" onClick={() => window.openDeepDive && window.openDeepDive("mprop-etendue")}>
          <div className="card-eyebrow">Article 552 du Code civil</div>
          <div className="card-title">Dessus <em>&</em> dessous</div>
          <div className="card-body" style={{ marginTop: 8 }}>
            « La propriété du sol emporte la propriété du dessus et du dessous. » De nombreuses restrictions limitent, dans l'intérêt général, les droits en hauteur et en profondeur.
          </div>
        </div>
        <div className="card" data-dd="mprop-etendue" onClick={() => window.openDeepDive && window.openDeepDive("mprop-etendue")}>
          <div className="card-eyebrow">Propriété horizontale</div>
          <div className="card-title">Bornage & <em>clôture</em></div>
          <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14.5 }}>
            <li>Bornage — délimite deux fonds contigus (art. 646).</li>
            <li>Clôture — droit de tout propriétaire (art. 647 & 682).</li>
            <li>Obligation de se clore dans les villes (art. 663).</li>
          </ul>
        </div>
      </div>
      <Callout variant="danger" icon="⏳">
        <strong>L'usucapion (art. 2258 et s.) :</strong> seule exception au caractère perpétuel — acquérir un bien par l'effet d'une possession prolongée dans le temps.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iv."><em>Eaux</em> & droit d'accession</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="mprop-accession" onClick={() => window.openDeepDive && window.openDeepDive("mprop-accession")}>
          <div className="card-eyebrow">L'usage des eaux</div>
          <div className="card-title">Une richesse <em>collective</em></div>
          <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14.5 }}>
            <li>Eaux pluviales = res nullius → au propriétaire du fonds où elles tombent (art. 640).</li>
            <li>La source appartient au propriétaire du fonds où elle jaillit (art. 641 & 642).</li>
            <li>Restrictions d'intérêt public pour les eaux minérales (art. 643).</li>
          </ul>
        </div>
        <div className="card" data-dd="mprop-accession" onClick={() => window.openDeepDive && window.openDeepDive("mprop-accession")}>
          <div className="card-eyebrow">Article 546 — accession</div>
          <div className="card-title">Naturelle <em>ou</em> artificielle</div>
          <div className="card-body" style={{ marginTop: 8 }}>
            La propriété d'une chose donne droit sur tout ce qu'elle produit et sur ce qui s'y unit. Accession artificielle (art. 555) : constructeur de bonne foi indemnisé ; de mauvaise foi, démolition possible.
          </div>
        </div>
      </div>
      <Callout icon="⚖">
        <strong>L'empiètement (art. 545) :</strong> celui qui construit sur le fonds d'autrui en devient propriétaire par accession ; mais nul ne pouvant être privé de sa propriété, le voisin lésé peut exiger la démolition.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="v."><em>Acquisition</em> & opposabilité aux tiers</Subhead>
      <div className="card feature" data-dd="mprop-acquisition" onClick={() => window.openDeepDive && window.openDeepDive("mprop-acquisition")}>
        <div className="card-eyebrow">Articles 711 & 712 du Code civil</div>
        <div className="card-title">Trois <em>modes</em> d'acquisition</div>
        <div className="kv" style={{ marginTop: 14 }}>
          <div className="kv-row"><div className="kv-k">Entre vifs</div><div className="kv-v">Vente, donation… (art. 711)</div></div>
          <div className="kv-row"><div className="kv-k">À cause de mort</div><div className="kv-v">Succession, legs… (art. 711)</div></div>
          <div className="kv-row"><div className="kv-k">Fait juridique</div><div className="kv-v">Accession ou possession (art. 712)</div></div>
        </div>
        <hr className="rule" style={{ margin: "18px 0 14px" }} />
        <div className="italic-d" style={{ fontSize: 16 }}>
          Le transfert devient <strong>opposable aux tiers</strong> dès l'accomplissement des formalités de <strong>publicité foncière</strong>, au Service de la publicité foncière.
        </div>
      </div>
    </section>
  );
}

/* ============ Module Valeur Verte — Réglementation environnementale ============ */
function ModuleVert({ mod, head }) {
  const piliers = [
    { t: "Énergie", d: "Sobriété — indicateur Bbio. Hérité de la RT2012.", e: "Bbio" },
    { t: "Carbone", d: "Empreinte carbone des matériaux : biosourcés (bois, chanvre) pour stocker le CO₂.", e: "Ic" },
    { t: "Confort d'été", d: "Conception bioclimatique pour limiter la climatisation en canicule.", e: "DH" },
  ];
  const labels = [
    { t: "BEPOS", d: "Bâtiment à Énergie Positive — produit plus qu'il ne consomme.", v: false },
    { t: "BEPAS", d: "Bâtiment Passif — chauffage < 15 kWh/m²/an, étanchéité poussée.", v: false },
    { t: "HQE", d: "Haute Qualité Environnementale — multi-critère, 14 cibles.", v: false },
    { t: "BBC Rénovation", d: "Existant < 80 kWh/m²/an — sortir des classes E/F/G.", v: true },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">La <em>RE2020</em></Subhead>
      <Callout icon="♲">
        <strong>Du RT2012 à la RE2020 :</strong> on ne regarde plus seulement la consommation d'énergie, mais aussi <strong>l'empreinte carbone</strong> et le <strong>confort d'été</strong>.
      </Callout>
      <div className="grid grid-3 gap-sm" style={{ marginTop: 22 }}>
        {piliers.map((p, i) => (
          <div className="card" key={i} data-dd="mvert-re2020" onClick={() => window.openDeepDive && window.openDeepDive("mvert-re2020")}>
            <div className="card-eyebrow">{p.e}</div>
            <div className="card-title"><em>{p.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{p.d}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Les <em>paliers</em> 2025 & 2028</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="mvert-paliers" onClick={() => window.openDeepDive && window.openDeepDive("mvert-paliers")}>
          <div className="stat" style={{ fontSize: 38 }}><em>−15 %</em></div>
          <div className="card-eyebrow" style={{ marginTop: 4 }}>Palier 2025 — Ic Construction</div>
          <div className="card-body" style={{ marginTop: 8 }}>Carbone « mordant » : difficile en 100 % béton. Fin des dérogations gaz en collectif sur réseaux peu vertueux.</div>
        </div>
        <div className="card" data-dd="mvert-paliers" onClick={() => window.openDeepDive && window.openDeepDive("mvert-paliers")}>
          <div className="stat" style={{ fontSize: 38 }}><em>−25 %</em></div>
          <div className="card-eyebrow" style={{ marginTop: 4 }}>Palier 2028 — Ic Construction</div>
          <div className="card-body" style={{ marginTop: 8 }}>Bois & géo-sourcés deviennent la norme. Sortie définitive du chauffage gaz en collectif.</div>
        </div>
      </div>
      <Callout icon="€">
        <strong>Impact financier :</strong> surcoût de construction estimé entre <strong>5 % et 10 %</strong>, compensé par une valeur patrimoniale supérieure — la « valeur verte ».
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iii."><em>Urbanisme</em> : ZAN & résilience</Subhead>
      <div className="card feature" data-dd="mvert-urbanisme" onClick={() => window.openDeepDive && window.openDeepDive("mvert-urbanisme")}>
        <div className="card-eyebrow">Zéro Artificialisation Nette</div>
        <div className="card-title">Densifier <em>sans</em> étaler</div>
        <div className="card-body" style={{ marginTop: 8 }}>
          Ne plus transformer de terres agricoles ou naturelles en zones urbaines sans compensation. On valorise les friches, on transforme les bureaux en logements, on surélève l'existant.
        </div>
        <hr className="rule" style={{ margin: "18px 0 14px" }} />
        <div className="card-eyebrow">Résilience & adaptation</div>
        <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14.5 }}>
          <li>Recul du trait de côte — interdiction de construire en zone d'érosion (30-100 ans).</li>
          <li>ZFE — accès restreint aux véhicules polluants, impact sur la valeur immobilière.</li>
          <li>Végétalisation — désimperméabiliser les sols contre les îlots de chaleur.</li>
        </ul>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="iv."><em>Certifications</em> & labels</Subhead>
      <div className="grid grid-2 gap-sm">
        {labels.map((l, i) => (
          <div className={`card ${l.v ? "feature" : ""}`} key={i} data-dd="mvert-certifications" onClick={() => window.openDeepDive && window.openDeepDive("mvert-certifications")}>
            <div className="card-eyebrow">{l.v ? "Rénovation" : "Neuf — volontaire"}</div>
            <div className="card-title"><em>{l.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{l.d}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="v."><em>DPE</em> : énergie primaire</Subhead>
      <div className="card feature" data-dd="mvert-dpe" onClick={() => window.openDeepDive && window.openDeepDive("mvert-dpe")}>
        <div className="formula" style={{ fontSize: 18, textAlign: "center", padding: "22px 24px" }}>
          Énergie primaire <span style={{ opacity: .5 }}>=</span> Énergie finale <span style={{ opacity: .5 }}>×</span> <em>Coefficient de conversion</em>
        </div>
        <div className="kv" style={{ marginTop: 16 }}>
          <div className="kv-row"><div className="kv-k">2,3</div><div className="kv-v">Électricité — 2,3 kWh primaire pour 1 kWh consommé</div></div>
          <div className="kv-row"><div className="kv-k">1</div><div className="kv-v">Gaz naturel · Fioul · Bois</div></div>
        </div>
        <div className="card-body" style={{ marginTop: 14 }}>
          Le DPE classe les logements en kWhEP/m²/an <strong>et</strong> kg CO₂/m²/an. Le coefficient de conversion peut faire basculer une classe — clé dans la lutte contre les passoires thermiques.
        </div>
      </div>
    </section>
  );
}

/* ============ Module Urbanisme — Urbanisme & Construction ============ */
function ModuleUrba({ mod, head }) {
  const docs = [
    { t: "SCoT", s: "Schéma de Cohérence Territoriale", d: "Document pivot et intégrateur : fixe les orientations fondamentales à l'échelle intercommunale, de manière souple.", feat: true },
    { t: "PLU / PLUi", s: "Plan Local d'Urbanisme", d: "Règles très opérationnelles : zones constructibles, hauteur, emprise au sol, aspect extérieur.", feat: false },
    { t: "Carte communale", s: "Petites communes", d: "Délimite les secteurs où les constructions sont autorisées. L'outil de planification le plus simple.", feat: false },
  ];
  const autos = [
    { t: "Déclaration préalable", d: "Travaux de faible importance." },
    { t: "Permis de construire", d: "L'autorisation la plus connue." },
    { t: "Permis d'aménager", d: "Opérations modifiant substantiellement le paysage." },
    { t: "Permis de démolir", d: "Travaux ayant pour objet de démolir." },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">Le <em>cadre</em> réglementaire</Subhead>
      <div className="card feature" data-dd="murba-cadre" onClick={() => window.openDeepDive && window.openDeepDive("murba-cadre")}>
        <div className="card-eyebrow">La pierre angulaire</div>
        <div className="card-title">Le <em>Code de l'urbanisme</em> au sommet</div>
        <div className="card-body" style={{ marginTop: 8 }}>
          Le droit de l'urbanisme encadre l'utilisation des sols et organise les espaces habités. Au sommet de la hiérarchie normative : le Code de l'urbanisme, qui rassemble l'ensemble des dispositions législatives et réglementaires applicables.
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Les <em>documents</em> d'urbanisme</Subhead>
      <div className="grid grid-3 gap-sm">
        {docs.map((d, i) => (
          <div className={`card ${d.feat ? "feature" : ""}`} key={i} data-dd="murba-documents" onClick={() => window.openDeepDive && window.openDeepDive("murba-documents")}>
            <div className="card-eyebrow">{d.s}</div>
            <div className="card-title"><em>{d.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{d.d}</div>
          </div>
        ))}
      </div>
      <Callout icon="▦">
        <strong>Servitudes d'utilité publique :</strong> contraintes d'intérêt général — protection des monuments historiques, préservation des ressources naturelles, prévention des risques.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">La <em>hiérarchie</em> des normes</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="murba-hierarchie" onClick={() => window.openDeepDive && window.openDeepDive("murba-hierarchie")}>
          <div className="card-eyebrow">Opposabilité marquée</div>
          <div className="card-title"><em>Compatibilité</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Ne pas contrarier les orientations du document supérieur.</div>
        </div>
        <div className="card" data-dd="murba-hierarchie" onClick={() => window.openDeepDive && window.openDeepDive("murba-hierarchie")}>
          <div className="card-eyebrow">Opposabilité souple</div>
          <div className="card-title"><em>Prise en compte</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Ne pas s'écarter des objectifs, sauf motif justifié.</div>
        </div>
      </div>
      <Callout icon="⚖">
        <strong>Réforme du 1er avril 2021</strong> (loi ELAN art. 46 · ordonnance n° 2020-745) : le SCoT devient le document « intégrateur » — PLU et cartes communales ne sont plus opposables qu'à lui. Le préfet réalise une <strong>note d'enjeux</strong> (art. L. 131-1).
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iv.">Les <em>autorisations</em> d'urbanisme</Subhead>
      <div className="grid grid-2 gap-sm">
        {autos.map((a, i) => (
          <div className="card" key={i} data-dd="murba-autorisations" onClick={() => window.openDeepDive && window.openDeepDive("murba-autorisations")}>
            <div className="card-eyebrow">Autorisation</div>
            <div className="card-title" style={{ fontSize: 19 }}><em>{a.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{a.d}</div>
          </div>
        ))}
      </div>
      <div className="dim" style={{ marginTop: 14, fontSize: 13.5 }}>
        Toutes instruites par le <strong>maire</strong> — un filtre préventif contre les constructions illégales.
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="v.">Les <em>normes</em> techniques</Subhead>
      <div className="grid grid-2 gap-sm">
        <div className="card" data-dd="murba-normes" onClick={() => window.openDeepDive && window.openDeepDive("murba-normes")}>
          <div className="card-eyebrow">Sécurité & performance</div>
          <div className="card-title">Thermique & <em>incendie</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>RT2012 → RE2020 pour l'énergie. Sécurité incendie particulièrement stricte pour les ERP : matériaux, compartimentage, alarme et extinction.</div>
        </div>
        <div className="card" data-dd="murba-normes" onClick={() => window.openDeepDive && window.openDeepDive("murba-normes")}>
          <div className="card-eyebrow">Loi du 11 février 2005</div>
          <div className="card-title"><em>Accessibilité</em> & risques</div>
          <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14.5 }}>
            <li>Cheminements, rampes, sanitaires, ascenseurs.</li>
            <li>PPR dans les zones exposées.</li>
            <li>Contrôle technique & diagnostics (plomb, amiante…).</li>
          </ul>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="vi.">La <em>responsabilité</em> des constructeurs</Subhead>
      <div className="card feature" data-dd="murba-responsabilite" onClick={() => window.openDeepDive && window.openDeepDive("murba-responsabilite")}>
        <div className="card-eyebrow">Articles 1792 et s. du Code civil</div>
        <div className="card-title">La <em>garantie décennale</em></div>
        <div className="card-body" style={{ marginTop: 8 }}>
          Responsabilité de plein droit : réparer pendant 10 ans, après réception, les dommages compromettant la solidité ou rendant l'ouvrage impropre. Pas de faute à prouver. Assurance décennale obligatoire.
        </div>
        <hr className="rule" style={{ margin: "18px 0 14px" }} />
        <div className="kv">
          <div className="kv-row"><div className="kv-k">10 ans</div><div className="kv-v">Décennale — solidité & destination de l'ouvrage</div></div>
          <div className="kv-row"><div className="kv-k">2 ans</div><div className="kv-v">Biennale — équipements dissociables</div></div>
          <div className="kv-row"><div className="kv-k">1 an</div><div className="kv-v">Parfait achèvement · isolation phonique</div></div>
        </div>
      </div>
      <Callout icon="⚖">
        <strong>Responsabilité in solidum :</strong> la victime peut réclamer l'intégralité de la réparation à n'importe lequel des constructeurs impliqués. Sa mise en œuvre passe souvent par une expertise judiciaire.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="vii.">Les <em>recours</em></Subhead>
      <div className="grid grid-3 gap-sm">
        <div className="card" data-dd="murba-recours" onClick={() => window.openDeepDive && window.openDeepDive("murba-recours")}>
          <div className="card-eyebrow">Amiable</div>
          <div className="card-title"><em>Gracieux</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Demander à l'auteur de la décision de la reconsidérer.</div>
        </div>
        <div className="card" data-dd="murba-recours" onClick={() => window.openDeepDive && window.openDeepDive("murba-recours")}>
          <div className="card-eyebrow">Amiable</div>
          <div className="card-title"><em>Hiérarchique</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Saisir le supérieur — en urbanisme, le préfet.</div>
        </div>
        <div className="card feature" data-dd="murba-recours" onClick={() => window.openDeepDive && window.openDeepDive("murba-recours")}>
          <div className="card-eyebrow">Contentieux — 2 mois</div>
          <div className="card-title"><em>Excès de pouvoir</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Tribunal administratif. Décret du 17 juillet 2018 : cristallisation des moyens, art. L. 600-7.</div>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="viii.">Les <em>litiges privés</em></Subhead>
      <div className="card" data-dd="murba-litiges" onClick={() => window.openDeepDive && window.openDeepDive("murba-litiges")}>
        <div className="card-eyebrow">Du dialogue au prétoire</div>
        <div className="card-title">Amiable <em>d'abord</em>, juge ensuite</div>
        <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14.5 }}>
          <li>Négociation directe, puis médiation (tiers neutre).</li>
          <li>Référés : expertise, provision, préventif · action en garantie des vices cachés.</li>
          <li>Juge des contentieux de la protection ≤ 10 000 € · tribunal judiciaire au-delà (avocat obligatoire).</li>
          <li>Prescription : agir dans les 10 ans suivant la manifestation du dommage.</li>
        </ul>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ix.">Les autorisations <em>en pratique</em></Subhead>
      <div className="card" data-dd="murba-pratique" onClick={() => window.openDeepDive && window.openDeepDive("murba-pratique")}>
        <div className="card-eyebrow">DP ou PC ? Le réflexe des cas courants</div>
        <div className="kv" style={{ marginTop: 12 }}>
          <div className="kv-row"><div className="kv-k">Piscine</div><div className="kv-v">DP ≤ 100 m² · PC &gt; 100 m² ou abri &gt; 1,80 m</div></div>
          <div className="kv-row"><div className="kv-k">Véranda</div><div className="kv-v">DP 5–20 m² · PC &gt; 20 m²</div></div>
          <div className="kv-row"><div className="kv-k">Clôture</div><div className="kv-v">DP selon PLU / secteurs protégés (R. 421-12)</div></div>
          <div className="kv-row"><div className="kv-k">Garage → logement</div><div className="kv-v">DP sans modif. structure · PC si façade/porteur</div></div>
        </div>
      </div>
      <div className="grid grid-2 gap-sm" style={{ marginTop: 18 }}>
        <div className="card" data-dd="murba-pratique" onClick={() => window.openDeepDive && window.openDeepDive("murba-pratique")}>
          <div className="card-eyebrow">Délais d'instruction</div>
          <div className="kv" style={{ marginTop: 10 }}>
            <div className="kv-row"><div className="kv-k">1 mois</div><div className="kv-v">Déclaration préalable (accord tacite)</div></div>
            <div className="kv-row"><div className="kv-k">2 mois</div><div className="kv-v">Permis de construire — maison individuelle</div></div>
            <div className="kv-row"><div className="kv-k">3 mois</div><div className="kv-v">Autres constructions · permis d'aménager</div></div>
          </div>
          <div className="dim" style={{ marginTop: 10, fontSize: 12.5 }}>+1 mois en secteur protégé (ABF) · CUa 1 mois / CUb 2 mois</div>
        </div>
        <div className="card" data-dd="murba-pratique" onClick={() => window.openDeepDive && window.openDeepDive("murba-pratique")}>
          <div className="card-eyebrow">Fiscalité & dossier</div>
          <div className="card-body" style={{ marginTop: 8 }}>
            <strong>Taxe d'aménagement</strong> dès 5 m² de surface de plancher · réévaluation de la taxe foncière (déclaration H1/H2 sous 90 j) · PVR, PFAC.
          </div>
          <div className="dim" style={{ marginTop: 10, fontSize: 12.5 }}>Dossier : plan de situation, de masse, façades, notice, photos. Secteur protégé → avis ABF.</div>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="x."><em>Perspectives</em> & défis futurs</Subhead>
      <div className="grid grid-3 gap-sm">
        <div className="card" data-dd="murba-perspectives" onClick={() => window.openDeepDive && window.openDeepDive("murba-perspectives")}>
          <div className="card-eyebrow">Transition écologique</div>
          <div className="card-title"><em>ZAN 2050</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Loi Climat et Résilience (22 août 2021) : zéro artificialisation nette à l'horizon 2050.</div>
        </div>
        <div className="card" data-dd="murba-perspectives" onClick={() => window.openDeepDive && window.openDeepDive("murba-perspectives")}>
          <div className="card-eyebrow">Numérique</div>
          <div className="card-title">Le <em>BIM</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Modélisation des données du bâtiment + dématérialisation — nouvelles questions de responsabilité et de données.</div>
        </div>
        <div className="card" data-dd="murba-perspectives" onClick={() => window.openDeepDive && window.openDeepDive("murba-perspectives")}>
          <div className="card-eyebrow">Société</div>
          <div className="card-title">Densité & <em>passoires</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Densification, judiciarisation, télétravail, interdiction de louer les passoires thermiques.</div>
        </div>
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="xi.">Surfaces : <em>SdP, ES & CES</em></Subhead>
      <div className="grid grid-3 gap-sm">
        <div className="card" data-dd="murba-surfaces" onClick={() => window.openDeepDive && window.openDeepDive("murba-surfaces")}>
          <div className="card-eyebrow">Art. R. 111-22</div>
          <div className="card-title">Surface de <em>plancher</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Surfaces closes & couvertes, h &gt; 1,80 m, au nu intérieur. Déduction des murs, trémies, gaines, escaliers.</div>
        </div>
        <div className="card" data-dd="murba-surfaces" onClick={() => window.openDeepDive && window.openDeepDive("murba-surfaces")}>
          <div className="card-eyebrow">Art. R. 420-1</div>
          <div className="card-title">Emprise au <em>sol</em></div>
          <div className="card-body" style={{ marginTop: 8 }}>Projection verticale : la toiture vue du ciel, débords compris (vérandas, garages, carports…).</div>
        </div>
        <div className="card" data-dd="murba-surfaces" onClick={() => window.openDeepDive && window.openDeepDive("murba-surfaces")}>
          <div className="card-eyebrow">Ratio du PLU</div>
          <div className="card-title"><em>CES</em></div>
          <div className="formula" style={{ marginTop: 10, fontSize: 14, padding: "14px 16px", textAlign: "center" }}>ES totale ÷ surface du terrain</div>
        </div>
      </div>
      <Callout icon="▦">
        <strong>À quoi ça sert :</strong> la SdP détermine DP/PC, déclenche la taxe d'aménagement et fixe le seuil <strong>architecte obligatoire (&gt; 150 m²)</strong> ; le CES limite la surface constructible et indique l'extension restante.
      </Callout>
    </section>
  );
}

/* ============ Module Écoquartier — Ville durable ============ */
function ModuleVille({ mod, head }) {
  const triptyque = [
    { t: "Vivable", d: "Environnemental + Social", e: "bearable" },
    { t: "Viable", d: "Environnemental + Économique", e: "viable" },
    { t: "Équitable", d: "Social + Économique", e: "equitable" },
  ];
  const themes = [
    { t: "Énergie & ressources", items: ["Sobriété & efficacité (isolation, bioclimatique)", "Énergies renouvelables (solaire, éolien)", "Eau : récupération des eaux de pluie", "Déchets : tri, compostage, recyclage"] },
    { t: "Mobilité & nature", items: ["Transports doux : marche, vélo, TC", "Limitation de la voiture (parkings reportés)", "Espaces verts : parcs, jardins, toits végétalisés", "Préservation de la biodiversité"] },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i."><em>Définition</em> & principes</Subhead>
      <Callout icon="⬢">
        <strong>Un écoquartier</strong> est un projet d'aménagement urbain qui intègre les objectifs du <strong>développement durable</strong>, adapté aux caractéristiques du territoire.
      </Callout>
      <div className="grid grid-3 gap-sm" style={{ marginTop: 22 }}>
        {triptyque.map((t, i) => (
          <div className="card" key={i} data-dd="mville-definition" onClick={() => window.openDeepDive && window.openDeepDive("mville-definition")}>
            <div className="card-eyebrow">{t.e}</div>
            <div className="card-title"><em>{t.t}</em></div>
            <div className="card-body" style={{ marginTop: 8 }}>{t.d}</div>
          </div>
        ))}
      </div>
      <div className="dim" style={{ marginTop: 14, fontSize: 13.5 }}>
        Au croisement des trois cercles : le développement <strong>durable</strong>. Les 4 piliers à l'urbain : environnement · social · économique · gouvernance.
      </div>
      <Callout icon="✦">
        <strong>Label ÉcoQuartier</strong> (20 engagements). Exemples : la <strong>ZAC de Bonne</strong> à Grenoble, <strong>La Confluence</strong> à Lyon.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="ii."><em>Thématiques</em> d'aménagement</Subhead>
      <div className="grid grid-2 gap-sm">
        {themes.map((th, i) => (
          <div className="card" key={i} data-dd="mville-ressources" onClick={() => window.openDeepDive && window.openDeepDive(i === 0 ? "mville-ressources" : "mville-vie")}>
            <div className="card-title" style={{ fontSize: 20 }}>{th.t}</div>
            <ul style={{ marginTop: 10, paddingLeft: 18, lineHeight: 1.7, color: "var(--ink-2)", fontSize: 14.5 }}>
              {th.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">Social & <em>gouvernance</em></Subhead>
      <div className="card feature" data-dd="mville-vie" onClick={() => window.openDeepDive && window.openDeepDive("mville-vie")}>
        <div className="card-eyebrow">Faire la ville avec ses habitants</div>
        <div className="card-title">Mixité & <em>participation</em></div>
        <div className="card-body" style={{ marginTop: 8 }}>
          Mixité fonctionnelle (logements, commerces, services) et mixité sociale. Participation citoyenne et co-construction du projet — l'écoquartier se vit autant qu'il se construit.
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Module11, ModuleSynthese, ModuleDroit, ModuleProp, ModuleVert, ModuleUrba, ModuleVille });
