# Integration status · 9 October 2026

The public Cal event is `curtis-salesos/flowaudit-call`, 15 minutes. Inline embed and direct-link fallback preserve service, optional context and allowed referral labels. The film is optional. No real prospect booking was made during QA.

`CAL_WEBHOOK_SECRET` is empty in the existing production environment. `/api/cal/webhook` intentionally fails closed with 503 until a matching secret is configured at Cal and Vercel. Cal settings currently require account sign-in; this was requested during implementation. Do not label booking tracking complete until a signed delivery is observed and durably stored. The public calendar works independently.

The existing revenue-recovery upstream `https://revenue-recovery-web-ivory.vercel.app` returns HTTP 402 and `DEPLOYMENT_DISABLED`. The current Vercel account cannot inspect that deployment. Existing client proxy paths remain unchanged. Marketing links now go through a client-access page which checks availability and offers support when unavailable. Restoring the upstream requires its owning account; no financial or billing changes were attempted.

The CRM remains authenticated through existing Next API routes. Its database access uses server-side service-role credentials. A migration enabled RLS on `crm_leads` (previously disabled), added nullable unique `sdr_events.event_id`, and added a service-role-only rate-limit RPC. Rate-limit behaviour was verified inside a rolled-back transaction: true, true, false for limit 2. Anonymous read returned zero visible leads. No customer records were queried or modified.

Analytics is optional and disabled before consent. It records page/service/media/campaign context and a random session identifier, not form answers, patient data or messages. Event validation rejects CRM paths and foreign origins. Booking lifecycle data is necessary operational data and independent of optional website analytics. No-show updates are labelled `no_show_updated` until an explicit attendance value is verified. Meeting-end events retain the legacy `call_held` label; that provider event does not establish attendance, conversion, revenue or sales outcome.

Completed films were integrated from the separate production task. Its QA summary passes automated media checks but human listening/viewing approval is pending. Keep final public release gated on that review.
