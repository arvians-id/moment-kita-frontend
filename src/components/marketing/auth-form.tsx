"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const inputClass =
  "mt-2 w-full border border-border bg-surface-lowest px-4 py-3.5 text-sm outline-none transition-colors focus:border-secondary";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const isLogin = mode === "login";
  return (
    <form
      className="mt-8 grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus(
          `Preview only — ${isLogin ? "sign-in" : "account creation"} is not connected yet.`,
        );
      }}
    >
      {!isLogin ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-xs font-semibold tracking-wider uppercase">
            First name
            <input
              required
              name="firstName"
              autoComplete="given-name"
              className={inputClass}
            />
          </label>
          <label className="text-xs font-semibold tracking-wider uppercase">
            Last name
            <input
              required
              name="lastName"
              autoComplete="family-name"
              className={inputClass}
            />
          </label>
        </div>
      ) : null}
      <label className="text-xs font-semibold tracking-wider uppercase">
        Email address
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
        />
      </label>
      <label className="relative text-xs font-semibold tracking-wider uppercase">
        Password
        <input
          required
          minLength={8}
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete={isLogin ? "current-password" : "new-password"}
          className={`${inputClass} pr-12`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute bottom-3.5 right-3.5 text-on-surface-variant"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </label>
      {!isLogin ? (
        <label className="flex items-start gap-3 text-xs leading-5 text-on-surface-variant">
          <input required type="checkbox" className="mt-1" />I agree to continue
          with this frontend-only account preview.
        </label>
      ) : (
        <div className="flex items-center justify-between gap-4 text-xs">
          <label className="flex items-center gap-2 text-on-surface-variant">
            <input type="checkbox" />
            Remember me
          </label>
          <button
            type="button"
            onClick={() =>
              setStatus("Password recovery is not connected in this UI phase.")
            }
            className="text-secondary"
          >
            Forgot password?
          </button>
        </div>
      )}
      <button
        type="submit"
        className="bg-primary px-6 py-4 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-secondary"
      >
        {isLogin ? "Enter your studio" : "Create account"}
      </button>
      <button
        type="button"
        onClick={() =>
          setStatus(
            "Google sign-in is intentionally not implemented in this UI-only phase.",
          )
        }
        className="border border-border bg-surface-lowest px-6 py-4 text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-low"
      >
        Continue with Google
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
        {isLogin ? "New to Moment Kita?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-semibold text-secondary underline-offset-4 hover:underline"
        >
          {isLogin ? "Create Account" : "Log In"}
        </Link>
      </p>
    </form>
  );
}
