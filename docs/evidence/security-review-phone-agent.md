# Security Review — feat/phone-agent-offer

**Date:** 2026-10-07
**Scope:** Full branch diff vs `origin/main` (19 files changed, 3 deleted components, new page + assets + booking constant).

## What was checked

- **Injection / XSS:** no new user input handling, no new forms, no new API routes. New copy is static; JSON-LD on the new page is built from static translation objects (no user data). No `eval`, no `Function`, no unsanitized `dangerouslySetInnerHTML` added (grep of the diff: zero hits).
- **Secrets exposure:** diff scanned for keys/tokens/passwords; none. The new `BOOKING_URL` constant is a public Google booking link intended to be published, not a credential.
- **Auth / authz:** untouched. No changes to middleware, CRM routes, or session handling.
- **External links / third-party surface:** the booking pages embed cal.com (official `app.cal.com/embed/embed.js` + iframe from `app.cal.com`; the Calendly embed was removed earlier and the Google appointment-schedule link was replaced by this migration). The embed's fallback link points at `https://cal.com/curtis-salesos/flowaudit-call` with `target="_blank"` and `rel="noopener noreferrer"`.
- **Supply chain / third-party surface:** the Calendly embed (external CSS + JS from assets.calendly.com) was removed, reducing third-party script surface. No new third-party scripts added.
- **Static assets:** the new video and poster ship from `/public` and were verified first-hand for PII (KedoLabs branding and a phone number masked/bleeped; the separate caption track was removed in video revision 3). Method and evidence: `docs/evidence/phone-agent-demo-video.md` (first_hand_check PASS).
- **Data handling:** no analytics, tracking, or storage added by this diff.
- **Redirects:** `/results` now redirects to `/` (removed fabricated content). No open-redirect patterns introduced (static target).

## Findings

None at or above the 80% confidence / exploitable threshold.

## Non-code follow-ups (for the owner)

1. ~~The Google Calendar appointment schedule uses the account profile name "management4ck" as the public organizer identity on the booking page.~~ Resolved: booking moved to cal.com (2026-10-07) and the cal.com profile now displays "FlowAudit" with a brand avatar. The legacy Google schedule is left online but unlinked from the site; retire it when convenient.
2. Re-run `chrome-use a11y` / Lighthouse when the CDP relay is stable (the audit failed with a channel error mid-session; manual checks are recorded in the design review).
