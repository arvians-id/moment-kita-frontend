import { ArrowRight, Building2, Globe, Pointer, Quote } from "lucide-react";

import type { EngagementSummary } from "@/types";

const numberFormatter = new Intl.NumberFormat("en-US");

const cardClass =
  "flex flex-col justify-between gap-5 rounded-[12px] bg-surface-lowest p-6 shadow-sm";

export function EngagementCards({
  engagement,
}: {
  engagement: EngagementSummary;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <article className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Invitation views
          </span>
          <Globe aria-hidden size={19} className="shrink-0 text-secondary" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-serif text-[28px] leading-9">
            {numberFormatter.format(engagement.pageViews)}
          </span>
          <span className="text-[13px] leading-5 text-on-surface-variant">
            Invitation page visits
          </span>
        </div>
        <p className="flex items-start gap-1.5 pt-3 text-[12px] text-on-surface-variant">
          <Building2
            aria-hidden
            size={14}
            className="mt-0.5 shrink-0 text-secondary"
          />
          <span>{engagement.topLocations.join(", ")}</span>
        </p>
      </article>

      <article className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Guest interactions
          </span>
          <Pointer aria-hidden size={19} className="shrink-0 text-secondary" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-serif text-[28px] leading-9">
            {engagement.interactions}
          </span>
          <span className="text-[13px] leading-5 text-on-surface-variant">
            Actions completed by guests
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-3 text-[12px] text-on-surface-variant">
          <span>
            Envelopes opened:{" "}
            <strong className="font-semibold">
              {engagement.envelopesOpened}
            </strong>
          </span>
          <span>
            Calendar adds:{" "}
            <strong className="font-semibold">{engagement.calendarAdds}</strong>
          </span>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-[12px] bg-surface-high p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] leading-4 font-bold tracking-[0.12em] text-secondary uppercase">
              Wishes
            </span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
              {engagement.wishesReceived} received
            </span>
          </div>
          <Quote aria-hidden size={17} className="shrink-0 text-secondary" />
        </div>
        <figure className="flex flex-col gap-2">
          <blockquote className="font-serif text-[17px] leading-snug italic">
            &ldquo;{engagement.featuredWish.message}&rdquo;
          </blockquote>
          <figcaption className="text-[12px] font-semibold text-on-surface-variant">
            — {engagement.featuredWish.author}
          </figcaption>
        </figure>
        <span className="inline-flex cursor-not-allowed items-center gap-1 pt-1 text-[11px] font-semibold tracking-[0.12em] text-secondary uppercase">
          Read all {engagement.wishesReceived} messages
          <ArrowRight aria-hidden size={13} />
        </span>
      </article>
    </section>
  );
}
