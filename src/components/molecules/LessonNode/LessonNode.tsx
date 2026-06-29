import type { LessonNodeProps } from './LessonNode.types'

const ring: Record<string, string> = {
  locked: 'bg-white/5 text-white/25 border-white/10',
  available: 'bg-gold text-ink border-gold shadow-glow',
  done: 'bg-sahel/25 text-sahel border-sahel/50',
}

export function LessonNode({ title, index, status, onClick }: LessonNodeProps) {
  const locked = status === 'locked'
  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      className="flex flex-col items-center gap-2"
      aria-label={`${title} — ${status}`}
    >
      <span className={`grid h-16 w-16 place-items-center rounded-full border-2 font-display text-lg font-bold transition ${ring[status]}`}>
        {status === 'done' ? '✓' : index}
      </span>
      <span className={`max-w-[8rem] text-center text-xs ${locked ? 'text-white/30' : 'text-white/70'}`}>{title}</span>
    </button>
  )
}
