import { mockInvitationLifecycle } from "@/data/mocks/admin";
import { mockAdminCustomerDetails } from "@/data/mocks/admin-customers";
import { buildAdminInvitationDetailSupplement } from "@/data/mocks/admin-invitation-details";
import type {
  AdminInvitationDetailData,
  AdminInvitationListData,
  AdminInvitationListItem,
  AdminInvitationSummary,
  InvitationStatus,
} from "@/types";

function buildInvitations(): AdminInvitationListItem[] {
  return Array.from(mockAdminCustomerDetails.values()).flatMap((detail) =>
    detail.invitations.map((invitation) => ({
      ...invitation,
      customer: {
        id: detail.customer.id,
        name: detail.customer.name,
        accountType: detail.customer.accountType,
        linkedUserId: detail.customer.linkedUserId,
      },
    })),
  );
}

function lifecycleCount(status: InvitationStatus): number {
  return (
    mockInvitationLifecycle.find((entry) => entry.status === status)?.count ?? 0
  );
}

function buildSummary(): AdminInvitationSummary {
  const draft = lifecycleCount("draft");
  const finalized = lifecycleCount("finalized");
  const published = lifecycleCount("published");
  const expired = lifecycleCount("expired");
  const cancelled = lifecycleCount("cancelled");

  return {
    total: draft + finalized + published + expired + cancelled,
    draft,
    finalized,
    published,
    expired,
    cancelled,
  };
}

/**
 * Cross-customer Admin invitation registry. Customer Detail owns the current
 * mock invitation records; this service only enriches them with their owner so
 * the list and dossier cannot drift into separate sources of truth.
 */
export async function getAdminInvitationList(): Promise<AdminInvitationListData> {
  const invitations = buildInvitations();

  return {
    invitations,
    summary: buildSummary(),
    templates: Array.from(
      new Set(invitations.map((invitation) => invitation.templateName)),
    ).sort((left, right) => left.localeCompare(right)),
  };
}

export async function getAdminInvitationIds(): Promise<string[]> {
  return buildInvitations().map((invitation) => invitation.id);
}

export async function getAdminInvitationDetail(
  invitationId: string,
): Promise<AdminInvitationDetailData | null> {
  const invitation = buildInvitations().find(
    (item) => item.id === invitationId,
  );
  if (!invitation) return null;

  const owner = mockAdminCustomerDetails.get(invitation.customer.id);
  if (!owner) return null;

  const supplement = buildAdminInvitationDetailSupplement(invitation);

  return {
    invitation: {
      ...invitation,
      customer: { ...invitation.customer },
    },
    customer: { ...owner.customer },
    currentPackage: owner.currentPackage ? { ...owner.currentPackage } : null,
    ...supplement,
    recentGuests: supplement.recentGuests.map((guest) => ({ ...guest })),
    recentWishes: supplement.recentWishes.map((wish) => ({ ...wish })),
    gift: supplement.gift
      ? {
          ...supplement.gift,
          accounts: supplement.gift.accounts.map((account) => ({ ...account })),
          physicalAddress: supplement.gift.physicalAddress
            ? { ...supplement.gift.physicalAddress }
            : undefined,
        }
      : null,
    versions: supplement.versions.map((version) => ({ ...version })),
    activity: supplement.activity.map((entry) => ({ ...entry })),
    extensionHistory: supplement.extensionHistory.map((entry) => ({
      ...entry,
    })),
  };
}
