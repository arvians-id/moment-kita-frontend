import {
  mockAdminAccountSettings,
  mockAdminGeneralSettings,
  mockAdminSettingsNotificationPreferences,
} from "@/data/mocks/admin-settings";
import { getAdminUser } from "@/services/admin/dashboard-service";
import type { AdminSettingsData } from "@/types";

/**
 * Admin settings read boundary. Writes remain browser-session mock behavior
 * until an authenticated Admin BFF exists.
 */
export async function getAdminSettings(): Promise<AdminSettingsData> {
  const admin = await getAdminUser();

  return {
    general: { ...mockAdminGeneralSettings },
    account: {
      ...admin,
      email: mockAdminAccountSettings.email,
      passwordUpdatedLabel: mockAdminAccountSettings.passwordUpdatedLabel,
      currentSession: { ...mockAdminAccountSettings.currentSession },
    },
    notificationPreferences: mockAdminSettingsNotificationPreferences.map(
      (preference) => ({ ...preference }),
    ),
  };
}
