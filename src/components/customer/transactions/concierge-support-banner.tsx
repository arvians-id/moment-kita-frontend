import { MessageCircle } from "lucide-react";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

export function ConciergeSupportBanner() {
  return (
    <section className="mt-8 flex flex-col items-start justify-between gap-5 bg-surface-low p-5 sm:p-6 md:flex-row md:items-center">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-highest text-secondary">
          <MessageCircle aria-hidden size={19} />
        </span>
        <div>
          <h2 className="font-serif text-[19px] leading-6">
            Need Manual Transfer Verification or Custom Billing?
          </h2>
          <p className="mt-1 max-w-2xl text-[12px] leading-6 text-on-surface-variant">
            Manual bank transfers are reconciled by our dedicated billing
            concierge within 15–30 minutes during studio hours (08:00–22:00
            WIB). If your payment status is marked{" "}
            <strong className="font-semibold text-on-surface">
              Pending Review
            </strong>
            , your quota will activate automatically once verified — no form
            submissions required.
          </p>
        </div>
      </div>
      <a
        href={whatsappHref(
          "I need help with manual transfer verification or custom billing.",
        )}
        {...externalLinkProps}
        className="inline-flex shrink-0 items-center gap-2 bg-primary px-5 py-2.5 text-[11px] font-semibold tracking-[0.12em] text-primary-foreground uppercase shadow-sm transition-colors hover:bg-secondary"
      >
        <MessageCircle aria-hidden size={16} />
        Chat Concierge
      </a>
    </section>
  );
}
