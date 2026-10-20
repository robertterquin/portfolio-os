import type { Profile } from './types';

// Source: robertterquin.com (hero, contact links, and Technical Stack section).
export const profile: Profile = {
  fullName: 'Robert Terquin C. Laqui',
  displayName: 'Robert Terquin Laqui',
  program: 'BS Information Technology',
  school: 'St. Dominic College of Asia',
  years: '2023–2027',
  yearLevel: '4th year',
  // Same portrait as the robertterquin.com hero, cropped to head and shoulders.
  photo: {
    url: '/portrait.jpg',
    alt: 'Robert Terquin Laqui in a black T-shirt, seated against a concrete wall',
  },
  intro:
    'Software engineer specializing in cross-platform mobile and web systems with Flutter, React, Node.js, and cloud backends. Focused on building clean, high-performance applications with thoughtful user experiences.',
  email: 'terquinlaqui@gmail.com',
  links: {
    github: 'https://github.com/robertterquin',
    linkedin: 'https://www.linkedin.com/in/robertterquinlaqui/',
    resume: '/resume.pdf',
    professionalSite: 'https://robertterquin.com',
  },
  skills: [
    {
      category: 'Mobile systems and architecture',
      focus: 'Cross-platform engineering, offline-first synchronization, and state management.',
      tools: [
        'Flutter & Dart',
        'React Native',
        'Android Studio & SDKs',
        'SQLite',
        'Riverpod & Provider',
      ],
    },
    {
      category: 'Web and full-stack interfaces',
      focus: 'Component architecture, strict typing, and high-performance rendering.',
      tools: [
        'React',
        'TypeScript',
        'JavaScript (ESNext)',
        'Tailwind CSS',
        'Next.js & Vite',
        'HTML5 & Modern CSS',
      ],
    },
    {
      category: 'Backend and data infrastructure',
      focus: 'Relational schema modeling, RESTful microservices, and secure authentication.',
      tools: [
        'Node.js & Express',
        'Supabase & Firebase',
        'PostgreSQL',
        'MySQL',
        'JWT & OAuth',
        'Vercel',
      ],
    },
    {
      category: 'Core engineering and security',
      focus: 'Defensive cybersecurity standards, version control, and computer architecture.',
      tools: ['Java', 'Python', 'C Programming', 'Cybersecurity Fundamentals', 'Git & GitHub'],
    },
  ],
};
