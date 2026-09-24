"use client";

import { ChevronDown, Gauge, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  formatMaybeDate,
  numberFormat,
} from "@/components/admin/packages/packages-quota-formatters";
import type { AdminCustomerAccountType, AdminCustomerQuotaRow } from "@/types";

type AccountTypeFilter = "all" | AdminCustomerAccountType;
type QuotaStatusFilter = "all" | "has_quota" | "no_quota";

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

export function QuotaOverview({
  rows,
  onAdjust,
  onAdjustAny,
}: {
  rows: AdminCustomerQuotaRow[];
  onAdjust: (customerId: string) => void;
  onAdjustAny: () => void;
}) {
  const [query, setQuery] = useState("");
  const [accountType, setAccountType] = useState<AccountTypeFilter>("all");
  const [quotaStatus, setQuotaStatus] = useState<QuotaStatusFilter>("all");

  const term = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      rows.filter(({ customer }) => {
        const matchesQuery =
          term === "" || customer.name.toLowerCase().includes(term);
        const matchesAccountType =
          accountType === "all" || customer.accountType === accountType;
        const matchesQuotaStatus =
          quotaStatus === "all" ||
          (quotaStatus === "has_quota"
            ? customer.quotaRemaining > 0
            : customer.quotaRemaining === 0);

        return matchesQuery && matchesAccountType && matchesQuotaStatus;
      }),
    [accountType, quotaStatus, rows, term],
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            Quota Operations
          </p>
          <h2 className="mt-1 font-serif text-[22px]">Customer quota overview</h2>
        </div>
        <button
          type="button"
          onClick={onAdjustAny}
          className="inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-4 text-[9px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
        >
          <Gauge aria-hidden size={14} /> Adjust Customer Quota
        </button>
      </div>

      <div className="grid gap-2 border border-border bg-surface-lowest p-4 shadow-sm lg:grid-cols-12">
        <div className="relative h-10 lg:col-span-6">
          <Search
            aria-hidden
            size={15}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
          />
          <label htmlFor="quota-search" className="sr-only">
            Search customer
          </label>
          <input
            id="quota-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customer..."
            className="h-10 w-full border border-transparent bg-surface-low pr-3 pl-9 text-[12px] outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-secondary"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 lg:col-span-6">
          <SelectShell>
            <label htmlFor="quota-account-type" className="sr-only">
              Account type
            </label>
            <select
              id="quota-account-type"
              value={accountType}
              onChange={(event) =>
                setAccountType(event.target.value as AccountTypeFilter)
              }
              className={selectClass}
            >
              <option value="all">Account Type: All</option>
              <option value="registered">Registered</option>
              <option value="managed">Managed</option>
            </select>
          </SelectShell>
          <SelectShell>
            <label htmlFor="quota-status" className="sr-only">
              Quota status
            </label>
            <select
              id="quota-status"
              value={quotaStatus}
              onChange={(event) =>
                setQuotaStatus(event.target.value as QuotaStatusFilter)
              }
              className={selectClass}
            >
              <option value="all">Quota Status: All</option>
              <option value="has_quota">Has Quota</option>
              <option value="no_quota">No Quota</option>
            </select>
          </SelectShell>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="border border-border bg-surface-lowest px-6 py-12 text-center shadow-sm">
          <SearchX aria-hidden size={26} className="mx-auto text-on-surface-variant" />
          <p className="mt-3 text-[12px] text-on-surface-variant">
            No customers match this filter.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden border border-border bg-surface-lowest shadow-sm lg:block">
            <table className="w-full table-fixed text-left">
              <thead className="bg-surface-low text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                <tr>
                  <th className="w-[24%] px-4 py-3">Customer</th>
                  <th className="w-[14%] px-3 py-3">Account Type</th>
                  <th className="w-[14%] px-3 py-3 text-center">Remaining</th>
                  <th className="w-[14%] px-3 py-3 text-center">Granted</th>
                  <th className="w-[14%] px-3 py-3 text-center">Used</th>
                  <th className="w-[14%] px-3 py-3">Last Activity</th>
                  <th className="w-[6%] px-3 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map(({ customer, lastActivityAt }) => {
                  const used = Math.max(
                    0,
                    customer.quotaGranted - customer.quotaRemaining,
                  );
                  return (
                    <tr key={customer.id} className="hover:bg-surface-low/75">
                      <td className="px-4 py-3.5 align-middle">
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="block truncate text-[12px] font-semibold transition-colors hover:text-secondary"
                        >
                          {customer.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3.5 align-middle text-[10px] text-on-surface-variant capitalize">
                        {customer.accountType === "managed"
                          ? "Managed · No login"
                          : "Registered"}
                      </td>
                      <td className="px-3 py-3.5 text-center align-middle">
                        <span
                          className={`text-[13px] font-semibold ${customer.quotaRemaining === 0 ? "text-red-700" : ""}`}
                        >
                          {numberFormat.format(customer.quotaRemaining)}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-center align-middle text-[12px]">
                        {numberFormat.format(customer.quotaGranted)}
                      </td>
                      <td className="px-3 py-3.5 text-center align-middle text-[12px]">
                        {numberFormat.format(used)}
                      </td>
                      <td className="px-3 py-3.5 align-middle text-[10px] text-on-surface-variant">
                        {formatMaybeDate(lastActivityAt)}
                      </td>
                      <td className="px-3 py-3.5 text-right align-middle">
                        <button
                          type="button"
                          onClick={() => onAdjust(customer.id)}
                          className="inline-flex min-h-8 items-center gap-1 bg-surface-container px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-surface-high"
                        >
                          Adjust
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {visible.map(({ customer, lastActivityAt }) => {
              const used = Math.max(
                0,
                customer.quotaGranted - customer.quotaRemaining,
              );
              return (
                <li
                  key={customer.id}
                  className="border border-border bg-surface-lowest p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="block truncate text-[13px] font-semibold hover:text-secondary"
                      >
                        {customer.name}
                      </Link>
                      <p className="mt-0.5 text-[9px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
                        {customer.accountType === "managed"
                          ? "Managed · No login"
                          : "Registered"}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 font-serif text-[20px] ${customer.quotaRemaining === 0 ? "text-red-700" : ""}`}
                    >
                      {customer.quotaRemaining}
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 bg-surface-low p-3">
                    <div>
                      <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                        Granted
                      </dt>
                      <dd className="mt-0.5 text-[11px] font-semibold">
                        {customer.quotaGranted}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                        Used
                      </dt>
                      <dd className="mt-0.5 text-[11px] font-semibold">{used}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 text-[9px] text-on-surface-variant">
                    Last activity: {formatMaybeDate(lastActivityAt)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onAdjust(customer.id)}
                    className="mt-3 inline-flex min-h-9 w-full items-center justify-center bg-surface-container text-[9px] font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-surface-high"
                  >
                    Adjust Quota
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
