import type { Metadata } from "next";
import { Suspense } from "react";

import { AdminCreateInvitationFlow } from "@/components/admin/create-invitation/create-invitation-flow";
import { getAdminCreateInvitationData } from "@/services/admin/create-invitation-service";

export const metadata: Metadata = {
  title: "Create Invitation",
  description: "Create an Admin-managed Moment Kita invitation draft.",
};

export default async function AdminCreateInvitationPage() {
  const data = await getAdminCreateInvitationData();
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-surface-low" />}>
      <AdminCreateInvitationFlow data={data} />
    </Suspense>
  );
}
