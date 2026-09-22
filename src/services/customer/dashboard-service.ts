import {
  mockActivity,
  mockCustomer,
  mockCustomerAlert,
  mockCustomerInvitations,
  mockEngagement,
  mockEntitlement,
  mockGuestSummary,
} from "@/data/mocks/customer";
import type {
  Customer,
  CustomerDashboardData,
  CustomerInvitation,
} from "@/types";

/**
 * Customer service boundary.
 *
 * Every read goes through here so the mock source can later be swapped for the
 * same-origin BFF without touching pages or components.
 */

const MS_PER_DAY = 86_400_000;

/** Whole days from today until the ceremony; negative dates clamp to zero. */
function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = new Date(isoDate);
  if (Number.isNaN(target.getTime())) return 0;

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

  return Math.max(0, Math.round((startOfTarget - startOfToday) / MS_PER_DAY));
}

export async function getCustomer(): Promise<Customer> {
  return { ...mockCustomer };
}

export async function getCustomerInvitations(): Promise<CustomerInvitation[]> {
  return mockCustomerInvitations.map((invitation) => ({ ...invitation }));
}

/**
 * The invitation currently in context. For now this is the first published
 * invitation, falling back to the most recent one; later it will follow the
 * customer's selected wedding.
 */
export async function getCurrentInvitation(): Promise<CustomerInvitation | null> {
  const invitations = await getCustomerInvitations();
  if (invitations.length === 0) return null;

  return (
    invitations.find((invitation) => invitation.status === "published") ??
    invitations[0]
  );
}

export async function getCustomerDashboard(): Promise<CustomerDashboardData> {
  const [customer, invitations, currentInvitation] = await Promise.all([
    getCustomer(),
    getCustomerInvitations(),
    getCurrentInvitation(),
  ]);

  return {
    customer,
    invitations,
    currentInvitation,
    daysUntilWedding: currentInvitation
      ? daysUntil(currentInvitation.eventDate)
      : null,
    guests: { ...mockGuestSummary },
    engagement: {
      ...mockEngagement,
      topLocations: [...mockEngagement.topLocations],
      featuredWish: { ...mockEngagement.featuredWish },
    },
    entitlement: {
      ...mockEntitlement,
      features: [...mockEntitlement.features],
    },
    activity: mockActivity.map((entry) => ({ ...entry })),
    alert: currentInvitation ? { ...mockCustomerAlert } : null,
  };
}
