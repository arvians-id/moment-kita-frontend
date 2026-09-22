import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WishesManagement } from "@/components/customer/wishes-management/wishes-management";
import { getWishesManagement } from "@/services/customer/wishes-management-service";

export const metadata: Metadata = { title: "Wishes Management" };

/** Wishes will be request-scoped through the Customer BFF later. */
export const dynamic = "force-dynamic";

export default async function WishesManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getWishesManagement(id);

  if (!data) notFound();

  return <WishesManagement initialData={data} />;
}
