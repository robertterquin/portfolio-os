import { useCallback, useMemo, useReducer } from 'react';
import type { AppId } from '../apps/registry';

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  width: number;
  minimized: boolean;
};

type State = {
  windows: Partial<Record<AppId, WindowState>>;
  /** Stacking order, bottom to top. */
  order: AppId[];
};

export type Bounds = { width: number; height: number };

type Action =
  | { type: 'open'; id: AppId; preferredWidth: number; bounds: Bounds }
  | { type: 'close'; id: AppId }
  | { type: 'focus'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number }
  | { type: 'fit'; bounds: Bounds };

/** Keeps at least the title bar on screen. */
export function clampPosition(x: number, y: number, width: number, bounds: Bounds) {
  return {
    x: Math.round(Math.min(Math.max(x, 0), Math.max(0, bounds.width - width))),
    y: Math.round(Math.min(Math.max(y, 0), Math.max(0, bounds.height - 48))),
  };
}

/** New windows cascade from the top-left of the free desktop area. */
function placeNewWindow(
  state: State,
  id: AppId,
  preferredWidth: number,
  bounds: Bounds,
): WindowState {
  const width = Math.min(preferredWidth, bounds.width - 16);
  const visible = state.order.filter((other) => !state.windows[other]?.minimized).length;
  const step = visible % 6;
  // Leave room for the two icon columns on the left when the desktop is wide enough.
  const left = bounds.width >= width + 280 ? 264 : (bounds.width - width) / 2;
  const pos = clampPosition(left + step * 32, 16 + step * 28, width, bounds);
  return { id, width, minimized: false, ...pos };
}

function toTop(order: AppId[], id: AppId) {
  return [...order.filter((other) => other !== id), id];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'open': {
      const existing = state.windows[action.id];
      const win: WindowState = existing
        ? { ...existing, minimized: false }
        : placeNewWindow(state, action.id, action.preferredWidth, action.bounds);
      return {
        windows: { ...state.windows, [action.id]: win },
        order: toTop(state.order, action.id),
      };
    }
    case 'close': {
      if (!state.windows[action.id]) return state;
      const windows = { ...state.windows };
      delete windows[action.id];
      return { windows, order: state.order.filter((id) => id !== action.id) };
    }
    case 'focus': {
      const win = state.windows[action.id];
      if (!win || state.order.at(-1) === action.id) return state;
      return { ...state, order: toTop(state.order, action.id) };
    }
    case 'minimize': {
      const win = state.windows[action.id];
      if (!win) return state;
      // Minimized windows drop to the bottom so the next window becomes active.
      return {
        windows: { ...state.windows, [action.id]: { ...win, minimized: true } },
        order: [action.id, ...state.order.filter((id) => id !== action.id)],
      };
    }
    case 'move': {
      const win = state.windows[action.id];
      if (!win || (win.x === action.x && win.y === action.y)) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...win, x: action.x, y: action.y } },
      };
    }
    case 'fit': {
      let changed = false;
      const windows = { ...state.windows };
      for (const id of state.order) {
        const win = windows[id];
        if (!win) continue;
        const width = Math.min(win.width, action.bounds.width);
        const pos = clampPosition(win.x, win.y, width, action.bounds);
        if (pos.x !== win.x || pos.y !== win.y) {
          windows[id] = { ...win, ...pos };
          changed = true;
        }
      }
      return changed ? { ...state, windows } : state;
    }
  }
}

const emptyState: State = { windows: {}, order: [] };

export type InitialWindow = { id: AppId; preferredWidth: number };

/** Open, close, focus, minimize, and move desktop windows. */
export function useWindowManager(
  getBounds: () => Bounds,
  initialWindows: InitialWindow[] = [],
  initialBounds: Bounds = { width: 1024, height: 700 },
) {
  const [state, dispatch] = useReducer(reducer, null, () =>
    initialWindows.reduce(
      (current, win) => reducer(current, { type: 'open', ...win, bounds: initialBounds }),
      emptyState,
    ),
  );

  const stack = useMemo(
    () => state.order.map((id) => state.windows[id]).filter((w): w is WindowState => !!w),
    [state],
  );
  const activeId = useMemo(
    () => [...stack].reverse().find((w) => !w.minimized)?.id ?? null,
    [stack],
  );

  const open = useCallback(
    (id: AppId, preferredWidth: number) =>
      dispatch({ type: 'open', id, preferredWidth, bounds: getBounds() }),
    [getBounds],
  );

  const close = useCallback((id: AppId) => dispatch({ type: 'close', id }), []);
  const focus = useCallback((id: AppId) => dispatch({ type: 'focus', id }), []);
  const minimize = useCallback((id: AppId) => dispatch({ type: 'minimize', id }), []);
  const move = useCallback(
    (id: AppId, x: number, y: number) => dispatch({ type: 'move', id, x, y }),
    [],
  );
  const fit = useCallback((bounds: Bounds) => dispatch({ type: 'fit', bounds }), []);

  return { stack, activeId, open, close, focus, minimize, move, fit };
}
