import { ReceiptText } from "lucide-react";

import type { AdminCustomerTransaction, TransactionStatus } from "@/types";

import { dateFormat, idrFormat, titleCase } from "./customer-detail-formatters";

const transactionStatusClass: Record<TransactionStatus, string> = {
  pending: "bg-amber-100 text-amber-900",
  paid: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-surface-container text-on-surface-variant",
  refunded: "bg-blue-100 text-blue-900",
};

function StatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span
      className={`inline-flex px-2 py-1 text-[9px] font-semibold tracking-[0.1em] uppercase ${transactionStatusClass[status]}`}
    >
      {titleCase(status)}
    </span>
  );
}

export function CustomerTransactions({
  transactions,
}: {
  transactions: AdminCustomerTransaction[];
}) {
  return (
    <section
      role="tabpanel"
      className="border border-border bg-surface-lowest shadow-sm"
    >
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            Billing &amp; Receipts
          </p>
          <h2 className="mt-1 font-serif text-[25px] leading-8">
            Customer transactions
          </h2>
          <p className="mt-1 text-[11px] text-on-surface-variant">
            A focused customer ledger; the full Transactions module remains
            separate.
          </p>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          {transactions.length} records
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <ReceiptText
            aria-hidden
            size={30}
            className="mx-auto text-on-surface-variant"
          />
          <h3 className="mt-3 font-serif text-[21px]">No transactions</h3>
          <p className="mt-1 text-[11px] text-on-surface-variant">
            No customer-specific billing records are available.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden md:block">
            <table className="w-full table-fixed text-left">
              <thead className="bg-surface-low text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                <tr>
                  <th className="w-[20%] px-5 py-3">Reference</th>
                  <th className="w-[34%] px-4 py-3">Purpose</th>
                  <th className="w-[16%] px-4 py-3 text-right">Amount</th>
                  <th className="w-[14%] px-4 py-3 text-center">Status</th>
                  <th className="w-[16%] px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-surface-low/70">
                    <td className="px-5 py-4 font-mono text-[10px] font-semibold">
                      {transaction.reference}
                    </td>
                    <td className="px-4 py-4">
                      <p className="truncate text-[12px] font-semibold">
                        {transaction.productName}
                      </p>
                      <p className="mt-1 text-[9px] tracking-[0.1em] text-on-surface-variant uppercase">
                        {titleCase(transaction.purpose)}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right text-[11px] font-semibold whitespace-nowrap">
                      {idrFormat.format(transaction.amount)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-4 py-4 text-[11px] text-on-surface-variant">
                      {dateFormat.format(new Date(transaction.createdAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-border md:hidden">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] text-on-surface-variant">
                      {transaction.reference}
                    </p>
                    <h3 className="mt-1 text-[13px] leading-5 font-semibold">
                      {transaction.productName}
                    </h3>
                  </div>
                  <StatusBadge status={transaction.status} />
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
                      Date
                    </dt>
                    <dd className="mt-1 text-[11px]">
                      {dateFormat.format(new Date(transaction.createdAt))}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
