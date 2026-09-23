import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import { mockPackages } from "@/data/mocks/packages";
import { getAdminCustomers } from "@/services/admin/customer-service";
import { getAdminInvitationList } from "@/services/admin/invitation-service";
import type { AdminCreateInvitationData, CatalogTemplate } from "@/types";

const ADMIN_TEMPLATE_KEYS = [
  "chateau-de-chantilly",
  "aura-blanche",
  "botanique-vivace",
  "kyoto-monochrome",
  "nordic-fjord",
  "ethereal-ranunculus",
];

/**
 * Read model for the Admin draft wizard. It composes existing customer,
 * invitation, template, and package sources rather than owning copies.
 */
export async function getAdminCreateInvitationData(): Promise<AdminCreateInvitationData> {
  const [customers, invitationList] = await Promise.all([
    getAdminCustomers(),
    getAdminInvitationList(),
  ]);
  const templates = ADMIN_TEMPLATE_KEYS.map((key) =>
    mockTemplateCatalog.find((template) => template.key === key),
  ).filter((template): template is CatalogTemplate => Boolean(template));

  return {
    customers,
    templates: templates.map((template) => ({ ...template })),
    packages: mockPackages.map((item) => ({
      ...item,
      features: [...item.features],
    })),
    reservedSlugs: invitationList.invitations.map((item) => item.slug),
    defaultTemplateKey: "chateau-de-chantilly",
    defaultPackageId: "signature",
  };
}
