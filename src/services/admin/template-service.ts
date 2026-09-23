import { mockTemplateUsage } from "@/data/mocks/admin";
import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import type { AdminTemplateListData } from "@/types";

const disabledTemplateKeys = new Set([
  "lhotel-particulier",
  "elysian-linen-pearl",
]);

const usageKeyByDashboardName: Record<string, string> = {
  "Château de Chantilly": "chateau-de-chantilly",
  Botanique: "botanique-vivace",
  Kyoto: "kyoto-monochrome",
  Velvet: "tuscan-terracotta",
  "Minimalist Modern": "aura-blanche",
};

/**
 * Admin metadata projection over the canonical marketing template catalog.
 * Template definitions stay developer-owned; this layer adds only operational
 * availability, prominence, usage, and package-access metadata.
 */
export async function getAdminTemplateList(): Promise<AdminTemplateListData> {
  const usageByKey = new Map<string, number>();
  mockTemplateUsage.forEach((entry) => {
    const key = usageKeyByDashboardName[entry.templateName];
    if (key) usageByKey.set(key, entry.suiteCount);
  });

  const templates = mockTemplateCatalog.map((template) => ({
    ...template,
    activeVersion: "v1.0",
    enabled: !disabledTemplateKeys.has(template.key),
    featured: template.popularity >= 90,
    usageCount: usageByKey.get(template.key) ?? 0,
    packageAccess:
      template.tier === "signature" ? ["Signature", "Prestige"] : ["Prestige"],
  }));

  return {
    templates,
    summary: {
      totalTemplates: templates.length,
      activeTemplates: templates.filter((template) => template.enabled).length,
      featuredTemplates: templates.filter((template) => template.featured)
        .length,
      totalUsage: templates.reduce(
        (total, template) => total + template.usageCount,
        0,
      ),
    },
    categories: Array.from(
      new Set(templates.map((template) => template.styleLabel)),
    ).sort((left, right) => left.localeCompare(right)),
  };
}
