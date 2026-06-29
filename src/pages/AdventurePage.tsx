import { useState } from 'react'
import { useNavigate }     from 'react-router-dom'
import { SceneStage }      from '@/components/organisms/SceneStage'
import { CharacterBubble } from '@/components/molecules/CharacterBubble'
import { Mascot }          from '@/components/atoms/Mascot'
import HiggsVideo          from '@/components/atoms/HiggsVideo'
import { SCENES }          from '@/content'

type CharInfo = { name: string; role: string; emoji: string }
type HiggsScene = 'village' | 'famille' | 'fleuve' | 'marche'

const CHARACTER_BY_SCENE: Record<string, CharInfo> = {
  'arrivee-village':  { name: 'Baaba Samba',  role: 'Le sage du village',        emoji: '👴🏿' },
  'repas-famille':    { name: 'La famille',   role: 'Retrouvailles au galle',     emoji: '👨‍👩‍👧‍👦' },
  'promenade-fleuve': { name: 'Amadou',       role: 'Enfant du bord du fleuve',   emoji: '👦🏿' },
  'marche-village':   { name: 'Le marché',    role: 'Voix du village',            emoji: '🏪' },
}

const SCENE_ORDER = ['arrivee-village', 'repas-famille', 'promenade-fleuve', 'marche-village']

const SCENE_MAPPING: Record<string, HiggsScene> = {
  'arrivee-village':  'village',
  'repas-famille':    'famille',
  'promenade-fleuve': 'fleuve',
  'marche-village':   'marche',
}

/* Optionnel : URLs de vidéos Higgsfield générées.
   Laisser vide → animation CSS haute-fidélité.
   Pour générer : https://higgsfield.ai
   Prompts recommandés → voir HiggsVideo/index.tsx */
const HIGGS_VIDEOS: Record<string, string | undefined> = {
  'arrivee-village':  undefined,
  'repas-famille':    undefined,
  'promenade-fleuve': undefined,
  'marche-village':   undefined,
}

export default function AdventurePage() {
  const navigate = useNavigate()
  const [sceneId, setSceneId]   = useState('arrivee-village')
  const [transitioning, setTrans] = useState(false)

  const scene     = SCENES[sceneId]
  const character = CHARACTER_BY_SCENE[sceneId]
  const sceneNum  = SCENE_ORDER.indexOf(sceneId) + 1

  const handleChoice = (index: number) => {
    const choice = scene.choices?.[index]
    if (transitioning) return
    setTrans(true)
    setTimeout(() => {
      if (choice?.nextSceneId) setSceneId(choice.nextSceneId)
      else navigate('/apprendre')
      setTrans(false)
    }, 400)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#060810]">

      {/* ── Scène HiggsField / CSS animation ──────────────────── */}
      <div
        className={`relative w-full transition-all duration-500 ${
          transitioning ? 'opacity-0 scale-[1.01]' : 'opacity-100 scale-100'
        }`}
        style={{ height: 'clamp(220px, 45vh, 380px)' }}
      >
        <HiggsVideo
          scene={SCENE_MAPPING[sceneId] ?? 'village'}
          src={HIGGS_VIDEOS[sceneId]}
          className="absolute inset-0 h-full w-full"
        />

        {/* HUD superposé sur la scène */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-sm text-white/70 backdrop-blur-sm transition hover:text-white hover:bg-black/60"
          >
            ✕ Quitter
          </button>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-black/40 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs text-white/40">Scène {sceneNum}/{SCENE_ORDER.length}</span>
            <div className="flex gap-1.5">
              {SCENE_ORDER.map((id) => (
                <div
                  key={id}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    id === sceneId
                      ? 'w-8 bg-cyan shadow-glow animate-glow'
                      : SCENE_ORDER.indexOf(id) < sceneNum - 1
                      ? 'w-5 bg-sand/60'
                      : 'w-5 bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Titre scène en bas de l'image */}
        <div className="absolute inset-x-0 bottom-8 z-20 flex items-end justify-between px-5">
          <h2
            className={`font-display text-2xl font-bold text-white drop-shadow-lg transition-all duration-400 ${
              transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
          >
            {scene?.title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{character?.emoji}</span>
            <div>
              <div className="text-sm font-semibold text-sand leading-tight">{character?.name}</div>
              <div className="text-xs text-white/50">{character?.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Zone dialogue ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-5">

          {/* Mascotte + bulle de contexte */}
          <div
            className={`mb-4 flex items-center gap-3 transition-all duration-400 ${
              transitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            <Mascot mood="speaking" size={52} />
            <div className="glass-cyan rounded-xl px-4 py-2.5 text-sm text-white/75">
              Écoute attentivement. Les réponses correctes te rapportent de l'XP !
            </div>
          </div>

          {/* Dialogues et choix */}
          <div
            className={`transition-all duration-400 ${
              transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <SceneStage
              scene={scene}
              slots={{
                overlay: (
                  <CharacterBubble
                    name={character.name}
                    role={character.role}
                    emoji={character.emoji}
                  />
                ),
              }}
              onChoice={handleChoice}
            />
          </div>

          <p className="mt-5 text-center text-xs text-white/15">
            ⚠️ Dialogues PLACEHOLDER — à valider par un locuteur natif du Fouta Toro
          </p>
        </div>
      </div>
    </div>
  )
}
