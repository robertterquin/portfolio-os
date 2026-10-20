import type { ReactNode } from 'react';
import './AppIntro.css';

/** One line under the window title saying what this window holds. */
export function AppIntro({ children }: { children: ReactNode }) {
  return <p className="app-intro">{children}</p>;
}
