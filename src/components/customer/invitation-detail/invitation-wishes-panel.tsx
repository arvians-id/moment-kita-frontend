import { ArrowRight, Heart, Quote } from "lucide-react";
import Link from "next/link";

import type { InvitationWish } from "@/types";

export function InvitationWishesPanel({
  invitationId,
  wishes,
  totalWishes,
}: {
  invitationId: string;
  wishes: InvitationWish[];
  totalWishes: number;
}) {
  return (
    <section className="flex flex-col gap-5 bg-surface-lowest p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Archival guestbook
          </span>
          <h2 className="font-serif text-[22px] leading-[30px] font-semibold">
            Recent wishes &amp; blessings
          </h2>
        </div>
        {totalWishes > 0 ? (
          <Link
            href={`/app/invitations/${invitationId}/wishes`}
            className="flex items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase transition-colors hover:text-on-surface"
          >
            <span>Moderate all {totalWishes} wishes</span>
            <ArrowRight aria-hidden size={14} />
          </Link>
        ) : null}
      </div>

      {wishes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {wishes.map((wish) => (
            <figure
              key={wish.id}
              className="relative flex flex-col justify-between gap-4 bg-surface-low p-5"
            >
              <Quote
                aria-hidden
                size={28}
                className="absolute top-3 right-3 text-secondary/30"
              />
              <blockquote className="font-serif text-[17px] leading-relaxed italic">
                &ldquo;{wish.message}&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-between gap-3 pt-2">
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[13px] leading-5 font-medium">
                    {wish.author}
                  </span>
                  <span className="truncate text-[10px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                    {wish.relation} • {wish.occurredAt}
                  </span>
                </span>
                <Heart
                  aria-hidden
                  size={17}
                  className="shrink-0 text-secondary"
                />
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="bg-surface-low p-4 text-[13px] leading-relaxed text-on-surface-variant">
          Guest blessings appear here as they arrive through the published
          invitation.
        </p>
      )}
    </section>
  );
}
