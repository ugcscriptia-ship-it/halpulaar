import { DialogueLine } from '@/components/molecules/DialogueLine'
import { LessonButton } from '@/components/atoms/LessonButton'
import { resolveSlots } from './SceneStage.slots'
import type { SceneStageProps } from './SceneStage.types'

export function SceneStage({ scene, onChoice, slots }: SceneStageProps) {
  const s = resolveSlots(slots)
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-indigo/30 to-ink p-6">
      {s.overlay}
      <h2 className="mb-4 font-display text-xl text-sand">{scene.title}</h2>
      <div className="grid gap-3">
        {scene.lines.map((line, i) => (
          <DialogueLine key={line.id} line={line} active={i === scene.lines.length - 1} />
        ))}
      </div>
      {scene.choices && scene.choices.length > 0 && (
        <div className="mt-5 grid gap-2">
          {scene.choices.map((c, i) => (
            <LessonButton key={i} variant="ghost" full onClick={() => onChoice?.(i)}>
              {c.label}
            </LessonButton>
          ))}
        </div>
      )}
      {s.footer}
    </section>
  )
}
