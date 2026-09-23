import type { TemplateUsageEntry } from "@/types";

export function TemplateUsageList({
  templates,
}: {
  templates: TemplateUsageEntry[];
}) {
  const max = Math.max(...templates.map((template) => template.suiteCount), 1);

  return (
    <section className="flex h-full flex-col gap-5 border border-border bg-surface-lowest p-5 sm:p-6">
      <div className="flex flex-col">
        <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
          Templates
        </span>
        <h2 className="font-serif text-[20px] leading-7 font-semibold">
          Top Design Architectures
        </h2>
      </div>

      <ol className="flex flex-col gap-3">
        {templates.map((template, index) => {
          const percent = Math.round((template.suiteCount / max) * 100);
          return (
            <li key={template.templateName} className="flex items-center gap-3">
              <span className="w-5 shrink-0 text-[11px] font-semibold text-on-surface-variant">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2 text-[12px] leading-5">
                  <span className="truncate font-medium">
                    {template.templateName}
                  </span>
                  <span className="shrink-0 text-on-surface-variant">
                    {template.suiteCount} suites
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden bg-surface-container">
                  <div
                    className="h-full bg-secondary"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
