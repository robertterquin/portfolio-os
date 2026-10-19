import { projects } from '../content';
import { MyRolePanel, PendingTag } from '../os';
import { photosOf } from './evidence';
import { AppIntro, Chips, EmptyState, EvidenceActions, Gallery } from './parts';
import './projectApps.css';

export function ProjectsApp() {
  return (
    <>
      <AppIntro>
        Software projects I've built, with screenshots, live links, and source code.
      </AppIntro>
      {projects.length === 0 ? (
        <EmptyState title="No projects added yet" />
      ) : (
        <ul className="project-cards">
          {projects.map((p) => (
            <li key={p.id} className="project-card">
              <div className="project-card__head">
                {p.courseCode && <span className="project-card__course">{p.courseCode}</span>}
                {p.tag && <span className="project-card__tag">{p.tag}</span>}
                <PendingTag missing={p.missing} />
              </div>
              <h3 className="project-card__title">{p.title}</h3>
              {p.courseName && <p className="project-card__meta">{p.courseName}</p>}
              <Gallery photos={photosOf(p.evidence)} />
              <p className="project-card__summary">{p.summary}</p>
              {p.details && <p className="project-card__details">{p.details}</p>}
              {p.highlights && p.highlights.length > 0 && (
                <ul className="project-card__highlights">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              <Chips items={p.tech} />
              {p.contribution && <MyRolePanel>{p.contribution}</MyRolePanel>}
              <EvidenceActions evidence={p.evidence} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
