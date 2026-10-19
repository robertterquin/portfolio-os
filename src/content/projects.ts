import type { CourseProject } from './types';

// Source: robertterquin.com "Selected Work" (title, tag, description, detail, stack,
// highlights, links, and showcase images), copied as written there.
// Still to confirm with Robert: which course each project was for, and solo or team work.
const toConfirm = ['Course it was built for', 'Solo or team project, and my role'];

const stack = (s: string) => s.split(' · ');

export const projects: CourseProject[] = [
  {
    id: 'oncosense',
    title: 'OncoSense',
    tag: 'Healthcare mobile app',
    summary:
      'Cancer awareness platform providing structured educational resources, patient journey tracking, and community support.',
    details:
      'Engineered with Flutter and Dart, integrating Supabase Auth and PostgreSQL for secure medical milestone logging. Implements local SQLite caching for reliable offline diary entries and consumes the GNews API for real-time cancer research feeds.',
    highlights: [
      'Cancer prevention curriculum with structured educational pathways and local health reminders',
      'Personal cancer journey tracker for logging diagnoses, treatments, and recovery milestones',
      'Community discussion forum and curated cancer-related news feed via GNews integration',
    ],
    tech: stack('Flutter · Dart · Supabase · Cloud DB'),
    contribution: '',
    evidence: [
      {
        label: 'OncoSense app screens',
        kind: 'photo',
        url: '/projects/oncosense-showcase.webp',
        alt: 'OncoSense mobile app screens',
      },
      {
        label: 'GitHub repository',
        kind: 'repo',
        url: 'https://github.com/robertterquin/ONCOSENSE',
      },
    ],
    missing: toConfirm,
  },
  {
    id: 'chainly',
    title: 'Chainly',
    tag: 'Cycling and maintenance',
    summary:
      'Cycling maintenance companion tracking service records, component mileage alerts, and multi-bike garage profiles.',
    details:
      'Architected around an algorithmic component lifecycle tracker that computes cumulative wear thresholds per bicycle. Integrates local device push notifications for scheduled workshop service alerts and Supabase for cross-device garage data synchronization.',
    highlights: [
      'Distance-based and time-based maintenance reminders with per-component mileage tracking',
      'Maintenance cost and service history log with categorized records (chain, brakes, tires, general)',
      'Multi-bike garage profiles with individual cumulative mileage and ride session logging',
    ],
    tech: stack('Flutter · Dart · Supabase · Notifications'),
    contribution: '',
    evidence: [
      {
        label: 'Chainly app screens',
        kind: 'photo',
        url: '/projects/chainly-showcase.webp',
        alt: 'Chainly mobile app screens',
      },
      { label: 'GitHub repository', kind: 'repo', url: 'https://github.com/robertterquin/Chainly' },
    ],
    missing: toConfirm,
  },
  {
    id: 'spendly',
    title: 'Spendly',
    tag: 'Fintech and budget',
    summary:
      'Personal finance tracker with multi-account management, categorical expense breakdowns, and a conversational AI assistant.',
    details:
      'Features an AI chatbot powered by Groq LLaMA running function-calling heuristics to parse natural language queries directly into structured transactions. Built with reactive Riverpod state management and Supabase cloud persistence for real-time balance calculations.',
    highlights: [
      'Multi-account balance tracking with categorized transaction logging and expense breakdowns',
      'Conversational AI assistant parsing natural language to add, edit, and query financial records',
      'Clean dashboard interface with account summaries and transaction history views',
    ],
    tech: stack('Flutter · Dart · Supabase · Groq AI'),
    contribution: '',
    evidence: [
      {
        label: 'Spendly app screens',
        kind: 'photo',
        url: '/projects/spendly-showcase.webp',
        alt: 'Spendly mobile app screens',
      },
      { label: 'GitHub repository', kind: 'repo', url: 'https://github.com/robertterquin/Spendly' },
    ],
    missing: toConfirm,
  },
  {
    id: 'hunch',
    title: 'Hunch',
    tag: 'AI security and EdTech',
    summary:
      'AI security tool analyzing student internship and job postings to detect predatory terms and scam patterns.',
    details:
      'Processes unformatted recruitment copy through custom LLM evaluation prompts to identify fee requests, phishing links, and deceptive contract terms. Generates a multi-point risk scorecard with real-time verification advice for students.',
    highlights: [
      'Natural language risk engine evaluating recruitment listings against deceptive patterns and phishing markers',
      'Multi-point safety scorecard delivering actionable risk assessments and verification guidance',
      'Production deployment on Vercel with responsive desktop and mobile inspection workflows',
    ],
    tech: stack('React · TypeScript · AI Integration'),
    contribution: '',
    evidence: [
      {
        label: 'Hunch web app',
        kind: 'photo',
        url: '/projects/hunch-showcase.webp',
        alt: 'Hunch web app screens',
      },
      { label: 'Live site', kind: 'live', url: 'https://hunchh.vercel.app/' },
      { label: 'GitHub repository', kind: 'repo', url: 'https://github.com/robertterquin/Hunch' },
    ],
    missing: toConfirm,
  },
  {
    id: 'hapag',
    title: 'Hapag',
    tag: 'AI culinary assistant',
    summary:
      'Algorithmic culinary platform generating authentic Filipino recipes from available pantry ingredients.',
    details:
      'Combines a deterministic ingredient-matching algorithm with prompt-engineered LLMs to generate contextual Filipino recipes from on-hand pantry items. Dynamically handles local ingredient substitutions and adapts step-by-step instructions to dietary constraints.',
    highlights: [
      'Pantry-matching heuristic mapping on-hand ingredients to authentic regional Filipino dishes',
      'Dynamic recipe synthesizer adapting preparation steps to dietary restrictions and portion sizes',
      'Intelligent local ingredient substitution guide tailored for Filipino domestic cooking',
    ],
    tech: stack('React · TypeScript · AI Integration'),
    contribution: '',
    evidence: [
      {
        label: 'Hapag web app',
        kind: 'photo',
        url: '/projects/hapag-showcase.webp',
        alt: 'Hapag web app screens',
      },
      { label: 'Live site', kind: 'live', url: 'https://hapagg.vercel.app/' },
      { label: 'GitHub repository', kind: 'repo', url: 'https://github.com/robertterquin/Hapag' },
    ],
    missing: toConfirm,
  },
  {
    id: 'bakas',
    title: 'Bakas',
    tag: 'Civic tech and road radar',
    summary:
      'Crowdsourced urban road hazard radar with offline-first spatial synchronization, zero-barrier reporting, and dynamic hazard decay.',
    details:
      'Built as an offline-first PWA using IndexedDB for zero-latency 1-tap reporting and background queue sync. Leverages Supabase with PostGIS spatial radius filtering for geo-fenced hazard alerts, alongside community upvoting to dynamically calculate hazard TTL decay.',
    highlights: [
      'Zero-barrier 1-tap hazard reporting with optimistic UI updates and anti-spam proximity thresholds',
      'Offline-first resilience powered by IndexedDB with automated background sync and CartoDB Dark Matter mapping',
      'PostGIS spatial radius querying with dynamic community-validated TTL decay and self-cleaning lifecycle management',
    ],
    tech: stack('React · TypeScript · Supabase · PostGIS · Leaflet'),
    contribution: '',
    evidence: [
      {
        label: 'Bakas web app',
        kind: 'photo',
        url: '/projects/bakas-showcase.webp',
        alt: 'Bakas road hazard map screens',
      },
      { label: 'Live site', kind: 'live', url: 'https://bakass.vercel.app/' },
      { label: 'GitHub repository', kind: 'repo', url: 'https://github.com/robertterquin/Bakas' },
    ],
    missing: toConfirm,
  },
];
