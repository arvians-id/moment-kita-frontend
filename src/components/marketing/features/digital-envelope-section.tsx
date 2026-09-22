"use client";

import {
  BadgeCheck,
  Banknote,
  Copy,
  Gift,
  Heart,
  LockKeyhole,
  MailCheck,
  QrCode,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Discreet & Dignified",
    description:
      "Share selected gift details inside the invitation, with the same restrained presentation as every other chapter.",
  },
  {
    icon: Heart,
    title: "Honeymoon Wishpots",
    description:
      "Turn an open-ended gift into meaningful moments such as a first dinner, a day trip, or a future home ritual.",
  },
  {
    icon: MailCheck,
    title: "Thank-You Tracking",
    description:
      "Keep contribution notes organized so handwritten thank-you cards remain personal and timely.",
  },
  {
    icon: Gift,
    title: "Direct Gift Details",
    description:
      "Present the couple’s chosen bank or gifting instructions without introducing a separate storefront experience.",
  },
] as const;

const paymentMethods = [
  { icon: Banknote, title: "Bank Transfer", detail: "Direct details" },
  { icon: Smartphone, title: "Mobile Banking", detail: "Easy to follow" },
  { icon: QrCode, title: "QR Payment", detail: "Quick access" },
] as const;

export function DigitalEnvelopeSection() {
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    await navigator.clipboard?.writeText("FR76 3000 4000 1234 5678 901");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section
      id="digital-envelope"
      className="scroll-mt-20 bg-surface-container py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
            03 — Monetary Registry &amp; Digital Envelope
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
            Graceful gifting with privacy and a direct path to the couple.
          </h2>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Replace awkward physical envelopes with a carefully presented gift
            chapter that keeps the couple’s own details at the center.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="min-w-0 rounded-2xl bg-white p-4 shadow-lg sm:p-7 lg:col-span-6">
            <div className="flex items-center justify-between pb-3">
              <span className="text-[10px] font-semibold tracking-[0.12em] text-secondary uppercase">
                The Digital Angpao / Envelope
              </span>
              <LockKeyhole aria-hidden size={22} className="text-secondary" />
            </div>
            <div className="flex flex-col items-center overflow-hidden rounded-xl bg-surface-high p-6 text-center">
              <div className="mb-4 grid size-16 place-items-center rounded-full bg-secondary text-white shadow-md transition-transform hover:scale-105">
                <span className="font-serif text-2xl italic">M</span>
              </div>
              <h3 className="font-serif text-xl font-semibold">
                The Honeymoon Voyage Fund
              </h3>
              <p className="mt-1 max-w-sm text-[13px] leading-5 text-on-surface-variant">
                “Contributing to our first quiet dinners and adventures as
                newlyweds.”
              </p>
              <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
                {paymentMethods.map(({ icon: Icon, title, detail }, index) => (
                  <div
                    key={title}
                    className={`flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-sm ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <Icon aria-hidden size={19} />
                    <span className="mt-1 text-[9px] font-semibold tracking-wider uppercase">
                      {title}
                    </span>
                    <span className="text-[9px] text-on-surface-variant">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex w-full items-center justify-between gap-3 rounded-lg bg-white p-3 text-left shadow-sm">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold tracking-wider text-on-surface-variant uppercase">
                    Gift Account Details
                  </p>
                  <p className="truncate text-[12px] font-medium tracking-wider">
                    FR76 3000 4000 1234 5678 901
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyAccount}
                  className="flex shrink-0 items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-[9px] font-semibold tracking-wider text-white uppercase transition-colors hover:bg-secondary"
                >
                  <Copy aria-hidden size={12} /> {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-wider text-secondary uppercase sm:text-[10px]">
                <BadgeCheck aria-hidden size={15} />
                Gift instructions stay within your invitation
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:col-span-6">
            <div className="relative h-56 overflow-hidden rounded-xl shadow-md">
              <Image
                src="/images/marketing/garden-stationery-suite.png"
                alt="Handmade cotton paper invitation with a wax seal"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl bg-white p-4 shadow-sm"
                >
                  <Icon aria-hidden size={22} className="mb-2 text-secondary" />
                  <h3 className="font-serif text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
