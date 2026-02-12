# Quality Checklists

## Pre-Commit Checklist

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes
- [ ] No `any` types introduced
- [ ] No secrets or API keys in code
- [ ] No `console.log` (use `console.warn`/`console.error` if needed)
- [ ] Conventional commit message format
- [ ] Changes are on a feature branch (not main)

## Pre-Deploy Checklist

- [ ] All pre-commit checks pass
- [ ] `pnpm build` succeeds
- [ ] E2E tests pass (`pnpm test:e2e`)
- [ ] Environment variables configured in Vercel
- [ ] No breaking changes to API contracts
- [ ] Tracking files updated (change_log.md, session.md)
- [ ] PR reviewed and approved

## Post-Deploy Checklist

- [ ] Health endpoint responds: `GET /api/health`
- [ ] No errors in Vercel deployment logs
- [ ] Key user flows verified manually
- [ ] Monitoring/alerts configured
- [ ] Change log updated with deployment note

## Feature Completion Checklist

- [ ] Feature works as specified
- [ ] TypeScript types are complete and strict
- [ ] Unit tests written (80%+ coverage for lib/)
- [ ] Error states handled gracefully
- [ ] Loading states implemented
- [ ] Mobile responsive (if UI)
- [ ] Accessibility basics (semantic HTML, ARIA labels)
- [ ] Documentation updated if needed
