import {
  mockAdminCustomerDetails,
  mockAdminCustomers,
  mockAdminCustomerSummary,
} from "@/data/mocks/admin-customers";
import type {
  AdminCustomer,
  AdminCustomerDetailData,
  AdminCustomerListData,
} from "@/types";

function cloneCustomer(customer: AdminCustomer): AdminCustomer {
  return { ...customer };
}

/**
 * Admin CustomerProfile directory boundary. A future same-origin Admin BFF
 * can replace these mock reads without changing the route or components.
 */
export async function getAdminCustomers(): Promise<AdminCustomer[]> {
  return mockAdminCustomers.map(cloneCustomer);
}

export async function getAdminCustomerList(): Promise<AdminCustomerListData> {
  return {
    customers: await getAdminCustomers(),
    summary: { ...mockAdminCustomerSummary },
  };
}

export async function getAdminCustomerDetail(
  customerId: string,
): Promise<AdminCustomerDetailData | null> {
  const detail = mockAdminCustomerDetails.get(customerId);

  if (!detail) return null;

  return {
    customer: cloneCustomer(detail.customer),
    currentPackage: detail.currentPackage ? { ...detail.currentPackage } : null,
    invitations: detail.invitations.map((invitation) => ({ ...invitation })),
    transactions: detail.transactions.map((transaction) => ({
      ...transaction,
    })),
    quotaHistory: detail.quotaHistory.map((entry) => ({ ...entry })),
    activity: detail.activity.map((entry) => ({ ...entry })),
  };
}
