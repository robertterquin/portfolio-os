import { useCallback, useEffect, useState } from 'react';
import { AboutApp } from '../apps/AboutApp';
import { AppContent } from '../apps/AppContent';
import type { ViewerItem } from '../apps/parts';
import { aboutApp, folderApps, resolveTarget, stackApp, type Target } from '../apps/registry';
import { TechStackApp } from '../apps/TechStackApp';
import { ViewerDialog } from '../apps/ViewerDialog';
import { sections } from '../content';
import { readHashTarget, replaceHash } from '../lib/hash';
import { revealElement } from '../lib/reveal';
import { Window } from '../os';
import './ListView.css';

const numberOf = new Map(sections.map((s, index) => [s.id as string, index + 1]));
const requirementOf = new Map(sections.map((s) => [s.id as string, s.requirement]));

/** "3. IoT project", or "1, 2, 7. Certificates" for the window that holds three sections. */
function listTitle(app: (typeof folderApps)[number]) {
  const ids = app.sections ?? [];
  const numbers = ids.map((id) => numberOf.get(id)).join(', ');
  const name = ids.length === 1 ? requirementOf.get(ids[0]) : app.label;
  return `${numbers}. ${name}`;
}

/** Scrolls to a section: its own window, or its part of a shared window. */
function scrollToTarget(target: Target, { animate = true } = {}) {
  const { app, part } = resolveTarget(target);
  revealElement(part ? `part-${part}` : `list-${app}`, { animate });
}

/** Every section on one plain scrolling page. The section list follows the requirement's order. */
export function ListView() {
  const [viewerItem, setViewerItem] = useState<ViewerItem | null>(null);

  const goTo = useCallback((target: Target) => {
    replaceHash(target === 'about' ? null : target);
    scrollToTarget(target);
  }, []);

  // Open on the section named in the link, and follow links like #iot.
  useEffect(() => {
    const fromLink = readHashTarget();
    // Landing on a link jumps straight there; later jumps animate.
    if (fromLink) scrollToTarget(fromLink, { animate: false });
    const onHashChange = () => {
      const target = readHashTarget();
      if (target) goTo(target);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [goTo]);

  return (
    <main className="listview" aria-label="List view">
      <div className="listview__inner">
        <nav className="listview__toc" aria-label="Jump to a section">
          <p className="listview__toc-title">Sections</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(section.id);
                  }}
                >
                  {section.requirement}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="listview__sections">
          <Window
            title={aboutApp.windowTitle}
            accent={aboutApp.accent}
            className="listview__window"
            rootProps={{ id: 'list-about', tabIndex: -1 }}
          >
            <AboutApp onOpenApp={goTo} showIndex={false} />
          </Window>

          <Window
            title={stackApp.windowTitle}
            accent={stackApp.accent}
            className="listview__window"
            rootProps={{ id: 'list-stack', tabIndex: -1 }}
          >
            <TechStackApp />
          </Window>

          {folderApps.map((app) => (
            <Window
              key={app.id}
              title={listTitle(app)}
              accent={app.accent}
              className="listview__window"
              rootProps={{ id: `list-${app.id}`, tabIndex: -1 }}
            >
              <AppContent
                id={app.id}
                onOpenApp={goTo}
                onViewCertificate={setViewerItem}
                viewerItem={viewerItem}
              />
            </Window>
          ))}
        </div>
      </div>

      {viewerItem && <ViewerDialog item={viewerItem} onClose={() => setViewerItem(null)} />}
    </main>
  );
}
