import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { deleteWebLead, getWebLead, updateWebLead } from "@/lib/crm-web-store";
import { parseAgentUpdatePayload, parseUpdateWebLeadPayload } from "@/lib/crm-web-lead-validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function hasValidAgentKey(request: Request): boolean {
  const agentKey = request.headers.get("X-Agent-Key");
  if (agentKey !== process.env.CRM_AGENT_API_KEY || !process.env.CRM_AGENT_API_KEY) {
    return false;
  }
  return true;
}

export async function GET(request: Request, context: RouteParams) {
  const user = await getUserFromRequest(request);
  const agentAuthorized = hasValidAgentKey(request);

  if (!user && !agentAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const lead = await getWebLead(id);
    if (!lead) {
      return NextResponse.json({ error: "Web lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Failed to load web lead" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteParams) {
  const user = await getUserFromRequest(request);
  const agentAuthorized = hasValidAgentKey(request);

  if (!user && !agentAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const existingLead = await getWebLead(id);
    if (!existingLead) {
      return NextResponse.json({ error: "Web lead not found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to load web lead" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = user ? parseUpdateWebLeadPayload(body) : parseAgentUpdatePayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid web lead payload" }, { status: 400 });
  }

  if (Object.keys(parsed).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const lead = await updateWebLead(id, parsed);
    if (!lead) {
      return NextResponse.json({ error: "Web lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Failed to update web lead" }, { status: 500 });
  }
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

  try {
    const existingLead = await getWebLead(id);
    if (!existingLead) {
      return NextResponse.json({ error: "Web lead not found" }, { status: 404 });
    }

    await deleteWebLead(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete web lead" }, { status: 500 });
  }
}
