"use client";

import { CheckCircle2, Save, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { ChangeEmailDialog } from "@/components/customer/settings/settings-dialogs";
import {
  WHATSAPP_COUNTRY_PREFIX,
  formatWhatsappForDisplay,
  isValidWhatsappNumber,
  sanitizeWhatsappInput,
} from "@/components/customer/settings/settings-utils";
import { SaveButton } from "@/components/customer/settings/save-button";
import { cn } from "@/lib/utils";

export interface ProfileFormValues {
  name: string;
  whatsappNumber: string;
  avatarUrl?: string;
}

export function ProfileSection({
  committed,
  email,
  onSave,
  onEmailChangeRequested,
}: {
  committed: ProfileFormValues;
  email: string;
  onSave: (values: ProfileFormValues) => void;
  onEmailChangeRequested: (newEmail: string) => void;
}) {
  const [name, setName] = useState(committed.name);
  const [whatsapp, setWhatsapp] = useState(committed.whatsappNumber);
  const [avatarUrl, setAvatarUrl] = useState(committed.avatarUrl);
  const [submitted, setSubmitted] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nameValid = name.trim().length > 0;
  const whatsappValid = isValidWhatsappNumber(whatsapp);
  const isDirty =
    name !== committed.name ||
    whatsapp !== committed.whatsappNumber ||
    avatarUrl !== committed.avatarUrl;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarUrl(URL.createObjectURL(file));
    event.target.value = "";
  }

  function handleSave() {
    setSubmitted(true);
    if (!nameValid || !whatsappValid) return;
    onSave({
      name: name.trim(),
      whatsappNumber: sanitizeWhatsappInput(whatsapp),
      avatarUrl,
    });
  }

  return (
    <section className="space-y-5">
      <SectionIntro
        eyebrow="01 — Identity"
        title="Personal Profile"
        description="Personal details used on receipts, account records, and workspace collaboration."
      />

      {/* Photo */}
      <div className="bg-surface-low p-6 shadow-sm">
        <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase">
          Profile Photo
        </p>
        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
            <img
              src={avatarUrl}
              alt=""
              className="size-20 shrink-0 rounded-full object-cover shadow-md"
            />
          ) : (
            <span className="grid size-20 shrink-0 place-items-center rounded-full bg-surface-highest text-[22px] font-semibold text-on-surface-variant">
              {name.trim().charAt(0).toUpperCase() || "?"}
            </span>
          )}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 bg-secondary px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-secondary-foreground uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Upload aria-hidden size={15} />
                Upload New Photo
              </button>
              {avatarUrl ? (
                <button
                  type="button"
                  onClick={() => setAvatarUrl(undefined)}
                  className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-on-surface uppercase transition-colors hover:bg-surface-highest"
                >
                  <Trash2 aria-hidden size={15} />
                  Remove Photo
                </button>
              ) : null}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>
            <p className="text-[12px] leading-5 text-on-surface-variant">
              Recommended: square JPG or PNG, at least 400×400px.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-5 bg-surface-low p-6 shadow-sm">
        <Field
          id="full-name"
          label="Full Name"
          hint="Your full name as displayed on account records."
          invalid={submitted && !nameValid}
        >
          <input
            id="full-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Widdy Arfiansyah"
            className={cn(
              "h-11 w-full bg-surface-lowest px-4 text-[14px] shadow-sm outline-none focus:bg-surface",
              submitted && !nameValid && "outline outline-1 outline-red-500",
            )}
          />
        </Field>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase">
              Primary Email
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-secondary uppercase">
              <CheckCircle2 aria-hidden size={13} />
              Verified
            </span>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <input
              value={email}
              readOnly
              aria-label="Primary email"
              className="h-11 flex-1 cursor-not-allowed bg-surface-container px-4 text-[14px] text-on-surface-variant shadow-sm select-none"
            />
            <button
              type="button"
              onClick={() => setEmailDialogOpen(true)}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 bg-surface-highest px-4 text-[11px] font-semibold tracking-[0.08em] text-on-surface uppercase transition-colors hover:bg-surface-container"
            >
              Change Email
            </button>
          </div>
          <p className="text-[11px] leading-4 text-on-surface-variant">
            Used to sign in and receive high-priority receipts.
          </p>
        </div>

        <Field
          id="whatsapp"
          label="WhatsApp Number"
          hint="Standard Indonesian mobile format, no leading 0 required."
          invalid={submitted && !whatsappValid}
        >
          <div className="flex gap-2">
            <span className="flex shrink-0 items-center gap-1.5 bg-surface-highest px-3.5 text-[14px] font-medium text-on-surface shadow-sm select-none">
              {WHATSAPP_COUNTRY_PREFIX}
            </span>
            <input
              id="whatsapp"
              inputMode="numeric"
              value={formatWhatsappForDisplay(whatsapp)}
              onChange={(event) => setWhatsapp(event.target.value)}
              placeholder="812 3456 7890"
              className={cn(
                "h-11 flex-1 bg-surface-lowest px-4 text-[14px] shadow-sm outline-none focus:bg-surface",
                submitted &&
                  !whatsappValid &&
                  "outline outline-1 outline-red-500",
              )}
            />
          </div>
        </Field>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.06em] text-on-surface-variant uppercase">
            {isDirty ? "You have unsaved changes" : "All changes saved"}
          </span>
          <SaveButton
            label="Save Profile"
            icon={Save}
            disabled={!isDirty}
            onSave={handleSave}
          />
        </div>
      </div>

      {emailDialogOpen ? (
        <ChangeEmailDialog
          currentEmail={email}
          onClose={() => setEmailDialogOpen(false)}
          onSubmitted={(newEmail) => {
            setEmailDialogOpen(false);
            onEmailChangeRequested(newEmail);
          }}
        />
      ) : null}
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
        {eyebrow}
      </span>
      <h2 className="font-serif text-[24px] leading-8 text-on-surface">
        {title}
      </h2>
      <p className="text-[13px] leading-5 text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  invalid,
  children,
}: {
  id: string;
  label: string;
  hint: string;
  invalid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase"
      >
        {label}
      </label>
      {children}
      <p
        className={cn(
          "text-[11px] leading-4",
          invalid ? "text-red-600" : "text-on-surface-variant",
        )}
      >
        {invalid ? "This field needs a valid value." : hint}
      </p>
    </div>
  );
}
