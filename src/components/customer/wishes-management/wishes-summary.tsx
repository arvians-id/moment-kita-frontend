import { EyeOff, Globe2, MessageSquareHeart, ShieldCheck } from "lucide-react";

import type { WishesSummary as WishesSummaryData } from "./wish-utils";

export function WishesSummary({
  summary,
  onPending,
}: {
  summary: WishesSummaryData;
  onPending: () => void;
}) {
  const cards = [
    {
      label: "Total Wishes",
      value: summary.total,
      note: "Guestbook submissions",
      Icon: MessageSquareHeart,
      emphasis: false,
    },
    {
      label: "Published",
      value: summary.published,
      note: "Visible on the invitation",
      Icon: Globe2,
      emphasis: false,
    },
    {
      label: "Waiting for Approval",
      value: summary.pending,
      note: "Ready for your review",
      Icon: ShieldCheck,
      emphasis: summary.pending > 0,
    },
    {
      label: "Hidden",
      value: summary.hidden,
      note: "Privately preserved",
      Icon: EyeOff,
      emphasis: false,
    },
  ];

  return (
    <section
      aria-label="Wishes summary"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
    >
      {cards.map(({ label, value, note, Icon, emphasis }) => (
        <article
          key={label}
          className={`relative min-h-36 overflow-hidden bg-surface-lowest p-4 shadow-sm sm:min-h-44 sm:p-5 ${
            emphasis ? "border-t-2 border-secondary" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-[9px] leading-4 font-semibold tracking-[0.12em] uppercase ${
                emphasis ? "text-secondary" : "text-on-surface-variant"
              }`}
            >
              {label}
            </p>
            <Icon aria-hidden size={18} className="shrink-0 text-secondary" />
          </div>
          <p
            className={`mt-5 font-serif text-[36px] leading-none sm:text-[44px] ${
              emphasis ? "text-secondary" : ""
            }`}
          >
            {value}
          </p>
          {emphasis ? (
            <button
              type="button"
              onClick={onPending}
              className="mt-3 text-left text-[10px] leading-4 font-semibold text-secondary"
            >
              Review waiting wishes
            </button>
          ) : (
            <p className="mt-3 text-[10px] leading-4 text-on-surface-variant">
              {note}
            </p>
          )}
        </article>
      ))}
    </section>
  );
}
