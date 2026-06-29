import { useState } from 'react'
import { ExerciseCard } from '@/components/molecules/ExerciseCard'
import { ProgressRing } from '@/components/atoms/ProgressRing'
import { useProgressStore } from '@/stores/useProgressStore'
import type { ExerciseRunnerProps } from './ExerciseRunner.types'

export function ExerciseRunner({ exercises, xpPerCorrect = 10, onComplete }: ExerciseRunnerProps) {
  const [i, setI] = useState(0)
  const [correct, setCorrect] = useState(0)
  const addXp = useProgressStore((s) => s.addXp)
  const registerActivity = useProgressStore((s) => s.registerActivity)

  const handleAnswer = (ok: boolean) => {
    if (ok) {
      addXp(xpPerCorrect)
      setCorrect((c) => c + 1)
    }
    const next = i + 1
    if (next >= exercises.length) {
      registerActivity()
      onComplete({ correct: correct + (ok ? 1 : 0), total: exercises.length })
    } else {
      setI(next)
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <ProgressRing value={i / exercises.length} label="Progression de la session" />
        <span className="text-sm text-white/50">{i + 1} / {exercises.length}</span>
      </div>
      <ExerciseCard key={exercises[i].id} exercise={exercises[i]} onAnswer={handleAnswer} />
    </div>
  )
}
