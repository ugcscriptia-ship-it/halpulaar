import { Link } from 'react-router-dom'
import ParticleCanvas from '@/components/atoms/ParticleCanvas'
import { Mascot } from '@/components/atoms/Mascot'

/* ── Decorative Peul geometric SVG overlay ─────────────────────── */
function PeulPattern() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="peul" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="#E0B463" strokeWidth="1" />
          <polygon points="40,16 64,40 40,64 16,40" fill="none" stroke="#2DD4D4" strokeWidth="0.6" />
          <circle cx="40" cy="40" r="4" fill="#E0B463" />
          <line x1="40" y1="4"  x2="40" y2="0"  stroke="#E0B463" strokeWidth="0.5" />
          <line x1="76" y1="40" x2="80" y2="40" stroke="#E0B463" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#peul)" />
    </svg>
  )
}

/* ── Fouta landscape silhouette ─────────────────────────────────── */
function LandscapeSilhouette() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 w-full"
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Collines arrière */}
      <ellipse cx="200"  cy="160" rx="350" ry="90"  fill="rgba(11,16,38,0.7)" />
      <ellipse cx="1000" cy="160" rx="380" ry="80"  fill="rgba(11,16,38,0.6)" />
      <ellipse cx="600"  cy="160" rx="500" ry="70"  fill="rgba(11,16,38,0.8)" />
      {/* Cases */}
      <rect x="80"  y="105" width="60"  height="55" rx="2" fill="rgba(26,14,4,0.9)" />
      <polygon points="50,105 145,105 97,68"  fill="rgba(42,30,7,0.9)" />
      <rect x="850" y="108" width="70"  height="52" rx="2" fill="rgba(26,14,4,0.85)" />
      <polygon points="820,108 930,108 875,68" fill="rgba(42,30,7,0.85)" />
      <rect x="490" y="115" width="65"  height="45" rx="2" fill="rgba(26,14,4,0.9)" />
      <polygon points="465,115 562,115 513,78" fill="rgba(42,30,7,0.9)" />
      {/* Baobabs */}
      <rect x="320" y="65"  width="10" height="95"  fill="rgba(20,12,3,0.9)" />
      <ellipse cx="325" cy="58" rx="40" ry="26"    fill="rgba(18,15,4,0.9)" />
      <rect x="720" y="55"  width="12" height="105" fill="rgba(20,12,3,0.85)" />
      <ellipse cx="726" cy="48" rx="50" ry="30"    fill="rgba(18,15,4,0.85)" />
      {/* Fleuve */}
      <rect x="0" y="145" width="1200" height="15" fill="rgba(20,45,80,0.7)" />
      <rect x="0" y="148" width="1200" height="6"  fill="rgba(45,212,212,0.06)" />
    </svg>
  )
}

const MODES = [
  {
    to: '/aventure',
    icon: '🎬',
    title: 'Aventure',
    sub: 'Cinématique',
    desc: 'Reviens au Fouta Toro. Vis l\'histoire à travers des dialogues immersifs.',
    borderGlow: 'hover:shadow-[0_0_0_1px_#1E2A78,0_0_40px_-4px_rgba(30,42,120,0.8)]',
    accent: 'from-indigo/20 to-transparent',
    tag: '#1E2A78',
  },
  {
    to: '/apprendre',
    icon: '🎮',
    title: 'Ludique',
    sub: 'Recommandé',
    desc: 'Exercices courts, XP et séries quotidiennes — comme Duolingo mais en Pulaar.',
    borderGlow: 'hover:shadow-glow-lg',
    accent: 'from-cyan/10 to-transparent',
    tag: '#2DD4D4',
  },
  {
    to: '/apprendre',
    icon: '📚',
    title: 'Académique',
    sub: 'A1 → B1',
    desc: 'Parcours structuré avec fiches et répétition espacée pour avancer méthodiquement.',
    borderGlow: 'hover:shadow-glow-sand',
    accent: 'from-sand/10 to-transparent',
    tag: '#E0B463',
  },
]

const STATS = [
  { value: '27',   label: 'mots & expressions' },
  { value: '4',    label: 'leçons A1' },
  { value: '3',    label: 'modes' },
  { value: '100%', label: 'gratuit' },
]

const GLYPHS: [string, string][] = [
  ['ɓ', 'Ɓ'], ['ɗ', 'Ɗ'], ['ŋ', 'Ŋ'], ['ƴ', 'Ƴ'],
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── Hero full-screen ─────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-16">

        {/* Particles background */}
        <ParticleCanvas className="pointer-events-none absolute inset-0 z-0" />

        {/* Geometric Peul overlay */}
        <PeulPattern />

        {/* Radial glow derrière le titre */}
        <div
          aria-hidden
          className="animate-hero-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(30,42,120,0.5) 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-16 sm:text-left">

          {/* Mascot */}
          <div className="animate-slide-up shrink-0" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Aura dorée */}
              <div className="animate-glow-gold absolute inset-0 -m-4 rounded-full" />
              <Mascot mood="celebrating" size={140} />
            </div>
            <p className="mt-3 font-pulaar text-base font-semibold tracking-widest text-cyan">
              Jaaraama 👋
            </p>
          </div>

          {/* Texte hero */}
          <div>
            <h1
              className="animate-slide-up font-display font-bold text-sand"
              style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1.05, animationDelay: '0.1s' }}
            >
              Hal<span className="text-cyan">pul</span>aar
            </h1>
            <p
              className="animate-slide-up mx-auto mt-4 max-w-lg text-lg text-white/65 leading-relaxed sm:mx-0"
              style={{ animationDelay: '0.2s' }}
            >
              Apprends le Pulaar du Fouta Toro et renoue avec tes racines —
              gratuitement, à ton rythme, depuis la diaspora.
            </p>
            <div
              className="animate-slide-up mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
              style={{ animationDelay: '0.35s' }}
            >
              <Link
                to="/apprendre"
                className="group relative overflow-hidden rounded-xl bg-sand px-7 py-3.5 font-display text-base font-semibold text-ink shadow-lg transition-all hover:bg-gold hover:shadow-glow-gold active:scale-95"
              >
                <span className="animate-shimmer absolute inset-0" />
                <span className="relative">Commencer maintenant</span>
              </Link>
              <Link
                to="/aventure"
                className="rounded-xl border border-white/20 bg-white/[0.04] px-7 py-3.5 font-display text-base font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-cyan/50 hover:text-cyan hover:bg-cyan/5 active:scale-95"
              >
                Mode Aventure 🎬
              </Link>
            </div>
          </div>
        </div>

        {/* Landscape silhouette */}
        <LandscapeSilhouette />

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30 animate-bounce">
          <div className="h-6 w-px bg-white/50 rounded-full" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </div>
      </section>

      {/* ── Content sections ─────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24">

        {/* Stats */}
        <div className="glass animate-fade-up grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center gap-1 p-5 text-center">
              <div
                className="font-display text-3xl font-bold text-gold"
                style={{ textShadow: '0 0 20px rgba(245,197,24,0.4)' }}
              >
                {s.value}
              </div>
              <div className="text-xs text-white/45">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mode cards */}
        <h2 className="mt-16 mb-6 font-display text-2xl font-semibold text-white/90">
          Choisir ton mode
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {MODES.map((m, i) => (
            <Link
              key={m.title}
              to={m.to}
              className={`group animate-fade-up relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ${m.borderGlow} hover:-translate-y-1`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Accent gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${m.accent} opacity-0 transition-opacity group-hover:opacity-100`} />

              {/* Header */}
              <div className="relative flex items-start justify-between">
                <span className="text-5xl">{m.icon}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                  style={{ background: `${m.tag}22`, color: m.tag, border: `1px solid ${m.tag}44` }}
                >
                  {m.sub}
                </span>
              </div>

              <h3 className="relative mt-4 font-display text-xl font-semibold text-sand">{m.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/55">{m.desc}</p>

              <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-cyan opacity-0 transition-opacity group-hover:opacity-100">
                Commencer
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>

              {/* Bottom shimmer on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity group-hover:opacity-30" style={{ color: m.tag }} />
            </Link>
          ))}
        </div>

        {/* Why Pulaar */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 text-3xl">🌍</div>
            <div>
              <h2 className="font-display text-xl font-semibold text-sand">Pourquoi le Pulaar ?</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Le Pulaar (Fulfuldé du Fouta Toro) est parlé par des millions de personnes
                au Sénégal, en Guinée et en Mauritanie. Pour la diaspora francophone en
                France, Belgique ou Canada, c'est souvent la langue des grands-parents —
                celle qu'on comprend à moitié, qu'on veut transmettre à ses enfants.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Ce site applique la <strong className="text-white/85">loi de Pareto</strong> :
                20 % du vocabulaire couvre 80 % des conversations familiales.
                Dès la première leçon, tu peux saluer ta famille en Pulaar.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {GLYPHS.map(([lo, up], _i) => (
                  <span
                    key={lo}
                    className="rounded-lg border border-cyan/25 bg-cyan/5 px-3 py-1.5 font-pulaar text-sm text-cyan/80 transition hover:bg-cyan/10"
                  >
                    {lo} · {up}
                  </span>
                ))}
                <span className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/30">
                  glyphes Peul — Noto Sans
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-14 text-center text-xs text-white/20">
          Halpulaar · Contenu validé par des locuteurs natifs du Fouta Toro · Gratuit · 2026
        </p>
      </div>
    </div>
  )
}
