import {
  Archive,
  Ban,
  BadgeCheck,
  MailCheck,
  PencilRuler,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import type { CustomerInvitation } from "@/types";

interface BannerCopy {
  icon: LucideIcon;
  headline: string;
  body: string;
  action?: string;
  /** When set, the action is a real link rather than a not-yet-connected control. */
  actionHref?: string;
}

function bannerFor(invitation: CustomerInvitation): BannerCopy {
  switch (invitation.status) {
    case "published":
      return {
        icon: MailCheck,
        headline: "Suite published and actively greeting guests",
        body: `Your invitation has been viewed ${invitation.metrics?.views?.toLocaleString("en-US") ?? 0} times. ${invitation.guestCount - invitation.confirmedCount} guests have not responded yet.`,
        action: "Send reminder",
      };
    case "draft":
      return {
        icon: PencilRuler,
        headline: "Draft in progress",
        body:
          invitation.progress?.pendingNote ??
          "Keep building your suite. Drafts never consume quota.",
        action: "Continue editing",
        actionHref: `/app/invitations/${invitation.id}/edit`,
      };
    case "finalized":
      return {
        icon: BadgeCheck,
        headline: "Proof locked and ready to publish",
        body:
          invitation.readinessNote ??
          "Publish to assign your remaining quota and generate the celebration link.",
        action: "Publish invitation",
      };
    case "expired":
      return {
        icon: Archive,
        headline: "Hosting has ended",
        body:
          invitation.archive?.note ??
          "Public access has concluded. Guest records remain archived.",
        action: "Extend hosting",
      };
    default:
      return {
        icon: Ban,
        headline: "Celebration cancelled",
        body:
          invitation.cancelledNote ??
          "This suite was cancelled. The saved design can be duplicated into a new draft.",
        action: "Duplicate as draft",
      };
  }
}

export function InvitationStatusBanner({
  invitation,
}: {
  invitation: CustomerInvitation;
}) {
  const {
    icon: Icon,
    headline,
    body,
    action,
    actionHref,
  } = bannerFor(invitation);

  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 bg-surface-low p-5 shadow-sm md:flex-row md:items-center">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-secondary/15 text-secondary">
          <Icon aria-hidden size={21} />
        </span>
        <div className="flex flex-col">
          <span className="font-serif text-[22px] leading-[30px] font-semibold">
            {headline}
          </span>
          <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
            {body}
          </p>
        </div>
      </div>
      {action && actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-1.5 bg-secondary px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary-foreground uppercase transition-colors hover:bg-primary md:w-auto"
        >
          <Send aria-hidden size={15} />
          <span>{action}</span>
        </Link>
      ) : action ? (
        <span
          aria-disabled="true"
          className="inline-flex h-9 w-full shrink-0 cursor-not-allowed items-center justify-center gap-1.5 bg-secondary px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary-foreground uppercase opacity-90 md:w-auto"
        >
          <Send aria-hidden size={15} />
          <span>{action}</span>
        </span>
      ) : null}
    </div>
  );
}
