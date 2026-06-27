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

## Mémoire technique du projet (procédures à réutiliser)

### 1. Comment ajouter des fiches / un module de cours

Chaque module de cours s'appuie sur **deux fichiers de données** + **trois enregistrements**.

**A. Les deux fichiers de données à créer** (un cours = souvent 2 fichiers, ex. parties 1-4
et 5-8, pour rester sous ~1000 lignes chacun) :

- `lenny-<sujet>-data.js` → alimente, via `Object.assign(window.X || {}, {...})` SANS écraser :
  - `window.ESSENTIALS[modId]` = `{ retenir: [{k,v}], timeline: [{y,t}] }` (onglet « Essentiel »).
  - `window.STUDY[modId]` = `{ cards: [{q,a}], quiz: [{q,c:[...],r}] }` (fiches + quiz court).
  - `window.QUIZ[modId]` = `[{q, c:[...], r, e}]` (quiz détaillé avec explication `e`).
  - `window.MEMOS` = `.concat([{ mod, title, color, cards:[{type:'acronym'|'rule'|'formula', h, items:[...]}] }])`.
- `lenny-<sujet>-deepdive.js` → alimente `window.DEEPDIVE` (les SLIDES « Réviser ») via
  `window.DEEPDIVE = Object.assign(window.DEEPDIVE || {}, DD)`. Chaque chapitre :
  `"<modId>-<slug>": { mod, title, lede, sections:[{h, b}] OU {h, list:[...]}, linked:[ids] }`.
  ⚠️ IMPORTANT : sans deepdive rédigé, le lecteur « Réviser » se rabat sur Essentiel+Fiches+Mémos
  (cf. `buildFallbackChapters` dans `lenny-player.js`), mais pour un vrai BTS il faut **rédiger
  plusieurs chapitres deepdive détaillés par module** (3 à 6 chapitres chacun).

**B. Les trois enregistrements du module :**

1. `data.js` → ajouter une ligne dans `window.MODULES` :
   `{ id, num, short, title, tag, color, colorSoft, emoji, glyph, time }`.
2. `lenny-app.js` → ajouter l'objet correspondant dans `LENNY_MODULES` (const, pas window) :
   `{ id, num, short, title, tag, time, color:"<clé couleur existante, ex. m2/m5/murba>", symbol, glyph, quote, desc, pct, season }`.
   Le `glyph` doit exister dans les glyphes du fichier ; `color` réutilise une clé connue.
3. `lenny-router.js` → ajouter l'`id` du module dans le tableau `ids` du bon pôle
   (ex. pôle « syndic » : `ids: ["mperso","murba","macte1",...]`).

**C. Charger les nouveaux scripts** dans `index.html` ET `site/index.html`
(`<script src="lenny-<sujet>-data.js"></script>`, idem deepdive), à côté des autres `lenny-*-data.js`.

**D. Répliquer dans `site/`** : tout fichier touché à la racine doit être copié dans `site/`
(`site/` = la version réellement déployée). Fichiers typiques : les nouveaux `lenny-*.js`,
plus `data.js`, `lenny-app.js`, `lenny-router.js`, `index.html`, et `lenny-player.js` si modifié.

### 2. Comment déployer (procédure terminal validée)

Le site se déploie UNIQUEMENT par push GitHub (cf. règle ci-dessus). Procédure côté utilisateur :

```bash
# 1. Extraire le ZIP téléchargé dans un dossier temporaire et vérifier la structure
rm -rf /tmp/sitecheck && mkdir /tmp/sitecheck
unzip -o "/home/Lenny/Téléchargements/<le-zip>.zip" -d /tmp/sitecheck
find /tmp/sitecheck -maxdepth 2 -name "lenny-acte-*.js"   # confirme que c'est dans .../site/

# 2. Copier les fichiers dans le dépôt local (écrase les anciens)
cp -rf /tmp/sitecheck/site/* ~/BTS/site/

# 3. Commit + push
cd ~/BTS && git status
git add . && git commit -m "<message>" && git push origin main
```

- Le dépôt local est dans **`~/BTS`** (remote `origin` = `github.com/lennyagamakoupro-hub/BTS`, branche `main`).
- ⚠️ Les téléchargements arrivent dans `~/Téléchargements/` (parfois envoyés à la corbeille
  `~/.local/share/Trash/files/`). Les gros `BTS TRANSACTION.zip` (~669 Mo) sont de VIEUX exports.
- **Authentification GitHub** : au push, username = `lennyagamakoupro-hub` (sans espace devant),
  password = un **Personal Access Token (classic)** `ghp_…` avec la portée `repo` (PAS le mot de
  passe du compte). Mémoriser le token : `git config --global credential.helper store`.

### 3. Préférences de contenu

- **Langue** : tout le contenu en **français**.
- **Niveau** : public **BTS Transaction / Professions Immobilières** — viser des fiches et des
  slides **détaillées et complètes** (définitions, articles de loi, chiffres clés, dates),
  pas des résumés trop courts. Privilégier plusieurs chapitres deepdive riches par module.
- **Sources** : se baser sur les cours fournis (PDF) ; reprendre la terminologie exacte
  (numéros d'articles, lois datées, seuils chiffrés).
- **Cohérence visuelle** : réutiliser les couleurs/glyphes/structure des modules existants,
  ne pas inventer de nouveaux composants.
