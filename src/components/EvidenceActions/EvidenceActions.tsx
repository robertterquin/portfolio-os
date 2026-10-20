import type { Evidence } from '../../content';
import { hasCertificateFile, linksOf } from '../../lib/evidence';
import { Button, LinkButton } from '../Button/Button';
import './EvidenceActions.css';

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
