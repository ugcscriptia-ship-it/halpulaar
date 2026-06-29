import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL  ?? ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const hasSupabase = !!(url && key)

// Garde-fou : createClient() plante sur des chaînes vides.
// Quand Supabase n'est pas configuré, on crée un client inerte avec
// des valeurs syntaxiquement valides — hasSupabase===false bloque
// tout appel réseau en amont.
export const supabase = hasSupabase
  ? createClient(url, key)
  : createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.placeholder')
