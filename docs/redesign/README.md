# FlowAudit redesign handoff

- [Strategy and proof register](STRATEGY.md)
- [Design system](DESIGN.md)
- [Competitor intelligence and coverage](COMPETITOR-INTELLIGENCE.md)
- [Starred repository review](REPOSITORY-REVIEW.md)
- [Analytics definitions](ANALYTICS.md)
- [Integration status](INTEGRATION-STATUS.md)
- [QA report and release dependencies](QA-REPORT.md)

Run `npm ci`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test`, then `npm run test:e2e`. Browser tests start the production server automatically when needed. Extended visual/axe checks: `node scripts/qa.mjs` against a running production server on 3016. Lighthouse: `node scripts/lighthouse.mjs`. Both can be repeated when changes justify it; generated evidence should be reviewed and committed deliberately.

Use `.env.example` as a names-only guide. Server CRM/event credentials remain private. The applied migration is versioned under `supabase/migrations`; do not reapply ad hoc destructive schema changes. No public testimonials or performance proof were created. Human film review and provider signing remain release gates.
