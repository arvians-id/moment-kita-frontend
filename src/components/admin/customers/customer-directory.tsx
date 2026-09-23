"use client";

import { ChevronDown, RotateCcw, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import { CustomerCardList } from "@/components/admin/customers/customer-card-list";
import { CustomerTable } from "@/components/admin/customers/customer-table";
import type {
  AdminCustomer,
  AdminCustomerAccountType,
  AdminCustomerPaymentStatus,
  AdminCustomerSummary,
} from "@/types";

type Segment = "all" | AdminCustomerAccountType | "action";
type AccountFilter = "all" | AdminCustomerAccountType;
type PaymentFilter = "all" | AdminCustomerPaymentStatus;
type QuotaFilter = "all" | "available" | "low" | "depleted";
type JoinedFilter = "all" | "30" | "90" | "year";

const selectClass =
  "h-10 w-full cursor-pointer appearance-none border border-transparent bg-surface-low py-1.5 pr-8 pl-3 text-[11px] outline-none transition-colors focus:border-secondary sm:w-auto";

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-w-0 sm:flex-none">
      {children}
      <ChevronDown
        aria-hidden
        size={14}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
}

export function CustomerDirectory({
  customers,
  summary,
}: {
  customers: AdminCustomer[];
  summary: AdminCustomerSummary;
}) {
  const [segment, setSegment] = useState<Segment>("all");
  const [query, setQuery] = useState("");
  const [accountFilter, setAccountFilter] = useState<AccountFilter>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");
  const [quotaFilter, setQuotaFilter] = useState<QuotaFilter>("all");
  const [joinedFilter, setJoinedFilter] = useState<JoinedFilter>("all");
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const actionCount = customers.filter(
    (customer) => customer.status !== "active",
  ).length;
  const term = query.trim().toLowerCase();

  const visible = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    const ninetyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    ninetyDaysAgo.setDate(now.getDate() - 90);

    return customers.filter((customer) => {
      const joined = new Date(customer.joinedAt);
      const matchesSegment =
        segment === "all" ||
        (segment === "action"
          ? customer.status !== "active"
          : customer.accountType === segment);
      const matchesAccount =
        accountFilter === "all" || customer.accountType === accountFilter;
      const matchesPayment =
        paymentFilter === "all" || customer.paymentStatus === paymentFilter;
      const matchesQuota =
        quotaFilter === "all" ||
        (quotaFilter === "available" && customer.quotaRemaining > 1) ||
        (quotaFilter === "low" && customer.quotaRemaining === 1) ||
        (quotaFilter === "depleted" && customer.quotaRemaining === 0);
      const matchesJoined =
        joinedFilter === "all" ||
        (joinedFilter === "30" && joined >= thirtyDaysAgo) ||
        (joinedFilter === "90" && joined >= ninetyDaysAgo) ||
        (joinedFilter === "year" && joined.getFullYear() === now.getFullYear());
      const matchesQuery =
        term === "" ||
        `${customer.name} ${customer.email ?? ""} ${customer.whatsapp}`
          .toLowerCase()
          .includes(term);

      return (
        matchesSegment &&
        matchesAccount &&
        matchesPayment &&
        matchesQuota &&
        matchesJoined &&
        matchesQuery
      );
    });
  }, [
    accountFilter,
    customers,
    joinedFilter,
    paymentFilter,
    quotaFilter,
    segment,
    term,
  ]);

  function resetFilters() {
    setSegment("all");
    setQuery("");
    setAccountFilter("all");
    setPaymentFilter("all");
    setQuotaFilter("all");
    setJoinedFilter("all");
    setOpenActionId(null);
  }

  const segments: readonly { id: Segment; label: string; count: number }[] = [
    { id: "all", label: "All", count: summary.totalCustomers },
    {
      id: "registered",
      label: "Registered",
      count: summary.registeredAccounts,
    },
    { id: "managed", label: "Managed", count: summary.managedCustomers },
    { id: "action", label: "Action Required", count: actionCount },
  ];

  return (
    <section className="space-y-5">
      <div className="space-y-4 border border-border bg-surface-lowest p-4 shadow-sm">
        <div
          role="group"
          aria-label="Customer segments"
          className="flex flex-wrap items-center gap-1 bg-surface-low p-1"
        >
          {segments.map((item) => {
            const active = segment === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSegment(item.id)}
                className={`flex min-h-8 items-center gap-1.5 px-3 text-[9px] font-semibold tracking-[0.11em] uppercase transition-colors sm:text-[10px] ${
                  active
                    ? "bg-surface-lowest text-primary shadow-sm"
                    : item.id === "managed"
                      ? "text-secondary hover:bg-surface-container"
                      : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {item.id === "managed" ? (
                  <span className="size-1.5 rounded-full bg-secondary" />
                ) : null}
                {item.label}
                <span
                  className={
                    item.id === "action"
                      ? "bg-error-container px-1.5 text-on-error-container"
                      : "font-normal opacity-65"
                  }
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-2 lg:grid-cols-12">
          <div className="relative h-10 lg:col-span-5">
            <Search
              aria-hidden
              size={15}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
            />
            <label htmlFor="customer-search" className="sr-only">
              Search customers
            </label>
            <input
              id="customer-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, or WhatsApp..."
              className="h-10 w-full border border-transparent bg-surface-low pr-3 pl-9 text-[12px] outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-secondary"
            />
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:col-span-7 lg:justify-end">
            <SelectShell>
              <label htmlFor="customer-account-filter" className="sr-only">
                Account Type
              </label>
              <select
                id="customer-account-filter"
                value={accountFilter}
                onChange={(event) =>
                  setAccountFilter(event.target.value as AccountFilter)
                }
                className={selectClass}
              >
                <option value="all">Account Type: All</option>
                <option value="registered">Registered</option>
                <option value="managed">Managed Customer</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="customer-payment-filter" className="sr-only">
                Payment Status
              </label>
              <select
                id="customer-payment-filter"
                value={paymentFilter}
                onChange={(event) =>
                  setPaymentFilter(event.target.value as PaymentFilter)
                }
                className={selectClass}
              >
                <option value="all">Payment: All</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="customer-quota-filter" className="sr-only">
                Quota Status
              </label>
              <select
                id="customer-quota-filter"
                value={quotaFilter}
                onChange={(event) =>
                  setQuotaFilter(event.target.value as QuotaFilter)
                }
                className={selectClass}
              >
                <option value="all">Quota: All</option>
                <option value="available">Available (&gt;1)</option>
                <option value="low">Low (=1)</option>
                <option value="depleted">Depleted (0)</option>
              </select>
            </SelectShell>
            <SelectShell>
              <label htmlFor="customer-joined-filter" className="sr-only">
                Joined Date
              </label>
              <select
                id="customer-joined-filter"
                value={joinedFilter}
                onChange={(event) =>
                  setJoinedFilter(event.target.value as JoinedFilter)
                }
                className={selectClass}
              >
                <option value="all">Joined: All Time</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
            </SelectShell>
            <button
              type="button"
              onClick={resetFilters}
              title="Clear filters"
              aria-label="Clear customer filters"
              className="grid h-10 w-full shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary sm:w-10"
            >
              <RotateCcw aria-hidden size={16} />
            </button>
          </div>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <CustomerTable
            customers={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
          />
          <CustomerCardList
            customers={visible}
            openActionId={openActionId}
            onToggleActions={(id) =>
              setOpenActionId((current) => (current === id ? null : id))
            }
          />
          <div className="flex flex-col gap-2 border border-border bg-surface-low px-4 py-3 text-[11px] text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <strong className="text-primary">{visible.length}</strong>{" "}
              sample records from{" "}
              <strong className="text-primary">{summary.totalCustomers}</strong>{" "}
              customers
            </p>
            <p className="text-[9px] font-semibold tracking-[0.1em] uppercase">
              Mock service · Page 1
            </p>
          </div>
        </>
      ) : (
        <div className="border border-border bg-surface-lowest px-6 py-14 text-center shadow-sm">
          <SearchX
            aria-hidden
            size={30}
            className="mx-auto text-on-surface-variant"
          />
          <h2 className="mt-3 font-serif text-[22px]">
            No customers match this view
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-[12px] leading-5 text-on-surface-variant">
            Try another account, payment, quota, date, or search filter.
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
    </section>
  );
}
