import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  PencilLine,
  SkipForward,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { GuestImportRow, GuestImportRowStatus } from "@/types";

const statusMeta: Record<
  GuestImportRowStatus,
  { label: string; className: string }
> = {
  valid: { label: "Valid", className: "bg-[#e4eee7] text-[#315f45]" },
  missing_name: {
    label: "Missing Name",
    className: "bg-error-container text-on-error-container",
  },
  invalid_pax: {
    label: "Invalid Pax",
    className: "bg-error-container text-on-error-container",
  },
  invalid_phone: {
    label: "Invalid Phone",
    className: "bg-error-container text-on-error-container",
  },
  possible_duplicate: {
    label: "Possible Duplicate",
    className: "bg-[#f2e8d5] text-[#795d27]",
  },
};

function StatusBadge({ status }: { status: GuestImportRowStatus }) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.1em] uppercase",
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}

function RowEditor({
  row,
  skipped,
  groups,
  onChange,
  onToggleSkip,
}: {
  row: GuestImportRow;
  skipped: boolean;
  groups: string[];
  onChange: (patch: Partial<GuestImportRow>) => void;
  onToggleSkip: () => void;
}) {
  const editable = row.status !== "possible_duplicate";
  return (
    <>
      <label className="block">
        <span className="sr-only">Guest name</span>
        <input
          value={row.name}
          disabled={!editable || skipped}
          onChange={(event) => onChange({ name: event.target.value })}
          placeholder="Guest name"
          className="h-10 w-full border border-border bg-surface-lowest px-3 text-sm outline-none transition focus:border-secondary disabled:opacity-55"
        />
      </label>
      <label className="block">
        <span className="sr-only">Phone number</span>
        <input
          type="tel"
          value={row.phone}
          disabled={!editable || skipped}
          onChange={(event) => onChange({ phone: event.target.value })}
          placeholder="Phone (optional)"
          className="h-10 w-full border border-border bg-surface-lowest px-3 text-sm outline-none transition focus:border-secondary disabled:opacity-55"
        />
      </label>
      <label className="block">
        <span className="sr-only">Guest group</span>
        <select
          value={row.group}
          disabled={!editable || skipped}
          onChange={(event) => onChange({ group: event.target.value })}
          className="h-10 w-full border border-border bg-surface-lowest px-3 text-sm outline-none transition focus:border-secondary disabled:opacity-55"
        >
          {Array.from(new Set([...groups, row.group])).map((group) => (
            <option key={group}>{group}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="sr-only">Maximum pax</span>
        <input
          type="number"
          min={1}
          max={10}
          value={row.maxPax}
          disabled={!editable || skipped}
          onChange={(event) => onChange({ maxPax: Number(event.target.value) })}
          className="h-10 w-full border border-border bg-surface-lowest px-3 text-sm outline-none transition focus:border-secondary disabled:opacity-55"
        />
      </label>
      <button
        type="button"
        onClick={onToggleSkip}
        className={cn(
          "inline-flex min-h-10 items-center justify-center gap-2 border px-3 text-[9px] font-semibold tracking-[0.1em] uppercase",
          skipped
            ? "border-secondary bg-terracotta-soft text-secondary"
            : "border-border hover:bg-surface-low",
        )}
      >
        <SkipForward aria-hidden size={14} />
        {skipped ? "Restore" : "Skip Row"}
      </button>
    </>
  );
}

export function ReviewStep({
  rows,
  skippedIds,
  groups,
  onChangeRow,
  onToggleSkip,
  onBack,
  onContinue,
}: {
  rows: GuestImportRow[];
  skippedIds: Set<string>;
  groups: string[];
  onChangeRow: (id: string, patch: Partial<GuestImportRow>) => void;
  onToggleSkip: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const valid = rows.filter(
    (row) => row.status === "valid" && !skippedIds.has(row.id),
  ).length;
  const duplicates = rows.filter(
    (row) => row.status === "possible_duplicate" && !skippedIds.has(row.id),
  ).length;
  const unresolved = rows.filter(
    (row) =>
      !["valid", "possible_duplicate"].includes(row.status) &&
      !skippedIds.has(row.id),
  );
  const canContinue = unresolved.length === 0;

  return (
    <section className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {(
          [
            [CheckCircle2, valid, "Valid rows", "text-[#427153]"],
            [AlertTriangle, unresolved.length, "Needs review", "text-error"],
            [Copy, duplicates, "Possible duplicates", "text-[#92702d]"],
          ] as const
        ).map(([Icon, count, label, color]) => (
          <div
            key={String(label)}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface-lowest p-5 shadow-sm"
          >
            <Icon aria-hidden size={21} className={String(color)} />
            <div>
              <p className="font-serif text-3xl">{String(count)}</p>
              <p className="text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                {String(label)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {unresolved.length > 0 && (
        <div className="flex gap-3 border-l-4 border-error bg-error-container px-4 py-4 text-sm text-on-error-container">
          <PencilLine aria-hidden size={19} className="mt-0.5 shrink-0" />
          <p>
            <strong>
              {unresolved.length} row{unresolved.length === 1 ? "" : "s"} need
              attention.
            </strong>{" "}
            Correct the highlighted fields or skip those rows before continuing.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-surface-lowest shadow-sm">
        <div className="border-b border-border px-5 py-5 sm:px-6">
          <p className="text-[10px] font-semibold tracking-[0.17em] text-secondary uppercase">
            Review &amp; Validate
          </p>
          <h2 className="mt-1 font-serif text-3xl">
            A thoughtful check before import
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Simple corrections can be made here. Duplicate choices come next.
          </p>
        </div>

        <div className="hidden xl:block">
          <div className="grid grid-cols-[48px_1.35fr_1.1fr_1fr_80px_110px] gap-3 bg-surface-low px-5 py-3 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            <span>Row</span>
            <span>Name</span>
            <span>Phone</span>
            <span>Group</span>
            <span>Pax</span>
            <span>Action</span>
          </div>
          <div className="divide-y divide-border">
            {rows.map((row) => {
              const skipped = skippedIds.has(row.id);
              return (
                <div
                  key={row.id}
                  className={cn(
                    "grid grid-cols-[48px_1.35fr_1.1fr_1fr_80px_110px] items-center gap-3 px-5 py-4",
                    skipped && "bg-surface-low opacity-65",
                  )}
                >
                  <span className="font-serif text-lg text-on-surface-variant">
                    {String(row.rowNumber).padStart(2, "0")}
                  </span>
                  <RowEditor
                    row={row}
                    skipped={skipped}
                    groups={groups}
                    onChange={(patch) => onChangeRow(row.id, patch)}
                    onToggleSkip={() => onToggleSkip(row.id)}
                  />
                  <div className="col-start-2 col-span-4 -mt-2 flex items-center gap-2">
                    <StatusBadge status={row.status} />
                    <span className="text-[10px] text-on-surface-variant">
                      {skipped ? "This row will not be imported" : row.message}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="divide-y divide-border xl:hidden">
          {rows.map((row) => {
            const skipped = skippedIds.has(row.id);
            return (
              <article
                key={row.id}
                className={cn("p-5", skipped && "bg-surface-low opacity-65")}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-serif text-xl">
                    Row {row.rowNumber}
                  </span>
                  <StatusBadge status={row.status} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <RowEditor
                    row={row}
                    skipped={skipped}
                    groups={groups}
                    onChange={(patch) => onChangeRow(row.id, patch)}
                    onToggleSkip={() => onToggleSkip(row.id)}
                  />
                </div>
                <p className="mt-3 text-xs text-on-surface-variant">
                  {skipped ? "This row will not be imported" : row.message}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 border border-border bg-surface-lowest px-5 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
        >
          Back to Upload
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="min-h-11 bg-secondary px-7 text-[10px] font-semibold tracking-[0.14em] text-secondary-foreground uppercase shadow-md hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-45"
        >
          Continue to Duplicates
        </button>
      </div>
    </section>
  );
}
