# API Endpoint Scaffold

## When to Use
When the user asks to create a new API route or endpoint.

## Instructions

1. Determine the resource and HTTP methods needed.
2. Create the route handler at `src/app/api/{resource}/route.ts` (or `[id]/route.ts` for dynamic).
3. Follow Next.js App Router conventions:
   - Export named functions: `GET`, `POST`, `PATCH`, `DELETE`
   - Use `NextRequest` and `NextResponse`
   - Validate input at the boundary
   - Return proper HTTP status codes
4. Add TypeScript types for request/response bodies.
5. Update `docs/api/endpoints.md` with the new endpoint.
6. Update `docs/tracking/change_log.md`.

## Route Handler Template

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("GET /api/{resource} failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate input
    // Implementation
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("POST /api/{resource} failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

## Conventions
- File: `src/app/api/{resource}/route.ts`
- Dynamic: `src/app/api/{resource}/[id]/route.ts`
- Always validate request body for POST/PATCH
- Use 200 for success, 201 for creation, 400 for bad input, 404 for not found, 500 for server errors
- Log errors with `console.error`
