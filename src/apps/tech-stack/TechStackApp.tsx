import { profile } from '../../content';
import { AppIntro, Chips } from '../../components';
import './TechStackApp.css';

// Source: robertterquin.com "Technical Stack".
export function TechStackApp() {
  return (
    <>
      <AppIntro>The languages, frameworks, and tools I work with, grouped by area.</AppIntro>
      <ul className="stack-groups">
        {profile.skills.map((group) => (
          <li key={group.category} className="stack-group">
            <h3 className="stack-group__name">{group.category}</h3>
            <p className="stack-group__focus">{group.focus}</p>
            <Chips items={group.tools} />
          </li>
        ))}
      </ul>
    </>
  );
}
