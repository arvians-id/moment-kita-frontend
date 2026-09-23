import { mockInvitationLifecycle } from "@/data/mocks/admin";
import { mockAdminCustomerDetails } from "@/data/mocks/admin-customers";
import type {
  AdminInvitationListData,
  AdminInvitationListItem,
  AdminInvitationSummary,
  InvitationStatus,
} from "@/types";

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
  const invitations: AdminInvitationListItem[] = Array.from(
    mockAdminCustomerDetails.values(),
  ).flatMap((detail) =>
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

  return {
    invitations,
    summary: buildSummary(),
    templates: Array.from(
      new Set(invitations.map((invitation) => invitation.templateName)),
    ).sort((left, right) => left.localeCompare(right)),
  };
}
