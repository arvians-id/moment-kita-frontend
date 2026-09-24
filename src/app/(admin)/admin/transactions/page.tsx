import type { Metadata } from "next";

import { TransactionListView } from "@/components/admin/transactions/transaction-list-view";
import { getAdminTransactionList } from "@/services/admin/transaction-service";

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Review, verify, and reconcile digital package, quota, extension, and printed order payments across every Moment Kita customer.",
};

export default async function AdminTransactionsPage() {
  const data = await getAdminTransactionList();

  return <TransactionListView data={data} />;
}
