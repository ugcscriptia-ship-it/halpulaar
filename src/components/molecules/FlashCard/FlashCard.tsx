import { useState } from 'react'
import { AudioPlayButton } from '@/components/atoms/AudioPlayButton'
import type { FlashCardProps } from './FlashCard.types'

export function FlashCard({ item }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="relative grid min-h-[160px] w-full place-items-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-sand/40 hover:bg-white/[0.05]"
    >
      {!flipped ? (
        <div className="flex flex-col items-center gap-2">
          <span className="font-pulaar text-3xl text-sand">{item.pulaar}</span>
          {item.phonetic && (
            <span className="text-xs text-white/35 tracking-wider">[{item.phonetic}]</span>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl text-white/85">{item.fr}</span>
          {item.category && (
            <span className="rounded-full border border-cyan/20 bg-cyan/5 px-2.5 py-0.5 text-[10px] text-cyan/60">
              {item.category}
            </span>
          )}
        </div>
      )}

      <span
        className="absolute right-3 top-3"
        onClick={(e) => e.stopPropagation()}
      >
        <AudioPlayButton
          src={item.audio}
          text={item.phonetic ?? item.pulaar}
          size="sm"
          label={`Écouter : ${item.pulaar}`}
        />
      </span>

      <span className="absolute bottom-2 text-[10px] text-white/25">
        {flipped ? '← Pulaar' : 'touche pour voir la traduction'}
      </span>
    </button>
  )
}
