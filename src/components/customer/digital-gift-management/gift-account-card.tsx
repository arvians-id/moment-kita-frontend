"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Pencil,
  Smartphone,
  Trash2,
} from "lucide-react";

import type { DigitalGiftAccount } from "@/types";

export function GiftAccountCard({
  account,
  index,
  total,
  onEdit,
  onRemove,
  onMove,
}: {
  account: DigitalGiftAccount;
  index: number;
  total: number;
  onEdit: () => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  const isWallet = account.accountType === "e_wallet";
  const provider = account.provider ?? account.bankName;

  return (
    <article className="relative flex min-h-64 flex-col border border-border bg-surface-lowest p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 shrink-0 place-items-center bg-surface-container text-secondary">
          {isWallet ? (
            <Smartphone aria-hidden size={20} />
          ) : (
            <Building2 aria-hidden size={20} />
          )}
        </span>
        <div className="flex items-center gap-1">
          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={() => onMove(-1)}
                disabled={index === 0}
                aria-label={`Move ${provider} earlier`}
                className="grid size-9 place-items-center text-on-surface-variant hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft aria-hidden size={16} />
              </button>
              <button
                type="button"
                onClick={() => onMove(1)}
                disabled={index === total - 1}
                aria-label={`Move ${provider} later`}
                className="grid size-9 place-items-center text-on-surface-variant hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowRight aria-hidden size={16} />
              </button>
            </>
          ) : null}
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${provider}`}
            className="grid size-9 place-items-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          >
            <Pencil aria-hidden size={16} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${provider}`}
            className="grid size-9 place-items-center text-on-surface-variant hover:bg-error-container hover:text-error"
          >
            <Trash2 aria-hidden size={16} />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          {isWallet ? "E-Wallet" : "Bank Account"}
        </p>
        <h3 className="mt-1 font-serif text-[25px] leading-8">{provider}</h3>
        {account.label ? (
          <p className="mt-1 text-[11px] text-on-surface-variant">
            {account.label}
          </p>
        ) : null}
      </div>

      <dl className="mt-auto grid grid-cols-1 gap-4 pt-7 sm:grid-cols-2">
        <div>
          <dt className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            {isWallet ? "Phone / Account" : "Account Number"}
          </dt>
          <dd className="mt-1 font-mono text-[14px] tracking-[0.04em]">
            {account.accountNumber}
          </dd>
        </div>
        <div>
          <dt className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
            Account Holder
          </dt>
          <dd className="mt-1 text-[13px]">{account.accountHolder}</dd>
        </div>
      </dl>
    </article>
  );
}
