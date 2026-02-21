# Spec: T001 — FlowAudit Complete Overhaul

**Tier:** 3 — Epic
**Branch:** `feature/complete-overhaul`
**Research:** `specs/T001-research.md`
**Date:** 2026-02-21

---

## Decomposition — 6 Sub-Tasks

| ID | Title | Tier | Dependencies | Files |
|----|-------|------|--------------|-------|
| T001a | Mobile-first audit + fix across all pages | 2 | None | All section/page components |
| T001b | Web design arm landing page (audit + fix existing) | 2 | T001a | `src/app/web-design/*` |
| T001c | Careers page (audit + fix existing) | 1 | T001a | `src/app/careers/*` |
| T001d | PDF export crash fix | 1 | None | `src/components/calculator/pdf-export.tsx` |
| T001e | i18n system audit + complete translations | 2 | T001a, T001b, T001c | i18n files, all components |
| T001f | SEO + Lighthouse + final verification | 1 | All above | seo.ts, sitemap, layout |

**Parallel execution:** T001a + T001d can run simultaneously. T001b + T001c depend on T001a. T001e depends on all page work. T001f is the final gate.

---

## T001a: Mobile-First Audit + Fix

### Acceptance Criteria
- [ ] Zero horizontal scroll at 375px on ANY page
- [ ] All CTAs stack vertically and go full-width below 640px
- [ ] Body text ≥ 16px on mobile (prevents iOS auto-zoom)
- [ ] Touch targets ≥ 44px on all interactive elements
- [ ] Comparison table readable on 375px (stacked cards, not cramped grid)
- [ ] Hero dashboard preview doesn't clip content on mobile
- [ ] Footer stacks to single column on mobile
- [ ] Calculator page single-column on mobile, all controls usable
- [ ] Padding: px-4 minimum on all sections at mobile
- [ ] No text truncation hiding meaning on any screen size

### Files to Audit + Fix
- `src/components/sections/hero-section.tsx` — CTAs, dashboard preview, feature tabs
- `src/components/sections/comparison-section.tsx` — table → stacked cards on mobile
- `src/components/sections/pricing-section.tsx` — card grid responsive
- `src/components/sections/bento-grid.tsx` — grid stacking
- `src/components/sections/testimonials-section.tsx` — card overflow
- `src/components/sections/faq-section.tsx` — accordion width
- `src/components/sections/cta-section.tsx` — button stacking
- `src/components/layout/site-header.tsx` — mobile menu, nav overflow
- `src/components/layout/site-footer.tsx` — column stacking
- `src/app/calculator/calculator-app.tsx` — two-column layout
- `src/components/calculator/sticky-summary.tsx` — bottom bar
- `src/app/about/page.tsx` — team cards, content width
- `src/app/book/page.tsx` — layout
- `src/app/layout.tsx` — overflow-x-hidden on body (already done)

### Anti-Requirements
- Do NOT change the visual design or color scheme
- Do NOT add new sections to existing pages
- Do NOT change any content/copy
- Do NOT modify the i18n system in this sub-task

---

## T001b: Web Design Arm Landing Page (Audit + Fix)

### Current State
Page exists at `/web-design` with: hero, how it works, products/pricing (8 products), why us, FAQ, CTA. Already uses locale provider for translations.

### Audit Against Design Playbook
- [ ] Clear value prop in first viewport at ALL breakpoints
- [ ] Single accent CTA per section (not multiple competing CTAs)
- [ ] Products grid readable and scannable at all breakpoints
- [ ] "Everything" featured card clearly differentiated
- [ ] FAQ accordion works smoothly (open/close transitions)
- [ ] How It Works section has clear visual flow (numbered steps)
- [ ] Why Us section has adequate spacing and visual weight
- [ ] CTA at bottom is compelling and has adequate whitespace
- [ ] All mobile fixes from T001a applied
- [ ] Breadcrumbs working and properly styled
- [ ] Page metadata and OpenGraph correct

### Acceptance Criteria
- [ ] Passes Visual QA at 375px, 768px, 1024px, 1440px
- [ ] Nielsen heuristics average ≥ 7.0
- [ ] One clear conversion path: scroll → learn → CTA → /book
- [ ] Consistent design DNA with agency site (same tokens, similar patterns, different enough to distinguish)

### Anti-Requirements
- Do NOT add portfolio/demo section
- Do NOT show buy-outright prices
- Do NOT add animations that weren't in the original agency site style
- Do NOT change the 8-product pricing structure

---

## T001c: Careers Page (Audit + Fix)

### Current State
Page exists at `/careers` with: hero, values (4 cards), open positions (empty state with CV CTA), share section.

### Acceptance Criteria
- [ ] Looks professional and legitimate
- [ ] Values cards are properly spaced and readable at all breakpoints
- [ ] CV email link works (mailto:hello@flowaudit.co)
- [ ] Breadcrumbs working
- [ ] Mobile responsive

### Anti-Requirements
- Do NOT add fake job listings
- Do NOT add employee photos or bios

---

## T001d: PDF Export Crash Fix

### Current State
Export button in calculator crashes. Initial fix applied (better jsPDF import handling + error recovery).

### Root Cause Investigation Required
- Test the current fix by checking if jsPDF dynamic import resolves correctly
- Check for null/undefined edge cases in data processing
- Check if the `splitTextToSize` call can receive undefined

### Acceptance Criteria
- [ ] Export works with no selections (empty state)
- [ ] Export works with a package selected
- [ ] Export works with individual automations selected
- [ ] Export works with add-ons selected
- [ ] If export fails for any reason, user sees a friendly error (not a crash)
- [ ] Print Report button works as fallback

### Anti-Requirements
- Do NOT change the PDF layout/design
- Do NOT add new dependencies
- Do NOT remove the print fallback

---

## T001e: i18n System Audit + Complete

### Current State
- Middleware: detects `x-vercel-ip-country === "PY"` → sets `locale=es` cookie
- LocaleProvider: reads cookie, provides translations via context
- Translations: en.ts and es.ts cover main page, web design, careers
- Language toggle: in header (desktop + mobile menu)
- Some hardcoded English strings remain in section components

### Audit Required
- [ ] ALL user-facing text wrapped in translation calls (not just new pages)
- [ ] Existing section components (hero, bento, pricing, comparison, FAQ, CTA, testimonials) use translations
- [ ] Spanish pricing shows 42.8571% discount on AGENCY products only
- [ ] Web design arm pricing shows FULL PRICE in both locales
- [ ] `<html lang>` attribute updates dynamically based on locale
- [ ] Language toggle works correctly (sets cookie, re-renders)
- [ ] hreflang meta tags added for SEO

### Critical Rule
**The 42.8571% discount applies ONLY to agency pricing (the automation packages in calculator-data.ts). Web design arm products are FULL PRICE globally. This is non-negotiable.**

### Acceptance Criteria
- [ ] Paraguay visitor sees Spanish site with discounted agency pricing
- [ ] UK visitor sees English site with standard pricing  
- [ ] Web design pricing is identical in both locales (GBP, full price)
- [ ] Language toggle switches correctly without page reload issues
- [ ] No English strings visible when in Spanish mode
- [ ] No layout breaks from longer Spanish text

### Anti-Requirements
- Do NOT add URL-based locale routing (/es/ prefix)
- Do NOT add third-party i18n libraries
- Do NOT change the cookie-based approach
- Do NOT apply discount to web design arm products

---

## T001f: SEO + Lighthouse + Final Verification

### Checks
1. `npx tsc --noEmit` — ZERO errors
2. `npx next build` — ZERO errors, ZERO warnings
3. Lighthouse audit: Performance > 90, Accessibility > 90, SEO > 90, Best Practices > 90
4. SITE_URL = `https://flowaudit.co.uk` everywhere
5. Sitemap includes: /, /web-design, /careers, /calculator, /about, /book, /solutions, /blog, /results, /privacy, /terms
6. robots.txt correct
7. OpenGraph metadata on all pages
8. Canonical URLs on all pages
9. No console errors on any page
10. All "FlowAudit_" instances replaced with "FlowAudit" (already done)

### Acceptance Criteria
- [ ] All Lighthouse scores > 90
- [ ] Zero TypeScript errors
- [ ] Zero build errors
- [ ] Sitemap complete
- [ ] No "FlowAudit_" anywhere in the codebase

---

## Verification Commands
```bash
# TypeScript
npx tsc --noEmit

# Build
npx next build

# Search for old branding
grep -rn "FlowAudit_" src/ --include="*.tsx" --include="*.ts"

# Lint (if available)
npx eslint . --max-warnings 0 2>/dev/null || echo "ESLint not configured"
```

---

## Visual QA Breakpoints
| Width | Device |
|-------|--------|
| 375px | iPhone SE / small phone |
| 768px | iPad portrait |
| 1024px | Small laptop |
| 1440px | Standard desktop |

### Pages to Screenshot
- Home (`/`)
- Web Design (`/web-design`)
- Careers (`/careers`)
- Calculator (`/calculator`)
- Book (`/book`)
- About (`/about`)

### States to Verify
- Default (all pages)
- Mobile menu open (header)
- FAQ accordion open (home + web design)
- Calculator with selections
- Language toggle (EN → ES)

---

## Design Tokens (reference — DO NOT modify)
- Background: `#F7F5F3`
- Dark text: `#37322F`
- Medium text: `#605A57`
- Light text: `rgba(55,50,47,0.80)`
- Border: `rgba(55,50,47,0.08)` or `rgba(55,50,47,0.12)`
- Accent: emerald-500/600
- Card bg: white
- Featured card: `#37322F` bg with white text
- Fonts: Instrument Serif (headlines), Inter (body)
- Radius: rounded-2xl (cards), rounded-lg (smaller)
