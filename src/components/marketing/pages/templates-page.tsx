import { ArchiveDiscovery } from "@/components/marketing/templates/archive-discovery";
import { ConciergeCallouts } from "@/components/marketing/templates/concierge-callouts";
import { ExhibitionRow } from "@/components/marketing/templates/exhibition-row";
import { FeaturedMonograph } from "@/components/marketing/templates/featured-monograph";
import { KyotoIntermezzo } from "@/components/marketing/templates/kyoto-intermezzo";
import { TemplateDirectory } from "@/components/marketing/templates/template-directory";
import { TemplatesCta } from "@/components/marketing/templates/templates-cta";
import { TemplatesFaq } from "@/components/marketing/templates/templates-faq";
import { TemplatesHero } from "@/components/marketing/templates/templates-hero";
import type { CatalogTemplate } from "@/types";

export function TemplatesPage({ catalog }: { catalog: CatalogTemplate[] }) {
  return (
    <>
      <TemplatesHero />
      {/*
        The discipline tabs, sticky aesthetic bar, and the curated archive grid
        share one filter state, so they live in a single client component. The
        featured monograph sits between them in the reference layout and stays
        a server component by being passed through as children.
      */}
      <ArchiveDiscovery>
        <FeaturedMonograph />
      </ArchiveDiscovery>
      <KyotoIntermezzo />
      <ExhibitionRow />
      <TemplateDirectory templates={catalog} />
      <ConciergeCallouts />
      <TemplatesFaq />
      <TemplatesCta />
    </>
  );
}
