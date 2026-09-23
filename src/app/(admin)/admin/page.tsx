import type { Metadata } from "next";

import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import { DashboardMetrics } from "@/components/admin/dashboard/dashboard-metrics";
import { InvitationLifecycleChart } from "@/components/admin/dashboard/invitation-lifecycle-chart";
import { OperationalAlerts } from "@/components/admin/dashboard/operational-alerts";
import { AdminQuickActions } from "@/components/admin/dashboard/quick-actions";
import { RecentInvitationsList } from "@/components/admin/dashboard/recent-invitations";
import { RecentTransactionsTable } from "@/components/admin/dashboard/recent-transactions";
import { RevenueTrendChart } from "@/components/admin/dashboard/revenue-trend-chart";
import { TemplateUsageList } from "@/components/admin/dashboard/template-usage-list";
import { getAdminDashboard } from "@/services/admin/dashboard-service";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * The dashboard reflects live per-request state (telemetry, alert counts),
 * and will read the Admin session cookie once authentication is wired in.
 */
export const dynamic = "force-dynamic";

function greetingFor(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function AdminDashboardPage() {
  const dashboard = await getAdminDashboard();
  const firstName = dashboard.admin.name.split(" ")[0];

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 pb-10 lg:gap-12">
      <AdminPageHeader
        eyebrow="Operational Suite · Live Telemetry"
        title={
          <>
            {greetingFor(new Date())}, <span className="italic">{firstName}</span>
          </>
        }
        description="Real-time visibility into customers, invitations, and commerce across the whole Moment Kita studio."
      />

      <DashboardMetrics metrics={dashboard.metrics} />

      <AdminQuickActions />

      <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueTrendChart points={dashboard.revenueTrend} />
        </div>
        <InvitationLifecycleChart breakdown={dashboard.invitationLifecycle} />
      </section>

      <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <TemplateUsageList templates={dashboard.templateUsage} />
        <OperationalAlerts alerts={dashboard.alerts} />
      </section>

      <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <RecentTransactionsTable transactions={dashboard.recentTransactions} />
        <RecentInvitationsList invitations={dashboard.recentInvitations} />
      </section>
    </div>
  );
}
