"use client";

import { ArrowRight, Eye, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Container } from "@/components/shared/container";
import type { TemplateSummary } from "@/types";

type Filter = "All" | "Digital" | "Printed";

const filters: Filter[] = ["All", "Digital", "Printed"];

export function TemplateGallery({
  templates,
}: {
  templates: TemplateSummary[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateSummary | null>(null);

  const visibleTemplates = useMemo(
    () =>
      templates.filter(
        (template) => filter === "All" || template.category === filter,
      ),
    [filter, templates],
  );

  useEffect(() => {
    if (!selectedTemplate) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTemplate(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedTemplate]);

  return (
    <section className="py-20 lg:py-28" id="templates-gallery">
      <Container>
        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <EditorialHeading
            kicker="02 — Curated archives"
            title="Aesthetic Signatures"
          />
          <div
            className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-surface-container p-1.5"
            aria-label="Filter templates"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-full px-5 py-2 text-[9px] font-semibold tracking-[0.13em] uppercase transition-colors ${
                  filter === item
                    ? "bg-primary text-primary-foreground"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {item === "All" ? "All curations" : item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleTemplates.map((template) => (
            <article
              key={template.rendererKey}
              className="group flex flex-col overflow-hidden bg-surface-lowest shadow-sm"
            >
              <div className="relative h-80 overflow-hidden bg-surface-container">
                <Image
                  src={template.thumbnailUrl}
                  alt={`${template.name} wedding invitation design.`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute right-3 top-3 bg-white/90 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-secondary uppercase backdrop-blur">
                  {template.category === "Digital"
                    ? "Digital suite"
                    : "Artisan print"}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
                    Signature{" "}
                    {String(
                      templates.findIndex(
                        (item) => item.rendererKey === template.rendererKey,
                      ) + 1,
                    ).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-serif text-xl">{template.name}</h3>
                  <p className="mt-3 text-xs leading-5 text-on-surface-variant">
                    {template.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.08em] uppercase">
                    {template.category === "Digital"
                      ? "From Rp299K"
                      : "Made to order"}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase hover:text-primary"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    Preview <Eye aria-hidden="true" size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 border-b border-primary pb-1 text-[10px] font-semibold tracking-[0.13em] uppercase"
          >
            Explore the full collection{" "}
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </div>
      </Container>

      {selectedTemplate ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedTemplate(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-preview-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-surface-lowest shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 bg-surface-container p-5 sm:p-6">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.18em] text-secondary uppercase">
                  Invitation preview
                </p>
                <h2
                  id="template-preview-title"
                  className="mt-1 font-serif text-2xl"
                >
                  {selectedTemplate.name}
                </h2>
              </div>
              <button
                type="button"
                autoFocus
                aria-label="Close preview"
                className="grid size-10 place-items-center hover:bg-surface-high"
                onClick={() => setSelectedTemplate(null)}
              >
                <X aria-hidden="true" size={19} />
              </button>
            </div>
            <div className="grid gap-8 p-6 sm:grid-cols-[1.05fr_0.95fr] sm:p-10">
              <div className="relative min-h-80 overflow-hidden bg-surface-container sm:min-h-[430px]">
                <Image
                  src={selectedTemplate.thumbnailUrl}
                  alt={`${selectedTemplate.name} enlarged invitation preview.`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
                  {selectedTemplate.category} · {selectedTemplate.rendererKey}
                </p>
                <h3 className="mt-4 font-serif text-4xl leading-tight">
                  A quiet first chapter for your celebration.
                </h3>
                <p className="mt-5 text-sm leading-6 text-on-surface-variant">
                  {selectedTemplate.description}
                </p>
                <Link
                  href={`/templates/${selectedTemplate.key}`}
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 text-[10px] font-semibold tracking-[0.14em] text-primary-foreground uppercase hover:bg-secondary"
                >
                  View template details{" "}
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
