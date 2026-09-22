import { Plus } from "lucide-react";

import { CreateInvitationAction } from "@/components/customer/invitations/create-invitation-action";

/**
 * Always rendered, at any quota level: drafting never consumes quota, so this
 * entry point is never gated.
 */
export function CreateInvitationCard() {
  return (
    <article className="flex flex-col items-center justify-center border-2 border-dashed border-surface-highest bg-surface-low/50 p-8 text-center transition-colors duration-300 hover:bg-surface-low">
      <span className="mb-5 grid size-16 place-items-center rounded-full border border-surface-highest bg-surface-lowest text-secondary shadow-sm">
        <Plus aria-hidden size={26} />
      </span>
      <span className="mb-1.5 text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
        Atelier studio
      </span>
      <h2 className="mb-2 font-serif text-[22px] leading-[30px] font-medium">
        Start a new celebration
      </h2>
      <p className="mb-6 max-w-sm text-[13px] leading-relaxed text-on-surface-variant">
        Choose from our curated digital and letterpress suites. Craft your
        story, schedule, and RSVP suite at your own pace without consuming
        quota.
      </p>
      <CreateInvitationAction label="Start new draft" />
    </article>
  );
}
