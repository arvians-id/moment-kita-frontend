import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  MailCheck,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cardShell =
  "group overflow-hidden rounded-[16px] bg-surface-lowest shadow-md transition-all duration-300 hover:shadow-xl";

/** CARD 01 — tall portrait, printed atelier. */
export function MargaretCard() {
  return (
    <article className={cardShell}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eae5db]">
        <Image
          src="/images/marketing/copper-monogram-paper.png"
          alt="Margaret Elizabeth & Andrew James copper debossed monogram on deckle-edge cotton stationery"
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-surface-lowest/90 px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase backdrop-blur-sm">
            Printed Atelier
          </span>
          <span className="rounded-full bg-primary/90 px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase backdrop-blur-sm">
            Copper Foil
          </span>
        </div>
        <span className="absolute right-4 bottom-4 rounded-[6px] bg-surface/90 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
          600 GSM Cotton
        </span>
      </div>
      <div className="p-6 sm:p-8">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Heritage Monogram
          </span>
          <span className="text-[13px] leading-5 font-semibold">
            From Rp1.250.000 / set
          </span>
        </div>
        <h3 className="mb-2 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
          Margaret &amp; Andrew
        </h3>
        <p className="mb-6 text-[13px] leading-relaxed text-on-surface-variant">
          Timeless serif typography punctuated with an intertwined heirloom
          copper-foil crest. Hand-torn deckle edging with archival envelopes.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <span className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
            <span aria-hidden className="size-2 rounded-full bg-secondary" />
            Min. 50 Sets • 5 Paper Tones
          </span>
          <Link
            href="/printed"
            className="inline-flex items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors group-hover:text-secondary"
          >
            <span>View Details</span>
            <ArrowUpRight aria-hidden size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** CARD 02 — wide split, digital SaaS suite. */
export function MelinaCard() {
  return (
    <article className={cardShell}>
      <div className="grid h-full grid-cols-1 sm:grid-cols-12">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e4dc] sm:col-span-6 sm:aspect-auto">
          <Image
            src="/images/marketing/digital-invitation-phone.png"
            alt="Melina and Dayson digital wedding invitation displaying date and venue details on a phone"
            fill
            sizes="(min-width: 768px) 28vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase">
            Digital Suite
          </span>
          <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-2 rounded-[8px] bg-surface/90 p-2.5 backdrop-blur-md">
            <span className="flex items-center gap-2">
              <MailCheck aria-hidden size={18} className="text-secondary" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                Direct Link &amp; WhatsApp RSVP
              </span>
            </span>
            <Smartphone
              aria-hidden
              size={18}
              className="shrink-0 text-on-surface-variant"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between p-6 sm:col-span-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
                Digital Invitation Suite
              </span>
              <span aria-hidden className="text-xs text-on-surface-variant">
                •
              </span>
              <span className="text-xs font-semibold text-secondary">
                Instant Publish
              </span>
            </div>
            <h3 className="mb-3 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
              Melina &amp; Dayson
            </h3>
            <p className="mb-6 text-[13px] leading-relaxed text-on-surface-variant">
              Structured architectural lines, warm neutral beige accents, and
              fluid mobile interactions designed for discerning couples seeking
              seamless RSVP management.
            </p>
            <ul className="mb-6 space-y-2">
              {[
                "Interactive map pin for every venue",
                "Gifting details linked to chosen accounts",
                "Animated unfolding envelope",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-on-surface-variant"
                >
                  <Check
                    aria-hidden
                    size={16}
                    className="mt-px shrink-0 text-secondary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-serif text-[22px] leading-[30px] font-semibold">
                Rp499.000
              </span>
              <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
                One-Time License
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/templates/elegant-01"
                className="w-full rounded-[8px] bg-primary px-4 py-2.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                Preview Live
              </Link>
              <Link
                href="/register"
                aria-label="Save Melina & Dayson for later"
                className="rounded-[8px] bg-surface-container p-2.5 transition-colors hover:bg-accent"
              >
                <Bookmark aria-hidden size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** CARD 03 — wide flatlay, harmonized edition. */
export function EmilyCard() {
  return (
    <article className={cardShell}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#ded8cd]">
        <Image
          src="/images/marketing/garden-stationery-suite.png"
          alt="Emily & James stationery ensemble with sage silk ribbon, wax seal, and calligraphy on an olive branch table"
          fill
          sizes="(min-width: 768px) 56vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary-foreground uppercase">
            Harmonized Edition
          </span>
          <span className="rounded-full bg-surface-lowest/90 px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase">
            Silk Ribbon
          </span>
        </div>
        <span className="absolute bottom-4 left-4 rounded-[6px] bg-surface/95 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
          Physical + Digital Sync Included
        </span>
      </div>
      <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
              Botanical &amp; Raw Silk
            </span>
            <span aria-hidden className="text-xs text-on-surface-variant">
              •
            </span>
            <span className="text-[13px] leading-5 text-on-surface-variant">
              Edition 03
            </span>
          </div>
          <h3 className="mb-1 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
            Emily &amp; James
          </h3>
          <p className="max-w-md text-[13px] leading-5 text-on-surface-variant">
            Hand-dyed organic silk habotai ribbon with a botanical brass seal
            impression. Pairs seamlessly with its matching mobile unboxing
            invitation.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <span className="font-serif text-[22px] leading-[30px] font-semibold whitespace-nowrap">
            From Rp1.650.000 / set
          </span>
          <Link
            href="/contact"
            className="rounded-[8px] bg-primary px-5 py-2.5 text-center text-[12px] leading-4 font-semibold tracking-[0.12em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
          >
            Configure Suite
          </Link>
        </div>
      </div>
    </article>
  );
}

/** CARD 04 — tall portrait, full printed ensemble. */
export function SarahCard() {
  return (
    <article className={cardShell}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eeeae3]">
        <Image
          src="/images/marketing/hero-stationery-suite.png"
          alt="Sarah Elizabeth & James Alexander stationery suite with ranunculus florals and a custom envelope liner"
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-surface-lowest/90 px-3 py-1 text-[12px] leading-4 font-semibold tracking-[0.12em] text-secondary uppercase">
          Full Ensemble
        </span>
        <span className="absolute right-4 bottom-4 rounded-[4px] bg-primary px-3 py-1 font-mono text-xs text-primary-foreground">
          Foil Pressed
        </span>
      </div>
      <div className="p-6 sm:p-8">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Sonoma Floral Suite
          </span>
          <span className="text-[13px] leading-5 font-semibold whitespace-nowrap">
            From Rp1.450.000 / set
          </span>
        </div>
        <h3 className="mb-2 font-serif text-[28px] leading-9 font-medium tracking-[-0.01em]">
          Sarah &amp; James
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-on-surface-variant">
          Foil-pressed rose gold lettering nestled on deckled cotton, framed by
          ranunculus florals and a vintage illustrated floral envelope liner.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
            Includes RSVP &amp; Details Card
          </span>
          <Link
            href="/printed"
            className="flex items-center gap-1 text-[12px] leading-4 font-semibold tracking-[0.12em] uppercase transition-colors group-hover:text-secondary"
          >
            <span>Explore Specimen</span>
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
