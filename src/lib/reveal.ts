/** The nearest ancestor that actually scrolls: a window body, the phone app, or List view. */
function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const { overflowY } = getComputedStyle(p);
    if ((overflowY === 'auto' || overflowY === 'scroll') && p.scrollHeight > p.clientHeight) {
      return p;
    }
  }
  return null;
}

function scrollTo(el: HTMLElement, smooth: boolean) {
  const scroller = scrollParent(el);
  if (!scroller) return;
  const box = scroller.getBoundingClientRect();
  // A window that is still playing its open animation is scaled down; measure unscaled.
  const scale = box.height / scroller.offsetHeight || 1;
  const padding = parseFloat(getComputedStyle(scroller).scrollPaddingTop) || 0;
  const offset = (el.getBoundingClientRect().top - box.top) / scale - padding;
  scroller.scrollTo({ top: scroller.scrollTop + offset, behavior: smooth ? 'smooth' : 'instant' });
}

/**
 * Moves focus to an element and scrolls only its own scroll container, so the desktop and
 * the windows around it stay where they are. Returns false if the element isn't on the page.
 */
export function revealElement(id: string, { animate = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const smooth = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Focus first: moving focus during a smooth scroll can cancel the scroll.
  el.focus({ preventScroll: true });
  // Chrome ignores scrolling a window that was created in this same task, so wait one tick.
  setTimeout(() => scrollTo(el, smooth), 0);
  // On page load the web fonts can arrive after the jump and change the height of everything
  // above the target, so jump again once they're in.
  if (!smooth && document.fonts.status !== 'loaded') {
    void document.fonts.ready.then(() => setTimeout(() => scrollTo(el, false), 0));
  }
  return true;
}
