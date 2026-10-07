# cal.com booking migration: Method, configuration, and live verification

Deliverable: the public booking flow on `flowaudit.co.uk` (`/book`, `/revenue-recovery/book`) now runs on cal.com instead of the Google Calendar appointment schedule, plus the cal.com event configuration itself.

## Method & Provenance

- **Inspected first-hand:** the live site pages `/book`, `/revenue-recovery/book`, `/phone-agent` and their served HTML/embeds via the logged-in Chrome session and `curl`; the cal.com app (event editor, limits, availability, appearance, bookings list) in the same session; the confirmation and cancellation emails in the recipient mailbox (curtisboadum@gmail.com, Gmail `u/1`); the live video file re-downloaded from production and swept with OCR.
- **Commands used:** `vercel --prod --yes` (deploy, alias `flowaudit.co.uk`); `curl -s -o live-download.mp4 https://flowaudit.co.uk/assets/phone-agent/phone-agent-demo.mp4` + `shasum -a 256`; `ffmpeg` frame extraction + `tesseract` OCR sweeps (5 fps whole file, band crops); `chrome-use` for browser inspection and the end-to-end booking; the exact render command in `docs/evidence/phone-agent-demo-video.md`.
- **First-hand artifacts (on disk):**
  - Live-file re-download and sweep: `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/live-download.mp4`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/tsv5-full.txt`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/band5-ocr.txt`.
  - Browser evidence: `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/book-desktop.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/book-embed2.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/rrbook-desktop.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/book-mobile.png`.
  - E2E booking evidence: `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-form-filled.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-scheduled.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-confirm-email.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-app-booking.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-cancel-page.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-cancelled.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-cancel-email.png`, `/var/folders/1l/b5kt0nlx1_98zzv0dg98c71w0000gn/T/opencode/video-sweep/v3/qa-live/screens/e2e-upcoming-empty.png`.
- **NOT inspected (explicit):** no physical mobile-device test (mobile checks used an emulated 390x844 viewport); the separate `cal.com/flowaudit` account (a different cal.com account that also has 15/30-min events) was not logged into or modified; the Google appointment schedule was not modified or deleted (left online, unlinked from the site).
- **Method limits:** cal.com admin state is observed through its UI only (no API access); email quotes are from the recipient mailbox as rendered by Gmail; the live-file OCR sweep is 5 fps (windows were audited at 30 fps during the video revision, and the live file is byte-identical to the verified local render).
- **Second-party material used:** none.

## cal.com configuration (account `curtis-salesos`, plan: Individual/free, timezone Europe/London)

| Setting | Value |
| --- | --- |
| Event | **FlowAudit Call** · slug `flowaudit-call` · public URL `https://cal.com/curtis-salesos/flowaudit-call` |
| Duration | 15 minutes |
| Description | "A 15-minute call with FlowAudit. We will look at your setup, answer your questions, and map the next step. Your booking confirmation includes a Cal Video link." (adapted from the Google page description; the Google Meet sentence replaced per the location change) |
| Location | Cal Video (was already set; no Google Meet on this event) |
| Availability schedule | New "FlowAudit Call hours": Mon-Fri 14:00-19:00 Europe/London, Sat/Sun off; not set as account default (the default schedule used by the outreach 15-min event was left untouched) |
| Limits | Buffers 15 min before / 15 min after; minimum notice 4 hours; booking window 30 calendar days, rolling ("Always 30 days available"); time-slot intervals default |
| Branding | Profile display name set to **FlowAudit** with an uploaded avatar (the site's `icon.svg` F-mark, converted to PNG); event brand color `#37322F` (light theme) |
| Untouched | `curtis-salesos/15min` (outreach) and `curtis-salesos/secret`; all other account settings |

Notes: cal.com's global "daily booking cap" is gated to organizations with 15+ members, so it is unavailable on the free plan; the 15/15 buffers bound a full day to roughly 6 bookings inside the 5-hour window. The older `cal.com/flowaudit` page belongs to a separate account and is not used by the site.

## Site changes

- `src/lib/booking.ts` — cal.com constants (`BOOKING_URL`, `CAL_LINK`, `CAL_NAMESPACE`, `CAL_ORIGIN`).
- `src/components/booking/cal-embed.tsx` — new inline embed using the official embed.js with the official queue proxy; light theme, month view, per-page brand color, idempotent init, and a "open in a new tab" fallback link.
- `/book` and `/revenue-recovery/book` — schedule buttons replaced by the inline embed; email fallback buttons kept (`support@flowaudit.co.uk`). RR embed uses its amber accent (`#B45309`).
- Copy scrub (EN + ES): all "Google Meet" booking references replaced with "Cal Video"; all call-duration copy updated from 30 to 15 minutes (book pages, phone-agent walkthrough CTAs, process section, RR landing copy, metadata descriptions). Product-level Google Workspace mentions (privacy/terms/RR integrations) were intentionally left.
- Gates: `tsc --noEmit`, `next lint`, `next build` all pass; committed and pushed to PR #19.

## Live verification

- Deploy: `vercel --prod` aliased to `https://flowaudit.co.uk`.
- Live video: re-downloaded mp4 sha256 `53f4b657c37b0d5359b9706065f38075e1b34d1a5091adefbf41b5792ba02317` — byte-identical to the verified local revision-3 render; 5 fps OCR sweep of the live file found no `kedo`/`wuss`/phone-number tokens (only appointment times and "6TH" outside the masked windows, same as the local sweep); `phone-agent-demo.en.vtt` returns 404; `/phone-agent` video element has zero `<track>` children and plays (readyState 4).
- `/book` and `/revenue-recovery/book`: embed iframe present and rendering (month view, "FlowAudit Call", "15m", "Cal Video", Europe/London) on desktop and at a 390x844 mobile viewport; zero `calendar.app.google` references in the served HTML; fallback link points at the cal.com event.
- End-to-end booking (on the live site): booked Thu 8 Oct 2026 14:00-14:15 UK as "Curtis Boadum" <curtisboadum@gmail.com> with note "E2E booking test - will be cancelled."
  - Confirmation email quoted from Gmail: from **FlowAudit <hello@cal.com>**, subject "FlowAudit Call between FlowAudit and Curtis Boadum"; body: "Confirmed — Your event has been scheduled"; When: Thursday, October 8, 2026, 2:00pm - 2:15pm (Europe/London); Where: **Cal Video** `https://app.cal.com/video/1VhuPo6LfaAQPzi51hXiUd`; Organizer: FlowAudit (management4ck@gmail.com); Guest: Curtis Boadum (curtisboadum@gmail.com); cancel/reschedule links and .ics attachments present.
  - Confirmed in the cal.com app: Bookings → Upcoming showed "Curtis Boadum · Thu, 8 Oct · 2:00pm - 2:15pm · Cal Video".
  - Cancelled via the email's cancel link (reason: "E2E booking test - cleaning up."). Cancellation email quoted: from **FlowAudit <hello@cal.com>**, subject "Canceled: FlowAudit Call between FlowAudit and Curtis Boadum at 2:00pm - 2:15pm, Thursday, October 8, 2026"; body "This event has been cancelled… Reason: E2E booking test - cleaning up."
  - Post-cancel: Bookings → Upcoming shows "No upcoming bookings"; the cancelled entry appears under the Canceled tab.
- Leftover: the Google Calendar appointment schedule (`calendar.app.google/XJudFiv57KNUpWuJ8`) is still online but is no longer referenced anywhere on the site; it can be retired whenever convenient.
