import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

export type ProcessStep = {
  number: string;
  badge: string;
  phase: string;
  title: string;
  description: ReactNode;
  image?: { src: string; alt: string };
  detail?: string;
  detailEnd?: string;
  icons?: readonly LucideIcon[];
  featured?: boolean;
};

export function ProcessStepCard({ step }: { step: ProcessStep }) {
  if (step.featured) {
    return (
      <article className="flex min-h-[260px] flex-col justify-between gap-8 bg-surface-lowest p-7 shadow-[0_8px_30px_rgba(28,28,24,0.035)] md:col-span-2 md:p-8 lg:col-span-3 lg:flex-row lg:items-center lg:p-10">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-4">
            <span className="font-serif text-3xl text-primary">
              {step.number}
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-[9px] font-semibold tracking-[0.16em] text-accent-foreground uppercase">
              {step.badge}
            </span>
            <span className="text-[10px] font-semibold tracking-[0.15em] text-secondary uppercase">
              Step {step.number} — {step.phase}
            </span>
          </div>
          <h3 className="font-serif text-3xl leading-tight text-primary">
            {step.title}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-on-surface-variant">
            {step.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-5 self-end lg:self-auto">
          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
              {step.detail}
            </p>
            <p className="mt-1 text-xs text-on-surface-variant">
              {step.detailEnd}
            </p>
          </div>
          {step.icons?.map((Icon, index) => (
            <span
              key={`${step.title}-${index}`}
              className="grid size-12 place-items-center rounded-full bg-secondary text-white"
            >
              <Icon aria-hidden size={19} />
            </span>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="group flex min-h-[390px] flex-col justify-between bg-surface-lowest p-7 shadow-[0_8px_30px_rgba(28,28,24,0.035)] transition-shadow hover:shadow-[0_16px_36px_rgba(28,28,24,0.07)] lg:p-8">
      <div>
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="font-serif text-3xl text-primary">
            {step.number}
          </span>
          <span className="rounded-full bg-surface-container px-3 py-1 text-[9px] font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
            {step.badge}
          </span>
        </div>
        <p className="text-[10px] font-semibold tracking-[0.15em] text-secondary uppercase">
          Step {step.number} — {step.phase}
        </p>
        <h3 className="mt-2 font-serif text-[22px] leading-[1.35] text-primary">
          {step.title}
        </h3>
        <p className="mt-3 text-[13px] leading-6 text-on-surface-variant">
          {step.description}
        </p>
      </div>
      {step.image ? (
        <div className="relative mt-6 h-36 overflow-hidden bg-surface-low">
          <Image
            src={step.image.src}
            alt={step.image.alt}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>
      ) : step.icons ? (
        <div className="mt-6 flex items-center gap-3 text-on-surface-variant">
          {step.icons.map((Icon, index) => (
            <Icon aria-hidden key={`${step.title}-${index}`} size={18} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex min-h-11 items-center justify-between gap-4 rounded-sm bg-surface-low px-4 py-3">
          <span className="text-[11px] leading-4 text-on-surface-variant">
            {step.detail}
          </span>
          {step.detailEnd ? (
            <span className="shrink-0 text-[10px] font-semibold tracking-[0.08em] text-secondary uppercase">
              {step.detailEnd}
            </span>
          ) : null}
        </div>
      )}
    </article>
  );
}
