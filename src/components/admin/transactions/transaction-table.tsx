import Link from "next/link";

import {
  TransactionRowActions,
  type TransactionRowAction,
} from "@/components/admin/transactions/transaction-row-actions";
import {
  formatMaybeDate,
  idrFormat,
  purposeLabel,
  transactionDateFormat,
} from "@/components/admin/transactions/transaction-list-utils";
import { TransactionStatusBadge } from "@/components/customer/transactions/transaction-status-badge";
import type { AdminTransactionListItem } from "@/types";

export function TransactionTable({
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
    <div className="hidden border border-border bg-surface-lowest shadow-sm xl:block">
      <table className="w-full table-fixed text-left">
        <thead className="bg-surface-low text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
          <tr>
            <th className="w-[13%] px-4 py-3">Reference</th>
            <th className="w-[15%] px-3 py-3">Customer</th>
            <th className="w-[22%] px-3 py-3">Purpose / Product</th>
            <th className="w-[13%] px-3 py-3">Related Invitation</th>
            <th className="w-[11%] px-3 py-3 text-right">Amount</th>
            <th className="w-[10%] px-3 py-3 text-center">Status</th>
            <th className="w-[11%] px-3 py-3">Created / Paid</th>
            <th className="w-[5%] px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((transaction) => {
            const subdued =
              transaction.status === "cancelled" ||
              transaction.status === "refunded";

            return (
              <tr
                key={transaction.id}
                className={`transition-colors hover:bg-surface-low/75 ${subdued ? "bg-surface-low/25" : ""}`}
              >
                <td className="px-4 py-4 align-middle">
                  <Link
                    href={`/admin/transactions/${transaction.id}`}
                    prefetch={false}
                    className="block truncate font-mono text-[11px] font-semibold text-primary transition-colors hover:text-secondary"
                  >
                    {transaction.reference}
                  </Link>
                </td>
                <td className="px-3 py-4 align-middle">
                  {transaction.customer.id ? (
                    <Link
                      href={`/admin/customers/${transaction.customer.id}`}
                      className="block truncate text-[11px] font-semibold transition-colors hover:text-secondary"
                    >
                      {transaction.customer.name}
                    </Link>
                  ) : (
                    <p className="truncate text-[11px] font-semibold">
                      {transaction.customer.name}
                    </p>
                  )}
                  <p className="mt-1 text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                    {transaction.customer.accountType === "managed"
                      ? "Managed · No login"
                      : transaction.customer.accountType === "registered"
                        ? "Registered"
                        : "Unresolved"}
                  </p>
                </td>
                <td className="px-3 py-4 align-middle">
                  <p className="truncate text-[11px] font-semibold">
                    {transaction.productName}
                  </p>
                  <p className="mt-1 truncate text-[9px] text-on-surface-variant">
                    {purposeLabel[transaction.purpose]}
                  </p>
                </td>
                <td className="px-3 py-4 align-middle">
                  {transaction.relatedInvitation ? (
                    <Link
                      href={`/admin/invitations/${transaction.relatedInvitation.id}`}
                      prefetch={false}
                      className="block truncate text-[10px] transition-colors hover:text-secondary"
                    >
                      {transaction.relatedInvitation.coupleLabel}
                    </Link>
                  ) : (
                    <span className="text-[10px] text-on-surface-variant">
                      Unassigned
                    </span>
                  )}
                </td>
                <td className="px-3 py-4 text-right align-middle text-[11px] font-semibold whitespace-nowrap">
                  {idrFormat.format(transaction.amount)}
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  <TransactionStatusBadge status={transaction.status} />
                </td>
                <td className="px-3 py-4 align-middle text-[9px] leading-4 text-on-surface-variant">
                  <p>{transactionDateFormat.format(new Date(transaction.createdAt))}</p>
                  <p className="mt-1">Paid: {formatMaybeDate(transaction.paidAt)}</p>
                </td>
                <td className="px-3 py-4 text-right align-middle">
                  <TransactionRowActions
                    transaction={transaction}
                    isOpen={openActionId === transaction.id}
                    onToggle={() => onToggleActions(transaction.id)}
                    onAction={(action) => onAction(transaction, action)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
