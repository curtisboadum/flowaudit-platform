# Phone-agent campaign funnel handoff · 9 October 2026

Review in [PR #20](https://github.com/curtisboadum/flowaudit-platform/pull/20), branch `feat/premium-redesign`. Protected Git-connected preview: https://flowaudit-platform-git-feat-premium-redesign-curtisboadums-projects.vercel.app/phone-agent (Vercel sign-in may be required). Production release has not been performed.

## Delivered

- The approved five-minute VSL is in the offer-page hero, with native controls, mobile inline playback, existing poster, one baked caption layer, downloadable captions, full transcript, chapters and shorter evidence choices. Existing film and audio assets are unchanged.
- One layered dental destination covers practice owners, managers and operations/group buyers. Operational FAQs distinguish demonstrated Google Calendar booking from unverified PMS integrations, clinical triage, privacy assurances, transfers and reporting. No testimonials, results, public prices or guarantees were invented.
- Calendar-first booking with a collapsed optional context form; no required pre-booking fields or duplicate name/email collection. Applying context passes notes to Cal and clearly warns that it reloads the calendar. Context drafts stay in component memory. Calendar fallback, call preparation and provider-reported confirmation/request states are present.
- Consent-scoped page/CTA/qualification/video measurement. Unique watched coverage excludes seeking and repeated coverage; video starts/milestones and qualification events deduplicate per consented session. Provider readiness is distinct from iframe load. A booking click or browser confirmation is never a server-confirmed booking or attended call.
- [Evidence reconstruction and anonymised lead findings](EVIDENCE-AND-STRATEGY.md), [buyer-question matrix](BUYER-QUESTION-MATRIX.md), [analytics semantics](../ANALYTICS.md), [sanitised dependency probes](../evidence/phone-funnel-integrations.json).

## Verification

Final local production build, ESLint, TypeScript and 29 unit tests pass. The full browser run passes 32 tests, including the opt-in read-only live Cal smoke. CI normally runs 31 deterministic tests and skips the external smoke. [Browser report](../evidence/e2e-results.json).

Coverage includes 13 public-route regressions, mobile navigation, Spanish persistence, keyboard film tabs/transcript, native VSL decoding/play/pause, chapters without false progress, consent withdrawal, optional form drafts/attribution, zero required context fields, Cal callback readiness/request/accepted states, media failure and delayed/unavailable calendar recovery. Axe found no violations on our offer and booking UI at 360, 390, 768, 1024 and 1440px. Third-party calendar internals are not certified by those host-page accessibility checks.

Screenshots were reviewed; mobile headline spacing and fallback contrast were corrected. Native video controls and fullscreen entry were also inspected in the in-app browser. This does not replace physical iOS/Safari/Android testing or a fresh human end-to-end listening review. The film's existing production QA and the user's ready statement remain the approval basis. English captions are baked; no toggle to remove them is promised. Real bookings, customer calls, form receipt in a live booking and provider webhook delivery were not exercised.

Mobile Lighthouse on the local production build: offer 95 performance / 100 accessibility / 100 best practices / 100 SEO, LCP 3.0s, CLS 0. Booking scored 97 performance / 100 accessibility / 77 best practices / 100 SEO; the best-practices deductions are Cal/Cloudflare third-party cookie and browser cookie issues. Direct booking remains available if an embed is blocked. Booking results are in [performance evidence](../evidence/phone-funnel-performance.json). These are lab samples, not field Core Web Vitals or an SLA. External provider timing varies.

- [Mobile offer](../evidence/phone-funnel-offer-390.png) · [Desktop offer](../evidence/phone-funnel-offer-1440.png)
- [Mobile live calendar](../evidence/phone-funnel-live-calendar-390.png) · [Desktop live calendar](../evidence/phone-funnel-live-calendar-1440.png)
- Deterministic empty/provider-blocked booking screenshots and tablet sizes are adjacent in `docs/redesign/evidence/`.

## External gaps and release requirements

1. **Booking measurement:** production `CAL_WEBHOOK_SECRET` is empty; `CAL_EVENT_TYPE_IDS` is absent. Cal settings redirect to sign-in. An account owner must configure matching secrets, verify the actual event ID and deliver a signed test webhook that stores once on duplicate delivery. Then perform an expressly authorised test booking to verify notes, attribution, confirmation, cancellation and CRM receipt. No such booking or outgoing message was authorised or created here. Public calendar rendering works independently; confirmed-booking measurement is not complete.
2. **Old production versus branch:** the current live webhook returned 401 to an unsigned probe; the redesigned missing-secret receiver returns 503 and has a unit check. The current live chat endpoint returned 400 to an empty probe. The branch defaults chat off and `CHAT_ENABLED` is absent. Do not conflate reviewed branch behaviour with deployed production.
3. **Chat providers:** actual environment-based probes still return Gemini 403 leaked-key rejection and DeepSeek 402 insufficient balance. Keep optional chat disabled. Replace/restore providers in their owning accounts and retest before enabling.
4. **Revenue Recovery:** upstream remains HTTP 402 `DEPLOYMENT_DISABLED`. Restore through the deployment owner. The existing availability recovery path remains; no billing or provider settings were changed.
5. **Delivery proof before accepting a particular practice:** verify that practice's system, routing, workflows, exceptions, applicable data obligations/vendor agreements, implementation effort, acceptance tests, support and commercial/exit terms. The matrix explicitly records these unknowns. A demo recording is not production capability proof.
6. **Campaign readiness:** the real queue is US-heavy and executive-heavy, but verification levels vary and all location counts are blank. Revalidate contacts and their actual situation. Existing personalised messages contain absolute coverage claims that the evidence does not support. Use the prepared qualified copy before authorised outreach; no campaign was sent or modified.
7. **Release:** review this protected preview and PR, retain deployment protection, resolve any release-critical delivery/privacy terms, and obtain the user's final production-release approval before merge/deploy. There is no automatic release or public-price approval in this work.

## Research access limits

Named accessible Codex, ChatGPT and local OpenCode sources are listed in the evidence register. A specifically named revision-5 OpenCode conversation was not found; its evidence document and selected master were available. Not every historical chat was accessible/searchable. No current production phone-agent console, executed customer contract or customer outcome dataset was supplied. Raw leads and private price hypotheses remain outside the repository. The private delivery-cost worksheet is in Klaus Vault; it does not publish new prices or pretend costs are known.
