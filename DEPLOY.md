# Déploiement - Instructions finales (2 minutes)

## Ce qui est déjà fait
- ✅ Code complet sur GitHub (repo BTS, branche main)
- ✅ Build React compilé
- ✅ Backend FastAPI prêt
- ✅ netlify.toml configuré

## Pour déployer le FRONTEND (Netlify - GRATUIT)

### Option A - Via le navigateur (la plus simple)
1. Va sur https://app.netlify.com/signup
2. Clique "Sign up with email" (PAS GitHub - ton compte est flaggé)
3. Crée un compte avec ton email
4. Clique "Add new site" > "Import an existing project"
5. Choisis "Deploy manually" si GitHub ne marche pas
6. Glisse-dépose le dossier `frontend/build` depuis le repo cloné

### Option B - Via CLI (nécessite token Netlify)
1. Sur Netlify : User Settings > Applications > Personal access tokens > "New access token"
2. Dans le terminal VS Code Emergent :
   ```
   netlify deploy --dir=/app/frontend/build --prod --auth=TON_TOKEN_NETLIFY
   ```

## Pour déployer le BACKEND (Render - GRATUIT)

Render bloqué aussi (OAuth GitHub flaggé). Solutions :
1. Va sur https://render.com/signup
2. Inscris-toi avec EMAIL (pas GitHub)
3. "New" > "Web Service"
4. Colle l URL: https://github.com/lennyagamakoupro-hub/BTS
5. Tu seras redirigé pour autoriser via GitHub - utilise le token PAT directement

## Variables d environnement nécessaires

### Backend (Render)
- MONGO_URL=mongodb+srv://... (depuis le .env dans le repo)
- DB_NAME=bts_database
- PORT=8000
