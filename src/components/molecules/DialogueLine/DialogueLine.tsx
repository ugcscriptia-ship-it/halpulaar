import { AudioPlayButton } from '@/components/atoms/AudioPlayButton'
import type { DialogueLineProps } from './DialogueLine.types'

export function DialogueLine({ line, active }: DialogueLineProps) {
  return (
    <div className={`rounded-2xl border p-4 transition ${active ? 'border-cyan/60 bg-cyan/5' : 'border-white/10 bg-black/20'}`}>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-sand/70">{line.speaker}</span>
        <AudioPlayButton src={line.audio} text={line.pulaar} size="sm" label={`Écouter : ${line.pulaar}`} />
      </div>
      <p className="font-pulaar text-lg text-white">{line.pulaar}</p>
      <p className="mt-1 text-sm text-white/55">{line.fr}</p>
    </div>
  )
}
