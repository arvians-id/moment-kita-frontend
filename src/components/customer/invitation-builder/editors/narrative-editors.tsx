import {
  EditorCard,
  fieldClass,
  FieldLabel,
} from "@/components/customer/invitation-builder/builder-primitives";
import type { InvitationBuilderQuote } from "@/types";

export function LoveStoryEditor({
  value,
  onChange,
}: {
  value: { title: string; body: string };
  onChange: (value: { title: string; body: string }) => void;
}) {
  return (
    <EditorCard>
      <h3 className="font-serif text-[20px] leading-7 font-semibold">
        Your Story, Told Gently
      </h3>
      <p className="mb-5 text-[11px] leading-5 text-on-surface-variant">
        A concise editorial chapter that sits between the couple portrait and
        celebration schedule.
      </p>
      <div className="space-y-4">
        <div>
          <FieldLabel htmlFor="love-story-title">Chapter title</FieldLabel>
          <input
            id="love-story-title"
            value={value.title}
            onChange={(event) =>
              onChange({ ...value, title: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="love-story-body">Love story</FieldLabel>
          <textarea
            id="love-story-body"
            rows={8}
            value={value.body}
            onChange={(event) =>
              onChange({ ...value, body: event.target.value })
            }
            className={
              fieldClass + " resize-y font-serif text-[15px] leading-7"
            }
          />
        </div>
      </div>
    </EditorCard>
  );
}

export function QuoteEditor({
  quote,
  onChange,
}: {
  quote: InvitationBuilderQuote;
  onChange: (value: InvitationBuilderQuote) => void;
}) {
  return (
    <EditorCard>
      <h3 className="font-serif text-[20px] leading-7 font-semibold">
        {quote.label}
      </h3>
      <p className="mb-5 text-[11px] leading-5 text-on-surface-variant">
        This is one labeled Quote instance. Templates may provide multiple Quote
        instances without allowing arbitrary custom sections.
      </p>
      <div className="space-y-4">
        <div>
          <FieldLabel htmlFor={quote.id + "-label"}>Section label</FieldLabel>
          <input
            id={quote.id + "-label"}
            value={quote.label}
            onChange={(event) =>
              onChange({ ...quote, label: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor={quote.id + "-text"}>
            Editorial wording
          </FieldLabel>
          <textarea
            id={quote.id + "-text"}
            rows={5}
            value={quote.text}
            onChange={(event) =>
              onChange({ ...quote, text: event.target.value })
            }
            className={
              fieldClass + " resize-y font-serif text-[17px] leading-7 italic"
            }
          />
        </div>
        <div>
          <FieldLabel htmlFor={quote.id + "-attribution"}>
            Attribution
          </FieldLabel>
          <input
            id={quote.id + "-attribution"}
            value={quote.attribution}
            onChange={(event) =>
              onChange({ ...quote, attribution: event.target.value })
            }
            className={fieldClass}
          />
        </div>
      </div>
    </EditorCard>
  );
}

export function ClosingEditor({
  value,
  onChange,
}: {
  value: { title: string; message: string; signature: string };
  onChange: (value: {
    title: string;
    message: string;
    signature: string;
  }) => void;
}) {
  return (
    <EditorCard>
      <h3 className="font-serif text-[20px] leading-7 font-semibold">
        Closing &amp; Gratitude
      </h3>
      <p className="mb-5 text-[11px] leading-5 text-on-surface-variant">
        The final chapter guests see after the celebration modules.
      </p>
      <div className="space-y-4">
        <div>
          <FieldLabel htmlFor="closing-title">Closing title</FieldLabel>
          <input
            id="closing-title"
            value={value.title}
            onChange={(event) =>
              onChange({ ...value, title: event.target.value })
            }
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="closing-message">Gratitude message</FieldLabel>
          <textarea
            id="closing-message"
            rows={5}
            value={value.message}
            onChange={(event) =>
              onChange({ ...value, message: event.target.value })
            }
            className={fieldClass + " resize-y"}
          />
        </div>
        <div>
          <FieldLabel htmlFor="closing-signature">Signature</FieldLabel>
          <input
            id="closing-signature"
            value={value.signature}
            onChange={(event) =>
              onChange({ ...value, signature: event.target.value })
            }
            className={fieldClass}
          />
        </div>
      </div>
    </EditorCard>
  );
}
