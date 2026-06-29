import type { OptionChipProps } from './OptionChip.types'

const map: Record<string, string> = {
  idle: 'bg-white/5 border-white/15 text-white/90 hover:border-cyan/50',
  selected: 'bg-cyan/10 border-cyan text-cyan',
  correct: 'bg-sahel/15 border-sahel text-sahel',
  wrong: 'bg-ocre/15 border-ocre text-ocre',
}

export function OptionChip({ label, state = 'idle', onClick, disabled }: OptionChipProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-full rounded-xl border px-4 py-3 text-left font-pulaar transition ${map[state]}`}
    >
      {label}
    </button>
  )
}
