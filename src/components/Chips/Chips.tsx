import './Chips.css';

/** Small rounded labels for a list of tools or components. */
export function Chips({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
