import { Heart } from "lucide-react";
import Image from "next/image";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";

const stories = [
  {
    couple: "Alya & Raka",
    place: "Ubud, Bali",
    suite: "Harmonized Suite",
    image: "/images/marketing/sunlit-stationery-table.png",
    quote:
      "The digital suite made every guest detail feel effortless, while our closest family received paper keepsakes we will hold onto for years.",
  },
  {
    couple: "Nadia & Bima",
    place: "Bandung, West Java",
    suite: "Fine Print Atelier",
    image: "/images/marketing/garden-stationery-suite.png",
    quote:
      "The paper, typography, and warm finishing felt deeply personal—more like opening a treasured object than receiving an announcement.",
  },
  {
    couple: "Maya & Devon",
    place: "Jakarta",
    suite: "Interactive Digital Suite",
    image: "/images/marketing/hero-stationery-suite.png",
    quote:
      "Sharing one considered link kept our celebration clear for everyone without losing the feeling and ceremony we wanted.",
  },
] as const;

export function StoryGrid() {
  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <Container>
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <EditorialHeading
            kicker="05 — Curated celebrations"
            title="Couples of Moment Kita"
          />
          <p className="text-xs text-on-surface-variant">
            Stories shaped across paper, pixel, and place
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.couple}
              className="flex flex-col overflow-hidden bg-surface-lowest shadow-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={story.image}
                  alt={`Wedding stationery created for ${story.couple}.`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-white/90 px-3 py-1.5 text-[9px] font-semibold tracking-[0.13em] uppercase backdrop-blur">
                  {story.place}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                <blockquote className="font-serif text-xl leading-8 italic">
                  “{story.quote}”
                </blockquote>
                <div className="mt-7 flex items-center justify-between border-t border-border pt-5 text-xs">
                  <div>
                    <p className="font-semibold">{story.couple}</p>
                    <p className="mt-1 text-[10px] text-on-surface-variant">
                      {story.suite}
                    </p>
                  </div>
                  <Heart
                    aria-hidden="true"
                    size={17}
                    className="text-secondary"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
