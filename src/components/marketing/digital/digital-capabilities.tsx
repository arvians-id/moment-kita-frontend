import {
  CalendarPlus,
  Check,
  Download,
  Heart,
  MapPin,
  Music2,
  PlayCircle,
  QrCode,
  PiggyBank,
  Sparkles,
  Video,
} from "lucide-react";

const supportingFeatures = [
  {
    icon: CalendarPlus,
    title: "Calendar Ready",
    text: "Clear event details for every guest",
  },
  {
    icon: Video,
    title: "Live Stream Chapter",
    text: "A dedicated place for remote viewing",
  },
  {
    icon: Heart,
    title: "Digital Guest Wishes",
    text: "Warm messages held together",
  },
  {
    icon: Download,
    title: "Structured Export",
    text: "Planner-ready guest information",
  },
] as const;

export function DigitalCapabilities() {
  return (
    <section
      id="suite-capabilities"
      className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 py-20 sm:px-8 lg:px-14 lg:py-32"
    >
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
          03 — Suite Capabilities
        </p>
        <h2 className="mt-3 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
          Built for Nuanced Celebrations
        </h2>
        <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
          Every chapter balances editorial restraint with the practical clarity
          guests and couples need throughout the celebration.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <article className="flex flex-col justify-between bg-surface-low p-8 shadow-sm md:col-span-7 lg:p-10">
          <div>
            <div className="flex items-center gap-2 text-secondary">
              <Sparkles aria-hidden size={19} />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                Feature 01 · Guest Logistics
              </span>
            </div>
            <h3 className="mt-4 font-serif text-[28px] font-medium leading-9">
              Real-Time RSVP &amp; Dietary Precision
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant sm:text-[15px]">
              Collect attendance, party size, meal preferences, and dietary
              notes through one clear guest-facing flow.
            </p>
          </div>
          <div className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <span className="text-[10px] font-semibold tracking-wider uppercase">
                RSVP · Melina &amp; Dayson
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-secondary uppercase">
                Guest Preview
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
                  Attending Ceremony?
                </p>
                <div className="flex gap-2">
                  <span className="flex-1 bg-primary px-4 py-2 text-center text-[9px] font-semibold text-white uppercase">
                    Joyfully Yes
                  </span>
                  <span className="flex-1 bg-surface-container px-4 py-2 text-center text-[9px] font-semibold text-on-surface-variant uppercase">
                    Regretfully No
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-1 text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
                  Dietary Preference
                </p>
                <div className="flex items-center justify-between bg-surface-low p-2 text-xs">
                  <span>Pescatarian / Gluten-Free</span>
                  <Check aria-hidden size={14} />
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="flex flex-col justify-between bg-white p-8 shadow-sm md:col-span-5 lg:p-10">
          <div>
            <div className="flex items-center gap-2 text-secondary">
              <PiggyBank aria-hidden size={19} />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                Feature 02 · Thoughtful Gifting
              </span>
            </div>
            <h3 className="mt-4 font-serif text-[28px] font-medium leading-9">
              Direct Gift Details &amp; Digital Envelope
            </h3>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
              Present supported gifting details in a discreet invitation
              chapter, without turning the guest journey into a storefront.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4 bg-surface-low p-4">
            <span className="grid size-14 shrink-0 place-items-center bg-white shadow-inner">
              <QrCode aria-hidden size={28} />
            </span>
            <div>
              <p className="text-[10px] font-semibold tracking-wider uppercase">
                Honeymoon Voyage
              </p>
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Couple-provided transfer and QR details
              </p>
            </div>
          </div>
        </article>

        <article className="flex flex-col justify-between bg-white p-8 shadow-sm md:col-span-4">
          <div>
            <div className="flex items-center gap-2 text-secondary">
              <Music2 aria-hidden size={19} />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                Feature 03 · Audio
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[22px] font-semibold">
              Curated Soundtrack
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-on-surface-variant">
              Set the atmosphere with optional music that remains considerate of
              every guest.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-lg bg-surface-low p-3">
            <PlayCircle aria-hidden size={20} className="text-secondary" />
            <div>
              <p className="text-xs font-semibold">Wedding Chords</p>
              <p className="text-[10px] text-on-surface-variant">
                Optional ambient player
              </p>
            </div>
          </div>
        </article>

        <article className="flex flex-col justify-between bg-white p-8 shadow-sm md:col-span-4">
          <div>
            <div className="flex items-center gap-2 text-secondary">
              <Heart aria-hidden size={19} />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                Feature 04 · Story
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[22px] font-semibold">
              Interactive Love Story
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-on-surface-variant">
              Frame the moments that led here with archival typography and
              thoughtfully paced imagery.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
            <span>2020 First Met</span>
            <span className="text-secondary">——</span>
            <span>2023 Engaged</span>
            <span className="text-secondary">——</span>
            <strong className="text-primary">2026 Union</strong>
          </div>
        </article>

        <article className="flex flex-col justify-between bg-white p-8 shadow-sm md:col-span-4">
          <div>
            <div className="flex items-center gap-2 text-secondary">
              <MapPin aria-hidden size={19} />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                Feature 05 · Transit
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[22px] font-semibold">
              1-Tap Maps &amp; Transit
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-on-surface-variant">
              Connect guests with venue directions and essential travel notes
              from the schedule.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Apple Maps", "Google Maps", "Travel Notes"].map((label) => (
              <span
                key={label}
                className="bg-surface-container px-3 py-1.5 text-[9px] font-semibold uppercase"
              >
                {label}
              </span>
            ))}
          </div>
        </article>

        <div className="grid gap-4 pt-4 sm:grid-cols-2 md:col-span-12 lg:grid-cols-4">
          {supportingFeatures.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="flex flex-col gap-1 bg-surface-low p-4"
            >
              <Icon aria-hidden size={19} className="text-secondary" />
              <h3 className="mt-2 text-[10px] font-semibold tracking-wider uppercase">
                {title}
              </h3>
              <p className="text-[11px] text-on-surface-variant">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
