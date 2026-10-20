import type {
  Achievement,
  Certification,
  Competition,
  Course,
  DateString,
  Evidence,
} from '../../content';

/** Anything that can open in the Certificate Viewer. */
export type ViewerItem = {
  kind: 'Certification' | 'Course completion' | 'Competition' | 'Achievement';
  title: string;
  issuer: string;
  date: DateString;
  /** Credential name or placement, e.g. "5th Place, Group Stage 1". */
  credential?: string;
  evidence: Evidence[];
  missing?: string[];
};

export type ViewCertificate = (item: ViewerItem) => void;

export const certificationItem = (c: Certification): ViewerItem => ({
  kind: 'Certification',
  title: c.title,
  issuer: c.issuer,
  date: c.dateEarned,
  credential: c.credential,
  evidence: c.evidence,
  missing: c.missing,
});

export const courseItem = (c: Course): ViewerItem => ({
  kind: 'Course completion',
  title: c.title,
  issuer: c.provider,
  date: c.completed,
  evidence: c.evidence,
  missing: c.missing,
});

export const competitionItem = (c: Competition): ViewerItem => ({
  kind: 'Competition',
  title: c.name,
  issuer: c.organizer,
  date: c.date,
  credential: c.placement,
  evidence: c.evidence,
  missing: c.missing,
});

export const achievementItem = (a: Achievement): ViewerItem => ({
  kind: 'Achievement',
  title: a.title,
  issuer: a.organizer ?? '',
  date: a.date,
  evidence: a.evidence,
  missing: a.missing,
});
