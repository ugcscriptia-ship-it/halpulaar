import { useAudio } from '@/hooks/useAudio'
import type { AudioPlayButtonProps } from './AudioPlayButton.types'

export function AudioPlayButton({ src, label = 'Écouter', size = 'md' }: AudioPlayButtonProps) {
  const { play, playing } = useAudio()
  const dim = size === 'sm' ? 'h-8 w-8 text-sm' : 'h-11 w-11 text-base'
  const available = !!src
  return (
    <button
      onClick={() => play(src)}
      disabled={!available}
      aria-label={available ? label : 'Audio natif à venir'}
      title={available ? label : 'Audio natif à venir'}
      className={`grid place-items-center rounded-full transition ${dim} ${
        available ? 'bg-cyan/15 text-cyan hover:bg-cyan/25' : 'bg-white/5 text-white/25 cursor-not-allowed'
      } ${playing ? 'shadow-glow' : ''}`}
    >
      {playing ? '❚❚' : '▶'}
    </button>
  )
}
