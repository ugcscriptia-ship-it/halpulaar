import { useState } from 'react'
import { OptionChip } from '@/components/atoms/OptionChip'
import { AudioPlayButton } from '@/components/atoms/AudioPlayButton'
import { LessonButton } from '@/components/atoms/LessonButton'
import type { ExerciseCardProps } from './ExerciseCard.types'
import type { OptionChipState } from '@/components/atoms/OptionChip/OptionChip.types'

export function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const [picked, setPicked] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const correct = picked === exercise.answerIndex

  const chipState = (i: number): OptionChipState => {
    if (!checked) return picked === i ? 'selected' : 'idle'
    if (i === exercise.answerIndex) return 'correct'
    if (i === picked) return 'wrong'
    return 'idle'
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg text-sand">{exercise.prompt}</p>
          {'promptPulaar' in exercise && exercise.promptPulaar && (
            <p className="mt-1 font-pulaar text-white/70">{exercise.promptPulaar}</p>
          )}
        </div>
        {exercise.audio && <AudioPlayButton src={exercise.audio} />}
      </div>

      <div className="grid gap-2">
        {exercise.options.map((opt, i) => (
          <OptionChip key={i} label={opt} state={chipState(i)} disabled={checked} onClick={() => setPicked(i)} />
        ))}
      </div>

      <div className="mt-5">
        {!checked ? (
          <LessonButton full disabled={picked === null} onClick={() => setChecked(true)}>
            Vérifier
          </LessonButton>
        ) : (
          <LessonButton full variant={correct ? 'done' : 'ghost'} onClick={() => onAnswer(correct)}>
            {correct ? 'Bien joué — continuer' : 'Continuer'}
          </LessonButton>
        )}
      </div>
    </div>
  )
}
