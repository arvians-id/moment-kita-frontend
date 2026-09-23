import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { AdminTopbar } from "@/components/admin/layout/admin-topbar";
import {
  getAdminUser,
  getUnreadAdminNotificationCount,
} from "@/services/admin/dashboard-service";

export const metadata: Metadata = {
  title: { default: "Studio Admin", template: "%s | Moment Kita Admin" },
  robots: { index: false, follow: false },
};

/**
 * Shell for every authenticated Admin page. Navigation data is resolved
 * here so each page only renders its own content.
 */
export default async function AdminAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [admin, notificationsUnreadCount] = await Promise.all([
    getAdminUser(),
    getUnreadAdminNotificationCount(),
  ]);

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar
        admin={admin}
        notificationsUnreadCount={notificationsUnreadCount}
      />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <AdminTopbar
          admin={admin}
          notificationsUnreadCount={notificationsUnreadCount}
        />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
