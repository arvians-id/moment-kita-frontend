import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import type { CustomerInvitation } from "@/types";

export function SettingsHeader({
  currentInvitation,
}: {
  currentInvitation: CustomerInvitation | null;
}) {
  return (
    <div className="flex flex-col gap-6 border-b border-surface-highest pb-8">
      <div className="flex flex-wrap items-center gap-3 bg-surface-low px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] leading-4 font-semibold tracking-[0.15em] text-on-surface-variant uppercase">
          <span>Account</span>
          <span aria-hidden className="text-on-surface-variant/50">
            /
          </span>
          <span className="text-on-surface">Settings</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        <div className="flex max-w-xl flex-col gap-1 lg:col-span-7">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Personal Account
          </span>
          <h1 className="font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
            Settings
          </h1>
          <p className="mt-1 text-[15px] leading-relaxed text-on-surface-variant">
            Manage your personal identity, sign-in credentials, and notification
            preferences across your celebrations.
          </p>
        </div>

        {currentInvitation ? (
          <div className="bg-surface-low p-5 shadow-sm lg:col-span-5">
            <div className="flex items-start gap-3.5">
              <span className="grid size-9 shrink-0 place-items-center bg-surface-container text-secondary">
                <Sparkles aria-hidden size={18} />
              </span>
              <div className="space-y-1">
                <p className="text-[14px] leading-snug font-semibold text-on-surface">
                  Looking for wedding details?
                </p>
                <p className="text-[12px] leading-5 text-on-surface-variant">
                  Guests, RSVP, wishes, and digital gift accounts are managed
                  inside the {currentInvitation.coupleLabel} workspace, not
                  here.
                </p>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <Link
                href={`/app/invitations/${currentInvitation.id}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-secondary uppercase hover:text-on-surface"
              >
                <span>Manage {currentInvitation.coupleLabel}</span>
                <ArrowRight aria-hidden size={13} />
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
