export type StudyKind = "phone" | "opening" | "outcome";
export const defaults = {
  study: "phone" as StudyKind,
  showCaption: true,
  handsetAngle: 0,
  handsetLift: 0,
  shutterOpen: 0.2,
  firstCaller: { x: 145, y: 480, scale: 1.02 },
  secondCaller: { x: 1615, y: 480, scale: 1.02 },
  deskPhone: { x: 345, y: 425, scale: 1.04 },
  nightPhone: { x: 1210, y: 548, scale: 0.82 },
  paper: { x: 760, y: 557, scale: 0.8 },
  screen: { x: 1090, y: 275, width: 660, height: 445 },
  station: { x: 590, y: 310, scale: 1 },
};
export type ReceptionStudyProps = typeof defaults;
export const schema = {
  study: { type: "select", default: "phone", options: ["phone", "opening", "outcome"] },
  showCaption: { type: "toggle", default: true },
  handsetAngle: { type: "number", default: 0, min: -5, max: 5, step: 0.25 },
  handsetLift: { type: "number", default: 0, min: 0, max: 10, step: 0.5 },
  shutterOpen: { type: "number", default: 0.2, min: 0, max: 1, step: 0.05 },
} as const;
