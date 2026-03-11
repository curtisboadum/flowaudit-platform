"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileUp, Upload, X } from "lucide-react";
import { parseCsvRecords } from "@/lib/csv";

interface ImportResult {
  imported: number;
  failed: number;
  errors: string[];
}

interface WebImportModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => Promise<void> | void;
}

function createTemplateCsv(): string {
  return [
    "business_name,email,owner_name,phone,industry,location,description,usp,source,notes,priority,build_stage,primary_goal,budget,timeline",
    'Acme Roofing,hello@acmeroofing.com,Jane Smith,+1 555 123 4567,Roofing,Austin TX,"Family-owned roofing and repair company","24-hour emergency repairs",Cold Outreach,"Interested in fast launch",high,intake,leads,1000-3000,asap',
    'Sunrise Dental,contact@sunrisedental.com,Dr. Luis Gomez,+1 555 888 1122,Dental,Phoenix AZ,"General and cosmetic dentistry","Weekend appointments",Referral,"Needs booking workflow",medium,researching,bookings,3000+,1month',
  ].join("\n");
}

export function WebImportModal({ open, onClose, onComplete }: WebImportModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<Record<string, string>[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);

  useEffect(() => {
    if (!open) {
      setIsDragging(false);
      setFile(null);
      setPreviewHeaders([]);
      setPreviewRows([]);
      setIsImporting(false);
      setError("");
      setResult(null);
    }
  }, [open]);

  async function loadPreview(nextFile: File) {
    try {
      const csvText = await nextFile.text();
      const parsed = parseCsvRecords(csvText);
      setPreviewHeaders(parsed.headers);
      setPreviewRows(parsed.rows.slice(0, 5));
    } catch {
      setPreviewHeaders([]);
      setPreviewRows([]);
      setError("Could not read CSV file");
    }
  }

  async function handleFile(nextFile: File) {
    if (!nextFile.name.toLowerCase().endsWith(".csv")) {
      setError("Only .csv files are supported");
      setFile(null);
      setPreviewHeaders([]);
      setPreviewRows([]);
      return;
    }

    setError("");
    setResult(null);
    setFile(nextFile);
    await loadPreview(nextFile);
  }

  function handleDownloadTemplate() {
    const blob = new Blob([createTemplateCsv()], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "flowaudit-web-leads-template.csv";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  async function handleImport() {
    if (!file) {
      setError("Only .csv files are supported");
      return;
    }

    setIsImporting(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/crm/web-leads/import", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as Partial<ImportResult> & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Import failed");
      }

      const nextResult: ImportResult = {
        imported: payload.imported ?? 0,
        failed: payload.failed ?? 0,
        errors: payload.errors ?? [],
      };

      setResult(nextResult);
      if (nextResult.imported > 0) {
        await onComplete();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Import failed");
      }
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <>
      <div
        role="presentation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <section
        className={`fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[rgba(55,50,47,0.12)] bg-white p-5 shadow-[0px_12px_30px_rgba(55,50,47,0.16)] transition-all ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl text-[#37322F]">Import Web Leads</h3>
            <p className="mt-1 text-sm text-[#7C7571]">Upload a CSV of companies without a website</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#7C7571] transition-colors hover:bg-[rgba(55,50,47,0.06)] hover:text-[#37322F]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="inline-flex items-center gap-2 rounded-lg border border-[rgba(55,50,47,0.15)] px-3 py-2 text-sm font-medium text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.04)]"
          >
            <Download className="h-4 w-4" />
            Download Template
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2F3037] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b]"
          >
            <FileUp className="h-4 w-4" />
            Select file
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(event) => {
            const nextFile = event.target.files?.[0];
            if (nextFile) {
              void handleFile(nextFile);
            }
          }}
        />

        <div
          role="presentation"
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            const droppedFile = event.dataTransfer.files?.[0];
            if (droppedFile) {
              void handleFile(droppedFile);
            }
          }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-xl border border-dashed px-4 py-8 text-center transition-colors ${
            isDragging
              ? "border-[#2F3037] bg-[rgba(47,48,55,0.06)]"
              : "border-[rgba(55,50,47,0.2)] bg-[rgba(55,50,47,0.02)] hover:bg-[rgba(55,50,47,0.04)]"
          }`}
        >
          <Upload className="mx-auto mb-2 h-5 w-5 text-[#605A57]" />
          <p className="text-sm text-[#605A57]">Drop a .csv file here or click to choose</p>
          {file && <p className="mt-2 text-xs font-medium text-[#37322F]">{`Selected file: ${file.name}`}</p>}
        </div>

        {previewHeaders.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-[#37322F]">Preview (first 5 rows)</h4>
            <div className="overflow-x-auto rounded-lg border border-[rgba(55,50,47,0.12)]">
              <table className="min-w-full text-left text-xs">
                <thead className="bg-[rgba(55,50,47,0.04)] text-[#7C7571]">
                  <tr>
                    {previewHeaders.map((header) => (
                      <th key={header} className="px-3 py-2 font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, index) => (
                    <tr key={`preview-row-${index}`} className="border-t border-[rgba(55,50,47,0.08)]">
                      {previewHeaders.map((header) => (
                        <td key={`${header}-${index}`} className="px-3 py-2 text-[#4f4946]">
                          {row[header.trim().toLowerCase()] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-4 space-y-2">
            <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {`${result.imported} leads imported, ${result.failed} failed`}
            </p>
            {result.errors.length > 0 && (
              <div className="max-h-28 overflow-y-auto rounded-lg border border-[rgba(55,50,47,0.12)] bg-[#F7F5F3] p-2">
                {result.errors.slice(0, 10).map((rowError) => (
                  <p key={rowError} className="text-xs text-[#605A57]">
                    {rowError}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[rgba(55,50,47,0.15)] px-4 py-2 text-sm font-medium text-[#37322F] transition-colors hover:bg-[rgba(55,50,47,0.04)]"
          >
            Close
          </button>
          <button
            type="button"
            disabled={!file || isImporting}
            onClick={() => void handleImport()}
            className="rounded-lg bg-[#2F3037] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#24252b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isImporting ? "Importing..." : "Import"}
          </button>
        </div>
      </section>
    </>
  );
}
