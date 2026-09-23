import type { ReactNode } from "react";

import { getCustomerInvitations } from "@/services/customer/dashboard-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const invitations = await getCustomerInvitations();
  return invitations.map((invitation) => ({ id: invitation.id }));
}

export default function InvitationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
