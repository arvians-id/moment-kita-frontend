import { Gift, Link2, MailCheck, Map, Music2 } from "lucide-react";

import type { CatalogTemplate } from "@/types";
import { publicConfig } from "@/lib/config";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

function firstName(value: string, fallback: string): string {
  return value.trim().split(/\s+/)[0] || fallback;
}

export function InvitationLivePreview({
  partnerOne,
  partnerTwo,
  weddingDate,
  slug,
  template,
}: {
  partnerOne: string;
  partnerTwo: string;
  weddingDate: string;
  slug: string;
  template: CatalogTemplate;
}) {
  const safeDate = weddingDate
    ? dateFormatter.format(new Date(weddingDate + "T12:00:00+07:00"))
    : "Set your date";
  const [day = "", month = "", year = ""] = safeDate.split(" ");

  return (
    <section className="rounded-[14px] bg-surface-lowest p-4 shadow-md sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[10px] leading-4 font-semibold tracking-[0.14em] uppercase">
          <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
          Real-time draft preview
        </span>
        <span className="text-[9px] leading-4 font-semibold tracking-[0.16em] text-secondary uppercase">
          Mobile viewport
        </span>
      </div>

      <div className="mx-auto w-full max-w-[320px] rounded-[38px] bg-primary p-3 shadow-[0_22px_48px_-18px_rgba(20,19,18,0.55)]">
        <div className="relative flex min-h-[510px] flex-col items-center overflow-hidden rounded-[28px] border border-surface-high bg-surface px-4 pt-12 pb-6 text-center">
          <span
            aria-hidden
            className="absolute top-3 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-primary"
          />
          <span className="grid size-12 place-items-center rounded-full bg-accent/55 font-serif text-xl text-secondary italic">
            M
          </span>
          <span className="mt-3 text-[9px] leading-4 font-semibold tracking-[0.18em] text-secondary uppercase">
            Wedding invitation
          </span>

          <div className="my-4 font-serif">
            <span className="block text-[27px] leading-8">
              {firstName(partnerOne, "Partner 1")}
            </span>
            <span className="block text-[22px] leading-7 text-secondary italic">
              &amp;
            </span>
            <span className="block text-[27px] leading-8">
              {firstName(partnerTwo, "Partner 2")}
            </span>
          </div>

          <p className="max-w-[215px] font-serif text-[12px] leading-5 text-on-surface-variant italic">
            Together with their families request the honor of your presence
          </p>

          <div className="my-4 flex w-full max-w-[230px] items-center justify-between rounded-[8px] bg-surface-low px-3 py-2">
            <span className="text-[9px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
              {month || "Date"}
            </span>
            <span className="font-serif text-[19px] font-bold text-secondary">
              {day || "—"}
            </span>
            <span className="text-[9px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
              {year || "Year"}
            </span>
          </div>

          <div className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-surface-container px-3 py-1">
            <Link2 aria-hidden size={11} className="shrink-0 text-secondary" />
            <span className="truncate text-[9px] tracking-[0.08em] lowercase">
              {publicConfig.publicHost}/{slug || "your-wedding"}
            </span>
          </div>

          <span className="mt-5 inline-flex w-full items-center justify-center bg-primary px-4 py-2.5 text-[9px] font-semibold tracking-[0.12em] text-primary-foreground uppercase">
            Open {template.name}
          </span>
          <span
            aria-hidden
            className="mt-auto h-1 w-24 rounded-full bg-on-surface/20"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {[
          [Music2, "Classical Prelude"],
          [MailCheck, "RSVP Engine"],
          [Map, "Google Maps Live"],
          [Gift, "Digital Envelope"],
        ].map(([Icon, label]) => (
          <span
            key={label as string}
            className="flex min-w-0 items-center gap-2 rounded-[8px] bg-surface-low p-2.5 text-[11px] leading-4"
          >
            <Icon aria-hidden size={16} className="shrink-0 text-secondary" />
            <span className="truncate">{label as string}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
