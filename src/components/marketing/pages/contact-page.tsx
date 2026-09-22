import { ContactChannels } from "@/components/marketing/contact/contact-channels";
import { ContactCta } from "@/components/marketing/contact/contact-cta";
import { ContactFaq } from "@/components/marketing/contact/contact-faq";
import { ContactHero } from "@/components/marketing/contact/contact-hero";
import { ContactForm } from "@/components/marketing/contact-form";
import { Container } from "@/components/shared/container";

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="pb-12 sm:pb-16">
        <Container className="grid items-start gap-7 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ContactChannels />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </Container>
      </section>
      <ContactFaq />
      <ContactCta />
    </>
  );
}
