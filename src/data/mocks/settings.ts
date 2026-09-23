import type {
  AccountSession,
  CustomerProfileDetails,
  CustomerSecurity,
  NotificationPreferenceItem,
} from "@/types";

export const mockCustomerProfileDetails: CustomerProfileDetails = {
  whatsappNumber: "82212345678",
  memberSince: "September 2026",
};

export const mockAccountSessions: readonly AccountSession[] = [
  {
    id: "session_01",
    device: "MacBook Pro (Chrome)",
    location: "Jakarta, Indonesia",
    lastActiveLabel: "Active now",
    isCurrentDevice: true,
  },
  {
    id: "session_02",
    device: "iPhone 15 Pro (Safari)",
    location: "Bandung, Indonesia",
    lastActiveLabel: "Last seen yesterday at 21:40 WIB",
    isCurrentDevice: false,
  },
];

export const mockCustomerSecurity: CustomerSecurity = {
  signInMethod: "google",
  googleEmail: "widdy@gmail.com",
  hasPassword: true,
  passwordUpdatedLabel: "Updated 12 Sep 2026",
  sessions: [...mockAccountSessions],
};

export const mockNotificationPreferences: readonly NotificationPreferenceItem[] =
  [
    {
      id: "pref_wedding_status",
      category: "wedding",
      title: "Invitation Status & Publishing",
      description:
        "Published, suspended, or finalized status changes for your invitations.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "pref_wedding_lifecycle",
      category: "wedding",
      title: "Expiration & Extension Updates",
      description:
        "Advance notice before hosting ends, and confirmation when validity is extended.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "pref_guests_rsvp",
      category: "guestsRsvp",
      title: "RSVP Activity",
      description: "New RSVP responses and attendance milestones.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "pref_guests_import",
      category: "guestsRsvp",
      title: "Guest Import Results",
      description: "Import diagnostics, including rows that need your review.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "pref_wishes",
      category: "wishes",
      title: "New Wishes & Approvals",
      description:
        "New guest wishes, including ones waiting for your moderation.",
      inApp: true,
      email: false,
      mandatory: false,
    },
    {
      id: "pref_payments_verification",
      category: "payments",
      title: "Payment Verification Updates",
      description: "Status while a manual bank transfer is being reconciled.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "pref_payments_activation",
      category: "payments",
      title: "Package & Extension Activation",
      description:
        "When a purchased package, quota, or extension becomes active.",
      inApp: true,
      email: true,
      mandatory: false,
    },
    {
      id: "pref_payments_receipts",
      category: "payments",
      title: "Payment Confirmations & Receipts",
      description:
        "Proof-of-payment records. Always sent for your statutory records.",
      inApp: true,
      email: true,
      mandatory: true,
    },
    {
      id: "pref_account_security",
      category: "account",
      title: "Account & Security Alerts",
      description:
        "Sign-ins from a new device and other important account activity.",
      inApp: true,
      email: true,
      mandatory: true,
    },
  ];
