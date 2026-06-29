import type { LessonButtonProps } from './LessonButton.types'

const styles: Record<string, string> = {
  primary: 'bg-gold text-ink hover:brightness-105 active:translate-y-px',
  ghost: 'bg-white/5 text-sand border border-sand/30 hover:bg-white/10',
  done: 'bg-sahel/20 text-sahel border border-sahel/40',
  locked: 'bg-white/5 text-white/30 cursor-not-allowed',
}

export function LessonButton({ children, variant = 'primary', onClick, disabled, full }: LessonButtonProps) {
  const locked = variant === 'locked' || disabled
  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      className={`rounded-xl px-5 py-3 font-display font-semibold transition ${full ? 'w-full' : ''} ${styles[variant]}`}
    >
      {children}
    </button>
  )
}
