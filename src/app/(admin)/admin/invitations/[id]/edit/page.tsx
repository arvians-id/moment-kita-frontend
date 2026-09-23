import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminInvitationEditor } from "@/components/admin/invitation-editor/admin-invitation-editor";
import { getAdminInvitationEditor } from "@/services/admin/invitation-service";

interface AdminInvitationEditorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: AdminInvitationEditorPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getAdminInvitationEditor(id);
  return {
    title: data ? `Edit ${data.invitation.coupleLabel}` : "Invitation Editor",
    description: data
      ? `Admin editing workspace for ${data.invitation.coupleLabel}.`
      : "Admin invitation editing workspace.",
  };
}

export default async function AdminInvitationEditorPage({
  params,
}: AdminInvitationEditorPageProps) {
  const { id } = await params;
  const data = await getAdminInvitationEditor(id);
  if (!data) notFound();

  return <AdminInvitationEditor initialData={data} />;
}
