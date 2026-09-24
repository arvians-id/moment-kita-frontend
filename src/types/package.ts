export type PackageTemplateAccessMode = "all" | "selected";

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "IDR";
  features: string[];
  featured?: boolean;
  /** Invitation quota granted per purchase. Configurable per package/tier. */
  invitationQuota: number;
  /** Hosting validity window in days, starting at first publish. Configurable per package/tier. */
  activeDurationDays: number;
  /** False hides the package from new selection; existing purchases are unaffected. */
  active: boolean;
  /**
   * Commercial template entitlement. "all" grants every active template;
   * "selected" restricts to `selectedTemplateKeys`. Admin-only concern —
   * optional so non-Admin consumers of `Package` are unaffected.
   */
  templateAccessMode?: PackageTemplateAccessMode;
  /** Template keys this package grants access to when the mode is "selected". */
  selectedTemplateKeys?: string[];
}
