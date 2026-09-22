import { Check, Eye, EyeOff, RotateCcw, Trash2, UserRound } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { WishModerationStatus } from "@/types";

import { formatWishDate, type WishViewItem } from "./wish-utils";

const statusLabels: Record<WishModerationStatus, string> = {
  published: "Published",
  pending: "Waiting for Approval",
  hidden: "Hidden",
};

export function WishCard({
  invitationId,
  wish,
  onStatusChange,
  onDelete,
  onView,
}: {
  invitationId: string;
  wish: WishViewItem;
  onStatusChange: (id: string, status: WishModerationStatus) => void;
  onDelete: (wish: WishViewItem) => void;
  onView: (wish: WishViewItem) => void;
}) {
  return (
    <article
      className={cn(
        "relative flex min-h-72 flex-col bg-surface-lowest p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6",
        wish.status === "pending" && "border-l-2 border-secondary",
        wish.status === "hidden" && "bg-surface-low",
      )}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center font-serif text-[16px]",
              wish.status === "pending"
                ? "bg-secondary text-secondary-foreground"
                : "bg-surface-container text-on-surface",
            )}
          >
            {wish.initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-serif text-[19px] leading-6">
              {wish.author}
            </h3>
            <p
              className={cn(
                "mt-0.5 truncate text-[9px] font-semibold tracking-[0.09em] uppercase",
                wish.source === "public_link"
                  ? "text-secondary"
                  : "text-on-surface-variant",
              )}
            >
              {wish.source === "public_link"
                ? "Public-link submission"
                : wish.group}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start sm:items-end">
          <WishStatusBadge status={wish.status} />
          <time className="mt-1 text-[9px] text-on-surface-variant">
            {formatWishDate(wish.submittedAt)}
          </time>
        </div>
      </div>

      <blockquote className="mt-5 flex-1">
        <p
          className={cn(
            "line-clamp-5 font-serif text-[18px] leading-8 italic sm:text-[20px]",
            wish.status === "hidden" && "text-on-surface-variant",
          )}
        >
          “{wish.message}”
        </p>
      </blockquote>

      {wish.status === "hidden" ? (
        <p className="mt-4 flex items-center gap-1.5 text-[10px] leading-4 text-on-surface-variant">
          <EyeOff aria-hidden size={13} />
          Hidden from the public invitation and preserved here.
        </p>
      ) : null}

      <div className="-mx-5 -mb-5 mt-5 flex flex-wrap items-center justify-between gap-2 bg-surface-low/65 px-5 py-3 sm:-mx-6 sm:-mb-6 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {wish.status === "pending" ? (
            <>
              <ActionButton
                label="Approve"
                Icon={Check}
                primary
                onClick={() => onStatusChange(wish.id, "published")}
              />
              <ActionButton
                label="Hide"
                Icon={EyeOff}
                onClick={() => onStatusChange(wish.id, "hidden")}
              />
            </>
          ) : null}
          {wish.status === "published" ? (
            <ActionButton
              label="Hide"
              Icon={EyeOff}
              onClick={() => onStatusChange(wish.id, "hidden")}
            />
          ) : null}
          {wish.status === "hidden" ? (
            <ActionButton
              label="Restore"
              Icon={RotateCcw}
              primary
              onClick={() => onStatusChange(wish.id, "published")}
            />
          ) : null}
          <ActionButton
            label="View Full"
            Icon={Eye}
            onClick={() => onView(wish)}
          />
        </div>
        <div className="flex items-center gap-1">
          {wish.guestId ? (
            <Link
              href={`/app/invitations/${invitationId}/guests`}
              title="View related guest"
              aria-label={`View guest record for ${wish.author}`}
              className="grid size-9 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            >
              <UserRound aria-hidden size={15} />
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => onDelete(wish)}
            title="Delete wish"
            aria-label={`Delete wish from ${wish.author}`}
            className="grid size-9 place-items-center text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
          >
            <Trash2 aria-hidden size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function WishStatusBadge({ status }: { status: WishModerationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] uppercase",
        status === "pending" && "bg-terracotta-soft/35 text-accent-foreground",
        status === "published" && "bg-secondary/10 text-secondary",
        status === "hidden" && "bg-surface-container text-on-surface-variant",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status === "published"
            ? "bg-secondary"
            : status === "pending"
              ? "bg-terracotta"
              : "bg-outline",
        )}
      />
      {statusLabels[status]}
    </span>
  );
}

function ActionButton({
  label,
  Icon,
  primary = false,
  onClick,
}: {
  label: string;
  Icon: typeof Check;
  primary?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-9 items-center gap-1.5 px-3 text-[9px] font-semibold tracking-[0.1em] uppercase transition-colors",
        primary
          ? "bg-secondary text-secondary-foreground hover:bg-primary"
          : "bg-surface-lowest text-on-surface hover:bg-surface-container",
      )}
    >
      <Icon aria-hidden size={14} />
      {label}
    </button>
  );
}
