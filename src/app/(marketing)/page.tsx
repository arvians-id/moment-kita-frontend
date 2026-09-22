import type { Metadata } from "next";

import { DisciplineShowcase } from "@/components/marketing/home/discipline-showcase";
import { FaqSection } from "@/components/marketing/home/faq-section";
import { FeatureComparison } from "@/components/marketing/home/feature-comparison";
import { FinalCta } from "@/components/marketing/home/final-cta";
import { HomeHero } from "@/components/marketing/home/home-hero";
import { PhilosophySection } from "@/components/marketing/home/philosophy-section";
import { PricingSection } from "@/components/marketing/home/pricing-section";
import { ProcessSection } from "@/components/marketing/home/process-section";
import { StoryGrid } from "@/components/marketing/home/story-grid";
import { TemplateGallery } from "@/components/marketing/home/template-gallery";
import { getPackages } from "@/services/public/package-service";
import { getTemplates } from "@/services/public/template-service";

export const metadata: Metadata = {
  title: "Paper & Pixel Wedding Invitations",
  description:
    "Digital wedding invitations and tactile fine stationery, designed as one considered beginning for your celebration.",
};

export default async function HomePage() {
  const [templates, packages] = await Promise.all([
    getTemplates(),
    getPackages(),
  ]);

  return (
    <>
      <HomeHero />
      <DisciplineShowcase />
      <TemplateGallery templates={templates} />
      <FeatureComparison />
      <ProcessSection />
      <StoryGrid />
      <PhilosophySection />
      <PricingSection packages={packages} />
      <FaqSection />
      <FinalCta />
    </>
  );
}
