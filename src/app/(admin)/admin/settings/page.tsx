import type { Metadata } from "next";

import { AdminSettingsWorkspace } from "@/components/admin/settings/settings-workspace";
import { getAdminSettings } from "@/services/admin/settings-service";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage Moment Kita platform identity, operational preferences, and Admin account settings.",
};

export default async function AdminSettingsPage() {
  const data = await getAdminSettings();

  return <AdminSettingsWorkspace data={data} />;
}
