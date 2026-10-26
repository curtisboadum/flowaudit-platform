/**
 * @file watch-copy.ts
 * @description Factual, per-demo copy for the personalized watch page. Kept
 *   separate from the page so the exact words can be tested without rendering.
 *   No bespoke-video promise, no customer-result claim, no invented facts.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { DemoId } from "@/lib/demo-registry";

export interface WatchCopy {
  context: string;
  note: string;
}

export const WATCH_COPY: Record<DemoId, WatchCopy> = {
  "smart-street": {
    context:
      "A recorded home-services call: the caller explains the job, the agent captures the details, and two appointment times are confirmed.",
    note:
      "This is a recorded workflow, not a recording of your business and not a customer result. It is built for after-hours and overflow calls; your own call rules and calendar still need assessment.",
  },
  "agile-tech": {
    context:
      "A recorded professional-services enquiry: website requirements are captured and a callback time is selected.",
    note:
      "This is a recorded workflow, not a recording of your business and not a customer result. Your own intake rules and connected tools still need assessment.",
  },
  routine: {
    context:
      "A recorded dental booking: a new-patient enquiry, appointment choices and a calendar event for the selected time.",
    note:
      "This is a recorded demonstration booking, not attendance or a customer result. Your scheduling rules and access still need assessment.",
  },
  urgent: {
    context:
      "A recorded urgent dental enquiry: the caller accepts an assessment time after an emergency surcharge is disclosed.",
    note:
      "This is a recorded demonstration. It does not establish clinical triage, emergency transfer or a clinical outcome. The surcharge belongs to this scenario, not FlowAudit pricing.",
  },
  "roof-leak": {
    context:
      "A recorded roof-leak enquiry: the agent clarifies the problem, collects details and agrees an inspection.",
    note:
      "This recording has a known source defect: the speech and appointment detail say inspection, while the calendar title says repair. It is not used as a default demonstration.",
  },
};

export function watchHeadline(firstName: string, company: string): string {
  const first = (firstName || "").trim();
  const org = (company || "").trim();
  if (first && org) return `${first}, here is the demo I mentioned for ${org}`;
  if (first) return `${first}, here is the demo I mentioned`;
  if (org) return `Here is the demo I mentioned for ${org}`;
  return "Here is the demo I mentioned";
}

export function watchSubhead(company: string): string {
  const org = (company || "").trim();
  return org
    ? `A short walkthrough for ${org}.`
    : "A short walkthrough of the phone agent.";
}

export function watchContext(demoId: DemoId): string {
  return WATCH_COPY[demoId].context;
}

export function watchNote(demoId: DemoId): string {
  return WATCH_COPY[demoId].note;
}

export function watchTitle(firstName: string): string {
  const first = (firstName || "").trim();
  return first ? `${first}, your demo | FlowAudit` : "Your demo | FlowAudit";
}

/** No page copy may advertise the five-demo hub or the demo library. */
export function containsDemoListLink(text: string): boolean {
  return /\/demo(?:s|\/showcase|\/)|Explore the demo library/i.test(text);
}
