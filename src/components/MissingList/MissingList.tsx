import './MissingList.css';

/** Lists the details Robert still has to send for this entry. */
export function MissingList({
  missing,
  title = 'Still to add',
}: {
  missing?: string[];
  title?: string;
}) {
  if (!missing || missing.length === 0) return null;
  return (
    <aside className="missing" aria-label={title}>
      <p className="missing__title">{title}</p>
      <ul>
        {missing.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
