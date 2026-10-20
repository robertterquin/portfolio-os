import './ProgressBar.css';

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="progress">
      <div className="progress__label">
        <span>{label}</span>
        <span>{clamped}%</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="progress__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
