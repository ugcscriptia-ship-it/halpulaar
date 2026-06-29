import { Link } from 'react-router-dom'
import { Streak }  from '@/components/atoms/Streak'
import { XPBadge } from '@/components/atoms/XPBadge'
import { useProgressStore } from '@/stores/useProgressStore'
import { useAuthStore }     from '@/stores/useAuthStore'
import type { LearnLayoutProps } from './LearnLayout.types'

export function LearnLayout({ title, children, onBack }: LearnLayoutProps) {
  const xp     = useProgressStore((s) => s.xp)
  const streak = useProgressStore((s) => s.streak)
  const user   = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 pb-24 pt-4">
      <header className="mb-6 flex items-center justify-between gap-2">
        <button onClick={onBack} className="shrink-0 text-sm text-white/50 hover:text-white transition">
          ← Retour
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Streak days={streak} />
          <XPBadge xp={xp} />

          {user ? (
            <button
              onClick={signOut}
              title={user.email ?? 'Déconnexion'}
              className="h-8 w-8 rounded-full bg-indigo/60 text-xs text-white/70 hover:text-white transition overflow-hidden"
            >
              {user.email?.[0].toUpperCase() ?? '?'}
            </button>
          ) : (
            <Link
              to="/auth"
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/50 hover:text-white hover:border-white/40 transition"
            >
              Connexion
            </Link>
          )}
        </div>
      </header>

      {title && <h1 className="mb-6 font-display text-2xl text-sand">{title}</h1>}

      {children}
    </div>
  )
}
