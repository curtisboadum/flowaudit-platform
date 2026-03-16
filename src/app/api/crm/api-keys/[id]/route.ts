import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { revokeApiKey } from "@/lib/crm-api-keys";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getUserFromRequest(request);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await revokeApiKey(id);
  return NextResponse.json({ success: true });
}
