import type {
  NotificationPreferenceCategory,
  NotificationPreferenceItem,
} from "@/types";

export const WHATSAPP_COUNTRY_PREFIX = "+62";

/** Keeps only digits and drops a leading 0 (Indonesian local-number convention). */
export function sanitizeWhatsappInput(raw: string): string {
  const digitsOnly = raw.replace(/\D/g, "");
  return digitsOnly.replace(/^0+/, "");
}

/** Groups digits for display, e.g. "82212345678" -> "822 1234 5678". */
export function formatWhatsappForDisplay(local: string): string {
  const digits = sanitizeWhatsappInput(local);
  const groups = [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7, 11)];
  return groups.filter(Boolean).join(" ");
}

export function isValidWhatsappNumber(local: string): boolean {
  const digits = sanitizeWhatsappInput(local);
  return digits.length >= 8 && digits.length <= 13;
}

export interface NotificationPreferenceGroup {
  category: NotificationPreferenceCategory;
  label: string;
  description: string;
  items: NotificationPreferenceItem[];
}

const categoryOrder: {
  category: NotificationPreferenceCategory;
  label: string;
  description: string;
}[] = [
  {
    category: "wedding",
    label: "Wedding & Invitations",
    description: "Publishing status, hosting validity, and extensions.",
  },
  {
    category: "guestsRsvp",
    label: "Guests & RSVP",
    description: "Attendance responses and guest list imports.",
  },
  {
    category: "wishes",
    label: "Wishes",
    description: "Guestbook messages and moderation.",
  },
  {
    category: "payments",
    label: "Payments",
    description: "Verification, activation, and receipts.",
  },
  {
    category: "account",
    label: "Account",
    description: "Security and important account activity.",
  },
];

export function groupPreferencesByCategory(
  items: NotificationPreferenceItem[],
): NotificationPreferenceGroup[] {
  return categoryOrder
    .map((group) => ({
      ...group,
      items: items.filter((item) => item.category === group.category),
    }))
    .filter((group) => group.items.length > 0);
}

export interface PasswordRuleCheck {
  label: string;
  met: boolean;
}

export function getPasswordRuleChecks(password: string): PasswordRuleCheck[] {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    {
      label: "Includes letters & numbers",
      met: /[a-zA-Z]/.test(password) && /\d/.test(password),
    },
  ];
}

export function isPasswordValid(password: string): boolean {
  return getPasswordRuleChecks(password).every((rule) => rule.met);
}

/** Up to two initials from the first and last words of a display name. */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0]!.charAt(0).toUpperCase();
  return (
    words[0]!.charAt(0) + words[words.length - 1]!.charAt(0)
  ).toUpperCase();
}
