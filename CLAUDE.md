# Règles permanentes du projet — BTS TRANSACTION

## Workflow de déploiement : GitHub UNIQUEMENT

GitHub est la **seule source de vérité**. Aucun déploiement automatisé côté agent, aucune
intégration directe, aucune action directe sur Netlify, aucun service externe d'automatisation.

### Processus obligatoire à CHAQUE demande de modification
1. Générer les modifications dans les fichiers du projet.
2. Fournir un **ZIP complet du projet mis à jour**, prêt à être décompressé (tous les fichiers,
   pas seulement ceux modifiés — l'utilisateur remplace l'intégralité du dossier).
3. L'utilisateur remplace les fichiers de son projet local.
4. L'utilisateur fait un commit + push sur GitHub.
5. Netlify déploie automatiquement depuis GitHub.

### À fournir systématiquement à chaque modification
- Le **ZIP complet** du projet à jour (via une carte de téléchargement).
- Un **résumé des changements** (fichiers touchés + nature des modifications).
- Les éventuelles **commandes à exécuter avant le push** (installation de dépendances, build, etc.).

### Interdictions
- ❌ Ne JAMAIS déployer via agent IA.
- ❌ Ne JAMAIS effectuer d'action directe sur Netlify.
- ❌ Ne configurer aucun agent, automation ou service externe de déploiement.
- ❌ Ne pas modifier des intégrations Netlify existantes.

### Dépendances
- Mettre à jour les dépendances seulement si nécessaire, et toujours signaler les commandes
  correspondantes à exécuter avant le push.

## État du site (IMPORTANT — à retenir)

- **Dépôt GitHub** : `github.com/lennyagamakoupro-hub/BTS` (branche `main`).
- **Site en ligne** : `pibts.netlify.app` (projet Netlify « pibts »).
- Le site en ligne est construit à partir du dossier **`frontend`** = une appli **React**
  (build `yarn build`, publish `frontend/build`). ⚠️ C'est **l'ANCIENNE version** du site.
- **La DERNIÈRE version à jour du site = celle de CE projet** (version HTML statique :
  `index.html` + fichiers `lenny-*.js/css`, regroupée dans le dossier `site/`).
- 🎯 **Objectif** : mettre en ligne la version HTML de ce projet, à la place de l'ancienne
  version React — idéalement en servant un dossier statique sur Netlify (SANS build).
- La migration est préparée : `netlify.toml` (racine, `publish = "site"`, sans build) + le
  dossier `site/` complété (manifest, icons, _headers).
