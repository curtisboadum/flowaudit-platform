# Revenue Recovery page — build + deploy handoff (2026-06-21)

## What shipped (LIVE on https://flowaudit.co.uk)
- **New page `/revenue-recovery`** — a FlowAudit-themed rebuild of the "Revenue
  Recovery Desk" reference (revenue-recovery-web-ivory.vercel.app). Warm light
  theme, Instrument Serif headline with amber accent, Inter body. Sections: hero
  + stats bar, problem + "60→90 days" callout, 4-step how-it-works, 6 audience
  cards, aligned-pricing block, FAQ accordion, final CTA. Bilingual (en/es) via a
  **local** copy dict (not the global `Translations` type — avoids en/es drift).
- **Homepage button** — `RevenueRecoveryBanner` (amber callout + "See Revenue
  Recovery →") inserted after the Features section in `src/app/page.tsx`.
- **Footer link** ("Revenue Recovery" in Solutions column) + **sitemap** entry.
- All CTAs route to `/book` (no new public form endpoint — consistent with the
  rest of the site; avoids an unhardened public POST).

### Pricing decision
Reference page had hard pricing ($2,500 setup / $2,500 mo / 5%). Since the live
site deliberately has **no** pricing, this page keeps the alignment story
("we earn when you get paid", "agencies charge 25–50%") with **no dollar
figures**. Consistent with the site-wide pricing removal.

## Files added
- `src/app/revenue-recovery/page.tsx` (metadata + Service/FAQ/Breadcrumb JSON-LD)
- `src/components/revenue-recovery/revenue-recovery-content.tsx`
- `src/components/revenue-recovery/revenue-recovery-copy.ts`
- `src/components/sections/revenue-recovery-banner.tsx`
## Files edited
- `src/app/page.tsx`, `src/app/sitemap.ts`, `src/components/layout/site-footer.tsx`

## Verification
- `tsc --noEmit` clean · `next lint` clean · `next build` green.
- Live: `/` `/revenue-recovery` `/solutions` `/about` → 200; `/calculator` → 308;
  `/team/curtis.jpg` → 200. Solutions has no OpenClaw/pricing. Banner present on home.

## IMPORTANT — source of truth
The macOS sandbox blocks Claude from reading `~/Documents/FlowAudit_`, so this
build was done in **`~/workspace/flowaudit-live`**, whose source was downloaded
from the **live production Vercel deployment** (dpl_6bQppJYMrZDVN4yNV1pPjcn7WmCb)
— i.e. it already included the un-pushed pricing/OpenClaw removals. Deployed with
`vercel --prod` (new deployment `dpl_5zVgvZice77PLkAV6PZ9WrKFzjxV`, aliased to
flowaudit.co.uk).

Consequences to reconcile when you're back at the real machine:
1. Your local `~/Documents/FlowAudit_` tree does **not** yet have these 4 new
   files / 3 edits. Copy them in from `~/workspace/flowaudit-live` (or re-pull
   from the deployment) so your local matches prod again.
2. `origin/main` on GitHub is **still stale** (missing both the earlier
   pricing/OpenClaw removals AND this page). GitHub is not the deploy source;
   production is CLI-deployed. Consider syncing main when convenient.
