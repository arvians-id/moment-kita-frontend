import Link from "next/link";

import {
  FaqDirectory,
  type FaqGroup,
} from "@/components/marketing/faq-directory";
import {
  MarketingCta,
  MarketingPageHero,
} from "@/components/marketing/marketing-page";
import { Container } from "@/components/shared/container";

const groups: readonly FaqGroup[] = [
  {
    title: "Digital Invitations",
    items: [
      {
        question: "How do I edit wedding details after publishing?",
        answer:
          "Supported content can be revised after finalization. The invitation template and address remain locked for customer changes under the current lifecycle design.",
      },
      {
        question: "Can I switch templates without losing data?",
        answer:
          "Template switching after finalization is not promised. A template version is pinned so a published invitation remains compatible and visually stable.",
      },
      {
        question: "Can I connect a custom domain?",
        answer:
          "Custom domains are outside the MVP scope. Public invitations use the platform’s supported invitation URL.",
      },
      {
        question: "How long does hosting last?",
        answer:
          "Invitation availability follows the configured package duration beginning at first publish. We do not advertise lifetime hosting.",
      },
      {
        question: "How does RSVP work?",
        answer:
          "The planned experience records current guest responses and keeps response history, subject to the guest and invitation rules in the product architecture.",
      },
    ],
  },
  {
    title: "Printed Stationery",
    items: [
      {
        question: "What is the minimum order quantity?",
        answer:
          "Minimums depend on paper, print method, and finishing. The studio confirms a suitable quantity during consultation.",
      },
      {
        question: "What is the production timeline?",
        answer:
          "The timeline is set after specification and proofing. It includes design refinement, proof approval, press time, finishing, and delivery.",
      },
      {
        question: "Can we request a custom monogram?",
        answer:
          "Monogram direction can be discussed as part of a printed commission and is confirmed with the studio before production.",
      },
      {
        question: "Can we see paper samples?",
        answer:
          "Sampling availability is handled manually through the studio rather than through online checkout.",
      },
    ],
  },
  {
    title: "Payments & Packages",
    items: [
      {
        question: "How are digital packages activated?",
        answer:
          "This public frontend does not process payments. Production activation will follow confirmed transactions and entitlement rules from the backend.",
      },
      {
        question: "Can a digital package be upgraded?",
        answer:
          "Upgrade behavior will follow explicit package, transaction, and quota rules when backend integration is implemented.",
      },
      {
        question: "How are printed commissions paid?",
        answer:
          "Printed payment schedules are agreed manually with the studio as part of the commission.",
      },
    ],
  },
  {
    title: "Account & Support",
    items: [
      {
        question: "Can I create an account now?",
        answer:
          "The registration and login screens in this phase are UI demonstrations only. They do not create sessions or accounts.",
      },
      {
        question: "Is Google or Apple sign-in available?",
        answer: "No OAuth flow has been implemented in this phase.",
      },
      {
        question: "How do I contact the studio?",
        answer:
          "Use the public contact page to choose a digital, print, or general inquiry. The form is a frontend preview and does not transmit data yet.",
      },
    ],
  },
] as const;

export function FaqPage() {
  return (
    <>
      <MarketingPageHero
        kicker="04 — Clarity before ceremony"
        title={
          <>
            Questions, answered with <em className="text-secondary">care.</em>
          </>
        }
        description="Explore the practical details behind digital invitations, printed commissions, packages, and studio support."
        primary={{ href: "#questions", label: "Browse questions" }}
        secondary={{ href: "/contact", label: "Ask the studio" }}
      />
      <section id="questions" className="bg-surface-low py-20 sm:py-24">
        <Container>
          <FaqDirectory groups={groups} />
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-6 border-y border-border py-10 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Need a human answer?
            </p>
            <h2 className="mt-2 font-serif text-3xl">
              Some questions are better discussed.
            </h2>
          </div>
          <Link
            href="/contact"
            className="text-xs font-semibold tracking-[0.16em] uppercase"
          >
            Contact the studio →
          </Link>
        </Container>
      </section>
      <MarketingCta
        kicker="Still considering?"
        title="We’re here to make the next step feel clear."
        description="Tell us whether your question is digital, tactile, or somewhere beautifully between."
        primary={{ href: "/contact", label: "Send an inquiry" }}
        secondary={{ href: "/how-it-works", label: "See the process" }}
      />
    </>
  );
}
