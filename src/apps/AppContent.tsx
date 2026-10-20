import { AboutApp } from './about/AboutApp';
import { AchievementsApp } from './achievements/AchievementsApp';
import { CapstoneApp } from './capstone/CapstoneApp';
import { CertificateViewer } from './certificate-viewer/CertificateViewer';
import type { ViewCertificate, ViewerItem } from './certificate-viewer/viewerItem';
import { CertificatesApp } from './certificates/CertificatesApp';
import { IoTApp } from './iot/IoTApp';
import { ProjectsApp } from './projects/ProjectsApp';
import type { AppId, Target } from './registry';
import { TechStackApp } from './tech-stack/TechStackApp';
import { TerminalApp } from './terminal/TerminalApp';

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
