"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AdminNotificationWithContext } from "@/types";

interface AdminNotificationsContextValue {
  notifications: AdminNotificationWithContext[];
  unreadCount: number;
  markRead: (id: string) => void;
  markUnread: (id: string) => void;
  markAllRead: () => void;
}

const AdminNotificationsContext =
  createContext<AdminNotificationsContextValue | null>(null);

export function AdminNotificationsProvider({
  initialNotifications,
  children,
}: {
  initialNotifications: AdminNotificationWithContext[];
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState(() =>
    initialNotifications.map((item) => ({
      ...item,
      context: {
        ...item.context,
        customer: item.context.customer ? { ...item.context.customer } : null,
      },
    })),
  );

  const value = useMemo<AdminNotificationsContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter((item) => item.readAt === null).length,
      markRead(id) {
        setNotifications((current) =>
          current.map((item) =>
            item.id === id && item.readAt === null
              ? { ...item, readAt: new Date().toISOString() }
              : item,
          ),
        );
      },
      markUnread(id) {
        setNotifications((current) =>
          current.map((item) =>
            item.id === id ? { ...item, readAt: null } : item,
          ),
        );
      },
      markAllRead() {
        const readAt = new Date().toISOString();
        setNotifications((current) =>
          current.map((item) => (item.readAt ? item : { ...item, readAt })),
        );
      },
    }),
    [notifications],
  );

  return (
    <AdminNotificationsContext.Provider value={value}>
      {children}
    </AdminNotificationsContext.Provider>
  );
}

export function useAdminNotifications(): AdminNotificationsContextValue {
  const context = useContext(AdminNotificationsContext);
  if (!context) {
    throw new Error(
      "useAdminNotifications must be used inside AdminNotificationsProvider",
    );
  }
  return context;
}
