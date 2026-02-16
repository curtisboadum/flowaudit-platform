# Change Log

All notable changes to FlowAudit Platform, in reverse chronological order.

---

## 2026-02-15 (Session 8)

### Brand Rename

- **Updated** all pages, metadata, and SEO config — FlowAudit → FlowAudit\_ across site
- **Updated** `seo.ts` — site name, OpenGraph, and structured data reflect FlowAudit\_ branding
- **Updated** `pdf-export.tsx` — PDF header and footer use FlowAudit\_ name
- **Updated** `chat-providers.ts` — system prompt and HTTP-Referer updated for FlowAudit\_

### Trades-First Copy Rewrite

- **Updated** about, book, problem, security, FAQ, pricing, and testimonials sections — rewritten in plain trades-first language
- **Updated** chat system prompt — plain language rules, banned jargon list, trades-aware context

### Book Page Overhaul

- **Updated** book page — Calendly embed replaced with email CTA (`hello@flowaudit.co`)

### Calculator: Gulf Currencies

- **Updated** calculator currency types — added AED, SAR, QAR
- **Updated** fallback exchange rates, formatter, and currency symbols for Gulf currencies

### New Content

- **Added** 2 testimonials — Walsh Plumbing, Precision HVAC
- **Added** 2 FAQ items — solo operators, non-tech users

### PDF Export Fix

- **Fixed** `pdf-export.tsx` — pre-sanitize iframe DOM for oklch() colors before html2canvas clone

### Tailwind Cleanup

- **Refactored** class ordering normalized across pricing, testimonials, and other sections

---

## 2026-02-15 (Session 7)

### Content Broadening — Inclusive Business Language

- **Updated** `industries/[slug]/page.tsx` — replaced solo-only framing with language covering all business sizes (1–30 people)
- **Updated** `bento-grid.tsx` — broadened feature descriptions beyond one-person businesses
- **Updated** `hero-section.tsx` — headline and subheading now address solo operators & small teams
- **Updated** `comparison-section.tsx` — comparison copy covers full customer range
- **Updated** `blog/page.tsx` — blog intro language broadened
- **Updated** `blog/[slug]/page.tsx` — blog post framing updated
- **Updated** `chat-widget.tsx` — chat system prompt updated for inclusive language
- 9 text replacements across 7 files total

---

## 2026-02-15 (Session 6)

### Chat Provider Refactor

- **Created** `src/lib/chat-providers.ts` — OpenRouter/DeepSeek provider abstraction with retry + exponential backoff + fallback
- **Refactored** `/api/chat/route.ts` to use new provider module — provider-agnostic streaming interface
- **Updated** `.env.example` with `OPENROUTER_API_KEY`, `DEEPSEEK_API_KEY` env vars
- **Updated** `package.json` and `pnpm-lock.yaml` with new provider dependencies

### Domain Fix

- **Fixed** `chat-providers.ts` — HTTP-Referer header uses `flowaudit.co.uk` (not `flowaudit.com`)
- **Fixed** `pdf-export.tsx` — PDF footer URL uses `flowaudit.co.uk` (not `flowaudit.com`)

---

## 2026-02-15 (Session 5)

### Calculator Export & Print Fixes

- **Fixed** `pdf-export.tsx` — Export PDF now renders in isolated `<iframe>` to avoid Tailwind v4 `oklch()` crash in html2canvas
- **Fixed** `pdf-export.tsx` — Print Report falls back to `window.print()` when popup is blocked by browser
- **Fixed** `pdf-export.tsx` — DOM cleanup moved to `finally` block to prevent orphaned elements on error

### Chatbot Fallback Model

- **Fixed** `/api/chat` — replaced sunset `gemini-1.5-flash` fallback with `gemini-2.0-flash-lite`

### E2E Verification

- **Verified** calculator page, Export PDF, Print Report, and chat widget via Playwright MCP browser — 0 console errors across all pages

### Developer Experience

- **Added** `AskUserQuestion` sound notification hook to `.claude/settings.json`

---

## 2026-02-14 (Session 4)

### Gemini 429 Rate Limit Fix

- **Fixed** `/api/chat` — added exponential backoff retry (3 attempts, 1s/2s/4s delays) for Gemini API 429 errors
- **Fixed** `/api/chat` — added fallback from `gemini-2.0-flash` to `gemini-1.5-flash` on persistent rate limits
- **Fixed** `/api/chat` — added diagnostic logging (model used, retry count, fallback triggered, error details)
- **Fixed** `ChatWidget` — stream errors now surface specific messages instead of being silently swallowed

### About Page

- **Updated** team member names, titles, and AI agent descriptions (corrected Lawyer Boadum name, CEO/COO title, swapped Casper/Klaus descriptions)

---

## 2026-02-14 (Session 3)

### AI Chat Widget

- **Created** `ChatWidget` component — streaming chat UI with quick questions, typing indicators, error handling
- **Created** `/api/chat` route — Gemini 2.0 Flash SSE endpoint with rate limiting, input sanitization, system prompt
- **Updated** root layout to mount `<ChatWidget />` site-wide
- **Added** `@google/generative-ai` dependency and `GEMINI_API_KEY` to `.env.example`

### Industry Workflow Redesign

- **Updated** industry page workflow cards with numbered steps, "From/To" labels, hover effects

### Calculator Polish

- **Updated** "Setup Investment" label → "Build & Deployment Fee"
- **Updated** package selector with tooltip hover effects
- **Updated** calculator disclaimer: "\*Based on conservative assumptions"
- **Refactored** Tailwind class ordering across calculator components

### Footer & Security

- **Updated** LinkedIn URL to real FlowAudit company page
- **Updated** security section with "Cloudflare DNS" mention
- **Refactored** Tailwind class ordering in footer

### Misc

- **Updated** `homepage-hero.png` — compressed from 296KB to 171KB
- **Refactored** Tailwind class ordering across multiple components

---

## 2026-02-14 (Session 2)

### Logo Grid

- **Updated** logo grid with real SVG logos replacing placeholder text
- **Created** animated marquee component for continuous logo scrolling
- **Updated** responsive layout for logo display across breakpoints

### SEO Infrastructure

- **Created** `robots.ts` for crawler directives
- **Created** `sitemap.ts` for automatic XML sitemap generation
- **Created** JSON-LD structured data (Organization, WebSite, BreadcrumbList schemas)
- **Created** breadcrumb navigation component
- **Updated** all 21 pages with per-page OpenGraph metadata via `generateMetadata`

### Problem Section

- **Updated** problem section with animated statistics counters
- **Updated** card design with glass-morphism styling

### Calculator

- **Updated** calculator with 15 real-world service tiers (from basic placeholder tiers)
- **Updated** PDF export with FlowAudit branding
- **Updated** addon UX with improved selection and pricing display

### UI Polish & Deployment

- **Updated** site header layout and navigation
- **Updated** process section, FAQ section, security section styling
- **Updated** all page layouts for visual consistency
- **Committed** `4082cc1` — 29 files changed (1,635 additions, 447 deletions)
- **Created** PR #2 on `feat/ui-seo-logos-overhaul` branch

### Breadcrumb Navigation

- **Created** `Breadcrumbs` component with animated chevron separators and hover effects
- **Updated** all 11 subpages to include breadcrumb navigation with per-page hierarchy
- **Created** dynamic slug resolution for blog and industry pages (slug → display name)

### Favicon

- **Created** `icon.svg` SVG favicon in `src/app/` — auto-served by Next.js with cache-busted hash

### Deployment (PR #3)

- **Committed** `a6e5360` on `fix/breadcrumbs-favicon-todos` branch
- **Created** PR #3 and squash-merged to `main`
- **Deployed** to Vercel — verified breadcrumbs and favicon live in production

---

## 2026-02-12

### Deployment & Git Setup

- **Created** GitHub repo `curtisboadum/flowaudit-platform` (public)
- **Created** initial git commit with full marketing site and platform scaffold
- **Deployed** to Vercel for visual testing (static marketing site, no env vars needed)
- **Updated** tracking files: session, change log, to-do list, insights

### Homepage Overhaul

- **Created** 15+ section components: Hero, Features, HowItWorks, IndustryShowcase, Testimonials, Pricing, CTA, FAQ, Stats, TrustBar, etc.
- **Created** 21 pages: homepage, industries (6 verticals), blog, about, contact, pricing, terms, privacy, etc.
- **Created** health endpoint at `/api/health`

---

## 2026-02-11

### Initial Project Setup

- **Created** full project directory structure
- **Created** Next.js 15 App Router scaffold with TypeScript strict mode
- **Created** InstantDB schema (`instant.schema.ts`) with clients, agents, workflows, agentRuns entities
- **Created** OpenClaw agent template and gateway config
- **Created** Claude Code environment: CLAUDE.md, settings, hooks, skills, commands, agents
- **Created** 6 tracking files in `docs/tracking/`
- **Created** Architecture overview and API endpoints documentation
- **Created** ESLint, Prettier, Vitest, Tailwind, PostCSS configs
- **Created** Source scaffolds: layout, page, health endpoint, lib clients, types

---

## Change Log Template

```markdown
## YYYY-MM-DD

### [Category]

- **[Action]** [Description of what changed and why]
```

Actions: Created, Updated, Fixed, Removed, Refactored, Deployed
