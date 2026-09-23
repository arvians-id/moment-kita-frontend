import {
  Archive,
  BadgeCheck,
  FilePenLine,
  MailCheck,
  Send,
  type LucideIcon,
} from "lucide-react";

import type { AdminInvitationSummary } from "@/types";

interface MetricConfig {
  key: keyof Pick<
    AdminInvitationSummary,
    "total" | "draft" | "finalized" | "published" | "expired"
  >;
  label: string;
  note: string;
  icon: LucideIcon;
  accent?: boolean;
}

const metrics: readonly MetricConfig[] = [
  {
    key: "total",
    label: "Total Invitations",
    note: "All lifecycle states",
    icon: MailCheck,
  },
  {
    key: "draft",
    label: "Draft",
    note: "Not quota-consumed",
    icon: FilePenLine,
  },
  {
    key: "finalized",
    label: "Finalized",
    note: "Quota committed · awaiting publish",
    icon: BadgeCheck,
  },
  {
    key: "published",
    label: "Published",
    note: "Public and live",
    icon: Send,
    accent: true,
  },
  {
    key: "expired",
    label: "Expired",
    note: "Public access concluded",
    icon: Archive,
  },
];

export function InvitationMetrics({
  summary,
}: {
  summary: AdminInvitationSummary;
}) {
  return (
    <section
      aria-label="Invitation lifecycle metrics"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
    >
      {metrics.map(({ key, label, note, icon: Icon, accent }) => {
        const percentage =
          key === "total" || summary.total === 0
            ? null
            : Math.round((summary[key] / summary.total) * 100);

        return (
          <article
            key={key}
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
              <div className="flex items-baseline gap-2">
                <p className="font-serif text-[30px] leading-8 tracking-tight">
                  {summary[key].toLocaleString("en-US")}
                </p>
                {percentage !== null ? (
                  <span className="text-[10px] font-semibold text-on-surface-variant">
                    {percentage}%
                  </span>
                ) : null}
              </div>
              <p className="mt-3 border-t border-border pt-2 text-[9px] leading-4 text-on-surface-variant">
                {note}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
