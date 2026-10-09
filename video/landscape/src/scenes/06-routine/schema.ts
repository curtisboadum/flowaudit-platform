import {defaults as sharedDefaults,schema as sharedSchema} from '../evidence/schema';
export const defaults={...sharedDefaults,...{"headline": "A recorded booking workflow.", "kind": "routine", "source": "demo/routine-landscape-panels.mp4", "sourceFrom": 0}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=2725;
