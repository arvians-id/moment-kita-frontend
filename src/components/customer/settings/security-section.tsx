"use client";

import {
  KeyRound,
  Laptop,
  LogOut,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { SectionIntro } from "@/components/customer/settings/profile-section";
import { ChangePasswordDialog } from "@/components/customer/settings/settings-dialogs";
import { cn } from "@/lib/utils";
import type { AccountSession, CustomerSecurity } from "@/types";

export function SecuritySection({
  security,
  googleAccountEmail,
}: {
  security: CustomerSecurity;
  googleAccountEmail: string;
}) {
  const [sessions, setSessions] = useState<AccountSession[]>(security.sessions);
  const [passwordUpdatedLabel, setPasswordUpdatedLabel] = useState(
    security.passwordUpdatedLabel,
  );
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notice, setNotice] = useState("");

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function handleSignOutOthers() {
    setSessions((current) =>
      current.filter((session) => session.isCurrentDevice),
    );
    showNotice("All other devices have been securely signed out.");
  }

  return (
    <section className="space-y-5">
      <SectionIntro
        eyebrow="02 — Security"
        title="Account & Security"
        description="Manage your sign-in method, password, and currently authorized sessions."
      />

      {/* Sign-in method */}
      <div className="bg-surface-low p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center bg-surface-highest text-on-surface">
              {security.signInMethod === "google" ? (
                <GoogleMonogram />
              ) : (
                <KeyRound aria-hidden size={18} />
              )}
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-[15px] leading-5 font-semibold text-on-surface">
                  {security.signInMethod === "google"
                    ? "Google Sign-In Connected"
                    : "Email & Password"}
                </p>
                <span className="bg-surface-highest px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-secondary uppercase">
                  Active
                </span>
              </div>
              <p className="max-w-md text-[12px] leading-5 text-on-surface-variant">
                {security.signInMethod === "google" ? (
                  <>
                    Authenticated through{" "}
                    <span className="font-medium text-on-surface">
                      {googleAccountEmail}
                    </span>
                    . You can also set a password below as a backup sign-in
                    method.
                  </>
                ) : (
                  "You sign in with your email address and password."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="space-y-4 bg-surface-low p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase">
              Password
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[15px] tracking-widest text-on-surface">
                ••••••••••••
              </span>
              <span className="text-[11px] text-on-surface-variant">
                {passwordUpdatedLabel}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPasswordDialogOpen(true)}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start bg-secondary px-4 text-[11px] font-semibold tracking-[0.08em] text-secondary-foreground uppercase transition-colors hover:bg-primary hover:text-primary-foreground sm:self-auto"
          >
            <KeyRound aria-hidden size={15} />
            {security.hasPassword ? "Change Password" : "Set Password"}
          </button>
        </div>
      </div>

      {/* Sessions */}
      <div className="space-y-4 bg-surface-low p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase">
              Active Sessions
            </p>
            <p className="text-[12px] text-on-surface-variant">
              Devices currently signed in with your account.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "flex items-center justify-between gap-4 p-3.5 shadow-sm",
                session.isCurrentDevice
                  ? "bg-surface-container"
                  : "bg-surface-lowest",
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center bg-surface-highest text-on-surface-variant">
                  {session.device.toLowerCase().includes("phone") ||
                  session.device.toLowerCase().includes("iphone") ? (
                    <Smartphone aria-hidden size={18} />
                  ) : (
                    <Laptop aria-hidden size={18} />
                  )}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-[13px] font-semibold text-on-surface">
                      {session.device}
                    </p>
                    {session.isCurrentDevice ? (
                      <span className="bg-secondary/15 px-1.5 py-0.5 text-[8px] font-bold tracking-[0.1em] text-secondary uppercase">
                        This device
                      </span>
                    ) : null}
                  </div>
                  <p className="truncate text-[11px] text-on-surface-variant">
                    {session.location} &middot; {session.lastActiveLabel}
                  </p>
                </div>
              </div>
              {session.isCurrentDevice ? (
                <span
                  aria-hidden
                  className="size-2 shrink-0 rounded-full bg-secondary"
                />
              ) : (
                <span className="shrink-0 text-[11px] text-on-surface-variant">
                  Valid
                </span>
              )}
            </div>
          ))}
        </div>

        {sessions.length > 1 ? (
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[12px] leading-5 text-on-surface-variant">
              If you suspect unauthorized access, you can sign out every device
              except this one.
            </p>
            <button
              type="button"
              onClick={handleSignOutOthers}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 bg-surface-highest px-4 text-[11px] font-semibold tracking-[0.08em] text-on-surface uppercase transition-colors hover:bg-surface-container"
            >
              <LogOut aria-hidden size={15} />
              Sign Out Other Devices
            </button>
          </div>
        ) : null}
      </div>

      {passwordDialogOpen ? (
        <ChangePasswordDialog
          onClose={() => setPasswordDialogOpen(false)}
          onSubmitted={() => {
            setPasswordDialogOpen(false);
            setPasswordUpdatedLabel("Updated just now");
            showNotice("Password updated successfully.");
          }}
        />
      ) : null}

      {notice ? (
        <div
          role="status"
          className="fixed right-4 bottom-4 z-[90] flex items-center gap-2 bg-primary px-4 py-3 text-[11px] font-medium text-primary-foreground shadow-xl sm:right-6 sm:bottom-6"
        >
          <ShieldCheck aria-hidden size={15} />
          {notice}
        </div>
      ) : null}
    </section>
  );
}

function GoogleMonogram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}
