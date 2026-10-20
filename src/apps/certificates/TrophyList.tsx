import { EvidenceActions, MyRolePanel, PendingTag } from '../../components';
import { competitions } from '../../content';
import { formatDate } from '../../lib/date';
import { competitionItem, type ViewCertificate } from '../certificate-viewer/viewerItem';
import './TrophyList.css';

/** Competitions with their placement ribbon, newest first. */
export function TrophyList({ onViewCertificate }: { onViewCertificate: ViewCertificate }) {
  return (
    <ul className="trophy-list">
      {competitions.map((c) => (
        <li key={c.id} className="trophy">
          <div className="trophy__ribbon">
            <span>{c.placement}</span>
          </div>
          <div className="trophy__main">
            <p className="trophy__title">{c.name}</p>
            <dl className="trophy__facts">
              <div>
                <dt>Organizer</dt>
                <dd>{c.organizer}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{formatDate(c.date)}</dd>
              </div>
              {c.teamName && (
                <div>
                  <dt>Team</dt>
                  <dd>
                    {c.teamName}
                    {c.teammates && c.teammates.length > 0 && `: ${c.teammates.join(', ')}`}
                  </dd>
                </div>
              )}
              <div>
                <dt>Work submitted</dt>
                <dd>{c.submission}</dd>
              </div>
            </dl>
            {c.myRole && <MyRolePanel>{c.myRole}</MyRolePanel>}
            <PendingTag missing={c.missing} />
            <EvidenceActions
              evidence={c.evidence}
              onViewCertificate={() => onViewCertificate(competitionItem(c))}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
