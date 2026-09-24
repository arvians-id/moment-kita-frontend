import type { Metadata } from "next";

import { PackagesQuotaView } from "@/components/admin/packages/packages-quota-view";
import { getAdminPackagesQuota } from "@/services/admin/package-service";

export const metadata: Metadata = {
  title: "Packages & Quota",
  description:
    "Manage commercial wedding suite tiers, invitation quota allowances, and monitor client quota balance operations.",
};

export default async function AdminPackagesQuotaPage() {
  const data = await getAdminPackagesQuota();

  return <PackagesQuotaView data={data} />;
}
