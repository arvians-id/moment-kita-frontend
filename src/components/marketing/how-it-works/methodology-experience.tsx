"use client";

import {
  MailCheck,
  MessageCircle,
  QrCode,
  RefreshCw,
  Send,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  ProcessStepCard,
  type ProcessStep,
} from "@/components/marketing/how-it-works/process-step-card";
import { Container } from "@/components/shared/container";

type MethodologyView = "digital" | "printed" | "harmonized";

const digitalSteps: readonly ProcessStep[] = [
  {
    number: "01",
    badge: "Curated",
    phase: "Selection",
    title: "Explore Curated Designs",
    description:
      "Browse an editorial archive shaped for modern celebrations, then choose the typography, pacing, and atmosphere that feels most like your story.",
    image: {
      src: "/images/marketing/digital-invitation-phone.png",
      alt: "Digital wedding invitation displayed on a phone",
    },
  },
  {
    number: "02",
    badge: "Interactive",
    phase: "Simulation",
    title: "Realtime Interactive Preview",
    description:
      "Test the guest experience directly in your browser across screen sizes, including motion, music, schedules, and sample RSVP interactions.",
    detail: "Ambient soundtrack preview",
    detailEnd: "Live test",
  },
  {
    number: "03",
    badge: "Private",
    phase: "Onboarding",
    title: "Seamless Studio Registration",
    description:
      "Create your Moment Kita account and enter a private workspace where invitation content, guests, and publishing state stay together.",
    detail: "Protected invitation workspace",
    detailEnd: "Secure",
  },
  {
    number: "04",
    badge: "Live Synced",
    phase: "Editorial Studio",
    title: "Customize Your Celebration",
    description:
      "Compose event schedules, imagery, color, gifts, RSVP questions, and the words that make the invitation distinctly yours.",
    detail: "Edits move with your live preview",
    detailEnd: "Synced",
  },
  {
    number: "05",
    badge: "Personal URL",
    phase: "Address",
    title: "Reserve Your Bespoke URL",
    description:
      "Choose a memorable Moment Kita address for your celebration. The selected slug stays with the invitation once it is finalized.",
    detail: "momentkita.com/sophia-alex",
    detailEnd: "Reserved",
  },
  {
    number: "06",
    badge: "Publish Ready",
    phase: "Publishing",
    title: "Instant Cloud Publishing",
    description:
      "Finalize with confidence, publish when you are ready, and give guests a responsive invitation designed to feel considered on every device.",
    detail: "Invitation status: ready",
    detailEnd: "Global",
  },
  {
    number: "07",
    badge: "Guest Ready",
    phase: "Delivery",
    title: "Seamless Guest Distribution",
    description:
      "Share your invitation through personal guest links, WhatsApp, messages, email, or a QR code prepared for printed announcements.",
    icons: [MessageCircle, QrCode, Send, MailCheck],
  },
  {
    number: "08",
    badge: "Live Responses",
    phase: "Intelligence",
    title: "Live RSVP & Dietary Matrix",
    description:
      "Follow attendance, meal choices, wishes, and guest updates from one calm workspace as replies arrive.",
    detail: "RSVP responses gathered",
    detailEnd: "Export",
  },
];

const printedSteps: readonly ProcessStep[] = [
  {
    number: "01",
    badge: "Archive",
    phase: "Aesthetic Inception",
    title: "Explore the Archival Collection",
    description:
      "Discover physical stationery directions through paper, proportion, typography, botanical detail, and the quiet character of each suite.",
    image: {
      src: "/images/marketing/garden-stationery-suite.png",
      alt: "Artisan wedding stationery suite with wax seals and ribbon",
    },
  },
  {
    number: "02",
    badge: "Materiality",
    phase: "Substrates",
    title: "Select Paper Stock & Finish Foundation",
    description:
      "Compare substantial cotton papers, deckled edges, metallic foil tones, and the sculptural depth of blind deboss impressions.",
    image: {
      src: "/images/marketing/copper-monogram-paper.png",
      alt: "Textured cotton paper with a copper-foil monogram",
    },
  },
  {
    number: "03",
    badge: "Concierge",
    phase: "Human Guidance",
    title: "Dedicated WhatsApp Dialogue",
    description:
      "Share quantity, venue, timing, and references directly with the studio so every early decision has thoughtful context.",
    detail: "Direct studio conversation",
    detailEnd: "WhatsApp",
  },
  {
    number: "04",
    badge: "Artistry",
    phase: "Typographic Proofs",
    title: "Bespoke Monograms & Proofing",
    description:
      "Refine intertwined initials, suite hierarchy, wording, and press details through precise digital proofs before production begins.",
    detail: "Scale-aware digital proofing",
    detailEnd: "Refine",
  },
  {
    number: "05",
    badge: "Commitment",
    phase: "Confirmation",
    title: "Commission Confirmation & Deposit",
    description:
      "Approve the final specification and itemized studio proposal. Your confirmed deposit begins material preparation and production scheduling.",
    detail: "Deposit begins the commission",
    detailEnd: "Confirmed",
  },
  {
    number: "06",
    badge: "Craft",
    phase: "Production",
    title: "Artisan Letterpress & Foil Pressing",
    description:
      "Each suite is pressed, finished, and inspected in considered stages for impression, registration, paper edge, and tonal consistency.",
    detail: "Press, finish, and inspection",
    detailEnd: "Atelier",
  },
  {
    number: "07",
    badge: "Presentation",
    phase: "Delivery",
    title: "White-Glove Heirloom Delivery",
    description:
      "Finished stationery is assembled with archival care, protected for transit, and sent with tracked delivery so it arrives ready to become part of your celebration.",
    detail: "Tracked transit",
    detailEnd: "Carefully packed for arrival",
    icons: [Truck],
    featured: true,
  },
];

const viewOptions: readonly {
  id: MethodologyView;
  label: string;
  note?: string;
}[] = [
  {
    id: "digital",
    label: "Digital Invitation Suite",
    note: "Cloud & realtime",
  },
  {
    id: "printed",
    label: "Artisan Printed Atelier",
    note: "Handcrafted paper",
  },
  { id: "harmonized", label: "View Harmonized" },
];

function ProcessHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end lg:pb-12">
      <div className="max-w-3xl">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
          {kicker}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-primary sm:text-4xl lg:text-[56px] lg:leading-[1.12]">
          {title}
        </h2>
      </div>
      <p className="max-w-md text-sm leading-7 text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}

function SectionCta({
  kicker,
  title,
  description,
  features,
  primary,
  secondary,
}: {
  kicker: string;
  title: string;
  description: string;
  features: readonly string[];
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <div className="mt-12 flex flex-col justify-between gap-8 rounded-xl bg-surface-low p-7 shadow-sm lg:flex-row lg:items-center lg:p-12">
      <div className="max-w-2xl">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
          {kicker}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-primary sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-2 text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase"
            >
              <span className="size-1.5 rounded-full bg-secondary" />
              {feature}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <Link
          href={primary.href}
          className="inline-flex min-h-12 items-center justify-center bg-primary px-7 text-center text-[10px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-secondary"
        >
          {primary.label}
        </Link>
        <Link
          href={secondary.href}
          className="inline-flex min-h-12 items-center justify-center bg-surface-lowest px-7 text-center text-[10px] font-semibold tracking-[0.12em] text-primary uppercase transition-colors hover:bg-surface-container"
        >
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}

export function MethodologyExperience() {
  const [selectedView, setSelectedView] = useState<MethodologyView | null>(
    null,
  );
  const showDigital = selectedView !== "printed";
  const showPrinted = selectedView !== "digital";

  return (
    <>
      <section className="py-14 sm:py-16 lg:py-20">
        <Container className="flex max-w-5xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-4 py-2 shadow-sm">
            <span className="size-1.5 rounded-full bg-secondary" />
            <span className="text-[9px] font-semibold tracking-[0.18em] text-secondary uppercase sm:text-[10px]">
              05 — The Moment Kita methodology
            </span>
          </div>
          <h1 className="mt-6 font-serif text-[44px] leading-[1.08] tracking-[-0.025em] text-primary sm:text-6xl lg:text-[84px]">
            From idea to{" "}
            <em className="font-normal text-secondary">invitation.</em>
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-on-surface-variant sm:text-base sm:leading-8 lg:text-lg">
            Two elevated paths to announcing your celebration. Choose a
            considered digital guest journey, a tactile stationery commission,
            or let both expressions move together.
          </p>
          <div
            className="mt-10 flex w-full max-w-3xl flex-col gap-1.5 rounded-[28px] bg-surface-container p-1.5 shadow-sm sm:w-auto sm:flex-row sm:rounded-full"
            role="tablist"
            aria-label="Invitation methodology"
          >
            {viewOptions.map((option) => {
              const isSelected =
                selectedView === option.id ||
                (selectedView === null && option.id === "digital");
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedView(option.id)}
                  className={`flex min-h-14 items-center justify-center gap-3 rounded-full px-5 text-left transition-colors sm:justify-start ${isSelected ? "bg-primary text-white" : "text-on-surface-variant hover:text-primary"}`}
                >
                  <span className="flex flex-col">
                    <span className="text-[9px] font-semibold tracking-[0.13em] uppercase sm:text-[10px]">
                      {option.label}
                    </span>
                    {option.note ? (
                      <span
                        className={`mt-0.5 text-[9px] ${isSelected ? "text-white/60" : "text-on-surface-variant/70"}`}
                      >
                        {option.note}
                      </span>
                    ) : null}
                  </span>
                  {option.id === "harmonized" ? (
                    <RefreshCw aria-hidden size={14} />
                  ) : (
                    <span
                      className={`size-2 rounded-full ${isSelected ? "bg-terracotta-soft" : "bg-transparent"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {showDigital ? (
        <section className="pb-24 lg:pb-32" id="digital-process">
          <Container>
            <ProcessHeader
              kicker="Discipline 01 / Cloud architecture"
              title="Effortless elegance, deployed in minutes."
              description="A calm browser workflow for contemporary couples, from first template to responsive guest experience, live replies, and a shareable celebration address."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {digitalSteps.map((step) => (
                <ProcessStepCard key={step.number} step={step} />
              ))}
            </div>
            <SectionCta
              kicker="Zero setup anxiety"
              title="Ready to begin your digital invitation?"
              description="Shape the complete guest experience at your own pace, with the visual direction resolved before you publish."
              features={[
                "One considered workspace",
                "Responsive guest preview",
                "Studio-ready templates",
              ]}
              primary={{
                href: "/templates",
                label: "Explore digital templates",
              }}
              secondary={{ href: "/register", label: "Create your invitation" }}
            />
          </Container>
        </section>
      ) : null}

      {showPrinted ? (
        <section className="pb-24 lg:pb-32" id="printed-process">
          <Container>
            <ProcessHeader
              kicker="Discipline 02 / Tactile letterpress"
              title="Bespoke tactile craftsmanship, guided by human dialogue."
              description="Substantial cotton papers, considered proofing, and artisan finishing come together through a consultation-led studio commission."
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {printedSteps.map((step) => (
                <ProcessStepCard key={step.number} step={step} />
              ))}
            </div>
            <SectionCta
              kicker="Bespoke production"
              title="Commission your heirloom stationery."
              description="Speak with the studio about paper, quantities, timing, and the tactile direction you imagine for your celebration."
              features={[
                "Consultation-led proofing",
                "Archival cotton stocks",
                "Tracked studio delivery",
              ]}
              primary={{ href: "/contact", label: "Consult with the studio" }}
              secondary={{
                href: "/printed",
                label: "Explore printed stationery",
              }}
            />
          </Container>
        </section>
      ) : null}
    </>
  );
}
