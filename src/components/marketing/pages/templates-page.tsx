import Image from "next/image";

import { FaqAccordion } from "@/components/marketing/faq-accordion";
import {
  EditorialSection,
  MarketingCta,
  MarketingPageHero,
} from "@/components/marketing/marketing-page";
import { TemplateCatalog } from "@/components/marketing/template-catalog";
import type { TemplateSummary } from "@/types";

const faq = [
  {
    question: "Can we preview a design before creating an account?",
    answer:
      "Yes. The public catalog is intended to let you explore each visual direction before entering the account flow.",
  },
  {
    question: "Can a template be completely redesigned?",
    answer:
      "Templates protect their core composition and typography. Supported content and visual options can be personalized without turning the product into an unrestricted page builder.",
  },
  {
    question: "Do printed and digital designs match?",
    answer:
      "Some collections share visual cues across both disciplines. For a fully harmonized commission, begin a studio consultation.",
  },
];

export function TemplatesPage({ templates }: { templates: TemplateSummary[] }) {
  return (
    <>
      <MarketingPageHero
        kicker="The design catalog"
        title={
          <>
            Find the design that{" "}
            <em className="text-secondary">feels like you.</em>
          </>
        }
        description="A curated library of editorial invitation suites—each composed to give your story atmosphere without overwhelming it."
        image="/images/marketing/garden-stationery-suite.png"
        imageAlt="A garden wedding invitation collection"
        primary={{ href: "#collection", label: "Explore the collection" }}
        secondary={{ href: "/contact", label: "Request curation" }}
      />
      <EditorialSection
        kicker="Curated collection"
        title="Distinct moods. One quiet design language."
        description="Filter the collection by discipline or search for a feeling, material, or aesthetic."
        className="bg-surface-low"
        headingClassName="max-w-4xl"
      >
        <div id="collection">
          <TemplateCatalog templates={templates} />
        </div>
      </EditorialSection>
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-14">
          <div className="relative min-h-[430px]">
            <Image
              src="/images/marketing/copper-monogram-paper.png"
              alt="Copper monogram printed on textured paper"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Beyond the screen
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Carry your design into a tactile keepsake.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-on-surface-variant">
              Selected visual systems can inspire paper, foil, monogram, and
              typographic directions for an atelier-led printed commission.
            </p>
          </div>
        </div>
      </section>
      <EditorialSection
        kicker="Frequently addressed"
        title="Choosing your visual direction."
        className="bg-surface-lowest"
      >
        <FaqAccordion items={faq} />
      </EditorialSection>
      <MarketingCta
        kicker="Your invitation begins here"
        title="A beautiful foundation, ready for your story."
        description="Choose a design and begin composing your digital suite, or ask the studio for a more tactile direction."
        primary={{ href: "/register", label: "Create an account" }}
        secondary={{ href: "/contact", label: "Request design guidance" }}
      />
    </>
  );
}
