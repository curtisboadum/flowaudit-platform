# Independent conversion-iteration review · 21 October 2026

Current source review is of the uncommitted iteration after f048693, including the owner's urgent correction superseding the earlier dental-proof hero. No source edits or creative/media renders were made by this reviewer. This document replaces the earlier iteration's findings so they are not mistaken for current defects.

## Scoped verdict

**PASS for continued staging review.** General homepage and product now contain no dental video/player. They use a static, visibly labeled illustrative call workflow. Product-specific configuration content is meaningfully distinct from the homepage. The booking hierarchy and optional native provider notes remain clear. No new pricing, contractual promises, fabricated proof, universal integration claim or customer outcome was found in the reviewed changes.

This is not production approval, full-media acceptance or evidence that the static workflow is a functioning demonstration. Publicly cleared home-services proof remains a substantive commercial gap.

## Owner correction verified

`phone-platform.tsx` no longer imports or renders `MediaPlayer`. The shared home/product hero uses an `aside` labeled “Illustrative call workflow,” three textual stages and the visible statement: “Illustrative workflow. Configuration and testing required. This is not a recorded demonstration.” The Spanish statement preserves the same meaning. Bookings/callbacks/handoffs are qualified by configuration and testing. There are no fabricated application screens or source-call claims in this static graphic.

Dental recordings remain only on their targeted dental page and the explicitly labeled demo library; they are not presented as home-service evidence. The new browser test asserts zero videos in the homepage/product `main`, plus the illustrative disclaimer and four product configuration articles.

Resolved UI consistency: the static workflow link now uses ↗ rather than a playback triangle, matching its section-navigation action.

Parent reports that the privately produced films were rejected by the owner, their loopback review server was stopped, and none were integrated. This review does not endorse those films. No new creative render was requested or performed.

## Conversion and semantic review

- Homepage audience appears earlier; home services is the initial focus without restricting the entire company to one industry.
- Product page explains enquiry understanding, useful detail collection, agreed next steps and human fallback. Booking requires tested scheduling access; callback requests and live transfer are explicitly distinguished. Routing, timezones and unavailable connections are requirements to assess, not already-supported integrations.
- Home-services/trades primary links reach honest held-recording context at `/demos#industry-recordings`. This preserves privacy/rights boundaries but does not yet supply the relevant playable proof requested in the original brief.
- Demo library places a booking CTA immediately after its explicitly labeled dental recording. Watching remains optional; no lead form gates that example.
- Native Evidence details uses `summary` as the first child of `details`, with no nested interactive element in the summary. Transcript/download links remain in accessible disclosure content. English captions/transcripts are labeled as English. The new browser test focuses the evidence summary and opens it with Enter.
- Demo-library HTML poster title is a label over unchanged source pixels, with `aria-hidden` and `pointer-events:none`, so it does not intercept native video controls or pretend to be source UI. It disappears on actual playback. This label is not present as a home/product film.
- Visible unavailable-video recovery remains outside the closed disclosure. The slow-loading explanatory message remains inside; surfacing it outside too is an optional usability refinement.
- Booking now has a compact action-specific heading; calendar precedes preparation/context disclosures. Existing immutable session state preserves selected-slot behavior through consent/locale and query-only navigation. Native Cal notes remain the only optional context collection path; no duplicate questionnaire, private iframe API or live provider setting mutation is introduced.

## Commercial-language recheck

Shared process and marketing FAQs no longer impose the old initial-payment sequence. Recheck also confirms the corresponding sequencing was removed from How It Works supporting copy, dental buyer details, assistant prompt and relevant English/Spanish legal marketing text. The earlier review's advisory about those surfaces is resolved.

Existing verbatim legacy dental overview audio/transcript still contains its original payment line. It has not been falsely edited out of the written transcript while remaining audible. Preserve this distinction and do not claim that historical media has been rewritten. Operational references to payments/invoices in secondary-service policies are not public rate cards and were not treated as new marketing promises.

## Evidence and remaining gates

- PASS: `git diff --check` independently.
- Earlier `conversion-browser.json` independently read: **73 passed, 1 intentionally skipped, 0 unexpected, 0 flaky**, duration **65.34s**. This predates the final urgent no-dental correction and must not be presented as final evidence for that source.
- Parent reports the urgent no-dental run produced **72 passed, 1 skipped, 1 failed**: the existing landscape test still expected a routine player on the homepage. The new zero-home/product-video assertions and compact booking geometry passed. The stale landscape assertion was changed to inspect `/demos`; this was a test expectation mismatch, not an observed application failure. Final rebuild and full rerun remain pending at this documentation update. Do not call the previous JSON the final no-dental suite result.
- Parent owns final build/types/lint/unit checks and preview/CI confirmation for this exact iteration. Earlier screenshots/CI are not automatically evidence of the new source.
- Static hero changes may affect performance; read fresh results instead of carrying forward earlier LCP scores. Prior 2.7-second samples did not meet the <2.5-second target.
- Keep Vercel Authentication/noindex and private showcase protections. No bypass token, prospect identity, unreviewed recording or public-use consent is introduced by these changes.
- Whole mission remains incomplete pending relevant cleared proof and owner-approved finished media. Rejected films, local playback, source availability and a production bible do not satisfy publication, full listening, semantic redaction or A/V gates.

No secrets, privilege expansion, production mutation or memory edit were made by this review.


Final frozen correction rerun: conversion-final-browser.json records73PASS/1intentional skip/0unexpected/0flaky. Native mobile geometry: Choose your time y391.33px at390px width. Both general main elements have zero video players and visible illustrative-workflow disclosure. Ten Library screenshots replaced with this corrected layout; original identities retained. No rejected films integrated.
