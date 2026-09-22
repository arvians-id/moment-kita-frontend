import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";
import type { EntitlementSummary } from "@/types";

export function CreateInvitationHeader({
  entitlement,
}: {
  entitlement: EntitlementSummary;
}) {
  const hasQuota = entitlement.quotaRemaining > 0;

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-3 border-b border-surface-highest bg-surface-low px-4 py-3 sm:flex-row sm:items-center sm:px-5">
        <div className="flex min-w-0 items-center gap-2 text-[11px] leading-4 font-semibold tracking-[0.12em] uppercase">
          <Link
            href="/app/invitations"
            className="inline-flex shrink-0 items-center gap-1.5 text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <ArrowLeft aria-hidden size={15} />
            My Invitations
          </Link>
          <span aria-hidden className="text-on-surface-variant/40">
            /
          </span>
          <span className="truncate">Create New Invitation Draft</span>
        </div>

        <a
          href={whatsappHref(
            "Hi Moment Kita, I would like help creating my wedding invitation draft.",
          )}
          {...externalLinkProps}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
        >
          <MessageCircle aria-hidden size={14} />
          WhatsApp Concierge
        </a>
      </div>

      <section className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-2 flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Step-by-step atelier suite
            </span>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] leading-4 font-semibold tracking-[0.12em] text-accent-foreground uppercase">
              Draft mode
            </span>
          </div>
          <h1 className="font-serif text-[34px] leading-[1.08] font-medium tracking-[-0.02em] sm:text-[40px]">
            Craft Your Celebration
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-on-surface-variant sm:text-[15px]">
            Choose a design you adore, enter your names, and set your unique
            URL. Photography, music, schedules, stories, and guest RSVPs can be
            personalized later in the Studio Editor.
          </p>
        </div>

        <div className="flex max-w-md items-start gap-3 rounded-[12px] bg-surface-lowest p-4 shadow-sm">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-secondary">
            <Sparkles aria-hidden size={17} />
          </span>
          <div>
            <p className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
              Zero commitment quota guarantee
            </p>
            <p className="mt-1 text-[12px] leading-5 text-on-surface-variant">
              Drafts are free to create and edit.{" "}
              {hasQuota
                ? "Your " +
                  entitlement.quotaRemaining +
                  " remaining quota is only committed when you finalize."
                : "You currently have no launch quota, but can still build this draft. Quota is only required when finalizing."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
