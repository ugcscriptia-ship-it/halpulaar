import type { VocabItem } from '@/types/domain.types'

// ⚠️ PLACEHOLDER — à valider par un locuteur natif du Fouta Toro (CLAUDE.md §3)
export const VOCAB: VocabItem[] = [
  // Salutations
  { id: 'v-jaaraama',   pulaar: 'Jaaraama',      fr: 'Bonjour / merci (salutation universelle)', audio: '/audio/jaaraama.mp3' },
  { id: 'v-no-mbaddaa', pulaar: 'No mbaɗ-ɗaa?',  fr: 'Comment vas-tu ?',                          audio: '/audio/no-mbaddaa.mp3' },
  { id: 'v-jam-tan',    pulaar: 'Jam tan',         fr: 'Ça va, paix seulement',                     audio: '/audio/jam-tan.mp3' },
  { id: 'v-a-jaaraama', pulaar: 'A jaaraama',     fr: 'Merci à toi',                               audio: '/audio/a-jaaraama.mp3' },
  { id: 'v-mbaadiima',  pulaar: 'Mbaadiima',      fr: 'Au revoir' },
  { id: 'v-hol-tow',    pulaar: 'Hol tow?',       fr: 'Comment tu t\'appelles ?' },
  { id: 'v-mi-wiyee',   pulaar: 'Mi wiyee…',      fr: 'Je m\'appelle…' },
  // Famille
  { id: 'v-baaba',      pulaar: 'Baaba',           fr: 'Père / grand-père (terme affectueux)',      audio: '/audio/baaba.mp3' },
  { id: 'v-yaay',       pulaar: 'Yaay',            fr: 'Mère',                                      audio: '/audio/yaay.mp3' },
  { id: 'v-mawdo',      pulaar: 'Mawɗo',           fr: 'Aîné(e) / grand(e) frère/sœur' },
  { id: 'v-galle',      pulaar: 'Galle',           fr: 'Maison / famille' },
  { id: 'v-sukaabe',    pulaar: 'Sukaaɓe',         fr: 'Enfants' },
  { id: 'v-deddo',      pulaar: 'Deɗɗo',           fr: 'Cadet(te)' },
  // Chiffres 1–10
  { id: 'v-goo',        pulaar: 'Go\'o',           fr: 'Un (1)' },
  { id: 'v-didi',       pulaar: 'Ɗiɗi',            fr: 'Deux (2)' },
  { id: 'v-tati',       pulaar: 'Tati',            fr: 'Trois (3)' },
  { id: 'v-nay',        pulaar: 'Nay',             fr: 'Quatre (4)' },
  { id: 'v-joy',        pulaar: 'Joy',             fr: 'Cinq (5)' },
  { id: 'v-jeegom',     pulaar: 'Jeegom',          fr: 'Six (6)' },
  { id: 'v-jeedidi',    pulaar: 'Jeeɗiɗi',        fr: 'Sept (7)' },
  { id: 'v-jeetati',    pulaar: 'Jeetati',         fr: 'Huit (8)' },
  { id: 'v-jeenay',     pulaar: 'Jeenay',          fr: 'Neuf (9)' },
  { id: 'v-sappo',      pulaar: 'Sappo',           fr: 'Dix (10)' },
  // Corps
  { id: 'v-hoore',      pulaar: 'Hoore',           fr: 'Tête' },
  { id: 'v-junngo',     pulaar: 'Junngo',          fr: 'Main' },
  { id: 'v-gite',       pulaar: 'Gite',            fr: 'Yeux' },
  { id: 'v-ndiyam',     pulaar: 'Ndiyam',          fr: 'Eau' },
]
