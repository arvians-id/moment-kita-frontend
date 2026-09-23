"use client";

import { ChevronDown, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import { TransactionCardList } from "@/components/customer/transactions/transaction-card-list";
import { TransactionDetailDrawer } from "@/components/customer/transactions/transaction-detail-drawer";
import { TransactionTable } from "@/components/customer/transactions/transaction-table";
import type { TransactionCounts } from "@/services/customer/transaction-service";
import type {
  CustomerTransactionWithInvitation,
  TransactionPurpose,
  TransactionStatus,
} from "@/types";

type StatusFilter = "all" | TransactionStatus;
type TypeFilter = "all" | TransactionPurpose;

const statusFilters: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All Records" },
  { id: "paid", label: "Paid" },
  { id: "pending", label: "Pending Review" },
  { id: "cancelled", label: "Cancelled" },
  { id: "refunded", label: "Refunded" },
];

const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All Types (Packages, Extensions)" },
  { id: "package", label: "Suite Packages" },
  { id: "quotaAddon", label: "Add-on Quotas" },
  { id: "extension", label: "Extensions" },
];

export function TransactionLedger({
  transactions,
  counts,
}: {
  transactions: CustomerTransactionWithInvitation[];
  counts: TransactionCounts;
}) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] =
    useState<CustomerTransactionWithInvitation | null>(null);

  const years = useMemo(
    () =>
      Array.from(
        new Set(
          transactions.map((item) =>
            String(new Date(item.createdAt).getFullYear()),
          ),
        ),
      ).sort((a, b) => Number(b) - Number(a)),
    [transactions],
  );

  const term = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      transactions.filter((item) => {
        const matchesStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchesType = typeFilter === "all" || item.purpose === typeFilter;
        const matchesYear =
          yearFilter === "all" ||
          String(new Date(item.createdAt).getFullYear()) === yearFilter;
        const matchesQuery =
          term === "" ||
          `${item.reference} ${item.productName} ${item.description} ${item.relatedInvitation?.coupleLabel ?? ""} ${item.relatedInvitation?.slug ?? ""}`
            .toLowerCase()
            .includes(term);
        return matchesStatus && matchesType && matchesYear && matchesQuery;
      }),
    [statusFilter, typeFilter, yearFilter, term, transactions],
  );

  function reset() {
    setStatusFilter("all");
    setTypeFilter("all");
    setYearFilter("all");
    setQuery("");
  }

  return (
    <>
      <section className="bg-surface-lowest p-4 shadow-sm">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div
            role="group"
            aria-label="Filter transactions by status"
            className="flex flex-wrap items-center gap-1"
          >
            {statusFilters.map((filter) => {
              const active = statusFilter === filter.id;
              const count = counts[filter.id];
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStatusFilter(filter.id)}
                  className={`shrink-0 px-3 py-1.5 text-[11px] font-semibold tracking-[0.11em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {filter.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-72">
              <Search
                aria-hidden
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
              />
              <label htmlFor="transaction-search" className="sr-only">
                Search transactions
              </label>
              <input
                id="transaction-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ref, purpose, or slug..."
                className="h-10 w-full border border-surface-highest bg-surface-low pr-3 pl-9 text-[13px] outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-secondary"
              />
            </div>

            <div className="relative shrink-0">
              <label htmlFor="transaction-type" className="sr-only">
                Filter by transaction type
              </label>
              <select
                id="transaction-type"
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value as TypeFilter)
                }
                className="h-10 cursor-pointer appearance-none border border-surface-highest bg-surface-low py-1.5 pr-8 pl-3 text-[12px] outline-none focus:border-secondary"
              >
                {typeFilters.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                size={15}
                className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-on-surface-variant"
              />
            </div>

            <div className="relative shrink-0">
              <label htmlFor="transaction-year" className="sr-only">
                Filter by year
              </label>
              <select
                id="transaction-year"
                value={yearFilter}
                onChange={(event) => setYearFilter(event.target.value)}
                className="h-10 cursor-pointer appearance-none border border-surface-highest bg-surface-low py-1.5 pr-8 pl-3 text-[12px] outline-none focus:border-secondary"
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                size={15}
                className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-on-surface-variant"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5">
        {visible.length > 0 ? (
          <>
            <TransactionTable
              transactions={visible}
              onView={setSelected}
              selectedId={selected?.id ?? null}
            />
            <TransactionCardList transactions={visible} onView={setSelected} />
          </>
        ) : (
          <div className="bg-surface-lowest px-6 py-14 text-center shadow-sm">
            <SearchX
              aria-hidden
              size={30}
              className="mx-auto text-on-surface-variant"
            />
            <h2 className="mt-3 font-serif text-[22px]">
              No transactions match this view
            </h2>
            <p className="mx-auto mt-1 max-w-sm text-[12px] leading-5 text-on-surface-variant">
              Try another status, type, or search phrase.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 min-h-10 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {selected ? (
        <TransactionDetailDrawer
          transaction={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}
