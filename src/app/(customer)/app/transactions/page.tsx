import type { Metadata } from "next";

import { ConciergeSupportBanner } from "@/components/customer/transactions/concierge-support-banner";
import { TransactionLedger } from "@/components/customer/transactions/transaction-ledger";
import { TransactionSummaryCards } from "@/components/customer/transactions/transaction-summary-cards";
import { TransactionsEmptyState } from "@/components/customer/transactions/transactions-empty-state";
import { TransactionsHeader } from "@/components/customer/transactions/transactions-header";
import { getTransactionsOverview } from "@/services/customer/transaction-service";

export const metadata: Metadata = { title: "Transactions" };

/** Reflects live per-request billing state, and will read the session cookie. */
export default async function TransactionsPage() {
  const overview = await getTransactionsOverview();

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col pb-10">
      <TransactionsHeader />

      {overview.counts.all > 0 ? (
        <>
          <TransactionSummaryCards overview={overview} />
          <TransactionLedger
            transactions={overview.transactions}
            counts={overview.counts}
          />
          <ConciergeSupportBanner />
        </>
      ) : (
        <div className="pt-8">
          <TransactionsEmptyState />
        </div>
      )}
    </div>
  );
}
