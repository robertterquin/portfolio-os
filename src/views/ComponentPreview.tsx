import { useState } from 'react';
import { capstone, certifications, profile, sections } from '../content';
import { formatDate } from '../lib/date';
import type { Theme } from '../lib/theme';
import {
  Button,
  DesktopIcon,
  Dock,
  LinkButton,
  MenuBar,
  MyRolePanel,
  PendingTag,
  StickyNote,
  Window,
  type DockItem,
} from '../os';
import './ComponentPreview.css';

// Dev-only page (open /?preview) for checking every component in both themes.

const swatches = [
  'desk',
  'desk-dot',
  'window',
  'window-sunken',
  'ink',
  'ink-muted',
  'line',
  'yellow',
  'pink',
  'mint',
  'sticky',
  'highlight',
  'focus',
];

const typeScale = [
  { token: '--text-2xl', sample: 'Hi, I build things.', display: true },
  { token: '--text-xl', sample: 'Capstone project', display: false },
  { token: '--text-lg', sample: 'IT Specialist in Databases', display: false },
  { token: '--text-md', sample: 'Body text for reading, set in Sora.', display: false },
  { token: '--text-sm', sample: 'Window body and list rows.', display: false },
  { token: '--text-xs', sample: 'Labels, dates, and badges.', display: false },
];

const dockItems: DockItem[] = [
  { id: 'certificates', label: 'Certificates', kind: 'app', accent: 'mint' },
  { id: 'iot', label: 'IoT Lab', kind: 'app', accent: 'mint' },
  { id: 'capstone', label: 'Capstone', kind: 'app', accent: 'pink' },
  { id: 'projects', label: '3rd-year projects', kind: 'app', accent: 'yellow' },
  { id: 'terminal', label: 'Terminal', kind: 'terminal' },
];

function Board({ theme }: { theme: Theme }) {
  const [listView, setListView] = useState(false);
  const [selected, setSelected] = useState<string | null>('certificates');
  const [lastOpened, setLastOpened] = useState('nothing yet');

  return (
    <div className="pv-board" data-theme={theme}>
      <h1 className="pv-board__title">{theme === 'day' ? 'Day theme' : 'Night theme'}</h1>

      <MenuBar
        listView={listView}
        onToggleListView={() => setListView((v) => !v)}
        theme={theme}
        onToggleTheme={() => undefined}
      />

      <section className="pv-group" aria-label="Color tokens">
        <h2>Color tokens</h2>
        <ul className="pv-swatches">
          {swatches.map((name) => (
            <li key={name}>
              <span className="pv-swatch" style={{ background: `var(--${name})` }} />
              <code>--{name}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className="pv-group" aria-label="Type scale">
        <h2>Type scale</h2>
        <div className="pv-type">
          {typeScale.map((row) => (
            <div key={row.token} className="pv-type__row">
              <code>{row.token}</code>
              <span
                style={{
                  fontSize: `var(${row.token})`,
                  fontFamily: row.display ? 'var(--font-display)' : undefined,
                }}
              >
                {row.sample}
              </span>
            </div>
          ))}
          <div className="pv-type__row">
            <code>--font-mono</code>
            <span style={{ fontFamily: 'var(--font-mono)' }}>~ $ whoami</span>
          </div>
        </div>
      </section>

      <section className="pv-group" aria-label="Desktop icons">
        <h2>Desktop icons</h2>
        <div className="pv-icons">
          {sections.map((s) => (
            <DesktopIcon
              key={s.id}
              label={s.label}
              accent={s.accent}
              badge={s.pendingCount}
              badgeLabel={`${s.pendingCount} waiting on details`}
              selected={selected === s.id}
              onClick={() => setSelected(s.id)}
            />
          ))}
          <DesktopIcon label="resume.pdf" kind="file" onClick={() => setSelected('resume')} />
          <DesktopIcon label="Terminal" kind="terminal" onClick={() => setSelected('terminal')} />
        </div>
      </section>

      <section className="pv-group pv-windows" aria-label="Windows">
        <h2>Windows</h2>
        <Window
          title="about_me.txt"
          accent="yellow"
          onClose={() => undefined}
          onMinimize={() => undefined}
        >
          <p className="pv-hero">Hi, I build things that ship.</p>
          <p>{profile.intro}</p>
          <div className="pv-actions">
            <Button>Open Capstone</Button>
            <LinkButton href={profile.links.github}>GitHub</LinkButton>
          </div>
        </Window>

        <Window
          title="Certifications"
          accent="mint"
          active={false}
          onClose={() => undefined}
          onMinimize={() => undefined}
        >
          <ul className="pv-rows">
            {certifications.map((c) => (
              <li key={c.id}>
                <div>
                  <strong>{c.title}</strong>
                  <span>{c.issuer}</span>
                </div>
                <time>{formatDate(c.dateEarned)}</time>
              </li>
            ))}
          </ul>
        </Window>

        <Window title="Capstone.app" accent="pink" onClose={() => undefined}>
          <p>
            <strong>{capstone.title}</strong> <PendingTag missing={capstone.missing} />
          </p>
          <p>{capstone.summary}</p>
          <MyRolePanel tasks={['Example task one', 'Example task two']}>
            Example text: this panel names exactly what Robert did on a group project.
          </MyRolePanel>
        </Window>
      </section>

      <section className="pv-group" aria-label="Dock and sticky note">
        <h2>Dock and sticky note</h2>
        <div className="pv-dockrow">
          <Dock items={dockItems} openIds={['capstone']} onOpen={(id) => setLastOpened(id)} />
          <StickyNote>drag the windows around!</StickyNote>
        </div>
        <p className="pv-note">Last opened from the dock: {lastOpened}</p>
      </section>
    </div>
  );
}

export default function ComponentPreview() {
  return (
    <div className="pv">
      <Board theme="day" />
      <Board theme="night" />
    </div>
  );
}
