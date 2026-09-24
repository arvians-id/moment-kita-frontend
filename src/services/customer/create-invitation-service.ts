import { getReservedSlugs } from "@/data/mocks/reserved-slugs";
import { mockEntitlement } from "@/data/mocks/customer";
import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import type { CatalogTemplate, EntitlementSummary } from "@/types";

export interface CreateInvitationPageData {
  templates: CatalogTemplate[];
  defaultTemplateKey: string;
  reservedSlugs: string[];
  entitlement: EntitlementSummary;
}

const FEATURED_TEMPLATE_KEYS = [
  "chateau-de-chantilly",
  "aura-blanche",
  "botanique-vivace",
  "nordic-fjord",
];

/**
 * Data required by the draft creation workspace.
 *
 * Keeping this behind a customer service boundary lets a future BFF provide
 * template availability, entitlement, and live slug reservations without
 * changing the page or its interactive form.
 */
export async function getCreateInvitationPageData(): Promise<CreateInvitationPageData> {
  const templates = FEATURED_TEMPLATE_KEYS.map((key) =>
    mockTemplateCatalog.find((template) => template.key === key),
  ).filter((template): template is CatalogTemplate => Boolean(template));

  return {
    templates: templates.map((template) => ({ ...template })),
    defaultTemplateKey: "chateau-de-chantilly",
    reservedSlugs: getReservedSlugs(),
    entitlement: {
      ...mockEntitlement,
      features: [...mockEntitlement.features],
    },
  };
}
