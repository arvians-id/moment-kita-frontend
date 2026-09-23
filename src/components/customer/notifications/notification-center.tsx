"use client";

import { useMemo, useState } from "react";

import { NotificationFilterTabs } from "@/components/customer/notifications/notification-filter-tabs";
import { NotificationGroupSection } from "@/components/customer/notifications/notification-group";
import { NotificationSummaryCards } from "@/components/customer/notifications/notification-summary-cards";
import {
  countMatchingFilter,
  groupByRecency,
  matchesFilter,
  type NotificationFilter,
} from "@/components/customer/notifications/notification-utils";
import {
  NotificationsEmptyState,
  NotificationsFilteredEmptyState,
} from "@/components/customer/notifications/notifications-empty-state";
import { NotificationsHeader } from "@/components/customer/notifications/notifications-header";
import type {
  NotificationCounts,
  NotificationsOverview,
} from "@/services/customer/notification-service";
import type { CustomerNotificationWithContext } from "@/types";

export function NotificationCenter({
  overview,
}: {
  overview: NotificationsOverview;
}) {
  const [notifications, setNotifications] = useState<
    CustomerNotificationWithContext[]
  >(() => overview.notifications.map((item) => ({ ...item })));
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const counts = useMemo<NotificationCounts>(() => {
    return {
      all: notifications.length,
      unread: notifications.filter((item) => !item.read).length,
      attention: notifications.filter((item) => item.attention).length,
      wedding: notifications.filter((item) => item.category === "wedding")
        .length,
      guestsRsvp: notifications.filter((item) => item.category === "guestsRsvp")
        .length,
      payments: notifications.filter((item) => item.category === "payments")
        .length,
      account: notifications.filter((item) => item.category === "account")
        .length,
    };
  }, [notifications]);

  const visible = useMemo(
    () => notifications.filter((item) => matchesFilter(item, filter)),
    [filter, notifications],
  );
  const groups = useMemo(() => groupByRecency(visible), [visible]);

  function markRead(id: string) {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  function markAllRead() {
    setNotifications((current) =>
      current.map((item) => (item.read ? item : { ...item, read: true })),
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col pb-10">
      <NotificationsHeader
        hasUnread={counts.unread > 0}
        onMarkAllRead={markAllRead}
      />

      {notifications.length === 0 ? (
        <div className="pt-8">
          <NotificationsEmptyState />
        </div>
      ) : (
        <>
          <NotificationSummaryCards
            counts={counts}
            recentCount={overview.recentCount}
          />

          <div className="pb-6">
            <NotificationFilterTabs
              active={filter}
              onChange={setFilter}
              countFor={(value) => countMatchingFilter(notifications, value)}
            />
          </div>

          {groups.length > 0 ? (
            <div className="space-y-8">
              {groups.map((group) => (
                <NotificationGroupSection
                  key={group.key}
                  group={group}
                  onMarkRead={markRead}
                />
              ))}
            </div>
          ) : (
            <NotificationsFilteredEmptyState onReset={() => setFilter("all")} />
          )}
        </>
      )}
    </div>
  );
}
