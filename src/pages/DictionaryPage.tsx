import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AudioPlayButton } from '@/components/atoms/AudioPlayButton'
import { VOCAB } from '@/content'

const CATEGORIES = ['Tous', 'Salutations', 'Famille', 'Chiffres', 'Corps']

const CATEGORY_COLORS: Record<string, string> = {
  Salutations: 'border-cyan/30 bg-cyan/5 text-cyan/70',
  Famille:     'border-sand/30 bg-sand/5 text-sand/70',
  Chiffres:    'border-gold/30 bg-gold/5 text-gold/70',
  Corps:       'border-sahel/30 bg-sahel/5 text-sahel/70',
}

const CATEGORY_GLOW: Record<string, string> = {
  Salutations: 'hover:border-cyan/40 hover:shadow-glow',
  Famille:     'hover:border-sand/40 hover:shadow-glow-sand',
  Chiffres:    'hover:border-gold/40 hover:shadow-glow-gold',
  Corps:       'hover:border-sahel/30',
}

export default function DictionaryPage() {
  const navigate = useNavigate()
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('Tous')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return VOCAB.filter((v) => {
      const matchCat = cat === 'Tous' || v.category === cat
      const matchQ   = !q || v.pulaar.toLowerCase().includes(q) || v.fr.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [search, cat])

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(30,42,120,0.35) 0%, transparent 60%),
            #0B1026
          `,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] backdrop-blur-md"
        style={{ background: 'rgba(11,16,38,0.9)' }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            ← Retour
          </button>
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-semibold text-sand">Dictionnaire</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
              {VOCAB.length} mots
            </span>
          </div>
          {/* Barre de recherche dans le header sur desktop */}
          <div className="hidden sm:block">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-6">

        {/* Intro */}
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="font-display text-2xl font-bold text-white">
            Vocabulaire <span className="text-cyan">Pulaar</span>
          </h1>
          <p className="text-sm text-white/40">
            Les 20 % de mots qui couvrent 80 % des conversations familiales.
          </p>
        </div>

        {/* Barre de recherche mobile */}
        <div className="mb-4 sm:hidden">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Filtres catégories */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                cat === c
                  ? 'border-sand bg-sand text-ink shadow'
                  : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Résultat vide */}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-white/30">
            <div className="text-4xl mb-3">🔍</div>
            <p>Aucun mot trouvé pour « {search} »</p>
          </div>
        )}

        {/* Grille de mots */}
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item, i) => {
            const isOpen = expanded === item.id
            const glow = CATEGORY_GLOW[item.category ?? ''] ?? ''

            return (
              <div
                key={item.id}
                className={`group animate-fade-up relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-200 ${glow} ${isOpen ? 'sm:col-span-2' : ''}`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div
                  className="flex cursor-pointer items-center gap-4 p-4"
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                >
                  {/* Mot Pulaar */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-pulaar text-xl text-sand">{item.pulaar}</span>
                      {item.phonetic && (
                        <span className="text-[11px] text-white/30 tracking-wide">[{item.phonetic}]</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-white/55 leading-snug">{item.fr}</p>
                  </div>

                  {/* Badge catégorie */}
                  {item.category && (
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[item.category] ?? 'border-white/15 text-white/30'}`}>
                      {item.category}
                    </span>
                  )}

                  {/* Bouton audio */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <AudioPlayButton
                      src={item.audio}
                      text={item.phonetic ?? item.pulaar}
                      label={`Écouter : ${item.pulaar}`}
                      size="sm"
                    />
                  </div>

                  {/* Chevron */}
                  <span className={`text-white/25 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </div>

                {/* Panel détail */}
                {isOpen && (
                  <div className="border-t border-white/8 bg-white/[0.02] px-4 pb-4 pt-3">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <DetailCell label="Pulaar" value={item.pulaar} mono />
                      <DetailCell label="Prononciation" value={item.phonetic ?? '—'} />
                      <DetailCell label="Français" value={item.fr} />
                    </div>
                    {/* Astuce phonétique */}
                    <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                      <p className="text-[11px] text-white/35 leading-relaxed">
                        <span className="text-white/50 font-medium">💡 Prononciation : </span>
                        {getPhoneticsNote(item.pulaar)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Note de bas de page */}
        <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-center">
          <p className="text-sm font-medium text-sand/70">🎵 Enregistrements audio natifs</p>
          <p className="mt-1 text-xs text-white/35 leading-relaxed">
            Les prononciations TTS sont provisoires. Des enregistrements natifs par des locuteurs
            du Fouta Toro seront intégrés prochainement.
          </p>
        </div>

        {/* Glyphes spéciaux */}
        <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">Alphabet Pulaar — glyphes spéciaux</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {GLYPHS.map(g => (
              <div key={g.char} className="rounded-xl border border-white/8 bg-white/[0.02] p-3 text-center">
                <div className="font-pulaar text-2xl text-cyan">{g.char}</div>
                <div className="mt-1 text-[10px] text-white/35">{g.name}</div>
                <div className="text-[10px] text-white/25">{g.note}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Chercher un mot…"
        className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-2 pl-8 pr-4 text-sm text-white placeholder-white/25 outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 sm:w-56"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-xs"
        >
          ✕
        </button>
      )}
    </div>
  )
}

function DetailCell({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-white/30">{label}</p>
      <p className={`mt-1 text-sm text-white/80 ${mono ? 'font-pulaar text-sand' : ''}`}>{value}</p>
    </div>
  )
}

function getPhoneticsNote(pulaar: string): string {
  if (pulaar.includes('ɓ')) return 'Le « ɓ » est un b implosif — prononce b en aspirant légèrement l\'air vers l\'intérieur.'
  if (pulaar.includes('ɗ')) return 'Le « ɗ » est un d implosif — prononce d en aspirant légèrement l\'air vers l\'intérieur.'
  if (pulaar.includes('ŋ')) return 'Le « ŋ » se prononce ng comme dans « parking ».'
  if (pulaar.includes('ƴ')) return 'Le « ƴ » est un y implosif — proche d\'un y accompagné d\'un clic glottal.'
  if (pulaar.includes('aa')) return 'Les « aa » se prononcent long — tiens la voyelle deux fois plus longtemps qu\'un « a » simple.'
  if (pulaar.match(/J|j/)) return 'Le « J » se prononce comme « dj » en Pulaar du Fouta Toro.'
  return 'Prononce chaque syllabe distinctement, avec une légère emphase sur les voyelles longues (aa, ii, uu).'
}

const GLYPHS = [
  { char: 'ɓ / Ɓ', name: 'Be implosif', note: 'b aspiré ↓' },
  { char: 'ɗ / Ɗ', name: 'De implosif', note: 'd aspiré ↓' },
  { char: 'ŋ / Ŋ', name: 'Eng nasal',   note: 'ng (parking)' },
  { char: 'ƴ / Ƴ', name: 'Ye implosif', note: 'y aspiré ↓' },
]
