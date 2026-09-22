import { ArrowLeft, Download, Headphones } from "lucide-react";
import Link from "next/link";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";
import type { CustomerInvitation } from "@/types";

export function ImportHeader({
  invitation,
  onDownloadTemplate,
}: {
  invitation: CustomerInvitation;
  onDownloadTemplate: () => void;
}) {
  return (
    <>
      <div className="border-b border-border bg-surface-low px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[10px] font-semibold tracking-[0.15em] text-on-surface-variant uppercase">
            <Link
              href="/app/invitations"
              className="transition-colors hover:text-on-surface"
            >
              My Invitations
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/app/invitations/${invitation.id}/guests`}
              className="transition-colors hover:text-on-surface"
            >
              Guests
            </Link>
            <span aria-hidden>/</span>
            <span className="text-secondary">Import Guests</span>
          </div>
          <a
            href={whatsappHref(
              `I need help importing guests for ${invitation.coupleLabel}.`,
            )}
            {...externalLinkProps}
            className="inline-flex min-h-9 w-fit items-center gap-2 bg-surface-container px-3 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:text-on-surface"
          >
            <Headphones aria-hidden size={14} className="text-secondary" />
            Atelier Concierge
          </a>
        </div>
      </div>

      <section className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-6 px-4 pt-8 sm:px-6 lg:flex-row lg:items-end lg:px-8">
        <div className="max-w-3xl">
          <Link
            href={`/app/invitations/${invitation.id}/guests`}
            className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase transition-colors hover:text-secondary"
          >
            <ArrowLeft aria-hidden size={15} /> Back to guest directory
          </Link>
          <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Guest Atelier · Guided Import
          </p>
          <h1 className="font-serif text-[38px] leading-[0.98] tracking-[-0.025em] sm:text-[48px] lg:text-[56px]">
            Import Wedding Guests &amp; Circles
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-on-surface-variant sm:text-[17px]">
            Bring your guest list into one considered space. We&apos;ll help
            validate every row before anything is added.
          </p>
        </div>
        <button
          type="button"
          onClick={onDownloadTemplate}
          className="inline-flex min-h-11 w-fit items-center justify-center gap-2 bg-surface-lowest px-5 text-[10px] font-semibold tracking-[0.12em] uppercase shadow-sm transition-colors hover:bg-surface-container"
        >
          <Download aria-hidden size={16} /> Download Import Template
        </button>
      </section>
    </>
  );
}
