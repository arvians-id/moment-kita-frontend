import { mockTemplateCatalog } from "@/data/mocks/template-catalog";
import { mockTemplates } from "@/data/mocks/templates";
import type { CatalogTemplate, TemplateDetail, TemplateSummary } from "@/types";

export async function getTemplates(): Promise<TemplateSummary[]> {
  return mockTemplates.map((template) => ({
    key: template.key,
    version: template.version,
    rendererKey: template.rendererKey,
    name: template.name,
    description: template.description,
    category: template.category,
    thumbnailUrl: template.thumbnailUrl,
  }));
}

export async function getTemplateByKey(
  key: string,
): Promise<TemplateDetail | null> {
  const template = mockTemplates.find((item) => item.key === key);

  return template
    ? {
        ...template,
        previewImages: [...template.previewImages],
        features: [...template.features],
      }
    : null;
}

export async function getTemplateCatalog(): Promise<CatalogTemplate[]> {
  return mockTemplateCatalog.map((item) => ({ ...item }));
}
