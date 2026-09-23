import { BadgeCheck, ShieldCheck } from "lucide-react";

import type { EntitlementSummary, SignInMethod } from "@/types";

const signInLabel: Record<SignInMethod, string> = {
  password: "Email & Password",
  google: "Google",
};

export function ProfileSummaryCard({
  name,
  email,
  initials,
  avatarUrl,
  memberSince,
  signInMethod,
  entitlement,
  currentCoupleLabel,
  invitationCount,
}: {
  name: string;
  email: string;
  initials: string;
  avatarUrl?: string;
  memberSince: string;
  signInMethod: SignInMethod;
  entitlement: EntitlementSummary;
  currentCoupleLabel: string | null;
  invitationCount: number;
}) {
  return (
    <div className="bg-surface-low p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- client-side object URL preview, not a static asset
          <img
            src={avatarUrl}
            alt=""
            className="size-14 shrink-0 rounded-full object-cover shadow-sm"
          />
        ) : (
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-[16px] font-semibold text-primary-foreground">
            {initials}
          </span>
        )}
        <div className="min-w-0 leading-tight">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[16px] font-semibold text-on-surface">
              {name}
            </p>
            <BadgeCheck aria-hidden size={15} className="shrink-0 text-secondary" />
          </div>
          <p className="truncate text-[12px] text-on-surface-variant">{email}</p>
          <span className="mt-1.5 inline-block bg-secondary/15 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-secondary uppercase">
            {entitlement.packageName}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-surface-highest pt-3 text-[12px]">
        <Row label="Member Since" value={memberSince} />
        <Row
          label="Primary Wedding"
          value={currentCoupleLabel ?? "No invitation yet"}
        />
        <Row label="Sign-in Method" value={signInLabel[signInMethod]} />
        <Row
          label="Status"
          value={
            <span className="inline-flex items-center gap-1 font-medium text-secondary">
              <span aria-hidden className="size-1.5 rounded-full bg-secondary" />
              Verified Customer
            </span>
          }
        />
      </div>

      <div className="mt-4 flex items-center gap-2.5 bg-surface-container p-3">
        <ShieldCheck aria-hidden size={16} className="shrink-0 text-secondary" />
        <p className="text-[11px] leading-4 text-on-surface-variant">
          Active across {invitationCount}{" "}
          {invitationCount === 1 ? "invitation" : "invitations"}.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-on-surface-variant">{label}</span>
      <span className="truncate font-medium text-on-surface">{value}</span>
    </div>
  );
}
