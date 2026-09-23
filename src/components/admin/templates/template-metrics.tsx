import { BarChart3, CheckCircle2, LayoutTemplate, Star } from "lucide-react";

import type { AdminTemplateSummary } from "@/types";

const metrics = [
  {
    key: "totalTemplates",
    label: "Total Templates",
    note: "Registered in the catalog",
    icon: LayoutTemplate,
  },
  {
    key: "activeTemplates",
    label: "Active Templates",
    note: "Available for new invitations",
    icon: CheckCircle2,
  },
  {
    key: "featuredTemplates",
    label: "Featured",
    note: "Promoted in the catalog",
    icon: Star,
  },
  {
    key: "totalUsage",
    label: "Total Usage",
    note: "Tracked invitation suites",
    icon: BarChart3,
  },
] as const;

export function TemplateMetrics({
  summary,
}: {
  summary: AdminTemplateSummary;
}) {
  return (
    <section
      aria-label="Template registry metrics"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {metrics.map(({ key, label, note, icon: Icon }, index) => (
        <article
          key={key}
          className="flex min-h-36 flex-col justify-between border border-border bg-surface-lowest p-5 shadow-sm"
        >
          <div
            className={`flex items-center justify-between gap-3 ${index === 1 ? "text-secondary" : "text-on-surface-variant"}`}
          >
            <span className="text-[9px] font-semibold tracking-[0.14em] uppercase">
              {label}
            </span>
            <Icon aria-hidden size={16} />
          </div>
          <div>
            <p className="font-serif text-[30px] leading-8 tracking-tight">
              {summary[key].toLocaleString("en-US")}
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
