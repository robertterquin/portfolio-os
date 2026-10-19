import type { Capstone } from './types';

// Unconfirmed lead: BarangayHub looks like a capstone-style system, but Robert has not
// confirmed it. The summary below describes the public repo only.
export const capstone: Capstone = {
  title: 'BarangayHub',
  summary:
    'A web-based Barangay Management Information System for Barangay Daine II. Residents request documents, track their status, and file complaints or feedback online; staff manage resident records, process requests, and post announcements.',
  objectives: [],
  tech: ['TypeScript'],
  team: [],
  myRole: '',
  status: 'in-progress',
  evidence: [
    {
      label: 'GitHub repository',
      kind: 'repo',
      url: 'https://github.com/robertterquin/BarangayHub',
    },
    { label: 'Live site', kind: 'live', url: 'https://barangay-hub-gold.vercel.app' },
  ],
  missing: [
    'Confirm this is the capstone project',
    'Official title',
    'Objectives',
    'Full tech stack',
    'Team members and their roles',
    'My role',
    'Current status and progress',
    'Screenshots or diagrams',
  ],
};
