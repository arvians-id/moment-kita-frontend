import { CalendarDays, Link2, MapPin, Plus, Trash2 } from "lucide-react";

import {
  EditorCard,
  fieldClass,
  FieldLabel,
} from "@/components/customer/invitation-builder/builder-primitives";
import type { InvitationBuilderEvent } from "@/types";

export function EventsEditor({
  events,
  onChange,
  onAdd,
  onRemove,
}: {
  events: InvitationBuilderEvent[];
  onChange: (id: string, patch: Partial<InvitationBuilderEvent>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <EditorCard>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-[20px] leading-7 font-semibold">
            Celebration Itinerary &amp; Venues
          </h3>
          <p className="text-[11px] leading-5 text-on-surface-variant">
            Multiple wedding events are supported in the template&apos;s fixed
            chronology.
          </p>
        </div>
        <span className="rounded-full bg-surface-container px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          {events.length} events
        </span>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="rounded-[8px] bg-surface-low p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
                  Event {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <button
                type="button"
                onClick={() => onRemove(event.id)}
                disabled={events.length <= 1}
                className="inline-flex min-h-8 items-center gap-1.5 px-2 text-[9px] font-semibold tracking-[0.1em] text-red-700 uppercase hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Trash2 aria-hidden size={13} /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FieldLabel htmlFor={event.id + "-title"}>
                  Event title
                </FieldLabel>
                <input
                  id={event.id + "-title"}
                  value={event.title}
                  onChange={(change) =>
                    onChange(event.id, { title: change.target.value })
                  }
                  className={fieldClass + " bg-surface-lowest"}
                />
              </div>
              <div>
                <FieldLabel htmlFor={event.id + "-timezone"}>
                  Timezone
                </FieldLabel>
                <input
                  id={event.id + "-timezone"}
                  value={event.timezone}
                  placeholder="Asia/Jakarta (WIB)"
                  onChange={(change) =>
                    onChange(event.id, { timezone: change.target.value })
                  }
                  className={fieldClass + " bg-surface-lowest"}
                />
              </div>
              <div>
                <FieldLabel htmlFor={event.id + "-map"}>Map link</FieldLabel>
                <div className="relative">
                  <Link2
                    aria-hidden
                    size={15}
                    className="absolute top-3 left-3 text-secondary"
                  />
                  <input
                    id={event.id + "-map"}
                    type="url"
                    value={event.mapLink}
                    placeholder="https://maps.google.com/..."
                    onChange={(change) =>
                      onChange(event.id, { mapLink: change.target.value })
                    }
                    className={fieldClass + " bg-surface-lowest pl-9"}
                  />
                </div>
              </div>
              <div>
                <FieldLabel htmlFor={event.id + "-date"}>Date</FieldLabel>
                <div className="relative">
                  <CalendarDays
                    aria-hidden
                    size={15}
                    className="absolute top-3 left-3 text-secondary"
                  />
                  <input
                    id={event.id + "-date"}
                    type="date"
                    value={event.date}
                    onChange={(change) =>
                      onChange(event.id, { date: change.target.value })
                    }
                    className={fieldClass + " bg-surface-lowest pl-9"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel htmlFor={event.id + "-start"}>Starts</FieldLabel>
                  <input
                    id={event.id + "-start"}
                    type="time"
                    value={event.startTime}
                    onChange={(change) =>
                      onChange(event.id, { startTime: change.target.value })
                    }
                    className={fieldClass + " bg-surface-lowest"}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor={event.id + "-end"}>Ends</FieldLabel>
                  <input
                    id={event.id + "-end"}
                    type="time"
                    value={event.endTime}
                    onChange={(change) =>
                      onChange(event.id, { endTime: change.target.value })
                    }
                    className={fieldClass + " bg-surface-lowest"}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor={event.id + "-venue"}>
                  Sanctuary / venue name
                </FieldLabel>
                <div className="relative">
                  <MapPin
                    aria-hidden
                    size={15}
                    className="absolute top-3 left-3 text-secondary"
                  />
                  <input
                    id={event.id + "-venue"}
                    value={event.venue}
                    onChange={(change) =>
                      onChange(event.id, { venue: change.target.value })
                    }
                    className={fieldClass + " bg-surface-lowest pl-9"}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor={event.id + "-address"}>
                  Full address
                </FieldLabel>
                <input
                  id={event.id + "-address"}
                  value={event.address}
                  onChange={(change) =>
                    onChange(event.id, { address: change.target.value })
                  }
                  className={fieldClass + " bg-surface-lowest"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[6px] bg-surface-container px-4 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-surface-high"
      >
        <Plus aria-hidden size={15} className="text-secondary" />
        Add another itinerary event
      </button>
    </EditorCard>
  );
}
