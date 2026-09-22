import { Bolt, CheckCircle2, LockKeyhole } from "lucide-react";

const categories = [
  ["Guest Experience", "#guest-experience"],
  ["RSVP & Logistics", "#rsvp-intelligence"],
  ["Digital Envelope & Registry", "#digital-envelope"],
  ["Bespoke Architecture", "#bespoke-craft"],
  ["Backstage Studio", "#couple-dashboard"],
] as const;

const standards = [
  { icon: CheckCircle2, label: "Zero App Download Required" },
  { icon: LockKeyhole, label: "Private Guest Access, No Advertising" },
  { icon: Bolt, label: "Responsive Delivery Across Modern Devices" },
] as const;

export function FeaturesHero() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 pt-7 pb-12 sm:px-8 sm:pt-10 lg:px-14">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            <span className="size-2 rounded-full bg-secondary" />
            <span>
              02 — Architectural Capabilities &amp; Suite Intelligence
            </span>
          </div>
          <h1 className="max-w-4xl font-serif text-4xl leading-[1.06] tracking-[-0.025em] text-primary sm:text-5xl lg:text-[56px]">
            Features crafted for{" "}
            <em className="font-normal text-secondary">reverence</em> and quiet
            ease.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-on-surface-variant sm:text-lg sm:leading-8">
            Every interaction is shaped with intention—uniting immersive
            editorial beauty for your guests with calm, real-time clarity for
            your planning.
          </p>
          <nav
            aria-label="Feature categories"
            className="flex flex-wrap gap-2 pt-2"
          >
            {categories.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full bg-surface-container px-4 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase shadow-sm transition-colors hover:bg-primary hover:text-white sm:text-xs"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <aside className="flex flex-col gap-4 lg:col-span-4">
          <div className="rounded-xl bg-surface-low p-4 shadow-sm">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Standard On All Suites
            </p>
            <div className="space-y-2">
              {standards.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[13px]"
                >
                  <Icon
                    aria-hidden
                    size={17}
                    className="shrink-0 text-secondary"
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-surface-high px-4 py-3 text-[13px] text-on-surface-variant">
            <span className="font-medium text-primary">
              Guest-ready delivery
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="size-2 animate-pulse rounded-full bg-emerald-600" />
              Always on
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
