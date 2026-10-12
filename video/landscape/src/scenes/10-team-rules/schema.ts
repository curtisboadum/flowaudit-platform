import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "limits", "eyebrow": "RULES AND BOUNDARIES", "headline": "Your team approves the rules.", "items": ["Practice-approved escalation", "Human handoffs", "Patient-data and security review"], "footer": "Supports your team within agreed rules"}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=780;
