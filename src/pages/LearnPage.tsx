import { useMemo, useState } from 'react'
import { useNavigate }      from 'react-router-dom'
import { LearnLayout }      from '@/components/templates/LearnLayout'
import { LessonPath }       from '@/components/organisms/LessonPath'
import { ExerciseRunner }   from '@/components/organisms/ExerciseRunner'
import { FlashCard }        from '@/components/molecules/FlashCard'
import { CelebrationCard }  from '@/components/molecules/CelebrationCard'
import { Mascot }           from '@/components/atoms/Mascot'
import { LESSONS, EXERCISES, VOCAB } from '@/content'
import { useProgressStore } from '@/stores/useProgressStore'
import type { Lesson } from '@/types/domain.types'

type Mode  = 'ludique' | 'academique'
type View  = 'list' | 'path' | 'exercises' | 'celebration' | 'flashcards'
type Score = { correct: number; total: number }

export default function LearnPage() {
  const navigate       = useNavigate()
  const completedNodes = useProgressStore((s) => s.completedNodes)
  const completeNode   = useProgressStore((s) => s.completeNode)

  const [mode, setMode]               = useState<Mode>('ludique')
  const [view, setView]               = useState<View>('list')
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const [lastScore, setLastScore]     = useState<Score | null>(null)
  const [cardIdx, setCardIdx]         = useState(0)

  const exercises = useMemo(() => {
    const node = activeLesson?.nodes.find((n) => n.id === activeNodeId)
    return node ? node.exerciseIds.map((id) => EXERCISES[id]).filter(Boolean) : []
  }, [activeNodeId, activeLesson])

  const xpEarned = lastScore
    ? lastScore.correct * 10
    : 0

  const handleBack = () => {
    if (view === 'celebration') { setView('path'); return }
    if (view === 'exercises')   { setView('path'); return }
    if (view === 'path')        { setActiveLesson(null); setView('list'); return }
    if (view === 'flashcards')  { setView('list'); return }
    navigate('/')
  }

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson)
    setView('path')
  }

  const handleSelectNode = (nodeId: string) => {
    setActiveNodeId(nodeId)
    setView('exercises')
  }

  const handleExerciseComplete = (score: Score) => {
    completeNode(activeNodeId!)
    setLastScore(score)
    setView('celebration')
  }

  const handleCelebrationContinue = () => {
    setActiveNodeId(null)
    setLastScore(null)
    setView('path')
  }

  const handleModeChange = (m: Mode) => {
    setMode(m)
    setActiveLesson(null)
    setActiveNodeId(null)
    setLastScore(null)
    setCardIdx(0)
    setView(m === 'academique' ? 'flashcards' : 'list')
  }

  const pageTitle =
    view === 'celebration' ? '🎉 Bravo !'                                                         :
    view === 'exercises'   ? activeLesson?.nodes.find((n) => n.id === activeNodeId)?.title ?? ''  :
    view === 'path'        ? activeLesson?.title ?? ''                                             :
    view === 'flashcards'  ? 'Révision des mots'                                                   :
    'Leçons'

  const nodesCompleted = (lesson: Lesson) =>
    lesson.nodes.filter((n) => completedNodes.includes(n.id)).length

  return (
    <LearnLayout title={pageTitle} onBack={handleBack}>

      {/* Tabs mode — visibles sauf pendant un exercice ou une célébration */}
      {view !== 'exercises' && view !== 'celebration' && (
        <div className="mb-6 flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {(['ludique', 'academique'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                mode === m ? 'bg-sand text-ink shadow' : 'text-white/50 hover:text-white'
              }`}
            >
              {m === 'ludique' ? '🎮 Ludique' : '📚 Académique'}
            </button>
          ))}
        </div>
      )}

      {/* ── LISTE DE LEÇONS (Ludique) ── */}
      {view === 'list' && mode === 'ludique' && (
        <div className="grid gap-4">
          {/* Mascotte accueil */}
          <div className="flex justify-center py-2">
            <Mascot mood="idle" size={80} label="Maskoore" />
          </div>

          {LESSONS.map((lesson, i) => {
            const done  = nodesCompleted(lesson)
            const total = lesson.nodes.length
            const pct   = total ? Math.round((done / total) * 100) : 0
            const allDone = done === total
            return (
              <button
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.07] hover:-translate-y-0.5 hover:shadow-glow animate-fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display font-bold text-sm transition-all ${
                  allDone
                    ? 'border-sahel bg-sahel/10 text-sahel shadow-[0_0_12px_rgba(91,140,78,0.4)]'
                    : 'border-sand/40 text-sand group-hover:border-sand/70 group-hover:bg-sand/5'
                }`}>
                  {allDone ? '✓' : lesson.level}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-semibold text-white group-hover:text-sand transition-colors">
                    {lesson.title}
                  </div>
                  <div className="mt-0.5 text-xs text-white/40">{total} nœuds · {done}/{total} complétés</div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan to-sahel transition-all duration-700"
                      style={{ width: `${pct || 0}%` }}
                    />
                  </div>
                </div>
                <span className="text-white/25 transition-transform group-hover:translate-x-1 group-hover:text-cyan">→</span>
              </button>
            )
          })}

          {/* Note audio */}
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-center">
            <p className="text-xs text-white/35">
              🎵 Enregistrements audio natifs en cours — par des locuteurs du Fouta Toro
            </p>
          </div>
        </div>
      )}

      {/* ── CHEMIN DE LEÇON ── */}
      {view === 'path' && activeLesson && (
        <>
          <div className="mb-4 flex justify-center">
            <Mascot mood="speaking" size={70} />
          </div>
          <LessonPath
            lesson={activeLesson}
            completedNodes={completedNodes}
            onSelectNode={handleSelectNode}
          />
        </>
      )}

      {/* ── EXERCICES ── */}
      {view === 'exercises' && (
        <ExerciseRunner
          exercises={exercises}
          onComplete={handleExerciseComplete}
        />
      )}

      {/* ── CÉLÉBRATION ── */}
      {view === 'celebration' && lastScore && (
        <CelebrationCard
          correct={lastScore.correct}
          total={lastScore.total}
          xpEarned={xpEarned}
          onContinue={handleCelebrationContinue}
        />
      )}

      {/* ── FICHES (Académique) ── */}
      {view === 'flashcards' && (
        <FlashCardDeck cardIdx={cardIdx} onChange={setCardIdx} />
      )}

    </LearnLayout>
  )
}

/* ── Carousel de fiches vocabulaire ── */
function FlashCardDeck({ cardIdx, onChange }: { cardIdx: number; onChange: (i: number) => void }) {
  const total = VOCAB.length
  const item  = VOCAB[cardIdx]

  return (
    <div className="flex flex-col gap-5">
      {/* Mascot */}
      <div className="flex justify-center">
        <Mascot mood={cardIdx === total - 1 ? 'celebrating' : 'speaking'} size={75} />
      </div>

      <div className="flex items-center justify-between text-sm text-white/40">
        <span>Fiche {cardIdx + 1} / {total}</span>
        <span className="text-xs text-white/30">touche pour retourner</span>
      </div>

      {/* Barre progression */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan to-gold transition-all duration-500"
          style={{ width: `${((cardIdx + 1) / total) * 100}%` }}
        />
      </div>

      <FlashCard key={item.id} item={item} />

      <div className="flex gap-3">
        <button
          onClick={() => onChange(Math.max(0, cardIdx - 1))}
          disabled={cardIdx === 0}
          className="flex-1 rounded-xl border border-white/10 py-3 text-sm text-white/50 transition hover:border-white/30 hover:text-white disabled:opacity-30"
        >
          ← Précédent
        </button>
        <button
          onClick={() => onChange(Math.min(total - 1, cardIdx + 1))}
          disabled={cardIdx === total - 1}
          className="flex-1 rounded-xl border border-cyan/30 bg-cyan/5 py-3 text-sm text-cyan transition hover:bg-cyan/10 disabled:opacity-30"
        >
          Suivant →
        </button>
      </div>

      {cardIdx === total - 1 && (
        <div className="rounded-xl border border-sahel/30 bg-sahel/10 p-4 text-center">
          <p className="font-display font-semibold text-sahel">🎉 Tu as revu tous les mots !</p>
          <p className="mt-1 text-xs text-white/40">Passe en mode Ludique pour t'entraîner avec des exercices.</p>
        </div>
      )}

      {/* Note audio */}
      <p className="text-center text-xs text-white/25">
        🎵 Audio natif bientôt disponible — enregistrements en cours
      </p>
    </div>
  )
}
