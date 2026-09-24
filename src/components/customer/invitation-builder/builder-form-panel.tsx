import { EyeOff } from "lucide-react";

import {
  EditorCard,
  VisibilityToggle,
} from "@/components/customer/invitation-builder/builder-primitives";
import { CoupleEditor } from "@/components/customer/invitation-builder/editors/couple-editor";
import { EventsEditor } from "@/components/customer/invitation-builder/editors/events-editor";
import {
  DigitalGiftEditor,
  LivestreamEditor,
  RsvpEditor,
  WishesEditor,
} from "@/components/customer/invitation-builder/editors/feature-editors";
import { GalleryEditor } from "@/components/customer/invitation-builder/editors/gallery-editor";
import {
  ClosingEditor,
  LoveStoryEditor,
  QuoteEditor,
} from "@/components/customer/invitation-builder/editors/narrative-editors";
import type {
  InvitationBuilderContent,
  InvitationBuilderEvent,
  InvitationBuilderPartner,
  InvitationBuilderSection,
} from "@/types";

export function BuilderFormPanel({
  section,
  sectionNumber,
  content,
  onContentChange,
  onVisibilityChange,
}: {
  section: InvitationBuilderSection;
  sectionNumber: number;
  content: InvitationBuilderContent;
  onContentChange: (content: InvitationBuilderContent) => void;
  onVisibilityChange: (visible: boolean) => void;
}) {
  function updatePartner(id: string, patch: Partial<InvitationBuilderPartner>) {
    onContentChange({
      ...content,
      partners: content.partners.map((partner) =>
        partner.id === id ? { ...partner, ...patch } : partner,
      ),
    });
  }

  function updateEvent(id: string, patch: Partial<InvitationBuilderEvent>) {
    onContentChange({
      ...content,
      events: content.events.map((event) =>
        event.id === id ? { ...event, ...patch } : event,
      ),
    });
  }

  function addEvent() {
    const nextNumber = content.events.length + 1;
    const baseDate = content.events[0]?.date ?? "";
    onContentChange({
      ...content,
      events: [
        ...content.events,
        {
          id: "event_local_" + nextNumber,
          title: "Additional Celebration",
          date: baseDate,
          startTime: "12:00",
          endTime: "14:00",
          venue: "",
          address: "",
          timezone: "Asia/Jakarta (WIB)",
          mapLink: "",
        },
      ],
    });
  }

  function removeEvent(id: string) {
    if (content.events.length <= 1) return;
    onContentChange({
      ...content,
      events: content.events.filter((event) => event.id !== id),
    });
  }

  function editor() {
    switch (section.type) {
      case "couple":
        return (
          <CoupleEditor partners={content.partners} onChange={updatePartner} />
        );
      case "events":
        return (
          <EventsEditor
            events={content.events}
            onChange={updateEvent}
            onAdd={addEvent}
            onRemove={removeEvent}
          />
        );
      case "gallery":
        return (
          <GalleryEditor
            items={content.gallery}
            onSetCover={(id) =>
              onContentChange({
                ...content,
                gallery: content.gallery.map((item) => ({
                  ...item,
                  isCover: item.id === id,
                })),
              })
            }
          />
        );
      case "loveStory":
        return (
          <LoveStoryEditor
            value={content.loveStory}
            onChange={(loveStory) => onContentChange({ ...content, loveStory })}
          />
        );
      case "quote": {
        // Section instances are matched by ID only: falling back to another
        // quote would silently edit the wrong section's content.
        const quote = content.quotes.find((item) => item.id === section.id);
        return quote ? (
          <QuoteEditor
            quote={quote}
            onChange={(nextQuote) =>
              onContentChange({
                ...content,
                quotes: content.quotes.map((item) =>
                  item.id === nextQuote.id ? nextQuote : item,
                ),
              })
            }
          />
        ) : (
          <p className="text-sm text-on-surface-variant">
            This version has no content for the “{section.label}” section.
          </p>
        );
      }
      case "rsvp":
        return (
          <RsvpEditor
            value={content.rsvp}
            onChange={(rsvp) => onContentChange({ ...content, rsvp })}
          />
        );
      case "wishes":
        return (
          <WishesEditor
            value={content.wishes}
            onChange={(wishes) => onContentChange({ ...content, wishes })}
          />
        );
      case "digitalGift":
        return (
          <DigitalGiftEditor
            value={content.digitalGift}
            onChange={(digitalGift) =>
              onContentChange({ ...content, digitalGift })
            }
          />
        );
      case "livestream":
        return (
          <LivestreamEditor
            value={content.livestream}
            onChange={(livestream) =>
              onContentChange({ ...content, livestream })
            }
          />
        );
      case "closing":
        return (
          <ClosingEditor
            value={content.closing}
            onChange={(closing) => onContentChange({ ...content, closing })}
          />
        );
    }
  }

  return (
    <div className="space-y-5">
      <EditorCard className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <span className="text-[10px] leading-4 font-semibold tracking-[0.18em] text-secondary uppercase">
            Section {String(sectionNumber).padStart(2, "0")} / {section.eyebrow}
          </span>
          <h2 className="mt-1 font-serif text-[26px] leading-8 font-medium">
            {section.label}
          </h2>
          <p className="mt-1 max-w-xl text-[11px] leading-5 text-on-surface-variant">
            Content updates the local simulator immediately. Changes are not
            committed until you choose Save Changes.
          </p>
        </div>
        <VisibilityToggle
          visible={section.visible}
          disabled={!section.optional}
          onChange={onVisibilityChange}
        />
      </EditorCard>

      {!section.visible ? (
        <div className="flex items-start gap-3 rounded-[10px] border border-dashed border-surface-highest bg-surface-low p-4 text-[11px] leading-5 text-on-surface-variant">
          <EyeOff aria-hidden size={18} className="shrink-0 text-secondary" />
          This supported section is hidden from guests, but its content remains
          available here and can be restored at any time.
        </div>
      ) : null}

      {editor()}
    </div>
  );
}
