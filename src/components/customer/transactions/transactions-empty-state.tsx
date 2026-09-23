import { Sparkles } from "lucide-react";
import Link from "next/link";

/** Shown when the customer has no transactions of any kind yet. */
export function TransactionsEmptyState() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 bg-surface-lowest p-8 text-center shadow-sm">
      <span className="grid size-14 place-items-center rounded-full bg-surface-low text-secondary">
        <Sparkles aria-hidden size={26} />
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
          Nothing settled yet
        </span>
        <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
          Your transaction history will appear here
        </h2>
        <p className="text-[13px] leading-5 text-on-surface-variant">
          Once you purchase a package, extend your hosting, or add a quota,
          every receipt and entitlement will be listed on this page.
        </p>
      </div>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
      >
        <Sparkles aria-hidden size={14} />
        Explore Packages
      </Link>
    </section>
  );
}
