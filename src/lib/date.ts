import type { DateString } from '../content/types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Formats "2025", "2025-10", or "2025-10-06" as "2025", "Oct 2025", or "Oct 6, 2025". */
export function formatDate(value: DateString | 'present'): string {
  if (value === 'present') return 'Present';
  const [year, month, day] = value.split('-');
  if (!month) return year;
  const monthName = MONTHS.at(Number(month) - 1) ?? month;
  if (!day) return `${monthName} ${year}`;
  return `${monthName} ${Number(day)}, ${year}`;
}

/** Formats a range such as "2024 – Present". */
export function formatRange(start: DateString, end?: DateString | 'present'): string {
  return end ? `${formatDate(start)} – ${formatDate(end)}` : formatDate(start);
}

/** Groups entries by year, newest year first, keeping the order inside each year. */
export function byYear<T>(items: T[], dateOf: (item: T) => string): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const year = dateOf(item).slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), item]);
  }
  return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
}
