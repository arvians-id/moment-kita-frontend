import type {
  ActivityEntry,
  Customer,
  DigitalGiftSummary,
  GuestResponseSummary,
  InvitationBuilderSectionType,
  InvitationGuestEntry,
  InvitationBuilderContent,
  InvitationBuilderSection,
  InvitationStatus,
  CustomerInvitation,
  InvitationWish,
  TransactionExtensionDetail,
  TransactionPayment,
  TransactionPurpose,
  TransactionStatus,
} from "./customer";
import type { Package, PackageTemplateAccessMode } from "./package";
import type {
  NotificationDeliveryPreference,
  NotificationRecord,
} from "./notification";
import type { PrintedProduct } from "./printed-product";
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
  actionHref: string;
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
  | "Package purchase"
  | "Additional quota purchase"
  | "Invitation"
  | "Admin adjustment";

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

/*
 * Template Detail types. Identity, availability, and commercial-access
 * fields all stay owned by `AdminTemplateListItem` (the Template List's own
 * type) so the List and Detail pages can never disagree about the same
 * template — this data only adds detail-only projections on top of it.
 */

export type AdminTemplateVersionStatus =
  "active" | "draft" | "available" | "disabled";

/**
 * Registry metadata for one released template build. Registering a version
 * here is a developer-handoff record only; it never uploads or edits
 * renderer source, and it never migrates invitations already pinned to a
 * different version.
 */
export interface AdminTemplateVersion {
  version: string;
  status: AdminTemplateVersionStatus;
  /** ISO 8601. */
  registeredAt: string;
  /** Invitations currently pinned to this exact version. */
  usageCount: number;
  note: string;
}

export type AdminCapabilitySupport = "supported" | "optional" | "unavailable";

/**
 * One content module a template's manifest may expose. Reuses the same
 * section vocabulary as the invitation content model
 * (`InvitationBuilderSectionType`) so a template's advertised capabilities
 * can never drift from what Create Invitation and the Invitation Editor
 * actually build against.
 */
export interface AdminTemplateCapability {
  type: InvitationBuilderSectionType;
  label: string;
  support: AdminCapabilitySupport;
  note: string;
}

export interface AdminTemplateMonthlyUsage {
  /** Short month label, e.g. "May". */
  label: string;
  count: number;
}

export interface AdminTemplateUsage {
  /** Equal to `AdminTemplateListItem.usageCount` — never a second total. */
  totalInvitations: number;
  publishedInvitations: number;
  draftInvitations: number;
  monthlyUsage: AdminTemplateMonthlyUsage[];
  /** A recent sample only, not the full registry — see the Usage tab's disclosure. */
  recentInvitations: AdminInvitationListItem[];
}

export interface AdminTemplatePackageAccess {
  packageId: string;
  packageName: string;
  available: boolean;
  price: number;
  description: string;
}

export interface AdminTemplateCommercial {
  availableToAllPackages: boolean;
  packages: AdminTemplatePackageAccess[];
}

/** Complete service payload for one Admin template dossier. */
export interface AdminTemplateDetailData {
  template: AdminTemplateListItem;
  /** ISO 8601 — when the template's first version was registered. */
  createdAt: string;
  versions: AdminTemplateVersion[];
  capabilities: AdminTemplateCapability[];
  usage: AdminTemplateUsage;
  commercial: AdminTemplateCommercial;
}

/*
 * Cross-customer Transactions registry. This is the Admin-wide commerce
 * ledger — distinct from `AdminCustomerTransaction`, the focused per-customer
 * ledger Customer Detail already renders — but it never duplicates the
 * underlying records: the service layer aggregates the exact same
 * per-customer transactions and the exact same Dashboard "recent
 * transactions" fixtures, only projecting them into a richer cross-customer
 * shape (customer link, related invitation, payment, and commercial effect).
 */

/** A transaction's customer is not always a resolvable registered profile. */
export interface AdminTransactionCustomerRef {
  id: string | null;
  name: string;
  accountType: AdminCustomerAccountType | null;
}

export interface AdminTransactionRelatedInvitation {
  id: string;
  coupleLabel: string;
}

export interface AdminTransactionListItem {
  id: string;
  /** Customer-friendly reference, e.g. "TRX-98421". */
  reference: string;
  purpose: AdminTransactionPurpose;
  productName: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  /** ISO 8601. */
  createdAt: string;
  /** ISO 8601; set once paid. */
  paidAt: string | null;
  customer: AdminTransactionCustomerRef;
  relatedInvitation: AdminTransactionRelatedInvitation | null;
  payment: TransactionPayment | null;
  /** Customer-friendly entitlement grants, e.g. "+1 Invitation Quota". Paid only. */
  entitlementsGranted: string[];
  /** Present only on `extension` transactions. */
  extension: TransactionExtensionDetail | null;
  /** Internal Admin verification/cancellation note. Mock/local only. */
  notes: string | null;
}

export interface AdminTransactionSummary {
  totalRevenue: number;
  revenueThisMonth: number;
  pendingCount: number;
  pendingAmount: number;
  paidCount: number;
}

export interface AdminTransactionListData {
  transactions: AdminTransactionListItem[];
  summary: AdminTransactionSummary;
}

/*
 * Printed Orders is an operational projection over PRINTED transactions. The
 * inherited transaction fields remain the only payment source of truth; the
 * fields below add manual print-run and fulfillment context only.
 */

export type AdminPrintedOrderStatus =
  | "new"
  | "confirmed"
  | "in_production"
  | "ready"
  | "shipped"
  | "completed"
  | "cancelled";

export interface AdminPrintedOrderFulfillment {
  method: "courier" | "studio_pickup" | "international";
  recipient: string;
  addressSummary: string | null;
  trackingNumber: string | null;
  statusLabel: string;
}

export interface AdminPrintedOrderItem extends AdminTransactionListItem {
  purpose: "printed";
  productId: string | null;
  designVariant: string;
  quantity: number;
  unitPrice: number;
  orderStatus: AdminPrintedOrderStatus;
  fulfillment: AdminPrintedOrderFulfillment;
  internalNote: string | null;
  customerNote: string | null;
  /** ISO 8601; manual studio dates, never machine-scheduling data. */
  productionStartedAt: string | null;
  /** ISO 8601 estimated date. */
  estimatedCompletionAt: string | null;
  /** ISO 8601. */
  shippedAt: string | null;
  /** ISO 8601. */
  deliveredAt: string | null;
}

export interface AdminPrintedOrderSummary {
  totalOrders: number;
  newOrders: number;
  inProduction: number;
  readyOrShipped: number;
  completed: number;
  paidRevenue: number;
}

export interface AdminPrintedOrderListData {
  orders: AdminPrintedOrderItem[];
  summary: AdminPrintedOrderSummary;
  products: PrintedProduct[];
  customers: AdminCustomer[];
}

export type AdminPrintedOrderActivityKind =
  "order" | "payment" | "production" | "fulfillment" | "note";

export interface AdminPrintedOrderActivity {
  id: string;
  kind: AdminPrintedOrderActivityKind;
  title: string;
  description: string;
  /** ISO 8601. */
  createdAt: string;
  actor: string;
}

export interface AdminPrintedOrderDetailData {
  order: AdminPrintedOrderItem;
  customerProfile: AdminCustomer | null;
  product: PrintedProduct | null;
  activity: AdminPrintedOrderActivity[];
}

/*
 * Operational notification center. Records keep only a resource type and id;
 * labels, customer context, amounts, statuses, and routes are resolved by the
 * Admin notification service from the canonical registries above.
 */

export type AdminNotificationCategory =
  "payments" | "invitations" | "printedOrders" | "customers" | "moderation";

export type AdminNotificationKind =
  | "paymentVerification"
  | "invitationExpiring"
  | "invitationExpired"
  | "printedOrderReady"
  | "customerCreated"
  | "wishesPending";

export type AdminNotificationPriority = "normal" | "requiresAction" | "urgent";

export type AdminNotificationResourceType =
  "transaction" | "invitation" | "printedOrder" | "customer";

export interface AdminNotification extends NotificationRecord {
  kind: AdminNotificationKind;
  category: AdminNotificationCategory;
  /** Null means unread; otherwise the ISO 8601 time it was acknowledged. */
  readAt: string | null;
  priority: AdminNotificationPriority;
  relatedResourceType: AdminNotificationResourceType;
  relatedResourceId: string;
}

export interface AdminNotificationContext {
  href: string;
  actionLabel: string;
  resourceLabel: string;
  reference: string | null;
  statusLabel: string | null;
  customer: Pick<AdminCustomer, "id" | "name"> | null;
  amount: number | null;
  expiresAt: string | null;
  pendingCount: number | null;
}

export interface AdminNotificationWithContext extends AdminNotification {
  context: AdminNotificationContext;
}

/* Platform-level MVP settings. These are intentionally explicit domain
 * fields rather than a generic key/value configuration engine. */

export type AdminSettingsLocale = "id-ID" | "en-GB" | "en-US";
export type AdminSettingsTimezone =
  "Asia/Jakarta" | "Asia/Makassar" | "Asia/Jayapura" | "UTC";

export interface AdminGeneralSettings {
  platformName: string;
  supportEmail: string;
  supportWhatsapp: string;
  timezone: AdminSettingsTimezone;
  locale: AdminSettingsLocale;
}

export interface AdminSettingsSession {
  device: string;
  location: string;
  lastActiveLabel: string;
}

export interface AdminSettingsAccount extends AdminUser {
  email: string;
  passwordUpdatedLabel: string;
  currentSession: AdminSettingsSession;
}

export type AdminSettingsNotificationCategory =
  "payments" | "invitations" | "printedOrders" | "moderation";

export interface AdminSettingsNotificationPreference extends NotificationDeliveryPreference {
  category: AdminSettingsNotificationCategory;
}

export interface AdminSettingsData {
  general: AdminGeneralSettings;
  account: AdminSettingsAccount;
  notificationPreferences: AdminSettingsNotificationPreference[];
}

/*
 * Transaction Detail projections. Every field here is derived at read time
 * from `AdminTransactionListItem` plus the existing Customer/Package
 * registries — nothing is stored as a second transaction record, so List
 * and Detail can never disagree about the same transaction.
 */

export interface AdminTransactionPackageEffect {
  packageId: string;
  packageName: string;
  price: number;
  quotaGranted: number;
  activeDurationDays: number;
}

export interface AdminTransactionQuotaEffect {
  quantity: number;
  /** Null when the owning customer profile could not be resolved. */
  quotaBefore: number | null;
  quotaAfter: number | null;
}

export interface AdminTransactionExtensionEffect {
  invitationId: string;
  coupleLabel: string;
  previousExpiresAt: string;
  extensionDays: number;
  newExpiresAt: string;
}

export interface AdminTransactionPrintedEffect {
  orderReference: string;
  summary: string;
}

export interface AdminTransactionActivityEntry {
  id: string;
  title: string;
  description: string;
  /** ISO 8601. */
  createdAt: string;
}

/** Complete service payload for one Admin transaction dossier. */
export interface AdminTransactionDetailData {
  transaction: AdminTransactionListItem;
  /** Full profile when the transaction resolves to a registered/managed customer. */
  customerProfile: AdminCustomer | null;
  packageEffect: AdminTransactionPackageEffect | null;
  quotaEffect: AdminTransactionQuotaEffect | null;
  extensionEffect: AdminTransactionExtensionEffect | null;
  printedEffect: AdminTransactionPrintedEffect | null;
  activity: AdminTransactionActivityEntry[];
}

/*
 * Packages & Quota. Package identity/pricing/quota/duration stay owned by
 * the shared `Package` type (the same records Create Invitation and
 * Template Detail's Commercial Settings already read); this only adds
 * operational projections (template access, active customers) on top.
 * Quota rows and ledger history are read from the same Customer registry
 * Customer Detail already owns — never a second quota balance.
 */

export interface AdminPackageListItem extends Package {
  /** Templates whose Commercial Settings include this package. */
  templateAccessCount: number;
  /** Customers currently on this package, by `currentPackage.name`. */
  activeCustomerCount: number;
}

export interface AdminPackageQuotaSummary {
  activePackages: number;
  totalQuotaSold: number;
  quotaUsed: number;
  remainingCustomerQuota: number;
  customersWithNoQuota: number;
}

/** One quota ledger row, enriched with a customer link and, where resolvable, its source transaction or invitation. */
export interface AdminQuotaLedgerEntry extends AdminCustomerQuotaEntry {
  customer: AdminTransactionCustomerRef;
  relatedTransactionId: string | null;
  relatedInvitationId: string | null;
}

export interface AdminCustomerQuotaRow {
  customer: AdminCustomer;
  /** ISO 8601; null when no quota ledger activity is on file. */
  lastActivityAt: string | null;
}

/** Complete service payload for the Packages & Quota page. */
export interface AdminPackagesQuotaData {
  packages: AdminPackageListItem[];
  summary: AdminPackageQuotaSummary;
  customers: AdminCustomerQuotaRow[];
  history: AdminQuotaLedgerEntry[];
}

/*
 * Package Editor. `PackageFormValues` is the editable subset of `Package`
 * (no `id` — assigned on create, immutable on edit) so Create and Edit can
 * share one form and one save path.
 */

export interface AdminPackageEditorTemplateOption {
  key: string;
  name: string;
  thumbnailUrl: string;
  category: string;
  /** Disabled templates are excluded from selection, matching Template List. */
  enabled: boolean;
}

export interface AdminPackageEditorData {
  /** Null when creating a new package. */
  package: Package | null;
  templates: AdminPackageEditorTemplateOption[];
}

export interface PackageFormValues {
  name: string;
  description: string;
  price: number;
  currency: "IDR";
  invitationQuota: number;
  activeDurationDays: number;
  active: boolean;
  featured: boolean;
  features: string[];
  templateAccessMode: PackageTemplateAccessMode;
  selectedTemplateKeys: string[];
}
