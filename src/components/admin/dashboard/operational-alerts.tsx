import { AlertTriangle, Info, OctagonAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import type { AdminAlert, AdminAlertSeverity } from "@/types";

const severityPresentation: Record<
  AdminAlertSeverity,
  { icon: LucideIcon; tone: string }
> = {
  critical: { icon: OctagonAlert, tone: "text-secondary" },
  warning: { icon: AlertTriangle, tone: "text-accent-foreground" },
  info: { icon: Info, tone: "text-on-surface-variant" },
};

export function OperationalAlerts({ alerts }: { alerts: AdminAlert[] }) {
  return (
    <section className="flex h-full flex-col gap-4 border border-border bg-surface-lowest p-5 sm:p-6">
      <div className="flex flex-col">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
          Operations
        </span>
        <h2 className="font-serif text-[20px] leading-7 font-semibold">
          Priority Operations
        </h2>
      </div>

      {alerts.length === 0 ? (
        <p className="text-[13px] text-on-surface-variant">
          Nothing needs attention right now.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {alerts.map((alert) => {
            const { icon: Icon, tone } = severityPresentation[alert.severity];
            return (
              <li
                key={alert.id}
                className="flex items-start justify-between gap-3 py-3"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <Icon
                    aria-hidden
                    size={17}
                    className={`mt-0.5 shrink-0 ${tone}`}
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[13px] leading-5 font-semibold">
                      {alert.title}
                    </span>
                    <span className="mt-0.5 text-[12px] leading-5 text-on-surface-variant">
                      {alert.description}
                    </span>
                  </div>
                </div>
                <Link
                  href={alert.actionHref}
                  className="shrink-0 self-center text-[11px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase transition-colors hover:text-primary"
                >
                  {alert.actionLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
