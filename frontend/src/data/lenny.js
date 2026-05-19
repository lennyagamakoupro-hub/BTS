// LENNY catalog — built from real BTS Transaction data (10 modules).
// Source: MODULES (data.js), STUDY (study.js), QUIZ + QUIZ_EXTRAS, MEMOS, DEEPDIVE, GLOSSARY.

import { MODULES } from "./bts/data.js";
import { STUDY, SEARCH_INDEX } from "./bts/study.js";
import { QUIZ } from "./bts/quiz.js";
import { QUIZ_EXTRAS } from "./bts/quiz_extra.js";
import { DEEPDIVE } from "./bts/deep_dive.js";
import { MEMOS } from "./bts/memos.js";
import { GLOSSARY } from "./bts/glossary.js";

// Merge QUIZ + QUIZ_EXTRAS per module
const MERGED_QUIZ = {};
Object.keys(QUIZ).forEach((k) => {
  MERGED_QUIZ[k] = [...QUIZ[k], ...(QUIZ_EXTRAS[k] || [])];
});

// Sub-titles / taglines per module (editorial)
const TAGLINES = {
  m1: "Le client te juge en 4 secondes",
  m2: "Sans Hoguet, pas d'honoraires",
  m3: "La pige quotidienne, ta règle d'or",
  m4: "Les chiffres qui font tourner ton agence",
  m5: "DPE + ERP, toujours. Le reste, ça dépend.",
  m6: "Comparer, capitaliser, ou décomposer",
  m6b: "Crédirentier, débirentier, bouquet",
  m8: "Neuf mentions ou zéro honoraire",
  m11: "Intérêts composés — la huitième merveille",
  syn: "Dix règles d'or. Apprends-les par cœur.",
};

const SYNOPSES = {
  m1: "La méthode 4×20, l'acronyme SONCAS(E), les 5 types de questions et DIVAS au téléphone. Bien accueillir un prospect, c'est déjà signer un mandat.",
  m2: "EI, SARL, SAS, SA, SCOP, GIE — chaque structure a ses règles. La Loi Hoguet (1970), Hamon, ALUR, ELAN, Climat. Cartes T, G, S. Le statut d'agent commercial.",
  m3: "Les 4 méthodes de prospection (statique, dynamique, prospective, digitale), le découpage en zones (primaire 80 %), SMART, et les repères chiffrés terrain.",
  m4: "Commission moyenne, taux de transformation, conversion FAI/PNV, HT/TTC. Le calcul cascade qui transforme un salaire visé en nombre de RDV nécessaires.",
  m5: "Le DDT (Dossier de Diagnostics Techniques). DPE 10 ans, ERP 6 mois, plomb avant 1949, amiante avant 1997, gaz/élec > 15 ans. Calendrier passoires thermiques.",
  m6: "Les 6 méthodes d'estimation. R1, R2, découverte vendeur (passé/présent/futur), grille de pondération. La méthode par comparaison reste la référence légale.",
  m6b: "Le viager occupé (~95 %) et libre. Bouquet + rente. Crédirentier vs débirentier. Démembrement : usufruit (usus + fructus) et nue-propriété (abusus).",
  m8: "Les 4 mandats (simple, exclusif, semi-exclusif, recherche). Les 9 mentions obligatoires. Le registre chronologique. Loi Hamon — rétractation 14 jours.",
  m11: "Intérêts simples vs composés. Taux proportionnel vs équivalent. Mensualité de prêt. La règle HCSF des 35 % d'endettement maximum.",
  syn: "La synthèse finale : 10 règles d'or transversales à toutes les modules. Le condensé qui doit être maîtrisé à l'oral.",
};

// Build FICHES from MODULES
export const FICHES = MODULES.map((m, i) => {
  const study = STUDY[m.id] || { cards: [], quiz: [] };
  const quizFull = MERGED_QUIZ[m.id] || study.quiz || [];
  const memos = MEMOS.find((x) => x.mod === m.id) || { cards: [] };
  const deepdiveTopics = Object.entries(DEEPDIVE)
    .filter(([k, v]) => v.mod === m.id)
    .map(([k, v]) => ({ slug: k, ...v }));

  // Find related search topics
  const concepts = SEARCH_INDEX.filter((s) => s.mod === m.id).map((s) => s.t);

  return {
    id: m.id,
    slug: m.id,
    title: m.title,
    short: m.short,
    number: m.num,
    tag: m.tag,
    tagline: TAGLINES[m.id] || m.title,
    synopsis: SYNOPSES[m.id] || `Module ${m.num} — ${m.title}`,
    accent: m.color,
    accentSoft: m.colorSoft,
    glyph: m.glyph,
    duration: `${m.time} min`,
    year: i < 4 ? "S1" : (m.id === "syn" ? "Révisions" : "S2"),
    match: 90 + ((i * 13) % 10),
    rank: i + 1,
    tags: concepts.slice(0, 4),
    // Card flashcards (study cards)
    flashcards: study.cards.map((c) => ({ front: c.q, back: c.a })),
    // Full quiz (study quiz + extras)
    quiz: quizFull.map((q) => ({
      q: q.q,
      choices: q.c,
      answer: q.r,
      explanation: q.e,
    })),
    // Memos as "mémos" (formulas, dates, acronyms)
    memos: memos.cards,
    // Deep dive topics
    deepdive: deepdiveTopics,
    // For math module — show interactive calculator
    interactive: m.id === "m11" ? "calc-exp" : null,
    // Featured on hero
    featured: m.id === "m11",
  };
});

// Curated rows
export const ROWS = [
  { id: "trending", title: "Tendance cette semaine", ids: ["m11", "m2", "m8", "m5", "m1"] },
  { id: "modules-1", title: "Module 1 → 4 · Les fondamentaux", ids: ["m1", "m2", "m3", "m4"] },
  { id: "modules-2", title: "Module 5 → 8 · Le terrain", ids: ["m5", "m6", "m6b", "m8"] },
  { id: "modules-3", title: "Module 11 + Synthèse", ids: ["m11", "syn"] },
  { id: "lois", title: "Tout sur les lois", ids: ["m2", "m8", "m5"] },
  { id: "calc", title: "Maths & ratios", ids: ["m4", "m11"] },
  { id: "top10", title: "Top 10 BTS Transaction", ids: ["m11", "m2", "m8", "m5", "m1", "m6", "m3", "m4", "m6b", "syn"] },
];

export const getFiche = (id) => FICHES.find((f) => f.id === id || f.slug === id);

// Re-export glossary for tooltip / footer
export { GLOSSARY };
