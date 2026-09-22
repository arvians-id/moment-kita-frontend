import type { Metadata } from "next";

import { InvitationCollection } from "@/components/customer/invitations/invitation-collection";
import { InvitationMetrics } from "@/components/customer/invitations/invitation-metrics";
import { InvitationsHeader } from "@/components/customer/invitations/invitations-header";
import { QuotaTipBanner } from "@/components/customer/invitations/quota-tip-banner";
import { getCustomerInvitationsOverview } from "@/services/customer/invitation-service";

export const metadata: Metadata = { title: "My Invitations" };

/** Reflects live per-request invitation state, and will read the session cookie. */
export const dynamic = "force-dynamic";

export default async function MyInvitationsPage() {
  const { invitations, entitlement, counts } =
    await getCustomerInvitationsOverview();

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col pb-10">
      <InvitationsHeader />
      <InvitationMetrics counts={counts} entitlement={entitlement} />
      <QuotaTipBanner entitlement={entitlement} />
      <InvitationCollection invitations={invitations} counts={counts} />
    </div>
  );
}
