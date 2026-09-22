import { Container } from "@/components/shared/container";

const comparisonRows = [
  [
    "Setup timeline",
    "Begin immediately; publish when ready",
    "Consultation, proofing, production & delivery",
  ],
  [
    "Consultation style",
    "Guided self-serve studio",
    "One-to-one studio conversation",
  ],
  [
    "Guest logistics",
    "Personal links, live RSVP & guest updates",
    "Hand-addressed delivery or QR bridge",
  ],
  [
    "Commitment",
    "Choose a digital package",
    "Itemized manual studio commission",
  ],
  [
    "Primary touchpoint",
    "Responsive mobile invitation experience",
    "Substantial cotton paper & artisan finish",
  ],
  [
    "Changes after launch",
    "Supported content can be updated",
    "Locked once approved for print",
  ],
] as const;

export function ProcessComparison() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Clarity & transparency
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-primary sm:text-4xl">
            Comparison at a glance.
          </h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            Compare pace, collaboration, and deliverables side by side to find
            the right rhythm for your celebration.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-xl bg-surface-lowest shadow-sm">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-surface-container">
                <th className="w-1/4 p-6 text-[10px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase">
                  Criteria
                </th>
                <th className="p-6 text-[10px] font-semibold tracking-[0.13em] text-primary uppercase">
                  <span className="flex items-center gap-2">
                    01 — Digital invitation suite
                    <span className="rounded bg-white px-2 py-1 text-[8px] text-secondary">
                      Cloud
                    </span>
                  </span>
                </th>
                <th className="p-6 text-[10px] font-semibold tracking-[0.13em] text-primary uppercase">
                  <span className="flex items-center gap-2">
                    02 — Artisan printed atelier
                    <span className="rounded bg-accent px-2 py-1 text-[8px] text-accent-foreground">
                      Handcrafted
                    </span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonRows.map(([criterion, digital, print]) => (
                <tr
                  key={criterion}
                  className="transition-colors hover:bg-surface-low"
                >
                  <th className="p-6 text-[13px] font-semibold text-primary">
                    {criterion}
                  </th>
                  <td className="p-6 text-[13px] leading-6 text-on-surface-variant">
                    {digital}
                  </td>
                  <td className="p-6 text-[13px] leading-6 text-on-surface-variant">
                    {print}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
