import type { CharacterBubbleProps } from './CharacterBubble.types'

export function CharacterBubble({ name, role, emoji = '🧓' }: CharacterBubbleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-indigo/60 text-2xl">{emoji}</span>
      <div>
        <p className="font-display text-sand">{name}</p>
        {role && <p className="text-xs text-white/50">{role}</p>}
      </div>
    </div>
  )
}
