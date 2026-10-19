import { formatDate } from '../lib/date';
import { PendingTag } from '../os';
import { EvidenceActions, IssuerBadge, type ViewCertificate, type ViewerItem } from './parts';
import { byYear } from './viewerItems';
import './CredentialList.css';

type CredentialListProps = {
  items: ViewerItem[];
  onViewCertificate: ViewCertificate;
};

/** Certificates and course completions on a year-by-year timeline, newest first. */
export function CredentialList({ items, onViewCertificate }: CredentialListProps) {
  return (
    <ol className="cred-years">
      {byYear(items, (item) => item.date).map(([year, entries]) => (
        <li key={year} className="cred-year">
          <h3 className="cred-year__label">{year}</h3>
          <ul className="cred-list">
            {entries.map((item) => (
              <li key={item.title} className="cred">
                <IssuerBadge issuer={item.issuer} />
                <div className="cred__main">
                  <div className="cred__head">
                    <p className="cred__title">{item.title}</p>
                    <time className="cred__date">{formatDate(item.date)}</time>
                  </div>
                  <p className="cred__meta">
                    {item.issuer}
                    {item.credential && ` · ${item.credential}`}
                  </p>
                  <div className="cred__foot">
                    <EvidenceActions
                      evidence={item.evidence}
                      onViewCertificate={() => onViewCertificate(item)}
                    />
                    <PendingTag missing={item.missing} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
