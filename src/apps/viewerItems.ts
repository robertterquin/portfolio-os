import type { Achievement, Certification, Competition, Course } from '../content';
import type { ViewerItem } from './parts';

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

/** Groups entries by year, newest year first, keeping the order inside each year. */
export function byYear<T>(items: T[], dateOf: (item: T) => string): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const year = dateOf(item).slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), item]);
  }
  return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
}
