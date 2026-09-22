import { ArrowRight, BellRing, Download, Table2 } from "lucide-react";
import Link from "next/link";

import type { GuestResponseSummary } from "@/types";

const inactiveChip =
  "inline-flex h-8 cursor-not-allowed items-center gap-1.5 bg-surface-container px-3 text-[11px] font-semibold tracking-[0.12em] uppercase opacity-90";

export function InvitationRsvpPanel({
  invitationId,
  guests,
}: {
  invitationId: string;
  guests: GuestResponseSummary | null;
}) {
  return (
    <section className="flex flex-col gap-6 bg-surface-lowest p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Guest responses
          </span>
          <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
            RSVP &amp; table allocations
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span aria-disabled="true" className={inactiveChip}>
            <Download aria-hidden size={14} />
            Export
          </span>
          <span aria-disabled="true" className={inactiveChip}>
            <Table2 aria-hidden size={14} />
            Seating map
          </span>
          <Link
            href={`/app/invitations/${invitationId}/rsvp`}
            className="inline-flex h-8 items-center gap-1.5 bg-primary px-3 text-[11px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Open RSVP
          </Link>
        </div>
      </div>

      {guests && guests.totalInvited > 0 ? (
        <>
          <div className="flex flex-col gap-2">
            <div
              role="img"
              aria-label={`${guests.attending} attending, ${guests.declined} declined, ${guests.pending} awaiting reply of ${guests.totalInvited} invited`}
              className="flex h-3 w-full gap-0.5 overflow-hidden bg-surface-container"
            >
              <div
                className="h-full bg-secondary"
                style={{
                  width: `${(guests.attending / guests.totalInvited) * 100}%`,
                }}
              />
              <div
                className="h-full bg-on-surface-variant/35"
                style={{
                  width: `${(guests.declined / guests.totalInvited) * 100}%`,
                }}
              />
              <div
                className="h-full bg-surface-highest"
                style={{
                  width: `${(guests.pending / guests.totalInvited) * 100}%`,
                }}
              />
            </div>

            <dl className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <span aria-hidden className="size-3 shrink-0 bg-secondary" />
                <dd className="text-[13px] leading-5">
                  <strong className="font-semibold">{guests.attending}</strong>{" "}
                  attending ({guests.confirmedPax} pax)
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-3 shrink-0 bg-on-surface-variant/35"
                />
                <dd className="text-[13px] leading-5 text-on-surface-variant">
                  <strong className="font-semibold">{guests.declined}</strong>{" "}
                  regretfully declined
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-3 shrink-0 bg-surface-highest"
                />
                <dd className="text-[13px] leading-5 text-on-surface-variant">
                  <strong className="font-semibold">{guests.pending}</strong>{" "}
                  awaiting reply
                </dd>
              </div>
            </dl>
          </div>

          {guests.pending > 0 ? (
            <div className="flex flex-col items-start justify-between gap-3 bg-surface-low p-3.5 sm:flex-row sm:items-center">
              <span className="flex items-center gap-2.5">
                <BellRing
                  aria-hidden
                  size={18}
                  className="shrink-0 text-secondary"
                />
                <span className="text-[13px] leading-5">
                  {guests.pending} guests have not confirmed their RSVP yet.
                </span>
              </span>
              <span
                aria-disabled="true"
                className="flex shrink-0 cursor-not-allowed items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase"
              >
                <span>Send gentle reminder</span>
                <ArrowRight aria-hidden size={14} />
              </span>
            </div>
          ) : null}
        </>
      ) : (
        <p className="bg-surface-low p-4 text-[13px] leading-relaxed text-on-surface-variant">
          Guest responses will appear here once this invitation is published and
          personalized links are dispatched.
        </p>
      )}
    </section>
  );
}
