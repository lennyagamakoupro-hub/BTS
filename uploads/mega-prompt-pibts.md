# MÉGA-PROMPT — Amélioration maximale de pibts.netlify.app

> Copie tout ce qui suit dans Emergent / Claude. Tu peux aussi le découper section par section pour itérer.

---

Tu es à la fois directeur artistique senior, ingénieur frontend expert React et spécialiste en sciences cognitives de l'apprentissage. Tu travailles sur mon site de révision BTS Professions Immobilières (style Netflix, React + FastAPI + MongoDB). Le site existe déjà : écran d'accès par code personnel, hero "Financement Immobilier", navigation par pôles (Transaction, Syndic, Droit, Lois), 10 modules, quiz, classement Top 10, diagramme de Kiviat, formulaire de maths financières.

**Règle absolue : ne casse rien de l'existant.** Améliore par couches successives, commit par commit, et explique chaque changement. Je travaille sans terminal, uniquement via interface graphique.

---

## 1 · DIRECTION ESTHÉTIQUE — passer de "joli" à "signature"

**Identité visuelle.** Le site doit avoir une identité qu'on ne peut confondre avec aucun autre, ancrée dans son sujet : l'immobilier parisien et la réussite à l'examen. Propose-moi d'abord un mini design system avant de coder :
- Palette de 5 couleurs nommées en hex (fond sombre profond, surface, accent principal, accent secondaire, couleur de réussite), inspirée de l'immobilier haussmannien de nuit : pierre, zinc des toits, doré des lampadaires. Pas de vert acide générique.
- Typographie à 3 rôles : une display avec du caractère pour les titres de modules (utilisée avec retenue), une body lisible pour les contenus de cours, une utilitaire/mono pour les chiffres, taux et formules. Échelle typographique claire (1.250 ratio).
- Un **élément signature** mémorable : par exemple, la barre de progression de chaque module dessinée comme la façade d'un immeuble qui se construit étage par étage.

**Micro-interactions et motion.** Une seule séquence orchestrée au chargement (hero qui se révèle), plutôt que des effets partout. Hover states sur les cartes de modules (élévation + légère rotation 3D façon Netflix), transitions de page fluides (300ms ease-out), skeleton loaders pendant les chargements API au lieu de spinners. Respecte `prefers-reduced-motion`.

**États soignés.** Chaque composant doit avoir ses 5 états : défaut, hover, focus visible (accessibilité clavier), chargement, vide. Les états vides donnent une action ("Aucun quiz terminé — lance ton premier quiz") au lieu d'un message neutre.

**Mobile-first réel.** Je révise surtout sur téléphone : navigation par onglets en bas d'écran sur mobile, cartes swipeables, boutons de 44px minimum, texte jamais sous 16px. Teste chaque écran en 375px de large.

**Cohérence du wording.** Tutoiement partout, verbes d'action sur les boutons ("Lancer le quiz", pas "Valider"), vocabulaire constant entre les écrans.

---

## 2 · SCIENCE DE L'APPRENTISSAGE — le cœur du site

**Répétition espacée (priorité n°1).** Implémente un système type SM-2 simplifié : chaque question de quiz a un score de maîtrise. Réponse juste → la question revient dans 3, 7 puis 21 jours. Réponse fausse → elle revient le lendemain. Ajoute un écran "Révisions du jour" qui me sert automatiquement les questions dues aujourd'hui, tous modules confondus. C'est la fonctionnalité qui fera vraiment progresser mes notes.

**Active recall avant relecture.** Sur chaque fiche de cours, commence par 2-3 questions flash ("Avant de relire : quelle est la formule du taux équivalent ?") avec réponse masquée à révéler au tap. La relecture passive est la pire méthode de révision, le site doit me forcer à me souvenir d'abord.

**Feedback explicatif immédiat.** Après chaque réponse de quiz, juste ou fausse : explication courte du pourquoi, la formule concernée, et un lien vers la section précise du cours. Jamais juste "Bonne réponse !".

**Mode examen E8.** Un mode chronométré qui reproduit les conditions réelles : sujet mixte tiré de plusieurs modules, timer visible, pas de feedback pendant l'épreuve, correction détaillée à la fin avec barème. Interleaving volontaire : mélanger transaction, syndic et droit dans une même session améliore la rétention.

**Diagnostic des faiblesses.** Le diagramme de Kiviat existe déjà — connecte-le à l'action : tap sur une branche faible → génère directement une session de révision ciblée sur ce sujet. Ajoute une section "Tes 5 erreurs les plus fréquentes" avec les questions ratées plus de 2 fois.

**Objectif quotidien réaliste.** 15 minutes/jour par défaut, ajustable. Notification visuelle douce de la progression du jour (anneau qui se remplit), sans culpabilisation si je rate un jour.

---

## 3 · GAMIFICATION — motivante sans être gadget

- **XP et niveaux** : chaque quiz, fiche lue activement, session de répétition espacée donne des XP. Niveaux nommés dans l'univers immobilier : Stagiaire → Négociateur → Gestionnaire → Syndic → Directeur d'agence.
- **Streak intelligent** : série de jours consécutifs avec 1 "joker" par semaine pour ne pas tout perdre sur un oubli.
- **Badges thématiques** : "Maître des tantièmes", "HCSF approved" (10/10 sur le financement), "Viager veteran", etc.
- **Le classement Top 10 existant** : ajoute la variation hebdomadaire (↑2, ↓1) et un duel hebdomadaire optionnel contre un autre code.

---

## 4 · CONTENU & OUTILS SPÉCIFIQUES BTS PI

**Calculatrices interactives** intégrées aux modules concernés :
- Mensualité de prêt (capital, taux, durée) avec décomposition intérêts/capital et vérification de la règle HCSF des 35 %.
- Convertisseur taux proportionnel ↔ taux équivalent avec les deux formules affichées.
- Simulateur de tantièmes et répartition de charges (générales vs spéciales).
- Calculateur viager (bouquet, rente, DUH, espérance de vie).
Chaque calculatrice a un bouton "Génère-moi un exercice" qui crée des valeurs aléatoires et me demande de calculer avant de révéler la solution étape par étape.

**Fiches ultra-synthétiques** : pour chaque module, une fiche "dernière ligne droite" d'un seul écran (formules clés, pièges classiques, 3 chiffres à retenir), exportable/imprimable.

**Banque de cas pratiques type E8** : situations professionnelles rédigées (un copropriétaire conteste ses charges, un client veut savoir s'il peut emprunter…) avec correction structurée comme attendue à l'oral.

**Glossaire interactif** : tout terme technique dans un cours est cliquable → définition en popover, sans quitter la page.

---

## 5 · UX & FONCTIONNALITÉS TRANSVERSES

- **Reprendre où j'en étais** : le bouton "Reprendre la révision" doit pointer vers l'exact dernier écran consulté, pas juste le module.
- **Recherche globale** (Cmd/Ctrl+K ou icône loupe) : cherche dans les cours, formules, questions.
- **PWA installable** : le site doit fonctionner hors-ligne pour les fiches et quiz déjà chargés (révision dans le métro).
- **Performance** : lazy loading des modules, images optimisées, score Lighthouse > 90 sur mobile.
- **Accessibilité** : contraste AA minimum, navigation clavier complète, focus visible.

---

## 6 · MÉTHODE DE TRAVAIL

Procède dans cet ordre : (1) propose le design system et attends ma validation, (2) répétition espacée + écran "Révisions du jour", (3) refonte visuelle progressive composant par composant, (4) calculatrices, (5) mode examen, (6) gamification, (7) PWA. À chaque étape, montre-moi un aperçu avant de passer à la suivante, et garde les données existantes (scores, classement) intactes en base.
