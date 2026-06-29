import { useAudio } from '@/hooks/useAudio'
import type { AudioPlayButtonProps } from './AudioPlayButton.types'

export function AudioPlayButton({ src, text, label = 'Écouter', size = 'md' }: AudioPlayButtonProps) {
  const { play, stop, playing } = useAudio()

  const hasNative = !!src
  const hasTts    = !!text
  const available = hasNative || hasTts

  const dim = size === 'sm' ? 'h-8 w-8 text-sm' : 'h-11 w-11 text-base'

  const handleClick = () => {
    if (playing) { stop(); return }
    play(src, text)
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={handleClick}
        disabled={!available}
        aria-label={available ? (playing ? 'Arrêter' : label) : 'Audio natif à venir'}
        title={
          !available ? 'Audio natif à venir'
          : hasNative ? label
          : 'Lecture TTS — en attente de l\'enregistrement natif'
        }
        className={`grid place-items-center rounded-full transition-all duration-200 ${dim} ${
          playing
            ? 'bg-cyan/30 text-cyan shadow-glow scale-110'
            : available
            ? 'bg-cyan/15 text-cyan hover:bg-cyan/25 hover:scale-105 active:scale-95'
            : 'bg-white/5 text-white/20 cursor-not-allowed'
        }`}
      >
        {playing ? '⏹' : '▶'}
      </button>

      {/* Badge TTS visible uniquement quand pas de fichier natif */}
      {hasTts && !hasNative && (
        <span className="text-[8px] font-medium uppercase tracking-wide text-white/25 leading-none">
          tts
        </span>
      )}
    </div>
  )
}
