import { Plus } from "lucide-react";
import Link from "next/link";

import { createInvitationRoute } from "@/config/customer-navigation";
import { cn } from "@/lib/utils";

/**
 * The single Create Invitation entry point.
 *
 * Never gated by quota — drafting does not consume quota, so this stays
 * available at every quota level, including zero. It only reflects whether the
 * destination flow has been built yet.
 */
export function CreateInvitationAction({
  label = "Create Invitation",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const content = (
    <>
      <Plus aria-hidden size={17} />
      <span>{label}</span>
      {!createInvitationRoute.available ? (
        <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] uppercase">
          Soon
        </span>
      ) : null}
    </>
  );

  const base = cn(
    "inline-flex h-10 items-center gap-2 bg-primary px-5 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase shadow-sm transition-colors",
    className,
  );

  if (!createInvitationRoute.available) {
    return (
      <span aria-disabled="true" className={cn(base, "cursor-not-allowed")}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={createInvitationRoute.href}
      className={cn(base, "hover:bg-secondary")}
    >
      {content}
    </Link>
  );
}
