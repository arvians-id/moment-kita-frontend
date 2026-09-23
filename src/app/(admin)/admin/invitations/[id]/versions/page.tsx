import { notFound } from "next/navigation";
import { InvitationVersionsSection } from "@/components/admin/invitation-detail/invitation-tab-sections";
import { getAdminInvitationDetail } from "@/services/admin/invitation-service";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getAdminInvitationDetail(id);
  if (!detail) notFound();
  return <InvitationVersionsSection data={detail} />;
}
