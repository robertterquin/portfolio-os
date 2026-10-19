import type { Competition } from './types';

// Sources: SDCA news article (HackForGov) and Robert's resume (CodeChum placements).
// Teammates are named only after each one agrees. Newest first.
export const competitions: Competition[] = [
  {
    id: 'hackforgov-2025',
    name: 'HackForGov 2025: CALABARZON Regional',
    organizer: 'DICT CALABARZON, in partnership with NCERT',
    date: '2025',
    placement: '2nd Runner-Up',
    submission:
      'Capture-the-Flag challenge covering network security, web security, and cryptography.',
    teamName: 'Brute4z',
    evidence: [
      {
        label: 'SDCA news article',
        kind: 'article',
        url: 'https://stdominiccollege.edu.ph/Campus_Life/Article/SDCA-Brute4z-Team-Places-2nd-Runner-Up-in-CALABARZON-HackForGov-2025',
      },
    ],
    missing: ['Exact event date', 'Certificate or photos', "Teammates' OK to list their names"],
  },
  {
    id: 'codechum-2025',
    name: 'CodeChum National Programming Competition 2025',
    organizer: 'CodeChum',
    date: '2025',
    placement: '5th Place',
    submission: 'Individual programming challenge.',
    evidence: [],
    missing: ['Exact event date', 'Certificate'],
  },
  {
    id: 'codechum-2024',
    name: 'CodeChum National Programming Competition 2024',
    organizer: 'CodeChum',
    date: '2024',
    placement: '6th Place',
    submission: 'Individual programming challenge.',
    evidence: [],
    missing: ['Exact event date', 'Certificate'],
  },
];
