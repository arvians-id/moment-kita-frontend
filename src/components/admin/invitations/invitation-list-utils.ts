import type { AdminInvitationListItem, InvitationStatus } from "@/types";

export const invitationDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export const statusLabel: Record<InvitationStatus, string> = {
  draft: "Draft",
  finalized: "Finalized",
  published: "Published",
  expired: "Expired",
  cancelled: "Cancelled",
};

export function publicPath(invitation: AdminInvitationListItem): string {
  return `/${invitation.slug}`;
}

export function expirationLabel(invitation: AdminInvitationListItem): string {
  if (invitation.status === "cancelled") return "Cancelled";
  if (!invitation.expiresAt) return "Starts on first publish";
  return invitationDateFormat.format(new Date(invitation.expiresAt));
}
