import {
  Check,
  CircleAlert,
  Eye,
  Search,
  ShieldCheck,
  UserPlus,
  UserRoundX,
} from "lucide-react";
import Image from "next/image";

import type { AdminCustomer, CatalogTemplate, Package } from "@/types";

const fieldClass =
  "min-h-11 w-full border border-transparent bg-surface-low px-3 text-[12px] outline-none transition-colors placeholder:text-on-surface-variant/55 focus:border-secondary";
const labelClass =
  "text-[9px] font-semibold tracking-[0.13em] text-on-surface-variant uppercase";
const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function StepHeader({
  number,
  eyebrow,
  title,
  description,
}: {
  number: number;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-border pb-5">
      <p className="text-[9px] font-semibold tracking-[0.16em] text-secondary uppercase">
        Step {String(number).padStart(2, "0")} of 05 · {eyebrow}
      </p>
      <h2 className="mt-1 font-serif text-[27px] leading-9">{title}</h2>
      <p className="mt-2 max-w-2xl text-[11px] leading-5 text-on-surface-variant">
        {description}
      </p>
    </header>
  );
}

export function CustomerStep({
  customers,
  selectedId,
  query,
  error,
  onQuery,
  onSelect,
  onAdd,
}: {
  customers: AdminCustomer[];
  selectedId: string;
  query: string;
  error?: string;
  onQuery: (value: string) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
}) {
  const term = query.trim().toLowerCase();
  const visible = customers.filter((customer) =>
    `${customer.name} ${customer.email ?? ""} ${customer.whatsapp}`
      .toLowerCase()
      .includes(term),
  );
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <StepHeader
        number={1}
        eyebrow="Identity Binding"
        title="Customer Selection"
        description="Choose the commercial owner. Registered and studio-managed customers are both supported."
      />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search
            aria-hidden
            size={15}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
          />
          <span className="sr-only">Search customers</span>
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search name, email, or WhatsApp…"
            className={`${fieldClass} pl-9`}
          />
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-surface-container px-4 text-[9px] font-semibold tracking-[0.1em] uppercase"
        >
          <UserPlus aria-hidden size={14} /> New Managed Customer
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-[10px] font-semibold text-red-700">{error}</p>
      ) : null}
      <div className="mt-5 grid max-h-[410px] gap-2 overflow-y-auto pr-1">
        {visible.map((customer) => {
          const selected = selectedId === customer.id;
          return (
            <button
              key={customer.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(customer.id)}
              className={`flex flex-col gap-3 border p-4 text-left transition-colors sm:flex-row sm:items-center sm:justify-between ${selected ? "border-secondary bg-accent/45" : "border-border hover:bg-surface-low"}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={`grid size-10 shrink-0 place-items-center font-serif ${selected ? "bg-secondary text-white" : "bg-surface-container"}`}
                >
                  {customer.initials}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <strong className="text-[11px]">{customer.name}</strong>
                    <span className="inline-flex items-center gap-1 text-[8px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
                      {customer.linkedUserId ? (
                        <ShieldCheck aria-hidden size={11} />
                      ) : (
                        <UserRoundX aria-hidden size={11} />
                      )}
                      {customer.accountType === "registered"
                        ? "Registered"
                        : "Managed · No login"}
                    </span>
                  </span>
                  <span className="mt-1 block truncate text-[9px] text-on-surface-variant">
                    {customer.email ?? "No email"} · {customer.whatsapp}
                  </span>
                </span>
              </span>
              <span className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <span className="block text-[8px] font-semibold tracking-[0.11em] text-on-surface-variant uppercase">
                  Remaining Quota
                </span>
                <strong
                  className={
                    customer.quotaRemaining === 0
                      ? "text-amber-700"
                      : "text-on-surface"
                  }
                >
                  {customer.quotaRemaining} of {customer.quotaGranted}
                </strong>
              </span>
            </button>
          );
        })}
        {visible.length === 0 ? (
          <p className="bg-surface-low p-6 text-center text-[11px] text-on-surface-variant">
            No customers match this search.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function TemplateStep({
  templates,
  selectedKey,
  error,
  onSelect,
}: {
  templates: CatalogTemplate[];
  selectedKey: string;
  error?: string;
  onSelect: (key: string) => void;
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <StepHeader
        number={2}
        eyebrow="Visual Direction"
        title="Template Architecture"
        description="Select an available template. Template Management remains a separate Admin module."
      />
      {error ? (
        <p className="mt-3 text-[10px] font-semibold text-red-700">{error}</p>
      ) : null}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => {
          const selected = template.key === selectedKey;
          return (
            <article
              key={template.key}
              className={`overflow-hidden border ${selected ? "border-secondary ring-1 ring-secondary" : "border-border"}`}
            >
              <div className="relative aspect-[4/3] bg-surface-low">
                <Image
                  src={template.imageUrl}
                  alt={template.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                {selected ? (
                  <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-primary px-2 py-1 text-[8px] font-semibold text-white uppercase">
                    <Check aria-hidden size={11} /> Selected
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[8px] font-semibold tracking-[0.12em] text-secondary uppercase">
                      {template.styleLabel} · {template.tier}
                    </p>
                    <h3 className="mt-1 font-serif text-[19px]">
                      {template.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[8px] text-on-surface-variant">
                    v1.0
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-[9px] leading-4 text-on-surface-variant">
                  {template.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={template.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 bg-surface-low text-[8px] font-semibold uppercase"
                  >
                    <Eye aria-hidden size={12} /> Preview
                  </a>
                  <button
                    type="button"
                    onClick={() => onSelect(template.key)}
                    className={`min-h-9 flex-1 text-[8px] font-semibold uppercase ${selected ? "bg-secondary text-white" : "bg-primary text-white"}`}
                  >
                    {selected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function WeddingBasicsStep({
  partnerOne,
  partnerTwo,
  weddingDate,
  slug,
  availability,
  errors,
  onPartnerOne,
  onPartnerTwo,
  onDate,
  onSlug,
}: {
  partnerOne: string;
  partnerTwo: string;
  weddingDate: string;
  slug: string;
  availability: "empty" | "invalid" | "unavailable" | "available";
  errors: Partial<
    Record<"partnerOne" | "partnerTwo" | "weddingDate" | "slug", string>
  >;
  onPartnerOne: (value: string) => void;
  onPartnerTwo: (value: string) => void;
  onDate: (value: string) => void;
  onSlug: (value: string) => void;
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <StepHeader
        number={3}
        eyebrow="Celebration Dossier"
        title="Wedding Basics & Identity"
        description="Capture only the essentials. Full content, events, gallery, and story editing belongs in the Studio Editor."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Partner / Bride Name
          <input
            value={partnerOne}
            onChange={(event) => onPartnerOne(event.target.value)}
            placeholder="Ayu Prameswari"
            className={`${fieldClass} mt-2 normal-case`}
          />
          {errors.partnerOne ? (
            <span className="mt-1 block tracking-normal text-red-700 normal-case">
              {errors.partnerOne}
            </span>
          ) : null}
        </label>
        <label className={labelClass}>
          Partner / Groom Name
          <input
            value={partnerTwo}
            onChange={(event) => onPartnerTwo(event.target.value)}
            placeholder="Dimas Raditya"
            className={`${fieldClass} mt-2 normal-case`}
          />
          {errors.partnerTwo ? (
            <span className="mt-1 block tracking-normal text-red-700 normal-case">
              {errors.partnerTwo}
            </span>
          ) : null}
        </label>
        <label className={labelClass}>
          Wedding Date
          <input
            type="date"
            value={weddingDate}
            onChange={(event) => onDate(event.target.value)}
            className={`${fieldClass} mt-2 normal-case`}
          />
          {errors.weddingDate ? (
            <span className="mt-1 block tracking-normal text-red-700 normal-case">
              {errors.weddingDate}
            </span>
          ) : null}
        </label>
        <label className={labelClass}>
          Proposed Invitation Slug
          <div
            className={`mt-2 flex min-h-11 items-center border bg-surface-low ${availability === "invalid" || availability === "unavailable" ? "border-red-400" : availability === "available" ? "border-emerald-500" : "border-transparent"}`}
          >
            <span className="pl-3 font-mono text-[10px] tracking-normal text-on-surface-variant normal-case">
              momentkita.id/
            </span>
            <input
              value={slug}
              onChange={(event) => onSlug(event.target.value)}
              placeholder="ayu-dimas"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 font-mono text-[10px] tracking-normal normal-case outline-none"
            />
          </div>
          {errors.slug ? (
            <span className="mt-1 block tracking-normal text-red-700 normal-case">
              {errors.slug}
            </span>
          ) : availability === "available" ? (
            <span className="mt-1 block tracking-normal text-emerald-700 normal-case">
              This address is available.
            </span>
          ) : null}
        </label>
      </div>
    </section>
  );
}

export function CommercialStep({
  packages,
  selectedId,
  customer,
  onSelect,
}: {
  packages: Package[];
  selectedId: string;
  customer: AdminCustomer;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <StepHeader
        number={4}
        eyebrow="Commercial Context"
        title="Package & Quota"
        description="Record the commercial context for this draft. Draft creation never consumes invitation quota."
      />
      <div className="mt-5 space-y-3">
        {packages.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(item.id)}
              className={`flex w-full flex-col gap-3 border p-4 text-left sm:flex-row sm:items-center sm:justify-between ${selected ? "border-secondary bg-accent/45" : "border-border bg-surface-low"}`}
            >
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <strong className="font-serif text-[19px]">
                    {item.name}
                  </strong>
                  {item.featured ? (
                    <span className="bg-secondary px-2 py-0.5 text-[8px] font-semibold text-white uppercase">
                      Recommended
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-[9px] text-on-surface-variant">
                  {item.description}
                </span>
                <span className="mt-2 block text-[8px] font-semibold tracking-[0.1em] text-secondary uppercase">
                  1 invitation quota · active duration starts at publish
                </span>
              </span>
              <strong className="shrink-0 text-[12px]">
                {idr.format(item.price)}
              </strong>
            </button>
          );
        })}
      </div>
      <div
        className={`mt-5 flex gap-3 p-4 text-[10px] leading-5 ${customer.quotaRemaining === 0 ? "bg-amber-50 text-amber-950" : "bg-emerald-50 text-emerald-950"}`}
      >
        <CircleAlert aria-hidden size={17} className="mt-0.5 shrink-0" />
        <p>
          {customer.quotaRemaining === 0 ? (
            <>
              <strong>Draft creation is allowed.</strong> {customer.name} has no
              remaining quota, so additional quota will be required before
              Finalization.
            </>
          ) : (
            <>
              <strong>
                {customer.quotaRemaining} invitation quota remaining.
              </strong>{" "}
              This draft will not decrement that balance. Quota is consumed only
              when the invitation is Finalized.
            </>
          )}
        </p>
      </div>
    </section>
  );
}

export function ReviewStep({
  customer,
  template,
  weddingLabel,
  weddingDate,
  slug,
  packageItem,
}: {
  customer: AdminCustomer;
  template: CatalogTemplate;
  weddingLabel: string;
  weddingDate: string;
  slug: string;
  packageItem: Package;
}) {
  const formattedDate = weddingDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${weddingDate}T00:00:00Z`))
    : "Not provided";
  const rows = [
    ["Customer", customer.name],
    [
      "Account Type",
      customer.accountType === "registered"
        ? "Registered Customer"
        : "Managed Customer · No login",
    ],
    ["Template", template.name],
    ["Wedding", weddingLabel],
    ["Wedding Date", formattedDate],
    ["Invitation Address", `/${slug}`],
    ["Commercial Context", `${packageItem.name} Package`],
    ["Quota", "Not consumed yet"],
  ];
  return (
    <section className="border border-border bg-surface-lowest p-5 shadow-sm sm:p-7">
      <StepHeader
        number={5}
        eyebrow="Review & Launch"
        title="Review Invitation Draft"
        description="Confirm the setup before creating the presentation-only draft."
      />
      <dl className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="bg-surface-lowest p-4">
            <dt className="text-[8px] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
              {label}
            </dt>
            <dd className="mt-1.5 text-[12px] font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex gap-3 bg-emerald-50 p-4 text-[10px] leading-5 text-emerald-950">
        <Check aria-hidden size={16} className="mt-0.5 shrink-0" />
        <p>
          <strong>Ready to create as Draft.</strong> Finalize and Publish remain
          separate lifecycle actions. No quota, transaction, or payment record
          will be created here.
        </p>
      </div>
    </section>
  );
}
