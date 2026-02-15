# To-Do List

Priority levels: **P0** (critical/blocking), **P1** (important), **P2** (normal), **P3** (nice-to-have)
Status: `[ ]` pending, `[~]` in progress, `[x]` done, `[-]` dropped

---

## P0 — Critical

- [x] Initial project scaffold and configuration
- [x] Create GitHub repo `curtisboadum/flowaudit-platform`
- [x] Install dependencies: `pnpm install`
- [x] Verify `pnpm build` succeeds
- [x] Initial commit and push to GitHub

## P1 — Important

- [x] UI/SEO/logo overhaul (PR #2 on `feat/ui-seo-logos-overhaul`)
- [x] Merge PR #2 and verify production deploy
- [x] Verify SEO: sitemap.xml, robots.txt, JSON-LD in page source
- [x] AI chat widget — streaming Gemini-powered assistant with rate limiting and system prompt
- [x] Calculator polish — "Build & Deployment Fee" label, disclaimer, tooltip hover
- [x] Industry workflow redesign — numbered steps, From/To labels, hover effects
- [x] Fix Gemini 429 — retry with exponential backoff, fallback model (updated to `gemini-2.0-flash-lite`), diagnostic logging
- [x] About page — correct team member names, titles, and AI agent descriptions
- [x] Fix calculator Export PDF crash — iframe isolation to avoid oklch() incompatibility with html2canvas
- [x] Fix calculator Print Report — popup-blocked fallback to `window.print()`
- [x] Fix chatbot 404 — replace sunset `gemini-1.5-flash` with `gemini-2.0-flash-lite`
- [x] Push `fix/fallback-model-name` branch — pushed via `GITHUB_TOKEN=` workaround
- [ ] Set up InstantDB app and configure `NEXT_PUBLIC_INSTANT_APP_ID`
- [ ] Set up OpenClaw account and configure API keys
- [x] Set up Vercel project linked to GitHub repo
- [ ] Configure Vercel environment variables (InstantDB, Anthropic, OpenClaw keys)
- [ ] Implement authentication flow (InstantDB auth)
- [ ] Build client dashboard layout

## P2 — Normal

- [ ] Add shadcn/ui components
- [ ] Build agent management CRUD pages
- [ ] Build client management CRUD pages
- [ ] Create first moat bot template
- [ ] Write unit tests for `src/lib/` functions
- [ ] Write E2E tests for critical flows

## P3 — Nice to Have

- [x] Add visible breadcrumb UI component to subpages
- [x] Add favicon to `src/app/`
- [ ] Add dark mode support
- [ ] Set up monitoring/analytics
- [ ] Add agent run history visualization
- [ ] Performance optimization audit

---

## Template

```markdown
- [ ] [P{0-3}] [Task description] — [optional context]
```
