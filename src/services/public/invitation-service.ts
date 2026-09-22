import { mockInvitations } from "@/data/mocks/invitations";
import type { PublicInvitation } from "@/types";

export async function getPublicInvitationBySlug(
  slug: string,
): Promise<PublicInvitation | null> {
  const invitation = mockInvitations.find((item) => item.slug === slug);

  return invitation
    ? {
        ...invitation,
        couple: { ...invitation.couple },
        template: { ...invitation.template },
      }
    : null;
}
