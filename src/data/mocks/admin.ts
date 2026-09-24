import type {
  AdminAlert,
  AdminDashboardMetrics,
  AdminUser,
  InvitationLifecycleBreakdown,
  RecentInvitation,
  RecentTransaction,
  RevenueTrendPoint,
  TemplateUsageEntry,
} from "@/types";

export const mockAdminUser: AdminUser = {
  name: "Atelier Admin",
  role: "Superuser",
  initials: "AA",
};

export const mockAdminMetrics: AdminDashboardMetrics = {
  totalCustomers: { value: 342, changePercent: 8.4, note: "+27 this month" },
  totalTransactions: { value: 618, changePercent: 5.1, note: "84 this month" },
  totalRevenue: {
    value: 482_650_000,
    changePercent: 12.6,
    note: "This fiscal quarter",
  },
  activeInvitations: { value: 184, note: "Published & live" },
  expiredInvitations: { value: 26, note: "Past grace window" },
  pendingPayments: { value: 9, note: "Awaiting confirmation" },
  totalQuotaSold: { value: 940, note: "Across all packages" },
  quotaUsed: { value: 611, note: "65% of quota sold" },
};

export const mockRevenueTrend: readonly RevenueTrendPoint[] = [
  { label: "Apr", amount: 28_400_000 },
  { label: "May", amount: 31_200_000 },
  { label: "Jun", amount: 29_800_000 },
  { label: "Jul", amount: 36_500_000 },
  { label: "Aug", amount: 41_900_000 },
  { label: "Sep", amount: 45_300_000 },
];

export const mockInvitationLifecycle: readonly InvitationLifecycleBreakdown[] =
  [
    { status: "published", count: 184 },
    { status: "finalized", count: 22 },
    { status: "draft", count: 38 },
    { status: "expired", count: 26 },
    { status: "cancelled", count: 7 },
  ];

export const mockTemplateUsage: readonly TemplateUsageEntry[] = [
  { templateName: "Château de Chantilly", suiteCount: 64 },
  { templateName: "Botanique Vivace", suiteCount: 51 },
  { templateName: "Kyoto Monochrome", suiteCount: 38 },
  { templateName: "Tuscan Terracotta", suiteCount: 25 },
  { templateName: "Aura Blanche", suiteCount: 19 },
];

export const mockRecentTransactions: readonly RecentTransaction[] = [
  {
    id: "adm_txn_01",
    reference: "TRX-98421",
    customerName: "Ayu Prameswari",
    purpose: "package",
    productName: "Bespoke Duo (Digital + Print)",
    amount: 25_900_000,
    status: "paid",
    createdAt: "2026-09-18T09:30:00+07:00",
  },
  {
    id: "adm_txn_02",
    reference: "TRX-98420",
    customerName: "Budi Santoso",
    purpose: "extension",
    productName: "30-Day Portal Extension",
    amount: 1_450_000,
    status: "paid",
    createdAt: "2026-09-17T14:05:00+07:00",
  },
  {
    id: "adm_txn_03",
    reference: "PO-8821",
    customerName: "Sarah Jenkins",
    purpose: "printed",
    productName: "Grand Heirloom Letterpress Suite",
    amount: 45_820_000,
    status: "pending",
    createdAt: "2026-09-16T11:20:00+07:00",
  },
  {
    id: "adm_txn_04",
    reference: "TRX-98418",
    customerName: "Melina Kertanegara",
    purpose: "quotaAddon",
    productName: "Additional Invitation Quota",
    amount: 13_400_000,
    status: "pending",
    createdAt: "2026-09-15T16:42:00+07:00",
  },
  {
    id: "adm_txn_05",
    reference: "TRX-98412",
    customerName: "Arthur Pendelton",
    purpose: "package",
    productName: "Signature Digital Suite",
    amount: 13_400_000,
    status: "paid",
    createdAt: "2026-09-14T10:12:00+07:00",
  },
  {
    id: "adm_txn_06",
    reference: "TRX-98390",
    customerName: "Chloe D'Souza",
    purpose: "package",
    productName: "Essential Single",
    amount: 800_000,
    status: "refunded",
    createdAt: "2026-09-10T08:55:00+07:00",
  },
];

/**
 * Additional PRINTED transaction fixtures shared by the Transactions ledger
 * and Printed Orders operations page. They stay transaction records (rather
 * than a parallel payment collection) because printed commerce uses the same
 * canonical transaction shell as every other purchase.
 */
export const mockPrintedTransactions: readonly RecentTransaction[] = [
  {
    id: "adm_txn_print_02",
    reference: "PO-8819",
    customerName: "Ayu Prameswari",
    purpose: "printed",
    productName: "Copenhagen Reverie",
    amount: 85_000_000,
    status: "paid",
    createdAt: "2026-09-14T16:40:00+07:00",
  },
  {
    id: "adm_txn_print_03",
    reference: "PO-8816",
    customerName: "Julianne Moreau",
    purpose: "printed",
    productName: "Le Jardin Minimaliste",
    amount: 78_000_000,
    status: "paid",
    createdAt: "2026-09-11T14:10:00+07:00",
  },
  {
    id: "adm_txn_print_04",
    reference: "PO-8812",
    customerName: "Chloe D'Souza",
    purpose: "printed",
    productName: "Paper Tasting Box",
    amount: 450_000,
    status: "paid",
    createdAt: "2026-09-08T09:30:00+07:00",
  },
  {
    id: "adm_txn_print_05",
    reference: "PO-8809",
    customerName: "Arthur Pendelton",
    purpose: "printed",
    productName: "Ethereal Botanique",
    amount: 34_000_000,
    status: "paid",
    createdAt: "2026-09-04T11:20:00+07:00",
  },
  {
    id: "adm_txn_print_06",
    reference: "PO-8804",
    customerName: "Melina Kertanegara",
    purpose: "printed",
    productName: "Sienna & Solstice",
    amount: 52_000_000,
    status: "paid",
    createdAt: "2026-08-29T18:00:00+07:00",
  },
  {
    id: "adm_txn_print_07",
    reference: "PO-8798",
    customerName: "Beatrice Vane",
    purpose: "printed",
    productName: "Le Jardin Minimaliste",
    amount: 21_250_000,
    status: "refunded",
    createdAt: "2026-08-20T13:45:00+07:00",
  },
];

export const mockRecentInvitations: readonly RecentInvitation[] = [
  {
    id: "adm_inv_01",
    coupleLabel: "Raka & Ayu",
    customerName: "Ayu Prameswari",
    status: "published",
    eventDate: "2026-11-24T10:00:00+07:00",
    expiresAt: "2027-02-20T23:59:00+07:00",
  },
  {
    id: "adm_inv_02",
    coupleLabel: "Marc & Julianne",
    customerName: "Julianne Moreau",
    status: "published",
    eventDate: "2026-06-14T16:00:00+07:00",
    expiresAt: "2026-09-30T23:59:00+07:00",
  },
  {
    id: "adm_inv_03",
    coupleLabel: "Budi & Sarah",
    customerName: "Budi Santoso",
    // Finalized but never published: the expiration timer has not started.
    status: "finalized",
    eventDate: "2026-12-05T09:00:00+07:00",
    expiresAt: null,
  },
  {
    id: "adm_inv_04",
    coupleLabel: "Sarah & Liam",
    customerName: "Sarah Jenkins",
    status: "published",
    eventDate: "2026-06-18T15:00:00+07:00",
    expiresAt: "2026-12-01T23:59:00+07:00",
  },
  {
    id: "adm_inv_05",
    coupleLabel: "Melina & Dayson",
    customerName: "Melina Kertanegara",
    status: "draft",
    eventDate: "2026-08-02T10:00:00+07:00",
    expiresAt: null,
  },
  {
    id: "adm_inv_06",
    coupleLabel: "Eleanor & Thomas",
    customerName: "Eleanor Vance",
    status: "expired",
    eventDate: "2026-03-01T11:00:00+07:00",
    expiresAt: "2026-09-01T23:59:00+07:00",
  },
];

export const mockAdminAlerts: readonly AdminAlert[] = [
  {
    id: "alert_pending_payments",
    severity: "critical",
    title: "9 payments awaiting confirmation",
    description:
      "Manual bank transfers verified but not yet confirmed in the ledger.",
    actionLabel: "Review Transactions",
    actionHref: "/admin/transactions",
  },
  {
    id: "alert_expiring_soon",
    severity: "warning",
    title: "3 invitations expiring within 14 days",
    description:
      "Marc & Julianne and 2 others are approaching the end of their hosting window.",
    actionLabel: "View Invitations",
    actionHref: "/admin/invitations",
  },
  {
    id: "alert_zero_quota",
    severity: "warning",
    title: "5 customers have no remaining quota",
    description:
      "These customers cannot finalize a new invitation without a top-up.",
    actionLabel: "Review Customers",
    actionHref: "/admin/customers",
  },
  {
    id: "alert_unpublished_finalized",
    severity: "info",
    title: "22 finalized invitations are not yet published",
    description:
      "Content is locked and ready; the couple has not gone live yet.",
    actionLabel: "View Invitations",
    actionHref: "/admin/invitations",
  },
];
