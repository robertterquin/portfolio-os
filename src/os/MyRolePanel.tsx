import type { ReactNode } from 'react';
import './MyRolePanel.css';

type MyRolePanelProps = {
  /** Robert's specific contribution. Required on every group project. */
  children: ReactNode;
  /** Optional short list of tasks Robert owned. */
  tasks?: string[];
};

export function MyRolePanel({ children, tasks }: MyRolePanelProps) {
  return (
    <aside className="myrole" aria-label="My role">
      <p className="myrole__label">My role</p>
      <div className="myrole__text">{children}</div>
      {tasks && tasks.length > 0 && (
        <ul className="myrole__tasks">
          {tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
