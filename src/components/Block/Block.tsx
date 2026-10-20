import type { ReactNode } from 'react';
import './Block.css';

/** A titled section inside a window, e.g. "Objectives". */
export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="app-block">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
