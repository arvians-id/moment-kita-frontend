import {
  AlertCircle,
  Gauge,
  Layers3,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

import { numberFormat } from "@/components/admin/packages/packages-quota-formatters";
import type { AdminPackageQuotaSummary } from "@/types";

interface MetricConfig {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  accent?: boolean;
}

export function PackageMetrics({
  summary,
}: {
  summary: AdminPackageQuotaSummary;
}) {
  const metrics: readonly MetricConfig[] = [
    {
      label: "Active Packages",
      value: numberFormat.format(summary.activePackages),
      note: "Available for new selection",
      icon: PackageCheck,
      accent: true,
    },
    {
      label: "Total Quota Sold",
      value: numberFormat.format(summary.totalQuotaSold),
      note: "Across all packages",
      icon: Layers3,
    },
    {
      label: "Quota Used",
      value: numberFormat.format(summary.quotaUsed),
      note: `${summary.totalQuotaSold ? Math.round((summary.quotaUsed / summary.totalQuotaSold) * 100) : 0}% of quota sold`,
      icon: Gauge,
    },
    {
      label: "Remaining Customer Quota",
      value: numberFormat.format(summary.remainingCustomerQuota),
      note: "Unconsumed, currently available",
      icon: Layers3,
    },
    {
      label: "Customers With No Quota",
      value: numberFormat.format(summary.customersWithNoQuota),
      note: "Need a top-up to finalize",
      icon: AlertCircle,
    },
  ];

  return (
    <section
      aria-label="Package and quota metrics"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
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
            <p className="font-serif text-[26px] leading-8 tracking-tight">
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
