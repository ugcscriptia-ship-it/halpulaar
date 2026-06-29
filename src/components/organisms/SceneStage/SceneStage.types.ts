import type { ReactNode } from 'react'
import type { Scene } from '@/types/domain.types'
export type SceneStageSlots = { overlay?: ReactNode; footer?: ReactNode }
export type SceneStageProps = {
  scene: Scene
  onChoice?: (index: number) => void
  slots?: SceneStageSlots
}
