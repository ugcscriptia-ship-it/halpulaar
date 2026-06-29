// Frontières Atomic Design enforced — règles §7 du CLAUDE.md
const lvl = (...patterns) => patterns.map((p) => ({ group: [p], message: 'Violation Atomic Design : un composant n\'importe que son niveau inférieur (voir CLAUDE.md §7).' }))

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    // atoms n'importent aucun autre composant
    { files: ['src/components/atoms/**'], rules: { 'no-restricted-imports': ['error', { patterns: lvl('@/components/molecules/*', '@/components/organisms/*', '@/components/templates/*') }] } },
    // molecules : pas d'organisms/templates, pas d'autres molecules
    { files: ['src/components/molecules/**'], rules: { 'no-restricted-imports': ['error', { patterns: lvl('@/components/organisms/*', '@/components/templates/*') }] } },
    // organisms : pas d'autres organisms, pas de templates
    { files: ['src/components/organisms/**'], rules: { 'no-restricted-imports': ['error', { patterns: lvl('@/components/templates/*') }] } },
    // seul api/ + data/ parlent au backend (quand il existera)
    { files: ['src/components/**', 'src/pages/**'], rules: { 'no-restricted-imports': ['error', { patterns: lvl('@supabase/*') }] } },
  ],
}
