import type { Competition } from './types';

// Sources: robertterquin.com, each certificate image, and the SDCA news article linked from
// the site. Teammates are named only after each one agrees. Newest first.
export const competitions: Competition[] = [
  {
    id: 'codechum-2025',
    name: 'CodeChum National Programming Challenge 2025 (Season 2)',
    organizer: 'CodeChum',
    date: '2025-11-13',
    placement: '5th Place, Group Stage 1',
    submission: 'Competitive programming round, Group Stage 1.',
    evidence: [
      {
        label: 'Certificate',
        kind: 'certificate',
        url: '/certificates/codechum-2025.webp',
        alt: 'CodeChum certificate presented to Robert Terquin Laqui for winning 5th place in Group Stage 1 of the National Programming Challenge 2025, November 13, 2025',
      },
    ],
  },
  {
    id: 'hackforgov-2025',
    name: 'HackForGov 2025: CALABARZON',
    organizer: 'DICT CALABARZON Regional Office, in partnership with NCERT',
    date: '2025-10-06',
    placement: '2nd Runner-Up',
    submission:
      'Capture-the-Flag cybersecurity challenge covering network security, web security, and cryptography. Theme: "Cyber Guardians: Empowering Today\'s Defenders, Securing Tomorrow\'s Digital Nation."',
    teamName: 'Brute4z',
    evidence: [
      {
        label: 'Certificate',
        kind: 'certificate',
        url: '/certificates/hackforgov-2025.jpg',
        alt: 'HackForGov 2025 Capture-the-Flag Competition (CALABARZON) certificate presented to Robert Terquin Laqui, given October 6, 2025 at Holiday Inn & Suites Batangas LimaPark, Malvar, Batangas',
      },
      {
        label: 'SDCA news article',
        kind: 'article',
        url: 'https://stdominiccollege.edu.ph/Campus_Life/Article/SDCA-Brute4z-Team-Places-2nd-Runner-Up-in-CALABARZON-HackForGov-2025',
      },
    ],
  },
  {
    id: 'codechum-2024',
    name: 'CodeChum National Programming Challenge 2024',
    organizer: 'CodeChum',
    date: '2024-10-28',
    placement: '6th Place, Group Stage 2',
    submission: 'Competitive programming round, Group Stage 2.',
    evidence: [
      {
        label: 'Certificate',
        kind: 'certificate',
        url: '/certificates/codechum-2024.webp',
        alt: 'CodeChum certificate presented to Robert Terquin Laqui for winning 6th place in Group Stage 2 of the National Programming Challenge 2024, October 28, 2024',
      },
    ],
  },
];
