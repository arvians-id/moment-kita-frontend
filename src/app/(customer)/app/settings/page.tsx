import type { Metadata } from "next";

import { SettingsWorkspace } from "@/components/customer/settings/settings-workspace";
import type { SettingsTab } from "@/components/customer/settings/settings-nav";
import { getSettingsOverview } from "@/services/customer/settings-service";

export const metadata: Metadata = { title: "Settings" };

/** Reflects the signed-in customer's own account state. */
export const dynamic = "force-dynamic";

const validTabs: SettingsTab[] = ["profile", "security", "notifications"];

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [overview, { tab }] = await Promise.all([
    getSettingsOverview(),
    searchParams,
  ]);
  const initialTab = validTabs.includes(tab as SettingsTab)
    ? (tab as SettingsTab)
    : "profile";

  return <SettingsWorkspace overview={overview} initialTab={initialTab} />;
}
