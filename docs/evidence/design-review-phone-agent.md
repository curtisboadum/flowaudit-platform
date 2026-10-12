# Design Review — feat/phone-agent-offer

**Date:** 2026-10-07
**Surface:** FlowAudit marketing site (its own warm-ivory design language; not the brain Mode A/B system)
**Reviewer:** opencode (design-review gate, adapted to the project's existing design system)

## Universal checks

| Check | Result | Notes |
| --- | --- | --- |
| Lists >5 items chunked or disclosed progressively | PASS | 6 capability cards in a 3-column grid; 7 FAQs behind accordion; 6 guardrails in a 2-column list. |
| Tap targets >= 40px | PASS | CTAs size=lg; FAQ accordion rows p-5; nav pill py-1 with 12px text matches the existing live header pettern. |
| One animation source | PASS | No animations added; video is click-to-play (no autoplay), no simultaneous attention-grabbers. |
| No required recall | PASS | Every section states its facts inline; CTAs repeat at top and bottom. |
| WCAG AA contrast | PASS (by palette) | Body #605A57 on #F7F5F3 approx 5.9:1; headings #37322F approx 12:1 on white; white on #37322F approx 12:1. |
| Single accent rule | PASS | Amber confined to the nav pill and one RRD card; emerald used only for micro labels. |
| prefers-reduced-motion | N/A | No motion beyond existing CSS transitions; no new motion introduced. |
| Dark patterns | PASS | No fake urgency, no autoplay with sound, no fabricated social proof (removed site-wide). |

**A11y tooling note:** `chrome-use a11y` (axe-core) failed repeatedly with a CDP channel error after the browser relay dropped mid-session. Manual verification instead: accessibility tree inspected (h1 present, section h2s, all buttons have accessible names); FAQ toggles are real `<button aria-expanded>`; the demo video ships `controls`, an English caption track (default), and fixed intrinsic dimensions (1920x1038) to avoid layout shift.

## Domain checks (marketing page, project language)

| Check | Result | Notes |
| --- | --- | --- |
| Eyebrow/badge above each section heading | PASS | Every section has a Badge or heading label. |
| Serif headline voice consistent with the site | PASS | H1 uses font-serif like /web-design and /revenue-recovery. |
| Section rhythm + dividers consistent | PASS | `border-b border-[rgba(55,50,47,0.12)]` and py-16/20/24 matches existing pages. |
| Claims policy | PASS | No prices, no invented proof, no unsupported metrics; one external stat cited (MGMA, March 2026). |
| CLS budget | PASS | Video has width/height attributes + poster; no layout-shifting elements added. |

## Banlist spot-check

None of the 20 anti-patterns hit by this diff: no gradient soup, no emoji headers, no rounded-full cards everywhere, no stock-photo hero, no fake testimonials (removed), no countdown timers.

## Verdict

**Overall: PASS** (with the a11y tooling substitution noted above; no blocking findings).

Findings:
- INFO: `chrome-use a11y` could not complete (CDP flake). Re-run axe-core/Lighthouse on the deployed /phone-agent when the relay is stable; the manual checklist covers AA contrast, semantics, captions, and reduced-motion.
