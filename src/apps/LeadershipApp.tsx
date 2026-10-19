import { leadership } from '../content';
import { PendingTag } from '../os';
import { AppIntro, EmptyState, EvidenceActions } from './parts';
import './listApps.css';

export function LeadershipApp() {
  return (
    <>
      <AppIntro>Student organization positions, current and previous.</AppIntro>
      {leadership.length === 0 ? (
        <EmptyState title="Officer roles are being added">
          <p>
            Each role will show the organization, position, academic year, and main
            responsibilities.
          </p>
        </EmptyState>
      ) : (
        <ul className="entry-list">
          {leadership.map((role) => (
            <li key={role.id} className="entry">
              <div className="entry__head">
                <span className="entry__kind">{role.organization}</span>
                <span className="entry__date">A.Y. {role.academicYear}</span>
              </div>
              <p className="entry__title">{role.position}</p>
              {role.responsibilities.length > 0 && (
                <ul className="entry__bullets">
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <PendingTag missing={role.missing} />
              <EvidenceActions evidence={role.evidence} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
