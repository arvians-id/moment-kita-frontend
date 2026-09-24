"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

export function TransactionNotesPanel({
  note,
  onSave,
}: {
  note: string | null;
  onSave: (note: string) => void;
}) {
  const [draft, setDraft] = useState(note ?? "");

  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Lock aria-hidden size={13} className="text-secondary" />
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          Internal Note
        </p>
      </div>
      <p className="mt-1 text-[10px] leading-4 text-on-surface-variant">
        Visible to Admins only. Never shown to the customer.
      </p>

      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={3}
        placeholder="Add a note for other Admins..."
        className="mt-3 w-full resize-none border border-border bg-surface-low px-3 py-2.5 text-[12px] outline-none focus:border-secondary"
      />
      <button
        type="button"
        onClick={() => onSave(draft.trim())}
        disabled={draft.trim() === (note ?? "")}
        className="mt-3 inline-flex min-h-9 items-center justify-center bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] uppercase transition-colors enabled:hover:bg-surface-high disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save Note
      </button>
    </section>
  );
}
