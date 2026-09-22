"use client";

import {
  AlertTriangle,
  Building2,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { DigitalGiftAccount } from "@/types";

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

export function GiftAccountDialog({
  account,
  onClose,
  onSave,
}: {
  account: DigitalGiftAccount | null;
  onClose: () => void;
  onSave: (account: DigitalGiftAccount) => void;
}) {
  useDialogEscape(onClose);
  const [accountType, setAccountType] = useState<"bank" | "e_wallet">(
    account?.accountType ?? "bank",
  );
  const [provider, setProvider] = useState(
    account?.provider ?? account?.bankName ?? "",
  );
  const [accountNumber, setAccountNumber] = useState(
    account?.accountNumber ?? "",
  );
  const [accountHolder, setAccountHolder] = useState(
    account?.accountHolder ?? "",
  );
  const [label, setLabel] = useState(account?.label ?? "");
  const [submitted, setSubmitted] = useState(false);

  const valid = provider.trim() && accountNumber.trim() && accountHolder.trim();

  function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!valid) return;

    const typeLabel =
      accountType === "bank" ? "Bank account" : "E-wallet account";
    onSave({
      id: account?.id ?? `gift_${Date.now()}`,
      accountType,
      provider: provider.trim(),
      role: label.trim() || typeLabel,
      bankName: provider.trim(),
      accountNumber: accountNumber.trim(),
      accountHolder: accountHolder.trim(),
      badge: accountType === "bank" ? "Bank account" : "E-wallet",
      label: label.trim() || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-espresso/55 backdrop-blur-[2px] sm:items-center sm:p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-account-dialog-title"
        className="max-h-[94dvh] w-full overflow-y-auto bg-surface-lowest p-5 shadow-2xl sm:max-w-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.17em] text-secondary uppercase">
              Gift Destination
            </p>
            <h2
              id="gift-account-dialog-title"
              className="mt-1 font-serif text-[29px] leading-9"
            >
              {account ? "Edit Gift Account" : "Add Gift Account"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account form"
            className="grid size-9 shrink-0 place-items-center text-on-surface-variant hover:bg-surface-container"
          >
            <X aria-hidden size={19} />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6">
          <fieldset>
            <legend className="text-[10px] font-semibold tracking-[0.12em] uppercase">
              Account Type
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  ["bank", "Bank Account", Building2],
                  ["e_wallet", "E-Wallet", Smartphone],
                ] as const
              ).map(([value, labelText, Icon]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={accountType === value}
                  onClick={() => {
                    setAccountType(value);
                    setProvider("");
                  }}
                  className={cn(
                    "flex min-h-14 items-center justify-center gap-2 border px-3 text-[10px] font-semibold tracking-[0.1em] uppercase",
                    accountType === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface-low hover:bg-surface-container",
                  )}
                >
                  <Icon aria-hidden size={17} />
                  {labelText}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 grid gap-4">
            <FormField
              id="gift-provider"
              label={accountType === "bank" ? "Bank" : "Provider"}
              value={provider}
              placeholder={
                accountType === "bank" ? "e.g. Bank BCA" : "e.g. GoPay"
              }
              onChange={setProvider}
              invalid={submitted && !provider.trim()}
            />
            <FormField
              id="gift-account-number"
              label={
                accountType === "bank"
                  ? "Account Number"
                  : "Phone / Account Number"
              }
              value={accountNumber}
              placeholder={
                accountType === "bank"
                  ? "Enter account number"
                  : "Enter phone or account number"
              }
              inputMode="numeric"
              onChange={setAccountNumber}
              invalid={submitted && !accountNumber.trim()}
            />
            <FormField
              id="gift-account-holder"
              label="Account Holder Name"
              value={accountHolder}
              placeholder="Name registered on the account"
              onChange={setAccountHolder}
              invalid={submitted && !accountHolder.trim()}
            />
            <FormField
              id="gift-account-label"
              label="Label (Optional)"
              value={label}
              placeholder="e.g. For Raka"
              onChange={setLabel}
            />
          </div>

          {submitted && !valid ? (
            <p className="mt-4 text-[11px] font-medium text-error">
              Complete the provider, number, and account holder fields.
            </p>
          ) : null}

          <div className="mt-5 flex gap-3 bg-surface-low p-4 text-[11px] leading-5 text-on-surface-variant">
            <ShieldCheck
              aria-hidden
              size={18}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <p>
              Moment Kita only displays this destination to your guests. Never
              enter a PIN, OTP, password, CVV, or banking credentials.
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.11em] uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-11 bg-primary px-5 text-[10px] font-semibold tracking-[0.11em] text-primary-foreground uppercase"
            >
              {account ? "Update Account" : "Add Account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function FormField({
  id,
  label,
  value,
  placeholder,
  inputMode,
  invalid = false,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  invalid?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="grid gap-1.5">
      <span className="text-[10px] font-semibold tracking-[0.1em] uppercase">
        {label}
      </span>
      <input
        id={id}
        value={value}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={cn(
          "h-12 border bg-surface-low px-3 text-[13px] outline-none focus:border-secondary focus:bg-surface-lowest",
          invalid ? "border-error" : "border-transparent",
        )}
      />
    </label>
  );
}

export function RemoveGiftAccountDialog({
  account,
  onClose,
  onConfirm,
}: {
  account: DigitalGiftAccount;
  onClose: () => void;
  onConfirm: () => void;
}) {
  useDialogEscape(onClose);
  const provider = account.provider ?? account.bankName;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-espresso/55 p-4 backdrop-blur-[2px]">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="remove-gift-account-title"
        aria-describedby="remove-gift-account-description"
        className="relative w-full max-w-md bg-surface-lowest p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute top-4 right-4 grid size-8 place-items-center text-on-surface-variant hover:bg-surface-container"
        >
          <X aria-hidden size={18} />
        </button>
        <span className="grid size-11 place-items-center rounded-full bg-error-container text-error">
          <AlertTriangle aria-hidden size={20} />
        </span>
        <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-error uppercase">
          Remove destination
        </p>
        <h2
          id="remove-gift-account-title"
          className="mt-1 pr-8 font-serif text-[26px] leading-8"
        >
          Remove {provider}?
        </h2>
        <p
          id="remove-gift-account-description"
          className="mt-3 text-[13px] leading-6 text-on-surface-variant"
        >
          This account will no longer appear as a gift destination after you
          save your changes.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 bg-surface-container px-5 text-[10px] font-semibold tracking-[0.12em] uppercase"
          >
            Keep Account
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 bg-error px-5 text-[10px] font-semibold tracking-[0.12em] text-on-error uppercase"
          >
            Remove Account
          </button>
        </div>
      </section>
    </div>
  );
}
