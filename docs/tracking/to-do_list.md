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

- [ ] Add dark mode support
- [ ] Set up monitoring/analytics
- [ ] Add agent run history visualization
- [ ] Performance optimization audit

---

## Template

```markdown
- [ ] [P{0-3}] [Task description] — [optional context]
```
