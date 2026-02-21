# Research Brief: FlowAudit Complete Overhaul

## Task: T001 — FlowAudit Website Complete Overhaul
**Tier:** 3 — Epic
**Research Depth:** Deep (15-30 min)
**Date:** 2026-02-21

---

## 1. Problem Understanding

Curtis needs the FlowAudit website production-ready with:
- A web design arm landing page (sibling to the agency, same domain)
- Careers page for legitimacy
- Spanish geo-detected version for Paraguay (42.8571% agency discount, web design full price)
- Mobile-first responsive design across all pages
- PDF export bug fix
- Deployment to flowaudit.co.uk

**Urgency:** Curtis is making sales calls next week. The web design arm page is the revenue driver.

---

## 2. Domain Research — High-Converting Landing Pages

### Key findings from top-performing pages (2025-2026):

**CLEAR Framework** (from ThunderClap, 129+ B2B sites including Amazon, Razorpay):
- **C**larity: Value proposition unmistakable in first viewport
- **L**ead capture: One focused CTA, repeated at natural scroll points
- **E**vidence: Social proof (logos, testimonials, case numbers)
- **A**esthetics: Professional, branded, not template-looking
- **R**elevance: Speaks directly to the visitor's problem

**UK Agency Patterns (Converted.co.uk, Apexure, FastRanking):**
- Research-backed design, not template-driven
- Process/methodology section builds credibility
- Case studies/portfolio as social proof (we don't have this yet — skip for now)
- Multiple CTA touchpoints throughout long-form pages
- Trust badges, awards, accreditations section

**Website Rental/Subscription Model (competitors):**
- Carpe DM: $150-220/mo — positions as "rent vs buy" decision
- NorthwoodsWebDesigns: $79/mo single page — emphasizes all-inclusive
- Key selling points: no upfront cost, professional design, technical support included, SEO built in
- FlowAudit's £149/mo is competitive and positioned well with the upsell stack to £712/mo

### Recommended page structure for web design arm:
1. Hero with clear value prop + "no templates" differentiator
2. Social proof section (trust badges, or "trusted by X businesses" — even if aspirational)
3. How it works (4-step process — research, build, review, maintain)
4. Products & pricing (8 products, monthly only)
5. Why us / differentiators (4 cards)
6. FAQ (objection handling)
7. Final CTA

---

## 3. Technical Research — Mobile-First Design

### Key mobile-first principles (Figma, Webstacks, best practices):
- **Design at 375px first**, then expand to larger breakpoints
- **Touch targets minimum 44px** (48px preferred)
- **Thumb zone**: primary actions in bottom 40% of screen
- **Single-column layouts** on mobile — no horizontal scrolling ever
- **Font sizes**: minimum 16px body text on mobile (prevents iOS zoom)
- **Buttons**: full-width on mobile, stack vertically (never side-by-side on small screens)
- **Navigation**: hamburger menu on mobile, full nav on desktop (already implemented)
- **Images**: responsive, lazy-loaded, proper aspect ratios per breakpoint
- **Spacing**: use padding scale that reduces on mobile (e.g., py-16 sm:py-20 lg:py-24)

### Current mobile issues identified in FlowAudit:
1. Hero CTAs don't stack on very small screens (fixed in last pass)
2. Comparison table 3-column grid too cramped (partially fixed)
3. Dashboard preview aspect ratio too tall on mobile (partially fixed)
4. Some sections may have insufficient padding on mobile
5. Footer grid might overflow on very small screens
6. Calculator page complex layout needs audit
7. Need to verify all font sizes are 16px+ on mobile to prevent iOS auto-zoom

---

## 4. Technical Research — i18n Approach

### Current implementation: Cookie-based with middleware
- Middleware detects `x-vercel-ip-country` header (Vercel provides this automatically)
- Sets cookie `locale=es` for Paraguay visitors
- LocaleProvider reads cookie, provides translations
- Language toggle in header for manual override

### Best practice findings (Next.js docs, next-intl, Reddit):
- **URL-based routing (`/es/`)** is better for SEO but requires routing restructure
- **Cookie-based** is simpler, works well for geo-targeting a single market
- **next-intl library** is the gold standard but heavy for 2-locale setup
- For our use case (one primary locale + one geo-targeted locale), cookie-based is appropriate

### Recommendation: Keep cookie-based approach but add:
- `hreflang` meta tags for SEO
- Dynamic `lang` attribute on `<html>` tag
- Visual language indicator so users know they can switch

---

## 5. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Mobile issues not fully caught | High | Visual QA at 375px, 768px, 1024px, 1440px mandatory |
| Spanish translations inaccurate | Medium | Curtis or Kofi review before launch |
| PDF export crash on edge cases | Medium | Comprehensive error handling + fallback to print |
| i18n breaks existing pages | High | Test all routes in both locales before deploy |
| DNS not configured for flowaudit.co.uk | Low | Deploy to Vercel first, DNS is a separate step |
| SEO impact of domain change | Low | Redirects + canonical URLs + sitemap |

---

## 6. Approach Recommendation

**Recommended approach: Audit + fix existing code through the full quality pipeline**

Rather than rebuilding from scratch, audit the existing implementation against the Master Design Playbook:
1. Run Visual QA at all 4 breakpoints
2. Score against Nielsen heuristics (minimum 7.0 to ship)
3. Run Lighthouse audit
4. Fix everything that fails
5. Add missing pieces (proper i18n coverage, mobile fixes)
6. Re-verify and deploy

**Why:** The existing code structure is sound — the issues are in execution quality (branding, mobile, visual polish). A full rebuild would waste the work already done.

---

## 7. Research Summary

**Key findings that should shape the architecture:**
- Web design page needs clear value prop in first viewport, multiple CTA touchpoints, and FAQ for objection handling ✅ (already implemented)
- Mobile-first means every component must be audited at 375px — buttons full-width, text stacked, no horizontal scroll
- Cookie-based i18n is appropriate for our 2-locale setup
- The "no templates" differentiator is strong — competitors mostly use templates
- £149/mo pricing is competitive in the UK web design subscription market
- Trust/credibility section needed even without case studies (numbers, process, guarantees)
