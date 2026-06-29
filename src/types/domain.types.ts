export type Level = 'A1' | 'A2' | 'B1'

export type VocabItem = { id: string; pulaar: string; fr: string; audio?: string; phonetic?: string; category?: string }

// Tranche runnable : 2 variants. Les autres (match, order, listen-write, speak)
// s'ajoutent dans ExerciseRunner sans casser le type.
export type Exercise =
  | { id: string; kind: 'mcq'; prompt: string; promptPulaar?: string; options: string[]; answerIndex: number; audio?: string }
  | { id: string; kind: 'listen'; prompt: string; audio?: string; options: string[]; answerIndex: number }

export type LessonNodeData = { id: string; title: string; exerciseIds: string[] }
export type Lesson = { id: string; level: Level; title: string; nodes: LessonNodeData[] }

export type DialogueLineData = { id: string; speaker: string; pulaar: string; fr: string; audio?: string }
export type Choice = { label: string; nextSceneId?: string }
export type Scene = { id: string; title: string; bg?: string; lines: DialogueLineData[]; choices?: Choice[] }

export type Progress = { xp: number; streak: number; lastActive: string | null; completedNodes: string[] }
