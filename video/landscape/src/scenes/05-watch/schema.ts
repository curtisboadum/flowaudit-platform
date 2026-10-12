import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "opening", "eyebrow": "WATCH THE WORKFLOW", "headline": "From inquiry to appointment.", "items": ["Listen to the request", "Hear the available times", "See the selected booking"], "footer": "Recorded demonstration \u00b7 Privacy & label edits"}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=540;
