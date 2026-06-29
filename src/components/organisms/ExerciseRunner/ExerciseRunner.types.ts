import type { Exercise } from '@/types/domain.types'
export type ExerciseRunnerProps = {
  exercises: Exercise[]
  xpPerCorrect?: number
  onComplete: (score: { correct: number; total: number }) => void
}
