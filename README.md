# student.os

The midterm student portfolio of Robert Terquin C. Laqui (BS Information Technology, St. Dominic College of Asia), designed as a playful desktop operating system. Each of the 8 required portfolio sections is a desktop folder, and projects open as app windows.

This site is separate from [robertterquin.com](https://robertterquin.com), which stays unchanged.

## Run it

```bash
npm install
npm run dev
```

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start the dev server            |
| `npm run build`     | Type-check and build to `dist/` |
| `npm run preview`   | Serve the production build      |
| `npm run lint`      | Lint with oxlint                |
| `npm run format`    | Format with Prettier            |
| `npm run typecheck` | Type-check only                 |

## Update the content

All portfolio content lives in `src/content/`, one file per section:

| File                | Required section                     |
| ------------------- | ------------------------------------ |
| `profile.ts`        | Name, program, intro, contact, links |
| `certifications.ts` | 1. Updated certifications            |
| `courses.ts`        | 2. Course completions                |
| `iot.ts`            | 3. IoT project                       |
| `capstone.ts`       | 4. Capstone project                  |
| `projects.ts`       | 5. Third-year course projects        |
| `achievements.ts`   | 6. Other achievements                |
| `competitions.ts`   | 7. Competitions and awards           |

Section 8, officership and leadership, is left out because there are no officer roles to show. Sections 1, 2, and 7 are all certificates, so they share one **Certificates** window, each in its own part headed with the requirement's wording. Skills for the Tech Stack folder live in `profile.ts` under `skills`.

Put certificate files in `public/certificates/` and project images in `public/projects/`, then link them from an entry's `evidence` list, for example `{ label: 'Certificate', kind: 'certificate', url: '/certificates/it-specialist-databases.webp', alt: '…' }`. Photos and certificate images need `alt` text describing what they show.

Every entry can carry a `missing` list naming details that still have to be confirmed. The site shows those entries with a "details coming soon" tag. Remove an item from `missing` once the real detail is filled in.

## Ways to view it

- **Desktop** (768 px and wider): folders open as draggable windows. Esc closes the active window.
- **Phone**: a home screen of apps; each opens full screen.
- **List view**: every section on one scrolling page. Toggle it from the menu bar, or share a link with `?view=list`.
- **Links to a section**: add the section id, e.g. `#capstone`, `#stack`, `#terminal`. `#certifications`, `#courses`, and `#competitions` open Certificates at that part.
- **Terminal**: type `help` for the commands.

## Project structure

Each component lives in its own folder with its stylesheet beside it, e.g. `components/Chips/Chips.tsx` and `Chips.css`.

```
src/
  main.tsx, App.tsx    entry point and the shell that picks a view
  content/             all portfolio text and links (edit these)
  styles/              design tokens and base page styles
  lib/                 small helpers: dates, links in the address bar, theme, scrolling
  components/          shared pieces used across windows (Button, Chips, Gallery, ...)
  os/                  desktop chrome: Window, MenuBar, Dock, DesktopIcon, BootScreen
  apps/                one folder per window: about, certificates, iot, capstone,
                       projects, achievements, tech-stack, terminal, certificate-viewer
                       registry.ts lists the windows; AppContent.tsx picks one to show
  views/               the three layouts: desktop, list, phone
  dev/                 component preview page (development only, open /?preview)
```

## Project docs

- `docs/content-inventory.md`: what was gathered, and from where
- `docs/qa-report.md`: the latest QA results
- `docs/moodboard.html`: the four design directions that were compared
- Development plan: https://claude.ai/code/artifact/aa4fee0a-2b2b-484a-ac71-08b1df4593d9
