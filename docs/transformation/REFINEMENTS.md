# Staging refinements after checkpoint 3a6c0a8

## Booking: preserve selected slots

The public Cal event definition was inspected read-only on 21 October: its native `notes` booking field is a visible optional textarea (`required:false`). No verified public API for changing notes in an already selected inline session was established from the live embed and inspected primary source. An internal iframe reconnect method was deliberately not used.

The duplicate website context questionnaire is removed. Visitors choose a time once and can provide industry, primary call-handling problem and phone/scheduling setup directly in Cal's native Additional notes field. The calendar is no longer keyed/remounted for context edits, service changes or consent changes. The initial offer/context and attribution are fixed for the mounted booking session, including query-only navigation; a fresh page visit starts a new session. no browser analytics journey ID is injected into Cal. Opening context guidance or changing consent preserves the iframe and its selected-slot test marker. Name/email are collected once by the provider. No live account setting, event field, credential or permission was changed. No appointment or email was created.

This also removes the need to disclose a disruptive calendar reload: there is no separate context submission. Cal's actual form remains responsible for collecting optional notes with the booking.

## Website language consistency

New home-service/trades, automotive, property, IT and professional-service workflows now have Spanish titles, bodies, examples and boundaries. Trust and demo-review cards are translated; booking instructions and qualification prompts are translated. English recordings/transcripts remain explicitly identified as English. Website translation is not a promise of phone-agent language support; actual language requirements remain an implementation assessment. The hosted Cal interface remains a third-party service and is not relabeled as a translated custom widget.

## LCP diagnostics and changes

Earlier product LCP was its introductory paragraph; demo LCP was the routine recording poster. Lighthouse reported the demo image was not discoverable in initial HTML and had no priority hint. Priority media now renders its poster and high-priority preload in the initial document; below-fold recordings remain deferred.

The shorter call-focused hero brings genuine proof into view. Tailwind scanning is restricted to active src files, excluding archived project material. Measured CSS transfer decreased from 18,469 to 16,823 bytes. A subsequent measurement exposed oversize image delivery: the 1920×1080 JPEG was 100,198 bytes for a ~338–370px mobile display. The genuine poster was lossily encoded at 960×540 WebP, 13,614 bytes (86.4% smaller), preserving the original JPEG and all recorded video. No source-call dialogue, calendar contents or video timing changed. Final measurements are retained in refinement-performance/ and must be read rather than assuming all CWV targets pass.

## Protected preview review

Vercel Authentication remains enabled. Previous HTTP QA used the existing authorized CLI session; an unauthenticated external browser reaches the Vercel login page. A reviewable URL is not a claim of anonymous public access. No bypass link/secret is provided. Ten clean desktop/mobile screenshots of the exact 3a6c0a8 checkpoint were saved to Library for independent screenshot review; they precede the current refinements. The Library index is /tmp/flowaudit-review-library-index.json. The producer's prepared endpoint was unavailable (`Unknown tool: library_prepare_uploads`) before transfer; the documented direct-create fallback then saved all ten images and recorded local identities. No duplicate finalized batch was created.

Remote CI for 3a6c0a8 passed (run39541162571). New refinements require their own source CI after push. Production remains unchanged; PR32 stays draft; public home-service proof and finished films remain separate pending media clearance/production.

## Executed results

- Strict types, lint, production build: PASS. Unit suite: 51 PASS.
- Full refined safe browser suite: 72 PASS, 1 intentional live-provider smoke skip, 0 unexpected/flaky, 67.62s. Focused final poster/booking regression: 4 PASS in2.22s.
- Final local product: performance96/accessibility100/best-practices100/SEO100; LCP2.7s, TBT10ms, CLS0.
- Final local demos: performance97/accessibility100/best-practices100/SEO100; LCP2.7s, TBT0ms, CLS0.
- Initial-document poster discovery and fetchpriority are now verified PASS by Lighthouse. Original diagnostic and final files are retained for comparison. The <2.5s good-LCP target is not claimed met; these are lab samples, not field CWV.
- Generated public-content scan: zero targeted monetary/absolute-claim matches.
