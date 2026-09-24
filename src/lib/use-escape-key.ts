import { useEffect } from "react";

/**
 * Calls `onEscape` when Escape is pressed while it is non-null. Hand-rolled
 * modal dialogs use this so keyboard users can always dismiss them; pass
 * `null` while the dialog is closed.
 */
export function useEscapeKey(onEscape: (() => void) | null) {
  useEffect(() => {
    if (!onEscape) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onEscape?.();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape]);
}
