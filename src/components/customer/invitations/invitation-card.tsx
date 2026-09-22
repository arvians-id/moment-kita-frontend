import {
  Archive,
  BadgeCheck,
  Ban,
  CalendarDays,
  CalendarX,
  CheckCircle2,
  CopyPlus,
  ExternalLink,
  Eye,
  FileText,
  Info,
  Link2,
  Images,
  Lock,
  MailCheck,
  MapPin,
  PenLine,
  Rocket,
  SlidersHorizontal,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CopyLinkButton } from "@/components/customer/dashboard/copy-link-button";
import { publicConfig } from "@/lib/config";
import type { CustomerInvitation, InvitationStatus } from "@/types";

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});
const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});
const numberFormat = new Intl.NumberFormat("en-US");

const chipBase =
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase";
const primaryActionClass =
  "flex h-9 flex-1 items-center justify-center gap-2 px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors";
const secondaryActionClass =
  "flex h-9 items-center justify-center gap-1.5 border border-surface-highest bg-surface-lowest px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-container";
/** Destinations that do not exist yet stay inert instead of linking to a 404. */
const inactiveClass = "cursor-not-allowed opacity-90";

const slotLabel: Record<InvitationStatus, string> = {
  published: "Live suite",
  draft: "Draft",
  finalized: "Finalized proof",
  expired: "Archived",
  cancelled: "Cancelled",
};

function StatusChip({ invitation }: { invitation: CustomerInvitation }) {
  const { status, progress, expiresAt } = invitation;
  const accent = "bg-accent text-accent-foreground";
  const muted = "bg-surface-highest text-on-surface-variant";

  let label: string = slotLabel[status];
  let tone = muted;
  let Icon: LucideIcon | null = null;
  let dot = false;

  if (status === "published") {
    label = "Published & Interactive";
    tone = accent;
    dot = true;
  } else if (status === "draft") {
    const percent = progress
      ? Math.round((progress.completedSections / progress.totalSections) * 100)
      : 0;
    label = `In draft • ${percent}% completed`;
    dot = true;
  } else if (status === "finalized") {
    label = "Ready to publish";
    tone = accent;
    Icon = BadgeCheck;
  } else if (status === "expired") {
    label = expiresAt
      ? `Expired on ${shortDate.format(new Date(expiresAt))}`
      : "Expired";
    Icon = Archive;
  } else {
    label = "Cancelled";
    Icon = Ban;
  }

  return (
    <span className={`${chipBase} ${tone}`}>
      {dot ? (
        <span aria-hidden className="size-1.5 rounded-full bg-secondary" />
      ) : null}
      {Icon ? <Icon aria-hidden size={13} /> : null}
      {label}
    </span>
  );
}

function PreviewImage({ invitation }: { invitation: CustomerInvitation }) {
  if (!invitation.previewImage) return null;

  return (
    <div className="relative aspect-[3/4] overflow-hidden border border-surface-highest bg-surface-container sm:col-span-5">
      <Image
        src={invitation.previewImage}
        alt={`${invitation.coupleLabel} invitation preview`}
        fill
        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 100vw"
        className="object-cover"
      />
      {invitation.status === "draft" ? (
        <span className="absolute top-2 left-2 bg-surface/90 px-2 py-0.5 text-[11px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase backdrop-blur">
          Draft preview
        </span>
      ) : null}
      {invitation.status === "finalized" ? (
        <span className="absolute right-2 bottom-2 bg-primary px-2.5 py-0.5 text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase">
          Ready
        </span>
      ) : null}
    </div>
  );
}

function TemplateBlock({
  label,
  invitation,
}: {
  label: string;
  invitation: CustomerInvitation;
}) {
  return (
    <div>
      <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
        {label}
      </span>
      <p className="mt-0.5 font-serif text-[18px] leading-7">
        {invitation.templateName}
      </p>
      {invitation.templateDescription ? (
        <p className="text-[13px] leading-5 text-on-surface-variant">
          {invitation.templateDescription}
        </p>
      ) : null}
    </div>
  );
}

function NoteBox({
  icon: Icon,
  children,
  tone = "muted",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  return (
    <div
      className={`border p-3 ${tone === "accent" ? "border-accent bg-accent/30 text-accent-foreground" : "border-surface-highest bg-surface-low text-on-surface-variant"}`}
    >
      <div className="flex items-start gap-2">
        <Icon
          aria-hidden
          size={16}
          className="mt-0.5 shrink-0 text-secondary"
        />
        <p className="text-[13px] leading-snug">{children}</p>
      </div>
    </div>
  );
}

export function InvitationCard({
  invitation,
  index,
}: {
  invitation: CustomerInvitation;
  index: number;
}) {
  const { status } = invitation;
  const host = publicConfig.appUrl.replace(/^https?:\/\//, "");
  const invitationUrl = `${host}/${invitation.slug}`;
  const isArchived = status === "expired" || status === "cancelled";

  return (
    <article className="flex flex-col justify-between border border-surface-highest bg-surface-lowest transition-shadow duration-300 hover:shadow-md">
      <div>
        <header className="flex items-start justify-between gap-4 border-b border-surface-highest p-5 sm:p-6">
          <div className="flex min-w-0 flex-col">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <StatusChip invitation={invitation} />
              <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                {String(index + 1).padStart(2, "0")} — {slotLabel[status]}
              </span>
            </div>
            <h2 className="font-serif text-[20px] leading-snug font-medium sm:text-[22px]">
              {invitation.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-5 text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                {isArchived ? (
                  <CalendarX aria-hidden size={15} />
                ) : (
                  <CalendarDays aria-hidden size={15} />
                )}
                {longDate.format(new Date(invitation.eventDate))}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin aria-hidden size={15} />
                {invitation.venue}
              </span>
            </div>
          </div>
        </header>

        <div
          className={
            isArchived
              ? "flex flex-col gap-4 p-5 sm:p-6"
              : "grid grid-cols-1 items-start gap-5 p-5 sm:grid-cols-12 sm:gap-6 sm:p-6"
          }
        >
          {!isArchived ? <PreviewImage invitation={invitation} /> : null}

          <div
            className={
              isArchived
                ? "flex flex-col gap-4"
                : "flex flex-col gap-4 sm:col-span-7"
            }
          >
            {status === "published" ? (
              <>
                <TemplateBlock label="Atelier theme" invitation={invitation} />
                <div className="flex items-center justify-between gap-2 border border-surface-highest bg-surface-low p-2.5">
                  <span className="flex min-w-0 items-center gap-2">
                    <Link2
                      aria-hidden
                      size={15}
                      className="shrink-0 text-secondary"
                    />
                    <span className="truncate text-[13px] leading-5">
                      {invitationUrl}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    <CopyLinkButton
                      compact
                      value={`https://${invitationUrl}`}
                    />
                    <Link
                      href={`/${invitation.slug}`}
                      title="Open live invitation"
                      aria-label="Open live invitation"
                      className="p-1 text-on-surface-variant transition-colors hover:text-on-surface"
                    >
                      <ExternalLink aria-hidden size={15} />
                    </Link>
                  </span>
                </div>
                <dl className="grid grid-cols-3 gap-2 border-t border-surface-highest pt-3 text-center">
                  {[
                    ["RSVPs", invitation.metrics?.rsvps ?? 0],
                    ["Wishes", invitation.metrics?.wishes ?? 0],
                    ["Views", invitation.metrics?.views ?? 0],
                  ].map(([label, value]) => (
                    <div key={label as string}>
                      <dd className="font-serif text-[18px] leading-7 font-medium">
                        {numberFormat.format(value as number)}
                      </dd>
                      <dt className="mt-0.5 text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                        {label}
                      </dt>
                    </div>
                  ))}
                </dl>
                {invitation.expiresAt ? (
                  <p className="text-[13px] leading-5 text-on-surface-variant italic">
                    Hosting valid until{" "}
                    {shortDate.format(new Date(invitation.expiresAt))}
                  </p>
                ) : null}
              </>
            ) : null}

            {status === "draft" && invitation.progress ? (
              <>
                <TemplateBlock label="Atelier theme" invitation={invitation} />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                      Completion checklist
                    </span>
                    <span className="text-[13px] font-medium text-secondary">
                      {invitation.progress.completedSections} of{" "}
                      {invitation.progress.totalSections} complete
                    </span>
                  </div>
                  <div
                    role="img"
                    aria-label={`${invitation.progress.completedSections} of ${invitation.progress.totalSections} sections complete`}
                    className="h-1.5 w-full overflow-hidden bg-surface-highest"
                  >
                    <div
                      className="h-full bg-secondary"
                      style={{
                        width: `${(invitation.progress.completedSections / invitation.progress.totalSections) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <NoteBox icon={Info}>{invitation.progress.pendingNote}</NoteBox>
              </>
            ) : null}

            {status === "finalized" ? (
              <>
                <TemplateBlock
                  label="Suite configuration"
                  invitation={invitation}
                />
                {invitation.readinessNote ? (
                  <NoteBox icon={BadgeCheck} tone="accent">
                    {invitation.readinessNote}
                  </NoteBox>
                ) : null}
                <p className="flex items-center gap-2 text-[13px] leading-5 text-on-surface-variant">
                  <CheckCircle2
                    aria-hidden
                    size={15}
                    className="shrink-0 text-secondary"
                  />
                  All sections validated and locked for publishing
                </p>
              </>
            ) : null}

            {status === "expired" && invitation.archive ? (
              <>
                <div className="border border-surface-highest bg-surface-low p-4">
                  <div className="flex items-start gap-3">
                    <Lock
                      aria-hidden
                      size={20}
                      className="mt-0.5 shrink-0 text-secondary"
                    />
                    <div>
                      <p className="font-serif text-[15px] font-semibold">
                        Celebration past &amp; preserved
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-on-surface-variant">
                        {invitation.archive.note}
                      </p>
                    </div>
                  </div>
                </div>
                <dl className="grid grid-cols-1 gap-4 border-y border-surface-highest py-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <MailCheck
                      aria-hidden
                      size={19}
                      className="shrink-0 text-secondary"
                    />
                    <div>
                      <dd className="font-serif text-[18px] leading-7 font-medium">
                        {invitation.archive.rsvpsPreserved} total
                      </dd>
                      <dt className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                        RSVPs preserved
                      </dt>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Images
                      aria-hidden
                      size={19}
                      className="shrink-0 text-secondary"
                    />
                    <div>
                      <dd className="font-serif text-[18px] leading-7 font-medium">
                        {invitation.archive.photoUploads} photos
                      </dd>
                      <dt className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                        Guestbook uploads
                      </dt>
                    </div>
                  </div>
                </dl>
              </>
            ) : null}

            {status === "cancelled" ? (
              <>
                <div className="border border-surface-highest bg-surface-low p-4">
                  <div className="flex items-start gap-3">
                    <Ban
                      aria-hidden
                      size={20}
                      className="mt-0.5 shrink-0 text-on-surface-variant"
                    />
                    <div>
                      <p className="font-serif text-[15px] font-semibold">
                        Celebration cancelled
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-on-surface-variant">
                        {invitation.cancelledNote}
                      </p>
                    </div>
                  </div>
                </div>
                <TemplateBlock label="Saved design" invitation={invitation} />
              </>
            ) : null}

            {invitation.lastModifiedLabel ? (
              <p className="text-[13px] leading-5 text-on-surface-variant">
                {invitation.lastModifiedLabel}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-surface-highest bg-surface-low px-5 py-4 sm:px-6">
        {status === "published" ? (
          <>
            <Link
              href={`/app/invitations/${invitation.id}`}
              className={`${primaryActionClass} bg-primary text-primary-foreground hover:bg-secondary`}
            >
              <SlidersHorizontal aria-hidden size={15} />
              Manage
            </Link>
            <Link href={`/${invitation.slug}`} className={secondaryActionClass}>
              <Eye aria-hidden size={15} className="text-secondary" />
              View
            </Link>
          </>
        ) : null}

        {status === "draft" ? (
          <>
            <Link
              href={`/app/invitations/${invitation.id}/edit`}
              className={`${primaryActionClass} bg-primary text-primary-foreground hover:bg-secondary`}
            >
              <PenLine aria-hidden size={15} />
              Continue editing
            </Link>
            <span
              aria-disabled="true"
              className={`${secondaryActionClass} ${inactiveClass}`}
            >
              <Eye aria-hidden size={15} className="text-secondary" />
              Preview
            </span>
          </>
        ) : null}

        {status === "finalized" ? (
          <>
            <span
              aria-disabled="true"
              className={`${primaryActionClass} ${inactiveClass} bg-secondary text-secondary-foreground`}
            >
              <Rocket aria-hidden size={15} />
              Publish invitation
            </span>
            <Link
              href={`/app/invitations/${invitation.id}`}
              className={secondaryActionClass}
            >
              <Eye aria-hidden size={15} className="text-secondary" />
              Review proof
            </Link>
          </>
        ) : null}

        {status === "expired" ? (
          <>
            <span
              aria-disabled="true"
              className={`${primaryActionClass} ${inactiveClass} border border-surface-highest bg-surface-lowest`}
            >
              <Timer aria-hidden size={15} className="text-secondary" />
              Extend hosting
            </span>
            <span
              aria-disabled="true"
              className={`${secondaryActionClass} ${inactiveClass}`}
            >
              <FileText aria-hidden size={15} />
              Memory book
            </span>
          </>
        ) : null}

        {status === "cancelled" ? (
          <>
            <span
              aria-disabled="true"
              className={`${primaryActionClass} ${inactiveClass} border border-surface-highest bg-surface-lowest`}
            >
              <CopyPlus aria-hidden size={15} className="text-secondary" />
              Duplicate as draft
            </span>
            <Link
              href={`/app/invitations/${invitation.id}`}
              className={secondaryActionClass}
            >
              <FileText aria-hidden size={15} />
              View record
            </Link>
          </>
        ) : null}
      </footer>
    </article>
  );
}
