import { AboutCta } from "@/components/marketing/about/about-cta";
import { AboutGenesis } from "@/components/marketing/about/about-genesis";
import { AboutHero } from "@/components/marketing/about/about-hero";
import { AboutPhilosophy } from "@/components/marketing/about/about-philosophy";
import { SectionReveal } from "@/components/marketing/section-reveal";

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <SectionReveal>
        <AboutGenesis />
      </SectionReveal>
      <SectionReveal>
        <AboutPhilosophy />
      </SectionReveal>
      <SectionReveal>
        <AboutCta />
      </SectionReveal>
    </>
  );
}
