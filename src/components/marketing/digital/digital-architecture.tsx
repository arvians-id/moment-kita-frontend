import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ImageIcon,
  Link2,
  LockKeyhole,
  MailCheck,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: BookOpen,
    title: "Choose Template",
    text: "Begin with an editorial design shaped for generous negative space, refined serif type, and a considered mobile viewport.",
    label: "Explore Library",
    href: "/templates",
  },
  {
    icon: CalendarDays,
    title: "Compose Event Details",
    text: "Add ceremonies, reception timing, attire guidance, accommodation notes, and the practical details guests need.",
    label: "Plan the Story",
    href: "/how-it-works",
  },
  {
    icon: ImageIcon,
    title: "Curate Memories",
    text: "Build a visual narrative with supported galleries and story chapters that feel personal without overwhelming the invitation.",
    label: "Visual Chapters",
    href: "/features",
  },
  {
    icon: Link2,
    title: "Set Your Invitation Link",
    text: "Choose a memorable supported Moment Kita invitation address that stays stable throughout the celebration lifecycle.",
    label: "Invitation Address",
    href: "/features",
  },
  {
    icon: LockKeyhole,
    title: "Review & Publish",
    text: "Check the complete guest experience, finalize deliberately, and publish only when every supported detail is ready.",
    label: "Privacy Controls",
    href: "/how-it-works",
  },
  {
    icon: MailCheck,
    title: "Manage Guest Logistics",
    text: "Keep attendance, dietary notes, wishes, and the details needed by your planning team in one composed workflow.",
    label: "Guest Management",
    href: "/features",
  },
] as const;

export function DigitalArchitecture() {
  return (
    <section className="bg-surface-low py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase sm:text-[11px]">
              02 — The Architecture
            </p>
            <h2 className="mt-2 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] sm:text-[40px] sm:leading-[1.2]">
              Effortless from conception{" "}
              <em className="font-normal">to celebration.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-on-surface-variant sm:text-[15px]">
            Six considered stages designed to remove logistical friction while
            preserving the feeling of a beautifully composed invitation.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, text, label, href }, index) => (
            <article
              key={title}
              className="flex min-h-[280px] flex-col justify-between bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon aria-hidden size={21} />
                </div>
                <h3 className="mt-4 font-serif text-[22px] font-semibold leading-7">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-5 text-on-surface-variant">
                  {text}
                </p>
              </div>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold tracking-wider uppercase transition-colors hover:text-secondary"
              >
                {label} <ArrowRight aria-hidden size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
