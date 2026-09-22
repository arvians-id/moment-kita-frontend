import { ContactRound, Hourglass, MailCheck, UsersRound } from "lucide-react";

import type { GuestDirectorySummary } from "@/types";

const cardClass =
  "group relative min-h-44 overflow-hidden bg-surface-lowest p-5 shadow-sm sm:p-6";

export function GuestSummaryCards({
  summary,
}: {
  summary: GuestDirectorySummary;
}) {
  const dispatchRate = summary.invitationEntries
    ? Math.round((summary.dispatchedEntries / summary.invitationEntries) * 100)
    : 0;
  const responseRate = summary.invitationEntries
    ? Math.round(
        ((summary.invitationEntries - summary.pendingResponses) /
          summary.invitationEntries) *
          100,
      )
    : 0;

  const cards = [
    {
      label: "Total Guests",
      value: summary.totalGuests,
      suffix: "allocated seats",
      note: "Across every personalised invitation",
      Icon: UsersRound,
      progress: null,
    },
    {
      label: "Invitation Entries",
      value: summary.invitationEntries,
      suffix: "entries",
      note: `${summary.dispatchedEntries} dispatched · ${summary.invitationEntries - summary.dispatchedEntries} unsent`,
      Icon: ContactRound,
      progress: dispatchRate,
    },
    {
      label: "Confirmed Pax",
      value: summary.confirmedPax,
      suffix: "attending",
      note: `${responseRate}% response completion`,
      Icon: MailCheck,
      progress: responseRate,
    },
    {
      label: "RSVP Pending",
      value: summary.pendingResponses,
      suffix: "awaiting",
      note: "Gentle reminders ready to send",
      Icon: Hourglass,
      progress: null,
    },
  ];

  return (
    <section className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 xl:grid-cols-4 lg:px-8">
      {cards.map(({ label, value, suffix, note, Icon, progress }) => (
        <article key={label} className={cardClass}>
          <span
            aria-hidden
            className="absolute -right-7 -bottom-7 size-28 rounded-full bg-surface-low transition-transform duration-300 group-hover:scale-110"
          />
          <div className="relative flex h-full flex-col justify-between gap-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
                {label}
              </p>
              <Icon aria-hidden size={20} className="text-secondary" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <strong className="font-serif text-[38px] leading-none font-semibold">
                  {value}
                </strong>
                <span className="text-[11px] text-on-surface-variant">
                  {suffix}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
                {note}
              </p>
              {progress !== null ? (
                <div
                  className="mt-4 h-1.5 overflow-hidden bg-surface-container"
                  aria-label={`${progress}% complete`}
                >
                  <div
                    className="h-full bg-secondary"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
