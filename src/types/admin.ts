import type {
  Customer,
  InvitationStatus,
  TransactionPurpose,
  TransactionStatus,
} from "./customer";
import type { Package } from "./package";

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

/** Account linkage is explicit: managed profiles can exist without a User. */
export type AdminCustomerAccountType = "registered" | "managed";

export type AdminCustomerStatus = "active" | "no_quota" | "pending_payment";

export type AdminCustomerPaymentStatus = "paid" | "pending";

/**
 * Admin directory projection of the canonical CustomerProfile aggregate.
 * `linkedUserId = null` is intentional for studio-managed customers and must
 * never be inferred from a matching email address.
 */
export interface AdminCustomer extends Pick<
  Customer,
  "id" | "name" | "initials"
> {
  email: string | null;
  whatsapp: string;
  accountType: AdminCustomerAccountType;
  linkedUserId: string | null;
  invitationCount: number;
  quotaGranted: number;
  quotaRemaining: number;
  totalSpending: number;
  paymentStatus: AdminCustomerPaymentStatus;
  status: AdminCustomerStatus;
  /** ISO 8601 timestamp. */
  joinedAt: string;
  notes?: string;
}

export interface AdminCustomerSummary {
  totalCustomers: number;
  registeredAccounts: number;
  managedCustomers: number;
  paidCustomers: number;
  addedThisMonth: number;
}

export interface AdminCustomerListData {
  customers: AdminCustomer[];
  summary: AdminCustomerSummary;
}

/** Customer-owned invitation projection used by the Admin dossier. */
export interface AdminCustomerInvitation {
  id: string;
  slug: string;
  coupleLabel: string;
  status: InvitationStatus;
  /** ISO 8601 ceremony date. */
  eventDate: string;
  venue: string;
  templateName: string;
  /** ISO 8601; null until the invitation has been published once. */
  publishedAt: string | null;
  /** Null until the first publish starts the expiration window. */
  expiresAt: string | null;
}

export type AdminInvitationOwner = Pick<
  AdminCustomer,
  "id" | "name" | "accountType" | "linkedUserId"
>;

/** Cross-customer invitation projection used by the Admin registry. */
export interface AdminInvitationListItem extends AdminCustomerInvitation {
  customer: AdminInvitationOwner;
}

export interface AdminInvitationSummary {
  total: number;
  draft: number;
  finalized: number;
  published: number;
  expired: number;
  cancelled: number;
}

export interface AdminInvitationListData {
  invitations: AdminInvitationListItem[];
  summary: AdminInvitationSummary;
  templates: string[];
}

/** Customer-specific transaction projection; the full commerce module is separate. */
export interface AdminCustomerTransaction {
  id: string;
  reference: string;
  purpose: AdminTransactionPurpose;
  productName: string;
  amount: number;
  status: TransactionStatus;
  /** ISO 8601. */
  createdAt: string;
}

export type AdminQuotaSource =
  "Package purchase" | "Invitation" | "Admin adjustment";

/** Append-oriented history only; current quota remains authoritative on the customer. */
export interface AdminCustomerQuotaEntry {
  id: string;
  delta: number;
  reason: string;
  source: AdminQuotaSource;
  /** ISO 8601. */
  createdAt: string;
  adminName?: string;
}

export type AdminCustomerActivityKind =
  "customer" | "payment" | "invitation" | "quota" | "profile";

export interface AdminCustomerActivity {
  id: string;
  kind: AdminCustomerActivityKind;
  title: string;
  description: string;
  /** ISO 8601. */
  createdAt: string;
  actor: string;
}

export interface AdminCustomerPackageSummary extends Pick<
  Package,
  "id" | "name" | "description"
> {
  /** ISO 8601. */
  activatedAt: string;
  /** ISO 8601, when this package has a defined validity window. */
  expiresAt?: string;
}

/** Complete service payload for one Admin customer dossier. */
export interface AdminCustomerDetailData {
  customer: AdminCustomer;
  currentPackage: AdminCustomerPackageSummary | null;
  invitations: AdminCustomerInvitation[];
  transactions: AdminCustomerTransaction[];
  quotaHistory: AdminCustomerQuotaEntry[];
  activity: AdminCustomerActivity[];
}
