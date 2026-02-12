# Insights & Learnings

Patterns discovered, solutions to problems, and general learnings during development.

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
