import { Home, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

import type { DigitalGiftSummary } from "@/types";

export function InvitationGiftPanel({
  invitationId,
  gift,
}: {
  invitationId: string;
  gift: DigitalGiftSummary | null;
}) {
  return (
    <section className="flex flex-col gap-5 bg-surface-lowest p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Tanda kasih &amp; registry
          </span>
          <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
            Configured digital envelopes
          </h2>
        </div>
        <Link
          href={`/app/invitations/${invitationId}/gift`}
          className="inline-flex h-8 items-center gap-1.5 bg-surface-container px-3 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
        >
          <SlidersHorizontal aria-hidden size={14} />
          Configure
        </Link>
      </div>

      {gift && gift.accounts.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {gift.accounts.map((account) => (
              <li
                key={account.id}
                className="flex items-start justify-between gap-3 bg-surface-low p-4"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
                    {account.role}
                  </span>
                  <span className="font-serif text-[18px] leading-7">
                    {account.bankName}
                  </span>
                  <span className="font-mono text-[13px] font-semibold tracking-wider">
                    {account.accountNumber}
                  </span>
                  <span className="truncate text-[13px] leading-5 text-on-surface-variant">
                    a.n. {account.accountHolder}
                  </span>
                </div>
                <span className="shrink-0 bg-surface-highest px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase">
                  {account.badge}
                </span>
              </li>
            ))}
          </ul>

          {gift.deliveryAddress ? (
            <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-low p-3 text-[13px] leading-5">
              <span className="flex items-center gap-2">
                <Home
                  aria-hidden
                  size={16}
                  className="shrink-0 text-secondary"
                />
                <span>Gift delivery address: {gift.deliveryAddress}</span>
              </span>
              <Link
                href={`/app/invitations/${invitationId}/gift`}
                className="text-[12px] font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-on-surface"
              >
                Edit
              </Link>
            </div>
          ) : null}
        </>
      ) : (
        <p className="bg-surface-low p-4 text-[13px] leading-relaxed text-on-surface-variant">
          No digital gift accounts configured yet. Add a bank transfer or QRIS
          account so guests can send their tanda kasih.
        </p>
      )}
    </section>
  );
}
