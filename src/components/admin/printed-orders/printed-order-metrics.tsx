import {
  Banknote,
  CheckCircle2,
  PackageCheck,
  Printer,
  Send,
} from "lucide-react";

import { idrFormat } from "@/components/admin/printed-orders/printed-order-utils";
import type { AdminPrintedOrderSummary } from "@/types";

export function PrintedOrderMetrics({
  summary,
}: {
  summary: AdminPrintedOrderSummary;
}) {
  const metrics = [
    {
      label: "Total Orders",
      value: summary.totalOrders.toLocaleString("en-US"),
      note: "Manual printed commissions",
      icon: Printer,
      compact: false,
    },
    {
      label: "New / Confirmed",
      value: summary.newOrders.toLocaleString("en-US"),
      note: "Awaiting production start",
      icon: CheckCircle2,
      compact: false,
    },
    {
      label: "In Production",
      value: summary.inProduction.toLocaleString("en-US"),
      note: "Current print runs",
      icon: PackageCheck,
      compact: false,
    },
    {
      label: "Ready / Shipped",
      value: summary.readyOrShipped.toLocaleString("en-US"),
      note: `${summary.completed} completed`,
      icon: Send,
      compact: false,
    },
    {
      label: "Paid Revenue",
      value: idrFormat.format(summary.paidRevenue),
      note: "From shared paid transactions",
      icon: Banknote,
      compact: true,
    },
  ] as const;

  return (
    <section
      aria-label="Printed order metrics"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
    >
      {metrics.map(({ label, value, note, icon: Icon, compact }) => (
        <article
          key={label}
          className="flex min-h-36 flex-col justify-between border border-border bg-surface-lowest p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 text-on-surface-variant">
            <span className="text-[9px] font-semibold tracking-[0.14em] uppercase">
              {label}
            </span>
            <Icon aria-hidden size={16} />
          </div>
          <div>
            <p
              className={`font-serif leading-8 tracking-tight ${compact ? "text-[20px]" : "text-[30px]"}`}
            >
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
