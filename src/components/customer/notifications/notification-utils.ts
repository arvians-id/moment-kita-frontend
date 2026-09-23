import {
  Archive,
  BadgeCheck,
  CalendarPlus,
  CheckCircle2,
  FileEdit,
  Gift,
  Globe2,
  Heart,
  MailCheck,
  Receipt,
  ShieldAlert,
  UserCheck,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type {
  CustomerNotificationWithContext,
  NotificationCategory,
  NotificationKind,
} from "@/types";

export type NotificationFilter = "all" | "unread" | NotificationCategory;

export const notificationFilters: { value: NotificationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "wedding", label: "Wedding" },
  { value: "guestsRsvp", label: "Guests & RSVP" },
  { value: "payments", label: "Payments" },
  { value: "account", label: "Account" },
];

export const notificationIconByKind: Record<NotificationKind, LucideIcon> = {
  guestImportCompleted: UserCheck,
  guestImportIssues: UserPlus,
  rsvpResponses: MailCheck,
  wishesPending: Heart,
  draftIncomplete: FileEdit,
  invitationPublished: Globe2,
  invitationExtended: CalendarPlus,
  invitationExpiringSoon: Archive,
  invitationExpired: Archive,
  giftAccountsUpdated: Gift,
  paymentPending: Receipt,
  paymentConfirmed: CheckCircle2,
  packageActivated: BadgeCheck,
  accountSecurity: ShieldAlert,
};

export function countMatchingFilter(
  notifications: CustomerNotificationWithContext[],
  filter: NotificationFilter,
): number {
  return notifications.filter((item) => matchesFilter(item, filter)).length;
}

export function matchesFilter(
  notification: CustomerNotificationWithContext,
  filter: NotificationFilter,
): boolean {
  if (filter === "all") return true;
  if (filter === "unread") return !notification.read;
  return notification.category === filter;
}

export type NotificationGroupKey = "today" | "yesterday" | "earlier";

export interface NotificationGroup {
  key: NotificationGroupKey;
  label: string;
  items: CustomerNotificationWithContext[];
}

const DAY_MS = 86_400_000;

/** Buckets notifications by recency relative to right now. */
export function groupByRecency(
  notifications: CustomerNotificationWithContext[],
): NotificationGroup[] {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const startOfYesterday = startOfToday - DAY_MS;

  const buckets: Record<NotificationGroupKey, CustomerNotificationWithContext[]> = {
    today: [],
    yesterday: [],
    earlier: [],
  };

  for (const item of notifications) {
    const occurredAt = new Date(item.occurredAt).getTime();
    if (occurredAt >= startOfToday) buckets.today.push(item);
    else if (occurredAt >= startOfYesterday) buckets.yesterday.push(item);
    else buckets.earlier.push(item);
  }

  return (
    [
      { key: "today", label: "Today", items: buckets.today },
      { key: "yesterday", label: "Yesterday", items: buckets.yesterday },
      { key: "earlier", label: "Earlier", items: buckets.earlier },
    ] satisfies NotificationGroup[]
  ).filter((group) => group.items.length > 0);
}

export function formatRelativeTime(value: string): string {
  const then = new Date(value).getTime();
  const diffMs = Date.now() - then;
  const minute = 60_000;
  const hour = 60 * minute;

  if (diffMs < minute) return "Just now";
  if (diffMs < hour) {
    const minutes = Math.round(diffMs / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
  if (diffMs < DAY_MS) {
    const hours = Math.round(diffMs / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(then);
}
