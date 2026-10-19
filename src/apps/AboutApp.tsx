import { profile, sections } from '../content';
import { Button, LinkButton, PendingTag } from '../os';
import type { AppId } from './registry';
import './AboutApp.css';

type AboutAppProps = {
  onOpenApp: (id: AppId) => void;
};

export function AboutApp({ onOpenApp }: AboutAppProps) {
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

      <div className="about__actions">
        <Button onClick={() => onOpenApp('capstone')}>Open Capstone</Button>
        <Button onClick={() => onOpenApp('certifications')} variant="plain">
          Certifications
        </Button>
        <Button onClick={() => onOpenApp('stack')} variant="plain">
          Tech Stack
        </Button>
        <LinkButton href={profile.links.github}>GitHub</LinkButton>
        <LinkButton href={profile.links.linkedin}>LinkedIn</LinkButton>
        <LinkButton href={profile.links.resume}>Resume (PDF)</LinkButton>
      </div>
    </div>
  );
}
