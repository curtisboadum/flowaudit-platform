import data from "../../final-vsl.json";
export const defaults = {
  frame: 0, phoneScale: .95, callerScale: 1.05, stationX: 645, stationY: 282,
  stationWidth: 630, stationHeight: 350, closeScale: 1.8,
  handsetAngle: 2.6, handsetLift: .6,
  reactionTilt: 3, gazeOffset: 2, staffGesture: 9, paperTilt: 3,
  events: data.events,
};
export type SceneProps = typeof defaults;
export const schema = Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,
 typeof value === "number" ? {type:"number",label:key,default:value,min:0,max:3000,step:.1} : {type:"object",default:value}]));
