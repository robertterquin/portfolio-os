import type { CourseProject } from './types';

// Third-year course projects. Found as course-named repos on GitHub; titles,
// descriptions, and contributions still need Robert's input.
const needsDetails = ['Project title', 'What it does', 'My specific contribution', 'Screenshots'];

export const projects: CourseProject[] = [
  {
    id: 'it308-next-app',
    title: 'IT 308 web application',
    courseCode: 'IT 308',
    summary: 'A web application built with Next.js and TypeScript.',
    tech: ['Next.js', 'TypeScript'],
    contribution: '',
    evidence: [
      {
        label: 'GitHub repository',
        kind: 'repo',
        url: 'https://github.com/robertterquin/SDCA-IT308-Next-App',
      },
    ],
    missing: needsDetails,
  },
  {
    id: 'it303-api',
    title: 'IT 303 backend API',
    courseCode: 'IT 303',
    summary: 'A backend API built with Node.js and MongoDB.',
    tech: ['Node.js', 'MongoDB', 'JavaScript'],
    contribution: '',
    evidence: [
      {
        label: 'GitHub repository',
        kind: 'repo',
        url: 'https://github.com/robertterquin/SDCA-IT303-API',
      },
    ],
    missing: needsDetails,
  },
  {
    id: 'it-elec4-flutter',
    title: 'IT Elective 4 mobile app',
    courseCode: 'IT Elective 4',
    summary: 'A mobile app built with Flutter.',
    tech: ['Flutter', 'Dart'],
    contribution: '',
    evidence: [
      {
        label: 'GitHub repository',
        kind: 'repo',
        url: 'https://github.com/robertterquin/SDCA-IT-ELEC4-Flutter',
      },
    ],
    missing: needsDetails,
  },
];
