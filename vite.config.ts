import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// NOTE backend: tant que Supabase n'est pas branché, ce bloc ne sert à rien.
// Le jour où on l'ajoute (sync, communauté, tuteur IA), l'intégration Vercel
// expose SUPABASE_URL / SUPABASE_ANON_KEY ; Vite exige le préfixe VITE_.
// On mappe ici, et on ne lit JAMAIS SUPABASE_SERVICE_ROLE_KEY côté client.
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
  define: supabaseDefine,
  server: { port: 3000, open: true },
})
