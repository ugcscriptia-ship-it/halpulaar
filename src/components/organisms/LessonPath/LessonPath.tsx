import { LessonNode } from '@/components/molecules/LessonNode'
import type { LessonNodeStatus } from '@/components/molecules/LessonNode/LessonNode.types'
import type { LessonPathProps } from './LessonPath.types'

// Signature visuelle : les nœuds remontent le fleuve, en serpentant.
export function LessonPath({ lesson, completedNodes, onSelectNode }: LessonPathProps) {
  const statusOf = (idx: number, id: string): LessonNodeStatus => {
    if (completedNodes.includes(id)) return 'done'
    const prevId = idx === 0 ? null : lesson.nodes[idx - 1].id
    const unlocked = idx === 0 || (prevId !== null && completedNodes.includes(prevId))
    return unlocked ? 'available' : 'locked'
  }

  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded bg-gradient-to-b from-cyan/40 via-indigo/40 to-transparent" aria-hidden />
      <ul className="relative flex flex-col gap-10 py-4">
        {lesson.nodes.map((n, idx) => (
          <li key={n.id} className={idx % 2 === 0 ? 'self-start pl-6' : 'self-end pr-6'}>
            <LessonNode
              title={n.title}
              index={idx + 1}
              status={statusOf(idx, n.id)}
              onClick={() => onSelectNode(n.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
