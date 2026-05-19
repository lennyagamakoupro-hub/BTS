# PRD — LENNY · Le Netflix de la révision BTS PI

## Problem Statement (latest, verbatim)
> non je veux un style netflix mais je veux que l'on travaille uniquement à partir du dernier dossier que je viens de t'envoyer et reprendre le style netflix le but étant de faire des fiches de révision je veux écris LENNY comme logo mais je veux que tu reprenne complètement la direction de netflix en tout point

Original vision: "Le Netflix de l'immobilier" — plateforme de révision style streaming pour BTS Professions Immobilières.

## User Choices (Feb 2026)
- **Brand**: LENNY (logo rouge style Netflix)
- **Style**: Netflix complet (fond noir, rouge #E50914, hero billboard, carrousels horizontaux, hover popout, modal détail, watch page)
- **Content scope**: BTS Professions Immobilières — 4 fiches existantes (maths) + nouvelles fiches droit/transaction/gestion/habitat

## Architecture
- Frontend-only React SPA (CRA + Tailwind + Framer Motion 12 + lucide-react)
- Routes: `/` Browse (unique)
- Pas de backend, pas d'auth, pas de DB

## Design System (LENNY)
- **Palette**: noir `#000` / surfaces `#141414`-`#181818` / rouge `#E50914` / texte `#FFF` / secondaire `#B3B3B3`
- **Couleurs catégorie**: Finance `#FF4400`, Droit `#0EA5E9`, Transaction `#E50914`, Gestion `#A855F7`, Habitat `#22C55E`
- **Typography**: Anton (logo / numéros Top 10 / labels brand), Inter 900 (display titles), Inter (body)
- Card thumbnails generated procedurally (gradient radial + halftone + big initial)

## Implemented (Feb 19, 2026 — Pivot)
### Composants
- **NavBar**: transparent → noir au scroll, logo LENNY rouge, liens catégories, recherche pliable, cloche, avatar
- **Hero billboard**: 78-88vh, vignette catégorie, badge L · ORIGINAL, titre énorme, tagline italique, synopsis, boutons Réviser/Plus d'infos/+Liste, badge BTS PI à droite
- **Row** carrousel horizontal avec flèches qui apparaissent au hover de la rangée
- **Card** (260×150) avec badge L · ORIGINAL + lettrine, **hover popout** qui grandit (1.18) et révèle Play/+/Like/Down arrow + meta
- **Top 10 row**: numéros 1-10 outline géants façon Netflix
- **DetailOverlay**: modal centré, hero header, programme (épisodes), À voir aussi
- **StudyView** (watch page): hero, synopsis bordé accent, sections (avec formule highlight), Calculator interactif (fiches finance), Quiz, FlashCards 3D-flip, retour
- **Footer**: liens + copyright

### Contenu (17 fiches BTS PI)
- **Finance** (4): Intérêts simples, Intérêts composés (vedette hero), Taux proportionnel, Taux équivalent
- **Droit** (4): Loi Hoguet, Mandat de vente, Copropriété, Bail d'habitation
- **Transaction** (4): Compromis vs Promesse, Diagnostics, Plus-value, Financement
- **Gestion locative** (3): État des lieux, Charges récupérables, Encadrement des loyers
- **Habitat durable** (2): RE 2020, Passoires thermiques

### Rangées catalogue (8)
Tendance · Reprendre · Maths · Droit · Transaction · Gestion · Habitat · Top 10

### Test Results
- testing_agent_v3 iteration 2: **100% frontend pass**, math vérifiée (5000 €/4%/10y → 7000 € simple, 7401 € composé), zéro erreur console.

## Backlog
- **P1**: Persistance progression (localStorage), favoris "Ma liste", historique de lecture
- **P1**: Plus de fiches BTS PI (annuités, emprunt indivis, SCI, IFI, urbanisme, marketing immobilier)
- **P1**: Vrais visuels par catégorie (illustrations sur mesure pour chaque fiche)
- **P2**: Player mobile dédié + swipe latéral
- **P2**: Mode "binge revision" — enchaîne quiz × N fiches
- **P2**: Recommandations algo selon scores
- **P3**: Compte étudiant + sync multi-device

## Anciennes pistes (déprouvées)
- Style brutaliste éditorial (livré en iter 1, pivoté en iter 2)
