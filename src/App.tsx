import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage       from './pages/HomePage'
import LearnPage      from './pages/LearnPage'
import AdventurePage  from './pages/AdventurePage'
import AuthPage       from './pages/AuthPage'
import DictionaryPage from './pages/DictionaryPage'
import { useAuthStore }     from './stores/useAuthStore'
import { useProgressStore } from './stores/useProgressStore'
import { pullProgressFromSupabase } from './data/progress'

export default function App() {
  const initAuth = useAuthStore((s) => s.init)
  const user     = useAuthStore((s) => s.user)
  const hydrate  = useProgressStore((s) => s.hydrate)

  // Initialiser l'écoute de session Supabase au démarrage
  useEffect(() => { initAuth() }, [initAuth])

  // Quand l'utilisateur se connecte, synchroniser sa progression
  useEffect(() => {
    if (!user) return
    pullProgressFromSupabase(user.id).then((merged) => {
      if (merged) hydrate(merged)
    })
  }, [user, hydrate])

  return (
    <div className="min-h-full">
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/apprendre" element={<LearnPage />} />
        <Route path="/aventure"       element={<AdventurePage />} />
        <Route path="/dictionnaire"  element={<DictionaryPage />} />
        <Route path="/auth"          element={<AuthPage />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-3xl text-sand">404</p>
      <p className="text-white/50">Page introuvable.</p>
      <Link to="/" className="rounded-lg border border-cyan/30 px-4 py-2 text-sm text-cyan hover:bg-cyan/10">
        ← Retour à l'accueil
      </Link>
    </div>
  )
}
