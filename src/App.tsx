import { useEffect, useState } from 'react';
import { profile, sections, type SectionId } from './content';
import { useMediaQuery } from './lib/useMediaQuery';
import { useTheme } from './lib/theme';
import { REBOOT_EVENT } from './lib/wallpaper';
import { BootScreen, MenuBar } from './os';
import { DesktopView } from './views/desktop/DesktopView';
import { ListView } from './views/list/ListView';
import { PhoneView } from './views/phone/PhoneView';
import './App.css';

const LIST_VIEW_KEY = 'student-os:list-view';

/** A link with ?view=list opens List view, e.g. for a grader. Otherwise the last choice wins. */
function readListViewPref() {
  if (new URLSearchParams(location.search).get('view') === 'list') return true;
  try {
    return localStorage.getItem(LIST_VIEW_KEY) === 'on';
  } catch {
    return false;
  }
}

const BOOT_KEY = 'student-os:booted';

/** The boot sequence plays once per browser, and never for visitors who prefer less motion. */
function shouldBoot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return localStorage.getItem(BOOT_KEY) !== 'yes';
  } catch {
    return false;
  }
}

/** Startup log lines, built from the real content counts. */
function bootLines() {
  const section = (id: SectionId) => sections.find((s) => s.id === id);
  const found = (id: SectionId) => `${section(id)?.entryCount ?? 0} found`;
  const pendingIoT = (section('iot')?.pendingCount ?? 0) + (section('capstone')?.pendingCount ?? 0);
  return [
    `student.os v1.0 for ${profile.displayName}`,
    `Checking certifications ... ${found('certifications')}`,
    `Checking course completions ... ${found('courses')}`,
    `Loading projects ... ${found('projects')}`,
    `Loading trophies ... ${found('competitions')}`,
    `Mounting IoT Lab and Capstone ... ${pendingIoT > 0 ? 'details coming soon' : 'ready'}`,
    'Ready.',
  ];
}

/**
 * Picks one of three views of the same content:
 * List view (one scrolling page), the phone home screen, or the desktop.
 */
export default function App() {
  const { theme, toggleTheme } = useTheme();
  const isPhone = useMediaQuery('(max-width: 767px)');
  const [listView, setListView] = useState(readListViewPref);
  const [booting, setBooting] = useState(shouldBoot);
  const [lines] = useState(bootLines);

  // The terminal's hidden reboot command replays the boot sequence.
  useEffect(() => {
    const onReboot = () => setBooting(true);
    window.addEventListener(REBOOT_EVENT, onReboot);
    return () => window.removeEventListener(REBOOT_EVENT, onReboot);
  }, []);

  const finishBoot = () => {
    setBooting(false);
    try {
      localStorage.setItem(BOOT_KEY, 'yes');
    } catch {
      // Storage can be blocked; the boot sequence may play again next visit.
    }
  };

  const toggleListView = () => {
    const next = !listView;
    setListView(next);
    // Keep the address in step so it can be shared as-is.
    const url = new URL(location.href);
    if (next) url.searchParams.set('view', 'list');
    else url.searchParams.delete('view');
    history.replaceState(null, '', url);
    try {
      localStorage.setItem(LIST_VIEW_KEY, next ? 'on' : 'off');
    } catch {
      // Storage can be blocked; the view still changes for this visit.
    }
  };

  return (
    <>
      <div className="shell" inert={booting}>
        <h1 className="visually-hidden">Robert Terquin Laqui, student portfolio</h1>
        <MenuBar
          listView={listView}
          onToggleListView={toggleListView}
          theme={theme}
          onToggleTheme={toggleTheme}
          // Every view opens About Me from the #about link.
          onOpenAbout={() => (location.hash = 'about')}
        />
        {listView ? <ListView /> : isPhone ? <PhoneView /> : <DesktopView />}
      </div>
      {booting && <BootScreen lines={lines} onDone={finishBoot} />}
    </>
  );
}
