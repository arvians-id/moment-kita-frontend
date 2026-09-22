import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function EditorialHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: EditorialHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
        {kicker}
      </p>
      <h2 className="mt-2 font-serif text-[2rem] leading-[1.15] tracking-[-0.02em] text-primary sm:text-[2.5rem] sm:leading-[1.2]">
        {title}
      </h2>
      {description ? (
        <div className="mt-4 text-sm leading-6 text-on-surface-variant">
          {description}
        </div>
      ) : null}
    </div>
  );
}
