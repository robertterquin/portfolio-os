import { profile, sections } from '../content';
import { isWallpaper, REBOOT_EVENT, setWallpaper, wallpapers } from '../lib/wallpaper';
import type { Target } from './registry';

export type Line = { kind: 'in' | 'out' | 'err'; text: string };

type Context = {
  openApp: (target: Target) => void;
};

/** What `run` returns: lines to print, or 'clear' to wipe the screen. */
type Result = string[] | { error: string } | 'clear';

const help = [
  'Commands:',
  '  whoami            who built this',
  '  ls                list the portfolio sections',
  '  open <section>    open a section, e.g. open capstone or open 4',
  '  skills            technical skills (or open stack)',
  '  contact           email and links',
  '  wallpaper <name>  change the desktop: ' + wallpapers.join(', '),
  '  date              today’s date',
  '  clear             clear the screen',
];

function findSection(query: string): Target | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  if (q === 'about' || q === 'about_me' || q === 'about_me.txt') return 'about';
  if (['stack', 'tech', 'tech stack', 'skills'].includes(q)) return 'stack';
  if (['certificates', 'certs'].includes(q)) return 'certificates';
  const byNumber = Number(q);
  if (Number.isInteger(byNumber) && byNumber >= 1 && byNumber <= sections.length) {
    return sections.at(byNumber - 1)?.id ?? null;
  }
  const match = sections.find(
    (s) =>
      s.id === q ||
      s.label.toLowerCase() === q ||
      s.label.toLowerCase().startsWith(q) ||
      s.requirement.toLowerCase().startsWith(q),
  );
  return match?.id ?? null;
}

const commands: Record<string, (args: string[], ctx: Context) => Result> = {
  help: () => help,
  whoami: () => [
    profile.fullName,
    `${profile.yearLevel}, ${profile.program}, ${profile.school} (${profile.years})`,
    profile.intro,
  ],
  ls: () =>
    sections.map((s, i) => {
      const count = `${s.entryCount} ${s.entryCount === 1 ? 'entry' : 'entries'}`;
      const pending = s.pendingCount > 0 ? `, ${s.pendingCount} waiting on details` : '';
      return `${i + 1}  ${s.id.padEnd(15)} ${count}${pending}`;
    }),
  open: (args, ctx) => {
    const id = findSection(args.join(' '));
    if (!id) return { error: 'open: which section? Try ls to see the list.' };
    ctx.openApp(id);
    return [`Opening ${id}.`];
  },
  skills: () => profile.skills.flatMap((group) => [group.category, `  ${group.tools.join(', ')}`]),
  contact: () => [
    `email     ${profile.email}`,
    `github    ${profile.links.github}`,
    `linkedin  ${profile.links.linkedin}`,
    `website   ${profile.links.professionalSite}`,
  ],
  wallpaper: (args) => {
    const name = (args[0] ?? '').toLowerCase();
    if (!isWallpaper(name)) return { error: `wallpaper: pick one of ${wallpapers.join(', ')}.` };
    setWallpaper(name);
    return [`Wallpaper set to ${name}.`];
  },
  date: () => [new Date().toLocaleDateString('en-PH', { dateStyle: 'full' })],
  clear: () => 'clear',
  echo: (args) => [args.join(' ')],
  // Easter eggs: not listed in help.
  reboot: () => {
    window.dispatchEvent(new Event(REBOOT_EVENT));
    return ['Rebooting student.os.'];
  },
  sudo: (args) =>
    args.join(' ').toLowerCase() === 'hire robert'
      ? ['Permission granted.', `Next step: email ${profile.email}`]
      : { error: 'sudo: nice try. This desktop runs in read-only mode.' },
  hello: () => ['Hi! Type help to see what I can do.'],
};

/** Runs one line of input and returns what to print. */
export function run(input: string, ctx: Context): Result {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return [];
  const command = commands[name.toLowerCase()];
  if (!command) return { error: `command not found: ${name}. Type help for the list.` };
  return command(args, ctx);
}

export const welcomeLines: Line[] = [
  { kind: 'out', text: 'student.os terminal' },
  { kind: 'out', text: 'Type help to see the commands.' },
];
