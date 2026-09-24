import { ArrowRight, Flower2, MailOpen } from "lucide-react";

import { TimeGreeting } from "@/components/shared/time-greeting";
import type { CustomerAlert } from "@/types";

export function DashboardWelcome({
  customerName,
  weddingLabel,
  alert,
}: {
  customerName: string;
  weddingLabel: string | null;
  alert: CustomerAlert | null;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Client Suite
            </span>
            {weddingLabel ? (
              <>
                <span aria-hidden className="text-on-surface-variant/50">
                  •
                </span>
                <span className="text-[11px] leading-4 font-medium tracking-[0.12em] text-on-surface-variant uppercase">
                  {weddingLabel}
                </span>
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-[28px] leading-[34px] tracking-tight md:text-[40px] md:leading-[48px]">
              <TimeGreeting />,{" "}
              <span className="italic">{customerName}</span>
            </h1>
            <Flower2
              aria-hidden
              size={24}
              className="shrink-0 text-secondary"
            />
          </div>
          <p className="max-w-2xl text-[15px] leading-6 text-on-surface-variant">
            Everything for your celebration, gently organised in one place. Your
            guests are being welcomed as you read this.
          </p>
        </div>
      </div>

      {alert ? (
        <div className="flex flex-col justify-between gap-4 rounded-[12px] bg-surface-high p-4 shadow-[0_2px_12px_rgba(46,38,33,0.04)] md:flex-row md:items-center lg:p-5">
          <div className="flex items-start gap-3.5 md:items-center">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-secondary/15 text-secondary md:mt-0">
              <MailOpen aria-hidden size={19} />
            </span>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] leading-4 font-bold tracking-[0.12em] text-secondary uppercase">
                  {alert.label}
                </span>
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-on-surface-variant/40"
                />
                <span className="text-[13px] leading-5 font-semibold">
                  {alert.headline}
                </span>
              </div>
              <p className="mt-0.5 text-[13px] leading-5 text-on-surface-variant">
                {alert.description}
              </p>
            </div>
          </div>
          <a
            href={alert.actionHref}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start bg-primary px-4 py-2.5 text-[11px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary md:self-auto"
          >
            <span>{alert.actionLabel}</span>
            <ArrowRight aria-hidden size={14} />
          </a>
        </div>
      ) : null}
    </section>
  );
}
