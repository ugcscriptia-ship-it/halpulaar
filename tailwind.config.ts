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
        glow: '0 0 0 1px #2DD4D4, 0 0 18px -4px #2DD4D4',
      },
    },
  },
  plugins: [],
} satisfies Config
