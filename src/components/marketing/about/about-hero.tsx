import { Container } from "@/components/shared/container";

const credentials = [
  "Digital & Fine Print Ateliers",
  "Zero Compromise on Materiality",
  "Cloud Performance Architecture",
] as const;

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-8">
            <div className="flex items-center gap-2">
              <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                07 — Maison &amp; Intention
              </span>
              <span className="h-px w-8 bg-border" />
            </div>
            <h1 className="font-serif text-[36px] leading-[42px] tracking-[-0.01em] md:text-[56px] md:leading-[64px] md:tracking-[-0.02em]">
              Every celebration deserves a story{" "}
              <em className="font-normal text-secondary">beautifully told.</em>
            </h1>
            <p className="max-w-3xl pt-1 text-[18px] leading-relaxed tracking-[-0.01em] text-on-surface-variant">
              We founded Moment Kita with a singular reverence: that wedding
              invitations are not administrative announcements, but the first
              architectural glimpse into a couple&rsquo;s shared life. In an era
              caught between impersonal mass-market stationery and rigid bespoke
              waiting lists, we built an atelier where digital intelligence and
              tactile letterpress coexist with uncompromising grace.
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant/80 uppercase">
              {credentials.map((credential, index) => (
                <li key={credential} className="flex items-center gap-x-4">
                  {index > 0 ? <span aria-hidden>&bull;</span> : null}
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden pt-8 lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-center">
            <figure className="max-w-xs bg-surface-low p-7 text-right shadow-sm">
              <figcaption className="mb-1 block text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                Artisan Registry
              </figcaption>
              <blockquote className="font-serif text-2xl leading-snug italic">
                &ldquo;Tactile dignity, digital weightlessness.&rdquo;
              </blockquote>
              <span className="mt-2 block text-[13px] leading-5 text-on-surface-variant">
                &mdash; Moment Kita Studio Note No. 04
              </span>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
