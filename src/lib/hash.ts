import { isLinkableTarget, type Target } from '../apps/registry';

/** The app or section named in the address, e.g. #capstone or #courses, or null. */
export function readHashTarget(): Target | null {
  const id = decodeURIComponent(location.hash.slice(1));
  return isLinkableTarget(id) ? id : null;
}

/** Replaces the address without adding a history entry. Pass null for the plain address. */
export function replaceHash(id: Target | null) {
  const url = id ? `#${id}` : `${location.pathname}${location.search}`;
  if (url !== `${location.pathname}${location.search}${location.hash}`) {
    history.replaceState(null, '', url);
  }
}
