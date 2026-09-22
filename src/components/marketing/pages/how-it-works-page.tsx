import { HarmonizedProtocol } from "@/components/marketing/how-it-works/harmonized-protocol";
import { HowItWorksCta } from "@/components/marketing/how-it-works/how-it-works-cta";
import { HowItWorksFaq } from "@/components/marketing/how-it-works/how-it-works-faq";
import { MethodologyExperience } from "@/components/marketing/how-it-works/methodology-experience";
import { ProcessComparison } from "@/components/marketing/how-it-works/process-comparison";

export function HowItWorksPage() {
  return (
    <>
      <MethodologyExperience />
      <HarmonizedProtocol />
      <ProcessComparison />
      <HowItWorksFaq />
      <HowItWorksCta />
    </>
  );
}
