"use client";

import { ArrowLeft, Check, FilePenLine } from "lucide-react";
import Link from "next/link";
import { publicConfig } from "@/lib/config";
import { useEscapeKey } from "@/lib/use-escape-key";

export function CreateInvitationSuccess({
  coupleLabel,
  slug,
  customerName,
  onClose,
}: {
  coupleLabel: string;
  slug: string;
  customerName: string;
  onClose: () => void;
}) {
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/55 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-create-success-title"
        className="w-full max-w-xl border border-border bg-surface-lowest p-6 text-center shadow-2xl sm:p-8"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-800">
          <Check aria-hidden size={28} />
        </span>
        <p className="mt-5 text-[9px] font-semibold tracking-[0.17em] text-secondary uppercase">
          Admin Draft Created
        </p>
        <h2
          id="admin-create-success-title"
          className="mt-1 font-serif text-[30px]"
        >
          Invitation Draft Created
        </h2>
        <p className="mt-3 text-[15px] font-semibold">{coupleLabel}</p>
        <p className="mt-1 text-[10px] text-on-surface-variant">
          Owned by {customerName} · {publicConfig.publicHost}/{slug}
        </p>
        <div className="my-6 bg-surface-low p-4 text-left">
          <p className="text-[9px] font-semibold tracking-[0.12em] uppercase">
            Lifecycle Result
          </p>
          <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
            Draft created in this frontend preview. Quota remains unchanged.
            Finalize and Publish are intentionally separate operations.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/admin/invitations"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-primary px-4 text-[9px] font-semibold tracking-[0.11em] text-white uppercase"
          >
            <ArrowLeft aria-hidden size={14} /> Back to Invitations
          </Link>
          <button
            type="button"
            disabled
            title="Available after the draft is persisted by the backend"
            className="inline-flex min-h-11 flex-1 cursor-not-allowed items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase opacity-60"
          >
            <FilePenLine aria-hidden size={14} /> Edit After Save
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase hover:text-secondary"
        >
          Review Draft Summary
        </button>
      </section>
    </div>
  );
}
