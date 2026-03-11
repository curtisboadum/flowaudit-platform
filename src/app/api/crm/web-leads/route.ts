import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { createWebLead, getWebLeads, type BuildStage } from "@/lib/crm-web-store";
import { parseCreateWebLeadPayload } from "@/lib/crm-web-lead-validation";

const BUILD_STAGES: BuildStage[] = [
  "intake",
  "researching",
  "content_gen",
  "building",
  "review",
  "live",
  "cancelled",
];

function isBuildStage(value: string): value is BuildStage {
  return BUILD_STAGES.includes(value as BuildStage);
}

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const buildStageParam = searchParams.get("buildStage");

  if (buildStageParam && !isBuildStage(buildStageParam)) {
    return NextResponse.json({ error: "Invalid buildStage filter" }, { status: 400 });
  }

  try {
    const filter = buildStageParam ? { buildStage: buildStageParam as BuildStage } : undefined;
    const leads = await getWebLeads(filter);
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: "Failed to load web leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = parseCreateWebLeadPayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid web lead payload" }, { status: 400 });
  }

  try {
    const lead = await createWebLead(parsed);
    return NextResponse.json({ lead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create web lead" }, { status: 500 });
  }
}
