export interface ParsedCsvRecordSet {
  headers: string[];
  headerKeys: string[];
  rows: Record<string, string>[];
}

function normalizeHeader(header: string): string {
  return header.trim().toLowerCase();
}

function normalizeCell(cell: string): string {
  return cell.trim();
}

export function parseCsvRows(input: string): string[][] {
  const rows: string[][] = [];
  const text = input.startsWith("\uFEFF") ? input.slice(1) : input;

  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (!char) continue;

    if (inQuotes) {
      if (char === '"') {
        const nextChar = text[index + 1];
        if (nextChar === '"') {
          currentCell += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      currentRow.push(currentCell);
      currentCell = "";
      continue;
    }

    if (char === "\n") {
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = "";
      continue;
    }

    if (char === "\r") {
      continue;
    }

    currentCell += char;
  }

  currentRow.push(currentCell);
  rows.push(currentRow);

  return rows.filter((row) => row.some((cell) => normalizeCell(cell).length > 0));
}

export function parseCsvRecords(input: string): ParsedCsvRecordSet {
  const rows = parseCsvRows(input);
  if (rows.length === 0) {
    return {
      headers: [],
      headerKeys: [],
      rows: [],
    };
  }

  const headerRow = rows[0] ?? [];
  const headers = headerRow.map((value) => normalizeCell(value));
  const headerKeys = headers.map((header) => normalizeHeader(header));

  const recordRows: Record<string, string>[] = [];
  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex] ?? [];
    const record: Record<string, string> = {};

    for (let columnIndex = 0; columnIndex < headerKeys.length; columnIndex += 1) {
      const headerKey = headerKeys[columnIndex];
      if (!headerKey) continue;

      record[headerKey] = normalizeCell(row[columnIndex] ?? "");
    }

    recordRows.push(record);
  }

  return {
    headers,
    headerKeys,
    rows: recordRows,
  };
}
