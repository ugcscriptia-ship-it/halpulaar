import { useState } from 'react'
import { AudioPlayButton } from '@/components/atoms/AudioPlayButton'
import type { FlashCardProps } from './FlashCard.types'

export function FlashCard({ item }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="relative grid min-h-[140px] w-full place-items-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-sand/40 hover:bg-white/[0.05]"
    >
      {!flipped ? (
        <span className="font-pulaar text-2xl text-sand">{item.pulaar}</span>
      ) : (
        <span className="text-xl text-white/85">{item.fr}</span>
      )}

      <span
        className="absolute right-3 top-3"
        onClick={(e) => e.stopPropagation()}
      >
        <AudioPlayButton
          src={item.audio}
          text={item.pulaar}
          size="sm"
          label={`Écouter : ${item.pulaar}`}
        />
      </span>

      <span className="absolute bottom-2 text-[10px] text-white/25">
        {flipped ? '← retourner' : 'touche pour retourner'}
      </span>
    </button>
  )
}
