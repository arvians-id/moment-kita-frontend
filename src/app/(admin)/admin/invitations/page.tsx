import type { Metadata } from "next";

import { InvitationListView } from "@/components/admin/invitations/invitation-list-view";
import { getAdminInvitationList } from "@/services/admin/invitation-service";

export const metadata: Metadata = {
  title: "Invitations",
  description:
    "Manage invitation lifecycles across registered and studio-managed customers.",
};

export default async function AdminInvitationsPage() {
  const data = await getAdminInvitationList();

  return <InvitationListView data={data} />;
}
