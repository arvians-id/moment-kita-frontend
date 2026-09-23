import { ExternalLink, MailOpen } from "lucide-react";
import Link from "next/link";

import {
  formatRelativeTime,
  notificationIconByKind,
} from "@/components/customer/notifications/notification-utils";
import { cn } from "@/lib/utils";
import type { CustomerNotificationWithContext } from "@/types";

export function NotificationCard({
  notification,
  onMarkRead,
}: {
  notification: CustomerNotificationWithContext;
  onMarkRead: (id: string) => void;
}) {
  const Icon = notificationIconByKind[notification.kind];
  const { read, attention, relatedInvitation } = notification;

  return (
    <article
      className={cn(
        "flex flex-col gap-4 border p-4 shadow-sm transition-colors sm:p-5 md:flex-row md:items-center md:justify-between",
        read
          ? "border-transparent bg-surface-low"
          : "border-surface-highest bg-surface-lowest",
      )}
    >
      <div className="flex min-w-0 items-start gap-4">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center",
            attention && !read
              ? "bg-secondary text-secondary-foreground"
              : "bg-surface-container text-on-surface-variant",
          )}
        >
          <Icon aria-hidden size={20} />
        </span>

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            {!read ? (
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-secondary"
              />
            ) : null}
            <span className="text-[10px] leading-4 font-semibold tracking-[0.15em] text-secondary uppercase">
              {notification.eyebrow}
            </span>
            {relatedInvitation ? (
              <span className="max-w-[16rem] truncate bg-surface-container px-2 py-0.5 text-[10px] leading-4 font-semibold text-on-surface">
                {relatedInvitation.coupleLabel} &middot;{" "}
                {relatedInvitation.templateName}
              </span>
            ) : null}
            {notification.tag ? (
              <span className="shrink-0 bg-secondary/15 px-2 py-0.5 text-[9px] leading-4 font-semibold tracking-[0.1em] text-secondary uppercase">
                {notification.tag}
              </span>
            ) : null}
          </div>

          <h2 className="pt-0.5 font-serif text-[17px] leading-6 text-on-surface sm:text-[18px]">
            {notification.title}
          </h2>
          <p className="max-w-3xl text-[13px] leading-5 text-on-surface-variant">
            {notification.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] leading-4 text-on-surface-variant">
            <span>{formatRelativeTime(notification.occurredAt)}</span>
            {notification.meta ? (
              <span className="text-secondary">{notification.meta}</span>
            ) : null}
            {!read ? (
              <button
                type="button"
                onClick={() => onMarkRead(notification.id)}
                className="inline-flex items-center gap-1 font-semibold text-on-surface underline decoration-on-surface-variant/40 underline-offset-2 hover:text-secondary hover:decoration-secondary"
              >
                <MailOpen aria-hidden size={12} />
                Mark as read
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {notification.actionLabel && notification.actionHref ? (
        <div className="shrink-0 self-end md:self-center">
          <Link
            href={notification.actionHref}
            target={notification.actionExternal ? "_blank" : undefined}
            rel={notification.actionExternal ? "noreferrer" : undefined}
            className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-[11px] leading-4 font-semibold tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            <span>{notification.actionLabel}</span>
            {notification.actionExternal ? (
              <ExternalLink aria-hidden size={14} />
            ) : null}
          </Link>
        </div>
      ) : null}
    </article>
  );
}
