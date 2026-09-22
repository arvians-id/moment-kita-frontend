import {
  AlertCircle,
  CheckCircle2,
  Download,
  RotateCcw,
  SkipForward,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

import type { ImportCounts } from "@/components/customer/guest-import/confirm-import-step";

export function ImportResult({
  invitationId,
  counts,
  onReviewSkipped,
  onDownloadErrors,
  onRestart,
}: {
  invitationId: string;
  counts: ImportCounts;
  onReviewSkipped: () => void;
  onDownloadErrors: () => void;
  onRestart: () => void;
}) {
  const partial = counts.skipped > 0;
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface-lowest shadow-sm">
      <div className="bg-surface-low px-5 py-12 text-center sm:px-8">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#e4eee7] text-[#315f45]">
          {partial ? (
            <AlertCircle aria-hidden size={27} />
          ) : (
            <CheckCircle2 aria-hidden size={27} />
          )}
        </span>
        <p className="mt-6 text-[10px] font-semibold tracking-[0.17em] text-secondary uppercase">
          {partial ? "Import completed with notes" : "Import complete"}
        </p>
        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">
          {partial
            ? "Your guest list is almost perfect."
            : "Your guests are ready."}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
          {partial
            ? "Valid rows were added successfully. Skipped rows remain available to review or download as a friendly error report."
            : "Every reviewed row has been added to your guest directory."}
        </p>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-3">
        {(
          [
            [UsersRound, counts.added, "Added"],
            [CheckCircle2, counts.updated, "Updated"],
            [SkipForward, counts.skipped, "Skipped"],
          ] as const
        ).map(([Icon, count, label]) => (
          <div
            key={String(label)}
            className="bg-surface-lowest p-6 text-center"
          >
            <Icon aria-hidden size={20} className="mx-auto text-secondary" />
            <p className="mt-3 font-serif text-4xl">
              {String(count).padStart(2, "0")}
            </p>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
              {String(label)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:flex-wrap sm:justify-center sm:p-8">
        <Link
          href={`/app/invitations/${invitationId}/guests`}
          className="inline-flex min-h-11 items-center justify-center bg-secondary px-6 text-[10px] font-semibold tracking-[0.13em] text-secondary-foreground uppercase hover:bg-accent hover:text-accent-foreground"
        >
          View Guest List
        </Link>
        {partial && (
          <button
            type="button"
            onClick={onReviewSkipped}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-border px-5 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
          >
            <AlertCircle aria-hidden size={15} /> Review Skipped Rows
          </button>
        )}
        {partial && (
          <button
            type="button"
            onClick={onDownloadErrors}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-border px-5 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
          >
            <Download aria-hidden size={15} /> Download Error Report
          </button>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-border px-5 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
        >
          <RotateCcw aria-hidden size={15} /> Import Another File
        </button>
      </div>
    </section>
  );
}
