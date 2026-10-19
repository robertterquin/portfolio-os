import { useState } from 'react';
import { useMediaQuery } from './lib/useMediaQuery';
import { useTheme } from './lib/theme';
import { MenuBar } from './os';
import { DesktopView } from './views/DesktopView';
import { ListView } from './views/ListView';
import { PhoneHome } from './views/PhoneHome';
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

/**
 * Picks one of three views of the same content:
 * List view (one scrolling page), the phone home screen, or the desktop.
 */
export default function App() {
  const { theme, toggleTheme } = useTheme();
  const isPhone = useMediaQuery('(max-width: 767px)');
  const [listView, setListView] = useState(readListViewPref);

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
    <div className="shell">
      <h1 className="visually-hidden">Robert Terquin Laqui, student portfolio</h1>
      <MenuBar
        listView={listView}
        onToggleListView={toggleListView}
        theme={theme}
        onToggleTheme={toggleTheme}
        // Every view opens About Me from the #about link.
        onOpenAbout={() => (location.hash = 'about')}
      />
      {listView ? <ListView /> : isPhone ? <PhoneHome /> : <DesktopView />}
    </div>
  );
}
