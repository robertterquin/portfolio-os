import { useCallback, useEffect, useState } from 'react';
import { AboutApp } from '../apps/AboutApp';
import { AppContent } from '../apps/AppContent';
import type { ViewerItem } from '../apps/parts';
import { aboutApp, sectionApps, stackApp, type AppId } from '../apps/registry';
import { TechStackApp } from '../apps/TechStackApp';
import { ViewerDialog } from '../apps/ViewerDialog';
import { sections } from '../content';
import { readHashApp, replaceHash } from '../lib/hash';
import { Window } from '../os';
import './ListView.css';

const requirementOf = new Map(sections.map((s) => [s.id as AppId, s.requirement]));

function scrollToSection(id: AppId) {
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = document.getElementById(`list-${id}`);
  // Focus first: moving focus during a smooth scroll can cancel the scroll.
  el?.focus({ preventScroll: true });
  el?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

/** Every section on one plain scrolling page, in the order the requirement lists them. */
export function ListView() {
  const [viewerItem, setViewerItem] = useState<ViewerItem | null>(null);

  const goTo = useCallback((id: AppId) => {
    replaceHash(id === 'about' ? null : id);
    scrollToSection(id);
  }, []);

  // Open on the section named in the link, and follow links like #iot.
  useEffect(() => {
    const fromLink = readHashApp();
    if (fromLink) scrollToSection(fromLink);
    const onHashChange = () => {
      const id = readHashApp();
      if (id) goTo(id);
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
            {sectionApps.map((app) => (
              <li key={app.id}>
                <a
                  href={`#${app.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(app.id);
                  }}
                >
                  {requirementOf.get(app.id)}
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
            <AboutApp onOpenApp={goTo} />
          </Window>

          <Window
            title={stackApp.windowTitle}
            accent={stackApp.accent}
            className="listview__window"
            rootProps={{ id: 'list-stack', tabIndex: -1 }}
          >
            <TechStackApp />
          </Window>

          {sectionApps.map((app, index) => (
            <Window
              key={app.id}
              title={`${index + 1}. ${requirementOf.get(app.id)}`}
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
