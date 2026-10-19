import type { Course } from './types';

// Source: robertterquin.com lists "Oracle Java Foundations"; the certificate itself is an
// Oracle Academy Award of Course Completion, so it belongs here rather than under certifications.
export const courses: Course[] = [
  {
    id: 'oracle-java-foundations',
    title: 'Java Foundations',
    provider: 'Oracle Academy',
    completed: '2024-12-29',
    evidence: [
      {
        label: 'Certificate',
        kind: 'certificate',
        url: '/certificates/oracle-java-foundations.webp',
        alt: 'Oracle Academy Award of Course Completion for Java Foundations, presented to Robert Terquin Laqui on December 29, 2024',
      },
    ],
  },
];
