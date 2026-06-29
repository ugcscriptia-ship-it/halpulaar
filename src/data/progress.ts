import type { Progress } from '@/types/domain.types'
import { supabase, hasSupabase } from '@/lib/supabase'

const KEY = 'halpulaar.progress.v1'
export const emptyProgress: Progress = { xp: 0, streak: 0, lastActive: null, completedNodes: [] }

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...emptyProgress, ...JSON.parse(raw) } : emptyProgress
  } catch {
    return emptyProgress
  }
}

export function saveProgress(p: Progress): void {
  try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* quota / mode privé */ }
}

export async function pullProgressFromSupabase(userId: string): Promise<Progress | null> {
  if (!hasSupabase) return null
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('xp, streak, last_active, completed_nodes')
      .eq('user_id', userId)
      .maybeSingle()
    if (error || !data) return null
    const remote: Progress = {
      xp: data.xp ?? 0,
      streak: data.streak ?? 0,
      lastActive: data.last_active ?? null,
      completedNodes: data.completed_nodes ?? [],
    }
    const local = loadProgress()
    const merged: Progress = {
      xp: Math.max(remote.xp, local.xp),
      streak: Math.max(remote.streak, local.streak),
      lastActive: remote.lastActive ?? local.lastActive,
      completedNodes: [...new Set([...remote.completedNodes, ...local.completedNodes])],
    }
    saveProgress(merged)
    return merged
  } catch {
    return null
  }
}

export function pushProgressToSupabase(userId: string, p: Progress): void {
  if (!hasSupabase) return
  // Seuls des caractères ASCII dans ces valeurs — pas de risque header non-Latin1
  supabase.from('user_progress').upsert({
    user_id: userId,
    xp: p.xp,
    streak: p.streak,
    last_active: p.lastActive,
    completed_nodes: p.completedNodes,
    updated_at: new Date().toISOString(),
  }).then(({ error }) => {
    if (error) console.warn('[supabase] push progress:', error.message)
  })
}
