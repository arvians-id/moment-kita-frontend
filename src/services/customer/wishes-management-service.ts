import { mockWishesManagementByInvitation } from "@/data/mocks/wishes-management";
import { getGuestManagement } from "@/services/customer/guest-management-service";
import type { WishesManagementData } from "@/types";

/**
 * Resolves one invitation's guestbook against the canonical guest directory.
 * The service boundary can later be replaced by Customer BFF reads.
 */
export async function getWishesManagement(
  invitationId: string,
): Promise<WishesManagementData | null> {
  const management = await getGuestManagement(invitationId);
  if (!management) return null;

  const record = mockWishesManagementByInvitation[invitationId];

  return {
    invitation: management.invitation,
    guests: management.guests.map((guest) => ({ ...guest })),
    wishes: record?.wishes.map((wish) => ({ ...wish })) ?? [],
    settings: record
      ? { ...record.settings }
      : {
          enabled: management.invitation.status !== "cancelled",
          moderationMode: "automatic",
        },
  };
}
