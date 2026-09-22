"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const authInputClass =
  "mt-2 w-full border border-border bg-surface-lowest px-4 py-3.5 text-sm outline-none transition-colors focus:border-secondary";

/** Indonesia is the only supported dialling code in this phase. */
const DIAL_CODE = "+62";

/**
 * Keeps the field to the local part of an Indonesian mobile number so the
 * visible `+62` prefix is never duplicated: digits only, a pasted `62` country
 * code removed, and the `0` trunk prefix dropped (0821… becomes 821…).
 */
function toLocalPhoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (/^62(?=0?8)/.test(digits)) digits = digits.slice(2);
  digits = digits.replace(/^0+/, "");
  return digits.slice(0, 12);
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
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
              className={authInputClass}
            />
          </label>
          <label className="text-xs font-semibold tracking-wider uppercase">
            Last name
            <input
              required
              name="lastName"
              autoComplete="family-name"
              className={authInputClass}
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
          className={authInputClass}
        />
      </label>
      {!isLogin ? (
        <div className="text-xs font-semibold tracking-wider uppercase">
          <label htmlFor="phoneLocal">Phone number</label>
          <div className="mt-2 flex w-full items-stretch border border-border bg-surface-lowest transition-colors focus-within:border-secondary">
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center pr-3 pl-4 text-sm font-normal tracking-normal text-on-surface-variant normal-case"
            >
              {DIAL_CODE}
            </span>
            <span aria-hidden="true" className="my-2.5 w-px bg-border" />
            <input
              required
              id="phoneLocal"
              name="phoneLocal"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="82212345678"
              pattern="8[0-9]{7,11}"
              title="Enter the number after +62, for example 82212345678"
              aria-describedby="phone-hint"
              value={phone}
              onChange={(event) =>
                setPhone(toLocalPhoneDigits(event.target.value))
              }
              className="w-full bg-transparent px-3 py-3.5 text-sm font-normal tracking-normal normal-case outline-none placeholder:text-on-surface-variant/55"
            />
          </div>
          <input
            type="hidden"
            name="phone"
            value={phone ? `${DIAL_CODE}${phone}` : ""}
          />
          <p
            id="phone-hint"
            className="mt-2 text-[11px] font-normal tracking-normal text-on-surface-variant normal-case"
          >
            {DIAL_CODE} is already added — enter the rest of your number.
          </p>
        </div>
      ) : null}
      <label className="relative text-xs font-semibold tracking-wider uppercase">
        Password
        <input
          required
          minLength={8}
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete={isLogin ? "current-password" : "new-password"}
          className={`${authInputClass} pr-12`}
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
          <Link href="/forgot-password" className="text-secondary">
            Forgot password?
          </Link>
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
