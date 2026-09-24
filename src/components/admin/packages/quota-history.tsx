"use client";

import { ChevronDown, History, RotateCcw, SearchX } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { quotaDateTimeFormat } from "@/components/admin/packages/packages-quota-formatters";
import type { AdminQuotaLedgerEntry, AdminQuotaSource } from "@/types";

type SourceFilter = "all" | AdminQuotaSource;

const selectClass =
  "h-10 w-full cursor-pointer appearance-none border border-transparent bg-surface-low py-1.5 pr-8 pl-3 text-[11px] outline-none transition-colors focus:border-secondary";

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-w-0">
      {children}
      <ChevronDown
        aria-hidden
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
}

const sources: AdminQuotaSource[] = [
  "Package purchase",
  "Additional quota purchase",
  "Invitation",
  "Admin adjustment",
];

export function QuotaHistory({ entries }: { entries: AdminQuotaLedgerEntry[] }) {
  const [source, setSource] = useState<SourceFilter>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const visible = useMemo(
    () =>
      entries.filter((entry) => {
        const day = entry.createdAt.slice(0, 10);
        const matchesSource = source === "all" || entry.source === source;
        const matchesFrom = !dateFrom || day >= dateFrom;
        const matchesTo = !dateTo || day <= dateTo;
        return matchesSource && matchesFrom && matchesTo;
      }),
    [dateFrom, dateTo, entries, source],
  );

  function resetFilters() {
    setSource("all");
    setDateFrom("");
    setDateTo("");
  }

  return (
    <section className="space-y-4">
      <div className="border-b border-border pb-3">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          History
        </p>
        <h2 className="mt-1 font-serif text-[22px]">Recent quota activity</h2>
        <p className="mt-1 text-[10px] leading-5 text-on-surface-variant">
          Append-only evidence. Current quota remains authoritative on each
          customer — this list never competes with it.
        </p>
      </div>

      <div className="grid gap-2 border border-border bg-surface-lowest p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
        <SelectShell>
          <label htmlFor="quota-history-source" className="sr-only">
            Source
          </label>
          <select
            id="quota-history-source"
            value={source}
            onChange={(event) => setSource(event.target.value as SourceFilter)}
            className={selectClass}
          >
            <option value="all">Source: All</option>
            {sources.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </SelectShell>
        <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
          From
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
          />
        </label>
        <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
          To
          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
          />
        </label>
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex h-10 items-center justify-center gap-2 px-4 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container hover:text-primary"
        >
          <RotateCcw aria-hidden size={14} /> Reset
        </button>
      </div>

      {visible.length === 0 ? (
        <div className="border border-border bg-surface-lowest px-6 py-12 text-center shadow-sm">
          <SearchX aria-hidden size={26} className="mx-auto text-on-surface-variant" />
          <p className="mt-3 text-[12px] text-on-surface-variant">
            No quota activity matches this filter.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border border border-border bg-surface-lowest shadow-sm">
          {visible.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 grid size-8 shrink-0 place-items-center text-[12px] font-bold ${
                    entry.delta >= 0
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {entry.delta >= 0 ? "+" : ""}
                  {entry.delta}
                </span>
                <div>
                  {entry.customer.id ? (
                    <Link
                      href={`/admin/customers/${entry.customer.id}`}
                      className="text-[12px] font-semibold hover:text-secondary"
                    >
                      {entry.customer.name}
                    </Link>
                  ) : (
                    <p className="text-[12px] font-semibold">{entry.customer.name}</p>
                  )}
                  <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                    {entry.reason}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[9px] text-on-surface-variant">
                    <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 uppercase tracking-[0.08em]">
                      <History aria-hidden size={10} /> {entry.source}
                    </span>
                    {entry.relatedTransactionId ? (
                      <Link
                        href={`/admin/transactions/${entry.relatedTransactionId}`}
                        prefetch={false}
                        className="text-secondary hover:underline"
                      >
                        View Transaction
                      </Link>
                    ) : null}
                    {entry.relatedInvitationId ? (
                      <Link
                        href={`/admin/invitations/${entry.relatedInvitationId}`}
                        prefetch={false}
                        className="text-secondary hover:underline"
                      >
                        View Invitation
                      </Link>
                    ) : null}
                    {entry.adminName ? <span>Admin: {entry.adminName}</span> : null}
                  </div>
                </div>
              </div>
              <span className="shrink-0 text-[9px] text-on-surface-variant">
                {quotaDateTimeFormat.format(new Date(entry.createdAt))}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
