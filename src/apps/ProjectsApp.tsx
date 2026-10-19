import { projects } from '../content';
import { MyRolePanel, PendingTag } from '../os';
import { photosOf } from './evidence';
import { AppIntro, Chips, EmptyState, EvidenceActions, Gallery } from './parts';
import './projectApps.css';

export function ProjectsApp() {
  return (
    <>
      <AppIntro>Major projects from third-year courses, with my part in each one.</AppIntro>
      {projects.length === 0 ? (
        <EmptyState title="No course projects added yet" />
      ) : (
        <ul className="project-cards">
          {projects.map((p) => (
            <li key={p.id} className="project-card">
              <div className="project-card__head">
                {p.courseCode && <span className="project-card__course">{p.courseCode}</span>}
                <PendingTag missing={p.missing} />
              </div>
              <h3 className="project-card__title">{p.title}</h3>
              {p.courseName && <p className="project-card__meta">{p.courseName}</p>}
              <p className="project-card__summary">{p.summary}</p>
              <Chips items={p.tech} />
              {p.contribution && <MyRolePanel>{p.contribution}</MyRolePanel>}
              <Gallery photos={photosOf(p.evidence)} />
              <EvidenceActions evidence={p.evidence} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
