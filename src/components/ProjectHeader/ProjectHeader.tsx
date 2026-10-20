import type { ProjectStatus } from '../../content';
import { StatusPill } from '../StatusPill/StatusPill';
import './ProjectHeader.css';

/** Project title with its status, at the top of the IoT and Capstone windows. */
export function ProjectHeader({ title, status }: { title: string; status: ProjectStatus }) {
  return (
    <header className="project-head">
      <h3 className="project-head__title">{title}</h3>
      <StatusPill status={status} />
    </header>
  );
}
