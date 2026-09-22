import { ArrowRight, PlayCircle, Stamp } from "lucide-react";

import type { CustomerInvitation } from "@/types";

const shortDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

/** Renders the couple's monogram, e.g. "Raka & Ayu" becomes "R&A". */
function monogramFor(coupleLabel: string): string {
  return coupleLabel
    .split("&")
    .map((part) => part.trim().charAt(0))
    .join("&");
}

export function InvitationPreviewPanel({
  invitation,
}: {
  invitation: CustomerInvitation;
}) {
  const [first, second] = invitation.coupleLabel
    .split("&")
    .map((p) => p.trim());

  return (
    <div className="flex flex-col gap-6">
      <section className="relative flex flex-col items-center overflow-hidden bg-surface-low p-6 shadow-md sm:p-7">
        <div className="mb-5 flex w-full items-start justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Preview canvas
            </span>
            <span className="font-serif text-[22px] leading-[30px] font-semibold">
              Interactive mobile view
            </span>
          </div>
          <span className="shrink-0 bg-surface-container px-2.5 py-1 text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
            {invitation.templateName.split(" ")[0]} v1
          </span>
        </div>

        {/* Device frame rendering the invitation's cover, not a screenshot. */}
        <div className="relative aspect-[9/18.5] w-full max-w-[290px] rounded-[40px] bg-on-surface p-2.5 shadow-2xl">
          <span
            aria-hidden
            className="absolute top-4 left-1/2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-on-surface"
          />
          <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-[32px] bg-surface-lowest p-5 select-none">
            <div className="z-10 flex flex-col items-center pt-8 text-center">
              <span className="text-[9px] font-semibold tracking-[0.25em] text-secondary uppercase">
                The wedding celebration of
              </span>
              <h3 className="mt-2 font-serif text-[28px] leading-tight tracking-tight">
                {first} &amp;
                <br />
                <span className="font-normal italic">{second}</span>
              </h3>
              <span aria-hidden className="my-3 h-px w-8 bg-secondary/40" />
              <p className="text-[10px] font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
                {shortDate.format(new Date(invitation.eventDate))}
              </p>
            </div>

            <div className="z-10 my-auto flex flex-col items-center">
              <span className="relative grid size-14 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-lg">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-white/40"
                />
                <span className="font-serif text-[18px] italic">
                  {monogramFor(invitation.coupleLabel)}
                </span>
              </span>
              <span className="mt-2 text-[8px] font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
                Tap to unfold envelope
              </span>
            </div>

            <div className="z-10 w-full pb-3 text-center">
              <span className="block text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                {invitation.venue}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full items-center justify-between gap-3 bg-surface-lowest p-4">
          <div className="flex min-w-0 flex-col">
            <span className="text-[13px] leading-5 font-medium">
              Interactive previewer
            </span>
            <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Sound &amp; RSVP animation
            </span>
          </div>
          <span
            aria-disabled="true"
            className="inline-flex h-8 shrink-0 cursor-not-allowed items-center gap-1.5 bg-primary px-3.5 text-[11px] font-semibold tracking-[0.12em] text-primary-foreground uppercase opacity-90"
          >
            <PlayCircle aria-hidden size={14} />
            <span>Launch</span>
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-surface-low p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2.5">
            <Stamp aria-hidden size={19} className="text-secondary" />
            <span className="text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase">
              Matching printed keepsake
            </span>
          </span>
          <span className="bg-surface-container px-2 py-0.5 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Optional
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-on-surface-variant">
          Pair this suite with letterpress stationery in the same typography and
          monogram. The studio confirms every print commission manually.
        </p>
        <span
          aria-disabled="true"
          className="flex cursor-not-allowed items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase"
        >
          <span>Explore printed atelier</span>
          <ArrowRight aria-hidden size={14} />
        </span>
      </section>
    </div>
  );
}
