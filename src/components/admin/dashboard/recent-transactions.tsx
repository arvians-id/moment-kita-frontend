import { TransactionStatusBadge } from "@/components/customer/transactions/transaction-status-badge";
import type { AdminTransactionPurpose, RecentTransaction } from "@/types";
import Link from "next/link";

const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Jakarta",
});

const purposeLabel: Record<AdminTransactionPurpose, string> = {
  package: "Digital Package",
  quotaAddon: "Quota Add-on",
  extension: "Extension",
  printed: "Printed Order",
};

export function RecentTransactionsTable({
  transactions,
}: {
  transactions: RecentTransaction[];
}) {
  return (
    <section className="flex flex-col gap-4 border border-border bg-surface-lowest p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Commerce
          </span>
          <h2 className="font-serif text-[20px] leading-7 font-semibold">
            Recent Transactions
          </h2>
        </div>
        <Link
          href="/admin/transactions"
          className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:text-primary"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              <th className="px-2 py-2.5 font-semibold">Transaction</th>
              <th className="px-2 py-2.5 font-semibold">Customer</th>
              <th className="hidden px-2 py-2.5 font-semibold sm:table-cell">
                Purpose
              </th>
              <th className="px-2 py-2.5 text-right font-semibold">Amount</th>
              <th className="px-2 py-2.5 text-center font-semibold">Status</th>
              <th className="hidden px-2 py-2.5 text-right font-semibold sm:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-[13px]">
                <td className="px-2 py-3 align-middle">
                  <span className="block font-mono text-[12px]">
                    {transaction.reference}
                  </span>
                  <span className="block truncate text-[11px] text-on-surface-variant">
                    {transaction.productName}
                  </span>
                </td>
                <td className="max-w-[140px] truncate px-2 py-3 align-middle">
                  {transaction.customerName}
                </td>
                <td className="hidden px-2 py-3 align-middle text-on-surface-variant sm:table-cell">
                  {purposeLabel[transaction.purpose]}
                </td>
                <td className="px-2 py-3 text-right align-middle font-semibold whitespace-nowrap">
                  {currencyFormat.format(transaction.amount)}
                </td>
                <td className="px-2 py-3 text-center align-middle">
                  <TransactionStatusBadge status={transaction.status} />
                </td>
                <td className="hidden px-2 py-3 text-right align-middle text-[11px] whitespace-nowrap text-on-surface-variant sm:table-cell">
                  {dateFormat.format(new Date(transaction.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
