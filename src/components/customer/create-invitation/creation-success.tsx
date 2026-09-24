import { ArrowRight, Check, PartyPopper, PenLine, X } from "lucide-react";
import Link from "next/link";
import { publicConfig } from "@/lib/config";
import { useEscapeKey } from "@/lib/use-escape-key";

export function CreationSuccess({
  partnerOne,
  partnerTwo,
  slug,
  templateName,
  onStartEditing,
  onClose,
}: {
  partnerOne: string;
  partnerTwo: string;
  slug: string;
  templateName: string;
  onStartEditing: () => void;
  onClose: () => void;
}) {
  useEscapeKey(onClose);

  const one = partnerOne.trim().split(/\s+/)[0];
  const two = partnerTwo.trim().split(/\s+/)[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="creation-success-title"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/60 px-4 py-8 backdrop-blur-sm"
    >
      <div className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-[16px] bg-surface-lowest p-6 text-center shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close success dialog"
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-low hover:text-on-surface"
        >
          <X aria-hidden size={18} />
        </button>
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-secondary">
          <PartyPopper aria-hidden size={29} />
        </span>
        <p className="mt-4 text-[10px] leading-4 font-semibold tracking-[0.18em] text-secondary uppercase">
          Atelier draft prepared
        </p>
        <h2
          id="creation-success-title"
          className="mt-1 font-serif text-[28px] leading-9 font-semibold"
        >
          Your Celebration Draft Is Ready
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-on-surface-variant">
          <strong className="text-on-surface">
            The Wedding of {one} &amp; {two}
          </strong>{" "}
          is prepared at{" "}
          <span className="font-semibold text-secondary">
            {publicConfig.publicHost}/{slug}
          </span>{" "}
          with the {templateName} suite.
        </p>

        <div className="my-6 flex items-center justify-between gap-3 rounded-[12px] bg-surface-low p-4 text-left">
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-surface-container text-secondary">
              <PenLine aria-hidden size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-bold">
                Local draft preview
              </span>
              <span className="block text-[9px] leading-4 font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                0 quota consumed · ready to edit
              </span>
            </span>
          </span>
          <span className="hidden items-center gap-1 rounded-[6px] bg-emerald-100 px-2.5 py-1 text-[9px] font-bold tracking-[0.12em] text-emerald-800 uppercase sm:inline-flex">
            <Check aria-hidden size={12} />
            Ready
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onStartEditing}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-primary px-5 py-3 text-[11px] font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Start Editing
            <ArrowRight aria-hidden size={15} />
          </button>
          <Link
            href="/app/invitations"
            className="inline-flex min-h-11 flex-1 items-center justify-center bg-surface-container px-5 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
          >
            View My Invitations
          </Link>
        </div>
        <p className="mt-4 text-[10px] leading-4 text-on-surface-variant">
          Frontend preview only. Saving and publishing will connect to the
          customer API in a later backend phase.
        </p>
      </div>
    </div>
  );
}
