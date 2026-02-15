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

## ADR-004: CSS-First Tailwind v4 Configuration

**Date:** 2026-02-14
**Status:** Accepted
**Context:** Tailwind v4 introduces a CSS-first configuration model using `@theme inline` in CSS files, replacing the JavaScript-based `tailwind.config.ts` from v3. Need to decide which approach to use.
**Decision:** Use `@theme inline` in `globals.css` for all Tailwind configuration. Delete `tailwind.config.ts`.
**Rationale:**

- CSS-first config is the Tailwind v4 standard — aligns with upstream direction
- Eliminates a config file and simplifies the build pipeline
- Theme values are colocated with CSS, reducing context switching
- Avoids issues with Turbopack not resolving v3-style config
  **Consequences:**
- All theme customizations live in `globals.css` under `@theme inline`
- Team must learn CSS-first config syntax instead of JS config
- Third-party Tailwind plugins may need relative path imports if they don't support the new resolution

---

## ADR-005: SEO via Next.js Built-in Metadata API

**Date:** 2026-02-14
**Status:** Accepted
**Context:** Marketing site needs SEO infrastructure — sitemaps, robots directives, structured data, and per-page metadata. Could use `next-seo` package, manual `<head>` tags, or Next.js built-in Metadata API.
**Decision:** Use Next.js built-in Metadata API (`generateMetadata`, `robots.ts`, `sitemap.ts`) and inline JSON-LD for structured data.
**Rationale:**

- Zero additional dependencies — built into Next.js 15
- `robots.ts` and `sitemap.ts` are simple exports with full TypeScript support
- `generateMetadata` enables per-page OpenGraph/Twitter metadata with type safety
- JSON-LD structured data injected via `<script>` tags — no library needed
- App Router native — works with Server Components and streaming
  **Consequences:**
- No single package to manage all SEO concerns — each piece is a separate file
- JSON-LD schemas must be manually constructed (no helper library)
- Metadata API may not cover every edge case that `next-seo` handles

---

## ADR-006: Reusable Breadcrumb Component Pattern

**Date:** 2026-02-14
**Status:** Accepted
**Context:** Subpages needed visual breadcrumb navigation for UX. Could use automatic route-based generation in the layout, a global breadcrumb context provider, or a per-page composition approach.
**Decision:** Single `Breadcrumbs` component accepting an `items` array, imported and configured per-page.
**Rationale:**

- Composition over global layout injection — each page controls its own breadcrumb hierarchy
- Dynamic pages (blog, industry) can resolve slugs to human-readable display names at the page level
- No global state or context provider needed — simple props-based interface
- Matches the project convention of Server Components by default (no client-side state required for breadcrumbs)
  **Consequences:**
- Each page must import `Breadcrumbs` and configure its own items array
- No automatic breadcrumb generation from route structure — manual maintenance required
- Adding a new page requires explicitly adding breadcrumb configuration

---

## ADR-007: Gemini 2.0 Flash for Chat Widget

**Date:** 2026-02-14
**Status:** Accepted
**Context:** Marketing site needs an AI chat widget for visitor engagement. Could use Claude API (already in stack for core product), OpenAI, or Google Gemini.
**Decision:** Use Gemini 2.0 Flash via `@google/generative-ai` SDK for the marketing chat widget.
**Rationale:**

- Significantly lower cost per token than Claude for a high-volume, low-stakes use case (marketing Q&A)
- Gemini 2.0 Flash has fast response times suitable for real-time chat streaming
- Keeps Claude API reserved for the core product (moat bots / workflow agents) where quality matters most
- Native streaming support via `sendMessageStream()` maps cleanly to SSE
- Free tier generous enough for early traffic
  **Consequences:**
- Two AI providers to manage (Gemini for chat, Claude for agents)
- `GEMINI_API_KEY` env var required in Vercel for chat to work
- If chat quality needs improve, can swap to Claude API without changing the widget UI (same SSE interface)

---

## ADR-008: iframe Isolation for PDF Export

**Date:** 2026-02-15
**Status:** Accepted
**Context:** The calculator's Export PDF feature uses `html2canvas` (via `html2pdf.js`) to render HTML to a canvas. Tailwind v4 uses `oklch()` color functions in CSS custom properties. When the PDF content element is appended to `document.body`, it inherits these properties, and `html2canvas` crashes because it cannot parse `oklch()`.
**Decision:** Render PDF content inside an invisible `<iframe>` instead of appending to `document.body`.
**Rationale:**

- Complete CSS isolation — the iframe has no Tailwind styles, so `oklch()` never enters the rendering context
- `generateHTML()` already uses only inline styles with hex/rgb colors, so it renders correctly without Tailwind
- No changes needed to the HTML generation logic — only the rendering container changed
- Standard browser API with universal support
  **Consequences:**
- Slight latency (~500ms render wait) for iframe content and fonts to load before html2canvas captures
- Requires iframe cleanup in a `finally` block to prevent orphaned DOM elements on error
- If `generateHTML()` ever needs Tailwind classes, this approach would need a Tailwind stylesheet injected into the iframe

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
