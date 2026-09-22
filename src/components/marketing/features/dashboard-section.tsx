import {
  BarChart3,
  CheckCircle2,
  Download,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const capabilities = [
  { icon: Download, label: "Coordinator-ready guest and RSVP exports" },
  {
    icon: MessageCircle,
    label: "Clear links for time-sensitive guest updates",
  },
  { icon: ShieldCheck, label: "No advertising or sale of guest data" },
] as const;

export function DashboardSection() {
  return (
    <section
      id="couple-dashboard"
      className="my-7 scroll-mt-20 bg-[#121110] py-12 text-[#fcf9f3] sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-[#ffb59c] uppercase sm:text-[11px]">
              <span className="size-2 rounded-full bg-secondary" />
              05 — Host Control Center
            </p>
            <h2 className="font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] text-white sm:text-[40px] sm:leading-[1.2]">
              Control your entire celebration from your phone with quiet
              clarity.
            </h2>
            <p className="text-sm leading-6 text-[#c8c6c5] sm:text-[15px]">
              The couple’s backstage studio keeps responses, dietary notes, and
              important guest information composed in one place.
            </p>
            <div className="space-y-3 pt-1">
              {capabilities.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 text-[13px]"
                >
                  <Icon
                    aria-hidden
                    size={18}
                    className="shrink-0 text-[#ffb59c]"
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/register"
              className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-secondary px-6 py-3 text-[10px] font-semibold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
            >
              Open Your Backstage Studio
            </Link>
          </div>

          <div className="rounded-2xl bg-[#1c1a18] p-4 shadow-2xl sm:p-7 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-secondary text-white">
                  <BarChart3 aria-hidden size={16} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-white uppercase">
                    Moment Kita Live Overview
                  </p>
                  <p className="text-[10px] text-[#9f9c97]">
                    Melina &amp; Dayson • Villa Cimbrone
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded bg-[#2a2825] px-3 py-1 text-[9px] font-semibold uppercase transition-colors hover:bg-secondary"
                >
                  Export CSV
                </button>
                <button
                  type="button"
                  className="rounded bg-[#2a2825] px-3 py-1 text-[9px] font-semibold uppercase transition-colors hover:bg-secondary"
                >
                  Print
                </button>
              </div>
            </div>

            <div className="my-4 grid gap-3 sm:grid-cols-3">
              {[
                [
                  "Attendance Rate",
                  "94.6%",
                  "142 of 150 confirmed",
                  "text-emerald-400",
                ],
                [
                  "Dietary Requests",
                  "24",
                  "12 GF, 8 Vegan, 4 Allergies",
                  "text-[#ffb59c]",
                ],
                [
                  "Guest Wishes",
                  "86",
                  "New messages collected",
                  "text-emerald-400",
                ],
              ].map(([label, value, detail, color]) => (
                <div
                  key={label}
                  className="flex flex-col rounded-xl bg-[#24211e] p-4"
                >
                  <span className="text-[9px] font-semibold tracking-wider text-[#9f9c97] uppercase">
                    {label}
                  </span>
                  <span className="mt-1 font-serif text-2xl text-white">
                    {value}
                  </span>
                  <span className={`mt-1 text-[10px] ${color}`}>{detail}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-[#24211e] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-semibold tracking-wider text-white uppercase">
                  Live RSVP Attendance Progress
                </span>
                <span className="text-[9px] font-semibold tracking-wider text-[#ffb59c] uppercase">
                  Final Deadline: 14 Days
                </span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#181615]">
                <span
                  className="h-full w-[82%] bg-emerald-500"
                  title="Attending"
                />
                <span className="h-full w-[12%] bg-amber-500" title="Pending" />
                <span className="h-full w-[6%] bg-rose-500" title="Declined" />
              </div>
              <div className="flex flex-wrap justify-between gap-3 text-[10px] text-[#9f9c97]">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  124 Attending
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-amber-500" />
                  18 Pending
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-500" />8 Declined
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#24211e] p-3">
              <div className="flex items-center gap-3">
                <MessageCircle
                  aria-hidden
                  size={18}
                  className="text-emerald-400"
                />
                <div>
                  <p className="text-[10px] font-semibold text-white uppercase">
                    Guest Update Center
                  </p>
                  <p className="text-[9px] text-[#9f9c97]">
                    Keep the latest schedule and venue details together
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[9px] text-emerald-400">
                <CheckCircle2 aria-hidden size={12} /> Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
