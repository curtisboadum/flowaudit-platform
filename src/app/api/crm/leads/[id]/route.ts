import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { getLead, updateLead, deleteLead } from "@/lib/crm-store";
import { parseUpdateLeadPayload } from "@/lib/crm-lead-validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteParams) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const existingLead = await getLead(id);
  if (!existingLead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  if (user.role === "esteban" && existingLead.language !== "es") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = parseUpdateLeadPayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }

  if (user.role === "esteban") {
    if (parsed.language && parsed.language !== "es") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (parsed.assignedTo && parsed.assignedTo !== "esteban") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const updatedLead = await updateLead(id, parsed);
  if (!updatedLead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ lead: updatedLead });
}

export async function DELETE(request: Request, context: RouteParams) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const existingLead = await getLead(id);
  if (!existingLead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  if (user.role === "esteban" && existingLead.language !== "es") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await deleteLead(id);
  return NextResponse.json({ success: true });
}
