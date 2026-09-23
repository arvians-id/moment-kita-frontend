import type { ReactNode } from "react";

/**
 * Shared header for every Admin page: kicker + title + description + a
 * primary-actions row. Reuse this instead of hand-rolling a page-specific
 * header so future Admin pages stay visually consistent.
 */
export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div className="flex flex-col gap-2">
        {eyebrow ? (
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="font-serif text-[28px] leading-[34px] tracking-tight md:text-[36px] md:leading-[42px]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-[14px] leading-6 text-on-surface-variant">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
