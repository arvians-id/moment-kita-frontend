export interface TemplateSummary {
  key: string;
  version: number;
  rendererKey: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl: string;
}

export interface TemplateDetail extends TemplateSummary {
  previewImages: string[];
  features: string[];
}
