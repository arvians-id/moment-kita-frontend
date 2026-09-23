import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InvitationOverview } from "@/components/admin/invitation-detail/invitation-overview";
import { getAdminInvitationDetail } from "@/services/admin/invitation-service";

interface InvitationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = await getAdminInvitationDetail(id);
  return {
    title: detail?.invitation.coupleLabel ?? "Invitation",
    description: detail
      ? `Admin invitation dossier for ${detail.invitation.coupleLabel}.`
      : "Admin invitation dossier.",
  };
}

export default async function AdminInvitationDetailPage({
  params,
}: InvitationPageProps) {
  const { id } = await params;
  const detail = await getAdminInvitationDetail(id);
  if (!detail) notFound();
  return <InvitationOverview data={detail} />;
}
