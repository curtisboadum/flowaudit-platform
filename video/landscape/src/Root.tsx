import FinalVSL from "./scenes/final-vsl/Scene";
import finalData from "./final-vsl.json";
import { defaults as boldDefaults } from "./scenes/bold-opening/schema";
import { BoldOpening } from "./BoldOpening";
import { Overview } from "./Overview";
import OverviewScene from "./scenes/overview/Scene";
import { defaults as overviewDefaults } from "./scenes/overview/schema";
import React from "react";
import { scenes } from "./scenes";
import { Composition } from "remotion";
import { Master, FilmName } from "./Master";
import productions from "./productions.json";
import Narrative from "./scenes/narrative/Scene";
import Evidence from "./scenes/evidence/Scene";
import { defaults as n } from "./scenes/narrative/schema";
import { defaults as e } from "./scenes/evidence/schema";
import ReceptionStudy from "./scenes/reception-studies/Scene";
import { defaults as receptionDefaults, type StudyKind } from "./scenes/reception-studies/schema";
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="FlowAuditVSL" component={FinalVSL} durationInFrames={finalData.durationInFrames} width={1920} height={1080} fps={30}/>
    <Composition id="FlowAuditOpening" component={FinalVSL} defaultProps={{openingOnly:true}} durationInFrames={finalData.openingDuration} width={1920} height={1080} fps={30}/>
    <Composition id="FlowAuditOpeningNested" component={FinalVSL} defaultProps={{openingOnly:true,nested:true}} durationInFrames={finalData.openingDuration} width={1920} height={1080} fps={30}/>

    {(["phone", "opening", "outcome"] as StudyKind[]).map((study) => (
      <Composition key={study} id={`ReceptionStudy-${study}`} component={ReceptionStudy}
        defaultProps={{...receptionDefaults, study}} durationInFrames={1} width={1920} height={1080} fps={30}/>
    ))}
    <Composition
      id="BoldOpening"
      component={BoldOpening}
      defaultProps={boldDefaults}
      durationInFrames={540}
      width={1920}
      height={1080}
      fps={30}
    />
    <Composition
      id="OpeningProofNested"
      component={Master}
      defaultProps={{ openingProof: true }}
      durationInFrames={540}
      width={1920}
      height={1080}
      fps={30}
    />
    <Composition
      id="Overview90"
      component={Overview}
      durationInFrames={2700}
      width={1920}
      height={1080}
      fps={30}
    />
    <Composition
      id="OverviewScene"
      component={OverviewScene}
      defaultProps={overviewDefaults}
      durationInFrames={300}
      width={1920}
      height={1080}
      fps={30}
    />
    {Object.entries(productions).map(([id, p]) => (
      <Composition
        key={id}
        id={id}
        component={Master}
        defaultProps={{ film: id as FilmName }}
        durationInFrames={p.duration}
        width={1920}
        height={1080}
        fps={30}
      />
    ))}
    <Composition
      id="NarrativeScene"
      component={Narrative}
      defaultProps={n}
      durationInFrames={300}
      width={1920}
      height={1080}
      fps={30}
    />
    <Composition
      id="EvidenceScene"
      component={Evidence}
      defaultProps={e}
      durationInFrames={300}
      width={1920}
      height={1080}
      fps={30}
    />
    {Object.entries(scenes)
      .filter(([id]) => id !== "narrative" && id !== "evidence")
      .map(([id, s]) => (
        <Composition
          key={id}
          id={id}
          component={s.component as React.ComponentType<any>}
          defaultProps={s.defaults}
          durationInFrames={s.durationInFrames}
          width={1920}
          height={1080}
          fps={30}
        />
      ))}
  </>
);
