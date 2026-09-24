import { transactionDateTimeFormat } from "@/components/admin/transactions/transaction-list-utils";
import type { AdminTransactionActivityEntry } from "@/types";

export function TransactionActivitySection({
  activity,
}: {
  activity: AdminTransactionActivityEntry[];
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        History
      </p>
      <h2 className="mt-1 font-serif text-[24px]">Activity</h2>

      <ol className="mt-5 space-y-1">
        {activity.map((entry, index) => (
          <li
            key={entry.id}
            className="relative flex gap-4 pb-5 before:absolute before:top-7 before:bottom-0 before:left-[7px] before:w-px before:bg-border last:pb-0 last:before:hidden"
          >
            <span className="mt-1.5 size-3.5 shrink-0 rounded-full border-2 border-secondary bg-surface-lowest" />
            <div>
              <p className="text-[11px] font-semibold">{entry.title}</p>
              <p className="mt-1 text-[10px] leading-4 text-on-surface-variant">
                {entry.description}
              </p>
              <p className="mt-1 text-[9px] text-on-surface-variant">
                {transactionDateTimeFormat.format(new Date(entry.createdAt))}
              </p>
              {index === activity.length - 1 ? (
                <span className="mt-2 inline-flex bg-accent px-2 py-0.5 text-[8px] font-semibold uppercase">
                  Most recent
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
