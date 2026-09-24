import { mockAdminCustomerDetails } from "@/data/mocks/admin-customers";
import { mockCustomerInvitations } from "@/data/mocks/customer";
import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import type { PublicInvitation } from "@/types";

/**
 * Public projection of the shared invitation fixtures.
 *
 * Only `published` invitations are live and only `expired` ones resolve to an
 * "ended" page; draft, finalized, and cancelled invitations have no public
 * address at all. Derived from the Customer and Admin fixtures so the same
 * slug, couple, date, and template can never drift between the three apps.
 * No customer, quota, or transaction data is carried into this payload.
 */

interface PublicSource {
  slug: string;
  coupleLabel: string;
  status: string;
  eventDate: string;
  venue: string;
  templateName: string;
}

function toPublicInvitation(source: PublicSource): PublicInvitation | null {
  if (source.status !== "published" && source.status !== "expired") return null;

  const template = mockTemplateCatalog.find(
    (item) => item.name === source.templateName,
  );
  if (!template) return null;

  const [names] = source.coupleLabel.split(" — ");
  const [partnerOne = names, partnerTwo = ""] = names.split(" & ");

  return {
    slug: source.slug,
    availability: source.status === "published" ? "live" : "ended",
    couple: { partnerOne, partnerTwo },
    eventDate: source.eventDate,
    location: source.venue,
    template: {
      key: template.key,
      version: 1,
      rendererKey: `${template.key}@1`,
    },
    message:
      "With joy, we invite you to celebrate the beginning of our forever.",
  };
}

const adminInvitations = Array.from(mockAdminCustomerDetails.values()).flatMap(
  (detail) => detail.invitations,
);

const seen = new Set<string>();

export const mockInvitations: readonly PublicInvitation[] = [
  ...mockCustomerInvitations,
  ...adminInvitations,
].flatMap((source) => {
  const invitation = toPublicInvitation(source);
  if (!invitation || seen.has(invitation.slug)) return [];
  seen.add(invitation.slug);
  return [invitation];
});
