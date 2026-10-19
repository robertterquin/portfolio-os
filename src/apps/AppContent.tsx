import { AboutApp } from './AboutApp';
import { AchievementsApp } from './AchievementsApp';
import { CapstoneApp } from './CapstoneApp';
import { CertificateViewer } from './CertificateViewer';
import { CertificatesApp } from './CertificatesApp';
import { IoTApp } from './IoTApp';
import type { ViewCertificate, ViewerItem } from './parts';
import { ProjectsApp } from './ProjectsApp';
import type { AppId, Target } from './registry';
import { TechStackApp } from './TechStackApp';
import { TerminalApp } from './TerminalApp';

type AppContentProps = {
  id: AppId;
  onOpenApp: (target: Target) => void;
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
    case 'certificates':
      return <CertificatesApp onViewCertificate={onViewCertificate} />;
    case 'iot':
      return <IoTApp />;
    case 'capstone':
      return <CapstoneApp />;
    case 'projects':
      return <ProjectsApp />;
    case 'achievements':
      return <AchievementsApp onViewCertificate={onViewCertificate} />;
    case 'stack':
      return <TechStackApp />;
    case 'terminal':
      return <TerminalApp onOpenApp={onOpenApp} />;
  }
}
