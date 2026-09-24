"use client";

import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { AdminTopbar } from "@/components/admin/layout/admin-topbar";
import {
  AdminNotificationsProvider,
  useAdminNotifications,
} from "@/components/admin/notifications/admin-notifications-provider";
import type { AdminNotificationWithContext, AdminUser } from "@/types";

function AdminAppShellContent({
  admin,
  children,
}: {
  admin: AdminUser;
  children: ReactNode;
}) {
  const { unreadCount } = useAdminNotifications();

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar admin={admin} notificationsUnreadCount={unreadCount} />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <AdminTopbar admin={admin} notificationsUnreadCount={unreadCount} />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function AdminAppShell({
  admin,
  notifications,
  children,
}: {
  admin: AdminUser;
  notifications: AdminNotificationWithContext[];
  children: ReactNode;
}) {
  return (
    <AdminNotificationsProvider initialNotifications={notifications}>
      <AdminAppShellContent admin={admin}>{children}</AdminAppShellContent>
    </AdminNotificationsProvider>
  );
}
