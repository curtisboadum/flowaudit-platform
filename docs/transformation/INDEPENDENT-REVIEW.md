# Independent website review · 21 October 2026

Rechecked source and recorded evidence at **4fb6f97**, draft PR **#32**. This review covers the website checkpoint only. It does not accept the unfinished video mission or authorize a production release.

## Scoped verdicts

- **Website technical source: PASS for staging review.** Previously identified runtime dictionary leak, hero CSS collision, broken media links and catalogue positioning issues are fixed. Independent source inspection and `git diff --check` found no remaining blocking source defect in the reviewed changes. Final build/browser evidence is recorded below. Latest CI remains pending after the origin-specific test correction; local evidence is not a substitute for claiming CI passed.
- **Website security/privacy source: PASS within changed scope.** No new authentication weakening, credential creation, privileged API expansion, token publication or production-setting change found. Existing private showcase/watch protections remain. Unreviewed showcase media has not been added to the new discoverable demo journey. Do not interpret noindex as access authorization or evidence of publication rights.
- **Website design: PASS as a coherent reviewable foundation.** Desktop and 390px homepage screenshots were inspected. Warm editorial typography, clear call-first headline, restrained palette, consistent spacing, real recording and subordinate secondary services form a cohesive journey. Desktop proof sits beside the headline; mobile stacks cleanly with visible actions and no evident horizontal clipping. Consent now sits in document flow and does not cover the hero CTA. The proof panel still contains many download/explanation controls; it could be simplified progressively when relevant reviewed home-services proof is ready.
- **Whole-task acceptance: INCOMPLETE.** Five-demo public release, finished 75–90s main VSL, conditional extended film, teasers, 9:16 masters and their final audio/caption/media QA remain undelivered here. The production bible is not a finished film. Do not describe this scoped review as whole-mission PASS.

## Findings resolved · source verified

1. Initial browser output contained legacy monetary examples and unsupported every-call claims because `LocaleProvider → i18n → translations` imported both complete dictionaries. `LocaleProvider` now carries only locale/setter; `i18n.ts` imports no dictionaries or discount helper. Obsolete source is preserved as `.txt` outside `src` and `public`. Fresh generated public-content scan reports zero matches for the defined monetary/absolute-claim patterns.
2. New `fa-call-first-hero` explicitly declares desktop grid and a ≤900px single-column layout, isolating it from the legacy `.fa-phone-hero {display:block}` rule. Screenshot inspection confirms the intended layout.
3. Overview/routine media links now target retained dental sections, with corrected link wording. The general product page no longer needs the removed `full-demonstrations` anchor.
4. A separately preserved `dentalOffer` retains targeted dental copy; common phone-agent service catalogue language is general, USA primary / UK supported.
5. Clinics every-call headline is qualified in both English and Spanish. Spanish now says “Ayuda con consultas de pacientes.”
6. Historical five-minute arithmetic film and downloads/transcript moved outside public assets. Runtime transcript entry/player choice removed. Source history was preserved rather than destroyed.
7. Social card now leads with “AI phone agents & voice automation · USA & UK.”
8. English fallback industry content and technical/demo blocks have explicit language tagging where implemented; this improves language attribution but does not constitute full Spanish localization.
9. Browser tests were adapted to the retained dental journey and calendar-first booking. Final bounded local browser JSON records 71 expected passes, one intentional skip, zero unexpected failures and zero flaky results; focused rerun records 28 expected passes and zero failures.

## Evidence inspected

- Source recheck at 4fb6f97 and independent `git diff --check`: PASS.
- Independent initial TypeScript check: PASS. Final parent-run strict types/lint and 50 unit tests: PASS per QA report; production build generates 65 routes.
- `browser-all.json`: 71 passed, 1 intentionally skipped, 0 unexpected/flaky; duration 67.98 seconds. Live Cal smoke is intentionally opt-in/skipped; no test appointment was created.
- `browser-final.json`: 28 passed, 0 skipped/unexpected/flaky; current JSON duration 16.97 seconds.
- `public-content-scan.json`: zero matches across `.next/static/chunks`, `.next/server/app`, `public` for its defined monetary/absolute-claim patterns. This targeted scan does not establish every spoken word or image pixel is clear; no end-to-end audio/media rights review is claimed.
- Visual inspection: `home-desktop.png` and `evidence/home-390.png`.
- Lighthouse raw JSON independently read: home **96/100/100/100**, phone-agent **91/100/100/100**, demos **95/100/100/100**, home-services **98/100/100/100**, booking **98/100/77/100** (performance/accessibility/best-practices/SEO). CLS 0 in all five samples. These are lab measurements, not field Core Web Vitals.
- Preview provided by implementer: https://flowaudit-platform-b9xgh7690-curtisboadums-projects.vercel.app . Parent verified HTTP 200 and noindex; reviewer did not independently make a preview-network request. Draft PR: https://github.com/curtisboadum/flowaudit-platform/pull/32 . Production remains unchanged.

## Remaining limitations / blockers

1. **Media and commercial evidence:** The new discoverable library has one previously documented redacted dental recording and four held-context cards. Relevant home-services proof still requires verified dialogue, privacy redaction and public-use rights. Existing source accessibility is not consent. No fabricated workflow or customer success may be inserted to fill the gap.
2. **Finished production:** Main film, extended film decision, teasers, portrait versions, final SRT/transcript/stems and edit QA remain separate deliverables. Current production bible accurately describes gaps; it must not be presented as completed production.
3. **CI resolved after review:** Initial origin-hardcode issue was fixed in 4fb6f97. Source CI run 39540762265 subsequently completed successfully. Draft PR remains appropriate because media and full acceptance remain open.
4. **Performance targets not all met:** LCP lab samples are home 2.8s, product 3.5s, demos 3.0s, home-services/booking 2.5s. Product/demos (and home) exceed the <2.5s “good” target. Booking best-practices 77 reflects existing Cal third-party-cookie/Issues-panel behavior; no live provider settings were changed. Report these gaps without claiming all quality targets passed.
5. **Booking context:** Applying optional context remounts the existing calendar; users are warned to apply it before selecting a time. Persistent direct provider fallback remains. No real confirmed-booking receipt was tested; a genuine supported provider event remains required for confirmation measurement.
6. **Partial localization:** Language tagging now distinguishes English fallback content, but the new industry/trust/demo content is not fully translated. Do not claim full bilingual parity.

No memories were edited. Review files live in docs, respecting the user's no-memory-change instruction. No production release, paid purchase, DNS change, new credential or sales outreach is included in this review approval.
