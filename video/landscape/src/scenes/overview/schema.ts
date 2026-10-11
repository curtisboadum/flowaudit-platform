import { system as s } from "../../system/sceneSystem";
export const defaults = {
  kind: "hook",
  caption: "",
  duration: 540,
  eventFrames: [75, 150, 230],
  sourceFrom: 9.24,
  source: "demo/routine-landscape-panels.mp4",
  sourceStill: "demo/overview-calendar-still.png",
  sourceMode: "call",
  sourceProgress: 0,
  phase: 0,
  sceneOffset: 0,
  label: "",
  captionSize: s.editorial.captionSize,
  captionBottom: s.editorial.captionBottom,
  captionWidth: s.editorial.captionWidth,
  transferFrames: s.editorial.transferFrames,
  transitionFrames: s.editorial.transitionFrames,
  callTravelFrames: s.editorial.callTravelFrames,
  phoneX: s.editorial.phoneX,
  phoneY: s.editorial.phoneY,
};
export type OverviewProps = {
  [K in keyof typeof defaults]: (typeof defaults)[K] extends number ? number : (typeof defaults)[K];
};
export const schema = Object.fromEntries(
  Object.entries(defaults).map(([key, value]) => [
    key,
    {
      type: typeof value === "number" ? "number" : Array.isArray(value) ? "array" : "text",
      default: value,
      label: key,
    },
  ]),
);
