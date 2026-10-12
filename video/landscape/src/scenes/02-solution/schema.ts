import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "flow", "eyebrow": "A PRACTICAL NEXT STEP", "headline": "Configured around your practice.", "items": ["Clarify the appointment inquiry", "Offer available times", "Create the agreed booking"], "footer": "Recorded Google Calendar workflow"}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=960;
