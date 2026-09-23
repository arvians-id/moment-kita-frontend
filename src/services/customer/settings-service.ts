import { mockEntitlement } from "@/data/mocks/customer";
import {
  mockCustomerProfileDetails,
  mockCustomerSecurity,
  mockNotificationPreferences,
} from "@/data/mocks/settings";
import {
  getCurrentInvitation,
  getCustomer,
  getCustomerInvitations,
} from "@/services/customer/dashboard-service";
import type { SettingsOverview } from "@/types";

/**
 * Account settings reads for the Customer CMS.
 *
 * Same boundary contract as the rest of `services/customer`: pages never
 * touch mock data directly. Profile/security/notification-preference writes
 * are presentation-only for now (see the Settings client components) — there
 * is no write endpoint yet.
 */
export async function getSettingsOverview(): Promise<SettingsOverview> {
  const [customer, invitations, currentInvitation] = await Promise.all([
    getCustomer(),
    getCustomerInvitations(),
    getCurrentInvitation(),
  ]);

  return {
    customer,
    profile: { ...mockCustomerProfileDetails },
    security: {
      ...mockCustomerSecurity,
      sessions: mockCustomerSecurity.sessions.map((session) => ({
        ...session,
      })),
    },
    notificationPreferences: mockNotificationPreferences.map((item) => ({
      ...item,
    })),
    entitlement: {
      ...mockEntitlement,
      features: [...mockEntitlement.features],
    },
    currentInvitation,
    invitationCount: invitations.length,
  };
}
