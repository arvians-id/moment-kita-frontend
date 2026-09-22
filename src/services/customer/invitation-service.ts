import {
  mockCustomerInvitations,
  mockEntitlement,
} from "@/data/mocks/customer";
import { mockInvitationDetails } from "@/data/mocks/invitation-detail";
import type {
  CustomerInvitation,
  EntitlementSummary,
  InvitationDetail,
  InvitationStatus,
} from "@/types";

/**
 * Invitation reads for the Customer CMS.
 *
 * Same boundary contract as the rest of `services/customer`: pages never touch
 * mock data directly, so the source can be swapped for the BFF later.
 */

export interface InvitationCounts {
  total: number;
  published: number;
  finalized: number;
  drafts: number;
  /** Expired and cancelled suites, grouped as "archived" in the UI. */
  archived: number;
}

export interface CustomerInvitationsOverview {
  invitations: CustomerInvitation[];
  entitlement: EntitlementSummary;
  counts: InvitationCounts;
}

const ARCHIVED_STATUSES: InvitationStatus[] = ["expired", "cancelled"];

function countBy(
  invitations: CustomerInvitation[],
  statuses: InvitationStatus[],
): number {
  return invitations.filter((item) => statuses.includes(item.status)).length;
}

function clone(invitation: CustomerInvitation): CustomerInvitation {
  return {
    ...invitation,
    metrics: invitation.metrics ? { ...invitation.metrics } : undefined,
    progress: invitation.progress ? { ...invitation.progress } : undefined,
    archive: invitation.archive ? { ...invitation.archive } : undefined,
  };
}

export async function getCustomerInvitationsOverview(): Promise<CustomerInvitationsOverview> {
  const invitations = mockCustomerInvitations.map(clone);

  return {
    invitations,
    entitlement: {
      ...mockEntitlement,
      features: [...mockEntitlement.features],
    },
    counts: {
      total: invitations.length,
      published: countBy(invitations, ["published"]),
      finalized: countBy(invitations, ["finalized"]),
      drafts: countBy(invitations, ["draft"]),
      archived: countBy(invitations, ARCHIVED_STATUSES),
    },
  };
}

const MS_PER_DAY = 86_400_000;

/**
 * Whole days from today until the ceremony. Returns null once the date has
 * passed, so callers can render a past-event state instead of a countdown.
 */
function daysUntil(isoDate: string, from: Date = new Date()): number | null {
  const target = new Date(isoDate);
  if (Number.isNaN(target.getTime())) return null;

  const startOfToday = Date.UTC(
    from.getUTCFullYear(),
    from.getUTCMonth(),
    from.getUTCDate(),
  );
  const startOfTarget = Date.UTC(
    target.getUTCFullYear(),
    target.getUTCMonth(),
    target.getUTCDate(),
  );

  const days = Math.round((startOfTarget - startOfToday) / MS_PER_DAY);
  return days >= 0 ? days : null;
}

/** One invitation's workspace payload, or null when the id is unknown. */
export async function getInvitationDetail(
  invitationId: string,
): Promise<InvitationDetail | null> {
  const source = mockCustomerInvitations.find(
    (item) => item.id === invitationId,
  );
  if (!source) return null;

  const invitation = clone(source);
  const record = mockInvitationDetails[invitationId] ?? {};

  return {
    invitation,
    daysUntilWedding: daysUntil(invitation.eventDate),
    guests: record.guests ? { ...record.guests } : null,
    linksSent: record.linksSent ?? 0,
    linksPending: record.linksPending ?? invitation.guestCount,
    recentGuests: (record.recentGuests ?? []).map((guest) => ({ ...guest })),
    wishes: (record.wishes ?? []).map((wish) => ({ ...wish })),
    gift: record.gift
      ? {
          accounts: record.gift.accounts.map((account) => ({ ...account })),
          deliveryAddress: record.gift.deliveryAddress,
        }
      : null,
    activity: (record.activity ?? []).map((entry) => ({ ...entry })),
    entitlement: {
      ...mockEntitlement,
      features: [...mockEntitlement.features],
    },
  };
}
