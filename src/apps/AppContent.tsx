import { AboutApp } from './AboutApp';
import { AchievementsApp } from './AchievementsApp';
import { CapstoneApp } from './CapstoneApp';
import { CertificateViewer } from './CertificateViewer';
import { CertificationsApp } from './CertificationsApp';
import { CoursesApp } from './CoursesApp';
import { IoTApp } from './IoTApp';
import { LeadershipApp } from './LeadershipApp';
import type { ViewCertificate, ViewerItem } from './parts';
import { ProjectsApp } from './ProjectsApp';
import type { AppId } from './registry';
import { TrophiesApp } from './TrophiesApp';

type AppContentProps = {
  id: AppId;
  onOpenApp: (id: AppId) => void;
  onViewCertificate: ViewCertificate;
  viewerItem: ViewerItem | null;
};

/** Picks the window body for an app. */
export function AppContent({ id, onOpenApp, onViewCertificate, viewerItem }: AppContentProps) {
  switch (id) {
    case 'about':
      return <AboutApp onOpenApp={onOpenApp} />;
    case 'viewer':
      return <CertificateViewer item={viewerItem} />;
    case 'certifications':
      return <CertificationsApp onViewCertificate={onViewCertificate} />;
    case 'courses':
      return <CoursesApp onViewCertificate={onViewCertificate} />;
    case 'iot':
      return <IoTApp />;
    case 'capstone':
      return <CapstoneApp />;
    case 'projects':
      return <ProjectsApp />;
    case 'achievements':
      return <AchievementsApp onViewCertificate={onViewCertificate} />;
    case 'competitions':
      return <TrophiesApp onViewCertificate={onViewCertificate} />;
    case 'leadership':
      return <LeadershipApp />;
  }
}
