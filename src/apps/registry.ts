import { sections, type SectionId } from '../content';
import type { Accent, GlyphKind } from '../os';

export type AppId = 'about' | 'stack' | 'viewer' | 'terminal' | SectionId;

export type AppMeta = {
  id: AppId;
  /** Shown in the window title bar. */
  windowTitle: string;
  /** Shown under the desktop icon and in the dock tooltip. */
  label: string;
  accent: Accent;
  icon: GlyphKind;
  /** Preferred window width in px; shrinks to fit small screens. */
  width: number;
};

const windowTitles: Record<SectionId, string> = {
  certifications: 'Certifications',
  courses: 'Courses',
  iot: 'IoT_Lab.app',
  capstone: 'Capstone.app',
  projects: '3rd-year projects',
  achievements: 'Achievements',
  competitions: 'Trophies',
  leadership: 'Leadership',
};

const wideApps: SectionId[] = ['iot', 'capstone', 'projects'];

export const aboutApp: AppMeta = {
  id: 'about',
  windowTitle: 'about_me.txt',
  label: 'about_me.txt',
  accent: 'yellow',
  icon: 'file',
  width: 440,
};

/** The 8 required sections, in the order the midterm requirement lists them. */
export const sectionApps: AppMeta[] = sections.map((s) => ({
  id: s.id,
  windowTitle: windowTitles[s.id],
  label: s.label,
  accent: s.accent,
  icon: 'folder',
  width: wideApps.includes(s.id) ? 600 : 520,
}));

/** Not one of the 8 required sections: an extra folder for technical skills. */
export const stackApp: AppMeta = {
  id: 'stack',
  windowTitle: 'Tech Stack',
  label: 'Tech Stack',
  accent: 'mint',
  icon: 'folder',
  width: 520,
};

/** Shared window for certificate files. Opened from entries, not from the desktop. */
export const viewerApp: AppMeta = {
  id: 'viewer',
  windowTitle: 'Certificate Viewer',
  label: 'Certificate Viewer',
  accent: 'mint',
  icon: 'app',
  width: 520,
};

export const terminalApp: AppMeta = {
  id: 'terminal',
  windowTitle: 'Terminal',
  label: 'Terminal',
  accent: 'mint',
  icon: 'terminal',
  width: 540,
};

export const apps: AppMeta[] = [aboutApp, ...sectionApps, stackApp, viewerApp, terminalApp];

const byId = new Map(apps.map((app) => [app.id, app]));

export function getApp(id: AppId): AppMeta {
  const app = byId.get(id);
  if (!app) throw new Error(`Unknown app: ${id}`);
  return app;
}

/** Apps that can be opened from a link such as #capstone. The viewer needs an entry, so it can't. */
export function isLinkableAppId(value: string): value is AppId {
  return value !== 'viewer' && byId.has(value as AppId);
}

/** Apps pinned to the dock. */
export const dockAppIds: AppId[] = [
  'about',
  'certifications',
  'iot',
  'capstone',
  'competitions',
  'terminal',
];
