# Architecture Decision Records

---

## ADR-001: InstantDB as Primary Database

**Date:** 2026-02-11
**Status:** Accepted
**Context:** Need a database for FlowAudit that supports realtime subscriptions for dashboard updates, with minimal backend setup and good TypeScript support.
**Decision:** Use InstantDB as the primary database.
**Rationale:**
- Built-in realtime subscriptions (no WebSocket setup needed)
- TypeScript-first with schema inference
- Graph-based queries are natural for our entity relationships
- Built-in auth system
- No server-side database management needed
**Consequences:**
- Tied to InstantDB's query model and pricing
- Schema migrations handled differently than traditional SQL
- Need to design permissions carefully upfront

---

## ADR-002: OpenClaw for Agent Framework

**Date:** 2026-02-11
**Status:** Accepted
**Context:** FlowAudit's core product is "moat bots" — workflow automation agents. Need a framework for defining, deploying, and managing these agents.
**Decision:** Use OpenClaw as the agent framework.
**Rationale:**
- JSON5 config-driven agent definitions
- Skill-based architecture fits our per-client customization model
- Gateway provides API access to agents
- Supports Claude models natively
**Consequences:**
- Dependent on OpenClaw ecosystem and updates
- Need to build management UI on top of OpenClaw primitives
- Each client agent is a directory in `openclaw/agents/`

---

## ADR-003: Next.js App Router Only (No pages/)

**Date:** 2026-02-11
**Status:** Accepted
**Context:** Next.js supports both App Router and Pages Router. Need to pick one for consistency.
**Decision:** Use App Router exclusively. Never create a `pages/` directory.
**Rationale:**
- App Router is the future of Next.js
- Server Components reduce client bundle size
- Better data fetching patterns (no getServerSideProps)
- Route groups allow clean layout separation
- Streaming and Suspense support
**Consequences:**
- Some libraries may not yet fully support Server Components
- Team must understand Server vs Client Component boundaries
- All routing patterns must use App Router conventions

---

## ADR Template

```markdown
## ADR-{number}: {Title}

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-{n}
**Context:** [Why is this decision needed?]
**Decision:** [What was decided]
**Rationale:** [Why this option was chosen]
**Consequences:** [What are the trade-offs]
```
