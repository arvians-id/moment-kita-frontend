import { AboutApproach } from "@/components/marketing/about/about-approach";
import { AboutCollective } from "@/components/marketing/about/about-collective";
import { AboutCta } from "@/components/marketing/about/about-cta";
import { AboutDisciplines } from "@/components/marketing/about/about-disciplines";
import { AboutGenesis } from "@/components/marketing/about/about-genesis";
import { AboutHero } from "@/components/marketing/about/about-hero";
import { AboutPhilosophy } from "@/components/marketing/about/about-philosophy";

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutGenesis />
      <AboutPhilosophy />
      <AboutDisciplines />
      <AboutApproach />
      <AboutCollective />
      <AboutCta />
    </>
  );
}
