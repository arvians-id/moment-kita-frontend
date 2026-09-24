import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AdminAppShell } from "@/components/admin/layout/admin-app-shell";
import { getAdminUser } from "@/services/admin/dashboard-service";
import { getAdminNotifications } from "@/services/admin/notification-service";

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
  const [admin, notifications] = await Promise.all([
    getAdminUser(),
    getAdminNotifications(),
  ]);

  return (
    <AdminAppShell admin={admin} notifications={notifications}>
      {children}
    </AdminAppShell>
  );
}
