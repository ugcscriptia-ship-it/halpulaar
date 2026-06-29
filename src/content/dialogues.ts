import type { Scene } from '@/types/domain.types'

// ⚠️ PLACEHOLDER — dialogues à écrire/valider avec un locuteur natif (CLAUDE.md §3).
export const SCENES: Record<string, Scene> = {
  'arrivee-village': {
    id: 'arrivee-village',
    title: 'Arrivée au village',
    lines: [
      { id: 'l1', speaker: 'Grand-père', pulaar: 'Jaaraama, biɗɗo am !',      fr: 'Bienvenue, mon enfant !' },
      { id: 'l2', speaker: 'Toi',        pulaar: 'Jaaraama, baaba.',           fr: 'Bonjour, grand-père.' },
      { id: 'l3', speaker: 'Grand-père', pulaar: 'No mbaɗ-ɗaa e laawol?',     fr: 'Comment s\'est passé le voyage ?' },
    ],
    choices: [
      { label: 'Rejoindre la famille — Jam tan !', nextSceneId: 'repas-famille' },
      { label: 'Explorer le village',              nextSceneId: 'promenade-fleuve' },
    ],
  },

  'repas-famille': {
    id: 'repas-famille',
    title: 'Le repas en famille',
    lines: [
      { id: 'l1', speaker: 'Yaay',   pulaar: 'Naata, naata ! Ɗo ko galle maa.',     fr: 'Entre, entre ! Ici c\'est ta maison.' },
      { id: 'l2', speaker: 'Toi',    pulaar: 'A jaaraama, yaay.',                    fr: 'Merci, maman.' },
      { id: 'l3', speaker: 'Mawɗo', pulaar: 'Sukaaɓe fof ɗoo. Mbaadiima waayi !', fr: 'Tous les enfants sont là. Comme tu nous as manqué !' },
    ],
    choices: [
      { label: 'Aller au marché du village', nextSceneId: 'marche-village' },
    ],
  },

  'promenade-fleuve': {
    id: 'promenade-fleuve',
    title: 'Au bord du fleuve Sénégal',
    lines: [
      { id: 'l1', speaker: 'Enfant',      pulaar: 'Hol tow, dewgal maa?',             fr: 'Comment tu t\'appelles, étranger ?' },
      { id: 'l2', speaker: 'Toi',         pulaar: 'Mi wiyee… mi jeyaa Paari.',        fr: 'Je m\'appelle… je viens de Paris.' },
      { id: 'l3', speaker: 'Enfant',      pulaar: 'Maayo Senegaal ko jawdi men !',    fr: 'Le fleuve Sénégal, c\'est notre richesse !' },
    ],
    choices: [
      { label: 'Retourner au village', nextSceneId: 'marche-village' },
    ],
  },

  'marche-village': {
    id: 'marche-village',
    title: 'Le marché du village',
    lines: [
      { id: 'l1', speaker: 'Vendeur',     pulaar: 'Ndiyam, ndiyam ! Go\'o, Ɗiɗi, Tati…', fr: 'De l\'eau, de l\'eau ! Un, deux, trois…' },
      { id: 'l2', speaker: 'Grand-père',  pulaar: 'Ɗoo, a humpitii galle maa.',            fr: 'Ici, tu as retrouvé ta maison.' },
      { id: 'l3', speaker: 'Toi',         pulaar: 'Jaaraama, baaba. Mi humpitii.',          fr: 'Merci grand-père. Je me retrouve.' },
    ],
    choices: [
      { label: 'Commencer à apprendre le Pulaar →', nextSceneId: undefined },
    ],
  },
}
