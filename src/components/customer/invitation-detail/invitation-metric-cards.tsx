import { Heart, Table2, UserCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { InvitationDetail } from "@/types";
import { numberFormat } from "@/lib/format";


interface MetricCard {
  kicker: string;
  icon: LucideIcon;
  value: string;
  unit: string;
  note: string;
  /** 0–100; drives the hairline progress rule under each card. */
  percent: number;
  accent?: boolean;
}

function buildCards(detail: InvitationDetail): MetricCard[] {
  const { invitation, guests, linksSent, wishes } = detail;
  const replied = guests ? guests.attending + guests.declined : 0;
  const responseRate =
    guests && guests.totalInvited > 0
      ? Math.round((replied / guests.totalInvited) * 100)
      : 0;

  return [
    {
      kicker: "01 — Total audience",
      icon: Users,
      value: numberFormat.format(invitation.guestCount),
      unit: "guests listed",
      note:
        linksSent > 0
          ? `${linksSent} personalized links sent, ${detail.linksPending} pending dispatch.`
          : "No personalized links dispatched yet.",
      percent:
        invitation.guestCount > 0
          ? (linksSent / invitation.guestCount) * 100
          : 0,
    },
    {
      kicker: "02 — RSVP response rate",
      icon: UserCheck,
      value: `${responseRate}%`,
      unit: guests ? `(${replied} replied)` : "awaiting responses",
      note: guests
        ? `${guests.attending} attending warmly, ${guests.declined} sent warm regrets.`
        : "Responses open once the suite is published.",
      percent: responseRate,
      accent: true,
    },
    {
      kicker: "03 — Confirmed pax",
      icon: Table2,
      value: numberFormat.format(guests?.confirmedPax ?? 0),
      unit: "seats reserved",
      note: guests
        ? `${guests.attendingAdults} adult seats, ${guests.attendingChildren} child meals configured.`
        : "Seating is planned after the first responses arrive.",
      percent:
        guests && guests.cateringTarget > 0
          ? (guests.confirmedPax / guests.cateringTarget) * 100
          : 0,
    },
    {
      kicker: "04 — Heartfelt wishes",
      icon: Heart,
      value: numberFormat.format(invitation.metrics?.wishes ?? wishes.length),
      unit: "guest notes",
      note:
        wishes.length > 0
          ? `Latest: ${wishes[0].author}`
          : "Guest blessings appear here once the suite is live.",
      percent: wishes.length > 0 ? 90 : 0,
      accent: true,
    },
  ];
}

export function InvitationMetricCards({
  detail,
}: {
  detail: InvitationDetail;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {buildCards(detail).map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.kicker}
            className="flex flex-col justify-between bg-surface-lowest p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                {card.kicker}
              </span>
              <Icon
                aria-hidden
                size={19}
                className={`shrink-0 ${card.accent ? "text-secondary" : "text-on-surface-variant"}`}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-serif text-[36px] leading-none font-medium md:text-[40px]">
                  {card.value}
                </span>
                <span
                  className={`text-[13px] leading-5 ${card.accent ? "font-medium text-secondary" : "text-on-surface-variant"}`}
                >
                  {card.unit}
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
                {card.note}
              </p>
            </div>
            <div
              aria-hidden
              className="mt-4 h-1.5 w-full overflow-hidden bg-surface-container"
            >
              <div
                className={
                  card.accent ? "h-full bg-secondary" : "h-full bg-primary"
                }
                style={{
                  width: `${Math.min(100, Math.max(0, card.percent))}%`,
                }}
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}
