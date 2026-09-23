"use client";

import { Lock, Save } from "lucide-react";
import { useMemo, useState } from "react";

import { SectionIntro } from "@/components/customer/settings/profile-section";
import { SaveButton } from "@/components/customer/settings/save-button";
import { SettingsToggle } from "@/components/customer/settings/settings-toggle";
import { groupPreferencesByCategory } from "@/components/customer/settings/settings-utils";
import type { NotificationPreferenceItem } from "@/types";

export function NotificationPreferencesSection({
  initialPreferences,
}: {
  initialPreferences: NotificationPreferenceItem[];
}) {
  const [committed, setCommitted] = useState(initialPreferences);
  const [draft, setDraft] = useState(initialPreferences);

  const groups = useMemo(() => groupPreferencesByCategory(draft), [draft]);
  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(committed),
    [draft, committed],
  );

  function updateChannel(
    id: string,
    channel: "inApp" | "email",
    value: boolean,
  ) {
    setDraft((current) =>
      current.map((item) =>
        item.id === id && !item.mandatory
          ? { ...item, [channel]: value }
          : item,
      ),
    );
  }

  function handleSave() {
    setCommitted(draft);
  }

  return (
    <section className="space-y-5">
      <SectionIntro
        eyebrow="03 — Communications"
        title="Notification Preferences"
        description="Choose how celebration milestones, guest activity, and account updates reach you."
      />

      <div className="space-y-6 bg-surface-low p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-surface-highest pb-3">
          <span className="text-[10px] font-semibold tracking-[0.1em] text-on-surface uppercase">
            Dispatch Channels
          </span>
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="w-12 text-center text-[10px] font-semibold tracking-[0.1em] text-secondary uppercase">
              In-App
            </span>
            <span className="w-12 text-center text-[10px] font-semibold tracking-[0.1em] text-secondary uppercase">
              Email
            </span>
          </div>
        </div>

        {groups.map((group) => (
          <div key={group.category} className="space-y-2.5">
            <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
              {group.label}
            </p>
            <div className="space-y-2">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 bg-surface-lowest p-3.5 shadow-sm"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-[13px] font-medium text-on-surface">
                        {item.title}
                      </p>
                      {item.mandatory ? (
                        <span className="inline-flex items-center gap-1 bg-surface-highest px-1.5 py-0.5 text-[8px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
                          <Lock aria-hidden size={9} />
                          Required
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[11px] leading-4 text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-6 sm:gap-10">
                    <div className="flex w-12 justify-center">
                      <SettingsToggle
                        checked={item.inApp}
                        disabled={item.mandatory}
                        onChange={(value) =>
                          updateChannel(item.id, "inApp", value)
                        }
                        label={`${item.title} in-app notifications`}
                      />
                    </div>
                    <div className="flex w-12 justify-center">
                      <SettingsToggle
                        checked={item.email}
                        disabled={item.mandatory}
                        onChange={(value) =>
                          updateChannel(item.id, "email", value)
                        }
                        label={`${item.title} email notifications`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-4 border-t border-surface-highest pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] leading-4 font-semibold tracking-[0.06em] text-on-surface-variant uppercase">
            <Lock aria-hidden size={12} className="text-secondary" />
            Required notifications stay on to protect your account and payments
          </span>
          <SaveButton
            label="Save Notification Preferences"
            savingLabel="Updating..."
            savedLabel="Preferences Saved"
            icon={Save}
            disabled={!isDirty}
            onSave={handleSave}
          />
        </div>
      </div>
    </section>
  );
}
