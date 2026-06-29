// Répétition espacée minimale (inspiré SM-2). À enrichir quand srs_cards
// passera côté Supabase. Pour l'instant : calcul du prochain intervalle.
export type SrsState = { ease: number; interval: number; reps: number }

export const initialSrs: SrsState = { ease: 2.5, interval: 0, reps: 0 }

export function review(state: SrsState, quality: 0 | 1 | 2 | 3 | 4 | 5): SrsState {
  if (quality < 3) return { ...state, interval: 1, reps: 0 }
  const ease = Math.max(1.3, state.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
  const reps = state.reps + 1
  const interval = reps === 1 ? 1 : reps === 2 ? 6 : Math.round(state.interval * ease)
  return { ease, interval, reps }
}
