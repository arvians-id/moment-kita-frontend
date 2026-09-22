import {
  ArrowLeft,
  CalendarDays,
  CloudCheck,
  Eye,
  Link2,
  MapPin,
  PenLine,
} from "lucide-react";
import Link from "next/link";

import { CopyLinkButton } from "@/components/customer/dashboard/copy-link-button";
import { InvitationStatusBadge } from "@/components/customer/invitation-status-badge";
import { publicConfig } from "@/lib/config";
import type { CustomerInvitation } from "@/types";

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

const actionBase =
  "inline-flex h-10 items-center gap-2 px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors";
/** Destinations that do not exist yet stay inert instead of linking to a 404. */
const inactive = "cursor-not-allowed opacity-90";

export function InvitationDetailHeader({
  invitation,
}: {
  invitation: CustomerInvitation;
}) {
  const host = publicConfig.appUrl.replace(/^https?:\/\//, "");
  const invitationUrl = `${host}/${invitation.slug}`;
  const isLive = invitation.status === "published";
  const [couple, ...rest] = invitation.title.split("—");
  const subtitle = rest.join("—").trim();

  return (
    <header className="flex flex-col gap-4">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-[13px] leading-5 text-on-surface-variant"
      >
        <Link
          href="/app/invitations"
          className="flex items-center gap-1 transition-colors hover:text-on-surface"
        >
          <ArrowLeft aria-hidden size={15} />
          <span>My Invitations</span>
        </Link>
        <span aria-hidden className="text-on-surface-variant/50">
          /
        </span>
        <span className="font-medium text-on-surface">{invitation.title}</span>
        <InvitationStatusBadge status={invitation.status} className="ml-1" />
      </nav>

      <div className="flex flex-col justify-between gap-6 pb-2 lg:flex-row lg:items-end">
        <div className="flex max-w-3xl flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Invitation workspace
            </span>
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-on-surface-variant/40"
            />
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
              Theme: {invitation.templateName}
            </span>
          </div>

          <h1 className="font-serif text-[36px] leading-none tracking-tight md:text-[48px]">
            {couple.trim()}
            {subtitle ? (
              <span className="mt-2 block font-serif text-2xl leading-9 text-on-surface-variant italic">
                {subtitle}
              </span>
            ) : null}
          </h1>

          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] leading-6 text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <CalendarDays aria-hidden size={16} className="text-secondary" />
              {longDate.format(new Date(invitation.eventDate))}
            </span>
            <span aria-hidden className="text-on-surface-variant/50">
              •
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin aria-hidden size={16} className="text-secondary" />
              {invitation.venue}
            </span>
            {invitation.expiresAt ? (
              <>
                <span aria-hidden className="text-on-surface-variant/50">
                  •
                </span>
                <span className="flex items-center gap-1.5">
                  <CloudCheck
                    aria-hidden
                    size={16}
                    className="text-secondary"
                  />
                  Hosted until{" "}
                  {shortDate.format(new Date(invitation.expiresAt))}
                </span>
              </>
            ) : null}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {isLive ? (
            <span className="inline-flex h-10 min-w-0 items-center gap-2 bg-surface-container px-3.5">
              <Link2
                aria-hidden
                size={16}
                className="shrink-0 text-secondary"
              />
              <span className="truncate text-[13px] leading-5 font-medium">
                {invitationUrl}
              </span>
              <CopyLinkButton compact value={`https://${invitationUrl}`} />
            </span>
          ) : null}

          {isLive ? (
            <Link
              href={`/${invitation.slug}`}
              className={`${actionBase} bg-surface-high hover:bg-surface-highest`}
            >
              <Eye aria-hidden size={16} />
              <span>Preview Live</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={`${actionBase} ${inactive} bg-surface-high`}
            >
              <Eye aria-hidden size={16} />
              <span>Preview</span>
            </span>
          )}

          <span
            aria-disabled="true"
            className={`${actionBase} ${inactive} bg-primary text-primary-foreground`}
          >
            <PenLine aria-hidden size={16} />
            <span>Edit Invitation</span>
          </span>
        </div>
      </div>
    </header>
  );
}
