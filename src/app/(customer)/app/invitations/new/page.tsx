import type { Metadata } from "next";

import { CreateInvitationFlow } from "@/components/customer/create-invitation/create-invitation-flow";
import { CreateInvitationHeader } from "@/components/customer/create-invitation/create-invitation-header";
import { getCreateInvitationPageData } from "@/services/customer/create-invitation-service";

export const metadata: Metadata = { title: "Create Invitation" };

/** Entitlement and slug reservations will be request-scoped once the API lands. */
export default async function CreateInvitationPage() {
  const data = await getCreateInvitationPageData();

  return (
    <div className="mx-auto w-full max-w-[1440px] pb-10">
      <CreateInvitationHeader entitlement={data.entitlement} />
      <CreateInvitationFlow
        templates={data.templates}
        defaultTemplateKey={data.defaultTemplateKey}
        reservedSlugs={data.reservedSlugs}
        entitlement={data.entitlement}
      />
    </div>
  );
}
