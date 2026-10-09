# Redesign QA report · 9 October 2026

Implementation is complete in `feat/premium-redesign`; live-domain promotion remains gated on review and the external dependencies below. Draft PR: https://github.com/curtisboadum/flowaudit-platform/pull/20. Baseline was `838e09858942e7e435225582d14c09fd24dd2da5`; the application implementation commit is `9a55ca4`. Later commits update evidence and this handoff.

## Verified

- Optimized Next 15.5.27 production build, strict typecheck, lint and 16 unit tests pass.
- 18 Playwright regression tests pass. They cover public pages/metadata, bilingual persistence, mobile menu/Escape, editable qualification, direct-calendar bypass, referral context, keyboard film tabs, transcripts, consent and CRM/404 recovery.
- 28 public routes checked at 390 and 1440px: zero WCAG 2 A/AA, 2.1 AA and 2.2 AA tagged axe violations, zero detected horizontal overflow, no page errors. Four core journeys also checked at 360/768/1024/1920. Total report contains 76 checks. All 33 discovered first-party links returned successful responses. Client access uses its availability-aware support path.
- A 720px layout at a nominal 1440px viewport verifies 200% reflow-equivalent behaviour: no overflow or axe violations. This is a reflow check, not a claim of assistive-technology certification or exhaustive native browser zoom testing.
- Real Cal embed loaded with service/context/referral data and one iframe; direct fallback preserves context. No real appointment was created. Provider-owned confirmation and Cal Video remain the meeting path. Optional videos never gate booking.
- CRM unauthenticated endpoints return 401; private page redirects to login. Existing production admin credentials were used only in a local read-only regression: login 200, authenticated CRM read 200. No customer records were printed or changed.
- RLS is enabled on CRM leads, events and rate limits. Anonymous lead read returned zero visible rows. Rate-limit transactional test returned true/true/false at limit two and was rolled back. Event IDs are unique, webhook signatures use constant-time verification, malformed bodies and foreign analytics origins are rejected.
- Optional telemetry sends nothing and creates no journey storage before consent. Decline clears session state. Video progress uses actual watched interval coverage and rejects seek inflation. Server webhook storage failures return 503 rather than falsely reporting success.
- Sitemap, canonical metadata, robots and Open Graph render successfully. Metadata was made blocking so booking metadata is visible reliably in the document head. Robots exclude private routes. Organization/Service JSON-LD uses actual identity and offer descriptions, with no rating or fabricated review schema.
- Runtime `npm audit --omit=dev`: zero known vulnerabilities. Updated Next, jsPDF and transitive dependencies; migrated testing tooling; removed unused InstantDB scaffolding. A known-value credential scan found no secrets in versioned/new files. Private pricing notes are excluded from both Git and deployment.
- GitHub CI verify, GitGuardian and Vercel checks passed on the implementation revision. The preview retains existing Vercel authentication protection.

## Mobile Lighthouse (local production build)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 95 | 100 | 100 | 100 | 2.9s | 0 | 10ms |
| Phone agent | 93 | 100 | 100 | 100 | 3.2s | 0 | 0ms |
| Booking | 97 | 100 | 100 | 100 | 2.6s | 0 | 0ms |

These are simulated mobile lab scores, not deployed field Core Web Vitals. The agreed Lighthouse score thresholds pass; these LCP values are above 2.5s and should not be represented as a field CWV pass. Real p75 LCP/INP/CLS needs deployed traffic. A tested inline-CSS alternative scored 94/93/97 and introduced 0.02 homepage CLS, so it was rejected and the better stable stylesheet version retained. Films use native controls, preload none and posters; they do not download automatically.

## Visual evidence

Reviewed full-page desktop homepage and mobile phone-agent compositions plus booking, team and website pages. Screenshots for six widths are in `evidence`. Film/poster typography comes from the finished production handoff; the website does not invent an alternative product screen. The warm palette, serif headlines, ruled editorial sections, real evidence, clear CTA hierarchy and restrained motion are consistent. Reduced-motion CSS suppresses nonessential animation. Separate media QA reports pass full decode, dimensions, audio levels and sync checks; human film approval is still pending.

## Remaining release dependencies and limits

1. **Films:** the separate production handoff explicitly marks human listening/viewing approval pending. Review the finished main, overview, teaser and routine recording before final public release.
2. **Cal signing:** existing production `CAL_WEBHOOK_SECRET` is empty and the account settings require sign-in. Match a secret in Cal and Vercel, then verify a signed delivery, storage, cancellation/rescheduling and retry. Until then, the public calendar works but booking lifecycle tracking is not complete. No fake booking was made to imply verification.
3. **Revenue Recovery upstream:** its existing host returns HTTP 402 `DEPLOYMENT_DISABLED`. Current account cannot manage that deployment. Proxy contracts remain unchanged; public client access gives a support fallback. Owner restoration is required for operational client journeys.
4. **Development advisory:** the complete audit flags five packages in the same unpatched `braces` lint-tool chain (stack-exhaustion from deeply nested glob patterns). They are development dependencies; no runtime advisory remains. Do not feed untrusted glob expressions into development lint tooling. The registry did not provide a patched braces release at audit time.
5. **Coverage:** automated Chrome checks do not prove Safari/Firefox equivalence, full screen-reader usability, third-party Cal accessibility, legal compliance or HIPAA certification. EN/ES website UI is translated; finished films/transcripts are English and labelled accordingly. Jurisdiction-specific legal/clinical requirements remain project assessments, never public guarantees.

Pricing hypotheses, cost worksheet and commercial boundaries are in the gitignored project note and `Klaus-Vault/Knowledge/FlowAudit premium website strategy and pricing.md`. Research coverage distinguishes the 445 metadata-inventoried stars from targeted code/skill review, and indexed-source checks from runtime interaction testing.
