export type LessonButtonVariant = 'primary' | 'ghost' | 'done' | 'locked'
export type LessonButtonProps = {
  children: React.ReactNode
  variant?: LessonButtonVariant
  onClick?: () => void
  disabled?: boolean
  full?: boolean
}
