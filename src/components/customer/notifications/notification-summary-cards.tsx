import { AlertTriangle, CalendarClock, Inbox } from "lucide-react";

import type { NotificationCounts } from "@/services/customer/notification-service";

const cardClass =
  "flex flex-col justify-between border border-surface-highest bg-surface-lowest p-5";

export function NotificationSummaryCards({
  counts,
  recentCount,
}: {
  counts: NotificationCounts;
  /** Notifications received in the last 7 days, across every celebration. */
  recentCount: number;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-3">
      <article className={cardClass}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Unread
          </span>
          <Inbox aria-hidden size={17} className="shrink-0 text-secondary" />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {counts.unread} {counts.unread === 1 ? "Update" : "Updates"}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {counts.unread > 0
              ? "Waiting for your attention"
              : "You're all caught up"}
          </p>
        </div>
      </article>

      <article className={cardClass}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Needs Action
          </span>
          <AlertTriangle
            aria-hidden
            size={17}
            className="shrink-0 text-secondary"
          />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {counts.attention}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            Payments to verify, drafts, and reviews
          </p>
        </div>
      </article>

      <article className={cardClass}>
        <div className="mb-2 flex items-center justify-between gap-2 text-on-surface-variant">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            This Week
          </span>
          <CalendarClock
            aria-hidden
            size={17}
            className="shrink-0 text-secondary"
          />
        </div>
        <div className="mt-2">
          <p className="font-serif text-[22px] leading-[30px] font-semibold">
            {recentCount} {recentCount === 1 ? "Update" : "Updates"}
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            Across all of your celebrations
          </p>
        </div>
      </article>
    </section>
  );
}
