import React from "react";
import { Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import OverviewScene from "./scenes/overview/Scene";
import data from "./overview.json";
export const Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = data.captions.find((c) => frame >= c.from && frame < c.to);
  return (
    <>
      {data.segments.map((seg) => (
        <Sequence key={seg.id} from={seg.from} durationInFrames={seg.duration}>
          <OverviewScene {...seg.visual} caption={cue?.text ?? ""} />
        </Sequence>
      ))}
      <Audio src={staticFile(data.audio)} />
    </>
  );
};
