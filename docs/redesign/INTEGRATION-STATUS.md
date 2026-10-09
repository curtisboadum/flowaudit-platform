# Integration status · 9 October 2026

The public Cal event is `curtis-salesos/flowaudit-call`, 15 minutes. Inline embed and direct-link fallback preserve service, optional context and allowed referral labels. The film is optional. No real prospect booking was made during QA.

`CAL_WEBHOOK_SECRET` is empty and `CAL_EVENT_TYPE_IDS` is absent in the freshly pulled production environment. The redesign receiver intentionally returns 503 without a configured secret; the older deployed production endpoint currently returns 401 to an unsigned probe. Production has not been released from this branch. Cal settings currently require account sign-in. Do not label booking tracking complete until a signed delivery is observed and durably stored. The public calendar works independently.

The existing revenue-recovery upstream `https://revenue-recovery-web-ivory.vercel.app` returns HTTP 402 and `DEPLOYMENT_DISABLED`. The current Vercel account cannot inspect that deployment. Existing client proxy paths remain unchanged. Marketing links now go through a client-access page which checks availability and offers support when unavailable. Restoring the upstream requires its owning account; no financial or billing changes were attempted.

The CRM remains authenticated through existing Next API routes. Its database access uses server-side service-role credentials. A migration enabled RLS on `crm_leads` (previously disabled), added nullable unique `sdr_events.event_id`, and added a service-role-only rate-limit RPC. Rate-limit behaviour was verified inside a rolled-back transaction: true, true, false for limit 2. Anonymous read returned zero visible leads. No customer records were queried or modified.

Analytics is optional and disabled before consent. It records page/service/media/campaign context and a random session identifier, not form answers, patient data or messages. Event validation rejects CRM paths and foreign origins. Booking lifecycle data is necessary operational data and independent of optional website analytics. No-show updates are labelled `no_show_updated` until an explicit attendance value is verified. Meeting-end events retain the legacy `call_held` label; that provider event does not establish attendance, conversion, revenue or sales outcome.

Completed films were integrated from the separate production task. Its earlier QA summary recorded human review as pending. The user subsequently confirmed that the VSL is ready in the redesign handoff and this funnel request, superseding that historical approval gate. The supplied audio/content is preserved; after the user’s explicit horizontal correction the layouts are reformatted to landscape. This task does not claim a fresh human end-to-end listening review. Production website release remains subject to final release approval.

Fresh read-only probes on 9 October: Gemini models GET returned 403 with a leaked-key rejection; DeepSeek balance GET returned 200 with `is_available=false`. The earlier chat response probe returned 402 insufficient balance; the fresh read-only probe does not claim a successful chat response. The redesign disables chat by default via CHAT_ENABLED (currently absent). The older live production endpoint returned 400 to an empty request, so the branch default must not be confused with a verified live disabled state. Its integration remains available after provider restoration. Do not expose the assistant based only on key presence. Durable rate limits now protect chat and CRM sign-in.

Preview analytics storage was verified on the Git-connected branch deployment with duplicate tagged QA delivery and a single database row. Manual worktree CLI deployment did not inherit branch-scoped variables, so use the Git-connected preview alias for review.

Current phone-funnel implementation, verification and release requirements: [handoff](phone-agent/HANDOFF.md). Sanitized current provider probes: [integration evidence](evidence/phone-funnel-integrations.json).

Customer UI audit follow-up: [control register](CUSTOMER-JOURNEY-AUDIT.md), [fresh sanitized provider probes](evidence/customer-audit/integrations.json). Real Cal date, timezone and slot selection reached attendee details without submission; synthetic optional context was visible in direct Cal notes. This proves observable forwarding, not receipt in a durable booking record. Cal account settings required sign-in. No notifications or bookings were created.

The user corrected the film-format requirement to horizontal and confirmed a true 16:9 reformat. Four public films now render at 1920×1080 using the established Remotion route. Approved audio packets, timing, transcripts and caption content are preserved. Portrait evidence remains historical; replacement landscape checks are in the customer audit.


## Overview replacement

The primary phone-agent film is now a separate 90-second `overview` asset. The genuine routine recording and five-minute walkthrough retain their media identities and source integrity. This change does not configure calendar webhooks, CRM delivery, provider credentials, communications or production activation. Previously recorded external integration gaps remain open; no booking has been submitted to resolve them.
