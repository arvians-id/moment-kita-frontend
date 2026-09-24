import { Heart, UserRound } from "lucide-react";
import Link from "next/link";

import {
  TransactionRowActions,
  type TransactionRowAction,
} from "@/components/admin/transactions/transaction-row-actions";
import {
  idrFormat,
  purposeLabel,
  transactionDateFormat,
} from "@/components/admin/transactions/transaction-list-utils";
import { TransactionStatusBadge } from "@/components/customer/transactions/transaction-status-badge";
import type { AdminTransactionListItem } from "@/types";

export function TransactionCardList({
  transactions,
  openActionId,
  onToggleActions,
  onAction,
}: {
  transactions: AdminTransactionListItem[];
  openActionId: string | null;
  onToggleActions: (id: string) => void;
  onAction: (
    transaction: AdminTransactionListItem,
    action: TransactionRowAction,
  ) => void;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:hidden">
      {transactions.map((transaction) => {
        const subdued =
          transaction.status === "cancelled" || transaction.status === "refunded";

        return (
          <li
            key={transaction.id}
            className={`relative border border-border bg-surface-lowest p-4 shadow-sm ${subdued ? "bg-surface-low/40" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <TransactionStatusBadge status={transaction.status} />
                <Link
                  href={`/admin/transactions/${transaction.id}`}
                  prefetch={false}
                  className="mt-3 block truncate font-mono text-[11px] font-semibold text-primary transition-colors hover:text-secondary"
                >
                  {transaction.reference}
                </Link>
                <h2 className="mt-1 truncate text-[14px] leading-5 font-semibold">
                  {transaction.productName}
                </h2>
                <p className="mt-0.5 truncate text-[9px] text-on-surface-variant">
                  {purposeLabel[transaction.purpose]}
                </p>
              </div>
              <TransactionRowActions
                transaction={transaction}
                isOpen={openActionId === transaction.id}
                onToggle={() => onToggleActions(transaction.id)}
                onAction={(action) => onAction(transaction, action)}
              />
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-3 text-[10px] text-on-surface-variant">
              {transaction.customer.id ? (
                <Link
                  href={`/admin/customers/${transaction.customer.id}`}
                  className="flex min-w-0 items-center gap-2 transition-colors hover:text-secondary"
                >
                  <UserRound aria-hidden size={13} className="shrink-0" />
                  <span className="truncate font-semibold text-on-surface">
                    {transaction.customer.name}
                  </span>
                </Link>
              ) : (
                <p className="flex min-w-0 items-center gap-2">
                  <UserRound aria-hidden size={13} className="shrink-0" />
                  <span className="truncate font-semibold text-on-surface">
                    {transaction.customer.name}
                  </span>
                </p>
              )}
              {transaction.relatedInvitation ? (
                <Link
                  href={`/admin/invitations/${transaction.relatedInvitation.id}`}
                  prefetch={false}
                  className="flex min-w-0 items-center gap-2 text-secondary"
                >
                  <Heart aria-hidden size={13} className="shrink-0" />
                  <span className="truncate">
                    {transaction.relatedInvitation.coupleLabel}
                  </span>
                </Link>
              ) : null}
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 bg-surface-low p-3">
              <div>
                <dt className="text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                  Amount
                </dt>
                <dd className="mt-1 text-[11px] font-semibold">
                  {idrFormat.format(transaction.amount)}
                </dd>
              </div>
              <div>
                <dt className="text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                  Created
                </dt>
                <dd className="mt-1 text-[10px] font-semibold">
                  {transactionDateFormat.format(new Date(transaction.createdAt))}
                </dd>
              </div>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}
