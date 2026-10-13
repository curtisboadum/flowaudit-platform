import type { Copy, Faq } from "@/lib/marketing-copy";

export interface IndustryPain {
  title: Copy;
  body: Copy;
}

export interface IndustryCapability {
  title: Copy;
  body: Copy;
  example: Copy;
}

export interface IndustryCross {
  href: string;
  line: Copy;
}

export interface Industry {
  name: Copy;
  metaTitle: string;
  metaDescription: string;
  hero: Copy;
  lead: Copy;
  painTitle: Copy;
  painLead: Copy;
  pain: IndustryPain[];
  capabilitiesTitle: Copy;
  capabilitiesLead: Copy;
  capabilities: IndustryCapability[];
  rulesTitle: Copy;
  rulesBody: Copy;
  recordingTitle: Copy;
  recordingLead: Copy;
  faq: Faq[];
  crossLead: Copy;
  cross: IndustryCross[];
  closingTitle: Copy;
  closingBody: Copy;
}
