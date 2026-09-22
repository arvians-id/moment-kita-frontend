import {
  ArrowRight,
  CalendarX,
  Clock,
  Heart,
  RefreshCw,
  Send,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { GuestResponseSummary as GuestSummary } from "@/types";

const cardClass =
  "flex flex-col justify-between gap-4 rounded-[12px] bg-surface-lowest p-5 shadow-sm transition-transform hover:-translate-y-0.5";

function percent(value: number, total: number): string {
  if (total <= 0) return "0%";
  return `${((value / total) * 100).toFixed(1)}%`;
}

function StatCard({
  label,
  icon: Icon,
  value,
  valueTone,
  meta,
  iconTone,
  children,
}: {
  label: string;
  icon: LucideIcon;
  value: number;
  valueTone?: string;
  meta?: string;
  iconTone?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className={cardClass}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          {label}
        </span>
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full ${iconTone ?? "bg-surface-container text-on-surface"}`}
        >
          <Icon aria-hidden size={17} />
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-serif text-[28px] leading-9 ${valueTone ?? "text-on-surface"}`}
          >
            {value}
          </span>
          {meta ? (
            <span className="text-[12px] text-on-surface-variant">{meta}</span>
          ) : null}
        </div>
        {children}
      </div>
    </article>
  );
}

export function GuestResponseSummary({ guests }: { guests: GuestSummary }) {
  const total = guests.totalInvited;
  const attendingPct = (guests.attending / total) * 100;
  const pendingPct = (guests.pending / total) * 100;
  const declinedPct = (guests.declined / total) * 100;

  return (
    <section id="guest-responses" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Guest intelligence
          </span>
          <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
            Guest Responses &amp; Attendance
          </h2>
        </div>
        <span className="flex items-center gap-2 text-[13px] leading-5 text-on-surface-variant">
          Last synchronised just now
          <RefreshCw aria-hidden size={14} className="text-secondary" />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total invited"
          icon={Send}
          value={guests.totalInvited}
          meta="invitations sent"
        >
          <span className="mt-1.5 inline-flex w-fit items-center rounded-[4px] bg-surface-high px-2 py-0.5 text-[10px] font-semibold text-secondary">
            +{guests.invitedThisWeek} this week
          </span>
        </StatCard>

        <StatCard
          label="Attending"
          icon={Heart}
          value={guests.attending}
          valueTone="text-secondary"
          meta={`(${percent(guests.attending, total)})`}
          iconTone="bg-terracotta-soft/45 text-accent-foreground"
        >
          <p className="mt-1 text-[12px] text-on-surface-variant">
            {guests.attendingAdults} adults • {guests.attendingChildren}{" "}
            children
          </p>
        </StatCard>

        <StatCard
          label="Declined"
          icon={CalendarX}
          value={guests.declined}
          meta={`(${percent(guests.declined, total)})`}
        >
          <p className="mt-1 text-[12px] text-on-surface-variant">
            Warm wishes received in their note
          </p>
        </StatCard>

        <StatCard
          label="Awaiting reply"
          icon={Clock}
          value={guests.pending}
          meta={`(${percent(guests.pending, total)})`}
        >
          <span className="mt-1.5 inline-flex cursor-not-allowed items-center gap-1 text-[11px] font-semibold tracking-[0.12em] text-secondary uppercase">
            Send reminder
            <ArrowRight aria-hidden size={12} />
          </span>
        </StatCard>
      </div>

      <div className="flex flex-col gap-4 rounded-[12px] bg-surface-low p-5">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <p className="flex items-start gap-2.5 text-[15px] leading-6 md:items-center">
            <UtensilsCrossed
              aria-hidden
              size={18}
              className="mt-1 shrink-0 text-secondary md:mt-0"
            />
            <span>
              <strong className="font-semibold">
                {guests.confirmedPax} confirmed guests
              </strong>{" "}
              including plus-ones and extended family.
            </span>
          </p>
          <span className="shrink-0 text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Catering target: {guests.cateringTarget} pax
          </span>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div
            role="img"
            aria-label={`${guests.attending} attending, ${guests.pending} awaiting reply, ${guests.declined} declined of ${total} invited`}
            className="flex h-3 w-full overflow-hidden rounded-full bg-surface-highest"
          >
            <div
              className="h-full bg-secondary"
              style={{ width: `${attendingPct}%` }}
            />
            <div
              className="h-full bg-on-surface-variant/35"
              style={{ width: `${pendingPct}%` }}
            />
            <div
              className="h-full bg-surface-high"
              style={{ width: `${declinedPct}%` }}
            />
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-[12px] text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 rounded-full bg-secondary"
              />
              Attending ({guests.attending})
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 rounded-full bg-on-surface-variant/35"
              />
              Awaiting RSVP ({guests.pending})
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 rounded-full bg-surface-highest"
              />
              Declined ({guests.declined})
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
