"use client";

import { Building2, Check, Copy, Gift, MapPin, Smartphone } from "lucide-react";
import { useState } from "react";

import type { DigitalGiftAccount, PhysicalGiftAddress } from "@/types";

export function GiftPreview({
  enabled,
  accounts,
  physicalGiftEnabled,
  address,
}: {
  enabled: boolean;
  accounts: DigitalGiftAccount[];
  physicalGiftEnabled: boolean;
  address: PhysicalGiftAddress;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyNumber(account: DigitalGiftAccount) {
    let copied = false;
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      copied = true;
    } catch {
      const input = document.createElement("textarea");
      input.value = account.accountNumber;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const legacyCopy = (
        document as unknown as {
          execCommand: (command: string) => boolean;
        }
      ).execCommand.bind(document);
      copied = legacyCopy("copy");
      input.remove();
    }

    if (!copied) return;
    setCopiedId(account.id);
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <aside className="xl:sticky xl:top-6">
      <div className="border border-border bg-surface-lowest p-4 shadow-lg sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.17em] text-secondary uppercase">
              Guest View
            </p>
            <h2 className="mt-1 font-serif text-[24px]">
              Digital Gift Preview
            </h2>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-secondary/10 text-secondary">
            <Gift aria-hidden size={18} />
          </span>
        </div>

        {!enabled ? (
          <div className="grid min-h-72 place-items-center px-4 text-center">
            <div>
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-surface-container text-on-surface-variant">
                <Gift aria-hidden size={20} />
              </span>
              <p className="mt-4 font-serif text-[22px]">
                Hidden from your invitation
              </p>
              <p className="mt-2 text-[12px] leading-6 text-on-surface-variant">
                Your saved destinations stay configured, but guests will not see
                this section while Digital Gift is disabled.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="text-center">
              <p className="font-serif text-[26px] italic">Wedding Gift</p>
              <p className="mx-auto mt-2 max-w-sm text-[11px] leading-5 text-on-surface-variant">
                Your presence is the greatest gift. For guests who wish to share
                another token of love, these details are available.
              </p>
            </div>

            {accounts.length ? (
              <div className="mt-6 grid gap-3">
                {accounts.map((account) => {
                  const isWallet = account.accountType === "e_wallet";
                  const copied = copiedId === account.id;
                  return (
                    <article
                      key={account.id}
                      className="border border-border bg-surface-low p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center bg-surface-lowest text-secondary">
                          {isWallet ? (
                            <Smartphone aria-hidden size={16} />
                          ) : (
                            <Building2 aria-hidden size={16} />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold">
                            {account.provider ?? account.bankName}
                          </p>
                          <p className="text-[9px] tracking-[0.1em] text-on-surface-variant uppercase">
                            {account.label ??
                              (isWallet ? "E-Wallet" : "Bank Account")}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-mono text-[14px]">
                            {account.accountNumber}
                          </p>
                          <p className="mt-1 truncate text-[10px] text-on-surface-variant">
                            a.n. {account.accountHolder}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyNumber(account)}
                          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 bg-primary px-3 text-[9px] font-semibold tracking-[0.09em] text-primary-foreground uppercase"
                        >
                          {copied ? (
                            <Check aria-hidden size={13} />
                          ) : (
                            <Copy aria-hidden size={13} />
                          )}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="mt-6 bg-surface-low p-5 text-center text-[11px] leading-5 text-on-surface-variant">
                Add a bank account or e-wallet to show a gift destination here.
              </p>
            )}

            {physicalGiftEnabled && address.address.trim() ? (
              <div className="mt-4 border border-border bg-surface-low p-4">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center bg-surface-lowest text-secondary">
                    <MapPin aria-hidden size={16} />
                  </span>
                  <div className="min-w-0 text-[10px] leading-5">
                    <p className="font-semibold tracking-[0.08em] uppercase">
                      Send a Physical Gift
                    </p>
                    <p className="mt-2 font-medium">{address.recipientName}</p>
                    <p className="text-on-surface-variant">
                      {address.address}
                      <br />
                      {[address.city, address.province, address.postalCode]
                        .filter(Boolean)
                        .join(", ")}
                      {address.phoneNumber ? (
                        <>
                          <br />
                          {address.phoneNumber}
                        </>
                      ) : null}
                    </p>
                    {address.deliveryNotes ? (
                      <p className="mt-2 italic text-on-surface-variant">
                        {address.deliveryNotes}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <p className="mt-3 px-2 text-center text-[10px] leading-5 text-on-surface-variant">
        Preview updates as you edit. Changes are published only after Save
        Changes.
      </p>
    </aside>
  );
}
