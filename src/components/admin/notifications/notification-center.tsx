"use client";

import {
  BellRing,
  CheckCheck,
  CircleDollarSign,
  MailWarning,
  Printer,
  Shapes,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNotificationCard } from "@/components/admin/notifications/notification-card";
import {
  matchesNotificationFilter,
  notificationFilterCount,
  notificationFilters,
  type AdminNotificationFilter,
} from "@/components/admin/notifications/notification-utils";
import { useAdminNotifications } from "@/components/admin/notifications/admin-notifications-provider";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type { AdminNotificationCategory } from "@/types";

const summaryCards = [
  { key: "unread", label: "Unread", icon: BellRing, note: "Needs review" },
  {
    key: "payments",
    label: "Payments",
    icon: CircleDollarSign,
    note: "Verification events",
  },
  {
    key: "invitations",
    label: "Invitations",
    icon: MailWarning,
    note: "Lifecycle alerts",
  },
  {
    key: "printedOrders",
    label: "Printed Orders",
    icon: Printer,
    note: "Atelier actions",
  },
  {
    key: "other",
    label: "Other",
    icon: Shapes,
    note: "Customers & moderation",
  },
] as const;

export function AdminNotificationCenter() {
  const { notifications, unreadCount, markRead, markUnread, markAllRead } =
    useAdminNotifications();
  const [filter, setFilter] = useState<AdminNotificationFilter>("all");

  const counts = useMemo(() => {
    const categoryCount = (category: AdminNotificationCategory) =>
      notifications.filter((item) => item.category === category).length;

    return {
      unread: unreadCount,
      payments: categoryCount("payments"),
      invitations: categoryCount("invitations"),
      printedOrders: categoryCount("printedOrders"),
      other: categoryCount("customers") + categoryCount("moderation"),
    };
  }, [notifications, unreadCount]);

  const visible = useMemo(
    () =>
      notifications.filter((item) => matchesNotificationFilter(item, filter)),
    [filter, notifications],
  );

  const emptyMessage =
    filter === "unread"
      ? "No unread notifications."
      : filter === "all"
        ? "You’re all caught up."
        : "No notifications match this filter.";

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="Operations · Attention Center"
        title="Notifications"
        description="Review payment verifications, invitation lifecycle alerts, printed-order actions, and customer activity from one operational queue."
        actions={
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="inline-flex h-10 items-center gap-2 border border-border bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.11em] uppercase transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-45"
          >
            <CheckCheck aria-hidden size={15} />
            Mark All as Read
          </button>
        }
      />

      <section
        aria-label="Notification summary"
        className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5"
      >
        {summaryCards.map(({ key, label, icon: Icon, note }) => (
          <article
            key={key}
            className="flex min-h-28 min-w-0 flex-col justify-between border border-border bg-surface-lowest p-4 shadow-sm sm:min-h-32 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2 text-on-surface-variant">
              <span className="truncate text-[9px] font-semibold tracking-[0.13em] uppercase">
                {label}
              </span>
              <Icon aria-hidden size={16} className="shrink-0 text-secondary" />
            </div>
            <div>
              <p className="font-serif text-[26px] leading-8">{counts[key]}</p>
              <p className="mt-1 truncate text-[9px] text-on-surface-variant sm:text-[10px]">
                {note}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="notification-queue-title" className="min-w-0">
        <div className="mb-5 flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
              Operational Queue
            </span>
            <h2
              id="notification-queue-title"
              className="mt-1 font-serif text-[22px] leading-8"
            >
              Recent activity
            </h2>
          </div>

          <div className="max-w-full overflow-x-auto pb-1">
            <div
              role="group"
              aria-label="Filter notifications"
              className="flex w-max min-w-full items-center gap-1 bg-surface-lowest p-1 shadow-sm"
            >
              {notificationFilters.map((item) => {
                const active = item.value === filter;
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(item.value)}
                    className={`shrink-0 px-3 py-2 text-[9px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    {item.label} (
                    {notificationFilterCount(notifications, item.value)})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="space-y-3">
            {visible.map((notification) => (
              <AdminNotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={markRead}
                onMarkUnread={markUnread}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center border border-dashed border-border bg-surface-low/60 px-5 text-center">
            <BellRing aria-hidden size={22} className="text-secondary" />
            <h3 className="mt-4 font-serif text-[20px]">{emptyMessage}</h3>
            {filter !== "all" ? (
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-3 text-[10px] font-semibold tracking-[0.1em] text-secondary uppercase underline underline-offset-4"
              >
                View all notifications
              </button>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
