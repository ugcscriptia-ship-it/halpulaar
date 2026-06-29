import type { SceneStageSlots } from './SceneStage.types'
export const defaultSlots: SceneStageSlots = { overlay: undefined, footer: undefined }
export function resolveSlots(p?: SceneStageSlots): SceneStageSlots {
  return { ...defaultSlots, ...(p ?? {}) }
}
