"use client";

import { useEffect, useMemo, useState } from "react";

import { PackageEditorForm } from "@/components/admin/packages/package-editor-form";
import type { PackageFormErrors } from "@/components/admin/packages/package-editor-form";
import { PackageEditorHeader } from "@/components/admin/packages/package-editor-header";
import { PackageSummaryCard } from "@/components/admin/packages/package-summary-card";
import { PackageTemplateAccess } from "@/components/admin/packages/package-template-access";
import type { AdminPackageEditorData, Package, PackageFormValues } from "@/types";

const emptyValues: PackageFormValues = {
  name: "",
  description: "",
  price: 0,
  currency: "IDR",
  invitationQuota: 1,
  activeDurationDays: 90,
  active: true,
  featured: false,
  features: [],
  templateAccessMode: "selected",
  selectedTemplateKeys: [],
};

function toFormValues(pkg: Package | null): PackageFormValues {
  if (!pkg) return emptyValues;
  return {
    name: pkg.name,
    description: pkg.description,
    price: pkg.price,
    currency: pkg.currency,
    invitationQuota: pkg.invitationQuota,
    activeDurationDays: pkg.activeDurationDays,
    active: pkg.active,
    featured: Boolean(pkg.featured),
    features: [...pkg.features],
    templateAccessMode: pkg.templateAccessMode ?? "selected",
    selectedTemplateKeys: pkg.selectedTemplateKeys
      ? [...pkg.selectedTemplateKeys]
      : [],
  };
}

function validate(values: PackageFormValues): PackageFormErrors {
  const errors: PackageFormErrors = {};

  if (!values.name.trim()) errors.name = "Package name is required.";
  if (!values.description.trim()) {
    errors.description = "Short description is required.";
  }
  if (!Number.isFinite(values.price) || values.price <= 0) {
    errors.price = "Enter a valid price.";
  }
  if (!Number.isInteger(values.invitationQuota) || values.invitationQuota < 1) {
    errors.invitationQuota = "Invitation quota must be at least 1.";
  }
  if (
    !Number.isInteger(values.activeDurationDays) ||
    values.activeDurationDays < 1
  ) {
    errors.activeDurationDays = "Active duration must be at least 1 day.";
  }
  if (
    values.templateAccessMode === "selected" &&
    values.selectedTemplateKeys.length === 0
  ) {
    errors.selectedTemplateKeys =
      "Select at least one template, or switch to All Active Templates.";
  }

  return errors;
}

export function PackageEditorView({
  mode,
  data,
}: {
  mode: "create" | "edit";
  data: AdminPackageEditorData;
}) {
  const initialValues = useMemo(
    () => toFormValues(data.package),
    [data.package],
  );
  const [values, setValues] = useState(initialValues);
  const [savedValues, setSavedValues] = useState(initialValues);
  const [errors, setErrors] = useState<PackageFormErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );

  const isDirty = JSON.stringify(values) !== JSON.stringify(savedValues);

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!isDirty) return;
      event.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function update(patch: Partial<PackageFormValues>) {
    setValues((current) => {
      const next = { ...current, ...patch };
      setErrors((currentErrors) =>
        Object.keys(currentErrors).length ? validate(next) : currentErrors,
      );
      return next;
    });
    setNotice(null);
  }

  function toggleTemplate(key: string) {
    setValues((current) => {
      const next = {
        ...current,
        selectedTemplateKeys: current.selectedTemplateKeys.includes(key)
          ? current.selectedTemplateKeys.filter((item) => item !== key)
          : [...current.selectedTemplateKeys, key],
      };
      setErrors((currentErrors) =>
        Object.keys(currentErrors).length ? validate(next) : currentErrors,
      );
      return next;
    });
    setNotice(null);
  }

  function handleSave() {
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setNotice("Fix the highlighted fields before saving.");
      return;
    }

    if (mode === "create") {
      setNotice(
        `${values.name} created in this local preview. Packages & Quota reflects new packages only once the mock/service layer is connected to real persistence — returning to the registry now.`,
      );
      window.setTimeout(() => window.location.assign("/admin/packages"), 900);
      return;
    }

    setSavedValues(values);
    setNotice(
      `${values.name} saved in this local preview. Backend persistence — and reflecting the change on other pages without a reload — is intentionally deferred until the mock/service layer is connected.`,
    );
  }

  function handleCancel() {
    const destination = "/admin/packages";
    if (isDirty) {
      setPendingNavigation(destination);
      return;
    }
    window.location.assign(destination);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-10">
      <PackageEditorHeader
        mode={mode}
        packageName={values.name}
        isDirty={isDirty}
        saving={false}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {notice ? (
        <div
          role="status"
          className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-[11px] text-emerald-950"
        >
          {notice}
        </div>
      ) : null}

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <PackageEditorForm
            values={values}
            errors={errors}
            isEdit={mode === "edit"}
            onChange={update}
          />
          <PackageTemplateAccess
            templates={data.templates}
            mode={values.templateAccessMode}
            selectedKeys={values.selectedTemplateKeys}
            onModeChange={(templateAccessMode) => update({ templateAccessMode })}
            onToggleTemplate={toggleTemplate}
            error={errors.selectedTemplateKeys}
          />
        </div>
        <div className="lg:col-span-4">
          <PackageSummaryCard values={values} />
        </div>
      </div>

      {pendingNavigation ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="discard-package-title"
          className="fixed inset-0 z-[95] grid place-items-center bg-black/55 p-4"
        >
          <section className="w-full max-w-md border border-border bg-surface-lowest p-6 shadow-2xl">
            <p className="text-[9px] font-semibold tracking-[0.14em] text-secondary uppercase">
              Unsaved changes
            </p>
            <h2 id="discard-package-title" className="mt-2 font-serif text-[26px]">
              Leave without saving?
            </h2>
            <p className="mt-3 text-[11px] leading-5 text-on-surface-variant">
              Your package edits have not been saved. Leaving now will discard
              them.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingNavigation(null)}
                className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.1em] uppercase"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={() => window.location.assign(pendingNavigation)}
                className="min-h-11 bg-red-700 px-5 text-[10px] font-semibold tracking-[0.1em] text-white uppercase"
              >
                Discard &amp; Leave
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
