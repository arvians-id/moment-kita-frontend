import { mockDigitalGiftConfiguration } from "@/data/mocks/digital-gift-management";
import { getInvitationDetail } from "@/services/customer/invitation-service";
import type { DigitalGiftManagementData } from "@/types";

/**
 * Digital Gift management reads one invitation's shared gift content and adds
 * only the visibility settings required by this workspace.
 */
export async function getDigitalGiftManagement(
  invitationId: string,
): Promise<DigitalGiftManagementData | null> {
  const detail = await getInvitationDetail(invitationId);
  if (!detail) return null;

  const gift = detail.gift ?? { accounts: [] };
  const configuration = mockDigitalGiftConfiguration[invitationId] ?? {
    enabled: false,
    physicalGiftEnabled: false,
  };

  return {
    invitation: detail.invitation,
    gift: {
      accounts: gift.accounts.map((account) => ({ ...account })),
      deliveryAddress: gift.deliveryAddress,
      physicalAddress: gift.physicalAddress
        ? { ...gift.physicalAddress }
        : undefined,
    },
    configuration: { ...configuration },
  };
}
