import { CalendarDays, Link2 } from "lucide-react";
import Link from "next/link";

import { InvitationRowActions } from "@/components/admin/invitations/invitation-row-actions";
import type { InvitationLifecycleAction } from "@/components/admin/invitations/invitation-row-actions";
import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import { publicConfig } from "@/lib/config";
import type { AdminInvitationListItem } from "@/types";

import {
  expirationLabel,
  invitationDateFormat,
  publicPath,
} from "./invitation-list-utils";

const publicHost = publicConfig.appUrl.replace(/^https?:\/\//, "");

export function InvitationTable({
  invitations,
  openActionId,
  onToggleActions,
  onAction,
}: {
  invitations: AdminInvitationListItem[];
  openActionId: string | null;
  onToggleActions: (id: string) => void;
  onAction: (
    invitation: AdminInvitationListItem,
    action: InvitationLifecycleAction,
  ) => void;
}) {
  return (
    <div className="hidden border border-border bg-surface-lowest shadow-sm xl:block">
      <table className="w-full table-fixed text-left">
        <thead className="bg-surface-low text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
          <tr>
            <th className="w-[21%] px-4 py-3">Couple / Wedding</th>
            <th className="w-[14%] px-3 py-3">Customer</th>
            <th className="w-[16%] px-3 py-3">Slug / Public URL</th>
            <th className="w-[12%] px-3 py-3">Template</th>
            <th className="w-[11%] px-3 py-3">Status</th>
            <th className="w-[11%] px-3 py-3">Wedding Date</th>
            <th className="w-[11%] px-3 py-3">Publication / Expiry</th>
            <th className="w-[4%] px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {invitations.map((invitation) => {
            const subdued =
              invitation.status === "expired" ||
              invitation.status === "cancelled";

            return (
              <tr
                key={invitation.id}
                className={`transition-colors hover:bg-surface-low/75 ${subdued ? "bg-surface-low/25" : ""}`}
              >
                <td className="px-4 py-4 align-middle">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/invitations/${invitation.id}`}
                      prefetch={false}
                      className={`block truncate font-serif text-[15px] leading-5 transition-colors hover:text-secondary ${invitation.status === "cancelled" ? "text-on-surface-variant line-through" : "text-primary"}`}
                    >
                      {invitation.coupleLabel}
                    </Link>
                    <p className="mt-1 truncate text-[9px] text-on-surface-variant">
                      {invitation.venue}
                    </p>
                    <p className="mt-1 truncate font-mono text-[8px] tracking-[0.08em] text-secondary uppercase">
                      {invitation.id}
                    </p>
                  </div>
                </td>
                <td className="px-3 py-4 align-middle">
                  <Link
                    href={`/admin/customers/${invitation.customer.id}`}
                    className="block truncate text-[11px] font-semibold transition-colors hover:text-secondary"
                  >
                    {invitation.customer.name}
                  </Link>
                  <p className="mt-1 text-[8px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
                    {invitation.customer.linkedUserId
                      ? "Registered"
                      : "Managed · No login"}
                  </p>
                </td>
                <td className="px-3 py-4 align-middle">
                  <p className="flex min-w-0 items-center gap-1.5 text-[10px]">
                    <Link2
                      aria-hidden
                      size={12}
                      className="shrink-0 text-secondary"
                    />
                    <span className="truncate">{publicPath(invitation)}</span>
                  </p>
                  <p className="mt-1 truncate text-[8px] text-on-surface-variant">
                    {publicHost}
                    {publicPath(invitation)}
                  </p>
                </td>
                <td className="px-3 py-4 align-middle text-[10px] leading-4">
                  {invitation.templateName}
                </td>
                <td className="px-3 py-4 align-middle">
                  <InvitationStatusBadge
                    status={invitation.status}
                    className="rounded-none px-2"
                  />
                </td>
                <td className="px-3 py-4 align-middle">
                  <p className="flex items-center gap-1.5 text-[10px] whitespace-nowrap">
                    <CalendarDays
                      aria-hidden
                      size={12}
                      className="shrink-0 text-on-surface-variant"
                    />
                    {invitationDateFormat.format(
                      new Date(invitation.eventDate),
                    )}
                  </p>
                </td>
                <td className="px-3 py-4 align-middle text-[9px] leading-4 text-on-surface-variant">
                  <p>
                    Published:{" "}
                    {invitation.publishedAt
                      ? invitationDateFormat.format(
                          new Date(invitation.publishedAt),
                        )
                      : "Not yet"}
                  </p>
                  <p className="mt-1">Expires: {expirationLabel(invitation)}</p>
                </td>
                <td className="px-3 py-4 text-right align-middle">
                  <InvitationRowActions
                    invitation={invitation}
                    isOpen={openActionId === invitation.id}
                    onToggle={() => onToggleActions(invitation.id)}
                    onAction={(action) => onAction(invitation, action)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
