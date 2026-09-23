import {
  CircleDollarSign,
  MessageSquareText,
  MonitorSmartphone,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AdminCustomerSummary } from "@/types";

const numberFormat = new Intl.NumberFormat("en-US");

interface CustomerMetricConfig {
  key: keyof Pick<
    AdminCustomerSummary,
    | "totalCustomers"
    | "registeredAccounts"
    | "managedCustomers"
    | "paidCustomers"
  >;
  label: string;
  note: (summary: AdminCustomerSummary) => string;
  tag: string;
  icon: LucideIcon;
  accent: "secondary" | "primary" | "managed" | "paid";
}

const metricConfig: readonly CustomerMetricConfig[] = [
  {
    key: "totalCustomers",
    label: "Total Customers",
    note: (summary) => `+${summary.addedThisMonth} this month`,
    tag: "All clientele",
    icon: Users,
    accent: "secondary",
  },
  {
    key: "registeredAccounts",
    label: "Registered Accounts",
    note: (summary) =>
      `${Math.round((summary.registeredAccounts / summary.totalCustomers) * 100)}% of total`,
    tag: "Self-serve web",
    icon: MonitorSmartphone,
    accent: "primary",
  },
  {
    key: "managedCustomers",
    label: "Managed Customers",
    note: (summary) =>
      `${Math.round((summary.managedCustomers / summary.totalCustomers) * 100)}% high-touch`,
    tag: "Studio liaison",
    icon: MessageSquareText,
    accent: "managed",
  },
  {
    key: "paidCustomers",
    label: "Paid Customers",
    note: (summary) =>
      `${Math.round((summary.paidCustomers / summary.totalCustomers) * 100)}% paid`,
    tag: "Settled",
    icon: CircleDollarSign,
    accent: "paid",
  },
];

const accentClasses = {
  secondary: {
    label: "text-on-surface-variant",
    icon: "bg-surface-low text-secondary",
    line: "bg-gradient-to-r from-secondary/40 via-secondary to-transparent",
  },
  primary: {
    label: "text-on-surface-variant",
    icon: "bg-surface-low text-primary",
    line: "bg-primary",
  },
  managed: {
    label: "text-secondary",
    icon: "bg-accent/70 text-secondary",
    line: "bg-secondary",
  },
  paid: {
    label: "text-on-surface-variant",
    icon: "bg-surface-low text-emerald-800",
    line: "bg-emerald-700",
  },
} as const;

export function CustomerMetrics({
  summary,
}: {
  summary: AdminCustomerSummary;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metricConfig.map(({ key, label, note, tag, icon: Icon, accent }) => {
        const classes = accentClasses[accent];
        return (
          <article
            key={key}
            className="relative flex min-h-36 flex-col justify-between overflow-hidden border border-border bg-surface-lowest p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`text-[10px] font-semibold tracking-[0.12em] uppercase ${classes.label}`}
                >
                  {label}
                </p>
                <p className="mt-2 font-serif text-[28px] leading-8 tracking-tight">
                  {numberFormat.format(summary[key])}
                </p>
              </div>
              <span
                className={`grid size-10 shrink-0 place-items-center ${classes.icon}`}
              >
                <Icon aria-hidden size={18} />
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3 text-[11px] leading-4">
              <span
                className={
                  accent === "managed"
                    ? "font-medium text-secondary"
                    : accent === "paid"
                      ? "font-medium text-emerald-800"
                      : "text-on-surface-variant"
                }
              >
                {note(summary)}
              </span>
              <span className="text-right text-[9px] font-semibold tracking-[0.14em] text-on-surface-variant/70 uppercase">
                {tag}
              </span>
            </div>
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 ${classes.line}`}
            />
          </article>
        );
      })}
    </section>
  );
}
