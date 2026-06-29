import type { Lesson } from '@/types/domain.types'

export const LESSONS: Lesson[] = [
  {
    id: 'a1-salutations',
    level: 'A1',
    title: 'Salutations',
    nodes: [
      { id: 'sal-n1', title: 'Dire bonjour',         exerciseIds: ['sal-1', 'sal-2'] },
      { id: 'sal-n2', title: 'Demander des nouvelles', exerciseIds: ['sal-3', 'lis-1'] },
      { id: 'sal-n3', title: 'Se présenter',          exerciseIds: ['sal-6', 'sal-7'] },
      { id: 'sal-n4', title: 'Remercier & au revoir', exerciseIds: ['sal-5', 'sal-4'] },
    ],
  },
  {
    id: 'a1-famille',
    level: 'A1',
    title: 'La famille',
    nodes: [
      { id: 'fam-n1', title: 'Père & Mère',    exerciseIds: ['fam-1', 'fam-2'] },
      { id: 'fam-n2', title: 'Frères & Sœurs', exerciseIds: ['fam-5', 'fam-6'] },
      { id: 'fam-n3', title: 'La maison',       exerciseIds: ['fam-3', 'fam-4'] },
    ],
  },
  {
    id: 'a1-chiffres',
    level: 'A1',
    title: 'Les chiffres 1–10',
    nodes: [
      { id: 'chi-n1', title: '1 à 3',   exerciseIds: ['chi-1', 'chi-2', 'chi-5'] },
      { id: 'chi-n2', title: '4 à 6',   exerciseIds: ['chi-3', 'chi-7', 'chi-6'] },
      { id: 'chi-n3', title: '7 à 10',  exerciseIds: ['chi-8', 'chi-4'] },
    ],
  },
  {
    id: 'a1-corps',
    level: 'A1',
    title: 'Le corps & les objets',
    nodes: [
      { id: 'cor-n1', title: 'La tête & les yeux',  exerciseIds: ['cor-1', 'cor-3'] },
      { id: 'cor-n2', title: 'La main & l\'eau',    exerciseIds: ['cor-2', 'cor-4'] },
      { id: 'cor-n3', title: 'Révision générale',   exerciseIds: ['sal-1', 'fam-1', 'chi-1', 'cor-1'] },
    ],
  },
]
