# Spec: FlowAudit Complete Overhaul — Web Design Arm + Fixes + i18n + Deploy

## Overview
7 tasks to complete the FlowAudit website and deploy to flowaudit.co.uk:
1. Web Design arm landing page
2. Fix PDF export crash
3. Careers page
4. Fix mobile viewing issues
5. Spanish version with geo-detection (Paraguay)
6. Update domain/SEO config
7. Ensure everything builds clean for deployment

## Task 1: Web Design Landing Page (`/web-design`)

### Route
Create `src/app/web-design/page.tsx`

### Navigation
Add "Web Design" link to the header nav in `src/components/layout/site-header.tsx`.
Add it as the FIRST item in the navLinks array:
```ts
{ label: "Web Design", href: "/web-design" },
```
Also add "Web Design" to the footer under Solutions links.

### Page Structure
The page should use the SAME design system as the main site (Inter + Instrument Serif fonts, #37322F dark, #F7F5F3 cream background, emerald accents) but feel like a distinct offering — a sibling, not a clone. Use the same component patterns (Badge, Button, rounded-2xl cards, border-[rgba(55,50,47,0.08)]).

Sections in order:

#### 1. Hero Section
- Headline (Instrument Serif, large): "Custom Websites & AI-Powered Tools For Your Business"
- Subtext: "We design, build, and maintain your complete online presence — website, AI chatbot, booking system, invoicing — everything your business needs to look professional and capture every lead."
- CTA buttons: "Book a Free Call" (links to /book) + "See Our Products" (scrolls to #products)
- Small note below: "No templates. Every site is unique to your business."

#### 2. How It Works Section
4 steps:
1. "We Research Your Business" — "We study your industry, competitors, and customers to understand what your website needs to achieve."
2. "We Build Your Site" — "Our team designs and builds a custom website tailored to your business — before you pay anything."
3. "You Review & Approve" — "See your live demo site. Request changes. Only pay when you're completely happy."
4. "We Handle Everything" — "Hosting, updates, security, support — all included. You focus on your business."

#### 3. Products & Pricing Section (id="products")
Header: "Everything Your Business Needs Online"
Subtext: "Start with a website. Add tools as your business grows. Cancel anytime after your 12-month term."

Display the 8 products as cards. MONTHLY PRICES ONLY (no buy outright on the page):

| Product | Price | Description |
|---------|-------|-------------|
| Custom Website | £149/mo | Unique design, mobile-optimised, CMS access, hosting & SSL included |
| AI Chatbot | £129/mo | 24/7 AI assistant trained on your business. Captures leads while you sleep. |
| After-Hours AI | £99/mo | Handles calls and texts outside your working hours. Never miss a lead again. |
| Missed Call Text-Back | £89/mo | Automatically texts customers back within seconds when you miss their call. |
| Booking System | £79/mo | Let customers book appointments online. Sends reminders automatically. |
| Automated Invoicing | £69/mo | Send professional invoices by text. Track payments. Chase overdue automatically. |
| Quote Request System | £49/mo | Capture quote requests from your website. Get notified instantly. |
| Testimonial Collector | £49/mo | Automatically collect reviews from happy customers and display them on your site. |

Show a "Everything" summary: "All 8 products: £712/mo" with a highlighted card.

Each product card should have:
- Product name
- Monthly price in large text
- Short description
- "Add to plan" or similar soft CTA

At the bottom: "12-month contracts. 15% loyalty discount on renewal. All prices exclude VAT."

#### 4. Why Us / Differentiators Section
3-4 cards:
- "No Templates" — "Every website we build is custom-designed for your business. You'll never see another site that looks like yours."
- "You Own Nothing to Worry About" — "We handle hosting, security, updates, and support. If something breaks, we fix it."
- "AI That Actually Works" — "Our AI tools aren't gimmicks. They capture real leads, send real invoices, and save real hours every week."
- "See It Before You Pay" — "We build your demo site before you commit. You only pay when you love what you see."

#### 5. FAQ Section
Questions:
- "What happens if I cancel?" → "After your 12-month term, you can cancel anytime with 30 days notice. If you cancel, your website and all tools go offline as they run on our infrastructure."
- "Can I buy my website outright?" → "Yes, we offer one-time purchase options. Book a call to discuss pricing."
- "How long does it take to build my website?" → "Most websites are ready within 5-10 business days. Add-on tools are configured within 48 hours of your website going live."
- "Do I need to provide content?" → "We handle everything — copy, images, design. We just need your business details and we'll do the rest."
- "Can I make changes to my website?" → "Yes, you get CMS access to update text, images, and basic content anytime. For design changes, our team handles those."
- "What if I just want a website without the add-ons?" → "Absolutely. The website at £149/mo is a standalone product. Add tools whenever you're ready."

#### 6. CTA Section
"Ready to See What Your Website Could Look Like?"
"Book a free strategy call. We'll discuss your business and show you what's possible."
Button: "Book a Free Call" → /book

### SEO/Metadata
```ts
export const metadata: Metadata = {
  title: "Custom Websites & AI Tools — FlowAudit_",
  description: "Custom-designed websites and AI-powered business tools. Website, chatbot, booking, invoicing — everything your business needs online. From £149/mo.",
  alternates: { canonical: "/web-design" },
};
```

---

## Task 2: Fix PDF Export Crash

The export button in `src/components/calculator/pdf-export.tsx` crashes the site.

### Likely Issues
1. The jsPDF dynamic import might fail in some browser contexts
2. Edge cases when no automations/addons are selected
3. The `doc.splitTextToSize` call might receive undefined

### Fix Approach
- Wrap the ENTIRE `handleExportPDF` function body in a try/catch
- Add null checks before accessing `.name` and `.price` on automation items
- Add a fallback if `jsPDF` import fails — show error message instead of crashing
- Test that it works with: (a) no selections, (b) a package selected, (c) individual automations selected
- Make sure the error state is displayed to the user via `setExportError`

### Specific fix in the `handleExportPDF` function:
The issue is likely the dynamic import of jsPDF. The `import("jspdf")` in Next.js client components can sometimes fail. Wrap it properly:
```ts
const handleExportPDF = useCallback(async () => {
  setIsExporting(true);
  setExportError(null);
  try {
    const jspdfModule = await import("jspdf");
    const jsPDF = jspdfModule.jsPDF || jspdfModule.default?.jsPDF || jspdfModule.default;
    if (!jsPDF) throw new Error("Failed to load PDF library");
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    // ... rest of the PDF generation
```

---

## Task 3: Careers Page (`/careers`)

### Route
Create `src/app/careers/page.tsx`

### Add to navigation
Add "Careers" to footer under Company links in `src/components/layout/site-footer.tsx`.

### Page Structure

#### Hero
- Headline: "Build the Future of Business Automation"
- Subtext: "We're a small team with big ambitions. If you're talented, resourceful, and want to work on problems that matter — we'd love to hear from you."

#### Values Section (3-4 cards)
- "Move Fast, Ship Often" — "We believe in iteration over perfection. Get it live, get feedback, improve."
- "Own Your Work" — "No micromanagement. You'll have real ownership over real products that real businesses use."
- "Think Like a Founder" — "We want people who see the bigger picture — not just their task list."
- "Remote-First" — "Work from anywhere. We care about output, not hours."

#### Open Positions
For now, show a single card:
"We don't have specific openings right now, but we're always interested in hearing from exceptional people."
- Button: "Send us your CV" → mailto:hello@flowaudit.co?subject=Career%20Enquiry

#### Bottom CTA
"Know someone who'd be a great fit? Share this page."

### SEO
```ts
export const metadata: Metadata = {
  title: "Careers — FlowAudit_",
  description: "Join the FlowAudit_ team. We're building AI-powered business tools that save businesses thousands of hours. Remote-first, founder-mentality.",
  alternates: { canonical: "/careers" },
};
```

---

## Task 4: Fix Mobile Viewing Issues

### Known Issues to Check & Fix

1. **Header nav overflow** — The pill-shaped nav at `max-w-[700px]` with 6+ links might overflow. With the new "Web Design" link, the desktop nav needs 6 items. Make sure they all fit. Consider slightly smaller font or tighter gaps.

2. **Hero section CTA buttons** — Two buttons side by side on mobile might overflow. Ensure they stack vertically on small screens:
```tsx
<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 sm:mt-10">
```

3. **Calculator page** — Complex layout with multiple columns. Ensure single-column on mobile.

4. **Pricing cards** — `grid-cols-4` on desktop. Currently `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` which is correct. Verify cards don't overflow.

5. **Feature tabs in hero** — Currently `flex-col md:flex-row`. The text might be cramped on mobile. Check padding.

6. **Bento grid** — 2x2 grid on desktop, single column on mobile. Verify text doesn't overflow.

7. **General** — Check all sections have `px-4` mobile padding. Make sure no horizontal scroll on any page.

### Fix Approach
- Review ALL components for mobile breakpoints
- Ensure no fixed widths that could cause horizontal scroll
- Add `overflow-hidden` to the main container if needed
- Test all interactive elements (accordion, tabs, mobile menu) are usable

---

## Task 5: Spanish Version with Geo-Detection

### Approach: Cookie-based locale with middleware

#### 1. Create middleware (`src/middleware.ts`)
```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip API routes, static files, etc.
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }
  
  // Check if user already has a locale cookie
  const localeCookie = request.cookies.get("locale")?.value;
  if (localeCookie) return NextResponse.next();
  
  // Geo-detect: Vercel provides x-vercel-ip-country header
  const country = request.headers.get("x-vercel-ip-country") || request.geo?.country || "";
  
  if (country === "PY") {
    // Paraguay → set Spanish locale cookie
    const response = NextResponse.next();
    response.cookies.set("locale", "es", { 
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax"
    });
    return response;
  }
  
  // Default → English
  const response = NextResponse.next();
  response.cookies.set("locale", "en", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax"
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)"],
};
```

#### 2. Create locale system (`src/lib/i18n.ts`)
- Define type `Locale = "en" | "es"`
- Create translation dictionaries for ALL user-facing text on every page
- Export a `useLocale()` hook that reads from context
- Export a `t(key: string)` function for translations
- Export pricing helpers that apply the 42.8571% discount for Spanish locale on AGENCY products ONLY (not web design arm)

#### 3. Create LocaleProvider (`src/components/providers/locale-provider.tsx`)
- Client component that reads the `locale` cookie on mount
- Provides locale context to all children
- Wraps the app in layout.tsx

#### 4. Language Toggle in Header
- Add a small language toggle button in the header (right side, before the CTA button)
- Shows "EN" / "ES" — clicking toggles the cookie and refreshes
- Simple, unobtrusive

#### 5. Translation Files
Create `src/lib/translations/en.ts` and `src/lib/translations/es.ts`

These should cover ALL text across:
- Site header nav labels
- Home page (hero, all sections, all card text, all descriptions)
- Solutions page
- Calculator page (all labels, descriptions)
- Pricing section
- About page
- Book page
- FAQ section
- Footer
- Web Design page (all sections)
- Careers page
- CTA sections

#### 6. Spanish Pricing Rules
**CRITICAL: The 42.8571% discount applies ONLY to FlowAudit agency products (the automation/AI operations products). The web design arm products are FULL PRICE globally.**

For agency pricing:
- Original prices in `calculator-data.ts` are in USD
- Spanish locale shows prices in Guaraníes (PYG) or USD — use USD with discount applied
- Actually, since these are international clients, keep prices in USD/GBP but apply 42.8571% discount
- Starter: $4,995 → $2,854.29
- Growth: $6,995 → $3,997.14  
- Scale: $9,495 → $5,425.71
- Enterprise: $12,500+ → $7,142.86+
- All individual automation prices also discounted by same percentage
- Add-ons also discounted

For web design arm: £149/mo stays £149/mo. £712/mo stays £712/mo. NO discount.

#### 7. Update layout.tsx
- Wrap children with LocaleProvider
- Set `lang` attribute on `<html>` dynamically based on locale

---

## Task 6: Update Domain & SEO Config

### Files to Update

1. `src/lib/seo.ts`:
```ts
export const SITE_URL = "https://flowaudit.co.uk";
export const SITE_NAME = "FlowAudit_";
```

2. `vercel.json` — Update regions if needed. UK site should be in London:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "regions": ["lhr1"]
}
```

3. Update `src/app/robots.ts` to use the correct domain.

4. Update `src/app/sitemap.ts` to use the correct domain and include all new pages:
- /web-design
- /careers

5. Update social links in footer:
- X link should go to actual FlowAudit X profile if one exists, or remove if not
- LinkedIn link is already correct: `https://www.linkedin.com/company/flowaudit/`

6. Contact email throughout the site: `hello@flowaudit.co` — verify this is correct, or update to use the `.co.uk` domain if needed.

7. Add `<link rel="canonical">` to all new pages via metadata.

---

## Task 7: Build Verification

After ALL changes:
1. Run `npx tsc --noEmit` — ZERO errors
2. Run `npx next build` — ZERO errors  
3. Check that NO horizontal scrolling exists on any page at 375px viewport width
4. Verify all new routes render: /web-design, /careers
5. Verify the language toggle works (cookie set/read)
6. Verify PDF export doesn't crash

---

## Anti-Requirements (What NOT To Do)
- Do NOT change the existing agency pricing model or amounts
- Do NOT add "buy outright" prices to the web design page
- Do NOT change the existing color scheme or typography system
- Do NOT add any demo/portfolio section to the web design page
- Do NOT apply the Spanish discount to web design arm products
- Do NOT restructure the URL routing (no /en/ or /es/ prefixes — use cookie-based approach)
- Do NOT remove or modify the chat widget
- Do NOT change the Calendly/booking setup
- Do NOT add any third-party analytics or tracking scripts
- Do NOT use placeholder text like "Lorem ipsum" anywhere

## File Summary

### New Files to Create:
- `src/app/web-design/page.tsx`
- `src/app/careers/page.tsx`
- `src/middleware.ts`
- `src/lib/i18n.ts`
- `src/lib/translations/en.ts`
- `src/lib/translations/es.ts`
- `src/components/providers/locale-provider.tsx`

### Files to Modify:
- `src/components/layout/site-header.tsx` (add Web Design nav + language toggle)
- `src/components/layout/site-footer.tsx` (add Web Design + Careers links)
- `src/components/calculator/pdf-export.tsx` (fix crash)
- `src/lib/seo.ts` (update SITE_URL)
- `src/app/layout.tsx` (add LocaleProvider, dynamic lang attr)
- `src/app/sitemap.ts` (add new routes)
- `src/app/robots.ts` (update domain if needed)
- `vercel.json` (update region)
- ALL section components (wrap text in translation calls)
- ALL page components (wrap text in translation calls)
- `src/lib/calculator-data.ts` (add discount helper or locale-aware pricing)
- `src/components/sections/pricing-section.tsx` (locale-aware pricing)
- `src/app/page.tsx` (if any direct text needs translating)
- `src/components/sections/hero-section.tsx` (mobile CTA fix + translations)

### Design Tokens (use these consistently):
- Background: `#F7F5F3`
- Dark text: `#37322F`
- Medium text: `#605A57`
- Light text: `rgba(55,50,47,0.80)`
- Border: `rgba(55,50,47,0.08)` or `rgba(55,50,47,0.12)`
- Accent: emerald-500/600
- Card bg: white
- Featured card: `#37322F` bg with white text
- Border radius: `rounded-2xl` for cards, `rounded-lg` for smaller elements
- Fonts: `font-serif` (Instrument Serif) for headlines, `font-sans` (Inter) for body
