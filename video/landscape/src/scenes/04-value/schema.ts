import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "value", "eyebrow": "POTENTIAL VALUE", "headline": "Use your own figures.", "items": [], "footer": "Illustration only \u00b7 Hypothetical inputs \u00b7 Not a forecast", "graphicY": 190}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=1020;
