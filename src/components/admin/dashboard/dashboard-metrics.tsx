import {
  Gauge,
  History,
  Hourglass,
  Layers3,
  Mail,
  ReceiptText,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AdminDashboardMetrics, AdminMetric } from "@/types";
import { idrFormat as currencyFormat, numberFormat } from "@/lib/format";


interface MetricCardConfig {
  key: keyof AdminDashboardMetrics;
  label: string;
  icon: LucideIcon;
  format: (metric: AdminMetric) => string;
}

const cardConfigs: MetricCardConfig[] = [
  {
    key: "totalCustomers",
    label: "Total Customers",
    icon: Users,
    format: (metric) => numberFormat.format(metric.value),
  },
  {
    key: "totalTransactions",
    label: "Total Transactions",
    icon: ReceiptText,
    format: (metric) => numberFormat.format(metric.value),
  },
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: Wallet,
    format: (metric) => currencyFormat.format(metric.value),
  },
  {
    key: "activeInvitations",
    label: "Active Invitations",
    icon: Mail,
    format: (metric) => numberFormat.format(metric.value),
  },
  {
    key: "expiredInvitations",
    label: "Expired Invitations",
    icon: History,
    format: (metric) => numberFormat.format(metric.value),
  },
  {
    key: "pendingPayments",
    label: "Pending Payments",
    icon: Hourglass,
    format: (metric) => numberFormat.format(metric.value),
  },
  {
    key: "totalQuotaSold",
    label: "Total Quota Sold",
    icon: Layers3,
    format: (metric) => numberFormat.format(metric.value),
  },
  {
    key: "quotaUsed",
    label: "Quota Used",
    icon: Gauge,
    format: (metric) => numberFormat.format(metric.value),
  },
];

export function DashboardMetrics({
  metrics,
}: {
  metrics: AdminDashboardMetrics;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cardConfigs.map(({ key, label, icon: Icon, format }) => {
        const metric = metrics[key];
        const hasTrend = typeof metric.changePercent === "number";

        return (
          <article
            key={key}
            className="flex flex-col justify-between gap-3 border border-border bg-surface-lowest p-4"
          >
            <div className="flex items-center justify-between gap-2 text-on-surface-variant">
              <span className="text-[10px] leading-4 font-semibold tracking-[0.12em] uppercase">
                {label}
              </span>
              <Icon aria-hidden size={16} className="shrink-0 text-secondary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif text-[24px] leading-8 font-semibold">
                {format(metric)}
              </span>
              <div className="flex min-w-0 items-center gap-1.5 text-[11px] leading-4 text-on-surface-variant">
                {hasTrend ? (
                  <span
                    className={
                      (metric.changePercent as number) >= 0
                        ? "shrink-0 font-semibold text-secondary"
                        : "shrink-0 font-semibold text-on-surface-variant"
                    }
                  >
                    {(metric.changePercent as number) >= 0 ? "+" : ""}
                    {metric.changePercent}%
                  </span>
                ) : null}
                <span className="truncate">{metric.note}</span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
