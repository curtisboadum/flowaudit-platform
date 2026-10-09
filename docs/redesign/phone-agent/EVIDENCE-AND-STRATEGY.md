# Dental phone-agent funnel: evidence and decisions

Research date: 9 October 2026. This document contains aggregate research only. Raw leads, contact details, personalised outreach and private price hypotheses are not repository assets.

## Source register and reconstruction

| ID  | Source inspected                                                                                                                                                                                                   | What it establishes                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| V   | `complete-my-flowaudit-vsl-production-using/outputs`: main transcript, captions, chapter manifest, final summary, verification status, revision-5 selection, supporting landing-page/qualification/sales-call copy | Finished film story, CTA, disclosure boundaries and commercial sequence                                                                         |
| D   | `/Users/curtis/Code/flowaudit-sdr/video/phone-agent-demo2-evidence.md`                                                                                                                                             | Revision 5 fixes the continuous-beep defect; replacement labels are editorial edits, not proof of original attribution                          |
| C1  | Codex “Complete FlowAudit VSL production”, `01a11cba-83c5-7f01-bf37-080dcab4236c`                                                                                                                                  | Approved warm-neutral direction, vertical film, The Explainer voice and selected repaired routine recording                                     |
| C2  | Codex “Redesign FlowAudit Website”, `01a11cc7-b0df-7393-b877-04f61a6332af`                                                                                                                                         | Agency retains four offers; user explicitly states the VSL is ready and asks for this separate implementation                                   |
| G1  | Accessible ChatGPT “Sales Call Structure”, `6ac7c820-7630-83eb-806c-3b43e93ce3c0`                                                                                                                                  | Call focuses on remaining questions, fit, scope, investment and a decision; unresolved implementation requirements prevent a premature purchase |
| G2  | Accessible ChatGPT “Integrate AI Phone Funnel”, `6ac7abaf-47d4-83eb-a21d-4075ae2f5990`                                                                                                                             | Earlier creative brief and education-before-call rationale; early absolute claims and dark/landscape/American-voice direction are superseded    |
| O   | OpenCode database, read-only sessions “FlowAudit: remove pricing, add phone agent page” and “FlowAudit cal.com migration + caption fixes”                                                                          | Earlier page, redaction and Cal migration history; user rejected duplicate subtitles                                                            |
| L   | Desktop and `Code/dental-leads/exports` full lead and final signal/message CSVs, plus Desktop INFO and outreach playbook                                                                                           | Actual buyer labels, campaign intent, data limitations and message mismatch                                                                     |
| P   | Private Klaus Vault strategy/pricing note                                                                                                                                                                          | Scoped public quotes; phone payment-before-configuration versus separate website demo-before-payment terms                                      |
| R   | Redesign checkout, PR #20, PR #19, GitHub compare and deployment inspection                                                                                                                                        | Implementation baseline and existing funnel/integration architecture                                                                            |

Scope of conversation access: the named Codex/ChatGPT threads were accessible through thread tools. OpenCode source sessions were read from its local database. No claim is made that every historical ChatGPT conversation was searchable or reviewed. An OpenCode session specifically titled for revision 5 was not found; its detailed local evidence document and selected master were available. No current production phone-agent configuration, provider console, customer outcomes or executed customer agreement was supplied.

The final story is: a busy front desk creates an unanswered-enquiry problem; an AI phone agent is configured around agreed practice rules; the film shows a new-patient enquiry, availability choices and Google Calendar booking; it distinguishes bookings from attendance and revenue; exceptions and privacy requirements require review; agreed scope, agreement and initial payment start configuration; testing and practice approval precede activation; book a 15-minute walkthrough with relevant purchasing authority.

The urgent excerpt is a configured question, not validated clinical triage or a demonstrated emergency transfer. Replacement practice and attribution labels must never be used as original product proof. The financial example is explicitly hypothetical gross appointment value before costs, not a case study or forecast.

## Final asset lock

Source root: `/Users/curtis/Documents/Codex/2026-10-08/complete-my-flowaudit-vsl-production-using/outputs`.

- Main film: `films/flowaudit-main-vsl.playback.mp4` → `public/media/main.mp4`; 300 seconds, 1080×1920, 30fps. About 10.6 MB.
- Main captions: `captions/MainVSL.vtt` → `public/media/main.vtt`; transcript already included in `src/lib/media-transcripts.ts`.
- Routine recording: `films/routine-demonstration-vertical.playback.mp4` → `public/media/routine.mp4`; about 91 seconds. Caption file also matches the handoff.
- Executive summary: 67.5 seconds; teaser: 30 seconds. Retain approved exports and posters.
- Main/routine playback and VTT files matched the handoff byte-for-byte during research. No film was regenerated.
- Handoff automated QA reports full decode, dimensions, loudness, sync and source isolation checks passing. It recorded human approval as pending at that time. The later user statement that the VSL is ready supersedes that historical approval status. This implementation does not claim a fresh human end-to-end listening review.
- Film uses baked English captions. Preserve one visible layer; downloadable VTT and transcript provide alternative access. A subtitle toggle that removes baked captions is unavailable without a new export and is not promised.

## Actual lead findings

Desktop/export copies match. Full CSV SHA-256: `49fe8c3aef76b1106b87f5004ee2c56884b5ac14a5a2189ea5a33875e4f2ec1d`. Final outreach CSV SHA-256: `e47f8c6ee9d9a1a84d9c08dcc9209dc9bdf28c15ba8158cf5ae5843b6bd2cb48`.

| Recorded segment             | Full list | Final outreach queue |
| ---------------------------- | --------: | -------------------: |
| Owner/Founder/Principal      |     1,198 |                  193 |
| Executive (C-Suite/VP Ops)   |       800 |                  192 |
| Practice Manager (secondary) |       449 |                   25 |
| Total                        |     2,447 |                  410 |

These are source labels, not verified purchasing authority. The titles include office/practice managers, directors and regional directors of operations, founders and chief executives. Named DSO organisations and group roles are represented. Anonymised examples: a regional operations leader at a dental group, a manager at a group-affiliated practice, and an owner/operator reviewing front-desk hiring. All 2,447 location-count fields are blank. `multiloc_prob` is a score, not a verified location count; no numeric DSO or multi-location share is claimed.

Full-list country values: US 1,607, UK 154, Canada 93, blank 570; another 23 entries contain metro/region strings rather than countries. Queue: US 314, UK 15, Canada 15, other/unknown 66. US-first is the user's chosen campaign default; UK/Canada enquiries require separate regional assessment.

Full-list verification flags: A-VERIFIED 134, B-MULTI-ENGINE 403, C-INDEX-ONLY 1,910. Queue: 38 / 105 / 267 respectively. Do not substitute the older INFO note's aggregate verification total for these current file counts. A validation pass on generated messages establishes neither identity nor a buying intention.

Queue primary signals: high-value/reviews 317, front-desk hiring 76, growth 13, after-hours gap 3, missed-call pain 1. Overlapping flags: high-value 371, hiring 76, growth 96, after-hours 114, missed-call pain 1. All 410 have a signal-source field and none is marked mock in its evidence/source fields. Sources have not all been independently revalidated; sourcing is not proof of lost revenue. Missing city data and sparse missed-call evidence prevent personalised loss claims.

## Funnel decision and qualification

One shareable layered page suits both owners and the executive-heavy queue: promise + full VSL, selectable shorter proof, workflow explanation, buyer-specific considerations, expandable operational answers, explicit paid setup/approval sequence and booking CTAs. The page educates; it does not require watching before booking. No supporting procurement page is needed until actual documentation exists to justify one.

The existing questionnaire placed required business, role and priority fields before calendar access. Calendar-first is now the user-approved default. Optional practice name prepares discussion; role identifies stakeholders; system identifies compatibility questions; priority focuses the call; location count appears for manager/operations/group roles. Name/email stay with Cal. Website and estimated call volume move to the call. No answers enter website analytics. Applying context explicitly reloads the calendar, with a notice to choose a time afterwards. Drafts persist in component memory, not browser storage. Notes and service/attribution are forwarded using the existing Cal query configuration. Receipt in a real booking record remains unverified until an authorised end-to-end booking is performed.

A manager is not rejected for lacking payment authority. Invite the relevant approver. Straightforward practice purchases can move to agreement/payment only after deliverability and terms are clear; DSO calls may instead establish named reviewers and a committed next decision.

## Campaign correction prepared, not sent

Existing messages promise every call answered 24/7 and no voicemail; the recordings do not support these absolutes. Preserve the permission-first outreach sequence, then use qualified language when sharing the page:

> I built an AI phone agent configured around a dental practice's agreed call workflows. This recorded example shows an appointment enquiry and a Google Calendar booking. Here is the walkthrough; it explains what is demonstrated, what needs checking and how setup works. If it looks relevant, you can book 15 minutes to discuss your practice and the investment.

Use generic campaign labels, not names, emails or phone numbers, in UTM values. No outreach or campaign records were changed. The supplied founder pricing reference is a framework, not approval to publish prices; actual delivery costs are still needed before making a margin claim.
