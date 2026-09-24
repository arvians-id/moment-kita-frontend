"use client";

import {
  CheckCircle2,
  KeyRound,
  Laptop,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import {
  fieldClass,
  SettingsField,
  SettingsFormActions,
  SettingsSectionIntro,
} from "@/components/admin/settings/settings-primitives";
import { cn } from "@/lib/utils";
import type { AdminSettingsAccount } from "@/types";

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AdminProfileSection({
  initial,
  onNotice,
}: {
  initial: AdminSettingsAccount;
  onNotice: (message: string) => void;
}) {
  const [savedProfile, setSavedProfile] = useState({
    name: initial.name,
    email: initial.email,
  });
  const [profile, setProfile] = useState(savedProfile);
  const [profileSubmitted, setProfileSubmitted] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [passwordUpdatedLabel, setPasswordUpdatedLabel] = useState(
    initial.passwordUpdatedLabel,
  );

  const profileDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);
  const profileErrors = {
    name: profile.name.trim() ? "" : "Admin name is required.",
    email: validEmail(profile.email) ? "" : "Enter a valid admin email.",
  };
  const passwordDirty = Boolean(
    currentPassword || newPassword || confirmPassword,
  );
  const passwordErrors = {
    current: currentPassword ? "" : "Enter the current password.",
    next:
      newPassword.length >= 12
        ? ""
        : "Use at least 12 characters for the new password.",
    confirm:
      confirmPassword === newPassword && confirmPassword
        ? ""
        : "Passwords do not match.",
  };

  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfileSubmitted(true);
    if (profileErrors.name || profileErrors.email) return;
    const next = {
      name: profile.name.trim(),
      email: profile.email.trim().toLowerCase(),
    };
    setSavedProfile(next);
    setProfile(next);
    setProfileSubmitted(false);
    onNotice("Admin profile saved for this mock Admin session.");
  }

  function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordSubmitted(true);
    if (
      passwordErrors.current ||
      passwordErrors.next ||
      passwordErrors.confirm
    ) {
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSubmitted(false);
    setPasswordUpdatedLabel("Updated just now");
    onNotice(
      "Password change validated locally. Backend authentication remains deferred.",
    );
  }

  function resetPassword() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSubmitted(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
      <form
        onSubmit={saveProfile}
        className="space-y-6 border border-border bg-surface-lowest p-5 shadow-sm sm:p-7"
      >
        <SettingsSectionIntro
          eyebrow="02 — Identity & Credentials"
          title="Admin Profile"
          description="Personal administrator details and the current console authorization role."
          icon={<UserRound aria-hidden size={18} />}
        />

        <div className="flex flex-col gap-4 bg-surface-low p-4 sm:flex-row sm:items-center">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-[17px] font-semibold text-primary-foreground">
            {initialsFor(profile.name) || initial.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-serif text-[20px]">{profile.name}</p>
            <p className="mt-1 truncate text-[11px] text-on-surface-variant">
              {profile.email}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 bg-accent px-2 py-1 text-[9px] font-semibold tracking-[0.1em] text-accent-foreground uppercase">
              <ShieldCheck aria-hidden size={12} />
              {initial.role}
            </span>
          </div>
        </div>

        <SettingsField
          id="admin-name"
          label="Full Name"
          hint="Displayed in the Admin shell and operational records after backend integration."
          error={profileSubmitted ? profileErrors.name : undefined}
        >
          <input
            id="admin-name"
            value={profile.name}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            className={cn(
              fieldClass,
              profileSubmitted && profileErrors.name && "border-red-600",
            )}
          />
        </SettingsField>

        <SettingsField
          id="admin-email"
          label="Primary Admin Email"
          hint="Reserved for sign-in and security notices once authentication is connected."
          error={profileSubmitted ? profileErrors.email : undefined}
        >
          <input
            id="admin-email"
            type="email"
            value={profile.email}
            onChange={(event) =>
              setProfile((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            className={cn(
              fieldClass,
              profileSubmitted && profileErrors.email && "border-red-600",
            )}
          />
        </SettingsField>

        <div className="flex items-center justify-between gap-3 bg-surface-container p-4">
          <span className="inline-flex items-center gap-2 text-[11px] text-on-surface-variant">
            <ShieldCheck aria-hidden size={15} className="text-secondary" />
            Console authorization
          </span>
          <strong className="text-[10px] tracking-[0.1em] uppercase">
            {initial.role}
          </strong>
        </div>

        <SettingsFormActions
          dirty={profileDirty}
          saveLabel="Save Profile"
          onReset={() => {
            setProfile(savedProfile);
            setProfileSubmitted(false);
          }}
        />
      </form>

      <div className="space-y-6">
        <form
          onSubmit={updatePassword}
          className="space-y-6 border border-border bg-surface-lowest p-5 shadow-sm sm:p-7"
        >
          <SettingsSectionIntro
            eyebrow="03 — Security"
            title="Password & Session"
            description="Basic credential controls for the current administrator. No advanced identity management is exposed here."
            icon={<KeyRound aria-hidden size={18} />}
          />

          <SettingsField
            id="current-password"
            label="Current Password"
            error={passwordSubmitted ? passwordErrors.current : undefined}
          >
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className={cn(
                fieldClass,
                passwordSubmitted && passwordErrors.current && "border-red-600",
              )}
            />
          </SettingsField>

          <SettingsField
            id="new-password"
            label="New Password"
            hint="Minimum 12 characters. Passwords are not persisted in this frontend mock."
            error={passwordSubmitted ? passwordErrors.next : undefined}
          >
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={cn(
                fieldClass,
                passwordSubmitted && passwordErrors.next && "border-red-600",
              )}
            />
          </SettingsField>

          <SettingsField
            id="confirm-password"
            label="Confirm New Password"
            error={passwordSubmitted ? passwordErrors.confirm : undefined}
          >
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={cn(
                fieldClass,
                passwordSubmitted && passwordErrors.confirm && "border-red-600",
              )}
            />
          </SettingsField>

          <p className="inline-flex items-center gap-1.5 text-[10px] text-on-surface-variant">
            <CheckCircle2 aria-hidden size={13} className="text-secondary" />
            {passwordUpdatedLabel}
          </p>

          <SettingsFormActions
            dirty={passwordDirty}
            saveLabel="Update Password"
            onReset={resetPassword}
          />
        </form>

        <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-6">
          <span className="text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
            Current Session
          </span>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="flex items-start gap-3 bg-surface-low p-4">
              <Laptop
                aria-hidden
                size={16}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <div>
                <p className="text-[11px] font-semibold">
                  {initial.currentSession.device}
                </p>
                <p className="mt-1 text-[10px] text-on-surface-variant">
                  {initial.currentSession.lastActiveLabel}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-surface-low p-4">
              <MapPin
                aria-hidden
                size={16}
                className="mt-0.5 shrink-0 text-secondary"
              />
              <div>
                <p className="text-[11px] font-semibold">Session location</p>
                <p className="mt-1 text-[10px] text-on-surface-variant">
                  {initial.currentSession.location}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
