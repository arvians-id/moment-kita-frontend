import { CheckCircle2, UserRound } from "lucide-react";

import type { AdminCustomer, CatalogTemplate, Package } from "@/types";

export function CreateInvitationSummary({
  customer,
  template,
  packageItem,
  partnerOne,
  partnerTwo,
  weddingDate,
  slug,
}: {
  customer?: AdminCustomer;
  template?: CatalogTemplate;
  packageItem?: Package;
  partnerOne: string;
  partnerTwo: string;
  weddingDate: string;
  slug: string;
}) {
  const one = partnerOne.trim().split(/\s+/)[0] || "Partner One";
  const two = partnerTwo.trim().split(/\s+/)[0] || "Partner Two";
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <section className="border border-border bg-surface-lowest p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
              Live Inspector
            </p>
            <h2 className="mt-1 font-serif text-[22px]">Draft Specification</h2>
          </div>
          <span className="bg-surface-container px-2 py-1 text-[8px] font-semibold uppercase">
            Draft
          </span>
        </div>
        <div className="mx-auto mt-5 max-w-[260px] border-[7px] border-[#191816] bg-[#fcf9f3] p-3 shadow-xl">
          <div className="flex min-h-72 flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#d7b8aa,_#8c4d37_48%,_#241d1a)] p-5 text-center text-white">
            <p className="text-[7px] font-semibold tracking-[0.2em] uppercase">
              Wedding Invitation
            </p>
            <h3 className="mt-5 font-serif text-[25px]">
              {one}
              <span className="block text-[14px] italic">&amp;</span>
              {two}
            </h3>
            <p className="mt-5 text-[8px] tracking-[0.12em] uppercase">
              {weddingDate || "Wedding date"}
            </p>
            <span className="mt-6 bg-black px-5 py-2 text-[7px] font-semibold uppercase">
              Open Guest Portal
            </span>
          </div>
        </div>
        <dl className="mt-5 divide-y divide-border text-[9px]">
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-on-surface-variant">Customer</dt>
            <dd className="text-right font-semibold">
              {customer?.name ?? "Not selected"}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-on-surface-variant">Template</dt>
            <dd className="text-right font-semibold">
              {template?.name ?? "Not selected"}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-on-surface-variant">Package</dt>
            <dd className="text-right font-semibold">
              {packageItem?.name ?? "Not selected"}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-on-surface-variant">Public path</dt>
            <dd className="max-w-[160px] truncate text-right font-mono">
              /{slug || "your-wedding"}
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex gap-2 bg-surface-low p-3 text-[9px] leading-4 text-on-surface-variant">
          <UserRound
            aria-hidden
            size={14}
            className="shrink-0 text-secondary"
          />
          <span>
            {customer?.linkedUserId
              ? "Registered customer account is explicitly linked."
              : customer
                ? "Managed customer; no login account will be provisioned or inferred."
                : "Select a customer to establish ownership."}
          </span>
        </div>
      </section>
      <div className="flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-4 py-3 text-[9px] text-emerald-950">
        <CheckCircle2 aria-hidden size={14} /> Draft creation consumes 0 quota
      </div>
    </aside>
  );
}
