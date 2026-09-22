import type { LucideIcon } from "lucide-react";
import { BookOpen, MailOpen, Palette, PenTool, Sparkles } from "lucide-react";

import { Container } from "@/components/shared/container";

interface CustomizationDimension {
  icon: LucideIcon;
  kicker: string;
  title: string;
  text?: string;
  tones?: readonly string[];
}

const dimensions: readonly CustomizationDimension[] = [
  {
    icon: PenTool,
    kicker: "01 · Typography & Monogram Crests",
    title: "Custom Intertwining Monograms",
    text: "Tailored calligraphy, archival Venetian serif typography, and bespoke family crests drawn by hand before digital vectorization and brass die cutting.",
  },
  {
    icon: Palette,
    kicker: "02 · Paper Substrates & Tonalities",
    title: "Pulp Tones & Weight Configurations",
    tones: [
      "Pure Alabaster",
      "Warm Terracotta",
      "Muted Sage",
      "Raw Stone",
      "Midnight Charcoal",
    ],
  },
  {
    icon: Sparkles,
    kicker: "03 · Print & Edge Finishes",
    title: "Artisan Press Methods",
    text: "Letterpress debossing with custom Pantone inks, heated metallic foil in 8 shades, blind deboss, and hand-beveled gilded edges in 24k gold leaf.",
  },
  {
    icon: MailOpen,
    kicker: "04 · Envelope & Enclosure Architecture",
    title: "Hand-Addressed Calligraphy & Liners",
    text: "Euro-point flaps, deckle flap edges, printed guest addressing in archival ink, and custom-illustrated venue liners printed on Italian parchment.",
  },
  {
    icon: BookOpen,
    kicker: "05 · Day-Of Harmonization",
    title: "Full Celebration Stationary Suites",
    text: "Flawless continuity extending to Vow Books, Ceremony Programs, Die-cut Menus, Escort Cards, and Thank You stationery sets.",
  },
];

export function CustomizationMatrix() {
  return (
    <section className="w-full bg-surface-low py-12">
      <Container>
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          <div className="flex flex-col gap-2 lg:col-span-5">
            <p className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Tailored to Your Celebration
            </p>
            <h2 className="font-serif text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] md:tracking-[-0.015em]">
              The Atelier Customization Matrix
            </h2>
            <p className="text-[15px] leading-6 text-on-surface-variant">
              Every element is modular and completely bespoke. Review the five
              core dimensions of customization, then configure your preferences
              during your 1-on-1 WhatsApp session.
            </p>
            <div className="pt-4">
              <div className="rounded-[8px] bg-surface-lowest p-5 shadow-sm">
                <p className="mb-2 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase">
                  Live Concierge Note
                </p>
                <blockquote className="text-[13px] leading-5 text-on-surface-variant">
                  &ldquo;We provide full digital proofing within 48 hours of
                  your consultation. You can mix and match finishes across main
                  invites, details cards, and menus without compromise.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-serif text-xs font-semibold text-primary-foreground">
                    MK
                  </span>
                  <div>
                    <p className="text-xs font-semibold">Margaux de la Tour</p>
                    <p className="text-[11px] text-on-surface-variant">
                      Head of Letterpress, Studio Atelier
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-7">
            {dimensions.map(({ icon: Icon, kicker, title, text, tones }) => (
              <article
                key={kicker}
                className="rounded-[8px] bg-surface-lowest p-6 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                    {kicker}
                  </span>
                  <Icon
                    aria-hidden
                    size={18}
                    className="shrink-0 text-secondary"
                  />
                </div>
                <h3 className="mb-2 font-serif text-xl leading-7">{title}</h3>
                {text ? (
                  <p className="text-[13px] leading-5 text-on-surface-variant">
                    {text}
                  </p>
                ) : null}
                {tones ? (
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {tones.map((tone) => (
                      <li
                        key={tone}
                        className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold"
                      >
                        {tone}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
