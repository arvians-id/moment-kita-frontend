import { ConciergeCallouts } from "@/components/marketing/templates/concierge-callouts";
import { FeaturedMonograph } from "@/components/marketing/templates/featured-monograph";
import { KyotoIntermezzo } from "@/components/marketing/templates/kyoto-intermezzo";
import { TemplateDirectory } from "@/components/marketing/templates/template-directory";
import { TemplatesCta } from "@/components/marketing/templates/templates-cta";
import { TemplatesFaq } from "@/components/marketing/templates/templates-faq";
import { TemplatesHero } from "@/components/marketing/templates/templates-hero";
import { SectionReveal } from "@/components/marketing/section-reveal";
import type { CatalogTemplate } from "@/types";

export function TemplatesPage({ catalog }: { catalog: CatalogTemplate[] }) {
  return (
    <>
      <TemplatesHero />
      <SectionReveal>
        <FeaturedMonograph />
      </SectionReveal>
      <SectionReveal>
        <KyotoIntermezzo />
      </SectionReveal>
      <TemplateDirectory templates={catalog} />
      <SectionReveal>
        <ConciergeCallouts />
      </SectionReveal>
      <SectionReveal>
        <TemplatesFaq />
      </SectionReveal>
      <SectionReveal>
        <TemplatesCta />
      </SectionReveal>
    </>
  );
}
