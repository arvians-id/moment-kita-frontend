"use client";

import { Check, Eye, EyeOff, KeyRound, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getPasswordRuleChecks,
  isPasswordValid,
} from "@/components/customer/settings/settings-utils";
import { cn } from "@/lib/utils";

function useDialogEscape(onClose: () => void) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);
}

function DialogShell({
  titleId,
  children,
  onClose,
}: {
  titleId: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useDialogEscape(onClose);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-espresso/55 backdrop-blur-[2px] sm:items-center sm:p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[94dvh] w-full overflow-y-auto bg-surface-lowest p-5 shadow-2xl sm:max-w-md sm:p-8"
      >
        {children}
      </section>
    </div>
  );
}

function TextField({
  id,
  label,
  hint,
  type = "text",
  value,
  placeholder,
  invalid,
  onChange,
  toggleablePassword = false,
}: {
  id: string;
  label: string;
  hint?: string;
  type?: "text" | "email" | "password";
  value: string;
  placeholder?: string;
  invalid?: boolean;
  onChange: (value: string) => void;
  toggleablePassword?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const resolvedType = toggleablePassword
    ? revealed
      ? "text"
      : "password"
    : type;

  return (
    <label htmlFor={id} className="grid gap-1.5">
      <span className="text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          type={resolvedType}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid}
          className={cn(
            "h-11 w-full border bg-surface-low px-3 text-[13px] outline-none focus:border-secondary focus:bg-surface-lowest",
            toggleablePassword && "pr-10",
            invalid ? "border-red-500" : "border-transparent",
          )}
        />
        {toggleablePassword ? (
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
          >
            {revealed ? (
              <EyeOff aria-hidden size={16} />
            ) : (
              <Eye aria-hidden size={16} />
            )}
          </button>
        ) : null}
      </div>
      {hint ? (
        <span className="text-[11px] leading-4 text-on-surface-variant">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function ChangeEmailDialog({
  currentEmail,
  onClose,
  onSubmitted,
}: {
  currentEmail: string;
  onClose: () => void;
  onSubmitted: (newEmail: string) => void;
}) {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(newEmail.trim());
  const valid = emailValid && password.trim().length > 0;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!valid) return;
    onSubmitted(newEmail.trim());
  }

  return (
    <DialogShell titleId="change-email-title" onClose={onClose}>
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center bg-surface-container text-secondary">
            <Mail aria-hidden size={17} />
          </span>
          <h2
            id="change-email-title"
            className="font-serif text-[20px] leading-6"
          >
            Change Primary Email
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-8 shrink-0 place-items-center text-on-surface-variant hover:bg-surface-container"
        >
          <X aria-hidden size={17} />
        </button>
      </div>

      <p className="mt-3 text-[12px] leading-5 text-on-surface-variant">
        For your security, we&apos;ll send a verification PIN to your new email
        before it replaces{" "}
        <span className="font-medium text-on-surface">{currentEmail}</span>.
      </p>

      <form onSubmit={submit} className="mt-5 grid gap-4">
        <TextField
          id="new-email"
          label="New Email Address"
          type="email"
          value={newEmail}
          placeholder="e.g. widdy.wedding@domain.com"
          invalid={submitted && !emailValid}
          onChange={setNewEmail}
        />
        <TextField
          id="confirm-password-email"
          label="Confirm Password"
          value={password}
          placeholder="Enter your password to verify"
          invalid={submitted && password.trim().length === 0}
          onChange={setPassword}
          toggleablePassword
        />

        {submitted && !valid ? (
          <p className="text-[11px] font-medium text-red-600">
            Enter a valid email address and your password to continue.
          </p>
        ) : null}

        <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.11em] uppercase"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-10 bg-secondary px-5 text-[10px] font-semibold tracking-[0.11em] text-secondary-foreground uppercase hover:bg-primary hover:text-primary-foreground"
          >
            Send Verification PIN
          </button>
        </div>
      </form>
    </DialogShell>
  );
}

export function ChangePasswordDialog({
  onClose,
  onSubmitted,
}: {
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const rules = getPasswordRuleChecks(newPassword);
  const newPasswordValid = isPasswordValid(newPassword);
  const matches = newPassword.length > 0 && newPassword === confirmPassword;
  const valid =
    currentPassword.trim().length > 0 && newPasswordValid && matches;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!valid) return;
    onSubmitted();
  }

  return (
    <DialogShell titleId="change-password-title" onClose={onClose}>
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center bg-surface-container text-secondary">
            <KeyRound aria-hidden size={17} />
          </span>
          <h2
            id="change-password-title"
            className="font-serif text-[20px] leading-6"
          >
            Change Password
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-8 shrink-0 place-items-center text-on-surface-variant hover:bg-surface-container"
        >
          <X aria-hidden size={17} />
        </button>
      </div>

      <form onSubmit={submit} className="mt-5 grid gap-4">
        <TextField
          id="current-password"
          label="Current Password"
          value={currentPassword}
          placeholder="Enter current password"
          invalid={submitted && currentPassword.trim().length === 0}
          onChange={setCurrentPassword}
          toggleablePassword
        />
        <TextField
          id="new-password"
          label="New Password"
          value={newPassword}
          placeholder="Minimum 8 characters"
          invalid={submitted && !newPasswordValid}
          onChange={setNewPassword}
          toggleablePassword
        />
        <TextField
          id="confirm-password"
          label="Confirm New Password"
          value={confirmPassword}
          placeholder="Re-type new password"
          invalid={submitted && !matches}
          onChange={setConfirmPassword}
          toggleablePassword
        />

        <div className="bg-surface-container p-3 text-[12px]">
          <p className="text-[10px] font-semibold tracking-[0.1em] text-secondary uppercase">
            Security Requirement
          </p>
          <div className="mt-1.5 grid gap-1">
            {rules.map((rule) => (
              <span
                key={rule.label}
                className={cn(
                  "flex items-center gap-1.5",
                  rule.met ? "text-on-surface" : "text-on-surface-variant",
                )}
              >
                <Check
                  aria-hidden
                  size={13}
                  className={rule.met ? "text-secondary" : "text-outline"}
                />
                {rule.label}
              </span>
            ))}
          </div>
        </div>

        {submitted && !valid ? (
          <p className="text-[11px] font-medium text-red-600">
            {currentPassword.trim().length === 0
              ? "Enter your current password to continue."
              : !newPasswordValid
                ? "Your new password doesn't meet the requirements above."
                : "New password and confirmation do not match."}
          </p>
        ) : null}

        <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.11em] uppercase"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-10 bg-secondary px-5 text-[10px] font-semibold tracking-[0.11em] text-secondary-foreground uppercase hover:bg-primary hover:text-primary-foreground"
          >
            Update Password
          </button>
        </div>
      </form>
    </DialogShell>
  );
}
