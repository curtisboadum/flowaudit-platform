import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "limits", "eyebrow": "WHAT THE EVIDENCE SHOWS", "headline": "One demonstrated booking workflow.", "items": ["Google Calendar booking", "Assess your scheduling system", "Test your practice\u2019s requirements"], "footer": "Compatibility is assessed and tested"}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=690;
