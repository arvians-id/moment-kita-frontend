import {
  CalendarClock,
  Check,
  Circle,
  Hash,
  MailOpen,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import {
  categoryPresentation,
  expirationDateFormat,
  idrFormat,
  notificationTimestampFormat,
  priorityLabels,
} from "@/components/admin/notifications/notification-utils";
import { cn } from "@/lib/utils";
import type { AdminNotificationWithContext } from "@/types";

export function AdminNotificationCard({
  notification,
  onMarkRead,
  onMarkUnread,
}: {
  notification: AdminNotificationWithContext;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
}) {
  const isUnread = notification.readAt === null;
  const presentation = categoryPresentation[notification.category];
  const Icon = presentation.icon;
  const { context } = notification;

  return (
    <article
      className={cn(
        "relative min-w-0 border bg-surface-lowest p-4 shadow-sm transition-colors sm:p-5",
        isUnread
          ? "border-border before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-secondary"
          : "border-transparent bg-surface-low/70",
      )}
    >
      <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center sm:size-11",
              isUnread
                ? "bg-accent text-accent-foreground"
                : "bg-surface-container text-on-surface-variant",
            )}
          >
            <Icon aria-hidden size={19} />
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {isUnread ? (
                <span
                  className="size-1.5 rounded-full bg-secondary"
                  aria-label="Unread"
                />
              ) : null}
              <span className="text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
                {presentation.label}
              </span>
              {notification.priority !== "normal" ? (
                <span
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] uppercase",
                    notification.priority === "urgent"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-surface-container text-on-surface",
                  )}
                >
                  {priorityLabels[notification.priority]}
                </span>
              ) : null}
            </div>

            <h2 className="mt-2 font-serif text-[18px] leading-6 sm:text-[20px] sm:leading-7">
              {notification.title}
            </h2>
            <p className="mt-1 max-w-3xl text-[12px] leading-5 text-on-surface-variant sm:text-[13px]">
              {notification.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] leading-4 text-on-surface-variant sm:text-[11px]">
              <span>
                {notificationTimestampFormat.format(
                  new Date(notification.occurredAt),
                )}
              </span>
              {context.reference ? (
                <span className="inline-flex items-center gap-1">
                  <Hash aria-hidden size={11} />
                  {context.reference}
                </span>
              ) : null}
              {context.statusLabel ? (
                <span className="font-semibold text-accent-foreground">
                  {context.statusLabel}
                </span>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-3 text-[10px] leading-4 text-on-surface-variant sm:text-[11px]">
              {context.customer ? (
                <Link
                  href={`/admin/customers/${context.customer.id}`}
                  prefetch={false}
                  className="inline-flex min-w-0 items-center gap-1.5 hover:text-secondary"
                >
                  <UserRound aria-hidden size={12} className="shrink-0" />
                  <span className="truncate">{context.customer.name}</span>
                </Link>
              ) : null}
              {context.amount !== null ? (
                <span className="font-semibold text-on-surface">
                  {idrFormat.format(context.amount)}
                </span>
              ) : null}
              {context.expiresAt ? (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock aria-hidden size={12} />
                  Expires{" "}
                  {expirationDateFormat.format(new Date(context.expiresAt))}
                </span>
              ) : null}
              {context.pendingCount !== null ? (
                <span>{context.pendingCount} pending wishes</span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 pl-13 sm:pl-15 md:pl-0">
          <button
            type="button"
            onClick={() =>
              isUnread
                ? onMarkRead(notification.id)
                : onMarkUnread(notification.id)
            }
            className="inline-flex h-9 items-center gap-1.5 px-3 text-[10px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {isUnread ? (
              <MailOpen aria-hidden size={13} />
            ) : (
              <Circle aria-hidden size={12} />
            )}
            {isUnread ? "Mark Read" : "Mark Unread"}
          </button>
          <Link
            href={context.href}
            prefetch={false}
            onClick={() => onMarkRead(notification.id)}
            className="inline-flex h-9 items-center gap-1.5 bg-primary px-3 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <Check aria-hidden size={13} />
            {context.actionLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
