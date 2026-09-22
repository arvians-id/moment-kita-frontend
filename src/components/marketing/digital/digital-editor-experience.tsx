"use client";

import { CheckCircle2, MonitorSmartphone, RotateCcw } from "lucide-react";
import { useState } from "react";

const tabs = ["Couple Details", "Schedule", "RSVP Logic", "Palette"] as const;
const palettes = [
  "#fcf9f3",
  "#efe9de",
  "#8c4d37",
  "#2e2621",
  "#1c1b1b",
] as const;

export function DigitalEditorExperience() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Couple Details");
  const [partnerOne, setPartnerOne] = useState("Melina Laurent");
  const [partnerTwo, setPartnerTwo] = useState("Dayson Vance");
  const [slug, setSlug] = useState("melina-dayson");
  const [palette, setPalette] = useState<(typeof palettes)[number]>(
    palettes[0],
  );

  const firstName = partnerOne.trim().split(" ")[0] || "Partner One";
  const secondName = partnerTwo.trim().split(" ")[0] || "Partner Two";

  function reset() {
    setActiveTab("Couple Details");
    setPartnerOne("Melina Laurent");
    setPartnerTwo("Dayson Vance");
    setSlug("melina-dayson");
    setPalette(palettes[0]);
  }

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
      <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="min-w-0 space-y-8 lg:col-span-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
              The Studio Interface
            </p>
            <h2 className="mt-3 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
              Edit once,
              <br />
              <em className="font-normal">preview instantly.</em>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-on-surface-variant sm:text-lg sm:leading-8">
              A calm, responsive workspace for composing details and previewing
              the guest experience without touching code.
            </p>
          </div>

          <div className="space-y-6 bg-surface-low p-6 shadow-sm sm:p-8">
            <div className="flex gap-4 overflow-x-auto border-b border-surface-highest pb-4">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap pb-1 text-[9px] font-semibold tracking-wider uppercase ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-on-surface-variant"}`}
                >
                  0{index + 1} {tab}
                </button>
              ))}
            </div>

            {activeTab === "Couple Details" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
                  Partner One Full Name
                  <input
                    value={partnerOne}
                    onChange={(event) => setPartnerOne(event.target.value)}
                    className="w-full bg-white px-3 py-2 text-sm font-normal tracking-normal text-primary normal-case outline-none focus:ring-1 focus:ring-secondary"
                  />
                </label>
                <label className="space-y-1 text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
                  Partner Two Full Name
                  <input
                    value={partnerTwo}
                    onChange={(event) => setPartnerTwo(event.target.value)}
                    className="w-full bg-white px-3 py-2 text-sm font-normal tracking-normal text-primary normal-case outline-none focus:ring-1 focus:ring-secondary"
                  />
                </label>
              </div>
            ) : (
              <div className="bg-white p-4">
                <p className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
                  {activeTab} preview
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  This marketing preview shows where supported{" "}
                  {activeTab.toLowerCase()} controls live in the future customer
                  workspace.
                </p>
              </div>
            )}

            <label className="block space-y-1 text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
              Wedding Invitation Slug
              <span className="flex items-center bg-white px-3 py-2">
                <span className="text-xs font-normal tracking-normal text-on-surface-variant normal-case">
                  momentkita.com/
                </span>
                <input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold tracking-normal text-primary normal-case outline-none"
                />
                <CheckCircle2
                  aria-hidden
                  size={17}
                  className="text-secondary"
                />
              </span>
            </label>

            <fieldset className="space-y-2">
              <legend className="text-[9px] font-semibold tracking-wider text-on-surface-variant uppercase">
                Editorial Mood Palette
              </legend>
              <div className="flex items-center gap-3">
                {palettes.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Select palette ${color}`}
                    aria-pressed={palette === color}
                    onClick={() => setPalette(color)}
                    className={`size-7 rounded-full ${palette === color ? "ring-2 ring-primary ring-offset-2" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </fieldset>

            <div className="flex items-center justify-between gap-4 pt-2 text-xs text-on-surface-variant">
              <span className="flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-green-600" />
                Preview updated
              </span>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1 text-[9px] font-semibold tracking-wider text-primary uppercase hover:underline"
              >
                <RotateCcw aria-hidden size={13} />
                Reset to Default
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-w-0 flex flex-col items-center justify-center lg:col-span-6">
          <div className="relative z-10 w-[300px] rounded-[40px] bg-white p-3 shadow-2xl sm:w-[330px]">
            <div
              className="flex aspect-[9/18.5] flex-col justify-between overflow-hidden rounded-[32px] p-5 shadow-inner"
              style={{ backgroundColor: palette }}
            >
              <div className="space-y-3 pt-4 text-center">
                <span className="text-[8px] font-semibold tracking-widest text-secondary uppercase">
                  Live Synchronized Preview
                </span>
                <h3 className="font-serif text-[22px] font-semibold">
                  {firstName} &amp; {secondName}
                </h3>
                <p className="text-[10px] italic text-on-surface-variant">
                  Request the pleasure of your company
                </p>
              </div>
              <div className="space-y-1 rounded-lg bg-white/90 p-3 shadow-sm">
                <span className="text-[8px] font-semibold tracking-wider text-secondary uppercase">
                  The Weekend Schedule
                </span>
                <div className="flex justify-between text-[10px] font-semibold">
                  <span>Welcome Cocktails</span>
                  <span className="text-on-surface-variant">19:00</span>
                </div>
                <div className="flex justify-between text-[10px] font-semibold">
                  <span>The Sacred Vows</span>
                  <span className="text-on-surface-variant">16:00</span>
                </div>
              </div>
              <div className="pb-2 text-center">
                <span className="mb-2 block truncate text-[8px] font-semibold tracking-wider text-on-surface-variant">
                  momentkita.com/{slug || "your-invitation"}
                </span>
                <span className="block w-full bg-primary py-2 text-[9px] font-semibold text-white uppercase">
                  Guest RSVP Preview
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface-low px-4 py-2">
            <MonitorSmartphone
              aria-hidden
              size={15}
              className="text-secondary"
            />
            <span className="text-[9px] font-semibold tracking-wider uppercase">
              Zero coding required · Responsive preview
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
