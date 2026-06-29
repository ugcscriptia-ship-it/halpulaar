import type { ProgressRingProps } from './ProgressRing.types'

export function ProgressRing({ value, size = 44, label }: ProgressRingProps) {
  const r = (size - 6) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value))
  return (
    <div className="grid place-items-center" style={{ width: size, height: size }} aria-label={label}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2DD4D4" strokeWidth="3"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <span className="absolute text-xs font-semibold text-cyan">{Math.round(pct * 100)}</span>
    </div>
  )
}
