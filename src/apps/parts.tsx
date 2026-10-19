import type { ReactNode } from 'react';
import type { DateString, Evidence, ProjectStatus } from '../content';
import { Button, LinkButton } from '../os';
import { hasCertificateFile, linksOf } from './evidence';
import './parts.css';

/** Anything that can open in the Certificate Viewer. */
export type ViewerItem = {
  kind: 'Certification' | 'Course completion' | 'Competition' | 'Achievement';
  title: string;
  issuer: string;
  date: DateString;
  /** Credential name or placement, e.g. "Oracle Certified Foundations Associate". */
  credential?: string;
  evidence: Evidence[];
  missing?: string[];
};

export type ViewCertificate = (item: ViewerItem) => void;

/** One line under the window title saying which requirement this window answers. */
export function AppIntro({ children }: { children: ReactNode }) {
  return <p className="app-intro">{children}</p>;
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="app-block">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export function Chips({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const statusLabels: Record<ProjectStatus, string> = {
  planning: 'Planning',
  'in-progress': 'In progress',
  completed: 'Completed',
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className="status-pill" data-status={status}>
      {statusLabels[status]}
    </span>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="progress">
      <div className="progress__label">
        <span>{label}</span>
        <span>{clamped}%</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="progress__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      {children && <div className="empty-state__body">{children}</div>}
    </div>
  );
}

/** Lists the details Robert still has to send for this entry. */
export function MissingList({
  missing,
  title = 'Still to add',
}: {
  missing?: string[];
  title?: string;
}) {
  if (!missing || missing.length === 0) return null;
  return (
    <aside className="missing" aria-label={title}>
      <p className="missing__title">{title}</p>
      <ul>
        {missing.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

const issuerBadges: Record<string, string> = {
  Certiport: 'ITS',
  'Oracle Academy': 'OA',
  CodeChum: 'CC',
  'Cisco Networking Academy': 'NA',
  'AWS Academy': 'AWS',
  Coursera: 'CO',
  Google: 'G',
  Microsoft: 'MS',
  'Microsoft Learn': 'MS',
  Udemy: 'U',
};

export function IssuerBadge({ issuer }: { issuer: string }) {
  const known = issuerBadges[issuer];
  const text =
    known ??
    issuer
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  return (
    <span className="issuer-badge" aria-hidden="true">
      {text}
    </span>
  );
}

/** Link buttons for an entry's evidence. Certificate files open in the Certificate Viewer. */
export function EvidenceActions({
  evidence,
  onViewCertificate,
}: {
  evidence: Evidence[];
  onViewCertificate?: () => void;
}) {
  const links = linksOf(evidence);
  if (!onViewCertificate && links.length === 0) return null;
  return (
    <div className="evidence-actions">
      {onViewCertificate && (
        <Button onClick={onViewCertificate}>
          {hasCertificateFile(evidence) ? 'View certificate' : 'View details'}
        </Button>
      )}
      {links.map((link) => (
        <LinkButton key={link.url} href={link.url}>
          {link.label}
        </LinkButton>
      ))}
    </div>
  );
}

export function Gallery({ photos }: { photos: Evidence[] }) {
  if (photos.length === 0) return null;
  return (
    <div className="gallery">
      {photos.map((photo) => (
        <figure key={photo.url}>
          <img src={photo.url} alt={photo.alt ?? ''} loading="lazy" />
          <figcaption>{photo.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
