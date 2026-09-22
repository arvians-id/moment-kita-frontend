import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CustomerSidebar } from "@/components/customer/layout/customer-sidebar";
import { CustomerTopbar } from "@/components/customer/layout/customer-topbar";
import { getCustomerDashboard } from "@/services/customer/dashboard-service";

export const metadata: Metadata = {
  title: { default: "Client Suite", template: "%s | Moment Kita" },
  robots: { index: false, follow: false },
};

/**
 * Shell for every authenticated Customer page. Navigation data is resolved
 * here so each page only renders its own content.
 */
export default async function CustomerAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { customer, invitations, currentInvitation, entitlement } =
    await getCustomerDashboard();

  return (
    <div className="min-h-screen bg-surface">
      <CustomerSidebar
        customer={customer}
        invitations={invitations}
        currentInvitation={currentInvitation}
        entitlement={entitlement}
      />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <CustomerTopbar
          customer={customer}
          invitations={invitations}
          currentInvitation={currentInvitation}
          entitlement={entitlement}
        />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
