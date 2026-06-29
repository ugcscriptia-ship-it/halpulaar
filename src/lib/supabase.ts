import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL  ?? ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const hasSupabase = !!(url && key)

// Wrapper fetch qui garantit que tous les headers sont ISO-8859-1 safe.
// Nécessaire car supabase-js 2.108+ inclut runtime info dans X-Client-Info
// qui peut contenir des caractères hors Latin-1 selon l'environnement.
const safeFetch: typeof fetch = (input, init) => {
  if (init?.headers) {
    const clean: Record<string, string> = {}
    new Headers(init.headers).forEach((val, key) => {
      // Remplace tout caractère > U+00FF par '' (Latin-1 safe)
      clean[key] = val.replace(/[^\x00-\xFF]/g, '')
    })
    return fetch(input, { ...init, headers: clean })
  }
  return fetch(input, init)
}

export const supabase = hasSupabase
  ? createClient(url, key, { global: { fetch: safeFetch } })
  : createClient(
      'https://placeholder.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.placeholder',
      { global: { fetch: safeFetch } }
    )
