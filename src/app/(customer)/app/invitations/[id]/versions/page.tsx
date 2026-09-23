import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VersionHistoryPage } from "@/components/customer/version-history/version-history";
import { getVersionHistory } from "@/services/customer/version-history-service";

export const metadata: Metadata = { title: "Version History" };

/** Version history will be request-scoped through the Customer BFF later. */
export default async function InvitationVersionHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getVersionHistory(id);

  if (!data) notFound();

  return <VersionHistoryPage initialData={data} />;
}
