import { sections, type SectionId } from '../content';
import type { Accent, GlyphKind } from '../os';

export type AppId =
  | 'about'
  | 'certificates'
  | 'iot'
  | 'capstone'
  | 'projects'
  | 'achievements'
  | 'stack'
  | 'viewer'
  | 'terminal';

/** Anything a link or button can open: an app, or one of the required sections. */
export type Target = AppId | SectionId;

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
  /** The required sections this window covers, in requirement order. */
  sections?: SectionId[];
};

/**
 * Certifications, course completions, and competition awards are all certificates, so they
 * share one window. Each keeps its own part, headed with the requirement's wording.
 */
export const certificateSections: SectionId[] = ['certifications', 'courses', 'competitions'];

const isCertificateSection = (id: string): id is SectionId =>
  (certificateSections as string[]).includes(id);

/** The window a target opens in, and the part of that window to scroll to. */
export function resolveTarget(target: Target): { app: AppId; part?: SectionId } {
  if (isCertificateSection(target)) return { app: 'certificates', part: target };
  return { app: target as AppId };
}

export const aboutApp: AppMeta = {
  id: 'about',
  windowTitle: 'about_me.txt',
  label: 'about_me.txt',
  accent: 'yellow',
  icon: 'file',
  width: 440,
};

export const certificatesApp: AppMeta = {
  id: 'certificates',
  windowTitle: 'Certificates',
  label: 'Certificates',
  accent: 'mint',
  icon: 'folder',
  width: 560,
  sections: certificateSections,
};

const sectionWindows: { id: SectionId & AppId; windowTitle: string; width: number }[] = [
  { id: 'iot', windowTitle: 'IoT_Lab.app', width: 600 },
  { id: 'capstone', windowTitle: 'Capstone.app', width: 600 },
  { id: 'projects', windowTitle: '3rd-year projects', width: 600 },
  { id: 'achievements', windowTitle: 'Achievements', width: 520 },
];

/** The desktop folders that hold the required sections. */
export const folderApps: AppMeta[] = [
  certificatesApp,
  ...sectionWindows.map(({ id, windowTitle, width }) => {
    const section = sections.find((s) => s.id === id)!;
    return {
      id,
      windowTitle,
      label: section.label,
      accent: section.accent,
      icon: 'folder' as const,
      width,
      sections: [id],
    };
  }),
];

/** Not one of the required sections: an extra folder for technical skills. */
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

export const apps: AppMeta[] = [aboutApp, ...folderApps, stackApp, viewerApp, terminalApp];

const byId = new Map(apps.map((app) => [app.id, app]));

export function getApp(id: AppId): AppMeta {
  const app = byId.get(id);
  if (!app) throw new Error(`Unknown app: ${id}`);
  return app;
}

/** Entries still waiting on details, across every section a window covers. */
export function pendingCountOf(app: AppMeta): number {
  return sections
    .filter((s) => app.sections?.includes(s.id))
    .reduce((sum, s) => sum + s.pendingCount, 0);
}

/**
 * Targets that can be opened from a link such as #capstone or #courses.
 * The viewer needs an entry, so it can't.
 */
export function isLinkableTarget(value: string): value is Target {
  if (value === 'viewer') return false;
  return byId.has(value as AppId) || sections.some((s) => s.id === value);
}

/** Apps pinned to the dock. */
export const dockAppIds: AppId[] = [
  'about',
  'certificates',
  'iot',
  'capstone',
  'projects',
  'terminal',
];
