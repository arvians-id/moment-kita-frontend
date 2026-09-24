"use client";

import { AlertTriangle, Info, X } from "lucide-react";
import { useEffect } from "react";

import { idrFormat } from "@/components/admin/packages/packages-quota-formatters";
import type { AdminPackageListItem } from "@/types";

export function PackageActionDialog({
  pkg,
  onClose,
  onConfirm,
}: {
  pkg: AdminPackageListItem;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const nextState = pkg.active ? "Disable" : "Enable";

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-action-title"
        className="relative my-auto w-full max-w-lg bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Availability confirmation
            </p>
            <h2
              id="package-action-title"
              className="mt-1 font-serif text-[26px] leading-8"
            >
              {nextState} Package
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close availability confirmation"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="bg-surface-low p-4">
            <p className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Package
            </p>
            <p className="mt-1 font-serif text-[20px]">{pkg.name}</p>
            <p className="mt-1 text-[10px] text-on-surface-variant">
              {idrFormat.format(pkg.price)} · +{pkg.invitationQuota} invitation
              quota · {pkg.activeDurationDays} days
            </p>
          </div>
          <p className="text-[12px] leading-6 text-on-surface-variant">
            {pkg.active
              ? "Disabling removes this package from selection for new purchases. Existing customers on this package, and their historical entitlement snapshots, remain unchanged."
              : "Enabling makes this package available for new purchases again."}
          </p>
          <div className="flex gap-3 bg-accent p-4 text-accent-foreground">
            <AlertTriangle aria-hidden size={17} className="mt-0.5 shrink-0" />
            <p className="text-[11px] leading-5">
              This never rewrites a finalized invitation&apos;s existing
              entitlement snapshot — only new purchases are affected.
            </p>
          </div>
          <div className="flex gap-3 border border-border p-4 text-on-surface-variant">
            <Info aria-hidden size={17} className="mt-0.5 shrink-0 text-secondary" />
            <p className="text-[10px] leading-5">
              This mock registry updates locally for interface verification.
              Backend persistence is intentionally deferred.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase transition-colors hover:bg-surface-container"
          >
            Keep Current State
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Confirm {nextState}
          </button>
        </div>
      </section>
    </div>
  );
}
