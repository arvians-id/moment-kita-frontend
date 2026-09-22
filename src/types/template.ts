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

export type CatalogTier = "signature" | "bespoke";

export type CatalogStyle =
  | "minimal"
  | "elegant"
  | "floral"
  | "rustic"
  | "modern"
  | "manga"
  | "traditional";

/**
 * A public marketing catalog entry for the `/templates` directory grid.
 *
 * Deliberately separate from `TemplateSummary`, which carries renderer
 * identity (`rendererKey`, `version`) for the deferred invitation renderer.
 */
export interface CatalogTemplate {
  key: string;
  name: string;
  description: string;
  /** Editorial index label, e.g. "01 • Monolith". */
  kicker: string;
  styleLabel: string;
  style: CatalogStyle;
  tier: CatalogTier;
  price: number;
  currency: "IDR";
  /** Mock ranking used by the catalog "Most Popular" sort. */
  popularity: number;
  imageUrl: string;
  imageAlt: string;
}
