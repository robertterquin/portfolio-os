import type { CSSProperties, ReactNode } from 'react';
import './StickyNote.css';

type StickyNoteProps = {
  children: ReactNode;
  /** Tilt in degrees. Keep it small: -4 to 4. */
  tilt?: number;
  className?: string;
  style?: CSSProperties;
};

/** A handwritten hint. Use at most two on screen, and never for required information. */
export function StickyNote({ children, tilt = 3, className = '', style }: StickyNoteProps) {
  return (
    <aside className={`sticky ${className}`} style={{ rotate: `${tilt}deg`, ...style }}>
      {children}
    </aside>
  );
}
