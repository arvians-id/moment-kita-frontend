import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InvitationBuilder } from "@/components/customer/invitation-builder/invitation-builder";
import { getInvitationBuilder } from "@/services/customer/invitation-builder-service";

export const metadata: Metadata = { title: "Invitation Studio" };

/** Editor data will be request-scoped once customer API integration lands. */
export const dynamic = "force-dynamic";

export default async function InvitationBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const builder = await getInvitationBuilder(id);

  if (!builder) notFound();

  return <InvitationBuilder initialData={builder} />;
}
