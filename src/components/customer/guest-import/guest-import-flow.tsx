"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  ConfirmImportStep,
  ProcessingImport,
  type ImportCounts,
} from "@/components/customer/guest-import/confirm-import-step";
import { DuplicateStep } from "@/components/customer/guest-import/duplicate-step";
import { ImportHeader } from "@/components/customer/guest-import/import-header";
import { ImportResult } from "@/components/customer/guest-import/import-result";
import { ImportStepper } from "@/components/customer/guest-import/import-stepper";
import { ReviewStep } from "@/components/customer/guest-import/review-step";
import {
  UploadStep,
  type SelectedImportFile,
} from "@/components/customer/guest-import/upload-step";
import type {
  GuestImportData,
  GuestImportDuplicateDecision,
  GuestImportRow,
} from "@/types";

function downloadTextFile(name: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function assessRow(
  row: GuestImportRow,
): Pick<GuestImportRow, "status" | "message"> {
  if (row.status === "possible_duplicate")
    return { status: row.status, message: row.message };
  if (!row.name.trim())
    return {
      status: "missing_name",
      message: "Add a guest name before importing",
    };
  if (!Number.isFinite(row.maxPax) || row.maxPax < 1 || row.maxPax > 10)
    return {
      status: "invalid_pax",
      message: "Max pax must be between 1 and 10",
    };
  const phoneDigits = row.phone.replace(/\D/g, "");
  if (row.phone.trim() && phoneDigits.length < 9)
    return {
      status: "invalid_phone",
      message: "Enter a valid phone number or leave it blank",
    };
  return { status: "valid", message: "Ready to import" };
}

export function GuestImportFlow({
  initialData,
}: {
  initialData: GuestImportData;
}) {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<SelectedImportFile | null>(
    null,
  );
  const [rows, setRows] = useState(() =>
    initialData.preview.rows.map((row) => ({ ...row })),
  );
  const [duplicates, setDuplicates] = useState(() =>
    initialData.preview.duplicates.map((item) => ({
      ...item,
      existingGuest: { ...item.existingGuest },
    })),
  );
  const [skippedIds, setSkippedIds] = useState<Set<string>>(() => new Set());
  const [processing, setProcessing] = useState(false);
  const [finished, setFinished] = useState(false);
  const processingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flowStart = useRef<HTMLDivElement>(null);

  const sampleFile: SelectedImportFile = {
    name: initialData.preview.name,
    sizeLabel: initialData.preview.sizeLabel,
    rowCount: initialData.preview.rowCount,
  };

  useEffect(
    () => () => {
      if (processingTimer.current) clearTimeout(processingTimer.current);
    },
    [],
  );

  const counts = useMemo<ImportCounts>(() => {
    const duplicateRows = new Set(duplicates.map((item) => item.rowId));
    const added = rows.filter(
      (row) =>
        row.status === "valid" &&
        !duplicateRows.has(row.id) &&
        !skippedIds.has(row.id),
    ).length;
    const updated = duplicates.filter(
      (item) => !skippedIds.has(item.rowId) && item.decision === "update",
    ).length;
    const duplicateSkips = duplicates.filter(
      (item) => !skippedIds.has(item.rowId) && item.decision === "skip",
    ).length;
    return { added, updated, skipped: skippedIds.size + duplicateSkips };
  }, [duplicates, rows, skippedIds]);

  function changeRow(id: string, patch: Partial<GuestImportRow>) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        const changed = { ...row, ...patch };
        return { ...changed, ...assessRow(changed) };
      }),
    );
  }

  function toggleSkip(id: string) {
    setSkippedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function decideDuplicate(
    id: string,
    decision: Exclude<GuestImportDuplicateDecision, null>,
  ) {
    setDuplicates((current) =>
      current.map((item) => (item.id === id ? { ...item, decision } : item)),
    );
  }

  function setAllDuplicates(
    decision: Exclude<GuestImportDuplicateDecision, null>,
  ) {
    setDuplicates((current) =>
      current.map((item) =>
        skippedIds.has(item.rowId) ? item : { ...item, decision },
      ),
    );
  }

  function goToStep(nextStep: number) {
    setStep(nextStep);
    window.requestAnimationFrame(() =>
      flowStart.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function startImport() {
    goToStep(5);
    setProcessing(true);
    processingTimer.current = setTimeout(() => {
      setProcessing(false);
      setFinished(true);
    }, 1300);
  }

  function restart() {
    if (processingTimer.current) clearTimeout(processingTimer.current);
    setRows(initialData.preview.rows.map((row) => ({ ...row })));
    setDuplicates(
      initialData.preview.duplicates.map((item) => ({
        ...item,
        existingGuest: { ...item.existingGuest },
        decision: null,
      })),
    );
    setSkippedIds(new Set());
    setSelectedFile(null);
    setProcessing(false);
    setFinished(false);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function downloadTemplate() {
    downloadTextFile(
      "moment-kita-guest-import-template.csv",
      "Guest Name,Phone,Guest Group,Max Pax\nNadia Permata,+6281244901182,Close Friends,2\n",
    );
  }

  function downloadErrors() {
    const skippedRows = rows.filter((row) => skippedIds.has(row.id));
    const duplicateSkippedRows = duplicates
      .filter((item) => item.decision === "skip")
      .map((item) => rows.find((row) => row.id === item.rowId))
      .filter((row): row is GuestImportRow => Boolean(row));
    const uniqueRows = Array.from(
      new Map(
        [...skippedRows, ...duplicateSkippedRows].map((row) => [row.id, row]),
      ).values(),
    );
    const lines = [
      "Row,Guest Name,Issue",
      ...uniqueRows.map(
        (row) =>
          `${row.rowNumber},\"${row.name.replaceAll('"', '""')}\",\"${row.message.replaceAll('"', '""')}\"`,
      ),
    ];
    downloadTextFile("moment-kita-import-notes.csv", lines.join("\n"));
  }

  function chooseFile(file: SelectedImportFile | null) {
    setSelectedFile(file);
    if (!file) {
      setRows(initialData.preview.rows.map((row) => ({ ...row })));
      setSkippedIds(new Set());
    }
  }

  return (
    <div className="min-h-full bg-surface pb-16 text-on-surface">
      <ImportHeader
        invitation={initialData.invitation}
        onDownloadTemplate={downloadTemplate}
      />
      <main className="mx-auto w-full max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-8">
        <div ref={flowStart} className="scroll-mt-20">
          <ImportStepper activeStep={step} />
        </div>
        <div className="mt-6">
          {step === 1 && (
            <UploadStep
              selectedFile={selectedFile}
              sampleFile={sampleFile}
              onSelect={chooseFile}
              onContinue={() => goToStep(2)}
            />
          )}
          {step === 2 && (
            <ReviewStep
              rows={rows}
              skippedIds={skippedIds}
              groups={initialData.groups}
              onChangeRow={changeRow}
              onToggleSkip={toggleSkip}
              onBack={() => goToStep(1)}
              onContinue={() => goToStep(3)}
            />
          )}
          {step === 3 && (
            <DuplicateStep
              rows={rows}
              duplicates={duplicates}
              skippedIds={skippedIds}
              onDecision={decideDuplicate}
              onSetAll={setAllDuplicates}
              onBack={() => goToStep(2)}
              onContinue={() => goToStep(4)}
            />
          )}
          {step === 4 && selectedFile && (
            <ConfirmImportStep
              counts={counts}
              fileName={selectedFile.name}
              onBack={() => goToStep(3)}
              onImport={startImport}
            />
          )}
          {step === 5 && processing && (
            <ProcessingImport invitationId={initialData.invitation.id} />
          )}
          {step === 5 && finished && (
            <ImportResult
              invitationId={initialData.invitation.id}
              counts={counts}
              onReviewSkipped={() => {
                setStep(2);
                setFinished(false);
                window.requestAnimationFrame(() =>
                  flowStart.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  }),
                );
              }}
              onDownloadErrors={downloadErrors}
              onRestart={restart}
            />
          )}
        </div>
      </main>
    </div>
  );
}
