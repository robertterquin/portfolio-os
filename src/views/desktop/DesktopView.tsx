import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { AppContent } from '../../apps/AppContent';
import type { ViewerItem } from '../../apps/certificate-viewer/viewerItem';
import {
  aboutApp,
  dockAppIds,
  folderApps,
  getApp,
  pendingCountOf,
  resolveTarget,
  stackApp,
  terminalApp,
  type AppId,
  type Target,
} from '../../apps/registry';
import { readHashTarget, replaceHash } from '../../lib/hash';
import { revealElement } from '../../lib/reveal';
import { DesktopIcon, Dock, StickyNote, Window, type DockItem } from '../../os';
import { clampPosition, useWindowManager, type Bounds } from '../../os/windowManager';
import './DesktopView.css';

const dockItems: DockItem[] = dockAppIds.map((id) => {
  const app = getApp(id);
  const kind = app.icon === 'folder' ? 'app' : app.icon;
  return { id, label: app.label, kind, accent: app.accent };
});

/** Single click selects an icon, double click opens it. Keyboard and touch open on one press. */
function opensOnSingleClick(event: MouseEvent) {
  return event.detail === 0 || window.matchMedia('(hover: none)').matches;
}

/** The desktop area is the viewport minus the menu bar. Measured precisely after mount. */
function viewportBounds(): Bounds {
  return { width: window.innerWidth, height: window.innerHeight - 32 };
}

/** First load: About Me, plus the window named in the link (e.g. #capstone) on top. */
function initialWindows() {
  const target = readHashTarget();
  const fromLink = target ? resolveTarget(target).app : null;
  const ids: AppId[] = ['about'];
  if (fromLink && fromLink !== 'about') ids.push(fromLink);
  return ids.map((id) => ({ id, preferredWidth: getApp(id).width }));
}

/** A first-load link to part of a window, e.g. #courses, scrolls there once the window renders. */
function linkedPart() {
  const target = readHashTarget();
  const resolved = target ? resolveTarget(target) : null;
  return resolved?.part ? resolved : null;
}

export function DesktopView() {
  const deskRef = useRef<HTMLElement>(null);
  const [bounds, setBounds] = useState<Bounds>(viewportBounds);
  const boundsRef = useRef<Bounds>(bounds);
  const getBounds = useCallback(() => boundsRef.current, []);
  const [firstWindows] = useState(initialWindows);
  const { open, close, focus, minimize, move, fit, stack, activeId } = useWindowManager(
    getBounds,
    firstWindows,
    bounds,
  );

  const [selected, setSelected] = useState<AppId | null>('certificates');
  const [viewerItem, setViewerItem] = useState<ViewerItem | null>(null);
  const windowEls = useRef(new Map<AppId, HTMLElement>());
  // The window to focus once it renders, and the part of it a link asked for (#courses).
  const [firstPart] = useState(linkedPart);
  const pendingFocus = useRef<{ app: AppId; part?: string; animate?: boolean } | null>(
    // Landing on a link jumps straight to the part; later jumps animate.
    firstPart && { ...firstPart, animate: false },
  );

  // Track the desktop size so windows stay reachable when the browser is resized.
  useLayoutEffect(() => {
    const el = deskRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const next = { width: el.clientWidth, height: el.clientHeight };
      boundsRef.current = next;
      setBounds(next);
      fit(next);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [fit]);

  const focusWindow = (id: AppId, part?: string, animate = true) => {
    if (part && revealElement(`part-${part}`, { animate })) return;
    const el = windowEls.current.get(id);
    if (el && !el.contains(document.activeElement)) el.focus();
  };

  const openApp = useCallback(
    (target: Target) => {
      const { app: id, part } = resolveTarget(target);
      open(id, getApp(id).width);
      if (id !== 'viewer') setSelected(id);
      // Focus now if the window is already on screen, otherwise once it renders.
      if (windowEls.current.has(id)) focusWindow(id, part);
      else pendingFocus.current = { app: id, part };
    },
    [open],
  );

  const viewCertificate = useCallback(
    (item: ViewerItem) => {
      setViewerItem(item);
      openApp('viewer');
    },
    [openApp],
  );

  // Move keyboard focus into a window the visitor just opened.
  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending || !windowEls.current.has(pending.app)) return;
    pendingFocus.current = null;
    focusWindow(pending.app, pending.part, pending.animate);
  }, [stack]);

  const returnFocusToIcon = (id: AppId) => {
    document.querySelector<HTMLElement>(`[data-app-id="${id}"]`)?.focus();
  };

  const closeApp = useCallback(
    (id: AppId) => {
      close(id);
      returnFocusToIcon(id);
    },
    [close],
  );

  const minimizeApp = (id: AppId) => {
    minimize(id);
    returnFocusToIcon(id);
  };

  // Links like #iot open that window, including links inside other windows.
  useEffect(() => {
    const onHashChange = () => {
      const target = readHashTarget();
      if (target) openApp(target);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [openApp]);

  // Keep the address bar pointing at the active window, so it can be shared.
  // About Me is the home screen, so it gets the plain address.
  // The Certificate Viewer can't be linked to, so the address keeps the window behind it.
  useEffect(() => {
    if (activeId === 'viewer') return;
    replaceHash(activeId && activeId !== 'about' ? activeId : null);
  }, [activeId]);

  // Esc closes the active window.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !activeId) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select')) return;
      closeApp(activeId);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeId, closeApp]);

  const startDrag = (id: AppId) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
    const win = stack.find((w) => w.id === id);
    const bar = event.currentTarget;
    const width = bar.parentElement?.offsetWidth ?? win?.width ?? 0;
    if (!win) return;
    event.preventDefault();
    focus(id);
    bar.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startY = event.clientY;

    const onMove = (e: PointerEvent) => {
      const pos = clampPosition(
        win.x + e.clientX - startX,
        win.y + e.clientY - startY,
        width,
        boundsRef.current,
      );
      move(id, pos.x, pos.y);
    };
    const onEnd = () => {
      bar.removeEventListener('pointermove', onMove);
      bar.removeEventListener('pointerup', onEnd);
      bar.removeEventListener('pointercancel', onEnd);
    };
    bar.addEventListener('pointermove', onMove);
    bar.addEventListener('pointerup', onEnd);
    bar.addEventListener('pointercancel', onEnd);
  };

  const iconProps = (id: AppId) => ({
    'data-app-id': id,
    selected: selected === id,
    onClick: (event: MouseEvent) => (opensOnSingleClick(event) ? openApp(id) : setSelected(id)),
    onDoubleClick: () => openApp(id),
  });

  const openIds = stack.map((w) => w.id);

  return (
    <main
      ref={deskRef}
      className="desk"
      aria-label="Desktop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) setSelected(null);
      }}
    >
      <nav className="desk__icons" aria-label="Portfolio sections">
        {folderApps.map((app) => {
          const pending = pendingCountOf(app);
          return (
            <DesktopIcon
              key={app.id}
              label={app.label}
              kind={app.icon}
              accent={app.accent}
              badge={pending}
              badgeLabel={`${pending} waiting on details`}
              {...iconProps(app.id)}
            />
          );
        })}
        <DesktopIcon
          label={stackApp.label}
          kind="folder"
          accent={stackApp.accent}
          {...iconProps('stack')}
        />
        <DesktopIcon label={aboutApp.label} kind="file" {...iconProps('about')} />
        <DesktopIcon
          label="resume.pdf"
          kind="file"
          selected={false}
          onClick={() => window.open('/resume.pdf', '_blank', 'noopener')}
        />
        <DesktopIcon label={terminalApp.label} kind="terminal" {...iconProps('terminal')} />
      </nav>

      {stack.map((win, index) => {
        if (win.minimized) return null;
        const app = getApp(win.id);
        return (
          <Window
            key={win.id}
            ref={(el) => {
              if (el) windowEls.current.set(win.id, el);
              else windowEls.current.delete(win.id);
            }}
            title={app.windowTitle}
            accent={app.accent}
            active={win.id === activeId}
            onClose={() => closeApp(win.id)}
            onMinimize={() => minimizeApp(win.id)}
            className="desk__window"
            style={{
              left: win.x,
              top: win.y,
              width: win.width,
              maxHeight: Math.max(220, bounds.height - win.y - 96),
              zIndex: 10 + index,
            }}
            rootProps={{
              id: `win-${win.id}`,
              tabIndex: -1,
              onPointerDownCapture: () => focus(win.id),
              onFocusCapture: () => focus(win.id),
            }}
            titleBarProps={{ onPointerDown: startDrag(win.id) }}
          >
            <AppContent
              id={win.id}
              onOpenApp={openApp}
              onViewCertificate={viewCertificate}
              viewerItem={viewerItem}
            />
          </Window>
        );
      })}

      {bounds.width >= 900 && (
        <StickyNote className="desk__sticky" tilt={3}>
          double-click a folder to open it. drag windows by their title bar!
        </StickyNote>
      )}

      <div className="desk__dock">
        <Dock items={dockItems} openIds={openIds} onOpen={(id) => openApp(id as AppId)} />
      </div>
    </main>
  );
}
