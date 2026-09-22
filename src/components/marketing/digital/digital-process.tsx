const stages = [
  ["Explore Templates", "Browse the curated visual directions."],
  ["Live Preview", "Experience the guest-facing structure."],
  ["Create Account", "Enter the supported studio workflow."],
  ["Customize Story", "Compose events, copy, and imagery."],
  ["Review & Publish", "Finalize deliberately, then go live."],
  ["Share Everywhere", "Send the invitation through your preferred channel."],
] as const;

export function DigitalProcess() {
  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            Streamlined Journey
          </p>
          <h2 className="mt-3 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            How It Works
          </h2>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            From first selection to a published invitation through six clear
            stages.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {stages.map(([title, text], index) => (
            <article
              key={title}
              className="flex min-h-44 flex-col justify-between bg-white p-6 shadow-sm"
            >
              <span className="font-serif text-[22px] text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[10px] font-semibold tracking-wider uppercase">
                  {title}
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
