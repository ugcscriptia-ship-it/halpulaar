/**
 * HiggsVideo — Scène cinématographique pour le mode Aventure.
 *
 * Lorsqu'un `src` est fourni (vidéo Higgsfield .mp4 générée par IA),
 * la vidéo est lue en boucle silencieuse plein écran.
 *
 * Sinon : animation CSS haute-fidélité propre à chaque scène.
 *
 * Prompts Higgsfield recommandés par scène :
 *   village  → "Cinematic night in a West African Fouta Toro village, mud huts, golden moon over Senegal river, fireflies, warm ochre tones, 4K, cinematic"
 *   famille  → "Warm interior of a West African home, family gathered around fire, geometric Peul textiles on walls, orange glow, cinematic bokeh, 4K"
 *   fleuve   → "Senegal River at dusk, green Sahel vegetation, reflections, dugout canoe, blue-green water shimmer, golden light, cinematic 4K"
 *   marche   → "Vibrant West African village market, colorful fabrics, women with headwraps, dust in sunlight, aerial cinematic 4K"
 */

type Scene = 'village' | 'famille' | 'fleuve' | 'marche'

interface HiggsVideoProps {
  scene: Scene
  src?: string
  className?: string
}

/* ── Étoiles statiques générées côté client (SSR-safe via useMemo) ── */
const STARS = Array.from({ length: 55 }, (_, i) => ({
  left:  `${(i * 37 + 11) % 97}%`,
  top:   `${(i * 53 + 7)  % 55}%`,
  size:  ((i % 3) + 0.6).toFixed(1),
  dur:   `${1.8 + (i % 5) * 0.6}s`,
  delay: `${(i % 7) * 0.3}s`,
}))

const FIREFLIES = Array.from({ length: 14 }, (_, i) => ({
  left:  `${(i * 43 + 5)  % 90}%`,
  top:   `${(i * 29 + 20) % 70 + 25}%`,
  dur:   `${3 + (i % 4)}s`,
  delay: `${(i % 6) * 0.5}s`,
}))

function VillageScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ciel nocturne */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020715] via-[#0B1026] to-[#1a0e05]" />

      {/* Voie lactée subtile */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 30% at 60% 20%, rgba(180,160,255,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Étoiles */}
      {STARS.map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            left: s.left, top: s.top,
            width: `${s.size}px`, height: `${s.size}px`,
            '--dur': s.dur, animationDelay: s.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Lune */}
      <div className="absolute right-[14%] top-[8%] h-14 w-14 rounded-full bg-[#FFF4C2] opacity-90 shadow-[0_0_40px_12px_rgba(255,244,194,0.4)]" />
      <div className="absolute right-[13%] top-[7%] h-16 w-16 rounded-full border border-[#FFF4C2]/30 animate-hero-ring" />

      {/* Silhouette paysage */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 800 180"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Collines */}
        <ellipse cx="100" cy="180" rx="180" ry="70" fill="#120a04" />
        <ellipse cx="700" cy="180" rx="200" ry="60" fill="#0e0803" />
        <ellipse cx="400" cy="180" rx="250" ry="50" fill="#150c05" />
        {/* Cases */}
        <rect x="60"  y="115" width="50" height="45" rx="2" fill="#2a1505" />
        <polygon points="35,115 110,115 72,85" fill="#3a1e07" />
        <rect x="680" y="120" width="55" height="40" rx="2" fill="#251204" />
        <polygon points="655,120 740,120 697,88" fill="#341a06" />
        <rect x="350" y="125" width="60" height="35" rx="2" fill="#2a1505" />
        <polygon points="322,125 415,125 368,90" fill="#3a1e07" />
        {/* Baobab */}
        <rect x="490" y="70" width="8" height="90" fill="#1a0e04" />
        <ellipse cx="494" cy="65" rx="32" ry="22" fill="#1a1204" />
        {/* Rivière */}
        <rect x="0" y="158" width="800" height="22" rx="0" fill="rgba(30,60,100,0.55)" />
        <rect x="0" y="162" width="800" height="8" rx="0" fill="rgba(45,212,212,0.08)" />
      </svg>

      {/* Lucioles */}
      {FIREFLIES.map((f, i) => (
        <div
          key={i}
          aria-hidden
          className="animate-twinkle absolute h-1 w-1 rounded-full bg-[#aaff88]"
          style={{
            left: f.left, top: f.top,
            '--dur': f.dur, animationDelay: f.delay,
            boxShadow: '0 0 6px 2px rgba(150,255,100,0.7)',
          } as React.CSSProperties}
        />
      ))}

      {/* Ambiance feu de camp */}
      <div
        className="animate-fire absolute bottom-[22%] left-[42%] h-8 w-4 rounded-full opacity-70"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, #F5C518, #C2702C, transparent)' }}
      />
      <div
        className="absolute bottom-[18%] left-[40%] h-5 w-12 rounded-full opacity-30 blur-md"
        style={{ background: '#C2702C' }}
      />
    </div>
  )
}

const FABRIC_COLORS = ['#C2702C','#2DD4D4','#E0B463','#5B8C4E','#1E2A78','#F5C518']

function FamilleScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Intérieur chaud */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b03] via-[#2a1205] to-[#0B1026]" />
      {/* Lumière feu central */}
      <div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 h-32 w-48 rounded-full opacity-40 blur-2xl"
        style={{ background: 'radial-gradient(ellipse, #F5C518 0%, #C2702C 50%, transparent 100%)' }}
      />
      {/* Motifs géométriques Peul sur les murs */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3,4,5,6,7].map(i => (
          <g key={i} transform={`translate(${i * 110 - 20}, 20)`}>
            <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="#E0B463" strokeWidth="1.5" />
            <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="#2DD4D4" strokeWidth="0.8" />
          </g>
        ))}
        {[0,1,2,3,4,5,6,7].map(i => (
          <g key={i} transform={`translate(${i * 110 - 20}, 280)`}>
            <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="#E0B463" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      {/* Tissus colorés */}
      {FABRIC_COLORS.map((c, i) => (
        <div
          key={i}
          className="absolute top-0 opacity-20"
          style={{
            left: `${i * 14 + 2}%`, width: '10%', height: '45%',
            background: `linear-gradient(180deg, ${c} 0%, transparent 100%)`,
          }}
        />
      ))}
      {/* Flamme */}
      <div
        className="animate-fire absolute bottom-[15%] left-1/2 -translate-x-1/2 h-12 w-6 rounded-t-full"
        style={{ background: 'linear-gradient(to top, #C2702C, #F5C518, rgba(255,255,200,0.9))' }}
      />
      {/* Sol */}
      <div className="absolute bottom-0 w-full h-[15%] bg-gradient-to-t from-[#1a0b03] to-transparent" />
    </div>
  )
}

function FleuveScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ciel crépuscule */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3a] via-[#1a3a5c] to-[#0e2215]" />
      {/* Soleil couchant */}
      <div
        className="absolute top-[8%] left-[15%] h-16 w-16 rounded-full opacity-85"
        style={{ background: 'radial-gradient(circle, #F5C518 30%, #C2702C 70%, transparent 100%)' }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[55%] opacity-30"
        style={{ background: 'linear-gradient(180deg, rgba(245,197,24,0.3) 0%, transparent 100%)' }}
      />
      {/* Végétation Sahel */}
      <svg className="absolute bottom-[30%] w-full" viewBox="0 0 800 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50"  cy="100" rx="70"  ry="40" fill="#1a3012" />
        <ellipse cx="200" cy="100" rx="90"  ry="35" fill="#1f3d15" />
        <ellipse cx="600" cy="100" rx="100" ry="45" fill="#1a3012" />
        <ellipse cx="780" cy="100" rx="70"  ry="38" fill="#1f3d15" />
        <rect x="180" y="30" width="7"  height="70" fill="#0e1f08" />
        <ellipse cx="184" cy="25" rx="22" ry="16" fill="#1a3012" />
        <rect x="590" y="20" width="8"  height="80" fill="#0e1f08" />
        <ellipse cx="594" cy="15" rx="28" ry="18" fill="#1a3012" />
      </svg>
      {/* Eau du fleuve */}
      <div
        className="animate-water absolute bottom-0 w-full h-[32%]"
        style={{ background: 'linear-gradient(180deg, rgba(30,80,120,0.9) 0%, rgba(15,50,80,0.95) 100%)' }}
      />
      {/* Reflets */}
      {[10,30,55,75,90].map((x, i) => (
        <div
          key={i}
          className="animate-water absolute bottom-[4%]"
          style={{
            left: `${x}%`, width: '8%', height: '22%',
            background: `linear-gradient(180deg, rgba(245,197,24,${0.12 + i*0.03}) 0%, transparent 100%)`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {/* Pirogue */}
      <svg className="absolute bottom-[30%] left-1/2 -translate-x-1/2" width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 Q60,15 120,30 Q90,40 30,40 Z" fill="#2a1505" />
        <line x1="60" y1="15" x2="60" y2="2" stroke="#3a2010" strokeWidth="2" />
        <polygon points="60,2 80,12 60,14" fill="rgba(224,180,99,0.6)" />
      </svg>
    </div>
  )
}

function MarcheScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ciel jour chaud */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8b5e2a] via-[#c47830] to-[#3a1f05]" />
      {/* Soleil */}
      <div
        className="absolute top-[5%] right-[20%] h-20 w-20 rounded-full opacity-90 blur-sm"
        style={{ background: 'radial-gradient(circle, #fff9e0 20%, #F5C518 60%, transparent 100%)' }}
      />
      {/* Poussière atmosphérique */}
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 60%, rgba(194,112,44,0.6) 0%, transparent 70%)' }} />
      {/* Étals de marché (silhouettes) */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 800 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3,4].map(i => {
          const x = i * 170 + 10
          return (
            <g key={i}>
              <rect x={x} y="100" width="140" height="4" fill="#2a1505" />
              <line x1={x+10} y1="104" x2={x+10} y2="175" stroke="#2a1505" strokeWidth="4" />
              <line x1={x+130} y1="104" x2={x+130} y2="175" stroke="#2a1505" strokeWidth="4" />
              <rect x={x} y="95" width="140" height="10" fill={FABRIC_COLORS[i % FABRIC_COLORS.length]} opacity={0.7} />
            </g>
          )
        })}
        {/* Sol */}
        <rect x="0" y="175" width="800" height="25" fill="#1a0e04" />
        {/* Silhouettes personnes */}
        {[80,200,320,440,560,680].map((x, i) => (
          <ellipse key={i} cx={x} cy="175" rx="12" ry="30" fill="#150b03" opacity="0.8" />
        ))}
      </svg>
      {/* Particules de poussière */}
      {Array.from({length:12},(_,i) => (
        <div
          key={i}
          className="animate-float absolute rounded-full bg-[#C2702C] opacity-20"
          style={{
            left: `${(i*23+5) % 90}%`,
            top: `${(i*17+30) % 60}%`,
            width: `${(i%3)+2}px`, height: `${(i%3)+2}px`,
            '--dur': `${4+(i%4)}s`, animationDelay: `${i*0.3}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

const SCENES: Record<Scene, React.FC> = {
  village:  VillageScene,
  famille:  FamilleScene,
  fleuve:   FleuveScene,
  marche:   MarcheScene,
}

export default function HiggsVideo({ scene, src, className = '' }: HiggsVideoProps) {
  const FallbackScene = SCENES[scene]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <FallbackScene />
      )}
      {/* Vignette cinématographique */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1026]/80 via-transparent to-[#0B1026]/30" />
      {/* Letterbox bars */}
      <div className="pointer-events-none absolute top-0 w-full h-[6%] bg-black/60" />
      <div className="pointer-events-none absolute bottom-0 w-full h-[6%] bg-black/60" />
    </div>
  )
}
