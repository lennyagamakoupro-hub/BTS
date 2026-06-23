/* ============================================
   LENNY — Journal des nouveautés (liste de référence)
   --------------------------------------------------
   Cette liste « voyage » avec le site : dès qu'elle est déployée,
   TOUS les élèves la voient. C'est le canal fiable même sans serveur.

   Pour annoncer une nouveauté, ajoute une ligne ci-dessous (ou utilise
   la mini-interface admin de la cloche, qui te prépare la ligne à coller).

   Champs d'une entrée :
     id    : identifiant unique (commence par "u_")
     type  : "module" | "fiche" | "video" | "quiz" | "devoir" | "annonce"
     title : titre court de la nouveauté
     desc  : une phrase de description (optionnel)
     date  : date ISO (ex. "2026-06-09") — sert au tri et au « il y a … »
     link  : où ça mène au clic (optionnel) :
               { kind: "module",  id: "m5"  }  → ouvre la fiche du module
               { kind: "video",   id: "m11" }  → lance le lecteur vidéo
               { kind: "quiz" }                → ouvre le quiz général
               { kind: "devoir",  id: "transaction" } → ouvre un devoir de pôle
               { kind: "sector",  id: "syndic" }      → ouvre une page de pôle
               { kind: "docs",    id: "programme" }   → ouvre programme & ressources
               (absent / null)                 → simple information, sans lien
   ============================================ */
window.LENNY_UPDATES_SEED = [
  {
    id: "u_duel_hebdo",
    type: "annonce",
    title: "Nouveau · Duel hebdomadaire",
    desc: "Défie un camarade depuis le Top 10 : score = XP gagné cette semaine. Bouton « ⚔ Duel », remise à zéro chaque lundi.",
    date: "2026-06-12",
  },
  {
    id: "u_progression",
    type: "annonce",
    title: "Nouvelle page · Ma progression",
    desc: "Tes révisions du jour et l'immeuble qui se rallume module par module, réunis sur une page dédiée (menu « Réviser »).",
    date: "2026-06-12",
  },
  {
    id: "u_dossier_reviser",
    type: "annonce",
    title: "Barre du haut rangée",
    desc: "Révisions, Quiz, Examen blanc, Devoir et Calculatrices sont regroupés dans un seul dossier « Réviser ».",
    date: "2026-06-12",
  },
  {
    id: "u_calculatrices",
    type: "annonce",
    title: "Nouveau · Calculatrices interactives",
    desc: "Mensualité, capacité d'emprunt HCSF, endettement, rendement locatif, honoraires, plus-value… résultat instantané.",
    date: "2026-06-11",
  },
  {
    id: "u_classement_variation",
    type: "annonce",
    title: "Top 10 · variation hebdo",
    desc: "Chaque module du classement affiche désormais sa progression de la semaine (↑2, ↓1, =, NEW).",
    date: "2026-06-11",
  },
];
