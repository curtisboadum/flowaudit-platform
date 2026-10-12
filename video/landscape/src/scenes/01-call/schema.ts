import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "opening", "eyebrow": "WHEN PATIENTS CALL", "headline": "Give them a clear next step.", "items": ["Busy at the desk", "Another call", "After closing"], "footer": "Support for your front desk"}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=660;
