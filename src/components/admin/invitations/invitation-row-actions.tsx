import {
  Ban,
  Eye,
  EyeOff,
  MoreVertical,
  MonitorPlay,
  Pencil,
  Rocket,
  TimerReset,
} from "lucide-react";
import Link from "next/link";

import type { AdminInvitationListItem } from "@/types";

export type InvitationLifecycleAction =
  "publish" | "unpublish" | "extend" | "cancel";

function ActionButton({
  icon: Icon,
  label,
  tone = "default",
  onClick,
}: {
  icon: typeof Rocket;
  label: string;
  tone?: "default" | "danger";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] font-medium transition-colors hover:bg-surface-low ${tone === "danger" ? "text-error" : "text-on-surface"}`}
    >
      <Icon aria-hidden size={15} /> {label}
    </button>
  );
}

export function InvitationRowActions({
  invitation,
  isOpen,
  onToggle,
  onAction,
}: {
  invitation: AdminInvitationListItem;
  isOpen: boolean;
  onToggle: () => void;
  onAction: (action: InvitationLifecycleAction) => void;
}) {
  return (
    <div className="relative inline-flex justify-end">
      <button
        type="button"
        aria-label={`Actions for ${invitation.coupleLabel}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="grid size-8 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
      >
        <MoreVertical aria-hidden size={17} />
      </button>

      {isOpen ? (
        <div className="absolute top-full right-0 z-30 mt-1 w-56 border border-border bg-surface-lowest p-1.5 text-left shadow-xl">
          <Link
            href={`/admin/invitations/${invitation.id}`}
            prefetch={false}
            className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
          >
            <Eye aria-hidden size={15} /> View Invitation
          </Link>
          <Link
            href={`/admin/invitations/${invitation.id}/edit`}
            prefetch={false}
            className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-surface-low"
          >
            <Pencil aria-hidden size={15} /> Edit in Studio
          </Link>
          <span
            aria-disabled="true"
            title="Public preview is unavailable until this mock invitation has a generated public route"
            className="flex cursor-not-allowed items-center gap-2 px-3 py-2 text-[12px] text-on-surface-variant/55"
          >
            <MonitorPlay aria-hidden size={15} /> Preview Public Page
          </span>

          <div className="my-1 border-t border-border" />

          {invitation.status === "finalized" ? (
            <ActionButton
              icon={Rocket}
              label="Publish"
              onClick={() => onAction("publish")}
            />
          ) : null}
          {invitation.status === "published" ? (
            <ActionButton
              icon={EyeOff}
              label="Unpublish"
              onClick={() => onAction("unpublish")}
            />
          ) : null}
          {invitation.status === "published" ||
          invitation.status === "expired" ? (
            <ActionButton
              icon={TimerReset}
              label="Extend Expiration"
              onClick={() => onAction("extend")}
            />
          ) : null}
          {invitation.status !== "cancelled" ? (
            <ActionButton
              icon={Ban}
              label="Cancel Invitation"
              tone="danger"
              onClick={() => onAction("cancel")}
            />
          ) : null}
          {invitation.status === "cancelled" ? (
            <p className="px-3 py-2 text-[10px] leading-4 text-on-surface-variant">
              Cancelled invitations have no lifecycle actions.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
