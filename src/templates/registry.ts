import type { ComponentType } from "react";

import type { PublicInvitation } from "@/types";

export interface TemplateRendererProps {
  invitation: PublicInvitation;
  mode: "preview" | "public";
}

export type TemplateRenderer = ComponentType<TemplateRendererProps>;
export type TemplateLoader = () => Promise<{ default: TemplateRenderer }>;

/**
 * Renderers are registered by their immutable `<templateKey>@<version>` key.
 * Add dynamic imports here as renderer packages are delivered in later phases.
 */
export const templateRegistry: Readonly<Record<string, TemplateLoader>> = {};

export function getTemplateLoader(rendererKey: string): TemplateLoader | null {
  return templateRegistry[rendererKey] ?? null;
}
