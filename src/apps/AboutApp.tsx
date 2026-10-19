import { profile, sections } from '../content';
import { Button, LinkButton, PendingTag } from '../os';
import type { Target } from './registry';
import './AboutApp.css';

type AboutAppProps = {
  onOpenApp: (target: Target) => void;
  /** List view has its own section list beside this window, so it hides this one. */
  showIndex?: boolean;
};

export function AboutApp({ onOpenApp, showIndex = true }: AboutAppProps) {
  return (
    <div className="about">
      <p className="about__hello">Hi, I'm Robert.</p>
      <p className="about__intro">{profile.intro}</p>

      <dl className="about__facts">
        <div>
          <dt>Program</dt>
          <dd>{profile.program}</dd>
        </div>
        <div>
          <dt>School</dt>
          <dd>
            {profile.school}, {profile.years}
          </dd>
        </div>
        <div>
          <dt>Year level</dt>
          <dd>{profile.yearLevel ?? <PendingTag missing={profile.missing} />}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{profile.email}</dd>
        </div>
      </dl>

      {showIndex && (
        <nav className="about__index" aria-label="Portfolio sections">
          <p className="about__index-title">What's inside</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <button type="button" onClick={() => onOpenApp(section.id)}>
                  {section.requirement}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="about__actions">
        <Button onClick={() => onOpenApp('stack')}>Tech Stack</Button>
        <LinkButton href={profile.links.github}>GitHub</LinkButton>
        <LinkButton href={profile.links.linkedin}>LinkedIn</LinkButton>
        <LinkButton href={profile.links.resume}>Resume (PDF)</LinkButton>
      </div>
    </div>
  );
}
