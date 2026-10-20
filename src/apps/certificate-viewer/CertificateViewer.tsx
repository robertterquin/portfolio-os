import { EmptyState, IssuerBadge, LinkButton, MissingList } from '../../components';
import { formatDate } from '../../lib/date';
import { linksOf } from '../../lib/evidence';
import type { ViewerItem } from './viewerItem';
import './CertificateViewer.css';

const isImage = (url: string) => /\.(png|jpe?g|webp|gif|avif)$/i.test(url);

export function CertificateViewer({ item }: { item: ViewerItem | null }) {
  if (!item) {
    return (
      <EmptyState title="No certificate selected">
        <p>Open Certificates and choose an entry to see its certificate.</p>
      </EmptyState>
    );
  }

  const file = item.evidence.find((e) => e.kind === 'certificate');
  const links = linksOf(item.evidence);

  return (
    <div className="viewer">
      <div className="viewer__stage">
        {file && isImage(file.url) && (
          <img
            className="viewer__image"
            src={file.url}
            alt={file.alt ?? `${item.title} certificate`}
          />
        )}
        {file && !isImage(file.url) && (
          <div className="viewer__file">
            <p>This certificate is a PDF.</p>
            <LinkButton href={file.url} variant="accent" target="_blank" rel="noreferrer">
              Open {file.label}
            </LinkButton>
          </div>
        )}
        {!file && (
          <div className="viewer__nofile">
            <IssuerBadge issuer={item.issuer} />
            <p>The certificate file for this entry hasn't been added yet.</p>
          </div>
        )}
      </div>

      <dl className="viewer__details">
        <div>
          <dt>{item.kind}</dt>
          <dd className="viewer__title">{item.title}</dd>
        </div>
        <div>
          <dt>Issued by</dt>
          <dd>{item.issuer}</dd>
        </div>
        {item.credential && (
          <div>
            <dt>{item.kind === 'Competition' ? 'Placement' : 'Credential'}</dt>
            <dd>{item.credential}</dd>
          </div>
        )}
        <div>
          <dt>{item.kind === 'Competition' ? 'Date' : 'Date earned'}</dt>
          <dd>{formatDate(item.date)}</dd>
        </div>
      </dl>

      {links.length > 0 && (
        <div className="viewer__links">
          {links.map((link) => (
            <LinkButton key={link.url} href={link.url}>
              {link.label}
            </LinkButton>
          ))}
        </div>
      )}

      <MissingList missing={item.missing} />
    </div>
  );
}
