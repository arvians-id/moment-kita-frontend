import { BespokeSection } from "@/components/marketing/features/bespoke-section";
import { DashboardSection } from "@/components/marketing/features/dashboard-section";
import { DigitalEnvelopeSection } from "@/components/marketing/features/digital-envelope-section";
import { FeaturesCta } from "@/components/marketing/features/features-cta";
import { FeaturesFaq } from "@/components/marketing/features/features-faq";
import { FeaturesHero } from "@/components/marketing/features/features-hero";
import { GuestExperienceSection } from "@/components/marketing/features/guest-experience-section";
import { RsvpSection } from "@/components/marketing/features/rsvp-section";

export function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <GuestExperienceSection />
      <RsvpSection />
      <DigitalEnvelopeSection />
      <BespokeSection />
      <DashboardSection />
      <FeaturesFaq />
      <FeaturesCta />
    </>
  );
}
