/**
 * Content types for student.os.
 *
 * Dates are strings in one of three precisions: "2025", "2025-10", or "2025-10-06".
 * `missing` lists details Robert still has to send. Any entry with a non-empty
 * `missing` list shows a "details coming soon" tag, so nothing unconfirmed passes as fact.
 */

export type DateString = string;

export type EvidenceKind =
  'certificate' | 'repo' | 'live' | 'article' | 'photo' | 'video' | 'document' | 'link';

export type Evidence = {
  label: string;
  kind: EvidenceKind;
  /** Absolute URL, or a path under /public such as "/certificates/its-databases.pdf". */
  url: string;
  /** Required for photos: describes what the image shows. */
  alt?: string;
};

type Pending = {
  missing?: string[];
};

export type Profile = Pending & {
  fullName: string;
  displayName: string;
  program: string;
  school: string;
  years: string;
  yearLevel?: string;
  intro: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    resume: string;
    professionalSite: string;
  };
};

export type Certification = Pending & {
  id: string;
  title: string;
  issuer: string;
  credential?: string;
  dateEarned: DateString;
  evidence: Evidence[];
};

export type Course = Pending & {
  id: string;
  title: string;
  provider: string;
  completed: DateString;
  evidence: Evidence[];
};

export type ProjectStatus = 'planning' | 'in-progress' | 'completed';

export type TeamMember = {
  name: string;
  role: string;
};

/** One stage in the IoT signal flow, drawn left to right, e.g. sensor → board → cloud. */
export type FlowStep = {
  label: string;
  detail?: string;
};

export type IoTProject = Pending & {
  title: string;
  summary: string;
  objectives: string[];
  components: string[];
  /** The wiring/signal-flow diagram shown first in the IoT Lab window. */
  flow?: FlowStep[];
  myRole: string;
  result?: string;
  status: ProjectStatus;
  /** Photos (kind "photo") show in the gallery; everything else shows as links. */
  evidence: Evidence[];
};

export type Capstone = Pending & {
  title: string;
  summary: string;
  objectives: string[];
  tech: string[];
  team: TeamMember[];
  myRole: string;
  status: ProjectStatus;
  /** 0 to 100, shown as a progress bar. */
  progress?: number;
  evidence: Evidence[];
};

export type CourseProject = Pending & {
  id: string;
  title: string;
  courseCode?: string;
  courseName?: string;
  summary: string;
  tech: string[];
  /** Robert's specific contribution. Required for group work. */
  contribution: string;
  isGroupWork?: boolean;
  evidence: Evidence[];
};

export type AchievementKind =
  | 'award'
  | 'scholarship'
  | 'recognition'
  | 'training'
  | 'workshop'
  | 'conference'
  | 'presentation'
  | 'participation'
  | 'work';

export type Achievement = Pending & {
  id: string;
  title: string;
  kind: AchievementKind;
  organizer?: string;
  date: DateString;
  /** Optional end date for ongoing or multi-day entries; "present" for ongoing. */
  until?: DateString | 'present';
  description?: string;
  evidence: Evidence[];
};

export type Competition = Pending & {
  id: string;
  name: string;
  organizer: string;
  date: DateString;
  placement: string;
  submission: string;
  teamName?: string;
  /** Only filled once each teammate has agreed to be named. */
  teammates?: string[];
  evidence: Evidence[];
};

export type LeadershipRole = Pending & {
  id: string;
  organization: string;
  position: string;
  academicYear: string;
  responsibilities: string[];
  evidence: Evidence[];
};
