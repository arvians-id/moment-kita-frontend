"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { AdminProfileSection } from "@/components/admin/settings/admin-profile-section";
import { GeneralSettingsSection } from "@/components/admin/settings/general-settings-section";
import { NotificationSettingsSection } from "@/components/admin/settings/notification-settings-section";
import {
  AdminSettingsNav,
  type AdminSettingsTab,
} from "@/components/admin/settings/settings-nav";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type { AdminSettingsData } from "@/types";

export function AdminSettingsWorkspace({ data }: { data: AdminSettingsData }) {
  const [activeTab, setActiveTab] = useState<AdminSettingsTab>("general");
  const [notice, setNotice] = useState("");

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3600);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 pb-10 lg:gap-10">
      <AdminPageHeader
        eyebrow="System · Configuration & Preferences"
        title="Settings"
        description="Manage platform identity, operational contact information, notification preferences, and the current administrator profile."
      />

      <div className="space-y-3">
        <AdminSettingsNav active={activeTab} onChange={setActiveTab} />
        <p className="inline-flex items-center gap-2 text-[10px] leading-4 text-on-surface-variant">
          <ShieldCheck aria-hidden size={14} className="text-secondary" />
          Scoped to this frontend mock; no infrastructure, secret, or
          environment controls are exposed.
        </p>
      </div>

      <div role="tabpanel">
        {activeTab === "general" ? (
          <GeneralSettingsSection
            initial={data.general}
            onNotice={showNotice}
          />
        ) : null}
        {activeTab === "profile" ? (
          <AdminProfileSection initial={data.account} onNotice={showNotice} />
        ) : null}
        {activeTab === "notifications" ? (
          <NotificationSettingsSection
            initial={data.notificationPreferences}
            onNotice={showNotice}
          />
        ) : null}
      </div>

      {notice ? (
        <div
          role="status"
          className="fixed right-4 bottom-4 z-[90] flex max-w-sm items-start gap-2 bg-primary px-4 py-3 text-[11px] leading-5 font-medium text-primary-foreground shadow-xl sm:right-6 sm:bottom-6"
        >
          <CheckCircle2 aria-hidden size={15} className="mt-0.5 shrink-0" />
          {notice}
        </div>
      ) : null}
    </div>
  );
}
