/* ============================================
   LENNY — Calculatrices interactives (BTS PI)
   Overlay live : mensualité, capacité HCSF, endettement, rendement,
   honoraires, plus-value, tantièmes (charges copro), viager.
   API : window.LennyCalc.open('pret' | ...) — sans argument => 1re calc.
   Aucune dépendance de données (tout est en interne).
   ============================================ */
(function () {
  "use strict";

  /* ---------- helpers de formatage ---------- */
  function eur(n) {
    if (!isFinite(n)) return "—";
    return Math.round(n).toLocaleString("fr-FR") + " €";
  }
  function eur2(n) {
    if (!isFinite(n)) return "—";
    return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }
  function pct(n, d) {
    if (!isFinite(n)) return "—";
    return n.toLocaleString("fr-FR", { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d }) + " %";
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  // mensualité d'un prêt amortissable
  function mensualite(capital, tauxAnnuel, annees) {
    const n = annees * 12;
    const t = tauxAnnuel / 100 / 12;
    if (t === 0) return capital / n;
    return capital * t / (1 - Math.pow(1 + t, -n));
  }
  // capital empruntable pour une mensualité donnée
  function capitalEmpruntable(mens, tauxAnnuel, annees) {
    const n = annees * 12;
    const t = tauxAnnuel / 100 / 12;
    if (t === 0) return mens * n;
    return mens * (1 - Math.pow(1 + t, -n)) / t;
  }

  /* ---------- définition des calculatrices ----------
     Chaque calc : { id, pole, name, tag, desc, inputs[], compute(v) -> {rows[], verdict?, note?} }
     input : { k, label, suffix, def, min, max, step }
  */
  const CALCS = [
    {
      id: "pret", pole: "Financement", name: "Mensualité de prêt", tag: "Crédit",
      desc: "Mensualité, coût total et intérêts d'un prêt amortissable à taux fixe.",
      inputs: [
        { k: "capital", label: "Montant emprunté", suffix: "€", def: 200000, min: 0, step: 1000 },
        { k: "taux", label: "Taux nominal annuel", suffix: "%", def: 3.5, min: 0, step: 0.05 },
        { k: "duree", label: "Durée", suffix: "ans", def: 20, min: 1, max: 30, step: 1 },
        { k: "assur", label: "Assurance (taux annuel)", suffix: "%", def: 0.34, min: 0, step: 0.01 },
      ],
      compute(v) {
        const m = mensualite(v.capital, v.taux, v.duree);
        const assurMens = v.capital * (v.assur / 100) / 12;
        const total = (m + assurMens) * v.duree * 12;
        const interets = m * v.duree * 12 - v.capital;
        const coutAssur = assurMens * v.duree * 12;
        return {
          hero: { label: "Mensualité (avec assurance)", value: eur2(m + assurMens) },
          rows: [
            ["Mensualité hors assurance", eur2(m)],
            ["Part assurance / mois", eur2(assurMens)],
            ["Intérêts totaux", eur(interets)],
            ["Coût total de l'assurance", eur(coutAssur)],
            ["Coût total du crédit", eur(interets + coutAssur)],
            ["Total remboursé", eur(total)],
          ],
          note: "Calcul à taux fixe, échéances constantes. L'assurance est estimée sur le capital initial (méthode courante des banques).",
        };
      },
    },
    {
      id: "capacite", pole: "Financement", name: "Capacité d'emprunt (HCSF)", tag: "HCSF 35 %",
      desc: "Combien puis-je emprunter ? Plafond d'endettement HCSF de 35 % assurance comprise.",
      inputs: [
        { k: "revenus", label: "Revenus nets mensuels du foyer", suffix: "€", def: 3500, min: 0, step: 50 },
        { k: "charges", label: "Crédits / pensions en cours (/mois)", suffix: "€", def: 200, min: 0, step: 10 },
        { k: "taux", label: "Taux nominal annuel", suffix: "%", def: 3.5, min: 0, step: 0.05 },
        { k: "duree", label: "Durée", suffix: "ans", def: 25, min: 1, max: 30, step: 1 },
        { k: "apport", label: "Apport personnel", suffix: "€", def: 30000, min: 0, step: 1000 },
      ],
      compute(v) {
        const mensMax = v.revenus * 0.35 - v.charges;
        const cap = capitalEmpruntable(Math.max(0, mensMax), v.taux, v.duree);
        const budget = cap + v.apport;
        return {
          hero: { label: "Capacité d'emprunt", value: eur(Math.max(0, cap)) },
          rows: [
            ["Mensualité maximale (35 %)", eur2(Math.max(0, mensMax))],
            ["Dont déjà absorbé par vos crédits", eur2(v.charges)],
            ["+ Apport personnel", eur(v.apport)],
            ["Budget projet total", eur(budget)],
          ],
          verdict: mensMax <= 0
            ? { tone: "bad", text: "Vos charges dépassent déjà le plafond de 35 % : capacité nulle." }
            : { tone: "ok", text: "Plafond HCSF respecté (35 % d'endettement maximum, assurance comprise)." },
          note: "Le HCSF autorise jusqu'à 35 % d'endettement et 25 ans (27 avec différé). 20 % des dossiers peuvent déroger.",
        };
      },
    },
    {
      id: "endettement", pole: "Financement", name: "Taux d'endettement", tag: "Ratio",
      desc: "Part des revenus absorbée par les charges de crédit. Seuil d'alerte : 35 %.",
      inputs: [
        { k: "revenus", label: "Revenus nets mensuels", suffix: "€", def: 3500, min: 0, step: 50 },
        { k: "mensImmo", label: "Mensualité du futur crédit", suffix: "€", def: 950, min: 0, step: 10 },
        { k: "autres", label: "Autres crédits (/mois)", suffix: "€", def: 200, min: 0, step: 10 },
      ],
      compute(v) {
        const charges = v.mensImmo + v.autres;
        const taux = v.revenus > 0 ? charges / v.revenus * 100 : Infinity;
        const reste = v.revenus - charges;
        return {
          hero: { label: "Taux d'endettement", value: pct(taux, 1) },
          rows: [
            ["Total charges de crédit", eur2(charges)],
            ["Reste à vivre", eur2(reste)],
            ["Seuil HCSF", "35,0 %"],
          ],
          verdict: taux <= 35
            ? { tone: "ok", text: "Sous le seuil de 35 % — dossier dans les clous." }
            : { tone: "bad", text: "Au-dessus de 35 % — financement à risque hors dérogation." },
        };
      },
    },
    {
      id: "rendement", pole: "Transaction", name: "Rendement locatif", tag: "Investissement",
      desc: "Rentabilité brute et nette d'un investissement locatif.",
      inputs: [
        { k: "prix", label: "Prix d'achat", suffix: "€", def: 180000, min: 1, step: 1000 },
        { k: "frais", label: "Frais d'acquisition", suffix: "%", def: 8, min: 0, step: 0.5 },
        { k: "loyer", label: "Loyer mensuel (hors charges)", suffix: "€", def: 750, min: 0, step: 10 },
        { k: "chargesAn", label: "Charges non récupérables /an", suffix: "€", def: 600, min: 0, step: 50 },
        { k: "taxe", label: "Taxe foncière /an", suffix: "€", def: 900, min: 0, step: 50 },
      ],
      compute(v) {
        const loyerAn = v.loyer * 12;
        const invest = v.prix * (1 + v.frais / 100);
        const brut = v.prix > 0 ? loyerAn / v.prix * 100 : 0;
        const net = invest > 0 ? (loyerAn - v.chargesAn - v.taxe) / invest * 100 : 0;
        return {
          hero: { label: "Rentabilité nette", value: pct(net, 2) },
          rows: [
            ["Loyers annuels", eur(loyerAn)],
            ["Investissement total (frais inclus)", eur(invest)],
            ["Rentabilité brute", pct(brut, 2)],
            ["Cash-flow annuel (avant impôt/crédit)", eur(loyerAn - v.chargesAn - v.taxe)],
          ],
          note: "Net de charges et taxe foncière, hors fiscalité et financement. Une « net-net » intégrerait l'impôt.",
        };
      },
    },
    {
      id: "honoraires", pole: "Transaction", name: "Honoraires d'agence", tag: "Commission",
      desc: "Du prix FAI au net vendeur, et inversement selon le barème d'honoraires.",
      inputs: [
        { k: "fai", label: "Prix de vente FAI", suffix: "€", def: 250000, min: 0, step: 1000 },
        { k: "taux", label: "Taux d'honoraires", suffix: "%", def: 4, min: 0, step: 0.1 },
        { k: "charge", label: "Honoraires à la charge", suffix: "vendeur", def: 0, min: 0, max: 1, step: 1, seg: ["vendeur", "acquéreur"] },
      ],
      compute(v) {
        // honoraires calculés sur le net vendeur : FAI = net * (1+taux)
        const net = v.fai / (1 + v.taux / 100);
        const hono = v.fai - net;
        const chargeAcq = v.charge >= 1;
        const baseDMTO = chargeAcq ? net : v.fai;
        return {
          hero: { label: "Honoraires d'agence", value: eur(hono) },
          rows: [
            ["Prix FAI (annonce)", eur(v.fai)],
            ["Net vendeur", eur(net)],
            ["Honoraires (TTC)", eur2(hono)],
            ["À la charge de", chargeAcq ? "l'acquéreur" : "le vendeur"],
            ["Assiette des droits de mutation", eur(baseDMTO)],
          ],
          note: chargeAcq
            ? "Honoraires à charge acquéreur : les droits de mutation se calculent sur le net vendeur (hors honoraires)."
            : "Honoraires à charge vendeur : les droits de mutation portent sur le prix FAI.",
        };
      },
    },
    {
      id: "plusvalue", pole: "Transaction", name: "Plus-value immobilière", tag: "Fiscalité",
      desc: "Impôt sur la plus-value d'une résidence secondaire / locative selon la durée de détention.",
      inputs: [
        { k: "achat", label: "Prix d'acquisition", suffix: "€", def: 150000, min: 0, step: 1000 },
        { k: "vente", label: "Prix de cession", suffix: "€", def: 230000, min: 0, step: 1000 },
        { k: "annees", label: "Durée de détention", suffix: "ans", def: 12, min: 0, max: 40, step: 1 },
        { k: "forfaits", label: "Forfaits frais + travaux", suffix: "oui", def: 1, min: 0, max: 1, step: 1, seg: ["non", "oui"] },
      ],
      compute(v) {
        let acquMaj = v.achat;
        if (v.forfaits >= 1) {
          acquMaj = v.achat * 1.075; // 7,5 % frais d'acquisition
          if (v.annees >= 5) acquMaj += v.achat * 0.15; // 15 % travaux
        }
        const pv = Math.max(0, v.vente - acquMaj);
        // abattement IR : 6 %/an de la 6e à 21e, 4 % la 22e — exonéré à 22 ans
        function abatIR(a) {
          if (a >= 22) return 1;
          if (a <= 5) return 0;
          return Math.min(1, (Math.min(a, 21) - 5) * 0.06 + (a >= 22 ? 0.04 : 0));
        }
        // abattement PS : 1,65 %/an 6-21, 1,60 % la 22e, 9 %/an 23-30 — exonéré à 30 ans
        function abatPS(a) {
          if (a >= 30) return 1;
          if (a <= 5) return 0;
          let r = (Math.min(a, 21) - 5) * 0.0165;
          if (a >= 22) r += 0.016;
          if (a > 22) r += (Math.min(a, 30) - 22) * 0.09;
          return Math.min(1, r);
        }
        const baseIR = pv * (1 - abatIR(v.annees));
        const basePS = pv * (1 - abatPS(v.annees));
        const ir = baseIR * 0.19;
        const ps = basePS * 0.172;
        const total = ir + ps;
        return {
          hero: { label: "Impôt total estimé", value: eur(total) },
          rows: [
            ["Plus-value brute", eur(pv)],
            ["Abattement IR appliqué", pct(abatIR(v.annees) * 100, 0)],
            ["Impôt sur le revenu (19 %)", eur(ir)],
            ["Prélèvements sociaux (17,2 %)", eur(ps)],
            ["Net encaissé après impôt", eur(v.vente - acquMaj - total + pv * 0 + (acquMaj - v.achat) * 0)],
          ],
          verdict: v.annees >= 30
            ? { tone: "ok", text: "Détention ≥ 30 ans : exonération totale (IR + prélèvements sociaux)." }
            : v.annees >= 22
              ? { tone: "ok", text: "Détention ≥ 22 ans : exonéré d'IR, reste les prélèvements sociaux." }
              : null,
          note: "Hors surtaxe sur les plus-values > 50 000 € et cas d'exonération (résidence principale notamment).",
        };
      },
    },
    {
      id: "tantiemes", pole: "Syndic", name: "Tantièmes & charges", tag: "Copropriété",
      desc: "Quote-part d'un lot dans une charge de copropriété au prorata des tantièmes.",
      inputs: [
        { k: "charge", label: "Montant de la charge", suffix: "€", def: 12000, min: 0, step: 100 },
        { k: "tantLot", label: "Tantièmes du lot", suffix: "/", def: 145, min: 0, step: 1 },
        { k: "tantTot", label: "Tantièmes totaux", suffix: "tot.", def: 1000, min: 1, step: 1 },
      ],
      compute(v) {
        const part = v.tantTot > 0 ? v.charge * (v.tantLot / v.tantTot) : 0;
        const quote = v.tantTot > 0 ? v.tantLot / v.tantTot * 100 : 0;
        return {
          hero: { label: "Quote-part du lot", value: eur2(part) },
          rows: [
            ["Quote-part en %", pct(quote, 3)],
            ["Provision trimestrielle", eur2(part / 4)],
            ["Provision mensuelle", eur2(part / 12)],
          ],
          note: "Répartition proportionnelle aux tantièmes de charges générales (art. 10 loi de 1965). Les charges spéciales suivent une clé d'utilité propre.",
        };
      },
    },
    {
      id: "viager", pole: "Syndic", name: "Viager occupé", tag: "Démembrement",
      desc: "Bouquet, rente viagère et valeur d'occupation à partir de la valeur vénale.",
      inputs: [
        { k: "valeur", label: "Valeur vénale (libre)", suffix: "€", def: 300000, min: 0, step: 1000 },
        { k: "age", label: "Âge du crédirentier", suffix: "ans", def: 75, min: 50, max: 99, step: 1 },
        { k: "bouquet", label: "Bouquet versé", suffix: "€", def: 60000, min: 0, step: 1000 },
        { k: "taux", label: "Taux de rente annuel", suffix: "%", def: 5, min: 1, step: 0.1 },
      ],
      compute(v) {
        // décote d'occupation (DUH) approchée par l'espérance de vie / barème usufruit
        const esp = Math.max(2, 90 - v.age); // espérance de vie résiduelle approchée
        // coefficient d'occupation : ~ valeur locative actualisée — barème simplifié
        const decote = Math.min(0.6, 0.025 * esp); // plus jeune => plus de décote
        const valeurOccupee = v.valeur * (1 - decote);
        const aRenter = Math.max(0, valeurOccupee - v.bouquet);
        const renteAn = aRenter * (v.taux / 100);
        return {
          hero: { label: "Rente mensuelle", value: eur2(renteAn / 12) },
          rows: [
            ["Espérance de vie retenue", esp + " ans"],
            ["Décote d'occupation (DUH)", pct(decote * 100, 0)],
            ["Valeur occupée", eur(valeurOccupee)],
            ["Capital à transformer en rente", eur(aRenter)],
            ["Rente annuelle", eur(renteAn)],
          ],
          note: "Barème d'occupation simplifié à visée pédagogique. En pratique on utilise les barèmes Daubry / fiscal et la valeur locative réelle.",
        };
      },
    },
  ];

  /* ---------- état runtime ---------- */
  const R = { id: CALCS[0].id, vals: {} };

  function calcById(id) { return CALCS.find(c => c.id === id) || CALCS[0]; }

  function defaults(calc) {
    const o = {};
    calc.inputs.forEach(i => o[i.k] = i.def);
    return o;
  }

  /* ---------- DOM ---------- */
  function ensureEl() {
    let el = document.getElementById("lenny-calc");
    if (el) return el;
    el = document.createElement("div");
    el.id = "lenny-calc";
    el.innerHTML = '<div class="lc-backdrop" data-lc-close></div><div class="lc-shell" id="lc-shell" role="dialog" aria-modal="true" aria-label="Calculatrices"></div>';
    document.body.appendChild(el);
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-lc-close]")) return close();
      const nav = e.target.closest("[data-lc-go]");
      if (nav) { selectCalc(nav.getAttribute("data-lc-go")); return; }
      if (e.target.closest("[data-lc-reset]")) { R.vals = defaults(calcById(R.id)); renderBody(); return; }
    });
    el.addEventListener("input", (e) => {
      const f = e.target.closest("[data-lc-k]");
      if (f) { R.vals[f.getAttribute("data-lc-k")] = parseFloat(f.value) || 0; renderResults(); syncRange(f); }
    });
    el.addEventListener("click", (e) => {
      const seg = e.target.closest("[data-lc-seg]");
      if (seg) {
        const k = seg.getAttribute("data-lc-seg");
        R.vals[k] = parseFloat(seg.getAttribute("data-lc-val"));
        renderBody();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.classList.contains("open")) close();
    });
    return el;
  }

  function railHtml() {
    const poles = [];
    CALCS.forEach(c => { if (!poles.includes(c.pole)) poles.push(c.pole); });
    return poles.map(p => {
      const items = CALCS.filter(c => c.pole === p).map(c =>
        `<button class="lc-railitem${c.id === R.id ? " on" : ""}" data-lc-go="${c.id}" type="button">
           <span class="lc-railitem-name">${esc(c.name)}</span>
           <span class="lc-railitem-tag">${esc(c.tag)}</span>
         </button>`).join("");
      return `<div class="lc-railgroup"><div class="lc-railgroup-h">${esc(p)}</div>${items}</div>`;
    }).join("");
  }

  function fieldHtml(calc, inp) {
    const val = R.vals[inp.k];
    if (inp.seg) {
      const segs = inp.seg.map((lab, i) =>
        `<button class="lc-seg${val == i ? " on" : ""}" data-lc-seg="${inp.k}" data-lc-val="${i}" type="button">${esc(lab)}</button>`).join("");
      return `<div class="lc-field"><label class="lc-label">${esc(inp.label)}</label><div class="lc-segwrap">${segs}</div></div>`;
    }
    const hasRange = inp.max != null;
    return `
      <div class="lc-field">
        <label class="lc-label">${esc(inp.label)}</label>
        <div class="lc-inputwrap">
          <input class="lc-input" type="number" inputmode="decimal" data-lc-k="${inp.k}"
                 value="${val}" ${inp.min != null ? `min="${inp.min}"` : ""} ${inp.max != null ? `max="${inp.max}"` : ""} step="${inp.step || 1}">
          <span class="lc-suffix">${esc(inp.suffix || "")}</span>
        </div>
        ${hasRange ? `<input class="lc-range" type="range" data-lc-k="${inp.k}" value="${val}" min="${inp.min || 0}" max="${inp.max}" step="${inp.step || 1}">` : ""}
      </div>`;
  }

  function syncRange(f) {
    // garde input number et range alignés
    const wrap = f.closest(".lc-field");
    if (!wrap) return;
    wrap.querySelectorAll('[data-lc-k="' + f.getAttribute("data-lc-k") + '"]').forEach(el => {
      if (el !== f) el.value = f.value;
    });
  }

  function resultsHtml(calc) {
    const out = calc.compute(R.vals);
    const rows = out.rows.map(r => `<div class="lc-row"><span class="lc-row-k">${esc(r[0])}</span><span class="lc-row-v">${r[1]}</span></div>`).join("");
    const verdict = out.verdict ? `<div class="lc-verdict ${out.verdict.tone}">${esc(out.verdict.text)}</div>` : "";
    const note = out.note ? `<div class="lc-cnote">${esc(out.note)}</div>` : "";
    return `
      <div class="lc-hero">
        <div class="lc-hero-label">${esc(out.hero.label)}</div>
        <div class="lc-hero-value">${out.hero.value}</div>
      </div>
      ${verdict}
      <div class="lc-rows">${rows}</div>
      ${note}`;
  }

  function renderResults() {
    const calc = calcById(R.id);
    const slot = document.getElementById("lc-results");
    if (slot) slot.innerHTML = resultsHtml(calc);
  }

  function renderBody() {
    const calc = calcById(R.id);
    const el = ensureEl();
    const fields = calc.inputs.map(i => fieldHtml(calc, i)).join("");
    el.querySelector("#lc-shell").innerHTML = `
      <button class="lc-close" data-lc-close aria-label="Fermer">✕</button>
      <aside class="lc-rail">
        <div class="lc-brand"><span class="lc-brand-l">L</span> Calculatrices</div>
        <div class="lc-railscroll">${railHtml()}</div>
      </aside>
      <main class="lc-main">
        <header class="lc-head">
          <div class="lc-head-tag">${esc(calc.pole)} · ${esc(calc.tag)}</div>
          <h2 class="lc-head-title">${esc(calc.name)}</h2>
          <p class="lc-head-desc">${esc(calc.desc)}</p>
        </header>
        <div class="lc-grid">
          <section class="lc-inputs">
            ${fields}
            <button class="lc-resetbtn" data-lc-reset type="button">Réinitialiser</button>
          </section>
          <section class="lc-results" id="lc-results">${resultsHtml(calc)}</section>
        </div>
      </main>`;
    const sc = el.querySelector("#lc-shell");
    if (sc) sc.scrollTop = 0;
  }

  function selectCalc(id) {
    R.id = id;
    R.vals = defaults(calcById(id));
    renderBody();
  }

  function open(id) {
    const el = ensureEl();
    selectCalc(id && calcById(id).id === id ? id : R.id || CALCS[0].id);
    el.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    const el = document.getElementById("lenny-calc");
    if (el) el.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  window.LennyCalc = { open, close };
})();
