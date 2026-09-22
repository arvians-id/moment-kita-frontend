import {
  BellRing,
  Check,
  FileCheck2,
  RefreshCw,
  ShieldCheck,
  SkipForward,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

export interface ImportCounts {
  added: number;
  updated: number;
  skipped: number;
}

export function ConfirmImportStep({
  counts,
  fileName,
  onBack,
  onImport,
}: {
  counts: ImportCounts;
  fileName: string;
  onBack: () => void;
  onImport: () => void;
}) {
  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-border bg-surface-lowest p-5 shadow-sm sm:p-8">
        <p className="text-[10px] font-semibold tracking-[0.17em] text-secondary uppercase">
          Final Confirmation
        </p>
        <h2 className="mt-2 max-w-2xl font-serif text-4xl leading-tight">
          Your guest list is ready to join the celebration.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant">
          Review the final outcome below. This is the first point where your
          guest directory will change.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {(
            [
              [
                UsersRound,
                counts.added,
                "Guests to add",
                "New invitation entries",
              ],
              [
                RefreshCw,
                counts.updated,
                "Guests to update",
                "Approved duplicate matches",
              ],
              [
                SkipForward,
                counts.skipped,
                "Rows to skip",
                "Kept outside your directory",
              ],
            ] as const
          ).map(([Icon, count, label, detail]) => (
            <div
              key={String(label)}
              className="border border-border bg-surface-low p-5"
            >
              <Icon aria-hidden size={20} className="text-secondary" />
              <p className="mt-4 font-serif text-4xl">
                {String(count).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-semibold">{String(label)}</p>
              <p className="mt-1 text-[11px] text-on-surface-variant">
                {String(detail)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 border-t border-border pt-6 md:grid-cols-3">
          <div className="flex gap-3">
            <FileCheck2
              aria-hidden
              size={18}
              className="shrink-0 text-secondary"
            />
            <div>
              <p className="text-xs font-semibold">Source file</p>
              <p className="mt-1 truncate text-xs text-on-surface-variant">
                {fileName}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <ShieldCheck
              aria-hidden
              size={18}
              className="shrink-0 text-secondary"
            />
            <div>
              <p className="text-xs font-semibold">Explicit decisions</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                No guest will be overwritten silently.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <BellRing
              aria-hidden
              size={18}
              className="shrink-0 text-secondary"
            />
            <div>
              <p className="text-xs font-semibold">Background-friendly</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                For larger lists, you may leave and we&apos;ll notify you when
                it finishes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 border border-border bg-surface-lowest px-5 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
        >
          Back to Duplicates
        </button>
        <button
          type="button"
          onClick={onImport}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-secondary px-8 text-[10px] font-semibold tracking-[0.14em] text-secondary-foreground uppercase shadow-md hover:bg-accent hover:text-accent-foreground"
        >
          <Check aria-hidden size={16} /> Import Guests
        </button>
      </div>
    </section>
  );
}

export function ProcessingImport({ invitationId }: { invitationId: string }) {
  return (
    <section className="rounded-xl border border-border bg-surface-lowest px-5 py-16 text-center shadow-sm sm:px-10">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-terracotta-soft text-secondary">
        <RefreshCw aria-hidden size={25} className="animate-spin" />
      </span>
      <p className="mt-6 text-[10px] font-semibold tracking-[0.17em] text-secondary uppercase">
        Import in progress
      </p>
      <h2 className="mt-2 font-serif text-4xl">
        Preparing your guest directory
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
        We&apos;re applying your corrections and duplicate choices. Larger files
        can continue safely in the background—you may leave this page and return
        to your guest list.
      </p>
      <Link
        href={`/app/invitations/${invitationId}/guests`}
        className="mt-6 inline-flex min-h-10 items-center border border-border px-4 text-[9px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
      >
        Return to Guest List
      </Link>
    </section>
  );
}
