import { useCallback, useEffect, useRef, useState } from 'react';
import { AppContent } from '../../apps/AppContent';
import type { ViewerItem } from '../../apps/certificate-viewer/viewerItem';
import {
  aboutApp,
  folderApps,
  getApp,
  pendingCountOf,
  resolveTarget,
  type AppId,
  type Target,
} from '../../apps/registry';
import { ViewerDialog } from '../../apps/certificate-viewer/ViewerDialog';
import { profile } from '../../content';
import { readHashTarget, replaceHash } from '../../lib/hash';
import { revealElement } from '../../lib/reveal';
import { accentClass, DesktopIcon } from '../../os';
import './PhoneView.css';

/** The app named in the address, and the part of it to scroll to. */
function appInHash(): { app: AppId | null; part?: string } {
  const target = readHashTarget();
  return target ? resolveTarget(target) : { app: null };
}

/** Phones: a home screen of app icons. Each app opens full screen with a Back button. */
export function PhoneView() {
  const [activeId, setActiveId] = useState<AppId | null>(() => appInHash().app);
  const [viewerItem, setViewerItem] = useState<ViewerItem | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  // The part of the app a link asked for, e.g. #courses inside Certificates.
  const pendingPart = useRef<string | undefined>(appInHash().part);

  // The address drives which app is open, so the phone's own back gesture closes it.
  useEffect(() => {
    const onHashChange = () => {
      const { app, part } = appInHash();
      pendingPart.current = part;
      setActiveId(app);
      // Already open: the effect below won't run again, so scroll here.
      if (part && revealElement(`part-${part}`)) pendingPart.current = undefined;
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openApp = useCallback((target: Target) => {
    location.hash = target;
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
      const part = pendingPart.current;
      pendingPart.current = undefined;
      if (!part || !revealElement(`part-${part}`, { animate: false })) headingRef.current?.focus();
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
        <div className="phone__intro">
          <img
            className="phone__photo"
            src={profile.photo.url}
            alt={profile.photo.alt}
            width={320}
            height={320}
          />
          <div>
            <p className="phone__hello">Hi, I'm Robert.</p>
            <p className="phone__sub">
              {profile.yearLevel}, {profile.program}, {profile.school}
            </p>
          </div>
        </div>
        <p className="phone__hint">Tap an app to open a section.</p>
      </section>

      <nav className="phone__grid" aria-label="Portfolio sections">
        {folderApps.map((app) => {
          const pending = pendingCountOf(app);
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
          data-app-id="stack"
          className="phone__icon"
          label="Tech Stack"
          kind="app"
          accent="mint"
          onClick={() => openApp('stack')}
        />
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
        <DesktopIcon
          data-app-id="terminal"
          className="phone__icon"
          label="Terminal"
          kind="terminal"
          onClick={() => openApp('terminal')}
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
