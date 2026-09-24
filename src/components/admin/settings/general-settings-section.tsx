"use client";

import { AtSign, Clock3, Info, MessageSquareText, Store } from "lucide-react";
import { useState } from "react";

import {
  fieldClass,
  SettingsField,
  SettingsFormActions,
  SettingsSectionIntro,
} from "@/components/admin/settings/settings-primitives";
import { cn } from "@/lib/utils";
import type {
  AdminGeneralSettings,
  AdminSettingsLocale,
  AdminSettingsTimezone,
} from "@/types";

const timezones: readonly { value: AdminSettingsTimezone; label: string }[] = [
  { value: "Asia/Jakarta", label: "Asia/Jakarta (WIB · UTC+7)" },
  { value: "Asia/Makassar", label: "Asia/Makassar (WITA · UTC+8)" },
  { value: "Asia/Jayapura", label: "Asia/Jayapura (WIT · UTC+9)" },
  { value: "UTC", label: "UTC (Universal Coordinated Time)" },
];

const locales: readonly { value: AdminSettingsLocale; label: string }[] = [
  { value: "id-ID", label: "Indonesian (Bahasa Indonesia)" },
  { value: "en-GB", label: "English (UK / International)" },
  { value: "en-US", label: "English (US)" },
];

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return (
    value.trim().startsWith("+") && digits.length >= 10 && digits.length <= 15
  );
}

export function GeneralSettingsSection({
  initial,
  onNotice,
}: {
  initial: AdminGeneralSettings;
  onNotice: (message: string) => void;
}) {
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const dirty = JSON.stringify(saved) !== JSON.stringify(draft);
  const errors = {
    platformName: draft.platformName.trim() ? "" : "Platform name is required.",
    supportEmail: validEmail(draft.supportEmail)
      ? ""
      : "Enter a valid support email.",
    supportWhatsapp: validWhatsapp(draft.supportWhatsapp)
      ? ""
      : "Use an international WhatsApp number beginning with +.",
  };
  const valid = Object.values(errors).every((error) => !error);

  function update<Key extends keyof AdminGeneralSettings>(
    key: Key,
    value: AdminGeneralSettings[Key],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!valid) return;
    const next = {
      ...draft,
      platformName: draft.platformName.trim(),
      supportEmail: draft.supportEmail.trim().toLowerCase(),
      supportWhatsapp: draft.supportWhatsapp.trim(),
    };
    setSaved(next);
    setDraft(next);
    setSubmitted(false);
    onNotice("General settings saved for this mock Admin session.");
  }

  function reset() {
    setDraft(saved);
    setSubmitted(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
      <form
        onSubmit={submit}
        className="min-w-0 space-y-6 border border-border bg-surface-lowest p-5 shadow-sm sm:p-7"
      >
        <SettingsSectionIntro
          eyebrow="01 — Platform Parameters"
          title="Platform Identity & Public Touchpoints"
          description="Core identity and contact channels used by Moment Kita’s studio operations and client-facing support surfaces."
          icon={<Store aria-hidden size={18} />}
        />

        <SettingsField
          id="platform-name"
          label="Platform Brand Name"
          hint="Displayed on new client-facing and operational records."
          error={submitted ? errors.platformName : undefined}
        >
          <input
            id="platform-name"
            value={draft.platformName}
            onChange={(event) => update("platformName", event.target.value)}
            className={cn(
              fieldClass,
              submitted && errors.platformName && "border-red-600",
            )}
          />
        </SettingsField>

        <SettingsField
          id="support-email"
          label="Studio Support Email"
          hint="Used for guest, payment-proof, and print-review support."
          error={submitted ? errors.supportEmail : undefined}
        >
          <div className="relative">
            <AtSign
              aria-hidden
              size={15}
              className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              id="support-email"
              type="email"
              value={draft.supportEmail}
              onChange={(event) => update("supportEmail", event.target.value)}
              className={cn(
                fieldClass,
                "pl-10",
                submitted && errors.supportEmail && "border-red-600",
              )}
            />
          </div>
        </SettingsField>

        <SettingsField
          id="support-whatsapp"
          label="Operational WhatsApp Line"
          hint="Public concierge and manual operations contact."
          error={submitted ? errors.supportWhatsapp : undefined}
        >
          <div className="relative">
            <MessageSquareText
              aria-hidden
              size={15}
              className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              id="support-whatsapp"
              type="tel"
              value={draft.supportWhatsapp}
              onChange={(event) =>
                update("supportWhatsapp", event.target.value)
              }
              className={cn(
                fieldClass,
                "pl-10",
                submitted && errors.supportWhatsapp && "border-red-600",
              )}
            />
          </div>
        </SettingsField>

        <div className="grid gap-4 sm:grid-cols-2">
          <SettingsField id="default-timezone" label="Default Console Timezone">
            <select
              id="default-timezone"
              value={draft.timezone}
              onChange={(event) =>
                update("timezone", event.target.value as AdminSettingsTimezone)
              }
              className={fieldClass}
            >
              {timezones.map((timezone) => (
                <option key={timezone.value} value={timezone.value}>
                  {timezone.label}
                </option>
              ))}
            </select>
          </SettingsField>
          <SettingsField id="default-locale" label="Primary System Locale">
            <select
              id="default-locale"
              value={draft.locale}
              onChange={(event) =>
                update("locale", event.target.value as AdminSettingsLocale)
              }
              className={fieldClass}
            >
              {locales.map((locale) => (
                <option key={locale.value} value={locale.value}>
                  {locale.label}
                </option>
              ))}
            </select>
          </SettingsField>
        </div>

        <div className="flex items-start gap-2.5 bg-surface-container p-4 text-[11px] leading-5 text-on-surface-variant">
          <Info
            aria-hidden
            size={15}
            className="mt-0.5 shrink-0 text-secondary"
          />
          <p>
            Timezone and locale are defaults for new invitations and future
            operational displays. Saving does not rewrite existing invitation
            snapshots, packages, or historical transactions.
          </p>
        </div>

        <SettingsFormActions
          dirty={dirty}
          saveLabel="Save General Settings"
          onReset={reset}
        />
      </form>

      <aside className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6 xl:sticky xl:top-24">
        <span className="text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
          Client-Facing Preview
        </span>
        <h2 className="mt-1 font-serif text-[22px]">Public touchpoints</h2>
        <p className="mt-2 text-[11px] leading-5 text-on-surface-variant">
          Preview only. This task does not dynamically replace application
          styling or deploy contact changes.
        </p>

        <div className="mt-5 bg-surface-low p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                Invitation Footer
              </span>
              <p className="mt-2 font-serif text-[28px] leading-8">
                {draft.platformName || "Platform Name"}
              </p>
            </div>
            <span className="font-serif text-[24px] text-on-surface-variant/20 italic">
              MK
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 bg-surface-lowest p-3">
              <AtSign
                aria-hidden
                size={15}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <div className="min-w-0">
                <p className="text-[9px] font-semibold tracking-[0.08em] uppercase">
                  Support
                </p>
                <p className="mt-1 break-all text-[11px]">
                  {draft.supportEmail}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-surface-lowest p-3">
              <MessageSquareText
                aria-hidden
                size={15}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <div>
                <p className="text-[9px] font-semibold tracking-[0.08em] uppercase">
                  Concierge
                </p>
                <p className="mt-1 text-[11px]">{draft.supportWhatsapp}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-surface-lowest p-3">
              <Clock3
                aria-hidden
                size={15}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <div>
                <p className="text-[9px] font-semibold tracking-[0.08em] uppercase">
                  Timezone
                </p>
                <p className="mt-1 text-[11px]">{draft.timezone}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
