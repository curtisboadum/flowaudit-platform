import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { deleteApiKey, revokeApiKey } from "@/lib/crm-api-key-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, context: RouteParams) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") ?? "revoke";

  if (action !== "revoke" && action !== "delete") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  try {
    const success = action === "delete" ? await deleteApiKey(id) : await revokeApiKey(id);

    if (!success) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update API key" }, { status: 500 });
  }
}
