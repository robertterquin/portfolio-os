import type { Achievement } from './types';

// Competitions live in competitions.ts. This file is for everything else:
// scholarships, recognition, trainings, workshops, seminars, participation.
export const achievements: Achievement[] = [
  {
    id: 'freelance-developer',
    title: 'Freelance full-stack developer',
    kind: 'work',
    date: '2024',
    until: 'present',
    description:
      'Builds web and mobile tools for clients, covering appointments, operations, inventory, reporting, notifications, elections, and local community services.',
    evidence: [],
  },
];
