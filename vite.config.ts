import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Vercel expose les variables Supabase sans le préfixe VITE_ quand on utilise
// l'intégration native Vercel ↔ Supabase. On les mappe ici au build.
// Les variables VITE_SUPABASE_* définies manuellement fonctionnent sans ce bloc.
// On ne lit JAMAIS SUPABASE_SERVICE_ROLE_KEY côté client (CLAUDE.md §6).
const supabaseDefine: Record<string, string> = {}
if (process.env.SUPABASE_URL)
  supabaseDefine['import.meta.env.VITE_SUPABASE_URL'] = JSON.stringify(process.env.SUPABASE_URL)
if (process.env.SUPABASE_ANON_KEY)
  supabaseDefine['import.meta.env.VITE_SUPABASE_ANON_KEY'] = JSON.stringify(process.env.SUPABASE_ANON_KEY)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  define: {
    ...supabaseDefine,
    // Empêche le crash de Supabase SDK sur les globals Node absents en browser
    'global': 'globalThis',
  },
  server: { port: 3000, open: true },
})
