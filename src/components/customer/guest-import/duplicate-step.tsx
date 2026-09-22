import { ArrowRight, CircleAlert, RefreshCw, SkipForward } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  GuestImportDuplicate,
  GuestImportDuplicateDecision,
  GuestImportRow,
} from "@/types";

function PersonSnapshot({
  label,
  name,
  phone,
  group,
  maxPax,
  muted = false,
}: {
  label: string;
  name: string;
  phone: string;
  group: string;
  maxPax: number;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-w-0 border border-border p-4",
        muted ? "bg-surface-low" : "bg-surface-lowest",
      )}
    >
      <p className="text-[9px] font-semibold tracking-[0.15em] text-on-surface-variant uppercase">
        {label}
      </p>
      <p className="mt-2 truncate font-serif text-xl">{name}</p>
      <dl className="mt-3 space-y-1 text-xs text-on-surface-variant">
        <div className="flex justify-between gap-3">
          <dt>Phone</dt>
          <dd className="truncate text-on-surface">
            {phone || "Not provided"}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Circle</dt>
          <dd className="truncate text-on-surface">{group}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Max pax</dt>
          <dd className="text-on-surface">{maxPax}</dd>
        </div>
      </dl>
    </div>
  );
}

export function DuplicateStep({
  rows,
  duplicates,
  skippedIds,
  onDecision,
  onSetAll,
  onBack,
  onContinue,
}: {
  rows: GuestImportRow[];
  duplicates: GuestImportDuplicate[];
  skippedIds: Set<string>;
  onDecision: (
    id: string,
    decision: Exclude<GuestImportDuplicateDecision, null>,
  ) => void;
  onSetAll: (decision: Exclude<GuestImportDuplicateDecision, null>) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const visible = duplicates.filter(
    (duplicate) => !skippedIds.has(duplicate.rowId),
  );
  const undecided = visible.filter((duplicate) => !duplicate.decision).length;

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-surface-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <div className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f2e8d5] text-[#795d27]">
            <CircleAlert aria-hidden size={19} />
          </span>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
              Duplicate Detection
            </p>
            <h2 className="mt-1 font-serif text-3xl">
              Choose what happens to every match
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
              Nothing is overwritten automatically. Compare the existing guest
              with the imported row, then skip it or update the directory.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onSetAll("skip")}
            className="min-h-10 border border-border px-4 text-[9px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-low"
          >
            Skip all
          </button>
          <button
            type="button"
            onClick={() => onSetAll("update")}
            className="min-h-10 border border-secondary px-4 text-[9px] font-semibold tracking-[0.1em] text-secondary uppercase hover:bg-terracotta-soft"
          >
            Update all
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface-lowest p-10 text-center shadow-sm">
          <h3 className="font-serif text-3xl">No duplicate decisions needed</h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            All possible duplicate rows were skipped during review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((duplicate, index) => {
            const imported = rows.find((row) => row.id === duplicate.rowId);
            if (!imported) return null;
            return (
              <article
                key={duplicate.id}
                className="rounded-xl border border-border bg-surface-lowest p-5 shadow-sm sm:p-6"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.14em] text-secondary uppercase">
                      Possible match {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      Matched by similar name or contact detail.
                    </p>
                  </div>
                  {duplicate.decision && (
                    <span className="rounded-full bg-terracotta-soft px-3 py-1 text-[9px] font-bold tracking-[0.1em] text-secondary uppercase">
                      Will {duplicate.decision}
                    </span>
                  )}
                </div>
                <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
                  <PersonSnapshot
                    label="Existing guest"
                    name={duplicate.existingGuest.name}
                    phone={duplicate.existingGuest.contact}
                    group={duplicate.existingGuest.group}
                    maxPax={duplicate.existingGuest.maxPax}
                    muted
                  />
                  <span className="grid size-8 place-items-center self-center justify-self-center rounded-full bg-surface-high text-on-surface-variant">
                    <ArrowRight
                      aria-hidden
                      size={15}
                      className="rotate-90 md:rotate-0"
                    />
                  </span>
                  <PersonSnapshot
                    label="Imported row"
                    name={imported.name}
                    phone={imported.phone}
                    group={imported.group}
                    maxPax={imported.maxPax}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                  <button
                    type="button"
                    onClick={() => onDecision(duplicate.id, "skip")}
                    className={cn(
                      "inline-flex min-h-11 items-center justify-center gap-2 border px-5 text-[10px] font-semibold tracking-[0.12em] uppercase",
                      duplicate.decision === "skip"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-surface-low",
                    )}
                  >
                    <SkipForward aria-hidden size={15} /> Skip
                  </button>
                  <button
                    type="button"
                    onClick={() => onDecision(duplicate.id, "update")}
                    className={cn(
                      "inline-flex min-h-11 items-center justify-center gap-2 border px-5 text-[10px] font-semibold tracking-[0.12em] uppercase",
                      duplicate.decision === "update"
                        ? "border-secondary bg-secondary text-secondary-foreground"
                        : "border-border hover:bg-terracotta-soft",
                    )}
                  >
                    <RefreshCw aria-hidden size={15} /> Update
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {undecided > 0 && (
        <p role="status" className="text-right text-xs text-on-surface-variant">
          Choose Skip or Update for {undecided} remaining match
          {undecided === 1 ? "" : "es"}.
        </p>
      )}
      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 border border-border bg-surface-lowest px-5 text-[10px] font-semibold tracking-[0.12em] uppercase hover:bg-surface-low"
        >
          Back to Review
        </button>
        <button
          type="button"
          disabled={undecided > 0}
          onClick={onContinue}
          className="min-h-11 bg-secondary px-7 text-[10px] font-semibold tracking-[0.14em] text-secondary-foreground uppercase shadow-md hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-45"
        >
          Review Import Summary
        </button>
      </div>
    </section>
  );
}
