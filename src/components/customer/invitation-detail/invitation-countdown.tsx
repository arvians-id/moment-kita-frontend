import { CalendarCheck } from "lucide-react";

import type { CustomerInvitation } from "@/types";

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});
const timeOfDay = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

export function InvitationCountdown({
  invitation,
  daysUntilWedding,
}: {
  invitation: CustomerInvitation;
  daysUntilWedding: number | null;
}) {
  const eventDate = new Date(invitation.eventDate);
  const hasPassed = daysUntilWedding === null;

  return (
    <section className="flex flex-col items-start justify-between gap-6 bg-surface-lowest p-6 shadow-sm sm:flex-row sm:items-center">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
          {hasPassed ? "Celebration complete" : "Countdown"}
        </span>
        <h2 className="font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
          {hasPassed
            ? "The celebration has taken place"
            : `${daysUntilWedding} days until we say “I do”`}
        </h2>
        <p className="text-[13px] leading-5 text-on-surface-variant">
          {longDate.format(eventDate)} • {timeOfDay.format(eventDate)} WIB •{" "}
          {invitation.venue}
        </p>
      </div>

      {hasPassed ? (
        <span className="grid size-16 shrink-0 place-items-center bg-surface-container text-on-surface-variant">
          <CalendarCheck aria-hidden size={24} />
        </span>
      ) : (
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-16 w-16 flex-col items-center justify-center bg-surface-container">
            <span className="font-serif text-[22px] leading-[30px] font-semibold">
              {daysUntilWedding}
            </span>
            <span className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Days
            </span>
          </div>
          <div className="flex h-16 w-16 flex-col items-center justify-center bg-surface-container">
            <span className="font-serif text-[22px] leading-[30px] font-semibold">
              {invitation.guestCount}
            </span>
            <span className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Guests
            </span>
          </div>
          <div className="flex h-16 w-16 flex-col items-center justify-center bg-surface-container">
            <span className="font-serif text-[22px] leading-[30px] font-semibold">
              {invitation.confirmedCount}
            </span>
            <span className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Confirmed
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
