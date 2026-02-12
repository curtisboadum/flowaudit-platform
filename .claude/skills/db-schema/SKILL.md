# InstantDB Schema Management

## When to Use
When the user asks to modify the database, schema, add entities, or change relationships.

## Instructions

1. Read the current schema from `instant.schema.ts`.
2. Understand the requested change (new entity, new field, new link).
3. Modify `instant.schema.ts` following InstantDB patterns:
   - Entities use `i.entity({...})` with typed fields
   - Links define relationships with forward/reverse labels
   - Field types: `i.string()`, `i.number()`, `i.boolean()`, `i.date()`, `i.json()`, with `.optional()` and `.unique()`
4. Update `instant.perms.ts` if the new entity needs permission rules.
5. Update TypeScript types in `src/types/` to match the schema.
6. Run `pnpm typecheck` to verify no type errors.
7. Update `docs/tracking/change_log.md`.

## Schema Patterns

```typescript
// Adding a new entity
const schema = i.schema({
  entities: {
    newEntity: i.entity({
      name: i.string(),
      status: i.string(),
      createdAt: i.date(),
    }),
  },
  links: {
    parentChild: {
      forward: { on: "parents", has: "many", label: "children" },
      reverse: { on: "newEntity", has: "one", label: "parent" },
    },
  },
});
```

## Rules
- Always keep `instant.schema.ts` and `src/types/` in sync
- Use descriptive link labels (not generic "items" or "data")
- Every entity should have `createdAt` and `updatedAt` fields
- Run typecheck after every schema change
