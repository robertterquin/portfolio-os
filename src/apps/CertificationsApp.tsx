import { certifications, competitions, courses } from '../content';
import { formatDate } from '../lib/date';
import { Button } from '../os';
import { CredentialList } from './CredentialList';
import { hasCertificateFile } from './evidence';
import { AppIntro, Block, EmptyState, IssuerBadge, type ViewCertificate } from './parts';
import { certificationItem, competitionItem, courseItem } from './viewerItems';
import './CertificationsApp.css';

// The other certificates live in their own required sections. They're repeated here so
// every certificate can be opened from one place, as on robertterquin.com.
const otherCertificates = [
  ...courses
    .filter((c) => hasCertificateFile(c.evidence))
    .map((c) => ({ item: courseItem(c), section: 'Course completions' })),
  ...competitions
    .filter((c) => hasCertificateFile(c.evidence))
    .map((c) => ({ item: competitionItem(c), section: 'Competitions and awards' })),
];

export function CertificationsApp({ onViewCertificate }: { onViewCertificate: ViewCertificate }) {
  return (
    <>
      <AppIntro>Industry certifications, newest first. Open one to see the certificate.</AppIntro>
      {certifications.length === 0 ? (
        <EmptyState title="No certifications added yet" />
      ) : (
        <CredentialList
          items={certifications.map(certificationItem)}
          onViewCertificate={onViewCertificate}
        />
      )}

      {otherCertificates.length > 0 && (
        <Block title="More certificates">
          <p className="more-certs__note">
            These belong to other sections of this portfolio, and are listed here so every
            certificate is in one place.
          </p>
          <ul className="more-certs">
            {otherCertificates.map(({ item, section }) => (
              <li key={item.title} className="more-certs__row">
                <IssuerBadge issuer={item.issuer} />
                <div className="more-certs__main">
                  <p className="more-certs__title">{item.title}</p>
                  <p className="more-certs__meta">
                    {item.credential ? `${item.credential} · ` : ''}
                    {formatDate(item.date)} · listed under {section}
                  </p>
                </div>
                <Button onClick={() => onViewCertificate(item)}>View certificate</Button>
              </li>
            ))}
          </ul>
        </Block>
      )}
    </>
  );
}
