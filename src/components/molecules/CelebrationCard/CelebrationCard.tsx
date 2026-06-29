import { Mascot } from '@/components/atoms/Mascot'
import type { CelebrationCardProps } from './CelebrationCard.types'

const CONFETTI_COLORS = ['#F5C518', '#2DD4D4', '#E0B463', '#5B8C4E', '#C2702C']

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece absolute h-2 w-2 rounded-sm"
          style={{
            left: `${5 + (i * 4.7) % 90}%`,
            top: `-8px`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animationDelay: `${(i * 0.07).toFixed(2)}s`,
            animationDuration: `${1.2 + (i % 4) * 0.25}s`,
            transform: `rotate(${i * 37}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export function CelebrationCard({ correct, total, xpEarned, onContinue }: CelebrationCardProps) {
  const perfect = correct === total
  const ratio   = total > 0 ? correct / total : 0

  const message =
    perfect           ? 'Parfait ! Tous les mots maîtrisés !' :
    ratio >= 0.75     ? 'Très bien ! Continue comme ça !' :
    ratio >= 0.5      ? 'Bien joué ! Tu progresses !' :
                        'Continue, tu vas y arriver !'

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-indigo/30 to-ink p-8 text-center">
      <Confetti />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <Mascot mood="celebrating" size={100} />

        <div>
          <p className="font-display text-2xl font-bold text-sand">{message}</p>
          <p className="mt-1 text-sm text-white/50">
            {correct} / {total} bonnes réponses
          </p>
        </div>

        {/* Score visuel */}
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${i < correct ? 'bg-sahel' : 'bg-white/15'}`}
            />
          ))}
        </div>

        {/* XP gagné */}
        <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
          <span className="text-gold">✦</span>
          <span className="font-display font-semibold text-gold">+{xpEarned} XP</span>
        </div>

        <button
          onClick={onContinue}
          className="mt-2 w-full rounded-xl bg-sand px-6 py-3 font-display font-semibold text-ink transition hover:bg-gold active:scale-95"
        >
          Continuer →
        </button>
      </div>
    </div>
  )
}
