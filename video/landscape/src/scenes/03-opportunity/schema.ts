import {defaults as sharedDefaults,schema as sharedSchema} from '../narrative/schema';
export const defaults={...sharedDefaults,...{"mode": "flow", "eyebrow": "ASSESS YOUR OPPORTUNITY", "headline": "Different steps. Different measures.", "items": ["Inquiry", "Booking", "Attendance"], "footer": "Collected revenue is a separate measure"}};
export const schema=Object.fromEntries(Object.entries(sharedSchema).map(([key,field])=>[key,{...field,default:(defaults as any)[key]}]));
export const durationInFrames=690;
