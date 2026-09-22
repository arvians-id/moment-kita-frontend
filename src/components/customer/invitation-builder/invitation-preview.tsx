import { Gift, Music2, RefreshCw, Smartphone } from "lucide-react";
import Image from "next/image";

import type {
  CustomerInvitation,
  InvitationBuilderContent,
  InvitationBuilderSection,
} from "@/types";

const eventDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

function isVisible(
  sections: InvitationBuilderSection[],
  type: InvitationBuilderSection["type"],
  id?: string,
) {
  return sections.some(
    (section) =>
      section.type === type && (!id || section.id === id) && section.visible,
  );
}

export function InvitationPreview({
  invitation,
  sections,
  content,
  activeSectionLabel,
}: {
  invitation: CustomerInvitation;
  sections: InvitationBuilderSection[];
  content: InvitationBuilderContent;
  activeSectionLabel: string;
}) {
  const firstEvent = content.events[0];
  const cover =
    content.gallery.find((item) => item.isCover) ?? content.gallery[0];
  const monogram = content.partners
    .map((partner) => partner.nickname.charAt(0))
    .join(" & ");

  return (
    <aside className="flex flex-col items-center">
      <div className="mb-4 flex w-full max-w-[390px] items-center justify-between gap-3 rounded-[8px] bg-surface-lowest px-4 py-2.5 shadow-sm">
        <span className="flex min-w-0 items-center gap-2">
          <Smartphone
            aria-hidden
            size={17}
            className="shrink-0 text-secondary"
          />
          <span className="truncate text-[10px] font-semibold tracking-[0.12em] uppercase">
            Mobile · {activeSectionLabel}
          </span>
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          <RefreshCw aria-hidden size={12} />
          Live
        </span>
      </div>

      <div className="relative h-[720px] w-full max-w-[390px] rounded-[46px] bg-primary p-3 shadow-[0_24px_55px_-18px_rgba(20,19,18,0.48)]">
        <div className="relative h-full overflow-hidden rounded-[36px] bg-surface">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-10 items-center justify-between px-6 text-[9px] font-bold">
            <span>9:41</span>
            <span className="h-5 w-24 rounded-full bg-primary" />
            <span>5G</span>
          </div>

          <div className="absolute top-11 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-surface-lowest/90 px-3 py-1 text-[8px] tracking-[0.08em] uppercase shadow-sm backdrop-blur">
            <Music2 aria-hidden size={10} className="text-secondary" />
            Claire de Lune
          </div>

          <div className="h-full overflow-y-auto pt-14 pb-8 text-center">
            <section className="flex flex-col items-center px-5 py-8">
              <span className="grid size-14 place-items-center rounded-full bg-secondary font-serif text-[17px] tracking-[0.08em] text-secondary-foreground shadow-md">
                {monogram || "MK"}
              </span>
              <span className="mt-4 text-[8px] font-semibold tracking-[0.2em] text-secondary uppercase">
                The Holy Matrimony &amp; Reception
              </span>
              <h1 className="mt-2 font-serif text-[38px] leading-[1.05] italic">
                {content.partners
                  .map((partner) => partner.nickname || "Partner")
                  .join(" & ")}
              </h1>
              <span className="my-4 h-px w-12 bg-secondary" />
              <p className="text-[9px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
                {firstEvent?.date
                  ? eventDateFormatter.format(
                      new Date(firstEvent.date + "T12:00:00+07:00"),
                    )
                  : "Set your celebration date"}
              </p>
              <p className="mt-1 text-[10px] text-on-surface-variant">
                {firstEvent?.venue || invitation.venue}
              </p>
            </section>

            {isVisible(sections, "couple") ? (
              <section className="mx-4 rounded-[12px] bg-surface-low/70 px-4 py-6">
                <span className="text-[8px] font-semibold tracking-[0.18em] text-secondary uppercase">
                  Couple in focus
                </span>
                <div className="mt-4 space-y-5">
                  {content.partners.map((partner, index) => (
                    <div key={partner.id}>
                      {partner.portraitUrl ? (
                        <div className="relative mx-auto h-24 w-20 overflow-hidden rounded-[7px] shadow-sm">
                          <Image
                            src={partner.portraitUrl}
                            alt=""
                            fill
                            loading={index === 0 ? "eager" : "lazy"}
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <h2 className="mt-2 font-serif text-[17px] font-semibold">
                        {partner.fullName}
                      </h2>
                      <p className="mx-auto mt-1 max-w-[230px] text-[9px] leading-4 text-on-surface-variant">
                        {partner.lineage}
                      </p>
                      {partner.socialHandle ? (
                        <span className="mt-1 block text-[8px] font-semibold tracking-[0.1em] text-secondary uppercase">
                          @{partner.socialHandle}
                        </span>
                      ) : null}
                      {index === 0 ? (
                        <span className="mt-3 block font-serif text-lg text-secondary italic">
                          &amp;
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {isVisible(sections, "loveStory") ? (
              <section className="px-6 py-8">
                <span className="text-[8px] font-semibold tracking-[0.18em] text-secondary uppercase">
                  Our story
                </span>
                <h2 className="mt-1 font-serif text-[20px] font-semibold">
                  {content.loveStory.title}
                </h2>
                <p className="mt-3 font-serif text-[11px] leading-5 text-on-surface-variant">
                  {content.loveStory.body}
                </p>
              </section>
            ) : null}

            {isVisible(sections, "gallery") && cover ? (
              <section className="grid grid-cols-2 gap-1 px-4 py-3">
                {content.gallery.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square overflow-hidden"
                  >
                    <Image
                      src={item.imageUrl}
                      alt=""
                      fill
                      sizes="170px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </section>
            ) : null}

            {isVisible(sections, "events") ? (
              <section className="space-y-3 px-6 py-8">
                <span className="text-[8px] font-semibold tracking-[0.18em] text-secondary uppercase">
                  Sacred schedule
                </span>
                <h2 className="font-serif text-[20px] font-semibold">
                  Celebration Itinerary
                </h2>
                {content.events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-[8px] bg-surface-lowest p-3 text-left shadow-sm"
                  >
                    <span className="text-[8px] font-semibold tracking-[0.12em] text-secondary uppercase">
                      {event.title}
                    </span>
                    <p className="mt-1 text-[10px] font-semibold">
                      {event.startTime} – {event.endTime} WIB
                    </p>
                    <p className="text-[9px] text-on-surface-variant">
                      {event.venue}
                    </p>
                  </div>
                ))}
              </section>
            ) : null}

            {content.quotes.map((quote) =>
              isVisible(sections, "quote", quote.id) ? (
                <blockquote
                  key={quote.id}
                  className="mx-6 my-5 border-y border-secondary/20 py-6 font-serif text-[15px] leading-6 italic"
                >
                  “{quote.text}”
                  <cite className="mt-2 block font-sans text-[8px] font-semibold tracking-[0.12em] text-secondary not-italic uppercase">
                    {quote.attribution}
                  </cite>
                </blockquote>
              ) : null,
            )}

            {isVisible(sections, "rsvp") ? (
              <section className="px-6 py-7">
                <h2 className="font-serif text-[19px] font-semibold">
                  {content.rsvp.headline}
                </h2>
                <span className="mt-4 block bg-primary py-3 text-[9px] font-semibold tracking-[0.14em] text-primary-foreground uppercase">
                  Confirm attendance
                </span>
              </section>
            ) : null}

            {isVisible(sections, "wishes") ? (
              <section className="mx-4 rounded-[10px] bg-accent/35 px-5 py-6">
                <h2 className="font-serif text-[18px] font-semibold">
                  {content.wishes.headline}
                </h2>
                <p className="mt-2 text-[9px] leading-4 text-on-surface-variant">
                  {content.wishes.prompt}
                </p>
              </section>
            ) : null}

            {isVisible(sections, "digitalGift") ? (
              <section className="px-6 py-7">
                <Gift
                  aria-hidden
                  size={18}
                  className="mx-auto text-secondary"
                />
                <h2 className="mt-2 font-serif text-[18px] font-semibold">
                  Tanda Kasih
                </h2>
                <p className="mt-1 text-[9px] text-on-surface-variant">
                  {content.digitalGift.accounts.length} gift accounts available
                </p>
              </section>
            ) : null}

            {isVisible(sections, "livestream") ? (
              <section className="mx-4 rounded-[10px] bg-surface-low p-5">
                <h2 className="font-serif text-[18px] font-semibold">
                  {content.livestream.title}
                </h2>
                <p className="mt-1 text-[9px] leading-4 text-on-surface-variant">
                  {content.livestream.accessNote}
                </p>
              </section>
            ) : null}

            {isVisible(sections, "closing") ? (
              <section className="mt-7 bg-surface-container px-6 py-8">
                <h2 className="font-serif text-[20px] font-semibold">
                  {content.closing.title}
                </h2>
                <p className="mt-2 text-[10px] leading-5 text-on-surface-variant">
                  {content.closing.message}
                </p>
                <p className="mt-4 font-serif text-[15px] italic">
                  {content.closing.signature}
                </p>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-xs text-center text-[10px] leading-4 text-on-surface-variant">
        Preview updates instantly from local editor state. No backend request is
        made for each field change.
      </p>
    </aside>
  );
}
