import type { Config } from 'tailwindcss'

// Direction artistique « Afro-Futuriste Peul »
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1026',
        indigo: '#1E2A78',
        sand: '#E0B463',
        ocre: '#C2702C',
        earth: '#4A2F1C',
        sahel: '#5B8C4E',
        cyan: '#2DD4D4',
        gold: '#F5C518',
      },
      fontFamily: {
        // display = titres FR/marketing uniquement (jamais de Pulaar)
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // sans = corps. Noto Sans couvre les glyphes pulaar ɓ ɗ ŋ ƴ
        sans: ['"Noto Sans"', 'system-ui', 'sans-serif'],
        // pulaar = alias explicite à utiliser sur tout texte en Pulaar
        pulaar: ['"Noto Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow:      '0 0 0 1px #2DD4D4, 0 0 18px -4px #2DD4D4',
        'glow-lg': '0 0 0 1px #2DD4D4, 0 0 40px -4px rgba(45,212,212,0.7)',
        'glow-gold':'0 0 0 1px #F5C518, 0 0 24px -4px rgba(245,197,24,0.6)',
        'glow-sand':'0 0 0 1px #E0B463, 0 0 20px -4px rgba(224,180,99,0.5)',
        glass:     'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        'hero-radial': 'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(30,42,120,0.8) 0%, rgba(11,16,38,0) 70%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(245,197,24,0.15) 50%, transparent 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config
