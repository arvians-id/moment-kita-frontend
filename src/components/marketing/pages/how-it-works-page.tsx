import { HowItWorksCta } from "@/components/marketing/how-it-works/how-it-works-cta";
import { HowItWorksFaq } from "@/components/marketing/how-it-works/how-it-works-faq";
import { MethodologyExperience } from "@/components/marketing/how-it-works/methodology-experience";
import { SectionReveal } from "@/components/marketing/section-reveal";

export function HowItWorksPage() {
  return (
    <>
      <SectionReveal>
        <MethodologyExperience />
      </SectionReveal>
      <SectionReveal>
        <HowItWorksFaq />
      </SectionReveal>
      <SectionReveal>
        <HowItWorksCta />
      </SectionReveal>
    </>
  );
}
