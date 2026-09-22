import { BookOpen } from "lucide-react";
import Link from "next/link";

import { CreateInvitationAction } from "@/components/customer/invitations/create-invitation-action";

export function InvitationsHeader() {
  return (
    <section className="flex flex-col justify-between gap-6 border-b border-surface-highest pb-8 md:flex-row md:items-end">
      <div className="flex max-w-2xl flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-secondary" />
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Digital Stationery Atelier
          </span>
        </div>
        <h1 className="font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
          My Invitations
        </h1>
        <p className="mt-1.5 text-[15px] leading-relaxed text-on-surface-variant">
          Create and manage your wedding celebrations, digital stationery
          suites, and guest experiences in one place.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <Link
          href="/templates"
          className="inline-flex h-10 items-center gap-2 border border-surface-highest bg-surface-low px-4 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
        >
          <BookOpen aria-hidden size={16} className="text-secondary" />
          <span>Explore Templates</span>
        </Link>
        <CreateInvitationAction />
      </div>
    </section>
  );
}
