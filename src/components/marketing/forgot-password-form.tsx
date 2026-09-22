"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { authInputClass } from "@/components/marketing/auth-form";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState("");

  return (
    <form
      className="mt-8 grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus(
          "Preview only — password reset email delivery is not connected yet.",
        );
      }}
    >
      <label className="text-xs font-semibold tracking-wider uppercase">
        Email address
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className={authInputClass}
        />
      </label>
      <button
        type="submit"
        className="bg-primary px-6 py-4 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-secondary"
      >
        Send reset instructions
      </button>
      {status ? (
        <p
          role="status"
          className="border-l-2 border-secondary bg-surface-low px-4 py-3 text-xs leading-5"
        >
          {status}
        </p>
      ) : null}
      <p className="text-center text-sm text-on-surface-variant">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="inline-flex items-center gap-1 font-semibold text-secondary underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" size={13} />
          Back to Log In
        </Link>
      </p>
    </form>
  );
}
