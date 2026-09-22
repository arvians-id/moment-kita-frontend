"use client";

import {
  ExternalLink,
  Gift,
  Info,
  MapPin,
  Plus,
  Save,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type {
  DigitalGiftAccount,
  DigitalGiftManagementData,
  PhysicalGiftAddress,
} from "@/types";

import { GiftAccountCard } from "./gift-account-card";
import {
  GiftAccountDialog,
  RemoveGiftAccountDialog,
} from "./gift-account-dialogs";
import { GiftPreview } from "./gift-preview";

const emptyAddress: PhysicalGiftAddress = {
  recipientName: "",
  phoneNumber: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  deliveryNotes: "",
};

function normalizeAccount(account: DigitalGiftAccount): DigitalGiftAccount {
  return {
    ...account,
    accountType: account.accountType ?? "bank",
    provider: account.provider ?? account.bankName,
  };
}

export function DigitalGiftManagement({
  initialData,
}: {
  initialData: DigitalGiftManagementData;
}) {
  const [enabled, setEnabled] = useState(initialData.configuration.enabled);
  const [physicalGiftEnabled, setPhysicalGiftEnabled] = useState(
    initialData.configuration.physicalGiftEnabled,
  );
  const [accounts, setAccounts] = useState<DigitalGiftAccount[]>(() =>
    initialData.gift.accounts.map(normalizeAccount),
  );
  const [address, setAddress] = useState<PhysicalGiftAddress>(
    initialData.gift.physicalAddress
      ? { ...initialData.gift.physicalAddress }
      : {
          ...emptyAddress,
          address: initialData.gift.deliveryAddress ?? "",
        },
  );
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] =
    useState<DigitalGiftAccount | null>(null);
  const [removingAccount, setRemovingAccount] =
    useState<DigitalGiftAccount | null>(null);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState("");

  const accountLimitReached = accounts.length >= 2;
  const addressComplete = useMemo(
    () =>
      [
        address.recipientName,
        address.phoneNumber,
        address.address,
        address.city,
        address.province,
        address.postalCode,
      ].every((value) => value.trim()),
    [address],
  );

  function markChanged() {
    setDirty(true);
  }

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function openAddDialog() {
    if (accountLimitReached) return;
    setEditingAccount(null);
    setAccountDialogOpen(true);
  }

  function saveAccount(account: DigitalGiftAccount) {
    setAccounts((current) => {
      const exists = current.some((item) => item.id === account.id);
      if (exists) {
        return current.map((item) => (item.id === account.id ? account : item));
      }
      if (current.length >= 2) return current;
      return [...current, account];
    });
    markChanged();
    setAccountDialogOpen(false);
    showNotice(
      editingAccount ? "Gift account updated." : "Gift account added.",
    );
  }

  function confirmRemove() {
    if (!removingAccount) return;
    const provider =
      removingAccount.provider ?? removingAccount.bankName ?? "Gift account";
    setAccounts((current) =>
      current.filter((account) => account.id !== removingAccount.id),
    );
    setRemovingAccount(null);
    markChanged();
    showNotice(`${provider} was removed.`);
  }

  function moveAccount(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= accounts.length) return;
    setAccounts((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    markChanged();
  }

  function updateAddress(field: keyof PhysicalGiftAddress, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
    markChanged();
  }

  function saveChanges() {
    if (physicalGiftEnabled && !addressComplete) {
      showNotice("Complete the required physical gift address fields.");
      return;
    }
    setDirty(false);
    showNotice(
      enabled
        ? "Digital Gift changes saved."
        : "Digital Gift disabled. Your details remain saved.",
    );
  }

  return (
    <div className="-mx-4 -my-8 overflow-x-clip sm:-mx-6 lg:-mx-8">
      <header className="border-b border-border bg-surface-low">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
            <Link
              href="/app/invitations"
              className="transition-colors hover:text-on-surface"
            >
              My Invitations
            </Link>
            <span aria-hidden>/</span>
            <span className="max-w-[16rem] truncate font-serif text-[17px] font-normal tracking-normal text-on-surface normal-case">
              {initialData.invitation.coupleLabel} ·{" "}
              {initialData.invitation.templateName}
            </span>
            <span aria-hidden>/</span>
            <span className="text-secondary">Digital Gift</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/${initialData.invitation.slug}#gift`}
              className="inline-flex min-h-10 items-center justify-center gap-2 bg-surface-lowest px-4 text-[10px] font-semibold tracking-[0.1em] uppercase shadow-sm hover:bg-surface-container"
            >
              Guest View <ExternalLink aria-hidden size={14} />
            </Link>
            <button
              type="button"
              onClick={saveChanges}
              className="inline-flex min-h-10 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground uppercase shadow-sm hover:bg-secondary"
            >
              <Save aria-hidden size={14} />
              Save Changes
              {dirty ? (
                <span className="size-1.5 rounded-full bg-white" />
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Thoughtful Giving
            </p>
            <h1 className="mt-2 font-serif text-[38px] leading-[1.02] tracking-[-0.025em] sm:text-[48px] lg:text-[56px]">
              Digital Gift Details
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-on-surface-variant sm:text-[16px]">
              Offer guests a simple way to send a gift by sharing trusted bank,
              e-wallet, or delivery details.
            </p>
          </div>
          <FeatureToggle
            checked={enabled}
            onChange={(value) => {
              setEnabled(value);
              markChanged();
            }}
            label="Digital Gift"
            description={
              enabled
                ? "Visible in the public invitation"
                : "Hidden; configured details are preserved"
            }
          />
        </section>

        <div className="mt-8 grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 space-y-7">
            <section
              aria-labelledby="gift-accounts-heading"
              className="border border-border bg-surface-low p-4 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-secondary uppercase">
                    Gift Destinations
                  </p>
                  <h2
                    id="gift-accounts-heading"
                    className="mt-1 font-serif text-[29px] sm:text-[33px]"
                  >
                    Gift Accounts
                  </h2>
                  <p className="mt-2 text-[12px] leading-5 text-on-surface-variant">
                    Add up to two bank or e-wallet destinations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddDialog}
                  disabled={accountLimitReached}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-[10px] font-semibold tracking-[0.11em] text-primary-foreground uppercase disabled:cursor-not-allowed disabled:bg-outline disabled:text-surface-lowest"
                >
                  <Plus aria-hidden size={15} />
                  Add Gift Account
                </button>
              </div>

              <div className="mt-5 flex items-start gap-3 bg-surface-container px-4 py-3">
                <Info
                  aria-hidden
                  size={16}
                  className="mt-0.5 shrink-0 text-secondary"
                />
                <p className="text-[11px] leading-5 text-on-surface-variant">
                  {accountLimitReached
                    ? "You have reached the maximum of 2 gift accounts. Remove an account before adding another."
                    : `${accounts.length} of 2 account slots used. The first account appears first for guests.`}
                </p>
              </div>

              {accounts.length ? (
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {accounts.map((account, index) => (
                    <GiftAccountCard
                      key={account.id}
                      account={account}
                      index={index}
                      total={accounts.length}
                      onEdit={() => {
                        setEditingAccount(account);
                        setAccountDialogOpen(true);
                      }}
                      onRemove={() => setRemovingAccount(account)}
                      onMove={(direction) => moveAccount(index, direction)}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-5 grid min-h-48 place-items-center border border-dashed border-border bg-surface-lowest px-5 text-center">
                  <div>
                    <span className="mx-auto grid size-11 place-items-center rounded-full bg-surface-container text-secondary">
                      <Gift aria-hidden size={19} />
                    </span>
                    <h3 className="mt-3 font-serif text-[22px]">
                      No gift accounts yet
                    </h3>
                    <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                      Add a bank account or e-wallet when you are ready.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section
              aria-labelledby="physical-gift-heading"
              className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7"
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center bg-surface-container text-secondary">
                    <MapPin aria-hidden size={18} />
                  </span>
                  <div>
                    <h2
                      id="physical-gift-heading"
                      className="font-serif text-[27px]"
                    >
                      Physical Gift Address
                    </h2>
                    <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                      Optionally share a delivery address with guests.
                    </p>
                  </div>
                </div>
                <FeatureToggle
                  compact
                  checked={physicalGiftEnabled}
                  onChange={(value) => {
                    setPhysicalGiftEnabled(value);
                    markChanged();
                  }}
                  label="Delivery Address"
                  description={physicalGiftEnabled ? "Enabled" : "Disabled"}
                />
              </div>

              {physicalGiftEnabled ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <AddressField
                    id="recipient-name"
                    label="Recipient Name"
                    value={address.recipientName}
                    onChange={(value) => updateAddress("recipientName", value)}
                  />
                  <AddressField
                    id="recipient-phone"
                    label="Phone Number"
                    value={address.phoneNumber}
                    inputMode="tel"
                    onChange={(value) => updateAddress("phoneNumber", value)}
                  />
                  <div className="sm:col-span-2">
                    <AddressField
                      id="delivery-address"
                      label="Address"
                      value={address.address}
                      multiline
                      onChange={(value) => updateAddress("address", value)}
                    />
                  </div>
                  <AddressField
                    id="delivery-city"
                    label="City"
                    value={address.city}
                    onChange={(value) => updateAddress("city", value)}
                  />
                  <AddressField
                    id="delivery-province"
                    label="Province"
                    value={address.province}
                    onChange={(value) => updateAddress("province", value)}
                  />
                  <AddressField
                    id="delivery-postal-code"
                    label="Postal Code"
                    value={address.postalCode}
                    inputMode="numeric"
                    onChange={(value) => updateAddress("postalCode", value)}
                  />
                  <AddressField
                    id="delivery-notes"
                    label="Delivery Notes (Optional)"
                    value={address.deliveryNotes ?? ""}
                    onChange={(value) => updateAddress("deliveryNotes", value)}
                  />
                </div>
              ) : (
                <p className="mt-5 bg-surface-low px-4 py-3 text-[11px] leading-5 text-on-surface-variant">
                  Existing address details remain saved and can be enabled again
                  at any time.
                </p>
              )}
            </section>

            <section className="flex items-start gap-4 border border-secondary/25 bg-secondary/5 p-5 sm:p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-lowest text-secondary">
                <ShieldCheck aria-hidden size={18} />
              </span>
              <div>
                <h2 className="font-serif text-[22px]">
                  Your details, shared intentionally
                </h2>
                <p className="mt-2 text-[12px] leading-6 text-on-surface-variant">
                  Only the gift information you configure and publish is shown
                  to guests. Moment Kita does not collect money, process
                  payments, verify transfers, or ask for banking credentials.
                </p>
              </div>
            </section>
          </div>

          <GiftPreview
            enabled={enabled}
            accounts={accounts}
            physicalGiftEnabled={physicalGiftEnabled}
            address={address}
          />
        </div>
      </div>

      {accountDialogOpen ? (
        <GiftAccountDialog
          account={editingAccount}
          onClose={() => setAccountDialogOpen(false)}
          onSave={saveAccount}
        />
      ) : null}
      {removingAccount ? (
        <RemoveGiftAccountDialog
          account={removingAccount}
          onClose={() => setRemovingAccount(null)}
          onConfirm={confirmRemove}
        />
      ) : null}
      {notice ? (
        <div
          role="status"
          className="fixed right-4 bottom-4 z-[90] max-w-sm bg-primary px-4 py-3 text-[11px] font-medium text-primary-foreground shadow-xl sm:right-6 sm:bottom-6"
        >
          {notice}
        </div>
      ) : null}
    </div>
  );
}

function FeatureToggle({
  checked,
  onChange,
  label,
  description,
  compact = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border border-border bg-surface-lowest shadow-sm",
        compact ? "min-w-52 px-4 py-3" : "min-w-64 px-5 py-4",
      )}
    >
      <div>
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-[9px] text-on-surface-variant">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${checked ? "Disable" : "Enable"} ${label}`}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-secondary" : "bg-outline",
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1 size-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}

function AddressField({
  id,
  label,
  value,
  multiline = false,
  inputMode,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  multiline?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="grid gap-1.5">
      <span className="text-[10px] font-semibold tracking-[0.1em] uppercase">
        {label}
      </span>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={3}
          onChange={(event) => onChange(event.target.value)}
          className="w-full resize-y border border-transparent bg-surface-low px-3 py-3 text-[13px] leading-5 outline-none focus:border-secondary focus:bg-surface-lowest"
        />
      ) : (
        <input
          id={id}
          value={value}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full border border-transparent bg-surface-low px-3 text-[13px] outline-none focus:border-secondary focus:bg-surface-lowest"
        />
      )}
    </label>
  );
}
