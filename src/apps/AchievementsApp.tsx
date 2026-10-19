import { achievements, type AchievementKind } from '../content';
import { formatRange } from '../lib/date';
import { PendingTag } from '../os';
import { hasCertificateFile } from './evidence';
import { AppIntro, EmptyState, EvidenceActions, type ViewCertificate } from './parts';
import { achievementItem } from './viewerItems';
import './listApps.css';

const kindLabels: Record<AchievementKind, string> = {
  award: 'Award',
  scholarship: 'Scholarship',
  recognition: 'Recognition',
  training: 'Training',
  workshop: 'Workshop',
  conference: 'Conference',
  presentation: 'Presentation',
  participation: 'Participation',
  work: 'Work experience',
};

export function AchievementsApp({ onViewCertificate }: { onViewCertificate: ViewCertificate }) {
  return (
    <>
      <AppIntro>
        Academic, technical, and professional achievements outside of competitions.
      </AppIntro>
      {achievements.length === 0 ? (
        <EmptyState title="No achievements added yet" />
      ) : (
        <ul className="entry-list">
          {achievements.map((a) => (
            <li key={a.id} className="entry">
              <div className="entry__head">
                <span className="entry__kind">{kindLabels[a.kind]}</span>
                <time className="entry__date">{formatRange(a.date, a.until)}</time>
              </div>
              <p className="entry__title">{a.title}</p>
              {a.organizer && <p className="entry__meta">{a.organizer}</p>}
              {a.description && <p className="entry__text">{a.description}</p>}
              <PendingTag missing={a.missing} />
              <EvidenceActions
                evidence={a.evidence}
                onViewCertificate={
                  hasCertificateFile(a.evidence)
                    ? () => onViewCertificate(achievementItem(a))
                    : undefined
                }
              />
            </li>
          ))}
        </ul>
      )}
      <EmptyState title="More achievements on the way">
        <p>Scholarships, trainings, workshops, seminars, and certificates of participation.</p>
      </EmptyState>
    </>
  );
}
