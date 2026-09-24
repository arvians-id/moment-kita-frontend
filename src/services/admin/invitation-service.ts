import { getReservedSlugs } from "@/data/mocks/reserved-slugs";
import { mockInvitationLifecycle } from "@/data/mocks/admin";
import { mockAdminCustomerDetails } from "@/data/mocks/admin-customers";
import { buildAdminInvitationDetailSupplement } from "@/data/mocks/admin-invitation-details";
import {
  createMockBuilderContent,
  mockBuilderSections,
} from "@/data/mocks/invitation-builder";
import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import type {
  AdminInvitationEditorData,
  AdminInvitationDetailData,
  AdminInvitationListData,
  AdminInvitationListItem,
  AdminInvitationSummary,
  InvitationStatus,
  CustomerInvitation,
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

/**
 * Admin editor read model. It adapts the Admin dossier into the shared
 * invitation-builder model so content structure and preview behavior cannot
 * drift between Customer and Admin editing surfaces.
 */
export async function getAdminInvitationEditor(
  invitationId: string,
): Promise<AdminInvitationEditorData | null> {
  const detail = await getAdminInvitationDetail(invitationId);
  if (!detail) return null;

  const source = detail.invitation;
  const editorCoupleLabel = source.coupleLabel.split(" — ")[0];
  const invitation: CustomerInvitation = {
    id: source.id,
    slug: source.slug,
    coupleLabel: editorCoupleLabel,
    title: source.coupleLabel,
    status: source.status,
    eventDate: source.eventDate,
    venue: source.venue,
    templateName: source.templateName,
    guestCount: detail.engagement.guests.totalInvited,
    confirmedCount: detail.engagement.guests.attending,
    expiresAt: source.expiresAt ?? undefined,
    lastModifiedLabel: detail.versions[0]?.savedAt,
    readinessNote:
      source.status === "finalized"
        ? "Content is finalized and ready for an explicit Publish action."
        : undefined,
    cancelledNote:
      source.status === "cancelled"
        ? "Cancelled by an Admin operator. Content remains preserved."
        : undefined,
  };

  return {
    detail,
    invitation,
    sections: mockBuilderSections.map((section) => ({ ...section })),
    content: createMockBuilderContent(invitation),
    templates: mockTemplateCatalog.map((template) => ({ ...template })),
    reservedSlugs: getReservedSlugs(detail.invitation.slug),
  };
}
