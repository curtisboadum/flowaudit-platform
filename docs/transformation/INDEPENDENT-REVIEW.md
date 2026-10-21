# Independent code, security and factual review · 21 October 2026

Review covers the transformation diff against 7cf9785, with an initial review and a source recheck after implementing fixes. This is not production approval or a claim that the full media brief is complete.

## Scoped verdicts

- **Technical source review: PASS for reviewed fixes, subject to final build/browser evidence.** No new auth weakening, credential creation, arbitrary execution, production-setting changes or privileged API expansion found. Existing private-showcase protections are retained. Typecheck and `git diff --check` passed independently during review.
- **Factual/public-content review: remaining correction and fresh-bundle verification required.** Source import path for obsolete dictionaries is fixed. Clinics Spanish headline still contains the every-call absolute at recheck; see pending items below.
- **Whole-task acceptance: INCOMPLETE.** Five-demo public release, main/extended/teaser finished films, rights/privacy clearance, narration and media QA remain explicit gaps. A production bible is not a finished film. Do not present this review as whole-task PASS.

## Resolved findings · source verified

1. **Legacy public-dictionary exposure:** Initial generated output contained obsolete pricing examples and unsupported absolutes in `.next/static/chunks/9120-a152b739c0358d38.js`. Recheck confirms `LocaleProvider` now carries only locale and setter; `i18n.ts` imports no dictionaries and contains no discount helper. Legacy translation and unused section/content source is archived as `.txt` outside `src` and `public`, preserving history without runtime imports. A fresh production build and bundle scan must confirm the old chunk is gone; the old output was not itself proof of a failed fix.
2. **Desktop hero CSS collision:** New hero now uses `fa-call-first-hero` with explicit `display:grid`, desktop columns and a ≤900px single-column override. It no longer inherits `.fa-phone-hero {display:block}`. Verify actual screenshots/computed layout in final browser pass.
3. **Retired media anchors:** Overview link now uses `/industries/dental#full-demonstrations`; routine link uses `/industries/dental#demo` and “See the dental overview.” These target the retained dental page instead of removed general-product anchors.
4. **Shared service positioning:** A separate `dentalOffer` preserves targeted dental content; common phone service label, headline, intro and note now describe general service-business phone agents, USA primary / UK supported. `/services` no longer needs to inherit the dental/DSO intro.
5. **English clinics absolute:** English title now says “Help with patient enquiries” rather than “Answer every patient call.” Spanish remains to correct.
6. **Public historical monetary film:** Five-minute arithmetic film and its downloads/transcript moved outside `public/`; runtime transcript entry and player choice removed. Historical source is preserved, not destroyed.
7. **Booking event semantics:** Client funnel whitelist does not admit invented `booking_confirmed`; genuine provider confirmation paths remain separate. New test verifies rejection of unsupported client booking confirmation.

## Pending corrections / limitations

1. **P1 · Spanish clinics every-call absolute.** `src/lib/editorial-copy.ts` clinics title still says “Atiende cada llamada de paciente” (= answer every patient call). Replace with qualified enquiry-handling language in Spanish too, then include both languages in public-content scans.
2. **P2 · Final browser tests still contain retired assertions.** `tests/e2e/marketing.spec.ts` around lines 391/403 still refers to “Back to the overview” and `main` media. Source routes have changed correctly; update test expectations to the retained dental overview/summary and run the entire browser suite. `vsl-journey.spec.ts` now points to the dental route; no full suite was run concurrently by this reviewer.
3. **P2 · Language attribution.** New industry helper copies English into Spanish fields, demo cards are English-only, and `/trust` is English-only while global locale can set `html lang=es`. Translate or explicitly mark English-only sections with `lang=en`/provide a clear English fallback. This is a language/accessibility limitation, not evidence of translated completion.
4. **P2 · Booking context still resets the calendar.** Optional context uses `setRevision` and remounts the Cal embed. Existing disclosure asks users to apply context before choosing a time. Determine whether supported provider APIs can update context without losing selection; otherwise retain the disclosure and report the limitation. No live Cal settings were changed.
5. **P2 · Shared social card remains broad.** `src/app/opengraph-image.tsx` still says “Phone handling · Operations · Revenue recovery · Websites.” Refocus it on phone agents for consistency; secondary services can remain discoverable in their own journeys.
6. **P2 · Final scope gaps.** Five-demo public library currently offers one cleared recording and four held-context cards. Main film script/bible is deliberately unfinished pending verified source dialogue, clearance/redaction and suitable narration. Those gaps must remain explicit and block full-mission completion claims.

## Validation evidence

- PASS: independent `pnpm --config.verify-deps-before-run=false typecheck` during initial review.
- PASS: `git diff --check` at initial review and after source-fix recheck.
- Confirmed initial defect: public bundle included legacy monetary examples/absolute claims.
- SOURCE FIX VERIFIED: obsolete dictionary runtime import path removed.
- PENDING: fresh-bundle content scan after current build; final lint/types/unit tests/build; browser/axe/Lighthouse evidence; media decode/listening/rights verification. Parent owns final execution and exact results.

No new public link exposes the supplied prospect token or personalized showcase label. No memories were edited. Findings were sent to the implementing parent incrementally; this review is stored in docs to respect the user's instruction not to alter local memory.

## Implementation response
After review: Spanish clinics absolute corrected; social card now phone-agent focused; stale film assertions updated; trust/demo English-only blocks marked lang=en. Calendar context deliberately remains optional, with an explicit warning that applying it reloads the provider before time selection; changing live Cal behavior is outside scope. Fresh bundle scan excludes technical React reference tokens from monetary-amount matching. See final QA report for executed evidence rather than treating earlier results as final.
