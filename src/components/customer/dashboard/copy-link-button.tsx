"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyLinkButton({
  value,
  /** Icon-only rendering for tight rows such as invitation cards. */
  compact = false,
}: {
  value: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked; leave the label unchanged.
    }
  }

  const icon = copied ? (
    <Check aria-hidden size={compact ? 15 : 13} className="text-secondary" />
  ) : (
    <Copy aria-hidden size={compact ? 15 : 13} />
  );

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? "Copied" : "Copy invitation link"}
        aria-label={copied ? "Copied" : "Copy invitation link"}
        className="shrink-0 p-1 text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      >
        {icon}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-[6px] bg-surface px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      {icon}
      <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
}
