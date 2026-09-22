import { Eye, Heart, Pencil, Plus } from "lucide-react";
import Link from "next/link";

import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { CustomerInvitation } from "@/types";

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function InvitationsPortfolio({
  invitations,
  currentInvitationId,
}: {
  invitations: CustomerInvitation[];
  currentInvitationId: string | null;
}) {
  return (
    <section className="flex flex-col gap-6 rounded-[12px] bg-surface-lowest p-6 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Celebration suites
          </span>
          <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
            My Invitations
          </h2>
        </div>
        <span className="inline-flex cursor-not-allowed items-center gap-1.5 bg-surface-container px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
          <Plus aria-hidden size={13} />
          New Invitation
        </span>
      </div>

      <ul className="flex flex-col gap-3.5">
        {invitations.map((invitation) => {
          const isCurrent = invitation.id === currentInvitationId;
          return (
            <li
              key={invitation.id}
              className="flex flex-col justify-between gap-4 rounded-[12px] bg-surface-low p-4 transition-colors hover:bg-surface-container sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <span
                  aria-hidden
                  className={`grid size-12 shrink-0 place-items-center rounded-[8px] bg-surface-high ${isCurrent ? "text-secondary" : "text-on-surface-variant"}`}
                >
                  <Heart size={22} />
                </span>
                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-[15px] leading-6 font-semibold">
                      {invitation.title}
                    </span>
                    <InvitationStatusBadge status={invitation.status} />
                  </div>
                  <span className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
                    {shortDateFormatter.format(new Date(invitation.eventDate))}{" "}
                    • {invitation.guestCount} guests •{" "}
                    {invitation.confirmedCount} confirmed
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                <span
                  aria-disabled="true"
                  title="Edit invitation"
                  className="grid size-9 cursor-not-allowed place-items-center rounded-[6px] bg-surface text-on-surface-variant"
                >
                  <Pencil aria-hidden size={16} />
                </span>
                {invitation.status === "published" ? (
                  <Link
                    href={`/${invitation.slug}`}
                    title="View live invitation"
                    aria-label={`View ${invitation.coupleLabel} invitation`}
                    className="grid size-9 place-items-center rounded-[6px] bg-surface transition-colors hover:text-secondary"
                  >
                    <Eye aria-hidden size={16} />
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-[6px] bg-surface px-3 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Continue
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
