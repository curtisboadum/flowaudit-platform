import {defaults as sharedDefaults,schema as sharedSchema} from '../evidence/schema';
export const defaults={...sharedDefaults,...{"headline": "A configured question.", "kind": "urgent", "source": "demo/question-landscape-panels.mp4", "disclosure": "Recorded example \u00b7 Question and complete caller answer", "sourceFrom": 0}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=474;
