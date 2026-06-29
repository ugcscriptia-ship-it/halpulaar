import type { XPBadgeProps } from './XPBadge.types'

export function XPBadge({ xp }: XPBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1 text-sm font-semibold text-gold">
      <span aria-hidden>✦</span> {xp} XP
    </span>
  )
}
