import type { ProjectStatus } from '../../content';
import './StatusPill.css';

const statusLabels: Record<ProjectStatus, string> = {
  planning: 'Planning',
  'in-progress': 'In progress',
  completed: 'Completed',
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className="status-pill" data-status={status}>
      {statusLabels[status]}
    </span>
  );
}
