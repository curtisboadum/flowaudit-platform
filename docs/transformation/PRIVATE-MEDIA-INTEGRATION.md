# Private film review integration · 21 October

Read-only production handoff: `/Users/curtis/Documents/Codex/2026-10-21/task-2/private/docs/INTEGRATION-HANDOFF.md`.

Local-only review: http://127.0.0.1:3017/review.html on the connected MacBook. The review server and browser evidence live outside the site at `/Users/curtis/Documents/Codex/2026-10-21/task/private-media-review/`. It binds only to loopback and allows explicit exported files; source/ASR/model directories are blocked. The independent external reviewer cannot access this URL; the parent task handles owner attachments separately.

Browser checks passed: four native players load 88-second main and 24-second teaser exports in both aspect ratios; no autoplay, page errors or external requests; muted playback and clean-film VTT selection work. Raw/source request returns404. The server has no upload endpoint and serves with no-store, noindex and an external-connection-blocking content policy.

No films are copied to public/, committed, uploaded to Vercel or made discoverable. Public-use clearance, human listening/narration approval and independent AV review remain pending. Technical playback is not final production acceptance. Only after clearance should final exports, verified captions/transcripts/posters and evidence labels replace interim proof; preserve approval-first wording, genuine demo disclosure, chronology and no pricing.
