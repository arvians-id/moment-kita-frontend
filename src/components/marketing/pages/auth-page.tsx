import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AuthForm } from "@/components/marketing/auth-form";
import { ForgotPasswordForm } from "@/components/marketing/forgot-password-form";

export type AuthMode = "login" | "register" | "forgot-password";

const copy = {
  login: {
    image: "/images/marketing/sunlit-stationery-table.png",
    asideKicker: "Client studio",
    asideTitle: "Return to the details that make it yours.",
    eyebrow: "Member authentication",
    title: "Welcome back.",
    description:
      "Enter the client studio UI. Authentication and account recovery are intentionally not connected yet.",
  },
  register: {
    image: "/images/marketing/hero-stationery-suite.png",
    asideKicker: "Your story begins",
    asideTitle: "Create a quiet home for your celebration.",
    eyebrow: "Create your studio account",
    title: "Begin your invitation.",
    description:
      "Set up the shape of an account without creating a real user, session, or entitlement.",
  },
  "forgot-password": {
    image: "/images/marketing/sunlit-stationery-table.png",
    asideKicker: "Account recovery",
    asideTitle: "We will help you back to your celebration.",
    eyebrow: "Account recovery",
    title: "Forgot Password",
    description:
      "Enter the email address on your studio account and we will show you what the recovery step will look like. Password reset delivery is not connected yet.",
  },
} as const satisfies Record<
  AuthMode,
  {
    image: string;
    asideKicker: string;
    asideTitle: string;
    eyebrow: string;
    title: string;
    description: string;
  }
>;

export function AuthPage({ mode }: { mode: AuthMode }) {
  const content = copy[mode];

  return (
    <section className="grid min-h-[760px] lg:grid-cols-2">
      <div className="relative hidden min-h-full overflow-hidden bg-espresso lg:block">
        <Image
          src={content.image}
          alt="Moment Kita wedding stationery"
          fill
          priority
          className="object-cover opacity-65"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white xl:p-16">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-terracotta-soft uppercase">
            {content.asideKicker}
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-5xl leading-tight">
            {content.asideTitle}
          </h2>
          <div className="mt-8 flex items-center gap-3 text-xs text-white/70">
            <LockKeyhole size={15} aria-hidden /> UI preview · no credentials
            are transmitted
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-surface px-5 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-lg">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-secondary uppercase">
            {content.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">
            {content.description}
          </p>
          {mode === "forgot-password" ? (
            <ForgotPasswordForm />
          ) : (
            <AuthForm mode={mode} />
          )}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1 font-semibold tracking-wider uppercase"
            >
              How it works <ArrowUpRight size={13} />
            </Link>
            <Link href="/contact" className="text-secondary">
              Need concierge assistance?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
