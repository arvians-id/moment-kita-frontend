import { mockRsvpManagementByInvitation } from "@/data/mocks/rsvp-management";
import { getGuestManagement } from "@/services/customer/guest-management-service";
import type { RsvpManagementData } from "@/types";

function defaultDeadline(eventDate: string): string {
  const deadline = new Date(eventDate);
  deadline.setDate(deadline.getDate() - 14);
  return deadline.toISOString().slice(0, 10);
}

/**
 * Resolves RSVP-specific response metadata alongside the canonical guest
 * directory. A future BFF can replace this service without changing the page.
 */
export async function getRsvpManagement(
  invitationId: string,
): Promise<RsvpManagementData | null> {
  const management = await getGuestManagement(invitationId);
  if (!management) return null;

  const record = mockRsvpManagementByInvitation[invitationId];

  return {
    invitation: management.invitation,
    guests: management.guests.map((guest) => ({ ...guest })),
    groups: [...management.groups],
    responses:
      record?.responses.map((response) => ({ ...response })) ??
      management.guests.map((guest) => ({
        guestId: guest.id,
        message: "",
        respondedAt: null,
        source: "guest_link" as const,
      })),
    publicResponses:
      record?.publicResponses.map((response) => ({ ...response })) ?? [],
    settings: record
      ? { ...record.settings }
      : {
          enabled: management.invitation.status !== "cancelled",
          accessMode: "guest_list_only",
          deadline: defaultDeadline(management.invitation.eventDate),
        },
  };
}
