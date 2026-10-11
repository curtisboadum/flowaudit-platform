import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "opening", "eyebrow": "CALLS THAT NEED ANOTHER PATH", "headline": "A configured question.", "items": ["Genuine question", "Complete caller answer"], "footer": "Recorded demonstration \u00b7 Configured question"}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=330;
