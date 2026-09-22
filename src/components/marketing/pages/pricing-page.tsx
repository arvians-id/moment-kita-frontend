import { PricingCta } from "@/components/marketing/pricing/pricing-cta";
import { PricingFaq } from "@/components/marketing/pricing/pricing-faq";
import { PricingHero } from "@/components/marketing/pricing/pricing-hero";
import { PricingPlans } from "@/components/marketing/pricing/pricing-plans";
import type { Package, PrintedProduct } from "@/types";

export function PricingPage({
  packages,
  products,
}: {
  packages: Package[];
  products: PrintedProduct[];
}) {
  return (
    <>
      <PricingHero />
      <PricingPlans packages={packages} products={products} />
      <PricingFaq />
      <PricingCta />
    </>
  );
}
