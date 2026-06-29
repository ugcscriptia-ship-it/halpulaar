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
    <div className="relative min-h-screen">
      {/* Background gradient personnalisé */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 20% 0%, rgba(30,42,120,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 100%, rgba(74,47,28,0.25) 0%, transparent 55%),
            #0B1026
          `,
        }}
      />

      {/* Header sticky */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] backdrop-blur-md"
        style={{ background: 'rgba(11,16,38,0.85)' }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            ← Retour
          </button>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Streak days={streak} />
            <XPBadge xp={xp} />

            {user ? (
              <button
                onClick={signOut}
                title={user.email ?? 'Déconnexion'}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo/60 text-xs font-bold text-white/80 hover:text-white transition ring-1 ring-white/10"
              >
                {user.email?.[0].toUpperCase() ?? '?'}
              </button>
            ) : (
              <Link
                to="/auth"
                className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-white/50 transition hover:border-cyan/40 hover:text-cyan"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-24 pt-6">
        {title && (
          <h1 className="mb-6 font-display text-2xl font-bold text-sand">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  )
}
