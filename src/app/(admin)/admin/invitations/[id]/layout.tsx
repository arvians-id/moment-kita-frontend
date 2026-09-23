import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { InvitationDetailShell } from "@/components/admin/invitation-detail/invitation-detail-shell";
import {
  getAdminInvitationDetail,
  getAdminInvitationIds,
} from "@/services/admin/invitation-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const invitationIds = await getAdminInvitationIds();
  return invitationIds.map((id) => ({ id }));
}

export default async function AdminInvitationDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getAdminInvitationDetail(id);
  if (!detail) notFound();

  return (
    <InvitationDetailShell data={detail}>{children}</InvitationDetailShell>
  );
}
