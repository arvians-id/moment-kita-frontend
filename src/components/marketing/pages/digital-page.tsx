import { DigitalArchitecture } from "@/components/marketing/digital/digital-architecture";
import { DigitalCta } from "@/components/marketing/digital/digital-cta";
import { DigitalEditorExperience } from "@/components/marketing/digital/digital-editor-experience";
import { DigitalFaq } from "@/components/marketing/digital/digital-faq";
import { DigitalHero } from "@/components/marketing/digital/digital-hero";
import { DigitalPricing } from "@/components/marketing/digital/digital-pricing";
import { DigitalTemplateShowcase } from "@/components/marketing/digital/digital-template-showcase";
import { SectionReveal } from "@/components/marketing/section-reveal";
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
      <SectionReveal>
        <DigitalArchitecture />
      </SectionReveal>
      <SectionReveal>
        <DigitalTemplateShowcase templates={templates} />
      </SectionReveal>
      <SectionReveal>
        <DigitalEditorExperience />
      </SectionReveal>
      <SectionReveal>
        <DigitalPricing packages={packages} />
      </SectionReveal>
      <SectionReveal>
        <DigitalFaq />
      </SectionReveal>
      <SectionReveal>
        <DigitalCta />
      </SectionReveal>
    </>
  );
}
