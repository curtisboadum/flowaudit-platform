# Change Log

All notable changes to FlowAudit Platform, in reverse chronological order.

---

## 2026-02-14

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
