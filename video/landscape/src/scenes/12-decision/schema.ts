import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "cta", "eyebrow": "THE DECISION CALL", "headline": "Book a 15-minute FlowAudit walkthrough.", "items": [], "footer": "https://flowaudit.co.uk/book", "graphicY": 190}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=1080;
