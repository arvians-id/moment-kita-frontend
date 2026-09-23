import { Gauge, History } from "lucide-react";

import type { AdminCustomerQuotaEntry } from "@/types";

import { dateTimeFormat } from "./customer-detail-formatters";

export function CustomerQuotaHistory({
  currentQuota,
  grantedQuota,
  history,
}: {
  currentQuota: number;
  grantedQuota: number;
  history: AdminCustomerQuotaEntry[];
}) {
  return (
    <section role="tabpanel" className="space-y-5">
      <div className="flex flex-col gap-4 border border-border bg-surface-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            Current Entitlement
          </p>
          <h2 className="mt-1 font-serif text-[25px] leading-8">
            Quota balance
          </h2>
          <p className="mt-1 max-w-2xl text-[11px] leading-5 text-on-surface-variant">
            Current remaining quota is authoritative. History below is an
            append-oriented operational ledger and is not recalculated into a
            separate balance.
          </p>
        </div>
        <div className="flex min-w-44 items-center gap-4 bg-surface-low p-4">
          <Gauge aria-hidden size={23} className="text-secondary" />
          <div>
            <p className="font-serif text-[28px] leading-7">
              {currentQuota}{" "}
              <span className="text-[15px] text-on-surface-variant">
                / {grantedQuota}
              </span>
            </p>
            <p className="mt-1 text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Credits remaining
            </p>
          </div>
        </div>
      </div>

      <div className="border border-border bg-surface-lowest shadow-sm">
        <div className="border-b border-border p-5 sm:p-6">
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            Allocation Ledger
          </p>
          <h2 className="mt-1 font-serif text-[23px] leading-8">
            Quota history
          </h2>
        </div>

        {history.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <History
              aria-hidden
              size={30}
              className="mx-auto text-on-surface-variant"
            />
            <h3 className="mt-3 font-serif text-[21px]">No quota history</h3>
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden md:block">
              <table className="w-full table-fixed text-left">
                <thead className="bg-surface-low text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                  <tr>
                    <th className="w-[12%] px-5 py-3">Change</th>
                    <th className="w-[35%] px-4 py-3">Reason</th>
                    <th className="w-[18%] px-4 py-3">Source</th>
                    <th className="w-[21%] px-4 py-3">Date</th>
                    <th className="w-[14%] px-4 py-3">Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {history.map((entry) => (
                    <tr key={entry.id} className="hover:bg-surface-low/70">
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex min-w-12 justify-center px-2 py-1 text-[10px] font-bold ${entry.delta > 0 ? "bg-accent text-accent-foreground" : "bg-surface-container text-on-surface"}`}
                        >
                          {entry.delta > 0 ? "+" : ""}
                          {entry.delta}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[12px] font-semibold">
                        {entry.reason}
                      </td>
                      <td className="px-4 py-4 text-[10px] text-on-surface-variant">
                        {entry.source}
                      </td>
                      <td className="px-4 py-4 text-[10px] text-on-surface-variant">
                        {dateTimeFormat.format(new Date(entry.createdAt))}
                      </td>
                      <td className="px-4 py-4 text-[10px] text-on-surface-variant">
                        {entry.adminName ?? "System"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-border md:hidden">
              {history.map((entry) => (
                <li key={entry.id} className="p-5">
                  <div className="flex items-start gap-3">
                    <span
                      className={`inline-flex min-w-12 shrink-0 justify-center px-2 py-1 text-[10px] font-bold ${entry.delta > 0 ? "bg-accent text-accent-foreground" : "bg-surface-container text-on-surface"}`}
                    >
                      {entry.delta > 0 ? "+" : ""}
                      {entry.delta}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[12px] leading-5 font-semibold">
                        {entry.reason}
                      </h3>
                      <p className="mt-1 text-[10px] text-on-surface-variant">
                        {entry.source} · {entry.adminName ?? "System"}
                      </p>
                      <p className="mt-1 text-[9px] text-on-surface-variant">
                        {dateTimeFormat.format(new Date(entry.createdAt))}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
