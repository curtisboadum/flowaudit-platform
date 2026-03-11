import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { createLead, getLeads } from "@/lib/crm-store";
import { parseCreateLeadPayload } from "@/lib/crm-lead-validation";

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = user.role === "admin"
    ? await getLeads()
    : await getLeads({ language: "es" });
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = parseCreateLeadPayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }

  const lead = await (user.role === "admin"
    ? createLead(parsed)
    : createLead({
        ...parsed,
        language: "es",
        assignedTo: "esteban",
      }));

  return NextResponse.json({ lead }, { status: 201 });
}
