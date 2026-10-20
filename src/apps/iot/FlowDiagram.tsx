import type { FlowStep } from '../../content';
import './FlowDiagram.css';

/** The IoT signal flow, left to right. Shows a blueprint placeholder until steps are added. */
export function FlowDiagram({ steps, title }: { steps?: FlowStep[]; title: string }) {
  if (!steps || steps.length === 0) {
    return (
      <figure className="flow flow--empty">
        <div className="flow__ghosts" aria-hidden="true">
          <span />
          <i />
          <span />
          <i />
          <span />
        </div>
        <figcaption>Wiring diagram coming soon</figcaption>
      </figure>
    );
  }

  return (
    <figure className="flow">
      <ol className="flow__steps" aria-label={`${title} signal flow`}>
        {steps.map((step, index) => (
          <li key={step.label} className="flow__step">
            <span className="flow__box">
              <strong>{step.label}</strong>
              {step.detail && <small>{step.detail}</small>}
            </span>
            {index < steps.length - 1 && <span className="flow__arrow" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <figcaption>How data moves through the system</figcaption>
    </figure>
  );
}
