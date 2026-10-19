import type { Certification } from './types';

// Source: robertterquin.com "Certifications & Honors", with dates read from each
// certificate image. Newest first.
const verifyAtCertiport = {
  label: 'Verify at Certiport',
  kind: 'link' as const,
  url: 'https://verify.certiport.com',
};

export const certifications: Certification[] = [
  {
    id: 'its-cybersecurity',
    title: 'IT Specialist in Cybersecurity',
    issuer: 'Certiport',
    credential: 'Information Technology Specialist certification',
    dateEarned: '2026-06-03',
    evidence: [
      {
        label: 'Certificate',
        kind: 'certificate',
        url: '/certificates/cybersecurity-specialist.webp',
        alt: 'Information Technology Specialist certificate in Cybersecurity awarded to Robert Terquin Cahinhinan Laqui on June 3, 2026',
      },
      verifyAtCertiport,
    ],
  },
  {
    id: 'html-css-specialist',
    title: 'HTML and CSS Specialist',
    issuer: 'Certiport',
    credential: 'Information Technology Specialist certification',
    dateEarned: '2026-02-04',
    evidence: [
      {
        label: 'Certificate',
        kind: 'certificate',
        url: '/certificates/html-css-specialist.webp',
        alt: 'Information Technology Specialist certificate in HTML and CSS awarded to Robert Terquin Cahinhinan Laqui on February 4, 2026',
      },
      verifyAtCertiport,
    ],
  },
  {
    id: 'its-databases',
    title: 'IT Specialist in Databases',
    issuer: 'Certiport',
    credential: 'Information Technology Specialist certification',
    dateEarned: '2025-05-07',
    evidence: [
      {
        label: 'Certificate',
        kind: 'certificate',
        url: '/certificates/it-specialist-databases.webp',
        alt: 'Information Technology Specialist certificate in Databases awarded to Robert Terquin Cahinhinan Laqui on May 7, 2025',
      },
      verifyAtCertiport,
    ],
  },
];
