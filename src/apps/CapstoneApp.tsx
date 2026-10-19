import { capstone as cap } from '../content';
import { MyRolePanel, PendingTag } from '../os';
import { photosOf } from './evidence';
import {
  AppIntro,
  Block,
  Chips,
  EvidenceActions,
  Gallery,
  MissingList,
  ProgressBar,
  StatusPill,
} from './parts';
import './projectApps.css';

export function CapstoneApp() {
  return (
    <>
      <header className="project-head">
        <h3 className="project-head__title">{cap.title}</h3>
        <StatusPill status={cap.status} />
        <PendingTag missing={cap.missing} />
      </header>
      <AppIntro>{cap.summary}</AppIntro>

      {cap.progress !== undefined && <ProgressBar value={cap.progress} label="Capstone progress" />}

      {cap.objectives.length > 0 && (
        <Block title="Objectives">
          <ul>
            {cap.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Block>
      )}

      {cap.tech.length > 0 && (
        <Block title="Technologies used">
          <Chips items={cap.tech} />
        </Block>
      )}

      {cap.team.length > 0 && (
        <Block title="Team">
          <ul className="team">
            {cap.team.map((member) => (
              <li key={member.name}>
                <span>{member.name}</span>
                <span>{member.role}</span>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {cap.myRole && <MyRolePanel>{cap.myRole}</MyRolePanel>}

      {photosOf(cap.evidence).length > 0 && (
        <Block title="Screenshots">
          <Gallery photos={photosOf(cap.evidence)} />
        </Block>
      )}

      <EvidenceActions evidence={cap.evidence} />
      <MissingList missing={cap.missing} />
    </>
  );
}
