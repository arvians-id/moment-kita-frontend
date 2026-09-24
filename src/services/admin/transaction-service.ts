import {
  mockPrintedTransactions,
  mockRecentTransactions,
} from "@/data/mocks/admin";
import {
  mockAdminCustomerDetails,
  mockAdminCustomers,
} from "@/data/mocks/admin-customers";
import { listPackages } from "@/data/mocks/admin-packages-store";
import type {
  AdminCustomer,
  AdminTransactionActivityEntry,
  AdminTransactionCustomerRef,
  AdminTransactionDetailData,
  AdminTransactionExtensionEffect,
  AdminTransactionListData,
  AdminTransactionListItem,
  AdminTransactionPackageEffect,
  AdminTransactionPrintedEffect,
  AdminTransactionPurpose,
  AdminTransactionQuotaEffect,
  AdminTransactionRelatedInvitation,
  AdminTransactionSummary,
  TransactionExtensionDetail,
  TransactionPayment,
  TransactionStatus,
} from "@/types";

/**
 * Admin-wide Transactions registry.
 *
 * This never introduces a second transaction dataset: every row is read
 * from the same fixtures Customer Detail (`mockAdminCustomerDetails`) and
 * the Dashboard (`mockRecentTransactions`) already render, only projected
 * into the richer cross-customer shape this page needs (customer link,
 * related invitation, payment, and commercial effect). A small, clearly
 * synthetic supplement fills in status/type coverage (a cancelled purchase)
 * that neither existing fixture set happens to include yet.
 */

const CURRENT_MONTH_PREFIX = "2026-09";
const PAYMENT_METHODS = [
  "Bank Transfer (BCA)",
  "Bank Transfer (Mandiri)",
  "Midtrans QRIS",
  "Stripe Card",
] as const;

function stableSeed(key: string): number {
  return Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function addDaysIso(iso: string, days: number): string {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function derivePayment(
  id: string,
  status: TransactionStatus,
): TransactionPayment | null {
  if (status === "cancelled") return null;

  const seed = stableSeed(id);
  const method = PAYMENT_METHODS[seed % PAYMENT_METHODS.length];
  const isBankTransfer = method.startsWith("Bank Transfer");

  return {
    method,
    channelBadge:
      status === "paid"
        ? "Settled"
        : status === "refunded"
          ? "Reversed"
          : "Awaiting Verification",
    bankReferenceNumber: isBankTransfer
      ? `REF-${seed}${id.slice(-4).toUpperCase()}`
      : undefined,
    verifiedAt: status === "paid" ? undefined : undefined,
  };
}

function deriveEntitlements(
  purpose: AdminTransactionPurpose,
  status: TransactionStatus,
): string[] {
  if (status !== "paid") return [];

  switch (purpose) {
    case "package":
      return ["Package activated", "+1 Invitation Quota"];
    case "quotaAddon":
      return ["+1 Invitation Quota"];
    case "extension":
      return ["Hosting window extended"];
    case "printed":
      return ["Printed order confirmed for production"];
    default:
      return [];
  }
}

function resolveCustomerRef(name: string): AdminTransactionCustomerRef {
  const match = mockAdminCustomers.find((customer) => customer.name === name);
  return match
    ? { id: match.id, name: match.name, accountType: match.accountType }
    : { id: null, name, accountType: null };
}

/**
 * Part A — every customer-scoped transaction Customer Detail already shows,
 * reused as-is (same id, amount, status, createdAt) and only enriched with
 * the customer link, a derived payment method, and the commercial effect.
 */
function buildFromCustomerDetails(): AdminTransactionListItem[] {
  return Array.from(mockAdminCustomerDetails.values()).flatMap((detail) => {
    const customer: AdminTransactionCustomerRef = {
      id: detail.customer.id,
      name: detail.customer.name,
      accountType: detail.customer.accountType,
    };
    const firstInvitation = detail.invitations[0] ?? null;

    return detail.transactions.map((transaction) => {
      const relatedInvitation: AdminTransactionRelatedInvitation | null =
        transaction.purpose === "quotaAddon" && firstInvitation
          ? { id: firstInvitation.id, coupleLabel: firstInvitation.coupleLabel }
          : null;

      return {
        id: transaction.id,
        reference: transaction.reference,
        purpose: transaction.purpose,
        productName: transaction.productName,
        description: `${transaction.productName} purchase for ${detail.customer.name}.`,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt,
        paidAt: transaction.status === "paid" ? transaction.createdAt : null,
        customer,
        relatedInvitation,
        payment: derivePayment(transaction.id, transaction.status),
        entitlementsGranted: deriveEntitlements(
          transaction.purpose,
          transaction.status,
        ),
        extension: null,
        notes: null,
      };
    });
  });
}

/**
 * Part B — the exact fixtures the Admin Dashboard's "Recent Transactions"
 * widget renders, reused so the two surfaces can never quietly disagree
 * about the same transaction.
 */
function buildFromSharedAdminFixtures(): AdminTransactionListItem[] {
  return [...mockRecentTransactions, ...mockPrintedTransactions].map(
    (transaction) => {
      const customer = resolveCustomerRef(transaction.customerName);
      const detail = customer.id
        ? mockAdminCustomerDetails.get(customer.id)
        : null;
      const firstInvitation = detail?.invitations[0] ?? null;

      let extension: TransactionExtensionDetail | null = null;
      if (transaction.purpose === "extension" && firstInvitation?.expiresAt) {
        const previousExpiresAt = firstInvitation.expiresAt;
        extension = {
          previousExpiresAt,
          extensionDays: 30,
          extendedUntil: addDaysIso(previousExpiresAt, 30),
        };
      }

      return {
        id: transaction.id,
        reference: transaction.reference,
        purpose: transaction.purpose,
        productName: transaction.productName,
        description: `${transaction.productName} for ${transaction.customerName}.`,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt,
        paidAt: transaction.status === "paid" ? transaction.createdAt : null,
        customer,
        relatedInvitation: firstInvitation
          ? { id: firstInvitation.id, coupleLabel: firstInvitation.coupleLabel }
          : null,
        payment: derivePayment(transaction.id, transaction.status),
        entitlementsGranted: deriveEntitlements(
          transaction.purpose,
          transaction.status,
        ),
        extension,
        notes: null,
      };
    },
  );
}

/**
 * Part C — a small, explicitly synthetic supplement covering a status the
 * two reused fixture sets do not otherwise exercise (Cancelled). It never
 * touches `customer.totalSpending`: a cancelled purchase settles no revenue.
 */
function buildSupplementalTransactions(): AdminTransactionListItem[] {
  const sophia = mockAdminCustomerDetails.get("cus_sophia_lauren");
  const cancelledInvitation =
    sophia?.invitations.find(
      (invitation) => invitation.status === "cancelled",
    ) ?? null;

  const cancelled: AdminTransactionListItem = {
    id: "adm_txn_supp_cancelled_01",
    reference: "TRX-SOPHIA-CANCEL-01",
    purpose: "package",
    productName: "Essential Digital Suite",
    description: "Essential Digital Suite purchase for Sophia Lauren.",
    amount: 299_000,
    status: "cancelled",
    createdAt: "2026-09-12T10:00:00+07:00",
    paidAt: null,
    customer: sophia
      ? {
          id: sophia.customer.id,
          name: sophia.customer.name,
          accountType: sophia.customer.accountType,
        }
      : { id: null, name: "Sophia Lauren", accountType: null },
    relatedInvitation: cancelledInvitation
      ? {
          id: cancelledInvitation.id,
          coupleLabel: cancelledInvitation.coupleLabel,
        }
      : null,
    payment: null,
    entitlementsGranted: [],
    extension: null,
    notes: "Cancelled before payment — the customer chose a different package.",
  };

  return [cancelled];
}

export async function getAdminTransactionList(): Promise<AdminTransactionListData> {
  const transactions = [
    ...buildFromSharedAdminFixtures(),
    ...buildFromCustomerDetails(),
    ...buildSupplementalTransactions(),
  ]
    .map((transaction) => ({ ...transaction }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const paid = transactions.filter(
    (transaction) => transaction.status === "paid",
  );
  const pending = transactions.filter(
    (transaction) => transaction.status === "pending",
  );

  const summary: AdminTransactionSummary = {
    totalRevenue: paid.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    ),
    revenueThisMonth: paid
      .filter((transaction) =>
        transaction.createdAt.startsWith(CURRENT_MONTH_PREFIX),
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    pendingCount: pending.length,
    pendingAmount: pending.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    ),
    paidCount: paid.length,
  };

  return { transactions, summary };
}

export async function getAdminTransactionIds(): Promise<string[]> {
  const { transactions } = await getAdminTransactionList();
  return transactions.map((transaction) => transaction.id);
}

/*
 * Transaction Detail derivation. Nothing here is a second transaction
 * record — every projection reads the same `AdminTransactionListItem` the
 * List page renders, plus the existing Customer and Package registries.
 */

function resolvePackage(transaction: AdminTransactionListItem) {
  const packages = listPackages();
  const name = transaction.productName.toLowerCase();
  const byName = packages.find((pkg) => name.includes(pkg.name.toLowerCase()));
  if (byName) return byName;

  const tierId =
    transaction.amount >= 20_000_000
      ? "prestige"
      : transaction.amount >= 5_000_000
        ? "signature"
        : "essential";
  return packages.find((pkg) => pkg.id === tierId) ?? null;
}

function buildPackageEffect(
  transaction: AdminTransactionListItem,
): AdminTransactionPackageEffect | null {
  if (transaction.purpose !== "package") return null;
  const pkg = resolvePackage(transaction);
  if (!pkg) return null;

  return {
    packageId: pkg.id,
    packageName: pkg.name,
    price: pkg.price,
    quotaGranted: pkg.invitationQuota,
    activeDurationDays: pkg.activeDurationDays,
  };
}

function buildQuotaEffect(
  transaction: AdminTransactionListItem,
  customerProfile: AdminCustomer | null,
): AdminTransactionQuotaEffect | null {
  if (transaction.purpose !== "quotaAddon") return null;
  const quantity = 1;

  if (!customerProfile)
    return { quantity, quotaBefore: null, quotaAfter: null };

  if (transaction.status === "paid") {
    const quotaBefore = Math.max(0, customerProfile.quotaRemaining - quantity);
    return {
      quantity,
      quotaBefore,
      quotaAfter: customerProfile.quotaRemaining,
    };
  }

  return {
    quantity,
    quotaBefore: customerProfile.quotaRemaining,
    quotaAfter: customerProfile.quotaRemaining + quantity,
  };
}

function buildExtensionEffect(
  transaction: AdminTransactionListItem,
): AdminTransactionExtensionEffect | null {
  if (
    transaction.purpose !== "extension" ||
    !transaction.extension ||
    !transaction.relatedInvitation
  ) {
    return null;
  }

  return {
    invitationId: transaction.relatedInvitation.id,
    coupleLabel: transaction.relatedInvitation.coupleLabel,
    previousExpiresAt: transaction.extension.previousExpiresAt,
    extensionDays: transaction.extension.extensionDays,
    newExpiresAt: transaction.extension.extendedUntil,
  };
}

function buildPrintedEffect(
  transaction: AdminTransactionListItem,
): AdminTransactionPrintedEffect | null {
  if (transaction.purpose !== "printed") return null;
  return {
    orderReference: transaction.reference,
    summary: transaction.productName,
  };
}

function buildActivity(
  transaction: AdminTransactionListItem,
): AdminTransactionActivityEntry[] {
  const entries: AdminTransactionActivityEntry[] = [
    {
      id: `${transaction.id}_created`,
      title: "Transaction created",
      description: `${transaction.productName} recorded for ${transaction.customer.name}.`,
      createdAt: transaction.createdAt,
    },
  ];

  if (transaction.payment) {
    entries.push({
      id: `${transaction.id}_proof`,
      title: "Payment proof submitted",
      description: `${transaction.payment.method} reference received for review.`,
      createdAt: transaction.createdAt,
    });
  }

  if (transaction.status === "paid" && transaction.paidAt) {
    entries.push({
      id: `${transaction.id}_confirmed`,
      title: "Payment confirmed",
      description: "An Admin verified the manual payment.",
      createdAt: transaction.paidAt,
    });
    transaction.entitlementsGranted.forEach((effect, index) => {
      entries.push({
        id: `${transaction.id}_effect_${index}`,
        title: effect,
        description: "Commercial effect applied.",
        createdAt: transaction.paidAt as string,
      });
    });
  }

  if (transaction.status === "cancelled") {
    entries.push({
      id: `${transaction.id}_cancelled`,
      title: "Transaction cancelled",
      description:
        transaction.notes ??
        "Cancelled by an Admin. No commercial effect was applied.",
      createdAt: transaction.createdAt,
    });
  }

  if (transaction.status === "refunded") {
    entries.push({
      id: `${transaction.id}_refunded`,
      title: "Transaction refunded",
      description: transaction.notes ?? "Marked as refunded.",
      createdAt: transaction.createdAt,
    });
  }

  return entries.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

export async function getAdminTransactionDetail(
  id: string,
): Promise<AdminTransactionDetailData | null> {
  const { transactions } = await getAdminTransactionList();
  const transaction = transactions.find((item) => item.id === id);
  if (!transaction) return null;

  const customerProfile = transaction.customer.id
    ? (mockAdminCustomers.find(
        (customer) => customer.id === transaction.customer.id,
      ) ?? null)
    : null;

  return {
    transaction,
    customerProfile: customerProfile ? { ...customerProfile } : null,
    packageEffect: buildPackageEffect(transaction),
    quotaEffect: buildQuotaEffect(transaction, customerProfile),
    extensionEffect: buildExtensionEffect(transaction),
    printedEffect: buildPrintedEffect(transaction),
    activity: buildActivity(transaction),
  };
}
