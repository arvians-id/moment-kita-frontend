import { Heart } from "lucide-react";
import Image from "next/image";

import {
  EditorCard,
  fieldClass,
  FieldLabel,
} from "@/components/customer/invitation-builder/builder-primitives";
import type { InvitationBuilderPartner } from "@/types";

export function CoupleEditor({
  partners,
  onChange,
}: {
  partners: InvitationBuilderPartner[];
  onChange: (id: string, patch: Partial<InvitationBuilderPartner>) => void;
}) {
  return (
    <div className="space-y-5">
      {partners.map((partner, index) => (
        <EditorCard key={partner.id}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid size-7 place-items-center rounded-full bg-surface-container text-[11px] font-bold text-secondary">
                {String.fromCharCode(65 + index)}
              </span>
              <div>
                <h3 className="font-serif text-[20px] leading-7 font-semibold">
                  {partner.roleLabel}
                </h3>
                <span className="text-[9px] leading-4 font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
                  Couple profile
                </span>
              </div>
            </div>
            <Heart aria-hidden size={18} className="text-secondary" />
          </div>

          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-surface-container shadow-sm">
                {partner.portraitUrl ? (
                  <Image
                    src={partner.portraitUrl}
                    alt={
                      "Editorial portrait placeholder for " + partner.nickname
                    }
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 16vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <span className="absolute inset-x-2 bottom-2 bg-surface/90 px-2 py-1 text-center text-[9px] font-semibold tracking-[0.12em] text-secondary uppercase backdrop-blur">
                  Portrait placeholder
                </span>
              </div>
              <p className="mt-2 text-[10px] leading-4 text-on-surface-variant">
                Media uploads will use the shared gallery pipeline when it is
                connected.
              </p>
            </div>

            <div className="space-y-4 md:col-span-8">
              <div>
                <FieldLabel htmlFor={partner.id + "-name"}>
                  Full name with academic degrees
                </FieldLabel>
                <input
                  id={partner.id + "-name"}
                  value={partner.fullName}
                  onChange={(event) =>
                    onChange(partner.id, { fullName: event.target.value })
                  }
                  className={fieldClass}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor={partner.id + "-nickname"}>
                    Display nickname
                  </FieldLabel>
                  <input
                    id={partner.id + "-nickname"}
                    value={partner.nickname}
                    onChange={(event) =>
                      onChange(partner.id, { nickname: event.target.value })
                    }
                    className={fieldClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor={partner.id + "-social"}>
                    Social account handle
                  </FieldLabel>
                  <div className="relative">
                    <span className="absolute top-2.5 left-3 text-[13px] text-on-surface-variant">
                      @
                    </span>
                    <input
                      id={partner.id + "-social"}
                      value={partner.socialHandle}
                      onChange={(event) =>
                        onChange(partner.id, {
                          socialHandle: event.target.value.replace(/^@/, ""),
                        })
                      }
                      className={fieldClass + " pl-7"}
                    />
                  </div>
                </div>
              </div>
              <div>
                <FieldLabel htmlFor={partner.id + "-lineage"}>
                  Honored lineage / parents&apos; blessing
                </FieldLabel>
                <textarea
                  id={partner.id + "-lineage"}
                  rows={3}
                  value={partner.lineage}
                  onChange={(event) =>
                    onChange(partner.id, { lineage: event.target.value })
                  }
                  className={fieldClass + " resize-none"}
                />
              </div>
            </div>
          </div>
        </EditorCard>
      ))}
    </div>
  );
}
