# CLAUDE.md — Halpulaar

> Contexte projet pour Claude Code. À garder à la racine du repo.
> *Haalpulaar* = « celui qui parle le pulaar ». Apprentissage du Pulaar du Fouta Toro pour la diaspora francophone (FR / BE / CA).

## 0. Décisions produit en vigueur
- **Site gratuit** pour l'instant → **aucun paiement** (pas de Stripe, pas de Wave/OM) dans le code.
- **Pas de backend** au démarrage. Contenu statique typé + progression en `localStorage` (Zustand persist).
- **Supabase = seulement si nécessaire** : on l'ajoute le jour où on a besoin de sync multi-appareils, communauté, classements ou tuteur IA (clé serveur). La couture est prête : `src/data/`.

## 1. Mission
Tenir une conversation familiale simple en quelques semaines via la **loi de Pareto** (20 % → 80 %). 3 modes : Aventure cinématographique, Ludique (Duolingo-like), Académique (A1→A2→B1). Cible diaspora (bonne connexion) → PWA centrée cache média, pas offline-first 2G.

## 2. Stack (figée)
- Build **Vite ^5.4.8** (pinné — ne jamais laisser dériver vers v8+).
- React 18 + **TypeScript** + Tailwind + tokens (§4).
- Anim : **GSAP** + Framer Motion. Three.js réservé à 1-2 hero, lazy-loadé.
- État : **Zustand** (+ persist localStorage). TanStack Query seulement quand un backend arrive.
- Déploiement **Vercel**.
- IA tuteur : **différée** (voir §3) ; quand activée → **Anthropic API (Claude)** via Edge Function.

## 3. Règle critique — Pulaar = langue à faibles ressources
Aucun LLM ne génère du Pulaar de façon fiable → il hallucine.
- Le tuteur IA (quand il existera) ne génère **JAMAIS** de Pulaar libre : correction dans un vocabulaire/banque validés, planification SRS, feedback structuré.
- Audio = **enregistrements natifs du Fouta**, jamais de TTS.
- Tout contenu Pulaar (`src/content/*`) est **PLACEHOLDER** tant qu'un locuteur natif ne l'a pas validé.
- Glyphes à crochet **`ɓ ɗ ŋ ƴ`** (+ `Ɓ Ɗ Ŋ Ƴ`) : corps en **Noto Sans** (couverture garantie). Display **Space Grotesk** réservé aux titres FR. Bandeau de test glyphes dans `App.tsx` (à retirer en prod). UTF-8 / NFC partout.

## 4. Tokens « Afro-Futuriste Peul » (tailwind.config.ts)
ink #0B1026 · indigo #1E2A78 · sand #E0B463 · ocre #C2702C · earth #4A2F1C · sahel #5B8C4E · cyan #2DD4D4 · gold #F5C518.
Signature : `LessonPath` = nœuds remontant le fleuve Sénégal en serpentant ; nœud actif en `shadow-glow` cyan.

## 5. Architecture — Atomic Design × Pareto
`atoms → molecules → organisms → templates → pages`. Pareto pilote l'ordre de build : 16 composants en S1, le reste = `index.ts` (`export {}`) + `// TODO S4+`.
Convention fichier : `X.tsx` / `X.types.ts` / `index.ts` (+ `X.slots.ts` quand le composant compose des slots — ex. SceneStage).

16 Pareto :
- atoms (6) : LessonButton, AudioPlayButton, OptionChip, ProgressRing, XPBadge, Streak
- molecules (5) : ExerciseCard, DialogueLine, FlashCard, LessonNode, CharacterBubble
- organisms (3) : SceneStage, ExerciseRunner, LessonPath
- templates (2) : AdventureLayout, LearnLayout

Mapping modes :
- Aventure  : AdventureLayout > SceneStage > DialogueLine + CharacterBubble
- Ludique   : LearnLayout > ExerciseRunner > ExerciseCard + OptionChip + Streak/XPBadge
- Académique: LearnLayout > LessonPath > LessonNode + FlashCard + ProgressRing

## 6. La couture backend (`src/data/`)
`progress.ts` expose `loadProgress` / `saveProgress`. Aujourd'hui localStorage ; demain Supabase — **seul ce fichier change**, l'interface est stable. Quand Supabase arrive :
- schéma `Database` en **`type` (jamais `interface`)** ;
- RLS dès J1 ;
- `vite.config.ts` mappe déjà `SUPABASE_URL/ANON_KEY → VITE_*` ; ne jamais lire `SERVICE_ROLE_KEY` côté client ;
- clés sensibles (tuteur, futurs paiements) en Edge Functions uniquement.

## 7. Règles ESLint (enforced)
no-restricted-imports : un composant n'importe que son niveau inférieur ; pas d'`@supabase/*` dans components/pages (passe par `data/`).

## 8. Workflow
Vérif visuelle Playwright. Commits atomiques par composant. DoD Pareto : tsx + types + index (+ slots si besoin) + rendu OK + glyphes ɓɗŋƴ testés si texte Pulaar.
