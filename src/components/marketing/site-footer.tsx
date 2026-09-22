import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/container";

const footerGroups = [
  {
    title: "Products",
    links: [
      { href: "/digital", label: "Digital Invitations" },
      { href: "/printed", label: "Printed & Fine Stationery" },
      { href: "/templates", label: "Curated Templates" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/pricing", label: "Investment & Pricing" },
      { href: "/features", label: "Interactive Features" },
      { href: "/how-it-works", label: "The Production Process" },
      { href: "/about", label: "Our Story" },
    ],
  },
  {
    title: "Concierge & Support",
    links: [
      { href: "/contact", label: "WhatsApp Direct" },
      { href: "/faq", label: "Frequently Answered" },
      { href: "/contact", label: "Book Consultation" },
      { href: "/login", label: "Client Log In" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "Moment Kita Maison" },
      { href: "/contact", label: "Contact & Inquiries" },
      { href: "/faq", label: "Digital Accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-low text-on-surface">
      <Container className="pb-8 pt-14 lg:pt-20">
        <div className="border-b border-border pb-12">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            The Moment Kita manifesto
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Two distinct expressions of love. One elevated wedding studio.
          </h2>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="font-serif text-xl">Moment Kita</p>
            <p className="mt-4 max-w-xs text-xs leading-6 text-on-surface-variant">
              A modern wedding studio pairing cloud-crafted guest journeys with
              tactile cotton-paper keepsakes.
            </p>
            <p className="mt-5 text-xs leading-6">
              Studio:
              <br />
              Jakarta · Digital Cloud
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] font-semibold tracking-[0.14em] uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-on-surface-variant">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-secondary"
                    >
                      {link.label === "WhatsApp Direct" ? (
                        <span className="inline-flex items-center gap-1.5">
                          <MessageCircle aria-hidden="true" size={12} />{" "}
                          {link.label}
                        </span>
                      ) : (
                        link.label
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-7 text-[10px] tracking-[0.08em] text-on-surface-variant uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Moment Kita Studio. All rights
            reserved.
          </p>
          <p>Jakarta — Crafted for celebrations everywhere</p>
        </div>
      </Container>
    </footer>
  );
}
