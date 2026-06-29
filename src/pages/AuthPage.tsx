import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mascot } from '@/components/atoms/Mascot'
import { useAuthStore } from '@/stores/useAuthStore'
import { hasSupabase } from '@/lib/supabase'

type Tab = 'login' | 'signup'

export default function AuthPage() {
  const navigate   = useNavigate()
  const signUp     = useAuthStore((s) => s.signUp)
  const signIn     = useAuthStore((s) => s.signIn)

  const [tab, setTab]         = useState<Tab>('login')
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [sent, setSent]       = useState(false)

  if (!hasSupabase) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-4">
        <Mascot mood="speaking" size={90} />
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="font-display text-xl text-sand">Connexion non disponible</h2>
          <p className="mt-3 text-sm text-white/55 leading-relaxed">
            La synchronisation multi-appareils n'est pas encore activée sur cette instance.
            Ta progression est sauvegardée localement sur cet appareil.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 w-full rounded-xl border border-white/15 py-3 text-sm text-white/60 hover:text-white"
          >
            ← Retour
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const err = tab === 'signup'
      ? await signUp(email, password)
      : await signIn(email, password)
    setLoading(false)
    if (err) { setError(err); return }
    if (tab === 'signup') { setSent(true); return }
    navigate('/apprendre')
  }

  if (sent) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-4">
        <Mascot mood="celebrating" size={100} />
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="font-display text-xl text-sand">Vérifie tes e-mails !</h2>
          <p className="mt-3 text-sm text-white/55 leading-relaxed">
            Un lien de confirmation a été envoyé à <strong className="text-white/80">{email}</strong>.
            Clique dessus pour activer ton compte et commencer à apprendre !
          </p>
          <button
            onClick={() => navigate('/apprendre')}
            className="mt-6 w-full rounded-xl bg-sand py-3 font-display font-semibold text-ink hover:bg-gold"
          >
            Continuer sans confirmer →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-4">
      {/* Logo + mascotte */}
      <div className="flex flex-col items-center gap-2">
        <Mascot mood="idle" size={90} />
        <h1 className="font-display text-2xl font-bold text-sand">Halpulaar</h1>
        <p className="text-sm text-white/40">Sauvegarde ta progression sur tous tes appareils</p>
      </div>

      {/* Card */}
      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1">
          {(['login', 'signup'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null) }}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                tab === t ? 'bg-sand text-ink shadow' : 'text-white/50 hover:text-white'
              }`}
            >
              {t === 'login' ? 'Se connecter' : 'S\'inscrire'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs text-white/50">Adresse e-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@exemple.com"
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">Mot de passe</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPass(e.target.value)}
              placeholder={tab === 'signup' ? 'Minimum 6 caractères' : '••••••••'}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl bg-sand py-3 font-display font-semibold text-ink transition hover:bg-gold disabled:opacity-50 active:scale-95"
          >
            {loading ? 'Chargement…' : tab === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/apprendre')}
            className="text-xs text-white/30 hover:text-white/60"
          >
            Continuer sans compte → progression locale uniquement
          </button>
        </div>
      </div>
    </div>
  )
}
