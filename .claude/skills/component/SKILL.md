# React Component Scaffold

## When to Use
When the user asks to create a new React component.

## Instructions

1. Determine if it should be a Server Component (default) or Client Component.
2. Choose the correct directory:
   - `src/components/ui/` — Generic UI primitives (buttons, cards, modals)
   - `src/components/layout/` — Layout components (header, sidebar, footer)
   - `src/components/agents/` — Agent-specific components
   - `src/components/clients/` — Client-specific components
   - `src/components/shared/` — Shared across features
3. Create the component file using kebab-case: `{component-name}.tsx`.
4. Follow these patterns:

## Server Component Template (default)

```typescript
interface AgentCardProps {
  name: string;
  status: "active" | "paused" | "error";
}

export function AgentCard({ name, status }: AgentCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{name}</h3>
      <span className="text-sm text-gray-500">{status}</span>
    </div>
  );
}
```

## Client Component Template

```typescript
"use client";

import { useState } from "react";

interface AgentToggleProps {
  agentId: string;
  initialActive: boolean;
  onToggle: (active: boolean) => void;
}

export function AgentToggle({ agentId, initialActive, onToggle }: AgentToggleProps) {
  const [active, setActive] = useState(initialActive);

  function handleToggle() {
    const next = !active;
    setActive(next);
    onToggle(next);
  }

  return (
    <button onClick={handleToggle} className="rounded px-3 py-1">
      {active ? "Pause" : "Activate"}
    </button>
  );
}
```

## Conventions
- File names: kebab-case (`agent-card.tsx`)
- Component names: PascalCase (`AgentCard`)
- Props interface: `{ComponentName}Props`, colocated in the same file
- No barrel files — import directly from the component file
- No `React.FC` — use function declarations
- Server Components by default — only add `"use client"` when using hooks or event handlers
- Use Tailwind for styling — no CSS modules
