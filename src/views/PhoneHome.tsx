import { useCallback, useEffect, useRef, useState } from 'react';
import { AppContent } from '../apps/AppContent';
import type { ViewerItem } from '../apps/parts';
import { aboutApp, getApp, sectionApps, type AppId } from '../apps/registry';
import { ViewerDialog } from '../apps/ViewerDialog';
import { profile, sections, type SectionId } from '../content';
import { readHashApp, replaceHash } from '../lib/hash';
import { accentClass, DesktopIcon } from '../os';
import './PhoneHome.css';

const pendingBySection = new Map(sections.map((s) => [s.id, s.pendingCount]));

/** Phones: a home screen of app icons. Each app opens full screen with a Back button. */
export function PhoneHome() {
  const [activeId, setActiveId] = useState<AppId | null>(readHashApp);
  const [viewerItem, setViewerItem] = useState<ViewerItem | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The address drives which app is open, so the phone's own back gesture closes it.
  useEffect(() => {
    const onHashChange = () => setActiveId(readHashApp());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openApp = useCallback((id: AppId) => {
    location.hash = id;
  }, []);

  const goHome = useCallback(() => {
    replaceHash(null);
    setActiveId(null);
  }, []);

  // Move focus to the app's title when it opens, and back to its icon when it closes.
  const lastOpened = useRef<AppId | null>(null);
  useEffect(() => {
    if (activeId) {
      lastOpened.current = activeId;
      headingRef.current?.focus();
    } else if (lastOpened.current) {
      document.querySelector<HTMLElement>(`[data-app-id="${lastOpened.current}"]`)?.focus();
    }
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !viewerItem) goHome();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeId, viewerItem, goHome]);

  const active = activeId ? getApp(activeId) : null;

  return (
    <main className="phone" aria-label="Home screen">
      <section className="phone__widget" aria-label="About Robert">
        <p className="phone__hello">Hi, I'm Robert.</p>
        <p className="phone__sub">
          {profile.program}, {profile.school}
        </p>
        <p className="phone__hint">Tap an app to open a section.</p>
      </section>

      <nav className="phone__grid" aria-label="Portfolio sections">
        {sectionApps.map((app) => {
          const pending = pendingBySection.get(app.id as SectionId) ?? 0;
          return (
            <DesktopIcon
              key={app.id}
              data-app-id={app.id}
              className="phone__icon"
              label={app.label}
              kind="app"
              accent={app.accent}
              badge={pending}
              badgeLabel={`${pending} waiting on details`}
              onClick={() => openApp(app.id)}
            />
          );
        })}
        <DesktopIcon
          data-app-id="about"
          className="phone__icon"
          label="About me"
          kind="file"
          onClick={() => openApp('about')}
        />
        <DesktopIcon
          className="phone__icon"
          label="Resume"
          kind="file"
          onClick={() => window.open(profile.links.resume, '_blank', 'noopener')}
        />
      </nav>

      {active && (
        <section
          className={`phone__app ${accentClass(active.accent)}`}
          aria-labelledby="phone-app-title"
        >
          <header className="phone__appbar">
            <button type="button" className="phone__back" onClick={goHome}>
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M7.5 2L3.5 6l4 4" />
              </svg>
              Home
            </button>
            <h2 id="phone-app-title" ref={headingRef} tabIndex={-1}>
              {active.id === 'about' ? aboutApp.windowTitle : active.windowTitle}
            </h2>
          </header>
          <div className="phone__appbody">
            <AppContent
              id={active.id}
              onOpenApp={openApp}
              onViewCertificate={setViewerItem}
              viewerItem={viewerItem}
            />
          </div>
        </section>
      )}

      {viewerItem && <ViewerDialog item={viewerItem} onClose={() => setViewerItem(null)} />}
    </main>
  );
}
