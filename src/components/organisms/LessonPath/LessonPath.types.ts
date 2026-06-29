import type { Lesson } from '@/types/domain.types'
export type LessonPathProps = {
  lesson: Lesson
  completedNodes: string[]
  onSelectNode: (nodeId: string) => void
}
