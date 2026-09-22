import {
  FileCheck2,
  FileSpreadsheet,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";
import { useRef, useState, type DragEvent } from "react";

import { cn } from "@/lib/utils";

const acceptedExtensions = ["csv", "xlsx", "xls"];

export interface SelectedImportFile {
  name: string;
  sizeLabel: string;
  rowCount: number;
}

export function UploadStep({
  selectedFile,
  sampleFile,
  onSelect,
  onContinue,
}: {
  selectedFile: SelectedImportFile | null;
  sampleFile: SelectedImportFile;
  onSelect: (file: SelectedImportFile | null) => void;
  onContinue: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  function acceptFile(file: File) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!acceptedExtensions.includes(extension)) {
      setError(
        "Please choose a CSV or Excel file (.csv, .xlsx, or .xls). Our template is the safest place to start.",
      );
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError(
        "This file is larger than 8 MB. Please split it into smaller guest lists and try again.",
      );
      return;
    }
    setError("");
    onSelect({
      name: file.name,
      sizeLabel:
        file.size < 1024
          ? `${file.size} B`
          : `${(file.size / 1024).toFixed(1)} KB`,
      rowCount: sampleFile.rowCount,
    });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) acceptFile(file);
  }

  if (selectedFile) {
    return (
      <section className="rounded-xl border border-border bg-surface-lowest p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-terracotta-soft text-secondary">
              <FileCheck2 aria-hidden size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
                Source file ready
              </p>
              <h2 className="mt-1 truncate font-serif text-2xl">
                {selectedFile.name}
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                {selectedFile.rowCount} rows detected · {selectedFile.sizeLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="inline-flex min-h-11 items-center gap-2 border border-border px-4 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
            >
              <X aria-hidden size={15} /> Replace File
            </button>
            <button
              type="button"
              onClick={onContinue}
              className="min-h-11 bg-secondary px-6 text-[10px] font-semibold tracking-[0.14em] text-secondary-foreground uppercase shadow-md hover:bg-accent hover:text-accent-foreground"
            >
              Continue to Review
            </button>
          </div>
        </div>
        <div className="mt-7 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
          {[
            [FileSpreadsheet, "Format recognised", "CSV / Excel columns found"],
            [
              ShieldCheck,
              "Private by design",
              "Only guest details are previewed",
            ],
            [
              FileCheck2,
              "Nothing imported yet",
              "You stay in control until confirm",
            ],
          ].map(([Icon, title, detail]) => (
            <div key={String(title)} className="flex gap-3 bg-surface-low p-4">
              <Icon aria-hidden size={18} className="shrink-0 text-secondary" />
              <div>
                <p className="text-xs font-semibold">{String(title)}</p>
                <p className="mt-1 text-xs leading-5 text-on-surface-variant">
                  {String(detail)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-surface-lowest p-5 shadow-sm sm:p-8">
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-[310px] flex-col items-center justify-center border border-dashed border-outline-variant bg-surface-low px-5 text-center transition-colors",
          dragging && "border-secondary bg-terracotta-soft/40",
        )}
      >
        <span className="grid size-16 place-items-center rounded-full bg-surface-lowest text-secondary shadow-sm">
          <UploadCloud aria-hidden size={27} />
        </span>
        <h2 className="mt-5 font-serif text-3xl">Choose your guest list</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-on-surface-variant">
          Drop a CSV or Excel file here, or browse your device. Use one row per
          invitation entry and up to 10 guests per entry.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="min-h-11 bg-secondary px-6 text-[10px] font-semibold tracking-[0.14em] text-secondary-foreground uppercase shadow-md hover:bg-accent hover:text-accent-foreground"
          >
            Select File
          </button>
          <button
            type="button"
            onClick={() => {
              setError("");
              onSelect(sampleFile);
            }}
            className="min-h-11 border border-border bg-surface-lowest px-5 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-container"
          >
            Use Sample File
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept=".csv,.xlsx,.xls,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) acceptFile(file);
          }}
        />
      </div>
      {error && (
        <p
          role="alert"
          className="mt-4 bg-error-container px-4 py-3 text-sm text-on-error-container"
        >
          {error}
        </p>
      )}
      <p className="mt-4 text-center text-[11px] leading-5 text-on-surface-variant">
        Accepted: .CSV, .XLSX, .XLS · Maximum 8 MB. Your file is only used for
        this import preview.
      </p>
    </section>
  );
}
