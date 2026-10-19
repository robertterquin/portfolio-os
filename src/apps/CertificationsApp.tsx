import { certifications } from '../content';
import { CredentialList } from './CredentialList';
import { AppIntro, EmptyState, type ViewCertificate } from './parts';
import { certificationItem } from './viewerItems';

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
    </>
  );
}
