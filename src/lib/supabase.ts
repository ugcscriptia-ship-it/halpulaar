import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL  ?? ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const hasSupabase = !!(url && key)

// createClient() plante si url/key sont vides — on utilise des valeurs
// de substitution neutres quand Supabase n'est pas configuré.
// hasSupabase === false → aucun appel réseau ne sera jamais effectué.
export const supabase = createClient(
  url  || 'https://placeholder.supabase.co',
  key  || 'placeholder-anon-key',
)
