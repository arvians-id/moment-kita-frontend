"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { RegisterTemplateDialog } from "@/components/admin/templates/register-template-dialog";

/**
 * Reuses the same registration dialog the Template List uses — a developer
 * handoff record, not a source-code or manifest editor — so Templates has
 * one register-version flow, not a page-specific copy of it.
 */
export function RegisterVersionAction() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-4 text-[9px] font-semibold tracking-[0.11em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
        >
          <Plus aria-hidden size={14} /> Register Template Version
        </button>
        {notice ? (
          <p className="max-w-xs text-right text-[9px] leading-4 text-on-surface-variant">
            {notice}
          </p>
        ) : null}
      </div>
      <RegisterTemplateDialog
        open={open}
        onClose={() => setOpen(false)}
        onRegistered={setNotice}
      />
    </>
  );
}
