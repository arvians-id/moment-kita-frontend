import type { Metadata } from "next";

import { DashboardEmptyState } from "@/components/customer/dashboard/dashboard-empty-state";
import { DashboardWelcome } from "@/components/customer/dashboard/dashboard-welcome";
import { EngagementCards } from "@/components/customer/dashboard/engagement-cards";
import { GuestResponseSummary } from "@/components/customer/dashboard/guest-response-summary";
import { InvitationSpotlight } from "@/components/customer/dashboard/invitation-spotlight";
import { InvitationsPortfolio } from "@/components/customer/dashboard/invitations-portfolio";
import { PlanAndActivity } from "@/components/customer/dashboard/plan-and-activity";
import { QuickActions } from "@/components/customer/dashboard/quick-actions";
import { getCustomerDashboard } from "@/services/customer/dashboard-service";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * The dashboard reflects live per-request state (countdown, RSVP totals), and
 * will read the session cookie once authentication is wired in.
 */
export default async function CustomerDashboardPage() {
  const dashboard = await getCustomerDashboard();
  const { currentInvitation } = dashboard;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 pb-10 lg:gap-12">
      <DashboardWelcome
        customerName={dashboard.customer.name}
        weddingLabel={currentInvitation?.coupleLabel ?? null}
        alert={dashboard.alert}
      />

      {currentInvitation ? (
        <>
          <InvitationSpotlight
            invitation={currentInvitation}
            daysUntilWedding={dashboard.daysUntilWedding}
          />
          <GuestResponseSummary guests={dashboard.guests} />
          <QuickActions />
          <EngagementCards engagement={dashboard.engagement} />
          <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <InvitationsPortfolio
                invitations={dashboard.invitations}
                currentInvitationId={currentInvitation.id}
              />
            </div>
            <div className="lg:col-span-5">
              <PlanAndActivity
                entitlement={dashboard.entitlement}
                activity={dashboard.activity}
              />
            </div>
          </section>
        </>
      ) : (
        <DashboardEmptyState />
      )}
    </div>
  );
}
