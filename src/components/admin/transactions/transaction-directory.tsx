"use client";

import { CheckCircle2, ChevronDown, RotateCcw, Search, SearchX, X } from "lucide-react";
import { useMemo, useState } from "react";

import { CancelTransactionDialog } from "@/components/admin/transactions/cancel-transaction-dialog";
import { ConfirmPaymentDialog } from "@/components/admin/transactions/confirm-payment-dialog";
import { purposeLabel } from "@/components/admin/transactions/transaction-list-utils";
import { TransactionCardList } from "@/components/admin/transactions/transaction-card-list";
import type { TransactionRowAction } from "@/components/admin/transactions/transaction-row-actions";
import { TransactionTable } from "@/components/admin/transactions/transaction-table";
import type {
  AdminTransactionListItem,
  AdminTransactionPurpose,
  TransactionStatus,
} from "@/types";

type PurposeFilter = "all" | AdminTransactionPurpose;
type StatusFilter = "all" | TransactionStatus;
type AmountFilter = "all" | "under_1m" | "1m_5m" | "5m_20m" | "over_20m";

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

function matchesAmount(amount: number, filter: AmountFilter): boolean {
  switch (filter) {
    case "under_1m":
      return amount < 1_000_000;
    case "1m_5m":
      return amount >= 1_000_000 && amount < 5_000_000;
    case "5m_20m":
      return amount >= 5_000_000 && amount < 20_000_000;
    case "over_20m":
      return amount >= 20_000_000;
    default:
      return true;
  }
}

export function TransactionDirectory({
  transactions: initialTransactions,
}: {
  transactions: AdminTransactionListItem[];
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [query, setQuery] = useState("");
  const [purposeFilter, setPurposeFilter] = useState<PurposeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [amountFilter, setAmountFilter] = useState<AmountFilter>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    transaction: AdminTransactionListItem;
    action: TransactionRowAction;
  } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const term = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      transactions.filter((transaction) => {
        const createdDay = transaction.createdAt.slice(0, 10);
        const matchesPurpose =
          purposeFilter === "all" || transaction.purpose === purposeFilter;
        const matchesStatus =
          statusFilter === "all" || transaction.status === statusFilter;
        const matchesAmountRange = matchesAmount(transaction.amount, amountFilter);
        const matchesFrom = !dateFrom || createdDay >= dateFrom;
        const matchesTo = !dateTo || createdDay <= dateTo;
        const matchesQuery =
          term === "" ||
          `${transaction.reference} ${transaction.customer.name} ${transaction.productName}`
            .toLowerCase()
            .includes(term);

        return (
          matchesPurpose &&
          matchesStatus &&
          matchesAmountRange &&
          matchesFrom &&
          matchesTo &&
          matchesQuery
        );
      }),
    [amountFilter, dateFrom, dateTo, purposeFilter, statusFilter, term, transactions],
  );

  function resetFilters() {
    setQuery("");
    setPurposeFilter("all");
    setStatusFilter("all");
    setAmountFilter("all");
    setDateFrom("");
    setDateTo("");
    setOpenActionId(null);
  }

  function openAction(
    transaction: AdminTransactionListItem,
    action: TransactionRowAction,
  ) {
    setOpenActionId(null);
    setPendingAction({ transaction, action });
  }

  function applyConfirm(note: string) {
    if (!pendingAction) return;
    const { transaction } = pendingAction;
    const confirmedAt = new Date().toISOString();

    setTransactions((current) =>
      current.map((item) =>
        item.id === transaction.id
          ? {
              ...item,
              status: "paid" as const,
              paidAt: confirmedAt,
              notes: note || item.notes,
            }
          : item,
      ),
    );
    setNotice(
      `${transaction.reference} confirmed as paid for ${transaction.customer.name}. Its commercial effect is applied once.`,
    );
    setPendingAction(null);
  }

  function applyCancel(reason: string) {
    if (!pendingAction) return;
    const { transaction } = pendingAction;
    const wasPaid = transaction.status === "paid";

    setTransactions((current) =>
      current.map((item) =>
        item.id === transaction.id
          ? { ...item, status: "cancelled" as const, notes: reason }
          : item,
      ),
    );
    setNotice(
      wasPaid
        ? `${transaction.reference} was cancelled. Its settled payment and granted commercial effect were not reversed.`
        : `${transaction.reference} was cancelled. No commercial effect was applied.`,
    );
    setPendingAction(null);
  }

  return (
    <section className="space-y-5">
      {notice ? (
        <div
          role="status"
          className="flex items-center justify-between gap-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[11px] text-emerald-950"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 aria-hidden size={15} /> {notice}
          </span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="grid size-7 shrink-0 place-items-center hover:bg-emerald-100"
          >
            <X aria-hidden size={14} />
          </button>
        </div>
      ) : null}

      <div className="space-y-4 border border-border bg-surface-lowest p-4 shadow-sm sm:p-5">
        <div className="grid gap-2 lg:grid-cols-12">
          <div className="relative h-10 lg:col-span-4">
            <Search
              aria-hidden
              size={15}
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
              placeholder="Search reference, customer, or product..."
              className="h-10 w-full border border-transparent bg-surface-low pr-3 pl-9 text-[12px] outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-secondary"
            />
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-2 lg:col-span-8 lg:grid-cols-4">
            <SelectShell>
              <label htmlFor="transaction-purpose-filter" className="sr-only">
                Transaction type
              </label>
              <select
                id="transaction-purpose-filter"
                value={purposeFilter}
                onChange={(event) =>
                  setPurposeFilter(event.target.value as PurposeFilter)
                }
                className={selectClass}
              >
                <option value="all">Type: All</option>
                <option value="package">{purposeLabel.package}</option>
                <option value="quotaAddon">{purposeLabel.quotaAddon}</option>
                <option value="extension">{purposeLabel.extension}</option>
                <option value="printed">{purposeLabel.printed}</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="transaction-status-filter" className="sr-only">
                Status
              </label>
              <select
                id="transaction-status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
                className={selectClass}
              >
                <option value="all">Status: All</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="transaction-amount-filter" className="sr-only">
                Amount range
              </label>
              <select
                id="transaction-amount-filter"
                value={amountFilter}
                onChange={(event) =>
                  setAmountFilter(event.target.value as AmountFilter)
                }
                className={selectClass}
              >
                <option value="all">Amount: All</option>
                <option value="under_1m">Under Rp 1jt</option>
                <option value="1m_5m">Rp 1jt – 5jt</option>
                <option value="5m_20m">Rp 5jt – 20jt</option>
                <option value="over_20m">Over Rp 20jt</option>
              </select>
            </SelectShell>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-10 items-center justify-center gap-2 px-4 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container hover:text-primary"
            >
              <RotateCcw aria-hidden size={14} /> Clear Filters
            </button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            Created from
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
            />
          </label>
          <label className="flex min-w-0 items-center gap-2 bg-surface-low px-3 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
            Created to
            <input
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              className="h-10 min-w-0 flex-1 bg-transparent text-[10px] tracking-normal text-on-surface outline-none"
            />
          </label>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <TransactionTable
            transactions={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
            onAction={openAction}
          />
          <TransactionCardList
            transactions={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
            onAction={openAction}
          />
          <div className="flex flex-col gap-2 border border-border bg-surface-low px-4 py-3 text-[11px] text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <strong className="text-primary">{visible.length}</strong> of{" "}
              <strong className="text-primary">{transactions.length}</strong>{" "}
              transactions
            </p>
            <p className="text-[9px] font-semibold tracking-[0.1em] uppercase">
              Mock service · Page 1
            </p>
          </div>
        </>
      ) : (
        <div className="border border-border bg-surface-lowest px-6 py-14 text-center shadow-sm">
          <SearchX aria-hidden size={30} className="mx-auto text-on-surface-variant" />
          <h2 className="mt-3 font-serif text-[22px]">No transactions match this view</h2>
          <p className="mx-auto mt-1 max-w-sm text-[12px] leading-5 text-on-surface-variant">
            Try another type, status, amount, or date filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 min-h-10 bg-primary px-5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase"
          >
            Reset Filters
          </button>
        </div>
      )}

      {pendingAction?.action === "confirm" ? (
        <ConfirmPaymentDialog
          transaction={pendingAction.transaction}
          onClose={() => setPendingAction(null)}
          onConfirm={applyConfirm}
        />
      ) : null}
      {pendingAction?.action === "cancel" ? (
        <CancelTransactionDialog
          transaction={pendingAction.transaction}
          onClose={() => setPendingAction(null)}
          onConfirm={applyCancel}
        />
      ) : null}
    </section>
  );
}
