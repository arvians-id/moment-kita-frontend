import type { Metadata } from "next";

import { SettingsWorkspace } from "@/components/customer/settings/settings-workspace";
import { getSettingsOverview } from "@/services/customer/settings-service";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const overview = await getSettingsOverview();

  return <SettingsWorkspace overview={overview} />;
}
