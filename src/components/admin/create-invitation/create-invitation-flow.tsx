"use client";

import { ArrowLeft, ArrowRight, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  AddCustomerDialog,
  type NewManagedCustomerInput,
} from "@/components/admin/customers/add-customer-dialog";
import { AdminPageHeader } from "@/components/admin/shared/admin-page-header";
import type { AdminCreateInvitationData, AdminCustomer } from "@/types";

import { CreateInvitationProgress } from "./create-invitation-progress";
import { CreateInvitationSummary } from "./create-invitation-summary";
import { CreateInvitationSuccess } from "./create-invitation-success";
import {
  CommercialStep,
  CustomerStep,
  ReviewStep,
  TemplateStep,
  WeddingBasicsStep,
} from "./create-invitation-steps";

type BasicsErrors = Partial<
  Record<"partnerOne" | "partnerTwo" | "weddingDate" | "slug", string>
>;

function slugPart(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 48);
}
function firstName(value: string) {
  return slugPart(value.trim().split(/\s+/)[0] ?? "");
}

export function AdminCreateInvitationFlow({
  data,
}: {
  data: AdminCreateInvitationData;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCustomerId = searchParams.get("customerId");
  const initialCustomerId = data.customers.some(
    (item) => item.id === requestedCustomerId,
  )
    ? (requestedCustomerId ?? "")
    : "";
  const [customers, setCustomers] = useState(data.customers);
  const [step, setStep] = useState(0);
  const [customerId, setCustomerId] = useState(initialCustomerId);
  const [customerQuery, setCustomerQuery] = useState("");
  const [templateKey, setTemplateKey] = useState(data.defaultTemplateKey);
  const [partnerOne, setPartnerOne] = useState("");
  const [partnerTwo, setPartnerTwo] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [packageId, setPackageId] = useState(data.defaultPackageId);
  const [customerError, setCustomerError] = useState<string>();
  const [templateError, setTemplateError] = useState<string>();
  const [basicsErrors, setBasicsErrors] = useState<BasicsErrors>({});
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [dirty, setDirty] = useState(false);

  const customer = customers.find((item) => item.id === customerId);
  const template = data.templates.find((item) => item.key === templateKey);
  const packageItem = data.packages.find((item) => item.id === packageId);
  const reserved = useMemo(
    () => new Set(data.reservedSlugs.map((item) => item.toLowerCase())),
    [data.reservedSlugs],
  );
  const suggestedSlug = [firstName(partnerOne), firstName(partnerTwo)]
    .filter(Boolean)
    .join("-");
  const slug = slugTouched ? customSlug : suggestedSlug;
  const slugAvailability =
    slug.length === 0
      ? "empty"
      : slug.length < 3 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
        ? "invalid"
        : reserved.has(slug)
          ? "unavailable"
          : "available";
  const coupleLabel = `${partnerOne.trim().split(/\s+/)[0] || "Partner One"} & ${partnerTwo.trim().split(/\s+/)[0] || "Partner Two"}`;

  function next() {
    if (step === 0 && !customer) {
      setCustomerError(
        "Select an existing customer or create a managed customer.",
      );
      return;
    }
    if (step === 1 && !template) {
      setTemplateError("Select a template for this invitation.");
      return;
    }
    if (step === 2) {
      const errors: BasicsErrors = {};
      if (partnerOne.trim().length < 2)
        errors.partnerOne = "Partner / Bride name is required.";
      if (partnerTwo.trim().length < 2)
        errors.partnerTwo = "Partner / Groom name is required.";
      if (!weddingDate) errors.weddingDate = "Wedding date is required.";
      if (slugAvailability === "invalid" || slugAvailability === "empty")
        errors.slug = "Use 3–48 lowercase letters, numbers, and single dashes.";
      if (slugAvailability === "unavailable")
        errors.slug = "This address is already used by another invitation.";
      setBasicsErrors(errors);
      if (Object.keys(errors).length) return;
    }
    if (step === 3 && !packageItem) return;
    if (step === 4) {
      setShowSuccess(true);
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  }

  function createManaged(input: NewManagedCustomerInput) {
    const id = `managed_preview_${Date.now()}`;
    const nextCustomer: AdminCustomer = {
      id,
      name: input.name,
      initials:
        input.name
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "MC",
      email: input.email || null,
      whatsapp: input.whatsapp,
      accountType: "managed",
      linkedUserId: null,
      invitationCount: 0,
      quotaGranted: 0,
      quotaRemaining: 0,
      totalSpending: 0,
      paymentStatus: "pending",
      status: "pending_payment",
      joinedAt: new Date().toISOString(),
      notes: input.notes,
    };
    setCustomers((current) => [nextCustomer, ...current]);
    setCustomerId(id);
    setCustomerError(undefined);
    setShowAddCustomer(false);
    setDirty(true);
  }

  if (!template || !packageItem)
    return (
      <p className="border border-border bg-surface-lowest p-8 text-center">
        Create Invitation data is unavailable.
      </p>
    );

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/invitations"
          className="inline-flex min-h-9 items-center gap-2 text-[9px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase"
        >
          <ArrowLeft aria-hidden size={14} /> Invitation Registry
        </Link>
        <button
          type="button"
          onClick={() =>
            dirty
              ? setShowExit(true)
              : router.push("/admin/invitations")
          }
          className="inline-flex min-h-9 items-center gap-2 px-3 text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase hover:bg-surface-container"
        >
          <X aria-hidden size={14} /> Cancel
        </button>
      </div>
      <AdminPageHeader
        eyebrow="Admin Console · Draft Provisioning"
        title="Create Invitation"
        description="Create a wedding invitation draft for a registered or studio-managed customer. Finalize and Publish remain separate."
      />
      <CreateInvitationProgress step={step} />
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <main className="lg:col-span-8">
          {step === 0 ? (
            <CustomerStep
              customers={customers}
              selectedId={customerId}
              query={customerQuery}
              error={customerError}
              onQuery={setCustomerQuery}
              onSelect={(id) => {
                setCustomerId(id);
                setCustomerError(undefined);
                setDirty(true);
              }}
              onAdd={() => setShowAddCustomer(true)}
            />
          ) : null}
          {step === 1 ? (
            <TemplateStep
              templates={data.templates}
              selectedKey={templateKey}
              error={templateError}
              onSelect={(key) => {
                setTemplateKey(key);
                setTemplateError(undefined);
                setDirty(true);
              }}
            />
          ) : null}
          {step === 2 ? (
            <WeddingBasicsStep
              partnerOne={partnerOne}
              partnerTwo={partnerTwo}
              weddingDate={weddingDate}
              slug={slug}
              availability={slugAvailability}
              errors={basicsErrors}
              onPartnerOne={(value) => {
                setPartnerOne(value);
                setDirty(true);
              }}
              onPartnerTwo={(value) => {
                setPartnerTwo(value);
                setDirty(true);
              }}
              onDate={(value) => {
                setWeddingDate(value);
                setDirty(true);
              }}
              onSlug={(value) => {
                setCustomSlug(slugPart(value));
                setSlugTouched(true);
                setDirty(true);
              }}
            />
          ) : null}
          {step === 3 && customer ? (
            <CommercialStep
              packages={data.packages}
              selectedId={packageId}
              customer={customer}
              onSelect={(id) => {
                setPackageId(id);
                setDirty(true);
              }}
            />
          ) : null}
          {step === 4 && customer ? (
            <ReviewStep
              customer={customer}
              template={template}
              weddingLabel={coupleLabel}
              weddingDate={weddingDate}
              slug={slug}
              packageItem={packageItem}
            />
          ) : null}
          <div className="mt-4 flex flex-col-reverse gap-2 border border-border bg-surface-lowest p-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              className="inline-flex min-h-11 items-center justify-center gap-2 px-5 text-[9px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase disabled:opacity-35"
            >
              <ArrowLeft aria-hidden size={14} /> Back
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-6 text-[9px] font-semibold tracking-[0.11em] text-white uppercase"
            >
              {step === 4 ? (
                <>
                  <Save aria-hidden size={14} /> Create Draft
                </>
              ) : (
                <>
                  Continue <ArrowRight aria-hidden size={14} />
                </>
              )}
            </button>
          </div>
        </main>
        <div className="lg:col-span-4">
          <CreateInvitationSummary
            customer={customer}
            template={template}
            packageItem={packageItem}
            partnerOne={partnerOne}
            partnerTwo={partnerTwo}
            weddingDate={weddingDate}
            slug={slug}
          />
        </div>
      </div>
      {showAddCustomer ? (
        <AddCustomerDialog
          onClose={() => setShowAddCustomer(false)}
          onCreate={createManaged}
        />
      ) : null}
      {showSuccess && customer ? (
        <CreateInvitationSuccess
          coupleLabel={coupleLabel}
          slug={slug}
          customerName={customer.name}
          onClose={() => setShowSuccess(false)}
        />
      ) : null}
      {showExit ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="discard-draft-title"
            className="w-full max-w-md border border-border bg-surface-lowest p-6 shadow-2xl"
          >
            <p className="text-[9px] font-semibold tracking-[0.15em] text-secondary uppercase">
              Unsaved Draft
            </p>
            <h2
              id="discard-draft-title"
              className="mt-1 font-serif text-[26px]"
            >
              Discard this setup?
            </h2>
            <p className="mt-3 text-[11px] leading-5 text-on-surface-variant">
              Your customer, template, wedding, and commercial selections will
              be lost.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowExit(false)}
                className="min-h-11 bg-surface-container px-5 text-[9px] font-semibold uppercase"
              >
                Keep Editing
              </button>
              <Link
                href="/admin/invitations"
                className="inline-flex min-h-11 items-center justify-center bg-red-700 px-5 text-[9px] font-semibold text-white uppercase"
              >
                Discard Draft
              </Link>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
