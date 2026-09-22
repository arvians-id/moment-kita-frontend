import { AtelierProcess } from "@/components/marketing/printed/atelier-process";
import { CommissionGallery } from "@/components/marketing/printed/commission-gallery";
import { ConsultationCta } from "@/components/marketing/printed/consultation-cta";
import { CustomizationMatrix } from "@/components/marketing/printed/customization-matrix";
import { MaterialExperience } from "@/components/marketing/printed/material-experience";
import { PrintedCollectionSection } from "@/components/marketing/printed/printed-collection";
import { PrintedFaq } from "@/components/marketing/printed/printed-faq";
import { PrintedHero } from "@/components/marketing/printed/printed-hero";
import { PrintedPricing } from "@/components/marketing/printed/printed-pricing";
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
      <PrintedCollectionSection collections={collections} products={products} />
      <MaterialExperience />
      <CustomizationMatrix />
      <AtelierProcess />
      <PrintedPricing />
      <CommissionGallery />
      <PrintedFaq />
      <ConsultationCta />
    </>
  );
}
