import { Gift, Radio, UserCheck, UsersRound } from "lucide-react";

import {
  EditorCard,
  fieldClass,
  FieldLabel,
} from "@/components/customer/invitation-builder/builder-primitives";
import type { DigitalGiftSummary, RsvpAccessMode } from "@/types";

function BooleanChoice({
  checked,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  label: string;
  description: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-[8px] bg-surface-low p-4">
      <span>
        <span className="block text-[12px] font-semibold">{label}</span>
        <span className="mt-0.5 block text-[10px] leading-4 text-on-surface-variant">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 accent-secondary"
      />
    </label>
  );
}

export function RsvpEditor({
  value,
  onChange,
}: {
  value: {
    headline: string;
    deadline: string;
    accessMode: RsvpAccessMode;
    allowPlusOne: boolean;
    collectMealPreference: boolean;
  };
  onChange: (value: {
    headline: string;
    deadline: string;
    accessMode: RsvpAccessMode;
    allowPlusOne: boolean;
    collectMealPreference: boolean;
  }) => void;
}) {
  return (
    <EditorCard>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent text-secondary">
          <UserCheck aria-hidden size={18} />
        </span>
        <div>
          <h3 className="font-serif text-[20px] leading-7 font-semibold">
            RSVP Suite
          </h3>
          <p className="text-[10px] leading-4 text-on-surface-variant">
            Guest response wording and collection preferences.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <FieldLabel htmlFor="rsvp-headline">Invitation prompt</FieldLabel>
          <input
            id="rsvp-headline"
            value={value.headline}
            onChange={(event) =>
              onChange({ ...value, headline: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="rsvp-deadline">Response deadline</FieldLabel>
          <input
            id="rsvp-deadline"
            type="date"
            value={value.deadline}
            onChange={(event) =>
              onChange({ ...value, deadline: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="rsvp-access-policy">Response access</FieldLabel>
          <select
            id="rsvp-access-policy"
            value={value.accessMode}
            onChange={(event) =>
              onChange({
                ...value,
                accessMode: event.target.value as RsvpAccessMode,
              })
            }
            className={fieldClass}
          >
            <option value="guest_list_only">Guest List Only</option>
            <option value="anyone_with_link">Anyone With Link</option>
          </select>
        </div>
        <BooleanChoice
          checked={value.allowPlusOne}
          label="Allow plus-one responses"
          description="Guests can include an additional attendee where permitted."
          onChange={(allowPlusOne) => onChange({ ...value, allowPlusOne })}
        />
        <BooleanChoice
          checked={value.collectMealPreference}
          label="Collect meal preferences"
          description="Adds dietary and meal-choice fields to RSVP."
          onChange={(collectMealPreference) =>
            onChange({ ...value, collectMealPreference })
          }
        />
      </div>
    </EditorCard>
  );
}

export function WishesEditor({
  value,
  onChange,
}: {
  value: {
    headline: string;
    prompt: string;
    moderationEnabled: boolean;
  };
  onChange: (value: {
    headline: string;
    prompt: string;
    moderationEnabled: boolean;
  }) => void;
}) {
  return (
    <EditorCard>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent text-secondary">
          <UsersRound aria-hidden size={18} />
        </span>
        <div>
          <h3 className="font-serif text-[20px] leading-7 font-semibold">
            Wishes &amp; Blessings
          </h3>
          <p className="text-[10px] leading-4 text-on-surface-variant">
            Shape the invitation&apos;s digital guestbook prompt.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <FieldLabel htmlFor="wishes-headline">Guestbook headline</FieldLabel>
          <input
            id="wishes-headline"
            value={value.headline}
            onChange={(event) =>
              onChange({ ...value, headline: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="wishes-prompt">Writing prompt</FieldLabel>
          <textarea
            id="wishes-prompt"
            rows={4}
            value={value.prompt}
            onChange={(event) =>
              onChange({ ...value, prompt: event.target.value })
            }
            className={fieldClass + " resize-y"}
          />
        </div>
        <BooleanChoice
          checked={value.moderationEnabled}
          label="Review wishes before display"
          description="Keeps new blessings private until approved."
          onChange={(moderationEnabled) =>
            onChange({ ...value, moderationEnabled })
          }
        />
      </div>
    </EditorCard>
  );
}

export function DigitalGiftEditor({
  value,
  onChange,
}: {
  value: DigitalGiftSummary;
  onChange: (value: DigitalGiftSummary) => void;
}) {
  return (
    <EditorCard>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent text-secondary">
          <Gift aria-hidden size={18} />
        </span>
        <div>
          <h3 className="font-serif text-[20px] leading-7 font-semibold">
            Digital Envelope &amp; Gift Accounts
          </h3>
          <p className="text-[10px] leading-4 text-on-surface-variant">
            {value.accounts.length} configured bank accounts.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {value.accounts.map((account, index) => (
          <div
            key={account.id}
            className="grid grid-cols-1 gap-3 rounded-[8px] bg-surface-low p-4 sm:grid-cols-2"
          >
            <div>
              <FieldLabel htmlFor={account.id + "-bank"}>Bank</FieldLabel>
              <input
                id={account.id + "-bank"}
                value={account.bankName}
                onChange={(event) => {
                  const accounts = value.accounts.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, bankName: event.target.value }
                      : item,
                  );
                  onChange({ ...value, accounts });
                }}
                className={fieldClass + " bg-surface-lowest"}
              />
            </div>
            <div>
              <FieldLabel htmlFor={account.id + "-number"}>
                Account number
              </FieldLabel>
              <input
                id={account.id + "-number"}
                value={account.accountNumber}
                inputMode="numeric"
                onChange={(event) => {
                  const accounts = value.accounts.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, accountNumber: event.target.value }
                      : item,
                  );
                  onChange({ ...value, accounts });
                }}
                className={fieldClass + " bg-surface-lowest"}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor={account.id + "-holder"}>
                Account holder
              </FieldLabel>
              <input
                id={account.id + "-holder"}
                value={account.accountHolder}
                onChange={(event) => {
                  const accounts = value.accounts.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, accountHolder: event.target.value }
                      : item,
                  );
                  onChange({ ...value, accounts });
                }}
                className={fieldClass + " bg-surface-lowest"}
              />
            </div>
          </div>
        ))}
        <div>
          <FieldLabel htmlFor="gift-address">
            Physical parcel delivery address
          </FieldLabel>
          <textarea
            id="gift-address"
            rows={3}
            value={value.deliveryAddress ?? ""}
            onChange={(event) =>
              onChange({ ...value, deliveryAddress: event.target.value })
            }
            className={fieldClass + " resize-y"}
          />
        </div>
      </div>
    </EditorCard>
  );
}

export function LivestreamEditor({
  value,
  onChange,
}: {
  value: { title: string; url: string; accessNote: string };
  onChange: (value: { title: string; url: string; accessNote: string }) => void;
}) {
  return (
    <EditorCard>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent text-secondary">
          <Radio aria-hidden size={18} />
        </span>
        <div>
          <h3 className="font-serif text-[20px] leading-7 font-semibold">
            Livestream Access
          </h3>
          <p className="text-[10px] leading-4 text-on-surface-variant">
            Optional remote ceremony access for guests.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <FieldLabel htmlFor="livestream-title">Section title</FieldLabel>
          <input
            id="livestream-title"
            value={value.title}
            onChange={(event) =>
              onChange({ ...value, title: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="livestream-url">Livestream URL</FieldLabel>
          <input
            id="livestream-url"
            type="url"
            value={value.url}
            placeholder="https://..."
            onChange={(event) =>
              onChange({ ...value, url: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="livestream-note">Access note</FieldLabel>
          <textarea
            id="livestream-note"
            rows={3}
            value={value.accessNote}
            onChange={(event) =>
              onChange({ ...value, accessNote: event.target.value })
            }
            className={fieldClass + " resize-y"}
          />
        </div>
      </div>
    </EditorCard>
  );
}
