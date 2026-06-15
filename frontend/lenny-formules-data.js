/* ============================================
   LENNY — Formulaire : toutes les formules par pôle
   Alimente window.LENNY_FORMULES (lu par lenny-formules.js).
   Sources : MEMOS (Transaction) + deep-dive Syndic (gestion du personnel).
   Structure : pôle → groupes → formules { name, lines[], note }
   ============================================ */
window.LENNY_FORMULES = {

  /* =====================================================================
     TRANSACTION
     ===================================================================== */
  transaction: {
    title: "Formulaire — Transaction",
    sub: "Toutes les formules du pôle Transaction · honoraires, ratios, financement, estimation",
    accent: "#b58430",
    intro: "L'aide-mémoire des calculs du métier : prix et honoraires, pilotage de l'activité, financement immobilier, estimation de la valeur et mesurage. Apprends les formules, puis entraîne-toi avec les chiffres des fiches.",
    groups: [
      {
        h: "Honoraires & prix de vente",
        formulas: [
          {
            name: "Prix Net Vendeur ↔ FAI",
            lines: [
              "PNV = FAI ÷ (1 + t)",
              "FAI = PNV × (1 + t)",
              "Commission = FAI − PNV",
            ],
            note: "t = taux d'honoraires (décimal). FAI = Frais d'Agence Inclus, PNV = Prix Net Vendeur. Ex : 250 000 ÷ 1,065 = 234 742 € de PNV.",
          },
          {
            name: "HT ↔ TTC (TVA 20 %)",
            lines: [
              "HT = TTC ÷ 1,20",
              "TTC = HT × 1,20",
              "TVA = TTC − HT",
            ],
            note: "Sur les honoraires HT. Ex : 1 200 ÷ 1,20 = 1 000 € HT, soit 200 € de TVA.",
          },
        ],
      },
      {
        h: "Pilotage & ratios d'activité",
        formulas: [
          {
            name: "Taux de transformation",
            lines: [
              "Estim → Mandat = (mandats ÷ estimations) × 100",
              "Mandat → Vente = (ventes ÷ mandats) × 100",
            ],
            note: "Normes : estimation→mandat 50–70 %, mandat→vente 35–50 %.",
          },
          {
            name: "Commission moyenne & coût d'un mandat",
            lines: [
              "Commission moy. = CA total ÷ Nb ventes",
              "Coût d'acquisition mandat = Coût prospection ÷ Nb mandats",
            ],
            note: "Calcul en cascade : Salaire visé → Ventes → Mandats → RDV. ~15 visites par vente en moyenne.",
          },
        ],
      },
      {
        h: "Financement immobilier",
        formulas: [
          {
            name: "Intérêts simples",
            lines: ["I = C × t × n"],
            note: "I = intérêts totaux, C = capital, t = taux annuel (décimal), n = durée en années. Progression LINÉAIRE.",
          },
          {
            name: "Intérêts composés",
            lines: ["Cₙ = C₀ × (1 + t)ⁿ"],
            note: "Cₙ = capital final, C₀ = capital initial, t = taux par période, n = nombre de périodes. Progression EXPONENTIELLE.",
          },
          {
            name: "Mensualité de prêt",
            lines: [
              "M = C × tₘ ÷ [ 1 − (1 + tₘ)^(−n) ]",
              "tₘ = t_annuel ÷ 12     n = durée en MOIS",
              "Coût du crédit = (M × n) − C",
            ],
            note: "M = mensualité (€), C = capital emprunté. 20 ans = 240 mois. Le coût du crédit n'inclut pas l'assurance.",
          },
          {
            name: "Taux proportionnel vs équivalent",
            lines: [
              "Proportionnel = t_annuel ÷ nb_périodes",
              "Équivalent = (1 + t)^(1/n) − 1",
            ],
            note: "L'équivalent est TOUJOURS inférieur au proportionnel. Les banques utilisent en général le proportionnel.",
          },
          {
            name: "Taux d'endettement (HCSF)",
            lines: [
              "Taux = (charges + mensualité) ÷ revenus nets × 100",
            ],
            note: "Plafond HCSF : 35 % des revenus nets. Durée max 25 ans (27 ans neuf/VEFA). Frais de notaire : 7–8 % ancien, 2–3 % neuf.",
          },
        ],
      },
      {
        h: "Estimation de la valeur",
        formulas: [
          {
            name: "Par comparaison",
            lines: ["Valeur = Prix au m² × Surface pondérée"],
            note: "Méthode de référence. La surface est pondérée par la grille (étage, expo, vue, ascenseur, DPE…).",
          },
          {
            name: "Par capitalisation (revenu)",
            lines: ["Valeur = Loyer annuel ÷ Taux de rendement"],
            note: "Pour l'investissement locatif. Un taux plus élevé = valeur plus basse.",
          },
          {
            name: "Sol + construction",
            lines: ["Valeur = Valeur du sol + (Coût du bâti − vétusté)"],
            note: "Adaptée à la maison individuelle. Variante « par les coûts » : foncier + bâti + équipements.",
          },
          {
            name: "Compte à rebours (promoteur)",
            lines: ["Prix = Prix de revente − marge − travaux − frais"],
            note: "Pour un bien à rénover/diviser : on part de la sortie pour remonter au prix d'achat acceptable.",
          },
        ],
      },
      {
        h: "Mesurage des surfaces",
        formulas: [
          {
            name: "Loi Carrez vs Loi Boutin",
            lines: [
              "Surface comptée : hauteur sous plafond ≥ 1,80 m",
              "Carrez = surface privative (vente en copropriété)",
              "Boutin = surface habitable (location)",
            ],
            note: "Carrez : une erreur > 5 % ouvre une action en réduction du prix (délai 1 an). Lots < 8 m² exclus du Carrez.",
          },
        ],
      },
      {
        h: "Viager & démembrement",
        formulas: [
          {
            name: "Équation du démembrement",
            lines: ["Pleine propriété = Usufruit + Nue-propriété"],
            note: "USUS + FRUCTUS = usufruitier · ABUSUS = nu-propriétaire. Gros travaux (art. 606) à la charge du nu-propriétaire.",
          },
          {
            name: "Barème fiscal de l'usufruit (CGI art. 669)",
            lines: [
              "≤ 21 ans → 90 %      61–70 → 40 %",
              "21–30  → 80 %       71–80 → 30 %",
              "31–40  → 70 %       81–90 → 20 %",
              "41–50  → 60 %       91+   → 10 %",
              "51–60  → 50 %",
            ],
            note: "Valeur de l'usufruit en % de la pleine propriété, selon l'âge de l'usufruitier. Nue-propriété = complément à 100 %.",
          },
          {
            name: "Rente viagère",
            lines: ["Rente = (Valeur nue-propriété − Bouquet) ÷ Coeff. barème"],
            note: "Bouquet ≈ 20–30 % de la valeur. Abattement d'occupation : 20–40 % (viager occupé, ~95 % des cas).",
          },
        ],
      },
    ],
  },

  /* =====================================================================
     SYNDIC  (gestion du personnel d'immeuble — CCN 11 déc. 1979)
     ===================================================================== */
  syndic: {
    title: "Formulaire — Syndic",
    sub: "Gestion du personnel d'immeuble · salaire du gardien, UV, congés, taxes",
    accent: "#3f6585",
    intro: "Les calculs de la paie et de la gestion du personnel de copropriété (Convention Collective Nationale du 11 décembre 1979). L'employeur est le syndicat des copropriétaires ; le syndic embauche comme mandataire.",
    groups: [
      {
        h: "Salaire du gardien",
        formulas: [
          {
            name: "Salaire minimum conventionnel",
            lines: ["Salaire min. = (Coefficient hiérarchique × Valeur du point) + Valeur fixe"],
            note: "La valeur du point et la valeur fixe sont fixées par la convention collective. Le coefficient résulte de la « pesée » du poste sur 6 critères (5 niveaux chacun).",
          },
          {
            name: "Salaire brut global",
            lines: [
              "Brut = (Salaire min. conventionnel × taux d'emploi)",
              "      + prime d'ancienneté",
              "      + 13ᵉ mois",
              "      + prime de tri sélectif",
              "      + supplément contractuel (facultatif)",
            ],
            note: "Le taux d'emploi traduit un temps partiel (cat. A) ou un service incomplet (cat. B).",
          },
        ],
      },
      {
        h: "Avantage en nature & primes",
        formulas: [
          {
            name: "Avantage en nature (logement de fonction)",
            lines: [
              "Valeur = Surface habitable (≤ 60 m²) × Prix au m²",
              "Prix/m² → cat. 1 : 3,211 €  ·  cat. 2 : 2,535 €  ·  cat. 3 : 1,872 €",
            ],
            note: "Catégorie B (gardien logé). Ne peut être inférieur au barème URSSAF ; il est imposable et déjà compris dans le salaire minimum CNC.",
          },
          {
            name: "Prime d'ancienneté",
            lines: ["Prime = % du salaire conventionnel   (plafond 18 %)"],
            note: "Progressive avec les années d'ancienneté, calculée sur le salaire conventionnel.",
          },
          {
            name: "13ᵉ mois & prime de tri sélectif",
            lines: [
              "13ᵉ mois = 1 mois (prorata si présence < 12 mois)",
              "Tri sélectif (cat. B) = 23 à 184 € brut selon le nb de lots",
            ],
            note: "Le 13ᵉ mois est versé en décembre. La prime de tri est incluse dans l'indemnité de CP mais exclue du 13ᵉ mois.",
          },
        ],
      },
      {
        h: "Temps de travail & unités de valeur (UV)",
        formulas: [
          {
            name: "Service du gardien (UV)",
            lines: [
              "Partiel    : hors tâches",
              "Permanent  : 3 400 à 9 000 UV (avec permanence de jour)",
              "Complet    : ≥ 10 000 UV",
            ],
            note: "Entre 9 000 et 10 000 UV avec permanence → porté à 10 000. La fréquence d'une tâche ne change pas son nombre d'UV.",
          },
          {
            name: "Amplitude & heures supplémentaires",
            lines: [
              "Amplitude horaire (cat. B) ≤ 47,5 h",
              "Heures sup. (cat. A) majorées de 25 %",
            ],
            note: "Catégorie A : rémunération au temps de travail. Catégorie B : valorisation des tâches en UV.",
          },
        ],
      },
      {
        h: "Congés payés",
        formulas: [
          {
            name: "Acquisition & indemnité",
            lines: [
              "Acquisition = 2,5 jours ouvrables × mois travaillés   (30 j/an)",
              "Indemnité = MAX( maintien de salaire ; 1/10ᵉ de la rémunération brute )",
            ],
            note: "Dès 1 mois chez le même employeur. Jusqu'à 4 semaines entre le 1ᵉʳ mai et le 31 octobre ; dates fixées avant le 1ᵉʳ avril.",
          },
          {
            name: "Majorations de congés",
            lines: [
              "Ancienneté : +1 j (10 ans) · +2 j (15) · +3 j (20) · +4 j (25)",
              "Hors période (1ᵉʳ nov.–30 avr.) : +1 j (3–5 j) ou +2 j (≥ 6 j)",
              "Femmes < 21 ans avec enfant : +2 j / enfant",
            ],
            note: "Majorations cumulables selon les situations.",
          },
        ],
      },
      {
        h: "Remplacement & fin de contrat",
        formulas: [
          {
            name: "Remplacement (CDD)",
            lines: [
              "Rémunération majorée de 10 %  (remplacement < 2 mois)",
              "+ indemnité de CP + prorata 13ᵉ mois + indemnité de fin de contrat (10 %)",
            ],
            note: "Le gardien logé peut choisir son remplaçant (agrément de l'employeur sous 8 jours, art. L7213-2).",
          },
          {
            name: "Période d'essai (CDI)",
            lines: [
              "Non logé : 1 mois (renouvelable 1 fois)",
              "Logé : 2 mois",
              "Agent de maîtrise : 2 mois (renouvelable 1 fois)",
            ],
            note: "CDD : 1 jour par semaine de contrat, max 2 semaines (≤ 6 mois) ou 1 mois (au-delà).",
          },
          {
            name: "Préavis",
            lines: [
              "Démission : 8 j (non logé, coef ≤ 602) · 1 mois (logé ou coef > 602)",
              "Licenciement : 1–2 mois (cat. A) · 3 mois (cat. B)",
            ],
            note: "Le logement de fonction est libéré à l'expiration du préavis.",
          },
        ],
      },
      {
        h: "Taxe sur les salaires",
        formulas: [
          {
            name: "Taxe sur les salaires (employeur)",
            lines: [
              "Assiette = rémunérations brutes annuelles (avantages en nature compris)",
              "Nulle si < 1 200 €/an   ·   décote entre 1 200 € et 2 040 €",
            ],
            note: "Entièrement à la charge de l'employeur (le syndicat des copropriétaires).",
          },
        ],
      },
    ],
  },
};
