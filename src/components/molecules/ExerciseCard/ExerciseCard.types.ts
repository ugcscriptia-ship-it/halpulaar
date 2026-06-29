import type { Exercise } from '@/types/domain.types'
export type ExerciseCardProps = {
  exercise: Exercise
  onAnswer: (correct: boolean) => void
}
