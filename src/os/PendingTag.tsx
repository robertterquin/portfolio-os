import './PendingTag.css';

type PendingTagProps = {
  /** The details still missing. Shown on hover and read by screen readers. */
  missing?: string[];
};

/** Marks an entry whose details are not confirmed yet. Renders nothing when complete. */
export function PendingTag({ missing }: PendingTagProps) {
  if (!missing || missing.length === 0) return null;
  const detail = `Still to add: ${missing.join(', ')}`;
  return (
    <span className="pending" title={detail}>
      Details coming soon
      <span className="visually-hidden">. {detail}</span>
    </span>
  );
}
