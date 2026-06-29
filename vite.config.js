import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
// Vercel expose SUPABASE_URL / SUPABASE_ANON_KEY sans préfixe VITE_ via
// l'intégration native. On les mappe ici pour que Vite les injecte.
// Les variables VITE_SUPABASE_* définies manuellement fonctionnent sans ce bloc.
// SERVICE_ROLE_KEY ne doit JAMAIS apparaître ici (CLAUDE.md §6).
var supabaseDefine = {};
if (process.env.SUPABASE_URL)
    supabaseDefine['import.meta.env.VITE_SUPABASE_URL'] = JSON.stringify(process.env.SUPABASE_URL);
if (process.env.SUPABASE_ANON_KEY)
    supabaseDefine['import.meta.env.VITE_SUPABASE_ANON_KEY'] = JSON.stringify(process.env.SUPABASE_ANON_KEY);
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    define: supabaseDefine,
    server: { port: 3000, open: true },
});
