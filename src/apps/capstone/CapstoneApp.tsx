import { capstone as cap } from '../../content';
import {
  AppIntro,
  Block,
  Chips,
  EvidenceActions,
  Gallery,
  MissingList,
  MyRolePanel,
  ProgressBar,
  ProjectHeader,
} from '../../components';
import { photosOf } from '../../lib/evidence';
import './CapstoneApp.css';

export function CapstoneApp() {
  return (
    <>
      <ProjectHeader title={cap.title} status={cap.status} />
      {cap.summary && <AppIntro>{cap.summary}</AppIntro>}

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
