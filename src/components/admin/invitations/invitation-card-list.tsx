import { CalendarDays, Eye, Link2, UserRound } from "lucide-react";
import Link from "next/link";

import { InvitationRowActions } from "@/components/admin/invitations/invitation-row-actions";
import type { InvitationLifecycleAction } from "@/components/admin/invitations/invitation-row-actions";
import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import type { AdminInvitationListItem } from "@/types";

import {
  expirationLabel,
  invitationDateFormat,
  publicPath,
} from "./invitation-list-utils";

export function InvitationCardList({
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
    <ul className="grid gap-3 sm:grid-cols-2 xl:hidden">
      {invitations.map((invitation) => (
        <li
          key={invitation.id}
          className={`relative border border-border bg-surface-lowest p-4 shadow-sm ${invitation.status === "expired" || invitation.status === "cancelled" ? "bg-surface-low/40" : ""}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <InvitationStatusBadge
                status={invitation.status}
                className="rounded-none"
              />
              <h2
                className={`mt-3 font-serif text-[18px] leading-6 ${invitation.status === "cancelled" ? "text-on-surface-variant line-through" : ""}`}
              >
                {invitation.coupleLabel}
              </h2>
              <p className="mt-1 truncate text-[10px] text-on-surface-variant">
                {invitation.venue}
              </p>
            </div>
            <InvitationRowActions
              invitation={invitation}
              isOpen={openActionId === invitation.id}
              onToggle={() => onToggleActions(invitation.id)}
              onAction={(action) => onAction(invitation, action)}
            />
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-3 text-[10px] text-on-surface-variant">
            <Link
              href={`/admin/customers/${invitation.customer.id}`}
              className="flex min-w-0 items-center gap-2 transition-colors hover:text-secondary"
            >
              <UserRound aria-hidden size={13} className="shrink-0" />
              <span className="truncate font-semibold text-on-surface">
                {invitation.customer.name}
              </span>
              <span className="shrink-0 text-[8px] font-semibold tracking-[0.08em] uppercase">
                {invitation.customer.linkedUserId ? "Registered" : "Managed"}
              </span>
            </Link>
            <p className="flex min-w-0 items-center gap-2 text-secondary">
              <Link2 aria-hidden size={13} className="shrink-0" />
              <span className="truncate">{publicPath(invitation)}</span>
            </p>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 bg-surface-low p-3">
            <div>
              <dt className="text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                Wedding
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold">
                <CalendarDays aria-hidden size={11} />
                {invitationDateFormat.format(new Date(invitation.eventDate))}
              </dd>
            </div>
            <div>
              <dt className="text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                Expiration
              </dt>
              <dd className="mt-1 text-[10px] font-semibold">
                {expirationLabel(invitation)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-[9px] text-on-surface-variant">
              {invitation.templateName}
            </p>
            <Link
              href={`/admin/invitations/${invitation.id}`}
              prefetch={false}
              className="inline-flex min-h-9 shrink-0 items-center gap-2 bg-primary px-3 text-[9px] font-semibold tracking-[0.1em] text-primary-foreground uppercase"
            >
              <Eye aria-hidden size={13} /> View
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
