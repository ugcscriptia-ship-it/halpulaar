import type { Exercise } from '@/types/domain.types'

// ⚠️ PLACEHOLDER — à valider par un locuteur natif (CLAUDE.md §3).
export const EXERCISES: Record<string, Exercise> = {
  // === SALUTATIONS ===
  'sal-1': { id: 'sal-1', kind: 'mcq', prompt: 'Comment dit-on « Bonjour » en Pulaar ?', options: ['Ndiyam', 'Jaaraama', 'Sappo'], answerIndex: 1 },
  'sal-2': { id: 'sal-2', kind: 'mcq', prompt: '« No mbaɗ-ɗaa? » signifie…', promptPulaar: 'No mbaɗ-ɗaa?', options: ['Comment vas-tu ?', 'Où vas-tu ?', 'Qui es-tu ?'], answerIndex: 0 },
  'sal-3': { id: 'sal-3', kind: 'mcq', prompt: 'Pour répondre « Ça va », tu dis…', options: ['Jaaraama', 'Jam tan', 'Baaba'], answerIndex: 1 },
  'sal-4': { id: 'sal-4', kind: 'mcq', prompt: 'Comment dit-on « Au revoir » ?', options: ['Mbaadiima', 'Jaaraama', 'Hol tow?'], answerIndex: 0 },
  'sal-5': { id: 'sal-5', kind: 'mcq', prompt: '« A jaaraama » signifie…', promptPulaar: 'A jaaraama', options: ['Merci à toi', 'Bonjour', 'Comment ça va ?'], answerIndex: 0 },
  'sal-6': { id: 'sal-6', kind: 'mcq', prompt: 'Pour demander le prénom de quelqu\'un, tu dis…', options: ['Hol tow?', 'No mbaɗ-ɗaa?', 'Jam tan'], answerIndex: 0 },
  'sal-7': { id: 'sal-7', kind: 'mcq', prompt: 'Pour dire « Je m\'appelle Fatoumata »…', options: ['Mi wiyee Fatoumata', 'Mi yidi Fatoumata', 'Baaba Fatoumata'], answerIndex: 0 },
  // === FAMILLE ===
  'fam-1': { id: 'fam-1', kind: 'mcq', prompt: 'Comment dit-on « Mère » en Pulaar ?', options: ['Baaba', 'Yaay', 'Mawɗo'], answerIndex: 1 },
  'fam-2': { id: 'fam-2', kind: 'mcq', prompt: '« Baaba » désigne…', promptPulaar: 'Baaba', options: ['La mère', 'L\'enfant', 'Le père / un aîné'], answerIndex: 2 },
  'fam-3': { id: 'fam-3', kind: 'mcq', prompt: '« Galle » signifie…', promptPulaar: 'Galle', options: ['Le village', 'La maison / famille', 'L\'aîné'], answerIndex: 1 },
  'fam-4': { id: 'fam-4', kind: 'mcq', prompt: 'Comment dit-on « Les enfants » ?', options: ['Sukaaɓe', 'Deɗɗo', 'Mawɗo'], answerIndex: 0 },
  'fam-5': { id: 'fam-5', kind: 'mcq', prompt: '« Mawɗo » désigne…', promptPulaar: 'Mawɗo', options: ['Le cadet', 'L\'aîné(e)', 'La mère'], answerIndex: 1 },
  'fam-6': { id: 'fam-6', kind: 'mcq', prompt: '« Deɗɗo » signifie…', promptPulaar: 'Deɗɗo', options: ['L\'aîné', 'Le cadet / la cadette', 'Le père'], answerIndex: 1 },
  // === CHIFFRES ===
  'chi-1': { id: 'chi-1', kind: 'mcq', prompt: 'Comment dit-on « 1 » en Pulaar ?', options: ['Ɗiɗi', 'Go\'o', 'Tati'], answerIndex: 1 },
  'chi-2': { id: 'chi-2', kind: 'mcq', prompt: '« Ɗiɗi » correspond au chiffre…', promptPulaar: 'Ɗiɗi', options: ['3', '2', '4'], answerIndex: 1 },
  'chi-3': { id: 'chi-3', kind: 'mcq', prompt: 'Comment dit-on « 5 » en Pulaar ?', options: ['Nay', 'Joy', 'Tati'], answerIndex: 1 },
  'chi-4': { id: 'chi-4', kind: 'mcq', prompt: '« Sappo » signifie…', promptPulaar: 'Sappo', options: ['Cinq', 'Sept', 'Dix'], answerIndex: 2 },
  'chi-5': { id: 'chi-5', kind: 'mcq', prompt: 'Comment dit-on « 3 » en Pulaar ?', options: ['Tati', 'Nay', 'Joy'], answerIndex: 0 },
  'chi-6': { id: 'chi-6', kind: 'mcq', prompt: '« Jeegom » correspond au chiffre…', promptPulaar: 'Jeegom', options: ['7', '6', '8'], answerIndex: 1 },
  'chi-7': { id: 'chi-7', kind: 'mcq', prompt: 'Comment dit-on « 4 » ?', options: ['Joy', 'Nay', 'Go\'o'], answerIndex: 1 },
  'chi-8': { id: 'chi-8', kind: 'mcq', prompt: '« Jeeɗiɗi » correspond au chiffre…', promptPulaar: 'Jeeɗiɗi', options: ['9', '8', '7'], answerIndex: 2 },
  // === CORPS & OBJETS ===
  'cor-1': { id: 'cor-1', kind: 'mcq', prompt: 'Comment dit-on « Tête » en Pulaar ?', options: ['Junngo', 'Hoore', 'Gite'], answerIndex: 1 },
  'cor-2': { id: 'cor-2', kind: 'mcq', prompt: '« Junngo » signifie…', promptPulaar: 'Junngo', options: ['Tête', 'Pied', 'Main'], answerIndex: 2 },
  'cor-3': { id: 'cor-3', kind: 'mcq', prompt: '« Gite » désigne…', promptPulaar: 'Gite', options: ['Les oreilles', 'Les yeux', 'La bouche'], answerIndex: 1 },
  'cor-4': { id: 'cor-4', kind: 'mcq', prompt: 'Comment dit-on « Eau » en Pulaar ?', options: ['Hoore', 'Ndiyam', 'Junngo'], answerIndex: 1 },
  // === ÉCOUTE ===
  'lis-1': { id: 'lis-1', kind: 'listen', prompt: 'Écoute et choisis la bonne réponse', audio: '/audio/jam-tan.mp3', options: ['Jam tan', 'Jaaraama', 'Mbaadiima'], answerIndex: 0 },
  'lis-2': { id: 'lis-2', kind: 'listen', prompt: 'Écoute et choisis la bonne réponse', audio: '/audio/jaaraama.mp3', options: ['No mbaɗ-ɗaa?', 'Jaaraama', 'A jaaraama'], answerIndex: 1 },
}
