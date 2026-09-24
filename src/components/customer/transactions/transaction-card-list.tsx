import { ChevronRight, Heart } from "lucide-react";

import { TransactionStatusBadge } from "@/components/customer/transactions/transaction-status-badge";
import type { CustomerTransactionWithInvitation } from "@/types";
import { idrFormat as currency } from "@/lib/format";


const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function TransactionCardList({
  transactions,
  onView,
}: {
  transactions: CustomerTransactionWithInvitation[];
  onView: (transaction: CustomerTransactionWithInvitation) => void;
}) {
  return (
    <ul className="space-y-3 md:hidden">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <button
            type="button"
            onClick={() => onView(transaction)}
            className="w-full bg-surface-lowest p-4 text-left shadow-sm transition-colors hover:bg-surface-low"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-on-surface-variant">
                  {transaction.reference}
                </p>
                <p className="mt-0.5 truncate text-[14px] font-semibold">
                  {transaction.productName}
                </p>
              </div>
              <TransactionStatusBadge
                status={transaction.status}
                className="shrink-0"
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
              <div className="flex min-w-0 flex-col gap-1">
                {transaction.relatedInvitation ? (
                  <span className="inline-flex w-fit max-w-full items-center gap-1.5 bg-surface-container px-2 py-0.5 text-[11px] font-medium">
                    <Heart
                      aria-hidden
                      size={11}
                      className="shrink-0 text-secondary"
                    />
                    <span className="truncate">
                      {transaction.relatedInvitation.coupleLabel}
                    </span>
                  </span>
                ) : (
                  <span className="text-[11px] text-on-surface-variant">
                    — Unassigned
                  </span>
                )}
                <span className="text-[11px] text-on-surface-variant">
                  {dateFormat.format(new Date(transaction.createdAt))}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[15px] font-semibold">
                  {currency.format(transaction.amount.total)}
                </span>
                <ChevronRight
                  aria-hidden
                  size={16}
                  className="text-on-surface-variant"
                />
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
