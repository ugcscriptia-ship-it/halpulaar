import { create } from 'zustand'
import type { Progress } from '@/types/domain.types'
import { loadProgress, saveProgress, emptyProgress, pushProgressToSupabase } from '@/data/progress'
import { supabase, hasSupabase } from '@/lib/supabase'

type ProgressStore = Progress & {
  addXp: (amount: number) => void
  completeNode: (nodeId: string) => void
  registerActivity: () => void
  reset: () => void
  hydrate: (p: Progress) => void
}

function isYesterday(iso: string | null): boolean {
  if (!iso) return false
  const d = new Date(iso)
  const y = new Date()
  y.setDate(y.getDate() - 1)
  return d.toDateString() === y.toDateString()
}
function isToday(iso: string | null): boolean {
  return !!iso && new Date(iso).toDateString() === new Date().toDateString()
}

function persist(p: Progress) {
  saveProgress(p)
  if (hasSupabase) {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) pushProgressToSupabase(user.id, p)
    })
  }
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...loadProgress(),

  hydrate: (p) => set({ ...p }),

  addXp: (amount) => {
    set((s) => ({ xp: s.xp + amount }))
    persist(get())
  },

  completeNode: (nodeId) => {
    set((s) => s.completedNodes.includes(nodeId) ? s : { completedNodes: [...s.completedNodes, nodeId] })
    persist(get())
  },

  registerActivity: () => {
    const last = get().lastActive
    set((s) => ({
      lastActive: new Date().toISOString(),
      streak: isToday(last) ? s.streak : isYesterday(last) ? s.streak + 1 : 1,
    }))
    persist(get())
  },

  reset: () => {
    set({ ...emptyProgress })
    persist(get())
  },
}))
