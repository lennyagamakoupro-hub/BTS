// Fabrique site/lenny-paquet.js : les 54 scripts du site mis bout à bout, dans
// l'ordre où ils dépendent les uns des autres (les données d'abord, puis les
// écrans qui les lisent). index.html ne charge QUE ce paquet : modifier un des
// fichiers ci-dessous sans relancer cet outil ne change rien en ligne.
//
//   node outils/paquet.mjs             refabrique le paquet
//   node outils/paquet.mjs --verifier  échoue si le paquet ne suit plus ses sources
//
// Après une refabrication, change le ?v= de lenny-paquet.js dans index.html,
// sinon les navigateurs gardent l'ancien paquet en cache.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SITE = fileURLToPath(new URL("../site/", import.meta.url));
const SOURCES = [
  "data.js", "lenny-updates-data.js", "study-data.js", "quiz-data.js", "quiz-data-extra.js",
  "quiz-data-extra2.js", "quiz-data-extra3.js", "memos-data.js", "lenny-essentials-data.js",
  "glossary-data.js", "lenny-droit-data.js", "lenny-syndic-data.js", "lenny-acte-data-1.js",
  "lenny-acte-data-2.js", "deep-dive-data.js", "lenny-droit-deepdive-1.js", "lenny-droit-deepdive-2.js",
  "lenny-syndic-deepdive.js", "lenny-acte-deepdive-1.js", "lenny-acte-deepdive-2.js",
  "lenny-video.js", "lenny-api.js", "lenny-feedback.js", "lenny-app.js", "lenny-detail.js",
  "lenny-player.js", "lenny-lesson.js", "lenny-search.js", "lenny-quiz.js", "lenny-srs.js",
  "lenny-calc.js", "lenny-exam.js", "lenny-xp.js", "lenny-facade.js", "lenny-navfolder.js",
  "lenny-duel.js", "lenny-devoirs-data.js", "lenny-devoirs.js", "lenny-docs.js",
  "lenny-formules-data.js", "lenny-formules.js", "lenny-moment-formule-data.js",
  "lenny-moment-formule.js", "lenny-exos-data.js", "lenny-exos.js", "lenny-mobile-toolbar.js",
  "lenny-router.js", "lenny-modpicker.js", "lenny-profile.js", "lenny-updates.js", "lenny-stats.js",
  "lenny-bg.js", "lenny-agent.js", "lenny-profile-cluster.js",
];

// Le « ; » entre deux fichiers empêche qu'un fichier sans point-virgule final
// se colle à l'expression du suivant.
const paquet = `/* Paquet refabriqué : ${SOURCES.length} scripts. */\n\n` +
  SOURCES.map((f) => `/* ===== ${f} ===== */\n${readFileSync(SITE + f, "utf8")}\n;`).join("\n");

const cible = SITE + "lenny-paquet.js";
if (process.argv.includes("--verifier")) {
  if (readFileSync(cible, "utf8") !== paquet) {
    console.error("lenny-paquet.js ne suit plus ses sources : node outils/paquet.mjs");
    process.exit(1);
  }
  console.log("lenny-paquet.js suit ses " + SOURCES.length + " sources.");
} else {
  writeFileSync(cible, paquet);
  console.log("lenny-paquet.js refabriqué (" + SOURCES.length + " sources).");
}
