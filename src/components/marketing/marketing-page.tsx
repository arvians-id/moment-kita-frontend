import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { EditorialHeading } from "@/components/marketing/editorial-heading";
import { Section } from "@/components/marketing/section";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  kicker: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  dark?: boolean;
}

export function MarketingPageHero({
  kicker,
  title,
  description,
  image,
  imageAlt = "",
  primary,
  secondary,
  dark = false,
}: PageHeroProps) {
  return (
    <section
      className={cn("overflow-hidden", dark && "bg-espresso text-white")}
    >
      <Container
        className={cn(
          "grid min-h-[620px] items-stretch gap-0 px-0 lg:grid-cols-2 lg:px-14",
          !image && "lg:grid-cols-1",
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-0 lg:py-28",
            image && "lg:pr-16",
          )}
        >
          <p className="text-[10px] font-semibold tracking-[0.22em] text-secondary uppercase">
            {kicker}
          </p>
          <h1
            className={cn(
              "mt-5 max-w-4xl font-serif text-5xl leading-[1.03] tracking-[-0.035em] sm:text-6xl lg:text-[5.25rem]",
              dark ? "text-white" : "text-primary",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-7 max-w-xl text-base leading-8",
              dark ? "text-white/65" : "text-on-surface-variant",
            )}
          >
            {description}
          </p>
          {primary || secondary ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {primary ? (
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    dark && "bg-champagne text-espresso hover:bg-white",
                  )}
                >
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight aria-hidden size={15} />
                  </Link>
                </Button>
              ) : null}
              {secondary ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className={cn(
                    dark &&
                      "border-white/25 text-white hover:bg-white hover:text-espresso",
                  )}
                >
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
        {image ? (
          <div className="relative min-h-[420px] overflow-hidden bg-surface-container lg:min-h-full">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

interface EditorialSectionProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
}

export function EditorialSection({
  kicker,
  title,
  description,
  children,
  className,
  headingClassName,
}: EditorialSectionProps) {
  return (
    <Section className={className}>
      <Container>
        <EditorialHeading
          kicker={kicker}
          title={title}
          description={description}
          className={cn("max-w-3xl", headingClassName)}
        />
        <div className="mt-10 lg:mt-14">{children}</div>
      </Container>
    </Section>
  );
}

interface MarketingCtaProps {
  kicker: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}

export function MarketingCta({
  kicker,
  title,
  description,
  primary,
  secondary,
}: MarketingCtaProps) {
  return (
    <section className="bg-espresso py-20 text-center text-white sm:py-24">
      <Container>
        <p className="text-[10px] font-semibold tracking-[0.22em] text-terracotta-soft uppercase">
          {kicker}
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-champagne text-espresso hover:bg-white"
          >
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight aria-hidden size={15} />
            </Link>
          </Button>
          {secondary ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white hover:text-espresso"
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function NumberedCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="border-t border-border bg-surface-lowest p-6 sm:p-8">
      <span className="font-serif text-2xl italic text-secondary">
        {number}
      </span>
      <h3 className="mt-8 font-serif text-2xl leading-tight">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-on-surface-variant">
        {children}
      </div>
    </article>
  );
}
