import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { supabase, hasSupabase } from '@/lib/supabase'

type AuthStore = {
  user: User | null
  loading: boolean
  init: () => void
  signUp: (email: string, password: string) => Promise<string | null>
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  init: () => {
    if (!hasSupabase) { set({ loading: false }); return }
    supabase.auth.getSession().then(({ data }) => {
      set({ user: data.session?.user ?? null, loading: false })
    })
    supabase.auth.onAuthStateChange((_evt, session) => {
      set({ user: session?.user ?? null })
    })
  },

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password })
    return error?.message ?? null
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error?.message ?? null
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
}))
