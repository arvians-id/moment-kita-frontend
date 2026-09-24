"use client";

import {
  BellRing,
  CircleDollarSign,
  MailWarning,
  MessageSquareText,
  Printer,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import {
  SettingsFormActions,
  SettingsSectionIntro,
  SettingsToggle,
} from "@/components/admin/settings/settings-primitives";
import type {
  AdminSettingsNotificationCategory,
  AdminSettingsNotificationPreference,
} from "@/types";

const icons: Record<AdminSettingsNotificationCategory, LucideIcon> = {
  payments: CircleDollarSign,
  invitations: MailWarning,
  printedOrders: Printer,
  moderation: MessageSquareText,
};

export function NotificationSettingsSection({
  initial,
  onNotice,
}: {
  initial: AdminSettingsNotificationPreference[];
  onNotice: (message: string) => void;
}) {
  const [saved, setSaved] = useState(initial);
  const [preferences, setPreferences] = useState(initial);
  const dirty = JSON.stringify(saved) !== JSON.stringify(preferences);

  function toggle(id: string, channel: "inApp" | "email", checked: boolean) {
    setPreferences((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [channel]: checked } : item,
      ),
    );
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = preferences.map((item) => ({ ...item }));
    setSaved(next);
    setPreferences(next);
    onNotice(
      "Notification preferences saved. Delivery infrastructure remains deferred.",
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 border border-border bg-surface-lowest p-5 shadow-sm sm:p-7"
    >
      <SettingsSectionIntro
        eyebrow="04 — Dispatch Routing"
        title="Administrative Alert Preferences"
        description="Choose which operational events appear in the Admin notification center and mock email channel."
        icon={<BellRing aria-hidden size={18} />}
      />

      <div className="hidden grid-cols-[minmax(0,1fr)_8rem_8rem] border-b border-border px-4 pb-3 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase md:grid">
        <span>Operational Event & Scope</span>
        <span className="text-center">In-App</span>
        <span className="text-center">Email</span>
      </div>

      <div className="divide-y divide-border border-y border-border md:border-t-0">
        {preferences.map((preference) => {
          const Icon = icons[preference.category];
          return (
            <div
              key={preference.id}
              className="grid gap-4 px-1 py-5 md:grid-cols-[minmax(0,1fr)_8rem_8rem] md:items-center md:px-4"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center bg-surface-container text-secondary">
                  <Icon aria-hidden size={16} />
                </span>
                <div>
                  <h3 className="text-[12px] font-semibold">
                    {preference.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-[10px] leading-5 text-on-surface-variant sm:text-[11px]">
                    {preference.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 md:justify-center">
                <span className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase md:sr-only">
                  In-App
                </span>
                <SettingsToggle
                  checked={preference.inApp}
                  disabled={preference.mandatory}
                  label={`${preference.title} in-app alerts`}
                  onChange={(checked) =>
                    toggle(preference.id, "inApp", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-3 md:justify-center">
                <span className="text-[9px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase md:sr-only">
                  Email
                </span>
                <SettingsToggle
                  checked={preference.email}
                  disabled={preference.mandatory}
                  label={`${preference.title} email alerts`}
                  onChange={(checked) =>
                    toggle(preference.id, "email", checked)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] leading-5 text-on-surface-variant">
        These preferences change frontend mock configuration only. They do not
        send email, push notifications, SMS, or WhatsApp messages.
      </p>

      <SettingsFormActions
        dirty={dirty}
        saveLabel="Save Notification Preferences"
        onReset={() => setPreferences(saved.map((item) => ({ ...item })))}
      />
    </form>
  );
}
