import { achievements } from './achievements';
import { capstone } from './capstone';
import { certifications } from './certifications';
import { competitions } from './competitions';
import { courses } from './courses';
import { iotProject } from './iot';
import { leadership } from './leadership';
import { projects } from './projects';

export type SectionId =
  | 'certifications'
  | 'courses'
  | 'iot'
  | 'capstone'
  | 'projects'
  | 'achievements'
  | 'competitions'
  | 'leadership';

export type SectionAccent = 'yellow' | 'pink' | 'mint';

export type Section = {
  /** Also the URL hash: #capstone opens the Capstone window. */
  id: SectionId;
  /** Folder name on the desktop. */
  label: string;
  /** The professor's wording, used in List view headings. */
  requirement: string;
  accent: SectionAccent;
  entryCount: number;
  /** Number of entries still waiting on details from Robert. */
  pendingCount: number;
};

const pending = (items: { missing?: string[] }[]) =>
  items.filter((item) => (item.missing?.length ?? 0) > 0).length;

// Order follows the midterm requirement, 1 to 8.
export const sections: Section[] = [
  {
    id: 'certifications',
    label: 'Certifications',
    requirement: 'Updated certifications',
    accent: 'mint',
    entryCount: certifications.length,
    pendingCount: pending(certifications),
  },
  {
    id: 'courses',
    label: 'Courses',
    requirement: 'Course completions',
    accent: 'yellow',
    entryCount: courses.length,
    pendingCount: pending(courses),
  },
  {
    id: 'iot',
    label: 'IoT Lab',
    requirement: 'IoT project',
    accent: 'mint',
    entryCount: 1,
    pendingCount: pending([iotProject]),
  },
  {
    id: 'capstone',
    label: 'Capstone',
    requirement: 'Capstone project',
    accent: 'pink',
    entryCount: 1,
    pendingCount: pending([capstone]),
  },
  {
    id: 'projects',
    label: '3rd-year projects',
    requirement: 'Third-year course projects',
    accent: 'yellow',
    entryCount: projects.length,
    pendingCount: pending(projects),
  },
  {
    id: 'achievements',
    label: 'Achievements',
    requirement: 'Other achievements',
    accent: 'yellow',
    entryCount: achievements.length,
    pendingCount: pending(achievements),
  },
  {
    id: 'competitions',
    label: 'Trophies',
    requirement: 'Competitions and awards',
    accent: 'yellow',
    entryCount: competitions.length,
    pendingCount: pending(competitions),
  },
  {
    id: 'leadership',
    label: 'Leadership',
    requirement: 'Officership and leadership experiences',
    accent: 'pink',
    entryCount: leadership.length,
    pendingCount: pending(leadership),
  },
];
