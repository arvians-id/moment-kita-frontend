"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { CreationProgress } from "@/components/customer/create-invitation/creation-progress";
import { CreationSuccess } from "@/components/customer/create-invitation/creation-success";
import {
  InvitationAddressStep,
  type SlugAvailability,
} from "@/components/customer/create-invitation/invitation-address-step";
import { InvitationLivePreview } from "@/components/customer/create-invitation/invitation-live-preview";
import { QuotaStatusCard } from "@/components/customer/create-invitation/quota-status-card";
import { ReviewCreateStep } from "@/components/customer/create-invitation/review-create-step";
import { TemplateStep } from "@/components/customer/create-invitation/template-step";
import { WeddingBasicsStep } from "@/components/customer/create-invitation/wedding-basics-step";
import type { CatalogTemplate, EntitlementSummary } from "@/types";

type BasicsErrors = Partial<
  Record<"partnerOne" | "partnerTwo" | "weddingDate", string>
>;

function slugPart(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function nickname(value: string): string {
  return slugPart(value.trim().split(/\s+/)[0] ?? "");
}

function surname(value: string): string {
  const parts = value.trim().split(/\s+/);
  return slugPart(parts.at(-1) ?? "");
}

function getSlugAvailability(
  slug: string,
  reserved: Set<string>,
): SlugAvailability {
  if (!slug) return "empty";
  if (
    slug.length < 3 ||
    slug.length > 48 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  ) {
    return "invalid";
  }
  return reserved.has(slug) ? "unavailable" : "available";
}

export function CreateInvitationFlow({
  templates,
  defaultTemplateKey,
  reservedSlugs,
  entitlement,
}: {
  templates: CatalogTemplate[];
  defaultTemplateKey: string;
  reservedSlugs: string[];
  entitlement: EntitlementSummary;
}) {
  const [selectedKey, setSelectedKey] = useState(defaultTemplateKey);
  const [isChoosingTemplate, setIsChoosingTemplate] = useState(false);
  const [partnerOne, setPartnerOne] = useState("Ayu Prameswari");
  const [partnerTwo, setPartnerTwo] = useState("Raka Daniswara");
  const [weddingDate, setWeddingDate] = useState("2026-11-24");
  const [slug, setSlug] = useState("raka-ayu-2026");
  const [activeStep, setActiveStep] = useState(3);
  const [basicsErrors, setBasicsErrors] = useState<BasicsErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const selectedTemplate =
    templates.find((template) => template.key === selectedKey) ?? templates[0];
  const reserved = useMemo(
    () => new Set(reservedSlugs.map((item) => item.toLowerCase())),
    [reservedSlugs],
  );
  const availability = getSlugAvailability(slug, reserved);
  const basicsComplete =
    partnerOne.trim().length >= 2 &&
    partnerTwo.trim().length >= 2 &&
    Boolean(weddingDate);
  const canCreate =
    Boolean(selectedTemplate) && basicsComplete && availability === "available";
  const completedThrough =
    availability === "available" && basicsComplete
      ? 3
      : basicsComplete
        ? 2
        : selectedTemplate
          ? 1
          : 0;

  const suggestions = useMemo(() => {
    const one = nickname(partnerOne) || "partner-one";
    const two = nickname(partnerTwo) || "partner-two";
    const family = surname(partnerTwo) || two;
    const year = weddingDate.slice(0, 4) || "wedding";
    const candidates = [
      one + "-dan-" + two,
      "wedding-" + one + "-" + two,
      family + "-celebration-" + year,
    ];

    return candidates.map((candidate, index) => {
      const normalized = slugPart(candidate);
      return reserved.has(normalized)
        ? normalized + "-" + (index + 2)
        : normalized;
    });
  }, [partnerOne, partnerTwo, reserved, weddingDate]);

  const slugError =
    availability === "invalid"
      ? "Use 3–48 lowercase letters, numbers, and single dashes."
      : availability === "unavailable"
        ? "That address is already used by another Moment Kita celebration."
        : undefined;

  useEffect(() => {
    if (!showSuccess) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setShowSuccess(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [showSuccess]);

  if (!selectedTemplate) {
    return (
      <div className="rounded-[12px] border border-surface-highest bg-surface-lowest p-8 text-center">
        <h2 className="font-serif text-xl">Templates are being prepared</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          The atelier catalog could not be loaded. Please return to My
          Invitations and try again.
        </p>
      </div>
    );
  }

  function scrollToStep(step: number) {
    setActiveStep(step);
    document
      .getElementById("create-step-" + step)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updatePartnerOne(value: string) {
    setPartnerOne(value);
    setBasicsErrors((current) => ({ ...current, partnerOne: undefined }));
  }

  function updatePartnerTwo(value: string) {
    setPartnerTwo(value);
    setBasicsErrors((current) => ({ ...current, partnerTwo: undefined }));
  }

  function updateWeddingDate(value: string) {
    setWeddingDate(value);
    setBasicsErrors((current) => ({ ...current, weddingDate: undefined }));
  }

  function validateBasics(): BasicsErrors {
    const next: BasicsErrors = {};
    if (partnerOne.trim().length < 2) {
      next.partnerOne = "Enter Partner 1's full name.";
    }
    if (partnerTwo.trim().length < 2) {
      next.partnerTwo = "Enter Partner 2's full name.";
    }
    if (!weddingDate) {
      next.weddingDate = "Choose the wedding date.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBasics();
    setBasicsErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => scrollToStep(2));
      return;
    }
    if (availability !== "available") {
      requestAnimationFrame(() => scrollToStep(3));
      return;
    }

    setActiveStep(4);
    setShowSuccess(true);
  }

  return (
    <>
      <CreationProgress
        activeStep={activeStep}
        completedThrough={completedThrough}
        onSelect={scrollToStep}
      />

      <form
        noValidate
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8"
      >
        <div className="flex flex-col gap-6 lg:col-span-7">
          <TemplateStep
            templates={templates}
            selectedKey={selectedTemplate.key}
            isChoosing={isChoosingTemplate}
            onToggleChoosing={() => {
              setActiveStep(1);
              setIsChoosingTemplate((current) => !current);
            }}
            onSelect={(key) => {
              setSelectedKey(key);
              setActiveStep(1);
            }}
            onActivate={() => setActiveStep(1)}
          />
          <WeddingBasicsStep
            partnerOne={partnerOne}
            partnerTwo={partnerTwo}
            weddingDate={weddingDate}
            errors={basicsErrors}
            onPartnerOneChange={updatePartnerOne}
            onPartnerTwoChange={updatePartnerTwo}
            onWeddingDateChange={updateWeddingDate}
            onActivate={() => setActiveStep(2)}
          />
          <InvitationAddressStep
            slug={slug}
            availability={availability}
            suggestions={suggestions}
            error={slugError}
            onSlugChange={(value) => setSlug(slugPart(value).slice(0, 48))}
            onSuggestion={(value) => {
              setSlug(value);
              setActiveStep(3);
            }}
            onActivate={() => setActiveStep(3)}
          />
          <QuotaStatusCard entitlement={entitlement} />
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:col-span-5">
          <InvitationLivePreview
            partnerOne={partnerOne}
            partnerTwo={partnerTwo}
            weddingDate={weddingDate}
            slug={slug}
            template={selectedTemplate}
          />
          <ReviewCreateStep
            template={selectedTemplate}
            canCreate={canCreate}
            onActivate={() => setActiveStep(4)}
          />
        </div>
      </form>

      {showSuccess ? (
        <CreationSuccess
          partnerOne={partnerOne}
          partnerTwo={partnerTwo}
          slug={slug}
          templateName={selectedTemplate.name}
          onStartEditing={() => router.push("/app/invitations/inv_02/edit")}
          onClose={() => setShowSuccess(false)}
        />
      ) : null}
    </>
  );
}
