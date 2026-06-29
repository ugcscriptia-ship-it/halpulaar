import type { StreakProps } from './Streak.types'

export function Streak({ days }: StreakProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ocre/15 px-3 py-1 text-sm font-semibold text-ocre" title="Série en cours">
      <span aria-hidden>🔥</span> {days}
    </span>
  )
}
