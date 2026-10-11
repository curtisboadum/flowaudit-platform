import timing from "../../bold-opening.json";

/** Editable absolute-frame choreography, shared by standalone and nested renders. */
export const defaults = {
  motion: timing.motion,
  layout: {
    routeY: 520,
    sourceX: 250,
    sourceTopY: 430,
    sourceBottomY: 685,
    gateX: 960,
    paperX: 650,
    paperY: 430,
    shutterX: 1310,
    shutterY: 445,
    callRadius: 74,
    queuedX: 575,
    waitingX: 720,
    destinationX: 1600,
    gatherFrames: 104,
    openingTravel: 285,
    cameraScale: 1.055,
  },
};
export type BoldOpeningProps = typeof defaults;
export const schema = {
  motion: { type: "object", label: "Cue frames", default: defaults.motion },
  layout: { type: "object", label: "Object positions, scale and travel", default: defaults.layout },
} as const;
