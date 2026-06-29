import type { AdventureLayoutProps } from './AdventureLayout.types'

// Immersif, plein écran, cinématographique.
export function AdventureLayout({ children, onExit }: AdventureLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink via-indigo/20 to-ink">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <button onClick={onExit} className="mb-4 text-sm text-white/50 hover:text-white">✕ Quitter l'aventure</button>
        {children}
      </div>
    </div>
  )
}
