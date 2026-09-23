import { Download, Lock, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const inactiveClass =
  "inline-flex h-10 items-center gap-2 border border-surface-highest bg-surface-low px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase opacity-90 cursor-not-allowed";

export function TransactionsHeader() {
  return (
    <div className="flex flex-col gap-6 border-b border-surface-highest pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-low px-4 py-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] leading-4 font-semibold tracking-[0.15em] text-on-surface-variant uppercase">
            <span>Account</span>
            <span aria-hidden className="text-on-surface-variant/50">
              /
            </span>
            <span className="text-on-surface">
              Transactions &amp; Payment Settlements
            </span>
          </div>
          <div className="hidden items-center gap-2 border-l border-surface-highest pl-3 md:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-2.5 py-0.5 text-[11px] font-medium">
              <span
                aria-hidden
                className="size-1.5 animate-pulse rounded-full bg-secondary"
              />
              Concierge Billing Active
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-0.5 text-[11px] font-medium text-on-surface-variant">
              <Lock aria-hidden size={12} />
              Immutable Invoice Slips
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-0.5 text-[11px] font-medium text-on-surface-variant">
              <ShieldCheck aria-hidden size={12} />
              Zero Hidden Fees
            </span>
          </div>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-[11px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-on-surface"
        >
          <span>Explore Package Upgrades</span>
          <Sparkles aria-hidden size={13} />
        </Link>
      </div>

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex max-w-2xl flex-col gap-1">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Account &amp; Commercial Entitlements
          </span>
          <h1 className="font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
            Transactions &amp; Invoices
          </h1>
          <p className="mt-1 text-[15px] leading-relaxed text-on-surface-variant">
            View your package purchases, invitation validity extensions, and
            official transaction receipts. All payments are verified with care
            by our studio concierge desk.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex h-10 items-center gap-2 border border-surface-highest bg-surface-low px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
          >
            <Sparkles aria-hidden size={16} className="text-secondary" />
            <span>View Available Packages</span>
          </Link>
          {/* No PDF statement generator exists yet; stays inert instead of a dead download. */}
          <span aria-disabled="true" className={inactiveClass}>
            <Download aria-hidden size={16} />
            <span>Statement (PDF)</span>
          </span>
        </div>
      </div>
    </div>
  );
}
