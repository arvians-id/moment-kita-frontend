import { DigitalArchitecture } from "@/components/marketing/digital/digital-architecture";
import { DigitalCapabilities } from "@/components/marketing/digital/digital-capabilities";
import { DigitalCta } from "@/components/marketing/digital/digital-cta";
import { DigitalEditorExperience } from "@/components/marketing/digital/digital-editor-experience";
import { DigitalFaq } from "@/components/marketing/digital/digital-faq";
import { DigitalHero } from "@/components/marketing/digital/digital-hero";
import { DigitalPricing } from "@/components/marketing/digital/digital-pricing";
import { DigitalProcess } from "@/components/marketing/digital/digital-process";
import { DigitalTemplateShowcase } from "@/components/marketing/digital/digital-template-showcase";
import type { Package, TemplateSummary } from "@/types";

export function DigitalPage({
  templates,
  packages,
}: {
  templates: TemplateSummary[];
  packages: Package[];
}) {
  return (
    <>
      <DigitalHero />
      <DigitalArchitecture />
      <DigitalCapabilities />
      <DigitalTemplateShowcase templates={templates} />
      <DigitalEditorExperience />
      <DigitalProcess />
      <DigitalPricing packages={packages} />
      <DigitalFaq />
      <DigitalCta />
    </>
  );
}
