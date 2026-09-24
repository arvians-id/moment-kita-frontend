import { mockAdminCustomerDetails } from "@/data/mocks/admin-customers";
import { mockCustomerInvitations } from "@/data/mocks/customer";

/**
 * Top-level paths the public invitation route (`/[slug]`) must never shadow.
 * Keep in sync with the folders under `src/app/(marketing)` and the app areas.
 */
const SYSTEM_RESERVED_SLUGS = [
  "about",
  "admin",
  "api",
  "app",
  "contact",
  "digital",
  "faq",
  "features",
  "forgot-password",
  "how-it-works",
  "login",
  "pricing",
  "printed",
  "register",
  "reset-password",
  "templates",
];

/**
 * Platform-wide unavailable slugs: system paths plus every invitation slug in
 * any status, regardless of which app is asking. `exceptSlug` lets an editor
 * keep the slug of the invitation it is currently editing.
 */
export function getReservedSlugs(exceptSlug?: string): string[] {
  const invitationSlugs = [
    ...mockCustomerInvitations.map((invitation) => invitation.slug),
    ...Array.from(mockAdminCustomerDetails.values()).flatMap((detail) =>
      detail.invitations.map((invitation) => invitation.slug),
    ),
  ];

  return Array.from(
    new Set([...SYSTEM_RESERVED_SLUGS, ...invitationSlugs]),
  ).filter((slug) => slug !== exceptSlug);
}
