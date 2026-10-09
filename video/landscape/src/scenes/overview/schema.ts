import { system as s } from "../../system/sceneSystem";
export type OverviewProps = {
  kind: string;
  titles: string[];
  headline: string;
  kicker: string;
  items: string[];
  caption: string;
  source: string;
  sourceStill: string;
  sourceFrom: number;
  crop: string;
  eventFrames: number[];
  enterFrames: number;
  staggerFrames: number;
  captionBottom: number;
  captionSize: number;
  captionWidth: number;
  duration: number;
};
export const defaults: OverviewProps = {
  kind: "hook",
  titles: ["A patient at the desk.", "After closing, another call.", "Who helps the caller?"],
  headline: "Who helps the caller?",
  kicker: "DURING CLINIC. AFTER CLOSING.",
  items: ["Desk occupied", "Practice closed"],
  caption: "",
  source: "demo/routine-landscape-panels.mp4",
  sourceStill: "demo/overview-calendar-still.png",
  sourceFrom: 43.36,
  crop: "call",
  eventFrames: [65, 140],
  enterFrames: 0,
  staggerFrames: s.sales.staggerFrames,
  captionBottom: s.sales.captionBottom,
  captionSize: s.sales.captionSize,
  captionWidth: s.sales.captionWidth,
  duration: 240,
};
export const schema = Object.fromEntries(
  Object.entries(defaults).map(([key, value]) => [
    key,
    { type: typeof value === "number" ? "number" : "text", default: value },
  ]),
);
