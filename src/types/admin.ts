import type {
  InvitationStatus,
  TransactionPurpose,
  TransactionStatus,
} from "./customer";

/** The signed-in Admin operator. Auth is out of scope for this task. */
export interface AdminUser {
  name: string;
  role: string;
  initials: string;
}

/** A single KPI figure with an optional period-over-period delta. */
export interface AdminMetric {
  value: number;
  /** Percentage change vs. the prior period; omitted when not meaningful. */
  changePercent?: number;
  note: string;
}

export interface AdminDashboardMetrics {
  totalCustomers: AdminMetric;
  totalTransactions: AdminMetric;
  totalRevenue: AdminMetric;
  activeInvitations: AdminMetric;
  expiredInvitations: AdminMetric;
  pendingPayments: AdminMetric;
  totalQuotaSold: AdminMetric;
  quotaUsed: AdminMetric;
}

export interface RevenueTrendPoint {
  /** Short month label, e.g. "Apr". */
  label: string;
  amount: number;
}

export interface InvitationLifecycleBreakdown {
  status: InvitationStatus;
  count: number;
}

export interface TemplateUsageEntry {
  templateName: string;
  suiteCount: number;
}

/**
 * Admin-visible transaction purposes. Extends the Customer-facing set with
 * `printed`, since Printed Orders settle through the same transactions
 * table (`type = PRINTED` per the technical design) but customers never
 * purchase print directly through the Customer CMS.
 */
export type AdminTransactionPurpose = TransactionPurpose | "printed";

export interface RecentTransaction {
  id: string;
  /** Customer-friendly reference, e.g. "TRX-98421". */
  reference: string;
  customerName: string;
  purpose: AdminTransactionPurpose;
  productName: string;
  amount: number;
  status: TransactionStatus;
  /** ISO 8601. */
  createdAt: string;
}

export interface RecentInvitation {
  id: string;
  coupleLabel: string;
  customerName: string;
  status: InvitationStatus;
  /** ISO 8601 date of the ceremony. */
  eventDate: string;
  /** Null until first publish starts the expiration timer. */
  expiresAt: string | null;
}

export type AdminAlertSeverity = "critical" | "warning" | "info";

export interface AdminAlert {
  id: string;
  severity: AdminAlertSeverity;
  title: string;
  description: string;
  actionLabel: string;
}

export interface AdminDashboardData {
  admin: AdminUser;
  metrics: AdminDashboardMetrics;
  revenueTrend: RevenueTrendPoint[];
  invitationLifecycle: InvitationLifecycleBreakdown[];
  templateUsage: TemplateUsageEntry[];
  recentTransactions: RecentTransaction[];
  recentInvitations: RecentInvitation[];
  alerts: AdminAlert[];
}
