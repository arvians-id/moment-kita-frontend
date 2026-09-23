import type { Metadata } from "next";

import { NotificationCenter } from "@/components/customer/notifications/notification-center";
import { getNotificationsOverview } from "@/services/customer/notification-service";

export const metadata: Metadata = { title: "Notifications" };

/** Reflects live per-request read state, and will read the session cookie. */
export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const overview = await getNotificationsOverview();

  return <NotificationCenter overview={overview} />;
}
