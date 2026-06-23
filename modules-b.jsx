/* global React, Subhead, Callout */

/* ============ Module 5 — Diagnostics ============ */
function Module05({ mod, head }) {
  const diags = [
    { k:"DPE",         c:"Tous biens",                d:"10 ans",            star: true },
    { k:"ERP",         c:"Tous biens",                d:"6 mois",            star: true },
    { k:"Plomb (CREP)",c:"Avant 1949",                d:"Illimitée si négatif / 1 an si positif (vente)" },
    { k:"Amiante",     c:"PC avant 1ᵉʳ juillet 1997", d:"Illimitée si négatif" },
    { k:"Gaz",         c:"Installation > 15 ans",     d:"3 ans (vente) / 6 ans (loc.)" },
    { k:"Électricité", c:"Installation > 15 ans",     d:"3 ans (vente) / 6 ans (loc.)" },
    { k:"Termites",    c:"Zones arrêté préfect.",     d:"6 mois" },
    { k:"Assainissement", c:"Non raccordé tout-à-l'égout", d:"3 ans" },
    { k:"Bruit",       c:"Zones aéroportuaires",      d:"Illimitée" },
  ];
  const retenir = [
    { l:"DPE + ERP", v:"→ TOUJOURS obligatoires", tone:"accent" },
    { l:"Plomb",     v:"→ avant 1949" },
    { l:"Amiante",   v:"→ avant 1997" },
    { l:"Gaz / Élec.",v:"→ si > 15 ans" },
    { l:"Termites",  v:"→ zone préfect." },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 36, alignItems: "start" }}>
        <div>
          <Subhead num="i.">Tableau <em>complet</em></Subhead>
          <div className="table" data-dd="m5-tableau" onClick={() => window.openDeepDive && window.openDeepDive("m5-tableau")} style={{ cursor: "pointer" }}>
            <div className="table-row header" style={{ gridTemplateColumns: "1.2fr 1.4fr 1.4fr" }}>
              <div>Diagnostic</div><div>Concerne</div><div>Validité</div>
            </div>
            {diags.map((d,i) => (
              <div className="table-row" key={i} style={{ gridTemplateColumns: "1.2fr 1.4fr 1.4fr" }}>
                <div>
                  <strong>{d.k}</strong>
                  {d.star && <span className="accent" style={{ marginLeft: 6 }}>★</span>}
                </div>
                <div className="dim">{d.c}</div>
                <div className="cell-mono">{d.d}</div>
              </div>
            ))}
          </div>
          <Callout variant="forest" icon="◆">
            <strong>DDT</strong> = Dossier de Diagnostics Techniques — il regroupe tous les diagnostics applicables au bien.
          </Callout>
        </div>

        <div>
          <Subhead>À <em>retenir</em></Subhead>
          <div className="card feature" style={{ padding: "26px 26px" }}>
            <div className="card-eyebrow">Mémo express</div>
            <div className="kv" style={{ marginTop: 16 }}>
              {retenir.map((r,i) => (
                <div className="kv-row" key={i} style={{ gridTemplateColumns: "1fr 1.4fr" }}>
                  <div className="kv-k" style={{ color: r.tone === "accent" ? "var(--accent)" : undefined }}>{r.l}</div>
                  <div className="kv-v"><strong>{r.v}</strong></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card dark" style={{ marginTop: 20 }}>
            <div className="card-eyebrow">Astuce d'examen</div>
            <div className="card-title" style={{ fontSize: 22 }}>
              Toujours <em style={{ color: "#e9c9b8" }}>DPE + ERP</em>.
            </div>
            <div className="card-body" style={{ color: "rgba(244,237,224,.75)", marginTop: 8 }}>
              Le reste dépend de la date de construction, de l'âge des installations ou d'un arrêté préfectoral.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Module 6 — Estimation ============ */
function Module06({ mod, head }) {
  const methodes = [
    { k:"Par comparaison",     d:"Analyse des ventes récentes de biens similaires. Réduction au m². La plus utilisée (fisc + juridictions).", f:"Prix m² moyen × Surface du bien", flag:"référence" },
    { k:"Par capitalisation",  d:"Valeur basée sur les revenus locatifs. Côté investisseur. Plus le taux est bas, plus le prix est élevé.", f:"Loyer annuel ÷ Taux de capitalisation" },
    { k:"Sol + construction",  d:"Valorise séparément le terrain et le bâti. Méthode privilégiée pour les maisons et immeubles.", f:"Valeur sol + Valeur bâti − vétusté" },
    { k:"Indiciaire",          d:"Basée sur le prix d'achat actualisé avec un coefficient d'érosion monétaire.", f:"Prix achat × Coeff. érosion monétaire" },
    { k:"Par les coûts",       d:"Coût de reconstruction à l'identique. Adaptée aux cas spécifiques (assurances, copropriétés).", f:"Foncier + Bâti + Équipements" },
    { k:"Compte à rebours",    d:"Part du prix de vente possible. Utilisée par promoteurs / lotisseurs.", f:"Prix vente − marge − travaux − frais" },
  ];
  const avantR1 = [
    { i:"☎", t:"Confirmer le RDV + pré-découverte", d:"Qui / Quoi / Pourquoi / Quand / Où" },
    { i:"⎙", t:"Demander les documents", d:"Titre de propriété, taxe foncière, charges de copropriété" },
    { i:"⌖", t:"Rechercher les ventes récentes", d:"DVF, Google Maps, Street View" },
    { i:"⌂", t:"Analyser la concurrence", d:"Biens similaires actuellement en vente sur le secteur" },
  ];
  const temps = [
    { t:"Son PASSÉ", items:["Comment a-t-il acheté le bien ?","Via agence ou particulier ?","A-t-il fait une offre à la baisse ?"] },
    { t:"Son PRÉSENT", items:["Qui vend ? (tous propriétaires)","Raison de la vente","Situation actuelle du bien"] },
    { t:"Son FUTUR", items:["Délai souhaité de vente","Date limite d'encaissement","Réemploi des fonds prévus ?"] },
  ];
  const pond = [
    { k:"Ascenseur", v:"+1 à 2 %" },
    { k:"Espaces verts", v:"+5 %" },
    { k:"RDC", v:"jusqu'à −30 %" },
    { k:"Sans espaces verts", v:"−5 %" },
    { k:"Sans ascenseur", v:"−8 %" },
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">Six <em>méthodes</em> d'estimation</Subhead>
      <div className="grid grid-3 gap-sm">
        {methodes.map((m,i) => {
          const ddSlugs = ["m6-comparaison", "m6-capitalisation", null, null, null, null];
          const slug = ddSlugs[i];
          return (
          <div className={`card ${i===0 ? "feature" : ""}`} key={i} data-dd={slug || undefined} onClick={slug ? () => window.openDeepDive && window.openDeepDive(slug) : undefined}>
            <div className="card-eyebrow">Méthode 0{i+1} {m.flag && <span className="accent">· {m.flag}</span>}</div>
            <div className="card-title">{m.k}</div>
            <div className="card-body">{m.d}</div>
            <div className="formula formula-mono" style={{ marginTop: 14, fontSize: 15, padding: "14px 16px" }}>{m.f}</div>
          </div>
          );
        })}
      </div>

      <div style={{ height: 48 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.1fr", gap: 32 }}>
        <div>
          <Subhead num="ii.">Avant le <em>R1</em></Subhead>
          <div className="grid" style={{ gap: 12 }}>
            {avantR1.map((s,i) => (
              <div className="card" key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }} data-dd="m6-r1" onClick={() => window.openDeepDive && window.openDeepDive("m6-r1")}>
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 28, color: "var(--accent)", lineHeight: 1 }}>{s.i}</div>
                <div>
                  <div className="card-title" style={{ fontSize: 18 }}>{s.t}</div>
                  <div className="card-body" style={{ marginTop: 2 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Subhead num="iii.">Découverte vendeur — <em>3 temps</em></Subhead>
          <div className="grid" style={{ gap: 12 }}>
            {temps.map((t,i) => (
              <div className="card" key={i} data-dd="m6-decouverte" onClick={() => window.openDeepDive && window.openDeepDive("m6-decouverte")}>
                <div className="card-eyebrow">Temps {i+1}</div>
                <div className="card-title" style={{ fontSize: 20 }}>{t.t}</div>
                <ul className="list-clean arrow" style={{ marginTop: 10 }}>
                  {t.items.map((it,j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Callout variant="gold" icon="◆">
        <strong>Bonne découverte vendeur</strong> = meilleur argumentaire + traitement des objections facilité au R2.
      </Callout>

      <div style={{ height: 32 }} />
      <Subhead>Grille de <em>pondération</em></Subhead>
      <div className="grid grid-5 gap-sm">
        {pond.map((p,i) => (
          <div className="card" key={i} style={{ padding: "16px 18px" }}>
            <div className="card-eyebrow">{p.k}</div>
            <div className="stat" style={{ fontSize: 34, marginTop: 8 }}><em>{p.v}</em></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ Module 6 bis — Viager ============ */
function Module06bis({ mod, head }) {
  const termes = [
    { k:"Crédirentier", d:"Le VENDEUR — reçoit la rente viagère jusqu'à son décès" },
    { k:"Débirentier",  d:"L'ACHETEUR — verse la rente et le bouquet initial" },
    { k:"Bouquet",      d:"Somme versée COMPTANT lors de la vente (≈ 20-30 % de la valeur)" },
    { k:"Rente viagère",d:"Versement périodique jusqu'au décès du crédirentier" },
  ];
  const types = [
    { k:"Viager occupé", pct:"≈95 % des cas", d:"Le vendeur reste dans le bien (droit d'usage). La valeur est réduite d'un abattement d'occupation (20 à 40 %).", flag:"Plus accessible pour l'acheteur" },
    { k:"Viager libre", pct:"", d:"Le bien est immédiatement disponible pour l'acheteur. Pas d'abattement — valeur pleine du bien.", flag:"Plus coûteux pour l'acheteur" },
  ];
  const fiscal = [
    "Réduction de l'IFI (Impôt sur la Fortune Immobilière)",
    "Optimisation des droits de succession",
    "Baisse de l'impôt sur le revenu foncier",
    "Transmission anticipée du patrimoine",
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">Le viager — <em>termes clés</em></Subhead>
      <div className="grid grid-4 gap-sm">
        {termes.map((t,i) => (
          <div className="card" key={i} data-dd="m6b-bases" onClick={() => window.openDeepDive && window.openDeepDive("m6b-bases")}>
            <div className="card-eyebrow">Terme {String(i+1).padStart(2,"0")}</div>
            <div className="card-title">{t.k}</div>
            <div className="card-body">{t.d}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Les <em>2 types</em> de viager</Subhead>
      <div className="grid grid-2">
        {types.map((t,i) => (
          <div className={`card ${i===0 ? "feature" : ""}`} key={i}>
            <div className="card-eyebrow">{t.pct || "Option 02"}</div>
            <div className="card-title" style={{ fontSize: 30, marginTop: 4 }}>{t.k}</div>
            <div className="card-body" style={{ marginTop: 8 }}>{t.d}</div>
            <div className="italic-d" style={{ marginTop: 12, color: "var(--accent)", fontSize: 16 }}>→ {t.flag}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 32 }} />
      <div className="grid grid-2">
        <div className="formula">
          <div className="card-eyebrow" style={{ marginBottom: 10 }}>Calcul de la rente</div>
          Rente = (Valeur nue-propriété − Bouquet) ÷ Coeff. barème
        </div>
        <div className="formula">
          <div className="card-eyebrow" style={{ marginBottom: 10 }}>Valeur de l'usufruit</div>
          Valeur usufruit = Valeur vénale × % barème fiscal (âge)
        </div>
      </div>

      <Callout variant="danger" icon="◆">
        L'<strong>aléa</strong> est l'essence du viager : si le vendeur vit longtemps → avantage vendeur. Décès précoce → avantage acheteur.
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">Démembrement de <em>propriété</em></Subhead>
      <div className="card feature" style={{ padding: 24, marginBottom: 22 }} data-dd="m6b-demembrement" onClick={() => window.openDeepDive && window.openDeepDive("m6b-demembrement")}>
        <div className="card-eyebrow">Équation fondamentale</div>
        <div className="formula" style={{ marginTop: 10, background: "transparent", border: 0, padding: 0, fontSize: 30 }}>
          <em>Pleine propriété</em>  =  <em>Usufruit</em>  +  <em>Nue-propriété</em>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-eyebrow">Usufruitier · Usus + Fructus</div>
          <div className="card-title">Usufruit</div>
          <ul className="list-clean arrow" style={{ marginTop: 12 }}>
            <li>Droit d'utiliser le bien (<em>usus</em>)</li>
            <li>Droit de percevoir les revenus / loyers (<em>fructus</em>)</li>
            <li>Ne peut pas vendre sans accord du nu-propriétaire</li>
            <li>Doit entretenir le bien (charges courantes)</li>
          </ul>
        </div>
        <div className="card">
          <div className="card-eyebrow">Nu-propriétaire · Abusus</div>
          <div className="card-title">Nue-propriété</div>
          <ul className="list-clean arrow" style={{ marginTop: 12 }}>
            <li>Droit de disposer du bien (vendre, donner)</li>
            <li>Ne peut pas l'utiliser sans accord de l'usufruitier</li>
            <li>Récupère la pleine propriété à l'extinction de l'usufruit</li>
            <li>Gros travaux à sa charge</li>
          </ul>
        </div>
      </div>

      <div style={{ height: 24 }} />
      <div className="card dark">
        <div className="card-eyebrow">Avantages fiscaux</div>
        <div className="card-title" style={{ fontSize: 24 }}>Pourquoi démembrer ?</div>
        <div className="grid grid-2" style={{ marginTop: 14, gap: 10 }}>
          {fiscal.map((f,i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "rgba(244,237,224,.85)" }}>
              <span style={{ color: "#e9c9b8" }}>✓</span><span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Module 8 — Mandats ============ */
function Module08({ mod, head }) {
  const types = [
    { k:"Simple",        d:"Plusieurs agences possibles. Pas de monopole.",                irr:"Aucune" },
    { k:"Exclusif",      d:"Un seul mandataire. Résiliation après 3 mois (préavis 15 j). Clause pénale possible.", irr:"3 mois min." },
    { k:"Semi-exclusif", d:"Exclusivité + le propriétaire peut vendre en direct.",          irr:"3 mois min." },
    { k:"De recherche",  d:"Conclu avec un ACQUÉREUR — précise zone, type de bien, budget.",irr:"Variable" },
  ];
  const mentions = [
    "Identité mandant + mandataire",
    "N° carte professionnelle",
    "RCP + Garantie financière",
    "Désignation précise du bien",
    "Prix de vente TTC",
    "Durée + modalités de résiliation",
    "Montant et répartition des honoraires",
    "N° au registre des mandats",
    "Moyens de diffusion utilisés",
  ];
  const vendeur = [
    "CNI, livret de famille, contrat de mariage / PACS",
    "Titre de propriété (date, prix achat, financement)",
    "Dernier avis de taxe foncière",
    "Factures travaux / devis si rénovation récente",
  ];
  const copro = [
    "PV d'assemblées générales (3 dernières années)",
    "Relevés de charges (2 dernières années)",
    "Règlement de copropriété",
    "État descriptif de division",
    "Carnet d'entretien de l'immeuble",
    "Fiche d'immatriculation + fiche synthétique",
    "Extrait du cadastre",
  ];
  const pleine = [
    "Permis de construire (si travaux > 20 m²)",
    "Déclaration préalable + certificat de conformité (si < 10 ans)",
    "Extrait du cadastre",
  ];

  return (
    <section className="module" data-mod={mod.id} id={mod.id} style={{ "--mc": mod.color, "--mcs": mod.colorSoft }}>
      {head}

      <Subhead num="i.">Types de <em>mandats</em></Subhead>
      <div className="grid grid-4 gap-sm">
        {types.map((t,i) => (
          <div className={`card ${i===1 ? "feature" : ""}`} key={i} data-dd="m8-types" onClick={() => window.openDeepDive && window.openDeepDive("m8-types")}>
            <div className="card-eyebrow">Type 0{i+1}</div>
            <div className="card-title">{t.k}</div>
            <div className="card-body">{t.d}</div>
            <hr className="rule" style={{ margin: "14px 0 10px" }} />
            <div className="kv-row" style={{ gridTemplateColumns: "1fr 1fr", paddingBottom: 0, borderBottom: 0 }}>
              <div className="kv-k">Irrévocabilité</div>
              <div className="kv-v"><strong>{t.irr}</strong></div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 48 }} />
      <Subhead num="ii.">Mentions <em>obligatoires</em> · Loi Hoguet</Subhead>
      <div className="grid grid-3 gap-sm">
        {mentions.map((m,i) => (
          <div className="card" key={i} style={{ display:"flex", gap: 16, alignItems: "center", padding: "16px 18px" }} data-dd="m8-mentions" onClick={() => window.openDeepDive && window.openDeepDive("m8-mentions")}>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontStyle: "italic", fontSize: 32, color: "var(--accent)", lineHeight: 1, minWidth: 28 }}>{String(i+1).padStart(2,"0")}</div>
            <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{m}</div>
          </div>
        ))}
      </div>
      <Callout variant="danger" icon="🚨">
        <strong>Règle d'or :</strong> 1 mention manquante = <strong>nullité du mandat</strong> = zéro honoraire (même si la vente a eu lieu).
      </Callout>

      <div style={{ height: 48 }} />
      <Subhead num="iii.">Le <em>registre</em> & le dossier</Subhead>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        <div className="card dark" data-dd="m8-registre" onClick={() => window.openDeepDive && window.openDeepDive("m8-registre")} style={{ cursor: "pointer" }}>
          <div className="card-eyebrow">Registre des mandats</div>
          <div className="card-title" style={{ fontSize: 22 }}>Tenu <em style={{ color:"#e9c9b8" }}>sans blanc ni rature</em>.</div>
          <ul className="list-clean arrow" style={{ marginTop: 14, color: "rgba(244,237,224,.85)" }}>
            <li>Obligatoire (papier ou électronique)</li>
            <li>Unique par agence — sauf T et G = 2 registres</li>
            <li>Numérotation chronologique</li>
            <li>Toutes les caractéristiques du mandat</li>
            <li>Délégation de mandat = à inscrire</li>
          </ul>
        </div>

        <div className="grid grid-3 gap-sm">
          <div className="card">
            <div className="card-eyebrow">Documents vendeur</div>
            <div className="card-title" style={{ fontSize: 18 }}>Pièces de base</div>
            <ul className="list-clean" style={{ marginTop: 10 }}>
              {vendeur.map((v,i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
          <div className="card">
            <div className="card-eyebrow">Bien en copropriété</div>
            <div className="card-title" style={{ fontSize: 18 }}>Pièces complémentaires</div>
            <ul className="list-clean" style={{ marginTop: 10 }}>
              {copro.map((v,i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
          <div className="card">
            <div className="card-eyebrow">Pleine propriété</div>
            <div className="card-title" style={{ fontSize: 18 }}>Pièces complémentaires</div>
            <ul className="list-clean" style={{ marginTop: 10 }}>
              {pleine.map((v,i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <Callout variant="gold" icon="◆">
        <strong>Loi Hamon</strong> : DIP (Document d'Information Précontractuelle) obligatoire + droit de rétractation 14 jours pour les mandats signés <em>hors établissement</em>.
      </Callout>
    </section>
  );
}

Object.assign(window, { Module05, Module06, Module06bis, Module08 });
