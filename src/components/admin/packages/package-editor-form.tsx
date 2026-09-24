import { Info } from "lucide-react";

import type { PackageFormValues } from "@/types";

const fieldClass =
  "min-h-11 w-full border border-transparent bg-surface-low px-3 text-[13px] outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary";
const labelClass =
  "text-[10px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase";
const errorClass = "text-[10px] text-red-700";

export type PackageFormErrors = Partial<Record<keyof PackageFormValues, string>>;

export function PackageEditorForm({
  values,
  errors,
  isEdit,
  onChange,
}: {
  values: PackageFormValues;
  errors: PackageFormErrors;
  isEdit: boolean;
  onChange: (patch: Partial<PackageFormValues>) => void;
}) {
  return (
    <div className="space-y-6">
      <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          Section 01
        </p>
        <h2 className="mt-1 font-serif text-[22px]">Basic Information</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 sm:col-span-2">
            <span className={labelClass}>
              Package Name <span aria-hidden>*</span>
            </span>
            <input
              type="text"
              value={values.name}
              onChange={(event) => onChange({ name: event.target.value })}
              placeholder="e.g. Signature"
              className={fieldClass}
            />
            {errors.name ? <p className={errorClass}>{errors.name}</p> : null}
          </label>

          <label className="space-y-1.5 sm:col-span-2">
            <span className={labelClass}>
              Short Description <span aria-hidden>*</span>
            </span>
            <textarea
              rows={2}
              value={values.description}
              onChange={(event) => onChange({ description: event.target.value })}
              placeholder="A one-line summary shown on the public pricing page and Admin catalog."
              className="w-full resize-none border border-transparent bg-surface-low px-3 py-2.5 text-[13px] leading-6 outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary"
            />
            {errors.description ? (
              <p className={errorClass}>{errors.description}</p>
            ) : null}
          </label>

          <div className="space-y-1.5">
            <span className={labelClass}>Status</span>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Package status">
              {(["active", "inactive"] as const).map((option) => {
                const isActiveOption = option === "active";
                const selected = values.active === isActiveOption;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onChange({ active: isActiveOption })}
                    className={`min-h-11 text-[10px] font-semibold tracking-[0.1em] uppercase ${
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {isActiveOption ? "Active" : "Inactive"}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] leading-4 text-on-surface-variant">
              Inactive packages are hidden from new selection; existing
              purchases are unaffected.
            </p>
          </div>

          <label className="flex items-start gap-2.5 self-start bg-surface-low p-3.5">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(event) => onChange({ featured: event.target.checked })}
              className="mt-0.5 size-4 shrink-0 accent-secondary"
            />
            <span>
              <span className="block text-[12px] font-semibold">
                Featured / Recommended
              </span>
              <span className="mt-0.5 block text-[10px] leading-4 text-on-surface-variant">
                Promotional prominence only — separate from Active status.
              </span>
            </span>
          </label>
        </div>
      </section>

      <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          Section 02
        </p>
        <h2 className="mt-1 font-serif text-[22px]">Pricing</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className={labelClass}>
              Price <span aria-hidden>*</span>
            </span>
            <div className="flex items-center gap-2 bg-surface-low px-3">
              <span className="text-[12px] text-on-surface-variant">Rp</span>
              <input
                type="number"
                min={0}
                step={1000}
                value={values.price}
                onChange={(event) => onChange({ price: Number(event.target.value) })}
                className="min-h-11 w-full bg-transparent text-[13px] outline-none"
              />
            </div>
            {errors.price ? <p className={errorClass}>{errors.price}</p> : null}
          </label>
          <div className="space-y-1.5">
            <span className={labelClass}>Currency</span>
            <div className="flex min-h-11 items-center bg-surface-container px-3 text-[13px] text-on-surface-variant">
              IDR — Indonesian Rupiah
            </div>
          </div>
        </div>
      </section>

      <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
          Section 03
        </p>
        <h2 className="mt-1 font-serif text-[22px]">Invitation Quota & Active Duration</h2>
        <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
          This is the amount granted by one purchase of this package — never
          a specific customer&apos;s current remaining quota. Active duration
          starts on first publish, never at purchase, draft creation, or
          finalize.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className={labelClass}>
              Invitation Quota <span aria-hidden>*</span>
            </span>
            <input
              type="number"
              min={1}
              value={values.invitationQuota}
              onChange={(event) =>
                onChange({ invitationQuota: Number(event.target.value) })
              }
              className={fieldClass}
            />
            {errors.invitationQuota ? (
              <p className={errorClass}>{errors.invitationQuota}</p>
            ) : null}
          </label>
          <label className="space-y-1.5">
            <span className={labelClass}>
              Active Duration (Days) <span aria-hidden>*</span>
            </span>
            <input
              type="number"
              min={1}
              value={values.activeDurationDays}
              onChange={(event) =>
                onChange({ activeDurationDays: Number(event.target.value) })
              }
              className={fieldClass}
            />
            {errors.activeDurationDays ? (
              <p className={errorClass}>{errors.activeDurationDays}</p>
            ) : null}
          </label>
        </div>
      </section>

      {isEdit ? (
        <div className="flex gap-3 border border-border bg-surface-low p-4 text-on-surface-variant">
          <Info aria-hidden size={17} className="mt-0.5 shrink-0 text-secondary" />
          <p className="text-[11px] leading-5">
            Changes to price, invitation quota, active duration, and template
            access apply to future purchases and finalizations only.
            Invitations that already have an entitlement snapshot keep their
            original terms — editing this package never rewrites history.
          </p>
        </div>
      ) : null}
    </div>
  );
}
