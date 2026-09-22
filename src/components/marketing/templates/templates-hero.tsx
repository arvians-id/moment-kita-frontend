import { Container } from "@/components/shared/container";

export function TemplatesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface pt-12 pb-14 lg:pt-20">
      <Container>
        <div className="mb-6 flex items-center gap-3">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            03 — Curated Invitation Editions
          </span>
          <span aria-hidden className="size-1.5 rounded-full bg-secondary" />
          <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant/70 uppercase">
            Spring / Autumn Archive
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-y-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-[44px] leading-[0.96] tracking-[-0.02em] text-primary md:text-[56px] lg:text-[84px] lg:tracking-[-0.03em]">
              Find a design that{" "}
              <span className="font-normal text-secondary italic">
                feels like you.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="text-[15px] leading-relaxed text-on-surface-variant lg:text-[18px]">
              Whether your celebration calls for intelligent cloud
              interactivity, tactile letterpress permanence, or an orchestrated
              harmony of both. Explore our living archive of bespoke typographic
              suites.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
