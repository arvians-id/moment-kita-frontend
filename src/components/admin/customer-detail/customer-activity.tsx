import {
  CircleDollarSign,
  Gauge,
  Mail,
  Pencil,
  UserRoundPlus,
  type LucideIcon,
} from "lucide-react";

import type { AdminCustomerActivity, AdminCustomerActivityKind } from "@/types";

import { dateTimeFormat } from "./customer-detail-formatters";

const activityIcon: Record<AdminCustomerActivityKind, LucideIcon> = {
  customer: UserRoundPlus,
  payment: CircleDollarSign,
  invitation: Mail,
  quota: Gauge,
  profile: Pencil,
};

export function CustomerActivity({
  activity,
}: {
  activity: AdminCustomerActivity[];
}) {
  return (
    <section
      role="tabpanel"
      className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6"
    >
      <div className="border-b border-border pb-4">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          Operational Stream
        </p>
        <h2 className="mt-1 font-serif text-[25px] leading-8">
          Customer activity
        </h2>
        <p className="mt-1 max-w-2xl text-[11px] leading-5 text-on-surface-variant">
          Meaningful customer and admin events only. This is not a global Audit
          Logs product.
        </p>
      </div>

      <ol className="mt-6 space-y-0">
        {activity.map((entry, index) => {
          const Icon = activityIcon[entry.kind];
          const isLast = index === activity.length - 1;

          return (
            <li key={entry.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden
                  className="absolute top-9 bottom-0 left-[17px] w-px bg-border"
                />
              ) : null}
              <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-surface-container text-secondary">
                <Icon aria-hidden size={15} />
              </span>
              <div className="min-w-0 flex-1 border-b border-border pb-6 last:border-0 last:pb-0 sm:flex sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h3 className="text-[12px] font-semibold">{entry.title}</h3>
                  <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                    {entry.description}
                  </p>
                  <p className="mt-2 text-[9px] font-semibold tracking-[0.1em] text-secondary uppercase">
                    {entry.actor}
                  </p>
                </div>
                <time
                  dateTime={entry.createdAt}
                  className="mt-2 block shrink-0 text-[9px] text-on-surface-variant sm:mt-0 sm:text-right"
                >
                  {dateTimeFormat.format(new Date(entry.createdAt))}
                </time>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
