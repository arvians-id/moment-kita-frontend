import {
  mockCustomerInvitations,
  mockEntitlement,
} from "@/data/mocks/customer";
import { mockCustomerTransactions } from "@/data/mocks/transactions";
import type {
  CustomerTransaction,
  CustomerTransactionWithInvitation,
  EntitlementSummary,
  TransactionStatus,
} from "@/types";

/**
 * Transaction/billing reads for the Customer CMS.
 *
 * Same boundary contract as the rest of `services/customer`: pages never
 * touch mock data directly, so the source can be swapped for the BFF later
 * without changing page components.
 */

export interface TransactionCounts {
  all: number;
  paid: number;
  pending: number;
  cancelled: number;
  refunded: number;
}

export interface TransactionsOverview {
  transactions: CustomerTransactionWithInvitation[];
  entitlement: EntitlementSummary;
  counts: TransactionCounts;
  /** Sum of `paid` transaction totals, in IDR. */
  totalSettledAmount: number;
  latestTransaction: CustomerTransactionWithInvitation | null;
}

function countBy(
  transactions: CustomerTransaction[],
  status: TransactionStatus,
): number {
  return transactions.filter((item) => item.status === status).length;
}

function clone(
  transaction: CustomerTransaction,
): CustomerTransactionWithInvitation {
  const related = transaction.relatedInvitationId
    ? mockCustomerInvitations.find(
        (invitation) => invitation.id === transaction.relatedInvitationId,
      )
    : undefined;

  return {
    ...transaction,
    amount: { ...transaction.amount },
    payment: { ...transaction.payment },
    entitlementsGranted: [...transaction.entitlementsGranted],
    extension: transaction.extension ? { ...transaction.extension } : undefined,
    relatedInvitation: related
      ? {
          id: related.id,
          coupleLabel: related.coupleLabel,
          slug: related.slug,
          templateName: related.templateName,
        }
      : null,
  };
}

export async function getCustomerTransactions(): Promise<
  CustomerTransactionWithInvitation[]
> {
  return mockCustomerTransactions.map(clone);
}

export async function getTransactionsOverview(): Promise<TransactionsOverview> {
  const transactions = await getCustomerTransactions();

  const paid = transactions.filter((item) => item.status === "paid");
  const totalSettledAmount = paid.reduce(
    (sum, item) => sum + item.amount.total,
    0,
  );

  const latestTransaction =
    [...transactions].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0] ?? null;

  return {
    transactions,
    entitlement: {
      ...mockEntitlement,
      features: [...mockEntitlement.features],
    },
    counts: {
      all: transactions.length,
      paid: countBy(transactions, "paid"),
      pending: countBy(transactions, "pending"),
      cancelled: countBy(transactions, "cancelled"),
      refunded: countBy(transactions, "refunded"),
    },
    totalSettledAmount,
    latestTransaction,
  };
}
