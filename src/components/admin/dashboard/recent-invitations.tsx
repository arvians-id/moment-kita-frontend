import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { RecentInvitation } from "@/types";
import Link from "next/link";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function RecentInvitationsList({
  invitations,
}: {
  invitations: RecentInvitation[];
}) {
  return (
    <section className="flex flex-col gap-4 border border-border bg-surface-lowest p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Invitations
          </span>
          <h2 className="font-serif text-[20px] leading-7 font-semibold">
            Recent Invitations
          </h2>
        </div>
        <Link
          href="/admin/invitations"
          className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:text-primary"
        >
          View all
        </Link>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {invitations.map((invitation) => (
          <li
            key={invitation.id}
            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-[13px] font-semibold">
                  {invitation.coupleLabel}
                </span>
                <InvitationStatusBadge status={invitation.status} />
              </div>
              <span className="mt-0.5 text-[12px] text-on-surface-variant">
                {invitation.customerName}
              </span>
            </div>
            <div className="flex shrink-0 flex-col text-[11px] text-on-surface-variant sm:text-right">
              <span>
                Wedding {dateFormat.format(new Date(invitation.eventDate))}
              </span>
              <span>
                {invitation.expiresAt
                  ? `Expires ${dateFormat.format(new Date(invitation.expiresAt))}`
                  : "Not yet published"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
