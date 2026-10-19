import { courses } from '../content';
import { CredentialList } from './CredentialList';
import { AppIntro, EmptyState, type ViewCertificate } from './parts';
import { courseItem } from './viewerItems';

export function CoursesApp({ onViewCertificate }: { onViewCertificate: ViewCertificate }) {
  return (
    <>
      <AppIntro>
        Completed courses and training programs from recognized learning platforms.
      </AppIntro>
      {courses.length === 0 ? (
        <EmptyState title="Course completions are being added">
          <p>
            Each course will show its title, platform (such as Cisco Networking Academy, AWS
            Academy, or Coursera), completion date, and certificate.
          </p>
        </EmptyState>
      ) : (
        <CredentialList items={courses.map(courseItem)} onViewCertificate={onViewCertificate} />
      )}
    </>
  );
}
