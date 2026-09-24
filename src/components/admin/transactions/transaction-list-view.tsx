import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import { TransactionDirectory } from "@/components/admin/transactions/transaction-directory";
import { TransactionMetrics } from "@/components/admin/transactions/transaction-metrics";
import type { AdminTransactionListData } from "@/types";

export function TransactionListView({ data }: { data: AdminTransactionListData }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="Moment Kita Commerce Ledger"
        title="Transactions"
        description="Review, verify, and reconcile digital package, quota, extension, and printed order payments across every customer."
      />

      <TransactionMetrics summary={data.summary} />
      <TransactionDirectory transactions={data.transactions} />
    </div>
  );
}
