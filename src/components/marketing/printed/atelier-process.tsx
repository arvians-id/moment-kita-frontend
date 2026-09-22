import { Container } from "@/components/shared/container";

const steps = [
  {
    number: "01",
    title: "Aesthetic Discovery",
    text: "Select your preferred edition or share your wedding moodboard, venue architecture, and floral tones with our curation team.",
  },
  {
    number: "02",
    title: "Dedicated WhatsApp Dialogue",
    text: "Connect directly with your personal master typographer. Exchange ideas fluidly without waiting days for sluggish email chains.",
  },
  {
    number: "03",
    title: "Tactile Swatch Box",
    text: "Receive our sample presentation box in 2–3 days to touch real cotton weights, examine foil reflections, and test wax seals at home.",
  },
  {
    number: "04",
    title: "Typographic Proofs",
    text: "Receive vector layout proofs with unlimited typographic refinements on kerning, ligatures, hierarchy, and personalized crest monograms.",
  },
  {
    number: "05",
    title: "Artisan Pressing & Gilding",
    text: "Once approved, your stationery is hand-fed through our vintage Heidelberg presses, inspected by eye, and finished with wax and ribbon.",
  },
  {
    number: "06",
    title: "Heirloom Cased Delivery",
    text: "Carefully packaged in archival linen presentation boxes and delivered by insured courier directly to your residence.",
  },
] as const;

export function AtelierProcess() {
  return (
    <section className="w-full bg-surface py-12 lg:py-28">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="mb-1 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            The Atelier Process
          </p>
          <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
            Why we consult via WhatsApp rather than an automated shopping cart.
          </h2>
          <p className="mt-2 text-[15px] leading-6 text-on-surface-variant">
            Heirloom letterpress is bespoke craftsmanship. An impersonal web
            cart cannot understand your venue&rsquo;s lighting, paper weights,
            or personalized monogram proportions.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ number, title, text }) => (
            <li
              key={number}
              className="flex flex-col rounded-[8px] bg-surface-low p-7"
            >
              <span className="mb-3 font-serif text-2xl text-secondary">
                {number}
              </span>
              <h3 className="mb-2 font-serif text-[22px] leading-[30px] font-semibold">
                {title}
              </h3>
              <p className="text-[13px] leading-5 text-on-surface-variant">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
