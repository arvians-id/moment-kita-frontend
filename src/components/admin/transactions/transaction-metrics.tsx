import { CalendarClock, Hourglass, ReceiptText, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { idrFormat } from "@/components/admin/transactions/transaction-list-utils";
import type { AdminTransactionSummary } from "@/types";

interface MetricConfig {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  accent?: boolean;
}

export function TransactionMetrics({
  summary,
}: {
  summary: AdminTransactionSummary;
}) {
  const metrics: readonly MetricConfig[] = [
    {
      label: "Total Revenue",
      value: idrFormat.format(summary.totalRevenue),
      note: `${summary.paidCount} paid transactions`,
      icon: Wallet,
      accent: true,
    },
    {
      label: "Revenue This Month",
      value: idrFormat.format(summary.revenueThisMonth),
      note: "Settled this fiscal month",
      icon: CalendarClock,
    },
    {
      label: "Pending Payments",
      value: idrFormat.format(summary.pendingAmount),
      note: `${summary.pendingCount} awaiting confirmation`,
      icon: Hourglass,
    },
    {
      label: "Paid Transactions",
      value: summary.paidCount.toLocaleString("en-US"),
      note: "Confirmed and settled",
      icon: ReceiptText,
    },
  ];

  return (
    <section
      aria-label="Transaction financial metrics"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map(({ label, value, note, icon: Icon, accent }) => (
        <article
          key={label}
          className="flex min-h-36 flex-col justify-between border border-border bg-surface-lowest p-5 shadow-sm"
        >
          <div
            className={`flex items-center justify-between gap-3 ${accent ? "text-secondary" : "text-on-surface-variant"}`}
          >
            <span className="text-[9px] font-semibold tracking-[0.14em] uppercase">
              {label}
            </span>
            <Icon aria-hidden size={16} />
          </div>
          <div>
            <p className="font-serif text-[24px] leading-8 tracking-tight">
              {value}
            </p>
            <p className="mt-3 border-t border-border pt-2 text-[9px] leading-4 text-on-surface-variant">
              {note}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
