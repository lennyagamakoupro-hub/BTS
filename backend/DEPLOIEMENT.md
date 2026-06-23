# LENNY — Guide de déploiement (avis nominatifs + radar)

> **À destination de la personne / l'agent technique** qui met le système en ligne.
> Tout le code applicatif est déjà écrit. Il reste à **héberger** la base de données
> et l'API, puis à **brancher** le site dessus. Aucune modification de logique n'est
> nécessaire. Comptez 20–30 min.

---

## 1. Architecture

Trois briques :

| Brique | Rôle | Techno | Hébergeur conseillé (offre gratuite) |
|---|---|---|---|
| **Front** | les pages que voient les élèves (LENNY) | HTML/CSS/JS statique | **Netlify** (déjà utilisé : dossier `netlify-deploy/`) |
| **API** | reçoit les votes / sert le tableau de bord | **FastAPI** (Python), dossier `backend/` | **Render** ou **Railway** |
| **Base de données** | stocke votes + résultats de quiz | **MongoDB** | **MongoDB Atlas** (cluster M0 gratuit) |

Comportement clé du front (déjà codé, fichier `lenny-api.js`) :

- **Si `window.LENNY_API_BASE` n'est pas défini** → mode local (localStorage), mono-poste,
  avec des **données de démonstration** (les votes signés « Thibaut », « Manon »… ne sont PAS réels).
- **Si `window.LENNY_API_BASE` est défini** → le front appelle l'API ; les données de démo
  sont **ignorées automatiquement** (aucun nettoyage requis) et les vrais votes des élèves
  remontent au serveur, partagés et persistants.

Le basculement se fait donc avec **une seule ligne** à ajouter au site (étape 4).

---

## 2. Pré-requis

- Un compte **MongoDB Atlas** (gratuit) : https://www.mongodb.com/cloud/atlas/register
- Un compte **Render** (gratuit) : https://render.com  *(ou Railway : https://railway.app)*
- Le dossier **`backend/`** de ce projet (contient `main.py`, `requirements.txt`, `.env.example`, `README.md`).
- L'URL publique du site (ex. `https://lenny-bts.netlify.app`).

---

## 3. Étape A — Base de données (MongoDB Atlas)

1. Créer un compte, puis **Build a Database** → offre **M0 (Free)**.
2. Choisir un fournisseur/région proche (ex. AWS / Paris). Créer le cluster.
3. **Database Access** → *Add New Database User* :
   - Username : `lenny`  ·  Password : (générer, **le noter**).
   - Rôle : *Read and write to any database*.
4. **Network Access** → *Add IP Address* → **Allow access from anywhere** (`0.0.0.0/0`).
   *(Simplicité ; on pourra restreindre ensuite.)*
5. **Connect** → *Drivers* → copier la **connection string**, du type :
   ```
   mongodb+srv://lenny:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Remplacer `<password>` par le mot de passe noté à l'étape 3.
   → c'est la valeur de **`MONGO_URL`**.

Aucune collection à créer à la main : l'API crée `feedback` et `quiz_results` toute seule.

---

## 4. Étape B — Déployer l'API (Render)

L'API est dans `backend/`. Deux façons :

### Option 1 — via dépôt Git (recommandé)
1. Pousser le dossier `backend/` (ou le projet entier) sur un dépôt GitHub.
2. Sur Render : **New → Web Service** → connecter le dépôt.
3. Réglages :
   - **Root Directory** : `backend`
   - **Runtime** : Python 3
   - **Build Command** : `pip install -r requirements.txt`
   - **Start Command** :
     ```
     uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
4. **Environment** → ajouter les variables :
   | Clé | Valeur |
   |---|---|
   | `MONGO_URL` | la connection string de l'étape A |
   | `MONGO_DB` | `lenny` |
   | `CORS_ORIGINS` | l'URL exacte du site, ex. `https://lenny-bts.netlify.app` |
   | `ADMIN_TOKEN` | un secret long et aléatoire (ex. généré par `openssl rand -hex 24`). **À noter** : c'est le jeton que Lenny saisira dans le navigateur pour accéder au tableau formateur / publier des nouveautés. |
5. **Create Web Service**. À la fin, Render donne une URL publique du type
   `https://lenny-api.onrender.com` → c'est la valeur de **`LENNY_API_BASE`** (étape D).

### Option 2 — Railway
Même principe : *New Project → Deploy from repo*, Root `backend`, mêmes variables
d'environnement, start command identique. Railway expose aussi une URL publique.

### Vérifier que l'API tourne
Dans un navigateur, ouvrir `https://VOTRE-API/` → doit afficher la liste des endpoints.
Test rapide d'un vote (terminal) :
```bash
curl -X POST https://VOTRE-API/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"course_id":"course-m11","vote":"up","user_id":"u_TEST","user_name":"Test"}'

curl "https://VOTRE-API/api/feedback/course-m11?user_id=u_TEST"
# → {"course_id":"course-m11","up":1,"down":0,"mine":"up"}
```

---

## 5. Étape C — (le site est déjà hébergé)

Le site est servi par Netlify (dossier `netlify-deploy/`). Rien à refaire ici, sauf
ajouter la ligne de l'étape D puis redéployer.

---

## 6. Étape D — Brancher le site sur l'API  ⭐ (l'étape qui « allume » les vrais votes)

Ajouter **une seule ligne** dans le `<head>` de la page, **avant** les autres `<script>` :

```html
<script>window.LENNY_API_BASE = "https://VOTRE-API";</script>
```

(remplacer par l'URL Render/Railway, **sans slash final**).

- Si vous déployez depuis les **sources** : ajouter cette ligne dans `index.html`
  (juste après l'ouverture de `<head>`), puis re-générer/redéployer le bundle Netlify.
- Si vous éditez directement le fichier **déjà déployé** : insérer la même ligne
  dans le `<head>` du `index.html` servi par Netlify.

Recharger le site : le tableau **« Avis reçus »** (engrenage ⚙️, code formateur) affiche
désormais les **vrais** votes. Les données de démo ne sont plus utilisées.

---

## 7. Identité des élèves (pour des avis vraiment nominatifs)

L'identité vient du **code d'accès** saisi au portail (fichier `lenny-gate.js`) :

- `user_id` envoyé à l'API = `"u_" + CODE` (ex. `u_THIB-7K2`).
- Depuis le durcissement sécurité, les codes ne sont plus en clair : `lenny-gate.js`
  contient des **empreintes** (`CODE_HASHES`) et la table des prénoms `NAME_HASHES`.
  → Pour ajouter un élève / un prénom : dans la **console du navigateur**, tape
  `await LennyGateHash("SON-CODE")`, puis colle l'empreinte affichée dans
  `CODE_HASHES` (→ libellé) et, si besoin, dans `NAME_HASHES` (→ prénom).
- Le **code formateur** (accès au tableau « Avis reçus ») est celui dont le libellé
  contient « admin ». Tout code admin donne `window.LennyAuth.isAdmin = true` côté front ;
  côté serveur, l'accès réel aux données admin est protégé par le **jeton `ADMIN_TOKEN`**
  (voir § 9).

---

## 8. Référence API (déjà implémentée dans `backend/main.py`)

| Méthode | Route | Corps / params | Réponse |
|---|---|---|---|
| `POST` | `/api/feedback` | `{course_id, vote:"up"|"down"|null, user_id, user_name, date}` | `{up, down, mine}` |
| `GET` | `/api/feedback/{course_id}?user_id=` | — | `{up, down, mine}` |
| `GET` | `/api/feedback/admin?user_id=` | — | `{rows:[{courseId, up, down, satisfaction, voters:[{name,vote,date}]}]}` |
| `POST` | `/api/quiz-result` | `{moduleId, subject, correct, total, user_id, ts, date}` | `{ok:true}` |
| `GET` | `/api/stats/radar?period=14&user_id=` | — | `{period, subjects, current[], previous[]}` |
| `POST` | `/api/session/claim` | `{code, client_id}` (IP lue côté serveur) | `{ok:true}` ou `409 {reason:"in_use"}` |
| `POST` | `/api/session/heartbeat` | `{code, client_id}` | `{ok:true}` ou `{revoked:true}` |
| `POST` | `/api/session/release` | `{code, client_id}` | `{ok:true}` |

Collections MongoDB créées automatiquement :
- **feedback** — 1 doc par `(course_id, user_id)` : `{course_id, user_id, user_name, vote, date}`
- **quiz_results** — 1 doc par quiz terminé : `{user_id, module_id, subject, correct, total, ts, date}`
- **sessions** — 1 doc par code actif : `{code, ip, client_id, last_seen, date}` (**verrou mono-appareil**)

### Verrou mono-appareil (1 code = 1 IP à la fois)

Le serveur est **indispensable** pour cette sécurité : lui seul voit l'IP de chaque
appareil. À la connexion, le front appelle `POST /api/session/claim` ; si le code est
déjà actif sur une **autre IP**, le serveur renvoie `409` et l'accès est refusé. Un
heartbeat (30 s) maintient la session ; une session sans heartbeat depuis 90 s est
libérée automatiquement. **Tant que `LENNY_API_BASE` n'est pas défini, ce verrou ne
s'applique pas** (impossible côté navigateur) — il s'active dès le branchement (étape D).

> Important pour l'hébergement de l'API : derrière un proxy (Render/Railway), l'IP
> réelle est lue via l'en-tête `X-Forwarded-For` (déjà géré dans `main.py`).

---

## 9. Sécurité — à durcir avant un usage réel

Le code livré est fonctionnel. Les protections principales sont **déjà en place** :

1. ✅ **`/api/feedback/admin` et `POST`/`DELETE /api/updates` sont protégés** par un
   **jeton formateur**. Le serveur exige l'en-tête `X-Admin-Token` égal à la variable
   d'env `ADMIN_TOKEN` ; sans elle, ces routes renvoient `503` (*fail-closed*), et un
   mauvais jeton renvoie `401`. Côté front, Lenny saisit ce jeton une seule fois (il est
   stocké localement sur son appareil, jamais dans la source). → **Pense à définir
   `ADMIN_TOKEN` sur Render (§ 4) sinon le tableau formateur restera vide en ligne.**
2. ✅ **Codes d'accès hachés** (PBKDF2-SHA256) + anti-force-brute dans `lenny-gate.js`.
3. ✅ **En-têtes de sécurité** (`_headers` Netlify : anti-clickjacking, HSTS, nosniff).

Reste optionnel à durcir selon l'usage :

4. **Restreindre `CORS_ORIGINS`** à l'URL exacte du site (pas `*`).
5. **Network Access Atlas** : restreindre aux IP de l'hébergeur si possible.
6. **Rate-limiting** léger sur `POST /api/feedback` (anti-spam de votes).

---

## 10. Récapitulatif express

1. Atlas → cluster gratuit → récupérer `MONGO_URL`.
2. Render → déployer `backend/` → variables `MONGO_URL`, `MONGO_DB`, `CORS_ORIGINS`, **`ADMIN_TOKEN`** → récupérer l'URL de l'API.
3. Tester l'API (`curl`).
4. Ajouter `<script>window.LENNY_API_BASE="https://VOTRE-API";</script>` dans le `<head>` du site → redéployer.
5. Ajouter les élèves via `await LennyGateHash("CODE")` (console) → coller dans `CODE_HASHES` / `NAME_HASHES`.
6. À la 1re action formateur en ligne, saisir le **même `ADMIN_TOKEN`** dans le navigateur.

À partir de l'étape 4, les votes des élèves sont réels, centralisés et nominatifs.
