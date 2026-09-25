import { ConsultationCta } from "@/components/marketing/printed/consultation-cta";
import { MaterialExperience } from "@/components/marketing/printed/material-experience";
import { PrintedCollectionSection } from "@/components/marketing/printed/printed-collection";
import { PrintedFaq } from "@/components/marketing/printed/printed-faq";
import { PrintedHero } from "@/components/marketing/printed/printed-hero";
import { PrintedPricing } from "@/components/marketing/printed/printed-pricing";
import { SectionReveal } from "@/components/marketing/section-reveal";
import type { PrintedCollection, PrintedProduct } from "@/types";

export function PrintedPage({
  collections,
  products,
}: {
  collections: PrintedCollection[];
  products: PrintedProduct[];
}) {
  return (
    <>
      <PrintedHero />
      <SectionReveal>
        <PrintedCollectionSection
          collections={collections}
          products={products}
        />
      </SectionReveal>
      <SectionReveal>
        <MaterialExperience />
      </SectionReveal>
      <SectionReveal>
        <PrintedPricing />
      </SectionReveal>
      <SectionReveal>
        <PrintedFaq />
      </SectionReveal>
      <SectionReveal>
        <ConsultationCta />
      </SectionReveal>
    </>
  );
}
