import { ArrowRight, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

import { publicConfig } from "@/lib/config";
import type { GuestRsvpStatus, InvitationGuestEntry } from "@/types";

const statusTone: Record<GuestRsvpStatus, string> = {
  confirmed: "bg-surface-lowest text-on-surface",
  declined: "bg-surface-container text-on-surface-variant",
  awaiting: "bg-terracotta-soft/35 text-accent-foreground",
};

export function InvitationGuestActivity({
  invitationId,
  guests,
  totalGuests,
}: {
  invitationId: string;
  guests: InvitationGuestEntry[];
  totalGuests: number;
}) {
  const host = publicConfig.publicHost;

  return (
    <section className="flex flex-col gap-5 bg-surface-lowest p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Recipient directory
          </span>
          <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
            Recent guest activity
          </h2>
        </div>
        <Link
          href={`/app/invitations/${invitationId}/guests`}
          className="flex items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-on-surface"
        >
          <span>Manage all {totalGuests} guests</span>
          <ArrowRight aria-hidden size={14} />
        </Link>
      </div>

      {guests.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {guests.map((guest) => (
            <li
              key={guest.id}
              className="flex flex-col justify-between gap-3 bg-surface-low p-3.5 transition-colors hover:bg-surface-container sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold ${
                    guest.rsvpStatus === "confirmed"
                      ? "bg-secondary/15 text-secondary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {guest.initials}
                </span>
                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-[15px] leading-6 font-medium">
                      {guest.name}
                    </span>
                    {guest.tag ? (
                      <span className="shrink-0 bg-surface-high px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                        {guest.tag}
                      </span>
                    ) : null}
                  </div>
                  <span className="truncate text-[13px] leading-5 text-on-surface-variant">
                    {guest.personalLink
                      ? `${host}/${guest.personalLink}`
                      : guest.note}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
                <span
                  className={`px-2.5 py-1 text-[13px] leading-5 font-medium ${statusTone[guest.rsvpStatus]}`}
                >
                  {guest.responseLabel}
                </span>
                <span
                  aria-hidden
                  className="cursor-not-allowed p-1 text-on-surface-variant"
                >
                  {guest.rsvpStatus === "awaiting" ? (
                    <Send size={17} />
                  ) : (
                    <MessageCircle size={17} />
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-surface-low p-4 text-[13px] leading-relaxed text-on-surface-variant">
          No guest activity yet. Once personalized links are dispatched, opens
          and RSVPs appear here.
        </p>
      )}
    </section>
  );
}
