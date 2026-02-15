# Insights & Learnings

Patterns discovered, solutions to problems, and general learnings during development.

---

## 2026-02-15 — Calculator PDF Export & Sunset Models

### html2canvas + Tailwind v4 oklch() Incompatibility

- `html2canvas` (used by `html2pdf.js`) cannot parse CSS `oklch()` color functions
- Tailwind v4 uses `oklch()` in CSS custom properties by default
- Appending elements to `document.body` inherits these properties and crashes html2canvas
- **Solution:** Render inside an `<iframe>` for complete CSS isolation — the iframe has no Tailwind styles
- `generateHTML()` uses only inline styles, so it renders correctly without Tailwind
- Always use `finally` for DOM cleanup — prevents orphaned iframes/elements when errors occur

### Sunset Gemini Models

- Google sunsets models from the v1beta API — `gemini-1.5-flash` now returns 404
- Fallback models must be kept current — `gemini-2.0-flash-lite` is the current lightweight option
- Check Google AI model deprecation notices periodically
- When hardcoding model names as fallbacks, add a comment noting when the model was last verified

### Print Popup Blocking

- `window.open()` for Print Reports can be blocked by browser popup blockers
- Detecting blocked popups: check if the returned window reference is `null`
- **Fallback:** `window.print()` prints the current page — less ideal but always works
- User-initiated click events typically bypass popup blockers, but some browsers still block `window.open()` in async callbacks

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

### Git Push Token Resolution

- Fine-grained PATs (`github_pat_...`) from `GITHUB_TOKEN` env var may have API access but lack `contents:write` permission for `git push`
- Fix: `GITHUB_TOKEN= gh auth token` falls through to the keyring-stored OAuth token (`gho_...`) which has full `repo` scope
- Can also pass the keyring token via credential helper override for the push command
- This is a refinement of the earlier "unset GITHUB_TOKEN" insight — the root cause is PAT scope mismatch

### Next.js App Router Favicon Convention

- Place `icon.svg` in `src/app/` — Next.js auto-serves it at `/icon.svg` with a cache-busted hash query param
- No `<link>` tag needed in layout — the framework handles it automatically
- SVG format allows crisp rendering at any size without multiple PNG variants

---

## 2026-02-14 — Gemini API Rate Limit Resilience

### Retry + Fallback Pattern for LLM APIs

- Gemini 2.0 Flash returns HTTP 429 when rate limits are exceeded — common under even moderate traffic on free/low-tier plans
- Exponential backoff retry (1s → 2s → 4s) handles transient rate limits without overwhelming the API
- Fallback to a different model (`gemini-1.5-flash`) on persistent 429s ensures users still get a response
- Diagnostic headers/logging (model used, retry count, fallback triggered) are essential for debugging production LLM issues
- Never silently swallow streaming errors — surface specific error messages to the client so users know what happened

### Stream Error Handling

- SSE streaming errors were caught but the response was closed without sending error data to the client
- Fix: write a `data: {"error":"..."}` frame before closing the stream so the client can display a specific message
- Every error state in a chat widget should direct users toward an alternative action (e.g., "Book a call instead")

---

## 2026-02-14 — Chat Widget & Gemini Streaming

### Gemini SSE Streaming Pattern

- Use `model.startChat({ history })` then `chat.sendMessageStream(latestMessage)` for conversational streaming
- Gemini requires alternating user/model roles — merge consecutive same-role messages before sending
- Pop the last user message from history array and pass it to `sendMessageStream()` separately
- SSE format: `data: {"text":"chunk"}\n\n` with `data: [DONE]\n\n` sentinel

### Chat Widget Architecture

- Floating action button (FAB) pattern: fixed-position button in bottom-right, toggles a panel above it
- Quick questions array provides zero-friction first interaction for visitors
- Client-side SSE parsing: buffer chunks, split on `\n\n`, parse `data: ` prefix, accumulate assistant content via state updater function
- Error fallback directs users to book a call — every error state is a lead capture opportunity
- Rate limiting (in-memory Map with periodic cleanup) is sufficient for Vercel serverless at early traffic scale

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
