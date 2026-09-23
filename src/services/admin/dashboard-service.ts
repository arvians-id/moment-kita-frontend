import {
  mockAdminAlerts,
  mockAdminMetrics,
  mockAdminNotificationsUnreadCount,
  mockAdminUser,
  mockInvitationLifecycle,
  mockRecentInvitations,
  mockRecentTransactions,
  mockRevenueTrend,
  mockTemplateUsage,
} from "@/data/mocks/admin";
import type {
  AdminDashboardData,
  AdminUser,
  RecentInvitation,
  RecentTransaction,
} from "@/types";

/**
 * Admin service boundary.
 *
 * Every read goes through here so the mock source can later be swapped for
 * the same-origin BFF without touching pages or components.
 */

export async function getAdminUser(): Promise<AdminUser> {
  return { ...mockAdminUser };
}

export async function getUnreadAdminNotificationCount(): Promise<number> {
  return mockAdminNotificationsUnreadCount;
}

export async function getRecentTransactions(): Promise<RecentTransaction[]> {
  return mockRecentTransactions.map((transaction) => ({ ...transaction }));
}

export async function getRecentInvitations(): Promise<RecentInvitation[]> {
  return mockRecentInvitations.map((invitation) => ({ ...invitation }));
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const [admin, recentTransactions, recentInvitations] = await Promise.all([
    getAdminUser(),
    getRecentTransactions(),
    getRecentInvitations(),
  ]);

  return {
    admin,
    metrics: { ...mockAdminMetrics },
    revenueTrend: mockRevenueTrend.map((point) => ({ ...point })),
    invitationLifecycle: mockInvitationLifecycle.map((entry) => ({ ...entry })),
    templateUsage: mockTemplateUsage.map((entry) => ({ ...entry })),
    recentTransactions,
    recentInvitations,
    alerts: mockAdminAlerts.map((alert) => ({ ...alert })),
  };
}
