import type { Metadata } from "next";

import { AdminNotificationCenter } from "@/components/admin/notifications/notification-center";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "Review operational payment, invitation, printed-order, customer, and moderation notifications.",
};

export default function AdminNotificationsPage() {
  return <AdminNotificationCenter />;
}
