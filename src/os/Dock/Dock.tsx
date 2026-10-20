import { Glyph, type GlyphKind } from '../Glyph/Glyph';
import type { Accent } from '../accent';
import './Dock.css';

export type DockItem = {
  id: string;
  label: string;
  kind: GlyphKind;
  accent?: Accent;
};

type DockProps = {
  items: DockItem[];
  /** Ids of apps with an open window; they get a dot under the icon. */
  openIds?: string[];
  onOpen: (id: string) => void;
};

export function Dock({ items, openIds = [], onOpen }: DockProps) {
  return (
    <nav className="dock" aria-label="Dock">
      <ul className="dock__list">
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                className="dock__item"
                onClick={() => onOpen(item.id)}
                aria-label={isOpen ? `${item.label} (open)` : item.label}
              >
                <Glyph kind={item.kind} accent={item.accent} size={40} />
                <span className="dock__tip" aria-hidden="true">
                  {item.label}
                </span>
                {isOpen && <span className="dock__dot" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
