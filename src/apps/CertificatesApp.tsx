import type { ReactNode } from 'react';
import { certifications, competitions, courses, sections, type SectionId } from '../content';
import { CredentialList } from './CredentialList';
import { AppIntro, EmptyState, type ViewCertificate } from './parts';
import { TrophyList } from './TrophyList';
import { certificationItem, courseItem } from './viewerItems';
import './CertificatesApp.css';

/** One required section inside the window. Links like #courses scroll straight to it. */
function Part({ id, count, children }: { id: SectionId; count: number; children: ReactNode }) {
  const section = sections.find((s) => s.id === id)!;
  return (
    <section
      id={`part-${id}`}
      className="cert-part"
      tabIndex={-1}
      aria-labelledby={`part-${id}-title`}
    >
      <h3 id={`part-${id}-title`} className="cert-part__title">
        {section.requirement} <span className="cert-part__count">({count})</span>
      </h3>
      {children}
    </section>
  );
}

export function CertificatesApp({ onViewCertificate }: { onViewCertificate: ViewCertificate }) {
  return (
    <>
      <AppIntro>
        Every certificate in one place, newest first. Open one to see the certificate.
      </AppIntro>

      <Part id="certifications" count={certifications.length}>
        {certifications.length === 0 ? (
          <EmptyState title="No certifications added yet" />
        ) : (
          <CredentialList
            items={certifications.map(certificationItem)}
            onViewCertificate={onViewCertificate}
          />
        )}
      </Part>

      <Part id="courses" count={courses.length}>
        {courses.length === 0 ? (
          <EmptyState title="No course completions added yet" />
        ) : (
          <CredentialList items={courses.map(courseItem)} onViewCertificate={onViewCertificate} />
        )}
      </Part>

      <Part id="competitions" count={competitions.length}>
        {competitions.length === 0 ? (
          <EmptyState title="No competitions added yet" />
        ) : (
          <TrophyList onViewCertificate={onViewCertificate} />
        )}
      </Part>
    </>
  );
}
