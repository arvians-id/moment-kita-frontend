import {
  mockCustomerInvitations,
  mockEntitlement,
} from "@/data/mocks/customer";
import {
  createMockBuilderContent,
  mockBuilderSections,
} from "@/data/mocks/invitation-builder";
import type { InvitationBuilderData } from "@/types";

/**
 * Resolves one invitation's editor workspace. The page consumes this boundary
 * so a future BFF can replace mocks without changing the builder UI.
 */
export async function getInvitationBuilder(
  invitationId: string,
): Promise<InvitationBuilderData | null> {
  const source = mockCustomerInvitations.find(
    (invitation) => invitation.id === invitationId,
  );
  if (!source) return null;

  const invitation = {
    ...source,
    metrics: source.metrics ? { ...source.metrics } : undefined,
    progress: source.progress ? { ...source.progress } : undefined,
    archive: source.archive ? { ...source.archive } : undefined,
  };

  return {
    invitation,
    entitlement: {
      ...mockEntitlement,
      features: [...mockEntitlement.features],
    },
    sections: mockBuilderSections.map((section) => ({ ...section })),
    content: createMockBuilderContent(invitation),
  };
}
