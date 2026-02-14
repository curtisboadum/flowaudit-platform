# Insights & Learnings

Patterns discovered, solutions to problems, and general learnings during development.

---

## 2026-02-14 — UI/SEO Overhaul

### Git Push with MCP Plugins

- `GITHUB_TOKEN` env var injected by MCP plugins can block `git push` with authentication errors
- Fix: `unset GITHUB_TOKEN` before pushing to fall through to keyring/SSH credentials
- This only affects pushes — `gh` CLI commands work fine with the token

### Zsh Glob Expansion vs Git Paths

- Zsh interprets `[brackets]` in file paths as glob patterns, causing "no matches found" errors
- Fix: quote paths containing brackets when using git commands (e.g., `git add "path/[file].tsx"`)

### Tailwind v4 CSS-First Configuration

- Tailwind v4 uses `@theme inline` in `globals.css` for configuration — no `tailwind.config.ts` needed
- Delete the v3-style `tailwind.config.ts` to avoid confusion
- `tw-animate-css` package requires relative path import (`../../node_modules/tw-animate-css/dist/tw-animate.css`) because Turbopack doesn't resolve the `"style"` export condition
- Always clear `.next` cache after CSS pipeline changes

### Next.js SEO Built-ins

- `robots.ts` and `sitemap.ts` are simple exports in the `src/app/` directory — no route handler boilerplate needed
- `generateMetadata` on each page enables per-page OpenGraph/Twitter metadata
- JSON-LD structured data can be injected via `<script type="application/ld+json">` in layout or page components

---

## 2026-02-12 — Deployment

### Vercel + Next.js 15 Deployment

- Vercel auto-detects Next.js 15 with App Router — zero config needed
- Static marketing site deploys without any environment variables
- InstantDB/Anthropic/OpenClaw keys only needed when dashboard features are built
- `vercel --yes` skips all interactive prompts for CI-friendly deploys

### Git + GitHub One-Liner

- `gh repo create owner/repo --public --source=. --remote=origin --push` handles repo creation, remote setup, and initial push in one command
- No need for separate `git remote add` + `git push` steps

### Marketing Site Architecture

- 15+ section components on homepage keeps each section focused and maintainable
- All 21 pages are fully static — no server-side data fetching for marketing content
- Health endpoint (`/api/health`) useful for uptime monitoring from day one

---

## 2026-02-11 — Project Setup

### InstantDB Schema Design

- InstantDB uses a graph-based schema with `i.schema()`, `i.entity()`, and links
- Entities map to tables, links define relationships (has: "many" / "one")
- Schema changes are additive — plan schema carefully upfront

### OpenClaw Agent Structure

- Each agent is a directory with `config.json5` and `skills/` subdirectory
- JSON5 format allows comments in config files
- Gateway routes are auto-generated from agent IDs

### Next.js 15 App Router

- Server Components are the default — only add `"use client"` when hooks or interactivity needed
- Route handlers go in `src/app/api/{route}/route.ts`
- Layouts are inherited by all child pages — use route groups `(marketing)`, `(dashboard)` for different layouts

---

## Template

```markdown
## YYYY-MM-DD — [Topic]

### [Insight Title]

- [Details about what was learned]
- [Why it matters]
- [How to apply it]
```
