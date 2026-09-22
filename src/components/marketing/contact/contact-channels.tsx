import {
  ArrowRight,
  BookOpenText,
  ExternalLink,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  PackageOpen,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

const whatsappHref =
  "https://wa.me/?text=Hello%20Moment%20Kita%2C%20I%20would%20like%20to%20discuss%20a%20wedding%20invitation.";

const channelLinkClass =
  "group flex min-h-12 items-center justify-between gap-3 bg-surface-container p-3 transition-colors hover:bg-surface-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

export function ContactChannels() {
  return (
    <div className="space-y-7">
      <section className="bg-surface-low p-6 shadow-sm sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            Inquiry categories
          </p>
          <span className="text-[10px] tracking-wider text-on-surface-variant uppercase">
            Direct access
          </span>
        </div>

        <div className="space-y-5">
          <article className="bg-surface-lowest p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <MonitorSmartphone
                aria-hidden
                size={18}
                className="text-secondary"
              />
              <h2 className="font-serif text-xl">Digital Product Support</h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-on-surface-variant">
              Assistance with templates, package guidance, invitation content,
              and guest-list preparation.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={channelLinkClass}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle aria-hidden size={17} />
                  <span>
                    <span className="block text-[10px] font-semibold tracking-wide uppercase">
                      WhatsApp Digital Concierge
                    </span>
                    <span className="block text-[11px] text-on-surface-variant">
                      Opens your preferred WhatsApp client
                    </span>
                  </span>
                </span>
                <ExternalLink aria-hidden size={14} />
              </a>
              <a
                href="mailto:support@nuance.wedding"
                className={channelLinkClass}
              >
                <span className="flex items-center gap-3">
                  <Mail aria-hidden size={17} />
                  <span>
                    <span className="block text-[10px] font-semibold tracking-wide uppercase">
                      support@nuance.wedding
                    </span>
                    <span className="block text-[11px] text-on-surface-variant">
                      Reference support address
                    </span>
                  </span>
                </span>
                <ArrowRight aria-hidden size={14} />
              </a>
            </div>
          </article>

          <article className="relative overflow-hidden bg-surface-lowest p-5 shadow-sm">
            <span className="absolute top-0 right-0 bg-accent px-2 py-1 text-[8px] font-semibold tracking-wider text-accent-foreground uppercase">
              Recommended for bespoke
            </span>
            <div className="flex items-center gap-2 pr-20">
              <ScrollText aria-hidden size={18} className="text-secondary" />
              <h2 className="font-serif text-xl">
                Printed Atelier Consultation
              </h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-on-surface-variant">
              Direct dialogue for tactile samples, bespoke crests, foil
              stamping, and deboss proofs.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-14 items-center justify-between gap-3 bg-primary p-3 text-white transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <span className="flex items-center gap-3">
                <MessageCircle aria-hidden size={18} />
                <span>
                  <span className="block text-[10px] font-semibold tracking-wider uppercase">
                    Direct Studio WhatsApp
                  </span>
                  <span className="block text-[11px] text-white/70">
                    Discuss samples and proofing
                  </span>
                </span>
              </span>
              <ExternalLink aria-hidden size={14} />
            </a>
            <p className="mt-2 px-1 text-[11px] leading-5 text-on-surface-variant">
              Prefer written correspondence? Submit the bespoke brief using the
              form opposite.
            </p>
          </article>

          <article className="bg-surface-lowest p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <BookOpenText aria-hidden size={18} className="text-secondary" />
              <h2 className="font-serif text-xl">General &amp; Alliances</h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-on-surface-variant">
              For editorial features, venue partnerships, wedding planners, and
              considered collaborations.
            </p>
            <a
              href="mailto:bonjour@nuance.wedding"
              className={`mt-4 ${channelLinkClass}`}
            >
              <span className="flex items-center gap-3">
                <Mail aria-hidden size={17} />
                <span className="text-[10px] font-semibold tracking-wide uppercase">
                  bonjour@nuance.wedding
                </span>
              </span>
              <ArrowRight aria-hidden size={14} />
            </a>
          </article>
        </div>
      </section>

      <section className="bg-surface-low p-6 shadow-sm sm:p-7">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
          Temporal rhythm
        </p>
        <h2 className="mt-1 font-serif text-xl">
          Studio Operating &amp; Concierge Hours
        </h2>
        <div className="mt-5 space-y-4">
          <div className="border-b border-border pb-4">
            <div className="flex items-center justify-between gap-3 text-[10px] font-semibold tracking-wide uppercase">
              <span>Jakarta Studio · WIB</span>
              <span className="text-secondary">Active</span>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Monday–Friday · 09:00–17:00 WIB
            </p>
            <p className="mt-1 text-xs text-on-surface-variant">
              Saturday · By private appointment
            </p>
          </div>
          <div className="border-b border-border pb-4">
            <div className="flex items-center justify-between gap-3 text-[10px] font-semibold tracking-wide uppercase">
              <span>Digital correspondence</span>
              <span className="text-on-surface-variant">Asynchronous</span>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Responses are handled during published studio hours.
            </p>
          </div>
          <div className="flex items-start gap-3 bg-surface-container p-3">
            <ShieldCheck
              aria-hidden
              size={17}
              className="mt-0.5 shrink-0 text-secondary"
            />
            <div>
              <p className="text-[10px] font-semibold tracking-wide uppercase">
                Weekend celebration note
              </p>
              <p className="mt-1 text-[11px] leading-5 text-on-surface-variant">
                Urgent support availability is confirmed directly for each
                active studio engagement.
              </p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-on-surface-variant uppercase">
              Studio location
            </p>
            <p className="mt-1 text-xs">Jakarta · Digital Cloud</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-high p-6 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-20 w-16 shrink-0 place-items-center bg-surface-lowest shadow-sm">
            <PackageOpen aria-hidden size={26} className="text-secondary" />
          </span>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
              Sample kit inquiries
            </p>
            <h2 className="mt-1 font-serif text-xl">
              The Monograph Swatch Box
            </h2>
            <p className="mt-1 text-xs leading-5 text-on-surface-variant">
              Experience tactile cotton weights, deckled borders, blind deboss
              textures, and foil stamping in person. Availability and pricing
              are confirmed manually by the studio.
            </p>
            <a
              href="#correspondence-form"
              className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase hover:text-secondary"
            >
              Request archival swatch box <ArrowRight aria-hidden size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
