import type {
  ActivityEntry,
  Customer,
  DigitalGiftSummary,
  GuestResponseSummary,
  InvitationGuestEntry,
  InvitationBuilderContent,
  InvitationBuilderSection,
  InvitationStatus,
  CustomerInvitation,
  InvitationWish,
  TransactionPurpose,
  TransactionStatus,
} from "./customer";
import type { Package } from "./package";
import type { CatalogTemplate } from "./template";

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
  templateVersion: string;
  /** ISO 8601 timestamp when this suite was first created. */
  createdAt: string;
  /** Null until Finalize has occurred. */
  finalizedAt: string | null;
  /** ISO 8601; null until the invitation has been published once. */
  publishedAt: string | null;
  /** Null until the first publish starts the expiration window. */
  expiresAt: string | null;
  /** Finalize consumes quota; cancellation does not silently return it. */
  quotaConsumed: boolean;
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

export interface AdminInvitationEngagement {
  views: number;
  guests: GuestResponseSummary;
  rsvpCount: number;
  wishes: number;
  publishedWishes: number;
  pendingWishes: number;
  hiddenWishes: number;
}

export interface AdminInvitationContentSummary {
  enabledSections: string[];
  eventCount: number;
  galleryCount: number;
  audioEnabled: boolean;
  rsvpEnabled: boolean;
  wishesEnabled: boolean;
}

export interface AdminInvitationVersionSummary {
  id: string;
  versionNumber: number;
  summary: string;
  savedAt: string;
  actor: string;
  isCurrent: boolean;
}

export interface AdminInvitationExtension {
  id: string;
  days: number;
  previousExpiration: string;
  newExpiration: string;
  createdAt: string;
  actor: string;
  reason: string;
}

/** Complete service payload for one invitation-scoped Admin dossier. */
export interface AdminInvitationDetailData {
  invitation: AdminInvitationListItem;
  customer: AdminCustomer;
  currentPackage: AdminCustomerPackageSummary | null;
  engagement: AdminInvitationEngagement;
  content: AdminInvitationContentSummary;
  recentGuests: InvitationGuestEntry[];
  recentWishes: InvitationWish[];
  gift: DigitalGiftSummary | null;
  giftEnabled: boolean;
  versions: AdminInvitationVersionSummary[];
  activity: ActivityEntry[];
  extensionHistory: AdminInvitationExtension[];
}

export interface AdminCreateInvitationData {
  customers: AdminCustomer[];
  templates: CatalogTemplate[];
  packages: Package[];
  reservedSlugs: string[];
  defaultTemplateKey: string;
  defaultPackageId: string;
}

/** Admin editing workspace built on the shared invitation content model. */
export interface AdminInvitationEditorData {
  detail: AdminInvitationDetailData;
  invitation: CustomerInvitation;
  sections: InvitationBuilderSection[];
  content: InvitationBuilderContent;
  templates: CatalogTemplate[];
  reservedSlugs: string[];
}

export interface AdminTemplateListItem extends CatalogTemplate {
  activeVersion: string;
  enabled: boolean;
  featured: boolean;
  usageCount: number;
  packageAccess: string[];
}

export interface AdminTemplateSummary {
  totalTemplates: number;
  activeTemplates: number;
  featuredTemplates: number;
  totalUsage: number;
}

export interface AdminTemplateListData {
  templates: AdminTemplateListItem[];
  summary: AdminTemplateSummary;
  categories: string[];
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
