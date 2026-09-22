import { Container } from "@/components/shared/container";

const footprint = [
  {
    label: "Letterpress Workshop",
    detail: "Print & Foil Archive",
  },
  {
    label: "Creative Studio",
    detail: "Design Direction",
  },
  {
    label: "Global Edge Cloud",
    detail: "Multi-region Delivery Network",
  },
  {
    label: "Private Conciergerie",
    detail: "Direct Encrypted WhatsApp Line",
  },
] as const;

export function AboutCollective() {
  return (
    <section className="w-full bg-surface-container py-12 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              The Atelier Collective
            </span>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              Typographers, Software Architects, and Master Printers.
            </h2>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">
              We operate as a distributed multidisciplinary guild across our
              print workshop, creative studio, and cloud edge infrastructure.
              Rather than an oversized commercial agency, our team remains
              deliberately boutique: senior typographers with backgrounds in
              luxury editorial publishing, paired with software engineers
              obsessed with tactile digital fluidity.
            </p>
            <figure className="bg-surface-lowest p-4 shadow-sm">
              <blockquote className="font-serif text-2xl leading-snug italic">
                &ldquo;We measure our success not by the volume of invitations
                dispatched, but by the quiet gasp when an envelope is
                opened.&rdquo;
              </blockquote>
              <figcaption className="mt-2 block text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
                Studio Manifesto
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="bg-surface-lowest p-7 shadow-sm">
              <div className="flex items-center justify-between gap-4 pb-2">
                <h3 className="text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase">
                  Maison Footprint
                </h3>
                <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                  Presence
                </span>
              </div>
              <dl className="flex flex-col gap-2 text-[13px] leading-5 text-on-surface-variant">
                {footprint.map(({ label, detail }) => (
                  <div
                    key={label}
                    className="flex flex-col justify-between gap-1 py-1 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <dt className="font-medium text-on-surface">{label}</dt>
                    <dd className="sm:text-right">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
