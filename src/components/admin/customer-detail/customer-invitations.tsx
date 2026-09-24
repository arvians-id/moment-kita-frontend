import { CalendarDays, ExternalLink, MailOpen } from "lucide-react";
import Link from "next/link";

import type { AdminCustomerInvitation } from "@/types";

import { dateFormat, titleCase } from "./customer-detail-formatters";

const invitationStatusClass: Record<AdminCustomerInvitation["status"], string> =
  {
    draft: "bg-surface-container text-on-surface-variant",
    finalized: "bg-blue-100 text-blue-900",
    published: "bg-emerald-100 text-emerald-900",
    expired: "bg-amber-100 text-amber-900",
    cancelled: "bg-error-container text-on-error-container",
  };

function StatusBadge({ status }: Pick<AdminCustomerInvitation, "status">) {
  return (
    <span
      className={`inline-flex px-2 py-1 text-[9px] font-semibold tracking-[0.1em] uppercase ${invitationStatusClass[status]}`}
    >
      {titleCase(status)}
    </span>
  );
}

export function CustomerInvitations({
  invitations,
}: {
  invitations: AdminCustomerInvitation[];
}) {
  return (
    <section
      role="tabpanel"
      className="border border-border bg-surface-lowest shadow-sm"
    >
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            Celebration Suites
          </p>
          <h2 className="mt-1 font-serif text-[25px] leading-8">
            Customer invitations
          </h2>
          <p className="mt-1 text-[11px] text-on-surface-variant">
            Invitations owned by this customer profile.
          </p>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          {invitations.length} total
        </span>
      </div>

      {invitations.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <MailOpen
            aria-hidden
            size={30}
            className="mx-auto text-on-surface-variant"
          />
          <h3 className="mt-3 font-serif text-[21px]">No invitations yet</h3>
          <p className="mt-1 text-[11px] text-on-surface-variant">
            This customer does not own an invitation suite.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden md:block">
            <table className="w-full table-fixed text-left">
              <thead className="bg-surface-low text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                <tr>
                  <th className="w-[31%] px-5 py-3">Couple / Wedding</th>
                  <th className="w-[13%] px-4 py-3">Status</th>
                  <th className="w-[16%] px-4 py-3">Wedding Date</th>
                  <th className="w-[18%] px-4 py-3">Template</th>
                  <th className="hidden w-[15%] px-4 py-3 xl:table-cell">
                    Expiration
                  </th>
                  <th className="w-[9%] px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invitations.map((invitation) => (
                  <tr key={invitation.id} className="hover:bg-surface-low/70">
                    <td className="px-5 py-4">
                      <p className="truncate text-[12px] font-semibold">
                        {invitation.coupleLabel}
                      </p>
                      <p className="mt-1 truncate font-mono text-[9px] text-on-surface-variant">
                        {invitation.id}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={invitation.status} />
                    </td>
                    <td className="px-4 py-4 text-[11px] text-on-surface-variant">
                      {dateFormat.format(new Date(invitation.eventDate))}
                    </td>
                    <td className="px-4 py-4 text-[11px]">
                      {invitation.templateName}
                    </td>
                    <td className="hidden px-4 py-4 text-[11px] text-on-surface-variant xl:table-cell">
                      {invitation.expiresAt
                        ? dateFormat.format(new Date(invitation.expiresAt))
                        : "Starts on publish"}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/admin/invitations/${invitation.id}`}
                        prefetch={false}
                        aria-label={`Open ${invitation.coupleLabel}`}
                        className="inline-grid size-9 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary"
                      >
                        <ExternalLink aria-hidden size={15} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-border md:hidden">
            {invitations.map((invitation) => (
              <li key={invitation.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[13px] leading-5 font-semibold">
                      {invitation.coupleLabel}
                    </h3>
                    <p className="mt-1 text-[10px] text-on-surface-variant">
                      {invitation.templateName}
                    </p>
                  </div>
                  <StatusBadge status={invitation.status} />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-on-surface-variant">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays aria-hidden size={12} />
                    {dateFormat.format(new Date(invitation.eventDate))}
                  </span>
                  <span>
                    Expires:{" "}
                    {invitation.expiresAt
                      ? dateFormat.format(new Date(invitation.expiresAt))
                      : "on first publish"}
                  </span>
                </div>
                <Link
                  href={`/admin/invitations/${invitation.id}`}
                  prefetch={false}
                  className="mt-4 inline-flex min-h-9 items-center gap-2 bg-surface-container px-3 text-[9px] font-semibold tracking-[0.1em] uppercase"
                >
                  View Invitation <ExternalLink aria-hidden size={13} />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
