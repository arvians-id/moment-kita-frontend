import {
  CalendarCheck2,
  Eye,
  Heart,
  MessageSquareHeart,
  ShieldCheck,
  UserCheck,
  UsersRound,
} from "lucide-react";

import type { AdminInvitationDetailData } from "@/types";

import {
  adminInvitationDateFormat,
  adminInvitationDateTimeFormat,
  formatMaybeDate,
} from "./invitation-detail-formatters";

function MetricCard({
  index,
  label,
  value,
  note,
  icon: Icon,
}: {
  index: string;
  label: string;
  value: string;
  note: string;
  icon: typeof Eye;
}) {
  return (
    <article className="flex min-h-36 flex-col justify-between border border-border bg-surface-lowest p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[8px] font-semibold tracking-[0.16em] text-secondary uppercase">
          {index} — {label}
        </span>
        <Icon aria-hidden size={15} className="text-on-surface-variant" />
      </div>
      <div>
        <p className="font-serif text-[28px] leading-8">{value}</p>
        <p className="mt-2 bg-surface-low p-2 text-[9px] leading-4 text-on-surface-variant">
          {note}
        </p>
      </div>
    </article>
  );
}

function PhonePreview({ data }: { data: AdminInvitationDetailData }) {
  const names = data.invitation.coupleLabel.split(" — ")[0];
  return (
    <article
      id="invitation-preview"
      className="scroll-mt-24 border border-border bg-surface-low p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
            Live Rendering Viewport
          </p>
          <h2 className="mt-1 font-serif text-[24px]">
            Client View Simulation
          </h2>
        </div>
        <span className="bg-surface-container px-2 py-1 font-mono text-[9px] text-on-surface-variant">
          Mobile preview
        </span>
      </div>
      <div className="mx-auto mt-6 w-full max-w-[300px] rounded-[34px] bg-[#151412] p-2.5 shadow-2xl">
        <div className="relative overflow-hidden rounded-[26px] bg-[#fcf9f3]">
          <div className="relative flex h-72 flex-col items-center justify-end overflow-hidden bg-[radial-gradient(circle_at_top,_#b98f7e,_#765144_45%,_#241d1a)] p-6 text-center text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65" />
            <div className="relative">
              <p className="text-[8px] font-semibold tracking-[0.22em] text-[#f3d8ce] uppercase">
                The Wedding Celebration Of
              </p>
              <h3 className="mt-2 font-serif text-[29px]">{names}</h3>
              <p className="mt-1 text-[9px] text-white/80">
                {adminInvitationDateFormat.format(
                  new Date(data.invitation.eventDate),
                )}
              </p>
            </div>
          </div>
          <div className="space-y-3 p-4 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-full bg-secondary font-serif text-[14px] text-white">
              MK
            </div>
            <p className="text-[8px] font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
              You Are Cordially Invited
            </p>
            <div className="bg-surface-low p-3">
              <p className="text-[8px] tracking-[0.14em] text-secondary uppercase">
                Wedding Venue
              </p>
              <p className="mt-1 font-serif text-[14px]">
                {data.invitation.venue}
              </p>
            </div>
            <div className="bg-primary py-2.5 text-[9px] font-semibold tracking-[0.13em] text-primary-foreground uppercase">
              Confirm RSVP Attendance
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between bg-surface-container px-3 py-2 text-[9px] text-on-surface-variant">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-600" /> Responsive
          preview ready
        </span>
        <span className="font-mono">Mock renderer</span>
      </div>
    </article>
  );
}

export function InvitationOverview({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  const { invitation, engagement } = data;

  return (
    <div role="tabpanel" className="space-y-6">
      <section
        aria-label="Invitation operational metrics"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        <MetricCard
          index="01"
          label="Views"
          value={engagement.views.toLocaleString("en-US")}
          note="Unique invitation views"
          icon={Eye}
        />
        <MetricCard
          index="02"
          label="Guest List"
          value={engagement.guests.totalInvited.toLocaleString("en-US")}
          note={`${engagement.guests.confirmedPax} confirmed pax`}
          icon={UsersRound}
        />
        <MetricCard
          index="03"
          label="RSVP"
          value={engagement.rsvpCount.toLocaleString("en-US")}
          note={`${engagement.guests.pending} responses pending`}
          icon={UserCheck}
        />
        <MetricCard
          index="04"
          label="Attending"
          value={engagement.guests.attending.toLocaleString("en-US")}
          note={`${engagement.guests.declined} not attending`}
          icon={CalendarCheck2}
        />
        <MetricCard
          index="05"
          label="Wishes"
          value={engagement.wishes.toLocaleString("en-US")}
          note={`${engagement.pendingWishes} pending approval`}
          icon={MessageSquareHeart}
        />
      </section>

      <section className="grid items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <PhonePreview data={data} />
          <article className="border border-border bg-surface-low p-5 shadow-sm">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
              Extension History
            </p>
            <h2 className="mt-1 font-serif text-[22px]">Hosting duration</h2>
            {data.extensionHistory.length ? (
              <div className="mt-4 space-y-3">
                {data.extensionHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-surface-lowest p-4 text-[10px] leading-5 text-on-surface-variant"
                  >
                    <div className="flex justify-between gap-3">
                      <strong className="text-on-surface">
                        +{item.days} days
                      </strong>
                      <span>
                        {adminInvitationDateFormat.format(
                          new Date(item.createdAt),
                        )}
                      </span>
                    </div>
                    <p className="mt-1">
                      {adminInvitationDateFormat.format(
                        new Date(item.previousExpiration),
                      )}{" "}
                      →{" "}
                      {adminInvitationDateFormat.format(
                        new Date(item.newExpiration),
                      )}
                    </p>
                    <p>
                      {item.reason} · {item.actor}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-[11px] text-on-surface-variant">
                No duration extensions have been recorded.
              </p>
            )}
          </article>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <article className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                  Architecture &amp; Content
                </p>
                <h2 className="mt-1 font-serif text-[24px]">
                  Digital Invitation Specifications
                </h2>
              </div>
              <span className="bg-surface-container px-2.5 py-1 text-[9px] font-semibold uppercase">
                Revision v{invitation.templateVersion}
              </span>
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Template", invitation.templateName],
                [
                  "Created",
                  adminInvitationDateTimeFormat.format(
                    new Date(invitation.createdAt),
                  ),
                ],
                ["Finalized", formatMaybeDate(invitation.finalizedAt)],
                ["Published", formatMaybeDate(invitation.publishedAt)],
                ["Expiration", formatMaybeDate(invitation.expiresAt)],
                ["Status", invitation.status],
              ].map(([label, value]) => (
                <div key={label} className="bg-surface-low p-4">
                  <dt className="text-[8px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-[12px] font-semibold capitalize">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <p className="text-[8px] font-semibold tracking-[0.13em] text-secondary uppercase">
                Enabled Sections
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.content.enabledSections.map((section) => (
                  <span
                    key={section}
                    className="inline-flex items-center gap-1.5 bg-surface-container px-2.5 py-1 text-[9px]"
                  >
                    <ShieldCheck
                      aria-hidden
                      size={12}
                      className="text-emerald-700"
                    />
                    {section}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                  Commercial &amp; Licensing
                </p>
                <h2 className="mt-1 font-serif text-[24px]">
                  Package Quota &amp; Utilization
                </h2>
              </div>
              <span className="bg-accent px-2.5 py-1 text-[9px] font-semibold uppercase">
                {data.currentPackage?.name ?? "No active package"}
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="bg-surface-low p-4">
                <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                  Quota allocation
                </p>
                <p className="mt-2 font-serif text-[24px]">
                  {invitation.quotaConsumed ? "1 consumed" : "Not consumed"}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-on-surface-variant">
                  Finalize consumes quota. Cancellation never silently returns
                  it.
                </p>
              </div>
              <div className="bg-surface-low p-4">
                <p className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                  Commercial owner
                </p>
                <p className="mt-2 text-[13px] font-semibold">
                  {data.customer.name}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-on-surface-variant">
                  {data.customer.linkedUserId
                    ? `Registered · ${data.customer.linkedUserId}`
                    : "Managed Customer · No linked login account"}
                </p>
              </div>
            </div>
          </article>

          <article className="grid gap-4 border border-border bg-surface-lowest p-5 shadow-sm sm:grid-cols-2 sm:p-6">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                Recent RSVP Intake
              </p>
              <h2 className="mt-1 font-serif text-[22px]">Guest responses</h2>
              <div className="mt-4 space-y-2">
                {data.recentGuests.length ? (
                  data.recentGuests.slice(0, 3).map((guest) => (
                    <div
                      key={guest.id}
                      className="flex items-center gap-3 bg-surface-low p-3"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-[9px] font-bold">
                        {guest.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-semibold">
                          {guest.name}
                        </p>
                        <p className="text-[9px] text-on-surface-variant">
                          {guest.responseLabel}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="mt-4 text-[10px] text-on-surface-variant">
                    No responses collected in this lifecycle state.
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
                <Heart aria-hidden size={13} /> Curated Wishes
              </p>
              <h2 className="mt-1 font-serif text-[22px]">Guestbook stream</h2>
              {data.recentWishes[0] ? (
                <blockquote className="mt-4 border-l-2 border-secondary bg-surface-low p-4 font-serif text-[14px] leading-6 italic">
                  “{data.recentWishes[0].message}”
                  <footer className="mt-3 font-sans text-[9px] not-italic text-on-surface-variant">
                    {data.recentWishes[0].author} ·{" "}
                    {data.recentWishes[0].relation}
                  </footer>
                </blockquote>
              ) : (
                <p className="mt-4 text-[10px] text-on-surface-variant">
                  No wishes recorded yet.
                </p>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="border-l-2 border-secondary bg-[#201f1d] p-5 text-white shadow-xl sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.16em] text-[#ffb59c] uppercase">
              Restricted Operational Zone
            </p>
            <h2 className="mt-1 font-serif text-[24px]">
              Sensitive Lifecycle &amp; Security Controls
            </h2>
            <p className="mt-2 max-w-3xl text-[10px] leading-5 text-white/65">
              Slug, template, duration, publication, and cancellation overrides
              require explicit confirmation. Privileged changes collect an audit
              reason and remain frontend-only until backend enforcement is
              implemented.
            </p>
          </div>
          <span className="bg-white/10 px-3 py-2 text-[9px] font-semibold uppercase">
            Superuser · Atelier Admin
          </span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Slug override", "Preserve redirects and record the reason."],
            [
              "Template migration",
              "Review section compatibility before applying.",
            ],
            ["Duration extension", "Add to the current timer; never reset it."],
            ["Cancellation", "Retain data and do not return quota silently."],
          ].map(([title, note]) => (
            <div key={title} className="bg-white/5 p-4">
              <p className="text-[10px] font-semibold text-[#ffdbcf]">
                {title}
              </p>
              <p className="mt-2 text-[9px] leading-4 text-white/60">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
