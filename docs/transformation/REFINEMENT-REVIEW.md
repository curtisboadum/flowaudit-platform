# Independent refinement review · 21 October 2026

Reviewed the uncommitted refinement diff against 3a6c0a8. No source edits were made by this reviewer. This is a scoped website review, not full media acceptance or production authorization.

## Verdict

**Technical/security/factual scope: PASS for continued staging review.** The principal follow-up changes are concrete and consistent with the brief: duplicate booking qualification is removed, context goes into the provider's native optional notes field, consent/locale UI changes do not recreate the calendar, active public pages now have Spanish website copy, and poster discovery/transfer weight improves. No new unsupported integrations, pricing, customer outcomes, legal-compliance claims or privilege expansion were found in this diff.

**Performance: improved, target still open.** Optimized lab LCP is 2.7s on both product and demos; neither meets the <2.5s good target. Do not mark that requirement PASS solely because Lighthouse performance scores are 96/97.

**Whole mission: INCOMPLETE.** Relevant publicly cleared home-services proof and finished video deliverables remain separate blockers.

## Reviewed changes

### Booking and consent

`BookingPage` no longer renders a duplicate industry/problem/setup questionnaire or remounts the embed after submitting context. It initializes service/URL attribution, then uses a persistent `CalEmbed` without revision keys or consent-change listeners. Industry/problem/setup prompts now direct visitors to Cal's native optional Additional notes field after choosing a time. The new source does not alter provider fields, credentials, permissions or live event settings.

`CalEmbed`'s lifecycle effect depends on brand color, container ID and service, not locale or analytics preference. Opening guidance and changing consent therefore do not restart its inline initialization. The new synthetic browser test verifies a single inline mount and preserved selected-slot marker through accepting/declining analytics. This is appropriate safe-test evidence; it does not claim an actual provider reservation or completed booking.

Notes are explicitly business-only and are not copied into website analytics. Removing the browser journey ID from provider metadata is deliberate; signed booking events remain separate operational evidence and should not be represented as complete anonymous per-session funnel joins. URL service/ref/UTM attribution remains available.

**Resolved service-navigation edge case:** Recheck confirms `BookingPage` captures its initial service/notes in immutable component state and derives both visible offer and provider config from that session. Its initialization effect now depends on the stable session rather than incoming query props. Query-only Next navigation therefore keeps the mounted session's original service/context; a fresh page visit begins a new session. The expanded synthetic test clicks the actual footer “Book a call” link to navigate from a service-specific URL to `/book`, then checks the same iframe marker, one inline mount and original service metadata on the fallback URL. This directly addresses the previously reported stale-prefill/reinitialization path without using private iframe APIs. Parent reports the latest build/lint/51-unit and focused-browser checks passing; the review did not create a live provider reservation.

### Language and claims

New home-services/trades, automotive, property, IT and professional-service records now have distinct Spanish titles, intros, workflow examples and boundaries. Trust content and demo review-card titles/bodies/links are translated rather than merely marked English. Website translations preserve the qualified scope and do not introduce extra phone-agent language capabilities. English video captions/transcripts remain explicitly disclosed as English. The hosted Cal interface remains a third-party surface, not a custom translated widget.

The browser test checks Spanish headings and no English-only review cards on the new journey; unit checks verify the industry copy fields differ. Source inspection of the new translations found no obvious meaning change into promises of dispatch, emergency response, compatibility or verified customer deployments.

### LCP and assets

Priority routine media now renders `poster` plus a high-priority preload during initial rendering instead of waiting for IntersectionObserver. Below-fold media retains deferred poster behavior. The routine poster is an actual source image, not a fabricated screen. Original JPEG remains intact.

Independently verified file sizes: WebP **13,614 bytes**, original JPEG **100,198 bytes** (86.4% reduction). The optimized 960×540 image was visually inspected; it retains the same recording/calendar picture and disclosure. This check is not new public-use clearance for the underlying demonstration.

Tailwind automatic source scan is limited to active `src` (`source("../")` from `src/app/globals.css`), avoiding archived material. No dependency or runtime API expansion is introduced.

## Evidence independently read

- `git diff --check`: PASS.
- `refinement-browser.json`: **72 passed, 1 skipped, 0 unexpected, 0 flaky**, 67.62 seconds. The intentional skip remains the live-provider smoke test.
- `refinement-poster-booking-browser.json`: **4 passed, 0 skipped/unexpected/flaky**, 2.22 seconds.
- Parent reports final 51-unit-test, lint/types/build PASS; reviewer did not rerun the whole suite concurrently.
- `refinement-performance/product-optimized.json`: **96/100/100/100**, LCP **2.7s**.
- `refinement-performance/demos-optimized.json`: **97/100/100/100**, LCP **2.7s**.
- Raw earlier samples in the same folder show product **3.5s** and demos **3.2s**. The original checkpoint's demo sample was **3.0s**. Report the sample provenance rather than mixing them into one repeated-measure guarantee. Lab results vary; these are not field Core Web Vitals.
- Owner-review screenshot artifacts belong to **3a6c0a8**, before these refinements. They must not be labeled as screenshots of this current refinement. This reviewer inspected the new poster only, not a new owner-review screenshot batch.

## Remaining boundaries

- New refinements need their own commit, build evidence, CI and preview confirmation; green CI for 3a6c0a8 does not automatically cover this uncommitted diff.
- Existing Vercel preview protection must remain enabled; no access-bypass secret should be shared. A protected URL is not anonymous public access.
- No real test appointment or external email was created by this review.
- No audio/frame redaction, public-use rights, final-film decode or listening approval was established by this source review. Keep media blockers explicit.
- No memory was edited, and no production release is approved.


## Subsequent private-media checkpoint (parent report only)

Parent reports a loopback-only allowlisted film player at 127.0.0.1:3017: four captioned assets load metadata at 88/24 seconds, no external requests/errors and source-directory requests return 404. This reviewer did not independently inspect that player or film audio. Playback metadata and source-path isolation do not resolve publication rights, human listening, semantic transcript/PII review or full A/V gates. They do not change the whole-mission incomplete verdict above.
