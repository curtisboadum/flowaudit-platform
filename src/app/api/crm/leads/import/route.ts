import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/crm-auth";
import { parseCreateLeadPayload } from "@/lib/crm-lead-validation";
import { createLead } from "@/lib/crm-store";
import { parseCsvRecords } from "@/lib/csv";

const MAX_IMPORT_ROWS = 500;
const REQUIRED_HEADERS = ["name", "email"] as const;

function getHeaderMissingErrors(headerKeys: string[]): string[] {
  return REQUIRED_HEADERS.filter((header) => !headerKeys.includes(header));
}

export async function POST(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const parsedLead = parseCreateLeadPayload({
      name: row.name ?? "",
      email: row.email ?? "",
      company: row.company ?? "",
      phone: row.phone ?? "",
      status: row.status ?? "new",
      source: row.source ?? "",
      notes: row.notes ?? "",
      language: row.language ?? "en",
      assignedTo: row.assigned_to ?? row.assignedto ?? "",
    });

    if (!parsedLead) {
      failed += 1;
      errors.push(`Row ${rowIndex + 2}: Invalid required fields`);
      continue;
    }

    try {
      await createLead(
        user.role === "admin"
          ? parsedLead
          : {
              ...parsedLead,
              language: "es",
              assignedTo: "esteban",
            },
      );
      imported += 1;
    } catch (err) {
      failed += 1;
      const reason = err instanceof Error ? err.message : "Create failed";
      errors.push(`Row ${rowIndex + 2}: ${reason}`);
    }
  }

  return NextResponse.json({ imported, failed, errors });
}
