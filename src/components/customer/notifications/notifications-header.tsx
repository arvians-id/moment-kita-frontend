import { CheckCheck, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export function NotificationsHeader({
  hasUnread,
  onMarkAllRead,
}: {
  hasUnread: boolean;
  onMarkAllRead: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 border-b border-surface-highest pb-8">
      <div className="flex flex-wrap items-center gap-3 bg-surface-low px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] leading-4 font-semibold tracking-[0.15em] text-on-surface-variant uppercase">
          <span>Account</span>
          <span aria-hidden className="text-on-surface-variant/50">
            /
          </span>
          <span className="text-on-surface">Notifications</span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex max-w-2xl flex-col gap-1">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Account &amp; Activity
          </span>
          <h1 className="font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
            Notifications
          </h1>
          <p className="mt-1 text-[15px] leading-relaxed text-on-surface-variant">
            Stay updated on your invitations, guests, payments, and important
            account activity across your celebrations.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onMarkAllRead}
            disabled={!hasUnread}
            className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary"
          >
            <CheckCheck aria-hidden size={16} />
            <span>Mark All as Read</span>
          </button>
          <Link
            href="/app/settings?tab=notifications"
            className="inline-flex h-10 items-center gap-2 border border-surface-highest bg-surface-low px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
          >
            <SlidersHorizontal aria-hidden size={15} />
            <span>Notification Preferences</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
