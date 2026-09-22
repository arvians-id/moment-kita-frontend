import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuestImportFlow } from "@/components/customer/guest-import/guest-import-flow";
import { getGuestImportData } from "@/services/customer/guest-management-service";

export const metadata: Metadata = { title: "Import Guests" };

/** Import previews will be scoped to the signed-in customer through the BFF. */
export const dynamic = "force-dynamic";

export default async function GuestImportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getGuestImportData(id);

  if (!data) notFound();

  return <GuestImportFlow initialData={data} />;
}
