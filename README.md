# Halpulaar

Plateforme d'apprentissage du **Pulaar du Fouta Toro** pour la diaspora francophone.
MVP **gratuit**, **sans backend** (progression en `localStorage`), mobile-first.

## Démarrer
```bash
npm install
npm run dev      # http://localhost:3000
```
```bash
npm run build    # build prod
npm run preview  # prévisualiser le build
npm run lint     # frontières Atomic Design + TS
```

## Ce qui tourne déjà
- **Accueil** (`/`) — choix des 3 modes.
- **Apprendre** (`/apprendre`) — `LessonPath` (le fleuve) → sélection d'un nœud → `ExerciseRunner` (QCM + écoute), XP/série persistés en local.
- **Aventure** (`/aventure`) — `SceneStage` avec une scène de dialogue d'exemple.

La boucle Ludique est complète de bout en bout ; Aventure et Académique partagent les mêmes composants Pareto (preuve du découpage 20/80).

## ⚠️ Contenu
Tout le Pulaar dans `src/content/` est **PLACEHOLDER** — à valider par un locuteur natif avant mise en ligne (voir `CLAUDE.md` §3). Aucun audio natif n'est inclus : les boutons audio s'affichent désactivés tant que les `.mp3` ne sont pas déposés dans `public/audio/`.

## Architecture
Atomic Design × Pareto. Détails complets : `CLAUDE.md`.

## Brancher Supabase plus tard
Réécrire `src/data/progress.ts` (load/save) en appels Supabase. Rien d'autre à toucher côté UI. La config Vercel/env est déjà préparée dans `vite.config.ts`.

## Pas dans ce scaffold (volontaire)
Paiement (site gratuit), backend, tuteur IA (différé, nécessite clé serveur), communauté/blog/podcasts (dossiers présents, stubs `TODO S4+`).
