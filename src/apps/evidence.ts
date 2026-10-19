import type { Evidence } from '../content';

export const photosOf = (evidence: Evidence[]) => evidence.filter((e) => e.kind === 'photo');
export const linksOf = (evidence: Evidence[]) =>
  evidence.filter((e) => e.kind !== 'photo' && e.kind !== 'certificate');
export const hasCertificateFile = (evidence: Evidence[]) =>
  evidence.some((e) => e.kind === 'certificate');
