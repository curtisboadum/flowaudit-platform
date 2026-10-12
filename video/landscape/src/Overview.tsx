import React from "react";
import { Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import OverviewScene from "./scenes/overview/Scene";
import data from "./overview.json";
export const Overview: React.FC = () => {
  const f = useCurrentFrame();
  const cue = data.captions.find((c) => f >= c.from && f < c.to);
  return (
    <>
      {data.shots.map((shot) => (
        <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration}>
          <OverviewScene {...shot.visual} caption={cue?.text ?? ""} />
        </Sequence>
      ))}
      <Audio src={staticFile(data.audio)} />
    </>
  );
};
