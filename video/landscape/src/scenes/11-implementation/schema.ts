import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "steps", "eyebrow": "WHAT PURCHASING INVOLVES", "headline": "Agree. Configure. Test. Approve.", "items": ["Confirm scope & investment", "Agreement & initial payment", "Configure the workflow", "Test with your team", "Practice approval \u2192 activate"], "footer": "Payment starts agreed work; approval precedes activation", "graphicY": 190}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=900;
