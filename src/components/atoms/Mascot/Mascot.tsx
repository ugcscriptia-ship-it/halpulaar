import type { MascotProps } from './Mascot.types'

/* Maskoore — la mascotte Peul animée d'Halpulaar.
   SVG pur + CSS, aucune dépendance externe. */
export function Mascot({ mood = 'idle', size = 110, label }: MascotProps) {
  const moodClass =
    mood === 'celebrating' ? 'animate-mascot-celebrate' :
    mood === 'speaking'    ? 'animate-mascot-speak'    :
                             'animate-mascot-bob'

  const mouthD =
    mood === 'celebrating' ? 'M38 44 Q50 54 62 44' :
    mood === 'speaking'    ? 'M40 43 Q50 50 60 43' :
                             'M40 43 Q50 49 60 43'

  return (
    <figure className="flex flex-col items-center gap-1 select-none" aria-label={label ?? 'Maskoore'}>
      <div className={moodClass} style={{ width: size, height: size * 1.45 }}>
        <svg viewBox="0 0 100 145" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>

          {/* ── Coiffe traditionnelle ── */}
          <ellipse cx="50" cy="26" rx="24" ry="10" fill="#1E2A78" />
          <path d="M26 26 Q50 12 74 26" fill="#2DD4D4" opacity="0.5" />

          {/* ── Tête ── */}
          <circle cx="50" cy="38" r="23" fill="#C2702C" />
          <circle cx="50" cy="38" r="23" fill="url(#skinShade)" />

          {/* ── Visage ── */}
          {/* Yeux */}
          <circle cx="41" cy="36" r="3.5" fill="#0B1026" />
          <circle cx="59" cy="36" r="3.5" fill="#0B1026" />
          {/* Reflet */}
          <circle cx="42.2" cy="34.8" r="1.2" fill="white" opacity="0.9" />
          <circle cx="60.2" cy="34.8" r="1.2" fill="white" opacity="0.9" />
          {/* Sourcils (expressifs) */}
          {mood === 'celebrating' && <>
            <path d="M37 30 Q41 27 45 30" stroke="#0B1026" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M55 30 Q59 27 63 30" stroke="#0B1026" strokeWidth="1.5" strokeLinecap="round" />
          </>}
          {/* Bouche */}
          <path d={mouthD} stroke="#0B1026" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Langue quand célèbre */}
          {mood === 'celebrating' && (
            <ellipse cx="50" cy="50" rx="5" ry="3" fill="#E0B463" opacity="0.8" />
          )}

          {/* ── Corps / Boubou ── */}
          <path
            d="M27 58 Q18 105 22 138 L78 138 Q82 105 73 58 Q62 52 50 52 Q38 52 27 58Z"
            fill="#E0B463"
          />
          {/* Motif géométrique boubou */}
          <rect x="36" y="64" width="28" height="3" rx="1.5" fill="#C2702C" opacity="0.55" />
          <rect x="33" y="71" width="34" height="2" rx="1"   fill="#C2702C" opacity="0.35" />
          <rect x="36" y="77" width="28" height="2" rx="1"   fill="#2DD4D4" opacity="0.25" />
          {/* Col */}
          <ellipse cx="50" cy="57" rx="10" ry="5" fill="#E0B463" />
          <ellipse cx="50" cy="57" rx="7"  ry="3" fill="#C2702C" opacity="0.4" />

          {/* ── Bras ── */}
          <path
            d={mood === 'celebrating'
              ? "M27 62 Q8 40 12 30"   /* bras levés */
              : "M27 65 Q12 82 18 98"}
            stroke="#C2702C" strokeWidth="9" strokeLinecap="round" fill="none"
          />
          <path
            d={mood === 'celebrating'
              ? "M73 62 Q92 40 88 30"
              : "M73 65 Q88 82 82 98"}
            stroke="#C2702C" strokeWidth="9" strokeLinecap="round" fill="none"
          />
          {/* Mains */}
          <circle cx={mood === 'celebrating' ? 12 : 18} cy={mood === 'celebrating' ? 30 : 98} r="7" fill="#C2702C" />
          <circle cx={mood === 'celebrating' ? 88 : 82} cy={mood === 'celebrating' ? 30 : 98} r="7" fill="#C2702C" />

          {/* ── Étoiles célébration ── */}
          {mood === 'celebrating' && <>
            <text x="5"  y="22" fontSize="14" fill="#F5C518" className="animate-star-1">★</text>
            <text x="78" y="18" fontSize="10" fill="#2DD4D4" className="animate-star-2">✦</text>
            <text x="82" y="55" fontSize="12" fill="#E0B463" className="animate-star-1">★</text>
            <text x="3"  y="60" fontSize="9"  fill="#2DD4D4" className="animate-star-2">✦</text>
          </>}

          {/* ── Ondes sonores (speaking) ── */}
          {mood === 'speaking' && <>
            <path d="M76 30 Q82 38 76 46" stroke="#2DD4D4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" className="animate-wave-1" />
            <path d="M80 27 Q89 38 80 49" stroke="#2DD4D4" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" className="animate-wave-2" />
          </>}

          {/* ── Dégradés ── */}
          <defs>
            <radialGradient id="skinShade" cx="40%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="white" stopOpacity="0.12" />
              <stop offset="100%" stopColor="black" stopOpacity="0.08" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {label && (
        <span className="font-display text-xs text-white/50">{label}</span>
      )}
    </figure>
  )
}
