import { Heart } from "lucide-react";

import { TransactionStatusBadge } from "@/components/customer/transactions/transaction-status-badge";
import type { CustomerTransactionWithInvitation } from "@/types";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

export function TransactionTable({
  transactions,
  selectedId,
  onView,
}: {
  transactions: CustomerTransactionWithInvitation[];
  selectedId: string | null;
  onView: (transaction: CustomerTransactionWithInvitation) => void;
}) {
  return (
    <div className="hidden bg-surface-lowest shadow-sm md:block">
      <table className="w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="bg-surface-low text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            <th className="w-[16%] px-3 py-3 font-semibold xl:w-[15%]">
              Reference
            </th>
            <th className="w-[34%] px-3 py-3 font-semibold xl:w-[28%]">
              Purpose &amp; Details
            </th>
            <th className="hidden px-3 py-3 font-semibold xl:table-cell xl:w-[15%]">
              Linked Event
            </th>
            <th className="w-[16%] px-3 py-3 text-right font-semibold xl:w-[12%]">
              Amount
            </th>
            <th className="w-[20%] px-3 py-3 text-center font-semibold xl:w-[14%]">
              Status
            </th>
            <th className="hidden px-3 py-3 font-semibold xl:table-cell xl:w-[10%]">
              Date
            </th>
            <th className="w-[14%] px-3 py-3 text-right font-semibold xl:w-[6%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((transaction) => {
            const created = new Date(transaction.createdAt);
            const isSelected = transaction.id === selectedId;

            return (
              <tr
                key={transaction.id}
                onClick={() => onView(transaction)}
                className={`group cursor-pointer transition-colors ${
                  isSelected ? "bg-surface-highest/50" : "hover:bg-surface-low"
                }`}
              >
                <td className="px-3 py-3.5 align-middle">
                  <span className="font-mono text-[12px] text-on-surface">
                    {transaction.reference}
                  </span>
                </td>
                <td className="px-3 py-3.5 align-middle">
                  <span className="block truncate text-[13px] font-semibold">
                    {transaction.productName}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-on-surface-variant">
                    {transaction.description}
                  </span>
                </td>
                <td className="hidden px-3 py-3.5 align-middle xl:table-cell">
                  {transaction.relatedInvitation ? (
                    <span className="inline-flex max-w-full items-center gap-1.5 bg-surface-container px-2 py-0.5 text-[12px] font-medium">
                      <Heart
                        aria-hidden
                        size={12}
                        className="shrink-0 text-secondary"
                      />
                      <span className="truncate">
                        {transaction.relatedInvitation.coupleLabel}
                      </span>
                    </span>
                  ) : (
                    <span className="text-[12px] text-on-surface-variant">
                      — Unassigned
                    </span>
                  )}
                </td>
                <td className="px-3 py-3.5 text-right align-middle font-semibold">
                  {currency.format(transaction.amount.total)}
                </td>
                <td className="px-3 py-3.5 text-center align-middle">
                  <TransactionStatusBadge status={transaction.status} />
                </td>
                <td className="hidden px-3 py-3.5 align-middle text-[11px] whitespace-nowrap text-on-surface-variant xl:table-cell">
                  {dateFormat.format(created)}
                  <br />
                  <span className="text-[10px]">
                    {timeFormat.format(created)} WIB
                  </span>
                </td>
                <td className="px-3 py-3.5 text-right align-middle">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onView(transaction);
                    }}
                    className="inline-flex items-center gap-1 bg-surface-container px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors group-hover:bg-surface-high"
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
