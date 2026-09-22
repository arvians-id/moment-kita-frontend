"use client";

import { Flower2, PenLine } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { TemplateSummary } from "@/types";

type PreviewStyle =
  "minimal" | "warm" | "nocturne" | "architectural" | "floral" | "illustrated";

const presentation = [
  {
    style: "minimal" as const,
    label: "Minimal · Monolith",
    mood: "Editorial",
    names: "Julian & Clara",
    venue: "Château de Courcelles",
    date: "09.18.26",
  },
  {
    style: "warm" as const,
    label: "Warm Ochre · Rustic Luxe",
    mood: "Sunlit",
    names: "Matteo & Elena",
    venue: "Villa Medicea di Lilliano",
    date: "06.21.26",
  },
  {
    style: "nocturne" as const,
    label: "Dark Mode · Haute Couture",
    mood: "Evening",
    names: "Victoria & Sean",
    venue: "The Glasshouse Manhattan",
    date: "11.08.26",
  },
  {
    style: "architectural" as const,
    label: "Architectural · Typography",
    mood: "Nordic",
    names: "Henrik + Signe",
    venue: "Louisiana Museum of Modern Art",
    date: "08.14.26",
  },
  {
    style: "floral" as const,
    label: "Delicate Floral · Botanical",
    mood: "Organic",
    names: "Amélie & Luc",
    venue: "Provence Countryside Estate",
    date: "Spring 2026",
  },
  {
    style: "illustrated" as const,
    label: "Illustrated · Fine Line Art",
    mood: "Artistic",
    names: "Kenji & Yuna",
    venue: "Gion Garden Pavilion",
    date: "10.04.26",
  },
] as const;

const extras = [
  {
    key: "ethereal-botanique",
    name: "Ethereal Botanique",
    description: "Soft botanical detail and open editorial pacing.",
    category: "Digital",
    rendererKey: "marketing-only",
    thumbnailUrl: "",
    version: 1,
  },
  {
    key: "kyoto-whisper",
    name: "Kyoto Whisper",
    description: "Fine-line illustration with quiet modern restraint.",
    category: "Digital",
    rendererKey: "marketing-only",
    thumbnailUrl: "",
    version: 1,
  },
] satisfies TemplateSummary[];

interface PreviewProps {
  style: PreviewStyle;
  names: string;
  venue: string;
  date: string;
}

function Preview({ style, names, venue, date }: PreviewProps) {
  const dark = style === "nocturne";
  const background =
    style === "warm"
      ? "bg-[#fbf6ee]"
      : style === "nocturne"
        ? "bg-[#141312] text-white"
        : style === "architectural"
          ? "bg-white items-start text-left"
          : "bg-background";
  return (
    <div
      className={`flex h-64 w-48 flex-col justify-between p-4 text-center shadow-xl transition-transform duration-300 group-hover:scale-105 ${background}`}
    >
      <span
        className={`text-[7px] font-semibold tracking-widest uppercase ${dark ? "text-champagne" : "text-secondary"}`}
      >
        {style === "illustrated" ? "Atelier Fine Line" : "The Union Of"}
      </span>
      {style === "floral" ? (
        <Flower2 aria-hidden size={20} className="mx-auto text-secondary" />
      ) : null}
      {style === "illustrated" ? (
        <span className="mx-auto grid size-8 place-items-center rounded-full bg-accent">
          <PenLine aria-hidden size={15} className="text-secondary" />
        </span>
      ) : null}
      <span
        className={`font-serif text-sm ${style === "floral" || dark ? "italic" : ""}`}
      >
        {names}
      </span>
      <span
        className={`text-[8px] ${dark ? "text-white/70" : "text-on-surface-variant"}`}
      >
        {venue}
      </span>
      <span
        className={`text-[7px] font-semibold tracking-wider uppercase ${dark ? "text-champagne" : "text-secondary"}`}
      >
        {date}
      </span>
    </div>
  );
}

export function DigitalTemplateShowcase({
  templates,
}: {
  templates: TemplateSummary[];
}) {
  const [filter, setFilter] = useState<"all" | PreviewStyle>("all");
  const cards = useMemo(
    () =>
      [...templates.slice(0, 4), ...extras]
        .slice(0, 6)
        .map((template, index) => ({ template, ...presentation[index] })),
    [templates],
  );
  const visible =
    filter === "all" ? cards : cards.filter((card) => card.style === filter);

  return (
    <section
      id="templates-grid"
      className="scroll-mt-20 bg-surface-low py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
              Gallery Showcase
            </p>
            <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
              Curated Template Collections
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Explore distinct visual directions designed around the same clear
            invitation structure.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-6">
          {(
            [
              "all",
              "minimal",
              "warm",
              "nocturne",
              "architectural",
              "floral",
              "illustrated",
            ] as const
          ).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={`whitespace-nowrap px-5 py-2.5 text-[10px] font-semibold tracking-wider uppercase transition-colors ${filter === value ? "bg-primary text-white" : "bg-white text-on-surface-variant hover:text-primary"}`}
            >
              {value === "all" ? `All Styles (${cards.length})` : value}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map(
            ({ template, style, label, mood, names, venue, date }) => (
              <article
                key={template.key}
                className="group flex flex-col justify-between bg-white shadow-sm"
              >
                <div
                  className={`flex aspect-[4/3] items-center justify-center overflow-hidden p-8 ${style === "nocturne" ? "bg-primary" : style === "warm" ? "bg-accent/20" : style === "architectural" ? "bg-surface-highest" : "bg-surface-high/40"}`}
                >
                  <Preview
                    style={style}
                    names={names}
                    venue={venue}
                    date={date}
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-semibold tracking-wider text-secondary uppercase">
                        {label}
                      </span>
                      <h3 className="font-serif text-[22px] font-semibold">
                        {template.name}
                      </h3>
                    </div>
                    <span className="text-[10px] text-on-surface-variant">
                      {mood}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href="/register"
                      className="flex-1 bg-primary py-3 text-center text-[10px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                    >
                      Use Design
                    </Link>
                    <Link
                      href={
                        template.rendererKey === "marketing-only"
                          ? "/templates"
                          : `/templates/${template.key}`
                      }
                      className="bg-surface-container px-4 py-3 text-[10px] font-semibold tracking-wider uppercase transition-colors hover:bg-surface-high"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
