import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import {
  createWebLead,
  type BuildStage,
  type CreateWebLeadInput,
  type WebLeadBudget,
  type WebLeadGoal,
  type WebLeadPriority,
  type WebLeadTimeline,
} from "@/lib/crm-web-store";
import { parseCsvRecords } from "@/lib/csv";

const MAX_IMPORT_ROWS = 500;
const REQUIRED_HEADERS = ["business_name", "email"] as const;
const PRIORITIES: WebLeadPriority[] = ["low", "medium", "high", "urgent"];
const BUILD_STAGES: BuildStage[] = [
  "intake",
  "researching",
  "content_gen",
  "building",
  "review",
  "live",
  "cancelled",
];
const GOALS: WebLeadGoal[] = ["leads", "bookings", "sales", "showcase", "info"];
const BUDGETS: WebLeadBudget[] = ["unknown", "0-500", "500-1000", "1000-3000", "3000+"];
const TIMELINES: WebLeadTimeline[] = ["asap", "1month", "3months", "flexible"];

function getHeaderMissingErrors(headerKeys: string[]): string[] {
  return REQUIRED_HEADERS.filter((header) => !headerKeys.includes(header));
}

function readCell(value: string | undefined): string {
  return (value ?? "").trim();
}

function parsePriority(value: string | undefined): WebLeadPriority {
  const normalized = readCell(value).toLowerCase();
  return PRIORITIES.includes(normalized as WebLeadPriority)
    ? (normalized as WebLeadPriority)
    : "medium";
}

function parseBuildStage(value: string | undefined): BuildStage {
  const normalized = readCell(value).toLowerCase();
  return BUILD_STAGES.includes(normalized as BuildStage) ? (normalized as BuildStage) : "intake";
}

function parsePrimaryGoal(value: string | undefined): WebLeadGoal | "" {
  const normalized = readCell(value).toLowerCase();
  return GOALS.includes(normalized as WebLeadGoal) ? (normalized as WebLeadGoal) : "";
}

function parseBudget(value: string | undefined): WebLeadBudget {
  const normalized = readCell(value).toLowerCase();
  return BUDGETS.includes(normalized as WebLeadBudget) ? (normalized as WebLeadBudget) : "unknown";
}

function parseTimeline(value: string | undefined): WebLeadTimeline {
  const normalized = readCell(value).toLowerCase();
  return TIMELINES.includes(normalized as WebLeadTimeline)
    ? (normalized as WebLeadTimeline)
    : "flexible";
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const upload = formData.get("file");
  if (!(upload instanceof File)) {
    return NextResponse.json({ error: "CSV file is required" }, { status: 400 });
  }

  if (!upload.name.toLowerCase().endsWith(".csv")) {
    return NextResponse.json({ error: "Only .csv files are supported" }, { status: 400 });
  }

  const csvText = await upload.text();
  const parsed = parseCsvRecords(csvText);
  if (parsed.headers.length === 0) {
    return NextResponse.json({ error: "CSV headers are missing" }, { status: 400 });
  }

  const missingHeaders = getHeaderMissingErrors(parsed.headerKeys);
  if (missingHeaders.length > 0) {
    return NextResponse.json(
      { error: `Missing required header(s): ${missingHeaders.join(", ")}` },
      { status: 400 },
    );
  }

  if (parsed.rows.length === 0) {
    return NextResponse.json({ error: "CSV does not include data rows" }, { status: 400 });
  }

  if (parsed.rows.length > MAX_IMPORT_ROWS) {
    return NextResponse.json(
      { error: `CSV exceeds max rows (${MAX_IMPORT_ROWS})` },
      { status: 400 },
    );
  }

  let imported = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let rowIndex = 0; rowIndex < parsed.rows.length; rowIndex += 1) {
    const row = parsed.rows[rowIndex] ?? {};
    const businessName = readCell(row.business_name);
    const email = readCell(row.email);

    if (!businessName || !email) {
      failed += 1;
      errors.push(`Row ${rowIndex + 2}: business_name and email are required`);
      continue;
    }

    const payload: CreateWebLeadInput = {
      businessName,
      email,
      ownerName: readCell(row.owner_name ?? row.owner ?? ""),
      phone: readCell(row.phone),
      industry: readCell(row.industry),
      location: readCell(row.location),
      socialFacebook: "",
      socialInstagram: "",
      socialLinkedin: "",
      socialTwitter: "",
      socialTiktok: "",
      brandColors: [],
      brandStyle: "",
      fontPreference: "",
      inspirationUrls: [],
      description: readCell(row.description),
      usp: readCell(row.usp),
      targetAudience: readCell(row.target_audience),
      yearsInBusiness: "",
      services: [],
      testimonials: [],
      reviewUrls: [],
      certifications: "",
      teamMembers: [],
      primaryGoal: parsePrimaryGoal(row.primary_goal),
      ctaText: "",
      pagesNeeded: [],
      domainName: "",
      budget: parseBudget(row.budget),
      timeline: parseTimeline(row.timeline),
      hasLogo: false,
      hasPhotos: false,
      hasVideos: false,
      assetNotes: "",
      buildStage: parseBuildStage(row.build_stage),
      aiNotes: "",
      researchData: null,
      generatedContent: null,
      previewUrl: "",
      liveUrl: "",
      source: readCell(row.source),
      assignedTo: "",
      priority: parsePriority(row.priority),
      notes: readCell(row.notes),
    };

    try {
      await createWebLead(payload);
      imported += 1;
    } catch (err) {
      failed += 1;
      const reason = err instanceof Error ? err.message : "Create failed";
      errors.push(`Row ${rowIndex + 2}: ${reason}`);
    }
  }

  return NextResponse.json({ imported, failed, errors });
}
