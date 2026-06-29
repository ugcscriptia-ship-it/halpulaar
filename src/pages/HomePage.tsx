import { Link } from 'react-router-dom'

const MODES = [
  {
    to: '/aventure',
    emoji: '🎬',
    title: 'Aventure',
    desc: 'Reviens au Fouta Toro. Vis l\'histoire en Pulaar à travers des dialogues cinématographiques.',
    color: 'hover:border-indigo/80 hover:bg-indigo/10',
    badge: 'Cinématique',
  },
  {
    to: '/apprendre',
    emoji: '🎮',
    title: 'Ludique',
    desc: 'Leçons courtes, exercices interactifs, XP et séries quotidiennes à la Duolingo.',
    color: 'hover:border-cyan/60 hover:bg-cyan/5',
    badge: 'Recommandé',
  },
  {
    to: '/apprendre',
    emoji: '📚',
    title: 'Académique',
    desc: 'Parcours structuré A1 → A2 → B1 avec révision par fiches et répétition espacée.',
    color: 'hover:border-sand/60 hover:bg-sand/5',
    badge: 'A1 → B1',
  },
]

const STATS = [
  { value: '27', label: 'expressions clés' },
  { value: '4',  label: 'leçons A1' },
  { value: '3',  label: 'modes d\'apprentissage' },
  { value: '100%', label: 'gratuit' },
]

const FLOATERS = [
  { word: 'Jaaraama', delay: '0s',   dur: '7s',  x: '8%',  y: '20%' },
  { word: 'Jam tan',  delay: '1.2s', dur: '9s',  x: '80%', y: '14%' },
  { word: 'Baaba',    delay: '2.5s', dur: '6s',  x: '65%', y: '60%' },
  { word: 'Ndiyam',   delay: '0.8s', dur: '8s',  x: '15%', y: '70%' },
  { word: 'Ɗiɗi',    delay: '3s',   dur: '7.5s',x: '88%', y: '75%' },
  { word: 'Yaay',     delay: '1.8s', dur: '6.5s',x: '40%', y: '82%' },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* Floating Pulaar words — decorative background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 select-none">
        {FLOATERS.map((f) => (
          <span
            key={f.word}
            className="animate-float absolute font-pulaar text-sm font-semibold text-cyan"
            style={{ left: f.x, top: f.y, '--dur': f.dur, animationDelay: f.delay } as React.CSSProperties}
          >
            {f.word}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-16">

        {/* Hero */}
        <div className="animate-fade-up text-center">
          <p className="font-pulaar text-lg font-semibold text-cyan tracking-wide">Jaaraama 👋</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-sand sm:text-7xl">
            Halpulaar
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60 leading-relaxed">
            Apprends le Pulaar du Fouta Toro et renoue avec tes racines —<br className="hidden sm:block" />
            gratuitement, à ton rythme, depuis la diaspora.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/apprendre"
              className="rounded-xl bg-sand px-6 py-3 font-display font-semibold text-ink shadow-lg transition hover:bg-gold active:scale-95"
            >
              Commencer maintenant
            </Link>
            <Link
              to="/aventure"
              className="rounded-xl border border-white/20 px-6 py-3 font-display font-semibold text-white/80 transition hover:border-cyan/50 hover:text-cyan"
            >
              Mode Aventure 🎬
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
              <div className="mt-1 text-xs text-white/50">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mode cards */}
        <h2 className="mt-14 mb-5 font-display text-xl font-semibold text-white/80">
          Choisir ton mode
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {MODES.map((m, i) => (
            <Link
              key={m.title}
              to={m.to}
              className={`group animate-fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition ${m.color}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{m.emoji}</span>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/40">{m.badge}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-sand">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{m.desc}</p>
              <p className="mt-4 text-xs text-cyan opacity-0 transition group-hover:opacity-100">
                Commencer →
              </p>
            </Link>
          ))}
        </div>

        {/* Why Pulaar */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-semibold text-sand">Pourquoi le Pulaar ?</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Le Pulaar (ou Fulfuldé du Fouta Toro) est parlé par des millions de personnes
            au Sénégal, en Guinée et en Mauritanie. Pour la diaspora francophone installée
            en France, Belgique ou Canada, c'est souvent la langue des grands-parents —
            celle qu'on comprend à moitié, qu'on veut transmettre à ses enfants.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Ce site applique la <strong className="text-white/80">loi de Pareto</strong> :
            20 % du vocabulaire couvre 80 % des conversations familiales.
            Pas de niveau intermédiaire pénible — dès la première leçon, tu peux saluer
            ta famille en Pulaar.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['ɓ · Ɓ', 'ɗ · Ɗ', 'ŋ · Ŋ', 'ƴ · Ƴ'].map((g) => (
              <span key={g} className="rounded-lg border border-cyan/20 bg-cyan/5 px-3 py-1 font-pulaar text-sm text-cyan/70">
                {g}
              </span>
            ))}
            <span className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white/30">
              glyphes Pulaar — Noto Sans
            </span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-white/25">
          Halpulaar · Contenu validé par des locuteurs natifs du Fouta Toro · Gratuit
        </p>
      </div>
    </div>
  )
}
