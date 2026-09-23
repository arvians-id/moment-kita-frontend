import {
  CheckCircle2,
  Clock3,
  EyeOff,
  Gift,
  History,
  MessageSquareHeart,
  UserCheck,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

import type { AdminInvitationDetailData } from "@/types";

import { adminInvitationDateTimeFormat } from "./invitation-detail-formatters";

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-serif text-[28px]">{title}</h2>
        <p className="mt-2 max-w-2xl text-[11px] leading-5 text-on-surface-variant">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section
      role="tabpanel"
      className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7"
    >
      {children}
    </section>
  );
}

export function InvitationContentSection({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Invitation Content"
        title="Content summary"
        description="A high-level operational view of enabled sections. Full editing stays in the dedicated Studio Editor."
        action={
          <Link
            href={`/admin/invitations/${data.invitation.id}/edit`}
            prefetch={false}
            className="inline-flex min-h-10 items-center justify-center bg-primary px-4 text-[9px] font-semibold tracking-[0.11em] text-primary-foreground uppercase"
          >
            Edit Invitation
          </Link>
        }
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.content.enabledSections.map((section, index) => (
          <article key={section} className="bg-surface-low p-4">
            <p className="text-[8px] font-semibold tracking-[0.13em] text-secondary uppercase">
              Section {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-[20px]">{section}</h3>
            <p className="mt-2 text-[10px] text-on-surface-variant">
              Enabled and included in the current published composition.
            </p>
          </article>
        ))}
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="bg-surface-container p-4">
          <dt className="text-[8px] uppercase">Events</dt>
          <dd className="mt-1 font-serif text-[24px]">
            {data.content.eventCount}
          </dd>
        </div>
        <div className="bg-surface-container p-4">
          <dt className="text-[8px] uppercase">Gallery Assets</dt>
          <dd className="mt-1 font-serif text-[24px]">
            {data.content.galleryCount}
          </dd>
        </div>
        <div className="bg-surface-container p-4">
          <dt className="text-[8px] uppercase">Audio Score</dt>
          <dd className="mt-1 text-[12px] font-semibold">
            {data.content.audioEnabled ? "Enabled" : "Disabled"}
          </dd>
        </div>
      </dl>
    </Panel>
  );
}

export function InvitationGuestsSection({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  const guests = data.engagement.guests;
  return (
    <Panel>
      <SectionHeader
        eyebrow="Invitation Guests"
        title="Guest management preview"
        description="Invitation-scoped guest context only. Full Customer Guest Management is not duplicated here."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Guest Entries", guests.totalInvited, UsersRound],
          ["Confirmed Pax", guests.confirmedPax, UserCheck],
          ["Pending", guests.pending, Clock3],
          ["Invited This Week", guests.invitedThisWeek, CheckCircle2],
        ].map(([label, value, Icon]) => {
          const MetricIcon = Icon as typeof UsersRound;
          return (
            <article key={String(label)} className="bg-surface-low p-4">
              <MetricIcon aria-hidden size={16} className="text-secondary" />
              <p className="mt-4 font-serif text-[28px]">{String(value)}</p>
              <p className="mt-1 text-[9px] font-semibold uppercase">
                {String(label)}
              </p>
            </article>
          );
        })}
      </div>
      <div className="mt-6 space-y-2">
        {data.recentGuests.length ? (
          data.recentGuests.map((guest) => (
            <article
              key={guest.id}
              className="flex flex-col gap-3 border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-accent text-[10px] font-bold">
                  {guest.initials}
                </span>
                <div>
                  <p className="text-[11px] font-semibold">{guest.name}</p>
                  <p className="text-[9px] text-on-surface-variant">
                    {guest.tag ?? "Guest"}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-secondary">
                {guest.responseLabel}
              </span>
            </article>
          ))
        ) : (
          <p className="bg-surface-low p-5 text-[11px] text-on-surface-variant">
            No guest activity is available for this invitation yet.
          </p>
        )}
      </div>
    </Panel>
  );
}

export function InvitationRsvpSection({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  const guests = data.engagement.guests;
  return (
    <Panel>
      <SectionHeader
        eyebrow="RSVP & Attendance"
        title="Response summary"
        description="A compact view of response progress and confirmed attendance for this invitation."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Responded", data.engagement.rsvpCount],
          ["Attending", guests.attending],
          ["Not Attending", guests.declined],
          ["Pending", guests.pending],
          ["Confirmed Pax", guests.confirmedPax],
        ].map(([label, value]) => (
          <article key={label} className="bg-surface-low p-4">
            <p className="font-serif text-[28px]">{value}</p>
            <p className="mt-1 text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              {label}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-6 bg-surface-container p-4">
        <div className="flex justify-between text-[10px]">
          <span>Response progress</span>
          <strong>
            {guests.totalInvited
              ? Math.round(
                  (data.engagement.rsvpCount / guests.totalInvited) * 100,
                )
              : 0}
            %
          </strong>
        </div>
        <div className="mt-3 h-2 bg-surface-high">
          <div
            className="h-full bg-secondary"
            style={{
              width: `${guests.totalInvited ? Math.round((data.engagement.rsvpCount / guests.totalInvited) * 100) : 0}%`,
            }}
          />
        </div>
      </div>
    </Panel>
  );
}

export function InvitationWishesSection({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Wishes & Guestbook"
        title="Moderation summary"
        description="Invitation-scoped wish totals and the latest guestbook messages."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total Wishes", data.engagement.wishes, MessageSquareHeart],
          ["Published", data.engagement.publishedWishes, CheckCircle2],
          ["Pending Approval", data.engagement.pendingWishes, Clock3],
          ["Hidden", data.engagement.hiddenWishes, EyeOff],
        ].map(([label, value, Icon]) => {
          const MetricIcon = Icon as typeof MessageSquareHeart;
          return (
            <article key={String(label)} className="bg-surface-low p-4">
              <MetricIcon aria-hidden size={15} className="text-secondary" />
              <p className="mt-4 font-serif text-[27px]">{String(value)}</p>
              <p className="mt-1 text-[8px] font-semibold uppercase">
                {String(label)}
              </p>
            </article>
          );
        })}
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {data.recentWishes.length ? (
          data.recentWishes.map((wish) => (
            <blockquote
              key={wish.id}
              className="border-l-2 border-secondary bg-surface-low p-5 font-serif text-[15px] leading-7 italic"
            >
              “{wish.message}”
              <footer className="mt-4 font-sans text-[9px] not-italic text-on-surface-variant">
                {wish.author} · {wish.relation} · {wish.occurredAt}
              </footer>
            </blockquote>
          ))
        ) : (
          <p className="bg-surface-low p-5 text-[11px] text-on-surface-variant">
            No wishes recorded yet.
          </p>
        )}
      </div>
    </Panel>
  );
}

export function InvitationGiftSection({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Digital Gift"
        title="Gift configuration"
        description="Current invitation-level gift settings. Account values are masked in this Admin summary."
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="bg-surface-low p-5">
          <Gift aria-hidden size={18} className="text-secondary" />
          <p className="mt-4 text-[9px] font-semibold uppercase">
            Configuration
          </p>
          <p className="mt-1 font-serif text-[26px]">
            {data.giftEnabled ? "Enabled" : "Disabled"}
          </p>
        </article>
        <article className="bg-surface-low p-5">
          <p className="text-[9px] font-semibold uppercase">Gift Accounts</p>
          <p className="mt-3 font-serif text-[28px]">
            {data.gift?.accounts.length ?? 0}
          </p>
          <p className="mt-2 text-[10px] text-on-surface-variant">
            Configured bank and e-wallet destinations
          </p>
        </article>
        <article className="bg-surface-low p-5">
          <p className="text-[9px] font-semibold uppercase">
            Physical Gift Address
          </p>
          <p className="mt-3 text-[13px] font-semibold">
            {data.gift?.deliveryAddress ? "Configured" : "Not configured"}
          </p>
          <p className="mt-2 text-[10px] leading-4 text-on-surface-variant">
            {data.gift?.deliveryAddress ??
              "No physical delivery address is visible to guests."}
          </p>
        </article>
      </div>
    </Panel>
  );
}

export function InvitationVersionsSection({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Version History"
        title="Recent saved versions"
        description="A concise history preview. Full diff inspection remains a contextual future enhancement."
      />
      <div className="mt-6 space-y-2">
        {data.versions.map((version) => (
          <article
            key={version.id}
            className="flex flex-col gap-3 border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <History
                aria-hidden
                size={16}
                className="mt-0.5 text-secondary"
              />
              <div>
                <p className="text-[11px] font-semibold">
                  Version {version.versionNumber}
                  {version.isCurrent ? " · Current" : ""}
                </p>
                <p className="mt-1 text-[10px] text-on-surface-variant">
                  {version.summary}
                </p>
              </div>
            </div>
            <p className="text-[9px] text-on-surface-variant">
              {adminInvitationDateTimeFormat.format(new Date(version.savedAt))}{" "}
              · {version.actor}
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

export function InvitationActivitySection({
  data,
}: {
  data: AdminInvitationDetailData;
}) {
  return (
    <Panel>
      <SectionHeader
        eyebrow="Invitation Activity"
        title="Lifecycle & admin activity"
        description="A contextual record for this invitation only—not a global Audit Logs product."
      />
      <ol className="mt-6 space-y-1">
        {data.activity.map((entry, index) => (
          <li
            key={entry.id}
            className="relative flex gap-4 pb-5 before:absolute before:top-7 before:bottom-0 before:left-[7px] before:w-px before:bg-border last:pb-0 last:before:hidden"
          >
            <span className="mt-1.5 size-3.5 shrink-0 rounded-full border-2 border-secondary bg-surface-lowest" />
            <div>
              <p className="text-[11px] font-semibold">{entry.message}</p>
              <p className="mt-1 text-[9px] text-on-surface-variant">
                {entry.occurredAt}
              </p>
              {index === 0 ? (
                <span className="mt-2 inline-flex bg-accent px-2 py-0.5 text-[8px] font-semibold uppercase">
                  Most recent
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
