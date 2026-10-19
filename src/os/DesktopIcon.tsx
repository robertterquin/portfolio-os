import type { ButtonHTMLAttributes } from 'react';
import { Glyph, type GlyphKind } from './Glyph';
import type { Accent } from './types';
import './DesktopIcon.css';

type DesktopIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  kind?: GlyphKind;
  accent?: Accent;
  /** Small count bubble, e.g. entries waiting on details. */
  badge?: number;
  badgeLabel?: string;
  selected?: boolean;
};

export function DesktopIcon({
  label,
  kind = 'folder',
  accent = 'yellow',
  badge,
  badgeLabel,
  selected = false,
  className = '',
  ...buttonProps
}: DesktopIconProps) {
  return (
    <button
      type="button"
      className={`dicon ${className}`}
      data-selected={selected}
      {...buttonProps}
    >
      <span className="dicon__glyph">
        <Glyph kind={kind} accent={accent} />
        {badge !== undefined && badge > 0 && (
          <span className="dicon__badge" aria-label={badgeLabel}>
            {badge}
          </span>
        )}
      </span>
      <span className="dicon__label">{label}</span>
    </button>
  );
}
