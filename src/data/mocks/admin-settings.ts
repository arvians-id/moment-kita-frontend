import type {
  AdminGeneralSettings,
  AdminSettingsNotificationPreference,
  AdminSettingsSession,
} from "@/types";

export const mockAdminGeneralSettings: AdminGeneralSettings = {
  platformName: "Moment Kita",
  supportEmail: "concierge@momentkita.id",
  supportWhatsapp: "+62 811-2345-8890",
  timezone: "Asia/Jakarta",
  locale: "id-ID",
};

export const mockAdminAccountSettings = {
  email: "admin@momentkita.id",
  passwordUpdatedLabel: "Updated 12 Sep 2026",
  currentSession: {
    device: "MacBook Air · Codex Console",
    location: "Jakarta, Indonesia",
    lastActiveLabel: "Active now",
  } satisfies AdminSettingsSession,
} as const;

export const mockAdminSettingsNotificationPreferences: readonly AdminSettingsNotificationPreference[] =
  [
    {
      id: "admin_pref_payment_verification",
      category: "payments",
      title: "Payment Verification Alerts",
      description:
        "Notify the studio when manual payment proof is submitted or requires review.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "admin_pref_invitation_expiration",
      category: "invitations",
      title: "Invitation Expiration Alerts",
      description:
        "Surface reminders before a published invitation reaches the end of its hosting window.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "admin_pref_printed_orders",
      category: "printedOrders",
      title: "Printed Order Alerts",
      description:
        "Notify the studio when an order needs production, swatch, or dispatch attention.",
      inApp: true,
      email: false,
      mandatory: false,
    },
    {
      id: "admin_pref_moderation",
      category: "moderation",
      title: "Moderation Alerts",
      description:
        "Surface invitations with guest wishes waiting for an Admin decision.",
      inApp: true,
      email: false,
      mandatory: false,
    },
  ];
