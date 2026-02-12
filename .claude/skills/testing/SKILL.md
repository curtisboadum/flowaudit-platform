# Testing Patterns

## When to Use
When the user asks to write tests, run tests, or check test coverage.

## Instructions

1. Determine the type of test needed:
   - **Unit test** (Vitest): For `src/lib/` functions and utilities
   - **Component test** (Vitest + Testing Library): For React components
   - **E2E test** (Playwright): For user flows and page interactions
2. Create the test file in the correct location.
3. Run tests and check results.

## Unit Test Template (Vitest)

```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { ok, err } from "./utils";

describe("Result helpers", () => {
  it("creates ok result", () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(42);
    }
  });

  it("creates err result", () => {
    const result = err(new Error("fail"));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toBe("fail");
    }
  });
});
```

## Component Test Template

```typescript
// src/components/agents/agent-card.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgentCard } from "./agent-card";

describe("AgentCard", () => {
  it("renders agent name and status", () => {
    render(<AgentCard name="Test Bot" status="active" />);
    expect(screen.getByText("Test Bot")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });
});
```

## E2E Test Template (Playwright)

```typescript
// tests/e2e/health.spec.ts
import { test, expect } from "@playwright/test";

test("health endpoint responds", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  const body = await response.json();
  expect(body.status).toBe("ok");
});
```

## Commands
- `pnpm test` — Run all unit/component tests
- `pnpm test:watch` — Watch mode
- `pnpm test:coverage` — Run with coverage report
- `pnpm test:e2e` — Run Playwright E2E tests

## Coverage Targets
- `src/lib/` — 80% lines, functions, branches, statements
- Components — Key user-facing components tested
- E2E — All critical user flows
