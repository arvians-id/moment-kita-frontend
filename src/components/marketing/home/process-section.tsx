import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const journeys = [
  {
    title: "The Digital Journey",
    badge: "Three considered steps",
    accent: true,
    steps: [
      [
        "Curate Aesthetic & Typography",
        "Select a signature, then shape the palette, typography, and details around your story.",
      ],
      [
        "Compose Story, Events & Guests",
        "Add your celebration chapters, schedule, locations, and the people you would like to invite.",
      ],
      [
        "Publish Your Wedding Link",
        "Share your invitation and welcome responses through one beautifully considered guest experience.",
      ],
    ],
  },
  {
    title: "The Print Atelier Journey",
    badge: "Personal consultation",
    accent: false,
    steps: [
      [
        "Consultation & Material Direction",
        "Discuss quantity, paper character, colors, and finishing with a dedicated studio consultant.",
      ],
      [
        "Typeset Proofs & Monogram",
        "Review typography, composition, and finishing details before production begins.",
      ],
      [
        "Craft, Assemble & Deliver",
        "Your suite is produced, hand-finished, checked, and prepared for considered delivery.",
      ],
    ],
  },
] as const;

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20 py-20 lg:py-28">
      <Container>
        <EditorialHeading
          kicker="04 — The methodology"
          title="Effortless Flows Tailored to Each Discipline"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {journeys.map((journey) => (
            <article
              key={journey.title}
              className="bg-surface-lowest p-7 shadow-sm sm:p-10"
            >
              <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-serif text-2xl">{journey.title}</h3>
                <span className="w-fit bg-surface-container px-3 py-1.5 text-[9px] font-semibold tracking-[0.14em] text-secondary uppercase">
                  {journey.badge}
                </span>
              </div>
              <ol className="mt-8 space-y-8">
                {journey.steps.map(([title, description], index) => (
                  <li key={title} className="flex gap-5 sm:gap-7">
                    <span
                      className={`font-serif text-3xl leading-none ${journey.accent ? "text-secondary" : "text-primary"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-serif text-lg font-semibold">
                        {title}
                      </h4>
                      <p className="mt-2 text-xs leading-5 text-on-surface-variant">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
