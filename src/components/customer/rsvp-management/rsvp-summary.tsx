import { CheckCircle2, Clock3, UserRoundCheck, UsersRound } from "lucide-react";

import type { RsvpSummary } from "./rsvp-utils";

export function RsvpSummaryCards({ summary }: { summary: RsvpSummary }) {
  const totalParties = summary.responded + summary.pending;
  const responseRate = totalParties
    ? Math.round((summary.responded / totalParties) * 100)
    : 0;
  const attendingWidth = totalParties
    ? (summary.attending / totalParties) * 100
    : 0;
  const declinedWidth = totalParties
    ? (summary.notAttending / totalParties) * 100
    : 0;

  return (
    <section
      aria-label="RSVP summary"
      className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6"
    >
      <article className="col-span-2 flex min-h-44 flex-col justify-between bg-surface-lowest p-5 shadow-sm md:col-span-2 xl:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
            Response Progress
          </p>
          <span className="font-serif text-[24px]">{responseRate}%</span>
        </div>
        <div>
          <p className="font-serif text-[32px] leading-none">
            {summary.responded}{" "}
            <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              of {totalParties} parties
            </span>
          </p>
          <div
            className="mt-5 flex h-2 overflow-hidden bg-surface-container"
            aria-label={`${summary.attending} attending, ${summary.notAttending} not attending, ${summary.pending} pending`}
          >
            <span
              className="h-full bg-secondary"
              style={{ width: `${attendingWidth}%` }}
            />
            <span
              className="h-full bg-terracotta-soft"
              style={{ width: `${declinedWidth}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
            <span>{summary.attending} attending</span>
            <span>{summary.notAttending} not attending</span>
            <span>{summary.pending} pending</span>
          </div>
        </div>
      </article>

      <Metric
        label="Invited Guests"
        value={summary.totalInvited}
        note="Allocated pax"
        Icon={UsersRound}
      />
      <Metric
        label="Responded"
        value={summary.responded}
        note="Recorded replies"
        Icon={CheckCircle2}
      />
      <Metric
        label="Pending"
        value={summary.pending}
        note="Awaiting reply"
        Icon={Clock3}
      />
      <Metric
        label="Confirmed Pax"
        value={summary.confirmedPax}
        note={`${summary.attending} attending parties`}
        Icon={UserRoundCheck}
      />
    </section>
  );
}

function Metric({
  label,
  value,
  note,
  Icon,
}: {
  label: string;
  value: number;
  note: string;
  Icon: typeof UsersRound;
}) {
  return (
    <article className="min-h-36 bg-surface-lowest p-4 shadow-sm sm:p-5 xl:min-h-44">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase">
          {label}
        </p>
        <Icon aria-hidden size={17} className="text-secondary" />
      </div>
      <p className="mt-6 font-serif text-[34px] leading-none sm:text-[40px]">
        {value}
      </p>
      <p className="mt-2 text-[10px] leading-4 text-on-surface-variant">
        {note}
      </p>
    </article>
  );
}
