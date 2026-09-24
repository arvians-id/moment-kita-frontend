import {
  CalendarDays,
  CalendarPlus,
  Eye,
  Hourglass,
  Link2,
  MapPin,
  PenLine,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

import { CopyLinkButton } from "@/components/customer/dashboard/copy-link-button";
import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import { publicConfig } from "@/lib/config";
import type { CustomerInvitation } from "@/types";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const primaryActionClass =
  "inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary";
const secondaryActionClass =
  "inline-flex items-center justify-center gap-2 bg-surface-container px-4 py-3 text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high";

export function InvitationSpotlight({
  invitation,
  daysUntilWedding,
}: {
  invitation: CustomerInvitation;
  daysUntilWedding: number | null;
}) {
  const invitationUrl = `${publicConfig.publicHost}/${invitation.slug}`;
  const monogram = invitation.coupleLabel
    .split("&")
    .map((part) => part.trim().charAt(0))
    .join("&");

  return (
    <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
      <article className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[12px] bg-surface-lowest p-6 shadow-[0_16px_40px_-12px_rgba(46,38,33,0.06),0_2px_6px_0_rgba(46,38,33,0.02)] sm:p-7 lg:col-span-7 lg:p-9 xl:col-span-8">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -bottom-12 font-serif text-[160px] leading-none text-primary opacity-[0.04] select-none"
        >
          {monogram}
        </span>

        <div className="z-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <InvitationStatusBadge status={invitation.status} />
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Suite ID #{invitation.id.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
              Primary invitation
            </span>
            <h2 className="font-serif text-[22px] leading-[30px] md:text-[28px] md:leading-9">
              {invitation.title}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-5 text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <CalendarDays
                  aria-hidden
                  size={15}
                  className="text-secondary"
                />
                {dateFormatter.format(new Date(invitation.eventDate))}
              </span>
              <span aria-hidden className="hidden sm:inline">
                •
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin aria-hidden size={15} className="text-secondary" />
                {invitation.venue}
              </span>
            </div>
          </div>

          <div className="mt-1 flex flex-col justify-between gap-3 rounded-[8px] bg-surface-low p-3.5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-highest">
                <Link2 aria-hidden size={16} />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                  Invitation address
                </span>
                <span className="truncate text-[13px] leading-5 font-medium">
                  {invitationUrl}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <CopyLinkButton value={`https://${invitationUrl}`} />
              <Link
                href={`/${invitation.slug}`}
                title="Open live invitation"
                aria-label="Open live invitation"
                className="rounded-[6px] p-1.5 text-on-surface-variant transition-colors hover:text-on-surface"
              >
                <Eye aria-hidden size={17} />
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Template
              </dt>
              <dd className="text-[13px] leading-5 font-semibold">
                {invitation.templateName}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Guests assigned
              </dt>
              <dd className="text-[13px] leading-5 font-semibold">
                {invitation.guestCount} guests
              </dd>
            </div>
            <div className="col-span-2 flex flex-col sm:col-span-1">
              <dt className="text-[10px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Confirmed
              </dt>
              <dd className="text-[13px] leading-5 font-medium text-secondary">
                {invitation.confirmedCount} attending
              </dd>
            </div>
          </dl>
        </div>

        <div className="z-10 flex flex-wrap items-center gap-3 pt-2">
          <span
            className={`${primaryActionClass} cursor-not-allowed opacity-90`}
          >
            <PenLine aria-hidden size={15} />
            Edit Invitation
          </span>
          <Link href={`/${invitation.slug}`} className={secondaryActionClass}>
            <Eye aria-hidden size={15} />
            View Invitation
          </Link>
          <span
            className={`${secondaryActionClass} cursor-not-allowed bg-secondary/10 text-secondary`}
          >
            <UserCheck aria-hidden size={15} />
            Manage RSVP
          </span>
        </div>
      </article>

      <aside className="flex flex-col justify-between gap-6 overflow-hidden rounded-[12px] bg-surface-high p-6 shadow-[0_16px_40px_-12px_rgba(46,38,33,0.06)] sm:p-7 lg:col-span-5 xl:col-span-4">
        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-lowest px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase">
            <Hourglass aria-hidden size={13} />
            Countdown
          </span>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <span className="font-serif text-[64px] leading-none tracking-tight lg:text-[84px]">
              {daysUntilWedding ?? "—"}
            </span>
            <span className="font-serif text-2xl text-secondary italic">
              days
            </span>
          </div>
          <p className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
            Until we say &ldquo;I do&rdquo;
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-[8px] bg-surface-lowest p-3.5">
          <div className="flex min-w-0 flex-col">
            <span className="text-[10px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
              Ceremony location
            </span>
            <span className="truncate text-[13px] leading-5 font-medium">
              {invitation.venue}
            </span>
          </div>
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-[6px] bg-surface-container text-on-surface-variant"
          >
            <CalendarPlus size={16} />
          </span>
        </div>
      </aside>
    </section>
  );
}
