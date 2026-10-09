# Phone-agent campaign funnel handoff · 9 October 2026

Review in [PR #20](https://github.com/curtisboadum/flowaudit-platform/pull/20), branch `feat/premium-redesign`. Protected Git-connected preview: https://flowaudit-platform-git-feat-premi-095c5f-curtisboadums-projects.vercel.app/phone-agent (Vercel sign-in may be required). Production release has not been performed.

## Delivered

- The approved five-minute VSL is in a dedicated evidence section (`#demo`), with native controls, mobile inline playback, existing poster, one baked caption layer, downloadable captions, full transcript, visible keyboard-accessible chapters and shorter evidence choices. Following the user’s horizontal-format correction, the four public films are reflowed to native 1920×1080 landscape. Audio packets, segment/caption timings and transcripts are unchanged; the original portrait exports remain in the approved production handoff.
- One layered dental destination covers practice owners, managers and operations/group buyers. Operational FAQs distinguish demonstrated Google Calendar booking from unverified PMS integrations, clinical triage, privacy assurances, transfers and reporting. No testimonials, results, public prices or guarantees were invented.
- Calendar-first booking with a collapsed optional context form; no required pre-booking fields or duplicate name/email collection. Applying context passes notes to Cal and clearly warns that it reloads the calendar. Context drafts stay in component memory. Calendar fallback, call preparation and provider-reported confirmation/request states are present.
- Consent-scoped page/CTA/qualification/video measurement. Unique watched coverage excludes seeking and repeated coverage; video starts/milestones and qualification events deduplicate per consented session. Provider readiness is distinct from iframe load. A booking click or browser confirmation is never a server-confirmed booking or attended call.
- [Evidence reconstruction and anonymised lead findings](EVIDENCE-AND-STRATEGY.md), [buyer-question matrix](BUYER-QUESTION-MATRIX.md), [analytics semantics](../ANALYTICS.md), [sanitised dependency probes](../evidence/phone-funnel-integrations.json).

## Verification

Final local production build, ESLint, TypeScript and 29 unit tests pass. The current browser run passes 35 deterministic tests; the opt-in read-only live Cal smoke passed separately. CI skips that external smoke. The landscape layout passed the same deterministic browser suite; final protected deployment checks are recorded in the customer audit. [Browser report](../evidence/e2e-results.json).

Coverage includes 13 public-route regressions, mobile navigation, Spanish persistence, keyboard film tabs/transcript, native VSL decoding/play/pause, chapters without false progress, consent withdrawal, optional form drafts/attribution, zero required context fields, Cal callback readiness/request/accepted states, media failure and delayed/unavailable calendar recovery. Axe found no violations on our offer and booking UI at 360, 390, 768, 1024 and 1440px. Third-party calendar internals are not certified by those host-page accessibility checks.

Screenshots were reviewed; mobile headline spacing and fallback contrast were corrected. Native video controls and fullscreen entry were also inspected in the in-app browser. This does not replace physical iOS/Safari/Android testing or a fresh human end-to-end listening review. The film's existing production QA and the user's ready statement remain the approval basis. English captions are baked; no toggle to remove them is promised. Real bookings, customer calls, durable form receipt in a live booking and provider webhook delivery were not exercised. Synthetic context was visibly forwarded into the direct provider’s notes field before booking submission.

Mobile Lighthouse on the local production build: offer 95 performance / 100 accessibility / 100 best practices / 100 SEO, LCP 3.0s, CLS 0. Booking scored 97 performance / 100 accessibility / 77 best practices / 100 SEO; the best-practices deductions are Cal/Cloudflare third-party cookie and browser cookie issues. Direct booking remains available if an embed is blocked. Booking results are in [performance evidence](../evidence/phone-funnel-performance.json). These are lab samples, not field Core Web Vitals or an SLA. External provider timing varies.

- [Mobile offer](../evidence/phone-funnel-offer-390.png) · [Desktop offer](../evidence/phone-funnel-offer-1440.png)
- [Mobile live calendar](../evidence/phone-funnel-live-calendar-390.png) · [Desktop live calendar](../evidence/phone-funnel-live-calendar-1440.png)
- Deterministic empty/provider-blocked booking screenshots and tablet sizes are adjacent in `docs/redesign/evidence/`.

## External gaps and release requirements

1. **Booking measurement:** production `CAL_WEBHOOK_SECRET` is empty; `CAL_EVENT_TYPE_IDS` is absent. Cal settings redirect to sign-in. An account owner must configure matching secrets, verify the actual event ID and deliver a signed test webhook that stores once on duplicate delivery. Then perform an expressly authorised test booking to verify notes, attribution, confirmation, cancellation and CRM receipt. No such booking or outgoing message was authorised or created here. Public calendar rendering works independently; confirmed-booking measurement is not complete.
2. **Old production versus branch:** the current live webhook returned 401 to an unsigned probe; the redesigned missing-secret receiver returns 503 and has a unit check. The current live chat endpoint returned 400 to an empty probe. The branch defaults chat off and `CHAT_ENABLED` is absent. Do not conflate reviewed branch behaviour with deployed production.
3. **Chat providers:** fresh read-only environment-based probes return Gemini 403 leaked-key rejection and DeepSeek balance `is_available=false` (HTTP 200). The earlier chat request returned 402 insufficient balance. Keep optional chat disabled. Replace/restore providers in their owning accounts and retest before enabling.
4. **Revenue Recovery:** upstream remains HTTP 402 `DEPLOYMENT_DISABLED`. Restore through the deployment owner. The existing availability recovery path remains; no billing or provider settings were changed.
5. **Delivery proof before accepting a particular practice:** verify that practice's system, routing, workflows, exceptions, applicable data obligations/vendor agreements, implementation effort, acceptance tests, support and commercial/exit terms. The matrix explicitly records these unknowns. A demo recording is not production capability proof.
6. **Campaign readiness:** the real queue is US-heavy and executive-heavy, but verification levels vary and all location counts are blank. Revalidate contacts and their actual situation. Existing personalised messages contain absolute coverage claims that the evidence does not support. Use the prepared qualified copy before authorised outreach; no campaign was sent or modified.
7. **Release:** review this protected preview and PR, retain deployment protection, resolve any release-critical delivery/privacy terms, and obtain the user's final production-release approval before merge/deploy. There is no automatic release or public-price approval in this work.

## Research access limits

Named accessible Codex, ChatGPT and local OpenCode sources are listed in the evidence register. A specifically named revision-5 OpenCode conversation was not found; its evidence document and selected master were available. Not every historical chat was accessible/searchable. No current production phone-agent console, executed customer contract or customer outcome dataset was supplied. Raw leads and private price hypotheses remain outside the repository. The private delivery-cost worksheet is in Klaus Vault; it does not publish new prices or pretend costs are known.

## Customer audit follow-up

[331 recorded browser interactions and inspections](../CUSTOMER-JOURNEY-AUDIT.md) distinguish manual actions, inspected links, automated checks, simulated failures and external gaps. Generic booking service selection now stays editable after choosing the phone agent, and the calendar waits for matching service context before mounting, preventing stale service metadata.

The user subsequently corrected the VSL requirement to horizontal and confirmed the reformat. The established Remotion source now renders true 1920×1080 films, rather than stretching or enclosing portrait films in a wide player. Source panels are the previously approved genuine pixel crops, rearranged horizontally. Captions sit above the native-control area, and the same VTT/transcript/chapter timings remain. Encoded audio packets match the approved originals exactly. [Media checks](../evidence/customer-audit/landscape-media-checks.json) and [editable source](../../../video/landscape/README.md).

The player uses full available content width, with visible chapters immediately below and a two-column chapter list on desktop. Fullscreen remains available. At narrow mobile widths captions are approximately 12–13px; fine demonstration UI details benefit from fullscreen, and the full transcript remains available. No production release or real booking was performed.


## 90-second primary overview · superseding media arrangement

The approved `Overview90` composition replaces the five-minute film as the primary introduction. `main` remains the optional detailed walkthrough; `routine` is a separate full recording at `/phone-agent#booking-recording`; `summary` remains available under More detail. The primary stays at `#demo`. See `OVERVIEW-COVERAGE.md` and `APPOINTMENT-VALUE-RESEARCH.md`. Runtime labels, primary transcript/VTT/poster, VideoObject duration and English/Spanish interface copy have been updated. Source and reproducible rendering remain in `video/landscape/`; original masters are unchanged. Human listening review remains an explicit limitation.
