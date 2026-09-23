"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

import { NotificationPreferencesSection } from "@/components/customer/settings/notification-preferences-section";
import {
  ProfileSection,
  type ProfileFormValues,
} from "@/components/customer/settings/profile-section";
import { ProfileSummaryCard } from "@/components/customer/settings/profile-summary-card";
import { SecuritySection } from "@/components/customer/settings/security-section";
import { SettingsHeader } from "@/components/customer/settings/settings-header";
import { SettingsNav, type SettingsTab } from "@/components/customer/settings/settings-nav";
import { getInitials } from "@/components/customer/settings/settings-utils";
import type { SettingsOverview } from "@/types";

export function SettingsWorkspace({
  overview,
  initialTab = "profile",
}: {
  overview: SettingsOverview;
  initialTab?: SettingsTab;
}) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const [profile, setProfile] = useState<ProfileFormValues & { email: string }>({
    name: overview.customer.name,
    email: overview.customer.email,
    whatsappNumber: overview.profile.whatsappNumber,
    avatarUrl: overview.profile.avatarUrl,
  });
  const [notice, setNotice] = useState("");

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col pb-10">
      <SettingsHeader currentInvitation={overview.currentInvitation} />

      <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-12 lg:items-start">
        <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
          <SettingsNav active={activeTab} onChange={setActiveTab} />
          <ProfileSummaryCard
            name={profile.name}
            email={profile.email}
            initials={getInitials(profile.name)}
            avatarUrl={profile.avatarUrl}
            memberSince={overview.profile.memberSince}
            signInMethod={overview.security.signInMethod}
            entitlement={overview.entitlement}
            currentCoupleLabel={overview.currentInvitation?.coupleLabel ?? null}
            invitationCount={overview.invitationCount}
          />
        </div>

        <div className="lg:col-span-8">
          {activeTab === "profile" ? (
            <ProfileSection
              committed={profile}
              email={profile.email}
              onSave={(values) =>
                setProfile((current) => ({ ...current, ...values }))
              }
              onEmailChangeRequested={(newEmail) =>
                showNotice(
                  `Verification PIN sent to ${newEmail}. Confirm it from your inbox to finish changing your email.`,
                )
              }
            />
          ) : null}

          {activeTab === "security" ? (
            <SecuritySection
              security={overview.security}
              googleAccountEmail={overview.security.googleEmail ?? profile.email}
            />
          ) : null}

          {activeTab === "notifications" ? (
            <NotificationPreferencesSection
              initialPreferences={overview.notificationPreferences}
            />
          ) : null}
        </div>
      </div>

      {notice ? (
        <div
          role="status"
          className="fixed right-4 bottom-4 z-[90] flex max-w-sm items-start gap-2 bg-primary px-4 py-3 text-[11px] leading-5 font-medium text-primary-foreground shadow-xl sm:right-6 sm:bottom-6"
        >
          <Mail aria-hidden size={15} className="mt-0.5 shrink-0" />
          {notice}
        </div>
      ) : null}
    </div>
  );
}
