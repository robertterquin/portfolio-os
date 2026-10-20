import { accentClass, type Accent } from '../accent';
import './Glyph.css';

export type GlyphKind = 'folder' | 'file' | 'app' | 'terminal';

type GlyphProps = {
  kind: GlyphKind;
  accent?: Accent;
  size?: number;
};

/** Desktop and dock icons. Decorative: the label next to it carries the meaning. */
export function Glyph({ kind, accent = 'yellow', size = 48 }: GlyphProps) {
  return (
    <svg
      className={`glyph ${accentClass(accent)}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'folder' && (
        <>
          <path
            className="glyph__shadow"
            d="M8 15a3 3 0 0 1 3-3h11l4 5h17a3 3 0 0 1 3 3v21a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z"
          />
          <path
            className="glyph__fill"
            d="M5 12a3 3 0 0 1 3-3h11l4 5h17a3 3 0 0 1 3 3v21a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z"
          />
          <path className="glyph__detail" d="M5 19h38" />
        </>
      )}
      {kind === 'file' && (
        <>
          <path className="glyph__shadow" d="M13 7h17l10 10v27a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2z" />
          <path className="glyph__paper" d="M10 4h17l10 10v27a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2z" />
          <path className="glyph__detail" d="M27 4v10h10M16 22h15M16 28h15M16 34h10" />
        </>
      )}
      {kind === 'app' && (
        <>
          <rect className="glyph__shadow" x="9" y="9" width="36" height="36" rx="9" />
          <rect className="glyph__fill" x="5" y="5" width="36" height="36" rx="9" />
          <rect className="glyph__paper" x="12" y="14" width="22" height="18" rx="3" />
          <path className="glyph__detail" d="M12 19h22" />
        </>
      )}
      {kind === 'terminal' && (
        <>
          <rect className="glyph__shadow" x="9" y="9" width="36" height="36" rx="9" />
          <rect className="glyph__ink" x="5" y="5" width="36" height="36" rx="9" />
          <path className="glyph__prompt" d="M13 17l7 6-7 6M23 30h10" />
        </>
      )}
    </svg>
  );
}
