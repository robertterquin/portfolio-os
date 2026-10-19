import type { Certification } from './types';

// Source: robertterquin.com "Certifications & Honors" and the resume. Newest first.
const needsDetails = ['Exact date earned', 'Certificate file or verification link'];

export const certifications: Certification[] = [
  {
    id: 'its-cybersecurity',
    title: 'IT Specialist in Cybersecurity',
    issuer: 'Certiport',
    credential: 'Information Technology Specialist (industry certification)',
    dateEarned: '2026',
    evidence: [],
    missing: needsDetails,
  },
  {
    id: 'its-html-css',
    title: 'IT Specialist in HTML and CSS',
    issuer: 'Certiport',
    credential: 'Information Technology Specialist (web standards)',
    dateEarned: '2026',
    evidence: [],
    missing: needsDetails,
  },
  {
    id: 'its-databases',
    title: 'IT Specialist in Databases',
    issuer: 'Certiport',
    credential: 'Information Technology Specialist (industry certification)',
    dateEarned: '2025',
    evidence: [],
    missing: needsDetails,
  },
  {
    id: 'oracle-java-foundations',
    title: 'Oracle Java Foundations',
    issuer: 'Oracle Academy',
    credential: 'Oracle Certified Foundations Associate',
    dateEarned: '2024',
    evidence: [],
    missing: needsDetails,
  },
];
