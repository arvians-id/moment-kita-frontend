"use client";

import { Code2, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export function RegisterTemplateDialog({
  open,
  onClose,
  onRegistered,
}: {
  open: boolean;
  onClose: () => void;
  onRegistered: (message: string) => void;
}) {
  const [templateKey, setTemplateKey] = useState("");
  const [version, setVersion] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;

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
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-template-title"
        className="relative my-auto w-full max-w-xl bg-surface-lowest p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-secondary uppercase">
              Developer registry handoff
            </p>
            <h2
              id="register-template-title"
              className="mt-1 font-serif text-[26px] leading-8"
            >
              Register Template Version
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close version registration"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <div className="mt-5 flex gap-3 border border-border bg-surface-low p-4 text-on-surface-variant">
          <Code2
            aria-hidden
            size={18}
            className="mt-0.5 shrink-0 text-secondary"
          />
          <p className="text-[10px] leading-5">
            Template implementation and deployment stay developer-controlled.
            This form records a handoff for an already released renderer; it
            does not upload source code or edit JSON.
          </p>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onRegistered(
              `${templateKey} ${version} registration staged for developer review.`,
            );
            setTemplateKey("");
            setVersion("");
            setNotes("");
            onClose();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
              Template Key
              <input
                required
                value={templateKey}
                onChange={(event) => setTemplateKey(event.target.value)}
                placeholder="e.g. aura-blanche"
                className="h-11 w-full border border-border bg-surface-lowest px-3 text-[12px] font-normal tracking-normal normal-case outline-none focus:border-secondary"
              />
            </label>
            <label className="space-y-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
              Version
              <input
                required
                value={version}
                onChange={(event) => setVersion(event.target.value)}
                placeholder="e.g. v1.1"
                className="h-11 w-full border border-border bg-surface-lowest px-3 text-[12px] font-normal tracking-normal normal-case outline-none focus:border-secondary"
              />
            </label>
          </div>
          <label className="block space-y-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
            Release Notes{" "}
            <span className="font-normal normal-case">(optional)</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Describe the developer-approved release..."
              className="w-full resize-none border border-border bg-surface-lowest px-3 py-2.5 text-[12px] font-normal tracking-normal normal-case outline-none focus:border-secondary"
            />
          </label>
          <div className="flex gap-3 bg-accent p-4 text-accent-foreground">
            <Info aria-hidden size={17} className="mt-0.5 shrink-0" />
            <p className="text-[10px] leading-5">
              Submission is a frontend-only preview and does not create or
              publish a template version.
            </p>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 px-5 text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-11 bg-primary px-6 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground uppercase hover:bg-secondary"
            >
              Stage Registration
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
