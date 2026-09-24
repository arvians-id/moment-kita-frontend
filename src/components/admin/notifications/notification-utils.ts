import {
  CircleDollarSign,
  Clock3,
  MailWarning,
  MessageSquareText,
  Printer,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type {
  AdminNotificationCategory,
  AdminNotificationWithContext,
} from "@/types";
import { idrFormat } from "@/lib/format";
export { idrFormat };


export type AdminNotificationFilter =
  "all" | "unread" | AdminNotificationCategory;

export const notificationFilters: readonly {
  value: AdminNotificationFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "payments", label: "Payments" },
  { value: "invitations", label: "Invitations" },
  { value: "printedOrders", label: "Printed Orders" },
  { value: "customers", label: "Customers" },
  { value: "moderation", label: "Moderation" },
];

export const categoryPresentation: Record<
  AdminNotificationCategory,
  { label: string; icon: LucideIcon }
> = {
  payments: { label: "Payments", icon: CircleDollarSign },
  invitations: { label: "Invitations", icon: MailWarning },
  printedOrders: { label: "Printed Orders", icon: Printer },
  customers: { label: "Customers", icon: UserRound },
  moderation: { label: "Moderation", icon: MessageSquareText },
};

export const priorityLabels = {
  normal: "Normal",
  requiresAction: "Requires Action",
  urgent: "Urgent",
} as const;


export const notificationTimestampFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
  timeZoneName: "short",
});

export const expirationDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function matchesNotificationFilter(
  notification: AdminNotificationWithContext,
  filter: AdminNotificationFilter,
): boolean {
  if (filter === "all") return true;
  if (filter === "unread") return notification.readAt === null;
  return notification.category === filter;
}

export function notificationFilterCount(
  notifications: AdminNotificationWithContext[],
  filter: AdminNotificationFilter,
): number {
  return notifications.filter((item) => matchesNotificationFilter(item, filter))
    .length;
}

export { Clock3 };
