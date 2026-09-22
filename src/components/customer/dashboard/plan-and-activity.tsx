import {
  BadgeCheck,
  CheckCircle2,
  Gift,
  Heart,
  Mic,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { ActivityEntry, ActivityKind, EntitlementSummary } from "@/types";

const activityIcons: Record<ActivityKind, LucideIcon> = {
  rsvp: UserCheck,
  wish: Mic,
  gift: Gift,
  invitation: Heart,
};

export function PlanAndActivity({
  entitlement,
  activity,
}: {
  entitlement: EntitlementSummary;
  activity: ActivityEntry[];
}) {
  const used = entitlement.quotaGranted - entitlement.quotaRemaining;
  const usedPercent =
    entitlement.quotaGranted > 0 ? (used / entitlement.quotaGranted) * 100 : 0;

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-5 rounded-[12px] bg-surface-lowest p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Current package
            </span>
            <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
              {entitlement.packageName}
            </h2>
          </div>
          <BadgeCheck
            aria-hidden
            size={22}
            className="shrink-0 text-secondary"
          />
        </div>

        <div className="flex flex-col gap-2 rounded-[8px] bg-surface-low p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] leading-5 font-medium">
              Invitation quota
            </span>
            <span className="text-[12px] font-bold tracking-[0.12em] text-secondary uppercase">
              {entitlement.quotaRemaining} remaining
            </span>
          </div>
          <div
            role="img"
            aria-label={`${used} of ${entitlement.quotaGranted} invitation quota used`}
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-highest"
          >
            <div
              className="h-full bg-secondary"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
          <span className="mt-1 text-[12px] text-on-surface-variant">
            {entitlement.quotaNote}
          </span>
        </div>

        <ul className="flex flex-col gap-2 text-[13px] text-on-surface-variant">
          {entitlement.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <CheckCircle2
                aria-hidden
                size={15}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4 rounded-[12px] bg-surface-lowest p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
            Recent activity
          </span>
          <span className="text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase">
            Live
          </span>
        </div>

        <ul className="flex flex-col gap-3.5">
          {activity.map((entry) => {
            const Icon = activityIcons[entry.kind];
            return (
              <li key={entry.id} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-surface-container text-secondary">
                  <Icon aria-hidden size={14} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-[13px] leading-snug font-medium">
                    {entry.message}
                  </p>
                  <span className="mt-0.5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                    {entry.occurredAt}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
