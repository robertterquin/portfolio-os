import { iotProject as iot } from '../content';
import { MyRolePanel, PendingTag } from '../os';
import { FlowDiagram } from './FlowDiagram';
import { photosOf } from './evidence';
import { AppIntro, Block, Chips, EvidenceActions, Gallery, MissingList, StatusPill } from './parts';
import './projectApps.css';

export function IoTApp() {
  return (
    <>
      <FlowDiagram steps={iot.flow} title={iot.title} />

      <header className="project-head">
        <h3 className="project-head__title">{iot.title}</h3>
        <StatusPill status={iot.status} />
        <PendingTag missing={iot.missing} />
      </header>
      <AppIntro>{iot.summary}</AppIntro>

      {iot.objectives.length > 0 && (
        <Block title="Objectives">
          <ul>
            {iot.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Block>
      )}

      {iot.components.length > 0 && (
        <Block title="Technologies and components">
          <Chips items={iot.components} />
        </Block>
      )}

      {iot.myRole && <MyRolePanel>{iot.myRole}</MyRolePanel>}

      {photosOf(iot.evidence).length > 0 && (
        <Block title="Photos and screenshots">
          <Gallery photos={photosOf(iot.evidence)} />
        </Block>
      )}

      {iot.result && (
        <Block title="Output and result">
          <p>{iot.result}</p>
        </Block>
      )}

      <EvidenceActions evidence={iot.evidence} />
      <MissingList missing={iot.missing} />
    </>
  );
}
