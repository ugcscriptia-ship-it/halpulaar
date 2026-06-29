export type LessonNodeStatus = 'locked' | 'available' | 'done'
export type LessonNodeProps = {
  title: string
  index: number
  status: LessonNodeStatus
  onClick?: () => void
}
