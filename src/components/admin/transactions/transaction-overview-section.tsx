import {
  formatMaybeDate,
  idrFormat,
  purposeLabel,
  transactionDateTimeFormat,
} from "@/components/admin/transactions/transaction-list-utils";
import type { AdminTransactionListItem } from "@/types";

export function TransactionOverviewSection({
  transaction,
}: {
  transaction: AdminTransactionListItem;
}) {
  const fields: [string, string][] = [
    ["Reference", transaction.reference],
    ["Type", purposeLabel[transaction.purpose]],
    ["Product", transaction.productName],
    ["Status", transaction.status[0].toUpperCase() + transaction.status.slice(1)],
    ["Amount", idrFormat.format(transaction.amount)],
    [
      "Created Date",
      transactionDateTimeFormat.format(new Date(transaction.createdAt)),
    ],
    ["Paid Date", formatMaybeDate(transaction.paidAt)],
    ["Payment Method", transaction.payment?.method ?? "Not on file"],
  ];

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        Transaction
      </p>
      <h2 className="mt-1 font-serif text-[24px]">Overview</h2>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label} className="bg-surface-low p-4">
            <dt className="text-[8px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase">
              {label}
            </dt>
            <dd className="mt-1.5 text-[12px] font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
