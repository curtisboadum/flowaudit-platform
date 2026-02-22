# ADR-001: FlowAudit Complete Overhaul Architecture

**Date:** 2026-02-21
**Status:** Accepted
**Deciders:** Klaus, Curtis

## Context

FlowAudit needed a complete overhaul to support:
1. A web design arm alongside the existing agency offering
2. Spanish localization for Paraguay market expansion
3. Mobile-first responsive design
4. Team page with AI agent illustrations
5. Careers page for team building
6. Calendly integration for booking

## Decision

### Technology Choices

| Area | Decision | Rationale |
|------|----------|-----------|
| **i18n** | Cookie-based with middleware geo-detection | Simpler than URL-based routing (no `/es/` prefix), works with Vercel's `x-vercel-ip-country` header |
| **Pricing** | 42.8571% discount on agency products for ES locale, full price for web design | Paraguay market is price-sensitive for agency services, web design arm targets global market |
| **Team Portraits** | Real photos for humans, custom SVG illustrations for AI agents | Authenticity for humans, distinct visual identity for AI team members |
| **Calendly** | Embedded iframe on /book page | Fastest integration, no backend needed, handles scheduling complexity |
| **Deployment** | Vercel with IONOS domain | Already on Vercel, IONOS is the domain registrar |
| **DNS** | A record → 76.76.21.21, CNAME www → cname.vercel-dns.com | Standard Vercel DNS setup via IONOS |

### Architecture

- **Next.js 15.5.12** with App Router
- **Tailwind CSS v4** for styling
- **pnpm** package manager
- **Cookie-based language** preference with middleware
- **Geo-detection** via Vercel's `x-vercel-ip-country` header (PY → Spanish)
- **Static generation** for all marketing pages (no SSR needed)

## Consequences

### Positive
- Site went live same day (Feb 21-22)
- Lighthouse scores: 99/91/100/100 (home), 99/94/100/100 (web-design)
- Clean separation between agency and web design offerings
- Geo-detection enables automatic language for Paraguay visitors

### Negative
- Cookie-based i18n means no SEO benefit for Spanish pages (search engines see same URL)
- Full translation coverage incomplete (blog, solutions, calculator still English-only in ES mode)
- No A/B testing infrastructure for pricing experiments

### Risks Accepted
- Cookie i18n over URL-based: accepted because Paraguay market is secondary initially
- No test suite: accepted for speed (flagged as test debt in progress.md)
- No monitoring initially: accepted for launch speed (now being addressed in T002)

## Lessons Learned
- Protocol was skipped on first attempt → resulted in branding errors ("FlowAudit_" instead of "FlowAudit")
- Second attempt following the protocol produced clean results
- Always follow the protocol. Speed ≠ skipping steps.
