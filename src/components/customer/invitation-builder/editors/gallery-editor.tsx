import { Check, ImagePlus } from "lucide-react";
import Image from "next/image";

import { EditorCard } from "@/components/customer/invitation-builder/builder-primitives";
import type { InvitationBuilderGalleryItem } from "@/types";

export function GalleryEditor({
  items,
  onSetCover,
}: {
  items: InvitationBuilderGalleryItem[];
  onSetCover: (id: string) => void;
}) {
  return (
    <EditorCard>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-[20px] leading-7 font-semibold">
            Curated Editorial Gallery
          </h3>
          <p className="text-[11px] leading-5 text-on-surface-variant">
            The template fixes gallery placement; choose the cover image and
            maintain the curated sequence.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-surface-container px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
          {items.length} images
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSetCover(item.id)}
            aria-label={
              item.isCover
                ? item.alt + ", current cover image"
                : "Set " + item.alt + " as cover image"
            }
            className="group relative aspect-square overflow-hidden rounded-[6px] bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <Image
              src={item.imageUrl}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 13vw, (min-width: 640px) 28vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
            {item.isCover ? (
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-surface/90 px-2 py-1 text-[9px] font-bold tracking-[0.12em] text-secondary uppercase backdrop-blur">
                <Check aria-hidden size={11} />
                Cover
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-[8px] border border-dashed border-surface-highest bg-surface-low p-6 text-center">
        <ImagePlus aria-hidden size={25} className="mx-auto text-secondary" />
        <p className="mt-2 font-serif text-[16px] font-semibold">
          Gallery upload pipeline
        </p>
        <p className="mx-auto mt-1 max-w-md text-[10px] leading-4 text-on-surface-variant">
          Existing production imagery is shown for this frontend phase. Upload,
          crop, and storage integration remain intentionally deferred.
        </p>
      </div>
    </EditorCard>
  );
}
