import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuestManagement } from "@/components/customer/guest-management/guest-management";
import { getGuestManagement } from "@/services/customer/guest-management-service";

export const metadata: Metadata = { title: "Guest Management" };

/** Guest records will be request-scoped through the Customer BFF later. */
export const dynamic = "force-dynamic";

export default async function GuestManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getGuestManagement(id);

  if (!data) notFound();

  return <GuestManagement initialData={data} />;
}
