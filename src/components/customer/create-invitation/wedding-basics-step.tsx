import { CalendarDays, Heart, UserRound } from "lucide-react";

const fieldShell =
  "flex items-center gap-3 rounded-[8px] border border-transparent bg-surface-low px-4 py-3 transition-colors focus-within:border-secondary focus-within:bg-surface-container";

function firstName(value: string, fallback: string): string {
  return value.trim().split(/\s+/)[0] || fallback;
}

export function WeddingBasicsStep({
  partnerOne,
  partnerTwo,
  weddingDate,
  errors,
  onPartnerOneChange,
  onPartnerTwoChange,
  onWeddingDateChange,
  onActivate,
}: {
  partnerOne: string;
  partnerTwo: string;
  weddingDate: string;
  errors: Partial<Record<"partnerOne" | "partnerTwo" | "weddingDate", string>>;
  onPartnerOneChange: (value: string) => void;
  onPartnerTwoChange: (value: string) => void;
  onWeddingDateChange: (value: string) => void;
  onActivate: () => void;
}) {
  return (
    <section
      id="create-step-2"
      onFocusCapture={onActivate}
      className="scroll-mt-28 rounded-[12px] bg-surface-lowest p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] leading-4 font-semibold tracking-[0.18em] text-secondary uppercase">
            02 — Couple &amp; date information
          </span>
          <h2 className="mt-0.5 font-serif text-[22px] leading-7 font-semibold">
            Wedding Basics
          </h2>
        </div>
        <Heart aria-hidden size={20} className="text-secondary" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="partner-one"
            className="mb-1.5 block text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase"
          >
            Bride / Partner 1 full name
          </label>
          <div className={fieldShell}>
            <UserRound
              aria-hidden
              size={17}
              className="shrink-0 text-on-surface-variant"
            />
            <input
              id="partner-one"
              value={partnerOne}
              onChange={(event) => onPartnerOneChange(event.target.value)}
              placeholder="e.g. Ayu Prameswari"
              autoComplete="name"
              className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-on-surface-variant/50"
            />
          </div>
          <div className="mt-1.5 flex justify-between gap-3 px-1 text-[10px] leading-4 text-on-surface-variant">
            <span>{errors.partnerOne ?? "Display nickname:"}</span>
            {!errors.partnerOne ? (
              <strong className="text-on-surface">
                &ldquo;{firstName(partnerOne, "Partner 1")}&rdquo;
              </strong>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="partner-two"
            className="mb-1.5 block text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase"
          >
            Groom / Partner 2 full name
          </label>
          <div className={fieldShell}>
            <UserRound
              aria-hidden
              size={17}
              className="shrink-0 text-on-surface-variant"
            />
            <input
              id="partner-two"
              value={partnerTwo}
              onChange={(event) => onPartnerTwoChange(event.target.value)}
              placeholder="e.g. Raka Daniswara"
              autoComplete="name"
              className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-on-surface-variant/50"
            />
          </div>
          <div className="mt-1.5 flex justify-between gap-3 px-1 text-[10px] leading-4 text-on-surface-variant">
            <span>{errors.partnerTwo ?? "Display nickname:"}</span>
            {!errors.partnerTwo ? (
              <strong className="text-on-surface">
                &ldquo;{firstName(partnerTwo, "Partner 2")}&rdquo;
              </strong>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="wedding-date"
          className="mb-1.5 block text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase"
        >
          Wedding date
        </label>
        <div className={fieldShell}>
          <CalendarDays
            aria-hidden
            size={18}
            className="shrink-0 text-secondary"
          />
          <input
            id="wedding-date"
            type="date"
            value={weddingDate}
            onChange={(event) => onWeddingDateChange(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[14px] font-medium outline-none"
          />
        </div>
        {errors.weddingDate ? (
          <p className="mt-1.5 px-1 text-[10px] leading-4 text-red-700">
            {errors.weddingDate}
          </p>
        ) : null}
      </div>
    </section>
  );
}
