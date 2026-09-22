import { CalendarClock, Download, Headset, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { externalLinkProps, whatsappHref } from "@/lib/whatsapp";

interface QuickAction {
  label: string;
  hint: string;
  icon: LucideIcon;
}

const actions: QuickAction[] = [
  { label: "Edit Itinerary", hint: "Times & venues", icon: CalendarClock },
  { label: "Add Guests", hint: "Manual & CSV import", icon: UserPlus },
  { label: "Export Guest List", hint: "PDF & spreadsheet", icon: Download },
];

const tileClass =
  "flex items-center gap-3 rounded-[8px] p-3.5 text-left transition-colors";

export function QuickActions() {
  return (
    <section className="flex flex-col gap-4 rounded-[12px] bg-surface-lowest p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
          Quick actions
        </span>
        <span className="text-[11px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
          Shortcuts
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map(({ label, hint, icon: Icon }) => (
          <span
            key={label}
            aria-disabled="true"
            className={`${tileClass} cursor-not-allowed bg-surface-container`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-lowest">
              <Icon aria-hidden size={18} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] leading-5 font-semibold">
                {label}
              </span>
              <span className="truncate text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                {hint}
              </span>
            </span>
          </span>
        ))}

        <a
          href={whatsappHref(
            "Hello Moment Kita, I would like help with my invitation.",
          )}
          {...externalLinkProps}
          className={`${tileClass} bg-secondary/10 hover:bg-secondary/20`}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <Headset aria-hidden size={18} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] leading-5 font-semibold text-secondary">
              Concierge Support
            </span>
            <span className="truncate text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              Direct WhatsApp
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
