import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DigitalGiftManagement } from "@/components/customer/digital-gift-management/digital-gift-management";
import { getDigitalGiftManagement } from "@/services/customer/digital-gift-management-service";

export const metadata: Metadata = { title: "Digital Gift Management" };

/** Gift configuration will be request-scoped through the Customer BFF later. */
export default async function DigitalGiftManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDigitalGiftManagement(id);

  if (!data) notFound();

  return <DigitalGiftManagement initialData={data} />;
}
