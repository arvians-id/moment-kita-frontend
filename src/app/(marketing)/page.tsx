import type { Metadata } from "next";

import { DisciplineShowcase } from "@/components/marketing/home/discipline-showcase";
import { FaqSection } from "@/components/marketing/home/faq-section";
import { FinalCta } from "@/components/marketing/home/final-cta";
import { HomeHero } from "@/components/marketing/home/home-hero";
import { PhilosophySection } from "@/components/marketing/home/philosophy-section";
import { PricingSection } from "@/components/marketing/home/pricing-section";
import { StoryGrid } from "@/components/marketing/home/story-grid";
import { TemplateGallery } from "@/components/marketing/home/template-gallery";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { getPackages } from "@/services/public/package-service";
import { getTemplates } from "@/services/public/template-service";

export const metadata: Metadata = {
  title: "Undangan Pernikahan Digital & Cetak",
  description:
    "Undangan pernikahan digital dan stationery cetak yang dirancang sebagai awal indah untuk perayaan Anda.",
};

export default async function HomePage() {
  const [templates, packages] = await Promise.all([
    getTemplates(),
    getPackages(),
  ]);

  return (
    <>
      <HomeHero />
      <SectionReveal>
        <DisciplineShowcase />
      </SectionReveal>
      <SectionReveal>
        <TemplateGallery templates={templates} />
      </SectionReveal>
      <SectionReveal>
        <StoryGrid />
      </SectionReveal>
      <SectionReveal>
        <PhilosophySection />
      </SectionReveal>
      <SectionReveal>
        <PricingSection packages={packages} />
      </SectionReveal>
      <SectionReveal>
        <FaqSection />
      </SectionReveal>
      <SectionReveal>
        <FinalCta />
      </SectionReveal>
    </>
  );
}
