import { useState } from 'react'
import { useNavigate }      from 'react-router-dom'
import { SceneStage }       from '@/components/organisms/SceneStage'
import { CharacterBubble }  from '@/components/molecules/CharacterBubble'
import { Mascot }           from '@/components/atoms/Mascot'
import { SCENES }           from '@/content'

type CharInfo = { name: string; role: string; emoji: string }

const CHARACTER_BY_SCENE: Record<string, CharInfo> = {
  'arrivee-village':  { name: 'Baaba Samba',  role: 'Le sage du village',          emoji: '👴🏿' },
  'repas-famille':    { name: 'La famille',   role: 'Retrouvailles au galle',       emoji: '👨‍👩‍👧‍👦' },
  'promenade-fleuve': { name: 'Amadou',       role: 'Enfant du bord du fleuve',     emoji: '👦🏿' },
  'marche-village':   { name: 'Le marché',    role: 'Voix du village',              emoji: '🏪' },
}

const SCENE_ORDER = ['arrivee-village', 'repas-famille', 'promenade-fleuve', 'marche-village']

// Illustration CSS par scène (couleurs d'ambiance)
const SCENE_PALETTE: Record<string, string> = {
  'arrivee-village':  'from-indigo/40 via-earth/20 to-ink',
  'repas-famille':    'from-ocre/20 via-earth/10 to-ink',
  'promenade-fleuve': 'from-sahel/20 via-indigo/20 to-ink',
  'marche-village':   'from-sand/10 via-ocre/10 to-ink',
}

export default function AdventurePage() {
  const navigate        = useNavigate()
  const [sceneId, setSceneId]       = useState('arrivee-village')
  const [transitioning, setTrans]   = useState(false)

  const scene     = SCENES[sceneId]
  const character = CHARACTER_BY_SCENE[sceneId]
  const sceneNum  = SCENE_ORDER.indexOf(sceneId) + 1
  const palette   = SCENE_PALETTE[sceneId] ?? 'from-indigo/30 to-ink'

  const handleChoice = (index: number) => {
    const choice = scene.choices?.[index]
    if (transitioning) return
    setTrans(true)
    setTimeout(() => {
      if (choice?.nextSceneId) {
        setSceneId(choice.nextSceneId)
      } else {
        navigate('/apprendre')
      }
      setTrans(false)
    }, 350)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${palette} transition-all duration-700`}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* En-tête */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-white/50 hover:text-white transition"
          >
            ✕ Quitter
          </button>
          {/* Barre de progression scènes */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">Scène {sceneNum}/{SCENE_ORDER.length}</span>
            <div className="flex gap-1.5">
              {SCENE_ORDER.map((id) => (
                <div
                  key={id}
                  className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                    id === sceneId
                      ? 'bg-cyan shadow-glow'
                      : SCENE_ORDER.indexOf(id) < sceneNum - 1
                      ? 'bg-sand/60'
                      : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Illustration de scène — décor animé CSS */}
        <SceneIllustration sceneId={sceneId} />

        {/* Contenu avec transition */}
        <div className={`transition-all duration-300 ${transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <SceneStage
            scene={scene}
            slots={{
              overlay: (
                <div className="mb-4 flex items-center gap-3">
                  <CharacterBubble
                    name={character.name}
                    role={character.role}
                    emoji={character.emoji}
                  />
                  {/* Mascotte parlante à côté du personnage */}
                  <div className="ml-auto">
                    <Mascot mood="speaking" size={60} />
                  </div>
                </div>
              ),
            }}
            onChoice={handleChoice}
          />
        </div>

        <p className="mt-4 text-center text-xs text-white/20">
          ⚠️ Dialogues PLACEHOLDER — à valider par un locuteur natif du Fouta Toro
        </p>
      </div>
    </div>
  )
}

/* ── Décor animé CSS par scène ── */
function SceneIllustration({ sceneId }: { sceneId: string }) {
  return (
    <div className="relative mb-4 h-28 overflow-hidden rounded-2xl border border-white/8">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo/30 via-transparent to-earth/20" />

      {sceneId === 'arrivee-village' && <VillageScene />}
      {sceneId === 'repas-famille'   && <FamilleScene />}
      {sceneId === 'promenade-fleuve'&& <FleuveScene  />}
      {sceneId === 'marche-village'  && <MarcheScene  />}
    </div>
  )
}

function VillageScene() {
  return (
    <svg viewBox="0 0 400 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {/* Ciel */}
      <rect width="400" height="112" fill="#0B1026" />
      <circle cx="340" cy="25" r="18" fill="#F5C518" opacity="0.7" /> {/* Soleil */}
      {/* Étoiles */}
      {[30,80,160,220,280].map((x,i) => (
        <circle key={i} cx={x} cy={12 + (i%3)*8} r="1.5" fill="white" opacity={0.4 + i*0.1} />
      ))}
      {/* Collines */}
      <ellipse cx="60"  cy="112" rx="90"  ry="45" fill="#4A2F1C" />
      <ellipse cx="200" cy="112" rx="120" ry="40" fill="#3a240f" />
      <ellipse cx="340" cy="112" rx="80"  ry="38" fill="#4A2F1C" />
      {/* Cases */}
      <rect x="60" y="62" width="30" height="30" rx="3" fill="#C2702C" />
      <polygon points="45,62 90,62 75,42" fill="#E0B463" />
      <rect x="110" y="68" width="24" height="24" rx="2" fill="#C2702C" opacity="0.8" />
      <polygon points="97,68 135,68 120,50" fill="#E0B463" opacity="0.8" />
      {/* Fleuve en bas */}
      <path d="M0 95 Q100 88 200 95 Q300 102 400 95 L400 112 L0 112Z" fill="#2DD4D4" opacity="0.2" />
    </svg>
  )
}

function FamilleScene() {
  return (
    <svg viewBox="0 0 400 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="112" fill="#1a0e06" />
      {/* Intérieur — mur */}
      <rect width="400" height="112" fill="#4A2F1C" opacity="0.4" />
      {/* Motifs muraux géométriques */}
      {[0,1,2,3,4,5].map((i) => (
        <rect key={i} x={i*70} y={0} width="3" height="112" fill="#E0B463" opacity="0.08" />
      ))}
      {[0,1,2].map((i) => (
        <rect key={i} x={0} y={i*38} width="400" height="2" fill="#E0B463" opacity="0.06" />
      ))}
      {/* Natte au sol */}
      <ellipse cx="200" cy="100" rx="160" ry="18" fill="#C2702C" opacity="0.3" />
      {/* Calebasse */}
      <ellipse cx="180" cy="82" rx="14" ry="10" fill="#C2702C" opacity="0.7" />
      <ellipse cx="180" cy="78" rx="12" ry="5"  fill="#E0B463" opacity="0.5" />
      {/* Lampe */}
      <ellipse cx="320" cy="90" rx="8" ry="6"   fill="#F5C518" opacity="0.4" />
      <circle  cx="320" cy="84" r="4"            fill="#F5C518" opacity="0.6" className="animate-float" />
    </svg>
  )
}

function FleuveScene() {
  return (
    <svg viewBox="0 0 400 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="112" fill="#0B1026" />
      {/* Ciel dégradé */}
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E2A78" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0B1026" />
        </linearGradient>
      </defs>
      <rect width="400" height="70" fill="url(#skyG)" />
      {/* Berges */}
      <path d="M0 80 Q80 65 160 75 Q240 85 320 70 Q360 63 400 72 L400 112 L0 112Z" fill="#5B8C4E" />
      {/* Fleuve */}
      <path d="M0 80 Q80 90 160 82 Q240 74 320 84 Q360 90 400 82 L400 112 L0 112Z" fill="#2DD4D4" opacity="0.35" />
      <path d="M0 90 Q100 85 200 91 Q300 97 400 90" stroke="#2DD4D4" strokeWidth="2" fill="none" opacity="0.4" className="animate-river" />
      <path d="M0 97 Q100 93 200 98 Q300 103 400 97" stroke="#2DD4D4" strokeWidth="1" fill="none" opacity="0.25" className="animate-river" />
      {/* Bateau pirogue */}
      <ellipse cx="200" cy="84" rx="35" ry="7" fill="#4A2F1C" opacity="0.8" className="animate-float" />
      <line x1="200" y1="77" x2="200" y2="55" stroke="#C2702C" strokeWidth="2" opacity="0.7" />
      <path d="M200 55 L230 68 L200 68Z" fill="#E0B463" opacity="0.6" />
      {/* Soleil couchant */}
      <circle cx="50" cy="30" r="22" fill="#F5C518" opacity="0.4" />
      <circle cx="50" cy="30" r="16" fill="#C2702C" opacity="0.5" />
    </svg>
  )
}

function MarcheScene() {
  return (
    <svg viewBox="0 0 400 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="112" fill="#0e0a04" />
      <rect y="75" width="400" height="37" fill="#C2702C" opacity="0.15" /> {/* Sol marché */}
      {/* Étals */}
      {[40, 140, 240, 330].map((x, i) => (
        <g key={i}>
          <rect x={x-20} y={55} width={50} height={30} rx="2" fill={['#E0B463','#C2702C','#5B8C4E','#E0B463'][i]} opacity="0.25" />
          <line x1={x-20} y1={55} x2={x+30} y2={55} stroke={['#E0B463','#C2702C','#5B8C4E','#E0B463'][i]} strokeWidth="1.5" opacity="0.5" />
          {/* Parasol */}
          <ellipse cx={x+5} cy={45} rx={32} ry={10} fill={['#C2702C','#E0B463','#1E2A78','#C2702C'][i]} opacity="0.4" />
          <line x1={x+5} y1={55} x2={x+5} y2={45} stroke="white" strokeWidth="1" opacity="0.2" />
        </g>
      ))}
      {/* Soleil haut */}
      <circle cx="200" cy="20" r="15" fill="#F5C518" opacity="0.5" />
      {[0,45,90,135,180,225,270,315].map((a,i) => (
        <line
          key={i}
          x1={200 + Math.cos(a*Math.PI/180)*18}
          y1={20  + Math.sin(a*Math.PI/180)*18}
          x2={200 + Math.cos(a*Math.PI/180)*26}
          y2={20  + Math.sin(a*Math.PI/180)*26}
          stroke="#F5C518" strokeWidth="1.5" opacity="0.3"
        />
      ))}
    </svg>
  )
}
