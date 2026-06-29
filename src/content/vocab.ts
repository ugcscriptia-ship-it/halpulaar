import type { VocabItem } from '@/types/domain.types'

// ⚠️ PLACEHOLDER — à valider par un locuteur natif du Fouta Toro (CLAUDE.md §3)
// phonetic = guide de prononciation simplifié pour francophones (utilisé par le TTS)
export const VOCAB: VocabItem[] = [
  // Salutations
  { id: 'v-jaaraama',   pulaar: 'Jaaraama',      fr: 'Bonjour / merci (salutation universelle)', audio: '/audio/jaaraama.mp3',   phonetic: 'Jaa-raa-ma',    category: 'Salutations' },
  { id: 'v-no-mbaddaa', pulaar: 'No mbaɗ-ɗaa?',  fr: 'Comment vas-tu ?',                          audio: '/audio/no-mbaddaa.mp3', phonetic: 'No mba-daa',    category: 'Salutations' },
  { id: 'v-jam-tan',    pulaar: 'Jam tan',         fr: 'Ça va, paix seulement',                     audio: '/audio/jam-tan.mp3',    phonetic: 'Djam tan',      category: 'Salutations' },
  { id: 'v-a-jaaraama', pulaar: 'A jaaraama',     fr: 'Merci à toi',                               audio: '/audio/a-jaaraama.mp3', phonetic: 'A jaa-raa-ma',  category: 'Salutations' },
  { id: 'v-mbaadiima',  pulaar: 'Mbaadiima',      fr: 'Au revoir',                                                                  phonetic: 'Mbaa-dii-ma',   category: 'Salutations' },
  { id: 'v-hol-tow',    pulaar: 'Hol tow?',       fr: 'Comment tu t\'appelles ?',                                                   phonetic: 'Hol tow',       category: 'Salutations' },
  { id: 'v-mi-wiyee',   pulaar: 'Mi wiyee…',      fr: 'Je m\'appelle…',                                                             phonetic: 'Mi wi-yé',      category: 'Salutations' },
  // Famille
  { id: 'v-baaba',      pulaar: 'Baaba',           fr: 'Père / grand-père (terme affectueux)',      audio: '/audio/baaba.mp3',      phonetic: 'Baa-ba',        category: 'Famille' },
  { id: 'v-yaay',       pulaar: 'Yaay',            fr: 'Mère',                                      audio: '/audio/yaay.mp3',       phonetic: 'Yaay',          category: 'Famille' },
  { id: 'v-mawdo',      pulaar: 'Mawɗo',           fr: 'Aîné(e) / grand(e) frère/sœur',                                             phonetic: 'Maw-do',        category: 'Famille' },
  { id: 'v-galle',      pulaar: 'Galle',           fr: 'Maison / famille',                                                           phonetic: 'Gal-lé',        category: 'Famille' },
  { id: 'v-sukaabe',    pulaar: 'Sukaaɓe',         fr: 'Enfants',                                                                    phonetic: 'Sou-kaa-bé',   category: 'Famille' },
  { id: 'v-deddo',      pulaar: 'Deɗɗo',           fr: 'Cadet(te)',                                                                   phonetic: 'Dé-do',         category: 'Famille' },
  // Chiffres 1–10
  { id: 'v-goo',        pulaar: 'Go\'o',           fr: 'Un (1)',                                                                      phonetic: 'Go-o',          category: 'Chiffres' },
  { id: 'v-didi',       pulaar: 'Ɗiɗi',            fr: 'Deux (2)',                                                                    phonetic: 'Di-di',         category: 'Chiffres' },
  { id: 'v-tati',       pulaar: 'Tati',            fr: 'Trois (3)',                                                                   phonetic: 'Ta-ti',         category: 'Chiffres' },
  { id: 'v-nay',        pulaar: 'Nay',             fr: 'Quatre (4)',                                                                  phonetic: 'Nay',           category: 'Chiffres' },
  { id: 'v-joy',        pulaar: 'Joy',             fr: 'Cinq (5)',                                                                    phonetic: 'Djoy',          category: 'Chiffres' },
  { id: 'v-jeegom',     pulaar: 'Jeegom',          fr: 'Six (6)',                                                                     phonetic: 'Djé-gom',       category: 'Chiffres' },
  { id: 'v-jeedidi',    pulaar: 'Jeeɗiɗi',        fr: 'Sept (7)',                                                                    phonetic: 'Djé-di-di',     category: 'Chiffres' },
  { id: 'v-jeetati',    pulaar: 'Jeetati',         fr: 'Huit (8)',                                                                    phonetic: 'Djé-ta-ti',     category: 'Chiffres' },
  { id: 'v-jeenay',     pulaar: 'Jeenay',          fr: 'Neuf (9)',                                                                    phonetic: 'Djé-nay',       category: 'Chiffres' },
  { id: 'v-sappo',      pulaar: 'Sappo',           fr: 'Dix (10)',                                                                    phonetic: 'Sap-po',        category: 'Chiffres' },
  // Corps & objets
  { id: 'v-hoore',      pulaar: 'Hoore',           fr: 'Tête',                                                                       phonetic: 'Hoo-ré',        category: 'Corps' },
  { id: 'v-junngo',     pulaar: 'Junngo',          fr: 'Main',                                                                       phonetic: 'Djoung-o',      category: 'Corps' },
  { id: 'v-gite',       pulaar: 'Gite',            fr: 'Yeux',                                                                       phonetic: 'Gi-té',         category: 'Corps' },
  { id: 'v-ndiyam',     pulaar: 'Ndiyam',          fr: 'Eau',                                                                        phonetic: 'Ndi-yam',       category: 'Corps' },
]
