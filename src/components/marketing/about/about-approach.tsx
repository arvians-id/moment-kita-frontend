import { Container } from "@/components/shared/container";

const principles = [
  {
    number: "01",
    title: "Curated",
    text: "Every template in our archive is an intentional monograph, not an endless template farm. We produce only twelve seasonal design suites per calendar year.",
    footnote: "Archive Curation",
  },
  {
    number: "02",
    title: "Human",
    text: "Direct WhatsApp dialogue with experienced atelier directors, not automated chatbots or generic ticketing queues. True conciergerie for your celebration.",
    footnote: "Dedicated Concierge",
  },
  {
    number: "03",
    title: "Modern",
    text: "Subtle interactions, zero-friction edge cloud delivery, and aesthetic autonomy for contemporary couples who value quiet elegance over noisy novelties.",
    footnote: "Cloud Agility",
  },
  {
    number: "04",
    title: "Personal",
    text: "Bespoke monogram crests, tailored venue line-art, and personalized guest salutations crafted to reflect the unique cadence of your partnership.",
    footnote: "Bespoke Cresting",
  },
] as const;

export function AboutApproach() {
  return (
    <section className="w-full bg-surface-lowest py-12 lg:py-28">
      <Container>
        <div className="mb-12 flex max-w-xl flex-col gap-1">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Methodology
          </span>
          <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
            Our Design Approach
          </h2>
          <p className="text-[15px] leading-6 text-on-surface-variant">
            Four non-negotiable principles rooted in architectural
            intentionality and quiet luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ number, title, text, footnote }) => (
            <article
              key={number}
              className="flex flex-col justify-between bg-surface-low p-7"
            >
              <div>
                <span className="mb-1 block font-serif text-[28px] leading-9 font-medium tracking-[-0.01em] text-secondary">
                  {number}
                </span>
                <h3 className="mb-1 font-serif text-[22px] leading-[30px] font-semibold">
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed text-on-surface-variant">
                  {text}
                </p>
              </div>
              <p className="pt-4 text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant/60 uppercase">
                {footnote}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
