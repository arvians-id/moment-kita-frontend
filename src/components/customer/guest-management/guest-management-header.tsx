import { Download, Headphones, Upload, UserRoundPlus } from "lucide-react";
import Link from "next/link";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";
import type { CustomerInvitation } from "@/types";

export function GuestManagementHeader({
  invitation,
  onAddGuest,
  onExport,
}: {
  invitation: CustomerInvitation;
  onAddGuest: () => void;
  onExport: () => void;
}) {
  const portalLabel =
    invitation.status === "published"
      ? "RSVP portal live"
      : "RSVP portal draft";

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
            <span aria-hidden className="text-outline-variant">
              /
            </span>
            <span className="max-w-full truncate font-serif text-[17px] font-normal tracking-normal text-on-surface normal-case sm:max-w-sm">
              {invitation.coupleLabel} · {invitation.templateName}
            </span>
            <span aria-hidden className="text-outline-variant">
              /
            </span>
            <span className="text-secondary">Guests</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-8 items-center gap-2 bg-surface-lowest px-3 text-[11px] font-medium shadow-sm">
              <span
                aria-hidden
                className={
                  invitation.status === "published"
                    ? "size-2 rounded-full bg-secondary"
                    : "size-2 rounded-full bg-outline"
                }
              />
              {portalLabel}
            </span>
            <a
              href={whatsappHref(
                `I need help managing guests for ${invitation.coupleLabel}.`,
              )}
              {...externalLinkProps}
              className="inline-flex min-h-8 items-center gap-2 bg-surface-container px-3 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:text-on-surface"
            >
              <Headphones aria-hidden size={14} className="text-secondary" />
              Atelier Concierge
            </a>
          </div>
        </div>
      </div>

      <section className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-6 px-4 pt-8 sm:px-6 lg:flex-row lg:items-end lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Couture Stationery &amp; Dispatch
          </p>
          <h1 className="max-w-[760px] font-serif text-[38px] leading-[0.98] tracking-[-0.025em] sm:text-[48px] lg:text-[56px]">
            Guest Directory &amp; Bespoke Invitations
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-on-surface-variant sm:text-[17px]">
            Curate your attendance list, organise guest circles, and dispatch
            personalised invitations with the warmth of fine stationery.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:max-w-md lg:justify-end">
          <button
            type="button"
            onClick={onExport}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.12em] uppercase shadow-sm transition-colors hover:bg-surface-container"
          >
            <Download aria-hidden size={16} />
            Export
          </button>
          <Link
            href={`/app/invitations/${invitation.id}/guests/import`}
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.12em] uppercase shadow-sm transition-colors hover:bg-surface-container"
          >
            <Upload aria-hidden size={16} />
            Import Guests
          </Link>
          <button
            type="button"
            onClick={onAddGuest}
            className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 bg-secondary px-5 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
          >
            <UserRoundPlus aria-hidden size={16} />
            Add Guest
          </button>
        </div>
      </section>
    </>
  );
}
